// GET /api/reader/session — Get session status
// DELETE /api/reader/session — Sign out (end session, clear cookie)

import { createJsonResponse, createSecureSessionResponse, responses } from '../lib/reader-access/responses';
import { getSession, deleteSession } from '../lib/reader-access/store';
import {
  parseSessionCookie,
  SESSION_COOKIE_NAME,
} from '../lib/reader-access/session-cookie';

export default async function handler(
  req: Request
): Promise<Response> {
  try {
    if (req.method === 'GET') {
      // Parse session cookie
      const cookieHeader = req.headers.get('cookie');
      const sessionId = parseSessionCookie(cookieHeader);

      if (!sessionId) {
        return createSecureSessionResponse(responses.invalid(), 401);
      }

      // Retrieve session
      const session = await getSession(sessionId);
      if (!session) {
        return createSecureSessionResponse(responses.invalid(), 401);
      }

      // Check if expired
      if (new Date(session.expiresAt) < new Date()) {
        return createSecureSessionResponse(responses.invalid(), 401);
      }

      // Return session details with security headers
      return createSecureSessionResponse(
        {
          state: 'verified',
          sessionId,
          expiresAt: session.expiresAt,
          renewedAt: session.renewedAt,
        },
        200
      );
    } else if (req.method === 'DELETE') {
      // Parse session cookie (may not exist)
      const cookieHeader = req.headers.get('cookie');
      const sessionId = parseSessionCookie(cookieHeader);

      // Delete session if exists (recovery: ignore errors)
      if (sessionId) {
        await deleteSession(sessionId).catch(() => {
          // Ignore deletion errors (idempotent)
        });
      }

      // Clear session cookie with Max-Age=0 and security headers
      const response = new Response(null, { status: 204 });
      response.headers.set(
        'Set-Cookie',
        `${SESSION_COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`
      );
      // Add security headers
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, private');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'DENY');

      return response;
    }

    // 405 Method Not Allowed
    const errorResponse = new Response('{"state":"provider-failure"}', {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
    return errorResponse;
  } catch (err) {
    return createSecureSessionResponse(responses.error(err instanceof Error ? err.message : 'Unknown error'), 503);
  }
}
