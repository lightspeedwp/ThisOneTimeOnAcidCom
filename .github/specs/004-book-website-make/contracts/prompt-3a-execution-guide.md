# Figma Make Prompt 3A: Reader Access Copy & Forms — Execution Guide

**Status**: ✅ UNBLOCKED (waiting for Decisions 3, 4, 5, 6)  
**Scope**: Email verification copy, form wording, error messages, newsletter CTA  
**Approval Gate**: Gates 1, 2 ✅ COMPLETE  
**Dependencies**: Prompt 2A (Design System Baseline) — Uses exported typography and colors

---

## Executive Summary

Design exact email verification copy, form wording, error messages, and newsletter CTA specifications—separate newsletter signup from reading verification per approved decision.

**Deliverable**: Complete email template mockup + form designs showing:
- Email template with exact subject, body, and footer copy
- Email entry form (label, input, button, error states)
- Code entry form (label, input, button, all state variations)
- Success confirmation message
- Newsletter CTA section (separate, non-subscription language)
- All form states (default, focused, error, loading, success)

**Outcome**: Implementation team has exact copy specifications and form designs for reading verification flow.

---

## The Work

### 1. Email Copy (Approved Source: 06-website-reading-prd.md v1.1.1)

#### Email Subject
```text
Your reading code for ThisOneTimeOnAcidCom
```text

#### Email Body
```text
Hi [Reader],

We've sent you a 10-minute access code below. Enter it on the website to start reading.

**Your Code: XXXXXX**

This code expires [based on Decision 3: from generation / receipt / page load].

Questions? Reply to this email.

— The ThisOneTimeOnAcidCom Team
```text

#### Email Footer
```text
You received this because you requested reading access. [Newsletter Signup Link - see below]
```text

**Key Details**:
- All copy is exact—no modifications without approval
- [Reader] placeholder for recipient's name/email
- Code is 6 characters (uppercase)
- Expiry timing depends on Decision 3 (TBD: generation time, receipt time, or page load time)
- Footer links to newsletter section (NOT mixing with verification)

### 2. Form Specification

#### Email Entry Form

**Layout**:
- Label: "Enter your email address"
- Placeholder: "you@example.com"
- Button text: "Send Code"
- Help text: "We'll email you a 10-minute code. No subscription required."

**States**:
- **Default**: Input empty, placeholder visible, button enabled
- **Focused**: Input focused (border highlight per design system)
- **Filled**: Email entered correctly, button enabled
- **Loading**: Button shows spinner/loading state, input disabled
- **Error**: Invalid email format
  - Error message: "Invalid email format"
  - Error styling: Red border + error icon + error text below input
  - Button disabled until error cleared

**Typography**:
- Label: Inter, 14px, 500 weight, primary text color
- Placeholder: Inter, 14px, 400 weight, neutral-dark color
- Help text: Inter, 12px, 400 weight, neutral-dark color
- Error text: Inter, 12px, 400 weight, error color

#### Code Entry Form

**Layout**:
- Label: "Enter your code"
- Placeholder: "XXXXXX" (6 character positions)
- Button text: "Verify Access"
- Help text: "Check your email for your 10-minute code"

**States**:
- **Default**: Input empty, placeholder visible, button enabled
- **Focused**: Input focused (border highlight per design system)
- **Filled**: 6 characters entered, button enabled
- **Loading**: Button shows spinner/loading state, input disabled
- **Error (Invalid)**: Wrong characters entered
  - Error message: "Invalid code"
  - Error styling: Red border + error icon + error text below input
  - Button disabled until corrected
- **Error (Expired)**: Code expired [decision-based message]
  - Error message varies by Decision 3:
    - If expiry from generation: "Code expired. Request a new code."
    - If expiry from receipt: "Code expired. Request a new code."
    - If expiry from page load: "Code expired. Refresh the page and try again."
  - Error styling: Red border + error icon + error text below input
  - Button disabled; user must request new code or refresh
- **Error (Rate Limited)**: Too many failed attempts
  - Error message: "Rate limited: Too many failed attempts. Try again in [X] minutes."
  - Error styling: Red border + error icon + error text below input
  - Button disabled until rate limit expires
- **Success**: Code verified successfully
  - Success message: "Access confirmed. You can now read."
  - No error styling; green checkmark optional
  - Auto-redirect to book content (or show redirect countdown)

**Typography**:
- Label: Inter, 14px, 500 weight, primary text color
- Placeholder: Inter, 14px, 400 weight, neutral-dark color
- Help text: Inter, 12px, 400 weight, neutral-dark color
- Error text: Inter, 12px, 400 weight, error color
- Success text: Inter, 12px, 400 weight, success color

