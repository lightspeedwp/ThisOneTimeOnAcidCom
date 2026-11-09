# Tasks: Book Website Figma Make Prompt Pack

**Feature**: Documentation-only specification package with staged Figma Make prompts  
**Spec Directory**: `.github/specs/004-book-website-make/`  
**Branch**: `docs/book-website-make-spec`  
**Created**: 2026-11-09  
**Input**: Design documents from `.github/specs/004-book-website-make/` (spec.md, plan.md, research.md, data-model.md, quickstart.md, contracts/)

**Prerequisites**: spec.md (required), plan.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: No automated tests requested. Validation is manual review against acceptance criteria and approval gates.

**Organization**: Tasks organized by user story to enable independent documentation, approval, and Figma Make execution.

---

## Format: `[TaskID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different concerns, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- File paths included in all descriptions

---

## Phase 1: Setup & Initialization

**Purpose**: Project documentation readiness and artifact validation

- [ ] T001 Confirm all design documents exist in `.github/specs/004-book-website-make/`: spec.md, plan.md, research.md, data-model.md, quickstart.md, contracts/
- [ ] T002 Validate .specify/feature.json persists feature directory reference: `.github/specs/004-book-website-make`
- [ ] T003 Verify constitution.md governance principles align with feature constraints in plan.md
- [ ] T004 Confirm branch `docs/book-website-make-spec` is checked out and `npm run validate:branch-name` passes

---

## Phase 2: Foundational Prerequisites (Blocking Decisions & Approval Gates)

**Purpose**: Document all blocking decisions and establish approval gate prerequisites

**⚠️ CRITICAL**: Phases 3–5 cannot proceed until approval gates are completed

- [ ] T005 Extract Decision 1 options from research.md (recovery-first race condition A/B/C/D) → document in `.github/specs/004-book-website-make/exports/decisions-pending.md`
- [ ] T006 Extract Decision 2 options from research.md (recovery lifetime eligibility A/B/C/D) → document in exports/decisions-pending.md
- [ ] T007 Extract Decision 3 options from research.md (code expiry start time A/B/C) → document in exports/decisions-pending.md
- [ ] T008 Extract Decision 4 options from research.md (email service provider A/B/C/D) → document in exports/decisions-pending.md
- [ ] T009 Extract Decision 5 options from research.md (manuscript publication readiness A/B/C) → document in exports/decisions-pending.md
- [ ] T010 Extract Decision 6 options from research.md (newsletter destination A/B/C/D) → document in exports/decisions-pending.md
- [ ] T011 Extract Decision 7 options from research.md (route enforcement verification A/B/C/D) → document in exports/decisions-pending.md
- [ ] T012 [P] Map all 7 blocking decisions to Figma Make prompts in contracts/ directory (which prompts depend on each decision)
- [ ] T013 Create blocking-decisions-matrix.md in `.github/specs/004-book-website-make/exports/` with all decisions, options, and impact assessment
- [ ] T014 Prepare Approval Gate 1 summary in quickstart.md: "All 7 decisions ready for user selection" with links to research.md decision options

**Checkpoint**: Approval Gate 1 prerequisites documented and ready for user approval

---

## Phase 3: User Story 1 — Design Specification Hand-off (P1)

**Goal**: Document and prepare for export of design baseline (Space Grotesk, Inter, 9-color palette) and navigation component specifications

**Independent Test Criteria**:
- ✓ Design baseline (typography, colors, component styles) is extracted from approved sources
- ✓ All 18 color tokens defined (9 light + 9 dark theme)
- ✓ All typography tokens defined (Space Grotesk weights/sizes, Inter weights/sizes)
- ✓ Unapproved candidates (R3, T1, RT2, C1) are explicitly listed as non-included
- ✓ Navigation specification documents hidden items (/speaking, /events, /media)
- ✓ All design state variations are specified (default, hover, active, mobile, tablet, desktop)

**Implementation Tasks**:

