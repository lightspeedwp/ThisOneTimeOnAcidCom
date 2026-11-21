/**
 * Performance profiling tests for session operations.
 * Tests T113: measure session validation, creation, and renewal latency
 *
 * Performance Targets (from session-config.ts):
 * - Session creation: <200ms (acceptable), <100ms (target)
 * - Session validation: <100ms (target), <200ms (acceptable)
 * - Session renewal: <100ms (target), <200ms (acceptable)
 * - Session termination: <100ms (target), <200ms (acceptable)
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { resetInMemoryBlobStore } from '../helpers/in-memory-blob-store';
import { createSession, validateSession, renewSession, terminateSession } from '../../netlify/lib/reader-access/session-service';
import {
  PERFORMANCE_TARGETS,
} from '../../netlify/lib/reader-access/session-config';

// In-memory Netlify Blobs that honours list({ prefix }) like the real store.
vi.mock('../../netlify/lib/blobs', async () =>
  (await import('../helpers/in-memory-blob-store')).inMemoryBlobsModule()
);

describe('Session Performance Profiling - T113', () => {
  const baseEmail = `perf-test-${Date.now()}`;
  const testCode = '123456';
  const fingerprint = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    ipAddress: '192.168.1.1',
    timezone: 'UTC',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    resetInMemoryBlobStore();
  });

  describe('Session creation latency', () => {
    it('should create session within target latency (<100ms)', async () => {
      const start = performance.now();
      await createSession(`${baseEmail}-create-target`, testCode, fingerprint);
      const duration = performance.now() - start;

      console.log(`Session creation (target): ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(PERFORMANCE_TARGETS.createSessionTargetMs);
    });

    it('should create session within acceptable latency (<200ms)', async () => {
      const start = performance.now();
      await createSession(`${baseEmail}-create-acceptable`, testCode, fingerprint);
      const duration = performance.now() - start;

      console.log(`Session creation (acceptable): ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(PERFORMANCE_TARGETS.createSessionAcceptableMs);
    });

    it('should create multiple sessions efficiently', async () => {
      const sessions = [];
      const start = performance.now();

      for (let i = 0; i < 10; i++) {
        const session = await createSession(`${baseEmail}-multi-${i}`, testCode, {
          ...fingerprint,
          ipAddress: `192.168.1.${i}`,
        });
        sessions.push(session);
      }

      const duration = performance.now() - start;
      const avgDuration = duration / 10;

      console.log(`Session creation (10x avg): ${avgDuration.toFixed(2)}ms`);
      expect(avgDuration).toBeLessThan(PERFORMANCE_TARGETS.createSessionAcceptableMs);
    });
  });

  describe('Session validation latency', () => {
    it('should validate session within target latency (<100ms)', async () => {
      const session = await createSession(`${baseEmail}-validate-target`, testCode, fingerprint);

      const start = performance.now();
      await validateSession(session.sessionId, session.email, session.deviceId);
      const duration = performance.now() - start;

      console.log(`Session validation (target): ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(PERFORMANCE_TARGETS.validateSessionTargetMs);
    });

    it('should validate session within acceptable latency (<200ms)', async () => {
      const session = await createSession(`${baseEmail}-validate-acceptable`, testCode, fingerprint);

      const start = performance.now();
      await validateSession(session.sessionId, session.email, session.deviceId);
      const duration = performance.now() - start;

      console.log(`Session validation (acceptable): ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(PERFORMANCE_TARGETS.validateSessionAcceptableMs);
    });

    it('should validate multiple sessions efficiently', async () => {
      const sessions = [];
      for (let i = 0; i < 10; i++) {
        const session = await createSession(`${baseEmail}-validate-multi-${i}`, testCode, {
          ...fingerprint,
          ipAddress: `192.168.1.${i}`,
        });
        sessions.push(session);
      }

      const start = performance.now();
      for (const session of sessions) {
        await validateSession(session.sessionId, session.email, session.deviceId);
      }
      const duration = performance.now() - start;
      const avgDuration = duration / sessions.length;

      console.log(`Session validation (10x avg): ${avgDuration.toFixed(2)}ms`);
      expect(avgDuration).toBeLessThan(PERFORMANCE_TARGETS.validateSessionAcceptableMs);
    });

    it('should detect expired session quickly', async () => {
      const session = await createSession(`${baseEmail}-validate-expired`, testCode, fingerprint);
      const { updateSession } = await import('../../netlify/lib/reader-access/store');

      // Set to expired
      await updateSession(session.email, session.deviceId, {
        expiresAt: new Date(Date.now() - 1000).toISOString(),
      });

      const start = performance.now();
      await validateSession(session.sessionId, session.email, session.deviceId);
      const duration = performance.now() - start;

      console.log(`Session validation (expired): ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(PERFORMANCE_TARGETS.validateSessionAcceptableMs);
    });
  });

  describe('Session renewal latency', () => {
    it('should renew session within target latency (<100ms)', async () => {
      const session = await createSession(`${baseEmail}-renew-target`, testCode, fingerprint);

      const start = performance.now();
      await renewSession(session.email, session.deviceId);
      const duration = performance.now() - start;

      console.log(`Session renewal (target): ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(PERFORMANCE_TARGETS.renewSessionTargetMs);
    });

    it('should renew session within acceptable latency (<200ms)', async () => {
      const session = await createSession(`${baseEmail}-renew-acceptable`, testCode, fingerprint);

      const start = performance.now();
      await renewSession(session.email, session.deviceId);
      const duration = performance.now() - start;

      console.log(`Session renewal (acceptable): ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(PERFORMANCE_TARGETS.renewSessionAcceptableMs);
    });

    it('should renew multiple sessions efficiently', async () => {
      const sessions = [];
      for (let i = 0; i < 10; i++) {
        const session = await createSession(`${baseEmail}-renew-multi-${i}`, testCode, {
          ...fingerprint,
          ipAddress: `192.168.1.${i}`,
        });
        sessions.push(session);
      }

      // Wait for coalesce window
      await new Promise((resolve) => setTimeout(resolve, 1100));

      const start = performance.now();
      for (const session of sessions) {
        await renewSession(session.email, session.deviceId);
      }
      const duration = performance.now() - start;
      const avgDuration = duration / sessions.length;

      console.log(`Session renewal (10x avg): ${avgDuration.toFixed(2)}ms`);
      expect(avgDuration).toBeLessThan(PERFORMANCE_TARGETS.renewSessionAcceptableMs);
    });
  });

  describe('Session termination latency', () => {
    it('should terminate session within target latency (<100ms)', async () => {
      const session = await createSession(`${baseEmail}-terminate-target`, testCode, fingerprint);

      const start = performance.now();
      await terminateSession(session.email, session.deviceId);
      const duration = performance.now() - start;

      console.log(`Session termination (target): ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(PERFORMANCE_TARGETS.terminateSessionTargetMs);
    });

    it('should terminate session within acceptable latency (<200ms)', async () => {
      const session = await createSession(`${baseEmail}-terminate-acceptable`, testCode, fingerprint);

      const start = performance.now();
      await terminateSession(session.email, session.deviceId);
      const duration = performance.now() - start;

      console.log(`Session termination (acceptable): ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(PERFORMANCE_TARGETS.terminateSessionAcceptableMs);
    });

    it('should terminate multiple sessions efficiently', async () => {
      const sessions = [];
      for (let i = 0; i < 10; i++) {
        const session = await createSession(`${baseEmail}-terminate-multi-${i}`, testCode, {
          ...fingerprint,
          ipAddress: `192.168.1.${i}`,
        });
        sessions.push(session);
      }

      const start = performance.now();
      for (const session of sessions) {
        await terminateSession(session.email, session.deviceId);
      }
      const duration = performance.now() - start;
      const avgDuration = duration / sessions.length;

      console.log(`Session termination (10x avg): ${avgDuration.toFixed(2)}ms`);
      expect(avgDuration).toBeLessThan(PERFORMANCE_TARGETS.terminateSessionAcceptableMs);
    });
  });

  describe('Combined workflow latency', () => {
    it('should complete full session lifecycle efficiently', async () => {
      const start = performance.now();

      // Create
      const session = await createSession(`${baseEmail}-lifecycle`, testCode, fingerprint);
      const afterCreate = performance.now();

      // Validate
      await validateSession(session.sessionId, session.email, session.deviceId);
      const afterValidate = performance.now();

      // Wait and renew
      await new Promise((resolve) => setTimeout(resolve, 1100));
      await renewSession(session.email, session.deviceId);
      const afterRenew = performance.now();

      // Terminate
      await terminateSession(session.email, session.deviceId);
      const afterTerminate = performance.now();

      console.log(`Lifecycle - Create: ${(afterCreate - start).toFixed(2)}ms`);
      console.log(`Lifecycle - Validate: ${(afterValidate - afterCreate).toFixed(2)}ms`);
      console.log(`Lifecycle - Renew: ${(afterRenew - afterValidate).toFixed(2)}ms`);
      console.log(`Lifecycle - Terminate: ${(afterTerminate - afterRenew).toFixed(2)}ms`);
      console.log(`Lifecycle - Total: ${(afterTerminate - start).toFixed(2)}ms`);

      // Individual operations should be within targets
      expect(afterCreate - start).toBeLessThan(PERFORMANCE_TARGETS.createSessionAcceptableMs);
      expect(afterValidate - afterCreate).toBeLessThan(PERFORMANCE_TARGETS.validateSessionAcceptableMs);
      expect(afterTerminate - afterRenew).toBeLessThan(PERFORMANCE_TARGETS.terminateSessionAcceptableMs);
    });
  });

  describe('Performance regression detection', () => {
    it('should not regress on session creation', async () => {
      const measurements: number[] = [];

      for (let i = 0; i < 20; i++) {
        const start = performance.now();
        await createSession(`${baseEmail}-regression-create-${i}`, testCode, {
          ...fingerprint,
          ipAddress: `192.168.1.${i % 254}`,
        });
        const duration = performance.now() - start;
        measurements.push(duration);
      }

      const avg = measurements.reduce((a, b) => a + b, 0) / measurements.length;
      const p95 = measurements.sort((a, b) => a - b)[Math.floor(measurements.length * 0.95)];

      console.log(`Creation - Average: ${avg.toFixed(2)}ms, P95: ${p95.toFixed(2)}ms`);
      expect(avg).toBeLessThan(PERFORMANCE_TARGETS.createSessionAcceptableMs);
      expect(p95).toBeLessThan(PERFORMANCE_TARGETS.createSessionAcceptableMs * 1.5);
    });

    it('should not regress on session validation', async () => {
      const sessions = [];
      for (let i = 0; i < 20; i++) {
        const session = await createSession(`${baseEmail}-regression-validate-${i}`, testCode, {
          ...fingerprint,
          ipAddress: `192.168.1.${i % 254}`,
        });
        sessions.push(session);
      }

      const measurements: number[] = [];
      for (const session of sessions) {
        const start = performance.now();
        await validateSession(session.sessionId, session.email, session.deviceId);
        const duration = performance.now() - start;
        measurements.push(duration);
      }

      const avg = measurements.reduce((a, b) => a + b, 0) / measurements.length;
      const p95 = measurements.sort((a, b) => a - b)[Math.floor(measurements.length * 0.95)];

      console.log(`Validation - Average: ${avg.toFixed(2)}ms, P95: ${p95.toFixed(2)}ms`);
      expect(avg).toBeLessThan(PERFORMANCE_TARGETS.validateSessionAcceptableMs);
      expect(p95).toBeLessThan(PERFORMANCE_TARGETS.validateSessionAcceptableMs * 1.5);
    });
  });
});
