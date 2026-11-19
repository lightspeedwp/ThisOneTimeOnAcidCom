// Device session cookie management
// HttpOnly, Secure, SameSite=Lax first-party cookie
// Session ID: opaque random value; email and reader identity stay server-side

export interface SessionCookie {
  name: string; // e.g., 'reader_session'
  value: string; // Opaque random session ID
  httpOnly: boolean; // true
  secure: boolean; // true (HTTPS only)
  sameSite: 'Lax' | 'Strict' | 'None'; // Lax
  maxAge: number; // Up to 30 days in seconds
}

export function createSessionCookie(sessionId: string): SessionCookie {
  return {
    name: 'reader_session',
    value: sessionId,
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  };
}

export function parseSessionCookie(cookieString: string): string | null {
  // Parse and validate session cookie from request
  // Return session ID or null if missing/invalid
  throw new Error('parseSessionCookie: Not implemented');
}