- [ ] T015 [P] [US1] Read contracts/prompt-2a-design-baseline.md and validate all typography specifications match 04-design-brief.md v1.1.2
- [ ] T016 [P] [US1] Read contracts/prompt-2a-design-baseline.md and validate all color specifications match approved palette (9 light + 9 dark)
- [ ] T017 [P] [US1] Read contracts/prompt-1-navigation-exposure.md and validate navigation structure matches 03-author-decisions-launch-scope.md (hidden: Speaking, Events, Media)
- [ ] T018 [P] [US1] Read contracts/prompt-2b-navigation-design.md and document all navigation states (default, hover, active, mobile, tablet, desktop)
- [ ] T019 [US1] Create design-baseline-validation.md in `.github/specs/004-book-website-make/exports/` documenting:
  - All typography tokens extracted
  - All color tokens extracted (with hex values)
  - All component styles specified (Button, Card, Navigation, Form)
  - All states rendered (default, focused, error, loading, success)
  - Unapproved candidates listed separately: R3, T1, RT2, C1
- [ ] T020 [US1] Create navigation-specification.md in `.github/specs/004-book-website-make/exports/` documenting:
  - Visible items: Home, About, Book, Contact
  - Hidden items: Speaking, Events, Media (not in sitemap)
  - All responsive breakpoints: desktop (≥1024px), tablet (768–1023px), mobile (<768px)
  - Mobile drawer interaction and overlay behavior
- [ ] T021 [US1] Create design-baseline-acceptance-report.md in `.github/specs/004-book-website-make/exports/` with CR-2A.1 through CR-2A.6 validation results:
  - CR-2A.1: Exported tokens match exactly approved baseline values
  - CR-2A.2: Typography includes Space Grotesk and Inter with exact weights/sizes
  - CR-2A.3: Colors all 9 exported for light theme, all 9 for dark theme
  - CR-2A.4: Unapproved candidates (R3, T1, RT2, C1) are NOT in exported tokens
  - CR-2A.5: Component styles exported (Button, Card, Navigation, Form) with all states
  - CR-2A.6: CSS file is valid and parseable by build tools

**Checkpoint**: Design baseline fully documented and ready for Figma Make Prompt 2A execution

---

## Phase 4: User Story 2 — Reader Access Journey Definition (P1)

**Goal**: Document and prepare for export of email verification copy, form specifications, and error messaging (4 unblocked prompts: 1, 2B, 3A)

**Independent Test Criteria**:
- ✓ Email copy matches approved source exactly (06-website-reading-prd.md v1.1.1)
- ✓ All form states designed (default, focused, error, loading, success)
- ✓ All error messages document failure scenarios (invalid code, expired, rate-limited, server, session-conflict)
- ✓ Newsletter CTA is separate from verification form with explicit "optional" language
- ✓ Help text and labels match approved source
- ✓ All forms support keyboard navigation and screen readers (WCAG 2.2 AA)

**Implementation Tasks**:

- [ ] T022 [P] [US2] Read contracts/prompt-3a-reader-access.md and extract email copy section → compare against 06-website-reading-prd.md v1.1.1 (must match exactly)
- [ ] T023 [P] [US2] Read contracts/prompt-3a-reader-access.md and document all form states: email entry form, code entry form, success state
- [ ] T024 [P] [US2] Read contracts/prompt-3c-error-states.md (blocked) and extract planned error messages (5 scenarios: invalid, expired, rate-limited, server, session-conflict)
- [ ] T025 [P] [US2] Read contracts/prompt-1-navigation-exposure.md and document navigation changes (4 visible links, no /speaking /events /media)
- [ ] T026 [P] [US2] Read contracts/prompt-2b-navigation-design.md and document navigation component states and responsive behavior
- [ ] T027 [US2] Create reader-access-copy.md in `.github/specs/004-book-website-make/exports/` documenting:
  - Email subject: "Your reading code for ThisOneTimeOnAcidCom"
  - Email body: exact copy per 06-website-reading-prd.md (no modifications)
  - Email footer: newsletter signup link info
  - Form labels and placeholders (email entry: "you@example.com", code entry: "XXXXXX")
  - Help text: "We'll email you a 10-minute code. No subscription required."
- [ ] T028 [US2] Create form-states-specification.md in `.github/specs/004-book-website-make/exports/` documenting:
  - Email entry form: default, focused, error, loading states
  - Code entry form: default, focused, error, loading, success states
  - Success message: "Access confirmed. You can now read."
  - Error states: invalid code, code expired, rate limited, server error, session conflict
  - All states documented with visual specifications (border color, text color, icons)
