# Phase 3 Implementation Plan: User Story 1 — Verify and Read Online (MVP)

**Phase**: 3 (User Story 1 — MVP)  
**Date**: 2026-11-19  
**Status**: Ready to implement (Phase 1-2 foundation complete)  
**Branch**: `feat/phase-3-reader-access-verify-read`  
**Target completion**: Week of 2026-11-25  

---

## Overview

**Goal**: Reader verifies email with single-use code, receives session cookie, reads protected chapters online.

**MVP Scope**: End-to-end flow for one reader from code request → verification → chapter access.

**Success Criteria**:
- Contract tests pass for all three API endpoints (code-request, verify, chapter)
- Forms render with real state copy from mock data
- E2E tests confirm: request code → enter code → read chapter works
- Session cookie set/validated on protected chapter requests
- No email/session info revealed in error responses

---

## Task Breakdown (10 Tasks)

### Contract Tests (RA-T030, RA-T031, RA-T032)

**RA-T030: Code Request Contract Tests**  
📍 `tests/reader-access/code-request.test.ts`

| Scenario | Expected | Implementation |
| --- | --- | --- |
| Valid email | 202 `request-received` | Email queued; no session created |
| Provider failure (Mailgun down) | 502 `provider-failure` | Graceful error; no retry on client |
| Rate limited (10/day per email) | 429 `limited` | Persist attempt count in Blobs |
| Resend invalidates previous code | 202 + deleted old code | Atomic replace in store |

**Effort**: 2 hours (mocks: Mailgun SDK, Blobs store)  
**Depends on**: RA-T033 function exists

---

**RA-T031: Verify Contract Tests**  
📍 `tests/reader-access/verify.test.ts`

| Scenario | Expected | Implementation |
| --- | --- | --- |
| Valid code | 200 + `verified` state + session cookie | Consume code atomically; create session |
| Invalid code | 400 `code-invalid` | No email hint; no session created |
| Expired code | 410 `code-expired` | Timestamp check; no retry |
| Already used | 410 `code-used` | Query store; deleted after first use |
| Rate limited (5 wrong attempts) | 429 `limited` | Track attempts in code record |
| Concurrent submissions (same code) | Only 1 succeeds, 1 gets 410 | Atomic consume operation required |

**Effort**: 3 hours (concurrent race testing; session lifecycle)  
**Depends on**: RA-T034 function + RA-T022/RA-T023 (store atomicity)

---

**RA-T032: Chapter Access Contract Tests**  
📍 `tests/reader-access/chapter.test.ts`

| Scenario | Expected | Implementation |
| --- | --- | --- |
| Valid session + approved chapter | 200 (chapter JSON) | Manifest validation; session check |
| No session | 401 `request-pending` | Cookie missing/invalid; no content |
| Session expired | 401 `request-pending` | Timestamp check; renew option |
| Unapproved chapter | 404 `content-unavailable` | Edition manifest contains chapters 1-4 only |
| Protected edition in bundle | 404 | Confirm: protected edition NOT in bundle |

**Effort**: 2 hours (manifest fixture; session mocking)  
**Depends on**: RA-T035 function + RA-T027 (manifest reader)

---

### Function Implementation (RA-T033, RA-T034, RA-T035)

**RA-T033: Code Request Function**  
📍 `netlify/functions/reader-code-request.ts`

**Handler**: `POST /api/reader/code-requests`

**Flow**:
1. Parse JSON body: `{ email: string }`
2. Validate email (non-empty, basic format)
3. Check rate limit: 10 codes/day per email, 50/day per IP
4. Generate 6-digit code (cryptographically secure)
5. Hash code + store in Blobs with expiry (10 min)
6. Send email via Mailgun
7. Return 202 + `{ state: 'request-received' }`

**Error Handling**:
- 400: Invalid email
- 429: Rate limit exceeded
- 502: Mailgun failure (accepted for sending → 202; connection error → 502)

**Uses**: `codes.createVerificationCode()`, `store.storeCode()`, `mailer.sendCode()`, `responses.rateLimit()`

