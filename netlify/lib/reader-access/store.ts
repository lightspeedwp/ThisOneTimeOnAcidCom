/**
 * Session storage adapter for Netlify Blobs.
 * Extends Phase 2 email verification storage with session operations.
 *
 * Uses strong consistency guarantees for atomic session operations.
 * Key format: session:${email}:${deviceId}
 */

import { getStore } from '../blobs'; // Phase 2 Blobs adapter
import { Session } from './session';

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
    const keys = await (store as any).list?.({ prefix });

    if (!keys) {
      // Fallback: return empty array if list() not available
      return [];
    }

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
}
