# Tasks: Reader access

**Input**: Design documents from `.github/specs/005-reader-access/`
**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/reader-access-functions.md](contracts/reader-access-functions.md), [quickstart.md](quickstart.md)

Status values: Planned, Blocked, Implemented, Verified, Accepted. This package
contains no completed implementation tasks. A checked box is never set without
evidence recorded in [verification.md](verification.md).

**Tests**: included because constitution principle VII requires layered testing
for every change. Every test result is Not run.

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

- [ ] RA-T001 Re-read main, destination availability and canonical containment for .github/specs/005-reader-access/ — Planned. Maps RA-011/RA-012.
- [ ] RA-T002 Reconcile 004 with Linear register v1.13.0 and content/book/05-design-reader-decision-register.md — Planned. Maps RA-011.
- [ ] RA-T003 Reconcile all six .github/specs/004-book-website-make/contracts/prompt-3* files as one group, preserving repeated IDs — Planned. Maps RA-011.
- [ ] RA-T004 Establish current Make/repository parity or record the smallest missing evidence in .github/specs/005-reader-access/sources.md — Planned. Maps RA-012.
- [ ] RA-T005 Resolve email provider, transactional sending and provider retention/deletion (research R-10) and storage choice (R-02) — Blocked: owner decision. Maps RA-003/RA-006.
- [ ] RA-T006 Confirm edition manifest, manuscript availability, rights, credits and publication authority (R-03) — Blocked: owner decision. Maps RA-010.
- [ ] RA-T007 Select recovery duration/start, exact renewal duration within thirty days, concurrency and recovery-race rule, revocation, code format and attempt/rate limits (R-05, R-08, R-09). Expiry start was settled by Clarifications Q2 and the renewal ceiling by Q3 — Blocked: owner decision. Maps RA-003/RA-004/RA-009.
- [ ] RA-T008 Confirm newsletter destination, double opt-in, wording and deletion (R-11) — Blocked: owner decision. Maps RA-007.
- [ ] RA-T009 Confirm privacy notice, reviewer, operator and deletion procedure — Blocked: owner decision. Maps RA-006.
- [ ] RA-T017 Run the Spec Kit regression baseline for feature 005 (constitution I/VII) and record the result in .github/specs/005-reader-access/verification.md — Planned; running commands needs separate approval. Maps RA-012.
- [ ] RA-T018 Align .github/specs/005-reader-access/decisions.md and crosswalk.md with Clarifications Q1–Q3 and plan findings (decision 3 settled, renewal ceiling settled, Netlify Functions direction, 3A guide colours carry no authority) — Planned; needs Ash's approval of exact wording. Maps RA-011.

---

## Phase 1: Setup (shared infrastructure)

- [ ] RA-T019 Create netlify/functions/ and netlify/lib/reader-access/, and confirm in netlify.toml that function paths under /api/reader/ are served before the `/*` → `/index.html` fallback (R-01) — Blocked by Phase 0. Maps RA-001.
- [ ] RA-T020 Add only the approved function and email-provider dependencies to package.json and package-lock.json with npm on Node 24 — Blocked by RA-T005. Maps RA-006.
- [ ] RA-T021 [P] Create src/app/data/mock/reader-access.ts holding visitor copy for every reader-visible state (`request-pending`, `request-received`, `delivery-uncertain`, `verified`, `code-invalid`, `code-expired`, `code-used`, `limited`, `provider-failure`, `content-unavailable`); code wording must say "within 10 minutes of requesting it" — Blocked: copy approval. Maps RA-003/RA-008.

---

## Phase 2: Foundational (blocks every user story)

