// GET /api/reader/chapters/{chapterId}
// Serve a protected chapter to readers with a valid session (T018, US1).
//
// - Valid session   → 200 with chapter content; session renewed (T019) and
//                     the cookie's Max-Age restarted
// - Missing/expired/terminated/unknown session → 401 and the cookie is cleared
// - Unapproved chapter → 404 content-unavailable

import { SESSION_SECURITY_HEADERS } from '../lib/reader-access/responses';
import { authenticateRequest } from '../lib/reader-access/session-middleware';
import { EditionReader } from '../lib/reader-access/edition';
import { maskSensitive } from '../lib/reader-access/crypto';

const CHAPTER_ID_REGEX = /^[a-z0-9-]{1,100}$/i;

function json(body: unknown, status: number, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...SESSION_SECURITY_HEADERS, ...extraHeaders },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return json({ state: 'provider-failure' }, 405, { Allow: 'GET' });
  }

  try {
    const pathParts = new URL(req.url).pathname.split('/').filter(Boolean);
    const chapterId = decodeURIComponent(pathParts[pathParts.length - 1] ?? '');

    if (!CHAPTER_ID_REGEX.test(chapterId)) {
      return json({ state: 'content-unavailable' }, 400);
    }

    const auth = await authenticateRequest(req);

    if (!auth.isValid) {
      console.log('CHAPTER_ACCESS', { chapterId, sessionStatus: auth.reason });
      return json(
        {
          state: 'request-pending',
          error: 'unauthorized',
          reason: auth.reason,
          action: 'reverify_email',
        },
        auth.statusCode,
        { 'Set-Cookie': auth.setCookie }
      );
    }

    const { session } = auth;
    console.log('CHAPTER_ACCESS', {
      email: maskSensitive(session.email),
      chapterId,
      sessionStatus: 'valid',
    });

    const edition = new EditionReader();
    const chapter = edition.getChapter(chapterId);
    if (!chapter || !edition.isChapterApproved(chapterId)) {
      return json({ state: 'content-unavailable' }, 404, { 'Set-Cookie': auth.setCookie });
    }

    // Placeholder body until chapter content is sourced from the CMS
    const title = escapeHtml(chapter.title);
    const content = `<h1>${title}</h1><p>Chapter content here...</p>`;

    return json(
      {
        state: 'verified',
        chapterId,
        title: chapter.title,
        content,
        chapter: { id: chapterId, title: chapter.title, content },
        renewedAt: session.renewedAt,
        expiresAt: session.expiresAt,
      },
      200,
      { 'Set-Cookie': auth.setCookie }
    );
  } catch (err) {
    console.error('CHAPTER_ACCESS_ERROR', {
      message: err instanceof Error ? err.message : 'Unknown error',
    });
    return json({ state: 'provider-failure' }, 503);
  }
}
