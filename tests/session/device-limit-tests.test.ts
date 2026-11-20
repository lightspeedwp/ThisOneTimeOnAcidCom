/**
 * Unit and integration tests for device limit enforcement.
 * Tests T099-T102: device counting, limit checks, and device termination workflow
 *
 * User Story 4: Concurrent Device Limit Enforcement
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createSession, getActiveSessionCount, terminateSession } from '../../netlify/lib/reader-access/session-service';
import { listSessionsByEmail } from '../../netlify/lib/reader-access/store';
import { MAX_CONCURRENT_DEVICES } from '../../netlify/lib/reader-access/session-config';

vi.mock('../../netlify/lib/blobs', () => {
  const store = new Map<string, string>();
  return {
    getStore: () => ({
      get: (key: string) => Promise.resolve(store.get(key) || null),
      set: (key: string, value: string) => Promise.resolve(store.set(key, value)),
      delete: (key: string) => Promise.resolve(store.delete(key)),
      list: () => Promise.resolve(Array.from(store.keys())),
      store,
    }),
  };
});

describe('Device Limit Enforcement - T099-T102 (US4)', () => {
  const testEmailBase = `reader-device-limit-${Date.now()}`;
  const testCode = '123456';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('T099: Device counting', () => {
    it('should count active sessions for email', async () => {
      const testEmail = `${testEmailBase}-count1`;
      const device1 = { userAgent: 'Device1', ipAddress: '192.168.1.1', timezone: 'UTC' };
      const device2 = { userAgent: 'Device2', ipAddress: '192.168.1.2', timezone: 'UTC' };

      const session1 = await createSession(testEmail, testCode, device1);
      const session2 = await createSession(testEmail, testCode, device2);

      const count = await getActiveSessionCount(testEmail);
      expect(count).toBe(2);
    });

    it('should return 0 for email with no sessions', async () => {
      const testEmail = `${testEmailBase}-count0`;
      const count = await getActiveSessionCount(testEmail);
      expect(count).toBe(0);
    });

    it('should not count terminated sessions in active count', async () => {
      const testEmail = `${testEmailBase}-count-terminated`;
      const device1 = { userAgent: 'Device1', ipAddress: '192.168.1.1', timezone: 'UTC' };
      const device2 = { userAgent: 'Device2', ipAddress: '192.168.1.2', timezone: 'UTC' };

      const session1 = await createSession(testEmail, testCode, device1);
      const session2 = await createSession(testEmail, testCode, device2);

      await terminateSession(testEmail, session1.deviceId);

      const count = await getActiveSessionCount(testEmail);
      expect(count).toBe(1); // Only device2 is active
    });

    it('should count correct number after multiple operations', async () => {
      const testEmail = `${testEmailBase}-count-multiple`;
      const devices = [
        { userAgent: 'Device1', ipAddress: '192.168.1.1', timezone: 'UTC' },
        { userAgent: 'Device2', ipAddress: '192.168.1.2', timezone: 'UTC' },
        { userAgent: 'Device3', ipAddress: '192.168.1.3', timezone: 'UTC' },
      ];

      const sessions = [];
      for (let i = 0; i < 3; i++) {
        if (i < MAX_CONCURRENT_DEVICES) {
          const session = await createSession(testEmail, testCode, devices[i]);
          sessions.push(session);
        } else {
          // Should fail due to device limit
          try {
            await createSession(testEmail, testCode, devices[i]);
          } catch (e: any) {
            expect(e.statusCode).toBe(409);
          }
        }
      }

      const count = await getActiveSessionCount(testEmail);
      expect(count).toBe(MAX_CONCURRENT_DEVICES);
    });
  });

  describe('T100: Device limit check', () => {
    it('should allow session creation when count < limit', async () => {
      const testEmail = `${testEmailBase}-limit-allow`;
      const device1 = { userAgent: 'Device1', ipAddress: '192.168.1.1', timezone: 'UTC' };

      const session = await createSession(testEmail, testCode, device1);
      expect(session).toBeTruthy();
      expect(session.sessionId).toBeTruthy();
    });

    it('should deny session creation when count >= limit', async () => {
      const testEmail = `${testEmailBase}-limit-deny`;
      const devices = [
        { userAgent: 'Device1', ipAddress: '192.168.1.1', timezone: 'UTC' },
        { userAgent: 'Device2', ipAddress: '192.168.1.2', timezone: 'UTC' },
        { userAgent: 'Device3', ipAddress: '192.168.1.3', timezone: 'UTC' },
      ];

      // Create sessions up to limit
      for (let i = 0; i < MAX_CONCURRENT_DEVICES; i++) {
        const session = await createSession(testEmail, testCode, devices[i]);
        expect(session).toBeTruthy();
      }

      // Next attempt should fail
      await expect(
        createSession(testEmail, testCode, devices[MAX_CONCURRENT_DEVICES])
      ).rejects.toThrow('Device limit exceeded');
    });

    it('should return 409 Conflict when limit exceeded', async () => {
      const testEmail = `${testEmailBase}-limit-409`;
      const devices = [
        { userAgent: 'Device1', ipAddress: '192.168.1.1', timezone: 'UTC' },
        { userAgent: 'Device2', ipAddress: '192.168.1.2', timezone: 'UTC' },
        { userAgent: 'Device3', ipAddress: '192.168.1.3', timezone: 'UTC' },
      ];

      for (let i = 0; i < MAX_CONCURRENT_DEVICES; i++) {
        await createSession(testEmail, testCode, devices[i]);
      }

      try {
        await createSession(testEmail, testCode, devices[MAX_CONCURRENT_DEVICES]);
        expect.fail('Should have thrown');
      } catch (e: any) {
        expect(e.statusCode).toBe(409);
        expect(e.errorCode).toBe('device_limit_exceeded');
      }
    });
  });

  describe('T100: Re-verifying on a registered device', () => {
    it('should allow a new session on an already-registered device at the limit', async () => {
      const testEmail = `${testEmailBase}-reverify`;
      const devices = Array.from({ length: MAX_CONCURRENT_DEVICES }, (_, i) => ({
        userAgent: `Device${i + 1}`,
        ipAddress: `192.168.1.${i + 1}`,
        timezone: 'UTC',
      }));

      const sessions = [];
      for (const device of devices) {
        sessions.push(await createSession(testEmail, testCode, device));
      }

      // Same device again: replaces its own session, so it is not a new device
      const replacement = await createSession(testEmail, testCode, devices[0]);

      expect(replacement.deviceId).toBe(sessions[0].deviceId);
      expect(replacement.sessionId).not.toBe(sessions[0].sessionId);
      expect(await getActiveSessionCount(testEmail)).toBe(MAX_CONCURRENT_DEVICES);
    });
  });

  describe('T101: Device termination and freeing slots', () => {
    it('should allow creation after terminating a device', async () => {
      const testEmail = `${testEmailBase}-free-slot`;
      const devices = [
        { userAgent: 'Device1', ipAddress: '192.168.1.1', timezone: 'UTC' },
        { userAgent: 'Device2', ipAddress: '192.168.1.2', timezone: 'UTC' },
        { userAgent: 'Device3', ipAddress: '192.168.1.3', timezone: 'UTC' },
      ];

      // Create sessions up to limit
      const sessions = [];
      for (let i = 0; i < MAX_CONCURRENT_DEVICES; i++) {
        const session = await createSession(testEmail, testCode, devices[i]);
        sessions.push(session);
      }

      // Terminate first device
      await terminateSession(testEmail, sessions[0].deviceId);

      // Now we should be able to create a new session
      const newSession = await createSession(testEmail, testCode, devices[MAX_CONCURRENT_DEVICES]);
      expect(newSession).toBeTruthy();
      expect(newSession.sessionId).toBeTruthy();
    });

    it('should not count terminated sessions in device limit', async () => {
      const testEmail = `${testEmailBase}-no-count-terminated`;
      const devices = [
        { userAgent: 'Device1', ipAddress: '192.168.1.1', timezone: 'UTC' },
        { userAgent: 'Device2', ipAddress: '192.168.1.2', timezone: 'UTC' },
        { userAgent: 'Device3', ipAddress: '192.168.1.3', timezone: 'UTC' },
      ];

      const sessions = [];
      for (let i = 0; i < MAX_CONCURRENT_DEVICES; i++) {
        const session = await createSession(testEmail, testCode, devices[i]);
        sessions.push(session);
      }

      // Terminate all but one
      for (let i = 0; i < MAX_CONCURRENT_DEVICES - 1; i++) {
        await terminateSession(testEmail, sessions[i].deviceId);
      }

      const count = await getActiveSessionCount(testEmail);
      expect(count).toBe(1);

      // Should be able to create more sessions
      const newSession = await createSession(testEmail, testCode, devices[MAX_CONCURRENT_DEVICES]);
      expect(newSession).toBeTruthy();
    });
  });

  describe('T102: Multi-device workflow', () => {
    it('should track different devices separately', async () => {
      const testEmail = `${testEmailBase}-multi-device`;
      const device1 = { userAgent: 'Mobile', ipAddress: '192.168.1.1', timezone: 'America/New_York' };
      const device2 = { userAgent: 'Tablet', ipAddress: '192.168.1.2', timezone: 'America/New_York' };
      const device3 = { userAgent: 'Desktop', ipAddress: '192.168.1.3', timezone: 'America/New_York' };

      const session1 = await createSession(testEmail, testCode, device1);
      const session2 = await createSession(testEmail, testCode, device2);

      expect(session1.deviceId).not.toBe(session2.deviceId);

      const count = await getActiveSessionCount(testEmail);
      expect(count).toBe(2);

      // Third device should fail
      try {
        await createSession(testEmail, testCode, device3);
        expect.fail('Should have been rejected');
      } catch (e: any) {
        expect(e.statusCode).toBe(409);
      }
    });

    it('should include both active and terminated in total list', async () => {
      const testEmail = `${testEmailBase}-both-active-terminated`;
      const device1 = { userAgent: 'Device1', ipAddress: '192.168.1.1', timezone: 'UTC' };
      const device2 = { userAgent: 'Device2', ipAddress: '192.168.1.2', timezone: 'UTC' };

      const session1 = await createSession(testEmail, testCode, device1);
      const session2 = await createSession(testEmail, testCode, device2);

      await terminateSession(testEmail, session1.deviceId);

      const allSessions = await listSessionsByEmail(testEmail);
      expect(allSessions.length).toBe(2); // Both devices in list

      const activeSessions = allSessions.filter((s) => s.status === 'active');
      expect(activeSessions.length).toBe(1); // Only device2 is active

      const inactiveCount = await getActiveSessionCount(testEmail);
      expect(inactiveCount).toBe(1); // Count only active
    });
  });

  describe('Edge cases', () => {
    it('should handle exact limit boundary', async () => {
      const testEmail = `${testEmailBase}-boundary`;
      const devices = Array.from({ length: MAX_CONCURRENT_DEVICES + 1 }, (_, i) => ({
        userAgent: `Device${i + 1}`,
        ipAddress: `192.168.1.${i + 1}`,
        timezone: 'UTC',
      }));

      // Create up to limit
      for (let i = 0; i < MAX_CONCURRENT_DEVICES; i++) {
        const session = await createSession(testEmail, testCode, devices[i]);
        expect(session).toBeTruthy();
      }

      // One more should fail
      try {
        await createSession(testEmail, testCode, devices[MAX_CONCURRENT_DEVICES]);
        expect.fail('Should have been rejected');
      } catch (e: any) {
        expect(e.statusCode).toBe(409);
      }
    });

    it('should handle concurrent creation attempts', async () => {
      const testEmail = `${testEmailBase}-concurrent`;
      const devices = Array.from({ length: MAX_CONCURRENT_DEVICES + 2 }, (_, i) => ({
        userAgent: `Device${i + 1}`,
        ipAddress: `192.168.1.${i + 1}`,
        timezone: 'UTC',
      }));

      // Try to create multiple sessions concurrently
      const promises = devices.map((device) => createSession(testEmail, testCode, device).catch((e) => e));

      const results = await Promise.all(promises);
      const successful = results.filter((r) => r && r.sessionId);

      expect(successful.length).toBe(MAX_CONCURRENT_DEVICES);
    });
  });
});
