# Figma Make Prompt 3B: Recovery Flows — Execution Guide

**Status**: ➡️ HANDED OVER — reader-access work now continues in [Spec 005](../../005-reader-access/spec.md), which owns its flow, stages and dependencies. Decision 5 was revised on 2026-11-13 (early release; chapters published individually once Ash approves each), so manuscript approval no longer gates these screens. This contract is kept as a source record for Spec 005.
**Scope**: Recovery flow specification and session restoration designs  
**Approval Gate**: Gates 1, 2 ✅ COMPLETE  
**Dependencies**: Prompt 3A (Reader Access Copy & Forms) — Provides form baseline

---

## Executive Summary

Design recovery flow specification documenting how readers regain access via previous verified session, handling race conditions and session lifetime per selected decision options.

**Deliverable** (Once Decisions 1 & 2 resolved):
- Recovery flow specification with decision-based logic
- All recovery states (success, session-expired, invalid, race-condition)
- Error messaging for each recovery failure scenario
- Recovery flow diagram showing decision tree
- Fallback documentation for unavailable recovery

**Outcome**: Implementation team can build session recovery system that gracefully restores access or falls back to fresh verification.

---

## Blocking Decisions (MUST Be Resolved First)

### Decision 1: Recovery-First Race Condition Strategy
**Question**: What if both recovery and fresh verification occur simultaneously?

**Impact**: Determines how system handles conflicting access attempts on same device.

**Options Under Review**:

| Option | Behavior | Trade-off |
| -------- | ---------- | ----------- |
| **A: Recovery Precedence** | Recovery takes priority; cancel fresh verification request | ✅ Better UX (fewer emails sent); ⚠️ Fresh code abandoned without warning |
| **B: Verification Precedence** | Fresh verification takes priority; invalidate recovery attempt | ✅ Guarantees fresh code; ⚠️ May send unnecessary email |
| **C: Last-Writer-Wins** | Whichever completes last (timestamp order) succeeds | ✅ Deterministic; ⚠️ User may see unexpected result |
| **D: User Chooses Explicitly** | Show dialog: "Restore from previous session or use new code?" | ✅ Full user control; ⚠️ Extra interaction required |

**Status**: ✅ APPROVED — Option A (recovery precedence; fresh verification cancelled when recovery succeeds). See `research.md`

### Decision 2: Recovery Lifetime Eligibility
**Question**: How long is confirmed redemption eligible for recovery access?

**Impact**: Determines session storage validity window and when fallback to fresh verification is required.

**Options Under Review**:

| Option | Recovery Window | Rationale |
| -------- | ----------------- | ----------- |
| **A: 30-day device lifecycle** | Full 30 days from initial verification | Aligns with policy; user expects consistent experience |
| **B: 7-day rolling refresh** | 7 days, extends on each access | Balances security (refreshes token) with UX |
| **C: Single session only** | Only within same calendar day (24 hours) | Most conservative; requires daily verification |
| **D: Custom window (configurable)** | Admin-controlled TTL for sessions | Flexible; adds operational complexity |

**Status**: ✅ APPROVED — Option A (session refresh on recovery; absolute expiry 30 days after initial verification — recovery cannot extend access beyond it). See `research.md`

---

## Reader Access Policy Context

From 06-website-reading-prd.md (v1.1.1):

- **Verification code**: 10-minute, one-time use
- **Device session**: 30-day lifecycle (device storage)
- **Recovery scope**: Reader can regain access on SAME DEVICE without re-verification
- **Cross-device**: Different device requires fresh email verification

---

## The Work (Execution Steps After Decisions Resolved)

### Phase 1: Update Specification with Decision Selections

**Once Decisions 1 & 2 are resolved**:

1. Receive selected options for Decision 1 and Decision 2
2. Update this guide with confirmed selections
3. Document the specific race-condition handling strategy
4. Document the specific recovery lifetime window
5. Finalize acceptance criteria with decision-specific requirements

**Example (if Decision 1=A, Decision 2=A)**:
```text
Recovery Strategy: Recovery takes precedence over fresh verification
Session Lifetime: 30-day device lifecycle (full window)
Race Condition Resolution: Cancel fresh verification request, restore from previous session
Error Messaging: "Access restored from previous session" (no email sent)
```text

### Phase 2: Design Recovery Success Path

