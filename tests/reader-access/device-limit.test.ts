/**
 * Unit tests for device limit enforcement (T041-T042).
 * Tests device count queries and device limit checks.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { resetInMemoryBlobStore } from '../helpers/in-memory-blob-store';

// In-memory Netlify Blobs that honours list({ prefix }) like the real store.
vi.mock('../../netlify/lib/blobs', async () =>
  (await import('../helpers/in-memory-blob-store')).inMemoryBlobsModule()
);

describe('Device Limit Enforcement - T041 & T042', () => {
  const testEmail = 'reader@example.com';
  const testCode = '123456';

  beforeEach(async () => {
    vi.clearAllMocks();
    resetInMemoryBlobStore();
  });

  describe('T041: Device count query', () => {
    it('should count active sessions per email', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');
      const { storeSession } = await import('../../netlify/lib/reader-access/store');
      const { listSessionsByEmail } = await import('../../netlify/lib/reader-access/store');

      // Create sessions on 2 different devices
      const session1 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPhone)',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      });

      const session2 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPad)',
        ipAddress: '192.168.1.2',
        timezone: 'UTC',
      });

      // List all sessions for this email
      const allSessions = await listSessionsByEmail(testEmail);

      // Verify we have 2 sessions
      expect(allSessions).toHaveLength(2);
      expect(allSessions.map((s) => s.deviceId)).toContain(session1.deviceId);
      expect(allSessions.map((s) => s.deviceId)).toContain(session2.deviceId);
    });

    it('should return only sessions matching the email', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');
      const { listSessionsByEmail } = await import('../../netlify/lib/reader-access/store');

      const anotherEmail = 'another@example.com';

      // Create session for first email
      await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      });

      // Create session for another email
      await createSession(anotherEmail, testCode, {
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.2',
        timezone: 'UTC',
      });

      // List sessions for first email
      const sessionsForEmail1 = await listSessionsByEmail(testEmail);

      // Verify only 1 session for first email
      expect(sessionsForEmail1).toHaveLength(1);
      expect(sessionsForEmail1[0].email).toBe(testEmail);
    });

    it('should include terminated sessions in list', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');
      const { terminateSession } = await import('../../netlify/lib/reader-access/session-service');
      const { listSessionsByEmail } = await import('../../netlify/lib/reader-access/store');

      // Create 2 sessions
      const session1 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPhone)',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      });

      const session2 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (iPad)',
        ipAddress: '192.168.1.2',
        timezone: 'UTC',
      });

      // Terminate first session
      await terminateSession(testEmail, session1.deviceId);

      // List all sessions
      const allSessions = await listSessionsByEmail(testEmail);

      // Verify we have 2 sessions (including terminated)
      expect(allSessions).toHaveLength(2);

      // Verify one is terminated
      const terminated = allSessions.find((s) => s.deviceId === session1.deviceId);
      expect(terminated?.status).toBe('terminated');
      expect(terminated?.terminatedAt).toBeTruthy();
    });
  });

  describe('T042: Device limit check', () => {
    it('should allow session creation when count < limit', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');
      const { MAX_CONCURRENT_DEVICES } = await import(
        '../../netlify/lib/reader-access/session-config'
      );

      // Create sessions up to limit
      const sessions = [];
      for (let i = 0; i < MAX_CONCURRENT_DEVICES; i++) {
        const session = await createSession(testEmail, testCode, {
          userAgent: `Mozilla/5.0 (Device ${i})`,
          ipAddress: `192.168.1.${i}`,
          timezone: 'UTC',
        });
        sessions.push(session);
      }

      // Verify all sessions created
      expect(sessions).toHaveLength(MAX_CONCURRENT_DEVICES);
      expect(sessions.every((s) => s.status === 'active')).toBe(true);
    });

    it('should deny session creation when count >= limit', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');
      const { MAX_CONCURRENT_DEVICES } = await import(
        '../../netlify/lib/reader-access/session-config'
      );

      // Create sessions at limit
      for (let i = 0; i < MAX_CONCURRENT_DEVICES; i++) {
        await createSession(testEmail, testCode, {
          userAgent: `Mozilla/5.0 (Device ${i})`,
          ipAddress: `192.168.1.${i}`,
          timezone: 'UTC',
        });
      }

      // Attempt to create session over limit
      let error: Error | null = null;
      try {
        await createSession(testEmail, testCode, {
          userAgent: 'Mozilla/5.0 (Device over limit)',
          ipAddress: '192.168.1.100',
          timezone: 'UTC',
        });
      } catch (e) {
        error = e as Error;
      }

      // Verify error thrown with correct status code
      expect(error).toBeTruthy();
      expect((error as any).statusCode).toBe(409);
      expect((error as any).errorCode).toBe('device_limit_exceeded');
    });

    it('should allow creation after terminating a device', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');
      const { terminateSession } = await import('../../netlify/lib/reader-access/session-service');
      const { MAX_CONCURRENT_DEVICES } = await import(
        '../../netlify/lib/reader-access/session-config'
      );

      // Create sessions at limit
      const sessions = [];
      for (let i = 0; i < MAX_CONCURRENT_DEVICES; i++) {
        const session = await createSession(testEmail, testCode, {
          userAgent: `Mozilla/5.0 (Device ${i})`,
          ipAddress: `192.168.1.${i}`,
          timezone: 'UTC',
        });
        sessions.push(session);
      }

      // Terminate first device
      await terminateSession(testEmail, sessions[0].deviceId);

      // Attempt to create new session - should succeed
      const newSession = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (New Device)',
        ipAddress: '192.168.1.100',
        timezone: 'UTC',
      });

      // Verify new session created
      expect(newSession.status).toBe('active');
      expect(newSession.terminatedAt).toBeNull();
    });

    it('should not count terminated sessions in device limit', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');
      const { terminateSession } = await import('../../netlify/lib/reader-access/session-service');
      const { listSessionsByEmail } = await import('../../netlify/lib/reader-access/store');

      // Create 2 sessions
      const session1 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (Device 1)',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      });

      const session2 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (Device 2)',
        ipAddress: '192.168.1.2',
        timezone: 'UTC',
      });

      // Terminate first session
      await terminateSession(testEmail, session1.deviceId);

      // List sessions
      const allSessions = await listSessionsByEmail(testEmail);

      // Count active sessions (should be 1)
      const activeSessions = allSessions.filter(
        (s) => s.status === 'active' && s.terminatedAt === null
      );
      expect(activeSessions).toHaveLength(1);
      expect(activeSessions[0].deviceId).toBe(session2.deviceId);
    });

    it('should include both active and terminated in total count but only active in limit', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');
      const { terminateSession } = await import('../../netlify/lib/reader-access/session-service');

      // Create session and terminate it
      const session1 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (Device 1)',
        ipAddress: '192.168.1.1',
        timezone: 'UTC',
      });
      await terminateSession(testEmail, session1.deviceId);

      // Create new active session
      const session2 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (Device 2)',
        ipAddress: '192.168.1.2',
        timezone: 'UTC',
      });

      // Should be able to create another (1 active = under limit of 2)
      const session3 = await createSession(testEmail, testCode, {
        userAgent: 'Mozilla/5.0 (Device 3)',
        ipAddress: '192.168.1.3',
        timezone: 'UTC',
      });

      expect(session3.status).toBe('active');
    });
  });
});
