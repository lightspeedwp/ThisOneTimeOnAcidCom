# Tasks: Reader Access Session Management (Phase 3)

**Input**: Phase 3 reader session lifecycle management with 30-day rolling window, device tracking, and secure session validation

**Prerequisites**: Phase 2 (email verification) implementation complete

**Tests**: Unit tests via Vitest; E2E tests via Playwright (reuse Phase 2 patterns)

**Organization**: Tasks organized by user story (priority order) to enable independent implementation and testing

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1-US5)
- **File paths**: TypeScript, Netlify Functions, Blobs storage

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and session module structure

- [ ] T001 Create session management module structure in `src/session/`
- [ ] T002 [P] Initialize session models in `src/session/types.ts` (Session, Device, Activity interfaces)
- [ ] T003 [P] Setup Blobs adapter in `src/session/store.ts` for session persistence
- [ ] T004 [P] Install dependencies: `@netlify/blobs`, `crypto` module (verify available)
- [ ] T005 Setup test structure in `tests/session/` with unit and E2E subdirectories
- [ ] T006 Create constants file `src/session/constants.ts` (30-day window, device limits, timeouts)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core session infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Implement session token generation in `src/session/token.ts` (cryptographically secure 256-bit)
- [ ] T008 Implement device fingerprinting in `src/session/device.ts` (User-Agent + IP + timezone + screen resolution)
- [ ] T009 [P] Implement constant-time token comparison in `src/session/security.ts` (timing attack prevention)
- [ ] T010 [P] Implement session storage adapter in `src/session/store.ts` (Blobs read/write with strong consistency)
- [ ] T011 [P] Implement Session entity class in `src/session/models/session.ts` with validation rules per data-model.md
- [ ] T012 Implement Device entity class in `src/session/models/device.ts` (optional; can derive from Session)
- [ ] T013 Implement Activity logger in `src/session/models/activity.ts` (denormalized timestamps in Session)
- [ ] T014 [P] Create session validation middleware in `src/session/middleware.ts` (cookie extraction, expiry check, termination check)
- [ ] T015 [P] Create session factory in `src/session/factory.ts` (create new session with proper initialization)
- [ ] T016 Setup logging/audit system in `src/session/audit.ts` for session events
- [ ] T017 Create error types in `src/session/errors.ts` (InvalidSession, ExpiredSession, TerminatedSession, etc.)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Seamless Chapter Access After Email Verification (Priority: P1)

**Goal**: Reader verifies email and immediately accesses chapters without additional login steps. Session persists across browser tabs and page reloads.

**Independent Test**: After email verification, reader can access protected chapter content without re-authenticating; session persists across tabs/reloads.

### Implementation for User Story 1

- [ ] T018 [US1] Create session creation endpoint `netlify/functions/reader-session-create.ts` (POST /api/reader/session)
- [ ] T019 [P] [US1] Create session validation middleware in `src/session/middleware/validate.ts`
- [ ] T020 [P] [US1] Create chapter access endpoint wrapper `netlify/functions/reader-chapter-access.ts` (GET /api/reader/chapter/:chapterId)
- [ ] T021 [US1] Create session initialization on verification redirect in `netlify/functions/reader-session-init.ts`
- [ ] T022 [P] [US1] Add session validation to Netlify Edge Function middleware in `netlify/edge-functions/session-guard.ts`
- [ ] T023 [US1] Create session context/provider in `src/session/context.ts` for browser-side session state
- [ ] T024 [P] [US1] Create unit tests in `tests/session/unit/session-creation.test.ts`
- [ ] T025 [P] [US1] Create unit tests in `tests/session/unit/session-validation.test.ts`
- [ ] T026 [US1] Create E2E test in `tests/session/e2e/chapter-access-after-verification.test.ts`

**Checkpoint**: User Story 1 fully functional and independently testable

---

## Phase 4: User Story 2 - 30-Day Rolling Session Renewal (Priority: P1)

**Goal**: Sessions automatically extend to 30 days from last activity. Reader can read continuously without unexpected logouts.

**Independent Test**: Session expiry timestamp extends by 30 days after any verified activity within the 30-day window.

### Implementation for User Story 2

- [ ] T027 [US2] Implement session renewal logic in `src/session/models/session.ts` (renewSession method)
- [ ] T028 [P] [US2] Create session renewal on chapter access in `netlify/functions/reader-session-renew.ts` (POST /api/reader/session/renew)
- [ ] T029 [US2] Integrate renewal into chapter access middleware in `src/session/middleware/validate.ts`
- [ ] T030 [P] [US2] Create renewal endpoint integration in `netlify/edge-functions/session-renew.ts`
- [ ] T031 [US2] Create browser-side session renewal timer in `src/session/context.ts`
- [ ] T032 [P] [US2] Create unit tests in `tests/session/unit/session-renewal.test.ts`
- [ ] T033 [P] [US2] Create E2E test in `tests/session/e2e/rolling-session-renewal.test.ts`

**Checkpoint**: User Stories 1 AND 2 both fully functional independently

---

## Phase 5: User Story 5 - Secure Session Termination (Priority: P1)

**Goal**: Reader can explicitly sign out, terminating session immediately. Expired sessions automatically terminate. Terminated sessions grant no further access.

**Independent Test**: After sign-out or expiry, session cookie is invalidated and chapter access is denied.

### Implementation for User Story 5

