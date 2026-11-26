/**
 * Tests for atomic device creation lock (cross-instance coordination).
 * Verifies that the device-limit race condition is prevented by onlyIfNew
 * conditional writes in Netlify Blobs.
 *
 * T006b: Device limit enforcement across concurrent instances
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { acquireDeviceLock, releaseDeviceLock } from '../../netlify/lib/reader-access/store';

// Mock Netlify Blobs with onlyIfNew support
vi.mock('../../netlify/lib/blobs', () => {
  const store = new Map<string, string>();
  return {
    getStore: () => ({
      get: (key: string) => Promise.resolve(store.get(key) || null),
      set: (key: string, value: string, options?: { onlyIfNew?: boolean }) => {
        return Promise.resolve().then(() => {
          if (options?.onlyIfNew) {
            // Conditional write: only succeeds if key doesn't exist
            if (store.has(key)) {
              return { modified: false };
            }
            store.set(key, value);
            return { modified: true };
          }
          // Regular write
          store.set(key, value);
          return { modified: true };
        });
      },
      delete: (key: string) => Promise.resolve(store.delete(key)),
      list: () => Promise.resolve(Array.from(store.keys())),
      store,
    }),
  };
});

describe('Device Creation Lock (Cross-Instance Coordination)', () => {
  const TEST_EMAIL = 'reader-lock-test@example.com';
  const TEST_DEVICE_ID = 'lock-test-fingerprint-12345';

  afterEach(async () => {
    // Always clean up the lock after tests
    await releaseDeviceLock(TEST_EMAIL, TEST_DEVICE_ID);
  });

  it('should acquire lock when first called', async () => {
    const acquired = await acquireDeviceLock(TEST_EMAIL, TEST_DEVICE_ID);
    expect(acquired).toBe(true);
  });

  it('should fail to acquire lock when already held', async () => {
    // First acquisition should succeed
    const first = await acquireDeviceLock(TEST_EMAIL, TEST_DEVICE_ID);
    expect(first).toBe(true);

    // Second acquisition should fail (lock already held)
    const second = await acquireDeviceLock(TEST_EMAIL, TEST_DEVICE_ID);
    expect(second).toBe(false);
  });

  it('should allow re-acquiring lock after release', async () => {
    // First acquisition
    const first = await acquireDeviceLock(TEST_EMAIL, TEST_DEVICE_ID);
    expect(first).toBe(true);

    // Release
    await releaseDeviceLock(TEST_EMAIL, TEST_DEVICE_ID);

    // Second acquisition should now succeed
    const second = await acquireDeviceLock(TEST_EMAIL, TEST_DEVICE_ID);
    expect(second).toBe(true);
  });

  it('should use separate locks for different device IDs', async () => {
    const deviceId1 = 'device-1-fingerprint';
    const deviceId2 = 'device-2-fingerprint';

    try {
      // Both devices should be able to acquire locks independently
      const lock1 = await acquireDeviceLock(TEST_EMAIL, deviceId1);
      const lock2 = await acquireDeviceLock(TEST_EMAIL, deviceId2);

      expect(lock1).toBe(true);
      expect(lock2).toBe(true);
    } finally {
      await releaseDeviceLock(TEST_EMAIL, deviceId1);
      await releaseDeviceLock(TEST_EMAIL, deviceId2);
    }
  });

  it('should use separate locks for different emails', async () => {
    const email1 = 'email1-lock@example.com';
    const email2 = 'email2-lock@example.com';

    try {
      // Both emails should be able to acquire locks independently
      const lock1 = await acquireDeviceLock(email1, TEST_DEVICE_ID);
      const lock2 = await acquireDeviceLock(email2, TEST_DEVICE_ID);

      expect(lock1).toBe(true);
      expect(lock2).toBe(true);
    } finally {
      await releaseDeviceLock(email1, TEST_DEVICE_ID);
      await releaseDeviceLock(email2, TEST_DEVICE_ID);
    }
  });

  it('should be idempotent for release (no error on non-existent lock)', async () => {
    // Release without acquiring should not throw
    await expect(
      releaseDeviceLock(TEST_EMAIL, 'non-existent-device')
    ).resolves.toBeUndefined();
  });

  it('simulates concurrent instance race protection', async () => {
    // Simulate two concurrent instances trying to create sessions
    // for the same email+device. Only one should succeed.

    const email = 'concurrent-race-test@example.com';
    const device = 'concurrent-device-fingerprint';

    try {
      // Instance A acquires lock
      const instanceA = await acquireDeviceLock(email, device);
      expect(instanceA).toBe(true);

      // Instance B tries to acquire same lock (should fail)
      const instanceB = await acquireDeviceLock(email, device);
      expect(instanceB).toBe(false);

      // Instance A releases lock
      await releaseDeviceLock(email, device);

      // Instance B retries and now succeeds
      const instanceBRetry = await acquireDeviceLock(email, device);
      expect(instanceBRetry).toBe(true);
    } finally {
      await releaseDeviceLock(email, device);
    }
  });
});
