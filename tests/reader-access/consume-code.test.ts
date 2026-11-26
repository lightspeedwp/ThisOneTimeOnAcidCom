/**
 * Spec 005 RA-002: a verification code is consumed at most once, atomically.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../../netlify/lib/blobs', async () => {
  const helpers = await import('./us1-test-helpers');
  const store = helpers.createMemoryStore();
  return { getStore: () => store };
});

import { consumeCode, getCode } from '../../netlify/lib/reader-access/store';
import { memoryBlobs, seedCode, uniqueEmail } from './us1-test-helpers';

describe('consumeCode (RA-002)', () => {
  beforeEach(() => memoryBlobs.clear());

  it('consumes a code once and deletes it', async () => {
    const email = uniqueEmail('consume');
    await seedCode(email);
    const { codeHash } = (await getCode(email))!;

    expect(await consumeCode(email, codeHash)).toBe(true);
    expect(await getCode(email)).toBeNull();
    expect(await consumeCode(email, codeHash)).toBe(false);
  });

  it('lets exactly one of two concurrent calls win', async () => {
    const email = uniqueEmail('consume-race');
    await seedCode(email);
    const { codeHash } = (await getCode(email))!;

    const results = await Promise.all([consumeCode(email, codeHash), consumeCode(email, codeHash)]);
    expect(results.filter(Boolean)).toHaveLength(1);
  });

  it('keys the marker by a hash, never the stored code hash itself', async () => {
    const email = uniqueEmail('consume-key');
    await seedCode(email);
    const { codeHash } = (await getCode(email))!;
    await consumeCode(email, codeHash);

    const markers = [...memoryBlobs.keys()].filter((k) => k.startsWith('code-consumed:'));
    expect(markers).toHaveLength(1);
    expect(markers[0]).toMatch(/^code-consumed:[0-9a-f]{64}$/);
  });
});
