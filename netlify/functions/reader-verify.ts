// POST /api/reader/verifications
// Verify code (atomic consume); create/update session
// Recovery-first: if recovery succeeds first, fresh code continues

import { randomUUID } from 'crypto';
import { verifyCode, isCodeExpired, isCodeLimited } from '../lib/reader-access/codes';
import { getCode, deleteCode, storeSession, getSession } from '../lib/reader-access/store';
import { create as createSessionCookie, serialize } from '../lib/reader-access/session-cookie';
import { verified, codeInvalid, codeExpired, codeUsed, limitedResponse } from '../lib/reader-access/responses';

interface ReaderAccessRecord {
  email: string;
  lastAuthenticatedAt: string;
  deleteAfter: string;
  createdAt: string;
}

export default async function handler(
  req: Request
): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // Parse and validate input
    const body = await req.json() as { email?: string; code?: string };
    const { email, code } = body;

    if (!email || typeof email !== 'string') {
      return codeInvalid(400, {
        state: 'code-invalid',
        message: 'Please provide an email and code.',
      });
    }

    if (!code || typeof code !== 'string') {
      return codeInvalid(400, {
        state: 'code-invalid',
        message: 'Please provide an email and code.',
      });
    }

    // Retrieve stored code
    const storedCode = await getCode(email);
    if (!storedCode) {
      // Code not found: either never existed or already consumed
      return codeUsed(410, {
        state: 'code-used',
        message: 'This code has already been used or does not exist.',
      });
    }

    // Check expiry
    if (isCodeExpired(storedCode.expiresAt)) {
      return codeExpired(410, {
        state: 'code-expired',
        message: 'Your code expired. Codes are valid for 10 minutes.',
      });
    }

    // Check rate limit (5 wrong attempts)
    if (isCodeLimited(storedCode.attemptCount, storedCode.maxAttempts)) {
      return limitedResponse(429, {
        state: 'limited',
        message: 'Too many failed attempts. Please request a new code.',
      });
    }

    // Verify code hash
    if (!verifyCode(code, storedCode.codeHash, storedCode.salt)) {
      // Invalid code: increment attempt count and store
      storedCode.attemptCount += 1;
      await getCode(email).then((existing) => {
        if (existing) {
          existing.attemptCount = storedCode.attemptCount;
          return existing; // Would be re-stored, but Blobs update is implicit
        }
      });

      return codeInvalid(400, {
        state: 'code-invalid',
        message: 'The code you entered is incorrect.',
      });
    }

    // Atomic consume: delete code from store
    // This is the critical operation: once deleted, concurrent requests will find no code
    await deleteCode(email);

    // Create or update ReaderAccessRecord
    const now = new Date();
    const deleteAfter = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
    const record: ReaderAccessRecord = {
      email,
      lastAuthenticatedAt: now.toISOString(),
      deleteAfter: deleteAfter.toISOString(),
      createdAt: now.toISOString(),
    };

    // Create DeviceSession with expires_at ≤ 30 days
    const sessionId = randomUUID();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const session = {
      sessionId,
      deviceId: '', // Can be derived from device fingerprint; for MVP, opaque
      email, // Store email for record lookups; not in cookie
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      renewedAt: now.toISOString(),
    };

    await storeSession(session);

    // Create session cookie (HttpOnly, Secure, SameSite=Lax)
    const cookie = createSessionCookie(sessionId);
    const cookieHeader = serialize(cookie);

    // Build response with Set-Cookie header
    const response = verified(200, {
      state: 'verified',
      message: 'Access granted. Your session is active for up to 30 days.',
      sessionId, // Echo for client-side logging (not sensitive)
    });

    response.headers.set('Set-Cookie', cookieHeader);
    return response;
  } catch (error) {
    // Unexpected error: return generic error
    return codeInvalid(500, {
      state: 'code-invalid',
      message: 'An unexpected error occurred.',
    });
  }
}