### 3. Newsletter CTA (Separate from Verification)

**Newsletter Section** (completely separate from reader access form):

**Heading**: "Stay Updated"
**Copy**: "Join our newsletter for book updates (optional)."
**Link text**: "Sign up" (or "Learn more" / "Subscribe" per Decision 6)
**Link destination**: [Decision 6 selected option]

**Important Language**:
"This is separate from reading access. Uncheck to read without subscribing."

**Rationale**: Explicitly clarify that newsletter subscription is NOT required to read. Users must have the choice to verify access WITHOUT subscribing.

**Placement**: Below the reader access verification forms, clearly visually separated (e.g., different background, section divider, or distinct card).

---

## Design Specifications

### Color Palette (From Prompt 2A Baseline)

| Property | Light Theme | Dark Theme |
| ---------- | ------------- | ----------- |
| Primary Text | #1a1a1a | #ffffff |
| Secondary Text | #666666 | #cccccc |
| Neutral Light | #f5f5f5 | #333333 |
| Border | #cccccc | #444444 |
| Accent (hover/active) | #e8d4b8 | #d4a574 |
| Success | #2d5016 | #90ee90 |
| Error | #8b0000 | #ff6b6b |
| Warning | #b8860b | #ffd700 |

### Typography (From Prompt 2A Baseline)

| Element | Font | Weight | Size |
| --------- | ------ | -------- | ------ |
| Label | Inter | 500 | 14px |
| Input/Placeholder | Inter | 400 | 14px |
| Help text | Inter | 400 | 12px |
| Error text | Inter | 400 | 12px |
| Button text | Inter | 600 | 14px |

### Form Input Styling

| Property | Light Theme | Dark Theme |
| ---------- | ------------- | ----------- |
| Background | #ffffff | #1a1a1a |
| Border (default) | #cccccc | #444444 |
| Border (focused) | #e8d4b8 | #d4a574 |
| Border (error) | #8b0000 | #ff6b6b |
| Border radius | 4px | 4px |
| Padding | 8px 12px | 8px 12px |

---

## Acceptance Criteria

All of these must be true when complete:

✅ **CR-3A.1**: Email copy matches approved source exactly (no modifications)
- Subject line verbatim: "Your reading code for ThisOneTimeOnAcidCom"
- Body copy exactly as specified (including placeholder format)
- Footer copy exactly as specified

✅ **CR-3A.2**: All form states designed (default, focused, error, loading, success)
- Email entry form: 5 states minimum (default, focused, filled, loading, error)
- Code entry form: 6 states minimum (default, focused, filled, loading, error, success)

✅ **CR-3A.3**: Error messages distinguish failure scenarios (invalid, expired, rate-limited)
- Invalid code: "Invalid code"
- Expired code: Message reflects Decision 3 timing
- Rate limited: "Rate limited: Too many failed attempts. Try again in [X] minutes."

✅ **CR-3A.4**: Code expiry messaging reflects Decision 3 selection (timing clarity)
- Decision 3 determines expiry start point (generation / receipt / page load)
- Error message on code form clearly indicates when/how to resolve

✅ **CR-3A.5**: Newsletter CTA in separate section (NOT mixed with verification)
- Visually distinct from reader access forms
- Different background or clear section divider
- Separate heading and copy

✅ **CR-3A.6**: Newsletter link clearly non-subscription ("optional", "separate")
- Explicit language: "This is separate from reading access"
- Unambiguous that subscription is NOT required to read
- "Uncheck to read without subscribing" or similar clarification

✅ **CR-3A.7**: No success claims without server confirmation
- "Sent!" not claimed until email truly sent (server confirms)
- "Check your email" after send button clicked (not claimed as success)
- "Access confirmed" only shown after server validates code

✅ **CR-3A.8**: All help text and labels match approved source
- Every label, placeholder, help text, error message matches specification exactly
- No paraphrasing or rewording

---

## Step-by-Step Execution

### Phase 1: Email Template Design

1. Open ThisOneTimeOnAcidCom Figma file
2. Create or locate Email Template component
3. Add email frame/container:
   - Width: Fixed (e.g., 600px for email standard)
   - Background: White (light theme) or dark (dark theme variant)
   - Padding: 20px

4. Create email header:
   - Branding/logo (if applicable)
   - Space: 16px below header

