# Figma Make Prompt 3C: Error States — Execution Guide

**Status**: ❌ BLOCKED — Awaiting Decision 3 (partially blocked by Decision 1)  
**Scope**: Error state designs and messaging for reader access flow  
**Approval Gate**: Gates 1, 2 ✅ COMPLETE  
**Dependencies**: Prompt 3A (Reader Access Copy & Forms) — Provides form baseline

---

## Executive Summary

Design all error state designs and messaging for reader access flow, with code-expiry message reflecting Decision 3 selection (from generation / receipt / page load).

**Deliverable** (Once Decision 3 resolved):
- 5 error state designs (invalid code, expired code, rate-limited, server error, session conflict)
- All error messages with Decision 3-specific expiry language
- Error state form styling (borders, text color, icons)
- User actions documented for each error
- Accessible error handling (keyboard navigation, screen readers)

**Outcome**: Implementation team can display clear, actionable error messages that guide users to resolution.

---

## Blocking Decisions (MUST Be Resolved First)

### Decision 3: Code Expiry Start Time
**Question**: When does 10-minute code expiry clock start?

**Impact**: Determines error message language and user guidance when code expires.

**Options Under Review**:

| Option | Expiry Timing | User Message | Implication |
|--------|---------------|--------------|-------------|
| **A: From Generation** | 10 min from when code is generated in backend | "Code expired. Generated [X minutes ago]." | User sees exact generation time; clear but technical |
| **B: From Receipt** | 10 min from when email is received (uncertain timing) | "Code expired. Email received [X minutes ago]." | Accounts for delivery delays; more user-focused |
| **C: From Page Load** | 10 min from when user loads verification page | "Code expired. Please request a new one." | Simplest messaging; no timing explanation needed |

**Status**: ⏳ PENDING — See `research.md` for detailed analysis

### Decision 1: Recovery-First Race Condition (Affects Error 5)
**Note**: Decision 1 (from Prompt 3B) impacts the "Session Conflict Error" state. Until both decisions are resolved, Errors 1-4 can be designed, but Error 5 may need adjustment.

---

## Reader Access Flow Context

From 06-website-reading-prd.md (v1.1.1):

- **Verification code**: 10-minute, one-time use
- **Rate limiting**: Typical failure threshold (e.g., 5 attempts)
- **Retry behavior**: User can retry or request new code
- **Session recovery**: Optional (Prompt 3B) on same device within policy window

---

## The Work (Execution Steps After Decision 3 Resolved)

### Phase 1: Update Specification with Decision 3 Selection

**Once Decision 3 is resolved**:

1. Receive selected option (A, B, or C)
2. Update this guide with confirmed selection
3. Document the exact expiry message language
4. Finalize "Code Expired" error messaging with decision-specific wording
5. Update acceptance criteria with decision-specific requirements

**Example (if Decision 3=A, "From Generation")**:
```text
Expiry Clock Starts: When code is generated in backend
Expiry Window: 10 minutes
Expired Error Message: "Code expired. Generated [X minutes ago]. Request a new code."
User Guidance: User sees clear timing reference; understands email delay isn't problem
```text

### Phase 2: Design Error State 1 — Invalid Code

**Trigger**: User enters wrong characters (not a valid code format)

**User Experience**:
```text
Form displays:
  Label: "Enter your code"
  Input: [XXX-XXX] (with invalid entry attempt)
  Error message: "Invalid code. Please check and try again."
  Button: "Verify Access" (disabled)
```text

**Design Specifications**:

- **Input styling**:
  - Border: Error color (#8b0000 light / #ff6b6b dark)
  - Background: Optional light red tint (very subtle)
  - Font: Inter, 14px, 400 weight

- **Error icon**: Red X or exclamation mark, 16px, left of error text

- **Error message**:
  - Text: "Invalid code. Please check and try again."
  - Font: Inter, 12px, 400 weight
  - Color: Error color (#8b0000 light / #ff6b6b dark)
  - Position: Below input field
  - Icon: Error symbol

- **Button state**:
  - "Verify Access" button: Disabled (grayed out or dimmed)
  - Enable button when user corrects input

- **User action**: User can correct input immediately; form remains open

- **Accessibility**:
  - Error message announced to screen readers
  - `aria-live="polite"` on error message container
  - `aria-describedby` linking input to error text
  - Keyboard focus remains in input field for easy correction

### Phase 3: Design Error State 2 — Code Expired (Decision 3-Dependent)

**Trigger**: Code exceeded 10-minute window

**Decision 3 Impact** (select based on resolved option):

#### If Decision 3=A (From Generation):
```text
Error Message: "Code expired. Generated [X minutes ago]. Request a new code."
Additional Info: Show generation timestamp if available
User Guidance: Clear technical explanation; implies email delivery wasn't the problem
```text

#### If Decision 3=B (From Receipt):
```text
Error Message: "Code expired. Email received [X minutes ago]. Request a new code."
Additional Info: Estimated receipt time
User Guidance: Accounts for email delivery variability; user-focused
```text

#### If Decision 3=C (From Page Load):
```text
Error Message: "Code expired. Please request a new code and enter it within 10 minutes."
Additional Info: Refresh/reload instruction
User Guidance: No timing details; clear next steps
```text

**Design Specifications**:

- **Form state**:
  - Input: Error border (#8b0000 light / #ff6b6b dark)
  - Input: Disabled (read-only); user cannot edit expired code
  - Error icon: Red X or exclamation mark

- **Error message**:
  - Font: Inter, 12px, 400 weight
  - Color: Error color
  - Position: Below input field
  - Include Decision 3-specific timing language

- **Button options**:
  - "Verify Access" button: Disabled
  - "Request New Code" button: Enabled (blue/accent color)
  - Button text: "Request New Code" (Inter, 14px, 600 weight)

- **User action**: Click "Request New Code" to:
  - Close expired code form
  - Re-open email entry form (Prompt 3A)
  - User provides email again
  - New code sent immediately

- **Accessibility**:
  - Error message announced
  - `aria-live="polite"` on error container
  - Focus shifts to "Request New Code" button for easy access
  - Keyboard navigation allows tabbing to button

### Phase 4: Design Error State 3 — Rate Limited

**Trigger**: User exceeded retry attempts (e.g., 5+ failed codes)

**User Experience**:
```text
Form displays:
  Label: "Enter your code"
  Input: [disabled] (read-only)
  Error message: "Too many failed attempts. Try again in 15 minutes."
  Countdown timer: 15:00 ↓ 14:59 ↓ 14:58... (updates in real-time)
  Button: "Verify Access" (disabled)
  Secondary button: "Request New Code" (enabled)
```text

**Design Specifications**:

- **Input styling**:
  - Border: Warning/error color
  - Background: Disabled state (grayed out)
  - Cursor: Not allowed
  - Font: Neutral-dark color (to indicate disabled)

- **Error message**:
  - Text: "Too many failed attempts. Try again in 15 minutes."
  - Font: Inter, 12px, 400 weight
  - Color: Error color (#8b0000 light / #ff6b6b dark)
  - Icon: Warning symbol or timer icon

- **Countdown timer**:
  - Format: "MM:SS" (e.g., 15:00)
  - Font: Inter, 14px, 600 weight (monospace for clarity)
  - Color: Error color
  - Position: Below error message
  - Updates every second in real-time
  - When timer reaches 00:00:
    - Button re-enables automatically
    - Input becomes editable
    - Message updates: "You can try again now" (optional)
    - Timer disappears

- **Button options**:
  - "Verify Access" button: Disabled until countdown expires
  - "Request New Code" button: Enabled immediately
    - Allows user to request fresh code instead of waiting

- **User actions**:
  - Wait for countdown (15 minutes typical)
  - OR click "Request New Code" to start fresh verification

- **Accessibility**:
  - Error message announced
  - Timer updates announced every minute (e.g., "14 minutes remaining")
  - `aria-live="assertive"` for timer updates
  - Focus management: Keep focus visible on form area
  - Keyboard navigation: Tab to "Request New Code" button

### Phase 5: Design Error State 4 — Server Error

**Trigger**: Backend service unavailable or verification service fails

**User Experience**:
```text
Form displays:
  Label: "Enter your code"
  Input: [XXXXXX] (disabled for retry)
  Error message: "We're having trouble verifying your code. Please try again in a moment."
  Button 1: "Try Again" (enabled, blue)
  Button 2: "Request New Code" (enabled, secondary style)
```text

**Design Specifications**:

- **Input styling**:
  - Border: Error/warning color
  - Background: Light tint (to indicate temporary issue)
  - Font: Neutral color (indicates read-only temporarily)

- **Error message**:
  - Text: "We're having trouble verifying your code. Please try again in a moment."
  - Font: Inter, 12px, 400 weight
  - Color: Error color (#8b0000 light / #ff6b6b dark)
  - Icon: Warning or server error symbol

- **Button options**:
  - "Try Again" button: Enabled (accent color)
    - Retry verification with same code
    - Shows loading spinner on click
    - Resets form on success or shows error again on failure
  - "Request New Code" button: Enabled (secondary style)
    - Fallback if issue persists
    - Routes to email entry form

- **User actions**:
  - Click "Try Again" to retry (code still valid)
  - Click "Request New Code" if retries fail (code may have expired while waiting)

- **Accessibility**:
  - Error message announced
  - `aria-live="polite"` on error container
  - Focus on "Try Again" button for easy access
  - Button labels clearly indicate actions

### Phase 6: Design Error State 5 — Session Conflict (Decision 1-Dependent)

**Trigger**: Session recovery and fresh verification attempt occur simultaneously (from Prompt 3B)

**Note**: This error state is partially dependent on Decision 1 from Prompt 3B. Once Decision 1 is resolved, this state will be finalized.

**Pending Decision 1 Options**:

#### If Decision 1=A (Recovery Takes Precedence):
```text
Form behavior: Email entry form closes; shows recovery message instead
Message: "Access being restored from previous session. Please wait..."
Form: Hidden/replaced with recovery UI
User action: Wait for auto-redirect to content (no form interaction)
```text

#### If Decision 1=D (User Chooses Explicitly):
```text
Form behavior: Both email entry and recovery buttons shown
Message: "Restore access from previous session or use new code?"
Buttons: 
  - "Restore Previous Session" 
  - "Request New Code"
User action: Click preferred option
```text

**Design Specifications** (Common to all Decision 1 options):

- **Loading state** (for A/C options):
  - Spinner: Centered, 32px, accent color
  - Message: "Access being restored from previous session. Please wait..."
  - Font: Inter, 14px, 500 weight
  - Duration: Variable (until recovery completes or fails)
  - Auto-redirect or show "Access confirmed" when complete

- **Choice state** (for D option):
  - Two equal-weight buttons:
    - "Restore Previous Session" (accent color)
    - "Request New Code" (secondary color)
  - Brief explanation of difference
  - User decides which path to take

- **Accessibility**:
  - Loading spinner has `aria-label="Restoring access"`
  - Buttons have clear labels
  - Loading message announced by screen readers

**Implementation Note**: Finalize this state once Decision 1 is resolved in Prompt 3B.

### Phase 7: Design Loading & Success States (Not Errors, but Related)

**Loading State** (during code verification):
- Spinner in input area or button area
- Button text: "Verifying..." (optional)
- Input: Disabled during verification
- No error shown yet

**Success State** (code valid, access granted):
- Success message: "Access confirmed. You can now read."
- Message color: Success color (#2d5016 light / #90ee90 dark)
- Icon: Checkmark, 24px
- Auto-redirect to content (2-3 second delay) OR
- Button: "Continue to content" (if immediate redirect not used)

### Phase 8: Create Error State Specification Table

Document all 5 error states with user guidance:

| Error | Trigger | Message | User Action | Fallback |
|-------|---------|---------|-------------|----------|
| Invalid Code | Wrong characters | "Invalid code. Check and try again." | Correct input & retry | N/A |
| Code Expired | 10+ minutes passed | (Decision 3 option) | "Request New Code" | Email entry form |
| Rate Limited | 5+ failed attempts | "Too many attempts. Try again in 15:00." | Wait 15 min or new code | Request new code |
| Server Error | Backend fails | "Having trouble. Try again in a moment." | "Try Again" or new code | Email entry form |
| Session Conflict | Recovery + fresh verification | (Decision 1 option) | (Decision 1 option) | (Decision 1 option) |

### Phase 9: Validation

1. ✅ All 5 error states designed (invalid, expired, rate-limited, server, session-conflict)
2. ✅ Code expiry message reflects Decision 3 selection
3. ✅ Error messages distinguish failure reasons
4. ✅ Each error state includes user action (retry, wait, request new code)
5. ✅ Form styling consistent with design baseline (colors, typography)
6. ✅ Help text clearly explains what went wrong and what user should do
7. ✅ Countdown timer shown for rate-limit error
8. ✅ All error states accessible to keyboard/screen readers

---

## Deliverables (Once Decision 3 Resolved)

1. **Error State Designs**
   - Invalid code error state
   - Code expired error state (Decision 3-specific messaging)
   - Rate-limited error state (with countdown timer)
   - Server error state
   - Session conflict error state (pending Decision 1)

2. **Error Message Specification**
   - All error messages documented
   - Decision 3-specific expiry language
   - User actions for each error
   - Fallback paths documented

3. **Form State Styling Guide**
   - Error border colors (light & dark themes)
   - Error text colors and sizes
   - Icon specifications
   - Button disabled/enabled states
   - Loading spinner specifications

4. **Accessibility Documentation**
   - ARIA attributes for all states
   - Keyboard navigation paths
   - Screen reader announcements
   - Focus management

5. **Validation Report**
   - Checklist confirming all 8 acceptance criteria met
   - Decision 3 impact analysis
   - Session conflict (Decision 1) dependency noted

---

## Success Definition

✅ **Prompt 3C is complete when** (after Decision 3 resolved):
- All 5 error states designed and specified
- Code expired error message reflects Decision 3 selection exactly
- Error messages distinguish failure reasons clearly
- Each error state includes user action and fallback path
- Form styling consistent with design baseline
- Help text clearly guides user to resolution
- Countdown timer visible for rate-limited error
- All error states accessible (keyboard, screen readers)
- All acceptance criteria (CR-3C.1 through CR-3C.8) verified
- Implementation team can build error handling system from specification

---

## Acceptance Criteria (Pending Decision 3)

✅ **CR-3C.1**: All 5 error states designed (invalid, expired, rate-limited, server, session-conflict)

✅ **CR-3C.2**: Code expiry message reflects Decision 3 selection (clear timing explanation)

✅ **CR-3C.3**: Error messages distinguish failure reasons (user-error vs. timing vs. rate-limit vs. server)

✅ **CR-3C.4**: Each error state includes user action (retry, wait, request new code)

✅ **CR-3C.5**: Form styling consistent with approved design baseline (colors, typography)

✅ **CR-3C.6**: Help text clearly explains what went wrong and what user should do

✅ **CR-3C.7**: Countdown timer shown for rate-limit error

✅ **CR-3C.8**: All error states accessible to keyboard/screen readers

---

## Unblocking This Prompt

**Step 1**: Resolve Decision 3 (Code Expiry Start Time)
- Review options A/B/C in `research.md`
- Select expiry timing method
- Document user message language

**Step 2**: Confirm Decision 1 status from Prompt 3B
- Error 5 (Session Conflict) may depend on Decision 1
- Coordinate with 3B once both decisions selected

**Step 3**: Notify implementation team with Decision 3 selection

**Step 4**: Update this guide with decision

**Step 5**: Execute Prompt 3C with Figma Make using updated specifications

---

## Blocking Status

🔴 **CANNOT PROCEED FULLY** until Decision 3 is made:
- Decision 3: Code Expiry Start Time (PENDING)

🟡 **PARTIALLY BLOCKED**:
- Error 5 (Session Conflict) awaits Decision 1 from Prompt 3B

❌ **Do not attempt to execute this prompt until Decision 3 is resolved.**

---

## Related Specifications

- Code Expiry Analysis: research.md (Decision 3 detailed options)
- Reader Access Form: Prompt 3A (form baseline for error states)
- Recovery Flows: Prompt 3B (Session conflict error context)
- Design Baseline: 04-design-brief.md (v1.1.2)

---

## Next Steps (After Prompt 3C)

Once Prompt 3C is complete:
- All reader access error states designed and documented
- Implementation team can build robust error handling
- Complete reader access flow (Prompts 3A, 3B, 3C) ready for development
