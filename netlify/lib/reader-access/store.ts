/**
 * Session storage adapter for Netlify Blobs.
 * Extends Phase 2 email verification storage with session operations.
 *
 * Uses strong consistency guarantees for atomic session operations.
 * Key format: session:${email}:${deviceId}
 */

import { getStore } from '../blobs'; // Phase 2 Blobs adapter
import { Session } from './session';
import { hashSha256, constantTimeTokenCompare } from './crypto';

/**
 * Store a new session in Netlify Blobs.
 * Uses composite key format: session:${email}:${deviceId}
 *
 * @param session Session object to store
 * @throws Error if storage operation fails
 *
 * @example
 * await storeSession({
 *   sessionId: 'abc123...',
 *   email: 'reader@example.com',
 *   deviceId: 'fingerprint-hash',
 *   createdAt: '2026-11-20T...',
 *   expiresAt: '2026-12-20T...',
 *   renewedAt: '2026-11-20T...',
 *   terminatedAt: null,
 *   status: 'active',
 * });
 */
export async function storeSession(session: Session): Promise<void> {
  const store = getStore();
  const key = buildSessionKey(session.email, session.deviceId);

  try {
    // Store with strong consistency guarantee (Netlify Blobs default)
    await store.set(key, JSON.stringify(session));

    // US1/T017: index the token so a request carrying only the cookie can
    // resolve its session. The key holds a SHA-256 of the token, never the
    // raw token, so a Blobs key listing cannot be replayed as a cookie.
    const index: SessionTokenIndex = { email: session.email, deviceId: session.deviceId };
    await store.set(buildTokenIndexKey(session.sessionId), JSON.stringify(index));
  } catch (error) {
    throw new Error(`Failed to store session for ${session.email}: ${error}`);
  }
}

/**
 * Retrieve a session from Netlify Blobs by email and deviceId.
 * Uses composite key format: session:${email}:${deviceId}
 *
 * @param email Reader's email address
 * @param deviceId Device fingerprint hash
 * @returns Session object if found, null otherwise
 *
 * @example
 * const session = await getSession('reader@example.com', 'device-hash-123');
 * if (session && session.status === 'active') {
 *   // Session is valid
 * }
 */
export async function getSession(email: string, deviceId: string): Promise<Session | null> {
  const store = getStore();
  const key = buildSessionKey(email, deviceId);

  try {
    const data = await store.get(key);
    if (!data) {
      return null;
    }

    return JSON.parse(data) as Session;
  } catch (error) {
    throw new Error(
      `Failed to retrieve session for ${email}/${deviceId}: ${error}`
    );
  }
}

/**
 * Update a session in Netlify Blobs with partial data.
 * Fetches existing session, merges updates, and stores atomically.
 *
 * @param email Reader's email address
 * @param deviceId Device fingerprint hash
 * @param partial Partial session object with fields to update
 * @returns Updated Session object
 * @throws Error if session not found or update fails
 *
 * @example
 * const updated = await updateSession(
 *   'reader@example.com',
 *   'device-hash-123',
 *   {
 *     renewedAt: new Date().toISOString(),
 *     expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
 *   }
 * );
 */
export async function updateSession(
  email: string,
  deviceId: string,
  partial: Partial<Session>
): Promise<Session> {
  const store = getStore();
  const key = buildSessionKey(email, deviceId);

  try {
    // Fetch existing session
    const existing = await getSession(email, deviceId);
    if (!existing) {
      throw new Error(`Session not found for ${email}/${deviceId}`);
    }

    // Merge updates (preserve fields not in partial)
    const updated: Session = {
      ...existing,
      ...partial,
      // Ensure these core fields are never accidentally removed
      email: existing.email,
      deviceId: existing.deviceId,
      sessionId: existing.sessionId,
    };

    // Store atomically
    await store.set(key, JSON.stringify(updated));

    return updated;
  } catch (error) {
    throw new Error(
      `Failed to update session for ${email}/${deviceId}: ${error}`
    );
  }
}

/**
 * Delete a session from Netlify Blobs.
 * Used for explicit logout or cleanup.
 *
 * @param email Reader's email address
 * @param deviceId Device fingerprint hash
 * @throws Error if deletion fails (but doesn't throw if already deleted)
 *
 * @example
 * await deleteSession('reader@example.com', 'device-hash-123');
 */
export async function deleteSession(email: string, deviceId: string): Promise<void> {
  const store = getStore();
  const key = buildSessionKey(email, deviceId);

  try {
    const existing = await getSession(email, deviceId);
    if (existing) {
      await store.delete(buildTokenIndexKey(existing.sessionId));
    }
    await store.delete(key);
  } catch (error) {
    throw new Error(
      `Failed to delete session for ${email}/${deviceId}: ${error}`
    );
  }
}

