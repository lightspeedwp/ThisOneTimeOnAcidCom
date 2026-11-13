# Quickstart: Figma Make Approval & Execution Flow

**Feature**: Book Website Figma Make Prompt Pack (004)  
**Date**: 2026-11-09  
**Audience**: Product owners, design leads, development team

---

## What This Guide Covers

This guide walks through the approval and execution flow for the Figma Make prompt pack. It documents:

1. **Approval Prerequisites** — What must happen before Prompts can execute
2. **Unblocked Prompts** — No outstanding blocking decisions (Prompts 1, 2A, 2B); execution still requires the gates in [spec.md](./spec.md)
3. **Deferred Prompts** — Decisions applied but deferred until manuscript approval (Prompts 3A, 3B, 3C)
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
| ---------- | ---------------- | -------- |
| 1. Recovery-first race condition (Options: A/B/C/D) | ✅ A | APPROVED |
| 2. Recovery lifetime eligibility (Options: A/B/C/D) | ✅ A | APPROVED |
| 3. Code expiry start time (Options: A/B/C) | ✅ A | APPROVED |
| 4. Email service provider (Options: A/B/C/D) | ✅ Hybrid (SendGrid + Brevo) | APPROVED |
| 5. Manuscript publication readiness (Options: A/B/C) | ❌ C (not yet approved) | DECIDED — blocks Prompts 3A–3C |
| 6. Newsletter destination (Options: A/B/C/D) | ✅ B | APPROVED |
| 7. Route enforcement verification (Options: A/B/C/D) | ✅ A | APPROVED |

**Gate 1 Resolution**:
- ✅ Decision 1 (Recovery race): A—Recovery takes precedence
- ✅ Decision 2 (Recovery lifetime): A—session refresh on recovery; absolute expiry 30 days after initial verification
- ✅ Decision 3 (Code expiry): A—From generation
- ✅ Decision 4 (Email provider): Hybrid—SendGrid (transactional) + Brevo (newsletter)
- ❌ Decision 5 (Manuscript status): C—Not yet approved; approval date to be confirmed by Ash
- ✅ Decision 6 (Newsletter destination): B—Brevo external signup
- ✅ Decision 7 (Route enforcement): A—noindex meta tags + sitemap.xml exclusion; no robots.txt Disallow

**Impact**: Decisions for Prompts 3B and 3C are recorded, but Prompts 3A, 3B and 3C remain deferred until the manuscript is approved (Decision 5). Proceed to Gate 2.

---

### Gate 2: Design System Baseline Approval ⏳ PENDING SIGN-OFF

**Status**: Design baseline reviewed 2026-11-09; final Gate 2 sign-off pending (light-theme mapping and token exports still pending — see `exports/GATE_2_READINESS_REPORT.md`)

**What was reviewed**: Approved design elements (Space Grotesk, Inter, 9-color palette)

**Approvals recorded**:
- ✅ Typography: Space Grotesk (headings), Inter (body/UI) locked
- ✅ Colors: 9 named colors, light + dark themes finalized
- ✅ Components: All baseline styles approved (Button, Card, Navigation, Form, etc.)
- ✅ Candidates: R3, T1, RT2, C1 documented as "not included"

**Impact**: Prompts 2A (Design Baseline Export) and 2B (Navigation Design Specification) are now unblocked and ready for execution. Proceed to Gate 3.

---

### Gate 3: Preflight Analysis Sign-Off ✅ COMPLETE

**Status**: Preflight analysis APPROVED (2026-11-09)

**What was reviewed**: Complete documentation package readiness for implementation phase

**Approvals recorded**:
- ✅ All six source files analyzed (content/book/01-06)
- ✅ Version reconciliation documented (02: v1.0.3→v1.0.4, 03: v1.2.2→v1.3.0, 05: v1.7.0→v1.9.0)
- ✅ Prompt previews complete (1, 2A, 2B, 3A)
- ✅ Blocking Prompts marked "BLOCKED" with prerequisites documented (3B, 3C)
- ✅ Approval boundaries explicit (approved ✓, unapproved ~, resolved ✅)

**Impact**: Prompts 1, 2A and 2B have no outstanding blocking decisions. Prompts 3A, 3B and 3C remain deferred until manuscript approval. Execution of any prompt still requires the gates listed in [spec.md](./spec.md).

---

## Unblocked Prompts (Ready to Execute)

### Prompt 1: Navigation Exposure

**Purpose**: Specify which navigation items should be hidden from public sitemap

**Status**: ✅ Decision 7 resolved (Option A); execution requires the gates in [spec.md](./spec.md)

**Prerequisites**:
- [ ] Gate 1 complete (Blocking Decision 7 selected)
- [ ] Gate 2 complete (Design baseline approved)