- [ ] T029 [US2] Create newsletter-specification.md in `.github/specs/004-book-website-make/exports/` documenting:
  - Newsletter CTA section separate from reader access form
  - Heading: "Stay Updated"
  - Copy: "Join our newsletter for book updates (optional)."
  - Link text: "Sign up" or "Learn more" or "Subscribe"
  - REQUIRED: Explicitly states "This is separate from reading access. Uncheck to read without subscribing."
  - Newsletter link destination: [Decision 6 selection pending]
- [ ] T030 [US2] Create reader-access-acceptance-report.md in `.github/specs/004-book-website-make/exports/` with CR-3A.1 through CR-3A.8 validation results:
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

**Goal**: Document recovery flow specification and error states (2 blocked prompts: 3B partial, 3C). **BLOCKED** pending Decisions 1, 2, 3 resolution.

**Blocking Dependencies**:
- Decision 1: Recovery-first race condition → required for Prompt 3B execution
- Decision 2: Recovery lifetime eligibility → required for Prompt 3B execution
- Decision 3: Code expiry start time → required for Prompt 3C execution

**Implementation Tasks** (deferred until decisions resolved):

- [ ] T031 [BLOCKED] [US3] Await user selection of Decision 1 (recovery-first race condition options A/B/C/D) in Approval Gate 1
- [ ] T032 [BLOCKED] [US3] Await user selection of Decision 2 (recovery lifetime eligibility options A/B/C/D) in Approval Gate 1
- [ ] T033 [BLOCKED] [US3] Await user selection of Decision 3 (code expiry start time options A/B/C) in Approval Gate 1
- [ ] T034 [US3] Once Decision 1 resolved: read contracts/prompt-3b-recovery-flows.md and update with Decision 1 selection → generate recovery-flow-specification.md
- [ ] T035 [US3] Once Decision 2 resolved: read contracts/prompt-3b-recovery-flows.md and update with Decision 2 selection → append to recovery-flow-specification.md
- [ ] T036 [US3] Once Decision 3 resolved: read contracts/prompt-3c-error-states.md and update with Decision 3 selection → generate error-states-specification.md with exact expiry messaging
- [ ] T037 [US3] Create recovery-flows-acceptance-report.md in `.github/specs/004-book-website-make/exports/` with CR-3B.1 through CR-3B.6 validation results (post-decision):
  - CR-3B.1: Recovery flow follows Decision 1 race-condition strategy (selected option)
  - CR-3B.2: Session lifetime enforcement matches Decision 2 selection
  - CR-3B.3: All recovery failure states designed (expired, invalid, race-condition)
  - CR-3B.4: Error messages clearly explain recovery failure reason
  - CR-3B.5: Recovery success path matches reader access policy (10-min codes, 30-day device lifecycle)
  - CR-3B.6: Fallback to fresh email verification documented when recovery unavailable
- [ ] T038 [US3] Create error-states-acceptance-report.md in `.github/specs/004-book-website-make/exports/` with CR-3C.1 through CR-3C.8 validation results (post-decision):
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

- [ ] T039 [P] [US4] Prepare Approval Gate 2 summary in quickstart.md: "Design baseline approved for export" with checklist of approved elements (Space Grotesk, Inter, 9-color palette, navigation, access policy)
- [ ] T040 [P] [US4] Prepare Approval Gate 3 summary in quickstart.md: "Preflight analysis complete and ready for implementation team" with links to all validation reports
- [ ] T041 [US4] Document all Approval Gate 1 decisions (7 selected options) in `.github/specs/004-book-website-make/exports/decisions-selected.md` with:
  - Decision 1 selection and rationale
  - Decision 2 selection and rationale
  - Decision 3 selection and rationale
  - Decision 4 selection and rationale (email provider)
  - Decision 5 selection and rationale (manuscript status)
  - Decision 6 selection and rationale (newsletter destination)
  - Decision 7 selection and rationale (route enforcement)
