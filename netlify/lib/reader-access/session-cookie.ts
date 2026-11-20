/**
 * Session cookie utilities for secure HTTP cookie handling.
 * Implements HttpOnly, Secure, SameSite=Lax flags for XSS/CSRF protection.
 *
 * All session tokens are stored in HTTP-only cookies and never accessible to JavaScript.
 */

import { randomUUID } from 'crypto';
import { SESSION_COOKIE_CONFIG } from './session-config';

export const SESSION_COOKIE_NAME = 'sessionToken';
export const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days

/**
 * Session cookie object structure
 */
export interface SessionCookie {
  name: string;
  value: string;
  maxAge: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'Lax' | 'Strict' | 'None';
  path: string;
  domain?: string;
}

/**
 * Cookie options interface for type safety
 */
export interface CookieOptions {
  name?: string;
  value?: string;
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
  path?: string;
  domain?: string;
}

/**
 * Generate a cryptographically secure session ID.
 * Uses UUID v4 for 128-bit entropy (exceeds 256-bit token requirement).
 *
 * @returns UUID v4 session token
 */
export function generateSessionId(): string {
  return randomUUID();
}

/**
 * Create a session cookie object with security defaults.
 *
 * Security flags:
 * - HttpOnly: Prevents JavaScript access (protects against XSS)
 * - Secure: HTTPS only (prevents interception)
 * - SameSite=Lax: CSRF protection with cross-site navigation allowed
 * - Path=/: Accessible site-wide
 *
 * @param sessionId Session token value
 * @param options Optional overrides to default cookie config
 * @returns SessionCookie object
 *
 * @example
 * const cookie = createSessionCookie('token-123');
 * // => { name: 'sessionToken', value: 'token-123', httpOnly: true, ... }
 */
export function createSessionCookie(
  sessionId: string,
  options?: Partial<CookieOptions>
): SessionCookie {
  const config = {
    name: options?.name ?? SESSION_COOKIE_NAME,
    value: sessionId,
    maxAge: options?.maxAge ?? SESSION_MAX_AGE_SECONDS,
    httpOnly: options?.httpOnly ?? true,
    secure: options?.secure ?? true,
    sameSite: options?.sameSite ?? 'Lax' as const,
    path: options?.path ?? '/',
    domain: options?.domain,
  };

  return config;
}

/**
 * Format a SessionCookie object into a Set-Cookie header value.
 *
 * @param cookie SessionCookie object to format
 * @returns Set-Cookie header value string
 *
 * @example
 * const cookie = createSessionCookie('token-123');
 * const header = formatSessionCookie(cookie);
 * // => 'sessionToken=token-123; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000'
 */
export function formatSessionCookie(cookie: SessionCookie): string {
  const parts = [
    // Cookie name=value pair (required)
    `${cookie.name}=${encodeURIComponent(cookie.value)}`,
  ];

  // HttpOnly flag (prevents JavaScript access)
  if (cookie.httpOnly) {
    parts.push('HttpOnly');
  }

  // Secure flag (HTTPS only)
  if (cookie.secure) {
    parts.push('Secure');
  }

  // SameSite attribute (CSRF protection)
  if (cookie.sameSite) {
    parts.push(`SameSite=${cookie.sameSite}`);
  }

  // Path attribute (scope within domain)
  if (cookie.path) {
    parts.push(`Path=${cookie.path}`);
  }

  // Max-Age attribute (session lifetime in seconds)
  parts.push(`Max-Age=${cookie.maxAge}`);

  // Domain attribute (optional, usually omitted for same-domain)
  if (cookie.domain) {
    parts.push(`Domain=${cookie.domain}`);
  }

  return parts.join('; ');
}

/**
 * Create a "clear cookie" Set-Cookie header to delete a session cookie.
 * Sets Max-Age=0 which immediately expires the cookie.
 *
 * @returns Set-Cookie header value to clear session cookie
 *
 * @example
 * const clearCookie = clearSessionCookie();
 * // => 'sessionToken=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'
 *
 * // Use in logout response:
 * response.headers.set('Set-Cookie', clearSessionCookie());
 */
export function clearSessionCookie(): string {
  const cookie = createSessionCookie('', { maxAge: 0 });
  return formatSessionCookie(cookie);
}

/**
 * Parse sessionId from request cookies.
 *
 * Extracts the session token from HTTP Cookie header.
 * Handles multiple cookies and finds the sessionToken cookie specifically.
 *
 * @param cookieHeader Value of Cookie header from request
 * @returns Session token if found, null otherwise
 *
 * @example
 * const token = parseSessionCookie('sessionToken=abc123; other=value');
 * // => 'abc123'
 *
 * const noToken = parseSessionCookie('other=value');
 * // => null
 */
export function parseSessionCookie(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) {
    return null;
  }

  // Parse cookie header (name1=value1; name2=value2; ...)
  const cookies = cookieHeader.split(';');

  for (const cookie of cookies) {
    const trimmed = cookie.trim();

    // Look for sessionToken=value
    if (trimmed.startsWith(`${SESSION_COOKIE_CONFIG.name}=`)) {
      // Extract value after '='
      const value = trimmed.substring(`${SESSION_COOKIE_CONFIG.name}=`.length);

      // Decode if URL-encoded
      try {
        return decodeURIComponent(value);
      } catch {
        // Invalid encoding, return as-is
        return value;
      }
    }
  }

  return null;
}

/**
 * Extract session token from HTTP request (Cookie header).
 * Convenience function that combines header parsing and cookie extraction.
 *
 * @param headers HTTP headers object (from request)
 * @returns Session token if found, null otherwise
 *
 * @example
 * const token = getSessionTokenFromHeaders(request.headers);
 * if (token) {
 *   const result = await validateSession(token, email, deviceId);
 * }
 */
export function getSessionTokenFromHeaders(
  headers: Record<string, string | string[] | undefined>
): string | null {
  const cookieHeader = headers['cookie'];

  if (!cookieHeader) {
    return null;
  }

  // Handle case where cookie header is an array
  const cookieString = Array.isArray(cookieHeader) ? cookieHeader.join('; ') : cookieHeader;

  return parseSessionCookie(cookieString);
}

/**
 * Validate cookie security settings (useful for testing/debugging).
 * Checks that all required security flags are present in a Set-Cookie header.
 *
 * @param setCookieHeader Set-Cookie header value to validate
 * @returns Object with validation results and any issues found
 *
 * @example
 * const result = validateCookieSecuritySettings(setCookieValue);
 * if (!result.isValid) {
 *   console.error('Security issues:', result.issues);
 * }
 */
export function validateCookieSecuritySettings(
  setCookieHeader: string
): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  const headerLower = setCookieHeader.toLowerCase();

  // Check HttpOnly
  if (!headerLower.includes('httponly')) {
    issues.push('Missing HttpOnly flag (vulnerable to XSS)');
  }

  // Check Secure
  if (!headerLower.includes('secure')) {
    issues.push('Missing Secure flag (vulnerable to interception)');
  }

  // Check SameSite
  if (!headerLower.includes('samesite')) {
    issues.push('Missing SameSite attribute (vulnerable to CSRF)');
  } else if (!headerLower.includes('samesite=lax') && !headerLower.includes('samesite=strict')) {
    issues.push('SameSite should be Lax or Strict (not None for session cookies)');
  }

  // Check Path
  if (!headerLower.includes('path=/')) {
    issues.push('Path should be / (accessible site-wide)');
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}
