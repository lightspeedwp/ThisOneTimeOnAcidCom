# Reader Access Session Management

Complete documentation for the reader access session management system, covering session lifecycle, API endpoints, error codes, security considerations, and troubleshooting.

## Table of Contents

1. [Overview](#overview)
2. [Session Lifecycle](#session-lifecycle)
3. [API Endpoints](#api-endpoints)
4. [Error Codes](#error-codes)
5. [Security Features](#security-features)
6. [Configuration](#configuration)
7. [Monitoring & Alerts](#monitoring--alerts)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The reader access session management system provides secure, token-based session handling for authenticated reader access to book chapters. 

### Key Features

- **Email-based verification**: Readers verify their email once and gain session-based access
- **30-day rolling sessions**: Sessions automatically extend to 30 days on any activity
- **Multi-device support**: Up to 2-3 concurrent sessions per reader (configurable)
- **Activity tracking**: Audit trail of session creation, renewal, and termination
- **Security hardening**: Constant-time token comparison, rate limiting, security headers
- **Monitoring**: Built-in metrics and alerting for session operations

### Architecture

```
Reader Flow:
1. Email verification (Phase 2)
   ↓
2. Session creation (reader-verify endpoint)
   - Code validation
   - Device limit check
   - Session token generation
   - HttpOnly cookie set
   ↓
3. Session validation (session-middleware)
   - Cookie extraction
   - Constant-time token comparison
   - Expiry check
   - Termination check
   ↓
4. Chapter access (reader-chapter endpoint)
   - Session validation
   - Auto-renewal on activity
   - Content delivery
   ↓
5. Session logout (reader-session DELETE endpoint)
   - Termination
   - Cookie clearing
```

---

## Session Lifecycle

### Session States

- **active**: Session is valid and can be used for access
- **expired**: Session has reached its expiration time (automatic transition after 30 days no activity)
- **terminated**: Session was explicitly terminated by logout (manual transition)

### Session Timeline

```
Session Created
  │
  ├─ Activity (chapter access)
  │  └─> Auto-renewed: expiresAt = now + 30 days
  │      (repeats on each activity)
  │
  ├─ Expiry Path:
  │  └─> No activity for 30 days
  │      └─> expiresAt < now
  │          └─> Next access rejected (401)
  │              └─> Requires re-verification
  │
  └─ Logout Path:
     └─> User clicks "Sign Out"
         └─> Session terminated
         └─> Cookie cleared
         └─> Next access rejected (401)
         └─> Requires re-verification
```

### Timestamps

Each session record contains:

- **createdAt**: ISO 8601 timestamp when session was created
- **renewedAt**: ISO 8601 timestamp of last renewal (updated on each activity)
- **expiresAt**: ISO 8601 timestamp when session will expire (always 30 days from last activity)
- **terminatedAt**: ISO 8601 timestamp when session was terminated (null if active)

---

## API Endpoints

### POST /api/reader/verifications

**Purpose**: Verify email code and create/renew session

**Request**:
```json
{
  "email": "reader@example.com",
  "code": "123456"
}
```

**Response** (200 OK):
```json
{
  "state": "verified",
  "sessionId": "token...",
  "expiresAt": "2026-12-20T10:30:00Z"
}
```

**Response Headers**:
- `Set-Cookie: sessionToken=...; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`
- `Cache-Control: no-store, no-cache, must-revalidate`
- `X-Content-Type-Options: nosniff`

**Error Responses**:
- `400 Bad Request`: Invalid email or code format
- `410 Gone`: Code expired (>15 minutes old)
- `410 Gone`: Code used (too many failed attempts)
- `429 Too Many Requests`: Rate limit exceeded (5 attempts/minute per email)

**Rate Limiting**: 5 verification attempts per email per minute

**Security Headers**: 
- Prevents caching of session data
- No MIME type sniffing
- Constant-time token comparison

---

### GET /api/reader/session

**Purpose**: Get current session status

**Request Headers**:
- `Cookie: sessionToken=...`

**Response** (200 OK):
```json
{
  "state": "verified",
  "sessionId": "token...",
  "expiresAt": "2026-12-20T10:30:00Z",
  "renewedAt": "2026-11-20T10:30:00Z"
}
```

**Error Responses**:
- `401 Unauthorized`: Missing or invalid session token
- `401 Unauthorized`: Session expired

---

### DELETE /api/reader/session

**Purpose**: Logout and terminate session

**Request Headers**:
- `Cookie: sessionToken=...`

**Response** (204 No Content):
```
Set-Cookie: sessionToken=; Max-Age=0; HttpOnly; Secure; SameSite=Lax; Path=/
```

**Security**:
- Cookie is immediately cleared (Max-Age=0)
- Session marked as terminated in storage
- Idempotent (safe to call multiple times)

---

### POST /api/reader/device/logout (Future)

**Purpose**: Terminate a specific device session (multi-device management)

**Request**:
```json
{
  "email": "reader@example.com",
  "deviceId": "device-fingerprint-hash"
}
```

**Response** (200 OK):
```json
{
  "status": "logged_out",
  "message": "Device session terminated"
}
```

---

## Error Codes

### Code-Specific Errors

| Code | Status | Meaning | Action |
|------|--------|---------|--------|
| `missing_session_token` | 401 | No session cookie found | Re-verify email |
| `invalid_token` | 401 | Token format invalid | Re-verify email |
| `invalid_session` | 401 | Session not found in storage | Re-verify email |
| `expired_session` | 401 | Session has expired (>30 days no activity) | Re-verify email |
| `terminated_session` | 401 | Session was terminated by logout | Re-verify email |
| `device_limit_exceeded` | 409 | Concurrent device limit reached | Terminate old device or wait |
| `invalid_code` | 400 | Verification code incorrect | Re-enter code or request new |
| `code_expired` | 410 | Verification code >15 minutes old | Request new verification email |
| `code_used` | 410 | Too many failed code attempts | Request new verification email |
| `rate_limited` | 429 | Too many requests in short time | Wait 60 seconds and retry |

### Storage Errors

| Error | Cause | Action |
|-------|-------|--------|
| `storage_error` | Blobs service error | Retry after 30 seconds; contact support if persists |
| `validation_error` | Server error during validation | Return 500; check logs |

---

## Security Features

### 1. Constant-Time Token Comparison

**Why**: Prevents timing-based token guessing attacks

**Implementation**:
- Uses Node.js `timingSafeEqual` for all token comparisons
- Compares in constant time regardless of token position
- No information leakage about which part of token is incorrect

**How it works**:
```typescript
// SAFE: Uses timingSafeEqual (constant-time)
if (!constantTimeTokenCompare(storedToken, providedToken)) {
  return 401;
}

// UNSAFE: Would leak information
if (storedToken !== providedToken) {
  return 401;
}
```

### 2. HttpOnly Cookies

**Why**: Prevents JavaScript-based token theft (XSS attacks)

**Implementation**:
```
Set-Cookie: sessionToken=...; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000
```

**Flags**:
- `HttpOnly`: JavaScript cannot access cookie
- `Secure`: Cookie only sent over HTTPS
- `SameSite=Lax`: Protection against CSRF attacks
- `Path=/`: Cookie available for all paths
- `Max-Age=2592000`: 30 days (matches session lifetime)

### 3. No-Cache Headers

**Why**: Prevents browsers/proxies from caching sensitive session data

**Implementation**:
```
Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate, private
Pragma: no-cache
Expires: 0
```

**Effect**:
- Prevents storage in browser cache
- Prevents storage in proxy caches
- Prevents storage on shared/public computers

### 4. Rate Limiting

**Why**: Prevents enumeration attacks and brute force

**Configuration**:
- **Verification**: 5 attempts per email per minute
- **Device logout**: 20 attempts per email per minute

**Implementation**:
```typescript
// Check rate limit
const result = checkRateLimit(email, RATE_LIMIT_PRESETS.EMAIL_VERIFICATION);
if (result.isLimited) {
  return new Response(..., { 
    status: 429,
    headers: { 'Retry-After': result.resetAfterSeconds }
  });
}
```

**Behavior**:
- Returns 429 Too Many Requests when exceeded
- Includes `Retry-After` header with seconds to wait
- Rate limit resets after window expires

### 5. Device Fingerprinting

**Why**: Binds sessions to specific devices, detects unauthorized access

**Implementation**:
- Hash: `SHA256(User-Agent + IP + Timezone)`
- One session per device fingerprint
- Fingerprint verified on each access

**Stability**:
- Survives browser restarts on same device
- Changes on network switching (may require re-verification)
- Resistant to spoofing

### 6. MIME Type Sniffing Protection

**Why**: Prevents browser MIME type confusion attacks

**Implementation**:
```
X-Content-Type-Options: nosniff
```

**Effect**:
- Browser must respect `Content-Type: application/json` header
- Cannot treat JSON response as HTML/script

---

## Configuration

### Session Lifetime

**File**: `netlify/lib/reader-access/session-config.ts`

```typescript
export const SESSION_LIFETIME_DAYS = 30;  // Session expiry window
export const MAX_CONCURRENT_DEVICES = 2;  // Devices per reader (can be 2-3)
export const RENEWAL_COALESCE_WINDOW_MS = 1000; // Prevent thundering herd
```

### Rate Limits

**File**: `netlify/lib/reader-access/rate-limiter.ts`

```typescript
export const RATE_LIMIT_PRESETS = {
  SESSION_CREATION: {
    maxAttempts: 5,
    windowMs: 60 * 1000,  // 1 minute
  },
  EMAIL_VERIFICATION: {
    maxAttempts: 10,
    windowMs: 5 * 60 * 1000,  // 5 minutes
  },
  // ... etc
};
```

### Security Headers

**File**: `netlify/lib/reader-access/responses.ts`

```typescript
export const SESSION_SECURITY_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, private',
  'Pragma': 'no-cache',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "default-src 'self'; frame-ancestors 'none'",
};
```

---

## Monitoring & Alerts

### Metrics

**Available Metrics** (tracked in `netlify/lib/reader-access/monitoring.ts`):

- `creationAttempts`: Total session creation attempts
- `creationSuccess`: Successful creations
- `creationFailures`: Failed creations (device limit, storage errors)
- `renewals`: Number of session renewals
- `terminations`: Number of logouts
- `validationRequests`: Total validation requests
- `validationFailures`: Failed validations (expired, terminated)
- `storageErrors`: Blobs service failures
- `rateLimitHits`: 429 responses returned

### Alerts

**Default Alert Thresholds**:

| Alert | Threshold | Action |
|-------|-----------|--------|
| High creation rate | >100/min per email | Check for enumeration attack |
| Consecutive failures | >5 consecutive | Check for user confusion or bug |
| Storage error rate | >5% | Page on-call; check Blobs status |
| Rate limit hits | >50/min | Monitor for attack; may need stricter limits |

### Accessing Metrics

```typescript
import { getMetrics, getHealthStatus, checkAlerts } from '../lib/reader-access/monitoring';

// Get current metrics
const metrics = getMetrics();
console.log(`Sessions created: ${metrics.creationSuccess}`);

// Check health status
const health = getHealthStatus();
if (health.status === 'unhealthy') {
  // Alert ops team
}

// Check for alert conditions
const { hasAlerts, severity, alerts } = checkAlerts();
if (hasAlerts) {
  alerts.forEach(alert => console.warn(alert));
}
```

### Integration with Monitoring Systems

Production deployment should integrate metrics with:

- **Datadog**: Send metrics via StatsD or HTTP API
- **CloudWatch**: Send logs to CloudWatch Logs
- **Slack**: Post alerts to dedicated channel
- **PagerDuty**: Create incidents for critical alerts
- **Grafana**: Build dashboards for visibility

---

## Troubleshooting

### "Session expired" (401)

**Causes**:
1. Session older than 30 days with no activity
2. Clock skew between client and server
3. Session terminated by user logout

**Solution**:
- Ask user to re-verify email
- Check server time synchronization (NTP)
- Verify session not explicitly terminated

### "Device limit exceeded" (409)

**Causes**:
1. Reader logged in on 3+ devices (limit is 2-3)
2. Old sessions not cleaned up after logout

**Solution**:
- Ask user to logout on another device
- Provide device management interface
- Automatically clean up terminated sessions after 24 hours

### "Rate limited" (429)

**Causes**:
1. User entering wrong code multiple times
2. Automated attack or scanning
3. Legitimate user with unstable connection retrying

**Solution**:
- Explain rate limit to user
- Provide "Retry-After" value from response
- After successful verification, rate limit resets
- Monitor for patterns suggesting attack

### Session Cookie Not Set

**Causes**:
1. HTTPS not enabled in production
2. Same-site cookie restriction
3. Third-party cookie restriction in browser

**Solution**:
- Verify HTTPS enabled on domain
- Check SameSite=Lax setting
- Instruct users to disable third-party cookie blocking
- Consider using session ID in URL as fallback (less secure)

### Session Validation Always Fails

**Causes**:
1. Device fingerprint changed (IP address, User-Agent)
2. Cookie corrupted or truncated
3. Session ID format validation too strict

**Solution**:
- Ask user to re-verify email to create new session
- Check User-Agent header consistency
- Review session ID validation rules
- Check storage for corrupted records

### High Storage Error Rate

**Causes**:
1. Blobs service degraded or down
2. Rate limiting on Blobs causing throttling
3. Corrupted session data

**Solution**:
- Check Blobs service status
- Review error logs for specific failures
- Increase rate limit on Blobs if needed
- Clear corrupted session records

---

## Best Practices

1. **Always use HTTPS**: Session cookies are only secure over HTTPS
2. **Monitor session metrics**: Set up dashboards for visibility
3. **Regular security audits**: Review cookie handling and token generation
4. **Keep dependencies updated**: Especially crypto and HTTP libraries
5. **Test with real browsers**: Session handling varies by browser/device
6. **Document deployment procedures**: Include session validation checks
7. **Have runbook for incidents**: Prepared response for session system outages

---

## Related Documents

- [Session Security Audit](./session-security-audit.md) — Detailed security review
- [Session Design Specification](./.github/specs/006-reader-access-session-mgmt/spec.md) — Original requirements
- [Rate Limiter Implementation](../netlify/lib/reader-access/rate-limiter.ts) — Rate limiting code
- [Monitoring Setup](../netlify/lib/reader-access/monitoring.ts) — Metrics and alerting

---

*Last updated: 2026-11-20*  
*Phase 8 Documentation*  
*Author: Claude Haiku 4.5*
