// GET /api/reader/chapters/{chapterId}
// Serve protected chapter to verified sessions
// Use edition manifest and session validation

import { validate as validateSessionCookie } from '../lib/reader-access/session-cookie';
import { getSession } from '../lib/reader-access/store';
import { loadManifest, isChapterApproved, loadChapter } from '../lib/reader-access/edition';
import { requestPending, contentUnavailable, chapterResponse } from '../lib/reader-access/responses';

export default async function handler(
  req: Request
): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // Parse chapterId from URL query param
    const url = new URL(req.url);
    const chapterId = url.searchParams.get('chapterId');

    if (!chapterId || typeof chapterId !== 'string') {
      return requestPending(400, {
        state: 'code-invalid',
        message: 'Please provide a chapter ID.',
      });
    }

    // Extract and validate session cookie
    const cookieHeader = req.headers.get('cookie');
    const sessionId = validateSessionCookie(cookieHeader);

    if (!sessionId) {
      // No valid session: reader should request access
      return requestPending(401, {
        state: 'request-pending',
        message: 'Please verify your email to access this chapter.',
      });
    }

    // Retrieve session from store and check expiry
    const session = await getSession(sessionId);
    if (!session) {
      return requestPending(401, {
        state: 'request-pending',
        message: 'Your session has expired. Please verify your email again.',
      });
    }

    const expiresAt = new Date(session.expiresAt);
    const now = new Date();
    if (expiresAt < now) {
      return requestPending(401, {
        state: 'request-pending',
        message: 'Your access has expired. Please verify your email again.',
      });
    }

    // Load edition manifest and check if chapter is approved
    const manifest = await loadManifest();
    if (!isChapterApproved(chapterId, manifest)) {
      // Chapter not in approved list (1-4 per Phase 0 approval)
      return contentUnavailable(404, {
        state: 'content-unavailable',
        message: 'This chapter is not yet available.',
      });
    }

    // Load chapter from protected-content location (server-only, not in bundle)
    const chapter = await loadChapter(chapterId);
    if (!chapter) {
      // Chapter file not found (should not happen if manifest is correct)
      return contentUnavailable(404, {
        state: 'content-unavailable',
        message: 'This chapter is not available.',
      });
    }

    // Success: return chapter
    return chapterResponse(200, {
      state: 'verified',
      message: 'Chapter loaded successfully.',
      chapter: {
        id: chapterId,
        title: chapter.title,
        content: chapter.content,
      },
    });
  } catch (error) {
    // Unexpected error: return generic error
    return contentUnavailable(500, {
      state: 'content-unavailable',
      message: 'An unexpected error occurred.',
    });
  }
}
