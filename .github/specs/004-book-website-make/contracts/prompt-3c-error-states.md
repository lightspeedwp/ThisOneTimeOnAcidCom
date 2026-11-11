# Figma Make Prompt 3C: Error States

**Status**: ❌ BLOCKED (partially: code-expiry messaging blocked)  
**Priority**: P2  
**Prompt ID**: 3C  
**Type**: error-states

---

## Specification (Template—Awaiting Decision Resolution)

### Blocking Decision (MUST Be Resolved First)

This prompt is BLOCKED and cannot be fully executed until the following decision is made:

| Decision | Options | Status |
|----------|---------|--------|
| **Decision 3** | Code expiry start time (Options A/B/C): When does 10-minute code expiry clock start? From generation / receipt / page load? | **PENDING** |

See `research.md` for detailed analysis of this decision.

**Other error states** (invalid code, rate-limited, server error, session conflict from Decision 1) can be generated once Decision 3 is resolved.

---

## Goal (Pending Decision 3 Resolution)

Generate all error state designs and messaging for reader access flow, with code-expiry message reflecting Decision 3 selection (from generation / receipt / page load).

### Error States to Generate (Pending Decision 3)

**1. Invalid Code Error**
- Message: "Invalid code. Please check and try again."
- State: Form displays error border/color, error text below input
- Action: User can retry (form remains open)

**2. Code Expired Error** (Depends on Decision 3)
- Message options (based on Decision 3):
  - Option A (from generation): "Code expired. Generation time was [X minutes ago]."
  - Option B (from receipt): "Code expired. Email received [X minutes ago]."
  - Option C (from page load): "Code expired. Please check your email for a new one."
- State: Form displays error state, suggests requesting new code
- Action: Link to "Request new code" triggers fresh email entry

**3. Rate Limited Error**
- Message: "Too many failed attempts. Please try again in 15 minutes."
- State: Form disabled, countdown timer shown
- Action: User waits for cooldown, form re-enables

**4. Server Error State**
- Message: "We're having trouble verifying your code. Please try again in a moment."
- State: Form input disabled, retry button enabled
- Action: User can retry or request new code

**5. Session Conflict Error** (Depends on Decision 1 recovery race)
- Message: "Access being restored from previous session. Please wait..."
- State: Form shows loading indicator
- Action: Auto-redirect when session recovery completes or fails

---

## When Unblocked (After Decision 3 Resolved)

1. Update this prompt with Decision 3 selected option
2. Generate complete error state designs for all 5 error scenarios
3. Write exact error messages using Decision 3 timing language
4. Design error state form styling (borders, text color, icons)
5. Document user actions for each error (retry, request new code, wait)

### Acceptance Criteria Template (Awaiting Decision 3)

✅ **CR-3C.1**: All 5 error states designed (invalid, expired, rate-limited, server, session-conflict)

✅ **CR-3C.2**: Code expiry message reflects Decision 3 selection (clear timing explanation)

✅ **CR-3C.3**: Error messages distinguish failure reasons (user-error vs. timing vs. rate-limit vs. server)

✅ **CR-3C.4**: Each error state includes user action (retry, wait, request new code)

✅ **CR-3C.5**: Form styling consistent with approved design baseline (colors, typography)

✅ **CR-3C.6**: Help text clearly explains what went wrong and what user should do

✅ **CR-3C.7**: Countdown timer shown for rate-limit error

✅ **CR-3C.8**: All error states accessible to keyboard/screen readers

---

## Reference Documents

- Code Expiry Analysis: research.md (Decision 3 detailed with options A/B/C)
- Reader Access Form: Prompt 3A (form baseline for error states)
- Design Baseline: 04-design-brief.md (v1.1.2)

### Dependencies

- Prompt 3A (Reader Access Copy & Forms) — Provides form baseline
- Decision 3 (Code Expiry Start Time) — Must be resolved first for accurate expiry messaging

---

## Unblocking Process

**Step 1**: User selects option for Decision 3 in research.md

**Step 2**: Update this prompt with selected decision option

**Step 3**: Generate complete error state specification with Decision 3 messaging

**Step 4**: Execute with Figma Make to generate error state designs

---

**Do not attempt to generate this prompt until Decision 3 is resolved.**
