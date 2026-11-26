# Tasks: Reader access

**Input**: Design documents from `.github/specs/005-reader-access/`
**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/reader-access-functions.md](contracts/reader-access-functions.md), [quickstart.md](quickstart.md)

Status values: Planned, Blocked, Partial, Implemented, Verified, Regressed,
Accepted. A checked box is never set without evidence recorded in
[verification.md](verification.md). Statuses were last reconciled against
`main` at `0691019` on 2026-11-26 (see the read-back in verification.md).

**Tests**: included because constitution principle VII requires layered testing
for every change. Unit and contract results are recorded in verification.md;
no Playwright journey has a recorded run.

**Stage rule (RA-012)**: each phase from Phase 1 onward is one bounded
implementation stage. Before any task in a stage starts: exact preview, Ash's
approval, fresh baseline, path check; afterwards: read-back and evidence. The
plan's implementation gate fails until RA-T005–RA-T009 are resolved.

## Format: `[ID] [P?] [Story] Description`

- **RA-T###**: 005 task ID. The `RA-` prefix keeps these distinct from 004's `T001`–`T051`.
- **[P]**: can run in parallel (different files, no dependency on an incomplete task).
- **[US#]**: derived user story (spec.md has no user-story section; stories below are derived from its requirements and acceptance scenarios).

## Derived user stories

| Story | Priority | Goal | Requirements | Quickstart |
| --- | --- | --- | --- | --- |
| US1 | P1 🎯 MVP | A reader verifies an email with a code and reads the edition online | RA-001, RA-002, RA-003, RA-006, RA-008, RA-010 | Q-01–Q-05, Q-07, Q-11–Q-13 |
| US2 | P2 | A returning reader keeps, renews or ends access on the same device | RA-004, RA-005 | Q-06–Q-09 |
| US3 | P2 | Existing forms give truthful feedback and never subscribe readers | RA-007, RA-008 | Q-10 |
| US4 | P3 | A reader recovers after a confirmed redemption whose session did not complete | RA-009 | — (deferred) |

---

## Phase 0: Preparation and owner decisions

Existing IDs and meanings are kept.

- [ ] RA-T001 Re-read main, destination availability and canonical containment for .github/specs/005-reader-access/ — Planned. 2026-11-26 audit re-read main for this reconciliation; containment and destination checks not recorded. Maps RA-011/RA-012.
- [ ] RA-T002 Reconcile 004 with Linear register v1.13.0 and src/content/book/05-design-reader-decision-register.md — Planned. Maps RA-011.
- [ ] RA-T003 Reconcile all six .github/specs/004-book-website-make/contracts/prompt-3* files as one group, preserving repeated IDs — Planned. Maps RA-011.
- [ ] RA-T004 Establish current Make/repository parity or record the smallest missing evidence in .github/specs/005-reader-access/sources.md — Planned. Maps RA-012.
- [x] RA-T005 `src/content/book/05-design-reader-decision-register.md`: Resolve email provider, transactional sending and provider retention/deletion (research R-10) and storage choice (R-02) — **RESOLVED (2026-11-19):** Mailgun for transactional SMTP; Netlify Blobs for storage (R-02). Maps RA-003/RA-006.
- [x] RA-T006 `src/content/book/05-design-reader-decision-register.md`: Confirm edition manifest, manuscript availability, rights, credits and publication authority (R-03) — **APPROVED (2026-11-19):** Edition chapters 1–4 (01-part-1-early-life through 04-part-4-contentment); source: main; author Ash Shaw, copyright 2026 This One Time; no third-party content; publication authority: Ash approves chapters, staged releases. Maps RA-010.
- [x] RA-T007 `src/content/book/05-design-reader-decision-register.md`: Select recovery duration/start, exact renewal duration within thirty days, concurrency beyond the recovery-first race, revocation, resend cooldown and request limits (R-05, R-08, R-09). Already settled by Clarifications: expiry start (Q2), no renewal ceiling (Q3), recovery-first race (Q4), six-digit codes with five attempts (Q5) — **APPROVED (2026-11-19):** Renewal 30d; recovery 30d from last auth; resend cooldown 60s; per-email rate 10/24h; per-network rate 50/24h; revocation via sign-out only. Maps RA-003/RA-004/RA-009.
- [x] RA-T008 `src/content/book/05-design-reader-decision-register.md`: Confirm newsletter destination, double opt-in, wording and deletion (R-11) — **RESOLVED (2026-11-19):** Brevo for list subscriptions; double opt-in via Brevo workflows. Wording and deletion procedure deferred to implementation. Maps RA-007.
- [x] RA-T009 `src/content/book/05-design-reader-decision-register.md`: Confirm privacy notice, reviewer, operator and deletion procedure — **APPROVED (2026-11-19):** Privacy reviewer: Ash (product owner); notice drafted at RA-T021, approved before Phase 1 ships; data controller: This One Time (Ash); support access: Ash sole authorized operator, all access logged; deletion: scheduled cleanup (12-month inactivity TTL). Maps RA-006.
- [ ] RA-T017 Run the Spec Kit regression baseline for feature 005 (constitution I/VII) and record the result in .github/specs/005-reader-access/verification.md — Planned; not run. Maps RA-012.
- [ ] RA-T018 Align .github/specs/005-reader-access/decisions.md, crosswalk.md, research.md, tasks.md and plan.md with Clarifications Q1–Q5 and the `src/content/` move (decision 3 settled, renewal ceiling, race and attempt limit settled, Netlify Functions direction, 3A guide colours carry no authority, current bundling state) — Implemented on docs/reader-access-alignment (PR #611); merge not confirmed on main `0691019`. Awaiting Ash's review. Maps RA-011.

---

## Phase 1: Setup (shared infrastructure)

- [x] RA-T019 Create netlify/functions/ and netlify/lib/reader-access/, and confirm in netlify.toml that function paths under /api/reader/ are served before the `/*` → `/index.html` fallback (R-01) — ✅ VERIFIED (2026-11-19): netlify.toml lines 40–42 route /api/reader/* before SPA fallback; directories created. Maps RA-001.
- [x] RA-T020 Add Mailgun SDK and Netlify Blobs client to package.json and package-lock.json with npm on Node 24; validate lockfile consistency — ✅ COMPLETE (2026-11-19): mailgun.js@^9.3.0, @netlify/blobs@^6.2.0, form-data@^4.0.0 in package.json. Maps RA-006.
- [x] RA-T021 [P] Create src/app/data/mock/reader-access.ts holding visitor copy for every reader-visible state (`request-pending`, `request-received`, `delivery-uncertain`, `verified`, `code-invalid`, `code-expired`, `code-used`, `limited`, `provider-failure`, `content-unavailable`); code wording must say "within 10 minutes of requesting it" — ✅ COMPLETE (2026-11-19): All 10 states present with correct wording; helper function implemented. Maps RA-003/RA-008.

---

## Phase 2: Foundational (blocks every user story)

- [x] RA-T022 Implement the storage adapter in netlify/lib/reader-access/store.ts with an atomic consume-once operation; "consume at most once, atomically" — Verified (2026-11-26): `consumeCode()` in netlify/lib/reader-access/store.ts writes a `code-consumed:` marker with Netlify Blobs `onlyIfNew` (PR #652); tests/reader-access/consume-code.test.ts and the concurrency case in session-create.test.ts pass. Maps RA-002/RA-009.
- [x] RA-T023 [P] Implement code creation and checking in netlify/lib/reader-access/codes.ts: `code_hash` is a "Salted hash; the plain code is never stored"; `expires_at` = "`created_at` + 10 minutes"; format and attempt limit per R-05 — Verified (2026-11-26): `createVerificationCode(plainCode)` stores a salted scrypt hash of the emailed code, 10-minute expiry, five attempts, timing-safe compare; tests/reader-access/codes.test.ts passes. Maps RA-002/RA-003.
- [x] RA-T024 [P] Implement session cookie helpers in netlify/lib/reader-access/session-cookie.ts: `HttpOnly`, `Secure`, `SameSite=Lax`, first-party; `session_id` is an "Opaque random value stored in the cookie; contains no email" — Verified (2026-11-26): HttpOnly, Secure, SameSite=Lax cookie with an opaque 256-bit token; tests/reader-access/session-cookie.test.ts passes. Maps RA-005.
- [x] RA-T025 [P] Implement JSON response helpers in netlify/lib/reader-access/responses.ts that set `Cache-Control: no-store` and a `state` value, and never reveal whether an email is known — Implemented (2026-11-26): `SESSION_SECURITY_HEADERS` set `Cache-Control: no-store`; state values defined in responses.ts. Maps RA-008.
- [x] RA-T026 [P] Implement the email adapter in netlify/lib/reader-access/mailer.ts that distinguishes "accepted for sending" from provider failure and never claims delivery — Implemented (2026-11-26): mailer.ts returns accepted, failed or uncertain and never claims delivery; Mailgun `username: 'api'` added in PR #652. Not exercised against live Mailgun. Maps RA-008.
- [x] RA-T027 [P] Implement the edition manifest reader in netlify/lib/reader-access/edition.ts; "returns 'content unavailable' for any chapter not in an approved manifest" — Implemented (2026-11-26): EditionReader returns content unavailable for unapproved chapters. The manifest is still an in-memory default, not the approved chapters 1–4 (see RA-T028). Maps RA-010.
- [ ] RA-T028 Ensure src/app/utils/bookContentLoader.ts cannot bundle the protected edition (its eager `import.meta.glob` matches `BOOK_SOURCE_GLOBS` in src/app/utils/bookContentSource.ts, currently the six chapter directories under `/src/content/book/`) and place the edition source in `netlify/functions/protected-content/` per decision 11 (R-03, Constitution IV) so it is server-only and inaccessible to client globs — Partial (2026-11-26): `BOOK_SOURCE_DIRECTORIES = []` keeps chapters out of the client bundle (RA-T054). netlify/functions/protected-content/ does not exist and no approved chapter text is served; reader-chapter.ts returns placeholder text. Maps RA-001.
- [x] RA-T029 [P] Add unit tests in tests/reader-access/codes.test.ts, tests/reader-access/session-cookie.test.ts and tests/reader-access/store.test.ts covering hashing, ten-minute expiry, single consumption and cookie attributes — Verified (2026-11-26): codes.test.ts, session-cookie.test.ts and store.test.ts pass. Maps RA-002/RA-003/RA-005.

**Checkpoint**: foundation ready; user stories can start.

---

## Phase 3: User Story 1 — Verify and read online (P1) 🎯 MVP

**Goal**: request a code, verify it within ten minutes of the request, read chapters through the server.
**Independent test**: quickstart Q-01–Q-05, Q-07 and Q-11–Q-13 pass on a preview with placeholder chapters.

### Tests for User Story 1

- [ ] RA-T030 [P] [US1] Contract tests in tests/reader-access/code-request.test.ts: 202 `request-received`, 502 `provider-failure`, 429 `limited`, 400 `code-invalid`; no session, reader record or newsletter subscription created — Open (2026-11-26): tests/reader-access/code-request.test.ts does not exist; reader-code-request.ts has no contract test.
- [ ] RA-T031 [P] [US1] Contract tests in tests/reader-access/verify.test.ts: 200 `verified` with cookie, 400 `code-invalid`, 410 `code-expired`, 410 `code-used`, 429 `limited`; two concurrent submissions of one code produce exactly one success — Partial (2026-11-26): session-create.test.ts covers success with cookie, replay and one-of-two concurrent submissions. Spec 006's contract replaced this task's states (201 `verified`, 401 `verification_failed`) — see decision 12 in decisions.md.
- [x] RA-T032 [P] [US1] Contract tests in tests/reader-access/chapter.test.ts: 200 only with an active session and approved chapter; 401 `request-pending` with no content; 404 and 503 `content-unavailable` — Verified (2026-11-26): tests/reader-access/chapter-access.test.ts covers 200 with a valid session, 401 without one, 404 `content-unavailable` and 500 on storage failure.

### Implementation for User Story 1

- [x] RA-T033 [US1] Implement netlify/functions/reader-code-request.ts (`POST /api/reader/code-requests`); "Creates a VerificationCode with `created_at` = server time"; resend invalidates the previous `issued` code — Implemented (2026-11-26): reader-code-request.ts hashes the emailed code and overwrites any earlier code on resend. No contract test (RA-T030). Maps RA-002/RA-003.
- [ ] RA-T034 [US1] Implement netlify/functions/reader-verify.ts (`POST /api/reader/verifications`): consume the code atomically; create or update ReaderAccessRecord with `delete_after` = "`last_authenticated_at` + 12 months"; start a DeviceSession with `expires_at` "≤ 30 days after the latest fresh-code verification or renewal" — Partial (2026-11-26): `/api/reader/verifications` re-exports reader-session-create.ts (spec 006 T017), which consumes the code atomically and starts a 30-day session. No ReaderAccessRecord with `delete_after` is written anywhere. Maps RA-002/RA-004/RA-006.
- [ ] RA-T035 [US1] Implement netlify/functions/reader-chapter.ts (`GET /api/reader/chapters/{chapterId}`) using the edition manifest and session check — Partial (2026-11-26): reader-chapter.ts checks the session and the manifest, and `/api/reader/chapters/:chapterId` is routed in public/_redirects (PR #652), but the body is placeholder text until RA-T028 places the edition. Maps RA-001/RA-010.
- [x] RA-T036 [US1] Build the email and code forms in src/app/components/ui/ReaderAccessForm.tsx with BEM styles in src/styles/blocks/reader-access-form.css and copy from src/app/data/mock/reader-access.ts; wire them into src/app/components/pages/book-site/BookHomePage.tsx, replacing the navigation-only submit handler — Implemented (2026-11-26): src/app/components/ui/ReaderAccessForm.tsx and src/styles/blocks/reader-access-form.css exist; wired into BookHomePage (RA-T056). Maps RA-003/RA-008.
- [x] RA-T037 [US1] Change src/app/components/pages/about/EbookPage.tsx (route `ebook` in src/app/routes.ts) to load chapters from `/api/reader/chapters/{chapterId}` and show `request-pending` and `content-unavailable` states — Implemented (2026-11-26): EbookPage loads chapters through ReaderAccessGate from `/api/reader/chapters/{chapterId}` (RA-T057). Maps RA-001/SC-004.
- [ ] RA-T038 [US1] Add Playwright journeys in e2e/reader-access.spec.ts for Q-01–Q-05, Q-07 and Q-11–Q-13 — Implemented, not run: e2e/reader-access.spec.ts exists; no Playwright run is recorded.

**Checkpoint**: US1 is the MVP and can be previewed on its own.

---

## Phase 4: User Story 2 — Return, renew and sign out (P2)

**Goal**: same-profile returning access for up to thirty days per fresh-code verification or renewal, repeatable without a ceiling; sign-out ends server access.
**Independent test**: quickstart Q-06–Q-09.

- [x] RA-T039 [P] [US2] Contract tests in tests/reader-access/session.test.ts: `GET /api/reader/session` 200 with `expiresAt` or 401; `DELETE` returns 204 even when already ended; renewal moves `expiresAt` forward by up to thirty days — Verified (2026-11-26): tests/reader-access/session.test.ts (spec 006 US1) covers session status and sign-out.
- [x] RA-T040 [US2] Implement netlify/functions/reader-session.ts (GET status, DELETE sign-out that ends the server session and clears the cookie) — Implemented (2026-11-26): reader-session.ts GET returns status; DELETE calls `terminateSession` and clears the cookie. Maps RA-004/RA-005.
- [x] RA-T041 [US2] Extend netlify/functions/reader-verify.ts so a fresh-code verification on a profile with an active session renews it ("renewals repeat with no overall ceiling"); exact duration per RA-T007 — Implemented (2026-11-26): a fresh-code verification on a device with a session rotates it to a new 30-day window (`rotateDeviceSession`), with no ceiling. Maps RA-004.
- [x] RA-T042 [US2] Add session status and a sign-out control to src/app/components/pages/about/ebook/EbookReaderNav.tsx with copy from src/app/data/mock/reader-access.ts — Implemented (2026-11-26): EbookReaderNav shows session expiry and calls DELETE on reader-session for sign-out. Maps RA-005.
- [ ] RA-T043 [US2] Add Playwright journeys in e2e/reader-access-session.spec.ts for Q-06–Q-09 — Implemented, not run: e2e/reader-access-session.spec.ts exists; no Playwright run is recorded.

---

## Phase 5: User Story 3 — Truthful feedback and newsletter separation (P2)

**Goal**: no page claims access, delivery or subscription without evidence; reading never subscribes anyone.
**Independent test**: quickstart Q-10, plus review of the three pages below.

- [x] RA-T044 [P] [US3] Replace the unverified "Success" and "You're in." claims in src/app/components/pages/book-site/ThankYouPage.tsx with neutral acknowledgement copy from src/app/data/mock/reader-access.ts (register v1.9.0 "Truthful form feedback") — Implemented (2026-11-26): ThankYouPage.tsx no longer contains the unverified claims (see phases/phase-5-tasks.md). Maps RA-008.
- [x] RA-T045 [P] [US3] Make the waitlist submit the primary action and replace "You're on the list." and the success treatment in src/app/components/pages/book-site/WaitlistPage.tsx with neutral acknowledgement until the newsletter provider confirms — Implemented (2026-11-26): WaitlistPage.tsx no longer contains "You're on the list." (see phases/phase-5-tasks.md). Maps RA-007/RA-008.
- [x] RA-T046 [US3] Add tests/reader-access/newsletter-separation.test.ts asserting no reader-access function calls a newsletter API, and e2e/reader-access-newsletter.spec.ts for Q-10 — Verified (2026-11-26): tests/reader-access/newsletter-separation.test.ts passes; e2e/reader-access-newsletter.spec.ts exists, not run. Maps RA-007/SC-005.

---

## Phase 6: User Story 4 — Recovery after incomplete session (P3)

**Blocked until RA-T007 settles recovery duration, start and linked-tab identity (research R-09). The recovery-first race is settled by Clarifications Q4.**

- [x] RA-T047 [US4] Add the RecoveryAttempt entity and its state transitions to .github/specs/005-reader-access/data-model.md and the recovery responses to contracts/reader-access-functions.md — Implemented: RecoveryAttempt is in data-model.md and recovery responses are in contracts/reader-access-functions.md. Maps RA-009.
- [ ] RA-T048 [US4] Implement the decided recovery path in netlify/functions/reader-verify.ts with tests in tests/reader-access/recovery.test.ts — Regressed (2026-11-26): PR #653 replaced reader-verify.ts with a re-export of reader-session-create.ts, and no function now calls `storeRecoveryAttempt`. `netlify/__tests__/reader-recovery.contract.test.ts` is `describe.skip` and only tests storage helpers. Maps RA-009.

---

## Phase 7: Polish and cross-cutting

- [ ] RA-T049 [P] Run the keyboard, focus, screen-reader, contrast and responsive review (Q-14) for every reader-access form and state and record findings in .github/specs/005-reader-access/verification.md; WCAG 2.2 AAA is a target, not a conformance claim — Partial: accessibility-audit.md records a code review with screen-reader testing still pending.
- [x] RA-T050 [P] Implement deletion of ReaderAccessRecord entries past `delete_after` in netlify/functions/reader-retention.ts as a scheduled function — Implemented (2026-11-26): reader-retention.ts uses the Blobs store API and runs `@daily` (PR #652). Nothing writes ReaderAccessRecord yet (RA-T034), so it has nothing to delete. Maps RA-006.
- [ ] RA-T051 Read back each saved stage and record actual results, revision and environment in .github/specs/005-reader-access/verification.md — Ongoing: 2026-11-26 read-back recorded in verification.md. Maps RA-012/SC-007.
- [x] RA-T052 Establish which host serves production (Netlify via netlify.toml or the Vercel GitHub app) and whether a push to main deploys, before any manual push (research R-12) — Decided: Netlify serves production via netlify.toml (deployment-validation.md). The Vercel GitHub app also builds PR previews and is subject to a daily free-tier deployment limit. Maps RA-012.

---

## Phase 8: Convergence

Specification convergence and blockers resolved during review and implementation discovery.

- [x] RA-T053 RESOLVED: Amend Constitution IV content location — editorial content now lives in `src/content/` (PR #608); approve amendment to Constitution IV (`.specify/memory/constitution.md`) to reflect this as the canonical location per Constitution Amendment process. Decision: amend Constitution IV. Unblocks RA-T028 and R-03. Maps RA-012/Constitution IV.
- [x] RA-T054 RESOLVED: Protected edition location decided — store in `netlify/functions/protected-content/` as a server-only location that cannot be matched by client `import.meta.glob` patterns. Approved chapters remain in `src/content/book/` and bundled by `bookContentLoader`; protected edition is served exclusively through chapter function (RA-035/RA-T037) per RA-001, SC-004. Maps RA-001/SC-004.
- [x] RA-T055 Fix response module imports in netlify/functions/ (reader-code-request.ts, reader-verify.ts, reader-chapter.ts) — imports correctly use responses.invalid(), responses.verified(), responses.received(), responses.expired(), responses.used(), responses.limited(), responses.error(), responses.unavailable(), responses.content() as exported from netlify/lib/reader-access/responses.ts. RESOLVED. Maps RA-033/RA-034/RA-035.
- [x] RA-T056 Wire ReaderAccessForm component into src/app/components/pages/book-site/BookHomePage.tsx routing — form component is now integrated into BookHomePage with onCodeRequested and onCodeVerified callbacks. RESOLVED. Maps RA-036/RA-003/RA-008.
- [x] RA-T057 Update src/app/components/pages/about/EbookPage.tsx to use /api/reader/chapters/{chapterId} endpoint — EbookPage now imports ReaderAccessGate component for session validation and chapter loading from reader API. RESOLVED (partial integration). Maps RA-037/RA-001/SC-004.
- [x] RA-T058 Create E2E test suite in e2e/reader-access.spec.ts with Playwright journeys — 13 test cases cover Q-01–Q-05 (request/verify flow), Q-07 (session handling), Q-11–Q-13 (error states: expired, used, limited). RESOLVED. Maps RA-038/US1/SC-003.

---

## Remaining to finish spec 005 (2026-11-26)

Reconciled against `main` at `0691019`. Spec 006 now owns the session model
(token index, device sessions) that US1 and US2 run on, so the items below are
what spec 005 still needs on top of it.

**Needs Ash first**

1. **Contract authority** (decision 12): spec 006's contract replaced spec
   005's response states for verification (201 `verified`, 401
   `verification_failed` instead of 200, 400 `code-invalid`, 410
   `code-expired`/`code-used`, 429 `limited`). Confirm which contract governs,
   then update [contracts/reader-access-functions.md](contracts/reader-access-functions.md)
   or the functions to match. Blocks RA-T030 and RA-T031.
2. **Protected edition content** (RA-T028, RA-T035): place the approved
   chapters 1–4 in the server-only location from RA-T054. Until then
   reader-chapter.ts serves placeholder text.

**Implementation**

3. RA-T034: write a ReaderAccessRecord with `delete_after` on verification, so
   RA-T050's daily retention has something to delete (RA-006).
4. RA-T048: restore the recovery path lost when PR #653 replaced
   reader-verify.ts, and un-skip `netlify/__tests__/reader-recovery.contract.test.ts`.
5. RA-T030: add `tests/reader-access/code-request.test.ts`.

**Verification**

6. RA-T038, RA-T043, RA-T046: run the Playwright journeys and record results.
7. RA-T049: finish screen-reader testing in accessibility-audit.md.
8. RA-T017, RA-T051: run the Spec Kit regression baseline and record the
   final read-back.

Phase 0 items RA-T001–RA-T004 and RA-T018 are documentation reconciliation
with 004 and the Linear register; they do not block the reader flow.

**ID note:** the content-delivery tasks in [phases/phase-6-tasks.md](phases/phase-6-tasks.md)
were first labelled RA-T047–RA-T056, clashing with this file. They are now
RA-CD01–RA-CD10; that file maps the old labels.

---

## Retired IDs

RA-T010–RA-T016 from the previous task list are retired and not reused.

| Retired | Replaced by |
| --- | --- |
| RA-T010 preview email/code request and verification states | RA-T030–RA-T038 |
| RA-T011 preview recovery, renewal, revocation and sign-out | RA-T039–RA-T043, RA-T047–RA-T048 |
| RA-T012 preview protected delivery and direct chapter requests | RA-T027, RA-T028, RA-T032, RA-T035, RA-T037 |
| RA-T013 preview separate newsletter interaction | RA-T044–RA-T046 |
| RA-T014 implement one explicitly approved bounded stage | Stage rule above (each phase is one stage) |
| RA-T015 read back and verify the saved stage | RA-T051 |
| RA-T016 assess deployment consequences before any manual push | RA-T052 |

Historical 004 T005–T010, T022–T024 and T027–T038 are referenced, not
duplicated or completed. T011 remains indexing scope. Mixed T001–T004,
T012–T021 and T039–T051 remain in 004.

---

## Dependencies and execution order

- **Phase 0** first. RA-T001–RA-T004, RA-T017 and RA-T018 can proceed now; RA-T005–RA-T009 need Ash.
- **Phase 1** after Phase 0. **Phase 2** after Phase 1 and blocks every story.
- **US1** after Phase 2. **US2** after RA-T034 (it extends the verify function). **US3** RA-T044 can follow Phase 1 copy approval; RA-T045 waits for RA-T008; RA-T046 follows RA-T033/RA-T034. **US4** waits for RA-T007.
- **Phase 7** after the stories it reviews; RA-T052 before any push to main.

```text
Phase 0 → Phase 1 → Phase 2 → US1 (MVP) → US2
                              ↘ US3
RA-T007 ───────────────────────→ US4
```

## Parallel examples

```text
# Phase 2, once Phase 1 is approved:
RA-T023 codes.ts  |  RA-T024 session-cookie.ts  |  RA-T025 responses.ts  |  RA-T026 mailer.ts  |  RA-T027 edition.ts

# US1 tests:
RA-T030 code-request.test.ts  |  RA-T031 verify.test.ts  |  RA-T032 chapter.test.ts

# US3:
RA-T044 ThankYouPage.tsx  |  RA-T045 WaitlistPage.tsx
```

## Implementation strategy

1. Finish Phase 0; record decisions before any code.
2. MVP: Phases 1–3 (US1) as successive approved stages; preview with placeholder chapters only.
3. Add US2, then US3; US4 only after the recovery rules are decided.
4. Stop at the manual GitHub checkpoint after each stage. Nothing here authorises provisioning, publication or deployment.