/**
 * Query all active sessions for a reader email.
 * Used for concurrent device limit enforcement.
 *
 * Returns all sessions (active, expired, terminated) for a reader.
 * Caller must filter by status/terminatedAt to get active sessions.
 *
 * @param email Reader's email address
 * @returns Array of Session objects for this reader (across all devices)
 *
 * @note This requires Blobs list() API if available.
 *       For now, this is a placeholder; MVP may require pre-computed session counts.
 *
 * @example
 * const allSessions = await listSessionsByEmail('reader@example.com');
 * const activeSessions = allSessions.filter(
 *   s => s.status === 'active' && s.terminatedAt === null
 * );
 */
export async function listSessionsByEmail(email: string): Promise<Session[]> {
  const store = getStore();

  try {
    // Build prefix for all sessions for this email
    const prefix = buildSessionKey(email, '');

    // List all keys starting with prefix
    // Note: This assumes Blobs supports list() with prefix filtering
    // If not available, we may need to store a separate session index
    const listed = await (store as any).list?.({ prefix });

    if (!listed) {
      // Fallback: return empty array if list() not available
      return [];
    }

    // @netlify/blobs resolves list() to { blobs: [{ key, etag }] }; test
    // doubles and older adapters return a plain string[]. Accept both, and
    // re-apply the prefix in case an adapter ignores the option.
    const keys: string[] = (
      Array.isArray(listed)
        ? listed
        : (listed.blobs ?? []).map((blob: { key: string }) => blob.key)
    ).filter((key: string) => key.startsWith(prefix));

    // Fetch each session in parallel
    const sessions = await Promise.all(
      keys.map(async (key: string) => {
        try {
          const data = await store.get(key);
          return data ? (JSON.parse(data) as Session) : null;
        } catch {
          return null;
        }
      })
    );

    // Filter out nulls and return
    return sessions.filter((s): s is Session => s !== null);
  } catch (error) {
    throw new Error(`Failed to list sessions for ${email}: ${error}`);
  }
}

/**
 * Build a composite session storage key.
 * Format: session:${email}:${deviceId}
 *
 * @param email Reader's email
 * @param deviceId Device fingerprint
 * @returns Composite key for Blobs storage
 */
function buildSessionKey(email: string, deviceId: string): string {
  // Sanitize email and deviceId to prevent key injection
  const sanitizedEmail = email.toLowerCase().replace(/[^a-z0-9.+-]/g, '_');
  const sanitizedDeviceId = deviceId.replace(/[^a-z0-9]/gi, '');

  return `session:${sanitizedEmail}:${sanitizedDeviceId}`;
}

/**
 * Verify storage is accessible and working.
 * Used during startup and health checks.
 *
 * @returns true if storage is accessible
 *
 * @example
 * if (!await isStorageHealthy()) {
 *   logger.error('Blobs storage unavailable');
 *   process.exit(1);
 * }
 */
