# Quickstart: Figma Make Approval & Execution Flow

**Feature**: Book Website Figma Make Prompt Pack (004)  
**Date**: 2026-11-09  
**Audience**: Product owners, design leads, development team

---

## What This Guide Covers

This guide walks through the approval and execution flow for the Figma Make prompt pack. It documents:

1. **Approval Prerequisites** — What must happen before Prompts can execute
2. **Unblocked Prompts** — Ready to execute immediately (Prompts 1, 2A, 2B, 3A)
3. **Blocked Prompts** — Waiting for decision resolution (Prompts 3B, 3C)
4. **Validation Scenarios** — Runnable checks to confirm feature works
5. **Decision Routing** — Where to go to resolve blocking decisions

---

## Approval Prerequisites

### Gate 1: User Reviews Blocking Decisions ✅ COMPLETE

**Status**: All 7 blocking decisions APPROVED (2026-11-09)

**What was reviewed**: Research.md contains 7 blocking decisions with options for each.

**Selections recorded**: All decisions approved with recommended options (see matrix below).

**Blocking Decisions**:

| Decision | Your Selection | Status |
|----------|----------------|--------|
| 1. Recovery-first race condition (Options: A/B/C/D) | ✅ A | APPROVED |
| 2. Recovery lifetime eligibility (Options: A/B/C/D) | ✅ A | APPROVED |
| 3. Code expiry start time (Options: A/B/C) | ✅ A | APPROVED |
| 4. Email service provider (Options: A/B/C/D) | ✅ B | APPROVED |
| 5. Manuscript publication readiness (Options: A/B/C) | ✅ A | APPROVED |
| 6. Newsletter destination (Options: A/B/C/D) | ✅ B | APPROVED |
| 7. Route enforcement verification (Options: A/B/C/D) | ✅ A | APPROVED |

**Gate 1 Resolution**:
- ✅ Decision 1 (Recovery race): A—Recovery takes precedence
- ✅ Decision 2 (Recovery lifetime): A—30-day rolling window
- ✅ Decision 3 (Code expiry): A—From generation
- ✅ Decision 4 (Email provider): B—SendGrid
- ✅ Decision 5 (Manuscript status): A—Approved & available
- ✅ Decision 6 (Newsletter destination): B—External provider signup
- ✅ Decision 7 (Route enforcement): A—All three methods (Meta tags + Robots.txt + Sitemap.xml)

**Impact**: Prompts 3B and 3C are now unblocked with clear specifications. Proceed to Gate 2.

---

### Gate 2: Design System Baseline Approval (YOUR ACTION)

**What to review**: Approved design elements (Space Grotesk, Inter, 9-color palette)

**Your task**:
1. Confirm Space Grotesk headings, Inter body/UI fonts are locked
2. Confirm 9-color palette (light + dark themes) is final
3. Confirm component styles are approved (Button, Card, Navigation, etc.)
4. Check that unapproved candidates (R3, T1, RT2, C1) are documented as "not included"

**Validation Checklist**:
- [ ] Typography: Space Grotesk (headings), Inter (body/UI)
- [ ] Colors: 9 named colors, light + dark themes defined
- [ ] Components: All baseline styles approved
- [ ] Candidates: R3, T1, RT2, C1 listed as unapproved (preserved for future)

**Once complete**: Proceed to Gate 3.

---

### Gate 3: Preflight Analysis Sign-Off (YOUR ACTION)

**What to review**: Complete documentation package is ready for design system export

**Your task**:
1. Verify all six source files (01-06) are analyzed
2. Confirm version differences are documented with material-effect assessment
3. Check that exact Prompt previews (1, 2A, 2B, 3A) are complete
4. Confirm blocking Prompts (3B, 3C) explain their prerequisites
5. Validate blocking decision matrix is present and options documented

