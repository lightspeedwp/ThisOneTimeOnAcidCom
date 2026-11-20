// Unit tests for session cookie management
// RA-T029: Tests for HttpOnly, Secure, SameSite attributes
// Maps RA-005

import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateSessionId,
  createSessionCookie,
  formatSessionCookie,
  parseSessionCookie,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from '../../netlify/lib/reader-access/session-cookie';

describe('session-cookie adapter', () => {
  const mockSessionId = '550e8400-e29b-41d4-a716-446655440000';

  describe('generateSessionId', () => {
    it('generates a UUID format session ID', () => {
      const sessionId = generateSessionId();
      expect(sessionId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });

    it('generates unique IDs', () => {
      const id1 = generateSessionId();
      const id2 = generateSessionId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('createSessionCookie', () => {
    it('creates cookie with default options', () => {
      const cookie = createSessionCookie(mockSessionId);
      expect(cookie.name).toBe(SESSION_COOKIE_NAME);
      expect(cookie.value).toBe(mockSessionId);
      expect(cookie.httpOnly).toBe(true);
      expect(cookie.secure).toBe(true);
      expect(cookie.sameSite).toBe('Lax');
      expect(cookie.maxAge).toBe(SESSION_MAX_AGE_SECONDS);
    });

    it('respects custom options', () => {
      const cookie = createSessionCookie(mockSessionId, {
        secure: false,
        sameSite: 'Strict',
      });
      expect(cookie.secure).toBe(false);
      expect(cookie.sameSite).toBe('Strict');
      expect(cookie.httpOnly).toBe(true); // Default
    });

    it('sets maxAge to 30 days per RA-004', () => {
      const cookie = createSessionCookie(mockSessionId);
      expect(cookie.maxAge).toBe(30 * 24 * 60 * 60);
    });
  });

  describe('formatSessionCookie', () => {
    it('formats cookie with all required attributes', () => {
      const cookie = createSessionCookie(mockSessionId);
      const formatted = formatSessionCookie(cookie);
      expect(formatted).toContain(`${SESSION_COOKIE_NAME}=${mockSessionId}`);
      expect(formatted).toContain('HttpOnly');
      expect(formatted).toContain('Secure');
      expect(formatted).toContain('SameSite=Lax');
      expect(formatted).toContain('Max-Age=2592000'); // 30 days in seconds
      expect(formatted).toContain('Path=/');
    });

    it('respects httpOnly flag', () => {
      const cookie = createSessionCookie(mockSessionId, { httpOnly: false });
      const formatted = formatSessionCookie(cookie);
      expect(formatted).not.toContain('HttpOnly');
    });

    it('contains no email in cookie value (RA-005)', () => {
      const cookie = createSessionCookie(mockSessionId);
      const formatted = formatSessionCookie(cookie);
      expect(formatted).not.toContain('@');
    });
  });

  describe('parseSessionCookie', () => {
    it('extracts sessionId from cookie string', () => {
      const cookieHeader = `${SESSION_COOKIE_NAME}=${mockSessionId}`;
      const sessionId = parseSessionCookie(cookieHeader);
      expect(sessionId).toBe(mockSessionId);
    });

    it('returns null when reader_session cookie missing', () => {
      const cookieHeader = 'other_cookie=value';
      const sessionId = parseSessionCookie(cookieHeader);
      expect(sessionId).toBeNull();
    });

    it('returns null when no cookie header', () => {
      const sessionId = parseSessionCookie(null);
      expect(sessionId).toBeNull();
    });

    it('handles multiple cookies', () => {
      const cookieHeader = `other_cookie=value; ${SESSION_COOKIE_NAME}=${mockSessionId}; another=cookie`;
      const sessionId = parseSessionCookie(cookieHeader);
      expect(sessionId).toBe(mockSessionId);
    });

    it('handles reader_session at start of cookie string', () => {
      const cookieHeader = `${SESSION_COOKIE_NAME}=${mockSessionId}; other=value`;
      const sessionId = parseSessionCookie(cookieHeader);
      expect(sessionId).toBe(mockSessionId);
    });

    it('handles reader_session at end of cookie string', () => {
      const cookieHeader = `other=value; ${SESSION_COOKIE_NAME}=${mockSessionId}`;
      const sessionId = parseSessionCookie(cookieHeader);
      expect(sessionId).toBe(mockSessionId);
    });

    it('does not extract from cookie value (not cookie name)', () => {
      const cookieHeader = `other_cookie=${SESSION_COOKIE_NAME}-${mockSessionId}`;
      const sessionId = parseSessionCookie(cookieHeader);
      expect(sessionId).toBeNull();
    });
  });

  describe('Cookie security attributes', () => {
    it('formats cookie with HttpOnly, Secure, and SameSite for security', () => {
      const cookie = createSessionCookie(mockSessionId);
      const formatted = formatSessionCookie(cookie);

      expect(formatted).toContain('HttpOnly'); // Prevents JS access
      expect(formatted).toContain('Secure'); // HTTPS-only
      expect(formatted).toContain('SameSite=Lax'); // First-party only
    });

    it('sign-out clears server session via delete, not cookie manipulation (server-side)', () => {
      // This is tested in store.test.ts (deleteSession)
      // Cookie security ensures only server can delete via Set-Cookie with Max-Age=0
      const cookie = createSessionCookie(mockSessionId);
      expect(cookie.httpOnly).toBe(true);
      expect(cookie.secure).toBe(true);
    });
  });
});
