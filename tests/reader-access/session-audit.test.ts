/**
 * Integration tests for session activity audit trail.
 * Tests T034-T035: Full lifecycle activity tracking and audit trail persistence
 *
 * User Story 3: Activity Tracking for Session Lifecycle
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { resetInMemoryBlobStore } from '../helpers/in-memory-blob-store';

// In-memory Netlify Blobs that honours list({ prefix }) like the real store.
vi.mock('../../netlify/lib/blobs', async () =>
  (await import('../helpers/in-memory-blob-store')).inMemoryBlobsModule()
);

describe('Session Audit Trail - T034-T035', () => {
  const testEmail = 'reader@example.com';
  const testCode = '123456';
  const testUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
  const testIpAddress = '192.168.1.1';

  beforeEach(() => {

    resetInMemoryBlobStore();
    vi.clearAllMocks();
  });

  describe('T034: Integration test for activity tracking', () => {
    it('should record createdAt on session creation', async () => {
      const { createSession } = await import('../../netlify/lib/reader-access/session-service');

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      const session = await createSession(testEmail, testCode, fingerprint);

      expect(session.createdAt).toBeTruthy();
      expect(typeof session.createdAt).toBe('string');
      expect(session.status).toBe('active');
      expect(session.terminatedAt).toBeNull();
    });

    it('should record renewedAt on session renewal', async () => {
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
      const createdAt = created.createdAt;
      const originalRenewedAt = created.renewedAt;

      // Wait longer than RENEWAL_COALESCE_WINDOW_MS (1000ms) to trigger renewal
      await new Promise((resolve) => setTimeout(resolve, 1100));
      const renewed = await renewSession(testEmail, created.deviceId);

      // Verify activity tracking
      expect(renewed.createdAt).toBe(createdAt); // unchanged
      expect(renewed.renewedAt).not.toBe(originalRenewedAt); // updated
      expect(new Date(renewed.renewedAt).getTime()).toBeGreaterThan(
        new Date(originalRenewedAt).getTime()
      );
      expect(renewed.terminatedAt).toBeNull(); // still active
    });

    it('should record terminatedAt on session termination', async () => {
      const { createSession, terminateSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );
      const { getSession } = await import('../../netlify/lib/reader-access/store');

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      // Create session
      const created = await createSession(testEmail, testCode, fingerprint);
      const createdAt = created.createdAt;
      const renewedAt = created.renewedAt;

      // Terminate session
      await terminateSession(testEmail, created.deviceId);

      // Retrieve and verify
      const terminated = await getSession(testEmail, created.deviceId);

      expect(terminated?.createdAt).toBe(createdAt); // unchanged
      expect(terminated?.renewedAt).toBe(renewedAt); // unchanged
      expect(terminated?.terminatedAt).toBeTruthy(); // set
      expect(terminated?.status).toBe('terminated');
    });

    it('should track full lifecycle: create → renew → terminate', async () => {
      const { createSession, renewSession, terminateSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );
      const { getSession } = await import('../../netlify/lib/reader-access/store');

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      // Step 1: Create
      const created = await createSession(testEmail, testCode, fingerprint);
      expect(created.createdAt).toBeTruthy();
      expect(created.renewedAt).toBeTruthy();
      expect(created.terminatedAt).toBeNull();
      expect(created.status).toBe('active');

      const createdAt = created.createdAt;
      const renewedAtAfterCreate = created.renewedAt;

      // Wait longer than RENEWAL_COALESCE_WINDOW_MS (1000ms) to trigger renewal
      await new Promise((resolve) => setTimeout(resolve, 1100));

      // Step 2: Renew
      const renewed = await renewSession(testEmail, created.deviceId);
      expect(renewed.createdAt).toBe(createdAt); // unchanged
      expect(renewed.renewedAt).not.toBe(renewedAtAfterCreate); // updated
      expect(renewed.terminatedAt).toBeNull(); // still active
      expect(renewed.status).toBe('active');

      const renewedAt = renewed.renewedAt;

      // Wait
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Step 3: Terminate
      await terminateSession(testEmail, created.deviceId);
      const terminated = await getSession(testEmail, created.deviceId);

      expect(terminated?.createdAt).toBe(createdAt); // unchanged
      expect(terminated?.renewedAt).toBe(renewedAt); // unchanged
      expect(terminated?.terminatedAt).toBeTruthy(); // set
      expect(terminated?.status).toBe('terminated');

      // Verify temporal ordering
      const createdTime = new Date(terminated!.createdAt).getTime();
      const renewedTime = new Date(terminated!.renewedAt).getTime();
      const terminatedTime = new Date(terminated!.terminatedAt).getTime();

      expect(renewedTime).toBeGreaterThanOrEqual(createdTime);
      expect(terminatedTime).toBeGreaterThanOrEqual(renewedTime);
    });

    it('should maintain timestamp accuracy across multiple renewals', async () => {
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
      const createdAt = created.createdAt;
      const timestamps: string[] = [created.renewedAt];

      // Perform multiple renewals with longer wait between each
      for (let i = 0; i < 3; i++) {
        // Wait longer than RENEWAL_COALESCE_WINDOW_MS (1000ms) between renewals
        await new Promise((resolve) => setTimeout(resolve, 1100));
        const renewed = await renewSession(testEmail, created.deviceId);

        expect(renewed.createdAt).toBe(createdAt); // unchanged
        timestamps.push(renewed.renewedAt);
        expect(renewed.terminatedAt).toBeNull(); // still active
      }

      // Verify timestamps are strictly increasing
      for (let i = 1; i < timestamps.length; i++) {
        const prevTime = new Date(timestamps[i - 1]).getTime();
        const currTime = new Date(timestamps[i]).getTime();
        expect(currTime).toBeGreaterThan(prevTime);
      }
    });
  });

  describe('T035: E2E test for audit trail (persistent storage)', () => {
    it('should persist all activity timestamps in Blobs storage', async () => {
      const { createSession, renewSession, terminateSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );
      const { getStore } = await import('../../netlify/lib/blobs');

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      // Create session
      const created = await createSession(testEmail, testCode, fingerprint);
      const store = getStore();
      const { blobs } = await store.list({ prefix: 'session:' });
      expect(blobs).toHaveLength(1);
      const keyAfterCreate = blobs[0].key;
      const readStored = async () => JSON.parse((await store.get(keyAfterCreate))!);

      // Verify session stored with timestamps
      const storedAfterCreate = await readStored();
      expect(storedAfterCreate.createdAt).toBe(created.createdAt);
      expect(storedAfterCreate.renewedAt).toBe(created.renewedAt);
      expect(storedAfterCreate.terminatedAt).toBeNull();

      // Renew and verify storage updated
      const renewed = await renewSession(testEmail, created.deviceId);
      const storedAfterRenewal = await readStored();
      expect(storedAfterRenewal.renewedAt).toBe(renewed.renewedAt);
      expect(storedAfterRenewal.terminatedAt).toBeNull();

      // Terminate and verify storage updated
      await terminateSession(testEmail, created.deviceId);
      const storedAfterTermination = await readStored();
      expect(storedAfterTermination.terminatedAt).toBeTruthy();
      expect(storedAfterTermination.status).toBe('terminated');
    });

    it('should maintain audit trail integrity after multiple reader actions', async () => {
      const { createSession, renewSession, terminateSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );
      const { getSession } = await import('../../netlify/lib/reader-access/store');

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      // Create session
      const created = await createSession(testEmail, testCode, fingerprint);

      // Simulate reader actions (accesses)
      const accessPoints: Array<{ action: string; timestamp: Date }> = [
        { action: 'creation', timestamp: new Date(created.createdAt) },
      ];

      // Multiple accesses with renewal
      for (let i = 0; i < 3; i++) {
        // Wait longer than RENEWAL_COALESCE_WINDOW_MS (1000ms) between renewals
        await new Promise((resolve) => setTimeout(resolve, 1100));
        const renewed = await renewSession(testEmail, created.deviceId);
        accessPoints.push({ action: 'renewal', timestamp: new Date(renewed.renewedAt) });
      }

      // Final termination
      await new Promise((resolve) => setTimeout(resolve, 10));
      await terminateSession(testEmail, created.deviceId);
      const final = await getSession(testEmail, created.deviceId);
      accessPoints.push({ action: 'termination', timestamp: new Date(final!.terminatedAt) });

      // Verify timestamps strictly monotonic
      for (let i = 1; i < accessPoints.length; i++) {
        const prevTime = accessPoints[i - 1].timestamp.getTime();
        const currTime = accessPoints[i].timestamp.getTime();
        expect(currTime).toBeGreaterThanOrEqual(prevTime);
      }

      // Verify final session has all three timestamps
      expect(final?.createdAt).toBeTruthy();
      expect(final?.renewedAt).toBeTruthy();
      expect(final?.terminatedAt).toBeTruthy();
    });

    it('should handle concurrent termination and verification', async () => {
      const { createSession, terminateSession } = await import(
        '../../netlify/lib/reader-access/session-service'
      );
      const { getSession } = await import('../../netlify/lib/reader-access/store');

      const fingerprint = {
        userAgent: testUserAgent,
        ipAddress: testIpAddress,
        timezone: 'UTC',
      };

      // Create session
      const created = await createSession(testEmail, testCode, fingerprint);
      const createdAt = created.createdAt;
      const renewedAt = created.renewedAt;

      // Terminate
      await terminateSession(testEmail, created.deviceId);

      // Immediately retrieve multiple times to ensure consistency
      const checks = await Promise.all([
        getSession(testEmail, created.deviceId),
        getSession(testEmail, created.deviceId),
        getSession(testEmail, created.deviceId),
      ]);

      checks.forEach((session) => {
        expect(session?.createdAt).toBe(createdAt);
        expect(session?.renewedAt).toBe(renewedAt);
        expect(session?.terminatedAt).toBeTruthy();
        expect(session?.status).toBe('terminated');
      });
    });
  });
});
