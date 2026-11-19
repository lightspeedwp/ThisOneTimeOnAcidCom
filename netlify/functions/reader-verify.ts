// POST /api/reader/verifications
// Verify code (atomic consume); create/update session
// Recovery-first: if recovery succeeds first, fresh code continues

export default async function handler(
  req: Request
): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Parse request: { email, code }
  // Atomically consume code
  // Create ReaderAccessRecord with delete_after = last_authenticated_at + 12 months
  // Create DeviceSession with expires_at ≤ 30 days
  // Set session cookie
  // Return: state, statusCode, Set-Cookie header

  throw new Error('handler: Not implemented');
}
