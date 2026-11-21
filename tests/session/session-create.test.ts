/**
 * Unit tests for session creation.
 * Tests T078: session creation with 30-day expiry and secure token generation
 *
 * User Story 1: Seamless Chapter Access After Email Verification
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { resetInMemoryBlobStore } from '../helpers/in-memory-blob-store';
import { createSession, getActiveSessionCount } from '../../netlify/lib/reader-access/session-service';
import { storeSession, getSession, listSessionsByEmail } from '../../netlify/lib/reader-access/store';
import { SESSION_LIFETIME_DAYS } from '../../netlify/lib/reader-access/session-config';

// In-memory Netlify Blobs that honours list({ prefix }) like the real store.
vi.mock('../../netlify/lib/blobs', async () =>
  (await import('../helpers/in-memory-blob-store')).inMemoryBlobsModule()
);

describe('Session Creation - T078 (US1)', () => {
  const testEmail = `reader-create-${Date.now()}@example.com`;
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

  describe('Session creation basics', () => {
    it('should create session with sessionId property', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      expect(session.sessionId).toBeTruthy();
      expect(typeof session.sessionId).toBe('string');
      expect(session.sessionId.length).toBeGreaterThan(0);
    });

    it('should generate cryptographically secure token (minimum 32 bytes)', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      // Token should be base64url encoded, minimum 32 bytes = 43 chars in base64url
      expect(session.sessionId.length).toBeGreaterThanOrEqual(43);
    });

    it('should include email in session', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      expect(session.email).toBe(testEmail);
    });

    it('should include deviceId (fingerprint hash)', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      expect(session.deviceId).toBeTruthy();
      expect(typeof session.deviceId).toBe('string');
    });

    it('should set status to active', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      expect(session.status).toBe('active');
    });

    it('should set terminatedAt to null', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      expect(session.terminatedAt).toBeNull();
    });
  });

  describe('Session expiry (30-day window)', () => {
    it('should set expiresAt to 30 days from creation', async () => {
      const beforeCreation = new Date();
      const session = await createSession(testEmail, testCode, fingerprint);
      const afterCreation = new Date();

      const expiresAt = new Date(session.expiresAt);
      const expectedExpiresAt = new Date(beforeCreation.getTime() + SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000);

      // Allow ±5 seconds for execution time
      const timeDiff = Math.abs(expiresAt.getTime() - expectedExpiresAt.getTime());
      expect(timeDiff).toBeLessThan(5000);
    });

    it('should set expiresAt to exactly 30 days (±1 second precision)', async () => {
      const before = Date.now();
      const session = await createSession(testEmail, testCode, fingerprint);
      const after = Date.now();

      const expiresAtTime = new Date(session.expiresAt).getTime();
      const expectedExpiry = before + SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000;

      // Within 1 second tolerance
      expect(Math.abs(expiresAtTime - expectedExpiry)).toBeLessThan(1000);
    });

    it('should use ISO 8601 format for expiresAt', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z?$/;
      expect(session.expiresAt).toMatch(isoRegex);
    });

    it('should have expiresAt in the future', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      const expiresAt = new Date(session.expiresAt);
      const now = new Date();
      expect(expiresAt.getTime()).toBeGreaterThan(now.getTime());
    });
  });

  describe('Session timestamps', () => {
    it('should set createdAt to current time', async () => {
      const before = Date.now();
      const session = await createSession(testEmail, testCode, fingerprint);
      const after = Date.now();

      const createdAtTime = new Date(session.createdAt).getTime();
      expect(createdAtTime).toBeGreaterThanOrEqual(before);
      expect(createdAtTime).toBeLessThanOrEqual(after);
    });

    it('should set renewedAt equal to createdAt on creation', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      expect(session.renewedAt).toBe(session.createdAt);
    });

    it('should use ISO 8601 format for all timestamps', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z?$/;

      expect(session.createdAt).toMatch(isoRegex);
      expect(session.renewedAt).toMatch(isoRegex);
      expect(session.expiresAt).toMatch(isoRegex);
    });
  });

  describe('Session storage', () => {
    it('should store session in Blobs', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);

      // Retrieve from storage to verify persistence
      const retrieved = await getSession(testEmail, session.deviceId);
      expect(retrieved).not.toBeNull();
      expect(retrieved?.sessionId).toBe(session.sessionId);
    });

    it('should use email:deviceId as storage key', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);

      // Verify retrieval by email and deviceId
      const retrieved = await getSession(testEmail, session.deviceId);
      expect(retrieved?.sessionId).toBe(session.sessionId);
      expect(retrieved?.email).toBe(testEmail);
      expect(retrieved?.deviceId).toBe(session.deviceId);
    });

    it('should persist all session properties', async () => {
      const session = await createSession(testEmail, testCode, fingerprint);
      const retrieved = await getSession(testEmail, session.deviceId);

      expect(retrieved).toEqual(session);
    });
  });

  describe('Session uniqueness', () => {
    it('should generate unique sessionId each time', async () => {
      const email2 = `${testEmail}-2`;
      const session1 = await createSession(testEmail, testCode, fingerprint);
      const session2 = await createSession(email2, testCode, {
        ...fingerprint,
        ipAddress: '192.168.1.2',
      });

      expect(session1.sessionId).not.toBe(session2.sessionId);
    });

    it('should not create duplicate sessionIds', async () => {
      const sessions = await Promise.all([
        createSession(`${testEmail}-a`, testCode, fingerprint),
        createSession(`${testEmail}-b`, testCode, fingerprint),
        createSession(`${testEmail}-c`, testCode, fingerprint),
      ]);

      const tokenSet = new Set(sessions.map((s) => s.sessionId));
      expect(tokenSet.size).toBe(3); // All unique
    });
  });
});
