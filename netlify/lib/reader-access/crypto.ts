/**
 * Cryptographic utilities for session token security.
 * Implements constant-time comparison and secure token generation.
 */

import { randomBytes, createHash, timingSafeEqual } from 'crypto';
import { MIN_TOKEN_ENTROPY_BYTES } from './session-config';

/**
 * Generate a cryptographically secure session token.
 * Uses Node's crypto.randomBytes to generate minimum 256-bit entropy.
 *
 * @param entropyBytes Number of random bytes (default: 32 = 256 bits)
 * @returns Base64url-encoded session token
 *
 * @example
 * const token = generateSessionToken();
 * // => 'aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890AB'
 */
export function generateSessionToken(entropyBytes: number = MIN_TOKEN_ENTROPY_BYTES): string {
  // Validate entropy requirement (at least 256 bits = 32 bytes)
  if (entropyBytes < MIN_TOKEN_ENTROPY_BYTES) {
    throw new Error(
      `Session token must have at least ${MIN_TOKEN_ENTROPY_BYTES} bytes (${MIN_TOKEN_ENTROPY_BYTES * 8} bits) of entropy`
    );
  }

  // Generate cryptographically secure random bytes
  const randomBuffer = randomBytes(entropyBytes);

  // Encode as base64url (web-safe variant without padding)
  // This avoids URL-encoding issues and is standard for JWT-style tokens
  return randomBuffer.toString('base64url');
}

/**
 * Constant-time token comparison to prevent timing attacks.
 * Uses Node's timingSafeEqual which runs in constant time.
 *
 * Token validation must not leak information about which part of the token
 * is incorrect via response time. This function compares in constant time
 * regardless of where mismatches occur.
 *
 * @param storedToken Token stored in database (session)
 * @param providedToken Token from request (cookie/header)
 * @returns true if tokens match, false if they differ (constant time)
 *
 * @example
 * const isValid = constantTimeTokenCompare(sessionToken, requestToken);
 * if (!isValid) {
 *   return { statusCode: 401, error: 'invalid_token' };
 * }
 */
export function constantTimeTokenCompare(
  storedToken: string | undefined,
  providedToken: string | undefined
): boolean {
  // Both tokens must be present and non-empty
  if (!storedToken || !providedToken) {
    return false;
  }

  // Both must be strings
  if (typeof storedToken !== 'string' || typeof providedToken !== 'string') {
    return false;
  }

  // Convert to buffers
  const storedBuffer = Buffer.from(storedToken, 'utf-8');
  const providedBuffer = Buffer.from(providedToken, 'utf-8');

  try {
    // timingSafeEqual runs in constant time, throws if lengths differ
    // For base64url tokens, we expect identical lengths
    return timingSafeEqual(storedBuffer, providedBuffer);
  } catch {
    // timingSafeEqual throws if buffers have different lengths
    // This is expected for invalid tokens
    // Return false without revealing the length mismatch
    return false;
  }
}

/**
 * Hash a value using SHA256 for consistent checksums.
 * Used for device fingerprint hashing and other derived values.
 *
 * @param value String value to hash
 * @returns Hex-encoded SHA256 hash
 *
 * @example
 * const hash = hashSha256('some-value');
 * // => 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
 */
export function hashSha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

/**
 * Validate a session token format.
 * Base64url-encoded tokens should be:
 * - Non-empty strings
 * - Valid base64url characters
 * - Reasonable length (not too short or absurdly long)
 *
 * @param token Token to validate
 * @returns true if token looks valid, false otherwise
 *
 * @example
 * if (!isValidSessionToken(token)) {
 *   return { statusCode: 400, error: 'invalid_token_format' };
 * }
 */
export function isValidSessionToken(token: unknown): boolean {
  // Must be a string
  if (typeof token !== 'string') {
    return false;
  }

  // Must be non-empty
  if (token.length === 0) {
    return false;
  }

  // Base64url-encoded tokens should be 32-128 characters
  // 32 bytes encoded in base64url ≈ 43 chars
  if (token.length < 40 || token.length > 200) {
    return false;
  }

  // Must contain only base64url characters (A-Z, a-z, 0-9, -, _)
  if (!/^[A-Za-z0-9_-]+$/.test(token)) {
    return false;
  }

  return true;
}

/**
 * Generate a checksum for a session object for integrity validation.
 * Not cryptographically secure for auth, but useful for detecting corruption.
 *
 * @param sessionData Object to checksum
 * @returns Hex-encoded SHA256 hash of JSON representation
 */
export function generateSessionChecksum(sessionData: Record<string, unknown>): string {
  // Sort keys for consistent ordering
  const sortedJson = JSON.stringify(sortObjectKeys(sessionData));
  return hashSha256(sortedJson);
}

/**
 * Recursively sort object keys for consistent JSON representation.
 * Used by generateSessionChecksum to ensure reproducible hashes.
 *
 * @param obj Object to sort
 * @returns Object with keys sorted recursively
 */
function sortObjectKeys(obj: unknown): unknown {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sortObjectKeys(item));
  }

  if (typeof obj === 'object') {
    const sorted: Record<string, unknown> = {};
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        sorted[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
      });
    return sorted;
  }

  return obj;
}

/**
 * Mask sensitive data in a string for logging.
 * Shows first and last few characters, hides the middle.
 *
 * @param value String to mask
 * @param showChars Number of characters to show at start/end (default: 4)
 * @returns Masked string (e.g., 'aBcd...eFgh')
 *
 * @example
 * maskSensitive('super-secret-token-12345');
 * // => 'supe...2345'
 */
export function maskSensitive(value: string, showChars: number = 4): string {
  if (value.length <= showChars * 2) {
    // Don't mask very short values
    return value;
  }

  const start = value.substring(0, showChars);
  const end = value.substring(value.length - showChars);
  return `${start}...${end}`;
}
