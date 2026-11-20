# Tasks: Reader Access Session Management (Phase 3)

**Input**: Design documents from `./.github/specs/006-reader-access-session-mgmt/`

**Prerequisites**:
- Phase 2 (email verification) implementation deployed and tested
- plan.md (technical context: Netlify Blobs, TypeScript, Vitest)
- spec.md (5 user stories, all with acceptance scenarios)
- data-model.md (Session, Device, Activity entities)
- contracts/session-api.md (4 API endpoints)
- research.md (design decisions)
- quickstart.md (9 validation scenarios)

**Tests**: Vitest unit tests + Playwright E2E tests (optional TDD approach)

**Organization**: Tasks organized by user story priority (P1 → P2) for independent implementation and testing

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1, US2, US3, US4, US5)
- Include exact file paths for verification and tracking

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Session management foundation built on Phase 2 implementation

- [x] T001 Extend Phase 2 storage adapter: Add session operations to `netlify/lib/reader-access/store.ts`
- [x] T002 Create Session entity interfaces in `netlify/lib/reader-access/session.ts` with types: sessionId, email, deviceId, createdAt, expiresAt, renewedAt, terminatedAt, status
- [x] T003 [P] Create constants for session config: `netlify/lib/reader-access/session-config.ts` with SESSION_LIFETIME_DAYS=30, MAX_RETRIES=5, COOKIE_NAME="sessionToken"
- [x] T004 [P] Create utility for device fingerprinting in `netlify/lib/reader-access/device-fingerprint.ts` using User-Agent + IP + timezone
- [x] T005 [P] Create utility for constant-time token comparison in `netlify/lib/reader-access/crypto.ts` to prevent timing attacks

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core session management that blocks all user story work. MUST complete before ANY user story implementation begins.

- [x] T006 Implement Session storage adapter methods in `netlify/lib/reader-access/store.ts`:
  - `storeSession(session: Session): Promise<void>`
  - `getSession(email, deviceId): Promise<Session | null>`
  - `updateSession(email, deviceId, partial): Promise<Session>`
  - `deleteSession(email, deviceId): Promise<void>`
  - Use key format: `session:${email}:${deviceId}` with strong consistency
- [x] T007 Implement SessionService in `netlify/lib/reader-access/session-service.ts` with methods:
  - `createSession(email, verificationCode, deviceId): Promise<Session>` (depends on Phase 2 code validation)
  - `validateSession(sessionId): Promise<boolean>`
  - `renewSession(email, deviceId): Promise<Session>` (extend expiresAt to now + 30 days)
  - `terminateSession(email, deviceId): Promise<void>` (set terminatedAt, mark as terminated)
- [x] T008 Create session cookie utilities in `netlify/lib/reader-access/session-cookie.ts`:
  - `createSessionCookie(sessionId, options): string` (HttpOnly, Secure, SameSite=Lax flags)
  - `parseSessionCookie(request): string | null` (extract sessionId from request cookies)
  - `clearSessionCookie(): string` (Max-Age=0 to clear)
- [x] T009 Implement session validation middleware in `netlify/lib/reader-access/session-middleware.ts`:
  - Extract sessionToken from cookie
  - Validate token (not empty, correct format)
  - Lookup session in storage
  - Check expiry (expiresAt > now)
  - Check not terminated (terminatedAt === null)
  - Return validation result + session object
- [x] T010 [P] Create test utilities for session testing in `tests/reader-access/session-fixtures.ts`:
  - Fixtures for valid sessions, expired sessions, terminated sessions
  - Utilities to create test sessions with various states
  - Mock Blobs storage if needed for unit tests

**⚠️ CRITICAL CHECKPOINT**: Foundation ready. Session storage, validation, and middleware working. All user story work can now begin in parallel.

---

## Phase 3: User Story 1 - Seamless Chapter Access After Email Verification (Priority: P1) 🎯 MVP

**Goal**: Reader verifies email once and accesses all chapters without additional login, with session persisting across tabs/reloads.

**Independent Test**: After email verification, reader can access protected chapter content without re-authenticating. Session recognized in new tabs and after page refresh.

**Key Files**:
- Session creation: `netlify/functions/reader-session-create.ts`
- Session validation: `netlify/lib/reader-access/session-middleware.ts`
- Chapter endpoint: `netlify/functions/reader-chapter.ts` (modified to use session)

### Tests for User Story 1

