# Session Management API Contract

**Specification**: Reader Access Session Management (Phase 3)  
**Version**: 1.0  
**Status**: Design (Pre-implementation)

---

## Overview

Netlify Functions API for managing reader session lifecycle:
1. Session creation (after email verification)
2. Session validation (before chapter access)
3. Session renewal (automatic on activity)
4. Session termination (logout + expiry enforcement)

All operations use Netlify Blobs for persistence with strong consistency.

---

## 1. Create Session

**Purpose**: Establish authenticated session after email verification

**Trigger**: After reader successfully verifies email (Phase 2 completion)

**Function**: `netlify/functions/reader-session-create.ts`

### Request

```bash
POST /api/reader/session
Content-Type: application/json
Cookie: (none; first request after verification)

{
  "email": "reader@example.com",
  "verificationCode": "123456",
  "deviceFingerprint": "user-agent:iphone-safari|ip:1.2.3.4|tz:utc"
}
```

### Response (201 Created)

```bash
HTTP/1.1 201 Created
Set-Cookie: sessionToken=<uuid>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000

{
  "status": "created",
  "sessionId": "uuid-v4",
  "expiresAt": "2026-12-19T14:00:00Z",
  "message": "Session created. Access granted to chapters."
}
```

### Error Responses

| Code | Condition | Response |
| ---- | --------- | -------- |
| 400 | Invalid/missing email or code | `{"error": "invalid_verification"}` |
| 401 | Verification code expired/incorrect | `{"error": "verification_failed"}` |
| 429 | Too many session creation attempts | `{"error": "rate_limited"}` |
| 500 | Storage or mail service error | `{"error": "server_error"}` |

### Session Creation Logic

1. **Rate limit check**: Count session creation attempts for email in past 15 minutes; return 429 if ≥ 5 attempts
2. Validate verification code (Phase 2 storage lookup)
3. Mark code as consumed (atomic delete)
4. Generate `sessionId` (cryptographically secure)
5. Create Session record (email + deviceId + 30-day expiry)
6. **Log event**: Record session creation in audit log (email, sessionId, deviceId, timestamp, status)
7. Set HttpOnly cookie with sessionId
8. Return 201 with Set-Cookie header

### Security Notes

- Rate limit: 5 attempts per email per 15-minute window (sliding window)
- Code is consumed immediately (no reuse)
- Session lifetime starts at creation (30 days)
- Cookie set to HttpOnly + Secure + SameSite=Lax
- No token in response body (cookie-only)
- All lifecycle events logged to audit trail for compliance

---

## 2. Validate Session (Middleware/Hook)

**Purpose**: Check session validity before granting chapter access

**Trigger**: On every chapter access request

**Location**: Netlify Function wrapper or Edge Function

### Request

```
GET /api/reader/chapter/01-part-1
Cookie: sessionToken=<uuid>
```

### Validation Steps (must all pass)

1. **Extract cookie**: Get `sessionToken` from request cookies
2. **Lookup session**: Query Blobs with key `session:${email}:${deviceId}`
3. **Verify not expired**: Check `expiresAt` > now
4. **Check not terminated**: Verify `terminatedAt` is null
5. **Grant access**: Return 200; proceed to chapter handler

### Response (200 OK - Valid Session)

```
HTTP/1.1 200 OK
X-Session-Valid: true
X-Session-Expires: 2026-12-19T14:00:00Z

(proceed to chapter endpoint)
```

### Error Response (401 Unauthorized)

```
HTTP/1.1 401 Unauthorized
Set-Cookie: sessionToken=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0

{
  "error": "unauthorized",
  "reason": "invalid_session|expired_session|not_found",
  "action": "reverify_email"
}
```

### Implementation Details

- **Latency target**: <100ms (validate + lookup)
- **Caching**: Can cache valid sessions in memory for <100ms
- **Error handling**:
  - Cookie missing → 401 (send to verification flow)
  - Session not found → 401 (token invalid/logged out)
  - Session expired → 401 (reverify required)
  - Terminated → 401 (explicit logout)

### Constant-Time Validation

