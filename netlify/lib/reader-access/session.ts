/**
 * Session entity interfaces and types for reader access management.
 * Represents an authenticated reader's access to protected content.
 */

/**
 * Session status enum: active | expired | terminated
 */
export type SessionStatus = 'active' | 'expired' | 'terminated';

/**
 * Core Session entity stored in Netlify Blobs
 */
export interface Session {
  /** Unique session identifier (UUID/ULID, 256-bit minimum) */
  sessionId: string;

  /** Reader's verified email (from Phase 2 verification) */
  email: string;

  /** Device fingerprint (User-Agent + IP + timezone hash) */
  deviceId: string;

  /** ISO 8601 timestamp when session was created */
  createdAt: string;

  /** ISO 8601 timestamp when session expires (auto-updated on activity) */
  expiresAt: string;

  /** ISO 8601 timestamp of last activity/renewal */
  renewedAt: string;

  /** ISO 8601 timestamp when session was terminated (null if active) */
  terminatedAt: string | null;

  /** Current session state: active | expired | terminated */
  status: SessionStatus;

  /** Most recently accessed chapter ID (for analytics, optional) */
  chapterId?: string;
}

/**
 * Session creation request (after email verification)
 */
export interface CreateSessionRequest {
  /** Verified email from Phase 2 verification flow */
  email: string;

  /** Verification code that was used for email verification */
  verificationCode: string;

  /** Device fingerprint (User-Agent + IP + timezone hash) */
  deviceId: string;
}

/**
 * Session validation result returned by middleware
 */
export interface SessionValidationResult {
  /** Is the session valid? */
  isValid: boolean;

  /** The validated session (if isValid = true) */
  session?: Session;

  /** Error reason if invalid */
  reason?: 'missing_token' | 'invalid_token' | 'expired_session' | 'terminated_session';

  /** HTTP status code for response */
  statusCode: number;

  /** Activity summary for logging (T039) */
  activitySummary?: {
    /** Session creation timestamp */
    createdAt?: string;
    /** Most recent activity/renewal timestamp */
    renewedAt?: string;
    /** Session termination timestamp (null if active) */
    terminatedAt?: string | null;
    /** Current session status */
    status?: SessionStatus;
  };
}

/**
 * Device fingerprint record for concurrent device tracking
 */
export interface Device {
  /** Device fingerprint hash (User-Agent + IP + timezone) */
  deviceId: string;

  /** Reader email associated with this device */
  email: string;

  /** Number of active sessions from this device (usually 0 or 1) */
  sessionCount: number;

  /** Most recent activity timestamp on this device */
  lastActivityAt: string;
}

/**
 * Activity event for audit trail (denormalized into Session entity)
 */
export interface SessionActivity {
  /** Unique event ID */
  eventId: string;

  /** Session this event belongs to */
  sessionId: string;

  /** Reader email */
  email: string;

  /** Event type: created | renewed | terminated | expired */
  eventType: 'created' | 'renewed' | 'terminated' | 'expired';

  /** When event occurred (ISO 8601) */
  timestamp: string;

  /** Reader's IP address at event time */
  ipAddress?: string;

  /** Browser/device User-Agent */
  userAgent?: string;
}

/**
 * Computed session properties (not stored, calculated on demand)
 */
export interface ComputedSessionProps {
  /** Is session expired? (expiresAt <= now) */
  isExpired: boolean;

  /** Is session active? (status = active AND expiresAt > now) */
  isActive: boolean;

  /** Is session terminated? (terminatedAt !== null) */
  isTerminated: boolean;

  /** Seconds until session expires (0 if already expired) */
  secondsToExpiry: number;

  /** Days since last renewal/activity */
  daysSinceRenewal: number;

  /** Remaining device slots for this reader */
  remainingDeviceSlots: number;
}
