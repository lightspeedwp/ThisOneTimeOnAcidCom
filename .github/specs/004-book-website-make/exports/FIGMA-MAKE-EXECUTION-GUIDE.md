# Figma Make Execution Guide — Spec 004 Phase B

**Status**: Manual Figma Design Work (Figma Make environment not automated)  
**Date**: 2026-11-19  
**Designer**: [Assign designer name]  
**Timeline**: 45–60 minutes (parallel execution)

---

## Important: Manual Figma Design Work

Figma Make automated execution is **NOT available**. The prompts below specify exact design work for manual creation in Figma or design tool of choice.

**All Decisions Are Locked** — no further approval needed. Designer can proceed with implementation.

---

## Prompt 3A: Reader Access Copy & Forms (15–20 minutes)

### Design Components to Create

| Component              | States                                    | Reference                              |
| ---------------------- | ----------------------------------------- | -------------------------------------- |
| Email Template Mockup  | (single)                                  | Copy approved by Ash 2026-11-13        |
| Email Entry Form       | default, focused, error                   | Label + placeholder specified          |
| Code Entry Form        | default, focused, error, loading, success | 6-char input with states               |
| Success Confirmation   | (single)                                  | "Access confirmed. You can now read."  |
| Newsletter CTA Section | (single)                                  | Separate from verification, Brevo link |

### Exact Copy to Use

**Email Subject**: `Your reading code`

**Email Body**:

````text
Hi,

Here's your reading code for This One Time On Acid:

    [CODE]

Enter it on the site to start reading.
It works once and expires 10 minutes after it was sent.

Didn't ask for this? You can ignore this email.

