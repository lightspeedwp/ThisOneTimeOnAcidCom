// GET /api/reader/session — Get session status
// DELETE /api/reader/session — Sign out (end session, clear cookie)

import { createJsonResponse, responses } from '../lib/reader-access/responses';
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
        return createJsonResponse(responses.invalid(), 401);
      }

      // Retrieve session
      const session = await getSession(sessionId);
      if (!session) {
        return createJsonResponse(responses.invalid(), 401);
      }

      // Check if expired
      if (new Date(session.expiresAt) < new Date()) {
        return createJsonResponse(responses.invalid(), 401);
      }

      // Return session details
      return createJsonResponse(
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

      // Clear session cookie with Max-Age=0
      const response = new Response(null, { status: 204 });
      response.headers.set(
        'Set-Cookie',
        `${SESSION_COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`
      );
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

      return response;
    }

    return new Response('{"state":"provider-failure"}', { status: 405, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return createJsonResponse(responses.error(err instanceof Error ? err.message : 'Unknown error'), 503);
  }
}
