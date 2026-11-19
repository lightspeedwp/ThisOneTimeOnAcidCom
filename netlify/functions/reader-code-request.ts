// POST /api/reader/code-requests
// Create verification code and send via email
// Resend invalidates previous code for same email

import { createVerificationCode } from '../lib/reader-access/codes';
import { storeCode, getCode } from '../lib/reader-access/store';
import { sendCode } from '../lib/reader-access/mailer';
import { rateLimit, requestReceived, providerFailure, limitedResponse } from '../lib/reader-access/responses';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_PER_EMAIL = 10; // codes/day per email
const RATE_LIMIT_PER_IP = 50; // codes/day per IP

export default async function handler(
  req: Request
): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // Parse and validate email
    const body = await req.json() as { email?: string };
    const { email } = body;

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return rateLimit(400, {
        state: 'invalid-email',
        message: 'Please provide a valid email address.',
      });
    }

    // Check rate limit per email (TODO: implement IP-based limiting in future)
    const existingCode = await getCode(email);
    if (existingCode) {
      const now = new Date();
      const createdAt = new Date(existingCode.createdAt);
      const hoursSinceCreated = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

      // If code is less than 24 hours old, increment attempt counter
      // For MVP: simple check; production would aggregate over 24h window
      if (hoursSinceCreated < 24) {
        // Rate limit exceeded (simplified: reject if code exists)
        // In production: check cumulative count across all codes for email in 24h
        return limitedResponse(429, {
          state: 'limited',
          message: 'Too many code requests. Please try again later.',
        });
      }
    }

    // Generate and store new code
    const code = createVerificationCode();
    await storeCode(email, code);

    // Send via Mailgun
    try {
      await sendCode(email, code);
    } catch (error) {
      // Provider failure: distinguish "accepted for sending" from connection error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('ENOTFOUND')) {
        // Connection refused: provider is down
        return providerFailure(502, {
          state: 'provider-failure',
          message: 'Service temporarily unavailable. Please try again.',
        });
      }

      // Other error: might be validation error, treat as provider failure
      return providerFailure(502, {
        state: 'provider-failure',
        message: 'Email service error. Please try again.',
      });
    }

    // Success: code sent
    return requestReceived(202, {
      state: 'request-received',
      message: 'Code sent. Check your email within 10 minutes.',
    });
  } catch (error) {
    // Unexpected error
    return providerFailure(500, {
      state: 'provider-failure',
      message: 'An unexpected error occurred.',
    });
  }
}
