/**
 * @fileoverview Reader chapter listing and discovery API
 * RA-T049: Chapter List & Discovery
 * Spec: Phase 6 Content Delivery
 *
 * GET /api/reader/chapters?status=approved&page=1&limit=10
 * - Returns paginated list of chapters
 * - Requires valid reader session
 * - Filters by status (approved/published)
 * - Supports pagination
 */

import { Context } from '@netlify/functions';
import { createJsonResponse, createErrorResponse } from '../lib/reader-access/responses';
import { getSession } from '../lib/reader-access/store';
import { EditionReader } from '../lib/reader-access/edition';

interface ChapterListItem {
  id: string;
  title: string;
  wordCount: number;
  estimatedReadTime: number;
  status: 'draft' | 'review' | 'approved' | 'published';
  approvedAt?: string;
}

interface ChaptersListResponse {
  state: 'verified' | string;
  chapters: ChapterListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
  expiresAt?: string;
}

export default async (req: Request, context: Context) => {
  if (req.method !== 'GET') {
    return createErrorResponse('Method not allowed', 405);
  }

  try {
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

    // Parse query parameters
    const url = new URL(req.url);
    const statusParam = url.searchParams.get('status') as 'approved' | 'published' || 'approved';
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') || '10', 10)));

    // Get edition and filter chapters
    const edition = new EditionReader();
    let chapters = edition.listChapters();

    // Filter by approval status
    if (statusParam === 'approved') {
      chapters = chapters.filter(c => c.approved);
    } else if (statusParam === 'published') {
      chapters = chapters.filter(c => c.status === 'published' || c.approved);
    }

    // Calculate pagination
    const total = chapters.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedChapters = chapters.slice(startIndex, endIndex);

    // Build response items
    const items: ChapterListItem[] = paginatedChapters.map(ch => ({
      id: ch.id,
      title: ch.title,
      wordCount: ch.wordCount || 0,
      estimatedReadTime: ch.estimatedReadTime || 0,
      status: ch.status || 'approved',
      approvedAt: ch.approvedAt,
    }));

    // Build response
    const expiresAt = new Date(session.expiresAt).toISOString();
    const response: ChaptersListResponse = {
      state: 'verified',
      chapters: items,
      pagination: {
        page,
        limit,
        total,
        hasMore: endIndex < total,
      },
      expiresAt,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Chapter listing error:', error);
    return createErrorResponse('Internal server error', 500);
  }
};