**Effort**: 2 hours  
**Blockers**: None (all deps in Phase 2)

---

**RA-T034: Verify Function**  
📍 `netlify/functions/reader-verify.ts`

**Handler**: `POST /api/reader/verifications`

**Flow**:
1. Parse JSON body: `{ email: string, code: string }`
2. Retrieve stored code from Blobs
3. Check expiry: if >10 min old → 410 `code-expired`
4. Check attempts: if ≥5 → 429 `limited`
5. Verify hash: if mismatch → increment attempts; 400 `code-invalid`
6. **Atomic consume**: Delete code from Blobs (happens once only)
7. Create or update `ReaderAccessRecord` with `delete_after` = now + 12 months
8. Create new `DeviceSession` with expires_at = now + 30 days
9. Set session cookie (HttpOnly, Secure, SameSite=Lax)
10. Return 200 + `{ state: 'verified', sessionId: ... }`

**Concurrency**: Two simultaneous verifications of same code → one wins (atomic delete), other gets 410 `code-used`

**Uses**: `codes.verifyCode()`, `codes.isCodeExpired()`, `codes.isCodeLimited()`, `store.getCode()`, `store.deleteCode()` (atomic), `store.storeSession()`, `session-cookie.create()`

**Effort**: 3 hours (concurrency testing; session lifecycle)  
**Blockers**: None

---

**RA-T035: Chapter Access Function**  
📍 `netlify/functions/reader-chapter.ts`

**Handler**: `GET /api/reader/chapters/{chapterId}`

**Flow**:
1. Extract `chapterId` from URL param
2. Retrieve session cookie
3. Query `DeviceSession` from Blobs via session ID
4. Check expiry: if expired → 401 `request-pending`
5. Load edition manifest (from config or Blobs)
6. Validate chapter in manifest: if not approved → 404 `content-unavailable`
7. Load chapter text from `netlify/functions/protected-content/{chapterId}.md`
8. Return 200 + `{ state: 'verified', chapter: {...} }`

**Cache-Control**: `no-store` (session-dependent, do not cache)

**Uses**: `session-cookie.validate()`, `store.getSession()`, `edition.loadManifest()`, `edition.isChapterApproved()`, `responses.chapterResponse()`

**Effort**: 2 hours (manifest fixture; protected content structure)  
**Blockers**: RA-T028 (protected edition location) must be decided

---

### UI Implementation (RA-T036, RA-T037)

**RA-T036: Code Request & Verification Forms**  
📍 `src/app/components/ui/ReaderAccessForm.tsx`  
📍 `src/styles/blocks/reader-access-form.css`

**Component**: React form with two states (request-code, enter-code)

**State request-code**:
- Email input (validated on blur)
- Submit button: "Request code"
- Copy from `readerAccessCopy.states.requestPending` on submit

**State enter-code**:
- 6-digit code input (formatted live)
- Submit button: "Verify"
- Countdown timer (10 minutes)
- "Request a new one" link (triggers resend)
- Copy from `readerAccessCopy.states.requestReceived`, etc.

**Styling**: BEM block `.reader-access-form`, elements `.reader-access-form__input`, `.reader-access-form__submit`, etc.

**Integration**: Wire into `src/app/components/pages/book-site/BookHomePage.tsx`, replace navigation-only handler with actual form submission.

**Effort**: 3 hours (state machine, timer, error states)  
**Blockers**: None (copy already in mock data)

---

**RA-T037: Chapter Reader Page Update**  
📍 `src/app/components/pages/about/EbookPage.tsx`

**Changes**:
1. Add `useEffect` to fetch chapters from `/api/reader/chapters/{chapterId}`
2. Show loading state while fetching
3. Show `request-pending` state if no session (401 response)
4. Show `content-unavailable` if chapter not approved (404 response)
5. Display chapter text if 200 (successful read)
6. Add error boundary for failures

**Copy**: Use `getReaderStateCopy()` from mock data

**Integration**: Route via `src/app/routes.ts` path `/ebook/{chapterId}`