**Sign-Off Checklist**:
- [ ] All six source files analyzed (content/book/01-06)
- [ ] Version reconciliation documented (02, 03, 05 version updates tracked)
- [ ] Prompt previews generated (1, 2A, 2B, 3A)
- [ ] Blocking Prompts marked "BLOCKED" with prerequisites
- [ ] Approval boundaries explicit (approved ✓, unapproved ~, unresolved ❌)

**Once complete**: Design system export can proceed.

---

## Unblocked Prompts (Ready to Execute)

### Prompt 1: Navigation Exposure

**Purpose**: Specify which navigation items should be hidden from public sitemap

**Status**: ✅ UNBLOCKED (waiting only for Gate 7 decision: route enforcement verification)

**Prerequisites**:
- [ ] Gate 1 complete (Blocking Decision 7 selected)
- [ ] Gate 2 complete (Design baseline approved)

**When you execute Prompt 1**:
1. Run Figma Make with Prompt 1 specification from `contracts/prompt-1-navigation-exposure.md`
2. Generate updated navigation component with /speaking, /events, /media hidden from sitemap
3. Verify acceptance criteria match output:
   - Navigation component includes only approved visible items
   - Meta tags + Robots.txt + Sitemap.xml exclusion rules implemented
   - Route enforcement matches selected option from Blocking Decision 7

**Expected Output**:
- Updated navigation component in Figma
- Robots.txt and sitemap.xml rules documented
- Before/after comparison showing hidden routes

**Validation**: Run Playwright test to verify /speaking, /events, /media return 200 but have noindex meta tags

---

### Prompt 2A: Design System Baseline Export

**Purpose**: Generate CSS variables and design-token file matching approved baseline

**Status**: ✅ UNBLOCKED (no blocking decisions)

**Prerequisites**:
- [ ] Gate 2 complete (Design baseline approved)

**When you execute Prompt 2A**:
1. Run Figma Make with Prompt 2A specification from `contracts/prompt-2a-design-baseline.md`
2. Export design tokens matching approved values:
   - Typography: Space Grotesk weights/sizes, Inter weights/sizes
   - Colors: All 9 colors for light + dark themes
   - Component styles: Button, Card, Navigation, Form, etc.
3. Verify acceptance criteria:
   - Exported tokens match exact approved values (no drift)
   - Unapproved candidates (R3, T1, RT2, C1) are NOT in exported tokens
   - Both light and dark themes defined

**Expected Output**:
- CSS variables file (e.g., `design-tokens.css` or `tokens.json`)
- Color palette (light + dark)
- Typography scale
- Component style definitions

**Validation**: Import tokens into codebase, run build, verify no style regressions

---

### Prompt 2B: Navigation Design Specification

**Purpose**: Specify exact navigation component design with states

**Status**: ✅ UNBLOCKED (no blocking decisions)

**Prerequisites**:
- [ ] Gate 2 complete (Design baseline approved)

**When you execute Prompt 2B**:
1. Run Figma Make with Prompt 2B specification from `contracts/prompt-2b-navigation-design.md`
2. Generate navigation component design with:
   - Default state (navigation visible/hidden depending on breakpoint)
   - Hover states (link highlighting)
   - Active states (current page indication)
   - Mobile states (hamburger menu, drawer)
3. Verify acceptance criteria match Figma output

**Expected Output**:
- Navigation component design in Figma
- State variations (default, hover, active, mobile)
- Responsive breakpoint specifications

**Validation**: Compare generated design against 04-design-brief.md (v1.1.2) navigation spec

---

### Prompt 3A: Reader Access Copy & Forms

**Purpose**: Specify exact email verification copy, form wording, and error messages

**Status**: ✅ UNBLOCKED (waiting for Gates 1, 3, 4, 5, 6 decisions)

**Prerequisites**:
- [ ] Gate 1 complete (Decisions 3, 4, 5, 6 selected)
- [ ] Gate 2 complete (Design baseline approved)

