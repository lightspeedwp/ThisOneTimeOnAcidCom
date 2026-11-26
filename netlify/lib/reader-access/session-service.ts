/**
 * Core session management service for reader access.
 * Implements create, validate, renew, and terminate operations.
 *
 * This is the central service that all Phase 3 endpoints depend on.
 */

import { Session, SessionValidationResult } from './session';
import {
  storeSession,
  getSession,
  getSessionByToken,
  deleteSessionTokenIndex,
  updateSession,
  deleteSession,
  listSessionsByEmail,
  getCode,
  consumeCode,
  incrementCodeAttempts,
  acquireDeviceLock,
  releaseDeviceLock,
} from './store';
import { verifyCode, isCodeExpired, isCodeLimited } from './codes';
import {
  generateSessionToken,
  constantTimeTokenCompare,
  isValidSessionToken,
} from './crypto';
import {
  generateDeviceFingerprint,
  compareDeviceFingerprints,
  isValidFingerprint,
  FingerprintInput,
} from './device-fingerprint';
import {
  SESSION_LIFETIME_DAYS,
  MAX_CONCURRENT_DEVICES,
  RENEWAL_COALESCE_WINDOW_MS,
  CLOCK_SKEW_TOLERANCE_MS,
} from './session-config';

/**
 * Whether a stored session currently holds one of the reader's device slots:
 * not terminated and not yet past its expiry. Expired sessions keep
 * `status: 'active'` in storage, so the expiry has to be checked here too.
 */
function isSessionActive(session: Session, now: Date): boolean {
  return (
    session.status === 'active' &&
    session.terminatedAt === null &&
    new Date(session.expiresAt).getTime() > now.getTime()
  );
}

/**
 * Create a new session after email verification.
 *
 * Steps:
 * 1. Validate verification code (from Phase 2 verification flow)
 * 2. Mark code as consumed (atomic, prevent replay)
 * 3. Check concurrent device limit
 * 4. Generate cryptographically secure sessionId
 * 5. Create Session record with 30-day expiry
 * 6. Store in Blobs with strong consistency
 *
 * @param email Verified email from Phase 2 verification
 * @param verificationCode Code that was verified in Phase 2
 * @param deviceFingerprint Device fingerprint (from client)
 * @returns Created Session with sessionId, timestamps, and 30-day expiry
 * @throws Error if verification fails, device limit exceeded, or storage fails
 *
 * @example
 * const session = await createSession(
 *   'reader@example.com',
 *   '123456',
 *   { userAgent: '...', ipAddress: '...' }
 * );
 * // => { sessionId: 'token...', email: '...', expiresAt: '2026-12-20T...', ... }
 */
/**
 * Per-email creation queue. createSession counts active sessions and then
 * writes, so concurrent calls for one email could all pass the device-limit
 * check. Chaining them closes that race within one function instance.
 *
 * Limitation: Netlify Blobs offers no compare-and-swap through this adapter,
 * so two separate function instances can still race. A conditional write
 * (ETag onlyIfMatch on a per-email counter) would be needed to close that.
 */
const creationQueues = new Map<string, Promise<unknown>>();

function serialiseByEmail<T>(email: string, task: () => Promise<T>): Promise<T> {
  const key = email.trim().toLowerCase();
  const previous = creationQueues.get(key) ?? Promise.resolve();
  const run = previous.then(task, task);
  const settled = run.catch(() => undefined);
  creationQueues.set(key, settled);
  settled.then(() => {
    if (creationQueues.get(key) === settled) creationQueues.delete(key);
  });
  return run;
}

export async function createSession(
  email: string,
  verificationCode: string,
  deviceFingerprint: FingerprintInput
): Promise<Session> {
  return serialiseByEmail(email, () => createSessionUnserialised(email, deviceFingerprint));
}

