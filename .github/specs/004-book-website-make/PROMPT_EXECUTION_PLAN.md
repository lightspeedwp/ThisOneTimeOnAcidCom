# Prompt Execution Plan — Spec 004

**Date**: 2026-11-12  
**Status**: Gate 2 Readiness Complete — Ready for Prompt Execution  
**Author**: Claude Haiku 4.5

---

## Executive Summary

Spec 004 has 6 prompts for the Book Website Figma Make workflow. Three are **unblocked and ready to execute immediately**. Three are **blocked by pending user decisions**.

| Phase | Prompts | Status |
| ------- | --------- | -------- |
| **Phase A: Unblocked** | Prompts 1, 2A, 2B | ✅ Ready to Execute |
| **Phase B: Blocked** | Prompts 3A, 3B, 3C | ⏳ Awaiting Decisions |

---

## Phase A: Unblocked Prompts (Ready Now)

### Prompt 1: Navigation Exposure ✅

**Status**: ✅ UNBLOCKED  
**File**: `.github/specs/004-book-website-make/contracts/prompt-1-navigation-exposure.md`  
**Priority**: P1  
**Dependency**: None (standalone)

**Goal**: Update navigation component to hide Speaking, Events, and Media routes from public sitemap while preserving them as noindex pages.

**Decision Status**:
- ✅ **Decision 7**: Route Enforcement Verification — **SELECTED: Option A (Meta tags + Robots.txt + Sitemap)**
  - Explicitly documented in contract (lines 28–36)
  - Enforcement strategy confirmed

**Acceptance Criteria**:
- ✅ Navigation component shows only 4 visible links (Home, About, Book, Contact)
- ✅ Hidden routes (/speaking, /events, /media) remain accessible but not indexed
- ✅ Enforcement strategy matches Option A (meta tags + robots.txt + sitemap exclusion)
- ✅ Responsive design preserved (desktop, tablet, mobile)

**Ready for Execution**: Yes — No blocking decisions remain.

---

### Prompt 2A: Design System Baseline Export ✅

**Status**: ✅ UNBLOCKED  
**File**: `.github/specs/004-book-website-make/contracts/prompt-2a-design-baseline.md`  
**Priority**: P1  
**Dependency**: None (standalone)

**Goal**: Export design system baseline (typography, colors, component styles) as CSS variables or design-token file matching approved values.

**Design Baseline (Approved)**:
- **Typography**: Space Grotesk (headings), Inter (body/UI)
- **Colors**: 9-color palette approved (Design Brief v1.1.2)
  - Darkest: #0B0B10, #12121A, #171722
  - Warm neutrals: #F6F2EB, #CFC7BB, #9C9488
  - Accents: #FF3AAE, #F4FF3C, #8A63FF
- **Components**: Button, Card, Navigation, Form (all with states)

**Acceptance Criteria**:
- ✅ Exported tokens match approved baseline exactly (no drift)
- ✅ Typography: Space Grotesk and Inter with exact weights/sizes
- ✅ Colors: All 9 colors exported for light and dark themes
- ✅ Unapproved candidates (R3, T1, RT2, C1) explicitly excluded
- ✅ Component styles defined for Button, Card, Navigation, Form
- ✅ File is valid CSS or JSON

**Ready for Execution**: Yes — No blocking decisions.

---

### Prompt 2B: Navigation Design Specification ✅

**Status**: ✅ UNBLOCKED  
**File**: `.github/specs/004-book-website-make/contracts/prompt-2b-navigation-design.md`  
**Priority**: P1  
**Dependency**: Prompt 1 (executes after Prompt 1 for consistency)

**Goal**: Generate exact navigation component design with all states (default, hover, active, mobile) using approved design baseline.

**Visible Navigation Items** (post-Prompt 1):
- Home (/)
- About (/about)
- Book (/book)
- Contact (/contact)

**Component States**:
- Desktop (≥1024px): Horizontal menu
- Tablet (768–1023px): Horizontal with wrapping
- Mobile (<768px): Hamburger menu with drawer

**Color Fix Applied** (Gate 2 critical fix):
- Hover/active color: **#FF3AAE (hot pink)** — same in both themes

