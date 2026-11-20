/**
 * Unit tests for session logout and termination.
 * Tests T103: terminateSession sets status and terminatedAt
 *
 * User Story 5: Secure Session Termination
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createSession, terminateSession, validateSession } from '../../netlify/lib/reader-access/session-service';
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

describe('Session Logout - T103 (US5)', () => {
  const testEmail = `reader-logout-${Date.now()}@example.com`;
  const testCode = '123456';
  const fingerprint = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    ipAddress: '192.168.1.1',
    timezone: 'UTC',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic termination', () => {
    it('should terminate active session', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      await terminateSession(testEmail, created.deviceId);

      const terminated = await getSession(testEmail, created.deviceId);
      expect(terminated?.status).toBe('terminated');
    });

    it('should set status to terminated', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      await terminateSession(testEmail, created.deviceId);

      const terminated = await getSession(testEmail, created.deviceId);
      expect(terminated?.status).toBe('terminated');
    });

    it('should set terminatedAt timestamp', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      expect(created.terminatedAt).toBeNull();

      const before = Date.now();
      await terminateSession(testEmail, created.deviceId);
      const after = Date.now();

      const terminated = await getSession(testEmail, created.deviceId);
      expect(terminated?.terminatedAt).not.toBeNull();

      if (terminated?.terminatedAt) {
        const terminatedAt = new Date(terminated.terminatedAt).getTime();
        expect(terminatedAt).toBeGreaterThanOrEqual(before);
        expect(terminatedAt).toBeLessThanOrEqual(after);
      }
    });

    it('should use ISO 8601 format for terminatedAt', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      await terminateSession(testEmail, created.deviceId);

      const terminated = await getSession(testEmail, created.deviceId);
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z?$/;
      expect(terminated?.terminatedAt).toMatch(isoRegex);
    });
  });

  describe('Preservation of other properties', () => {
    it('should preserve sessionId after termination', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const originalSessionId = created.sessionId;

      await terminateSession(testEmail, created.deviceId);
      const terminated = await getSession(testEmail, created.deviceId);

      expect(terminated?.sessionId).toBe(originalSessionId);
    });

    it('should preserve email after termination', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      await terminateSession(testEmail, created.deviceId);

      const terminated = await getSession(testEmail, created.deviceId);
      expect(terminated?.email).toBe(testEmail);
    });

    it('should preserve deviceId after termination', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const originalDeviceId = created.deviceId;

      await terminateSession(testEmail, originalDeviceId);
      const terminated = await getSession(testEmail, originalDeviceId);

      expect(terminated?.deviceId).toBe(originalDeviceId);
    });

    it('should preserve timestamps after termination', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const originalCreatedAt = created.createdAt;
      const originalExpiresAt = created.expiresAt;

      await terminateSession(testEmail, created.deviceId);
      const terminated = await getSession(testEmail, created.deviceId);

      expect(terminated?.createdAt).toBe(originalCreatedAt);
      expect(terminated?.expiresAt).toBe(originalExpiresAt);
    });
  });

  describe('Access denial after logout', () => {
    it('should validate to false after termination (T104)', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      await terminateSession(testEmail, created.deviceId);

      const result = await validateSession(created.sessionId, testEmail, created.deviceId);
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('terminated_session');
      expect(result.statusCode).toBe(401);
    });

    it('should return 401 status code for terminated session', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      await terminateSession(testEmail, created.deviceId);

      const result = await validateSession(created.sessionId, testEmail, created.deviceId);
      expect(result.statusCode).toBe(401);
    });

    it('should not allow access with terminated session token', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const sessionId = created.sessionId;

      await terminateSession(testEmail, created.deviceId);

      const result = await validateSession(sessionId, testEmail, created.deviceId);
      expect(result.isValid).toBe(false);
      expect(result.session).toBeUndefined();
    });
  });

  describe('Multiple terminations', () => {
    it('should handle terminating already-terminated session gracefully', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      await terminateSession(testEmail, created.deviceId);

      // Should not throw on second termination
      await terminateSession(testEmail, created.deviceId);

      const terminated = await getSession(testEmail, created.deviceId);
      expect(terminated?.status).toBe('terminated');
    });
  });

  describe('Error cases', () => {
    it('should throw when terminating non-existent session', async () => {
      await expect(async () => {
        await terminateSession('nonexistent@example.com', 'nonexistent-device');
      }).rejects.toThrow();
    });
  });

  describe('Timestamp accuracy', () => {
    it('should set terminatedAt within 100ms of current time', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const before = Date.now();
      await terminateSession(testEmail, created.deviceId);
      const after = Date.now();

      const terminated = await getSession(testEmail, created.deviceId);
      if (terminated?.terminatedAt) {
        const terminatedAtTime = new Date(terminated.terminatedAt).getTime();
        expect(terminatedAtTime).toBeGreaterThanOrEqual(before - 100);
        expect(terminatedAtTime).toBeLessThanOrEqual(after + 100);
      }
    });
  });
});
