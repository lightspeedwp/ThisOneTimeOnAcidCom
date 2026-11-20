/**
 * Spec 005 code storage (RA-002) and the request → verify link.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

const blobs = new Map<string, string>();

// In-memory stand-in that honours `onlyIfNew` the way Netlify Blobs does.
vi.mock('@netlify/blobs', () => ({
  getStore: () => ({
    get: async (key: string) => blobs.get(key) ?? null,
    set: async (key: string, value: string, options?: { onlyIfNew?: boolean }) => {
      if (options?.onlyIfNew && blobs.has(key)) {
        return { modified: false };
      }
      blobs.set(key, value);
      return { modified: true, etag: 'etag' };
    },
    delete: async (key: string) => {
      blobs.delete(key);
    },
  }),
}));

import {
  storeCode,
  getCode,
  consumeCode,
  incrementCodeAttempts,
  storeAccessSession,
  getAccessSession,
  renewAccessSession,
  deleteAccessSession,
} from '../../netlify/lib/reader-access/code-store';
import { createVerificationCode, verifyCode } from '../../netlify/lib/reader-access/codes';

beforeEach(() => blobs.clear());

describe('createVerificationCode', () => {
  it('stores a hash of the code that is emailed', () => {
    const record = createVerificationCode('123456');
    expect(verifyCode('123456', record.codeHash, record.salt)).toBe(true);
    expect(verifyCode('654321', record.codeHash, record.salt)).toBe(false);
  });

  it('gives each issued code its own id', () => {
    expect(createVerificationCode('111111').codeId).not.toBe(createVerificationCode('111111').codeId);
  });
});

describe('code storage', () => {
  it('normalises the email so case does not create a second code', async () => {
    await storeCode('Reader@Example.com', createVerificationCode('123456'));
    expect(await getCode('reader@example.com')).not.toBeNull();
  });

  it('replaces the earlier code on resend', async () => {
    const first = createVerificationCode('111111');
    const second = createVerificationCode('222222');
    await storeCode('a@b.co', first);
    await storeCode('a@b.co', second);
    expect((await getCode('a@b.co'))?.codeId).toBe(second.codeId);
  });

  it('counts wrong attempts', async () => {
    await storeCode('a@b.co', createVerificationCode('123456'));
    await incrementCodeAttempts('a@b.co');
    expect((await getCode('a@b.co'))?.attemptCount).toBe(1);
  });
});

describe('consumeCode (RA-002)', () => {
  it('lets exactly one of two concurrent redemptions succeed', async () => {
    const record = createVerificationCode('123456');
    await storeCode('a@b.co', record);

    const results = await Promise.all([
      consumeCode('a@b.co', record.codeId),
      consumeCode('a@b.co', record.codeId),
    ]);

    expect(results.filter(Boolean)).toHaveLength(1);
    expect(await getCode('a@b.co')).toBeNull();
  });

  it('refuses a code that was already consumed', async () => {
    const record = createVerificationCode('123456');
    await storeCode('a@b.co', record);
    expect(await consumeCode('a@b.co', record.codeId)).toBe(true);
    expect(await consumeCode('a@b.co', record.codeId)).toBe(false);
  });
});

describe('access sessions', () => {
  const now = Date.now();
  const session = {
    sessionId: 'sid',
    readerId: 'hash',
    createdAt: new Date(now).toISOString(),
    renewedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + 60_000).toISOString(),
  };

  it('returns an active session and hides an expired one', async () => {
    await storeAccessSession(session);
    expect(await getAccessSession('sid')).toEqual(session);

    await storeAccessSession({ ...session, expiresAt: new Date(now - 1).toISOString() });
    expect(await getAccessSession('sid')).toBeNull();
  });

  it('renews expiry to thirty days ahead', async () => {
    await storeAccessSession(session);
    const renewed = await renewAccessSession('sid');
    const days = (new Date(renewed!.expiresAt).getTime() - Date.now()) / 86_400_000;
    expect(days).toBeGreaterThan(29.9);
    expect(days).toBeLessThanOrEqual(30);
  });

  it('ends the server session on sign-out', async () => {
    await storeAccessSession(session);
    await deleteAccessSession('sid');
    expect(await getAccessSession('sid')).toBeNull();
  });
});
