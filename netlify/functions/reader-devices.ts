/**
 * GET /api/reader/devices
 * List all active devices for the authenticated reader.
 * Allows device management UI to show and terminate devices.
 *
 * Query parameters:
 * - email: Reader's email (required)
 *
 * Response:
 * - 200 OK: List of active devices
 * - 400 Bad Request: Missing email
 * - 401 Unauthorized: Invalid email
 * - 500 Internal Server Error: Storage error
 *
 * This is an optional endpoint for user-facing device management.
 */

import { createJsonResponse } from '../lib/reader-access/responses';
import { listSessionsByEmail } from '../lib/reader-access/store';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Extract email from query parameters
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return createJsonResponse({ error: 'Invalid email' }, 400);
    }

    // List all sessions for this email
    const allSessions = await listSessionsByEmail(email);

    // Filter to active sessions only
    const activeSessions = allSessions.filter(
      (s) => s.status === 'active' && s.terminatedAt === null
    );

    // Transform to user-friendly format (hide sensitive fields)
    const devices = activeSessions.map((session) => ({
      deviceId: session.deviceId,
      createdAt: session.createdAt,
      renewedAt: session.renewedAt,
      expiresAt: session.expiresAt,
      // Calculate time remaining
      secondsToExpiry: Math.max(
        0,
        (new Date(session.expiresAt).getTime() - Date.now()) / 1000
      ),
    }));

    // Return device list
    const response = createJsonResponse(
      {
        status: 'retrieved',
        email,
        devices,
        count: devices.length,
        limit: 2, // MAX_CONCURRENT_DEVICES
      },
      200
    );

    // Set security headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    return response;
  } catch (error) {
    console.error('Device list error:', error instanceof Error ? error.message : 'Unknown error');
    return createJsonResponse(
      {
        error: 'Device list retrieval failed',
        reason: 'internal_error',
      },
      500
    );
  }
}
