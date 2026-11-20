/**
 * Unit tests for session expiry calculation and enforcement.
 * Tests T083: verify exact 30-day window (±1 second precision)
 *
 * User Story 2: 30-Day Rolling Session Renewal
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { resetInMemoryBlobStore } from '../helpers/in-memory-blob-store';
import { createSession, validateSession, renewSession } from '../../netlify/lib/reader-access/session-service';
import { SESSION_LIFETIME_DAYS, CLOCK_SKEW_TOLERANCE_MS } from '../../netlify/lib/reader-access/session-config';

// In-memory Netlify Blobs that honours list({ prefix }) like the real store.
vi.mock('../../netlify/lib/blobs', async () =>
  (await import('../helpers/in-memory-blob-store')).inMemoryBlobsModule()
);

describe('Session Expiry - T083 (US2)', () => {
  const testEmail = `reader-expiry-${Date.now()}@example.com`;
  const testCode = '123456';
  const fingerprint = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    ipAddress: '192.168.1.1',
    timezone: 'UTC',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    resetInMemoryBlobStore();
  });

  describe('Expiry calculation precision', () => {
    it('should calculate expiresAt exactly 30 days from creation', async () => {
      const before = Date.now();
      const session = await createSession(testEmail, testCode, fingerprint);
      const after = Date.now();

      const expiresAtTime = new Date(session.expiresAt).getTime();
      const thirtyDaysInMs = SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000;
      const expectedExpiryMin = before + thirtyDaysInMs;
      const expectedExpiryMax = after + thirtyDaysInMs;

      expect(expiresAtTime).toBeGreaterThanOrEqual(expectedExpiryMin);
      expect(expiresAtTime).toBeLessThanOrEqual(expectedExpiryMax);
    });

    it('should have ±1 second precision for expiry', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      const createdAtTime = new Date(session.createdAt).getTime();
      const expiresAtTime = new Date(session.expiresAt).getTime();

      const thirtyDaysInMs = SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000;
      const timeDiff = expiresAtTime - createdAtTime;

      // Should be very close to exactly 30 days
      const tolerance = 1000; // ±1 second
      expect(Math.abs(timeDiff - thirtyDaysInMs)).toBeLessThan(tolerance);
    });

    it('should use server time for expiry calculation', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      const createdAt = new Date(session.createdAt);
      const expiresAt = new Date(session.expiresAt);

      // createdAt should be very recent (server time)
      const ageInSeconds = (new Date().getTime() - createdAt.getTime()) / 1000;
      expect(ageInSeconds).toBeLessThan(10);

      // expiresAt should be ~30 days in future
      const untilExpiryInDays = (expiresAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
      expect(untilExpiryInDays).toBeCloseTo(30, 0.1);
    });
  });

  describe('Expiry validation', () => {
    it('should validate active session within expiry window', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      const result = await validateSession(session.sessionId, testEmail, session.deviceId);

      expect(result.isValid).toBe(true);
      expect(result.statusCode).toBe(200);
    });

    it('should detect expired session', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);

      // Mock an expired session by manually setting expiresAt to past
      const { updateSession } = await import('../../netlify/lib/reader-access/store');
      const pastDate = new Date(Date.now() - 1000).toISOString(); // 1 second ago
      await updateSession(testEmail, session.deviceId, { expiresAt: pastDate });

      const result = await validateSession(session.sessionId, testEmail, session.deviceId);
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('expired_session');
      expect(result.statusCode).toBe(401);
    });

    it('should handle clock skew tolerance', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);

      // Set expiresAt to exactly now (within clock skew tolerance)
      const { updateSession } = await import('../../netlify/lib/reader-access/store');
      const nowDate = new Date().toISOString();
      await updateSession(testEmail, session.deviceId, { expiresAt: nowDate });

      const result = await validateSession(session.sessionId, testEmail, session.deviceId);
      // Should still be valid due to CLOCK_SKEW_TOLERANCE_MS
      expect(result.isValid).toBe(true);
    });

    it('should reject session beyond clock skew tolerance', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);

      // Set expiresAt to past the clock skew tolerance
      const { updateSession } = await import('../../netlify/lib/reader-access/store');
      const pastDate = new Date(Date.now() - CLOCK_SKEW_TOLERANCE_MS - 100).toISOString();
      await updateSession(testEmail, session.deviceId, { expiresAt: pastDate });

      const result = await validateSession(session.sessionId, testEmail, session.deviceId);
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('expired_session');
    });
  });

  describe('Renewal timing', () => {
    it('should extend expiry to 30 days from renewal', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      const originalExpiresAt = new Date(session.expiresAt).getTime();

      // Wait a bit
      await new Promise((resolve) => setTimeout(resolve, 100));

      const before = Date.now();
      const renewed = await renewSession(testEmail, session.deviceId);
      const after = Date.now();

      const newExpiresAt = new Date(renewed.expiresAt).getTime();
      const thirtyDaysInMs = SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000;
      const expectedNewExpiry = before + thirtyDaysInMs;

      // New expiry should be later than original
      expect(newExpiresAt).toBeGreaterThan(originalExpiresAt);

      // New expiry should be ~30 days from renewal time
      const timeDiff = Math.abs(newExpiresAt - expectedNewExpiry);
      expect(timeDiff).toBeLessThan(1000); // ±1 second
    });

    it('should not extend expiry without renewal', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      const originalExpiresAt = new Date(session.expiresAt).getTime();

      // Wait a bit but don't renew
      await new Promise((resolve) => setTimeout(resolve, 100));

      const { getSession } = await import('../../netlify/lib/reader-access/store');
      const retrieved = await getSession(testEmail, session.deviceId);

      // expiresAt should not have changed
      expect(new Date(retrieved!.expiresAt).getTime()).toBe(originalExpiresAt);
    });
  });

  describe('No grace period', () => {
    it('should deny access immediately upon expiry (no grace period)', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);

      // Set expiresAt to exactly now
      const { updateSession } = await import('../../netlify/lib/reader-access/store');
      const nowDate = new Date().toISOString();

      // Set to slightly past (beyond tolerance)
      const pastDate = new Date(Date.now() - CLOCK_SKEW_TOLERANCE_MS - 1).toISOString();
      await updateSession(testEmail, session.deviceId, { expiresAt: pastDate });

      const result = await validateSession(session.sessionId, testEmail, session.deviceId);
      expect(result.isValid).toBe(false);
      expect(result.statusCode).toBe(401);
    });
  });

  describe('Multiple renewals preserve window', () => {
    it('should maintain 30-day window across multiple renewals', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      const thirtyDaysInMs = SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000;

      let current = session;
      for (let i = 0; i < 3; i++) {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for coalesce window

        const renewed = await renewSession(testEmail, current.deviceId);

        // Rolling window: each renewal sets expiresAt = renewedAt + 30 days.
        // (Measuring from createdAt grows by the elapsed time on every renewal.)
        const renewedTime = new Date(renewed.renewedAt).getTime();
        const expiresTime = new Date(renewed.expiresAt).getTime();
        const windowSize = expiresTime - renewedTime;

        // Should still be ~30 days
        expect(Math.abs(windowSize - thirtyDaysInMs)).toBeLessThan(2000);

        current = renewed;
      }
    });
  });
});