- [ ] T034 [US5] Implement session termination logic in `src/session/models/session.ts` (terminateSession method)
- [ ] T035 [P] [US5] Create session logout endpoint `netlify/functions/reader-session-logout.ts` (POST /api/reader/session/logout)
- [ ] T036 [US5] Create logout button/flow in browser UI (reader-facing)
- [ ] T037 [P] [US5] Create session expiry enforcement in middleware `src/session/middleware/validate.ts`
- [ ] T038 [US5] Create edge function to clear expired session cookies `netlify/edge-functions/session-expiry-handler.ts`
- [ ] T039 [P] [US5] Create unit tests in `tests/session/unit/session-termination.test.ts`
- [ ] T040 [P] [US5] Create E2E test in `tests/session/e2e/session-termination.test.ts`

**Checkpoint**: User Stories 1, 2, AND 5 fully functional independently (core MVP complete)

---

## Phase 6: User Story 3 - Activity Tracking for Session Lifecycle (Priority: P2)

**Goal**: System records session creation, renewal, and termination events for audit and analytics.

**Independent Test**: Activity timestamps are recorded in persistent storage for each session event.

### Implementation for User Story 3

- [ ] T041 [US3] Implement activity logging in `src/session/models/activity.ts`
- [ ] T042 [P] [US3] Create activity event recording in session operations
- [ ] T043 [US3] Create activity audit trail endpoint `netlify/functions/reader-session-activity.ts` (GET /api/reader/session/activity)
- [ ] T044 [P] [US3] Create activity storage adapter in `src/session/store.ts` (append-only activity log)
- [ ] T045 [US3] Create analytics dashboard endpoint `netlify/functions/admin-session-analytics.ts` (GET /api/admin/analytics/sessions)
- [ ] T046 [P] [US3] Create unit tests in `tests/session/unit/activity-tracking.test.ts`
- [ ] T047 [P] [US3] Create E2E test in `tests/session/e2e/activity-tracking.test.ts`

**Checkpoint**: User Story 3 fully functional independently

---

## Phase 7: User Story 4 - Concurrent Device Limit Enforcement (Priority: P2)

**Goal**: Readers can maintain active sessions on limited concurrent devices (e.g., 2-3). Exceeding limit requires device selection or re-verification.

**Independent Test**: System enforces max concurrent sessions per reader; exceeding limit triggers device selection or re-verification flow.

### Implementation for User Story 4

- [ ] T048 [US4] Create concurrent device limit configuration in `src/session/constants.ts`
- [ ] T049 [P] [US4] Implement device counting in `src/session/models/device.ts`
- [ ] T050 [US4] Implement device limit enforcement in `src/session/factory.ts` (createSession)
- [ ] T051 [P] [US4] Create device selection endpoint `netlify/functions/reader-device-selection.ts` (GET/POST /api/reader/device-selection)
- [ ] T052 [US4] Create device termination logic in `src/session/models/session.ts` (terminateByDeviceId)
- [ ] T053 [P] [US4] Create browser-side device selection UI component `src/components/DeviceSelection.tsx`
- [ ] T054 [US4] Create re-verification flow for device limit exceeded in verification endpoint
- [ ] T055 [P] [US4] Create unit tests in `tests/session/unit/device-limit.test.ts`
- [ ] T056 [P] [US4] Create E2E test in `tests/session/e2e/concurrent-device-limit.test.ts`

**Checkpoint**: All 5 user stories fully functional independently

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements affecting multiple user stories

- [ ] T057 [P] Performance testing & optimization in `tests/session/performance/session-latency.test.ts`
- [ ] T058 [P] Security hardening review (constant-time comparison, HttpOnly/Secure/SameSite flags, rate limiting)
- [ ] T059 [P] Error handling standardization (consistent error format, error codes, logging)
- [ ] T060 [P] Documentation updates (README, CONTRIBUTING, troubleshooting guide)
- [ ] T061 Integration test for entire flow in `tests/session/integration/full-session-lifecycle.test.ts`
- [ ] T062 [P] Add session management admin dashboard `netlify/functions/admin-sessions.ts`
- [ ] T063 Cleanup test fixtures and teardown
- [ ] T064 [P] Code review & refactoring (security best practices, JSDoc comments, TypeScript strict mode)
- [ ] T065 Setup continuous monitoring & alerting (unusual session rates, latency degradation)
- [ ] T066 Validation & acceptance testing against spec.md (all SC and FR requirements verified)

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Setup (Phase 1)**: No dependencies → Start immediately
2. **Foundational (Phase 2)**: Depends on Setup → BLOCKS all user stories
3. **User Stories (Phase 3-7)**: All depend on Foundational phase
4. **Polish (Phase 8)**: Depends on desired user stories being complete

### Parallel Opportunities

- **Phase 1**: All [P] tasks can run in parallel
- **Phase 2**: All [P] tasks can run in parallel
- **Phase 3-7**: Different user stories can run in parallel; [P] tasks within stories can parallelize
- **Phase 8**: All [P] tasks can run in parallel

### MVP Scope

**Complete Setup + Foundational + US1 + US2 + US5** = 40 tasks total (23 user story + 17 foundational)

---

## Implementation Strategy

### MVP First
1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3-5: US1 + US2 + US5
4. Test and deploy

### Incremental Delivery
- Each user story independently testable and deployable
- Stories can ship in priority order: US1 → US2 → US5 → US3 → US4

### Parallel Team Strategy
- Developer 1: Phase 1 + Phase 2 Setup
- Developer 2: Phase 2 Middleware + Validation
- Developer 3: Phase 3 (US1) + Phase 4 (US2)
- Developer 4: Phase 5 (US5) + Phase 6 (US3)
- Developer 5: Phase 7 (US4) + Phase 8 (Polish)

---

**Total Tasks**: 66  
**MVP Tasks**: 40 (Setup + Foundational + US1 + US2 + US5)  
**Full Scope**: 66 (All user stories + polish)

---

*Generated for Phase 3: Reader Access Session Management*  
*Feature Branch*: `feat/phase-3-reader-access`  
*Last Updated*: 2026-11-20

