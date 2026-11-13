# Figma Make Prompt 3C: Error States

**Status**: ➡️ HANDED OVER — reader-access work now continues in [Spec 005](../../005-reader-access/spec.md), which owns its flow, stages and dependencies. Decision 5 was revised on 2026-11-13 (early release; chapters published individually once Ash approves each), so manuscript approval no longer gates these screens. This contract is kept as a source record for Spec 005.
**Priority**: P2  
**Prompt ID**: 3C  
**Type**: error-states

---

## Specification

### Decisions Applied

| Decision | Selected outcome | Status |
| ---------- | --------- | -------- |
| **Decision 3** | Code expiry start time — **Option A**: the 10-minute expiry runs from code generation | ✅ APPROVED (2026-11-11) |
| **Decision 1** | Recovery-first race condition — **Option A**: recovery takes precedence (used for the session-conflict state) | ✅ APPROVED (2026-11-11) |
| **Decision 5** | Manuscript publication readiness — **Option C**: not yet approved | ❌ Blocks execution |

See [research.md](../research.md) for the decision records.

---

## Goal

Generate all error state designs and messaging for the reader access flow, with code-expiry messaging stating that codes expire 10 minutes after generation.

### Error States to Generate

**1. Invalid Code Error**

- Message: "Invalid code. Please check and try again."
- State: Form displays error border/colour, error text below input
- Action: User can retry (form remains open)

**2. Code Expired Error** (Decision 3, Option A)

- Message: "Code expired — it was valid for 10 minutes from when it was generated."
- State: Form displays error state, suggests requesting a new code
- Action: Link to "Request new code" triggers fresh email entry

**3. Rate Limited Error**

- Message: "Too many failed attempts. Please try again in 15 minutes."
- State: Form disabled, countdown timer shown
- Action: User waits for cooldown, form re-enables

**4. Server Error State**

- Message: "We're having trouble verifying your code. Please try again in a moment."
- State: Form input disabled, retry button enabled
- Action: User can retry or request new code

**5. Session Conflict Error** (Decision 1, Option A)

- Message: "Access being restored from previous session. Please wait..."
- State: Form shows loading indicator; recovery takes precedence over the pending fresh verification
- Action: Auto-redirect when session recovery completes; if recovery fails, the fresh verification continues

---

## Execution Steps (After Manuscript Approval)

1. Confirm this contract still matches the recorded decisions
2. Generate error state designs for all 5 error scenarios
3. Use the exact error messages above
4. Design error state form styling (borders, text colour, icons)
5. Document user actions for each error (retry, request new code, wait)

### Acceptance Criteria

✅ **CR-3C.1**: All 5 error states designed (invalid, expired, rate-limited, server, session-conflict)

✅ **CR-3C.2**: Code expiry message states that the code was valid for 10 minutes from generation (Decision 3)

✅ **CR-3C.3**: Error messages distinguish failure reasons (user-error vs. timing vs. rate-limit vs. server)

✅ **CR-3C.4**: Each error state includes user action (retry, wait, request new code)

✅ **CR-3C.5**: Form styling consistent with approved design baseline (colours, typography)

✅ **CR-3C.6**: Help text clearly explains what went wrong and what user should do

✅ **CR-3C.7**: Countdown timer shown for rate-limit error

✅ **CR-3C.8**: All error states accessible to keyboard/screen readers

---

## Reference Documents

- Code expiry decision: research.md (Decision 3)
- Reader Access Form: Prompt 3A (form baseline for error states)
- Design Baseline: 04-design-brief.md (v1.1.2)

### Dependencies

- Prompt 3A (Reader Access Copy & Forms) — Provides form baseline
- Manuscript approval (Decision 5) — Must be recorded before execution

---

**Do not execute this prompt until the manuscript is approved and the execution gates in [spec.md](../spec.md) are cleared.**
