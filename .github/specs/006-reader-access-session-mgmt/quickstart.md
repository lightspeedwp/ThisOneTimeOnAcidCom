# Phase 3: Session Management — End-to-End Validation Guide

**Purpose**: Runnable scenarios proving Phase 3 implementation is complete and correct  
**Prerequisites**: Phase 2 (email verification) implementation deployed  
**Test Environment**: Staging or local development environment

---

## Prerequisites

Before running these scenarios, verify:

- [ ] Phase 2 implementation deployed (email verification works)
- [ ] Netlify Blobs configured and accessible
- [ ] Test reader email created (`test-reader@example.com`)
- [ ] Session functions deployed to Netlify Functions
- [ ] Browser cookies enabled (HttpOnly cookies required)

---

## Validation Scenario 1: Create Session After Email Verification

**Goal**: Verify reader can create session immediately after verification

### Setup

1. Clear browser cookies: `sessionToken` cookie should not exist
2. Have verification code ready (from Phase 2 test)

### Steps

1. **Request verification code** (Phase 2):
   ```bash
   curl -X POST http://localhost:8888/api/reader/code-request \
     -H "Content-Type: application/json" \
     -d '{"email":"test-reader@example.com"}'
   ```
   **Expected**: 202 Accepted; email sent with code

2. **Verify email** (Phase 2):
   ```bash
   curl -X POST http://localhost:8888/api/reader/verify \
     -H "Content-Type: application/json" \
     -d '{"email":"test-reader@example.com","code":"123456"}'
   ```
   **Expected**: 200 OK; response includes sessionToken cookie

3. **Verify session created** (Phase 3):
   ```bash
   # Check cookie is set (HttpOnly, Secure, SameSite=Lax)
   curl -v http://localhost:8888/api/reader/chapter/01-part-1
   ```
   **Expected**: 
   - Response includes `Set-Cookie: sessionToken=...` (first request after verify)
   - Cookie has `HttpOnly`, `Secure`, `SameSite=Lax` flags
   - Chapter content returned (200 OK)

### Success Criteria

- [ ] Session created with 30-day expiry
- [ ] HttpOnly cookie set in response
- [ ] Chapter access granted
- [ ] Next request recognizes session via cookie

---

## Validation Scenario 2: Session Persists Across Tabs and Reloads

**Goal**: Verify session is preserved across browser tabs and page refreshes

### Setup

1. Session active from Scenario 1
2. Browser with cookie support

### Steps

1. **Open new tab to same domain**:
   - Navigate to `http://localhost:8888/journal`
   - **Expected**: Page loads; chapter content visible (session recognized)

2. **Refresh page**:
   - Press Ctrl+R or Cmd+R
   - **Expected**: Page reloads; session persists; chapter content still visible

3. **Close and reopen tab**:
   - Close tab (session cookie persists)
   - Open new tab to `http://localhost:8888/journal`
   - **Expected**: Session recognized; chapter content visible

### Success Criteria

- [ ] Session cookie sent with every request (browser automatic)
- [ ] No re-verification required after tab switch
- [ ] No re-verification required after page refresh
- [ ] Session validates successfully on each request

---

## Validation Scenario 3: Session Automatically Extends to 30 Days on Activity

**Goal**: Verify sessions extend when reader accesses chapters

### Setup

1. Session active from Scenario 1
2. Session's current `expiresAt` noted (25 days ago for testing, or use system to adjust)

### Steps

1. **Record current expiry**:
   ```bash
   # Check session details (requires admin/debug endpoint)
   curl -H "Cookie: sessionToken=..." \
     http://localhost:8888/api/reader/session/info
   ```
   **Response**: `expiresAt: 2026-11-24T14:00:00Z` (or current expiry)

2. **Access chapter**:
   ```bash
   curl -H "Cookie: sessionToken=..." \
     http://localhost:8888/api/reader/chapter/01-part-1
   ```
   **Expected**: 200 OK; chapter content

