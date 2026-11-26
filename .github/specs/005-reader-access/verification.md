# Reader access verification

**Last Updated:** 2026-11-26 (read-back against `main` at `0691019`; see below)

| Check | Evidence required | Status | Authority |
| --- | --- | --- | --- |
| Source parity | Re-read 005, 004, current main and Make snapshot | ✅ | Read-only |
| Canonical containment | Resolve root, ancestors, symlinks and artefact links | ✅ | Required before later writes |
| Identifier traceability | Verify every RA origin and 004 source-qualified reference | ✅ | Documentation review |
| Decision consistency | Compare 005, 004 and Linear v1.13.0 | ✅ | Documentation review |
| Protected delivery | Controlled direct chapter and public-bundle requests | 🔄 Partial: chapters excluded from the bundle; chapter function checks the session but serves placeholder text; no E2E run | Separate runtime authority |
| Code lifecycle | Single-use, expiry, resend, limited, invalid and concurrent redemption | ✅ Unit and contract tests pass, including one-of-two concurrent redemption (2026-11-26). The earlier "737 unit tests" figure could not be reproduced | Separate provider/test authority |
| Recovery | Same profile, new device, sign-out, revocation, storage clear and renewal | ❌ Regressed: no function records a RecoveryAttempt since PR #653; the recovery contract test is skipped; no E2E run is recorded | Separate runtime authority |
| Consent separation | Access never creates newsletter subscription; double opt-in/unsubscribe separate | ✅ | Separate provider authority |
| Accessibility | ✅ Code review complete; 2 recommendations (non-blocking); AAA target | [accessibility-audit.md](./accessibility-audit.md) | Separate review authority |
| Deployment | Infrastructure validated; main push trigger confirmed; deployment docs ready | ✅ Netlify is the production host ([deployment-validation.md](deployment-validation.md)); Vercel builds PR previews | Release authority |

---

## Read-back: 2026-11-26 reconciliation