— Ash
```text

**Email Form Label**: "Enter your email address"
**Email Form Placeholder**: "you@example.com"
**Email Form Button**: "Send Code"
**Email Form Help**: "We'll email you a 10-minute code. No subscription required."
**Email Form Error**: "Invalid email format"

**Code Form Label**: "Enter your code"
**Code Form Placeholder**: "XXXXXX" (6 characters)
**Code Form Button**: "Verify Access"
**Code Form Help**: "Check your email for your 10-minute code"

**Error Messages**:
- "Invalid code" (wrong characters)
- "Code expired — it was valid for 10 minutes from when it was generated" (Decision 3)
- "Rate limited: Too many failed attempts"

**Success Message**: "Access confirmed. You can now read."
**Newsletter CTA**: "Stay Updated — Join our newsletter for book updates (optional). This is separate from reading access."
**Newsletter Link**: Brevo external signup page (URL to be supplied by developer)

### Design Baseline to Use

- **Typography**: Space Grotesk (headings), Inter (body, UI)
- **Colors**: 9-color palette from design-baseline (see `.github/specs/004-book-website-make/exports/design-baseline-validation.md`)
- **Button Style**: Primary (Send Code), Secondary (Verify Access)
- **Error State**: Error-color border, error-text red accent

### Acceptance Criteria Checklist

- [ ] Email template matches exact copy (Ash approved 2026-11-13)
- [ ] All form states designed (default, focused, error, loading, success)
- [ ] Error messages distinguish failure types
- [ ] Code expiry messaging says "10 minutes from when it was generated"
- [ ] Newsletter CTA in separate section (NOT mixed with verification)
- [ ] Newsletter language clearly optional/separate
- [ ] No success claims without server confirmation
- [ ] All typography + colors from design baseline applied

---

## Prompt 3B: Recovery Flows (15–20 minutes)

### Design Components to Create

| Component | States | Reference |
| --- | --- | --- |
| Recovery Success | (single) | "Access restored from previous session" |
| Session Expired | (single) | "Session expired — 30 days elapsed" |
| Invalid Session | (single) | "Session invalid — requires re-verification" |
| Race Condition | (single with loader) | "Access being restored... Please wait" |

### Exact Logic to Document

**Recovery Success Path**:
- System validates session is within 30 days of initial verification (Decision 2)
- System grants access without requiring fresh email verification
- Successful recovery refreshes the session but does NOT move the absolute 30-day expiry
- Display: "Access restored from previous session"

**Session Expired**:
- More than 30 days since initial verification, regardless of recovery activity
- Display: "Session expired — please request a new code"
- Action: Link to "Request new code" (back to email entry form)

**Invalid Session**:
- Session corrupted or tampered
- Display: "Session invalid — requires re-verification"
- Action: Link to email entry form

**Race Condition** (Decision 1 — Recovery takes precedence):
- Recovery and fresh verification run simultaneously
- Recovery takes precedence; fresh verification is cancelled
- Display: "Access being restored from previous session. Please wait..."
- State: Loading indicator
- Result: Auto-redirect when recovery completes; if fails, fresh verification continues

### Decision Integration

| Decision | Applied To | Details |
| --- | --- | --- |
| **Decision 1** | Race condition handling | Recovery takes precedence; cancel fresh verification if recovery succeeds |
| **Decision 2** | Session lifetime | 30-day absolute expiry from initial verification; recovery refreshes cannot extend it |
| **Decision 5** | Manuscript scenario | Integrates with Chapter 1 live; other chapters pending approval |

### Acceptance Criteria Checklist

- [ ] Recovery success state designed
- [ ] Session-expired error designed
- [ ] Invalid session error designed
- [ ] Race condition handling designed with loader
- [ ] All error messages clearly explain recovery failure reason
- [ ] Recovery path matches reader access policy (10-minute codes, 30-day device lifecycle)
- [ ] Fallback to fresh email verification documented
- [ ] 30-day absolute expiry clearly communicated

---

## Prompt 3C: Error States (15–20 minutes)

### Design Components to Create

| Error Type | Form State | Message |
| --- | --- | --- |
| **Invalid Code** | Error border + text | "Invalid code. Please check and try again." |
| **Code Expired** | Error border + text | "Code expired — it was valid for 10 minutes from when it was generated." |
| **Rate Limited** | Disabled + timer | "Too many failed attempts. Please try again in 15 minutes." |
| **Server Error** | Disabled input + enabled retry | "We're having trouble verifying your code. Please try again in a moment." |
| **Session Conflict** | Loading indicator | "Access being restored from previous session. Please wait..." |

### Exact Messaging (Decision 3 — Code Expiry from Generation)

**Invalid Code Error**:
- Message: "Invalid code. Please check and try again."
- State: Form displays error border/colour, error text below input
- Action: User can retry (form remains open)

**Code Expired Error**:
- Message: "Code expired — it was valid for 10 minutes from when it was generated."
- State: Form displays error state, suggests requesting a new code
- Action: Link to "Request new code" triggers fresh email entry

**Rate Limited Error**:
- Message: "Too many failed attempts. Please try again in 15 minutes."
- State: Form disabled, countdown timer shown (15 min)
- Action: User waits for cooldown, form re-enables

**Server Error State**:
- Message: "We're having trouble verifying your code. Please try again in a moment."
- State: Form input disabled, retry button enabled
- Action: User can retry or request new code

**Session Conflict Error** (Decision 1 — Race Condition):
- Message: "Access being restored from previous session. Please wait..."
- State: Form shows loading indicator; recovery takes precedence over pending fresh verification
- Action: Auto-redirect when session recovery completes; if recovery fails, fresh verification continues

### Design Requirements

- **Error State Styling**: Error-color border (from design baseline), error-text red accent
- **Typography**: Inter (body) for all error messages
- **Icons**: Optional — error icon, timer icon for rate-limited, loading spinner for session conflict
- **User Actions**: Retry, request new code, wait logic all clearly documented

### Acceptance Criteria Checklist

- [ ] All 5 error states designed
- [ ] Code expiry message states "10 minutes from when it was generated" (Decision 3)
- [ ] Error messages distinguish failure reasons (user-error, timing, rate-limit, server, race)
- [ ] Each error state includes user action (retry, wait, request new code)
- [ ] Form styling consistent with design baseline (error colors, typography)
- [ ] Loading state has spinner/visual indicator for session conflict
- [ ] Countdown timer shows for rate-limited state

---

## Execution Timeline

| Phase | Prompt | Timeline | Designer |
| --- | --- | --- | --- |
| **A** | 3A: Reader Access Copy & Forms | 15–20 min | [Assign] |
| **A** | 3B: Recovery Flows | 15–20 min | [Assign] (can run parallel) |
| **A** | 3C: Error States | 15–20 min | [Assign] (can run parallel) |
| **B** | Integration into Spec 005 | (after 3A/3B/3C) | Development team |

**Wall Clock Time**: 15–20 minutes (parallel execution of 3A, 3B, 3C)

---

## Deliverables Expected

**From Designer**:
1. Figma mockups or design file showing all components and states
2. Exported assets (PNG, SVG, or design system component exports)
3. Acceptance criteria sign-off checklist (above)

**Next Step (Development Integration)**:
1. Developers implement forms + logic based on designer outputs
2. Backend (Netlify Functions) validates codes + manages sessions
3. Frontend integrates reader-access forms + error states
4. E-reader displays Chapter 1 + "More chapters coming" messaging

---

## Decision Integration Summary

✅ **Decision 1** (Recovery-first race): Error state 5 (session-conflict handling)
✅ **Decision 2** (Recovery lifetime): Recovery flow (30-day absolute expiry)
✅ **Decision 3** (Code expiry): Error state 2 message ("10 minutes from generation")
✅ **Decision 4** (Email provider): Prompt 3A email template (SendGrid SMTP)
✅ **Decision 5** (Manuscript approval): All prompts integrated with "Chapter 1 live" messaging
✅ **Decision 6** (Newsletter destination): Prompt 3A CTA (Brevo external link)

---

## Sign-Off

**Designer Name**: ___________________
**Date Completed**: ___________________
**Acceptance Criteria**: ☐ All pass
**Figma Export**: ☐ Ready for development integration

---

**Version**: 1.0.0 | **Status**: Ready for Manual Design Work | **Date**: 2026-11-19

````