3. **Check updated expiry**:
   ```bash
   curl -H "Cookie: sessionToken=..." \
     http://localhost:8888/api/reader/session/info
   ```
   **Response**: `expiresAt: 2026-12-19T14:00:00Z` (now + 30 days)
   
   **Verify**: `expiresAt` is now approximately 30 days from current time

4. **Activity after 29 days** (simulate with time travel or delayed test):
   - System time advanced to 29 days after session creation
   - Reader accesses chapter
   - **Expected**: 200 OK; session extends again to 30 days

### Success Criteria

- [ ] `expiresAt` extends on activity (not before activity)
- [ ] Extension is exactly 30 days (±1 second)
- [ ] Multiple activities in same session don't create duplicate sessions
- [ ] Session remains active until 30 days with no activity

---

## Validation Scenario 4: Expired Session Denies Access

**Goal**: Verify readers cannot access chapters after expiry

### Setup

1. Test session with expiry set to past (e.g., yesterday)
2. Browser with expired session cookie

### Steps

1. **Attempt to access chapter with expired session**:
   ```bash
   curl -H "Cookie: sessionToken=expired-token" \
     http://localhost:8888/api/reader/chapter/01-part-1
   ```
   **Expected**: 401 Unauthorized
   ```json
   {
     "error": "expired_session",
     "action": "reverify_email"
   }
   ```

2. **Verify session not reusable**:
   - Browser attempts to use expired sessionToken again
   - **Expected**: Still 401 (no grace period; expired = access denied)

3. **Reader re-verifies email**:
   ```bash
   # Request new verification code (Phase 2)
   curl -X POST http://localhost:8888/api/reader/code-request \
     -H "Content-Type: application/json" \
     -d '{"email":"test-reader@example.com"}'
   ```
   **Expected**: New session created with fresh 30-day window

### Success Criteria

- [ ] Expired sessions return 401 immediately
- [ ] No grace period (expiry is hard cutoff)
- [ ] Expired sessionToken cannot be extended
- [ ] Reader must reverify to regain access

---

## Validation Scenario 5: Session Termination (Logout)

**Goal**: Verify readers can explicitly sign out and lose access

### Setup

1. Active session from Scenario 1
2. Reader clicks "Sign Out" button

### Steps

1. **Logout request**:
   ```bash
   curl -X POST http://localhost:8888/api/reader/session/logout \
     -H "Cookie: sessionToken=..." \
     -H "Content-Type: application/json"
   ```
   **Expected**: 200 OK
   ```json
   {
     "status": "logged_out",
     "message": "Session terminated. You have been signed out."
   }
   ```
   Response includes `Set-Cookie: sessionToken=; Max-Age=0` (clear cookie)

2. **Attempt chapter access after logout**:
   ```bash
   curl -H "Cookie: sessionToken=..." \
     http://localhost:8888/api/reader/chapter/01-part-1
   ```
   **Expected**: 401 Unauthorized
   ```json
   {
     "error": "terminated_session",
     "action": "reverify_email"
   }
   ```

3. **Verify same sessionId cannot be reused**:
   - Even if browser retains old cookie, access is denied
   - **Expected**: 401 (token is marked terminated in storage)

### Success Criteria

- [ ] Logout is immediate (no delay)
- [ ] Session cookie cleared in response
- [ ] Subsequent requests denied (401)
- [ ] Terminated session cannot be reactivated
- [ ] Reader must create new session via email verification

---

## Validation Scenario 6: Concurrent Device Limit

**Goal**: Verify reader cannot exceed concurrent device limit

### Setup

1. Reader has max 2 concurrent devices allowed
2. Session active on Device A (phone)
3. Device B (tablet) not yet logged in

### Steps

