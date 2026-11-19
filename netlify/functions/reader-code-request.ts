// POST /api/reader/code-requests
// Create verification code and send via email
// Resend invalidates previous code for same email

export default async function handler(
  req: Request
): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Parse request: { email }
  // Create VerificationCode with created_at = server time
  // Send via Mailgun
  // Return: state, statusCode

  throw new Error('handler: Not implemented');
}
