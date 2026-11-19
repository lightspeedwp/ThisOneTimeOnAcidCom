// GET /api/reader/session — Get session status
// DELETE /api/reader/session — Sign out (end session, clear cookie)

export default async function handler(
  req: Request
): Promise<Response> {
  if (req.method === 'GET') {
    // Parse session cookie
    // Return: { expiresAt } or 401
    throw new Error('GET handler: Not implemented');
  } else if (req.method === 'DELETE') {
    // Parse session cookie
    // End session server-side
    // Clear cookie
    // Return: 204 (always, even if already ended)
    throw new Error('DELETE handler: Not implemented');
  }

  return new Response('Method not allowed', { status: 405 });
}
