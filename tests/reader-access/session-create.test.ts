/**
 * T013 (US1) — integration test for the session creation endpoint.
 * Implements spec 005 contract: verify → 200 OK + HttpOnly session cookie
 * (contracts/reader-access-functions.md § Verify a code)
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../../netlify/lib/blobs', async () => {
  const helpers = await import('./us1-test-helpers');
  const store = helpers.createMemoryStore();
  return { getStore: () => store };
});

import createHandler from '../../netlify/functions/reader-session-create';
import verifyHandler from '../../netlify/functions/reader-verify';
import sessionHandler from '../../netlify/functions/reader-session';
import { getCode, getSessionByToken } from '../../netlify/lib/reader-access/store';
import { validateCookieSecuritySettings } from '../../netlify/lib/reader-access/session-cookie';
import * as service from '../../netlify/lib/reader-access/session-service';
import { memoryBlobs, seedCode, uniqueEmail, jsonRequest, cookieFrom } from './us1-test-helpers';

const URL_CREATE = 'https://example.test/api/reader/session';

describe('T013: POST /api/reader/session', () => {
  beforeEach(() => {
    memoryBlobs.clear();
  });

  it('returns 200 with a secure HttpOnly cookie on a valid code', async () => {
    const email = uniqueEmail('t013');
    const code = await seedCode(email);

    const res = await createHandler(jsonRequest(URL_CREATE, { email, verificationCode: code }));

    expect(res.status).toBe(200);
    const setCookie = res.headers.get('set-cookie') ?? '';
    expect(setCookie).toMatch(/^sessionToken=[A-Za-z0-9_-]{43};/);
    expect(setCookie).toContain('Max-Age=2592000');
    expect(validateCookieSecuritySettings(setCookie)).toEqual({ isValid: true, issues: [] });
  });

  it('never returns the session token in the response body', async () => {
    const email = uniqueEmail('t013');
    const res = await createHandler(jsonRequest(URL_CREATE, { email, verificationCode: await seedCode(email) }));
    const token = cookieFrom(res).split('=')[1];
    const body = await res.json();

    expect(body).toMatchObject({ state: 'verified' });
    expect(body).toHaveProperty('expiresAt');
    expect(JSON.stringify(body)).not.toContain(token);
  });

  it('stores a session the cookie token resolves to', async () => {
    const email = uniqueEmail('t013');
    const res = await createHandler(jsonRequest(URL_CREATE, { email, verificationCode: await seedCode(email) }));
    const token = cookieFrom(res).split('=')[1];

    const session = await getSessionByToken(token);
    expect(session?.email).toBe(email);
    expect(await getCode(email)).toBeNull();
  });

  it('sends no-store security headers', async () => {
    const email = uniqueEmail('t013');
    const res = await createHandler(jsonRequest(URL_CREATE, { email, verificationCode: await seedCode(email) }));

    expect(res.headers.get('cache-control')).toContain('no-store');
    expect(res.headers.get('x-content-type-options')).toBe('nosniff');
  });

  it.each([
    ['missing email', { verificationCode: '123456' }],
    ['malformed email', { email: 'not-an-email', verificationCode: '123456' }],
    ['missing code', { email: 'reader@example.com' }],
    ['non-numeric code', { email: 'reader@example.com', verificationCode: '12ab56' }],
  ])('returns 400 code-invalid for %s', async (_label, body) => {
    const res = await createHandler(jsonRequest(URL_CREATE, body));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ state: 'code-invalid' });
  });

  it('returns 400 for a body that is not JSON', async () => {
    const req = new Request(URL_CREATE, { method: 'POST', body: '{nope' });
    expect((await createHandler(req)).status).toBe(400);
  });

  it('returns 400 code-invalid for a wrong code without setting a cookie', async () => {
    const email = uniqueEmail('t013-wrong');
    await seedCode(email, '123456');

    const res = await createHandler(jsonRequest(URL_CREATE, { email, verificationCode: '000000' }));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ state: 'code-invalid' });
    expect(res.headers.get('set-cookie')).toBeNull();
  });

  it('returns 410 code-used when the same code is replayed', async () => {
    const email = uniqueEmail('t013-replay');
    const code = await seedCode(email);
    await createHandler(jsonRequest(URL_CREATE, { email, verificationCode: code }));

    const replay = await createHandler(jsonRequest(URL_CREATE, { email, verificationCode: code }));
    expect(replay.status).toBe(410);
    expect(await replay.json()).toEqual({ state: 'code-used' });
  });

  it('lets exactly one of two concurrent submissions of a code succeed (RA-002)', async () => {
    const email = uniqueEmail('t013-race');
    const code = await seedCode(email);

    const responses = await Promise.all([
      createHandler(jsonRequest(URL_CREATE, { email, verificationCode: code })),
      createHandler(jsonRequest(URL_CREATE, { email, verificationCode: code })),
    ]);

    expect(responses.map((r) => r.status).sort()).toEqual([200, 410]);
    expect(await getCode(email)).toBeNull();
  });

  it('returns 409 with a next action when the device limit is reached', async () => {
    const email = uniqueEmail('t013-limit');
    for (const ua of ['device-a', 'device-b']) {
      await createHandler(jsonRequest(URL_CREATE, { email, verificationCode: await seedCode(email) }, { 'user-agent': ua }));
    }

    const res = await createHandler(
      jsonRequest(URL_CREATE, { email, verificationCode: await seedCode(email) }, { 'user-agent': 'device-c' })
    );

    expect(res.status).toBe(409);
    expect(await res.json()).toEqual({
      state: 'device-limit-exceeded',
      action: 'select_device_to_terminate_or_reverify',
    });
  });

  it('returns 429 with Retry-After when code attempt limit is reached', async () => {
    const email = uniqueEmail('t013-rate');
    await seedCode(email, '123456');
    for (let i = 0; i < 5; i += 1) {
      await createHandler(jsonRequest(URL_CREATE, { email, verificationCode: '000000' }));
    }

    const res = await createHandler(jsonRequest(URL_CREATE, { email, verificationCode: '123456' }));

    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({ state: 'limited' });
    expect(Number(res.headers.get('retry-after'))).toBeGreaterThan(0);
  });

  it('returns 500 server_error when storage fails unexpectedly', async () => {
    const spy = vi.spyOn(service, 'createSessionFromVerification').mockRejectedValueOnce(new Error('blobs down'));
    const res = await createHandler(jsonRequest(URL_CREATE, { email: uniqueEmail('t013-500'), verificationCode: '123456' }));

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ state: 'server-error' });
    spy.mockRestore();
  });

  it('returns 405 for non-POST methods', async () => {
    const res = await createHandler(new Request(URL_CREATE, { method: 'GET' }));
    expect(res.status).toBe(405);
  });

  it('accepts { email, code } via the legacy /verifications alias', async () => {
    const email = uniqueEmail('t013-alias');
    const res = await verifyHandler(
      jsonRequest('https://example.test/api/reader/verifications', { email, code: await seedCode(email) })
    );
    expect(res.status).toBe(200);
    expect(res.headers.get('set-cookie')).toMatch(/^sessionToken=/);
  });

  it('is reachable as POST on the reader-session function', async () => {
    const email = uniqueEmail('t013-session');
    const res = await sessionHandler(jsonRequest(URL_CREATE, { email, verificationCode: await seedCode(email) }));
    expect(res.status).toBe(200);
  });
});
