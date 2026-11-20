# Phase 3: Session Management — Data Model

**Purpose**: Define entities, attributes, relationships, and state transitions for reader session lifecycle  
**Foundation**: Builds on Phase 2 reader verification and email validation

---

## Entity: Session

Represents an authenticated reader's access to protected content. One session per device; multiple sessions per reader (up to concurrent device limit).

### Attributes

| Attribute | Type | Required | Purpose |
|-----------|------|----------|---------|
| `sessionId` | UUID/ULID | Yes | Unique session identifier (token) |
| `email` | string | Yes | Reader's verified email (identity) |
| `deviceId` | string | Yes | Device fingerprint (User-Agent + IP + characteristics) |
| `createdAt` | ISO 8601 timestamp | Yes | When session established (after verification) |
| `expiresAt` | ISO 8601 timestamp | Yes | Current expiry (auto-updated on activity) |
| `renewedAt` | ISO 8601 timestamp | Yes | Timestamp of last activity/renewal |
| `terminatedAt` | ISO 8601 timestamp | No | When session ended (logout or expiry); null if active |
| `status` | enum | Yes | `active` \| `expired` \| `terminated` |
| `chapterId` | string | No | Most recently accessed chapter (for analytics) |

### Validation Rules

- `sessionId`: Must be cryptographically secure random 32+ bytes (256-bit minimum)
- `email`: Must match Phase 2 verified email format; no unverified emails
- `deviceId`: Deterministic fingerprint; must be stable across same device (no random components)
- `expiresAt`: Must be in future when session created; always ≥ `renewedAt`
- `renewedAt`: Must be ≤ current time; updates to current time on any access
- `createdAt`: Must be ≤ `renewedAt` and `expiresAt`
- `status`: Computed from timestamps; not user-settable
  - `active`: `expiresAt` > now AND `terminatedAt` is null
  - `expired`: `expiresAt` ≤ now AND `terminatedAt` is null
  - `terminated`: `terminatedAt` is not null
- `terminatedAt`: Only set when reader explicitly logs out; never set for expiry

### State Transitions

```
CREATION
  Initial: sessionId generated, email verified, deviceId fingerprinted
  → State: active (expiresAt = now + 30 days)

ACTIVITY (chapter access)
  Current: active session, reader accesses chapter
  → Action: renewedAt = now, expiresAt = now + 30 days, chapterId updated
  → State: active (unchanged)

EXPIRY (time-based)
  Current: active session, now ≥ expiresAt
  → State: expired (terminatedAt remains null; session was not explicitly terminated)
  → Access: 401 Unauthorized (reader must reverify email)

LOGOUT (explicit)
  Current: active session, reader clicks sign out
  → Action: terminatedAt = now
  → State: terminated
  → Access: 401 Unauthorized (immediate)

REACTIVATION (new verification after expiry)
  Current: expired or terminated session
  → Action: Create new session with new sessionId
  → State: active (previous session not reused)
  → Rationale: Security; avoids token-reuse attacks
```

### Relationships

- **Many-to-One to Reader**: Multiple sessions per reader email (up to concurrent device limit)
- **One-to-One to Device**: One active session per device fingerprint
- **Optional-to-One to Chapter**: Session may reference last accessed chapter (denormalized for analytics)

---

## Entity: Device

Optional entity for tracking concurrent device limits. Can be derived from Session.deviceId or maintained separately.

### Attributes (if persisted)

| Attribute | Type | Purpose |
|-----------|------|---------|
| `deviceId` | string | Fingerprint identifier (User-Agent + IP + timezone + screen resolution) |
| `email` | string | Reader email associated with device |
| `sessionCount` | integer | Count of active sessions from this device |
| `lastActivityAt` | ISO 8601 | Most recent access time |

### Validation Rules