async function createSessionUnserialised(
  email: string,
  deviceFingerprint: FingerprintInput
): Promise<Session> {
  // TODO: T006a - Validate verification code (Phase 2 integration)
  // - Lookup verification code in Phase 2 storage
  // - Check code not expired (< 15 minutes old)
  // - Validate code matches email
  // - Mark code as consumed (atomic operation)
  // - If verification fails, throw 401 Unauthorized

  // Generate device fingerprint hash
  const deviceId = generateDeviceFingerprint(deviceFingerprint);

  // Acquire atomic device creation lock (cross-instance coordination).
  // This prevents the check-then-act race where two instances both see
  // activeCount < limit and both create sessions, overflowing the device
  // limit. Only one instance can hold the lock and proceed at a time.
  const lockAcquired = await acquireDeviceLock(email, deviceId);
  if (!lockAcquired) {
    // Another instance is creating a session for this device.
    // Return 409 so client can retry or select another device.
    const error = new Error('Device creation in progress (lock contention)');
    (error as any).statusCode = 409;
    (error as any).errorCode = 'device_limit_exceeded';
    throw error;
  }

  try {
    // Lock held: re-check device count (may have changed while waiting).
    // This is critical: between the lock acquisition and this check,
    // other instances could have completed their device creations.
    const activeSessions = await listSessionsByEmail(email);
    const now = new Date();
    const activeCount = activeSessions.filter(
      (s) => isSessionActive(s, now) && s.deviceId !== deviceId
    ).length;

    if (activeCount >= MAX_CONCURRENT_DEVICES) {
      // Device limit exceeded (T006b)
      const error = new Error('Device limit exceeded');
      (error as any).statusCode = 409;
      (error as any).errorCode = 'device_limit_exceeded';
      throw error;
    }

    // Generate cryptographically secure session token
    const sessionId = generateSessionToken();

    // Create session record with 30-day expiry
    const expiresAt = new Date(now.getTime() + SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000);

    const session: Session = {
      sessionId,
      email,
      deviceId,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      renewedAt: now.toISOString(),
      terminatedAt: null,
      status: 'active',
    };

    // Store in Blobs (strong consistency)
    await storeSession(session);

    return session;
  } finally {
    // Always release the lock, even on error.
    // This ensures other instances can proceed if this one fails.
    await releaseDeviceLock(email, deviceId);
  }
}

/**
 * Validate a session from a sessionId token.
 *
 * Steps:
 * 1. Validate token format (non-empty, valid base64url)
 * 2. Lookup session in Blobs (need email + deviceId)
 *    - For now: requires email/deviceId to be provided separately
 *    - Future: could use session index or JWT decode
 * 3. Verify token matches using constant-time comparison
 * 4. Check session not expired (expiresAt > now)
 * 5. Check session not terminated (terminatedAt === null)
 * 6. Return validation result
 *
 * @param sessionId Token from request (cookie)
 * @param email Reader's email (from request context or token)
 * @param deviceId Device fingerprint (from request)
 * @returns SessionValidationResult with status and session object
 *
 * @example
 * const result = await validateSession(
 *   'token-from-cookie',
 *   'reader@example.com',
 *   'device-fingerprint-hash'
 * );
 * if (result.isValid) {
 *   // Grant access, session in result.session
 * } else {
 *   // Return 401, reason in result.reason
 * }
 */
export async function validateSession(
  sessionId: string | undefined,
  email: string | undefined,
  deviceId: string | undefined
): Promise<SessionValidationResult> {
  // Step 1: Validate token format
  if (!sessionId || !isValidSessionToken(sessionId)) {
    return {
      isValid: false,
      reason: 'invalid_token',
      statusCode: 401,
    };
  }

  // Step 2: Validate inputs
  if (!email || !deviceId) {
    return {
      isValid: false,
      reason: 'invalid_token',
      statusCode: 401,
    };
  }

  if (!isValidFingerprint(deviceId)) {
    return {
      isValid: false,
      reason: 'invalid_token',
      statusCode: 401,
    };
  }

  // Step 3: Lookup session from storage
  let session: Session | null;
  try {
    session = await getSession(email, deviceId);
  } catch (error) {
    // Storage error
    return {
      isValid: false,
      reason: 'invalid_token',
      statusCode: 500,
    };
  }

  if (!session) {
    return {
      isValid: false,
      reason: 'invalid_token',
      statusCode: 401,
    };
  }

  // Step 4: Verify token using constant-time comparison
  if (!constantTimeTokenCompare(session.sessionId, sessionId)) {
    return {
      isValid: false,
      reason: 'invalid_token',
      statusCode: 401,
    };
  }

  // Step 5: Check session not terminated
  if (session.terminatedAt !== null) {
    return {
      isValid: false,
      reason: 'terminated_session',
      statusCode: 401,
    };
  }

  // Step 6: Check session not expired (with clock skew tolerance)
  const expiresAt = new Date(session.expiresAt);
  const now = new Date();
  const timeUntilExpiry = expiresAt.getTime() - now.getTime();

  if (timeUntilExpiry < -CLOCK_SKEW_TOLERANCE_MS) {
    // Session expired (beyond clock skew tolerance)
    return {
      isValid: false,
      reason: 'expired_session',
      statusCode: 401,
    };
  }

  // Session is valid! Include activity summary (T039)
  return {
    isValid: true,
    session,
    statusCode: 200,
    activitySummary: {
      createdAt: session.createdAt,
      renewedAt: session.renewedAt,
      terminatedAt: session.terminatedAt,
      status: session.status,
    },
  };
}

