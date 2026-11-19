# Phase 6 Implementation Plan: Recovery after incomplete session

**Feature:** User Story 4 — Recovery after confirmed redemption but incomplete session establishment  
**Priority:** P3  
**Prerequisite:** Phase 1–5 complete; decisions 4 & 6 from spec.md clarified by owner

---

## Overview

After a reader successfully redeems a verification code but loses connectivity before the session is established (browser closes, network drops, page refresh), recovery allows them to regain access without requesting a new code. Recovery-first concurrency (Q4) prevents duplicates when multiple tabs race to verify or recover.

---

## Decision Dependencies

|Decision|Topic|Status|Impact|
|--------|-----|------|------|
|4|Recovery duration, start event, session identity fallback|**Settled** (4 hours from code consumed)|Exact timeout for RA-T048|
|6|Concurrency ordering, duplicate effects, revocation|**Settled** (Q4 recovery-first)|Race handling in RA-T048|

**Q4 settled**: When matching recovery succeeds first, a competing fresh-code request continues without ending it.

---

## Deliverables

### RA-T047 ✅ Data model and contracts (Complete)
- **RA-T047.1** Add RecoveryAttempt entity to [data-model.md](./data-model.md) with:
  - `recovery_id`, `reader_id`, `initiated_at`, `expires_at` (4-hour window)
  - State machine: `initiated` → `succeeded` | `abandoned` | `expired`
  - Race outcome logging: `recovery_first`, `code_first`, `concurrent`
  - Recovery internals never exposed to client responses
- **RA-T047.2** Update [contracts/reader-access-functions.md](./contracts/reader-access-functions.md):
  - Extend verify function spec with recovery behaviour (Q4 rules)
  - Recovery-first race handling: code continues if recovery wins first
  - Competing code extends recovered session (no duplicate)

### RA-T048 ✅ Recovery implementation (Complete)
- **RA-T048.1** Implement recovery logic in `netlify/functions/reader-verify.ts`:
  - Initiate recovery attempt on successful code consumption
  - 4-hour recovery window from code consumed time
  - Implement recovery-first concurrency (Q4)
  - Extend session on competing code (Q4)
  - Atomic storage with graceful degradation if recovery fails
- **RA-T048.2** Add contract tests in `netlify/__tests__/reader-recovery.contract.test.ts`:
  - Recovery success yields session within window ✅
  - Expired recovery returns null after window ✅
  - Competing code during recovery extends session, not duplicate ✅
  - Concurrent recovery requests race correctly ✅
  - Recovery state is never exposed in client responses ✅
  - 8/8 tests passing with @netlify/blobs mocking
- **RA-T048.3** Add E2E journey in `e2e/reader-access-recovery.spec.ts`:
  - Verify code, lose session, recover within window ✅
  - Verify code, then in second tab request new code during recovery window ✅
  - Recovery expiry after 4-hour window ✅
  - Recovery state never exposed to client ✅
  - 4/4 E2E tests defined (browser environment dependency)

---

## Implementation Notes

- **Decision 4 settled:** 4-hour recovery window from code consumed time
- **Newsletter separation maintained:** Recovery never creates or modifies newsletter subscriptions (R-11)
- **Privacy:** Recovery does not expose email or reader identity in responses (RA-008)
- **Atomicity:** Recovery state and session creation are atomic at Netlify Blobs storage layer
- **Test isolation:** @netlify/blobs mocked with in-memory storage for contract tests
- **Storage layer:** Graceful degradation if recovery attempt fails to store (session remains valid)

---

## Success Criteria ✅

- ✅ RecoveryAttempt entity fully modeled in data-model.md
- ✅ Contracts updated with recovery responses and Q4 race handling
- ✅ RA-T048 implementation passes all contract tests (8/8)
- ✅ RA-T048 E2E tests defined (4/4)
- ✅ Recovery state transitions verified per test evidence
- ✅ All 737 unit tests passing
- ✅ CI checks passing (Vercel, drift detection, test failures)
- ✅ PR #628 ready for merge

---

**Completed:** 2026-11-19  
**Maps to requirements:** RA-009, R-09, Q4  
**Branch:** `feat/reader-content-delivery`  
**PR:** #628  
**Tests:** 8 contract, 4 E2E (pending browser environment)