- [ ] T042 [US4] Create implementation-readiness-checklist.md in `.github/specs/004-book-website-make/exports/` documenting:
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
- [ ] T043 [US4] Create preflight-analysis-final.md in `.github/specs/004-book-website-make/exports/` summarizing:
  - All 6 source files analyzed (01-06 from content/book/)
  - Version reconciliation completed (02 v1.0.3→v1.0.4, 03 v1.2.2→v1.3.0, 05 v1.7.0→v1.9.0)
  - All gaps and conflicts documented
  - All validation reports: design-baseline, reader-access, recovery-flows, error-states
  - Approval gate sign-offs: Gate 1 (decisions), Gate 2 (design), Gate 3 (readiness)
  - Implementation team readiness assessment: Ready to proceed
  - No code changes, commits, or deployments performed
- [ ] T044 [US4] Create workflow-completion-report.md in `.github/specs/004-book-website-make/exports/` documenting:
  - Status: Documentation-only workflow COMPLETE
  - All 4 specification user stories (US1–US4) completed
  - All artifacts generated: spec.md, plan.md, research.md, data-model.md, quickstart.md, contracts/
  - All validation reports completed: design-baseline, reader-access, recovery-flows, error-states
  - Approval gates completed: Gate 1 (decisions), Gate 2 (design), Gate 3 (readiness)
  - Ready for implementation phase authorization
  - Next step: Implementation team begins Figma Make prompt execution per quickstart.md
- [ ] T045 [US4] Verify branch `docs/book-website-make-spec` has zero code changes (documentation only)
- [ ] T046 [US4] Verify no commits created (documentation staged, not committed, pending approval)
- [ ] T047 [US4] Verify `.specify/feature.json` persists feature directory (ready for implementation phase)

**Checkpoint**: Documentation-only workflow complete. All artifacts staged for approval. No code changes.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and handoff preparation

- [ ] T048 Validate all task descriptions reference correct file paths in `.github/specs/004-book-website-make/` or `exports/`
- [ ] T049 Verify all acceptance criteria (CR-2A, CR-3A, CR-3B, CR-3C) are documented in corresponding validation reports
- [ ] T050 Confirm all approval gates are documented: Gate 1 (decisions), Gate 2 (design baseline), Gate 3 (readiness)
- [ ] T051 Create TASKS_COMPLETION_REPORT.md documenting:
  - Total tasks: 51
  - By user story: US1 (7 tasks), US2 (9 tasks), US3 (8 blocked/deferred), US4 (9 tasks), Setup/Polish (9 tasks)
  - Blocking tasks: T031–T033 (await decision resolution), T034–T036 (blocked until decisions selected)
  - Parallel opportunities: T005–T011, T015–T018, T022–T026, T039–T040
  - Approval gates status: Gate 1 (pending), Gate 2 (pending), Gate 3 (pending)
  - Implementation readiness: Ready upon Gate approvals
  - No code changes: 0 commits, 0 pushes, 0 deployments performed
  - Documentation package: Complete and staged for approval

---

## Dependencies & Execution Order

```
Phase 1 (Setup) ──┐
                  ├──> Phase 2 (Decisions & Gates) ──┐
                  │                                  ├──> Phase 6 (Approval Gates)
                  ├──> Phase 3 (Design Baseline) ────┤
                  │                                  ├──> Phase 7 (Final)
                  ├──> Phase 4 (Reader Access) ──────┤
                  │                                  │
                  └──> Phase 5 (Recovery/Errors) ────┘
                       (BLOCKED: Decisions 1–3)
```

### Critical Path (Blocking Dependencies)

1. **T001–T014** (Phase 1–2): Setup and extract blocking decisions
2. **T031–T033** (Phase 5): **BLOCKED** awaiting Approval Gate 1 (user selections)
3. Once Gate 1 approved:
   - **T015–T021** (Phase 3): Execute in parallel
   - **T022–T030** (Phase 4): Execute in parallel
   - **T034–T038** (Phase 5): Execute in parallel
4. **T039–T047** (Phase 6): Complete Approval Gates 2–3, prepare handoff
5. **T048–T051** (Phase 7): Final validation

### Parallel Execution Opportunities

