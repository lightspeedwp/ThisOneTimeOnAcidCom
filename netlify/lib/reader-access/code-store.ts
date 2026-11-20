/**
 * Verification-code and access-session storage for spec 005 (reader access).
 *
 * Spec 006 rewrote `store.ts` around email + device sessions and removed the
 * code storage that the spec 005 functions depend on. This module restores it
 * as a separate file so the two specs no longer edit the same adapter.
 *
 * Key prefixes are distinct from spec 006 (`session:<email>:<device>`):
 *   code:<email>              current VerificationCode for an email
 *   code-consumed:<codeId>    consume-once marker (written with onlyIfNew)
 *   access-session:<id>       session looked up by the opaque cookie value
 *   recovery:<id>             RecoveryAttempt (RA-T047/RA-T048)
 *
 * @see .github/specs/005-reader-access/data-model.md
 */

import { getStore } from '@netlify/blobs';

const STORE_NAME = 'reader-access';
const SESSION_DAYS = 30;

export interface StoredCode {
  /** Unique per issued code; used for the consume-once marker. */
  codeId: string;
  codeHash: string;
  salt: string;
  createdAt: string;
  expiresAt: string;
  attemptCount: number;
  maxAttempts: number;
}

export interface AccessSession {
  sessionId: string;
  /** Hashed reader identifier; never the plain email (RA-008). */
  readerId: string;
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
  raceOutcome?: 'recovery_first' | 'code_first' | 'concurrent' | 'renewal' | 'fresh';
}

function store() {
  return getStore({ name: STORE_NAME, consistency: 'strong' });
}

/** Normalise so `Reader@Example.com` and `reader@example.com` share one code. */
export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

const KEYS = {
  code: (email: string) => `code:${normaliseEmail(email)}`,
  consumed: (codeId: string) => `code-consumed:${codeId}`,
  session: (sessionId: string) => `access-session:${sessionId}`,
  recovery: (recoveryId: string) => `recovery:${recoveryId}`,
};

async function readJson<T>(key: string): Promise<T | null> {
  const data = await store().get(key, { type: 'text' });
  return data ? (JSON.parse(data) as T) : null;
}

async function writeJson(key: string, value: unknown): Promise<void> {
  await store().set(key, JSON.stringify(value));
}

// ---------------------------------------------------------------- codes

/** Store the current code for an email, replacing any earlier one (resend). */
export async function storeCode(email: string, code: StoredCode): Promise<void> {
  await writeJson(KEYS.code(email), code);
}

export async function getCode(email: string): Promise<StoredCode | null> {
  return readJson<StoredCode>(KEYS.code(email));
}

export async function incrementCodeAttempts(email: string): Promise<StoredCode | null> {
  const code = await getCode(email);
  if (!code) return null;
  code.attemptCount += 1;
  await writeJson(KEYS.code(email), code);
  return code;
}

export async function deleteCode(email: string): Promise<void> {
  await store().delete(KEYS.code(email));
}

/**
 * Atomically consume a code (RA-002: "consume at most once, atomically").
 *
 * Writes a marker keyed by the code's id with `onlyIfNew`. Netlify Blobs
 * applies that condition server-side, so when two requests redeem the same
 * code at once exactly one write reports `modified: true`.
 *
 * @returns true for the single caller that consumed the code, false otherwise
 */
export async function consumeCode(email: string, codeId: string): Promise<boolean> {
  const result = await store().set(
    KEYS.consumed(codeId),
    JSON.stringify({ consumedAt: new Date().toISOString() }),
    { onlyIfNew: true }
  );
  if (!result.modified) {
    return false;
  }
  // Best effort: the marker already blocks reuse if this delete fails.
  await deleteCode(email).catch(() => undefined);
  return true;
}

// ------------------------------------------------------ access sessions

export async function storeAccessSession(session: AccessSession): Promise<void> {
  await writeJson(KEYS.session(session.sessionId), session);
}

/** Returns the session only while it is unexpired. */
export async function getAccessSession(sessionId: string): Promise<AccessSession | null> {
  const session = await readJson<AccessSession>(KEYS.session(sessionId));
  if (!session) return null;
  return new Date(session.expiresAt) > new Date() ? session : null;
}

/** Move expiry to thirty days from now (renewals have no overall ceiling). */
export async function renewAccessSession(sessionId: string): Promise<AccessSession | null> {
  const session = await getAccessSession(sessionId);
  if (!session) return null;
  const now = new Date();
  session.renewedAt = now.toISOString();
  session.expiresAt = new Date(now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  await writeJson(KEYS.session(sessionId), session);
  return session;
}

export async function deleteAccessSession(sessionId: string): Promise<void> {
  await store().delete(KEYS.session(sessionId));
}

// ------------------------------------------------------------- recovery

export async function storeRecoveryAttempt(recovery: StoredRecoveryAttempt): Promise<void> {
  await writeJson(KEYS.recovery(recovery.recoveryId), recovery);
}
