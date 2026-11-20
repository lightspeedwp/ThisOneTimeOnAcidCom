/**
 * Test fixtures for session testing.
 * Provides mock sessions and utilities for creating test data.
 */

import { Session } from '../../netlify/lib/reader-access/session';

/**
 * Create a valid test session with default values.
 *
 * @param overrides Partial session object to override defaults
 * @returns Valid Session object for testing
 *
 * @example
 * const session = createTestSession({
 *   email: 'custom@example.com',
 *   status: 'active',
 * });
 */
export function createTestSession(overrides?: Partial<Session>): Session {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

  return {
    sessionId: 'test-session-token-' + Math.random().toString(36).substring(7),
    email: 'test-reader@example.com',
    deviceId: 'test-device-fingerprint-hash-abc123',
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    renewedAt: now.toISOString(),
    terminatedAt: null,
    status: 'active',
    ...overrides,
  };
}

/**
 * Create an expired test session.
 *
 * @returns Session with expiresAt in the past
 *
 * @example
 * const expiredSession = createExpiredSession();
 * // Now testing logic that rejects expired sessions
 */
export function createExpiredSession(): Session {
  const now = new Date();
  const expiredTime = new Date(now.getTime() - 1000); // 1 second ago

  return createTestSession({
    expiresAt: expiredTime.toISOString(),
    status: 'expired',
  });
}

/**
 * Create a terminated test session.
 *
 * @returns Session that was explicitly logged out
 *
 * @example
 * const terminatedSession = createTerminatedSession();
 * // Now testing logic that rejects terminated sessions
 */
export function createTerminatedSession(): Session {
  const now = new Date();
  const terminatedTime = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago

  return createTestSession({
    terminatedAt: terminatedTime.toISOString(),
    status: 'terminated',
  });
}

/**
 * Create a session that's about to expire (within 1 hour).
 *
 * @returns Session with low time-to-expiry
 *
 * @example
 * const almostExpiredSession = createAlmostExpiredSession();
 * // Test renewal logic before expiry
 */
export function createAlmostExpiredSession(): Session {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes

  return createTestSession({
    expiresAt: expiresAt.toISOString(),
  });
}

/**
 * Create a session that's recently renewed.
 *
 * @returns Session with renewedAt very close to now
 *
 * @example
 * const freshSession = createFreshSession();
 * // Test that freshly renewed sessions are valid
 */
export function createFreshSession(): Session {
  const now = new Date();

  return createTestSession({
    renewedAt: now.toISOString(),
    createdAt: now.toISOString(),
  });
}

/**
 * Create a session that's old (created 29 days ago, about to expire).
 *
 * @returns Session created long ago (but still active if renewed regularly)
 *
 * @example
 * const oldSession = createOldSession();
 * // Test that old sessions without renewal are expired
 */
export function createOldSession(): Session {
  const now = new Date();
  const created = new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000); // 29 days ago
  const expiresAt = new Date(created.getTime() + 30 * 24 * 60 * 60 * 1000); // +30 days from creation

  return createTestSession({
    createdAt: created.toISOString(),
    renewedAt: created.toISOString(), // Never renewed
    expiresAt: expiresAt.toISOString(),
  });
}

/**
 * Create multiple test sessions for a reader.
 * Useful for testing concurrent device limits.
 *
 * @param email Reader's email
 * @param count Number of sessions to create
 * @returns Array of Session objects with different deviceIds
 *
 * @example
 * const sessions = createMultipleSessions('reader@example.com', 3);
 * // Now testing that 4th session is rejected
 */
export function createMultipleSessions(email: string, count: number): Session[] {
  const sessions: Session[] = [];

  for (let i = 0; i < count; i++) {
    sessions.push(
      createTestSession({
        email,
        deviceId: `device-${i}-${Math.random().toString(36).substring(7)}`,
        sessionId: `token-${i}-${Math.random().toString(36).substring(7)}`,
      })
    );
  }

  return sessions;
}

/**
 * Mock Blobs store for unit tests.
 * Stores sessions in memory instead of using real Blobs.
 */
export class MockBlobsStore {
  private data: Map<string, string> = new Map();

  async get(key: string): Promise<string | null> {
    return this.data.get(key) || null;
  }

  async set(key: string, value: string): Promise<void> {
    this.data.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.data.delete(key);
  }

  async list(options?: { prefix: string }): Promise<string[]> {
    if (!options?.prefix) {
      return Array.from(this.data.keys());
    }

    return Array.from(this.data.keys()).filter((k) => k.startsWith(options.prefix));
  }

  clear(): void {
    this.data.clear();
  }

  entries(): [string, string][] {
    return Array.from(this.data.entries());
  }
}

/**
 * Test request context for middleware testing.
 */
export function createTestRequestContext(overrides?: Record<string, any>) {
  return {
    headers: {
      'user-agent': 'Mozilla/5.0 Test Browser',
      'cf-timezone': 'America/Los_Angeles',
      ...overrides?.headers,
    },
    clientIp: '203.0.113.42',
    url: '/api/reader/chapter/01-part-1',
    method: 'GET',
    ...overrides,
  };
}

/**
 * Test device fingerprint for consistent testing.
 */
export const TEST_DEVICE_FINGERPRINT = {
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Test Browser',
  ipAddress: '203.0.113.42',
  timezone: 'America/Los_Angeles',
};

/**
 * Common test emails for fixtures.
 */
export const TEST_EMAILS = {
  reader: 'reader@example.com',
  reviewer: 'reviewer@example.com',
  admin: 'admin@example.com',
  suspended: 'suspended@example.com',
};
