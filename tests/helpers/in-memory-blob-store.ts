/**
 * In-memory stand-in for `netlify/lib/blobs` in Vitest suites.
 *
 * It mirrors the `@netlify/blobs` behaviour the session layer depends on:
 * `list({ prefix })` filters keys by prefix and resolves to
 * `{ blobs: [{ key, etag }], directories }`, not to a bare array of keys.
 *
 * Usage (vi.mock factories are hoisted, so import the helper inside them):
 *
 *   vi.mock('../../netlify/lib/blobs', async () =>
 *     (await import('../helpers/in-memory-blob-store')).inMemoryBlobsModule()
 *   );
 *
 * Call `resetInMemoryBlobStore()` in `beforeEach` to isolate tests.
 */

import type { BlobListResult, BlobStore } from '../../netlify/lib/blobs';

const entries = new Map<string, string>();

const store: BlobStore = {
  async get(key) {
    return entries.has(key) ? (entries.get(key) as string) : null;
  },
  async set(key, value) {
    entries.set(key, value);
  },
  async delete(key) {
    entries.delete(key);
  },
  async list(options = {}): Promise<BlobListResult> {
    const prefix = options.prefix ?? '';
    const blobs = Array.from(entries.keys())
      .filter((key) => key.startsWith(prefix))
      .map((key) => ({ key, etag: `"${key.length}-${entries.get(key)?.length ?? 0}"` }));
    return { blobs, directories: [] };
  },
};

/** Remove every entry from the shared in-memory store. */
export function resetInMemoryBlobStore(): void {
  entries.clear();
}

/** Module shape matching `netlify/lib/blobs`, for use as a vi.mock factory result. */
export function inMemoryBlobsModule(): { getStore: () => BlobStore } {
  return { getStore: () => store };
}
