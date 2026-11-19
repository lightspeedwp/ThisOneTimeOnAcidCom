// Storage adapter for reader-access feature
// Implements atomic consume-once operation for verification codes
// Uses Netlify Blobs for persistence

import { getStore } from '@netlify/blobs';

const store = getStore({ consistency: 'strong' });

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

export interface StoredRecoveryAttempt {
  recoveryId: string;
  readerId: string;
  initiatedAt: string;
  expiresAt: string;
  createdSessionId?: string;
  raceOutcome?: 'recovery_first' | 'code_first' | 'concurrent';
}

// Namespace keys to avoid collisions across features
const KEYS = {
  code: (email: string) => `code:${email}`,
  session: (sessionId: string) => `session:${sessionId}`,
  recovery: (recoveryId: string) => `recovery:${recoveryId}`,
};

// Store a verification code with attempt tracking
export async function storeCode(email: string, code: StoredCode): Promise<void> {
  const key = KEYS.code(email);
  await store.set(key, JSON.stringify(code));
}

// Retrieve a verification code without consuming it
export async function getCode(email: string): Promise<StoredCode | null> {
  const key = KEYS.code(email);
  const data = await store.get(key);
  if (!data) return null;
  return JSON.parse(data) as StoredCode;
}

// Update attempt count on a stored code
export async function incrementCodeAttempts(email: string): Promise<StoredCode | null> {
  const code = await getCode(email);
  if (!code) return null;
  code.attemptCount += 1;
  await store.set(KEYS.code(email), JSON.stringify(code));
  return code;
}

// Delete a code after successful verification or expiry
export async function deleteCode(email: string): Promise<void> {
  const key = KEYS.code(email);
  await store.delete(key);
}

// Store a device session
export async function storeSession(session: StoredSession): Promise<void> {
  const key = KEYS.session(session.sessionId);
  await store.set(key, JSON.stringify(session));
}

// Retrieve a device session
export async function getSession(sessionId: string): Promise<StoredSession | null> {
  const key = KEYS.session(sessionId);
  const data = await store.get(key);
  if (!data) return null;
  return JSON.parse(data) as StoredSession;
}

// Update session renewal timestamp
export async function renewSession(sessionId: string): Promise<StoredSession | null> {
  const session = await getSession(sessionId);
  if (!session) return null;
  session.renewedAt = new Date().toISOString();
  session.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  await store.set(KEYS.session(sessionId), JSON.stringify(session));
  return session;
}

// Delete a device session
export async function deleteSession(sessionId: string): Promise<void> {
  const key = KEYS.session(sessionId);
  await store.delete(key);
}

// Store a recovery attempt (RA-T048)
export async function storeRecoveryAttempt(
  recovery: StoredRecoveryAttempt
): Promise<void> {
  const key = KEYS.recovery(recovery.recoveryId);
  await put(key, JSON.stringify(recovery));
}

// Retrieve a recovery attempt
export async function getRecoveryAttempt(
  recoveryId: string
): Promise<StoredRecoveryAttempt | null> {
  const key = KEYS.recovery(recoveryId);
  const data = await get(key);
  if (!data) return null;
  return JSON.parse(data) as StoredRecoveryAttempt;
}

// Update recovery attempt with session ID after recovery succeeds
export async function updateRecoverySession(
  recoveryId: string,
  sessionId: string,
  raceOutcome: 'recovery_first' | 'code_first' | 'concurrent'
): Promise<StoredRecoveryAttempt | null> {
  const recovery = await getRecoveryAttempt(recoveryId);
  if (!recovery) return null;
  recovery.createdSessionId = sessionId;
  recovery.raceOutcome = raceOutcome;
  await put(KEYS.recovery(recoveryId), JSON.stringify(recovery));
  return recovery;
}

// Delete a recovery attempt after it's been used or expired
export async function deleteRecoveryAttempt(recoveryId: string): Promise<void> {
  const key = KEYS.recovery(recoveryId);
  await blobDelete(key);
}