**Effort**: 2 hours  
**Blockers**: RA-T035 function must be deployed

---

### E2E Tests (RA-T038)

**RA-T038: Reader Access E2E Journeys**  
📍 `e2e/reader-access.spec.ts`

**Journey 1: Happy Path (Q-01–Q-05)**
```
1. User lands on /book-home
2. Enters email → sees "code sent" message
3. Checks email (mocked) → sees 6-digit code
4. Enters code → session cookie set
5. Navigates to /ebook/chapter-1 → chapter renders
```

**Journey 2: Code Expiry (Q-07)**
```
1. Request code
2. Wait 11 minutes (or mock time)
3. Try to verify → sees "code expired" message
4. Request new code → succeeds
```

**Journey 3: Invalid Code (Q-11–Q-13)**
```
1. Request code
2. Enter wrong code 5 times → rate limited (429)
3. Request new code → succeeds
4. Verify new code → reads chapter
```

**Test Coverage**:
- Happy path
- Code expiry
- Rate limiting
- Concurrent requests (same code)
- Session persistence across pages

**Effort**: 2–3 hours (mocking Mailgun; time/concurrency handling)  
**Blockers**: RA-T036, RA-T037 UI must be in place

---

## Implementation Sequence

| Phase | Tasks | Effort | Days | Parallelizable |
| --- | --- | --- | --- | --- |
| 1. Tests | RA-T030, RA-T031, RA-T032 | 7 hours | 1 | Partial (after functions stubbed) |
| 2. Functions | RA-T033, RA-T034, RA-T035 | 7 hours | 1–2 | Full (independent) |
| 3. UI | RA-T036, RA-T037 | 5 hours | 1 | Partial (after functions deployed) |
| 4. E2E | RA-T038 | 2–3 hours | 1 | After UI complete |

**Critical Path**: Functions → UI → E2E (3–4 days if sequential; 2 days if 2 devs)

---

## Branch & PR Strategy

**Branch name**: `feat/phase-3-reader-access-verify-read`

**Single PR** covering all 10 tasks (or separate PRs by layer):

**Option A (Monolithic - Recommended for speed)**:
- One PR with all tests, functions, UI
- Label: `phase-3`, `reader-access`, `user-story-1`

**Option B (Layered - Recommended for review)**:
- PR 1: Tests only (RA-T030–T032)
- PR 2: Functions (RA-T033–T035)
- PR 3: UI + E2E (RA-T036–T038)

---

## Quality Gates

Before merging:
- [ ] All 10 tasks implemented
- [ ] Contract tests pass (100% coverage of scenarios)
- [ ] Functions handle all error states
- [ ] UI renders all states from mock data
- [ ] E2E happy path + 3 edge cases verified
- [ ] No sensitive info in error responses (no email hints)
- [ ] Session cookies: HttpOnly, Secure, SameSite=Lax set
- [ ] Rate limit headers present in responses
- [ ] No protected chapter text in client bundle (verify via build)
- [ ] All CI checks green
- [ ] Lighthouse score maintained

---

## Known Blockers & Mitigations

| Item | Status | Mitigation |
| --- | --- | --- |
| Protected edition location (RA-T028) | Blocking RA-T035 | Use placeholder `/protected-content/` for now; real chapters come from approved manifest |
| Mailgun API credentials | Blocking tests | Mock in tests; use test credentials in Netlify preview env |
| Email verification (Q-01–Q-05) | Manual step in E2E | Capture sent mail from Mailgun test webhook |
| Session persistence across page reloads | Blocking RA-T037 | Cookies auto-restore; test with Playwright `context.cookies()` |

---

## Checkpoint & Next Phase

**After Phase 3 merges**:
- MVP is live (single reader flow: code → verify → read)
- Ready for Phase 4 (session renewal, sign-out)
- Ready for Phase 5 (truthful feedback, newsletter separation)

---

**Status**: ✅ Ready to start. All Phase 1-2 dependencies met. Beginning Phase 3 immediately.

