# Tasks: Book Website Figma Make Prompt Pack

**Input**: Design documents from `.github/specs/004-book-website-make/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent documentation and validation of each story.

**Scope Note**: This is a documentation-only specification project. No code implementation, deployments, or file commits beyond this spec folder. Focus: preparing exact Figma Make prompts for design-system export and component generation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (independent deliverables, different sections)
- **[Story]**: Which user story (US1, US3, US4) — mapped from spec.md
- Include exact file paths and deliverable references

## Path Conventions

- All deliverables in: `.github/specs/004-book-website-make/`
- Contracts in: `.github/specs/004-book-website-make/contracts/`
- Exports in: `.github/specs/004-book-website-make/exports/`

---

## Phase 1: Setup (Document Preparation & Validation)

**Purpose**: Foundation for specification work - verify source files, baseline design system, and blocking decisions

- [ ] T001 Review and validate all six source files (01-06) in content/book/ with version reconciliation per research.md
- [ ] T002 Confirm design baseline locked: Space Grotesk, Inter, 9-color palette (light & dark themes) in design-brief.md
- [ ] T003 [P] Verify all 7 blocking decisions approved and documented in research.md with implementation rationale
- [ ] T004 [P] Create approval tracking matrix showing Gate 1, Gate 2, Gate 3 readiness status per quickstart.md
- [ ] T005 Establish documentation-only boundary: confirm zero code, zero commits, zero deployments beyond this spec folder

**Checkpoint**: Foundation ready - all prerequisites validated, no unresolved blockers for Prompts 1–2B

---

## Phase 2: Foundational (Gate 2 Approval & Design Baseline Validation)

**Purpose**: Design system approval and baseline confirmation - MUST complete before Prompt execution

**⚠️ CRITICAL**: Gate 2 approval (design baseline sign-off) BLOCKS prompt generation

- [ ] T006 Validate GATE_2_SIGN_OFF_SUMMARY.md with Ash: design tokens approved, unapproved candidates (R3, T1, RT2, C1) listed separately per spec.md
- [ ] T007 [P] Confirm CSS variables export template: Space Grotesk weights/sizes, Inter weights/sizes, 9-color palette in both themes (see design-brief.md)
- [ ] T008 [P] Confirm JSON design-token export template with exact field names and color hex values matching approved baseline
- [ ] T009 Verify navigation structure locked: Speaking/Events/Media marked as hidden from sitemap per contracts/prompt-1-*.md
- [ ] T010 Document all Prompts 1–2B ready conditions: exact component names, states, acceptance criteria per data-model.md

**Checkpoint**: Gate 2 sign-off complete - design baseline locked, Prompts 1–2B ready for execution

---

## Phase 3: User Story 1 - Design Specification Hand-off (Priority: P1) 🎯

**Goal**: Deliver complete, exact Figma Make prompts for Prompts 1, 2A, 2B establishing authoritative design baseline for navigation and design-system components

**Independent Test**: Each prompt references approved design elements, specifies exact component names, preserves approved decisions, documents unapproved candidates separately, includes verifiable acceptance criteria

### Prompt Contracts for User Story 1

- [ ] T011 [P] [US1] Validate Prompt 1 (Navigation Exposure) contract in contracts/prompt-1-navigation-exposure.md: before/after navigation, implementation steps, non-changes list, acceptance criteria
- [ ] T012 [P] [US1] Validate Prompt 2A (Design Baseline) contract in contracts/prompt-2a-design-baseline.md: CSS variables + JSON tokens export specs with exact approved values
- [ ] T013 [P] [US1] Validate Prompt 2B (Navigation Design) contract in contracts/prompt-2b-navigation-design.md: component design, all states, responsive breakpoints (1024px/768px), hover/active states (#FF3AAE)

### Prompt Generation Readiness for User Story 1

- [ ] T014 [US1] Generate exact preview for Prompt 1: Navigate to contracts/prompt-1-*.md and confirm before/after navigation structure, numbered implementation steps, acceptance criteria match spec.md scenario 1
- [ ] T015 [US1] Verify Prompt 1 scope: Speaking/Events/Media hidden, noindex meta tags + sitemap.xml exclusion per route-enforcement-verification decision (Decision 7)
- [ ] T016 [US1] Generate exact preview for Prompt 2A: Verify CSS variables and JSON tokens match 9-color palette + typography baseline per spec.md scenario 1
- [ ] T017 [US1] Verify Prompt 2A scope: All unapproved candidates excluded (R3, T1, RT2, C1) per spec.md scenario 2
- [ ] T018 [US1] Generate exact preview for Prompt 2B: Verify navigation component with 4 visible items, #FF3AAE hover/active, responsive breakpoints per data-model.md
- [ ] T019 [US1] Compile acceptance criteria for Prompts 1–2B: each with specific measurable outcomes, verifiable against Figma output

**Checkpoint**: Prompts 1–2B fully specified and ready for Figma Make execution

**Next**: Prompts 3A–3C (reader access) → Spec 005

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

- [ ] T027 [US3] Create comprehensive blocking-decisions-audit.md documenting all 7 decisions with: option summary, resolution status, implementation impact, Prompt dependencies, rationale
- [ ] T028 [US3] Verify decision routing: Decisions 1–6 enable Spec 005 (reader access, Prompts 3A–3C); Decision 7 enables Prompt 1 (navigation)
- [ ] T029 [US3] Document implementation prerequisites: list what must be verified/confirmed before each prompt can execute (Figma Make environment, manuscript status, email provider confirmed, etc.)

**Checkpoint**: All blocking decisions documented with implementation guidance - development has clear visibility on decision gates and parallelization opportunities

---

## Phase 5: User Story 4 - Documentation-Only Workflow Completion (Priority: P1)

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

**Branch**: ccr-01b4e649-64vj1f | **PR**: [#618 (Merged)](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/618)

**Total Tasks**: 45 | **Phase 1**: 5 | **Phase 2**: 5 | **Phase 3 (US1)**: 9 | **Phase 4 (US3)**: 10 | **Phase 5 (US4)**: 11 | **Phase 6**: 5

**MVP Scope**: Phases 1–3 (US1 Prompts 1–2B ready) = 19 tasks | **Full Scope**: All phases = 45 tasks
