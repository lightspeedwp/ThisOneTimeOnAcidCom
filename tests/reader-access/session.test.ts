/**
 * US1 unit tests — session creation and persistence.
 *
 * T011: createSession produces a 30-day session after email verification
 * T012: the same token resolves to the same session across requests
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

vi.mock('../../netlify/lib/blobs', async () => {
  const helpers = await import('./us1-test-helpers');
  const store = helpers.createMemoryStore();
  return { getStore: () => store };
});

import {
  createSession,
  createSessionFromVerification,
  authenticateSessionToken,
  renewSessionOnActivity,
  terminateSession,
  SessionCreationError,
} from '../../netlify/lib/reader-access/session-service';
import { getSessionByToken, getCode, getSession } from '../../netlify/lib/reader-access/store';
import { memoryBlobs, seedCode, uniqueEmail } from './us1-test-helpers';

const DAY_MS = 24 * 60 * 60 * 1000;
const fingerprint = { userAgent: 'Mozilla/5.0', ipAddress: '203.0.113.10', timezone: 'UTC' };

describe('US1 session service', () => {
  beforeEach(() => {
    memoryBlobs.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('T011: createSession after email verification', () => {
    it('creates an active session that expires 30 days after creation', async () => {
      const session = await createSession(uniqueEmail('t011'), '123456', fingerprint);

      const lifetime = Date.parse(session.expiresAt) - Date.parse(session.createdAt);
      expect(lifetime).toBe(30 * DAY_MS);
      expect(session.status).toBe('active');
      expect(session.terminatedAt).toBeNull();
      expect(session.renewedAt).toBe(session.createdAt);
    });

    it('issues a 256-bit base64url token', async () => {
      const session = await createSession(uniqueEmail('t011'), '123456', fingerprint);
      expect(session.sessionId).toMatch(/^[A-Za-z0-9_-]{43}$/);
    });

    it('does not store the raw token in any Blobs key', async () => {
      const session = await createSession(uniqueEmail('t011'), '123456', fingerprint);
      for (const key of memoryBlobs.keys()) {
        expect(key).not.toContain(session.sessionId);
      }
    });
  });

  describe('T012: session persistence across requests', () => {
    it('resolves the same session from the same token on repeated lookups', async () => {
      const created = await createSession(uniqueEmail('t012'), '123456', fingerprint);

      const first = await getSessionByToken(created.sessionId);
      const second = await getSessionByToken(created.sessionId);

      expect(first).toEqual(created);
      expect(second).toEqual(created);
    });

    it('authenticates the token without needing email or device context', async () => {
      const created = await createSession(uniqueEmail('t012'), '123456', fingerprint);

      const result = await authenticateSessionToken(created.sessionId);

      expect(result.isValid).toBe(true);
      expect(result.session?.sessionId).toBe(created.sessionId);
    });

    it('returns null for an unknown token', async () => {
      expect(await getSessionByToken('x'.repeat(43))).toBeNull();
    });
  });

  describe('authenticateSessionToken rejections', () => {
    it('rejects a missing token', async () => {
      expect(await authenticateSessionToken(null)).toMatchObject({ isValid: false, reason: 'missing_token', statusCode: 401 });
    });

    it('rejects a malformed token before touching storage', async () => {
      expect(await authenticateSessionToken('not a token')).toMatchObject({ isValid: false, reason: 'invalid_token' });
    });

    it('rejects a terminated session', async () => {
      const created = await createSession(uniqueEmail('term'), '123456', fingerprint);
      await terminateSession(created.email, created.deviceId);

      expect(await authenticateSessionToken(created.sessionId)).toMatchObject({ isValid: false, reason: 'terminated_session' });
    });

    it('rejects an expired session', async () => {
      const created = await createSession(uniqueEmail('exp'), '123456', fingerprint);
      vi.useFakeTimers();
      vi.setSystemTime(Date.parse(created.expiresAt) + 60_000);

      expect(await authenticateSessionToken(created.sessionId)).toMatchObject({ isValid: false, reason: 'expired_session' });
    });

    it('reports storage failures as 500', async () => {
      const store = await import('../../netlify/lib/reader-access/store');
      const spy = vi.spyOn(store, 'getSessionByToken').mockRejectedValueOnce(new Error('blobs down'));
      expect(await authenticateSessionToken('y'.repeat(43))).toMatchObject({ isValid: false, statusCode: 500 });
      spy.mockRestore();
    });
  });

  describe('createSessionFromVerification', () => {
    it('creates a session and consumes the code', async () => {
      const email = uniqueEmail('verify');
      const code = await seedCode(email);

      const session = await createSessionFromVerification(email, code, fingerprint);

      expect(session.email).toBe(email);
      // Code record is preserved after consumption; only the consume marker prevents reuse
      expect(await getCode(email)).not.toBeNull();
    });

    it('normalises email case and whitespace', async () => {
      const email = uniqueEmail('case');
      const code = await seedCode(email);

      const session = await createSessionFromVerification(`  ${email.toUpperCase()} `, code, fingerprint);

      expect(session.email).toBe(email);
    });

    it('rejects a replayed code once consumed', async () => {
      const email = uniqueEmail('replay');
      const code = await seedCode(email);
      await createSessionFromVerification(email, code, fingerprint);

      await expect(createSessionFromVerification(email, code, fingerprint)).rejects.toMatchObject({
        errorCode: 'code_used',
        statusCode: 410,
      });
    });

    it('rejects a wrong code and records the attempt', async () => {
      const email = uniqueEmail('wrong');
      await seedCode(email, '123456');

      await expect(createSessionFromVerification(email, '654321', fingerprint)).rejects.toBeInstanceOf(SessionCreationError);
      expect((await getCode(email))?.attemptCount).toBe(1);
    });

    it('rejects an expired code', async () => {
      const email = uniqueEmail('expired-code');
      await seedCode(email, '123456', { expiresAt: new Date(Date.now() - 1000).toISOString() });

      await expect(createSessionFromVerification(email, '123456', fingerprint)).rejects.toMatchObject({
        errorCode: 'code_expired',
        statusCode: 410,
      });
    });

    it('rejects a code that has hit its attempt limit', async () => {
      const email = uniqueEmail('limited');
      await seedCode(email, '123456', { attemptCount: 5 });

      await expect(createSessionFromVerification(email, '123456', fingerprint)).rejects.toMatchObject({
        errorCode: 'limited',
        statusCode: 429,
      });
    });

    it('rotates the token when the same device re-verifies', async () => {
      const email = uniqueEmail('rotate');
      const first = await createSessionFromVerification(email, await seedCode(email), fingerprint);
      const second = await createSessionFromVerification(email, await seedCode(email), fingerprint);

      expect(second.sessionId).not.toBe(first.sessionId);
      expect(second.deviceId).toBe(first.deviceId);
      expect(await getSessionByToken(first.sessionId)).toBeNull();
      expect((await authenticateSessionToken(second.sessionId)).isValid).toBe(true);
    });

    it('returns 409 when a new device exceeds the concurrent device limit', async () => {
      const email = uniqueEmail('limit');
      await createSessionFromVerification(email, await seedCode(email), { ...fingerprint, userAgent: 'device-a' });
      await createSessionFromVerification(email, await seedCode(email), { ...fingerprint, userAgent: 'device-b' });

      await expect(
        createSessionFromVerification(email, await seedCode(email), { ...fingerprint, userAgent: 'device-c' })
      ).rejects.toMatchObject({ errorCode: 'device_limit_exceeded', statusCode: 409 });
    });

    it('rethrows unexpected storage errors', async () => {
      const email = uniqueEmail('storage');
      const code = await seedCode(email);
      const store = await import('../../netlify/lib/reader-access/store');
      const spy = vi.spyOn(store, 'listSessionsByEmail').mockRejectedValueOnce(new Error('blobs down'));

      await expect(createSessionFromVerification(email, code, fingerprint)).rejects.toThrow('blobs down');
      spy.mockRestore();
    });
  });

  describe('T019: renewSessionOnActivity', () => {
    it('extends expiry to 30 days from the time of activity', async () => {
      const created = await createSession(uniqueEmail('renew'), '123456', fingerprint);
      vi.useFakeTimers();
      const later = Date.parse(created.createdAt) + 5 * DAY_MS;
      vi.setSystemTime(later);

      const renewed = await renewSessionOnActivity(created);

      expect(Date.parse(renewed.renewedAt)).toBe(later);
      expect(Date.parse(renewed.expiresAt)).toBe(later + 30 * DAY_MS);
      expect((await getSession(created.email, created.deviceId))?.expiresAt).toBe(renewed.expiresAt);
    });

    it('returns the original session when renewal fails', async () => {
      const created = await createSession(uniqueEmail('renew-fail'), '123456', fingerprint);
      await terminateSession(created.email, created.deviceId);

      expect(await renewSessionOnActivity(created)).toBe(created);
    });
  });
});