**When you execute Prompt 3A**:
1. Run Figma Make with Prompt 3A specification from `contracts/prompt-3a-reader-access.md`
2. Generate reader access journey specification with:
   - Email copy (subject, body, CTA, footer)
   - Email code entry form (label, placeholder, validation, error states)
   - Newsletter CTA (separate from verification, explicit non-subscription statement)
   - Submitted state (confirmation message, next steps)
   - Error states for invalid/expired codes (messaging based on Decision 3 expiry timing)
3. Verify acceptance criteria:
   - Copy matches approved source (no modifications)
   - Newsletter signup separated from verification
   - No success claims without server confirmation
   - All form states documented (default, focused, error, loading)

**Expected Output**:
- Email template specification
- Verification form design (with all states)
- Newsletter signup CTA
- Error messages for each failure scenario

**Validation**: Extract copy from generated spec, verify it matches approved source in 06-website-reading-prd.md (v1.1.1)

---

## Blocked Prompts (Waiting for Decision Resolution)

### Prompt 3B: Recovery Flows

**Purpose**: Specify recovery flow when readers attempt to regain access via previous verified session

**Status**: ❌ BLOCKED

**Blocking Decisions** (must be resolved first):
- [ ] Decision 1: Recovery-first race condition (what if both recovery + fresh verification happen simultaneously?)
- [ ] Decision 2: Recovery lifetime eligibility (how long is recovery valid?)

**Why blocked**: Recovery flow specification depends on race condition resolution and session lifetime policy. Cannot finalize error handling or success criteria until these decisions are made.

**When unblocked** (after Decisions 1 & 2 are resolved):
1. Update `contracts/prompt-3b-recovery-flows.md` with selected decision options
2. Run Figma Make with updated specification
3. Generate recovery flow design with appropriate error handling

**Expected Output** (once unblocked):
- Recovery initiation flow (detect previous session, attempt recovery)
- Recovery success state (reader regains access without re-verification)
- Recovery failure states (session expired, session invalid, race condition handled)
- Fallback to fresh verification (if recovery unavailable)

---

### Prompt 3C: Error States

**Purpose**: Specify all error states and error messaging for reader access flow

**Status**: ❌ BLOCKED (partially: can generate some error states, but code-expiry messaging blocked)

**Blocking Decision** (must be resolved first):
- [ ] Decision 3: Code expiry start time (from generation? receipt? page load?)

**Why blocked**: Error message for expired code must state exact expiry timing (e.g., "Code expired 10 minutes after generation" vs. "10 minutes from email receipt"). Cannot finalize messaging until Decision 3 is resolved.

**When unblocked** (after Decision 3 is resolved):
1. Update `contracts/prompt-3c-error-states.md` with selected decision option
2. Run Figma Make with updated specification
3. Generate error state designs for all failure scenarios

**Expected Output** (once unblocked):
- Invalid code error (wrong characters, mistyped)
- Expired code error (message reflects Decision 3 timing choice)
- Rate-limited error (too many failed attempts)
- Server error state (email delivery failure, verification server unavailable)
- Session conflict error (if race condition occurs per Decision 1)

---

## Validation Scenarios

### Scenario 1: Verify Prompt 1 Output Against Spec

**Setup**: Prompt 1 (Navigation Exposure) has been executed

**Test Steps**:
1. Open generated navigation component in Figma
2. Confirm /speaking, /events, /media routes are hidden from visible navigation
3. Check Robots.txt rules: verify User-agent rules exclude /speaking, /events, /media
4. Check sitemap.xml: verify hidden routes are excluded from sitemap
5. Check Meta tags: verify `<meta name="robots" content="noindex">` on hidden pages

**Pass Criteria**:
- ✅ Navigation component shows only approved visible items
- ✅ Robots.txt includes rules for /speaking, /events, /media
- ✅ Sitemap.xml excludes /speaking, /events, /media
- ✅ Meta tags match enforcement strategy from Decision 7

---

### Scenario 2: Verify Prompt 2A Output Against Baseline

**Setup**: Prompt 2A (Design System Baseline) has been executed

