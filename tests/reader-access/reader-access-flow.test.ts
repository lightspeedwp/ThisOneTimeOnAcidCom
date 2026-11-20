/**
 * US1 end-to-end journey (T014–T016), driven through the real handlers.
 *
 * tasks.md names tests/e2e/reader-access.spec.ts, but files there are not
 * collected by Vitest (*.test.ts only) or Playwright (testDir ./e2e), so they
 * never run. This file exercises the same journey at the HTTP-handler level:
 * request code → verify → read chapter, then a new tab and a page refresh.
 * Only the outbound mail provider is stubbed (to capture the emailed code).
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

const sentCodes = new Map<string, string>();

vi.mock('../../netlify/lib/blobs', async () => {
  const helpers = await import('./us1-test-helpers');
  const store = helpers.createMemoryStore();
  return { getStore: () => store };
});

vi.mock('../../netlify/lib/reader-access/mailer', () => ({
  MailgunMailer: class {
    async sendVerificationCode(email: string, code: string) {
      sentCodes.set(email, code);
      return { status: 'accepted' };
    }
  },
}));

import codeRequestHandler from '../../netlify/functions/reader-code-request';
import verifyHandler from '../../netlify/functions/reader-verify';
import chapterHandler from '../../netlify/functions/reader-chapter';
import { memoryBlobs, uniqueEmail, jsonRequest, getRequest, cookieFrom } from './us1-test-helpers';

const BASE = 'https://example.test';
const CHAPTER_URL = `${BASE}/api/reader/chapters/ch-01-beginning`;

/** Steps 1–2 of the journey: request a code, then verify the emailed code. */
async function verifyReader(email: string): Promise<string> {
  const requested = await codeRequestHandler(jsonRequest(`${BASE}/api/reader/code-requests`, { email }));
  expect(requested.status).toBe(202);

  const code = sentCodes.get(email);
  expect(code).toMatch(/^\d{6}$/);

  const verified = await verifyHandler(jsonRequest(`${BASE}/api/reader/verifications`, { email, code }));
  expect(verified.status).toBe(201);
  return cookieFrom(verified);
}

describe('US1 journey: seamless chapter access after email verification', () => {
  beforeEach(() => {
    memoryBlobs.clear();
    sentCodes.clear();
  });

  it('T014: verify email → chapter opens with no further login prompt', async () => {
    const cookie = await verifyReader(uniqueEmail('t014'));

    const res = await chapterHandler(getRequest(CHAPTER_URL, cookie));

    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ state: 'verified', title: 'The Beginning' });
  });

  it('T014: the emailed code is the one that verifies (regression)', async () => {
    const email = uniqueEmail('t014-code');
    await codeRequestHandler(jsonRequest(`${BASE}/api/reader/code-requests`, { email }));
    const wrong = sentCodes.get(email) === '000000' ? '111111' : '000000';

    const res = await verifyHandler(jsonRequest(`${BASE}/api/reader/verifications`, { email, code: wrong }));
    expect(res.status).toBe(401);
  });

  it('T015: a new tab sends the same cookie and the session is recognised', async () => {
    const cookie = await verifyReader(uniqueEmail('t015'));
    await chapterHandler(getRequest(CHAPTER_URL, cookie));

    // New tab: independent request, same browser cookie jar
    const otherChapter = await chapterHandler(getRequest(`${BASE}/api/reader/chapters/ch-02-journey`, cookie));

    expect(otherChapter.status).toBe(200);
    expect(await otherChapter.json()).toMatchObject({ chapterId: 'ch-02-journey' });
  });

  it('T016: refreshing the page keeps the session and the chapter visible', async () => {
    const cookie = await verifyReader(uniqueEmail('t016'));
    const first = await chapterHandler(getRequest(CHAPTER_URL, cookie));

    // The browser stores the refreshed cookie from the first load and resends it
    const refreshedCookie = cookieFrom(first);
    const reload = await chapterHandler(getRequest(CHAPTER_URL, refreshedCookie));

    expect(refreshedCookie).toBe(cookie);
    expect(reload.status).toBe(200);
    expect((await reload.json()).content).toContain('The Beginning');
  });

  it('without verifying, the chapter asks the reader to verify', async () => {
    const res = await chapterHandler(getRequest(CHAPTER_URL));
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ state: 'request-pending', action: 'reverify_email' });
  });
});
