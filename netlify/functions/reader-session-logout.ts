/**
 * Logout endpoint: POST /api/reader/session/logout
 * Terminates session immediately and clears session cookie
 *
 * T059: Implement logout endpoint
 * T060: Add logout logging
 * T062: Session token invalidation after logout
 */

import { terminateSession } from '../lib/reader-access/session-service';
import { getSessionTokenFromHeaders, clearSessionCookie } from '../lib/reader-access/session-cookie';
import { validateSessionWithContext } from '../lib/reader-access/session-middleware';
import { generateDeviceFingerprint } from '../lib/reader-access/device-fingerprint';
import { FingerprintInput } from '../lib/reader-access/session';

/**
 * Handle logout request
 *
 * Steps:
 * 1. Extract sessionToken from cookie (or body for testing)
 * 2. Validate session to get email and deviceId
 * 3. Call terminateSession(email, deviceId)
 * 4. Return 200 OK with Set-Cookie header to clear cookie
 * 5. Log logout event
 *
 * @param req HTTP request
 * @param context Netlify context (for Blobs access)
 * @returns 200 OK + Set-Cookie: Max-Age=0, or 401 if no valid session
 */
export default async function handler(
  req: Request,
  context: any
): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({
        error: 'method_not_allowed',
        message: 'POST required',
      }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Step 1: Extract sessionToken from cookie or body
    const sessionToken = getSessionTokenFromHeaders(req.headers);

    if (!sessionToken) {
      // No active session to logout
      return new Response(
        JSON.stringify({
          error: 'no_session',
          message: 'No active session',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': clearSessionCookie(),
          },
        }
      );
    }

    // Step 2: Extract client info for logging
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const clientIp =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('cf-connecting-ip') ||
      'unknown-ip';

    // Step 3: Validate session to get email and deviceId
    // Convert headers to object format for middleware
    const headersRecord: Record<string, string | string[] | undefined> = {};
    for (const [key, value] of req.headers.entries()) {
      headersRecord[key] = value;
    }

    // Generate device fingerprint from request
    const fingerprintInput: FingerprintInput = {
      userAgent,
      ipAddress: clientIp,
      timezone: headersRecord['x-timezone'] as string | undefined,
    };
    const deviceId = generateDeviceFingerprint(fingerprintInput);

    // For logout, we need to know the email
    // In a real implementation, this could come from:
    // - A JWT token decoder (if using JWT format)
    // - A session index lookup
    // - Request body
    // For now, we'll extract from request body or return error

    let email: string | null = null;

    // Try to get email from request body (POST parameter)
    if (req.headers.get('content-type')?.includes('application/json')) {
      try {
        const body = await req.json();
        email = body.email;
      } catch (e) {
        // Not JSON or empty body
      }
    }

    if (!email) {
      // Cannot logout without knowing which session belongs to this user
      // This is a security measure: prevent blind logout attempts
      return new Response(
        JSON.stringify({
          error: 'invalid_request',
          message: 'email parameter required in request body',
          reason: 'invalid_session',
          action: 'reverify_email',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': clearSessionCookie(),
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );
    }

    // Step 4: Validate session belongs to this email and device
    const validationResult = await validateSessionWithContext(
      {
        headers: headersRecord,
        clientIp,
        url: req.url,
        method: 'POST',
      },
      email,
      deviceId
    );

    if (!validationResult.isValid) {
      // Session invalid, but that's ok for logout
      // Clear cookie anyway
      return new Response(
        JSON.stringify({
          error: 'unauthorized',
          reason: validationResult.error?.code,
          action: 'reverify_email',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': clearSessionCookie(),
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );
    }

    // Step 5: Terminate the session
    try {
      await terminateSession(email, deviceId);
    } catch (error) {
      // Log error but still clear cookie (session is inaccessible)
      console.error('Session termination error:', {
        email,
        deviceId,
        error: error instanceof Error ? error.message : String(error),
      });

      // Return 500 but still clear cookie
      return new Response(
        JSON.stringify({
          error: 'server_error',
          message: 'Failed to terminate session',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': clearSessionCookie(),
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );
    }

    // Step 6: T060 - Log logout event
    logLogoutEvent({
      email,
      deviceId,
      terminatedAt: new Date().toISOString(),
      ipAddress: clientIp,
      userAgent,
    });

    // Step 7: Return 200 OK with Set-Cookie to clear cookie
    // After this, session token is invalidated (T062)
    return new Response(
      JSON.stringify({
        status: 'logged_out',
        message: 'Session terminated. You have been signed out.',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': clearSessionCookie(),
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );
  } catch (error) {
    console.error('Logout handler error:', error);

    return new Response(
      JSON.stringify({
        error: 'server_error',
        message: 'Internal server error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': clearSessionCookie(),
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  }
}

/**
 * T060: Log logout event for analytics and audit trail
 *
 * @param event Logout event details
 */
function logLogoutEvent(event: {
  email: string;
  deviceId: string;
  terminatedAt: string;
  ipAddress: string;
  userAgent: string;
}): void {
  // Log to console for serverless functions
  console.log('Session logout:', {
    timestamp: new Date().toISOString(),
    email: event.email,
    deviceId: event.deviceId.substring(0, 8) + '...', // Mask for privacy
    terminatedAt: event.terminatedAt,
    ipAddress: event.ipAddress,
    userAgent: event.userAgent.substring(0, 50), // Truncate
  });

  // TODO: Send to analytics/logging service
  // Examples:
  // - Datadog event
  // - CloudWatch log
  // - Custom logging endpoint
  // - Segment/Mixpanel for analytics
}