- [ ] T011 [P] [US1] Unit test for `createSession` in `tests/reader-access/session.test.ts`: should create session with 30-day expiry after email verification
- [ ] T012 [P] [US1] Unit test for session persistence across requests: same sessionId → same session retrieved
- [ ] T013 [P] [US1] Integration test for session creation flow in `tests/reader-access/session-create.test.ts`: verify → 201 Created + HttpOnly cookie
- [ ] T014 [US1] E2E test for chapter access in `tests/e2e/reader-access.spec.ts`: verify email → access chapter (no login prompt)
- [ ] T015 [US1] E2E test for session persistence: open new tab → chapter accessible (session recognized)
- [ ] T016 [US1] E2E test for page refresh: refresh page → session persists → chapter content visible

### Implementation for User Story 1

- [ ] T017 Implement session creation endpoint in `netlify/functions/reader-session-create.ts`:
  - Accept verified email (from Phase 2 verification flow)
  - Validate verification code (not expired, correct)
  - Mark code as consumed (atomic, no replay)
  - Generate sessionId (cryptographically secure, 256-bit minimum)
  - Create Session record (email, deviceId fingerprint, createdAt, expiresAt = now + 30 days)
  - Set HttpOnly cookie: sessionToken=<sessionId>; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000
  - Return 201 Created
  - Error cases: 400 (invalid), 401 (verification failed), 429 (rate limit), 500 (server error)
- [ ] T018 Modify chapter endpoint in `netlify/functions/reader-chapter.ts`:
  - Add session validation middleware (from T009)
  - On valid session: proceed to return chapter content, also auto-renew session (T019 - Phase 3)
  - On invalid session (missing/expired/terminated): return 401 with Set-Cookie to clear cookie
  - Add logging: "Chapter access: email, chapterId, sessionStatus"
- [ ] T019 Implement session auto-renewal on activity in `netlify/lib/reader-access/session-service.ts`:
  - On any chapter access with valid session: renewSession(email, deviceId)
  - Update: renewedAt = now, expiresAt = now + 30 days
  - Atomic operation (no race conditions with concurrent requests)
  - Return updated session for logging
- [ ] T020 Add session validation tests for chapter access in `tests/reader-access/chapter-access.test.ts`:
  - Valid session → 200 OK + chapter content
  - Missing cookie → 401 Unauthorized
  - Expired session → 401 Unauthorized
  - Terminated session → 401 Unauthorized

**Checkpoint: User Story 1 Complete**
- Reader can verify email once and access all chapters
- Session persists across browser tabs and page reloads
- MVP is complete and testable independently
- Ready to test validation scenarios 1-2 from quickstart.md

**Effort**: T017-T020 implementation, T011-T016 tests = approximately 8-12 hours for single developer

---

## Phase 4: User Story 2 - 30-Day Rolling Session Renewal (Priority: P1)

**Goal**: Sessions automatically extend to 30 days on any activity, enabling uninterrupted reading.

**Independent Test**: Session expiry timestamp extends by 30 days after any activity within the session window.

**Key Files**:
- Session renewal logic: `netlify/lib/reader-access/session-service.ts` (renewSession method)
- Automated renewal: happens during chapter access (T019 above)

### Tests for User Story 2

- [ ] T021 [P] [US2] Unit test for session renewal: session created 25 days ago + activity → expiresAt extends to now + 30 days
- [ ] T022 [P] [US2] Unit test for expiry calculation: verify expiresAt timestamp is exactly 30 days (±1 second) from activity time
- [ ] T023 [P] [US2] Unit test for no-renewal case: session created 25 days ago with no activity → still expires after 5 more days (no auto-renewal without activity)
- [ ] T024 [US2] Integration test for renewal flow in `tests/reader-access/session-renewal.test.ts`: access chapter day 29 → expiresAt extends to day 59
- [ ] T025 [US2] Integration test for expiry enforcement: session expires after full 30 days with no activity → next access returns 401
- [ ] T026 [US2] E2E test for seamless renewal: continuous reading over 25+ days (simulated) → no interruptions

### Implementation for User Story 2

- [ ] T027 [US2] Implement expiry check in session validation (T009 modification):
  - On each request: check `expiresAt > now`
  - If expired: mark session as "expired", return 401
  - No grace period: expired = access denied immediately
- [ ] T028 [US2] Implement automatic renewal timing in `netlify/lib/reader-access/session-service.ts`:
  - renewSession called on any chapter access (already in T019)
  - Coalesce renewals: if activity within <1 second of last renewal, skip update (prevent thundering herd)
  - Use server time (not client time) for all expiry calculations
- [ ] T029 [US2] Add clock-skew safeguards in `netlify/lib/reader-access/session-service.ts`:
  - All timestamps use server time (Date.now())
  - No acceptance of client-provided timestamps for expiry
  - Validate expiresAt > now when session created
