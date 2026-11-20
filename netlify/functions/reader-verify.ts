// POST /api/reader/verifications
// Verify a code, consume it atomically, then start or renew a session.
// Contract: .github/specs/005-reader-access/contracts/reader-access-functions.md

import { createHash, randomBytes } from 'crypto';
import { createSecureSessionResponse, responses } from '../lib/reader-access/responses';
import { verifyCode, isCodeExpired, isCodeLimited } from '../lib/reader-access/codes';
import {
  getCode,
  consumeCode,
  incrementCodeAttempts,
  getAccessSession,
  renewAccessSession,
  storeAccessSession,
  storeRecoveryAttempt,
} from '../lib/reader-access/code-store';
import {
  generateSessionId,
  createSessionCookie,
  formatSessionCookie,
  parseSessionCookie,
} from '../lib/reader-access/session-cookie';
import { checkRateLimit, resetRateLimit, RATE_LIMIT_PRESETS } from '../lib/reader-access/rate-limiter';

const RECOVERY_WINDOW_HOURS = 4;
const SESSION_DAYS = 30;
const CODE_REGEX = /^\d{6}$/;

/** One-way reader identifier; the plain email is never stored with a session. */
export function getReaderId(email: string): string {
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
}

function respond(body: Parameters<typeof createSecureSessionResponse>[0], status: number) {
  return createSecureSessionResponse(body, status);
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return respond(responses.error('Method not allowed'), 405);
  }

  let email: unknown;
  let code: unknown;
  try {
    ({ email, code } = (await req.json()) as Record<string, unknown>);
  } catch {
    return respond(responses.invalid(), 400);
  }

  if (typeof email !== 'string' || !email) {
    return respond(responses.invalid(), 400);
  }
  if (typeof code !== 'string' || !CODE_REGEX.test(code)) {
    return respond(responses.invalid(), 400);
  }

  try {
    const rateLimit = checkRateLimit(email, RATE_LIMIT_PRESETS.EMAIL_VERIFICATION);
    if (rateLimit.isLimited) {
      const response = respond(responses.limited(), 429);
      response.headers.set('Retry-After', rateLimit.resetAfterSeconds.toString());
      return response;
    }

    const storedCode = await getCode(email);
    if (!storedCode) {
      return respond(responses.invalid(), 400);
    }
    if (isCodeExpired(storedCode.expiresAt)) {
      return respond(responses.expired(), 410);
    }
    if (isCodeLimited(storedCode.attemptCount, storedCode.maxAttempts)) {
      return respond(responses.limited(), 429);
    }

    if (!verifyCode(code, storedCode.codeHash, storedCode.salt)) {
      await incrementCodeAttempts(email);
      return respond(responses.invalid(), 400);
    }

    // RA-002: exactly one concurrent submission of a code may succeed.
    if (!(await consumeCode(email, storedCode.codeId))) {
      return respond(responses.used(), 410);
    }

    resetRateLimit(email, RATE_LIMIT_PRESETS.EMAIL_VERIFICATION.keyPrefix);

    const now = new Date();
    const readerId = getReaderId(email);

    // RA-T041: a fresh code on a browser with an active session renews it.
    const existingSessionId = parseSessionCookie(req.headers.get('cookie') ?? undefined);
    const existing = existingSessionId ? await getAccessSession(existingSessionId) : null;
    const renewed =
      existing && existing.readerId === readerId ? await renewAccessSession(existing.sessionId) : null;

    let sessionId: string;
    let expiresAt: string;
    if (renewed) {
      sessionId = renewed.sessionId;
      expiresAt = renewed.expiresAt;
    } else {
      sessionId = generateSessionId();
      expiresAt = new Date(now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();
      await storeAccessSession({
        sessionId,
        readerId,
        createdAt: now.toISOString(),
        expiresAt,
        renewedAt: now.toISOString(),
      });
    }

    // RA-T048: record the recovery window. Failure here must not undo access.
    await storeRecoveryAttempt({
      recoveryId: randomBytes(16).toString('hex'),
      readerId,
      initiatedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + RECOVERY_WINDOW_HOURS * 60 * 60 * 1000).toISOString(),
      createdSessionId: sessionId,
      raceOutcome: renewed ? 'renewal' : 'fresh',
    }).catch(() => undefined);

    const response = respond(responses.verified(sessionId, expiresAt), 200);
    response.headers.set('Set-Cookie', formatSessionCookie(createSessionCookie(sessionId)));
    return response;
  } catch {
    return respond(responses.error('Verification is unavailable'), 502);
  }
}
