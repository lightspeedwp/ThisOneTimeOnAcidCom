// Device session cookie management
// HttpOnly, Secure, SameSite=Lax first-party cookie
// Session ID: opaque random value; email and reader identity stay server-side

import { randomUUID } from 'crypto';

export const SESSION_COOKIE_NAME = 'reader_session';
export const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days

export interface SessionCookie {
  name: string;
  value: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'Lax' | 'Strict' | 'None';
  maxAge: number;
}

export interface SessionCookieOptions {
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
}

export function generateSessionId(): string {
  return randomUUID();
}

export function createSessionCookie(
  sessionId: string,
  options: SessionCookieOptions = {}
): SessionCookie {
  return {
    name: SESSION_COOKIE_NAME,
    value: sessionId,
    httpOnly: options.httpOnly ?? true,
    secure: options.secure ?? true,
    sameSite: options.sameSite ?? 'Lax',
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

export function formatSessionCookie(cookie: SessionCookie): string {
  const flags = [
    `${cookie.name}=${cookie.value}`,
    `Max-Age=${cookie.maxAge}`,
    `Path=/`,
  ];

  if (cookie.httpOnly) flags.push('HttpOnly');
  if (cookie.secure) flags.push('Secure');
  if (cookie.sameSite) flags.push(`SameSite=${cookie.sameSite}`);

  return flags.join('; ');
}

export function parseSessionCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map(c => c.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(`${SESSION_COOKIE_NAME}=`)) {
      const value = cookie.substring(`${SESSION_COOKIE_NAME}=`.length);
      return value.length > 0 ? value : null;
    }
  }

  return null;
}
