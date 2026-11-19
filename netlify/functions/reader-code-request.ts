// POST /api/reader/code-requests
// Create verification code and send via email
// Resend invalidates previous code for same email
// RA-T033: Implements code creation with server-time creation_at per RA-003

import { createVerificationCode } from '../lib/reader-access/codes';
import { storeCode, deleteCode } from '../lib/reader-access/store';
import { sendVerificationEmail } from '../lib/reader-access/mailer';
import { jsonResponse } from '../lib/reader-access/responses';

interface CodeRequestBody {
  email: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return jsonResponse({ state: 'invalid-method' }, 405);
  }

  try {
    const body = (await req.json()) as CodeRequestBody;
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return jsonResponse({ state: 'invalid-email' }, 400);
    }

    // RA-003: Invalidate previous code on resend
    await deleteCode(email);

    // RA-002: Create six-digit code with 10-minute expiry
    const verificationCode = createVerificationCode();
    await storeCode(email, verificationCode);

    // Send via Mailgun (Decision 1 approved)
    try {
      await sendVerificationEmail(email, verificationCode);
      return jsonResponse({ state: 'request-received' }, 202);
    } catch (mailError) {
      // RA-003: Distinguish delivery uncertainty from complete failure
      return jsonResponse({ state: 'delivery-uncertain' }, 202);
    }
  } catch (error) {
    return jsonResponse({ state: 'provider-failure' }, 502);
  }
}