1. Open ThisOneTimeOnAcidCom Figma file
2. Create Recovery Flow component
3. Add Recovery Success state:
   - Trigger: User visits content page, system detects previous valid session
   - Detection logic: Check device storage for session token + verify within recovery lifetime
   - User experience: Show loading state "Checking previous access..."
   - Success outcome:
     - Display message: "Access restored from previous session"
     - Message styling: Success color (#2d5016 light / #90ee90 dark)
     - Auto-redirect to content (2-3 second delay) OR show "Access confirmed" button
   - No email verification form shown
   - No additional user action required

**Typography**:
- Status message: Inter, 16px, 500 weight, success color
- Supporting text: Inter, 14px, 400 weight, neutral-dark color

**Color Scheme**:
- Background: Neutral light (#f5f5f5 light / #333333 dark)
- Border: Optional subtle accent border
- Icon: Checkmark in success color

### Phase 3: Design Recovery Failure States

#### 3A: Session Expired (Decision 2-dependent)

**Trigger**: Device session exists but exceeds recovery lifetime window

**Example messaging** (if Decision 2=A):
```text
Session Expired

Your previous access has expired (30 days). 
Please verify your email to continue reading.

[Request New Code] button
```text

**Design**:
- Display expired message with clear explanation
- Color: Warning/error styling (border + icon)
- Action: Button to "Request New Code" (re-open email entry form)
- Typography: Inter, 14px, 400 weight, error/warning color
- Allow user to proceed without friction to fresh verification

#### 3B: Session Invalid (Corrupted or Tampered)

**Trigger**: Device session exists but validation fails

**Messaging**:
```text
Access Unavailable

We couldn't restore your previous session. 
Please verify your email to continue reading.

[Request New Code] button
```text

**Design**:
- Warning/error styling (border + icon)
- Same fallback action as expired session
- Don't expose technical details to user

#### 3C: Race Condition Detected (Decision 1-dependent)

**Example: If Decision 1=A (Recovery Precedence)**:

**Trigger**: System detects simultaneous recovery + fresh verification attempt

**Messaging**:
```text
Restoring Access...

Using your previous session instead of requesting a new code.
```text

**Design**:
- Show loading spinner
- Inform user what's happening
- Auto-complete without further action
- Optional: Show "Using previous session" after completion

**Example: If Decision 1=D (User Chooses Explicitly)**:

**Messaging**:
```text
Restore Access from Previous Session?

We found your previous access. You can:

[Restore from Previous Session] — Use your existing access
[Request New Code]             — Get a new verification code

```text

**Design**:
- Two clearly-labeled buttons
- Equal visual weight (let user decide)
- Explain each option briefly
- Proceed with selected path

### Phase 4: Design Recovery Flow Diagram

1. Create flowchart showing decision tree:
   ```text
   User visits content page
       ↓
   System checks device storage
       ├→ No previous session found
       │    └→ Show email entry form (Prompt 3A flow)
       │
       └→ Previous session found
            ├→ Check session validity
            │    ├→ Invalid (corrupted)
            │    │    └→ Show "Session Invalid" error
            │    │         └→ Fallback to email entry form
            │    │
            │    └→ Valid
            │         └→ Check session within recovery lifetime
            │              ├→ Expired (Decision 2-dependent)
            │              │    └→ Show "Session Expired" error
            │              │         └→ Fallback to email entry form
            │              │
            │              └→ Valid + Within Lifetime
            │                   ├→ [Decision 1 race handling]
            │                   │    ├→ Recovery only (no conflict)
            │                   │    │    └→ Show "Restoring Access..."
            │                   │    │         └→ Grant access
            │                   │    │
            │                   │    └→ Concurrent recovery + fresh verification
            │                   │         ├→ [Decision 1 strategy]
            │                   │         └→ Proceed with chosen path
   ```

2. Label each decision point with decision number
3. Indicate what (if anything) user sees at each state
4. Show fallback paths clearly

### Phase 5: Document Error Messaging

Create error message specification table:

| Recovery Failure | Error Message | User Action | Fallback |
| ------------------ | --------------- | ------------- | ---------- |
| Session Expired | (Decision 2-based) | Click "Request New Code" | Email entry form |
| Session Invalid | "Access Unavailable. Verify email to continue." | Click "Request New Code" | Email entry form |
| Race Condition | (Decision 1-based) | (Decision 1-based) | (Decision 1-based) |

### Phase 6: Document Fallback Strategy

When recovery is unavailable, document the fallback process:

1. **Fallback Trigger**: Recovery fails for any reason
2. **Fallback Action**: Return to email entry form (Prompt 3A)
3. **User Communication**:
   - Show clear message explaining why recovery isn't available
   - Provide friction-free path to fresh verification
   - Reassure user that email will be sent shortly
4. **No Loops**: Ensure user cannot get stuck in recovery → fallback → recovery cycle

### Phase 7: Validation

1. ✅ Recovery flow follows Decision 1 race-condition strategy (once selected)
2. ✅ Session lifetime enforcement matches Decision 2 selection (once selected)
3. ✅ All recovery failure states designed (expired, invalid, race-condition)
4. ✅ Error messages clearly explain recovery failure reason
5. ✅ Recovery success path matches reader access policy (10-min codes, 30-day device lifecycle)
6. ✅ Fallback to fresh email verification documented when recovery unavailable
7. ✅ Flow diagram shows all decision points and paths
8. ✅ All acceptance criteria met

---

## Deliverables (Once Decisions 1 & 2 Resolved)

1. **Recovery Flow Specification**
   - Decision 1 selected option and implementation strategy
   - Decision 2 selected option and session lifetime window
   - All recovery states documented (success, expired, invalid, race-condition)
   - Race-condition handling detailed per Decision 1

2. **Recovery Flow Designs**
   - Recovery success state (with auto-redirect path)
   - Session expired error state
   - Session invalid error state
   - Race condition state (Decision 1-dependent)
   - Fallback to fresh email verification

3. **Recovery Flow Diagram**
   - Complete decision tree showing all paths
   - Decision points labeled with numbers
   - User visible states and actions
   - Fallback paths clearly indicated

4. **Error Message Documentation**
   - All error messages for recovery failures
   - Clear explanation of what went wrong
   - User action for each error state
   - Fallback path documented

5. **Validation Report**
   - Checklist confirming all 6 acceptance criteria met
   - Decision 1 & 2 impact analysis
   - Fallback testing scenarios

---

## Success Definition

✅ **Prompt 3B is complete when** (after Decisions 1 & 2 resolved):
- Recovery flow follows selected Decision 1 strategy exactly
- Session lifetime enforcement matches selected Decision 2 option exactly
- All recovery states designed (success, expired, invalid, race-condition)
- Race-condition handling documented per Decision 1 option
- Error messages distinguish failure reasons
- Fallback to fresh verification works seamlessly
- Flow diagram shows complete decision tree
- All acceptance criteria (CR-3B.1 through CR-3B.6) verified
- Implementation team can build recovery system from specification

---

## Unblocking This Prompt

**Step 1**: Resolve Decision 1 (Recovery-First Race Condition)
- Review options A/B/C/D in `research.md`
- Select preferred strategy
- Document tradeoffs (UX vs. security vs. complexity)

**Step 2**: Resolve Decision 2 (Recovery Lifetime Eligibility)
- Review options A/B/C/D in `research.md`
- Select recovery window
- Confirm aligns with policy (30-day device lifecycle)

**Step 3**: Notify implementation team with selected options

**Step 4**: Update this guide with decisions

**Step 5**: Execute Prompt 3B with Figma Make using updated specifications

---

## Blocking Status

✅ Decisions resolved:
- Decision 1: Recovery-First Race Condition — Option A
- Decision 2: Recovery Lifetime Eligibility — Option A (absolute 30-day expiry)

⏸️ **Deferred**: do not execute this prompt until the manuscript is approved (Decision 5) and the execution gates in [spec.md](../spec.md) are cleared.

---

## Related Specifications

- Reader Access Policy: 06-website-reading-prd.md (v1.1.1)
- Recovery Analysis: research.md (Decisions 1 & 2 detailed options)
- Design Baseline: 04-design-brief.md (v1.1.2)
- Prompt 3A: Reader Access Copy & Forms (form baseline)

---

## Next Steps (After Prompt 3B)

Once Prompt 3B is complete:
- **Prompt 3C** (Error States) — Builds on recovery error messaging
- All reader access flows complete and integrated
- Session recovery system ready for implementation
