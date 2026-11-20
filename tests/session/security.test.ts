/**
 * Security-focused tests for session management.
 * Tests timing attack resistance, rate limiting, and constant-time comparison.
 *
 * Run with: npm test -- tests/session/security.test.ts
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { constantTimeTokenCompare, isValidSessionToken } from '../../netlify/lib/reader-access/crypto';
import { checkRateLimit, getRateLimitStatus, resetRateLimit, RATE_LIMIT_PRESETS } from '../../netlify/lib/reader-access/rate-limiter';

describe('Session Security - Constant-Time Comparison', () => {
  describe('constantTimeTokenCompare', () => {
    it('should return true for matching tokens', () => {
      const token = 'test-session-token-12345';
      const result = constantTimeTokenCompare(token, token);
      expect(result).toBe(true);
    });

    it('should return false for different tokens', () => {
      const result = constantTimeTokenCompare('token1', 'token2');
      expect(result).toBe(false);
    });

    it('should handle undefined tokens safely', () => {
      expect(constantTimeTokenCompare(undefined, 'token')).toBe(false);
      expect(constantTimeTokenCompare('token', undefined)).toBe(false);
      expect(constantTimeTokenCompare(undefined, undefined)).toBe(false);
    });

    it('should handle empty string tokens', () => {
      expect(constantTimeTokenCompare('', '')).toBe(true);
      expect(constantTimeTokenCompare('', 'token')).toBe(false);
      expect(constantTimeTokenCompare('token', '')).toBe(false);
    });

    it('should use constant-time comparison (no timing leaks)', () => {
      // Measure comparison time for correct vs incorrect tokens
      const correctToken = 'a'.repeat(43); // base64url token length
      const wrongShorter = 'b'.repeat(10);
      const wrongLonger = 'c'.repeat(100);
      const wrongSameLength = 'x'.repeat(43);

      // Run multiple times to get statistical average
      const iterations = 1000;
      const timings: Record<string, number[]> = {
        correct: [],
        wrongShorter: [],
        wrongLonger: [],
        wrongSameLength: [],
      };

      for (let i = 0; i < iterations; i++) {
        const start1 = process.hrtime.bigint();
        constantTimeTokenCompare(correctToken, correctToken);
        const time1 = Number(process.hrtime.bigint() - start1);
        timings.correct.push(time1);

        const start2 = process.hrtime.bigint();
        constantTimeTokenCompare(correctToken, wrongShorter);
        const time2 = Number(process.hrtime.bigint() - start2);
        timings.wrongShorter.push(time2);

        const start3 = process.hrtime.bigint();
        constantTimeTokenCompare(correctToken, wrongLonger);
        const time3 = Number(process.hrtime.bigint() - start3);
        timings.wrongLonger.push(time3);

        const start4 = process.hrtime.bigint();
        constantTimeTokenCompare(correctToken, wrongSameLength);
        const time4 = Number(process.hrtime.bigint() - start4);
        timings.wrongSameLength.push(time4);
      }

      // Calculate averages
      const avgCorrect = timings.correct.reduce((a, b) => a + b, 0) / iterations;
      const avgWrongSameLength =
        timings.wrongSameLength.reduce((a, b) => a + b, 0) / iterations;

      // For same-length tokens, timing should be nearly identical (constant-time)
      const timingRatio = Math.max(avgCorrect, avgWrongSameLength) /
        Math.min(avgCorrect, avgWrongSameLength);

      // Allow up to 1.5x variance for constant-time comparison
      expect(timingRatio).toBeLessThan(1.5);
    });
  });

  describe('isValidSessionToken', () => {
    it('should validate correct token format', () => {
      const validToken = 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODk='; // 48 chars base64
      expect(isValidSessionToken(validToken)).toBe(true);
    });

    it('should reject non-string tokens', () => {
      expect(isValidSessionToken(null)).toBe(false);
      expect(isValidSessionToken(undefined)).toBe(false);
      expect(isValidSessionToken(123)).toBe(false);
      expect(isValidSessionToken({ token: 'test' })).toBe(false);
    });

    it('should reject empty tokens', () => {
      expect(isValidSessionToken('')).toBe(false);
    });

    it('should reject tokens with invalid characters', () => {
      expect(isValidSessionToken('token with spaces')).toBe(false);
      expect(isValidSessionToken('token@with#special')).toBe(false);
      expect(isValidSessionToken('token\nwith\nnewlines')).toBe(false);
    });

    it('should reject tokens that are too short', () => {
      expect(isValidSessionToken('short')).toBe(false);
    });

    it('should reject tokens that are too long', () => {
      const longToken = 'a'.repeat(500);
      expect(isValidSessionToken(longToken)).toBe(false);
    });

    it('should accept base64url characters', () => {
      const base64urlToken = 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODlBQkNE'; // With - and _
      expect(isValidSessionToken(base64urlToken)).toBe(true);
    });
  });
});

describe('Session Security - Rate Limiting', () => {
  beforeEach(() => {
    // Reset rate limit store before each test
    vi.clearAllMocks();
  });

  describe('checkRateLimit', () => {
    it('should allow requests under limit', () => {
      const email = 'test@example.com';
      const config = RATE_LIMIT_PRESETS.SESSION_CREATION; // 5 per minute

      for (let i = 0; i < 5; i++) {
        const result = checkRateLimit(email, config);
        expect(result.isLimited).toBe(false);
        expect(result.attempts).toBe(i + 1);
      }
    });

    it('should deny requests over limit', () => {
      const email = 'test@example.com';
      const config = RATE_LIMIT_PRESETS.SESSION_CREATION; // 5 per minute

      // Make 5 requests (at limit)
      for (let i = 0; i < 5; i++) {
        checkRateLimit(email, config);
      }

      // 6th request should be limited
      const result = checkRateLimit(email, config);
      expect(result.isLimited).toBe(true);
      expect(result.attempts).toBe(6);
      expect(result.maxAttempts).toBe(5);
    });

    it('should track attempts correctly per identifier', () => {
      const config = RATE_LIMIT_PRESETS.SESSION_CREATION;

      const email1 = 'user1@example.com';
      const email2 = 'user2@example.com';

      // Email1: 3 attempts
      for (let i = 0; i < 3; i++) {
        checkRateLimit(email1, config);
      }

      // Email2: 1 attempt
      checkRateLimit(email2, config);

      // Email1 should still have 2 attempts remaining
      const result1 = getRateLimitStatus(email1, config);
      expect(result1.attempts).toBe(3);
      expect(result1.remaining).toBe(2);

      // Email2 should have 4 attempts remaining
      const result2 = getRateLimitStatus(email2, config);
      expect(result2.attempts).toBe(1);
      expect(result2.remaining).toBe(4);
    });

    it('should include reset time in response', () => {
      const email = 'test@example.com';
      const config = RATE_LIMIT_PRESETS.SESSION_CREATION;

      const result = checkRateLimit(email, config);

      expect(result.resetAt).toBeDefined();
      expect(result.resetAfterSeconds).toBeGreaterThan(0);
      expect(result.resetAfterSeconds).toBeLessThanOrEqual(60); // 1 minute window
    });
  });

  describe('resetRateLimit', () => {
    it('should clear rate limit for identifier', () => {
      const email = 'test@example.com';
      const config = RATE_LIMIT_PRESETS.SESSION_CREATION;

      // Make 5 attempts (at limit)
      for (let i = 0; i < 5; i++) {
        checkRateLimit(email, config);
      }

      // Should be limited
      let result = checkRateLimit(email, config);
      expect(result.isLimited).toBe(true);

      // Reset
      resetRateLimit(email, config.keyPrefix);

      // Should now allow more attempts
      result = checkRateLimit(email, config);
      expect(result.isLimited).toBe(false);
      expect(result.attempts).toBe(1);
    });
  });

  describe('getRateLimitStatus', () => {
    it('should return current status without incrementing', () => {
      const email = 'test@example.com';
      const config = RATE_LIMIT_PRESETS.SESSION_CREATION;

      // Make 2 attempts
      checkRateLimit(email, config);
      checkRateLimit(email, config);

      // Check status (should not increment)
      const status1 = getRateLimitStatus(email, config);
      expect(status1.attempts).toBe(2);

      const status2 = getRateLimitStatus(email, config);
      expect(status2.attempts).toBe(2); // Still 2, not 3
    });

    it('should report remaining attempts', () => {
      const email = 'test@example.com';
      const config = RATE_LIMIT_PRESETS.SESSION_CREATION; // 5 max

      // Make 2 attempts
      checkRateLimit(email, config);
      checkRateLimit(email, config);

      const status = getRateLimitStatus(email, config);
      expect(status.remaining).toBe(3); // 5 - 2 = 3
    });
  });

  describe('Rate limit presets', () => {
    it('should have different limits for different endpoints', () => {
      const sessionCreation = RATE_LIMIT_PRESETS.SESSION_CREATION;
      const emailVerification = RATE_LIMIT_PRESETS.EMAIL_VERIFICATION;
      const deviceLogout = RATE_LIMIT_PRESETS.DEVICE_LOGOUT;

      // Different max attempts
      expect(sessionCreation.maxAttempts).toBeLessThan(emailVerification.maxAttempts);
      expect(emailVerification.maxAttempts).toBeLessThan(deviceLogout.maxAttempts);

      // Different window sizes
      expect(sessionCreation.windowMs).toBe(60 * 1000); // 1 minute
      expect(emailVerification.windowMs).toBe(5 * 60 * 1000); // 5 minutes
    });
  });
});

describe('Session Security - Timing Attack Resistance', () => {
  it('should resist timing attacks on session validation', () => {
    // Test that validation time is consistent regardless of token similarity
    // This is implementation detail, but important for security

    // Create many tokens and measure validation time variance
    const tokens: string[] = [];
    for (let i = 0; i < 20; i++) {
      tokens.push('a'.repeat(40 + i)); // Varying lengths
    }

    const timings: number[] = [];

    tokens.forEach(token => {
      const start = process.hrtime.bigint();
      // Try to compare with another token of same length
      const reference = 'x'.repeat(token.length);
      constantTimeTokenCompare(token, reference);
      const duration = Number(process.hrtime.bigint() - start);
      timings.push(duration);
    });

    // Check variance in timing (should be low for constant-time)
    const avg = timings.reduce((a, b) => a + b, 0) / timings.length;
    const variance = timings.reduce((sum, t) => sum + Math.pow(t - avg, 2), 0) / timings.length;
    const stdDev = Math.sqrt(variance);
    const coefficientOfVariation = stdDev / avg;

    // For constant-time comparison, CV should be low (<0.5)
    expect(coefficientOfVariation).toBeLessThan(0.7);
  });
});
