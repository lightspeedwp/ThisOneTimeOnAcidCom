/**
 * T020 (US1) — session validation for chapter access.
 *
 * Valid session → 200 + content · missing/expired/terminated → 401 with the
 * cookie cleared. Also covers T018 (middleware wiring) and T019 (renewal).
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('../../netlify/lib/blobs', async () => {
  const helpers = await import('./us1-test-helpers');
  const store = helpers.createMemoryStore();
  return { getStore: () => store };
});

import chapterHandler from '../../netlify/functions/reader-chapter';
import contentHandler from '../../netlify/functions/reader-chapter-content';
import sessionHandler from '../../netlify/functions/reader-session';
import { createSession, terminateSession } from '../../netlify/lib/reader-access/session-service';
import { getSessionByToken } from '../../netlify/lib/reader-access/store';
import * as middleware from '../../netlify/lib/reader-access/session-middleware';
import { memoryBlobs, uniqueEmail, getRequest } from './us1-test-helpers';

const DAY_MS = 24 * 60 * 60 * 1000;
const CHAPTER_URL = 'https://example.test/api/reader/chapters/ch-01-beginning';
const fingerprint = { userAgent: 'Mozilla/5.0', ipAddress: '203.0.113.10', timezone: 'UTC' };

async function sessionCookie(label: string) {
  const session = await createSession(uniqueEmail(label), '123456', fingerprint);
  return { session, cookie: `sessionToken=${session.sessionId}` };
}

function expectClearedCookie(res: Response) {
  expect(res.headers.get('set-cookie')).toMatch(/^sessionToken=;.*Max-Age=0/);
}

describe('T020: chapter access requires a valid session', () => {
  beforeEach(() => {
    memoryBlobs.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('valid session → 200 OK with chapter content', async () => {
    const { cookie } = await sessionCookie('t020-valid');

    const res = await chapterHandler(getRequest(CHAPTER_URL, cookie));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ state: 'verified', chapterId: 'ch-01-beginning', title: 'The Beginning' });
    expect(body.chapter).toMatchObject({ id: 'ch-01-beginning', title: 'The Beginning' });
    expect(body.content).toContain('<h1>The Beginning</h1>');
  });

  it('missing cookie → 401 Unauthorized and the cookie is cleared', async () => {
    const res = await chapterHandler(getRequest(CHAPTER_URL));

    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ error: 'unauthorized', reason: 'missing_token', action: 'reverify_email' });
    expectClearedCookie(res);
  });

  it('expired session → 401 Unauthorized', async () => {
    const { session, cookie } = await sessionCookie('t020-expired');
    vi.useFakeTimers();
    vi.setSystemTime(Date.parse(session.expiresAt) + 60_000);

    const res = await chapterHandler(getRequest(CHAPTER_URL, cookie));

    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ reason: 'expired_session' });
    expectClearedCookie(res);
  });

  it('terminated session → 401 Unauthorized', async () => {
    const { session, cookie } = await sessionCookie('t020-terminated');
    await terminateSession(session.email, session.deviceId);

    const res = await chapterHandler(getRequest(CHAPTER_URL, cookie));

    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ reason: 'terminated_session' });
    expectClearedCookie(res);
  });

  it('unknown token → 401 Unauthorized', async () => {
    const res = await chapterHandler(getRequest(CHAPTER_URL, `sessionToken=${'a'.repeat(43)}`));
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ reason: 'invalid_token' });
  });

  it('storage outage → 500 rather than granting access', async () => {
    const store = await import('../../netlify/lib/reader-access/store');
    const spy = vi.spyOn(store, 'getSessionByToken').mockRejectedValueOnce(new Error('blobs down'));

    const res = await chapterHandler(getRequest(CHAPTER_URL, `sessionToken=${'b'.repeat(43)}`));

    expect(res.status).toBe(500);
    expect(await res.json()).toMatchObject({ reason: 'storage_error' });
    spy.mockRestore();
  });

  it('unknown chapter with a valid session → 404 content-unavailable', async () => {
    const { cookie } = await sessionCookie('t020-404');
    const res = await chapterHandler(getRequest('https://example.test/api/reader/chapters/ch-99-missing', cookie));

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ state: 'content-unavailable' });
  });

  it('rejects a malformed chapter id with 400', async () => {
    const { cookie } = await sessionCookie('t020-400');
    const res = await chapterHandler(getRequest('https://example.test/api/reader/chapters/%3Cscript%3E', cookie));
    expect(res.status).toBe(400);
  });

  it('returns 405 for non-GET methods', async () => {
    const res = await chapterHandler(new Request(CHAPTER_URL, { method: 'POST' }));
    expect(res.status).toBe(405);
  });

  it('returns 503 when an unexpected error escapes the handler', async () => {
    const spy = vi.spyOn(middleware, 'authenticateRequest').mockRejectedValueOnce(new Error('boom'));
    const res = await chapterHandler(getRequest(CHAPTER_URL, 'sessionToken=x'));
    expect(res.status).toBe(503);
    spy.mockRestore();
  });

  describe('T019: chapter access renews the session', () => {
    it('moves expiry to 30 days after the access and refreshes the cookie', async () => {
      const { session, cookie } = await sessionCookie('t019');
      vi.useFakeTimers();
      const accessAt = Date.parse(session.createdAt) + 10 * DAY_MS;
      vi.setSystemTime(accessAt);

      const res = await chapterHandler(getRequest(CHAPTER_URL, cookie));
      const body = await res.json();

      expect(Date.parse(body.expiresAt)).toBe(accessAt + 30 * DAY_MS);
      expect((await getSessionByToken(session.sessionId))?.expiresAt).toBe(body.expiresAt);
      expect(res.headers.get('set-cookie')).toBe(
        `sessionToken=${session.sessionId}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000`
      );
    });

    it('coalesces renewals inside one second (no extra write)', async () => {
      const { session, cookie } = await sessionCookie('t019-coalesce');

      const res = await chapterHandler(getRequest(CHAPTER_URL, cookie));

      expect((await res.json()).renewedAt).toBe(session.renewedAt);
    });
  });

  describe('GET /api/reader/session (status, no renewal)', () => {
    it('reports a valid session without extending it', async () => {
      const { session, cookie } = await sessionCookie('status');
      vi.useFakeTimers();
      vi.setSystemTime(Date.parse(session.createdAt) + DAY_MS);

      const res = await sessionHandler(getRequest('https://example.test/api/reader/session', cookie));

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ state: 'verified', expiresAt: session.expiresAt, renewedAt: session.renewedAt });
    });

    it('returns 401 and clears the cookie without a session', async () => {
      const res = await sessionHandler(getRequest('https://example.test/api/reader/session'));
      expect(res.status).toBe(401);
      expectClearedCookie(res);
    });
  });

  describe('DELETE /api/reader/session (sign out)', () => {
    it('terminates the session, clears the cookie and blocks reuse', async () => {
      const { cookie } = await sessionCookie('signout');
      const res = await sessionHandler(
        new Request('https://example.test/api/reader/session', { method: 'DELETE', headers: { cookie } })
      );

      expect(res.status).toBe(204);
      expectClearedCookie(res);
      expect((await chapterHandler(getRequest(CHAPTER_URL, cookie))).status).toBe(401);
    });

    it('is idempotent without a cookie', async () => {
      const res = await sessionHandler(new Request('https://example.test/api/reader/session', { method: 'DELETE' }));
      expect(res.status).toBe(204);
    });

    it('rejects unsupported methods with 405', async () => {
      const res = await sessionHandler(new Request('https://example.test/api/reader/session', { method: 'PUT' }));
      expect(res.status).toBe(405);
    });
  });

  describe('reader-chapter-content uses the same session cookie', () => {
    const CONTENT_URL = 'https://example.test/api/reader/chapters/ch-01-beginning/content';

    it('serves content for a valid sessionToken cookie', async () => {
      const { cookie } = await sessionCookie('content');
      const res = await contentHandler(getRequest(CONTENT_URL, cookie), {} as never);
      expect(res.status).toBe(200);
      expect((await res.json()).chapterId).toBe('ch-01-beginning');
    });

    it('returns 401 without a session', async () => {
      const res = await contentHandler(getRequest(CONTENT_URL), {} as never);
      expect(res.status).toBe(401);
      expectClearedCookie(res);
    });
  });
});