**Acceptance Criteria**:
- ✅ Displays only 4 approved visible items
- ✅ All states styled with approved colors (#FF3AAE accent)
- ✅ Responsive behavior correct (horizontal desktop, hamburger mobile)
- ✅ Typography: Inter font for navigation links
- ✅ Mobile drawer overlay documented
- ✅ All breakpoints specified (1024px, 768px)

**Ready for Execution**: Yes — No blocking decisions.

---

## Phase B: Blocked Prompts (Awaiting Decisions)

### Prompt 3A: Reader Access Copy & Forms ⏳

**Status**: ❌ BLOCKED  
**File**: `.github/specs/004-book-website-make/contracts/prompt-3a-reader-access.md`  
**Priority**: P1  
**Dependency**: Decisions 3, 4, 5, 6 (all required before execution)

**Goal**: Generate exact email verification copy, form wording, error messages, and newsletter CTA specifications.

**Blocking Decisions**:

| Decision | Question | Options | Impact |
| ---------- | ---------- | --------- | -------- |
| **3** | Code expiry start time | A: from generation<br>B: from receipt<br>C: from page load | Determines error messaging ("Code expired. [timing message].") |
| **4** | Email service provider | A–D: Selection required | Affects template syntax and capabilities |
| **5** | Manuscript publication readiness | A–C: Selection required | Affects confirmation messaging (when book is available for reading) |
| **6** | Newsletter destination | A–D: Selection required | Determines signup link and integration point |

**What Cannot Proceed Without These Decisions**:
- ❌ Exact error messages for code expiry (depends on Decision 3)
- ❌ Email template syntax and capabilities (depends on Decision 4)
- ❌ Confirmation messaging timing (depends on Decision 5)
- ❌ Newsletter signup integration (depends on Decision 6)

**Acceptance Criteria** (awaiting decisions):
- CR-3A.1: Email copy matches approved source exactly
- CR-3A.2: All form states designed (default, focused, error, loading, success)
- CR-3A.3: Error messages distinguish failure scenarios (invalid, expired, rate-limited)
- CR-3A.4: Code expiry messaging reflects Decision 3 selection
- CR-3A.5: Newsletter CTA in separate section (NOT mixed with verification)
- CR-3A.6: Newsletter link clearly non-subscription
- CR-3A.7: No success claims without server confirmation
- CR-3A.8: All help text and labels match approved source

**To Unblock**: Resolve Decisions 3, 4, 5, 6 → Update contract → Execute Prompt 3A

**Ready for Execution**: No — Awaiting Decisions 3, 4, 5, 6.

---

### Prompt 3B: Recovery Flows ⏳

**Status**: ❌ BLOCKED  
**File**: `.github/specs/004-book-website-make/contracts/prompt-3b-recovery-flows.md`  
**Priority**: P1  
**Dependency**: Decisions 1, 2 (both required before execution)

**Goal**: Generate reader recovery flow specifications (password resets, account recovery, session management).

**Blocking Decisions**:

| Decision | Question | Options | Impact |
| ---------- | ---------- | --------- | -------- |
| **1** | Recovery-first race condition | A: Recovery takes precedence<br>B: Fresh verification first<br>C: Last-writer-wins<br>D: User chooses | Determines conflict resolution when recovery and fresh verification race |
| **2** | Recovery lifetime eligibility | A–C: Selection required | Determines how long a recovery code remains valid and when session validation occurs |

**What Cannot Proceed Without These Decisions**:
- ❌ Race condition handling (recovery vs. fresh verification priority)
- ❌ Recovery code lifetime rules and validation timing
- ❌ Session lifecycle management strategies

**Cross-Prompt Impact**:
- Decision 1 affects Prompt 3C Error State 5 (session conflict error messaging)

**Acceptance Criteria** (awaiting decisions):
- CR-3B.1: Recovery flows match approved source
- CR-3B.2: All recovery states designed (default, in-progress, success, error)
- CR-3B.3: Race condition handling reflects Decision 1 selection
- CR-3B.4: Recovery lifetime eligibility reflects Decision 2 selection
- CR-3B.5: Session validation rules documented
- CR-3B.6: User communication messaging clear for each state

**To Unblock**: Resolve Decisions 1, 2 → Update contract → Execute Prompt 3B

**Ready for Execution**: No — Awaiting Decisions 1, 2.

---

### Prompt 3C: Error States ⏳

**Status**: ❌ BLOCKED (Partially)  
**File**: `.github/specs/004-book-website-make/contracts/prompt-3c-error-states.md`  
**Priority**: P1  
**Dependency**: Decision 3 (required for code-expiry messaging; other errors can proceed after Decision 3)

**Goal**: Generate error state designs and messaging for code verification, recovery, and session errors.

**Blocking Decision**:

| Decision | Question | Options | Impact |
| ---------- | ---------- | --------- | -------- |
| **3** | Code expiry start time | A: from generation<br>B: from receipt<br>C: from page load | Determines exact code-expiry error message wording |

**What CAN Proceed Without Decision 3**:
- ✅ Invalid code error ("Invalid code" / "Invalid format")
- ✅ Rate-limited error ("Too many failed attempts")
- ✅ Server error ("Something went wrong")
- ✅ Session conflict error (once Decision 1 resolved)

**What Cannot Proceed Without Decision 3**:
- ❌ Code-expiry error message ("Code expired. [timing message based on Decision 3].")

**Cross-Prompt Dependencies**:
- Decision 3: Affects Prompt 3A code-expiry error messaging
- Decision 1 (from Prompt 3B): Affects Session Conflict Error State 5

**Acceptance Criteria** (awaiting Decision 3 for full compliance):
- CR-3C.1: Error states match approved patterns
- CR-3C.2: All error messages designed (default, focus, error, loading states)
- CR-3C.3: Code-expiry messaging reflects Decision 3 selection ← **BLOCKED**
- CR-3C.4: Invalid/rate-limited/server errors designed ← **CAN PROCEED**
- CR-3C.5: Session conflict error reflects Decision 1 selection
- CR-3C.6: Recovery error states match Prompt 3B approach
- CR-3C.7: User communication messaging clear for each error
- CR-3C.8: Error messaging hierarchy follows design system

**To Unblock Fully**: Resolve Decision 3 → Update contract → Execute Prompt 3C

**Ready for Execution**: Partially — Other error states can proceed after Decision 3; code-expiry messaging blocked by Decision 3.

---

## Decision Map: What Blocks What

```
┌─────────────────────────────────────────┐
│  UNBLOCKED (Ready Now)                  │
├─────────────────────────────────────────┤
│  ✅ Prompt 1: Navigation Exposure       │
│     (Decision 7: SELECTED)              │
├─────────────────────────────────────────┤
│  ✅ Prompt 2A: Design Baseline          │
│     (No decisions required)             │
├─────────────────────────────────────────┤
│  ✅ Prompt 2B: Navigation Design        │
│     (No decisions required)             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  BLOCKED (Awaiting Decisions)           │
├─────────────────────────────────────────┤
│  ⏳ Prompt 3A: Reader Access            │
│     Blocked by: Decisions 3, 4, 5, 6   │
├─────────────────────────────────────────┤
│  ⏳ Prompt 3B: Recovery Flows           │
│     Blocked by: Decisions 1, 2         │
├─────────────────────────────────────────┤
│  ⏳ Prompt 3C: Error States (Partial)   │
│     Blocked by: Decision 3 (for code-  │
│     expiry messaging only)             │
└─────────────────────────────────────────┘

DECISION DEPENDENCIES:

Decision 1 (Recovery-first race)
├── Blocks: Prompt 3B execution
└── Affects: Prompt 3C Error State 5 (session conflict)

Decision 2 (Recovery lifetime)
├── Blocks: Prompt 3B execution
└── No cross-prompt effects

Decision 3 (Code expiry start time)
├── Blocks: Prompt 3A execution (email copy)
├── Blocks: Prompt 3C code-expiry messaging
└── Affects: Error message timing

Decision 4 (Email service provider)
├── Blocks: Prompt 3A execution
└── Affects: Template syntax/capabilities

Decision 5 (Manuscript publication readiness)
├── Blocks: Prompt 3A execution
└── Affects: Confirmation messaging

Decision 6 (Newsletter destination)
├── Blocks: Prompt 3A execution
└── Affects: Signup link integration
```

---

## Recommended Execution Sequence

### Immediate (Phase A — Gate 2 Approved)

```
Step 1: Execute Prompt 1
        → Navigation Exposure
        → Output: Updated navigation component (hidden routes)
        → Dependency: Ready now

Step 2: Execute Prompt 2A
        → Design Baseline Export
        → Output: CSS/JSON tokens file
        → Dependency: Ready now (standalone)

Step 3: Execute Prompt 2B
        → Navigation Design Specification
        → Output: Navigation component design with states
        → Input: Prompt 1 output (visible items list)
        → Dependency: Can run in parallel with 2A; ideally after 1
```

**Timeline for Phase A**: ~20–30 minutes (3 unblocked prompts executed in sequence/parallel)

---

### Deferred (Phase B — Awaiting Decisions)

```
DECISION RESOLUTION PRIORITY:

Recommended Order:
  1. Resolve Decision 3 (Code expiry start time)
     → Unblocks: Prompt 3A partially, Prompt 3C partially
     → Effort: Low (affects error message wording only)

  2. Resolve Decisions 1, 2 (Recovery race & lifetime)
     → Unblocks: Prompt 3B fully
     → Effort: Medium (affects race condition & validation logic)

  3. Resolve Decision 4, 5, 6 (Email, publication, newsletter)
     → Unblocks: Prompt 3A fully
     → Effort: Medium-High (affects integrations & services)

EXECUTION SEQUENCE (after decisions resolved):

Step 4: Execute Prompt 3A
        → Reader Access Copy & Forms
        → Dependencies: Decisions 3, 4, 5, 6 resolved
        → Input: Design tokens from Prompt 2A

Step 5: Execute Prompt 3B
        → Recovery Flows
        → Dependencies: Decisions 1, 2 resolved
        → Input: Navigation & design tokens from Phase A

Step 6: Execute Prompt 3C
        → Error States
        → Dependencies: Decision 3 resolved (for code-expiry)
        → Input: Patterns from Prompts 3A & 3B
```

**Timeline for Phase B**: TBD (depends on decision resolution timeline)

---

## Gate 2 Sign-Off Checklist

**Before Phase A execution**, confirm:

- [ ] PR for `docs/book-website-make-spec` reviewed
- [ ] All 4 critical fixes validated:
  - [ ] Prompt 2B colors corrected (#FF3AAE)
  - [ ] Prompt 3A status corrected (BLOCKED)
  - [ ] Reference documents consolidated (specs/references/)
  - [ ] Decision 7 status clarified (Option A selected)
- [ ] Gate 2 Readiness Report reviewed (`.github/specs/004-book-website-make/exports/GATE_2_READINESS_REPORT.md`)
- [ ] Design baseline approved (9-color palette, typography)
- [ ] Figma Make access confirmed (Make file key, API token)

**Gate 2 Sign-Off Approval** (by Ash — Project Owner):
- [ ] Gate 2 requirement verified: Design baseline matches spec
- [ ] All 3 unblocked prompts ready for execution
- [ ] Blocking decision list acknowledged (Decisions 1–6 to be resolved)
- [ ] **Approval**: ✅ Proceed with Phase A execution

---

## Next Actions

### Immediate
1. ✅ **Gate 2 Ready Report created** — `.github/specs/004-book-website-make/exports/GATE_2_READINESS_REPORT.md`
2. ✅ **Execution Plan created** — This file
3. 🔄 **Await Gate 2 Sign-Off** — Ash approves design baseline readiness

### After Gate 2 Sign-Off
4. **Execute Phase A** (Prompts 1, 2A, 2B)
   - Prompt 1 takes 5–10 minutes
   - Prompt 2A takes 10–15 minutes
   - Prompt 2B takes 10–15 minutes

5. **Resolve Blocking Decisions** (parallel to Phase A or after)
   - Decision 3: ~1 hour (clarify code-expiry timing)
   - Decisions 1, 2: ~1–2 hours (race conditions, recovery lifetime)
   - Decisions 4, 5, 6: ~2–3 hours (email provider, manuscript status, newsletter)

6. **Execute Phase B** (Prompts 3A, 3B, 3C)
   - Each prompt: 15–20 minutes (once dependencies resolved)

---

## Files Referenced

- **Contracts**: `.github/specs/004-book-website-make/contracts/prompt-*.md`
- **Gate 2 Readiness Report**: `.github/specs/004-book-website-make/exports/GATE_2_READINESS_REPORT.md`
- **Blocking Decisions Audit**: `.github/specs/004-book-website-make/contracts/blocking-decisions-audit.md`
- **Research**: `.github/specs/004-book-website-make/research.md` (Decision options & analysis)

---

**Plan Created**: 2026-11-12  
**Status**: Ready for Gate 2 Sign-Off and Phase A Execution  
**Prepared by**: Claude Haiku 4.5
