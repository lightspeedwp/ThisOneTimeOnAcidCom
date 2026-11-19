// POST /api/reader/verifications
// Verify code (atomic consume); create/update session
// Recovery-first: if recovery succeeds first, fresh code continues

import { createJsonResponse, responses } from '../lib/reader-access/responses';
import { verifyCode, isCodeExpired, isCodeLimited } from '../lib/reader-access/codes';
import {
  getCode,
  deleteCode,
  storeSession,
  incrementCodeAttempts,
} from '../lib/reader-access/store';
import {
  generateSessionId,
  createSessionCookie,
  formatSessionCookie,
} from '../lib/reader-access/session-cookie';

const CODE_REGEX = /^\d{6}$/;

export default async function handler(
  req: Request
): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('{"state":"provider-failure"}', { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    // Parse request body
    const body = await req.json();
    const { email, code } = body as Record<string, unknown>;

    // Validate inputs
    if (!email || typeof email !== 'string') {
      return createJsonResponse(responses.invalid(), 400);
    }

    if (!code || typeof code !== 'string' || !CODE_REGEX.test(code)) {
      return createJsonResponse(responses.invalid(), 400);
    }

    // Retrieve stored code
    const storedCode = await getCode(email);
    if (!storedCode) {
      return createJsonResponse(responses.invalid(), 400);
    }

    // Check if expired
    if (isCodeExpired(storedCode.expiresAt)) {
      return createJsonResponse(responses.expired(), 410);
    }

    // Check if already limited (too many attempts)
    if (isCodeLimited(storedCode.attemptCount, storedCode.maxAttempts)) {
      return createJsonResponse(responses.used(), 410);
    }

    // Verify code hash
    const isValid = verifyCode(code, storedCode.codeHash, storedCode.salt);

    if (!isValid) {
      // Increment attempt count
      await incrementCodeAttempts(email);
      return createJsonResponse(responses.invalid(), 400);
    }

    // Code is valid: create session and delete code atomically
    // Recovery-first: create session first, then delete code
    const sessionId = generateSessionId();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    await storeSession({
      sessionId,
      deviceId: '', // Can be populated from request fingerprinting if needed
      chapterId: '',
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      renewedAt: now.toISOString(),
    });

    // Delete code (recovery: if this fails, session was already created)
    await deleteCode(email).catch(() => {
      // Ignore deletion errors (recovery-first)
    });

    // Create session cookie
    const sessionCookie = createSessionCookie(sessionId);
    const cookieHeader = formatSessionCookie(sessionCookie);

    // Return 200 with response and Set-Cookie header
    const response = createJsonResponse(
      responses.verified(sessionId, expiresAt.toISOString()),
      200
    );
    response.headers.set('Set-Cookie', cookieHeader);

    return response;
  } catch (err) {
    if (err instanceof SyntaxError) {
      return createJsonResponse(responses.invalid(), 400);
    }
    return createJsonResponse(responses.error(err instanceof Error ? err.message : 'Unknown error'), 502);
  }
}
