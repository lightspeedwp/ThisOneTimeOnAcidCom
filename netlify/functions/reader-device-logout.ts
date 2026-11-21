/**
 * POST /api/reader/device/logout
 * Terminate a specific device session to free up device slots.
 *
 * Request body:
 * {
 *   "email": "reader@example.com",
 *   "deviceId": "fingerprint-hash-123"
 * }
 *
 * Response:
 * - 200 OK: Device session terminated successfully
 * - 400 Bad Request: Invalid inputs
 * - 401 Unauthorized: Session not found or already terminated
 * - 500 Internal Server Error: Storage error
 *
 * This endpoint allows readers to manage devices and free up slots
 * when they reach the concurrent device limit.
 */

import { createJsonResponse } from '../lib/reader-access/responses';
import { terminateSession } from '../lib/reader-access/session-service';
import { getSession } from '../lib/reader-access/store';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Parse request body
    const body = (await req.json()) as Record<string, unknown>;
    const { email, deviceId } = body;

    // Validate inputs
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return createJsonResponse({ error: 'Invalid email' }, 400);
    }

    if (!deviceId || typeof deviceId !== 'string') {
      return createJsonResponse({ error: 'Invalid deviceId' }, 400);
    }

    // Verify session exists before termination
    const session = await getSession(email, deviceId);
    if (!session) {
      return createJsonResponse(
        { error: 'Session not found', reason: 'session_not_found' },
        401
      );
    }

    // Check if already terminated
    if (session.terminatedAt !== null) {
      return createJsonResponse(
        { error: 'Session already terminated', reason: 'already_terminated' },
        401
      );
    }

    // Terminate the session
    await terminateSession(email, deviceId);

    // Return 200 OK with confirmation
    const response = createJsonResponse(
      {
        status: 'terminated',
        message: 'Device session terminated successfully',
        deviceId,
        email,
        terminatedAt: new Date().toISOString(),
      },
      200
    );

    // Set security headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    return response;
  } catch (error) {
    console.error('Device logout error:', error instanceof Error ? error.message : 'Unknown error');
    return createJsonResponse(
      {
        error: 'Device logout failed',
        reason: 'internal_error',
      },
      500
    );
  }
}