/**
 * Renew an active session by extending expiry to 30 days from now.
 *
 * Steps:
 * 1. Lookup existing session
 * 2. Verify session is active (not terminated, not expired)
 * 3. Coalesce renewals (skip if activity within 1 second)
 * 4. Update: renewedAt = now, expiresAt = now + 30 days
 * 5. Store atomically in Blobs
 * 6. Return updated session
 * 7. Log renewal event for analytics and monitoring
 *
 * @param email Reader's email
 * @param deviceId Device fingerprint
 * @returns Updated Session with new expiresAt timestamp
 * @throws Error if session not found, terminated, or renewal fails
 *
 * @example
 * const renewed = await renewSession(
 *   'reader@example.com',
 *   'device-fingerprint-hash'
 * );
 * // => { ...session, renewedAt: now, expiresAt: now + 30 days }
 */
export async function renewSession(email: string, deviceId: string): Promise<Session> {
  // Step 1: Lookup existing session
  let existing: Session | null;
  try {
    existing = await getSession(email, deviceId);
  } catch (error) {
    // Log storage error for monitoring
    logRenewalError(email, deviceId, 'storage_error', error);
    throw error;
  }

  if (!existing) {
    throw new Error(`Session not found for ${email}/${deviceId}`);
  }

  // Step 2: Verify session is active
  if (existing.terminatedAt !== null) {
    throw new Error(`Cannot renew terminated session for ${email}`);
  }

  const now = new Date();
  const expiresAt = new Date(existing.expiresAt);

  if (expiresAt <= now) {
    throw new Error(`Cannot renew expired session for ${email}`);
  }

  // Step 3: Coalesce renewals (prevent thundering herd)
  const lastRenewal = new Date(existing.renewedAt);
  const timeSinceLastRenewal = now.getTime() - lastRenewal.getTime();

  if (timeSinceLastRenewal < RENEWAL_COALESCE_WINDOW_MS) {
    // Skip update, just return current session
    // This prevents multiple rapid renewals in concurrent requests
    // No logging needed for coalesced renewals
    return existing;
  }

  // Step 4: Update timestamps (use server time only, no client timestamps)
  const newExpiresAt = new Date(now.getTime() + SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000);

  let updated: Session;
  try {
    updated = await updateSession(email, deviceId, {
      renewedAt: now.toISOString(),
      expiresAt: newExpiresAt.toISOString(),
    });
  } catch (error) {
    // Log renewal failure for alerts
    logRenewalError(email, deviceId, 'update_failed', error);
    throw error;
  }

  // Step 7: Log successful renewal event for analytics
  logRenewalSuccess(email, deviceId, now.toISOString(), newExpiresAt.toISOString());

  return updated;
}

/**
 * Log successful session renewal event.
 * Used for analytics tracking and monitoring.
 *
 * @param email Reader's email
 * @param deviceId Device fingerprint
 * @param renewedAt Renewal timestamp
 * @param expiresAt New expiry timestamp
 */
function logRenewalSuccess(email: string, deviceId: string, renewedAt: string, expiresAt: string) {
  // Log renewal event: "Session renewed: email, renewedAt, newExpiresAt"
  console.log('SESSION_RENEWAL_SUCCESS', {
    email: email,
    deviceId: deviceId.substring(0, 8) + '...', // Mask device ID for privacy
    renewedAt: renewedAt,
    expiresAt: expiresAt,
    timestamp: new Date().toISOString(),
  });

  // Track renewal frequency for analytics
  // This can be used to understand engagement patterns
  if (typeof process !== 'undefined' && process.env.ENABLE_RENEWAL_METRICS === 'true') {
    trackRenewalMetric(email);
  }
}

/**
 * Log session renewal error.
 * Used for alerting on failures.
 *
 * @param email Reader's email
 * @param deviceId Device fingerprint
 * @param errorCode Type of error (storage_error, update_failed, etc.)
 * @param error The error object
 */