**When you execute Prompt 1**:
1. Run Figma Make with Prompt 1 specification from `contracts/prompt-1-navigation-exposure.md`
2. Generate updated navigation component with /speaking, /events, /media hidden from sitemap
3. Verify acceptance criteria match output:
   - Navigation component includes only approved visible items
   - Noindex meta tags and sitemap.xml exclusion implemented; no robots.txt Disallow rules for the hidden routes
   - Route enforcement matches Blocking Decision 7 Option A

**Expected Output**:
- Updated navigation component in Figma
- Noindex meta tags and sitemap.xml exclusions documented
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

**Status**: ⏸️ DEFERRED — Decisions 3, 4 and 6 applied; final execution waits for manuscript approval (Decision 5). Placeholder messaging only in the meantime

**Prerequisites**:
- [ ] Gate 1 complete (Decisions 3, 4, 5, 6 selected)
- [ ] Manuscript approved (Decision 5)
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

## Deferred Prompts (Decisions Applied; Awaiting Manuscript Approval)

### Prompt 3B: Recovery Flows ⏸️ DEFERRED

**Purpose**: Specify recovery flow when readers attempt to regain access via previous verified session

**Status**: ✅ UNBLOCKED (all prerequisites resolved)

**Blocking Decisions** (now resolved):
- ✅ Decision 1: Recovery-first race condition — **A** (Recovery takes precedence)
- ✅ Decision 2: Recovery lifetime eligibility — **A** (session refresh on recovery; absolute expiry 30 days after initial verification)

**When the manuscript is approved**:
1. Confirm `contracts/prompt-3b-recovery-flows.md` reflects the selected options (A & A)
2. Run Figma Make with the specification
3. Generate recovery flow design with appropriate error handling

**Expected Output**:
- Recovery initiation flow (detect previous session, attempt recovery)
- Recovery success state (reader regains access without re-verification)
- Recovery failure states (session expired, session invalid, race condition handled per Decision 1)
- Fallback to fresh verification (if recovery unavailable)

---

### Prompt 3C: Error States ⏸️ DEFERRED

**Purpose**: Specify all error states and error messaging for reader access flow

**Status**: ✅ UNBLOCKED (all prerequisites resolved)

**Blocking Decision** (now resolved):
- ✅ Decision 3: Code expiry start time — **A** (From generation)

**When the manuscript is approved**:
1. Confirm `contracts/prompt-3c-error-states.md` reflects the selected option (A)
2. Run Figma Make with the specification
3. Generate error state designs for all failure scenarios

**Expected Output**:
- Invalid code error (wrong characters, mistyped)
- Expired code error (message: code expires 10 minutes from generation per Decision 3)
- Rate-limited error (too many failed attempts)
- Server error state (email delivery failure, verification server unavailable)
- Session conflict error (resolved per Decision 1 Recovery-first option)

---

## Validation Scenarios

### Scenario 1: Verify Prompt 1 Output Against Spec

**Setup**: Prompt 1 (Navigation Exposure) has been executed

**Test Steps**:
1. Open generated navigation component in Figma
2. Confirm /speaking, /events, /media routes are hidden from visible navigation
3. Check robots.txt: verify there are no Disallow rules for /speaking, /events, /media
4. Check sitemap.xml: verify hidden routes are excluded from sitemap
5. Check Meta tags: verify `<meta name="robots" content="noindex">` on hidden pages

**Pass Criteria**:
- ✅ Navigation component shows only approved visible items
- ✅ robots.txt has no Disallow rules for /speaking, /events, /media
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
| ------ | ---------- | ------- | ---------- |
| 1 | Gates 1-3 complete (your input) | You | This week |
| 2 | Prompts 1, 2A, 2B ready to execute (once spec.md gates clear) | Dev team | Next week |
| 3 | Prompts 3A, 3B, 3C released | You | After manuscript approval (date to be confirmed) |
| 4 | Full prompt pack ready for implementation | Dev team | 2–3 weeks |

---

## Next Steps

### Immediate Actions (This Week)

1. **Review research.md** — Understand the 7 blocking decisions
2. **Complete Gate 1** — Select options for each decision
3. **Complete Gate 2** — Confirm design baseline approval
4. **Complete Gate 3** — Sign off on preflight analysis

### After Gates Complete

5. **Execute Prompts 1, 2A, 2B** — Generate design-system exports and navigation specs
6. **Validate each Prompt output** — Run validation scenarios (above)
7. **Execute Prompts 3A, 3B, 3C** — Once the manuscript is approved

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

**Ready to proceed?** Complete the three gates above and the execution gates in [spec.md](./spec.md); then Prompts 1, 2A and 2B can be executed. Prompts 3A–3C wait for manuscript approval.