1. **Create session on Device A** (phone):
   ```bash
   # Verify email on phone
   curl -X POST http://localhost:8888/api/reader/verify \
     -H "Content-Type: application/json" \
     -d '{"email":"test-reader@example.com","code":"123456"}'
   # Result: sessionToken cookie set for Device A
   ```

2. **Create session on Device B** (tablet):
   ```bash
   # Verify email on tablet
   curl -X POST http://localhost:8888/api/reader/verify \
     -H "Content-Type: application/json" \
     -d '{"email":"test-reader@example.com","code":"123456"}'
   # Result: sessionToken cookie set for Device B
   ```

3. **Attempt session on Device C** (desktop):
   ```bash
   # Try to verify on desktop (3rd device)
   curl -X POST http://localhost:8888/api/reader/verify \
     -H "Content-Type: application/json" \
     -d '{"email":"test-reader@example.com","code":"123456"}'
   ```
   **Expected**: 409 Conflict
   ```json
   {
     "error": "device_limit_exceeded",
     "activeDevices": 2,
     "limit": 2,
     "action": "select_device_to_terminate_or_reverify"
   }
   ```

4. **Reader terminates Device A session**:
   ```bash
   # On desktop, request to logout Device A
   curl -X POST http://localhost:8888/api/reader/device/device-a-id/logout \
     -H "Content-Type: application/json" \
     -d '{"email":"test-reader@example.com"}'
   ```
   **Expected**: 200 OK; Device A session terminated

5. **Create session on Device C (now allowed)**:
   ```bash
   # Try again on desktop
   curl -X POST http://localhost:8888/api/reader/verify \
     -H "Content-Type: application/json" \
     -d '{"email":"test-reader@example.com","code":"123456"}'
   ```
   **Expected**: 201 Created; sessionToken set

### Success Criteria

- [ ] Can create sessions on up to 2 devices (or configured limit)
- [ ] 3rd device creation rejected with 409
- [ ] Can terminate old device to free up slot
- [ ] New device can then create session

---

## Validation Scenario 7: Activity Tracking

**Goal**: Verify session lifecycle events are logged

### Setup

1. Test session created
2. Admin/debug endpoint available to read session details

### Steps

1. **Create session and check createdAt**:
   ```bash
   curl -H "Cookie: sessionToken=..." \
     http://localhost:8888/api/reader/session/info
   ```
   **Response**: `createdAt: 2026-11-19T14:00:00Z`, `renewedAt: 2026-11-19T14:00:00Z`

2. **Access chapter and check renewedAt**:
   ```bash
   curl -H "Cookie: sessionToken=..." \
     http://localhost:8888/api/reader/chapter/01-part-1
   
   # Then check session info again
   curl -H "Cookie: sessionToken=..." \
     http://localhost:8888/api/reader/session/info
   ```
   **Response**: `renewedAt: 2026-11-19T14:05:00Z` (timestamp updated)

3. **Logout and check terminatedAt**:
   ```bash
   curl -X POST http://localhost:8888/api/reader/session/logout \
     -H "Cookie: sessionToken=..."
   
   # Check session details (admin endpoint)
   curl http://localhost:8888/api/reader/session/admin/info?email=test-reader@example.com
   ```
   **Response**: `terminatedAt: 2026-11-19T14:10:00Z`

### Success Criteria

- [ ] `createdAt` recorded at session creation
- [ ] `renewedAt` updated on each activity
- [ ] `terminatedAt` recorded on logout
- [ ] All timestamps are ISO 8601 format
- [ ] Timestamps are server-side (not client-controlled)

---

## Validation Scenario 8: Security - Constant-Time Token Comparison

**Goal**: Verify token validation resists timing attacks

### Setup

1. Active session with valid token
2. Test tool to measure response times

### Steps

1. **Request with valid token**:
   ```bash
   time curl -H "Cookie: sessionToken=valid-token" \
     http://localhost:8888/api/reader/chapter/01-part-1
   ```
   **Record**: Response time (e.g., 95ms)

