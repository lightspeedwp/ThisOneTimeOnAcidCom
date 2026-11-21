/**
 * Integration tests for device limit enforcement (T043-T044).
 * Tests device limit workflow and device termination freeing slots.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Netlify environment
vi.mock('../../netlify/lib/blobs', () => {
  const store = new Map<string, string>();
  return {
    getStore: () => ({
      get: (key: string) => Promise.resolve(store.get(key) || null),
      set: (key: string, value: string) => Promise.resolve(store.set(key, value)),
      delete: (key: string) => Promise.resolve(store.delete(key)),
      list: ({ prefix }: { prefix: string }) =>
        Promise.resolve(Array.from(store.keys()).filter((k) => k.startsWith(prefix))),
      store, // Export for test access
    }),
  };
});

describe('Device Limit Integration Tests - T043 & T044', () => {
  const testEmail = 'reader@example.com';
  const testCode = '123456';

  beforeEach(async () => {
    vi.clearAllMocks();

    // Clear mock store for clean test state
    const { getStore } = await import('../../netlify/lib/blobs');
    const store = getStore();
    if (store && (store as any).store) {
      (store as any).store.clear();
    }
  });

  describe('T043: Device limit enforcement workflow', () => {
    it('should allow 2 devices to be created successfully', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');

      // Create session on device 1
      const device1 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0)',
        ipAddress: '203.0.113.42',
        timezone: 'America/Los_Angeles',
      });

      expect(device1).toBeDefined();
      expect(device1.status).toBe('active');
      expect(device1.terminatedAt).toBeNull();

      // Create session on device 2
      const device2 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0)',
        ipAddress: '203.0.113.43',
        timezone: 'America/Los_Angeles',
      });

      expect(device2).toBeDefined();
      expect(device2.status).toBe('active');
      expect(device2.terminatedAt).toBeNull();

      // Verify devices are different
      expect(device1.deviceId).not.toBe(device2.deviceId);
    });

    it('should deny 3rd device with 409 Conflict', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');

      // Create sessions on 2 devices (at limit)
      await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPhone)',
        ipAddress: '203.0.113.42',
        timezone: 'UTC',
      });

      await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPad)',
        ipAddress: '203.0.113.43',
        timezone: 'UTC',
      });

      // Attempt 3rd device - should fail
      let error: any = null;
      try {
        await createSession(testEmail, testCode, {
          userAgent: 'Mozilla/5.0 (Android)',
          ipAddress: '203.0.113.44',
          timezone: 'UTC',
        });
      } catch (e) {
        error = e;
      }

      // Verify 409 Conflict error
      expect(error).toBeTruthy();
      expect(error.statusCode).toBe(409);
      expect(error.errorCode).toBe('device_limit_exceeded');
      expect(error.message).toContain('Device limit exceeded');
    });

    it('should include active count and limit in error response', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');

      // Create sessions at limit
      await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (Device 1)',
        ipAddress: '203.0.113.1',
        timezone: 'UTC',
      });

      await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (Device 2)',
        ipAddress: '203.0.113.2',
        timezone: 'UTC',
      });

      // Attempt over limit
      let error: any = null;
      try {
        await createSession(testEmail, testCode, {
          userAgent: 'Mozilla/5.0 (Device 3)',
          ipAddress: '203.0.113.3',
          timezone: 'UTC',
        });
      } catch (e) {
        error = e;
      }

      expect(error).toBeTruthy();
      expect(error.statusCode).toBe(409);
    });
  });

  describe('T044: Device termination freeing slots', () => {
    it('should allow new device after terminating existing device', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');
      const { terminateSession } = await import('../../netlify/lib/reader-access/session-service');

      // Create sessions on 2 devices
      const device1 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPhone)',
        ipAddress: '203.0.113.42',
        timezone: 'UTC',
      });

      const device2 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPad)',
        ipAddress: '203.0.113.43',
        timezone: 'UTC',
      });

      // Try 3rd - should fail
      let error: any = null;
      try {
        await createSession(testEmail, testCode, {
          userAgent: 'Mozilla/5.0 (Android)',
          ipAddress: '203.0.113.44',
          timezone: 'UTC',
        });
      } catch (e) {
        error = e;
      }
      expect(error).toBeTruthy();
      expect(error.statusCode).toBe(409);

      // Terminate device 1
      await terminateSession(testEmail, device1.deviceId);

      // Now 3rd device should succeed
      const device3 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (Android)',
        ipAddress: '203.0.113.44',
        timezone: 'UTC',
      });

      expect(device3).toBeDefined();
      expect(device3.status).toBe('active');
      expect(device3.deviceId).not.toBe(device1.deviceId);
    });

    it('should track termination timestamp when freeing slot', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');
      const { terminateSession } = await import('../../netlify/lib/reader-access/session-service');
      const { getSession } = await import('../../netlify/lib/reader-access/store');

      // Create session
      const device1 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPhone)',
        ipAddress: '203.0.113.42',
        timezone: 'UTC',
      });

      // Terminate it
      const beforeTermination = new Date();
      await terminateSession(testEmail, device1.deviceId);
      const afterTermination = new Date();

      // Retrieve and verify
      const terminated = await getSession(testEmail, device1.deviceId);
      expect(terminated).toBeTruthy();
      expect(terminated?.status).toBe('terminated');
      expect(terminated?.terminatedAt).toBeTruthy();

      // Verify termination timestamp is recent
      const terminatedAt = new Date(terminated!.terminatedAt!);
      expect(terminatedAt.getTime()).toBeGreaterThanOrEqual(beforeTermination.getTime() - 100);
      expect(terminatedAt.getTime()).toBeLessThanOrEqual(afterTermination.getTime() + 100);
    });

    it('should handle multiple device terminations in sequence', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');
      const { terminateSession } = await import('../../netlify/lib/reader-access/session-service');

      // Create sessions on 2 devices
      const device1 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPhone)',
        ipAddress: '203.0.113.1',
        timezone: 'UTC',
      });

      const device2 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPad)',
        ipAddress: '203.0.113.2',
        timezone: 'UTC',
      });

      // Create 3rd after terminating 1st
      await terminateSession(testEmail, device1.deviceId);

      const device3 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (Android)',
        ipAddress: '203.0.113.3',
        timezone: 'UTC',
      });

      // Terminate device 2, then create device 4
      await terminateSession(testEmail, device2.deviceId);

      const device4 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (Chromebook)',
        ipAddress: '203.0.113.4',
        timezone: 'UTC',
      });

      expect(device3).toBeDefined();
      expect(device4).toBeDefined();
      expect(device3.deviceId).not.toBe(device4.deviceId);
    });

    it('should not resurrect terminated session', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');
      const { terminateSession } = await import('../../netlify/lib/reader-access/session-service');
      const { validateSession } = await import('../../netlify/lib/reader-access/session-service');

      // Create session
      const session = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPhone)',
        ipAddress: '203.0.113.42',
        timezone: 'UTC',
      });

      // Terminate it
      await terminateSession(testEmail, session.deviceId);

      // Try to validate - should fail
      const result = await validateSession(session.sessionId, testEmail, session.deviceId);

      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('terminated_session');
      expect(result.statusCode).toBe(401);
    });
  });

  describe('T044: Concurrent termination and creation', () => {
    it('should handle rapid device switches correctly', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');
      const { terminateSession } = await import('../../netlify/lib/reader-access/session-service');

      // Create sessions on 2 devices
      const device1 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPhone)',
        ipAddress: '203.0.113.1',
        timezone: 'UTC',
      });

      const device2 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPad)',
        ipAddress: '203.0.113.2',
        timezone: 'UTC',
      });

      // Rapid: terminate device 1, create device 3, terminate device 2, create device 4
      await terminateSession(testEmail, device1.deviceId);

      const device3 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (Android 1)',
        ipAddress: '203.0.113.3',
        timezone: 'UTC',
      });

      await terminateSession(testEmail, device2.deviceId);

      const device4 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (Android 2)',
        ipAddress: '203.0.113.4',
        timezone: 'UTC',
      });

      // Verify devices 3 and 4 are active
      expect(device3.status).toBe('active');
      expect(device4.status).toBe('active');
      expect(device3.deviceId).not.toBe(device4.deviceId);
    });
  });
});
