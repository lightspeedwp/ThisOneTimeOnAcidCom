# Figma Make Prompt 3B: Recovery Flows

**Status**: ❌ BLOCKED  
**Priority**: P2  
**Prompt ID**: 3B  
**Type**: recovery-flows

---

## Specification (Template—Awaiting Decision Resolution)

### Blocking Decisions (MUST Be Resolved First)

This prompt is BLOCKED and cannot be executed until the following decisions are made:

| Decision | Options | Status |
| ---------- | --------- | -------- |
| **Decision 1** | Recovery-first race condition (Options A/B/C/D): What if both recovery and fresh verification occur simultaneously? | **PENDING** |
| **Decision 2** | Recovery lifetime eligibility (Options A/B/C/D): How long is confirmed redemption eligible for recovery access? | **PENDING** |

See `research.md` for detailed analysis of each decision.

---

## Goal (Pending Decision Resolution)

Generate recovery flow specification documenting how readers regain access via previous verified session, handling race conditions and session lifetime per selected decision options.

### Placeholder Structure (To Be Filled After Decisions)

**Inputs** (depends on Decision selections):
1. Previous verification session exists in device storage
2. User attempts to re-access content without re-verification
3. System detects previous verified session and initiates recovery

**Recovery Success Path** (depends on Decision 1 handling):
- System validates previous session is within recovery lifetime (Decision 2)
- System grants access without requiring fresh email verification
- User sees confirmation: "Access restored from previous session"

**Recovery Failure Paths** (depends on Decision 2 lifetime):
- Session expired (exceeded recovery lifetime from Decision 2)
- Session invalid (corrupted or tampered)
- Race condition detected (depends on Decision 1 resolution strategy)

**Race Condition Handling** (depends on Decision 1 option):
- Option A: Recovery takes precedence; cancel fresh verification
- Option B: Fresh verification takes precedence; invalidate recovery
- Option C: Last-writer-wins (timestamp order)
- Option D: User chooses explicitly before attempting either path

---

## When Unblocked (After Decisions 1 & 2 Resolved)

1. Update this prompt template with selected decision options
2. Generate complete recovery flow specification
3. Design all recovery states (success, session-expired, invalid, race-condition)
4. Document error messaging for each recovery failure scenario
5. Create recovery flow diagram showing decision tree

### Acceptance Criteria Template (Awaiting Decisions)

✅ **CR-3B.1**: Recovery flow follows Decision 1 race-condition strategy

✅ **CR-3B.2**: Session lifetime enforcement matches Decision 2 selection

✅ **CR-3B.3**: All recovery failure states designed (expired, invalid, race-condition)

✅ **CR-3B.4**: Error messages clearly explain recovery failure reason

✅ **CR-3B.5**: Recovery success path matches reader access policy (10-min codes, 30-day device lifecycle)

✅ **CR-3B.6**: Fallback to fresh email verification documented when recovery unavailable

---

## Reference Documents

- Reader Access Policy: 06-website-reading-prd.md (v1.1.1)
- Recovery Analysis: research.md (Decisions 1 & 2 detailed with options)
- Design Baseline: 04-design-brief.md (v1.1.2)

### Dependencies

- Prompt 3A (Reader Access Copy & Forms) — Provides form baseline
- Decisions 1 & 2 — Must be resolved first

---

## Unblocking Process

**Step 1**: User selects options for Decisions 1 & 2 in research.md

**Step 2**: Update this prompt with selected decision options

**Step 3**: Generate complete recovery flow specification

**Step 4**: Execute with Figma Make to generate recovery flow designs

---

**Do not attempt to generate this prompt until Decisions 1 & 2 are resolved.**