```typescript
// Pseudo-code: prevent timing attacks
const isTokenValid = constantTimeEqual(
  storedToken,
  providedToken
);
```

---

## 3. Renew Session (Automatic on Activity)

**Purpose**: Extend session by 30 days on reader activity

**Trigger**: Automatic during chapter access validation

### Request

Implicit in chapter access (no explicit renewal endpoint)

```
GET /api/reader/chapter/01-part-1
Cookie: sessionToken=<uuid>
```

### Renewal Logic

```
On successful session validation:
  renewedAt ← now
  expiresAt ← now + 30 days
  chapterId ← accessed chapter ID
  → Update session in Blobs (atomic)
```

### Response Headers

```
X-Session-Renewed: true
X-Session-New-Expiry: 2026-12-19T14:00:00Z
```

### Edge Cases

- **Activity within 1 second**: Coalesce into single update (no thundering herd)
- **Concurrent requests**: Strong consistency ensures only one write wins
- **Clock skew**: Use server time for expiry; client clock irrelevant

---

## 4. Terminate Session (Logout)

**Purpose**: Explicitly sign out reader; revoke session access immediately

**Function**: `netlify/functions/reader-session-logout.ts`

### Request

```
POST /api/reader/session/logout
Cookie: sessionToken=<uuid>
```

### Response (200 OK)

```
HTTP/1.1 200 OK
Set-Cookie: sessionToken=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0

{
  "status": "logged_out",
  "message": "Session terminated. You have been signed out."
}
```

### Logout Logic

1. Extract sessionToken from cookie
2. Lookup session in Blobs
3. Set `terminatedAt = now` (atomic update)
4. Clear sessionToken cookie (Max-Age=0)
5. Return 200

### Post-Logout Behavior

- Next request to protected chapters → 401
- Cannot reuse same sessionId
- Reader must reverify email to create new session

---

## 5. Concurrent Device Management

**Purpose**: Enforce reader concurrent device limit

### Check Device Limit

**When**: Before creating new session

```
activeDeviceCount = count sessions where email = X AND status = "active"
if activeDeviceCount >= concurrentDeviceLimit:
  return 409 Conflict
  {
    "error": "device_limit_exceeded",
    "activeDevices": 2,
    "limit": 2,
    "action": "select_device_to_terminate_or_reverify"
  }
```

### Terminate Device Session

**When**: Reader chooses to terminate old device to access from new device

**Function**: `netlify/functions/reader-device-logout.ts`

```
POST /api/reader/device/:deviceId/logout
{
  "email": "reader@example.com",
  "confirmationToken": "sent_via_email"
}
```

**Response**: 200 (old device now has no session; new device can create session)

---

## 6. Error Response Format

All errors follow consistent format:

```json
{
  "error": "<error_code>",
  "message": "<human_readable_message>",
  "action": "<what_user_should_do>",
  "details": {
    "reason": "<technical_reason>"
  }
}
```

### Common Error Codes

| Code | Meaning |
|------|---------|
| `invalid_session` | Cookie missing or token not recognized |
| `expired_session` | Session's expiresAt ≤ now |
| `terminated_session` | Reader explicitly logged out |
| `device_limit_exceeded` | Cannot create session; at concurrent device limit |
| `verification_failed` | Email verification failed or code expired |
| `unauthorized` | Generic 401 (session invalid/missing) |

---

## 7. Cookie Specification

### SessionToken Cookie

```
Name: sessionToken
Value: UUID/ULID (cryptographically random, 32+ bytes)
HttpOnly: true (JavaScript cannot access)
Secure: true (HTTPS only)
SameSite: Lax (CSRF protection; allows cross-site navigation)
Path: / (accessible site-wide)
Domain: (implicit; same domain)
Max-Age: 2592000 (30 days in seconds)
```

### Cookie Usage

- **Set on**: Session creation (`/api/reader/session`)
- **Sent on**: Every chapter access request (automatic browser behavior)
- **Cleared on**: Logout (`Max-Age=0`)
- **Storage**: Browser cookie jar; not JavaScript-accessible

---

## 8. Testing Contract

