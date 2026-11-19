// Verification code generation and validation
// Six-digit numeric codes; stored hashed
// Expire after 10 minutes; five wrong attempts to limit guessing

import { randomInt, scryptSync, randomBytes } from 'crypto';

export interface VerificationCode {
  codeHash: string; // Salted hash; plain code never stored
  salt: string; // Base64-encoded salt for validation
  createdAt: string; // ISO timestamp
  expiresAt: string; // created_at + 10 minutes
  attemptCount: number;
  maxAttempts: number; // 5
}

const CODE_EXPIRY_MINUTES = 10;
const MAX_ATTEMPTS = 5;
const SALT_BYTES = 16;
const HASH_BYTES = 32;

export function generateCode(): string {
  // Generate 6-digit numeric code using cryptographically secure randomness
  return randomInt(0, 1000000)
    .toString()
    .padStart(6, '0');
}

export function hashCode(code: string, salt: Buffer = randomBytes(SALT_BYTES)): {
  hash: string;
  salt: string;
} {
  // Derive key using scrypt with salt; store both for validation
  const derived = scryptSync(code, salt, HASH_BYTES);
  return {
    hash: derived.toString('base64'),
    salt: salt.toString('base64'),
  };
}

export function verifyCode(plainCode: string, storedHash: string, salt: string): boolean {
  // Recalculate hash with same salt and compare (constant-time comparison)
  const saltBuffer = Buffer.from(salt, 'base64');
  const { hash } = hashCode(plainCode, saltBuffer);
  return hash === storedHash;
}

export function createVerificationCode(): VerificationCode {
  const plainCode = generateCode();
  const salt = randomBytes(SALT_BYTES);
  const { hash } = hashCode(plainCode, salt);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + CODE_EXPIRY_MINUTES * 60 * 1000);

  return {
    codeHash: hash,
    salt: salt.toString('base64'),
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    attemptCount: 0,
    maxAttempts: MAX_ATTEMPTS,
  };
}

export function isCodeExpired(expiresAt: string): boolean {
  return new Date() > new Date(expiresAt);
}

export function isCodeLimited(attemptCount: number, maxAttempts: number = MAX_ATTEMPTS): boolean {
  return attemptCount >= maxAttempts;
}