- [ ] RA-T022 Implement the storage adapter in netlify/lib/reader-access/store.ts with an atomic consume-once operation; "consume at most once, atomically" — Blocked by RA-T005 (R-02). Maps RA-002/RA-009.
- [ ] RA-T023 [P] Implement code creation and checking in netlify/lib/reader-access/codes.ts: `code_hash` is a "Salted hash; the plain code is never stored"; `expires_at` = "`created_at` + 10 minutes"; format and attempt limit per R-05 — Blocked by RA-T007. Maps RA-002/RA-003.
- [ ] RA-T024 [P] Implement session cookie helpers in netlify/lib/reader-access/session-cookie.ts: `HttpOnly`, `Secure`, `SameSite=Lax`, first-party; `session_id` is an "Opaque random value stored in the cookie; contains no email" — Blocked: R-07 approval. Maps RA-005.
- [ ] RA-T025 [P] Implement JSON response helpers in netlify/lib/reader-access/responses.ts that set `Cache-Control: no-store` and a `state` value, and never reveal whether an email is known — Blocked by Phase 0. Maps RA-008.
- [ ] RA-T026 [P] Implement the email adapter in netlify/lib/reader-access/mailer.ts that distinguishes "accepted for sending" from provider failure and never claims delivery — Blocked by RA-T005. Maps RA-008.
- [ ] RA-T027 [P] Implement the edition manifest reader in netlify/lib/reader-access/edition.ts; "returns 'content unavailable' for any chapter not in an approved manifest" — Blocked by RA-T006. Maps RA-010.
- [ ] RA-T028 Ensure src/app/utils/bookContentLoader.ts cannot bundle the protected edition (its eager `import.meta.glob` covers `/src/content/book/**/*.md`) and place the edition source per R-03 — Blocked by RA-T006. Maps RA-001.
- [ ] RA-T029 [P] Add unit tests in tests/reader-access/codes.test.ts, tests/reader-access/session-cookie.test.ts and tests/reader-access/store.test.ts covering hashing, ten-minute expiry, single consumption and cookie attributes — Blocked with RA-T022–RA-T024. Maps RA-002/RA-003/RA-005.

**Checkpoint**: foundation ready; user stories can start.

---

## Phase 3: User Story 1 — Verify and read online (P1) 🎯 MVP

**Goal**: request a code, verify it within ten minutes of the request, read chapters through the server.
**Independent test**: quickstart Q-01–Q-05, Q-07 and Q-11–Q-13 pass on a preview with placeholder chapters.

### Tests for User Story 1

- [ ] RA-T030 [P] [US1] Contract tests in tests/reader-access/code-request.test.ts: 202 `request-received`, 502 `provider-failure`, 429 `limited`, 400 `code-invalid`; no session, reader record or newsletter subscription created — Blocked by Phase 2.
- [ ] RA-T031 [P] [US1] Contract tests in tests/reader-access/verify.test.ts: 200 `verified` with cookie, 400 `code-invalid`, 410 `code-expired`, 410 `code-used`, 429 `limited`; two concurrent submissions of one code produce exactly one success — Blocked by Phase 2.
- [ ] RA-T032 [P] [US1] Contract tests in tests/reader-access/chapter.test.ts: 200 only with an active session and approved chapter; 401 `request-pending` with no content; 404 and 503 `content-unavailable` — Blocked by Phase 2.

### Implementation for User Story 1

- [ ] RA-T033 [US1] Implement netlify/functions/reader-code-request.ts (`POST /api/reader/code-requests`); "Creates a VerificationCode with `created_at` = server time"; resend invalidates the previous `issued` code — Blocked by Phase 2. Maps RA-002/RA-003.
- [ ] RA-T034 [US1] Implement netlify/functions/reader-verify.ts (`POST /api/reader/verifications`): consume the code atomically; create or update ReaderAccessRecord with `delete_after` = "`last_authenticated_at` + 12 months"; start a DeviceSession with `expires_at` "≤ 30 days after the latest fresh-code verification or renewal" — Blocked by Phase 2. Maps RA-002/RA-004/RA-006.
- [ ] RA-T035 [US1] Implement netlify/functions/reader-chapter.ts (`GET /api/reader/chapters/{chapterId}`) using the edition manifest and session check — Blocked by RA-T027/RA-T028. Maps RA-001/RA-010.
- [ ] RA-T036 [US1] Build the email and code forms in src/app/components/ui/ReaderAccessForm.tsx with BEM styles in src/styles/blocks/reader-access-form.css and copy from src/app/data/mock/reader-access.ts; wire them into src/app/components/pages/book-site/BookHomePage.tsx, replacing the navigation-only submit handler — Blocked by RA-T021/RA-T033/RA-T034. Maps RA-003/RA-008.
- [ ] RA-T037 [US1] Change src/app/components/pages/about/EbookPage.tsx (route `ebook` in src/app/routes.ts) to load chapters from `/api/reader/chapters/{chapterId}` and show `request-pending` and `content-unavailable` states — Blocked by RA-T035. Maps RA-001/SC-004.
- [ ] RA-T038 [US1] Add Playwright journeys in e2e/reader-access.spec.ts for Q-01–Q-05, Q-07 and Q-11–Q-13 — Blocked by RA-T033–RA-T037; running needs approval.

