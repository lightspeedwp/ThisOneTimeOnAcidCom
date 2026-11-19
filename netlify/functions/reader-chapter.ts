// GET /api/reader/chapters/{chapterId}
// Serve protected chapter to verified sessions
// Use edition manifest and session validation
// RA-T035: Chapter delivery with manifest verification per RA-001, RA-010 & SC-004

import { parseSessionCookie } from '../lib/reader-access/session-cookie';
import { getSession } from '../lib/reader-access/store';
import { getApprovedChapters, loadChapterContent } from '../lib/reader-access/edition';
import { jsonResponse } from '../lib/reader-access/responses';

export default async function handler(
  req: Request,
  context: any
): Promise<Response> {
  if (req.method !== 'GET') {
    return jsonResponse({ state: 'invalid-method' }, 405);
  }

  try {
    // Extract session ID from HttpOnly cookie (RA-005)
    const cookieHeader = req.headers.get('cookie');
    const sessionId = parseSessionCookie(cookieHeader);
    if (!sessionId) {
      return jsonResponse({ state: 'request-pending' }, 401);
    }

    // RA-004: Retrieve and validate session
    const session = await getSession(sessionId);
    if (!session) {
      return jsonResponse({ state: 'request-pending' }, 401);
    }

    // Check expiry (RA-004: 30 days per RA-T007 approval)
    if (new Date() > new Date(session.expiresAt)) {
      return jsonResponse({ state: 'request-pending' }, 401);
    }

    // Extract chapterId from URL path
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const chapterId = pathSegments[pathSegments.length - 1];

    if (!chapterId) {
      return jsonResponse({ state: 'content-unavailable' }, 404);
    }

    // RA-010/RA-001: Check manifest (only approved chapters served)
    const approvedChapters = await getApprovedChapters();
    if (!approvedChapters.includes(chapterId)) {
      return jsonResponse({ state: 'content-unavailable' }, 503);
    }

    // SC-004: Load chapter from server-only location (netlify/functions/protected-content/)
    // RA-T054: Protected edition not in client bundle; served exclusively here
    const chapterContent = await loadChapterContent(chapterId);
    if (!chapterContent) {
      return jsonResponse({ state: 'content-unavailable' }, 503);
    }

    // RA-010: Return chapter with metadata
    return jsonResponse(
      {
        state: 'verified',
        chapter: {
          id: chapterId,
          content: chapterContent,
          meta: { title: chapterId, type: 'chapter' },
        },
      },
      200
    );
  } catch (error) {
    return jsonResponse({ state: 'content-unavailable' }, 503);
  }
}