### Test Scenarios

| Scenario | Input | Expected | Verification |
|----------|-------|----------|--------------|
| Create session | Verified email | 201 + cookie set | Cookie HttpOnly + Secure |
| Access chapter w/ valid session | Valid sessionToken cookie | 200 + content | Session renewed (expiresAt updated) |
| Access chapter w/ expired session | Expired sessionToken | 401 | No chapter content returned |
| Logout | Valid sessionToken | 200 + cookie cleared | Subsequent access → 401 |
| Device limit hit | 3rd device on 2-device limit | 409 | User can terminate device or reverify |
| Session renewal | Activity after 25 days | expiresAt extends | 30 days from activity |

---

## 9. Performance Targets

| Operation | Target | Acceptable Range |
|-----------|--------|------------------|
| Create session | <200ms | <500ms |
| Validate session | <100ms | <200ms |
| Renew session | <100ms | <200ms |
| Terminate session | <100ms | <200ms |

---

## 10. Security Checklist

- [x] HttpOnly cookie (no JavaScript access)
- [x] Secure flag (HTTPS only)
- [x] SameSite=Lax (CSRF protection)
- [x] No token in URL or response body
- [x] Constant-time comparison (timing attack prevention)
- [x] Verification code consumed on first use (no replay)
- [x] Session cannot be reused after logout (new sessionId required)
- [x] Expired sessions automatically rejected (no grace period)
- [x] Device fingerprinting (IP + User-Agent) prevents session theft
- [x] Strong consistency (Blobs) prevents race conditions

---

## 11. Implementation Notes

### Phase 2 Integration

- Session creation requires Phase 2 verification code lookup
- Reuse Phase 2 email validation and storage adapter
- Extend store.ts with session operations (create, get, update, delete)

### Storage Schema

Sessions stored in Netlify Blobs:
```text
Key: session:${email}:${deviceId}
Value: { sessionId, email, deviceId, createdAt, expiresAt, renewedAt, terminatedAt, status, chapterId }
```

### Middleware Integration

Session validation must run as:
1. Netlify Function wrapper (all chapter functions)
2. OR Edge Function (fastest path; runs before origin)
3. OR Middleware (application level)

---

## 12. Audit Trail & Logging

**Purpose**: Record all session lifecycle events for security audit, compliance, and operational troubleshooting.

### Logged Events

Every session lifecycle event MUST be logged with these fields:

| Event | Fields | Timing |
|-------|--------|--------|
| session_created | email, sessionId, deviceId, createdAt, ip_address | Immediately after session created |
| session_renewed | email, sessionId, deviceId, renewedAt, chapterId | On each renewal (< 500ms) |
| session_terminated | email, sessionId, deviceId, terminatedAt, reason (logout\|expired) | Immediately on logout or expiry |
| rate_limit_exceeded | email, attempt_count, timestamp | When 5+ attempts detected |

### Audit Log Storage

- **Location**: Separate audit log store (Netlify Blobs, Logs, or external logging service)
- **Retention**: Minimum 90 days for compliance
- **Format**: JSON with ISO 8601 timestamps
- **Latency**: Log events within 500ms of occurrence (async preferred)
- **Queryability**: Support queries by email, sessionId, dateRange for troubleshooting

### Monitoring & Alerting

- Monitor rate-limit trigger frequency (alert if > 10 per hour per email)
- Monitor session creation latency (alert if p95 > 300ms)
- Monitor validation latency (alert if p95 > 150ms)
- Track session renewal coalescing efficiency (% of renewals coalesced)

### Testing

- Unit tests: Session creation, renewal, termination logic
- Integration tests: Cookie handling, Blobs persistence
- Security tests: Timing attacks, token replay, device limit enforcement
- E2E tests: Full user flows (verify → access → logout)
- **Audit tests**: Verify all events logged with correct fields and latency < 500ms

- Unit tests: Session creation, renewal, termination logic
- Integration tests: Cookie handling, Blobs persistence
- Security tests: Timing attacks, token replay, device limit enforcement
- E2E tests: Full user flows (verify → access → logout)

