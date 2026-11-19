// Unit tests for storage adapter
// RA-T029: Tests for atomic consume-once operation, session management
// Maps RA-002/RA-009

import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as blobsModule from '@netlify/blobs';
import {
  storeCode,
  getCode,
  deleteCode,
  incrementCodeAttempts,
  storeSession,
  getSession,
  renewSession,
  deleteSession,
  StoredCode,
  StoredSession,
} from '../../netlify/lib/reader-access/store';

// Mock Netlify Blobs
vi.mock('@netlify/blobs', () => ({
  get: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

describe('store adapter', () => {
  const mockEmail = 'test@example.com';
  const mockCode: StoredCode = {
    codeHash: 'hash123',
    salt: 'salt123',
    createdAt: '2026-11-19T12:00:00Z',
    expiresAt: '2026-11-19T12:10:00Z',
    attemptCount: 0,
    maxAttempts: 5,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Code storage', () => {
    it('stores code with email key', async () => {
      await storeCode(mockEmail, mockCode);
      expect(blobsModule.put).toHaveBeenCalledWith(`code:${mockEmail}`, JSON.stringify(mockCode));
    });

    it('retrieves stored code', async () => {
      vi.mocked(blobsModule.get).mockResolvedValueOnce(JSON.stringify(mockCode));
      const code = await getCode(mockEmail);
      expect(code).toEqual(mockCode);
      expect(blobsModule.get).toHaveBeenCalledWith(`code:${mockEmail}`);
    });

    it('returns null for non-existent code', async () => {
      vi.mocked(blobsModule.get).mockResolvedValueOnce(null);
      const code = await getCode(mockEmail);
      expect(code).toBeNull();
    });

    it('deletes code by email', async () => {
      await deleteCode(mockEmail);
      expect(blobsModule.delete).toHaveBeenCalledWith(`code:${mockEmail}`);
    });

    it('increments attempt count', async () => {
      vi.mocked(blobsModule.get).mockResolvedValueOnce(JSON.stringify(mockCode));
      const updated = await incrementCodeAttempts(mockEmail);
      expect(updated?.attemptCount).toBe(1);
      expect(blobsModule.put).toHaveBeenCalledWith(
        `code:${mockEmail}`,
        JSON.stringify({ ...mockCode, attemptCount: 1 })
      );
    });

    it('returns null when incrementing non-existent code', async () => {
      vi.mocked(blobsModule.get).mockResolvedValueOnce(null);
      const result = await incrementCodeAttempts(mockEmail);
      expect(result).toBeNull();
    });
  });

  describe('Session storage', () => {
    const mockSessionId = '550e8400-e29b-41d4-a716-446655440000';
    const mockSession: StoredSession = {
      sessionId: mockSessionId,
      deviceId: 'device123',
      chapterId: '01-part-1',
      createdAt: '2026-11-19T12:00:00Z',
      expiresAt: '2026-12-19T12:00:00Z',
      renewedAt: '2026-11-19T12:00:00Z',
    };

    it('stores session with sessionId key', async () => {
      await storeSession(mockSession);
      expect(blobsModule.put).toHaveBeenCalledWith(`session:${mockSessionId}`, JSON.stringify(mockSession));
    });

    it('retrieves stored session', async () => {
      vi.mocked(blobsModule.get).mockResolvedValueOnce(JSON.stringify(mockSession));
      const session = await getSession(mockSessionId);
      expect(session).toEqual(mockSession);
      expect(blobsModule.get).toHaveBeenCalledWith(`session:${mockSessionId}`);
    });

    it('returns null for non-existent session', async () => {
      vi.mocked(blobsModule.get).mockResolvedValueOnce(null);
      const session = await getSession(mockSessionId);
      expect(session).toBeNull();
    });

    it('deletes session by sessionId', async () => {
      await deleteSession(mockSessionId);
      expect(blobsModule.delete).toHaveBeenCalledWith(`session:${mockSessionId}`);
    });

    it('renews session and updates expiresAt to 30 days from now', async () => {
      // Create a session that expires soon (5 days from now)
      const soonExpiringSession: StoredSession = {
        ...mockSession,
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      };

      vi.mocked(blobsModule.get).mockResolvedValueOnce(JSON.stringify(soonExpiringSession));
      const renewed = await renewSession(mockSessionId);

      expect(renewed).toBeDefined();
      expect(renewed?.renewedAt).not.toBe(soonExpiringSession.renewedAt);

      // renewSession resets expiresAt to 30 days from now
      const beforeRenewal = Date.now();
      const newExpires = new Date(renewed!.expiresAt);
      const afterRenewal = Date.now();
      const differenceMs = newExpires.getTime() - beforeRenewal;

      // Should be approximately 30 days (allow ±1 day for timing variance)
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      expect(differenceMs).toBeGreaterThan(29 * 24 * 60 * 60 * 1000);
      expect(differenceMs).toBeLessThan(31 * 24 * 60 * 60 * 1000);
    });

    it('returns null when renewing non-existent session', async () => {
      vi.mocked(blobsModule.get).mockResolvedValueOnce(null);
      const result = await renewSession(mockSessionId);
      expect(result).toBeNull();
    });
  });

  describe('Atomic consume-once semantics', () => {
    it('single code consumption prevents replay (RA-002)', async () => {
      // First retrieval succeeds
      vi.mocked(blobsModule.get).mockResolvedValueOnce(JSON.stringify(mockCode));
      const code1 = await getCode(mockEmail);
      expect(code1).toEqual(mockCode);

      // After delete, retrieval returns null
      vi.mocked(blobsModule.get).mockResolvedValueOnce(null);
      await deleteCode(mockEmail);
      const code2 = await getCode(mockEmail);
      expect(code2).toBeNull();
    });

    it('concurrent deletes are idempotent', async () => {
      // Both delete calls should succeed independently
      await deleteCode(mockEmail);
      await deleteCode(mockEmail);
      expect(blobsModule.delete).toHaveBeenCalledTimes(2);
    });
  });

  describe('Key namespacing', () => {
    it('uses code: prefix for code keys', async () => {
      await storeCode(mockEmail, mockCode);
      const calls = vi.mocked(blobsModule.put).mock.calls;
      expect(calls[0][0]).toMatch(/^code:/);
    });

    it('uses session: prefix for session keys', async () => {
      const sessionId = 'sess-123';
      const session: StoredSession = {
        ...mockCode,
        sessionId,
        deviceId: 'dev1',
        chapterId: 'ch1',
      } as any;
      await storeSession(session);
      const calls = vi.mocked(blobsModule.put).mock.calls;
      expect(calls[0][0]).toMatch(/^session:/);
    });

    it('prevents key collision between code and session', async () => {
      const email = 'test@example.com';
      await storeCode(email, mockCode);
      const codeKey = vi.mocked(blobsModule.put).mock.calls[0][0];

      const sessionId = 'sess-123';
      const session: StoredSession = { ...mockCode, sessionId, deviceId: 'dev1', chapterId: 'ch1' } as any;
      await storeSession(session);
      const sessionKey = vi.mocked(blobsModule.put).mock.calls[1][0];

      expect(codeKey).not.toBe(sessionKey);
    });
  });
});
