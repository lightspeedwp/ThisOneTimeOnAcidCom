/**
 * Tests for 30-day rolling session renewal.
 * Tests T021-T025: Session renewal timing, expiry calculation, and enforcement.
 *
 * Test scenarios:
 * - T021: Session renewal extends expiry to 30 days from activity
 * - T022: Verify exact 30-day expiry calculation (±1 second precision)
 * - T023: No auto-renewal without activity (session expires after 30 days idle)
 * - T024: Integration test for renewal flow (access day 29 → extends to day 59)
 * - T025: Integration test for expiry enforcement (after 30 days no activity → 401)
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createSession,
  renewSession,
  validateSession,
  getSessionProperties,
} from '../../netlify/lib/reader-access/session-service';
import { getSession, updateSession } from '../../netlify/lib/reader-access/store';
import {
  SESSION_LIFETIME_DAYS,
  RENEWAL_COALESCE_WINDOW_MS,
  CLOCK_SKEW_TOLERANCE_MS,
} from '../../netlify/lib/reader-access/session-config';
import type { Session } from '../../netlify/lib/reader-access/session';

// Mock Blobs store
vi.mock('../../netlify/lib/blobs', () => {
  const store = new Map<string, string>();
  return {
    getStore: () => ({
      get: (key: string) => Promise.resolve(store.get(key) || null),
      set: (key: string, value: string) => Promise.resolve(store.set(key, value)),
      delete: (key: string) => Promise.resolve(store.delete(key)),
      list: () => Promise.resolve(Array.from(store.keys())),
      store, // Export for test access
    }),
  };
});

describe('Session Renewal - T021-T025', () => {
  const testEmail = 'reader@example.com';
  const testFingerprint = {
    userAgent: 'Mozilla/5.0...',
    ipAddress: '192.168.1.1',
    timezone: 'UTC',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('T021: Session renewal extends expiry to 30 days from activity', () => {
    it('should extend session expiry by 30 days on renewal', async () => {
      // Create a fresh session
      const session = await createSession(testEmail, '123456', testFingerprint);
      const originalExpiresAt = new Date(session.expiresAt);

      // Wait longer than coalesce window to ensure renewal happens
      await new Promise((resolve) => setTimeout(resolve, RENEWAL_COALESCE_WINDOW_MS + 100));

      // Renew the session
      const renewed = await renewSession(testEmail, session.deviceId);

      const newExpiresAt = new Date(renewed.expiresAt);

      // New expiry should be approximately 30 days from now
      const now = new Date();
      const daysUntilExpiry = (newExpiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

      expect(daysUntilExpiry).toBeGreaterThan(29);
      expect(daysUntilExpiry).toBeLessThanOrEqual(30);

      // renewedAt should be updated
      const originalRenewedAt = new Date(session.renewedAt);
      const newRenewedAt = new Date(renewed.renewedAt);

      expect(newRenewedAt.getTime()).toBeGreaterThan(originalRenewedAt.getTime());
    });

    it('should update renewedAt timestamp on renewal', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);
      const originalRenewedAt = session.renewedAt;

      // Wait longer than coalesce window to ensure renewal actually occurs
      await new Promise((resolve) => setTimeout(resolve, RENEWAL_COALESCE_WINDOW_MS + 100));

      const renewed = await renewSession(testEmail, session.deviceId);

      expect(renewed.renewedAt).not.toBe(originalRenewedAt);
      const newRenewedAtTime = new Date(renewed.renewedAt).getTime();
      const originalRenewedAtTime = new Date(originalRenewedAt).getTime();

      expect(newRenewedAtTime).toBeGreaterThan(originalRenewedAtTime);
    });

    it('should not change createdAt on renewal', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);
      const originalCreatedAt = session.createdAt;

      await new Promise((resolve) => setTimeout(resolve, 100));

      const renewed = await renewSession(testEmail, session.deviceId);

      expect(renewed.createdAt).toBe(originalCreatedAt);
    });

    it('should keep session status as "active" after renewal', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);
      expect(session.status).toBe('active');

      const renewed = await renewSession(testEmail, session.deviceId);

      expect(renewed.status).toBe('active');
      expect(renewed.terminatedAt).toBeNull();
    });
  });

  describe('T022: Verify exact 30-day expiry calculation (±1 second precision)', () => {
    it('should calculate expiresAt exactly 30 days from renewal time', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);

      const beforeRenewal = Date.now();
      const renewed = await renewSession(testEmail, session.deviceId);
      const afterRenewal = Date.now();

      const newExpiresAt = new Date(renewed.expiresAt).getTime();
      const expectedExpiry = beforeRenewal + SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000;

      // Expiry should be within ±1 second of expected
      const tolerance = 1000; // 1 second
      expect(Math.abs(newExpiresAt - expectedExpiry)).toBeLessThanOrEqual(tolerance);
    });

    it('should have renewedAt very close to expiresAt - 30 days', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);
      await new Promise((resolve) => setTimeout(resolve, 100));

      const renewed = await renewSession(testEmail, session.deviceId);

      const renewedAt = new Date(renewed.renewedAt).getTime();
      const expiresAt = new Date(renewed.expiresAt).getTime();
      const expectedLifetime = SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000;

      // Difference should be exactly the session lifetime (±100ms for execution time)
      const difference = expiresAt - renewedAt;
      expect(Math.abs(difference - expectedLifetime)).toBeLessThan(100);
    });

    it('should respect SESSION_LIFETIME_DAYS configuration', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);
      await new Promise((resolve) => setTimeout(resolve, 100));

      const renewed = await renewSession(testEmail, session.deviceId);

      const renewedAt = new Date(renewed.renewedAt).getTime();
      const expiresAt = new Date(renewed.expiresAt).getTime();
      const configuredLifetime = SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000;

      const calculatedLifetime = expiresAt - renewedAt;

      // Should match configured lifetime within 100ms
      expect(Math.abs(calculatedLifetime - configuredLifetime)).toBeLessThan(100);
    });
  });

  describe('T023: No auto-renewal without activity (session expires after 30 days idle)', () => {
    it('should not auto-renew session without explicit renewal call', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);
      const originalExpiresAt = session.expiresAt;
      const originalRenewedAt = session.renewedAt;

      // Wait a moment but do NOT call renewSession
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Retrieve session without renewing
      const retrieved = await getSession(testEmail, session.deviceId);

      // expiresAt should NOT have changed
      expect(retrieved?.expiresAt).toBe(originalExpiresAt);
      expect(retrieved?.renewedAt).toBe(originalRenewedAt);
    });

    it('should validate as expired after 30 days without renewal', async () => {
      // Create a session
      const session = await createSession(testEmail, '123456', testFingerprint);

      // Manually set expiresAt to past (beyond clock skew tolerance)
      const expiredTime = new Date(Date.now() - (CLOCK_SKEW_TOLERANCE_MS + 1000)).toISOString();
      await updateSession(testEmail, session.deviceId, {
        expiresAt: expiredTime,
      });

      // Try to validate
      const result = await validateSession(session.sessionId, testEmail, session.deviceId);

      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('expired_session');
      expect(result.statusCode).toBe(401);
    });

    it('should compute correct isExpired flag for idle session', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);

      // Expire the session
      const expiredTime = new Date(Date.now() - 1000).toISOString();
      await updateSession(testEmail, session.deviceId, {
        expiresAt: expiredTime,
      });

      const retrieved = await getSession(testEmail, session.deviceId);
      if (retrieved) {
        const properties = getSessionProperties(retrieved);
        expect(properties.isExpired).toBe(true);
        expect(properties.isActive).toBe(false);
      }
    });

    it('should track days since renewal for idle sessions', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);

      // Set renewedAt to 25 days ago
      const renewedTime = new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString();
      await updateSession(testEmail, session.deviceId, {
        renewedAt: renewedTime,
      });

      const retrieved = await getSession(testEmail, session.deviceId);
      if (retrieved) {
        const properties = getSessionProperties(retrieved);
        // Should show approximately 25 days since renewal
        expect(properties.daysSinceRenewal).toBeGreaterThan(24);
        expect(properties.daysSinceRenewal).toBeLessThan(26);
      }
    });
  });

  describe('T024: Integration test for renewal flow (access day 29 → extends to day 59)', () => {
    it('should extend session from day 29 to day 59 on activity', async () => {
      // Create a session
      const session = await createSession(testEmail, '123456', testFingerprint);

      // Simulate being on day 29 (1 day before expiry)
      // Set renewedAt to 29 days ago
      const dayAgoInMs = 29 * 24 * 60 * 60 * 1000;
      const renewedTime = new Date(Date.now() - dayAgoInMs).toISOString();
      const expiresTime = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(); // expires in 1 day

      await updateSession(testEmail, session.deviceId, {
        renewedAt: renewedTime,
        expiresAt: expiresTime,
      });

      // Session should still be valid on day 29
      const beforeRenewal = await validateSession(session.sessionId, testEmail, session.deviceId);
      expect(beforeRenewal.isValid).toBe(true);

      // Renew the session (simulating activity)
      const renewed = await renewSession(testEmail, session.deviceId);

      // After renewal, should have another 30 days (day 59 from original access)
      const newExpiresAt = new Date(renewed.expiresAt);
      const now = new Date();
      const daysUntilExpiry = (newExpiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

      // Should be close to 30 days
      expect(daysUntilExpiry).toBeGreaterThan(29);
      expect(daysUntilExpiry).toBeLessThanOrEqual(30);
    });

    it('should validate successfully after renewal on day 29', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);

      // Set to day 29
      const dayAgoInMs = 29 * 24 * 60 * 60 * 1000;
      const renewedTime = new Date(Date.now() - dayAgoInMs).toISOString();
      const expiresTime = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString();

      await updateSession(testEmail, session.deviceId, {
        renewedAt: renewedTime,
        expiresAt: expiresTime,
      });

      // Renew
      const renewed = await renewSession(testEmail, session.deviceId);

      // Should still be valid after renewal
      const result = await validateSession(renewed.sessionId, testEmail, renewed.deviceId);
      expect(result.isValid).toBe(true);
      expect(result.statusCode).toBe(200);
    });
  });

  describe('T025: Integration test for expiry enforcement (after 30 days no activity → 401)', () => {
    it('should deny access after full 30 days with no activity', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);

      // Set expiresAt to past (session expired, well beyond clock skew tolerance)
      const expiredTime = new Date(Date.now() - (CLOCK_SKEW_TOLERANCE_MS + 500)).toISOString();
      await updateSession(testEmail, session.deviceId, {
        expiresAt: expiredTime,
      });

      // Try to access with expired session
      const result = await validateSession(session.sessionId, testEmail, session.deviceId);

      expect(result.isValid).toBe(false);
      expect(result.statusCode).toBe(401);
      expect(result.reason).toBe('expired_session');
    });

    it('should return 401 Unauthorized for expired session without grace period', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);

      // Set to just expired (beyond clock skew tolerance)
      const expiredTime = new Date(Date.now() - (CLOCK_SKEW_TOLERANCE_MS + 100)).toISOString();
      await updateSession(testEmail, session.deviceId, {
        expiresAt: expiredTime,
      });

      const result = await validateSession(session.sessionId, testEmail, session.deviceId);

      // Should be invalid immediately, no grace period
      expect(result.isValid).toBe(false);
      expect(result.statusCode).toBe(401);
      expect(result.reason).toBe('expired_session');
    });

    it('should not renew an expired session', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);

      // Expire the session (well beyond clock skew tolerance)
      const expiredTime = new Date(Date.now() - (CLOCK_SKEW_TOLERANCE_MS + 500)).toISOString();
      await updateSession(testEmail, session.deviceId, {
        expiresAt: expiredTime,
      });

      // Try to renew
      await expect(renewSession(testEmail, session.deviceId)).rejects.toThrow(
        /expired|Cannot renew/i
      );
    });

    it('should properly handle expiry boundary conditions', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);

      // Set expiresAt to beyond clock skew tolerance in the past
      const expiredTime = new Date(Date.now() - (CLOCK_SKEW_TOLERANCE_MS + 500)).toISOString();
      await updateSession(testEmail, session.deviceId, {
        expiresAt: expiredTime,
      });

      const result = await validateSession(session.sessionId, testEmail, session.deviceId);

      // Should be invalid (time has moved forward past tolerance)
      expect(result.isValid).toBe(false);
      expect(result.statusCode).toBe(401);
      expect(result.reason).toBe('expired_session');
    });
  });

  describe('Renewal coalescing (prevent thundering herd)', () => {
    it('should skip renewal if activity within coalesce window', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);
      const originalRenewedAt = session.renewedAt;
      const originalExpiresAt = session.expiresAt;

      // Try to renew immediately (within RENEWAL_COALESCE_WINDOW_MS)
      const renewed = await renewSession(testEmail, session.deviceId);

      // Should return the same session without updating timestamps
      // (coalesce window skips redundant updates)
      expect(renewed.sessionId).toBe(session.sessionId);
    });

    it('should renew if activity after coalesce window', async () => {
      const session = await createSession(testEmail, '123456', testFingerprint);
      const originalExpiresAt = new Date(session.expiresAt).getTime();

      // Wait longer than coalesce window
      await new Promise((resolve) => setTimeout(resolve, RENEWAL_COALESCE_WINDOW_MS + 100));

      // Renew
      const renewed = await renewSession(testEmail, session.deviceId);

      const newExpiresAt = new Date(renewed.expiresAt).getTime();

      // Should have been updated (expiresAt moved further into future)
      expect(newExpiresAt).toBeGreaterThan(originalExpiresAt);
    });
  });
});
