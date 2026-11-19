// POST /api/reader/code-requests
// Create verification code and send via email
// Resend invalidates previous code for same email

import { createJsonResponse, responses } from '../lib/reader-access/responses';
import { createVerificationCode, generateCode } from '../lib/reader-access/codes';
import { storeCode, deleteCode } from '../lib/reader-access/store';
import { MailgunMailer } from '../lib/reader-access/mailer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(
  req: Request
): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('{"state":"provider-failure"}', { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    // Parse request body
    const body = await req.json();
    const { email } = body as Record<string, unknown>;

    // Validate email
    if (!email || typeof email !== 'string') {
      return createJsonResponse(responses.invalid(), 400);
    }

    if (!EMAIL_REGEX.test(email)) {
      return createJsonResponse(responses.invalid(), 400);
    }

    // Delete previous code for this email (recovery: invalidate old)
    await deleteCode(email).catch(() => {
      // Ignore deletion errors
    });

    // Create new verification code
    const code = generateCode();
    const verificationCode = createVerificationCode();

    // Store code
    await storeCode(email, {
      codeHash: verificationCode.codeHash,
      createdAt: verificationCode.createdAt,
      expiresAt: verificationCode.expiresAt,
      attemptCount: verificationCode.attemptCount,
      maxAttempts: verificationCode.maxAttempts,
    });

    // Send via Mailgun
    const mailer = new MailgunMailer({
      apiKey: process.env.MAILGUN_API_KEY || '',
      domain: process.env.MAILGUN_DOMAIN || '',
      fromAddress: process.env.MAILGUN_FROM || 'noreply@thisonetimeonacidcom.com',
    });

    const emailResult = await mailer.sendVerificationCode(email, code, '10 minutes');

    // Return response based on email result
    if (emailResult.status === 'accepted') {
      return createJsonResponse(
        responses.received(verificationCode.expiresAt),
        202
      );
    } else if (emailResult.status === 'uncertain') {
      return createJsonResponse(responses.uncertain(), 502);
    } else {
      return createJsonResponse(responses.invalid(), 400);
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      return createJsonResponse(responses.invalid(), 400);
    }
    return createJsonResponse(responses.error(err instanceof Error ? err.message : 'Unknown error'), 502);
  }
}
