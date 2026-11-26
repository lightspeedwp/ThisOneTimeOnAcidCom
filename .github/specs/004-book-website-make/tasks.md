# Tasks: Book Website Figma Make Prompt Pack

**Input**: Design documents from `.github/specs/004-book-website-make/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent documentation and validation of each story.

**Scope Note**: This is a documentation-only specification project. No code implementation, deployments, or file commits beyond this spec folder. Focus: preparing exact Figma Make prompts for design-system export and component generation.

## Task ID scheme (Phase 9 reconciliation, 2026-11-20)

This file holds two task breakdowns. Until 2026-11-20 they shared the IDs T014–T038, so a reference to "T020" or "T022" was ambiguous. Each task now has a unique ID. No tasks were merged and no descriptions changed.

| ID range | Breakdown | Where | Notes |
| -------- | --------- | ----- | ----- |
| T001–T038 (plus T001b) | Active breakdown, rewritten for SC-004 Claude direct execution | "Phase 1: Gate 2 & SC-004 Approval" to "Phase 6: Polish & Post-Gate 2 Validation" | IDs unchanged. `exports/SPEC_004_TO_005_HANDOVER.md` and `research.md` refer to these IDs |
| T114–T151 | Original v1.0.0 breakdown (2026-11-09) | "Legacy breakdown" section | Renumbered from T014–T051 by adding 100. Phase 8 dependencies point here |
| T101–T113 | Original v1.0.0 Phase 1–2 tasks | Not in this file | Removed during the SC-004 rewrite. Text is in git history (commit `e316aaf`). Only the IDs survive, as Phase 8 dependencies |
| T052–T059 | Phase 8 convergence | "Phase 8" | Dependencies repointed to T1xx where they meant the original breakdown |
| T066–T074 | Phase 9 closure | "Phase 9" | Closed or carried forward in the reconciliation pass |
| T075–T084 | Phase 9 reconciliation | "Phase 9 Reconciliation" | This pass |

The continuation documents in `continuations/` (archived) used their own T060–T074 numbering. They are mapped to these IDs in the "Phase 9 Reconciliation" section.

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (independent deliverables, different sections)
- **[Story]**: Which user story (US1, US3, US4) — mapped from spec.md
- Include exact file paths and deliverable references

## Path Conventions

- All deliverables in: `.github/specs/004-book-website-make/`
- Contracts in: `.github/specs/004-book-website-make/contracts/`
- Exports in: `.github/specs/004-book-website-make/exports/`

---

## Phase 1: Gate 2 & SC-004 Approval

**Purpose**: Secure design baseline approval and execution model approval (SC-004: Claude Direct Execution)

**Gate 2 Approval**:
- [ ] T001 Review GATE_2_SIGN_OFF_SUMMARY.md with Ash (project owner)
- [ ] T002 Confirm design baseline locked: Space Grotesk, Inter, 9-color palette (check `.github/specs/004-book-website-make/exports/GATE_2_SIGN_OFF_SUMMARY.md`)
- [ ] T004 [P] Verify all 4 critical fixes from Gate 2 audit (Prompt 2B colors #FF3AAE, Prompt 3A status, reference paths, Decision 7 clarity)

**SC-004 Approval** (Execution Model Pivot):
- [ ] T001b **CRITICAL GATE** Review SC-004_EXECUTION_MODEL_PIVOT.md with Ash (project owner) — Claude direct execution replaces Figma Make for Prompts 1, 2A, 2B
  - Proposal: Pivot from Figma Make to Claude direct execution
  - Benefits: Faster iteration, version control, Spec 005 continuity
  - Timeline: No impact (45–60 min Claude vs. 30–45 min Figma Make)
  - Approval checkbox: [ ] ✅ **APPROVE** or [ ] ⏸️ **REQUEST CHANGES**
  - Collect signature/timestamp from Ash

**Environment Check** (Deprecated Figma requirement, kept for reference):
- [x] T003 ~~Validate Figma Make environment access~~ **SUPERSEDED BY SC-004** — Claude execution requires no Figma environment

**Checkpoint**: Gate 2 + SC-004 approval confirmed - ready for Phase A execution via Claude

---

## Phase 2: Foundational (Gate 2 Approval & Design Baseline Validation)

**Purpose**: Design system approval and baseline confirmation - MUST complete before Prompt execution

**⚠️ CRITICAL**: Gate 2 approval (design baseline sign-off) BLOCKS prompt generation

- [ ] T006 Validate GATE_2_SIGN_OFF_SUMMARY.md with Ash: design tokens approved, unapproved candidates (R3, T1, RT2, C1) listed separately per spec.md
- [ ] T007 [P] Confirm CSS variables export template: Space Grotesk weights/sizes, Inter weights/sizes, 9-color palette in both themes (see design-brief.md)
- [ ] T008 [P] Confirm JSON design-token export template with exact field names and color hex values matching approved baseline
- [ ] T009 Verify navigation structure locked: Speaking/Events/Media marked as hidden from sitemap per contracts/prompt-1-*.md
- [ ] T010 Document all Prompts 1–2B ready conditions: exact component names, states, acceptance criteria per data-model.md
- [ ] T005 [US1] Validate Prompt 1 preview includes: before/after navigation, numbered implementation steps, non-changes list, acceptance criteria (`contracts/prompt-1-navigation-exposure.md`)
- [ ] T006 [US1] Validate Prompt 2A exports both CSS variables and JSON design tokens matching 9-color approved baseline (`contracts/prompt-2a-design-baseline.md`)
- [ ] T007 [US1] Validate Prompt 2B navigation component shows 4 visible items with #FF3AAE hover/active state in all responsive breakpoints (`contracts/prompt-2b-navigation-design.md`)

### Implementation for US1 (Claude Direct Execution — SC-004 approved)

- [x] T008 [P] [US1] Execute Prompt 1: Navigation Exposure via Claude ~~(Figma Make)~~ (produce navigation enforcement spec + implementation checklist; validate against acceptance criteria)
- [x] T009 [P] [US1] Execute Prompt 2A: Design Baseline Export via Claude ~~(Figma Make)~~ (export CSS variables + JSON tokens; validate both files parse correctly)
- [x] T010 [P] [US1] Execute Prompt 2B: Navigation Design via Claude ~~(Figma Make)~~ (produce TypeScript component spec + responsive CSS + accessibility checklist) — ✅ T008–T010 delivered in PR #648; see `exports/PHASE_2_EXECUTION_LOG.md` (owner decisions still open there, e.g. menu size)
- [ ] T011 [US1] Validate specification contracts match acceptance criteria (manual design reference from `contracts/` folder)

**Checkpoint**: Phase A complete - US1 (Design Hand-off) is fully executable and approved

---

## Phase 3: User Story 1 - Design Specification Hand-off (Priority: P1) 🎯

**Goal**: Deliver complete, exact Figma Make prompts for Prompts 1, 2A, 2B establishing authoritative design baseline for navigation and design-system components

**Independent Test**: Each prompt references approved design elements, specifies exact component names, preserves approved decisions, documents unapproved candidates separately, includes verifiable acceptance criteria

### Prompt Contracts for User Story 1

> **Handed over to Spec 005 (2026-11-13)**: Phase 3 (T012–T016) covers Prompt 3A, which [Spec 005](../005-reader-access/spec.md) now owns. See `exports/SPEC_004_TO_005_HANDOVER.md`. These tasks stay open here as a record; they will not be done in Spec 004.

- [ ] T012 [US2] Validate Prompt 3A preview: form explanation copy, error messages, newsletter CTA in separate section (`contracts/prompt-3a-reader-access.md`) — **MOVED_TO_SPEC_005**
- [ ] T013 [US2] Confirm all form states designed: default, focused, error, loading, success (verify no hardcoded copy differs from approved source) — **MOVED_TO_SPEC_005**
- [ ] T011 [P] [US1] Validate Prompt 1 (Navigation Exposure) contract in contracts/prompt-1-navigation-exposure.md: before/after navigation, implementation steps, non-changes list, acceptance criteria
- [ ] T012 [P] [US1] Validate Prompt 2A (Design Baseline) contract in contracts/prompt-2a-design-baseline.md: CSS variables + JSON tokens export specs with exact approved values
- [ ] T013 [P] [US1] Validate Prompt 2B (Navigation Design) contract in contracts/prompt-2b-navigation-design.md: component design, all states, responsive breakpoints (1024px/768px), hover/active states (#FF3AAE)

### Implementation for US2 (Claude Direct Execution — SC-004 approved)

- [ ] T014 [US2] Review Prompt 3A contract with blocking decision status (awaits Decisions 3, 4, 5, 6: code expiry timing, email provider, manuscript status, newsletter destination) — **MOVED_TO_SPEC_005**
- [ ] T015 [US2] Once Decisions 3, 4, 5, 6 resolved: Execute Prompt 3A (reader access copy & forms) via Claude ~~(Figma Make)~~ (produce form specification + email template + error message matrix) — **MOVED_TO_SPEC_005**
- [ ] T016 [US2] Validate Prompt 3A specification: approved copy present, form states documented, newsletter link explicit non-subscription statement (manual review from `contracts/prompt-3a-reader-access.md`) — **MOVED_TO_SPEC_005**

**Checkpoint**: US2 (Reader Access) → Spec 005 responsibility. Contracts remain for reference.

**See**: [Spec 004 → Spec 005 Handover](./exports/SPEC_004_TO_005_HANDOVER.md) for details

---

## Phase 4: User Story 3 - Implementation Readiness & Blocking Decisions (Priority: P2)

**Goal**: Document all blocking decisions with implementation rationale so development knows what gates progress and what can proceed with placeholders

**Independent Test**: All 7 blocking decisions listed with options, each identifies impact if unresolved, resolved decisions marked approved, risk assessment complete

### Decision Documentation for User Story 3

- [ ] T020 [P] [US3] Update research.md with Decision 1 (Recovery-first race): Option A approved, implementation rationale, impact on Prompt 3B per spec.md blocking table
- [ ] T021 [P] [US3] Update research.md with Decision 2 (Recovery lifetime): Option A approved (30-day absolute expiry), implementation rationale, impact on Prompt 3B
- [ ] T022 [P] [US3] Update research.md with Decision 3 (Code expiry start time): Option A approved (from generation), implementation rationale, impact on Prompts 3A/3C per spec.md
- [ ] T023 [P] [US3] Update research.md with Decision 4 (Email provider): Hybrid (SendGrid + Brevo) approved, implementation rationale, rate limits documented
- [ ] T024 [P] [US3] Update research.md with Decision 5 (Manuscript readiness): Early release decision approved 2026-11-13, chapters published individually, impact on Prompts 3A–3C → Spec 005
- [ ] T025 [P] [US3] Update research.md with Decision 6 (Newsletter destination): Brevo external signup approved, implementation rationale, non-subscription statement required per spec.md
- [ ] T026 [P] [US3] Update research.md with Decision 7 (Route enforcement): Option A approved (noindex + sitemap exclusion), verification method documented

### Blocking Decision Matrix for User Story 3

**Timeline**: 4–6 hours for decisions + clarification

> **Resolved 2026-11-13**: Ash selected options for all seven decisions. See `exports/decisions-selected.md` and `research.md`. T019 and T021–T024 are closed. T020 (Decision 2) is closed for Spec 004 with Option A, which is now labelled "session refresh with absolute 30-day expiry". Whether that interacts with repeated renewal is a Spec 005 question; `exports/GATE_3_FINAL_SIGN_OFF.md` marks it ⏳ PARTIAL.

- [x] T019 [P] [US3] **Decision 1 (Recovery-first race condition)**: Clarify with Ash: when recovery and fresh verification race, which takes precedence? Options: A (recovery first), B (fresh first), C (last-writer-wins), D (user chooses). Update `research.md` with chosen option — ✅ RESOLVED 2026-11-13 (`research.md`)
- [x] T020 [P] [US3] **Decision 2 (Recovery lifetime eligibility)**: Clarify with Ash: how long is recovery code valid? Options: 24h, 7d, 30d. Update `research.md` — ✅ RESOLVED 2026-11-13 (`research.md`)
- [x] T021 [P] [US3] **Decision 3 (Code expiry start time)**: Clarify with product lead: from code generation? receipt? page load? Options: A (generation), B (receipt), C (page load). Update `research.md` — ✅ RESOLVED 2026-11-13 (`research.md`)
- [x] T022 [P] [US3] **Decision 4 (Email service provider)**: Clarify with tech lead: SendGrid or Brevo? API/SMTP availability? Update `research.md` — ✅ RESOLVED 2026-11-13 (`research.md`)
- [x] T023 [P] [US3] **Decision 5 (Manuscript publication readiness)**: Clarify with author: when is manuscript approved & available for readers? Draft timeline: 2027-01-31. Update `research.md` with status — ✅ RESOLVED 2026-11-13 (`research.md`)
- [x] T024 [P] [US3] **Decision 6 (Newsletter destination)**: Clarify with product: Brevo signup link or other service? Update `research.md` — ✅ RESOLVED 2026-11-13 (`research.md`)
- [ ] T027 [US3] Create comprehensive blocking-decisions-audit.md documenting all 7 decisions with: option summary, resolution status, implementation impact, Prompt dependencies, rationale
- [ ] T028 [US3] Verify decision routing: Decisions 1–6 enable Spec 005 (reader access, Prompts 3A–3C); Decision 7 enables Prompt 1 (navigation)
- [ ] T029 [US3] Document implementation prerequisites: list what must be verified/confirmed before each prompt can execute (Figma Make environment, manuscript status, email provider confirmed, etc.)

**Checkpoint**: All blocking decisions documented with implementation guidance - development has clear visibility on decision gates and parallelization opportunities
### Implementation for US3 (Claude Direct Execution — SC-004 approved; after Decision Resolution)

- [ ] T025 [US3] Once Decisions 1 & 2 resolved: Execute Prompt 3B (recovery flows) via Claude ~~(Figma Make)~~ (produce recovery state matrix + error handling spec) — **MOVED_TO_SPEC_005**
- [ ] T026 [US3] Once Decision 3 resolved: Execute Prompt 3C (error states, code-expiry messaging) via Claude ~~(Figma Make)~~ (produce error message matrix + timeout handling spec) — **MOVED_TO_SPEC_005**
- [ ] T027 [US3] Validate Prompt 3B and 3C specifications; verify race condition handling and error messaging match resolved decisions (manual review from `contracts/`) — **MOVED_TO_SPEC_005**

**Checkpoint**: All blocking decisions resolved - Phase B execution unblocked

**BLOCKED BY**: Decisions 1, 2, 3, 4, 5, 6 (parallel resolution track) — ✅ all resolved 2026-11-13; Prompts 3B/3C moved to Spec 005

---

## Phase 4: User Story 3 - Implementation Readiness & Blocking Decisions (Priority: P2)

**Goal**: Deliver complete documentation package ready for approval before any code/commits/deployments, with all source reconciliation, exact previews, and decision matrix included

**Independent Test**: All six source files analyzed, gaps/conflicts documented, exact previews for Prompts 1–2B ready, blocked prompts explain prerequisites, complete package prepared for user approval

### Documentation Package Completion for User Story 4

- [ ] T030 [P] [US4] Compile source-file-inventory.md: all six files (01-06) listed with versions, reconciliation notes, material-effect assessment per spec.md FR-002
- [ ] T031 [P] [US4] Compile version-reconciliation.md: document all version differences (02 v1.0.3→v1.0.4, 03 v1.2.2→v1.3.0, 05 v1.7.0→v1.9.0) with rationale
- [ ] T032 [P] [US4] Compile codebase-consistency-crosswalk.md: map all spec requirements to contracts/, data-model.md, research.md references

### Documentation Package Validation for User Story 4

- [ ] T033 [US4] Verify spec.md completeness: all 4 user stories documented, 10 FRs present, 8 success criteria present, 8 assumptions present, 4 edge cases present
- [ ] T034 [US4] Verify plan.md completeness: technical context filled, all 7 blocking decisions updated with approved status, constitution check passed
- [ ] T035 [US4] Verify data-model.md completeness: 6 entities defined with fields, relationships, validation rules, state transitions documented
- [ ] T036 [US4] Verify contracts/ completeness: 7 prompt files (1, 2A, 2B, 3A, 3B, 3C, plus audit) with execution guides, acceptance criteria, blocking status

### Specification Quality Sign-Off for User Story 4

- [ ] T037 [US4] Validate specification-quality.md checklist: all 100 items reviewed, 99+ passing, any outstanding items (CHK057 performance NFR) marked low-priority
- [ ] T038 [US4] Review GATE_2_SIGN_OFF_SUMMARY.md: approval checklist complete, design baseline locked, Phase A prerequisites listed, timeline established
- [ ] T039 [US4] Review GATE_2_READINESS_REPORT.md: 4 critical fixes verified, design baseline verified locked, no unresolved blockers for Prompts 1–2B
- [ ] T040 [US4] Compile final documentation package: spec.md, plan.md, research.md, data-model.md, contracts/, quickstart.md, all exports/reports, checklists - ready for Ash's approval

**Checkpoint**: Complete documentation package prepared and validated - all files present, no unresolved TODOs, ready for Gate 2/3 approval workflow

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements and final validation across all user stories before handoff

- [ ] T041 [P] Run specification-quality.md checklist against final spec.md, plan.md, tasks.md - confirm zero unresolved [NEEDS CLARIFICATION] markers
- [ ] T042 [P] Validate quickstart.md approval flow matches GATE_2_SIGN_OFF_SUMMARY.md gate prerequisites
- [ ] T043 [P] Verify all file paths in tasks.md reference exact locations per AVAILABLE_DOCS list
- [ ] T044 Documentation-only boundary verification: confirm zero code generated, zero commits created, zero deployments triggered - all deliverables in spec folder only
- [ ] T045 Final approval package: ensure GATE_2_SIGN_OFF_SUMMARY.md ready for user approval signature and date

**Checkpoint**: Documentation package complete, validated, and ready for stakeholder review and approval

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all Prompts
  - **CRITICAL**: Gate 2 approval must complete before Prompt generation
- **User Story 1 (Phase 3)**: Depends on Foundational completion - Prompts 1–2B ready
- **User Story 3 (Phase 4)**: Can run PARALLEL with US1 after Foundational
  - Blocking decisions documentation (independent of Prompt generation)
- **User Story 4 (Phase 5)**: Depends on US1 + US3 completion
  - Assembles complete package including US1 Prompts + US3 decisions
- **Polish (Phase 6)**: Depends on all stories complete - final validation

### Within Each User Story

- Contracts validation before preview generation
- Independent tests for each story MUST pass before moving to next priority
- Each story should be independently verifiable

### Parallel Opportunities

**After Setup completes**:
- Foundational tasks T003–T004 marked [P] can run in parallel

**After Foundational completes**:
- **US1 (Prompts 1–2B)** and **US3 (Blocking Decisions)** can run in PARALLEL
  - T011–T013: All 3 Prompt contracts validated in parallel [P]
  - T020–T026: All 7 blocking decisions documented in parallel [P]
  - T014–T019: Prompt generation tasks (sequential per story)
- Once US1 and US3 complete: US4 can begin (depends on both)

**Within US1**:
- T011–T013: Prompt contract validation (3 independent contracts) → all [P]
- T014–T019: Prompt generation tasks (sequential per story)

**Within US3**:
- T020–T026: Blocking decision documentation (7 independent decisions) → all [P]
- T027–T029: Blocking decision matrix and implementation guidance (sequential)

**Within US4**:
- T030–T032: Documentation compilation (3 independent documents) → all [P]
- T033–T036: Documentation validation (4 independent validations) → can be sequential per document
- T037–T040: Specification quality sign-off (sequential validation)

**Within Phase 6**:
- T041–T043: Polish tasks (3 independent checks) → all [P]
- T044–T045: Boundary verification and final package (sequential)

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (Gate 2 approval REQUIRED)
3. Complete Phase 3: User Story 1 (Prompts 1–2B)
4. **STOP and VALIDATE**: Prompts 1–2B ready for Figma Make execution
5. Deploy/demo to stakeholders if design baseline approved

### Full Delivery

1. Complete Setup + Foundational → Foundation ready
2. Complete US1 (Prompts 1–2B) → Design specification ready
3. Run US3 in parallel (or sequentially) → Blocking decisions documented
4. Complete US4 → Full documentation package ready for approval
5. Each component independently verifiable before moving to next

### Parallel Team Strategy

With multiple people:

1. Everyone completes Setup + Foundational together (Phase 1–2)
2. Once Foundational ready:
   - Person A: US1 Prompt contracts + generation (T011–T019)
   - Person B: US3 Blocking decisions (T020–T029)
   - Person C: US4 Documentation package prep (T030–T040)
3. All stories complete independently
4. Converge on Polish phase (Phase 6) for final validation

---

## Notes

- [P] tasks = independent deliverables, can run in parallel by different people
- [Story] label (US1, US3, US4) maps each task to its user story per spec.md
- Each user story independently completable and verifiable
- Documentation-only constraint: NO code, NO commits, NO deployments (all spec folder work)
- Blocking decisions documented before they're needed (Spec 005 input)
- Approvals gate progress: Gate 2 must pass before Prompt execution
- Commit after each task or logical group (this spec folder only)
- Stop at any checkpoint to validate story independently before moving to next

---

## Success Criteria per User Story

- **US1 (Design Hand-off)**: All 3 Phase A prompts executable and validated ✅
- **US2 (Reader Access)**: Prompt 3A awaiting 4 decisions; executable once decisions resolved ⏳
- **US3 (Implementation Readiness)**: All 7 decisions clarified and documented ⏳
- **US4 (Documentation Completion)**: Complete package submitted for user approval ✅

---

## Legacy breakdown: original v1.0.0 task list (2026-11-09), renumbered T1xx

> These are the original tasks from 2026-11-09, renumbered by adding 100 (T014 → T114 and so on) on 2026-11-20 to remove duplicate IDs. Phase 8 dependencies refer to this list. Tasks T101–T113 are not in this file; see the "Task ID scheme" section at the top.

- [x] ~~T114 Prepare Approval Gate 1 summary in quickstart.md: "All 7 decisions ready for user selection" with links to research.md decision options~~ — **SUPERSEDED**: Approval Gate 1 resolved 2026-11-13
**Branch**: ccr-01b4e649-64vj1f | **PR**: [#618 (Merged)](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/618)

**Total Tasks**: 45 | **Phase 1**: 5 | **Phase 2**: 5 | **Phase 3 (US1)**: 9 | **Phase 4 (US3)**: 10 | **Phase 5 (US4)**: 11 | **Phase 6**: 5

**MVP Scope**: Phases 1–3 (US1 Prompts 1–2B ready) = 19 tasks | **Full Scope**: All phases = 45 tasks

**Goal**: Document and prepare for export of design baseline (Space Grotesk, Inter, 9-color palette) and navigation component specifications

**Independent Test Criteria**:
- ✓ Design baseline (typography, colors, component styles) is extracted from approved sources
- ✓ All 18 color tokens defined (9 light + 9 dark theme)
- ✓ All typography tokens defined (Space Grotesk weights/sizes, Inter weights/sizes)
- ✓ Unapproved candidates (R3, T1, RT2, C1) are explicitly listed as non-included
- ✓ Navigation specification documents hidden items (/speaking, /events, /media)
- ✓ All design state variations are specified (default, hover, active, mobile, tablet, desktop)

**Implementation Tasks**:

- [ ] T115 [P] [US1] Read contracts/prompt-2a-design-baseline.md and validate all typography specifications match 04-design-brief.md v1.1.2
- [ ] T116 [P] [US1] Read contracts/prompt-2a-design-baseline.md and validate all color specifications match approved palette (9 light + 9 dark)
- [ ] T117 [P] [US1] Read contracts/prompt-1-navigation-exposure.md and validate navigation structure matches 03-author-decisions-launch-scope.md (hidden: Speaking, Events, Media)
- [ ] T118 [P] [US1] Read contracts/prompt-2b-navigation-design.md and document all navigation states (default, hover, active, mobile, tablet, desktop)
- [x] T119 [US1] Create design-baseline-validation.md in `.github/specs/004-book-website-make/exports/` documenting: — ✅ file exists in `exports/` (verified 2026-11-20)
  - All typography tokens extracted
  - All color tokens extracted (with hex values)
  - All component styles specified (Button, Card, Navigation, Form)
  - All states rendered (default, focused, error, loading, success)
  - Unapproved candidates listed separately: R3, T1, RT2, C1
- [x] T120 [US1] Create navigation-specification.md in `.github/specs/004-book-website-make/exports/` documenting: — ✅ file exists in `exports/` (verified 2026-11-20)
  - Visible items: Home, About, Book, Contact
  - Hidden items: Speaking, Events, Media (not in sitemap)
  - All responsive breakpoints: desktop (≥1024px), tablet (768–1023px), mobile (<768px)
  - Mobile drawer interaction and overlay behavior
- [x] T121 [US1] Create design-baseline-acceptance-report.md in `.github/specs/004-book-website-make/exports/` with CR-2A.1 through CR-2A.6 validation results: — ✅ file exists in `exports/` (verified 2026-11-20)
  - CR-2A.1: Exported tokens match exactly approved baseline values
  - CR-2A.2: Typography includes Space Grotesk and Inter with exact weights/sizes
  - CR-2A.3: Colors all 9 exported for light theme, all 9 for dark theme
  - CR-2A.4: Unapproved candidates (R3, T1, RT2, C1) are NOT in exported tokens
  - CR-2A.5: Component styles exported (Button, Card, Navigation, Form) with all states
  - CR-2A.6: CSS file is valid and parseable by build tools

**Checkpoint**: Design baseline fully documented and ready for Figma Make Prompt 2A execution

---

## Phase 4: User Story 2 — Reader Access Journey Definition (P1)

> **Handed over to Spec 005 (2026-11-13)**: T122–T124 and T127–T130 cover Prompt 3A reader access, which Spec 005 owns. T125–T126 (navigation, Prompts 1 and 2B) stay in Spec 004 scope.

**Goal**: Document and prepare for export of email verification copy, form specifications, and error messaging (4 unblocked prompts: 1, 2B, 3A)

**Independent Test Criteria**:
- ✓ Email copy matches approved source exactly (06-website-reading-prd.md v1.1.1)
- ✓ All form states designed (default, focused, error, loading, success)
- ✓ All error messages document failure scenarios (invalid code, expired, rate-limited, server, session-conflict)
- ✓ Newsletter CTA is separate from verification form with explicit "optional" language
- ✓ Help text and labels match approved source
- ✓ All forms support keyboard navigation and screen readers (WCAG 2.2 AA)

**Implementation Tasks**:

- [ ] T122 [P] [US2] Read contracts/prompt-3a-reader-access.md and extract email copy section → confirm it matches the wording Ash approved on 2026-11-13 (recorded in that contract) exactly
- [ ] T123 [P] [US2] Read contracts/prompt-3a-reader-access.md and document all form states: email entry form, code entry form, success state
- [ ] T124 [P] [US2] Read contracts/prompt-3c-error-states.md (blocked) and extract planned error messages (5 scenarios: invalid, expired, rate-limited, server, session-conflict)
- [ ] T125 [P] [US2] Read contracts/prompt-1-navigation-exposure.md and document navigation changes (4 visible links, no /speaking /events /media)
- [ ] T126 [P] [US2] Read contracts/prompt-2b-navigation-design.md and document navigation component states and responsive behavior
- [ ] T127 [US2] Create reader-access-copy.md in `.github/specs/004-book-website-make/exports/` documenting:
  - Email subject: "Your reading code"
  - Email body: exact copy approved by Ash on 2026-11-13 (see contracts/prompt-3a-reader-access.md; no modifications)
  - Email footer: newsletter signup link info
  - Form labels and placeholders (email entry: "you@example.com", code entry: "XXXXXX")
  - Help text: "We'll email you a 10-minute code. No subscription required."
- [ ] T128 [US2] Create form-states-specification.md in `.github/specs/004-book-website-make/exports/` documenting:
  - Email entry form: default, focused, error, loading states
  - Code entry form: default, focused, error, loading, success states
  - Success message: "Access confirmed. You can now read."
  - Error states: invalid code, code expired, rate limited, server error, session conflict
  - All states documented with visual specifications (border color, text color, icons)
- [ ] T129 [US2] Create newsletter-specification.md in `.github/specs/004-book-website-make/exports/` documenting:
  - Newsletter CTA section separate from reader access form
  - Heading: "Stay Updated"
  - Copy: "Join our newsletter for book updates (optional)."
  - Link text: "Sign up" or "Learn more" or "Subscribe"
  - REQUIRED: Explicitly states "This is separate from reading access. Uncheck to read without subscribing."
  - Newsletter link destination: [Decision 6 selection pending]
- [ ] T130 [US2] Create reader-access-acceptance-report.md in `.github/specs/004-book-website-make/exports/` with CR-3A.1 through CR-3A.8 validation results:
  - CR-3A.1: Email copy matches approved source exactly
  - CR-3A.2: All form states designed (default, focused, error, loading, success)
  - CR-3A.3: Error messages distinguish failure scenarios (invalid, expired, rate-limited, server, session-conflict)
  - CR-3A.4: Code expiry messaging reflects Decision 3 selection (pending)
  - CR-3A.5: Newsletter CTA in separate section (NOT mixed with verification)
  - CR-3A.6: Newsletter link clearly non-subscription ("optional", "separate")
  - CR-3A.7: No success claims without server confirmation
  - CR-3A.8: All help text and labels match approved source

**Checkpoint**: Reader access journey fully documented and ready for Figma Make Prompts 1, 2B, 3A execution

---

## Phase 5: User Story 3 — Recovery Flows & Error Handling (P1 → BLOCKED)

> **Handed over to Spec 005 (2026-11-13)**: Prompts 3B and 3C belong to [Spec 005](../005-reader-access/spec.md). T131–T133 are closed because the decisions were made. T134–T138 stay open here as a record only.

**Goal**: Document recovery flow specification and error states (2 blocked prompts: 3B partial, 3C). *Historical: BLOCKED pending Decisions 1, 2, 3 — resolved 2026-11-13.*

**Blocking Dependencies**:
- Decision 1: Recovery-first race condition → required for Prompt 3B execution
- Decision 2: Recovery lifetime eligibility → required for Prompt 3B execution
- Decision 3: Code expiry start time → required for Prompt 3C execution

**Implementation Tasks** (deferred until decisions resolved):

- [x] T131 ~~[BLOCKED]~~ [US3] Await user selection of Decision 1 (recovery-first race condition options A/B/C/D) in Approval Gate 1 — ✅ RESOLVED 2026-11-13 (`research.md`)
- [x] T132 ~~[BLOCKED]~~ [US3] Await user selection of Decision 2 (recovery lifetime eligibility options A/B/C/D) in Approval Gate 1 — ✅ RESOLVED 2026-11-13 (`research.md`)
- [x] T133 ~~[BLOCKED]~~ [US3] Await user selection of Decision 3 (code expiry start time options A/B/C) in Approval Gate 1 — ✅ RESOLVED 2026-11-13 (`research.md`)
- [ ] T134 [US3] Once Decision 1 resolved: read contracts/prompt-3b-recovery-flows.md and update with Decision 1 selection → generate recovery-flow-specification.md
- [ ] T135 [US3] Once Decision 2 resolved: read contracts/prompt-3b-recovery-flows.md and update with Decision 2 selection → append to recovery-flow-specification.md
- [ ] T136 [US3] Once Decision 3 resolved: read contracts/prompt-3c-error-states.md and update with Decision 3 selection → generate error-states-specification.md with exact expiry messaging
- [ ] T137 [US3] Create recovery-flows-acceptance-report.md in `.github/specs/004-book-website-make/exports/` with CR-3B.1 through CR-3B.6 validation results (post-decision):
  - CR-3B.1: Recovery flow follows Decision 1 race-condition strategy (selected option)
  - CR-3B.2: Session lifetime enforcement matches Decision 2 selection
  - CR-3B.3: All recovery failure states designed (expired, invalid, race-condition)
  - CR-3B.4: Error messages clearly explain recovery failure reason
  - CR-3B.5: Recovery success path matches reader access policy (10-min codes, 30-day device lifecycle)
  - CR-3B.6: Fallback to fresh email verification documented when recovery unavailable
- [ ] T138 [US3] Create error-states-acceptance-report.md in `.github/specs/004-book-website-make/exports/` with CR-3C.1 through CR-3C.8 validation results (post-decision):
  - CR-3C.1: All 5 error states designed (invalid, expired, rate-limited, server, session-conflict)
  - CR-3C.2: Code expiry message reflects Decision 3 selection (timing explanation)
  - CR-3C.3: Error messages distinguish failure reasons (user-error vs. timing vs. rate-limit vs. server)
  - CR-3C.4: Each error state includes user action (retry, wait, request new code)
  - CR-3C.5: Form styling consistent with approved design baseline (colors, typography)
  - CR-3C.6: Help text clearly explains what went wrong and what user should do
  - CR-3C.7: Countdown timer shown for rate-limit error
  - CR-3C.8: All error states accessible to keyboard/screen readers

**Checkpoint**: Recovery flows and error states documented and ready for Figma Make Prompts 3B/3C execution (post-decisions)

---

## Phase 6: User Story 4 — Documentation-Only Workflow Completion (P1)

**Goal**: Complete approval gates and prepare implementation-readiness documentation with no code commits or deployments

**Independent Test Criteria**:
- ✓ All 7 blocking decisions documented with user-selected options
- ✓ Design baseline approval gate signed
- ✓ Preflight analysis completed and approved
- ✓ No code changes, no commits, no file writes beyond `.github/specs/004-book-website-make/`

**Implementation Tasks**:

- [ ] T139 [P] [US4] Prepare Approval Gate 2 summary in quickstart.md: "Design baseline approved for export" with checklist of approved elements (Space Grotesk, Inter, 9-color palette, navigation, access policy)
- [ ] T140 [P] [US4] Prepare Approval Gate 3 summary in quickstart.md: "Preflight analysis complete and ready for implementation team" with links to all validation reports
- [x] T141 [US4] Document all Approval Gate 1 decisions (7 selected options) in `.github/specs/004-book-website-make/exports/decisions-selected.md` with: — ✅ file exists in `exports/` (verified 2026-11-20); its decision states are a 2026-11-19 snapshot, so use `research.md` as the record of the approved options
  - Decision 1 selection and rationale
  - Decision 2 selection and rationale
  - Decision 3 selection and rationale
  - Decision 4 selection and rationale (email provider)
  - Decision 5 selection and rationale (manuscript status)
  - Decision 6 selection and rationale (newsletter destination)
  - Decision 7 selection and rationale (route enforcement)
- [x] T142 [US4] Create implementation-readiness-checklist.md in `.github/specs/004-book-website-make/exports/` documenting: — ✅ file exists in `exports/` (verified 2026-11-20)
  - ✓ Prompt 1 (Navigation Exposure): Ready for execution
  - ✓ Prompt 2A (Design Baseline): Ready for execution
  - ✓ Prompt 2B (Navigation Design): Ready for execution
  - ✓ Prompt 3A (Reader Access): Ready for execution
  - ⏳ Prompt 3B (Recovery Flows): Ready post-Decisions 1&2
  - ⏳ Prompt 3C (Error States): Ready post-Decision 3
  - Figma Make outputs location: `.github/specs/004-book-website-make/exports/figma-outputs/`
  - Blocking decision resolution status: All 7 decisions resolved
  - Implementation team readiness: Yes
  - Handoff checklist: All artifacts staged
- [x] T143 [US4] Create preflight-analysis-final.md in `.github/specs/004-book-website-make/exports/` summarizing: — ✅ file exists in `exports/` (verified 2026-11-20)
  - All 6 source files analyzed (01-06 from content/book/)
  - Version reconciliation completed (02 v1.0.3→v1.0.4, 03 v1.2.2→v1.3.0, 05 v1.7.0→v1.9.0)
  - All gaps and conflicts documented
  - All validation reports: design-baseline, reader-access, recovery-flows, error-states
  - Approval gate sign-offs: Gate 1 (decisions), Gate 2 (design), Gate 3 (readiness)
  - Implementation team readiness assessment: Ready to proceed
  - No code changes, commits, or deployments performed
- [x] T144 [US4] Create workflow-completion-report.md in `.github/specs/004-book-website-make/exports/` documenting: — ✅ file exists in `exports/` (verified 2026-11-20)
  - Status: Documentation-only workflow COMPLETE
  - All 4 specification user stories (US1–US4) completed
  - All artifacts generated: spec.md, plan.md, research.md, data-model.md, quickstart.md, contracts/
  - All validation reports completed: design-baseline, reader-access, recovery-flows, error-states
  - Approval gates completed: Gate 1 (decisions), Gate 2 (design), Gate 3 (readiness)
  - Ready for implementation phase authorization
  - Next step: Implementation team begins Figma Make prompt execution per quickstart.md
- [x] ~~T145 [US4] Verify branch `docs/book-website-make-spec` has zero code changes (documentation only)~~ — **SUPERSEDED** (Phase 9 reconciliation): spec work merged to `main` through PRs #622, #630 and #639, so the "no commits" and `docs/book-website-make-spec` branch checks no longer apply. Documentation-only scope is now enforced by spec.md Status gates and PR review
- [x] ~~T146 [US4] Verify no commits created (documentation staged, not committed, pending approval)~~ — **SUPERSEDED** (Phase 9 reconciliation): spec work merged to `main` through PRs #622, #630 and #639, so the "no commits" and `docs/book-website-make-spec` branch checks no longer apply. Documentation-only scope is now enforced by spec.md Status gates and PR review
- [x] ~~T147 [US4] Verify `.specify/feature.json` persists feature directory (ready for implementation phase)~~ — **SUPERSEDED** (Phase 9 reconciliation): spec work merged to `main` through PRs #622, #630 and #639, so the "no commits" and `docs/book-website-make-spec` branch checks no longer apply. Documentation-only scope is now enforced by spec.md Status gates and PR review

**Checkpoint**: Documentation-only workflow complete. All artifacts staged for approval. No code changes.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and handoff preparation

- [ ] T148 Validate all task descriptions reference correct file paths in `.github/specs/004-book-website-make/` or `exports/`
- [ ] T149 Verify all acceptance criteria (CR-2A, CR-3A, CR-3B, CR-3C) are documented in corresponding validation reports
- [ ] T150 Confirm all approval gates are documented: Gate 1 (decisions), Gate 2 (design baseline), Gate 3 (readiness)
- [ ] T151 Create TASKS_COMPLETION_REPORT.md documenting:
  - Total tasks: 51
  - By user story: US1 (7 tasks), US2 (9 tasks), US3 (8 blocked/deferred), US4 (9 tasks), Setup/Polish (9 tasks)
  - Blocking tasks: T131–T133 (await decision resolution), T134–T136 (blocked until decisions selected)
  - Parallel opportunities: T105–T111, T115–T118, T122–T126, T139–T140
  - Approval gates status: Gate 1 (pending), Gate 2 (pending), Gate 3 (pending)
  - Implementation readiness: Ready upon Gate approvals
  - No code changes: 0 commits, 0 pushes, 0 deployments performed
  - Documentation package: Complete and staged for approval

---

## Dependencies & Execution Order

> **Historical planning notes (legacy v1.0.0 plan, 2026-11-09).** The sections from here to "Next Steps" describe the original plan. They are kept as a record and are not an executable task list. Current status (2026-11-26):
>
> - T101–T113 are not in this file (removed in the SC-004 rewrite; text in git `e316aaf`). T114 is superseded.
> - Approval Gate 1 was resolved on 2026-11-13: T131–T133 are closed (see `research.md`).
> - Moved to Spec 005: T122–T124, T127–T130 and T134–T138. Still in Spec 004: T125–T126 (navigation).
> - Done: T119–T121 and T141–T144. Superseded: T145–T147.
> - The executable lists are the active breakdown ("Phase 1: Gate 2 & SC-004 Approval" onwards) and Phases 8–9.

```text
Phase 1 (Setup) ──┐
                  ├──> Phase 2 (Decisions & Gates) ──┐
                  │                                  ├──> Phase 6 (Approval Gates)
                  ├──> Phase 3 (Design Baseline) ────┤
                  │                                  ├──> Phase 7 (Final)
                  ├──> Phase 4 (Reader Access) ──────┤
                  │                                  │
                  └──> Phase 5 (Recovery/Errors) ────┘
                       (historical: BLOCKED on Decisions 1–3; resolved 2026-11-13)
