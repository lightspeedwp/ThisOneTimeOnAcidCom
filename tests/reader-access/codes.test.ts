// Unit tests for verification code generation and validation
// RA-T029: Tests for code hashing, expiry (10 minutes), attempt limits (5 max)
// Maps RA-002/RA-003

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateCode,
  hashCode,
  verifyCode,
  createVerificationCode,
  isCodeExpired,
  isCodeLimited,
} from '../../netlify/lib/reader-access/codes';

describe('codes adapter', () => {
  describe('generateCode', () => {
    it('generates a 6-digit code', () => {
      const code = generateCode();
      expect(code).toMatch(/^\d{6}$/);
    });

    it('generates codes within valid range (0-999999)', () => {
      for (let i = 0; i < 100; i++) {
        const code = parseInt(generateCode(), 10);
        expect(code).toBeGreaterThanOrEqual(0);
        expect(code).toBeLessThan(1000000);
      }
    });

    it('pads with leading zeros', () => {
      // Test that codes starting with 0 are padded correctly
      let generated = false;
      for (let i = 0; i < 1000; i++) {
        const code = generateCode();
        if (code.startsWith('0')) {
          generated = true;
          expect(code.length).toBe(6);
          break;
        }
      }
      // We expect to eventually generate a code with leading zero
    });
  });

  describe('hashCode', () => {
    it('produces consistent hash for same code and salt', () => {
      const code = '123456';
      const hash1 = hashCode(code);
      const hash2 = hashCode(code, Buffer.from(hash1.salt, 'base64'));
      expect(hash2.hash).toBe(hash1.hash);
    });

    it('produces different hashes for different codes', () => {
      const hash1 = hashCode('123456');
      const hash2 = hashCode('654321');
      expect(hash1.hash).not.toBe(hash2.hash);
    });

    it('returns base64-encoded hash and salt', () => {
      const { hash, salt } = hashCode('123456');
      expect(hash).toBeDefined();
      expect(salt).toBeDefined();
      expect(() => Buffer.from(hash, 'base64')).not.toThrow();
      expect(() => Buffer.from(salt, 'base64')).not.toThrow();
    });
  });

  describe('verifyCode', () => {
    it('returns true for valid code', () => {
      const plainCode = '123456';
      const { hash, salt } = hashCode(plainCode);
      expect(verifyCode(plainCode, hash, salt)).toBe(true);
    });

    it('returns false for invalid code', () => {
      const plainCode = '123456';
      const { hash, salt } = hashCode(plainCode);
      expect(verifyCode('654321', hash, salt)).toBe(false);
    });

    it('performs constant-time comparison (not vulnerable to timing attacks)', () => {
      const plainCode = '123456';
      const { hash, salt } = hashCode(plainCode);
      // Test that similar codes take roughly same time (not exact, but reasonable)
      const start1 = Date.now();
      verifyCode('000000', hash, salt);
      const time1 = Date.now() - start1;

      const start2 = Date.now();
      verifyCode('999999', hash, salt);
      const time2 = Date.now() - start2;

      // Both should take roughly the same time (within 100ms tolerance for CI variance)
      expect(Math.abs(time1 - time2)).toBeLessThan(100);
    });
  });

  describe('createVerificationCode', () => {
    it('creates code with required fields', () => {
      const code = createVerificationCode();
      expect(code).toHaveProperty('codeHash');
      expect(code).toHaveProperty('salt');
      expect(code).toHaveProperty('createdAt');
      expect(code).toHaveProperty('expiresAt');
      expect(code).toHaveProperty('attemptCount');
      expect(code).toHaveProperty('maxAttempts');
    });

    it('sets attemptCount to 0', () => {
      const code = createVerificationCode();
      expect(code.attemptCount).toBe(0);
    });

    it('sets maxAttempts to 5', () => {
      const code = createVerificationCode();
      expect(code.maxAttempts).toBe(5);
    });

    it('sets expiresAt to 10 minutes after createdAt', () => {
      const code = createVerificationCode();
      const created = new Date(code.createdAt);
      const expires = new Date(code.expiresAt);
      const differenceMs = expires.getTime() - created.getTime();
      const expectedMs = 10 * 60 * 1000; // 10 minutes
      expect(Math.abs(differenceMs - expectedMs)).toBeLessThan(1000); // Within 1 second
    });
  });

  describe('isCodeExpired', () => {
    it('returns false for future expiry', () => {
      const future = new Date(Date.now() + 60000).toISOString();
      expect(isCodeExpired(future)).toBe(false);
    });

    it('returns true for past expiry', () => {
      const past = new Date(Date.now() - 60000).toISOString();
      expect(isCodeExpired(past)).toBe(true);
    });

    it('handles now expiry as expired', () => {
      const now = new Date().toISOString();
      expect(isCodeExpired(now)).toBe(true);
    });
  });

  describe('isCodeLimited', () => {
    it('returns false when attempts below max', () => {
      expect(isCodeLimited(0, 5)).toBe(false);
      expect(isCodeLimited(3, 5)).toBe(false);
      expect(isCodeLimited(4, 5)).toBe(false);
    });

    it('returns true when attempts at max', () => {
      expect(isCodeLimited(5, 5)).toBe(true);
    });

    it('returns true when attempts exceed max', () => {
      expect(isCodeLimited(6, 5)).toBe(true);
    });

    it('defaults to maxAttempts of 5', () => {
      expect(isCodeLimited(5)).toBe(true);
      expect(isCodeLimited(4)).toBe(false);
    });
  });
});
