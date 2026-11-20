/**
 * @fileoverview Reader progress tracking API
 * RA-T050: Reading Progress Tracking
 * Spec: Phase 6
 *
 * GET  /api/reader/progress?chapterId=ch-01
 * POST /api/reader/progress
 *
 * - Track reading position and completion per chapter
 * - Resume reading from last position
 * - Store progress in Netlify Blobs per session
 */

import { Context } from '@netlify/functions';
import { createJsonResponse, createErrorResponse } from '../lib/reader-access/responses';
import { getSession } from '../lib/reader-access/store';
import {
  getProgress,
  getOrCreateProgress,
  updatePosition,
  resumeReading,
  markChapterComplete,
  ReaderProgress,
} from '../lib/reader-access/progress';

interface ProgressRequest {
  chapterId: string;
  position?: number;
  completion?: number;
  timeSpent?: number;
}

interface ProgressResponse {
  state: 'verified' | string;
  progress?: ReaderProgress;
  expiresAt?: string;
}

export default async (req: Request, context: Context) => {
  if (req.method !== 'GET' && req.method !== 'POST') {
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

    if (req.method === 'GET') {
      return handleGetProgress(req, sessionId, session.expiresAt);
    } else {
      return handlePostProgress(req, sessionId, session.expiresAt);
    }
  } catch (error) {
    console.error('Progress tracking error:', error);
    return createErrorResponse('Internal server error', 500);
  }
};

async function handleGetProgress(req: Request, sessionId: string, expiresAt: string): Promise<Response> {
  const url = new URL(req.url);
  const chapterId = url.searchParams.get('chapterId');

  if (!chapterId) {
    return createErrorResponse('Chapter ID required', 400);
  }

  const progress = await getProgress(sessionId, chapterId);

  const response: ProgressResponse = {
    state: 'verified',
    progress: progress || undefined,
    expiresAt,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-cache', // Always fresh
    },
  });
}

async function handlePostProgress(req: Request, sessionId: string, expiresAt: string): Promise<Response> {
  try {
    const body = (await req.json()) as ProgressRequest;

    if (!body.chapterId) {
      return createErrorResponse('Chapter ID required', 400);
    }

    let progress: ReaderProgress | null = null;

    // Handle different operations based on what's provided
    if (body.position !== undefined && body.completion !== undefined) {
      // Update progress with position and completion
      progress = await updatePosition(
        sessionId,
        body.chapterId,
        body.position,
        body.completion,
        body.timeSpent || 0,
      );

      // Auto-complete if 100% done
      if (body.completion === 100) {
        progress = await markChapterComplete(sessionId, body.chapterId);
      }
    } else {
      // Get or create progress (initialize reading)
      progress = await getOrCreateProgress(sessionId, body.chapterId);

      // Resume if already has progress
      if (progress && progress.position > 0) {
        progress = await resumeReading(sessionId, body.chapterId);
      }
    }

    if (!progress) {
      return createErrorResponse('Failed to save progress', 500);
    }

    const response: ProgressResponse = {
      state: 'verified',
      progress,
      expiresAt,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-cache',
      },
    });
  } catch (error) {
    console.error('Progress update error:', error);
    return createErrorResponse('Invalid request body', 400);
  }
}