**Phase 1–2 (Sequential, blocking)**:
- T005–T011: Extract all 7 blocking decisions (can parallelize reading from research.md)

**Phase 3 (Fully Parallel, no dependencies)**:
- T015–T018: Read and validate design specifications (4 contract files in parallel)
- T019–T021: Generate design reports (depend on T015–T018)

**Phase 4 (Fully Parallel, no dependencies)**:
- T022–T026: Read and validate reader access specifications (5 tasks in parallel)
- T027–T030: Generate reader access reports (depend on T022–T026)

**Phase 5 (Blocked until decisions)**:
- T031–T033: Blocked on Approval Gate 1
- T034–T038: Depend on decision selections (can parallelize Prompts 3B/3C work)

**Phase 6 (Sequential, depends on Phases 3–5)**:
- T039–T040: Prepare gates (can parallelize)
- T041–T047: Generate readiness docs (sequential)

### Recommended Team Approach

**Fully Sequential (single contributor)**:
1. T001–T014 (setup, extract decisions)
2. Wait for Approval Gate 1
3. T015–T030 (phases 3–4)
4. T034–T038 (phase 5, once decisions available)
5. T039–T051 (phases 6–7)

**Parallel (multiple contributors)**:
1. Contributor A: T001–T014, then T015–T021 (design baseline)
2. Contributor B: T022–T030 (reader access) [can start after T001–T014]
3. Once Approval Gate 1 approved:
4. Contributor C: T034–T038 (recovery flows / error states)
5. All: T039–T051 (final gates and handoff)

---

## Task Format Validation

✅ **Checklist Format**: All tasks follow `- [ ] [TaskID] [P?] [Story?] Description with file path`

✅ **Task IDs**: T001–T051, sequential in execution order

✅ **Parallelizable Markers**: [P] on tasks with independent concerns (T005–T011, T015–T018, T022–T026, T039–T040)

✅ **Story Labels**: [US1]–[US4] on all Phase 3–6 user story tasks; no labels on setup/polish phases

✅ **File Paths**: All tasks reference target file paths in `.github/specs/004-book-website-make/` or `exports/`

✅ **Completeness**: Each user story has independent test criteria + tasks to deliver it

---

## Task Count Summary

| Phase | Tasks | Story | Count | Status |
|-------|-------|-------|-------|--------|
| 1 (Setup) | T001–T004 | — | 4 | Ready |
| 2 (Foundational) | T005–T014 | — | 10 | Ready (blocks phase 3–5) |
| 3 (Design Baseline) | T015–T021 | US1 | 7 | Ready after T014 |
| 4 (Reader Access) | T022–T030 | US2 | 9 | Ready after T014 |
| 5 (Recovery/Errors) | T031–T038 | US3 | 8 | Blocked: T031–T033 await Gate 1 |
| 6 (Readiness) | T039–T047 | US4 | 9 | Ready after phases 3–5 |
| 7 (Polish) | T048–T051 | — | 4 | Ready after phase 6 |
| **TOTAL** | | | **51 tasks** | |

**By User Story**:
- **US1 (Design Baseline)**: 7 tasks (P1) — Ready now
- **US2 (Reader Access)**: 9 tasks (P1) — Ready now
- **US3 (Recovery/Errors)**: 8 tasks (P1→deferred) — Blocked until Decisions 1–3
- **US4 (Readiness)**: 9 tasks (P1) — Ready after US1–US3

**Parallelizable**: 11 tasks [P] across phases (T005–T011: decisions; T015–T018: design; T022–T026: reader access; T039–T040: gates)

**Blocked**: 3 tasks (T031–T033) awaiting Approval Gate 1 user selection

---

## MVP Scope (Documentation-Only, No Code)

✅ **Phase 1** (Setup): Ready now  
✅ **Phase 2** (Decisions): Ready now (extract and document)  
✅ **Phase 3** (US1): Ready now (design baseline documentation)  
✅ **Phase 4** (US2): Ready now (reader access documentation)  
🔒 **Phase 5** (US3): Blocked until Decisions 1–3 resolved  
✅ **Phase 6** (US4): Ready after phases 3–4  
✅ **Phase 7** (Polish): Ready after phase 6  

