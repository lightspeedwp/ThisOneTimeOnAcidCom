/**
 * Session validation middleware for protected endpoints.
 *
 * This middleware runs before chapter access and other protected operations.
 * It validates the session token from cookies and determines access.
 *
 * Response codes:
 * - 200: Valid session, proceed
 * - 401: Missing/invalid/expired/terminated session, deny access
 * - 500: Storage error, deny to be safe
 *
 * Security:
 * - Uses constant-time token comparison to prevent timing attacks
 * - All token comparisons done via constantTimeTokenCompare
 * - No timing-based information leakage on invalid tokens
 */

import { validateSession } from './session-service';
import { getSessionTokenFromHeaders } from './session-cookie';
import { generateDeviceFingerprint, extractClientIp, extractClientTimezone } from './device-fingerprint';
import { FingerprintInput, SessionValidationResult } from './session';
import { constantTimeTokenCompare } from './crypto';

/**
 * Middleware request context extracted from HTTP request.
 * Provides headers and connection info needed for session validation.
 */
export interface RequestContext {
  /** HTTP headers from request */
  headers: Record<string, string | string[] | undefined>;

  /** Client IP address (from X-Forwarded-For or connection) */
  clientIp?: string;

  /** Request URL for logging */
  url?: string;

  /** Request method for logging */
  method?: string;
}

/**
 * Middleware response with session validation result and headers.
 */
export interface MiddlewareResponse {
  /** Is session valid? */
  isValid: boolean;

  /** HTTP status code */
  statusCode: number;

  /** Error reason if invalid */
  error?: {
    code: string;
    message: string;
  };

  /** Session data if valid */
  session?: any;

  /** Response headers to set (Set-Cookie for logout, etc.) */
  responseHeaders?: Record<string, string>;

  /** Email if valid (extracted from session) */
  email?: string;

  /** Device ID if valid (extracted from session) */
  deviceId?: string;
}

/**
 * Session validation middleware for protected endpoints.
 *
 * Steps:
 * 1. Extract sessionId from Cookie header
 * 2. Generate device fingerprint from request context
 * 3. Call validateSession()
 * 4. Return validation result with appropriate HTTP status
 *
 * @param context Request context (headers, IP, URL)
 * @returns Middleware response with validation result
 *
 * @example
 * // In a Netlify Function:
 * const result = await validateSessionMiddleware({
 *   headers: request.headers,
 *   clientIp: request.ip,
 *   url: request.url,
 * });
 *
 * if (!result.isValid) {
 *   return new Response(JSON.stringify({ error: result.error }), {
 *     status: result.statusCode,
 *     headers: result.responseHeaders || {},
 *   });
 * }
 *
 * // Continue to protected logic
 * const { session } = result;
 */
export async function validateSessionMiddleware(
  context: RequestContext
): Promise<MiddlewareResponse> {
  try {
    // Step 1: Extract sessionId from cookies
    const sessionId = getSessionTokenFromHeaders(context.headers);

    if (!sessionId) {
      return {
        isValid: false,
        statusCode: 401,
        error: {
          code: 'missing_session_token',
          message: 'No session token provided',
        },
        responseHeaders: {
          // Clear any stale cookies
          'Set-Cookie': 'sessionToken=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0',
        },
      };
    }

    // Step 2: Generate device fingerprint from request context
    // For now, we can't fully generate fingerprint without User-Agent
    // In production, extract from request.headers['user-agent']
    const userAgent = Array.isArray(context.headers['user-agent'])
      ? context.headers['user-agent'][0]
      : context.headers['user-agent'] || 'unknown';

    const fingerprintInput: FingerprintInput = {
      userAgent,
      ipAddress: context.clientIp || 'unknown-ip',
      timezone: extractClientTimezone(context.headers),
    };

    // Step 3: Extract email from token (TODO: JWT decode or session ID mapping)
    // For now, this is a placeholder - in production, we need to know the email
    // This could be:
    // - Decoded from JWT token (if using JWT format)
    // - Looked up from a session index by sessionId
    // - Provided separately by caller
    // For MVP, we'll require email to be passed separately

    // For now, return error requiring email context
    // This will be resolved by the caller (e.g., from JWT or session index)
    return {
      isValid: false,
      statusCode: 401,
      error: {
        code: 'missing_email_context',
        message: 'Session token validation requires email context',
      },
    };
  } catch (error) {
    // Log error and return 500
    console.error('Session validation error:', error);

    return {
      isValid: false,
      statusCode: 500,
      error: {
        code: 'validation_error',
        message: 'Internal server error during session validation',
      },
    };
  }
}

