// JSON response helpers for reader-access functions
// Set Cache-Control: no-store for all responses
// Never reveal whether an email is known

export type ReaderStateType =
  | 'request-pending'
  | 'request-received'
  | 'delivery-uncertain'
  | 'verified'
  | 'code-invalid'
  | 'code-expired'
  | 'code-used'
  | 'limited'
  | 'provider-failure'
  | 'content-unavailable';

export interface ReaderResponse {
  state: ReaderStateType;
  message?: string;
  expiresAt?: string;
  sessionId?: string;
  chapterId?: string;
  content?: string;
}

/**
 * Security headers for session endpoints.
 * Prevents caching of sensitive session data and enforces security policies.
 *
 * - Cache-Control: Prevents all caching (no-store, no-cache, must-revalidate)
 * - Pragma: Legacy cache directive for older clients
 * - Expires: Legacy cache expiry (immediate)
 * - X-Content-Type-Options: Prevents MIME type sniffing (nosniff)
 * - X-Frame-Options: Prevents clickjacking (included if needed)
 */
const NO_CACHE_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
  'X-Content-Type-Options': 'nosniff',
};

/**
 * Session-specific security headers.
 * Used for all session-related endpoints to prevent caching and information leakage.
 */
export const SESSION_SECURITY_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, private',
  'Pragma': 'no-cache',
  'Expires': '0',
  'X-Content-Type-Options': 'nosniff',
  // Prevent embedding in iframes to mitigate clickjacking
  'X-Frame-Options': 'DENY',
  // Additional CSP for session endpoints
  'Content-Security-Policy': "default-src 'self'; frame-ancestors 'none'",
};

export function createResponse(
  body: ReaderResponse,
  statusCode: number = 200
): Response {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: NO_CACHE_HEADERS,
  });
}

// State-specific response builders
export const responses = {
  pending: (): ReaderResponse => ({
    state: 'request-pending',
  }),

  received: (expiresAt: string): ReaderResponse => ({
    state: 'request-received',
    expiresAt,
  }),

  uncertain: (): ReaderResponse => ({
    state: 'delivery-uncertain',
  }),

  verified: (sessionId: string, expiresAt: string): ReaderResponse => ({
    state: 'verified',
    sessionId,
    expiresAt,
  }),

  invalid: (): ReaderResponse => ({
    state: 'code-invalid',
  }),

  expired: (): ReaderResponse => ({
    state: 'code-expired',
  }),

  used: (): ReaderResponse => ({
    state: 'code-used',
  }),

  limited: (): ReaderResponse => ({
    state: 'limited',
  }),

  error: (message: string): ReaderResponse => ({
    state: 'provider-failure',
    message,
  }),

  unavailable: (): ReaderResponse => ({
    state: 'content-unavailable',
  }),

  content: (chapterId: string, content: string): ReaderResponse => ({
    state: 'verified',
    chapterId,
    content,
  }),
};

export function createErrorResponse(error: string, statusCode = 500): Response {
  return createResponse(responses.error(error), statusCode);
}

export function createJsonResponse(body: ReaderResponse, statusCode = 200): Response {
  return createResponse(body, statusCode);
}

/**
 * T063: Error response standardization
 * Standardized error format for unauthorized responses
 */
export interface UnauthorizedResponse {
  error: 'unauthorized';
  reason: 'expired_session' | 'terminated_session' | 'invalid_session' | 'missing_session';
  action: 'reverify_email' | 'retry' | 'login';
  message?: string;
}

/**
 * T063: Create standardized unauthorized error response
 * Used for session validation failures (expired, terminated, invalid)
 *
 * @param reason Why the session is invalid
 * @param statusCode HTTP status code (default 401)
 * @returns Response with standardized error format
 *
 * @example
 * // Expired session
 * createUnauthorizedResponse('expired_session', 401)
 * // => { error: "unauthorized", reason: "expired_session", action: "reverify_email" }
 *
 * // Terminated session
 * createUnauthorizedResponse('terminated_session', 401)
 * // => { error: "unauthorized", reason: "terminated_session", action: "reverify_email" }
 */
export function createUnauthorizedResponse(
  reason: UnauthorizedResponse['reason'],
  statusCode: number = 401
): Response {
  const errorMessages: Record<string, string> = {
    expired_session: 'Your session has expired. Please sign in again.',
    terminated_session: 'Your session was terminated. Please sign in again.',
    invalid_session: 'Invalid or missing session. Please sign in again.',
    missing_session: 'No session found. Please sign in.',
  };

  const response: UnauthorizedResponse = {
    error: 'unauthorized',
    reason,
    action: 'reverify_email',
    message: errorMessages[reason] || 'Session validation failed',
  };

  return new Response(JSON.stringify(response), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
      // Clear session cookie on unauthorized
      'Set-Cookie': 'sessionToken=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0',
    },
  });
}

/**
 * Create a response with enhanced session security headers.
 * Used for session endpoints that handle sensitive authentication data.
 *
 * @param body Response body
 * @param statusCode HTTP status code
 * @returns Response with session security headers
 */
export function createSecureSessionResponse(
  body: ReaderResponse,
  statusCode: number = 200
): Response {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: SESSION_SECURITY_HEADERS,
  });
}

/**
 * Add security headers to an existing response.
 * Useful for modifying responses after creation.
 *
 * @param response Original response
 * @param useSessionHeaders Whether to use enhanced session headers (default: true)
 * @returns Response with security headers added
 */
export function addSecurityHeaders(
  response: Response,
  useSessionHeaders: boolean = true
): Response {
  const newResponse = new Response(response.body, response);
  const headers = useSessionHeaders ? SESSION_SECURITY_HEADERS : NO_CACHE_HEADERS;

  Object.entries(headers).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });

  return newResponse;
}
