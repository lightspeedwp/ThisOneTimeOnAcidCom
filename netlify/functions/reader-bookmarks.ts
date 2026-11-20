/**
 * @fileoverview Reader bookmarks API
 * RA-T052: Bookmarking System
 * Spec: Phase 6
 *
 * GET  /api/reader/bookmarks
 * POST /api/reader/bookmarks
 * DELETE /api/reader/bookmarks/{bookmarkId}
 *
 * - Manage chapter bookmarks
 * - Save reading position and custom labels
 * - Persistent bookmark storage per session
 */

import { Context } from '@netlify/functions';
import { createJsonResponse, createErrorResponse } from '../lib/reader-access/responses';
import { getSession } from '../lib/reader-access/store';
import {
  createBookmark,
  getBookmark,
  deleteBookmark,
  updateBookmark,
  ReaderBookmark,
} from '../lib/reader-access/bookmarks';

interface BookmarkRequest {
  chapterId: string;
  position?: number;
  title?: string;
}

interface BookmarksResponse {
  state: 'verified' | string;
  bookmark?: ReaderBookmark;
  bookmarks?: ReaderBookmark[];
  expiresAt?: string;
}

export default async (req: Request, context: Context) => {
  if (!['GET', 'POST', 'DELETE'].includes(req.method)) {
    return createErrorResponse('Only GET, POST, and DELETE allowed', 405);
  }

  try {
    // Verify reader session
    const sessionCookie = req.headers.get('cookie')?.split('; ').find(c => c.startsWith('reader_session='));
    if (!sessionCookie) {
      return createErrorResponse('Unauthorized: No session cookie', 401);
    }

    const sessionId = sessionCookie.split('=')[1];
    const session = await getSession(sessionId);

    if (!session) {
      return createErrorResponse('Unauthorized: Invalid session', 401);
    }

    // Check session expiration
    if (new Date(session.expiresAt) < new Date()) {
      return createErrorResponse('Unauthorized: Session expired', 401);
    }

    if (req.method === 'GET') {
      return handleGetBookmarks(req, sessionId, session.expiresAt);
    } else if (req.method === 'POST') {
      return handlePostBookmark(req, sessionId, session.expiresAt);
    } else {
      return handleDeleteBookmark(req, sessionId, session.expiresAt);
    }
  } catch (error) {
    console.error('Bookmarks API error:', error);
    return createErrorResponse('Internal server error', 500);
  }
};

async function handleGetBookmarks(req: Request, sessionId: string, expiresAt: string): Promise<Response> {
  const url = new URL(req.url);
  const bookmarkId = url.searchParams.get('bookmarkId');

  if (bookmarkId) {
    // Get specific bookmark
    const bookmark = await getBookmark(sessionId, bookmarkId);

    if (!bookmark) {
      return createErrorResponse('Bookmark not found', 404);
    }

    const response: BookmarksResponse = {
      state: 'verified',
      bookmark,
      expiresAt,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-cache',
      },
    });
  }

  // Get all bookmarks for session (empty for MVP)
  const response: BookmarksResponse = {
    state: 'verified',
    bookmarks: [],
    expiresAt,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, max-age=300', // 5-min cache
    },
  });
}

async function handlePostBookmark(req: Request, sessionId: string, expiresAt: string): Promise<Response> {
  try {
    const body = (await req.json()) as BookmarkRequest;

    if (!body.chapterId) {
      return createErrorResponse('Chapter ID required', 400);
    }

    // Check if updating existing bookmark for chapter or creating new
    // For MVP, always create new - in production would check and update
    const bookmark = await createBookmark(sessionId, body.chapterId, body.position, body.title);

    const response: BookmarksResponse = {
      state: 'verified',
      bookmark,
      expiresAt,
    };

    return new Response(JSON.stringify(response), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-cache',
      },
    });
  } catch (error) {
    console.error('Bookmark POST error:', error);
    return createErrorResponse('Invalid request body', 400);
  }
}

async function handleDeleteBookmark(req: Request, sessionId: string, expiresAt: string): Promise<Response> {
  const url = new URL(req.url);
  const bookmarkId = url.pathname.split('/').pop();

  if (!bookmarkId) {
    return createErrorResponse('Bookmark ID required', 400);
  }

  // Verify bookmark exists before deleting
  const bookmark = await getBookmark(sessionId, bookmarkId);
  if (!bookmark) {
    return createErrorResponse('Bookmark not found', 404);
  }

  await deleteBookmark(sessionId, bookmarkId);

  const response: BookmarksResponse = {
    state: 'verified',
    expiresAt,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-cache',
    },
  });
}
