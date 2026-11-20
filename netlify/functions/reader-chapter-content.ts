/**
 * @fileoverview Reader chapter content delivery API
 * RA-T048: Chapter Content API
 * Spec: Phase 6 Content Delivery
 *
 * GET /api/reader/chapters/{chapterId}/content
 * - Returns chapter content (HTML/Markdown) with metadata
 * - Requires valid reader session cookie
 * - Validates chapter approval status before delivery
 * - Includes Cache-Control headers for client caching
 */

import { Context } from '@netlify/functions';
import { createJsonResponse, createErrorResponse } from '../lib/reader-access/responses';
import { getSession } from '../lib/reader-access/store';
import { EditionReader } from '../lib/reader-access/edition';


// In-memory chapter content store (in production, fetch from CMS/database)
const CHAPTER_CONTENT: Record<string, { html: string; markdown: string }> = {
  'ch-01-beginning': {
    html: '<h1>Chapter 1: The Beginning</h1><p>Content here...</p>',
    markdown: '# Chapter 1: The Beginning\n\nContent here...',
  },
  'ch-02-journey': {
    html: '<h1>Chapter 2: The Journey</h1><p>More content...</p>',
    markdown: '# Chapter 2: The Journey\n\nMore content...',
  },
};

export default async (req: Request, context: Context) => {
  if (req.method !== 'GET') {
    return createErrorResponse('Method not allowed', 405);
  }

  try {
    // Extract chapterId from URL path
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const chapterId = pathParts[pathParts.length - 2]; // .../chapters/{chapterId}/content

    if (!chapterId) {
      return createErrorResponse('Chapter ID required', 400);
    }

    // Verify reader session
    const sessionCookie = req.headers.get('cookie')?.split('; ').find(c => c.startsWith('reader_session='));
    if (!sessionCookie) {
      return createErrorResponse('Unauthorized: No session cookie', 401);
    }

    const sessionId = sessionCookie.split('=')[1];
    const session = await getSession(sessionId);

    if (!session || session.state !== 'verified') {
      return createErrorResponse('Unauthorized: Invalid session', 401);
    }

    // Check session expiration
    if (new Date(session.expiresAt) < new Date()) {
      return createErrorResponse('Unauthorized: Session expired', 401);
    }

    // Get chapter metadata
    const edition = new EditionReader();
    const chapter = edition.getChapter(chapterId);
    if (!chapter) {
      return createErrorResponse('Chapter not found', 404);
    }

    // Check chapter approval status
    if (!chapter.approved) {
      return createErrorResponse('Content unavailable', 403);
    }

    // Get chapter content (default to markdown)
    const contentType = url.searchParams.get('format') as string || 'markdown';
    const content = CHAPTER_CONTENT[chapterId]?.[contentType === 'html' ? 'html' : 'markdown'];

    if (!content) {
      return createErrorResponse('Chapter content not found', 404);
    }

    // Build response
    const expiresAt = new Date(session.expiresAt).toISOString();
    const response = {
      state: 'verified' as const,
      chapterId,
      content,
      expiresAt,
      metadata: {
        title: chapter.title,
        wordCount: chapter.wordCount || 0,
        estimatedReadTime: chapter.estimatedReadTime || 0,
        version: edition.getCurrentVersion(chapterId),
      },
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Chapter content delivery error:', error);
    return createErrorResponse('Internal server error', 500);
  }
};
