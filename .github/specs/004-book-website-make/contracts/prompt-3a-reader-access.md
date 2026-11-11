# Figma Make Prompt 3A: Reader Access Copy & Forms

**Status**: ❌ BLOCKED (waiting for Decisions 3, 4, 5, 6)  
**Priority**: P1  
**Prompt ID**: 3A  
**Type**: reader-access

---

## Specification

### Goal

Generate exact email verification copy, form wording, error messages, and newsletter CTA specifications—separate newsletter signup from reading verification per approved decision.

### Email Copy (Approved Source: `.github/specs/004-book-website-make/references/06-website-reading-prd.md` v1.1.1)

**Email Subject**:
"Your reading code for ThisOneTimeOnAcidCom"

**Email Body**:
"Hi [Reader],

We've sent you a 10-minute access code below. Enter it on the website to start reading.

**Your Code: XXXXXX**

This code expires [based on Decision 3: from generation / receipt / page load].

Questions? Reply to this email.

— The ThisOneTimeOnAcidCom Team"

**Footer**:
"You received this because you requested reading access. [Newsletter Signup Link - see below]"

### Form Specification

**Email Entry Form**:
- Label: "Enter your email address"
- Placeholder: "you@example.com"
- Button: "Send Code"
- Help text: "We'll email you a 10-minute code. No subscription required."
- Error state: "Invalid email format"

**Code Entry Form**:
- Label: "Enter your code"
- Placeholder: "XXXXXX" (6 characters)
- Button: "Verify Access"
- Help text: "Check your email for your 10-minute code"
- States: default, focused, error, loading
- Error messages (based on Decision 3 expiry timing):
  - "Invalid code" (wrong characters)
  - "Code expired [decision-based message]"
  - "Rate limited: Too many failed attempts"

**Success State**:
- Message: "Access confirmed. You can now read."
- Redirect: To book content
- No success claim without server confirmation (e.g., "Sent!" → "Check your email")

### Newsletter CTA (Separate from Verification)

**Newsletter Section** (separate from reader access form):
- Heading: "Stay Updated"
- Copy: "Join our newsletter for book updates (optional)."
- Link text: "Sign up" (or "Learn more" / "Subscribe")
- Link destination: [Decision 6 selected option]
- Important: Explicitly state "This is separate from reading access. Uncheck to read without subscribing."

### Figma Make Instructions

1. Generate email template mockup with exact copy (subject, body, footer)
2. Create email entry form with label, input, button, error states
3. Create code entry form with all state variations
4. Design success confirmation message
5. Separate newsletter CTA section with non-subscription language
6. Document all form states (default, focused, error, loading, success)

### Acceptance Criteria

✅ **CR-3A.1**: Email copy matches approved source exactly (no modifications)

✅ **CR-3A.2**: All form states designed (default, focused, error, loading, success)

✅ **CR-3A.3**: Error messages distinguish failure scenarios (invalid, expired, rate-limited)

✅ **CR-3A.4**: Code expiry messaging reflects Decision 3 selection (timing clarity)

✅ **CR-3A.5**: Newsletter CTA in separate section (NOT mixed with verification)

✅ **CR-3A.6**: Newsletter link clearly non-subscription ("optional", "separate")

✅ **CR-3A.7**: No success claims without server confirmation

✅ **CR-3A.8**: All help text and labels match approved source

### Blocking Decisions (Must Be Resolved First)

- Decision 3: Code expiry start time (affects error messaging)
- Decision 4: Email service provider (affects template syntax/capabilities)
- Decision 5: Manuscript publication readiness (affects confirmation messaging)
- Decision 6: Newsletter destination (affects signup link)

### Reference Documents

- Source: `.github/specs/004-book-website-make/references/06-website-reading-prd.md` (v1.1.1) — Website reading experience requirements
- Reader Access Policy: `.github/specs/004-book-website-make/references/06-website-reading-prd.md` (10-minute codes, 30-day device lifecycle)
- Design Baseline: `.github/specs/004-book-website-make/references/04-design-brief.md` (typography, colors)
- Launch Requirements: `.github/specs/004-book-website-make/references/10-toa-prd-website-reading-experience.md`

### Dependencies

- Prompt 2A (Design System Baseline) — Uses exported typography and colors
- Decisions 3, 4, 5, 6 resolved

### Next Prompts

- Prompt 3B (Recovery Flows) — Depends on Prompt 3A context
- Prompt 3C (Error States) — Builds on Prompt 3A form specification

---

## Validation Checklist

- [ ] Email copy matches source exactly
- [ ] Email entry form designed with all states
- [ ] Code entry form designed with all states
- [ ] Error messages documented (invalid, expired, rate-limited)
- [ ] Success state designed (confirmation message)
- [ ] Newsletter CTA separate from verification
- [ ] Newsletter language explicitly non-subscription
- [ ] Help text and labels match source
- [ ] All form states rendered (default, focused, error, loading, success)
- [ ] All acceptance criteria met
