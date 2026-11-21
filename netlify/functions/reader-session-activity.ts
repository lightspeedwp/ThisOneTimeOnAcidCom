/**
 * Session activity debug endpoint - T040
 *
 * GET /api/reader/session/info
 * Returns session info including timestamps and activity history
 *
 * User Story 3: Activity Tracking for Session Lifecycle
 *
 * Response:
 * {
 *   "sessionId": "sess_***masked***",
 *   "email": "reader@example.com",
 *   "createdAt": "2026-11-20T10:00:00.000Z",
 *   "renewedAt": "2026-11-20T14:30:00.000Z",
 *   "terminatedAt": null,
 *   "expiresAt": "2026-12-20T10:00:00.000Z",
 *   "status": "active",
 *   "deviceId": "hash123",
 *   "deviceProperties": {
 *     "isExpired": false,
 *     "isActive": true,
 *     "isTerminated": false,
 *     "secondsToExpiry": 2592000,
 *     "daysSinceRenewal": 0.19
 *   }
 * }
 *
 * Note: This endpoint is for debugging and admin purposes only.
 * In production, should be restricted to authenticated admin users.
 */

import { validateSessionWithContext } from '../lib/reader-access/session-middleware';
import { getSessionProperties } from '../lib/reader-access/session-service';

export default async (request: Request) => {
  // Only allow GET requests
  if (request.method !== 'GET') {
    return new Response(
      JSON.stringify({
        error: 'method_not_allowed',
        message: 'Only GET requests are allowed',
      }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Extract query parameters
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    const deviceId = url.searchParams.get('deviceId');

    if (!email || !deviceId) {
      return new Response(
        JSON.stringify({
          error: 'missing_parameters',
          message: 'email and deviceId query parameters required',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate session
    const context = {
      headers: request.headers,
      clientIp: request.headers.get('cf-connecting-ip') || 'unknown',
      url: request.url,
      method: request.method,
    };

    const validationResult = await validateSessionWithContext(context, email, deviceId);

    if (!validationResult.isValid) {
      return new Response(
        JSON.stringify({
          error: validationResult.error?.code || 'validation_failed',
          message: validationResult.error?.message || 'Session validation failed',
        }),
        {
          status: validationResult.statusCode || 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const session = validationResult.session;
    if (!session) {
      return new Response(
        JSON.stringify({
          error: 'session_not_found',
          message: 'Session data not found',
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Compute session properties
    const properties = getSessionProperties(session);

    // Mask session ID for security
    const maskedSessionId =
      session.sessionId.length > 12
        ? `${session.sessionId.slice(0, 4)}***${session.sessionId.slice(-4)}`
        : '***masked***';

    // Build response
    const response = {
      sessionId: maskedSessionId,
      email: session.email,
      deviceId: session.deviceId,
      createdAt: session.createdAt,
      renewedAt: session.renewedAt,
      terminatedAt: session.terminatedAt,
      expiresAt: session.expiresAt,
      status: session.status,
      deviceProperties: properties,
      _debug: {
        note: 'This endpoint is for debugging/admin purposes only',
        timestamp: new Date().toISOString(),
      },
    };

    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        Pragma: 'no-cache',
      },
    });
  } catch (error) {
    console.error('Session info endpoint error:', error);

    return new Response(
      JSON.stringify({
        error: 'internal_server_error',
        message: 'Failed to retrieve session information',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  }
};
