// Verification code generation and validation
// Six-digit numeric codes; stored hashed
// Expire after 10 minutes; five wrong attempts to limit guessing

export interface VerificationCode {
  code_hash: string; // Salted hash; plain code never stored
  created_at: string; // ISO timestamp
  expires_at: string; // created_at + 10 minutes
  attempt_count: number;
  max_attempts: number; // 5
}

export function generateCode(): string {
  // Generate 6-digit numeric code
  return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
}

export function hashCode(code: string): string {
  // Salt and hash the code
  // Implementation: use crypto.subtle or sodium
  throw new Error('hashCode: Not implemented');
}

export function isCodeExpired(expiresAt: string): boolean {
  return new Date() > new Date(expiresAt);
}

export function isCodeLimited(attemptCount: number): boolean {
  return attemptCount >= 5;
}