```

### Critical Path (Blocking Dependencies)

1. **T101–T114** (Phase 1–2): Setup and extract blocking decisions — *historical: T101–T113 not in this file; T114 superseded*
2. **T131–T133** (Phase 5): ✅ Approval Gate 1 resolved 2026-11-13 — *historical: was BLOCKED awaiting user selections*
3. Gate 1 approved 2026-11-13:
   - **T115–T121** (Phase 3): Execute in parallel
   - **T122–T130** (Phase 4): Execute in parallel
   - **T134–T138** (Phase 5): moved to Spec 005
4. **T139–T147** (Phase 6): Complete Approval Gates 2–3, prepare handoff
5. **T148–T151** (Phase 7): Final validation

### Parallel Execution Opportunities

**Phase 1–2 (Sequential, blocking)**:
- T105–T111: Extract all 7 blocking decisions — *historical: not in this file; decisions resolved 2026-11-13*

**Phase 3 (Fully Parallel, no dependencies)**:
- T115–T118: Read and validate design specifications (4 contract files in parallel)
- T119–T121: Generate design reports (depend on T115–T118)

**Phase 4 (Fully Parallel, no dependencies)**:
- T122–T126: Read and validate reader access specifications (5 tasks in parallel)
- T127–T130: Generate reader access reports (depend on T122–T126)

**Phase 5 (decisions resolved 2026-11-13)**:
- T131–T133: ✅ resolved (Approval Gate 1)
- T134–T138: moved to Spec 005

**Phase 6 (Sequential, depends on Phases 3–5)**:
- T139–T140: Prepare gates (can parallelize)
- T141–T147: Generate readiness docs (sequential)

### Recommended Team Approach

**Fully Sequential (single contributor)**:
1. ~~T101–T114 (setup, extract decisions)~~ — historical; T101–T113 not in this file, T114 superseded
2. ~~Wait for Approval Gate 1~~ — Gate 1 resolved 2026-11-13
3. T115–T130 (phases 3–4) — T122–T124 and T127–T130 moved to Spec 005
4. ~~T134–T138 (phase 5, once decisions available)~~ — moved to Spec 005
5. T139–T151 (phases 6–7)

**Parallel (multiple contributors)**:
1. Contributor A: T115–T121 (design baseline) — *historical: originally after T101–T114, which are not in this file*
2. Contributor B: T125–T126 (navigation); T122–T124 and T127–T130 moved to Spec 005
3. Approval Gate 1 approved 2026-11-13
4. ~~Contributor C: T134–T138 (recovery flows / error states)~~ — moved to Spec 005
5. All: T139–T151 (final gates and handoff)

---

## Task Format Validation

✅ **Checklist Format**: All tasks follow `- [ ] [TaskID] [P?] [Story?] Description with file path`

✅ **Task IDs**: T101–T151, sequential in execution order (*T101–T113 historical, not in this file*)

✅ **Parallelizable Markers**: [P] on tasks with independent concerns (T105–T111, T115–T118, T122–T126, T139–T140)

✅ **Story Labels**: [US1]–[US4] on all Phase 3–6 user story tasks; no labels on setup/polish phases

✅ **File Paths**: All tasks reference target file paths in `.github/specs/004-book-website-make/` or `exports/`

✅ **Completeness**: Each user story has independent test criteria + tasks to deliver it

---

## Task Count Summary

| Phase | Tasks | Story | Count | Status |
| ------- | ------- | ------- | ------- | -------- |
| 1 (Setup) | T101–T104 | — | 4 | Historical: not in this file |
| 2 (Foundational) | T105–T114 | — | 10 | Historical: T105–T113 not in this file; T114 superseded |
| 3 (Design Baseline) | T115–T121 | US1 | 7 | Ready after T114 |
| 4 (Reader Access) | T122–T130 | US2 | 9 | Ready after T114 |
| 5 (Recovery/Errors) | T131–T138 | US3 | 8 | T131–T133 resolved 2026-11-13; T134–T138 moved to Spec 005 |
| 6 (Readiness) | T139–T147 | US4 | 9 | Ready after phases 3–5 |
| 7 (Polish) | T148–T151 | — | 4 | Ready after phase 6 |
| **TOTAL** | | | **51 tasks** | |

**By User Story**:
- **US1 (Design Baseline)**: 7 tasks (P1) — Ready now
- **US2 (Reader Access)**: 9 tasks (P1) — Ready now
- **US3 (Recovery/Errors)**: 8 tasks — decisions resolved 2026-11-13; remaining work moved to Spec 005
- **US4 (Readiness)**: 9 tasks (P1) — Ready after US1–US3

**Parallelizable**: 11 tasks [P] across phases (T105–T111: decisions; T115–T118: design; T122–T126: reader access; T139–T140: gates)

**Blocked**: none — T131–T133 resolved 2026-11-13 (Approval Gate 1). *Historical: 3 tasks awaited user selection*

---

## MVP Scope (Documentation-Only, No Code)

✅ **Phase 1** (Setup): Ready now  
✅ **Phase 2** (Decisions): Ready now (extract and document)  
✅ **Phase 3** (US1): Ready now (design baseline documentation)  
✅ **Phase 4** (US2): Ready now (reader access documentation)  
➡️ **Phase 5** (US3): Decisions resolved 2026-11-13; remaining work moved to Spec 005  
✅ **Phase 6** (US4): Ready after phases 3–4  
✅ **Phase 7** (Polish): Ready after phase 6  

**No Code Implementation**: This feature generates documentation only. No code changes, commits, or deployments occur during task execution.

---

## Next Steps

1. **Review this tasks.md** — Approve structure or request changes
2. ~~**Complete Approval Gate 1**~~ — ✅ done 2026-11-13 (T131–T133; see `research.md`)
3. **Execute Phase 3** (T115–T121) — Generate design baseline documentation
4. **Execute Phase 4** (T122–T130) — Generate reader access documentation
5. ~~**Execute Phase 5** (T134–T138)~~ — moved to Spec 005
6. **Execute Phase 6** (T139–T147) — Complete approval gates and handoff
7. **Execute Phase 7** (T148–T151) — Final validation and report

---

✋ **Documentation-Only Delivery**: This task breakdown generates specification documentation for Figma Make prompt execution. No code is written, no commits are created, no pushes occur during task execution. All deliverables remain in `.github/specs/004-book-website-make/` pending explicit approval and implementation-phase authorization.

**Version**: 1.0.0 | **Status**: Draft (pending approval) | **Created**: 2026-11-09

---

## Phase 8: Convergence (Validation & Documentation Completeness)

Validation and verification tasks to close gaps identified between specification requirements and current task coverage. All tasks are verification/documentation tasks, not implementation. Run after Phase 7 completion before final user approval.

| Task ID | [P] | Description | File Path | Dependencies |
| --------- | ----- | ------------- | ----------- | -------------- |
| ✅ T052 | | Create version reconciliation artifact documenting all source file versions and differences per FR-002 precedence rule | `.github/specs/004-book-website-make/version-reconciliation.md` | T107, T110 (legacy Phase 2 decision-extraction tasks; see Task ID scheme) |
| ✅ T053 | | Generate and document exact Prompt 1 preview (before/after navigation structure, numbered implementation steps, acceptance criteria, non-changes list) per SC-002 | `.github/specs/004-book-website-make/contracts/prompt-1-exact-preview.md` | T120 |
| ✅ T054 | | Validate all Prompt previews against completeness checklist per SC-002/SC-003. **Revised scope (SC-003, approved 2026-11-19)**: each of Prompts 1, 2A and 2B must reach ≥95%. Prompt 3A (~91%) is handed to Spec 005. **Met 2026-11-20**: P1 100%, P2A 95%, P2B 100% | `.github/specs/004-book-website-make/checklists/prompt-preview-validation.md` | T053, T121, T122, T123 (T122–T123 are Prompt 3A and now belong to Spec 005) |
| ✅ T055 | | Audit and mark all approval boundaries in spec, plan, tasks, and contracts using standard notation (approved ✓, unapproved ~, unresolved ❌) per SC-007 | `.github/specs/004-book-website-make/approval-boundaries.md` | All phases 1-7 |
| ✅ T056 | | Create source file inventory with versions, update timestamps, and reconciliation status for all 6 source files (`references/01`–`06`, formerly `content/book/`) per FR-001 | `.github/specs/004-book-website-make/source-file-inventory.md` | T107 |
| ✅ T057 | | Validate all 7 blocking decisions have 3+ options documented with impact assessment in decision matrix per SC-004 | `.github/specs/004-book-website-make/checklists/blocking-decisions-validation.md` | T110 |
| ✅ T058 | | Audit prompt contracts (3B, 3C) to ensure user-editable decisions are clearly marked and all options visible to reader per FR-008 | `.github/specs/004-book-website-make/contracts/blocking-decisions-audit.md` | contracts/prompt-3b-recovery-flows.md, contracts/prompt-3c-error-states.md |
| ✅ T059 | | (Unblocked 2026-11-20 when T054 was met under the revised SC-003 scope. Re-validated after the Phase 9 reconciliation fixed paths, colours and Decision 2 wording.) Add pre-approval reconciliation validation step: confirm zero version merge conflicts, all decisions documented, all previews validated, all boundaries marked | `.github/specs/004-book-website-make/checklists/pre-approval-reconciliation-validation.md` | T052–T058 |

**Gate**: All 8 validation tasks must pass and deliverables must be reviewed before proceeding to implementation phase authorization.

**Acceptance Criteria**:
- ✅ Version reconciliation artifact created with all 6 source files analyzed
- ✅ Prompt 1 exact preview generated and validated against SC-002
- ✅ All Spec 004 prompt previews (1, 2A, 2B) validated at ≥95% each, under the revised SC-003 scope approved 2026-11-19. Prompt 3A (~91%) is handed to Spec 005
- ✅ All approval boundaries marked and auditable across all artifacts
- ✅ Source file inventory created with versions and timestamps
- ✅ All 7 blocking decisions validated for 3+ documented options
- ✅ Prompt contracts audited for user-decision clarity
- ✅ Pre-approval checklist completed with zero unresolved validation gaps. This was ticked too early, while T054 and T059 were still open. It is valid again from 2026-11-20, after T054 was met and T075–T081 closed the remaining path, colour and wording gaps

---

## Phase 9: Convergence Closure & Spec 005 Handover

Finalize Phase 8 scope updates, document SC-003 approval, and prepare Spec 004 for merge to main with Spec 005 handover package.

- [x] T066 Update Phase 8 T054 acceptance criteria to reflect approved SC-003 scope: Prompts 1, 2A, 2B ≥95% (3A handed to Spec 005) per approval 2026-11-19 — ✅ done in the Phase 9 reconciliation
- [x] T067 Document SC-003 scope change in spec.md Assumptions section with link to approval decision (SC-003_SCOPE_CHANGE_PROPOSAL.md) — ✅ done in the Phase 9 reconciliation (spec.md SC-003 and Assumptions)
- [x] T068 Create Spec 005 handover artifact documenting: Prompt 3A contract, Decisions 1–6 status, Phase B readiness (3 prompts, 3 decisions) — ✅ `exports/SPEC_004_TO_005_HANDOVER.md`
- [ ] T069 Validate all 20+ specification artifacts present and version-locked for Spec 004 Phase 9 sign-off — ⏳ lock method and table recorded in spec.md (2026-11-20). Tick once PR #649 merges and the lock commit is filled in
- [x] T070 Mark Phase 8 T054 and T059 complete: scope-updated acceptance criteria now met — ✅ done in the Phase 9 reconciliation
- [x] ~~T071 Generate final PR description and commit message for merge to main~~ — **SUPERSEDED**: PR #622 merged (`19da240`)
- [x] ~~T072 Verify build passes and branch validation succeeds before merge~~ — **SUPERSEDED**: PR #622 merged. The reconciliation PR runs the same checks
- [x] T073 Merge PR #622 to main branch, close Phase 9 Convergence — ✅ merged (`19da240`)
- [x] ~~T074 Initialize Spec 005 Phase 1 (Decision Resolution) with 2026-12-15 target completion~~ — **MOVED_TO_SPEC_005**: `../005-reader-access/tasks.md` Phase 0 (RA-T001–RA-T009) owns decision resolution

---

## Phase 9 Reconciliation (2026-11-20)

The three continuation documents in `continuations/` described a T060–T074 set that never matched this file. Most of that work merged through PRs #630 and #639, but some exports said work was finished when it was not. This pass checks the repository state and closes what is still open.

- [x] T075 Remove duplicate task IDs (T014–T038): renumber the legacy breakdown to T1xx, add the Task ID scheme section, and repoint Phase 8 dependencies, `approval-boundaries.md` and `codebase-consistency-crosswalk.md`
- [x] T076 Replace remaining `content/book/` source paths with `references/` (data-model.md, source-file-inventory.md, version-reconciliation.md, checklists). Historical "moved from" notes are kept
- [x] T077 Mark non-baseline colours (#1a1a1a, #d4a574, #ff6b6b, #8b0000 and related) as superseded in the Prompt 3A/3C execution guides (owned by Spec 005; an error/state colour needs a design decision there). Replace the example in data-model.md with a baseline value
- [x] T078 Use the research.md label for Decision 2 Option A ("session refresh with absolute 30-day expiry") in the prompt-3b execution guide, prompt-3b recovery flows contract, research.md and blocking-decisions-validation checklist
- [x] T079 Correct `exports/COLOR_AUDIT.md`, `exports/PATH_MIGRATION_LOG.md` and `exports/TASK_CONSOLIDATION_LOG.md`, which said work was complete when it was not
- [x] T080 Close or supersede legacy T145–T147 (formerly T045–T047). They checked a branch and a "no commits" rule that merged work has replaced
- [x] T081 Fix the stale T054 row (P2A 89%, passing on average) in `checklists/pre-approval-reconciliation-validation.md`
- [x] T082 Update `plan.md` note on `staged/` to say Figma Make is deprecated (SC-004)
- [x] T083 Add a superseded notice to the files in `continuations/` and point to this section
- [ ] T084 Ash: confirm spec.md Status sign-off and version-lock (unblocks T069) — ⏳ Status lines corrected and deferrals recorded (owner: Ash). Tick when Ash approves the sign-off on PR #649

### Continuation document IDs mapped to this file

| Continuation ID | Topic | Status / where |
| --------------- | ----- | -------------- |
| T060–T062 | Decision 7 wording, readiness claims, handover | ✅ PR #630 |
| T063 | Prompt 2A ≥95% | ✅ `checklists/prompt-preview-validation.md` (P2A 95%) → T054 |
| T064 | Design exports | ✅ T119–T121 |
| T065 | Readiness exports | ✅ T141–T144 |
| T066 | Close Prompt 3A–3C tasks | ✅ Moved to Spec 005: T012–T016, T025–T027, T122–T124, T127–T130, T134–T138. Stay in Spec 004: T125–T126 (navigation). Closed as resolved decisions: T131–T133 |
| T067 | Task disambiguation | ✅ T075 |
| T068 | Phase 8 "zero gaps" | ✅ T070, T081 |
| T069 | spec.md / plan.md state | ✅ PR #639 (SC-004), T067, T082 |
| T070 | Paths | ✅ T076 |
| T071 | Colours | ✅ T077 |
| T072 | Decision 2 label | ✅ T078 |
| T073 | T045–T047 | ✅ T080 |
| T074 | `staged/` | ✅ plan.md (PR #639) and T082 |

---

**Version**: 1.1.0 | **Status**: Phase 9 Reconciled | **Updated**: 2026-11-20