5. Create email body:
   - Greeting: "Hi [Reader],"
   - Body text: "We've sent you a 10-minute access code below. Enter it on the website to start reading."
   - Space: 16px
   - Code display (highlighted/emphasized):
     - "**Your Code: XXXXXX**"
     - Apply accent background or bold styling
     - Space: 16px
   - Expiry text: "This code expires [based on Decision 3: from generation / receipt / page load]."
   - Space: 16px
   - Support text: "Questions? Reply to this email."
   - Space: 16px
   - Closing: "— The ThisOneTimeOnAcidCom Team"

6. Create email footer:
   - Footer text: "You received this because you requested reading access. [Newsletter Signup Link]"
   - Font: Inter, 12px, neutral-dark color
   - Link color: Accent color

7. Document typography and colors used
8. Export email template (optional: screenshot for reference)

### Phase 2: Email Entry Form Design

1. Create Email Entry Form component
2. Add form states as variants:
   - **Default State**:
     - Label: "Enter your email address" (Inter, 14px, 500 weight)
     - Input field: empty, placeholder visible
     - Placeholder text: "you@example.com" (Inter, 14px, 400 weight, neutral-dark)
     - Help text: "We'll email you a 10-minute code. No subscription required." (Inter, 12px, 400 weight, neutral-dark)
     - Button: "Send Code" (Inter, 14px, 600 weight, enabled state)

   - **Focused State**:
     - Input border: Accent color (#e8d4b8 light / #d4a574 dark)
     - Cursor visible in input
     - All other elements same as default

   - **Filled State**:
     - Input contains valid email
     - Placeholder hidden
     - Button enabled
     - Help text visible

   - **Loading State**:
     - Button shows spinner/loading icon
     - Button text becomes "Sending..." (optional)
     - Button disabled
     - Input disabled (read-only)

   - **Error State**:
     - Input border: Error color (#8b0000 light / #ff6b6b dark)
     - Error icon below input
     - Error text: "Invalid email format" (Inter, 12px, error color)
     - Button disabled (red tint optional)
     - Help text remains visible but in neutral-dark color

3. Document all spacing, colors, typography
4. Export form states for implementation

### Phase 3: Code Entry Form Design

1. Create Code Entry Form component
2. Add form states as variants:
   - **Default State**:
     - Label: "Enter your code" (Inter, 14px, 500 weight)
     - Input field: 6 character positions (monospace, e.g., "XX-XX-XX" or "XXXXXX")
     - Placeholder: "XXXXXX" (Inter, 14px, 400 weight, neutral-dark)
     - Help text: "Check your email for your 10-minute code" (Inter, 12px, 400 weight, neutral-dark)
     - Button: "Verify Access" (Inter, 14px, 600 weight, enabled state)

   - **Focused State**:
     - Input border: Accent color
     - Cursor in input
     - All other elements same as default

   - **Filled State**:
     - Input contains 6 characters
     - Placeholder hidden
     - Button enabled
     - Help text visible

   - **Loading State**:
     - Button shows spinner/loading icon
     - Button text becomes "Verifying..." (optional)
     - Button disabled
     - Input disabled (read-only)

   - **Error - Invalid Code State**:
     - Input border: Error color
     - Error icon below input
     - Error text: "Invalid code" (Inter, 12px, error color)
     - Button disabled (red tint optional)
     - Help text remains visible

   - **Error - Expired Code State**:
     - Input border: Error color
     - Error icon below input
     - Error text: Decision 3 dependent message (Inter, 12px, error color)
       - Option 1: "Code expired. Request a new code."
       - Option 2: "Code expired. Refresh the page and try again."
     - Button disabled (red tint optional)
     - May show secondary "Request New Code" button

   - **Error - Rate Limited State**:
     - Input border: Warning color (optional; can use error)
     - Error icon below input
     - Error text: "Rate limited: Too many failed attempts. Try again in [X] minutes." (Inter, 12px, error color)
     - Button disabled
     - Input disabled

   - **Success State**:
     - Input border: Success color (#2d5016 light / #90ee90 dark)
     - Success icon below input (checkmark)
     - Success message: "Access confirmed. You can now read." (Inter, 12px, success color)
     - Button may show checkmark or change to success state
     - Input remains visible but read-only
     - Optional: Show countdown or redirect message

3. Document all spacing, colors, typography
4. Export all form states for implementation

### Phase 4: Newsletter CTA Design

1. Create Newsletter CTA component (separate from forms)
2. Design container:
   - Distinct visual separation (background color, card style, section divider)
   - Padding: 16px
   - Border radius: 8px (or match form styling)

3. Add content:
   - Heading: "Stay Updated" (Space Grotesk, 24px, 600 weight, primary text)
   - Copy: "Join our newsletter for book updates (optional)." (Inter, 16px, 400 weight, primary text)
   - Critical language: "This is separate from reading access. Uncheck to read without subscribing." (Inter, 14px, 400 weight, neutral-dark)
   - Link: "Sign up" (or per Decision 6 option) (Inter, 14px, 600 weight, accent color, underlined)

4. Design states:
   - **Default**: Link visible, standard styling
   - **Hover**: Link color changes to accent, slight opacity change
   - **Checked/Unchecked**: If checkbox present, show both states

5. Document placement (below forms, clear visual separation)
6. Export for implementation

### Phase 5: Document All Form States

1. Create a design specification document showing:
   - All 5+ email entry form states
   - All 6+ code entry form states
   - Newsletter CTA component
   - Email template mockup

2. Label each state clearly:
   - State name (Default, Focused, Error, Loading, Success, etc.)
   - Trigger/condition (when this state appears)
   - User action (if applicable)

3. Document accessibility:
   - Focus indicators visible
   - Error messages announced (screen readers)
   - Placeholder text not sole label
   - Sufficient color contrast

### Phase 6: Validation

1. ✅ Email template shows all required copy (subject, body, footer)
2. ✅ Email entry form designed with all 5 states
3. ✅ Code entry form designed with all 6 states
4. ✅ Error messages documented (invalid, expired, rate-limited)
5. ✅ Success state designed (confirmation message)
6. ✅ Newsletter CTA separate from verification forms
7. ✅ Newsletter language explicitly non-subscription
8. ✅ All typography and colors from Prompt 2A baseline
9. ✅ All acceptance criteria met

---

## Deliverables

When Prompt 3A execution is complete, provide:

1. **Email Template Mockup**
   - Email subject, body, footer with exact approved copy
   - Sizing and layout specifications
   - Typography and color application

2. **Email Entry Form Design**
   - All 5 states (default, focused, filled, loading, error)
   - Labels, placeholders, help text, error messages
   - Button styling and states

3. **Code Entry Form Design**
   - All 6 states (default, focused, filled, loading, error variations, success)
   - Labels, placeholders, help text, error messages by scenario
   - Button styling and states

4. **Newsletter CTA Design**
   - Separate section with distinct visual styling
   - Heading, copy, non-subscription language clearly visible
   - Link styling and states

5. **Design Specification Document**
   - All form states labeled and documented
   - Conditions for each state (when it appears)
   - Typography specifications
   - Color specifications
   - Spacing/padding specifications

6. **Validation Report**
   - Checklist confirming all 8 acceptance criteria met
   - Before/after comparison if updating existing design
   - Dark theme implementation status

---

## Success Definition

✅ **Prompt 3A is complete when**:
- Email template shows exactly 4 text elements (subject, body, footer, code display)
- Email entry form designed with all states (default, focused, error, loading, filled)
- Code entry form designed with all states (default, focused, error variations, loading, success)
- Newsletter CTA clearly separated from verification forms
- Newsletter section explicitly states "This is separate from reading access"
- All error messages distinguish scenarios (invalid, expired, rate-limited)
- Code expiry messaging reflects Decision 3 timing
- All form labels, placeholders, help text match approved source exactly
- All acceptance criteria (CR-3A.1 through CR-3A.8) verified
- Implementation team can build from specification

---

## Blocking Decisions (Must Be Resolved Before Implementation)

- **Decision 3**: Code expiry start time (affects error messaging) — ⏳ PENDING DECISION
- **Decision 4**: Email service provider (affects template syntax/capabilities) — ⏳ PENDING DECISION
- **Decision 5**: Manuscript publication readiness (affects confirmation messaging) — ⏳ PENDING DECISION
- **Decision 6**: Newsletter destination (affects signup link) — ⏳ PENDING DECISION

**Impact**: These decisions determine:
- Exact error message text for expired codes
- Email template format (ESP-specific syntax)
- Success confirmation message content
- Newsletter link destination and form routing

**Recommended**: Resolve these decisions BEFORE implementation begins so developers can build exactly to spec without revision.

---

## Next Steps (After Prompt 3A)

Once Prompt 3A is complete:
- **Prompt 3B** (Recovery Flows) — Depends on Prompt 3A context
- **Prompt 3C** (Error States) — Builds on Prompt 3A form specification
- All Prompt 3 dependencies can execute in parallel after Prompt 3A baseline exists
