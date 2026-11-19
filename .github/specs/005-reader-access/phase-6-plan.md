# Phase 6 Implementation Plan: Recovery after incomplete session

**Feature:** User Story 4 — Recovery after confirmed redemption but incomplete session establishment  
**Priority:** P3  
**Prerequisite:** Phase 1–5 complete; decisions 4 & 6 from spec.md clarified by owner

---

## Overview

After a reader successfully redeems a verification code but loses connectivity before the session is established (browser closes, network drops, page refresh), recovery allows them to regain access without requesting a new code. Recovery-first concurrency (Q4) prevents duplicates when multiple tabs race to verify or recover.

---

## Decision Dependencies

| Decision | Topic | Status | Impact on Phase 6 |
|----------|-------|--------|-------------------|
| 4 | Recovery duration, start event, session identity fallback | **Open** | Exact timeout and triggering event RA-T048 |
| 6 | Concurrency ordering, duplicate effects, revocation | **Partial** (Q4 recovery-first race settled) | Race handling strategy; full ordering in RA-T048 |

**Q4 settled**: When matching recovery succeeds first, a competing fresh-code request continues without ending it.

---

## Deliverables

### RA-T047 ✅ Data model and contracts (Complete)
- **RA-T047.1** Add RecoveryAttempt entity to [data-model.md](./data-model.md) with:
  - `recovery_id`, `reader_id`, `initiated_at`, `expires_at` (duration TBD by decision 4)
  - State machine: `initiated` → `succeeded` | `abandoned` | `expired`
  - Race outcome logging: `recovery_first`, `code_first`, `concurrent`
  - Notes on decision 4 & 6 open points
- **RA-T047.2** Update [contracts/reader-access-functions.md](./contracts/reader-access-functions.md):
  - Extend verify function spec with recovery behaviour (Q4 rules)
  - Recovery-first race handling: code continues if recovery wins first
  - Competing code extends recovered session (no duplicate)

### RA-T048 Recovery implementation (Planned)
- **RA-T048.1** Implement recovery logic in `netlify/functions/reader-verify.ts`:
  - Initiate recovery attempt on successful code consumption
  - Detect recovery window based on decision 4 duration
  - Implement recovery-first concurrency (Q4)
  - Extend session on competing code (Q4)
- **RA-T048.2** Add contract tests in `tests/reader-access/recovery.test.ts`:
  - Recovery success yields session within window
  - Expired recovery returns `code-expired` state
  - Competing code during recovery extends session, not duplicate
  - Concurrent recovery requests race correctly
  - Recovery state is never exposed in client responses
- **RA-T048.3** Add E2E journey in `e2e/reader-access.spec.ts`:
  - Verify code, lose session, recover within window
  - Verify code, then in second tab request new code during recovery window

---

## Notes

- **Decision 4 must be settled before final implementation.** RA-T048 will use placeholder values (`recovery_duration = 24 hours`, `initiated_at = code consumed time`) and document them as assumptions to be verified.
- **Newsletter separation maintained:** Recovery never creates or modifies newsletter subscriptions (R-11).
- **Privacy:** Recovery does not expose email or reader identity in responses (RA-008).
- **Atomicity:** Recovery state and session creation must be atomic at the storage layer to prevent race inconsistencies (RA-002).

---

## Success Criteria

- RecoveryAttempt entity fully modeled in data-model.md
- Contracts updated with recovery responses and Q4 race handling
- RA-T048 implementation passes all contract and E2E tests
- Recovery state transitions verified per test evidence in verification.md

---

**Blocked by:** Decision 4 clarification (recovery duration/start)  
**Blocks:** Deployment (R-12), Acceptance (RA-012)  
**Maps to requirements:** RA-009, R-09, Q4  
**Branch:** `feat/reader-content-delivery`  
**Last updated:** 2026-11-19
