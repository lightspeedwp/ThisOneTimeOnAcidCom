# Figma Make Prompt 3B: Recovery Flows

**Status**: ➡️ HANDED OVER — reader-access work now continues in [Spec 005](../../005-reader-access/spec.md), which owns its flow, stages and dependencies. Decision 5 was revised on 2026-11-13 (early release; chapters published individually once Ash approves each), so manuscript approval no longer gates these screens. This contract is kept as a source record for Spec 005.
**Priority**: P2  
**Prompt ID**: 3B  
**Type**: recovery-flows

---

## Specification

### Decisions Applied

| Decision | Selected outcome | Status |
| ---------- | --------- | -------- |
| **Decision 1** | Recovery-first race condition — **Option A**: recovery takes precedence; cancel fresh verification if recovery succeeds | ✅ APPROVED (2026-11-11) |
| **Decision 2** | Recovery lifetime eligibility — **Option A**: successful recovery refreshes the session, but access has an absolute expiry 30 days after initial verification; recovery cannot extend access beyond that limit | ✅ APPROVED (2026-11-11) |
| **Decision 5** | Manuscript publication readiness — **Option C**: not yet approved | ❌ Blocks execution |

See [research.md](../research.md) and [BLOCKING_DECISIONS_PROPOSAL.md](../exports/BLOCKING_DECISIONS_PROPOSAL.md) for the decision records.

---

## Goal

Generate the recovery flow specification documenting how readers regain access via a previous verified session, using the approved race-condition and lifetime rules.

### Flow

**Inputs**:

1. Previous verification session exists in device storage
2. User attempts to re-access content without re-verification
3. System detects the previous verified session and initiates recovery

**Recovery Success Path**:

- System validates the session is within 30 days of initial verification (Decision 2)
- System grants access without requiring fresh email verification
- Successful recovery refreshes the session but does not move the absolute 30-day expiry
- User sees confirmation: "Access restored from previous session"

**Recovery Failure Paths**:

- Session expired: more than 30 days since initial verification, regardless of recovery activity (Decision 2) — reader must re-verify by email
- Session invalid (corrupted or tampered)
- Fresh verification already completed before recovery (see race handling)

**Race Condition Handling** (Decision 1, Option A):

- If recovery and fresh verification run in the same window, recovery takes precedence
- When recovery succeeds, the pending fresh verification is cancelled
- If recovery fails, the fresh verification path continues

---

## Execution Steps (After Manuscript Approval)

1. Confirm this contract still matches the recorded decisions
2. Design all recovery states (success, session-expired, invalid, race-condition)
3. Document error messaging for each recovery failure scenario
4. Create a recovery flow diagram showing the decision tree

### Acceptance Criteria

✅ **CR-3B.1**: Recovery flow follows Decision 1 Option A (recovery precedence; fresh verification cancelled on recovery success)

✅ **CR-3B.2**: Session lifetime enforces the absolute 30-day expiry from initial verification; recovery refreshes cannot extend it (Decision 2)

✅ **CR-3B.3**: All recovery failure states designed (expired, invalid, race-condition)

✅ **CR-3B.4**: Error messages clearly explain recovery failure reason

✅ **CR-3B.5**: Recovery success path matches reader access policy (10-minute codes, 30-day device lifecycle)

✅ **CR-3B.6**: Fallback to fresh email verification documented when recovery unavailable

---

## Reference Documents

- Reader Access Policy: 06-website-reading-prd.md (v1.1.1)
- Recovery decisions: research.md (Decisions 1 & 2)
- Design Baseline: 04-design-brief.md (v1.1.2)

### Dependencies

- Prompt 3A (Reader Access Copy & Forms) — Provides form baseline
- Manuscript approval (Decision 5) — Must be recorded before execution

---

**Do not execute this prompt until the manuscript is approved and the execution gates in [spec.md](../spec.md) are cleared.**