2. **Request with invalid token (1 character wrong)**:
   ```bash
   time curl -H "Cookie: sessionToken=invalid-token-1" \
     http://localhost:8888/api/reader/chapter/01-part-1
   ```
   **Record**: Response time (should be ~95ms, same as valid)

3. **Request with invalid token (completely wrong)**:
   ```bash
   time curl -H "Cookie: sessionToken=xxxxxxxxxxxxxxx" \
     http://localhost:8888/api/reader/chapter/01-part-1
   ```
   **Record**: Response time (should be ~95ms, same)

### Success Criteria

- [ ] All invalid tokens take same time to reject (±5ms variance)
- [ ] No timing-based token guessing possible
- [ ] Constant-time comparison used for token validation

---

## Validation Scenario 9: Cookie Attributes

**Goal**: Verify session cookie has correct security attributes

### Setup

1. Fresh session creation
2. Browser developer tools available

### Steps

1. **Create session**:
   ```bash
   curl -v -X POST http://localhost:8888/api/reader/verify \
     -H "Content-Type: application/json" \
     -d '{"email":"test-reader@example.com","code":"123456"}'
   ```

2. **Inspect Set-Cookie header**:
   ```
   Set-Cookie: sessionToken=<uuid>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000
   ```

3. **Verify cookie properties**:
   - [ ] `HttpOnly` present (JavaScript cannot access)
   - [ ] `Secure` present (HTTPS only)
   - [ ] `SameSite=Lax` present (CSRF protection; cross-site navigation allowed)
   - [ ] `Path=/` (accessible site-wide)
   - [ ] `Max-Age=2592000` (30 days in seconds)

4. **In browser DevTools**, verify:
   - [ ] Cookie not visible in `document.cookie` (HttpOnly blocks JS access)
   - [ ] Cookie sent on every chapter request (browser automatic)
   - [ ] Cookie not stored in localStorage/sessionStorage

### Success Criteria

- [ ] All cookie flags correctly set
- [ ] No token in response body (cookie-only)
- [ ] No token in URL query parameters
- [ ] Token not accessible from JavaScript

---

## Validation Checklist (Complete)

Run all scenarios above and mark complete:

- [ ] Scenario 1: Create Session After Email Verification
- [ ] Scenario 2: Session Persists Across Tabs and Reloads
- [ ] Scenario 3: Session Automatically Extends to 30 Days on Activity
- [ ] Scenario 4: Expired Session Denies Access
- [ ] Scenario 5: Session Termination (Logout)
- [ ] Scenario 6: Concurrent Device Limit
- [ ] Scenario 7: Activity Tracking
- [ ] Scenario 8: Security - Constant-Time Token Comparison
- [ ] Scenario 9: Cookie Attributes

**Overall Result**: All scenarios pass → Phase 3 implementation is complete and secure

---

## Performance Validation

After running above scenarios, validate performance targets:

```bash
# Measure session creation time
time curl -X POST http://localhost:8888/api/reader/verify \
  -H "Content-Type: application/json" \
  -d '{"email":"test-reader@example.com","code":"123456"}'
# Target: <200ms, Acceptable: <500ms

# Measure session validation time
time curl -H "Cookie: sessionToken=..." \
  http://localhost:8888/api/reader/chapter/01-part-1
# Target: <100ms, Acceptable: <200ms
```

---

## Troubleshooting

If scenarios fail:

1. **Session not created**: Check Phase 2 verification works; verify email is valid
2. **Cookie not set**: Check Set-Cookie header in response; verify browser accepts HttpOnly cookies
3. **Session not recognized**: Clear browser cookies; re-create session
4. **Expiry not extending**: Check server time is synchronized; verify activity triggers renewal
5. **Logout not working**: Check session marked as terminated in Blobs storage
6. **Device limit not enforced**: Check deviceId fingerprinting is consistent
7. **Performance slow**: Check Blobs latency; consider session caching

