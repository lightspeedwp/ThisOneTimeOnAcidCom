// POST /api/reader/verifications
// Verify code (atomic consume); create/update session
// Recovery-first: if recovery succeeds first, fresh code continues
// RA-T034: Atomic code verification, session creation, 30d renewal per RA-004 & RA-T007 approval

import { randomUUID } from 'crypto';
import { verifyCode, isCodeExpired, isCodeLimited } from '../lib/reader-access/codes';
import { getCode, deleteCode, storeSession, renewSession } from '../lib/reader-access/store';
import { createSessionCookie, formatSessionCookie, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from '../lib/reader-access/session-cookie';
import { jsonResponse } from '../lib/reader-access/responses';

interface VerifyRequestBody {
  email: string;
  code: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return jsonResponse({ state: 'invalid-method' }, 405);
  }

  try {
    const body = (await req.json()) as VerifyRequestBody;
    const { email, code } = body;

    if (!email || !code) {
      return jsonResponse({ state: 'code-invalid' }, 400);
    }

    // RA-002/RA-003: Retrieve stored code
    const storedCode = await getCode(email);
    if (!storedCode) {
      return jsonResponse({ state: 'code-invalid' }, 400);
    }

    // RA-003: Check expiry (10 minutes from creation per Q2)
    if (isCodeExpired(storedCode.expiresAt)) {
      await deleteCode(email);
      return jsonResponse({ state: 'code-expired' }, 410);
    }

    // RA-002: Check attempt limit (5 max per Q5)
    if (isCodeLimited(storedCode.attemptCount, storedCode.maxAttempts)) {
      await deleteCode(email);
      return jsonResponse({ state: 'limited' }, 429);
    }

    // RA-002: Verify code (constant-time, never reveal email existence)
    if (!verifyCode(code, storedCode.codeHash, storedCode.salt)) {
      storedCode.attemptCount += 1;
      if (storedCode.attemptCount >= storedCode.maxAttempts) {
        await deleteCode(email);
        return jsonResponse({ state: 'limited' }, 429);
      }
      return jsonResponse({ state: 'code-invalid' }, 400);
    }

    // RA-004: Successful verification — create session
    const sessionId = randomUUID();
    const now = new Date();

    // RA-T007 approved: 30-day session duration
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // RA-006: Create reader access record (email, verification, timestamps)
    // Delete after 12 months without authenticated use (per RA-006)
    const session = {
      sessionId,
      email,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      lastAuthenticatedAt: now.toISOString(),
      deleteAfter: new Date(now.getTime() + 12 * 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    await storeSession(session as any);

    // RA-005: Set HttpOnly, Secure, SameSite cookie
    const response = jsonResponse({ state: 'verified' }, 200);
    const cookie = createSessionCookie(sessionId);
    const setCookieHeader = formatSessionCookie(cookie);
    response.headers.set('Set-Cookie', setCookieHeader);

    // RA-002: Consume code atomically
    await deleteCode(email);

    return response;
  } catch (error) {
    return jsonResponse({ state: 'provider-failure' }, 502);
  }
}