- [ ] T030 [US2] Add renewal logging and monitoring:
  - Log renewal events: "Session renewed: email, renewedAt, newExpiresAt"
  - Track renewal frequency for analytics
  - Alert if renewal fails (storage error)

**Checkpoint: User Story 2 Complete**
- Sessions extend to 30 days on activity
- No grace period for expiry
- Continuous reading experience works for 30-day window
- Ready to test validation scenarios 3-4 from quickstart.md

**Effort**: T027-T030 implementation, T021-T026 tests = approximately 6-8 hours for single developer

---

## Phase 5: User Story 3 - Activity Tracking for Session Lifecycle (Priority: P2)

**Goal**: Record session creation, renewal, and termination timestamps for audit trail and analytics.

**Independent Test**: Activity timestamps (createdAt, renewedAt, terminatedAt) are recorded for each session event.

**Key Files**:
- Activity tracking: session record itself (denormalized; timestamps in Session entity)

### Tests for User Story 3

- [ ] T031 [P] [US3] Unit test for createdAt timestamp: session created with createdAt = now
- [ ] T032 [P] [US3] Unit test for renewedAt update: renewSession sets renewedAt = now
- [ ] T033 [P] [US3] Unit test for terminatedAt on logout: terminateSession sets terminatedAt = now
- [ ] T034 [US3] Integration test for activity tracking: create → verify createdAt, renew → verify renewedAt updated, logout → verify terminatedAt set
- [ ] T035 [US3] E2E test for audit trail: reader actions → all timestamps recorded in persistent storage

### Implementation for User Story 3

- [ ] T036 [US3] Ensure createdAt set in `createSession` (T017):
  - createdAt = new Date().toISOString()
  - Stored with session in Blobs
- [ ] T037 [US3] Ensure renewedAt updated in `renewSession` (T028):
  - renewedAt = new Date().toISOString()
  - Stored atomically with expiresAt update
- [ ] T038 [US3] Implement terminatedAt in `terminateSession`:
  - terminatedAt = new Date().toISOString() on logout
  - Set status = "terminated"
  - Stored in Blobs
- [ ] T039 [US3] Add activity tracking to session validation results:
  - Return createdAt, renewedAt, terminatedAt in validation response (for logging)
  - Log: "Session activity: email, createdAt, renewedAt, terminatedAt, status"
- [ ] T040 [US3] Create session info endpoint (optional debug endpoint):
  - GET `/api/reader/session/info` (admin/debug only)
  - Return: sessionId (masked), email, createdAt, renewedAt, terminatedAt, expiresAt, status
  - For validation testing and troubleshooting

**Checkpoint: User Story 3 Complete**
- All session lifecycle events are timestamped
- Audit trail is maintained in persistent storage
- Analytics-ready data for engagement tracking
- Ready to test validation scenario 7 from quickstart.md

**Effort**: T036-T040 implementation, T031-T035 tests = approximately 4-6 hours for single developer

**Note**: Activity logging is done; full audit log table deferred to Phase 4+

---

## Phase 6: User Story 4 - Concurrent Device Limit Enforcement (Priority: P2)

**Goal**: Enforce maximum concurrent sessions per reader (default 2-3 devices); allow device management.

**Independent Test**: Reader cannot create session on 4th device if limit is 3; can terminate old device to free up slot.

**Key Files**:
- Device limit check: `netlify/functions/reader-session-create.ts` (before creating)
- Device termination: `netlify/functions/reader-device-logout.ts` (new endpoint)

### Tests for User Story 4

- [ ] T041 [P] [US4] Unit test for device count: query active sessions for email → returns count per device
- [ ] T042 [P] [US4] Unit test for device limit check: activeCount < limit → allow, activeCount >= limit → deny
- [ ] T043 [US4] Integration test for device limit enforcement in `tests/reader-access/device-limit.test.ts`:
  - Create sessions on devices 1, 2 → both succeed
  - Create session on device 3 → denied (409 Conflict)
- [ ] T044 [US4] Integration test for device termination:
  - Terminate device 1 → freed
  - Create session on device 3 → now succeeds
- [ ] T045 [US4] E2E test for multi-device: phone → tablet → both work (within limit)
- [ ] T046 [US4] E2E test for device overflow: 3rd device → 409 error shown to user

### Implementation for User Story 4

- [ ] T047 [US4] Implement device fingerprinting consistency in `netlify/lib/reader-access/device-fingerprint.ts`:
  - deviceId = hash(User-Agent + IP + timezone)
  - Deterministic: same device → same deviceId every time
  - Stable: survives network switching (for a while)
