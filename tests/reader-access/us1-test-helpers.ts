/**
 * Shared helpers for User Story 1 tests (T011–T020).
 *
 * Provides an in-memory Netlify Blobs double whose list() resolves to the
 * real @netlify/blobs shape ({ blobs: [{ key }] }), plus request builders.
 */

import { storeCode } from '../../netlify/lib/reader-access/store';
import { createVerificationCode } from '../../netlify/lib/reader-access/codes';

export const memoryBlobs = new Map<string, string>();

export function createMemoryStore() {
  return {
    get: async (key: string) => memoryBlobs.get(key) ?? null,
    set: async (key: string, value: string) => {
      memoryBlobs.set(key, value);
    },
    delete: async (key: string) => {
      memoryBlobs.delete(key);
    },
    list: async ({ prefix = '' }: { prefix?: string } = {}) => ({
      blobs: [...memoryBlobs.keys()].filter((k) => k.startsWith(prefix)).map((key) => ({ key })),
    }),
  };
}

export const BROWSER_HEADERS = {
  'user-agent': 'Mozilla/5.0 (Macintosh) Safari/605.1.15',
  'x-forwarded-for': '203.0.113.10',
  'x-timezone': 'Africa/Johannesburg',
};

let emailCounter = 0;
/** Unique email per test so the in-process rate limiter never collides. */
export function uniqueEmail(label: string): string {
  emailCounter += 1;
  return `${label}-${emailCounter}-${Date.now()}@example.com`;
}

/** Store a known verification code for an email, as code-request would. */
export async function seedCode(email: string, code = '123456', overrides: Record<string, unknown> = {}) {
  await storeCode(email, { ...createVerificationCode(code), ...overrides });
  return code;
}

export function jsonRequest(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
  method = 'POST'
): Request {
  return new Request(url, {
    method,
    headers: { 'content-type': 'application/json', ...BROWSER_HEADERS, ...headers },
    body: JSON.stringify(body),
  });
}

export function getRequest(url: string, cookie?: string, headers: Record<string, string> = {}): Request {
  return new Request(url, {
    method: 'GET',
    headers: { ...BROWSER_HEADERS, ...(cookie ? { cookie } : {}), ...headers },
  });
}

/** Turn a Set-Cookie header into the Cookie header a browser would send. */
export function cookieFrom(response: Response): string {
  const setCookie = response.headers.get('set-cookie') ?? '';
  return setCookie.split(';')[0];
}
