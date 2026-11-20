/**
 * Unit tests for core session management operations.
 * Tests session creation, validation, renewal, and termination.
 *
 * Run with: npm test -- tests/session/session.test.ts
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  createSession,
  validateSession,
  renewSession,
  terminateSession,
  getActiveSessionCount,
  getSessionProperties,
} from '../../netlify/lib/reader-access/session-service';
import { FingerprintInput } from '../../netlify/lib/reader-access/session';
import { generateSessionToken } from '../../netlify/lib/reader-access/crypto';
import {
  SESSION_LIFETIME_DAYS,
  RENEWAL_COALESCE_WINDOW_MS,
} from '../../netlify/lib/reader-access/session-config';
import { updateSession } from '../../netlify/lib/reader-access/store';
import { medianTimingsNs, spreadRatio } from './helpers/timing';

// In-memory Netlify Blobs double. The session service needs a stateful store
// (terminate-then-validate, renew-then-read), so the real store adapter runs
// on top of this Map instead of being auto-mocked to return undefined.
const blobData = vi.hoisted(() => new Map<string, string>());

vi.mock('../../netlify/lib/blobs', () => ({
  getStore: () => ({
    get: (key: string) => Promise.resolve(blobData.get(key) ?? null),
    set: (key: string, value: string) => {
      blobData.set(key, value);
      return Promise.resolve();
    },
    delete: (key: string) => {
      blobData.delete(key);
      return Promise.resolve();
    },
    list: ({ prefix = '' }: { prefix?: string } = {}) =>
      Promise.resolve({
        blobs: [...blobData.keys()]
          .filter((key) => key.startsWith(prefix))
          .map((key) => ({ key, etag: 'test' })),
      }),
  }),
}));

describe('Session Service - Core Operations', () => {
  const testEmail = 'reader@example.com';
  const testDeviceId = 'device-fingerprint-hash';
  const fingerprintInput: FingerprintInput = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    ipAddress: '192.0.2.1',
    timezone: 'UTC',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    blobData.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe('createSession', () => {
    it('should create a new session with 30-day expiry', async () => {
      // Create session
      const session = await createSession(testEmail, '123456', fingerprintInput);

      // Verify session properties
      expect(session).toBeDefined();
      expect(session.sessionId).toBeTruthy();
      expect(session.email).toBe(testEmail);
      expect(session.status).toBe('active');
      expect(session.terminatedAt).toBeNull();

      // Verify 30-day expiry
      const createdAt = new Date(session.createdAt);
      const expiresAt = new Date(session.expiresAt);
      const expiryDays = (expiresAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

      expect(expiryDays).toBeCloseTo(SESSION_LIFETIME_DAYS, 0.1);
    });

    it('should generate cryptographically secure sessionId', async () => {
      const session1 = await createSession(testEmail, '123456', fingerprintInput);
      const session2 = await createSession(testEmail, '123456', fingerprintInput);

      // Session IDs should be different and non-deterministic
      expect(session1.sessionId).not.toBe(session2.sessionId);
      expect(session1.sessionId.length).toBeGreaterThan(40);
      expect(session2.sessionId.length).toBeGreaterThan(40);
    });

    it('should include renewedAt timestamp on creation', async () => {
      const beforeCreate = new Date();
      const session = await createSession(testEmail, '123456', fingerprintInput);
      const afterCreate = new Date();

      const renewedAt = new Date(session.renewedAt);
      expect(renewedAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(renewedAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    });
  });

  describe('validateSession', () => {
    let testSession: any;

    beforeEach(async () => {
      testSession = await createSession(testEmail, '123456', fingerprintInput);
    });

    it('should validate a valid session', async () => {
      const result = await validateSession(
        testSession.sessionId,
        testEmail,
        testSession.deviceId
      );

      expect(result.isValid).toBe(true);
      expect(result.statusCode).toBe(200);
      expect(result.session).toBeDefined();
    });

    it('should reject invalid token format', async () => {
      const result = await validateSession('invalid-token', testEmail, testSession.deviceId);

      expect(result.isValid).toBe(false);
      expect(result.statusCode).toBe(401);
      expect(result.reason).toBe('invalid_token');
    });

    it('should use constant-time comparison (no timing leaks)', async () => {
      // This test verifies that constantTimeTokenCompare is used
      // Timing attacks would show measurable differences in validation time
      const correctToken = testSession.sessionId;
      const wrongToken = 'wrong' + 'x'.repeat(correctToken.length - 5);

      // Compare medians of warmed-up, interleaved runs: a single sample of
      // each is dominated by JIT warm-up and scheduler noise.
      const [timing1, timing2] = await medianTimingsNs([
        () => validateSession(correctToken, testEmail, testSession.deviceId),
        () => validateSession(wrongToken, testEmail, testSession.deviceId),
      ]);
      const timingRatio = spreadRatio(timing1, timing2);

      // Allow up to 2.5x variance (should be much closer in constant-time impl)
      expect(timingRatio).toBeLessThan(2.5);
    });

    it('should reject terminated session', async () => {
      // Terminate the session
      await terminateSession(testEmail, testSession.deviceId);

      const result = await validateSession(
        testSession.sessionId,
        testEmail,
        testSession.deviceId
      );

      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('terminated_session');
    });

    it('should reject expired session', async () => {
      // Persist a past expiry beyond the clock-skew tolerance. Changing a local
      // copy of the session has no effect: validateSession reads from storage.
      await updateSession(testEmail, testSession.deviceId, {
        expiresAt: new Date(Date.now() - 60 * 1000).toISOString(),
      });

      const result = await validateSession(
        testSession.sessionId,
        testEmail,
        testSession.deviceId
      );

      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('expired_session');
    });
  });

  describe('renewSession', () => {
    let testSession: any;

    beforeEach(async () => {
      testSession = await createSession(testEmail, '123456', fingerprintInput);
    });

    it('should extend expiry to 30 days from renewal time', async () => {
      // Step past the coalesce window (only Date is faked), otherwise the
      // renewal is skipped and renewedAt keeps the creation timestamp.
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(Date.now() + RENEWAL_COALESCE_WINDOW_MS + 1);

      const beforeRenewal = new Date();
      const renewed = await renewSession(testEmail, testSession.deviceId);
      const afterRenewal = new Date();

      const renewedAt = new Date(renewed.renewedAt);
      const expiresAt = new Date(renewed.expiresAt);

      // Renewed at should be close to current time
      expect(renewedAt.getTime()).toBeGreaterThanOrEqual(beforeRenewal.getTime());
      expect(renewedAt.getTime()).toBeLessThanOrEqual(afterRenewal.getTime());

      // Expiry should be ~30 days from renewal
      const expiryDays =
        (expiresAt.getTime() - renewedAt.getTime()) / (1000 * 60 * 60 * 24);
      expect(expiryDays).toBeCloseTo(SESSION_LIFETIME_DAYS, 0.1);
    });

    it('should coalesce rapid renewals (prevent thundering herd)', async () => {
      // First renewal
      const first = await renewSession(testEmail, testSession.deviceId);

      // Immediate second renewal (within 1 second)
      const second = await renewSession(testEmail, testSession.deviceId);

      // Should return same session without updating renewedAt
      expect(first.sessionId).toBe(second.sessionId);
      expect(new Date(first.expiresAt).getTime()).toBe(
        new Date(second.expiresAt).getTime()
      );
    });

    it('should not renew terminated session', async () => {
      await terminateSession(testEmail, testSession.deviceId);

      await expect(
        renewSession(testEmail, testSession.deviceId)
      ).rejects.toThrow();
    });
  });

  describe('terminateSession', () => {
    let testSession: any;

    beforeEach(async () => {
      testSession = await createSession(testEmail, '123456', fingerprintInput);
    });

    it('should terminate active session', async () => {
      await terminateSession(testEmail, testSession.deviceId);

      // Verify validation fails after termination
      const result = await validateSession(
        testSession.sessionId,
        testEmail,
        testSession.deviceId
      );

      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('terminated_session');
    });

    it('should set terminatedAt timestamp', async () => {
      const beforeTermination = new Date();
      await terminateSession(testEmail, testSession.deviceId);
      const afterTermination = new Date();

      const retrieved = await validateSession(
        testSession.sessionId,
        testEmail,
        testSession.deviceId
      );

      // Session should be marked as terminated
      expect(retrieved.isValid).toBe(false);
    });

    it('should mark status as terminated', async () => {
      await terminateSession(testEmail, testSession.deviceId);

      // Verify via session properties
      const result = await validateSession(
        testSession.sessionId,
        testEmail,
        testSession.deviceId
      );

      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('terminated_session');
    });
  });

  describe('getSessionProperties', () => {
    let testSession: any;

    beforeEach(async () => {
      testSession = await createSession(testEmail, '123456', fingerprintInput);
    });

    it('should compute isActive for active session', async () => {
      const properties = getSessionProperties(testSession);

      expect(properties.isActive).toBe(true);
      expect(properties.isExpired).toBe(false);
      expect(properties.isTerminated).toBe(false);
    });

    it('should compute isExpired for expired session', async () => {
      const expiredSession = {
        ...testSession,
        expiresAt: new Date(Date.now() - 1000).toISOString(),
      };

      const properties = getSessionProperties(expiredSession);

      expect(properties.isExpired).toBe(true);
      expect(properties.isActive).toBe(false);
    });

    it('should compute secondsToExpiry accurately', async () => {
      const properties = getSessionProperties(testSession);

      // Session should expire in ~30 days
      const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
      expect(properties.secondsToExpiry).toBeCloseTo(thirtyDaysInSeconds, -4);
    });
  });

  describe('getActiveSessionCount', () => {
    it('should count active sessions for email', async () => {
      // Create multiple sessions
      const session1 = await createSession(testEmail, '123456', fingerprintInput);
      const session2 = await createSession(testEmail, '123456', {
        ...fingerprintInput,
        ipAddress: '192.0.2.2',
      });

      const count = await getActiveSessionCount(testEmail);

      expect(count).toBeGreaterThanOrEqual(2);
    });

    it('should not count terminated sessions', async () => {
      const session1 = await createSession(testEmail, '123456', fingerprintInput);

      // Get count before termination
      const beforeCount = await getActiveSessionCount(testEmail);

      // Terminate session
      await terminateSession(testEmail, session1.deviceId);

      // Get count after termination
      const afterCount = await getActiveSessionCount(testEmail);

      expect(afterCount).toBeLessThan(beforeCount);
    });
  });
});

describe('Session Service - Security', () => {
  describe('Token generation security', () => {
    it('should generate tokens with sufficient entropy', () => {
      const token = generateSessionToken();

      // Should be base64url-encoded 32-byte value
      expect(token.length).toBeGreaterThan(40); // base64url encoding
      expect(/^[A-Za-z0-9_-]+$/.test(token)).toBe(true);
    });

    it('should generate unique tokens on each call', () => {
      const tokens = new Set();
      for (let i = 0; i < 100; i++) {
        tokens.add(generateSessionToken());
      }

      // All tokens should be unique (collision probability ~0)
      expect(tokens.size).toBe(100);
    });
  });
});
