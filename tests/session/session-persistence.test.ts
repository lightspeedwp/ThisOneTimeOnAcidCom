/**
 * Unit tests for session persistence.
 * Tests T079: same sessionId retrieved from storage
 *
 * User Story 1: Seamless Chapter Access After Email Verification
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createSession, validateSession } from '../../netlify/lib/reader-access/session-service';
import { getSession, updateSession } from '../../netlify/lib/reader-access/store';

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

describe('Session Persistence - T079 (US1)', () => {
  const testEmail = `reader-persist-${Date.now()}@example.com`;
  const testCode = '123456';
  const fingerprint = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    ipAddress: '192.168.1.1',
    timezone: 'UTC',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Session retrieval', () => {
    it('should retrieve same session by email and deviceId', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const retrieved = await getSession(testEmail, created.deviceId);

      expect(retrieved).not.toBeNull();
      expect(retrieved?.sessionId).toBe(created.sessionId);
    });

    it('should retrieve session with identical properties', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const retrieved = await getSession(testEmail, created.deviceId);

      expect(retrieved).toEqual(created);
    });

    it('should retrieve session for multiple consecutive requests', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const deviceId = created.deviceId;

      const retrieved1 = await getSession(testEmail, deviceId);
      const retrieved2 = await getSession(testEmail, deviceId);
      const retrieved3 = await getSession(testEmail, deviceId);

      expect(retrieved1?.sessionId).toBe(created.sessionId);
      expect(retrieved2?.sessionId).toBe(created.sessionId);
      expect(retrieved3?.sessionId).toBe(created.sessionId);
    });
  });

  describe('Session isolation', () => {
    it('should not retrieve session for different email', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const retrieved = await getSession('different@example.com', created.deviceId);

      expect(retrieved).toBeNull();
    });

    it('should not retrieve session for different deviceId', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const wrongDeviceId = 'wrong-device-id';

      const retrieved = await getSession(testEmail, wrongDeviceId);
      expect(retrieved).toBeNull();
    });

    it('should isolate sessions by email', async () => {
      const email1 = `${testEmail}-1`;
      const email2 = `${testEmail}-2`;

      const session1 = await createSession(email1, testCode, fingerprint);
      const session2 = await createSession(email2, testCode, {
        ...fingerprint,
        ipAddress: '192.168.1.2',
      });

      const retrieved1 = await getSession(email1, session1.deviceId);
      const retrieved2 = await getSession(email2, session2.deviceId);

      expect(retrieved1?.sessionId).toBe(session1.sessionId);
      expect(retrieved2?.sessionId).toBe(session2.sessionId);
      expect(retrieved1?.sessionId).not.toBe(retrieved2?.sessionId);
    });
  });

  describe('Session mutation', () => {
    it('should persist updated session properties', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);

      // Update the session
      const updatedRenewal = new Date().toISOString();
      await updateSession(testEmail, created.deviceId, {
        renewedAt: updatedRenewal,
      });

      // Retrieve and verify
      const retrieved = await getSession(testEmail, created.deviceId);
      expect(retrieved?.renewedAt).toBe(updatedRenewal);
      expect(retrieved?.sessionId).toBe(created.sessionId); // Should not change
    });

    it('should preserve other properties when updating one', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const originalSessionId = created.sessionId;

      const newExpiry = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();
      await updateSession(testEmail, created.deviceId, {
        expiresAt: newExpiry,
      });

      const retrieved = await getSession(testEmail, created.deviceId);
      expect(retrieved?.sessionId).toBe(originalSessionId);
      expect(retrieved?.email).toBe(testEmail);
      expect(retrieved?.deviceId).toBe(created.deviceId);
      expect(retrieved?.expiresAt).toBe(newExpiry);
    });
  });

  describe('Cross-request consistency', () => {
    it('should return same session across multiple async operations', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);
      const deviceId = created.deviceId;

      const [r1, r2, r3] = await Promise.all([
        getSession(testEmail, deviceId),
        getSession(testEmail, deviceId),
        getSession(testEmail, deviceId),
      ]);

      expect(r1?.sessionId).toBe(r2?.sessionId);
      expect(r2?.sessionId).toBe(r3?.sessionId);
      expect(r1?.sessionId).toBe(created.sessionId);
    });

    it('should validate same session consistently', async () => {
      const created = await createSession(testEmail, testCode, fingerprint);

      const result1 = await validateSession(created.sessionId, testEmail, created.deviceId);
      const result2 = await validateSession(created.sessionId, testEmail, created.deviceId);

      expect(result1.isValid).toBe(true);
      expect(result2.isValid).toBe(true);
      expect(result1.session?.sessionId).toBe(result2.session?.sessionId);
    });
  });

  describe('Storage key format', () => {
    it('should use deterministic key generation', async () => {
      const session1 = await createSession(testEmail, testCode, fingerprint);
      const deviceId = session1.deviceId;

      // Create another session with same fingerprint
      const session2 = await createSession(testEmail, testCode, fingerprint);

      // Should have same deviceId (deterministic fingerprint)
      expect(session2.deviceId).toBe(deviceId);

      // Should be stored at same key but overwritten
      const retrieved = await getSession(testEmail, deviceId);
      expect(retrieved?.sessionId).toBe(session2.sessionId); // Latest one
    });
  });

  describe('Null/missing session handling', () => {
    it('should return null for non-existent session', async () => {
      const retrieved = await getSession('nonexistent@example.com', 'nonexistent-device');
      expect(retrieved).toBeNull();
    });

    it('should not throw on missing session', async () => {
      expect(async () => {
        await getSession('nonexistent@example.com', 'nonexistent-device');
      }).not.toThrow();
    });
  });
});