- [ ] T048 [US4] Add device limit check in `createSession` (T017 modification):
  - Query active sessions where email = X: count sessions with status = "active" and terminatedAt = null
  - If count >= MAX_CONCURRENT_DEVICES (default 2-3, configurable):
    - Return 409 Conflict
    - Response includes activeDevices count, limit, action prompt
  - Otherwise: proceed with session creation
- [ ] T049 [US4] Implement device logout endpoint in `netlify/functions/reader-device-logout.ts`:
  - Accept: email, deviceId to terminate
  - Validate: confirmation token (sent via email or included in request)
  - Terminate session: terminateSession(email, deviceId)
  - Return 200 OK; device is now freed
- [ ] T050 [P] [US4] Add device list endpoint (optional):
  - GET `/api/reader/devices` (authenticated)
  - Return: list of active devices with timestamps, allow device termination UI
  - For user-facing device management

**Checkpoint: User Story 4 Complete**
- Concurrent device limit enforced
- Readers can manage devices (terminate old to add new)
- Security/fairness balance maintained
- Ready to test validation scenario 6 from quickstart.md

**Effort**: T047-T050 implementation, T041-T046 tests = approximately 6-8 hours for single developer

---

## Phase 7: User Story 5 - Secure Session Termination (Priority: P1)

**Goal**: Allow explicit logout with immediate access denial; handle auto-termination on expiry.

**Independent Test**: After logout or expiry, session cookie is invalidated and chapter access is denied (401).

**Key Files**:
- Logout endpoint: `netlify/functions/reader-session-logout.ts` (new)
- Expiry handling: `netlify/lib/reader-access/session-middleware.ts` (already implemented T009)

### Tests for User Story 5

- [ ] T051 [P] [US5] Unit test for logout: terminateSession sets status = "terminated", terminatedAt = now
- [ ] T052 [P] [US5] Unit test for access denial after logout: validateSession returns false for terminated session
- [ ] T053 [P] [US5] Unit test for access denial on expiry: validateSession returns false for expired session
- [ ] T054 [US5] Integration test for logout flow in `tests/reader-access/session-logout.test.ts`:
  - POST `/api/reader/session/logout` with valid session → 200 OK
  - Response includes Set-Cookie: sessionToken=; Max-Age=0 (clear cookie)
- [ ] T055 [US5] Integration test for post-logout denial:
  - Logout → then access chapter with same sessionToken → 401 Unauthorized
- [ ] T056 [US5] Integration test for expiry denial:
  - Session with expiresAt = past → access chapter → 401 Unauthorized
- [ ] T057 [US5] E2E test for logout: sign out button → session terminated → chapter access denied
- [ ] T058 [US5] E2E test for timeout: idle until expiry → access denied → prompt to reverify

### Implementation for User Story 5

- [ ] T059 [US5] Implement logout endpoint in `netlify/functions/reader-session-logout.ts`:
  - Accept: sessionToken from cookie (or body for testing)
  - Lookup session by token (need reverse mapping or use email from context)
  - Call: terminateSession(email, deviceId)
  - Return 200 OK with response:
    ```json
    {
      "status": "logged_out",
      "message": "Session terminated. You have been signed out."
    }
    ```
  - Response includes Set-Cookie: sessionToken=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0
- [ ] T060 [US5] Add logout logging in `reader-session-logout.ts`:
  - Log: "Session logout: email, terminatedAt, ipAddress"
  - Track logout events for analytics
- [ ] T061 [US5] Implement no-grace-period enforcement in session validation (T009 modification):
  - On expiry check (expiresAt ≤ now): immediately deny (no grace period)
  - Return 401 without retries
  - No "about to expire" warnings; cleaner state machine
- [ ] T062 [US5] Add session token invalidation immediately after logout:
  - After terminateSession: session cannot be re-used
  - Next request with same token → 401
  - No session resurrection (new login required)
- [ ] T063 [US5] Add error response standardization in `netlify/lib/reader-access/responses.ts`:
  - Unauthorized responses: { error: "unauthorized", reason: "expired_session|terminated_session|invalid_session", action: "reverify_email" }
  - Consistent error format across all endpoints

**Checkpoint: User Story 5 Complete**
- Readers can explicitly logout; session terminated immediately
- Expired sessions denied access instantly (no grace period)
- Secure termination enforced
- Ready to test validation scenarios 4-5 from quickstart.md

**Effort**: T059-T063 implementation, T051-T058 tests = approximately 6-8 hours for single developer

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Security hardening, performance optimization, documentation, and final validation

