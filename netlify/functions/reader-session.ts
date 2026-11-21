// POST   /api/reader/session — create a session from a verified code (T017)
// GET    /api/reader/session — session status (read-only, no renewal)
// DELETE /api/reader/session — sign out: terminate session and clear cookie
//
// The cookie carries only the opaque token; email and device are resolved
// server-side through the hashed-token index (see store.getSessionByToken).

import { SESSION_SECURITY_HEADERS } from '../lib/reader-access/responses';
import { getSessionByToken } from '../lib/reader-access/store';
import { terminateSession } from '../lib/reader-access/session-service';
import { authenticateRequest } from '../lib/reader-access/session-middleware';
import { clearSessionCookie, getSessionTokenFromHeaders } from '../lib/reader-access/session-cookie';
import createSessionHandler from './reader-session-create';

function json(body: unknown, status: number, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...SESSION_SECURITY_HEADERS, ...extraHeaders },
  });
}

export default async function handler(req: Request): Promise<Response> {
  try {
    if (req.method === 'POST') {
      return createSessionHandler(req);
    }

    if (req.method === 'GET') {
      const auth = await authenticateRequest(req, { renew: false });
      if (!auth.isValid) {
        return json(
          { error: 'unauthorized', reason: auth.reason, action: 'reverify_email' },
          auth.statusCode,
          { 'Set-Cookie': auth.setCookie }
        );
      }
      return json(
        {
          state: 'verified',
          expiresAt: auth.session.expiresAt,
          renewedAt: auth.session.renewedAt,
        },
        200
      );
    }

    if (req.method === 'DELETE') {
      // Idempotent: always clear the cookie, terminate the session if found
      const token = getSessionTokenFromHeaders(req.headers);
      if (token) {
        const session = await getSessionByToken(token).catch(() => null);
        if (session && session.terminatedAt === null) {
          await terminateSession(session.email, session.deviceId);
        }
      }
      const response = new Response(null, { status: 204 });
      for (const [key, value] of Object.entries(SESSION_SECURITY_HEADERS)) {
        if (key !== 'Content-Type') response.headers.set(key, value);
      }
      response.headers.set('Set-Cookie', clearSessionCookie());
      return response;
    }

    return json({ error: 'method_not_allowed' }, 405, { Allow: 'GET, POST, DELETE' });
  } catch (err) {
    console.error('SESSION_ENDPOINT_ERROR', {
      message: err instanceof Error ? err.message : 'Unknown error',
    });
    return json({ error: 'server_error' }, 500);
  }
}
