/**
 * Unit tests for session activity timestamps.
 * Tests T031-T033: createdAt, renewedAt, terminatedAt tracking
 *
 * User Story 3: Activity Tracking for Session Lifecycle
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
      list: () => Promise.resolve(Array.from(store.keys())),
      store, // Export for test access
    }),
  };
});

describe('Session Timestamps - T031-T033', () => {
  const testEmail = 'reader@example.com';
  const testCode = '123456';
  const testUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
  const testIpAddress = '192.168.1.1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('T031: createdAt timestamp set on session creation', () => {
    it('should create session with createdAt timestamp', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      const beforeCreation = new Date().getTime();
      const session = await createSession(testEmail, testCode, fingerprint);
      const afterCreation = new Date().getTime();

      // Verify createdAt exists and is a valid ISO string
      expect(session.createdAt).toBeTruthy();
      expect(typeof session.createdAt).toBe('string');

      // Verify createdAt is in ISO 8601 format
      const createdAtTime = new Date(session.createdAt).getTime();
      expect(createdAtTime).toBeGreaterThanOrEqual(beforeCreation);
      expect(createdAtTime).toBeLessThanOrEqual(afterCreation);
    });

    it('should set createdAt to current timestamp (within 100ms)', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      const now = new Date();
      const session = await createSession(testEmail, testCode, fingerprint);
      const createdAt = new Date(session.createdAt);

      const timeDiff = Math.abs(createdAt.getTime() - now.getTime());
      expect(timeDiff).toBeLessThan(100); // Within 100ms
    });

    it('should use ISO 8601 format for createdAt', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      const session = await createSession(testEmail, testCode, fingerprint);

      // ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z?$/;
      expect(session.createdAt).toMatch(isoRegex);
    });
  });

  describe('T032: renewedAt updated on session renewal', () => {
    it('should update renewedAt timestamp on renewal', async () => {
      const { createSession, renewSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      // Create session
      const created = await createSession(testEmail, testCode, fingerprint);
      const originalRenewedAt = created.renewedAt;

      // Wait longer than RENEWAL_COALESCE_WINDOW_MS (1000ms) to trigger renewal
      await new Promise((resolve) => setTimeout(resolve, 1100));

      // Renew session
      const renewed = await renewSession(testEmail, created.deviceId);

      // Verify renewedAt was updated
      expect(renewed.renewedAt).not.toBe(originalRenewedAt);
      expect(new Date(renewed.renewedAt).getTime()).toBeGreaterThan(
        new Date(originalRenewedAt).getTime()
      );
    });

    it('should set renewedAt to current timestamp on renewal', async () => {
      const { createSession, renewSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      // Create session
      const created = await createSession(testEmail, testCode, fingerprint);

      // Wait longer than RENEWAL_COALESCE_WINDOW_MS (1000ms) to trigger renewal
      await new Promise((resolve) => setTimeout(resolve, 1100));

      // Renew and capture time
      const beforeRenewal = new Date().getTime();
      const renewed = await renewSession(testEmail, created.deviceId);
      const afterRenewal = new Date().getTime();

      // Verify renewedAt is within the renewal window
      const renewedAtTime = new Date(renewed.renewedAt).getTime();
      expect(renewedAtTime).toBeGreaterThanOrEqual(beforeRenewal);
      expect(renewedAtTime).toBeLessThanOrEqual(afterRenewal);
    });

    it('should use ISO 8601 format for renewedAt', async () => {
      const { createSession, renewSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      const created = await createSession(testEmail, testCode, fingerprint);
      const renewed = await renewSession(testEmail, created.deviceId);

      // ISO 8601 format
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z?$/;
      expect(renewed.renewedAt).toMatch(isoRegex);
    });

    it('should not change createdAt during renewal', async () => {
      const { createSession, renewSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      // Create session
      const created = await createSession(testEmail, testCode, fingerprint);
      const originalCreatedAt = created.createdAt;

      // Wait and renew
      await new Promise((resolve) => setTimeout(resolve, 10));
      const renewed = await renewSession(testEmail, created.deviceId);

      // Verify createdAt remains unchanged
      expect(renewed.createdAt).toBe(originalCreatedAt);
    });
  });

  describe('T033: terminatedAt set on logout', () => {
    it('should set terminatedAt timestamp on session termination', async () => {
      const { createSession, terminateSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      // Create session
      const session = await createSession(testEmail, testCode, fingerprint);
      expect(session.terminatedAt).toBeNull();

      // Terminate session
      const beforeTermination = new Date().getTime();
      await terminateSession(testEmail, session.deviceId);
      const afterTermination = new Date().getTime();

      // Verify terminatedAt is set by retrieving updated session
      const { getSession } = await import('../../netlify/lib/reader-access/store');
      const terminated = await getSession(testEmail, session.deviceId);

      expect(terminated?.terminatedAt).toBeTruthy();
      expect(typeof terminated?.terminatedAt).toBe('string');

      const terminatedAtTime = new Date(terminated!.terminatedAt).getTime();
      expect(terminatedAtTime).toBeGreaterThanOrEqual(beforeTermination);
      expect(terminatedAtTime).toBeLessThanOrEqual(afterTermination);
    });

    it('should set terminatedAt to current timestamp', async () => {
      const { createSession, terminateSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      // Create session
      const session = await createSession(testEmail, testCode, fingerprint);

      // Terminate and capture time
      const now = new Date();
      await terminateSession(testEmail, session.deviceId);

      // Retrieve and check
      const { getSession } = await import('../../netlify/lib/reader-access/store');
      const terminated = await getSession(testEmail, session.deviceId);
      const terminatedAt = new Date(terminated!.terminatedAt);

      const timeDiff = Math.abs(terminatedAt.getTime() - now.getTime());
      expect(timeDiff).toBeLessThan(100); // Within 100ms
    });

    it('should use ISO 8601 format for terminatedAt', async () => {
      const { createSession, terminateSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      const session = await createSession(testEmail, testCode, fingerprint);
      await terminateSession(testEmail, session.deviceId);

      const { getSession } = await import('../../netlify/lib/reader-access/store');
      const terminated = await getSession(testEmail, session.deviceId);

      // ISO 8601 format
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z?$/;
      expect(terminated!.terminatedAt).toMatch(isoRegex);
    });

    it('should mark session as terminated', async () => {
      const { createSession, terminateSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      // Create session
      const session = await createSession(testEmail, testCode, fingerprint);
      expect(session.status).toBe('active');

      // Terminate session
      await terminateSession(testEmail, session.deviceId);

      // Verify status changed to terminated
      const { getSession } = await import('../../netlify/lib/reader-access/store');
      const terminated = await getSession(testEmail, session.deviceId);

      expect(terminated?.status).toBe('terminated');
    });

    it('should not change createdAt or renewedAt during termination', async () => {
      const { createSession, terminateSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      // Create session
      const session = await createSession(testEmail, testCode, fingerprint);
      const originalCreatedAt = session.createdAt;
      const originalRenewedAt = session.renewedAt;

      // Terminate session
      await terminateSession(testEmail, session.deviceId);

      // Verify timestamps didn't change
      const { getSession } = await import('../../netlify/lib/reader-access/store');
      const terminated = await getSession(testEmail, session.deviceId);

      expect(terminated?.createdAt).toBe(originalCreatedAt);
      expect(terminated?.renewedAt).toBe(originalRenewedAt);
    });
  });
});