- [ ] T064 [P] Implement constant-time token comparison in all validation paths (from T005)
  - Use in `session-middleware.ts` when comparing sessionId
  - Prevent timing-based token guessing
- [ ] T065 [P] Add security headers to session endpoints:
  - Set `Cache-Control: no-store, no-cache, must-revalidate`
  - Set `Pragma: no-cache`
  - Set `X-Content-Type-Options: nosniff`
  - Prevent session data caching
- [ ] T066 [P] Add rate limiting to session creation (`reader-session-create.ts`):
  - Limit to N creation attempts per email per minute (prevent enumeration)
  - Return 429 Too Many Requests if exceeded
- [ ] T067 [P] Add monitoring/alerting for session operations:
  - Track: session creation rate, renewal rate, termination rate
  - Alert: unusually high creation attempts (potential attack)
  - Alert: session storage errors
- [ ] T068 Comprehensive unit test suite in `tests/reader-access/`:
  - `session.test.ts`: core session operations
  - `session-middleware.test.ts`: validation logic
  - `session-service.test.ts`: service layer
  - Target: >80% code coverage
- [ ] T069 Comprehensive integration tests in `tests/reader-access/`:
  - `full-lifecycle.test.ts`: create → renew → terminate flow
  - `device-management.test.ts`: device limits and switching
  - `security.test.ts`: constant-time, timing attacks, replay protection
- [ ] T070 [P] End-to-end validation using quickstart.md scenarios in `tests/e2e/reader-access.spec.ts`:
  - Run all 9 scenarios from quickstart.md
  - Scenario 1: Create session after verification ✅
  - Scenario 2: Session persists across tabs ✅
  - Scenario 3: 30-day auto-renewal ✅
  - Scenario 4: Expired session denial ✅
  - Scenario 5: Logout termination ✅
  - Scenario 6: Device limits ✅
  - Scenario 7: Activity tracking ✅
  - Scenario 8: Timing attack resistance ✅
  - Scenario 9: Cookie security ✅
- [ ] T071 Documentation updates:
  - Add session management section to `docs/reader-access.md`
  - Document session lifecycle, API endpoints, error codes
  - Add troubleshooting guide for session issues
- [ ] T072 [P] Code cleanup and refactoring:
  - Remove debug logging (keep only production-critical logs)
  - Consolidate duplicate error handling
  - Align error messages across all endpoints
- [ ] T073 Add JSDoc comments to all session functions:
  - Document parameters, return types, error cases
  - Add examples for session creation flow
- [ ] T074 Performance optimization:
  - Profile session validation latency (target <100ms)
  - Profile session renewal latency (target <100ms)
  - Optimize Blobs queries if needed (consider caching valid sessions <100ms)
- [ ] T075 Final security audit:
  - Review all cookie handling (HttpOnly, Secure, SameSite)
  - Verify no tokens in URLs or response bodies
  - Verify no session data logged (privacy)
  - Review all error responses for information leakage
- [ ] T076 Deployment readiness:
  - Feature flag configuration (if needed)
  - Rollback plan documented
  - Monitoring dashboards set up
  - On-call runbook created
- [ ] T077 [P] Update PR description and CHANGELOG:
  - Link to design docs (research.md, data-model.md, contracts/)
  - Summarize test coverage
  - List all 5 user stories as complete

---

## Dependencies & Execution Order

### Critical Path

1. **Phase 1 (Setup)**: T001-T005 (independent, run in parallel with [P] tag)
2. **Phase 2 (Foundational)**: T006-T010 (depends on Phase 1; BLOCKS all user stories)
3. **User Stories** (after Phase 2 complete): Can run in parallel with separate developers
   - **Phase 3 (US1 - MVP)**: T011-T020 (developer A)
   - **Phase 4 (US2)**: T021-T030 (developer B, or sequential after US1)
   - **Phase 5 (US3)**: T031-T040 (developer C, or sequential)
   - **Phase 6 (US4)**: T041-T050 (parallel or sequential)
   - **Phase 7 (US5)**: T051-T063 (parallel or sequential)
4. **Phase 8 (Polish)**: T064-T077 (depends on all stories; run after feature complete)

### User Story Dependencies

- **US1 (Phase 3)**: Depends on Phase 2 only. No dependencies on other stories.
- **US2 (Phase 4)**: Depends on Phase 2 only. Can start after US1 or in parallel.
- **US3 (Phase 5)**: Depends on Phase 2 only. Can start in parallel with US1/US2.
- **US4 (Phase 6)**: Depends on Phase 2 only. Can start in parallel with others.
- **US5 (Phase 7)**: Depends on Phase 2 only. Can start in parallel with others.

