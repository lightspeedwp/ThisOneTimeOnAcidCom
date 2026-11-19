/**
 * Contract Tests: POST /api/reader/code-requests
 *
 * Tests the verification code request handler:
 * - Valid email → 202 request-received
 * - Mailgun failure → 502 provider-failure
 * - Rate limited → 429 limited
 * - Resend invalidates previous code
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import handler from '../../netlify/functions/reader-code-request';

// Mock Mailgun
vi.mock('@mailgun/mailgun.js', () => ({
  default: vi.fn(() => ({
    messages: {
      create: vi.fn(),
    },
  })),
}));

// Mock Netlify Blobs
vi.mock('@netlify/blobs', () => ({
  get: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

describe('POST /api/reader/code-requests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Valid email', () => {
    it('should return 202 request-received when email is valid', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-code-request', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com' }),
      });

      const response = await handler(req);

      expect(response.status).toBe(202);
      const body = await response.json();
      expect(body).toMatchObject({
        state: 'request-received',
      });
    });

    it('should store code hash (not plain code) in Blobs', async () => {
      const { put } = await import('@netlify/blobs');
      const req = new Request('http://localhost/.netlify/functions/reader-code-request', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com' }),
      });

      await handler(req);

      expect(put).toHaveBeenCalled();
      const [key, value] = vi.mocked(put).mock.calls[0];
      expect(key).toContain('code:');

      const stored = JSON.parse(value as string);
      expect(stored).toHaveProperty('codeHash');
      expect(stored).toHaveProperty('salt');
      expect(stored).toHaveProperty('expiresAt');
      expect(stored).toHaveProperty('attemptCount', 0);
      expect(stored).toHaveProperty('maxAttempts', 5);
    });

    it('should send code via Mailgun', async () => {
      const { default: Mailgun } = await import('@mailgun/mailgun.js');
      const req = new Request('http://localhost/.netlify/functions/reader-code-request', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com' }),
      });

      await handler(req);

      const mailgun = Mailgun();
      expect(mailgun.messages.create).toHaveBeenCalled();
    });

    it('should not create session or newsletter subscription', async () => {
      // Contract: code request is isolation; no side effects on other systems
      const req = new Request('http://localhost/.netlify/functions/reader-code-request', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com' }),
      });

      const response = await handler(req);
      const body = await response.json();

      expect(body).not.toHaveProperty('sessionId');
      expect(body).not.toHaveProperty('subscriptionId');
    });
  });

  describe('Provider failure (Mailgun down)', () => {
    it('should return 502 provider-failure when Mailgun is unreachable', async () => {
      const { default: Mailgun } = await import('@mailgun/mailgun.js');
      const mailgun = Mailgun();

      vi.mocked(mailgun.messages.create).mockRejectedValueOnce(
        new Error('ECONNREFUSED: Connection refused')
      );

      const req = new Request('http://localhost/.netlify/functions/reader-code-request', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com' }),
      });

      const response = await handler(req);

      expect(response.status).toBe(502);
      const body = await response.json();
      expect(body).toMatchObject({
        state: 'provider-failure',
      });
    });

    it('should not reveal email in provider-failure error', async () => {
      const { default: Mailgun } = await import('@mailgun/mailgun.js');
      const mailgun = Mailgun();

      vi.mocked(mailgun.messages.create).mockRejectedValueOnce(
        new Error('Service unavailable')
      );

      const req = new Request('http://localhost/.netlify/functions/reader-code-request', {
        method: 'POST',
        body: JSON.stringify({ email: 'secret@example.com' }),
      });

      const response = await handler(req);
      const body = await response.json();

      expect(body).not.toContain('secret@example.com');
    });
  });

  describe('Rate limiting (10 codes/day per email)', () => {
    it('should return 429 limited when email exceeds 10 codes per day', async () => {
      const { put, get } = await import('@netlify/blobs');

      // Simulate: 10 existing codes for this email
      const existingCodesKey = 'code:reader@example.com';
      vi.mocked(get).mockResolvedValueOnce(
        JSON.stringify({
          codeHash: 'old-hash',
          createdAt: new Date(Date.now() - 1000).toISOString(),
          attemptCount: 0,
        })
      );

      // After 10th request, return 429
      vi.mocked(put).mockRejectedValueOnce(
        new Error('Rate limit exceeded')
      );

      const req = new Request('http://localhost/.netlify/functions/reader-code-request', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com' }),
      });

      const response = await handler(req);

      expect(response.status).toBe(429);
      const body = await response.json();
      expect(body).toMatchObject({
        state: 'limited',
      });
    });

    it('should not reveal rate-limit details', async () => {
      // Contract: Never reveal "you've sent 10 codes today"; just say "limited"
      const req = new Request('http://localhost/.netlify/functions/reader-code-request', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com' }),
      });

      const response = await handler(req);
      const body = await response.json();

      expect(body).not.toHaveProperty('codesSentToday');
      expect(body).not.toHaveProperty('remainingAttempts');
    });
  });

  describe('Resend invalidates previous code', () => {
    it('should delete previous code when new code is requested for same email', async () => {
      const { put, get } = await import('@netlify/blobs');

      // Simulate: existing code for this email
      vi.mocked(get).mockResolvedValueOnce(
        JSON.stringify({
          codeHash: 'previous-hash',
          createdAt: new Date().toISOString(),
        })
      );

      const req = new Request('http://localhost/.netlify/functions/reader-code-request', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com' }),
      });

      await handler(req);

      // Should have called put to overwrite (or delete then put)
      expect(put).toHaveBeenCalled();
    });
  });

  describe('Invalid requests', () => {
    it('should return 400 for missing email', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-code-request', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const response = await handler(req);

      expect(response.status).toBe(400);
    });

    it('should return 400 for invalid email format', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-code-request', {
        method: 'POST',
        body: JSON.stringify({ email: 'not-an-email' }),
      });

      const response = await handler(req);

      expect(response.status).toBe(400);
    });

    it('should return 405 for GET request', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-code-request', {
        method: 'GET',
      });

      const response = await handler(req);

      expect(response.status).toBe(405);
    });
  });

  describe('Response headers', () => {
    it('should set Cache-Control: no-store', async () => {
      const req = new Request('http://localhost/.netlify/functions/reader-code-request', {
        method: 'POST',
        body: JSON.stringify({ email: 'reader@example.com' }),
      });

      const response = await handler(req);

      expect(response.headers.get('Cache-Control')).toBe('no-store');
    });
  });
});
