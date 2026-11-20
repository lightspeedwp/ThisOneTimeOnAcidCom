# Feature Specification: Reader Access Session Management

**Feature Branch**: `feat/phase-3-reader-access`

**Created**: 2026-11-19

**Status**: Draft

**Input**: Phase 3: Reader Access Session Management — Implement user session lifecycle (creation, renewal, expiration, termination) with 30-day rolling window, activity tracking, and concurrent device limit enforcement. Enable seamless chapter access after verification with security-first session validation.

## User Scenarios & Testing *(mandatory)*

<!--
IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by
importance.
Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you
implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most
critical.
  Think of each story as a standalone slice of functionality that can be:

- Developed independently
- Tested independently
- Deployed independently
- Demonstrated to users independently
-->

### User Story 1 - Seamless Chapter Access After Email Verification (Priority: P1)

Reader verifies their email via verification code and immediately accesses chapters without additional login steps. The session persists across browser tabs and page reloads, allowing continuous reading experience.

**Why this priority**: Core value—users gain immediate access after verification. Without this, the reader access feature is incomplete.

**Independent Test**: After email verification completes, reader can access protected chapter content without re-authenticating.

**Acceptance Scenarios**:

1. **Given** reader has verified email via code, **When** reader navigates to a protected chapter, **Then** chapter content loads without login prompt
2. **Given** reader with active session, **When** reader opens new browser tab to journal page, **Then** session is recognised and chapter access granted
3. **Given** reader with active session, **When** reader refreshes page, **Then** session persists and chapter content remains accessible

---

### User Story 2 - 30-Day Rolling Session Renewal (Priority: P1)

Sessions automatically extend to 30 days from last activity. Reader can read continuously without worrying about unexpected logouts, up to the renewal window boundary.

**Why this priority**: Core user experience—enables confidence in uninterrupted reading access.

**Independent Test**: Session expiry timestamp extends by 30 days after any verified activity within the session window.

**Acceptance Scenarios**:

1. **Given** reader with session created 25 days ago, **When** reader performs activity within session, **Then** session expiry extends to 30 days from now
2. **Given** reader with session, **When** reader accesses chapter after 29 days, **Then** session extends and chapter access granted
3. **Given** reader with session, **When** reader idle for entire 30-day window, **Then** session expires and reader must reverify email

---

### User Story 3 - Activity Tracking for Session Lifecycle (Priority: P2)

System records when sessions are created, renewed, and terminated for audit and analytics purposes. This enables understanding reader engagement patterns and troubleshooting session issues.

**Why this priority**: Enables operational insights and security audit trail. Important for trust but not blocking core reading access.

**Independent Test**: Activity timestamps are recorded in persistent storage for each session event.

**Acceptance Scenarios**:

1. **Given** reader creates session, **When** session created event occurs, **Then** creation timestamp is logged
2. **Given** reader renews session, **When** renewal occurs, **Then** renewed-at timestamp is updated
3. **Given** reader signs out, **When** session terminated, **Then** termination timestamp is recorded

---

### User Story 4 - Concurrent Device Limit Enforcement (Priority: P2)

Readers can maintain active sessions on a limited number of concurrent devices (e.g., phone + tablet). Exceeding this limit requires explicit device selection or re-verification on new device.

**Why this priority**: Balances security/fairness with usability. Prevents account abuse while maintaining flexibility for multi-device reading.

**Independent Test**: System enforces maximum concurrent sessions per reader; exceeding limit triggers device selection or re-verification flow.

**Acceptance Scenarios**:

1. **Given** reader with active session on phone, **When** reader accesses from tablet, **Then** tablet session created (devices within limit)
2. **Given** reader with max concurrent sessions on devices, **When** reader attempts new device, **Then** reader prompted to select device to terminate or reverify
3. **Given** reader chooses to terminate old device session, **When** action confirmed, **Then** old device loses access and new device gains session

---

### User Story 5 - Secure Session Termination (Priority: P1)

Reader can explicitly sign out, terminating their session immediately. System also auto-terminates expired sessions. Terminated sessions grant no further access.

**Why this priority**: Security-critical. Readers need control over their access and sessions must cleanly terminate.

**Independent Test**: After sign-out or expiry, session cookie is invalidated and chapter access is denied.

**Acceptance Scenarios**:

1. **Given** reader with active session, **When** reader clicks sign out, **Then** session immediately terminated and reader redirected to login flow
2. **Given** expired session, **When** reader attempts to access chapter, **Then** access denied and re-verification required
3. **Given** terminated session, **When** reader tries to use old session token, **Then** request rejected with 401 status

---

### Edge Cases

- What happens when reader attempts to access chapters with invalid/expired session cookie?
- How does system handle concurrent requests from same reader on multiple devices simultaneously?
- What happens if reader's session expires mid-read (while page is still open)?
- How does system recover if device runs out of concurrent session slots and reader loses connection?
- What happens if reader reverifies email while existing session is active—does it create new session or extend existing one?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST create a persistent session upon successful email verification
- **FR-002**: System MUST set session cookie with HttpOnly, Secure, and SameSite=Lax attributes for security
- **FR-003**: System MUST automatically extend session expiry to 30 days from current time when reader performs any activity within active session
- **FR-004**: System MUST deny chapter access to readers with invalid, expired, or missing session tokens and prompt re-verification
- **FR-005**: System MUST track session lifecycle events (creation, renewal, termination) with timestamps in persistent storage
- **FR-006**: System MUST enforce a configurable limit on concurrent active sessions per reader across devices
- **FR-007**: System MUST allow readers to explicitly sign out, immediately invalidating their session
- **FR-008**: System MUST prevent session reuse after expiry (no grace period—expired session = access denied)
- **FR-009**: System MUST handle concurrent requests from same reader without race conditions or double-counting activity
- **FR-010**: System MUST support session renewal across page reloads and new browser tabs within the same device
- **FR-011**: System MUST rate-limit session creation to prevent abuse (max 5 attempts per email per 15 minutes; return 429 Too Many Requests on excess)
- **FR-012**: System MUST log all session lifecycle events (created, renewed, terminated) with timestamp, email, deviceId, and event type for audit trail and operational visibility

### Key Entities *(include if feature involves data)*

- **Session**: Represents an active reader session. Attributes: sessionId (unique), deviceId (device identifier), email (reader identifier), createdAt, expiresAt, renewedAt, active/terminated status
- **Device**: Represents a unique device accessing the system. Attributes: deviceId (unique fingerprint/identifier), lastActivityAt, sessionCount
- **Activity**: Represents session events. Attributes: timestamp, sessionId, eventType (created/renewed/terminated), deviceId

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Readers can access chapters within 500ms of clicking link after verification (session validation + lookup performance)
- **SC-002**: Sessions automatically extend 100% of the time when reader performs activity within the 30-day window
- **SC-003**: 99% of session tokens are validated correctly (no false rejections of valid sessions, no false acceptances of invalid sessions)
- **SC-004**: Concurrent device limit is enforced with 100% accuracy (no overflow past configured limit)
- **SC-005**: Expired sessions are denied access 100% of the time (zero grace period, zero expired-token bypasses)
- **SC-006**: Reader sign-out terminates session within 100ms and subsequent requests are rejected
- **SC-007**: Session activity events are logged 100% of the time with accurate timestamps (createdAt, renewedAt, terminatedAt, eventType)
- **SC-008**: System handles 1000 concurrent readers with multiple active sessions each without degradation
- **SC-009**: Rate limiting enforced: session creation requests > 5 per email per 15 minutes are rejected with 429 (zero false positives)
- **SC-010**: All session events appear in audit log within 500ms of occurrence (creation, renewal, termination, errors)

## Assumptions

- Phase 2 (email verification flow) is complete and functional; Phase 3 builds on verified reader identity from Phase 2
- Session storage uses Netlify Blobs with strong consistency guarantees (from Phase 2 implementation)
- Readers access via browser with cookie support enabled (session cookies are primary mechanism)
- Device fingerprinting uses combination of User-Agent + IP + device characteristics (not invasive biometrics)
- Concurrent device limit is configurable and defaults to 2 devices per reader (readers can hold active sessions on phone + tablet; upgradeable via settings)
- Session renewal happens passively on activity; no explicit "extend session" button required
- Security-first means: HttpOnly cookies (no JavaScript access), Secure flag (HTTPS only), SameSite=Lax (CSRF protection)
- Readers can have multiple overlapping active sessions (one per device) up to configured limit
- Clock synchronisation between backend services is reliable for timestamp comparisons