**No Code Implementation**: This feature generates documentation only. No code changes, commits, or deployments occur during task execution.

---

## Next Steps

1. **Review this tasks.md** — Approve structure or request changes
2. **Complete Approval Gate 1** — Select options for 7 blocking decisions (T031–T033)
3. **Execute Phase 3** (T015–T021) — Generate design baseline documentation
4. **Execute Phase 4** (T022–T030) — Generate reader access documentation
5. **Execute Phase 5** (T034–T038) — Generate recovery/error documentation (post-decisions)
6. **Execute Phase 6** (T039–T047) — Complete approval gates and handoff
7. **Execute Phase 7** (T048–T051) — Final validation and report

---

✋ **Documentation-Only Delivery**: This task breakdown generates specification documentation for Figma Make prompt execution. No code is written, no commits are created, no pushes occur during task execution. All deliverables remain in `.github/specs/004-book-website-make/` pending explicit approval and implementation-phase authorization.

**Version**: 1.0.0 | **Status**: Draft (pending approval) | **Created**: 2026-11-09

---

## Phase 8: Convergence (Validation & Documentation Completeness)

Validation and verification tasks to close gaps identified between specification requirements and current task coverage. All tasks are verification/documentation tasks, not implementation. Run after Phase 7 completion before final user approval.

| Task ID | [P] | Description | File Path | Dependencies |
|---------|-----|-------------|-----------|--------------|
| T052 | | Create version reconciliation artifact documenting all source file versions and differences per FR-002 precedence rule | `.github/specs/004-book-website-make/version-reconciliation.md` | T007, T010 |
| T053 | | Generate and document exact Prompt 1 preview (before/after navigation structure, numbered implementation steps, acceptance criteria, non-changes list) per SC-002 | `.github/specs/004-book-website-make/contracts/prompt-1-exact-preview.md` | T020 |
| T054 | | Validate all Prompt previews against completeness checklist (Prompts 1, 2A, 2B, 3A include all required elements; 95%+ completeness) per SC-002/SC-003 | `.github/specs/004-book-website-make/checklists/prompt-preview-validation.md` | T053, T021, T022, T023 |
| T055 | | Audit and mark all approval boundaries in spec, plan, tasks, and contracts using standard notation (approved ✓, unapproved ~, unresolved ❌) per SC-007 | `.github/specs/004-book-website-make/approval-boundaries.md` | All phases 1-7 |
| T056 | | Create source file inventory with versions, update timestamps, and reconciliation status for all 6 source files (content/book/01-06) per FR-001 | `.github/specs/004-book-website-make/source-file-inventory.md` | T007 |
| T057 | | Validate all 7 blocking decisions have 3+ options documented with impact assessment in decision matrix per SC-004 | `.github/specs/004-book-website-make/checklists/blocking-decisions-validation.md` | T010 |
| T058 | | Audit prompt contracts (3B, 3C) to ensure user-editable decisions are clearly marked and all options visible to reader per FR-008 | `.github/specs/004-book-website-make/contracts/blocking-decisions-audit.md` | contracts/prompt-3b-recovery-flows.md, contracts/prompt-3c-error-states.md |
| T059 | | Add pre-approval reconciliation validation step: confirm zero version merge conflicts, all decisions documented, all previews validated, all boundaries marked | `.github/specs/004-book-website-make/checklists/pre-approval-validation.md` | T052–T058 |

**Gate**: All 8 validation tasks must pass and deliverables must be reviewed before proceeding to implementation phase authorization.

**Acceptance Criteria**:
- ✅ Version reconciliation artifact created with all 6 source files analyzed
- ✅ Prompt 1 exact preview generated and validated against SC-002
- ✅ All 4 unblocked prompt previews validated for completeness (95%+ minimum)
- ✅ All approval boundaries marked and auditable across all artifacts
- ✅ Source file inventory created with versions and timestamps
- ✅ All 7 blocking decisions validated for 3+ documented options
- ✅ Prompt contracts audited for user-decision clarity
- ✅ Pre-approval checklist completed with zero unresolved validation gaps

---

**Version**: 1.0.1 | **Status**: Phase 8 Convergence Appended | **Updated**: 2026-11-09
