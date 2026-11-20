/**
 * Device fingerprinting utility for consistent device identification.
 * Uses User-Agent + IP address + timezone to create a stable device hash.
 */

import { createHash } from 'crypto';

/**
 * Device fingerprint input from HTTP request and client
 */
export interface FingerprintInput {
  /** User-Agent header from browser */
  userAgent: string;

  /** Client IP address (from X-Forwarded-For or connection) */
  ipAddress: string;

  /** Client timezone (e.g., 'America/Los_Angeles') */
  timezone?: string;

  /** Screen resolution (e.g., '1920x1080') - optional */
  screenResolution?: string;
}

/**
 * Generate a stable device fingerprint hash from request/client data.
 * Result is deterministic: same device always produces same fingerprint.
 *
 * @param input Device fingerprint input (User-Agent, IP, timezone)
 * @returns Hex-encoded SHA256 hash of the fingerprint components
 *
 * @example
 * const fingerprint = generateDeviceFingerprint({
 *   userAgent: 'Mozilla/5.0...',
 *   ipAddress: '192.168.1.100',
 *   timezone: 'UTC'
 * });
 * // => 'a1b2c3d4e5f6...' (stable across same device/network)
 */
export function generateDeviceFingerprint(input: FingerprintInput): string {
  // Build fingerprint components array
  const components: string[] = [
    // User-Agent is primary stable identifier
    input.userAgent || 'unknown-user-agent',

    // IP address (may change on network switch, but good for initial binding)
    input.ipAddress || 'unknown-ip',

    // Timezone adds stability without being too specific
    input.timezone || 'unknown-timezone',
  ];

  // Optionally include screen resolution (less stable than core components)
  // Commented out for MVP to maximize stability
  // if (input.screenResolution) {
  //   components.push(input.screenResolution);
  // }

  // Join components and create SHA256 hash
  const fingerprintString = components.join('|');
  const hash = createHash('sha256').update(fingerprintString).digest('hex');

  return hash;
}

/**
 * Extract IP address from common HTTP headers.
 * Checks X-Forwarded-For (proxy/CDN), then falls back to direct connection.
 *
 * @param headers HTTP headers object
 * @param connectionIp Direct connection IP address
 * @returns Client IP address string
 *
 * @example
 * const ip = extractClientIp(req.headers, req.socket.remoteAddress);
 * // => '192.168.1.100' or '203.0.113.42' (if behind proxy)
 */
export function extractClientIp(
  headers: Record<string, string | string[] | undefined>,
  connectionIp: string | undefined
): string {
  // Check X-Forwarded-For header first (proxy/CDN scenarios)
  const xForwardedFor = headers['x-forwarded-for'];
  if (xForwardedFor) {
    // X-Forwarded-For can contain multiple IPs; use the first (client)
    const ips = Array.isArray(xForwardedFor)
      ? xForwardedFor[0]
      : xForwardedFor.split(',')[0];
    return ips.trim();
  }

  // Fallback to direct connection IP
  if (connectionIp) {
    return connectionIp;
  }

  // Last resort fallback
  return 'unknown-ip';
}

/**
 * Extract timezone from HTTP headers or use UTC fallback.
 * Supports:
 * - Intl-Locale header (Cloudflare)
 * - X-Timezone header (custom)
 * - Defaults to UTC
 *
 * @param headers HTTP headers object
 * @returns IANA timezone string (e.g., 'America/Los_Angeles')
 *
 * @example
 * const tz = extractClientTimezone(req.headers);
 * // => 'America/Los_Angeles' or 'UTC'
 */
export function extractClientTimezone(
  headers: Record<string, string | string[] | undefined>
): string {
  // Check Cloudflare Intl-Locale header
  const intlLocale = headers['cf-timezone'];
  if (intlLocale && typeof intlLocale === 'string') {
    return intlLocale;
  }

  // Check custom X-Timezone header
  const xTimezone = headers['x-timezone'];
  if (xTimezone && typeof xTimezone === 'string') {
    return xTimezone;
  }

  // Default to UTC
  return 'UTC';
}

/**
 * Validate that a device fingerprint is in expected format.
 * Expects 64-character hex string (SHA256 output).
 *
 * @param fingerprint Device fingerprint to validate
 * @returns true if valid, false otherwise
 */
export function isValidFingerprint(fingerprint: unknown): boolean {
  // Must be string
  if (typeof fingerprint !== 'string') {
    return false;
  }

  // Must be 64-character hex string (SHA256)
  if (!/^[a-f0-9]{64}$/i.test(fingerprint)) {
    return false;
  }

  return true;
}

/**
 * Compare two device fingerprints using constant-time comparison.
 * Prevents timing attacks that could reveal fingerprint structure.
 *
 * @param fingerprint1 First fingerprint to compare
 * @param fingerprint2 Second fingerprint to compare
 * @returns true if fingerprints match, false otherwise (constant time)
 *
 * @note This uses Node's timingSafeEqual which runs in constant time
 */
export function compareDeviceFingerprints(
  fingerprint1: string,
  fingerprint2: string
): boolean {
  // Both must be valid fingerprints
  if (!isValidFingerprint(fingerprint1) || !isValidFingerprint(fingerprint2)) {
    return false;
  }

  // Convert to buffers for constant-time comparison
  const buffer1 = Buffer.from(fingerprint1, 'hex');
  const buffer2 = Buffer.from(fingerprint2, 'hex');

  try {
    // timingSafeEqual runs in constant time regardless of match position
    return require('crypto').timingSafeEqual(buffer1, buffer2);
  } catch {
    // timingSafeEqual throws if buffers differ in length
    // This shouldn't happen with valid SHA256 hashes, but handle gracefully
    return false;
  }
}
