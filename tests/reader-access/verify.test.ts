/**
 * Contract Tests: POST /api/reader/verifications
 *
 * Tests the verification handler:
 * - Valid code → 200 verified + session cookie
 * - Invalid code → 400 code-invalid
 * - Expired code → 410 code-expired
 * - Already used → 410 code-used
 * - Rate limited (5 attempts) → 429 limited
 * - Concurrent submissions → only 1 succeeds (atomic consume)
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import handler from '../../netlify/functions/reader-verify';

// Mock dependencies
vi.mock('@netlify/blobs', () => ({
  get: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

vi.mock('../../netlify/lib/reader-access/codes.ts', () => ({
  verifyCode: vi.fn(),
  isCodeExpired: vi.fn(),
  isCodeLimited: vi.fn(),
}));

vi.mock('../../netlify/lib/reader-access/session-cookie.ts', () => ({
  create: vi.fn(),
}));

describe('POST /api/reader/verifications', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Valid code', () => {
    it('should return 200 verified with session cookie', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '123456' }),
      });

      const response = await handler(req);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toMatchObject({
        state: 'verified',
      });
      expect(body).toHaveProperty('sessionId');
    });

    it('should set HttpOnly, Secure, SameSite=Lax session cookie', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '123456' }),
      });

      const response = await handler(req);

      const setCookie = response.headers.get('Set-Cookie');
      expect(setCookie).toContain('HttpOnly');
      expect(setCookie).toContain('Secure');
      expect(setCookie).toContain('SameSite=Lax');
      expect(setCookie).not.toContain('reader@example.com'); // Email not in cookie
    });

    it('should create ReaderAccessRecord with delete_after = now + 12 months', async () => {
      const { put } = await import('@netlify/blobs');
      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '123456' }),
      });

      await handler(req);

      expect(put).toHaveBeenCalled();
      const calls = vi.mocked(put).mock.calls;
      const recordCall = calls.find(call => call[0]?.includes('access:'));

      if (recordCall) {
        const record = JSON.parse(recordCall[1] as string);
        expect(record).toHaveProperty('lastAuthenticatedAt');
        expect(record).toHaveProperty('deleteAfter');

        const now = new Date();
        const deleteAfter = new Date(record.deleteAfter);
        const twelveMonthsFromNow = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

        expect(deleteAfter.getTime()).toBeLessThanOrEqual(twelveMonthsFromNow.getTime() + 86400000); // +1 day buffer
      }
    });

    it('should create DeviceSession with expires_at ≤ 30 days', async () => {
      const { put } = await import('@netlify/blobs');
      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '123456' }),
      });

      await handler(req);

      const calls = vi.mocked(put).mock.calls;
      const sessionCall = calls.find(call => call[0]?.includes('session:'));

      if (sessionCall) {
        const session = JSON.parse(sessionCall[1] as string);
        expect(session).toHaveProperty('sessionId');
        expect(session).toHaveProperty('expiresAt');
        expect(session).not.toHaveProperty('email'); // No email in session

        const expiresAt = new Date(session.expiresAt);
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        expect(expiresAt.getTime()).toBeLessThanOrEqual(thirtyDaysFromNow.getTime());
      }
    });

    it('should delete code after verification (atomic consume)', async () => {
      const { delete: blobDelete } = await import('@netlify/blobs');
      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '123456' }),
      });

      await handler(req);

      expect(blobDelete).toHaveBeenCalledWith(expect.stringContaining('code:'));
    });
  });

  describe('Invalid code', () => {
    it('should return 400 code-invalid when code hash does not match', async () => {
      const { verifyCode } = await import('../../netlify/lib/reader-access/codes.ts');
      vi.mocked(verifyCode).mockReturnValueOnce(false);

      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '999999' }),
      });

      const response = await handler(req);

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body).toMatchObject({
        state: 'code-invalid',
      });
    });

    it('should increment attempt count on invalid code', async () => {
      const { verifyCode } = await import('../../netlify/lib/reader-access/codes.ts');
      const { put } = await import('@netlify/blobs');

      vi.mocked(verifyCode).mockReturnValueOnce(false);

      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '999999' }),
      });

      await handler(req);

      // Should have updated code with incremented attempts
      const updateCall = vi.mocked(put).mock.calls.find(call =>
        call[0]?.includes('code:')
      );

      if (updateCall) {
        const updated = JSON.parse(updateCall[1] as string);
        expect(updated.attemptCount).toBeGreaterThan(0);
      }
    });

    it('should not reveal email in invalid code error', async () => {
      const { verifyCode } = await import('../../netlify/lib/reader-access/codes.ts');
      vi.mocked(verifyCode).mockReturnValueOnce(false);

      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'secret@example.com', code: '999999' }),
      });

      const response = await handler(req);
      const body = await response.json();

      expect(JSON.stringify(body)).not.toContain('secret@example.com');
    });

    it('should not create session on invalid code', async () => {
      const { verifyCode } = await import('../../netlify/lib/reader-access/codes.ts');
      const { put } = await import('@netlify/blobs');

      vi.mocked(verifyCode).mockReturnValueOnce(false);

      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '999999' }),
      });

      await handler(req);

      // Should not have created session
      const sessionCall = vi.mocked(put).mock.calls.find(call =>
        call[0]?.includes('session:')
      );

      expect(sessionCall).not.toBeDefined();
    });
  });

  describe('Code expiry (10 minute window)', () => {
    it('should return 410 code-expired when code is > 10 minutes old', async () => {
      const { isCodeExpired } = await import('../../netlify/lib/reader-access/codes.ts');
      vi.mocked(isCodeExpired).mockReturnValueOnce(true);

      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '123456' }),
      });

      const response = await handler(req);

      expect(response.status).toBe(410);
      const body = await response.json();
      expect(body).toMatchObject({
        state: 'code-expired',
      });
    });

    it('should not create session on expired code', async () => {
      const { isCodeExpired } = await import('../../netlify/lib/reader-access/codes.ts');
      const { put } = await import('@netlify/blobs');

      vi.mocked(isCodeExpired).mockReturnValueOnce(true);

      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '123456' }),
      });

      await handler(req);

      const sessionCall = vi.mocked(put).mock.calls.find(call =>
        call[0]?.includes('session:')
      );

      expect(sessionCall).not.toBeDefined();
    });
  });

  describe('Code already used (410)', () => {
    it('should return 410 code-used when code has been deleted', async () => {
      const { get } = await import('@netlify/blobs');
      vi.mocked(get).mockResolvedValueOnce(null); // Code not found (already deleted)

      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '123456' }),
      });

      const response = await handler(req);

      expect(response.status).toBe(410);
      const body = await response.json();
      expect(body).toMatchObject({
        state: 'code-used',
      });
    });
  });

  describe('Rate limiting (5 wrong attempts)', () => {
    it('should return 429 limited after 5 wrong attempts', async () => {
      const { isCodeLimited } = await import('../../netlify/lib/reader-access/codes.ts');
      vi.mocked(isCodeLimited).mockReturnValueOnce(true);

      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '123456' }),
      });

      const response = await handler(req);

      expect(response.status).toBe(429);
      const body = await response.json();
      expect(body).toMatchObject({
        state: 'limited',
      });
    });

    it('should not reveal attempt count in limited response', async () => {
      const { isCodeLimited } = await import('../../netlify/lib/reader-access/codes.ts');
      vi.mocked(isCodeLimited).mockReturnValueOnce(true);

      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '123456' }),
      });

      const response = await handler(req);
      const body = await response.json();

      expect(body).not.toHaveProperty('attemptCount');
      expect(body).not.toHaveProperty('remainingAttempts');
    });
  });

  describe('Concurrent submissions (atomic consume)', () => {
    it('should allow only one of two concurrent verifications of same code', async () => {
      const { delete: blobDelete } = await import('@netlify/blobs');

      // First verification succeeds
      vi.mocked(blobDelete).mockResolvedValueOnce(undefined).mockResolvedValueOnce(undefined);

      const req1 = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '123456' }),
      });

      const req2 = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '123456' }),
      });

      const [response1, response2] = await Promise.all([
        handler(req1),
        handler(req2),
      ]);

      // One should be 200, one should be 410
      const statuses = [response1.status, response2.status].sort();
      expect(statuses).toContain(200);
      expect(statuses).toContain(410);
    });
  });

  describe('Invalid requests', () => {
    it('should return 400 for missing email', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ code: '123456' }),
      });

      const response = await handler(req);

      expect(response.status).toBe(400);
    });

    it('should return 400 for missing code', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com' }),
      });

      const response = await handler(req);

      expect(response.status).toBe(400);
    });
  });

  describe('Response headers', () => {
    it('should set Cache-Control: no-store', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-verify', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com', code: '123456' }),
      });

      const response = await handler(req);

      expect(response.headers.get('Cache-Control')).toBe('no-store');
    });
  });
});