Each user story is independently testable after completion. MVP = US1 alone.

### Parallel Opportunities (with 5 developers)

```text
Timeline:
Day 1-2:   Phase 1 (Setup) [1 dev]  → Phase 2 (Foundational) [2 devs]
Day 3-5:   US1 (Dev A)
           US2 (Dev B)
           US3 (Dev C)
           US4 (Dev D)
           US5 (Dev E)
Day 5-6:   Polish & Testing [2 devs]
Day 6-7:   Final validation & deployment prep
```

With 2 developers: Sequential phases, ~3-4 weeks total
With 5 developers: Parallel phases, ~2-3 weeks total

---

## Implementation Strategy

### MVP First (US1 Only)

1. ✅ Complete Phase 1: Setup
2. ✅ Complete Phase 2: Foundational (critical)
3. ✅ Complete Phase 3: User Story 1
4. 🔍 **STOP and VALIDATE**: Test US1 independently (quickstart scenarios 1-2)
5. ✅ Ready to demo/deploy

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add US1 → test independently → deploy (MVP!)
3. Add US2 → test independently → deploy
4. Add US3 → test independently → deploy
5. Add US4 → test independently → deploy
6. Add US5 → test independently → deploy
7. Polish → final validation → ship

Each story is independently valuable and can be deployed without breaking prior stories.

---

## Checkpoint Validation

After each phase, run quickstart.md validation scenarios:

| Phase | User Stories | Quickstart Scenarios | Status |
|-------|--------------|----------------------|--------|
| Phase 3 | US1 | 1-2 (Create, Persist) | ✅ |
| Phase 4 | US1-2 | 1-4 (Renewal, Expiry) | ✅ |
| Phase 5 | US1-3 | 7 (Activity Tracking) | ✅ |
| Phase 6 | US1-4 | 6 (Device Limits) | ✅ |
| Phase 7 | US1-5 | 4-5 (Logout, Expiry) | ✅ |
| Phase 8 | All | 8-9 (Security, Cookies) | ✅ |

---

## Task Counts by Story

- **Phase 1 (Setup)**: 5 tasks
- **Phase 2 (Foundational)**: 5 tasks (CRITICAL - blocks all stories)
- **US1 (Phase 3)**: 10 tasks (6 implementation, 4 tests) + MVP validation
- **US2 (Phase 4)**: 10 tasks (4 implementation, 6 tests)
- **US3 (Phase 5)**: 10 tasks (5 implementation, 5 tests)
- **US4 (Phase 6)**: 10 tasks (4 implementation, 6 tests)
- **US5 (Phase 7)**: 13 tasks (5 implementation, 8 tests)
- **Phase 8 (Polish)**: 14 tasks (security, testing, documentation)

**Total**: 77 tasks across 8 phases

---

## Notes

- Each `[P]` task can run in parallel (different files, no dependencies)
- Each `[US#]` task is mapped to its user story for traceability
- Tests marked as optional but recommended for TDD approach
- All file paths are exact for fast code review and verification
- Quickstart.md provides 9 concrete validation scenarios per Phase
- Phase 2 (Foundation) is critical blocker; complete before user story work
- Polish phase ensures security hardening before production deployment


---

## Phase 9: Convergence — Gap Closure & Testing

**Purpose**: Close gaps between specification intent and current implementation; add missing tests, complete US4 device limits, and implement security/polish tasks identified during convergence assessment.

**Status**: Generated by /speckit-converge assessment; all tasks scope verified against spec.md, plan.md, and codebase implementation.

### User Story 1 Tests (Seamless Chapter Access)

- [ ] T078 [P] [US1] Create unit tests for session creation in `tests/session/session-create.test.ts`: verify 30-day expiry, cryptographically secure token generation
- [ ] T079 [P] [US1] Create unit tests for session persistence in `tests/session/session-persistence.test.ts`: same sessionId → same session retrieved from Blobs
- [ ] T080 [P] [US1] Create integration test for full session creation flow in `tests/session/session-create-integration.test.ts`: email verification → session created → 201 response with HttpOnly cookie set
- [ ] T081 [US1] Create E2E test for chapter access in `tests/e2e/reader-chapter-access.e2e.ts`: verify email → access chapter with no login prompt

### User Story 2 Tests (30-Day Rolling Renewal)

