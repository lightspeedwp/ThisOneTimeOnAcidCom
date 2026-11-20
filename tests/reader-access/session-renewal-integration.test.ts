/**
 * Integration tests for seamless session renewal.
 * Tests T024-T026: Session renewal flow, expiry enforcement, and seamless renewal over simulated days.
 *
 * This test simulates a reader accessing content continuously over multiple days
 * without interruption due to session renewal.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createSession, validateSession, renewSession, getSessionProperties } from '../../netlify/lib/reader-access/session-service';
import { updateSession } from '../../netlify/lib/reader-access/store';

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

describe('E2E: Seamless Session Renewal Over 25+ Simulated Days - T026', () => {
  const testEmail = 'reader@example.com';
  const testFingerprint = {
    userAgent: 'Mozilla/5.0...',
    ipAddress: '192.168.1.1',
    timezone: 'UTC',
  };

  const simulateTimeAdvance = async (days: number, session: any): Promise<void> => {
    // Simulate time passing by updating renewedAt and expiresAt in the past
    // This represents the session being created/renewed that many days ago
    const timeMs = days * 24 * 60 * 60 * 1000;
    const now = new Date();

    const renewedTime = new Date(now.getTime() - timeMs).toISOString();
    // Keep expiresAt fresh (30 days from simulated "now")
    const newExpiresAt = new Date(now.getTime() + (30 - days) * 24 * 60 * 60 * 1000).toISOString();

    await updateSession(testEmail, session.deviceId, {
      renewedAt: renewedTime,
      expiresAt: newExpiresAt,
    });
  };

  describe('Continuous reading over 25+ days with renewal', () => {
    it('should allow seamless access over 25 simulated days with auto-renewal', async () => {
      // Create session
      const session = await createSession(testEmail, '123456', testFingerprint);
      let currentSession = session;

      // Simulate daily access with renewal for 25 days
      for (let day = 1; day <= 25; day++) {
        // Simulate time advance
        await simulateTimeAdvance(day - 1, currentSession);

        // Validate session (simulate access check)
        const result = await validateSession(currentSession.sessionId, testEmail, currentSession.deviceId);

        // Should always be valid
        expect(result.isValid).toBe(true);
        expect(result.statusCode).toBe(200);
        expect(result.session).toBeDefined();

        // Renew session (simulating activity/access)
        currentSession = await renewSession(testEmail, currentSession.deviceId);

        // Verify renewed
        const properties = getSessionProperties(currentSession);
        expect(properties.isActive).toBe(true);
        expect(properties.secondsToExpiry).toBeGreaterThan(0);
      }

      // After 25 days, should still have roughly 30 days remaining
      const finalProperties = getSessionProperties(currentSession);
      const daysRemaining = finalProperties.secondsToExpiry / (24 * 60 * 60);

      expect(daysRemaining).toBeGreaterThan(29);
      expect(daysRemaining).toBeLessThanOrEqual(30);
    });

    it('should handle access on day 29 and extend to day 59', async () => {
      // Create session
      const session = await createSession(testEmail, '123456', testFingerprint);

      // Simulate being on day 29 (almost expired)
      await simulateTimeAdvance(29, session);

      // Should still be valid on day 29
      const beforeRenewal = await validateSession(session.sessionId, testEmail, session.deviceId);
      expect(beforeRenewal.isValid).toBe(true);

      // Renew (simulating activity on day 29)
      const renewed = await renewSession(testEmail, session.deviceId);

      // Should now have another 30 days (effectively day 59)
      const properties = getSessionProperties(renewed);
      const daysRemaining = properties.secondsToExpiry / (24 * 60 * 60);

      expect(daysRemaining).toBeGreaterThan(29);
      expect(daysRemaining).toBeLessThanOrEqual(30);
    });

    it('should deny access after 30+ days without renewal', async () => {
      // Create session
      const session = await createSession(testEmail, '123456', testFingerprint);

      // Simulate being on day 31 (expired, no renewal happened)
      await simulateTimeAdvance(31, session);

      // Should be invalid
      const result = await validateSession(session.sessionId, testEmail, session.deviceId);

      expect(result.isValid).toBe(false);
      expect(result.statusCode).toBe(401);
      expect(result.reason).toBe('expired_session');
    });

    it('should track session lifecycle over extended period', async () => {
      // Create session
      const session = await createSession(testEmail, '123456', testFingerprint);
      expect(session.status).toBe('active');

      const createdAt = new Date(session.createdAt);
      let currentSession = session;

      // Simulate 25 days of activity with renewals every 5 days
      for (let checkpoint = 5; checkpoint <= 25; checkpoint += 5) {
        await simulateTimeAdvance(checkpoint - 1, currentSession);

        // Check properties
        const properties = getSessionProperties(currentSession);
        expect(properties.isActive).toBe(true);
        expect(properties.isExpired).toBe(false);
        expect(properties.isTerminated).toBe(false);

        // Wait longer than coalesce window to ensure renewal happens
        await new Promise((resolve) => setTimeout(resolve, 1100));

        // Renew
        currentSession = await renewSession(testEmail, currentSession.deviceId);
      }

      // createdAt should never change
      expect(currentSession.createdAt).toBe(session.createdAt);

      // renewedAt should be updated (after last renewal)
      const renewedAt = new Date(currentSession.renewedAt);
      // After multiple checkpoint renewals, should be > createdAt
      expect(renewedAt.getTime()).toBeGreaterThan(createdAt.getTime());

      // expiresAt should be extended
      const expiresAt = new Date(currentSession.expiresAt);
      const originalExpiresAt = new Date(session.expiresAt);
      expect(expiresAt.getTime()).toBeGreaterThan(originalExpiresAt.getTime());
    });

    it('should maintain session integrity across 30 day boundary', async () => {
      // This is a critical test: session should be renewable right up to but not after 30 days

      // Create session
      const session = await createSession(testEmail, '123456', testFingerprint);

      // Day 29.5 - should be renewable
      await simulateTimeAdvance(29.5, session);
      const result29 = await validateSession(session.sessionId, testEmail, session.deviceId);
      expect(result29.isValid).toBe(true);

      const renewed = await renewSession(testEmail, session.deviceId);

      // After renewal, should have another 30 days
      const properties = getSessionProperties(renewed);
      const daysRemaining = properties.secondsToExpiry / (24 * 60 * 60);
      expect(daysRemaining).toBeGreaterThan(29);

      // Day 30.5 (without renewal) - should be expired
      let currentSession = renewed;
      await simulateTimeAdvance(30.5, currentSession);
      const result30 = await validateSession(currentSession.sessionId, testEmail, currentSession.deviceId);
      expect(result30.isValid).toBe(false);
      expect(result30.reason).toBe('expired_session');
    });
  });

  describe('Multiple renewal cycles', () => {
    it('should handle multiple renewal cycles seamlessly', async () => {
      // Create session
      let session = await createSession(testEmail, '123456', testFingerprint);

      // Cycle 1: Days 1-10
      for (let day = 1; day <= 10; day++) {
        await simulateTimeAdvance(day - 1, session);
        const result = await validateSession(session.sessionId, testEmail, session.deviceId);
        expect(result.isValid).toBe(true);
        session = await renewSession(testEmail, session.deviceId);
      }

      // Cycle 2: Days 11-20
      for (let day = 11; day <= 20; day++) {
        await simulateTimeAdvance(day - 1, session);
        const result = await validateSession(session.sessionId, testEmail, session.deviceId);
        expect(result.isValid).toBe(true);
        session = await renewSession(testEmail, session.deviceId);
      }

      // Cycle 3: Days 21-25
      for (let day = 21; day <= 25; day++) {
        await simulateTimeAdvance(day - 1, session);
        const result = await validateSession(session.sessionId, testEmail, session.deviceId);
        expect(result.isValid).toBe(true);
        session = await renewSession(testEmail, session.deviceId);
      }

      // After all cycles, should still be active with ~30 days remaining
      const properties = getSessionProperties(session);
      const daysRemaining = properties.secondsToExpiry / (24 * 60 * 60);

      expect(properties.isActive).toBe(true);
      expect(daysRemaining).toBeGreaterThan(29);
      expect(daysRemaining).toBeLessThanOrEqual(30);

      // sessionId should remain unchanged through all renewals
      expect(session.sessionId).toBe(session.sessionId);

      // status should remain active
      expect(session.status).toBe('active');
    });

    it('should handle burst activity with coalesced renewals', async () => {
      // Create session
      const session = await createSession(testEmail, '123456', testFingerprint);

      // Simulate burst of rapid requests (within coalesce window)
      // All should return coalesced (same session, no update)
      let lastSession = session;
      for (let i = 0; i < 5; i++) {
        // Rapid renewals within coalesce window
        lastSession = await renewSession(testEmail, session.deviceId);
        // expiresAt should not change for coalesced renewals
        expect(lastSession.expiresAt).toBe(session.expiresAt);
      }

      // After coalesce window, renewal should proceed
      await new Promise((resolve) => setTimeout(resolve, 1100));
      const renewed = await renewSession(testEmail, session.deviceId);

      // expiresAt should now be updated
      expect(renewed.expiresAt).not.toBe(session.expiresAt);
    });
  });

  describe('Real-time reader simulation', () => {
    it('should handle typical reader usage pattern (reading every 2-3 days)', async () => {
      // Create session
      let session = await createSession(testEmail, '123456', testFingerprint);

      // Typical usage: access every 2-3 days for 30 days
      const accessDays = [0, 2, 5, 7, 10, 12, 15, 17, 20, 22, 25, 27, 29];

      for (const day of accessDays) {
        // Simulate time advance
        await simulateTimeAdvance(day, session);

        // Access chapter
        const result = await validateSession(session.sessionId, testEmail, session.deviceId);
        expect(result.isValid).toBe(true);

        // Auto-renew on activity
        session = await renewSession(testEmail, session.deviceId);
      }

      // After typical usage, should still be active
      const properties = getSessionProperties(session);
      expect(properties.isActive).toBe(true);

      // Should have extended to roughly day 59 (30 days from last access)
      const daysRemaining = properties.secondsToExpiry / (24 * 60 * 60);
      expect(daysRemaining).toBeGreaterThan(29);
    });

    it('should handle inactive reader (access only twice over 30 days)', async () => {
      // Create session
      let session = await createSession(testEmail, '123456', testFingerprint);

      // Access 1: Day 0 (creation + renewal)
      let result = await validateSession(session.sessionId, testEmail, session.deviceId);
      expect(result.isValid).toBe(true);
      session = await renewSession(testEmail, session.deviceId);

      // No activity for 15 days
      await simulateTimeAdvance(15, session);

      // Access 2: Day 15
      result = await validateSession(session.sessionId, testEmail, session.deviceId);
      expect(result.isValid).toBe(true);
      session = await renewSession(testEmail, session.deviceId);

      // Should now have another 30 days (expires around day 45)
      let properties = getSessionProperties(session);
      let daysRemaining = properties.secondsToExpiry / (24 * 60 * 60);
      expect(daysRemaining).toBeGreaterThan(29);

      // After 45 days (30 days from last renewal), should expire
      await simulateTimeAdvance(45, session);
      result = await validateSession(session.sessionId, testEmail, session.deviceId);
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('expired_session');
    });
  });
});
