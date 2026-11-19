// GET /api/reader/chapters/{chapterId}
// Serve protected chapter to verified sessions
// Use edition manifest and session validation

import { createJsonResponse, responses, createResponse } from '../lib/reader-access/responses';
import { getSession, renewSession } from '../lib/reader-access/store';
import { parseSessionCookie, formatSessionCookie, createSessionCookie } from '../lib/reader-access/session-cookie';
import { EditionReader } from '../lib/reader-access/edition';

export default async function handler(
  req: Request,
  context: any
): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response('{"state":"provider-failure"}', { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    // Extract chapterId from URL path
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const chapterId = pathParts[pathParts.length - 1];

    if (!chapterId || chapterId === 'undefined') {
      return createJsonResponse(responses.unavailable(), 400);
    }

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

    // Load manifest and verify chapter is approved
    const manifest = {
      title: 'This One Time On Acid',
      createdAt: new Date().toISOString(),
      chapters: [
        {
          id: 'ch-01-beginning',
          title: 'The Beginning',
          approved: false,
        },
        {
          id: 'ch-05-01',
          title: 'The Exploration Begins',
          approved: true,
          wordCount: 2500,
          estimatedReadTime: 12,
        },
      ],
    };

    const reader = new EditionReader(manifest);
    if (!reader.isChapterApproved(chapterId)) {
      return createJsonResponse(responses.unavailable(), 404);
    }

    // Load chapter content (placeholder for now)
    const content = `<html><body><h1>${reader.getChapter(chapterId)?.title}</h1><p>Chapter content here...</p></body></html>`;

    // Renew session
    const renewedSession = await renewSession(sessionId);
    if (!renewedSession) {
      return createJsonResponse(responses.error('Failed to renew session'), 503);
    }

    // Create renewed session cookie
    const renewedCookie = createSessionCookie(sessionId);
    const cookieHeader2 = formatSessionCookie(renewedCookie);

    // Build response with content
    const responseBody = {
      state: 'verified',
      chapterId,
      title: reader.getChapter(chapterId)?.title,
      content,
      renewedAt: renewedSession.renewedAt,
      expiresAt: renewedSession.expiresAt,
    };

    const response = createResponse(responseBody, 200);
    response.headers.set('Set-Cookie', cookieHeader2);

    return response;
  } catch (err) {
    return createJsonResponse(responses.error(err instanceof Error ? err.message : 'Unknown error'), 503);
  }
}