**Checkpoint**: US1 is the MVP and can be previewed on its own.

---

## Phase 4: User Story 2 — Return, renew and sign out (P2)

**Goal**: same-profile returning access for up to thirty days per fresh-code verification or renewal, repeatable without a ceiling; sign-out ends server access.
**Independent test**: quickstart Q-06–Q-09.

- [ ] RA-T039 [P] [US2] Contract tests in tests/reader-access/session.test.ts: `GET /api/reader/session` 200 with `expiresAt` or 401; `DELETE` returns 204 even when already ended; renewal moves `expiresAt` forward by up to thirty days — Blocked by Phase 2.
- [ ] RA-T040 [US2] Implement netlify/functions/reader-session.ts (GET status, DELETE sign-out that ends the server session and clears the cookie) — Blocked by Phase 2. Maps RA-004/RA-005.
- [ ] RA-T041 [US2] Extend netlify/functions/reader-verify.ts so a fresh-code verification on a profile with an active session renews it ("renewals repeat with no overall ceiling"); exact duration per RA-T007 — Blocked by RA-T034/RA-T007. Maps RA-004.
- [ ] RA-T042 [US2] Add session status and a sign-out control to src/app/components/pages/about/ebook/EbookReaderNav.tsx with copy from src/app/data/mock/reader-access.ts — Blocked by RA-T040. Maps RA-005.
- [ ] RA-T043 [US2] Add Playwright journeys in e2e/reader-access-session.spec.ts for Q-06–Q-09 — Blocked by RA-T040–RA-T042; running needs approval.

---

## Phase 5: User Story 3 — Truthful feedback and newsletter separation (P2)

**Goal**: no page claims access, delivery or subscription without evidence; reading never subscribes anyone.
**Independent test**: quickstart Q-10, plus review of the three pages below.

- [ ] RA-T044 [P] [US3] Replace the unverified "Success" and "You're in." claims in src/app/components/pages/book-site/ThankYouPage.tsx with neutral acknowledgement copy from src/app/data/mock/reader-access.ts (register v1.9.0 "Truthful form feedback") — Blocked: copy approval. Maps RA-008.
- [ ] RA-T045 [P] [US3] Make the waitlist submit the primary action and replace "You're on the list." and the success treatment in src/app/components/pages/book-site/WaitlistPage.tsx with neutral acknowledgement until the newsletter provider confirms — Blocked by RA-T008. Maps RA-007/RA-008.
- [ ] RA-T046 [US3] Add tests/reader-access/newsletter-separation.test.ts asserting no reader-access function calls a newsletter API, and e2e/reader-access-newsletter.spec.ts for Q-10 — Blocked by RA-T033/RA-T034. Maps RA-007/SC-005.

---

## Phase 6: User Story 4 — Recovery after incomplete session (P3)

**Blocked until RA-T007 settles the recovery rules (research R-09; clarify Question 4 unanswered).**

- [ ] RA-T047 [US4] Add the RecoveryAttempt entity and its state transitions to .github/specs/005-reader-access/data-model.md and the recovery responses to contracts/reader-access-functions.md — Blocked by RA-T007. Maps RA-009.
- [ ] RA-T048 [US4] Implement the decided recovery path in netlify/functions/reader-verify.ts with tests in tests/reader-access/recovery.test.ts — Blocked by RA-T047. Maps RA-009.

---

## Phase 7: Polish and cross-cutting

- [ ] RA-T049 [P] Run the keyboard, focus, screen-reader, contrast and responsive review (Q-14) for every reader-access form and state and record findings in .github/specs/005-reader-access/verification.md; WCAG 2.2 AAA is a target, not a conformance claim — Blocked by Phases 3–5.
- [ ] RA-T050 [P] Implement deletion of ReaderAccessRecord entries past `delete_after` in netlify/functions/reader-retention.ts as a scheduled function — Blocked by RA-T009. Maps RA-006.
- [ ] RA-T051 Read back each saved stage and record actual results, revision and environment in .github/specs/005-reader-access/verification.md — Planned per stage. Maps RA-012/SC-007.
- [ ] RA-T052 Establish which host serves production (Netlify via netlify.toml or the Vercel GitHub app) and whether a push to main deploys, before any manual push (research R-12) — Planned. Maps RA-012.

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
