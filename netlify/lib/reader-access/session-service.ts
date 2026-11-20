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
  updateSession,
  deleteSession,
  listSessionsByEmail,
} from './store';
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

/** Tail of the pending createSession chain for each reader, keyed by email. */
const emailLocks = new Map<string, Promise<unknown>>();

/**
 * Run `task` after every earlier task queued for the same reader has settled.
 *
 * This removes the check-then-write race in createSession within one function
 * instance. It cannot coordinate separate instances: that needs conditional
 * writes in the storage layer.
 */
async function withEmailLock<T>(email: string, task: () => Promise<T>): Promise<T> {
  const key = email.toLowerCase();
  const previous = emailLocks.get(key) ?? Promise.resolve();
  const run = previous.then(task, task);
  const tail = run.catch(() => undefined);
  emailLocks.set(key, tail);

  try {
    return await run;
  } finally {
    // Drop the entry once nothing newer has queued behind this task.
    if (emailLocks.get(key) === tail) {
      emailLocks.delete(key);
    }
  }
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
export async function createSession(
  email: string,
  verificationCode: string,
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

  // Serialise check-then-write per reader so concurrent verifications in this
  // instance cannot all pass the device-limit check before any of them writes.
  return withEmailLock(email, async () => {
    // Check concurrent device limit (T006b).
    // A session on this same device is about to be replaced (same storage key),
    // so it does not use up a slot: re-verifying on a known device never adds one.
    const now = new Date();
    const activeSessions = await listSessionsByEmail(email);
    const activeCount = activeSessions.filter(
      (s) => s.deviceId !== deviceId && isSessionActive(s, now)
    ).length;

    if (activeCount >= MAX_CONCURRENT_DEVICES) {
      // Device limit exceeded
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
  });
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

  if (timeUntilExpiry <= -CLOCK_SKEW_TOLERANCE_MS) {
    // Session expired: the tolerance window is half-open, so a session that is
    // exactly CLOCK_SKEW_TOLERANCE_MS past expiry is already rejected.
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

  // Step 3: Coalesce renewals (prevent thundering herd).
  // createSession sets renewedAt = createdAt, but creation is not a renewal:
  // only coalesce against an earlier renewal, so the first activity after
  // sign-in always extends the session.
  const lastRenewal = new Date(existing.renewedAt);
  const timeSinceLastRenewal = now.getTime() - lastRenewal.getTime();
  const hasBeenRenewed = existing.renewedAt !== existing.createdAt;

  if (hasBeenRenewed && timeSinceLastRenewal < RENEWAL_COALESCE_WINDOW_MS) {
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