- `deviceId`: Stable across same physical device; unique per device-email combination
- `sessionCount`: 0 or 1 per device (devices don't have overlapping sessions with same email)
- `lastActivityAt`: Updates on any session activity from device

### Notes

- **Computed vs Persisted**: Can derive from active Session records (no separate entity) or maintain separate Device records for faster concurrent-limit checks
- **Implementation choice**: For MVP, derive from Session queries; optimize later if needed

---

## Entity: Activity (Audit Trail)

Records of session lifecycle events for operational visibility and analytics.

### Attributes

| Attribute | Type | Purpose |
|-----------|------|---------|
| `eventId` | UUID | Unique event identifier |
| `sessionId` | UUID | Session this event belongs to |
| `email` | string | Reader email |
| `eventType` | enum | `created` \| `renewed` \| `terminated` \| `expired` |
| `timestamp` | ISO 8601 | When event occurred |
| `ipAddress` | string | Reader's IP at event time |
| `userAgent` | string | Browser/device info |

### Notes

- **Storage**: Can be denormalized into Session record (timestamps only) for simplicity
- **Alternative**: Separate activity log table for detailed audit trail
- **For MVP**: Store timestamps in Session; defer detailed activity log to Phase 4

---

## Storage Schema (Netlify Blobs)

Sessions are stored in Netlify Blobs using consistent strong-write mode.

### Key Structure

```
key = "session:${email}:${deviceId}"
```

Composite key ensures one active session per device per reader.

### Value Structure (JSON)

```json
{
  "sessionId": "uuid-v4-or-ulid",
  "email": "reader@example.com",
  "deviceId": "fingerprint-hash",
  "createdAt": "2026-11-19T14:00:00Z",
  "expiresAt": "2026-12-19T14:00:00Z",
  "renewedAt": "2026-11-19T14:00:00Z",
  "terminatedAt": null,
  "status": "active",
  "chapterId": "01-part-1"
}
```

### Consistency Guarantees

- **Strong consistency**: All writes are immediately visible to subsequent reads
- **Atomic operations**: Read + modify + write cycles are indivisible
- **No race conditions**: Two concurrent renewals on same session won't double-count

---

## Computed Fields (Not Stored)

| Field | Computation |
|-------|-------------|
| `isExpired` | `expiresAt` ≤ now |
| `isActive` | `status` = "active" AND `expiresAt` > now |
| `isTerminated` | `terminatedAt` ≠ null |
| `secondsToExpiry` | max(0, `expiresAt` - now) |
| `daysSinceRenewal` | (now - `renewedAt`) / 86400 |
| `remainingDeviceSlots` | concurrentDeviceLimit - activeSessionCount(email) |

---

## Validation & Constraints

### Primary Constraints

- **Uniqueness**: One active session per (email, deviceId) pair
- **Temporal ordering**: `createdAt` ≤ `renewedAt` ≤ `expiresAt`
- **Termination**: Either `terminatedAt` is null (live) or timestamp (ended)
- **Status consistency**: Status field computed from timestamps; always consistent

### Business Rules

- **Expiry enforcement**: Expired sessions (renewedAt + 30 days < now) automatically return 401
- **Termination is irreversible**: Terminated session cannot be reactivated; must create new session
- **Device limit**: Reader cannot create session on 4th device if limit is 3; must terminate existing session first
- **Email verification**: Sessions only created after Phase 2 email verification complete

---

## Migration & Versioning

### Version 1.0 (Phase 3 Launch)

Initial schema with:
- Session entity with timestamps
- Device fingerprinting
- Activity denormalized into Session record

### Future Versions (Phase 4+)

- Separate Activity/Audit log table (for detailed analytics)
- Device entity optimization (separate table if needed)
- Session refresh tokens (security enhancement)
- Geographic tracking (security monitoring)

---

## Diagram: Session Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                   READER SESSION LIFECYCLE                  │
└─────────────────────────────────────────────────────────────┘

[Email Verified]
      ↓
[Create Session]
  sessionId ← random()
  email ← verified_email
  deviceId ← fingerprint()
  createdAt ← now
  expiresAt ← now + 30 days
  renewedAt ← now
  status ← "active"
      ↓
   ┌──────────────────────────────────────┐
   │      ACTIVE SESSION STATE            │
   │  (reader accessing chapters)         │
   └──────────────────────────────────────┘
      ↓                                 ↓
  [Activity]                      [Time Passes]
  renewedAt ← now                 (> 30 days)
  expiresAt ← now + 30 days           ↓
  status ← "active"                [Expiry]
      ↓                            status ← "expired"
      └──────────────┬─────────────┘
                     ↓
   ┌──────────────────────────────────────┐
   │   INACCESSIBLE (expired/terminated)  │
   │   → 401 response on chapter access   │
   │   → Reader must reverify email       │
   └──────────────────────────────────────┘

[Logout Event]
  terminatedAt ← now
  status ← "terminated"
      ↓
   [Reader Logs Out Immediately]
   → 401 response on next request
```

---

## Next Steps: Contracts

Data model informs API contracts:
- **Session creation endpoint**: Requires Phase 2 verified email
- **Session validation hook**: Checks session presence, validity, expiry
- **Session renewal**: Automatic on activity
- **Session termination**: Logout endpoint + automatic expiry enforcement
