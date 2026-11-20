/**
 * Session configuration constants and defaults.
 * Centralized session management configuration for Phase 3.
 */

/** Session lifetime in days (auto-extends to 30 days on activity) */
export const SESSION_LIFETIME_DAYS = 30;

/** Session lifetime in seconds for HTTP Max-Age cookie attribute */
export const SESSION_LIFETIME_SECONDS = SESSION_LIFETIME_DAYS * 24 * 60 * 60; // 2592000 seconds

/** Cookie name for session token storage */
export const SESSION_COOKIE_NAME = 'sessionToken';

/** Maximum concurrent devices per reader (can be configured per org) */
export const MAX_CONCURRENT_DEVICES = 2;

/** Maximum retry attempts for storage operations */
export const MAX_RETRIES = 5;

/** Retry delay in milliseconds (with exponential backoff) */
export const RETRY_DELAY_MS = 100;

/** Coalesce renewal requests within this time window (prevent thundering herd) */
export const RENEWAL_COALESCE_WINDOW_MS = 1000; // 1 second

/** Minimum token entropy (256 bits = 32 bytes) */
export const MIN_TOKEN_ENTROPY_BYTES = 32;

/** Token expiry validation window (allow ±1 second clock skew) */
export const CLOCK_SKEW_TOLERANCE_MS = 1000;

/**
 * Cookie configuration for secure session storage
 * Implements: HttpOnly, Secure, SameSite=Lax
 */
export const SESSION_COOKIE_CONFIG = {
  /** Name of the cookie */
  name: SESSION_COOKIE_NAME,

  /** Cookie lifetime in seconds */
  maxAge: SESSION_LIFETIME_SECONDS,

  /** HttpOnly flag: prevents JavaScript access to cookie */
  httpOnly: true,

  /** Secure flag: HTTPS only */
  secure: true,

  /** SameSite=Lax: CSRF protection with cross-site navigation allowed */
  sameSite: 'Lax' as const,

  /** Cookie path: accessible site-wide */
  path: '/',

  /** Domain: implicit (same domain only) */
  // domain: undefined,
};

/**
 * Device fingerprinting configuration
 */
export const DEVICE_FINGERPRINTING_CONFIG = {
  /** Components used for fingerprint hash */
  components: ['User-Agent', 'IP Address', 'Timezone'],

  /** Whether to use timezone in fingerprint */
  includeTimezone: true,

  /** Whether to use screen resolution in fingerprint */
  includeScreenResolution: false,

  /** Whether to use language settings in fingerprint */
  includeLanguage: false,
};

/**
 * Session validation configuration
 */
export const SESSION_VALIDATION_CONFIG = {
  /** Check session token exists */
  requireToken: true,

  /** Check session not expired */
  requireNonExpired: true,

  /** Check session not terminated */
  requireNotTerminated: true,

  /** Use constant-time comparison for token matching */
  useConstantTimeComparison: true,
};

/**
 * Activity logging configuration
 */
export const ACTIVITY_LOGGING_CONFIG = {
  /** Log session creation events */
  logCreation: true,

  /** Log session renewal events */
  logRenewal: true,

  /** Log session termination events */
  logTermination: true,

  /** Log session expiry events */
  logExpiry: false, // High volume, consider sampling

  /** Include IP address in logs (privacy consideration) */
  logIpAddress: true,

  /** Mask sensitive data in logs */
  maskSensitiveData: true,
};

/**
 * Performance targets for session operations
 */
export const PERFORMANCE_TARGETS = {
  /** Session creation latency target in milliseconds */
  createSessionTargetMs: 200,

  /** Session creation latency acceptable threshold in milliseconds */
  createSessionAcceptableMs: 500,

  /** Session validation latency target in milliseconds */
  validateSessionTargetMs: 100,

  /** Session validation latency acceptable threshold in milliseconds */
  validateSessionAcceptableMs: 200,

  /** Session renewal latency target in milliseconds */
  renewSessionTargetMs: 100,

  /** Session renewal latency acceptable threshold in milliseconds */
  renewSessionAcceptableMs: 200,

  /** Session termination latency target in milliseconds */
  terminateSessionTargetMs: 100,

  /** Session termination latency acceptable threshold in milliseconds */
  terminateSessionAcceptableMs: 200,
};
