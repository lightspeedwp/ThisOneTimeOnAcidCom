/**
 * POST /api/reader/verifications — verify a code and create a reader session
 *
 * T017 (US1). Contract: .github/specs/005-reader-access/contracts/reader-access-functions.md
 *
 * Request:  { "email": "reader@example.com", "code": "123456" } or { "verificationCode": "…" }
 * Success:  200 OK + Set-Cookie: sessionToken=…; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000
 *           state: "verified"
 * Errors:   400 code-invalid · 410 code-expired · 410 code-used · 429 limited
 *           409 device_limit_exceeded · 500 server_error
 *
 * The token travels only in the HttpOnly cookie, never in the response body.
 */

import {
  createSessionFromVerification,
  SessionCreationError,
} from '../lib/reader-access/session-service';
import { createSessionCookie, formatSessionCookie } from '../lib/reader-access/session-cookie';
import { fingerprintFromRequest } from '../lib/reader-access/session-middleware';
import { SESSION_SECURITY_HEADERS } from '../lib/reader-access/responses';
import { checkRateLimit, resetRateLimit, RateLimitConfig } from '../lib/reader-access/rate-limiter';
import { maskSensitive } from '../lib/reader-access/crypto';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_REGEX = /^\d{6}$/;

/** Contract: 5 session creation attempts per email per 15-minute window. */
export const SESSION_CREATE_RATE_LIMIT: RateLimitConfig = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000,
  keyPrefix: 'session-create-15m',
};

function json(body: unknown, status: number, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...SESSION_SECURITY_HEADERS, ...extraHeaders },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json({ error: 'method_not_allowed' }, 405, { Allow: 'POST' });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ state: 'code-invalid' }, 400);
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const rawCode = body.verificationCode ?? body.code;
  const code = typeof rawCode === 'string' ? rawCode.trim() : '';

  if (!EMAIL_REGEX.test(email) || !CODE_REGEX.test(code)) {
    return json({ state: 'code-invalid' }, 400);
  }

  const rateLimit = checkRateLimit(email, SESSION_CREATE_RATE_LIMIT);
  if (rateLimit.isLimited) {
    return json({ state: 'limited' }, 429, {
      'Retry-After': String(rateLimit.resetAfterSeconds),
    });
  }

  try {
    const session = await createSessionFromVerification(email, code, fingerprintFromRequest(req));
    resetRateLimit(email, SESSION_CREATE_RATE_LIMIT.keyPrefix);

    console.log('SESSION_CREATED', {
      email: maskSensitive(email),
      deviceId: session.deviceId.substring(0, 8) + '...',
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
    });

    return json(
      {
        state: 'verified',
        expiresAt: session.expiresAt,
      },
      200,
      { 'Set-Cookie': formatSessionCookie(createSessionCookie(session.sessionId)) }
    );
  } catch (error) {
    if (error instanceof SessionCreationError) {
      const stateMap: Record<string, string> = {
        code_invalid: 'code-invalid',
        code_expired: 'code-expired',
        code_used: 'code-used',
        limited: 'limited',
        device_limit_exceeded: 'device-limit-exceeded',
      };

      const body: Record<string, unknown> = { state: stateMap[error.errorCode] };

      if (error.errorCode === 'device_limit_exceeded') {
        body.action = 'select_device_to_terminate_or_reverify';
      }

      return json(body, error.statusCode);
    }

    console.error('SESSION_CREATE_ERROR', {
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return json({ state: 'server-error' }, 500);
  }
}