**Test Steps**:
1. Extract exported design tokens
2. Verify Space Grotesk typography values match approved baseline
3. Verify Inter typography values match approved baseline
4. Verify all 9 colors (light theme) match approved palette
5. Verify all 9 colors (dark theme) match approved palette
6. Confirm unapproved candidates (R3, T1, RT2, C1) are NOT in exported tokens
7. Run codebase build with exported tokens: verify no regressions

**Pass Criteria**:
- ✅ Typography: Space Grotesk and Inter values match exactly
- ✅ Colors: All 9 colors in both themes match approved palette
- ✅ Candidates: R3, T1, RT2, C1 confirmed absent from exports
- ✅ Build succeeds with no style regressions

---

### Scenario 3: Verify Prompt 3A Copy Against Source

**Setup**: Prompt 3A (Reader Access Copy) has been executed

**Test Steps**:
1. Extract email copy from generated specification
2. Compare against approved source in 06-website-reading-prd.md (v1.1.1)
3. Verify form labels, placeholders, and error messages match approved wording
4. Confirm newsletter CTA is in separate section with explicit non-subscription statement
5. Verify no success claims are made without server confirmation (e.g., "Sent!" → "Check your email")

**Pass Criteria**:
- ✅ Email copy matches approved source exactly
- ✅ Form wording matches approved source
- ✅ Newsletter CTA is separate and non-subscription is explicit
- ✅ All messaging is conditional on server confirmation

---

### Scenario 4: Approval Boundaries Are Explicit

**Setup**: Preflight analysis (preflight-001) has been generated

**Test Steps**:
1. Open `checklists/requirements.md`
2. Verify all approved elements are marked ✓ (design baseline, navigation intent, access policy)
3. Verify all unapproved candidates are marked ~ (R3, T1, RT2, C1)
4. Verify all unresolved decisions are marked ❌ (7 blocking decisions)
5. Confirm no ambiguous items (everything is in one of three categories)

**Pass Criteria**:
- ✅ Approved elements clearly marked and documented
- ✅ Unapproved candidates listed and preserved for future consideration
- ✅ Unresolved decisions documented with options
- ✅ No ambiguous or uncategorized items

---

## Decision Resolution Roadmap

Once all blocking decisions are resolved:

1. **Prompt 3B** becomes unblocked (when Decisions 1 & 2 are resolved)
2. **Prompt 3C** becomes unblocked (when Decision 3 is resolved)
3. **Full specification package** ready for implementation phase

### Timeline Example

| Step | Decision | Owner | Timeline |
|------|----------|-------|----------|
| 1 | Gates 1-3 complete (your input) | You | This week |
| 2 | Prompts 1, 2A, 2B, 3A ready to execute | Dev team | Next week |
| 3 | Prompts 3B, 3C unblocked (if decisions made) | You | After Gate 1 |
| 4 | Full prompt pack ready for implementation | Dev team | 2–3 weeks |

---

## Next Steps

### Immediate Actions (This Week)

1. **Review research.md** — Understand the 7 blocking decisions
2. **Complete Gate 1** — Select options for each decision
3. **Complete Gate 2** — Confirm design baseline approval
4. **Complete Gate 3** — Sign off on preflight analysis

### After Gates Complete

5. **Execute Prompts 1, 2A, 2B, 3A** — Generate design-system exports and navigation specs
6. **Validate each Prompt output** — Run validation scenarios (above)
7. **Plan Prompts 3B, 3C** — Once blocking decisions are resolved

### Implementation Phase (After All Prompts Ready)

8. **Implementation authorization** — Final approval gate before code phase
9. **Develop reader access features** — Use finalized Prompt specifications
10. **Deploy** — Staged rollout with reader access live

---

## Questions?

Refer to:
- **Blocking decisions**: See `research.md` for detailed analysis of each decision
- **Design details**: See `data-model.md` for entity definitions and relationships
- **Exact prompts**: See `contracts/prompt-*.md` files for complete specifications
- **Acceptance criteria**: Embedded in each contract file

**Ready to proceed?** Complete the three gates above, then the development team can execute Prompts 1, 2A, 2B, 3A immediately.
