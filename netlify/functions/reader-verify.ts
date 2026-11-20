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
  getSession,
  renewSession,
  storeRecoveryAttempt,
} from '../lib/reader-access/store';
import {
  generateSessionId,
  createSessionCookie,
  formatSessionCookie,
  parseSessionCookie,
} from '../lib/reader-access/session-cookie';

const RECOVERY_WINDOW_HOURS = 4;
const generateRecoveryId = () => Math.random().toString(36).substring(2, 15);
const getReaderId = (email: string) => Buffer.from(email).toString('base64');

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

    // Code is valid: check for existing session and renew, or create new
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // RA-T041: Check if user has active session in browser cookie
    // If so, renew it; otherwise create new session
    const cookieHeader = req.headers.get('cookie');
    const existingSessionId = parseSessionCookie(cookieHeader);
    let sessionId = existingSessionId;
    let isRenewal = false;

    if (existingSessionId) {
      // Check if session is still valid
      const existingSession = await getSession(existingSessionId);
      if (existingSession && new Date(existingSession.expiresAt) > new Date()) {
        // Renew existing session
        isRenewal = true;
        const renewedSession = await renewSession(existingSessionId);
        if (renewedSession) {
          sessionId = existingSessionId;
          // Use the renewed expiry
          expiresAt.setTime(new Date(renewedSession.expiresAt).getTime());
        }
      }
    }

    // If no renewal, create new session
    if (!isRenewal) {
      sessionId = generateSessionId();
      await storeSession({
        sessionId,
        deviceId: '', // Can be populated from request fingerprinting if needed
        chapterId: '',
        createdAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        renewedAt: now.toISOString(),
      });
    }

    // Delete code (recovery: if this fails, session was already created)
    await deleteCode(email).catch(() => {
      // Ignore deletion errors (recovery-first)
    });

    // Create recovery attempt (RA-T048)
    // Recovery window: 4 hours from code consumed time
    const recoveryId = generateRecoveryId();
    const readerId = getReaderId(email);
    const recoveryExpiresAt = new Date(now.getTime() + RECOVERY_WINDOW_HOURS * 60 * 60 * 1000);

    await storeRecoveryAttempt({
      recoveryId,
      readerId,
      initiatedAt: now.toISOString(),
      expiresAt: recoveryExpiresAt.toISOString(),
      createdSessionId: sessionId,
      raceOutcome: isRenewal ? 'renewal' : 'fresh',
    }).catch(() => {
      // If recovery attempt fails to store, session is still valid
      // User can verify again if needed
    });

    // Create/update session cookie
    const sessionCookie = createSessionCookie(sessionId);
    const sessionCookieHeader = formatSessionCookie(sessionCookie);

    // Return 200 with response and Set-Cookie header
    const response = createJsonResponse(
      responses.verified(sessionId, expiresAt.toISOString()),
      200
    );
    response.headers.set('Set-Cookie', sessionCookieHeader);

    return response;
  } catch (err) {
    if (err instanceof SyntaxError) {
      return createJsonResponse(responses.invalid(), 400);
    }
    return createJsonResponse(responses.error(err instanceof Error ? err.message : 'Unknown error'), 502);
  }
}
