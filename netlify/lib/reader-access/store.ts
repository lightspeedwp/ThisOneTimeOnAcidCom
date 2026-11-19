// Storage adapter for reader-access feature
// Implements atomic consume-once operation for verification codes
// Uses Netlify Blobs for persistence

import { get, put, delete as blobDelete } from '@netlify/blobs';

export interface StoredCode {
  codeHash: string;
  salt: string;
  createdAt: string;
  expiresAt: string;
  attemptCount: number;
  maxAttempts: number;
}

export interface StoredSession {
  sessionId: string;
  deviceId: string;
  chapterId: string;
  createdAt: string;
  expiresAt: string;
  renewedAt: string;
}

// Namespace keys to avoid collisions across features
const KEYS = {
  code: (email: string) => `code:${email}`,
  session: (sessionId: string) => `session:${sessionId}`,
};

// Store a verification code with attempt tracking
export async function storeCode(email: string, code: StoredCode): Promise<void> {
  const key = KEYS.code(email);
  await put(key, JSON.stringify(code));
}

// Retrieve a verification code without consuming it
export async function getCode(email: string): Promise<StoredCode | null> {
  const key = KEYS.code(email);
  const data = await get(key);
  if (!data) return null;
  return JSON.parse(data) as StoredCode;
}

// Update attempt count on a stored code
export async function incrementCodeAttempts(email: string): Promise<StoredCode | null> {
  const code = await getCode(email);
  if (!code) return null;
  code.attemptCount += 1;
  await put(KEYS.code(email), JSON.stringify(code));
  return code;
}

// Delete a code after successful verification or expiry
export async function deleteCode(email: string): Promise<void> {
  const key = KEYS.code(email);
  await blobDelete(key);
}

// Store a device session
export async function storeSession(session: StoredSession): Promise<void> {
  const key = KEYS.session(session.sessionId);
  await put(key, JSON.stringify(session));
}

// Retrieve a device session
export async function getSession(sessionId: string): Promise<StoredSession | null> {
  const key = KEYS.session(sessionId);
  const data = await get(key);
  if (!data) return null;
  return JSON.parse(data) as StoredSession;
}

// Update session renewal timestamp
export async function renewSession(sessionId: string): Promise<StoredSession | null> {
  const session = await getSession(sessionId);
  if (!session) return null;
  session.renewedAt = new Date().toISOString();
  session.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  await put(KEYS.session(sessionId), JSON.stringify(session));
  return session;
}

// Delete a device session
export async function deleteSession(sessionId: string): Promise<void> {
  const key = KEYS.session(sessionId);
  await blobDelete(key);
}
