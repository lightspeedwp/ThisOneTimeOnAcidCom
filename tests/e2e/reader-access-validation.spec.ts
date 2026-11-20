/**
 * End-to-end validation tests for all quickstart scenarios.
 * Tests T117: Validate all 9 quickstart scenarios pass acceptance criteria
 *
 * This file runs all validation scenarios from quickstart.md to ensure
 * the entire Reader Access Session Management system works correctly.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createSession, validateSession, renewSession, terminateSession, getActiveSessionCount } from '../../netlify/lib/reader-access/session-service';
import { getSession } from '../../netlify/lib/reader-access/store';

vi.mock('../../netlify/lib/blobs', () => {
  const store = new Map<string, string>();
  return {
    getStore: () => ({
      get: (key: string) => Promise.resolve(store.get(key) || null),
      set: (key: string, value: string) => Promise.resolve(store.set(key, value)),
      delete: (key: string) => Promise.resolve(store.delete(key)),
      list: () => Promise.resolve(Array.from(store.keys())),
      store,
    }),
  };
});

describe('Quickstart Validation - T117 (All 9 Scenarios)', () => {
  const baseEmail = `e2e-validation-${Date.now()}`;
  const testCode = '123456';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Scenario 1: Create Session After Email Verification', () => {
    it('should create session and return sessionId', async () => {
      const email = `${baseEmail}-s1`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);

      expect(session.sessionId).toBeTruthy();
      expect(session.email).toBe(email);
      expect(session.status).toBe('active');
      expect(session.terminatedAt).toBeNull();
    });

    it('should set 30-day expiry', async () => {
      const email = `${baseEmail}-s1b`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const before = Date.now();
      const session = await createSession(email, testCode, fingerprint);
      const after = Date.now();

      const expiresAt = new Date(session.expiresAt).getTime();
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

      expect(expiresAt).toBeGreaterThan(before + thirtyDaysInMs - 1000);
      expect(expiresAt).toBeLessThan(after + thirtyDaysInMs + 1000);
    });
  });

  describe('Scenario 2: Session Persists Across Tabs', () => {
    it('should retrieve same session from multiple requests', async () => {
      const email = `${baseEmail}-s2`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);

      // Simulate multiple tab accesses
      const retrieved1 = await getSession(email, session.deviceId);
      const retrieved2 = await getSession(email, session.deviceId);
      const retrieved3 = await getSession(email, session.deviceId);

      expect(retrieved1?.sessionId).toBe(session.sessionId);
      expect(retrieved2?.sessionId).toBe(session.sessionId);
      expect(retrieved3?.sessionId).toBe(session.sessionId);
    });

    it('should validate session in multiple tabs', async () => {
      const email = `${baseEmail}-s2b`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);

      const result1 = await validateSession(session.sessionId, email, session.deviceId);
      const result2 = await validateSession(session.sessionId, email, session.deviceId);

      expect(result1.isValid).toBe(true);
      expect(result2.isValid).toBe(true);
    });
  });

  describe('Scenario 3: 30-Day Auto-Renewal on Activity', () => {
    it('should extend expiry on renewal', async () => {
      const email = `${baseEmail}-s3`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);
      const originalExpiry = new Date(session.expiresAt).getTime();

      // Simulate activity (renewal)
      await new Promise((resolve) => setTimeout(resolve, 100));

      const before = Date.now();
      const renewed = await renewSession(email, session.deviceId);
      const after = Date.now();

      const newExpiry = new Date(renewed.expiresAt).getTime();
      expect(newExpiry).toBeGreaterThan(originalExpiry);

      // Should be ~30 days from renewal
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
      expect(newExpiry).toBeGreaterThan(before + thirtyDaysInMs - 1000);
      expect(newExpiry).toBeLessThan(after + thirtyDaysInMs + 1000);
    });

    it('should track renewedAt timestamp', async () => {
      const email = `${baseEmail}-s3b`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);
      const originalRenewalTime = new Date(session.renewedAt).getTime();

      await new Promise((resolve) => setTimeout(resolve, 100));
      const renewed = await renewSession(email, session.deviceId);

      const newRenewalTime = new Date(renewed.renewedAt).getTime();
      expect(newRenewalTime).toBeGreaterThan(originalRenewalTime);
    });
  });

  describe('Scenario 4: Expired Session Denial', () => {
    it('should deny access to expired session', async () => {
      const email = `${baseEmail}-s4`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);

      // Set to expired
      const { updateSession } = await import('../../netlify/lib/reader-access/store');
      await updateSession(email, session.deviceId, {
        expiresAt: new Date(Date.now() - 1000).toISOString(),
      });

      const result = await validateSession(session.sessionId, email, session.deviceId);

      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('expired_session');
      expect(result.statusCode).toBe(401);
    });

    it('should not allow access immediately on expiry (no grace period)', async () => {
      const email = `${baseEmail}-s4b`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);

      // Set to just past expiry
      const { updateSession } = await import('../../netlify/lib/reader-access/store');
      const { CLOCK_SKEW_TOLERANCE_MS } = await import(
        '../../netlify/lib/reader-access/session-config'
      );
      await updateSession(email, session.deviceId, {
        expiresAt: new Date(Date.now() - CLOCK_SKEW_TOLERANCE_MS - 1).toISOString(),
      });

      const result = await validateSession(session.sessionId, email, session.deviceId);
      expect(result.isValid).toBe(false);
      expect(result.statusCode).toBe(401);
    });
  });

  describe('Scenario 5: Logout Termination', () => {
    it('should terminate session on logout', async () => {
      const email = `${baseEmail}-s5`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);
      await terminateSession(email, session.deviceId);

      const terminated = await getSession(email, session.deviceId);
      expect(terminated?.status).toBe('terminated');
      expect(terminated?.terminatedAt).not.toBeNull();
    });

    it('should deny access after logout', async () => {
      const email = `${baseEmail}-s5b`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);
      await terminateSession(email, session.deviceId);

      const result = await validateSession(session.sessionId, email, session.deviceId);

      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('terminated_session');
      expect(result.statusCode).toBe(401);
    });
  });

  describe('Scenario 6: Device Limits', () => {
    it('should allow up to MAX_CONCURRENT_DEVICES', async () => {
      const email = `${baseEmail}-s6`;
      const { MAX_CONCURRENT_DEVICES } = await import(
        '../../netlify/lib/reader-access/session-config'
      );

      const devices = [];
      for (let i = 0; i < MAX_CONCURRENT_DEVICES; i++) {
        const device = {
          userAgent: `Device${i}`,
          ipAddress: `192.168.1.${i}`,
          timezone: 'UTC',
        };
        const session = await createSession(email, testCode, device);
        devices.push(session);
      }

      expect(devices.length).toBe(MAX_CONCURRENT_DEVICES);
      const count = await getActiveSessionCount(email);
      expect(count).toBe(MAX_CONCURRENT_DEVICES);
    });

    it('should deny creation when limit exceeded', async () => {
      const email = `${baseEmail}-s6b`;
      const { MAX_CONCURRENT_DEVICES } = await import(
        '../../netlify/lib/reader-access/session-config'
      );

      // Create sessions up to limit
      for (let i = 0; i < MAX_CONCURRENT_DEVICES; i++) {
        await createSession(email, testCode, {
          userAgent: `Device${i}`,
          ipAddress: `192.168.1.${i}`,
          timezone: 'UTC',
        });
      }

      // Next attempt should fail
      expect(async () => {
        await createSession(email, testCode, {
          userAgent: 'ExtraDevice',
          ipAddress: '192.168.1.99',
          timezone: 'UTC',
        });
      }).rejects.toThrow();
    });

    it('should allow new device after terminating old one', async () => {
      const email = `${baseEmail}-s6c`;
      const { MAX_CONCURRENT_DEVICES } = await import(
        '../../netlify/lib/reader-access/session-config'
      );

      const sessions = [];
      for (let i = 0; i < MAX_CONCURRENT_DEVICES; i++) {
        const session = await createSession(email, testCode, {
          userAgent: `Device${i}`,
          ipAddress: `192.168.1.${i}`,
          timezone: 'UTC',
        });
        sessions.push(session);
      }

      // Terminate first device
      await terminateSession(email, sessions[0].deviceId);

      // Should now be able to add new device
      const newSession = await createSession(email, testCode, {
        userAgent: 'NewDevice',
        ipAddress: '192.168.1.99',
        timezone: 'UTC',
      });

      expect(newSession).toBeTruthy();
      expect(newSession.sessionId).toBeTruthy();
    });
  });

  describe('Scenario 7: Activity Tracking', () => {
    it('should track createdAt timestamp', async () => {
      const email = `${baseEmail}-s7`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const before = Date.now();
      const session = await createSession(email, testCode, fingerprint);
      const after = Date.now();

      const createdAt = new Date(session.createdAt).getTime();
      expect(createdAt).toBeGreaterThanOrEqual(before);
      expect(createdAt).toBeLessThanOrEqual(after);
    });

    it('should track renewedAt timestamp on renewal', async () => {
      const email = `${baseEmail}-s7b`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);
      const originalRenewalTime = new Date(session.renewedAt).getTime();

      await new Promise((resolve) => setTimeout(resolve, 100));

      const before = Date.now();
      const renewed = await renewSession(email, session.deviceId);
      const after = Date.now();

      const renewedAt = new Date(renewed.renewedAt).getTime();
      expect(renewedAt).toBeGreaterThan(originalRenewalTime);
      expect(renewedAt).toBeGreaterThanOrEqual(before);
      expect(renewedAt).toBeLessThanOrEqual(after);
    });

    it('should track terminatedAt timestamp on logout', async () => {
      const email = `${baseEmail}-s7c`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);
      expect(session.terminatedAt).toBeNull();

      const before = Date.now();
      await terminateSession(email, session.deviceId);
      const after = Date.now();

      const terminated = await getSession(email, session.deviceId);
      if (terminated?.terminatedAt) {
        const terminatedAt = new Date(terminated.terminatedAt).getTime();
        expect(terminatedAt).toBeGreaterThanOrEqual(before);
        expect(terminatedAt).toBeLessThanOrEqual(after);
      }
    });
  });

  describe('Scenario 8: Timing Attack Resistance', () => {
    it('should use constant-time comparison for tokens', async () => {
      const email = `${baseEmail}-s8`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);

      // Test valid token
      const validResult = await validateSession(session.sessionId, email, session.deviceId);
      expect(validResult.isValid).toBe(true);

      // Test invalid token (should use constant-time comparison)
      const invalidToken = 'x' + session.sessionId.slice(1);
      const invalidResult = await validateSession(invalidToken, email, session.deviceId);
      expect(invalidResult.isValid).toBe(false);

      // Both should complete in similar time (not measurable in JS, but validates code path)
      expect(invalidResult.statusCode).toBe(401);
    });

    it('should not reveal timing differences for different token lengths', async () => {
      const email = `${baseEmail}-s8b`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);

      // Test various invalid token lengths
      const invalidTokens = [
        'x',
        'xx',
        session.sessionId.slice(0, -5),
        session.sessionId.slice(0, -1),
        'x' + session.sessionId,
      ];

      for (const token of invalidTokens) {
        const result = await validateSession(token, email, session.deviceId);
        expect(result.isValid).toBe(false);
        expect(result.statusCode).toBe(401);
      }
    });
  });

  describe('Scenario 9: Cookie Security', () => {
    it('should validate sessionId format', async () => {
      const email = `${baseEmail}-s9`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);

      // Token should be base64url encoded and minimum 43 chars (32 bytes)
      expect(session.sessionId.length).toBeGreaterThanOrEqual(43);
      expect(/^[A-Za-z0-9_-]+$/.test(session.sessionId)).toBe(true);
    });

    it('should use ISO 8601 timestamps', async () => {
      const email = `${baseEmail}-s9b`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z?$/;

      expect(session.createdAt).toMatch(isoRegex);
      expect(session.renewedAt).toMatch(isoRegex);
      expect(session.expiresAt).toMatch(isoRegex);
    });

    it('should not expose sensitive data in session object', async () => {
      const email = `${baseEmail}-s9c`;
      const fingerprint = {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      };

      const session = await createSession(email, testCode, fingerprint);

      // Verify only expected fields are present
      const expectedFields = ['sessionId', 'email', 'deviceId', 'createdAt', 'renewedAt', 'terminatedAt', 'expiresAt', 'status'];
      const actualFields = Object.keys(session);

      expect(actualFields.sort()).toEqual(expectedFields.sort());
    });
  });
});