- [ ] T082 [P] [US2] Create unit test for session renewal logic in `tests/session/session-renewal.test.ts`: renewSession updates expiresAt to now + 30 days
- [ ] T083 [P] [US2] Create unit test for expiry calculation in `tests/session/session-expiry.test.ts`: verify exact 30-day window (±1 second precision)
- [ ] T084 [US2] Create integration test for renewal flow in `tests/session/session-renewal-integration.test.ts`: access chapter day 29 → expiresAt extends to day 59
- [ ] T085 [US2] Create E2E test for seamless renewal in `tests/e2e/reader-renewal.e2e.ts`: continuous reading simulated over 25+ days → no interruptions

### User Story 2 Implementation Enhancements

- [ ] T086 [US2] Add renewal logging to `netlify/lib/reader-access/session-service.ts`: log "Session renewed: email, renewedAt, newExpiresAt" on each renewal for analytics
- [ ] T087 [US2] Implement renewal coalescing in `netlify/lib/reader-access/session-service.ts`: skip redundant renewals within 1-second window to prevent thundering herd
- [ ] T088 [US2] Add clock-skew safeguards in `netlify/lib/reader-access/session-service.ts`: use server time only for all expiry calculations; reject client timestamps

### User Story 3 Tests (Activity Tracking)

- [ ] T089 [P] [US3] Create unit test for createdAt timestamp in `tests/session/session-timestamps.test.ts`: session created with createdAt = now ± 100ms
- [ ] T090 [P] [US3] Create unit test for renewedAt tracking in `tests/session/session-timestamps.test.ts`: renewSession updates renewedAt = now ± 100ms
- [ ] T091 [P] [US3] Create unit test for terminatedAt on logout in `tests/session/session-timestamps.test.ts`: terminateSession sets terminatedAt = now
- [ ] T092 [US3] Create integration test for activity audit trail in `tests/session/session-audit.test.ts`: create → renew → terminate flow records all timestamps

### User Story 3 Implementation Enhancements

- [ ] T093 [US3] Ensure all session lifecycle events update timestamps atomically in `netlify/lib/reader-access/store.ts`: createdAt, renewedAt, terminatedAt written as single Blobs operation
- [ ] T094 [US3] Add activity query endpoint in `netlify/functions/reader-session-activity.ts` (optional): GET `/api/reader/session/activity` returns audit trail of session events

### User Story 4 Implementation (Concurrent Device Limits) — CRITICAL GAP

- [ ] T095 [US4] Verify device fingerprinting consistency in `netlify/lib/reader-access/device-fingerprint.ts`: generateDeviceFingerprint must return identical hash for same device (User-Agent + IP + timezone + screen resolution); document that IP changes may require re-verification
- [ ] T096 [US4] Implement device counting function in `netlify/lib/reader-access/session-service.ts`: countActiveDevices(email) → returns count of unique active device IDs with status = "active" and terminatedAt = null
- [ ] T097 [US4] Add device limit enforcement in `netlify/functions/reader-verify.ts` (modify session creation): before createSession, check countActiveDevices(email) >= MAX_CONCURRENT_DEVICES; if true, return 409 Conflict with response: `{ error: "device_limit_exceeded", activeCount, limit, action: "select_device_to_terminate" }`
- [ ] T098 [US4] Implement device termination endpoint in `netlify/functions/reader-device-logout.ts` (new): POST `/api/reader/device/logout` accepts email + deviceId, calls terminateSession, returns 200 OK; allows user to free up device slots
- [ ] T099 [P] [US4] Create unit test for device counting in `tests/session/device-limit.test.ts`: countActiveDevices returns accurate count per email
- [ ] T100 [P] [US4] Create unit test for device limit enforcement in `tests/session/device-limit.test.ts`: count < limit → allow, count >= limit → deny with 409
- [ ] T101 [US4] Create integration test for device limit workflow in `tests/session/device-limit-integration.test.ts`: create sessions on 2 devices → succeed; attempt 3rd device → 409; terminate device 1 → 3rd device creation now succeeds
- [ ] T102 [US4] Create E2E test for multi-device scenario in `tests/e2e/reader-devices.e2e.ts`: verify email on phone → access chapter → switch to tablet → both work; attempt 3rd device → see device limit message

### User Story 5 Tests (Secure Session Termination)

- [ ] T103 [P] [US5] Create unit test for logout in `tests/session/session-logout.test.ts`: terminateSession sets status = "terminated", terminatedAt = now
- [ ] T104 [P] [US5] Create unit test for access denial after logout in `tests/session/session-logout.test.ts`: validateSession returns false for terminated session
- [ ] T105 [US5] Create integration test for logout flow in `tests/session/session-logout-integration.test.ts`: POST `/api/reader/session/logout` with valid session → 204 response with Set-Cookie: Max-Age=0
- [ ] T106 [US5] Create E2E test for logout in `tests/e2e/reader-logout.e2e.ts`: click "Sign Out" → session terminated → chapter access returns 401