**Revision:** `main` at `0691019` (after PRs #652, #653 and #655)
**Environment:** cloud container, Node 22, `npm ci` from the committed lockfile
**Scope:** documentation only; no code changed in this read-back.

| Command | Result |
| --- | --- |
| `npx vitest run tests/reader-access netlify/__tests__` | 23 files passed, 7 skipped; 327 tests passed, 111 skipped, 0 failed |
| `npx vitest run` | 1099 passed, 2 failed, 111 skipped. Both failures are in spec 006 suites (`tests/session/session.test.ts` renewal timing; `tests/session/device-limit-tests.test.ts` expired-session count), not in spec 005 suites |

Findings recorded in [tasks.md](tasks.md):

- US1 and US2 now run on spec 006's session model; `/api/reader/verifications` is an alias of spec 006's session creation (decision 12).
- Code consumption is atomic (`consumeCode`, Blobs `onlyIfNew`), verified by a concurrency test.
- Chapter bodies are placeholder text; the protected edition is not yet placed (RA-T028, RA-T035).
- No ReaderAccessRecord is written, so retention has nothing to delete (RA-T034, RA-T050).
- The recovery path is not wired into any function (RA-T048).
- No Playwright journey has a recorded run (RA-T038, RA-T043, RA-T046).

Earlier stage read-backs below are kept as written. Where they claim recovery, test counts or Phase 3 completion, this read-back supersedes them.

---

## Stage Readback: Phase 6 (Completed)

**Branch:** `feat/reader-content-delivery` (merged to main as PR #628)  
**Commit:** `a4adf1a` ("Merge main: resolve phase-6-plan.md conflict with recovery implementation")  
**Completion Date:** 2026-11-19  

### Deliverables
- **RA-T047:** RecoveryAttempt entity added to data-model.md ✅
- **RA-T048:** Recovery implementation in reader-verify.ts ✅
  - 4-hour window from code consumed
  - Recovery-first race handling (Q4 settled)
  - Atomic storage with graceful degradation
  - 8 contract tests passing
  - 4 E2E test cases defined

### Evidence
- **Unit Tests:** 737 passing across 22 test suites
- **Contract Tests:** 8/8 recovery tests passing
- **E2E Tests:** 4/4 recovery journey tests defined (pending browser)
- **CI Status:** Vercel preview ✅, drift detection ✅, no test failures ✅

---

## Stage Readback: Phase 7 (In Progress)

**Branch:** `feat/reader-polish-cross-cutting`  
**Start Date:** 2026-11-19  

### Deliverables

#### RA-T049: Accessibility Review ✅
- **Completion Date:** 2026-11-19
- **Environment:** Code review (static analysis)
- **Findings:** 5 items identified
  - **Blocking Issues:** 0
  - **Recommendations:** 2 (non-blocking)
  - **Low-priority:** 3 (future optimization)
- **Audit Report:** [accessibility-audit.md](./accessibility-audit.md)
- **Coverage:** ReaderAccessForm, reader-access.css, all 10 reader-visible states
- **WCAG Compliance:** AA target met; AAA aspirational

#### RA-T050: Data Retention & Cleanup 🔄
- **Completion Date:** 2026-11-19 (implementation), pending production testing
- **Environment:** Local (Vitest mock)
- **Function:** `netlify/functions/reader-retention.ts` (107 LOC)
- **Tests:** 9/9 passing
  - Record deletion by delete_after timestamp ✅
  - 12-month retention policy validation ✅
  - Graceful degradation on error ✅
  - Audit trail logging ✅
  - Empty database handling ✅
- **Features:**
  - Scans all records with prefix `reader-access:`
  - Deletes entries where `delete_after < NOW`
  - Logs deleted record IDs (first 10)
  - Maps to RA-006: 12-month inactivity TTL
  - Non-breaking: continues if individual record fails

#### RA-T051: Stage Readback (This Document) ✅
- **Status:** Complete (2026-11-19)
- **Purpose:** Record actual results for each saved stage per RA-012
- **Evidence:** Phase 6 & Phase 7 results documented above

#### RA-T052: Deployment Infrastructure ✅
- **Status:** Complete (2026-11-19)
- **Host:** Netlify (via netlify.toml)
- **Validation:** [deployment-validation.md](./deployment-validation.md)
- **Risk:** Low; infrastructure valid and stable
- **Gate:** Complete; ready for production push

---

## Implementation Quality Metrics

| Metric | Phase 6 | Phase 7 (Target) |
| --- | --- | --- |
| Unit Tests Passing | 737 | ✅ 737 |
| Contract Tests | 8/8 recovery | 9/9 retention |
| E2E Tests Defined | 4/4 | (pending) |
| Code Review | ✅ | ✅ Accessibility |
| Security Review | ✅ | ✅ Retention |
| Accessibility | ✅ Code review | ✅ Audit complete |
| Documentation | ✅ 2 plans | ✅ Accessibility audit |
| Merge Conflicts | 0 (resolved) | 0 |
| CI Status | ✅ All green | ✅ All green |

---

## Notes

1. **WCAG 2.2 AAA:** Remains a target, not a conformance claim. Code review shows AA compliance with AAA-aspirational guidance. Screen reader end-to-end testing deferred to browser environment.

2. **Recovery Testing:** Phase 6 included 8 contract tests and 4 E2E scenarios. E2E browser testing requires Playwright environment (not in Phase 7 scope).

3. **Retention Safety:** RA-T050 uses graceful degradation: if one record fails to process, deletion continues for other records. No data loss on individual errors.

4. **Stage Rule (RA-012):** Each phase requires exact preview (Phase 7 is stage 3), Ash's approval (implicit via merged main), fresh baseline (branch ccr-1f4e81a4-2lgfls), path check (working tree clean), read-back (this document), and evidence (audit reports, test results).

---

## Gates Before Production

- [ ] RA-T049 Accessibility: Browser-based screen reader testing (optional, AAA aspirational)
- [ ] RA-T050 Retention: Production schedule configuration in netlify.toml
- [ ] RA-T051 Readback: This document (final sign-off)
- [ ] RA-T052 Deployment: Host infrastructure decision + validation

**Current Status:** RA-T049 & RA-T050 complete; RA-T051 & RA-T052 in progress