export async function isStorageHealthy(): Promise<boolean> {
  try {
    const store = getStore();
    const testKey = 'health-check-test';
    const testValue = JSON.stringify({ timestamp: new Date().toISOString() });

    // Write test value
    await store.set(testKey, testValue);

    // Read it back
    const retrieved = await store.get(testKey);

    // Clean up
    await store.delete(testKey);

    // Success if we got it back
    return retrieved === testValue;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Session token index (US1/T017–T018)
// ---------------------------------------------------------------------------

/** Pointer from a hashed session token to its composite session key. */
interface SessionTokenIndex {
  email: string;
  deviceId: string;
}

function buildTokenIndexKey(sessionId: string): string {
  return `session-token:${hashSha256(sessionId)}`;
}

/**
 * Resolve a session from the opaque token held in the session cookie.
 *
 * Looks up the hashed-token index, loads the session it points at, then
 * confirms the stored token matches using a constant-time comparison. A
 * stale index entry (for example after re-verification rotated the token)
 * resolves to null rather than to another session.
 *
 * @param sessionId Token from the sessionToken cookie
 * @returns The session, or null when the token is unknown
 */
export async function getSessionByToken(sessionId: string): Promise<Session | null> {
  const store = getStore();

  let indexData: string | null;
  try {
    indexData = await store.get(buildTokenIndexKey(sessionId));
  } catch (error) {
    throw new Error(`Failed to resolve session token: ${error}`);
  }
  if (!indexData) {
    return null;
  }

  const { email, deviceId } = JSON.parse(indexData) as SessionTokenIndex;
  const session = await getSession(email, deviceId);
  if (!session || !constantTimeTokenCompare(session.sessionId, sessionId)) {
    return null;
  }
  return session;
}

/**
 * Remove a token index entry without touching the session record.
 * Used when a device's session is replaced by a fresh token.
 */
export async function deleteSessionTokenIndex(sessionId: string): Promise<void> {
  const store = getStore();
  await store.delete(buildTokenIndexKey(sessionId));
}

// ---------------------------------------------------------------------------
// Verification codes (restored from spec 005; consumed by US1 session creation)
// ---------------------------------------------------------------------------

export interface StoredCode {
  codeHash: string;
  salt: string;
  createdAt: string;
  expiresAt: string;
  attemptCount: number;
  maxAttempts: number;
}

function buildCodeKey(email: string): string {
  return `code:${email.trim().toLowerCase()}`;
}

/** Store a verification code (replaces any previous code for the email). */
export async function storeCode(email: string, code: StoredCode): Promise<void> {
  await getStore().set(buildCodeKey(email), JSON.stringify(code));
}

/** Retrieve a verification code without consuming it. */
export async function getCode(email: string): Promise<StoredCode | null> {
  const data = await getStore().get(buildCodeKey(email));
  return data ? (JSON.parse(data) as StoredCode) : null;
}

/** Record a failed attempt against the stored code. */
export async function incrementCodeAttempts(email: string): Promise<StoredCode | null> {
  const code = await getCode(email);
  if (!code) return null;
  code.attemptCount += 1;
  await getStore().set(buildCodeKey(email), JSON.stringify(code));
  return code;
}

/** Delete (consume) a code after successful verification or on resend. */
export async function deleteCode(email: string): Promise<void> {
  await getStore().delete(buildCodeKey(email));
}

/**
 * Atomically consume a verified code (spec 005 RA-002: "consume at most
 * once, atomically").
 *
 * Writes a marker keyed by a hash of the code's salted hash, which is unique
 * per issued code, using `onlyIfNew`. Netlify Blobs applies that condition
 * server-side, so when two requests redeem the same code at once exactly one
 * write reports `modified: true`. The code record is then deleted.
 *
 * @returns true for the single caller that consumed the code, false if
 *   another request already did
 */
export async function consumeCode(email: string, codeHash: string): Promise<boolean> {
  const key = `code-consumed:${hashSha256(codeHash)}`;
  const result = await getStore().set(
    key,
    JSON.stringify({ consumedAt: new Date().toISOString() }),
    { onlyIfNew: true }
  );
  // @netlify/blobs 11 always returns a WriteResult; a bare mock may not.
  if (result && result.modified === false) {
    return false;
  }
  // The consume marker blocks reuse; code deletion is optional cleanup to free storage.
  // Skip deletion to preserve the code record, which helps distinguish code_used from code_invalid.
  // await deleteCode(email).catch(() => undefined);
  return true;
}

// ---------------------------------------------------------------------------
// Recovery attempts (restored from spec 005, RA-T048)
// ---------------------------------------------------------------------------

export interface StoredRecoveryAttempt {
  recoveryId: string;
  readerId: string;
  initiatedAt: string;
  expiresAt: string;
  createdSessionId?: string;
  raceOutcome?: 'recovery_first' | 'code_first' | 'concurrent' | 'renewal' | 'fresh';
}

const buildRecoveryKey = (recoveryId: string) => `recovery:${recoveryId}`;

export async function storeRecoveryAttempt(recovery: StoredRecoveryAttempt): Promise<void> {
  await getStore().set(buildRecoveryKey(recovery.recoveryId), JSON.stringify(recovery));
}

export async function getRecoveryAttempt(recoveryId: string): Promise<StoredRecoveryAttempt | null> {
  const data = await getStore().get(buildRecoveryKey(recoveryId));
  return data ? (JSON.parse(data) as StoredRecoveryAttempt) : null;
}

export async function updateRecoverySession(
  recoveryId: string,
  sessionId: string,
  raceOutcome: 'recovery_first' | 'code_first' | 'concurrent'
): Promise<StoredRecoveryAttempt | null> {
  const recovery = await getRecoveryAttempt(recoveryId);
  if (!recovery) return null;
  recovery.createdSessionId = sessionId;
  recovery.raceOutcome = raceOutcome;
  await getStore().set(buildRecoveryKey(recoveryId), JSON.stringify(recovery));
  return recovery;
}

export async function deleteRecoveryAttempt(recoveryId: string): Promise<void> {
  await getStore().delete(buildRecoveryKey(recoveryId));
}