### User Story 5 Implementation Enhancements

- [ ] T107 [US5] Verify logout endpoint exists in `netlify/functions/reader-session-logout.ts` (or reader-session.ts DELETE method); ensure Set-Cookie header clears sessionToken with Max-Age=0, HttpOnly, Secure, SameSite=Lax flags
- [ ] T108 [US5] Add error response standardization in `netlify/lib/reader-access/responses.ts`: standardize unauthorized error format to `{ error: "unauthorized", reason: "expired_session|terminated_session|invalid_session", action: "reverify_email" }`

### Security Hardening & Polish (Phase 8 Completion)

- [ ] T109 [P] Add security headers to all session endpoints in `netlify/functions/reader-*.ts`: set `Cache-Control: no-store, no-cache, must-revalidate`, `Pragma: no-cache`, `X-Content-Type-Options: nosniff` to prevent session data caching
- [ ] T110 [P] Add rate limiting to session creation in `netlify/functions/reader-verify.ts`: limit to 5 verification attempts per email per minute; return 429 Too Many Requests if exceeded (prevent enumeration attacks)
- [ ] T111 [P] Add monitoring/alerting setup in `netlify/functions/` and `netlify/lib/reader-access/`: track session creation rate, renewal rate, error rate; alert on unusually high creation attempts (potential attack) or storage failures
- [ ] T112 Add JSDoc comments to all session functions in `netlify/lib/reader-access/*.ts`: document parameters, return types, error cases, examples for session creation → validation → renewal flow
- [ ] T113 [P] Performance profiling in `tests/performance/session-latency.test.ts`: measure session validation latency (target <100ms), session creation latency (target <200ms), renewal latency (target <100ms); add performance regression tests
- [ ] T114 Final security audit checklist in `docs/session-security-audit.md`: verify HttpOnly/Secure/SameSite cookie flags, verify no tokens in URLs/response bodies, verify no session data logged (privacy), review error responses for information leakage
- [ ] T115 Add comprehensive test coverage reporting in CI: ensure unit + integration + E2E tests achieve >80% code coverage for `netlify/lib/reader-access/`
- [ ] T116 Documentation update: add session management section to `docs/reader-access.md` covering lifecycle, API endpoints, error codes, troubleshooting guide

### Validation Against Specification

- [ ] T117 Validate all quickstart.md scenarios (9 total) in `tests/e2e/reader-access-validation.spec.ts`: run Scenario 1-9; verify creation, persistence, renewal, expiry, logout, device limits, activity tracking, timing attack resistance, cookie security all pass acceptance criteria from spec.md

### Deployment Readiness

- [ ] T118 Update PR description and CHANGELOG.md: link to design docs (research.md, data-model.md, contracts/session-api.md), summarize test coverage (target >80%), list all 5 user stories + 4 gap-closure areas as complete
- [ ] T119 Prepare rollback plan documentation: document how to disable session validation if needed, how to clear session storage if corruption occurs, how to monitor for issues post-deployment

---

## Convergence Summary

**Total Convergence Tasks**: 42 (T078-T119)

**Organized by Gap Type**:
- **Missing Tests**: T078-T092, T099-T106, T115-T117 (25 tasks) — highest priority for quality
- **US4 Device Limits**: T095-T101 (7 tasks) — critical feature not yet implemented
- **Security/Polish**: T109-T114, T118-T119 (10 tasks) — hardening and deployment readiness

**Effort Estimate**:
- Tests: 15-20 hours (high impact on confidence)
- US4 device limits: 8-12 hours (new functionality)
- Security/documentation: 6-8 hours (quality & readiness)
- **Total convergence**: ~30-40 hours for full completion

**Recommended Prioritization**:
1. **P0**: Missing tests (T078-T092, T099-T106) — run in parallel with US4 implementation
2. **P1**: US4 device limits (T095-T101) — completes all 5 user stories
3. **P2**: Security/polish (T109-T119) — deployment readiness

**Next Step**: Run `/speckit-implement` on this Phase 9 to close all identified gaps and move Phase 3 to completion.

---

*Convergence Assessment completed 2026-11-20*  
*Feature*: Reader Access Session Management (Phase 3)  
*Branch*: `feat/phase-3-reader-access`  
*All 5 user stories + foundation verified; gaps identified and scoped for closure*