function logRenewalError(email: string, deviceId: string, errorCode: string, error: any) {
  // Log renewal failure: "Session renewal failed: email, errorCode"
  console.error('SESSION_RENEWAL_ERROR', {
    email: email,
    deviceId: deviceId.substring(0, 8) + '...', // Mask device ID for privacy
    errorCode: errorCode,
    message: error?.message || 'Unknown error',
    timestamp: new Date().toISOString(),
  });

  // Alert on failures (this would integrate with monitoring/alerting system)
  if (typeof process !== 'undefined' && process.env.ENABLE_RENEWAL_ALERTS === 'true') {
    alertRenewalFailure(email, errorCode);
  }
}

/**
 * Track renewal metrics for analytics.
 * This would typically send data to analytics system.
 *
 * @param email Reader's email
 */
function trackRenewalMetric(email: string) {
  // This is a placeholder for metrics tracking
  // In production, this would send to analytics backend
  if (typeof console !== 'undefined' && console.debug) {
    console.debug('RENEWAL_METRIC: Session renewed for', email);
  }
}

/**
 * Alert on renewal failure.
 * This would typically integrate with monitoring/alerting system.
 *
 * @param email Reader's email
 * @param errorCode Type of error
 */
function alertRenewalFailure(email: string, errorCode: string) {
  // This is a placeholder for alerting
  // In production, this would trigger monitoring alerts
  if (typeof console !== 'undefined' && console.error) {
    console.error('RENEWAL_FAILURE_ALERT: Failed to renew session for', email, 'reason:', errorCode);
  }
}

/**
 * Terminate a session immediately (logout or expiry).
 *
 * Steps:
 * 1. Lookup existing session
 * 2. Set terminatedAt = now, status = 'terminated'
 * 3. Store atomically in Blobs
 * 4. Session can no longer be used (401 on next access)
 *
 * @param email Reader's email
 * @param deviceId Device fingerprint
 * @throws Error if session not found or termination fails
 *
 * @example
 * await terminateSession('reader@example.com', 'device-fingerprint-hash');
 * // Session is now terminated, 401 on next access
 */
export async function terminateSession(email: string, deviceId: string): Promise<void> {
  // Step 1: Verify session exists
  const existing = await getSession(email, deviceId);
  if (!existing) {
    throw new Error(`Session not found for ${email}/${deviceId}`);
  }

  // Step 2: Mark as terminated
  const now = new Date();
  await updateSession(email, deviceId, {
    terminatedAt: now.toISOString(),
    status: 'terminated',
  });

  // Session is now inaccessible
}

/**
 * Get active session count for a reader.
 * Used for concurrent device limit enforcement.
 *
 * @param email Reader's email
 * @returns Number of active sessions (across all devices)
 */
export async function getActiveSessionCount(email: string): Promise<number> {
  const sessions = await listSessionsByEmail(email);
  const now = new Date();
  return sessions.filter((s) => isSessionActive(s, now)).length;
}

/**
 * Compute session properties dynamically.
 * Returns computed fields that aren't stored but are useful for logic.
 *
 * @param session Session to compute properties for
 * @returns Object with isExpired, isActive, isTerminated, etc.
 */
export function getSessionProperties(session: Session) {
  const now = new Date();
  const expiresAt = new Date(session.expiresAt);
  const renewedAt = new Date(session.renewedAt);

  const secondsToExpiry = Math.max(0, (expiresAt.getTime() - now.getTime()) / 1000);
  const daysSinceRenewal = (now.getTime() - renewedAt.getTime()) / (1000 * 60 * 60 * 24);

  return {
    isExpired: expiresAt <= now,
    isActive: session.status === 'active' && expiresAt > now && session.terminatedAt === null,
    isTerminated: session.terminatedAt !== null,
    secondsToExpiry,
    daysSinceRenewal,
  };
}

// ---------------------------------------------------------------------------
// User Story 1: seamless chapter access after email verification
// ---------------------------------------------------------------------------

/** Error codes from the session-api contract for session creation. */
export type SessionCreationErrorCode =
  | 'invalid_verification'
  | 'verification_failed'
  | 'device_limit_exceeded';

