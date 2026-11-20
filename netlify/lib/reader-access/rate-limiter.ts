/**
 * Rate limiting utilities for reader access endpoints.
 * Prevents abuse and enumeration attacks on session creation.
 *
 * Uses in-memory rate limiting with optional Blobs persistence for distributed systems.
 */

/**
 * Rate limit configuration per endpoint
 */
export interface RateLimitConfig {
  /** Maximum attempts allowed in the window */
  maxAttempts: number;

  /** Time window in milliseconds */
  windowMs: number;

  /** Key prefix for the rate limit entry */
  keyPrefix: string;
}

/**
 * Rate limit entry tracking attempts and window
 */
interface RateLimitEntry {
  /** Number of attempts in current window */
  attempts: number;

  /** Timestamp when the window resets */
  resetAt: number;
}

/**
 * In-memory rate limit store (for single-instance deployments).
 * For distributed systems, consider backing with Blobs or Redis.
 */
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Configuration presets for different endpoints
 */
export const RATE_LIMIT_PRESETS = {
  /**
   * Session creation: 5 attempts per email per minute
   * Prevents brute force and account enumeration
   */
  SESSION_CREATION: {
    maxAttempts: 5,
    windowMs: 60 * 1000, // 1 minute
    keyPrefix: 'session-create',
  } as RateLimitConfig,

  /**
   * Email verification: 10 attempts per email per 5 minutes
   * Allows multiple verification attempts without excessive blocking
   */
  EMAIL_VERIFICATION: {
    maxAttempts: 10,
    windowMs: 5 * 60 * 1000, // 5 minutes
    keyPrefix: 'email-verify',
  } as RateLimitConfig,

  /**
   * Device logout: 20 attempts per email per minute
   * Less restrictive than session creation
   */
  DEVICE_LOGOUT: {
    maxAttempts: 20,
    windowMs: 60 * 1000, // 1 minute
    keyPrefix: 'device-logout',
  } as RateLimitConfig,
};

/**
 * Check if a request should be rate limited.
 * Returns whether the request exceeds the configured limits.
 *
 * @param identifier Unique identifier (email, IP, etc.)
 * @param config Rate limit configuration
 * @returns Object with isLimited flag, attempts count, and resetTime
 *
 * @example
 * const result = checkRateLimit('reader@example.com', RATE_LIMIT_PRESETS.SESSION_CREATION);
 * if (result.isLimited) {
 *   return new Response(..., { status: 429, headers: { 'Retry-After': result.resetAfterSeconds } });
 * }
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): {
  isLimited: boolean;
  attempts: number;
  maxAttempts: number;
  resetAt: number;
  resetAfterSeconds: number;
} {
  const key = `${config.keyPrefix}:${identifier}`;
  const now = Date.now();

  // Get or create rate limit entry
  let entry = rateLimitStore.get(key);

  if (!entry || now >= entry.resetAt) {
    // Create new entry or reset existing one
    entry = {
      attempts: 0,
      resetAt: now + config.windowMs,
    };
    rateLimitStore.set(key, entry);
  }

  // Increment attempt counter
  entry.attempts++;

  // Check if limit exceeded
  const isLimited = entry.attempts > config.maxAttempts;
  const resetAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);

  return {
    isLimited,
    attempts: entry.attempts,
    maxAttempts: config.maxAttempts,
    resetAt: entry.resetAt,
    resetAfterSeconds,
  };
}

/**
 * Reset rate limit for an identifier (e.g., after successful verification).
 * Allows users to retry after completing their action successfully.
 *
 * @param identifier Unique identifier
 * @param keyPrefix Rate limit key prefix
 */
export function resetRateLimit(identifier: string, keyPrefix: string): void {
  const key = `${keyPrefix}:${identifier}`;
  rateLimitStore.delete(key);
}

/**
 * Get current rate limit status without incrementing attempts.
 * Useful for client-side feedback about remaining attempts.
 *
 * @param identifier Unique identifier
 * @param config Rate limit configuration
 * @returns Current status without side effects
 */
export function getRateLimitStatus(
  identifier: string,
  config: RateLimitConfig
): {
  attempts: number;
  remaining: number;
  isLimited: boolean;
  resetAt: number;
} {
  const key = `${config.keyPrefix}:${identifier}`;
  const now = Date.now();

  const entry = rateLimitStore.get(key);

  if (!entry || now >= entry.resetAt) {
    return {
      attempts: 0,
      remaining: config.maxAttempts,
      isLimited: false,
      resetAt: now + config.windowMs,
    };
  }

  return {
    attempts: entry.attempts,
    remaining: Math.max(0, config.maxAttempts - entry.attempts),
    isLimited: entry.attempts > config.maxAttempts,
    resetAt: entry.resetAt,
  };
}

/**
 * Clean up old rate limit entries (periodic maintenance).
 * Prevents unbounded memory growth in long-running processes.
 * Should be called periodically (e.g., via a cron job).
 *
 * @returns Number of entries removed
 */
export function cleanupExpiredEntries(): number {
  const now = Date.now();
  let removed = 0;

  for (const [key, entry] of rateLimitStore.entries()) {
    if (now >= entry.resetAt) {
      rateLimitStore.delete(key);
      removed++;
    }
  }

  return removed;
}

/**
 * Get rate limit statistics (for monitoring).
 * Useful for alerting on suspicious activity.
 *
 * @returns Object with store size and cleanup recommendation
 */
export function getRateLimitStats(): {
  storeSize: number;
  recommendCleanup: boolean;
} {
  return {
    storeSize: rateLimitStore.size,
    recommendCleanup: rateLimitStore.size > 10000, // Clean up if >10k entries
  };
}
