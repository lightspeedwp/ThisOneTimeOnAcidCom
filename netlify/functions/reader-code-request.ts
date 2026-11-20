// POST /api/reader/code-requests
// Create a verification code and send it by email.
// A resend replaces the previous code for the same email.
// Contract: .github/specs/005-reader-access/contracts/reader-access-functions.md

import { createJsonResponse, responses } from '../lib/reader-access/responses';
import { createVerificationCode, generateCode } from '../lib/reader-access/codes';
import { storeCode } from '../lib/reader-access/code-store';
import { MailgunMailer } from '../lib/reader-access/mailer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return createJsonResponse(responses.error('Method not allowed'), 405);
  }

  let email: unknown;
  try {
    ({ email } = (await req.json()) as Record<string, unknown>);
  } catch {
    return createJsonResponse(responses.invalid(), 400);
  }

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return createJsonResponse(responses.invalid(), 400);
  }

  try {
    // The emailed code and the stored hash must come from the same value.
    const plainCode = generateCode();
    const verificationCode = createVerificationCode(plainCode);

    // Overwrites any earlier code, so a resend invalidates the previous one.
    await storeCode(email, verificationCode);

    const mailer = new MailgunMailer({
      apiKey: process.env.MAILGUN_API_KEY || '',
      domain: process.env.MAILGUN_DOMAIN || '',
      fromAddress: process.env.MAILGUN_FROM || 'noreply@thisonetimeonacidcom.com',
    });

    const emailResult = await mailer.sendVerificationCode(email, plainCode, '10 minutes');

    if (emailResult.status === 'accepted') {
      return createJsonResponse(responses.received(verificationCode.expiresAt), 202);
    }
    if (emailResult.status === 'uncertain') {
      return createJsonResponse(responses.uncertain(), 502);
    }
    return createJsonResponse(responses.error('The code could not be sent'), 502);
  } catch {
    // Never echo internal error text to the visitor.
    return createJsonResponse(responses.error('The code could not be sent'), 502);
  }
}