/**
 * Complete session validation with email and deviceId context.
 *
 * This is the typical usage pattern for validating a session:
 * 1. Extract sessionId from cookie
 * 2. Get email and deviceId from request context (e.g., decoded JWT or path)
 * 3. Call validateSessionWithContext()
 * 4. Check result.isValid
 *
 * @param context Request context (headers, IP, URL)
 * @param email Reader's email (must be provided by caller)
 * @param deviceId Device fingerprint (or extract from request)
 * @returns Complete validation result
 *
 * @example
 * const result = await validateSessionWithContext(
 *   { headers: request.headers, clientIp: request.ip },
 *   'reader@example.com',
 *   deviceFingerprint
 * );
 *
 * if (result.isValid) {
 *   // Grant access
 * } else {
 *   // Return 401 with error
 * }
 */
export async function validateSessionWithContext(
  context: RequestContext,
  email: string,
  deviceId?: string
): Promise<MiddlewareResponse> {
  try {
    // Extract sessionId from cookies
    const sessionId = getSessionTokenFromHeaders(context.headers);

    if (!sessionId) {
      return {
        isValid: false,
        statusCode: 401,
        error: {
          code: 'missing_session_token',
          message: 'No session token in request',
        },
      };
    }

    // Generate device fingerprint if not provided
    let computedDeviceId = deviceId;
    if (!deviceId) {
      const userAgent = Array.isArray(context.headers['user-agent'])
        ? context.headers['user-agent'][0]
        : context.headers['user-agent'] || 'unknown';

      const fingerprintInput: FingerprintInput = {
        userAgent,
        ipAddress: context.clientIp || 'unknown-ip',
        timezone: extractClientTimezone(context.headers),
      };

      computedDeviceId = generateDeviceFingerprint(fingerprintInput);
    }

    // Validate session
    const validationResult = await validateSession(sessionId, email, computedDeviceId);

    if (!validationResult.isValid) {
      return {
        isValid: false,
        statusCode: validationResult.statusCode,
        error: {
          code: validationResult.reason || 'invalid_session',
          message: getErrorMessage(validationResult.reason),
        },
        responseHeaders: {
          // Clear cookie on invalid session
          'Set-Cookie': 'sessionToken=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0',
        },
      };
    }

    // Session is valid!
    return {
      isValid: true,
      statusCode: 200,
      session: validationResult.session,
      email,
      deviceId: computedDeviceId,
    };
  } catch (error) {
    console.error('Session validation error:', error);

    return {
      isValid: false,
      statusCode: 500,
      error: {
        code: 'validation_error',
        message: 'Internal server error during session validation',
      },
    };
  }
}

/**
 * Convert validation error code to human-readable message.
 */
function getErrorMessage(reason: string | undefined): string {
  const messages: Record<string, string> = {
    missing_token: 'Session token is required',
    invalid_token: 'Session token is invalid or malformed',
    expired_session: 'Your session has expired. Please sign in again.',
    terminated_session: 'Your session was terminated',
  };

  return messages[reason || ''] || 'Session validation failed';
}

/**
 * Error response format for middleware failures.
 * Standardizes error responses across all endpoints.
 *
 * @param error Error reason
 * @param statusCode HTTP status code
 * @returns JSON error response object
 */
export function createErrorResponse(error: string, statusCode: number = 401) {
  return {
    error,
    action: statusCode === 401 ? 'reverify_email' : 'retry',
    statusCode,
  };
}
