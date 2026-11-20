/**
 * Unit tests for session renewal logic.
 * Tests T082: renewSession updates expiresAt to now + 30 days
 *
 * User Story 2: 30-Day Rolling Session Renewal
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createSession, renewSession } from '../../netlify/lib/reader-access/session-service';
import { SESSION_LIFETIME_DAYS } from '../../netlify/lib/reader-access/session-config';

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

describe('Session Renewal - T082 (US2)', () => {
  const testEmail = `reader-renew-${Date.now()}@example.com`;
  const testCode = '123456';
  const fingerprint = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    ipAddress: '192.168.1.1',
    timezone: 'UTC',
  };

  // Renewals inside RENEWAL_COALESCE_WINDOW_MS (1s) are intentionally
  // skipped, so tests that expect a change step the clock past that window.
  // Only Date is faked; real timers keep async storage calls working.
  const stepPastCoalesceWindow = () => vi.setSystemTime(Date.now() + 2000);

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers({ toFake: ['Date'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Basic renewal', () => {
    it('should renew active session', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const renewed = await renewSession(testEmail, created.deviceId);

      expect(renewed).not.toBeNull();
      expect(renewed.sessionId).toBe(created.sessionId);
      expect(renewed.email).toBe(testEmail);
    });

    it('should update renewedAt timestamp on renewal', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);

      stepPastCoalesceWindow();

      const renewed = await renewSession(testEmail, created.deviceId);

      expect(renewed.renewedAt).not.toBe(created.renewedAt);
      const renewedTime = new Date(renewed.renewedAt).getTime();
      const createdTime = new Date(created.renewedAt).getTime();
      expect(renewedTime).toBeGreaterThan(createdTime);
    });

    it('should extend expiresAt to 30 days from renewal time', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const before = Date.now();
      const renewed = await renewSession(testEmail, created.deviceId);
      const after = Date.now();

      const expectedExpiry = before + SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000;
      const actualExpiry = new Date(renewed.expiresAt).getTime();

      // Allow ±1 second tolerance
      expect(Math.abs(actualExpiry - expectedExpiry)).toBeLessThan(1000);
    });

    it('should change expiresAt timestamp from original', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      stepPastCoalesceWindow();
      const renewed = await renewSession(testEmail, created.deviceId);

      expect(renewed.expiresAt).not.toBe(created.expiresAt);
      const renewedExpiry = new Date(renewed.expiresAt).getTime();
      const createdExpiry = new Date(created.expiresAt).getTime();
      expect(renewedExpiry).toBeGreaterThan(createdExpiry);
    });
  });

  describe('Multiple renewals', () => {
    it('should allow multiple consecutive renewals', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);

      const renewed1 = await renewSession(testEmail, created.deviceId);
      stepPastCoalesceWindow();

      const renewed2 = await renewSession(testEmail, created.deviceId);
      stepPastCoalesceWindow();

      const renewed3 = await renewSession(testEmail, created.deviceId);

      expect(renewed3.renewedAt).not.toBe(renewed2.renewedAt);
      expect(renewed2.renewedAt).not.toBe(renewed1.renewedAt);
    });

    it('should keep sessionId constant across renewals', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const originalSessionId = created.sessionId;

      const renewed1 = await renewSession(testEmail, created.deviceId);
      stepPastCoalesceWindow();

      const renewed2 = await renewSession(testEmail, created.deviceId);

      expect(renewed1.sessionId).toBe(originalSessionId);
      expect(renewed2.sessionId).toBe(originalSessionId);
    });

    it('should preserve email and deviceId across renewals', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);

      const renewed1 = await renewSession(testEmail, created.deviceId);
      stepPastCoalesceWindow();

      const renewed2 = await renewSession(testEmail, created.deviceId);

      expect(renewed1.email).toBe(testEmail);
      expect(renewed2.email).toBe(testEmail);
      expect(renewed1.deviceId).toBe(created.deviceId);
      expect(renewed2.deviceId).toBe(created.deviceId);
    });
  });

  describe('Status preservation', () => {
    it('should keep status as active after renewal', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const renewed = await renewSession(testEmail, created.deviceId);

      expect(renewed.status).toBe('active');
    });

    it('should keep terminatedAt as null after renewal', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const renewed = await renewSession(testEmail, created.deviceId);

      expect(renewed.terminatedAt).toBeNull();
    });
  });

  describe('Error cases', () => {
    it('should throw when renewing non-existent session', async () => {
      await expect(async () => {
        await renewSession('nonexistent@example.com', 'nonexistent-device');
      }).rejects.toThrow();
    });

    it('should throw when renewing terminated session', async () => {
      const { terminateSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );
      const created = await createSession(testEmail, testCode, fingerprint);
      await terminateSession(testEmail, created.deviceId);

      await expect(async () => {
        await renewSession(testEmail, created.deviceId);
      }).rejects.toThrow();
    });
  });

  describe('Timestamp format', () => {
    it('should use ISO 8601 format for renewedAt', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const renewed = await renewSession(testEmail, created.deviceId);

      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z?$/;
      expect(renewed.renewedAt).toMatch(isoRegex);
    });

    it('should use ISO 8601 format for expiresAt', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const renewed = await renewSession(testEmail, created.deviceId);

      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z?$/;
      expect(renewed.expiresAt).toMatch(isoRegex);
    });
  });
});
