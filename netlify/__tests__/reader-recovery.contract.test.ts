// Recovery contract tests (RA-T048)
// Verify recovery attempt creation, expiry, and race handling

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storeRecoveryAttempt, getRecoveryAttempt, deleteRecoveryAttempt, updateRecoverySession } from '../lib/reader-access/store';
import type { StoredRecoveryAttempt } from '../lib/reader-access/store';

describe('Recovery Contract Tests (RA-T048)', () => {
  const now = new Date();
  const recoveryId = 'recovery-test-123';
  const readerId = Buffer.from('test@example.com').toString('base64');
  const sessionId = 'session-abc123';

  describe('Recovery attempt creation', () => {
    it('should create a recovery attempt on code consumption', async () => {
      const expiresAt = new Date(now.getTime() + 4 * 60 * 60 * 1000);

      const recovery: StoredRecoveryAttempt = {
        recoveryId,
        readerId,
        initiatedAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        createdSessionId: sessionId,
        raceOutcome: 'fresh',
      };

      await storeRecoveryAttempt(recovery);
      const retrieved = await getRecoveryAttempt(recoveryId);

      expect(retrieved).toBeDefined();
      expect(retrieved?.recoveryId).toBe(recoveryId);
      expect(retrieved?.readerId).toBe(readerId);
      expect(retrieved?.createdSessionId).toBe(sessionId);
    });

    it('should store recovery with 4-hour expiry window', async () => {
      const expiresAt = new Date(now.getTime() + 4 * 60 * 60 * 1000);
      const recovery: StoredRecoveryAttempt = {
        recoveryId: 'recovery-expiry-test',
        readerId,
        initiatedAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
      };

      await storeRecoveryAttempt(recovery);
      const retrieved = await getRecoveryAttempt('recovery-expiry-test');

      expect(retrieved?.expiresAt).toBe(expiresAt.toISOString());
      // Verify 4-hour window (14400000 ms)
      const expiryMs = new Date(retrieved!.expiresAt).getTime() - new Date(retrieved!.initiatedAt).getTime();
      expect(expiryMs).toBe(4 * 60 * 60 * 1000);
    });
  });

  describe('Recovery-first race handling (Q4 settled)', () => {
    it('should mark race outcome when recovery succeeds first', async () => {
      const recovery: StoredRecoveryAttempt = {
        recoveryId: 'recovery-race-first',
        readerId,
        initiatedAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString(),
      };

      await storeRecoveryAttempt(recovery);
      const updated = await updateRecoverySession('recovery-race-first', sessionId, 'recovery_first');

      expect(updated?.raceOutcome).toBe('recovery_first');
      expect(updated?.createdSessionId).toBe(sessionId);
    });

    it('should mark race outcome when competing code finishes after recovery', async () => {
      const recovery: StoredRecoveryAttempt = {
        recoveryId: 'recovery-code-after',
        readerId,
        initiatedAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString(),
        createdSessionId: sessionId,
      };

      await storeRecoveryAttempt(recovery);
      const updated = await updateRecoverySession('recovery-code-after', sessionId, 'code_first');

      expect(updated?.raceOutcome).toBe('code_first');
      // Session extends same session, not duplicate
      expect(updated?.createdSessionId).toBe(sessionId);
    });
  });

  describe('Recovery expiry validation', () => {
    it('should identify expired recovery attempts', async () => {
      const pastDate = new Date(now.getTime() - 1000);
      const recovery: StoredRecoveryAttempt = {
        recoveryId: 'recovery-expired',
        readerId,
        initiatedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
        expiresAt: pastDate.toISOString(),
      };

      await storeRecoveryAttempt(recovery);
      const retrieved = await getRecoveryAttempt('recovery-expired');

      expect(retrieved).toBeDefined();
      const isExpired = new Date(retrieved!.expiresAt) < now;
      expect(isExpired).toBe(true);
    });

    it('should return null for non-existent recovery attempts', async () => {
      const retrieved = await getRecoveryAttempt('non-existent-recovery');
      expect(retrieved).toBeNull();
    });
  });

  describe('Recovery cleanup', () => {
    it('should delete recovery attempt after use', async () => {
      const recovery: StoredRecoveryAttempt = {
        recoveryId: 'recovery-cleanup',
        readerId,
        initiatedAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString(),
      };

      await storeRecoveryAttempt(recovery);
      await deleteRecoveryAttempt('recovery-cleanup');
      const retrieved = await getRecoveryAttempt('recovery-cleanup');

      expect(retrieved).toBeNull();
    });
  });

  describe('Recovery state machine validation', () => {
    it('should track recovery state transitions (initiated → succeeded)', async () => {
      const recovery: StoredRecoveryAttempt = {
        recoveryId: 'recovery-state-machine',
        readerId,
        initiatedAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString(),
        // State: initiated (no createdSessionId yet)
      };

      // Initial state: initiated
      await storeRecoveryAttempt(recovery);
      let current = await getRecoveryAttempt('recovery-state-machine');
      expect(current?.createdSessionId).toBeUndefined();

      // Transition: succeeded
      const updated = await updateRecoverySession('recovery-state-machine', sessionId, 'recovery_first');
      expect(updated?.createdSessionId).toBe(sessionId);

      // Verify state persisted
      current = await getRecoveryAttempt('recovery-state-machine');
      expect(current?.createdSessionId).toBe(sessionId);
    });
  });
});