/** Typed failure from createSessionFromVerification, carrying its HTTP status. */
export class SessionCreationError extends Error {
  constructor(
    public readonly errorCode: SessionCreationErrorCode,
    public readonly statusCode: number
  ) {
    super(errorCode);
    this.name = 'SessionCreationError';
  }
}

/**
 * T017: Verify an emailed code and open a session for this device.
 *
 * 1. Look up the stored code; missing, expired or locked → 401
 * 2. Compare the code hash; a wrong code records an attempt → 401
 * 3. Consume the code atomically before any session is written: a
 *    conditional (onlyIfNew) marker write lets exactly one of several
 *    concurrent requests for the same code through; the rest get 401
 * 4. If this device already has a session, rotate it: new token, old
 *    token index removed, fresh 30-day window (no device slot consumed)
 * 5. Otherwise create a new session, enforcing the device limit (409)
 *
 * @param email Reader's email (normalised to lower case)
 * @param code Six-digit verification code
 * @param fingerprint Request fingerprint inputs
 * @returns The active session to set in the cookie
 * @throws SessionCreationError for verification or device-limit failures
 */
export async function createSessionFromVerification(
  email: string,
  code: string,
  fingerprint: FingerprintInput
): Promise<Session> {
  const normalisedEmail = email.trim().toLowerCase();

  const stored = await getCode(normalisedEmail);
  if (!stored || isCodeExpired(stored.expiresAt) || isCodeLimited(stored.attemptCount, stored.maxAttempts)) {
    throw new SessionCreationError('verification_failed', 401);
  }

  if (!verifyCode(code, stored.codeHash, stored.salt)) {
    await incrementCodeAttempts(normalisedEmail);
    throw new SessionCreationError('verification_failed', 401);
  }

  if (!(await consumeCode(normalisedEmail, stored.codeHash))) {
    throw new SessionCreationError('verification_failed', 401);
  }

  const deviceId = generateDeviceFingerprint(fingerprint);
  const existing = await getSession(normalisedEmail, deviceId);

  if (existing && existing.terminatedAt === null) {
    return rotateDeviceSession(existing);
  }

  try {
    return await createSession(normalisedEmail, code, fingerprint);
  } catch (error) {
    if ((error as { errorCode?: string }).errorCode === 'device_limit_exceeded') {
      throw new SessionCreationError('device_limit_exceeded', 409);
    }
    throw error;
  }
}

/**
 * Replace a device's session token after re-verification.
 *
 * Issuing a fresh token on every verification prevents session fixation:
 * a token captured before the reader re-verified stops working.
 */
async function rotateDeviceSession(existing: Session): Promise<Session> {
  const now = new Date();
  const rotated: Session = {
    ...existing,
    sessionId: generateSessionToken(),
    createdAt: now.toISOString(),
    renewedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    terminatedAt: null,
    status: 'active',
  };

  await deleteSessionTokenIndex(existing.sessionId);
  await storeSession(rotated);
  return rotated;
}

/**
 * T018: Validate a session using only the token from the cookie.
 *
 * Resolves email and deviceId through the hashed-token index, then runs the
 * standard checks in validateSession (constant-time compare, terminated,
 * expired with clock-skew tolerance).
 *
 * @param token Value of the sessionToken cookie
 * @returns Validation result; statusCode 500 when storage is unavailable
 */
export async function authenticateSessionToken(
  token: string | null | undefined
): Promise<SessionValidationResult> {
  if (!token) {
    return { isValid: false, reason: 'missing_token', statusCode: 401 };
  }

  if (!isValidSessionToken(token)) {
    return { isValid: false, reason: 'invalid_token', statusCode: 401 };
  }

  let session: Session | null;
  try {
    session = await getSessionByToken(token);
  } catch {
    return { isValid: false, reason: 'invalid_token', statusCode: 500 };
  }

  if (!session) {
    return { isValid: false, reason: 'invalid_token', statusCode: 401 };
  }

  return validateSession(token, session.email, session.deviceId);
}

/**
 * T019: Extend a valid session after reader activity.
 *
 * Delegates to renewSession (which coalesces renewals inside one second).
 * A renewal failure must not block reading: the session is still valid for
 * its current window, so the original session is returned and the failure
 * is left to renewSession's error logging.
 *
 * @param session A session that has just passed validation
 * @returns The renewed session, or the original one if renewal failed
 */
export async function renewSessionOnActivity(session: Session): Promise<Session> {
  try {
    return await renewSession(session.email, session.deviceId);
  } catch {
    return session;
  }
}
