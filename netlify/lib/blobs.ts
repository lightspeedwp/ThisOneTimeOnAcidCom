/**
 * Netlify Blobs storage adapter - Phase 2 Shared Layer
 *
 * Provides a unified interface to Netlify Blobs for data persistence.
 * Used by reader access, email verification, and other features that need
 * persistent storage with strong consistency guarantees.
 *
 * Strong Consistency: Netlify Blobs provides read-after-write consistency
 * within a single region, making it suitable for session management and
 * verification code storage.
 *
 * @see https://docs.netlify.com/api/get-started/#blobs
 */

import { getStore as getNetlifyStore } from '@netlify/blobs';

export interface BlobStore {
  set(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
  list?(options?: { prefix?: string }): Promise<string[]>;
}

/**
 * Get the shared Netlify Blobs store for this deployment.
 *
 * Returns a store instance with strong consistency guarantees for atomic
 * session and verification code operations.
 *
 * @returns Netlify Blobs store adapter
 * @throws Error if Netlify Blobs is unavailable
 *
 * @example
 * const store = getStore();
 * await store.set('session:user@example.com:device-123', JSON.stringify(session));
 * const session = await store.get('session:user@example.com:device-123');
 */
export function getStore(): BlobStore {
  try {
    return getNetlifyStore({ name: 'reader-access' });
  } catch (error) {
    throw new Error(
      `Failed to initialize Netlify Blobs store: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
