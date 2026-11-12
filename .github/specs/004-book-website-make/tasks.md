# Tasks: Book Website Figma Make Prompt Pack

**Input**: Design documents from `.github/specs/004-book-website-make/`

**Prerequisites**: `spec.md` (requirements), `plan.md` (tech approach), `PROMPT_EXECUTION_PLAN.md` (phase roadmap), `GATE_2_SIGN_OFF_SUMMARY.md` (approval checklist)

**Deliverable**: Exact Figma Make prompts (Prompts 1, 2A, 2B, 3A unblocked; Prompts 3B, 3C blocked pending decisions); zero code, zero commits, zero deployments

**Organization**: Tasks organized by user story (4 stories from spec.md) + decision resolution + execution phases

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (independent workflows, different decision owners)
- **[Story]**: Which user story (US1, US2, US3, US4)
- **File paths**: All contracts/ and prompt specifications referenced

---

## Phase 1: Gate 2 Approval & Environment Validation

**Purpose**: Secure design baseline approval and Figma Make environment readiness

- [ ] T001 Review GATE_2_SIGN_OFF_SUMMARY.md with Ash (project owner)
- [ ] T002 Confirm design baseline locked: Space Grotesk, Inter, 9-color palette (check `.github/specs/004-book-website-make/exports/GATE_2_SIGN_OFF_SUMMARY.md`)
- [ ] T003 Validate Figma Make environment access: file key, API token, workspace ready (or mark blocked if unavailable)
- [ ] T004 [P] Verify all 4 critical fixes from Gate 2 audit (Prompt 2B colors #FF3AAE, Prompt 3A status, reference paths, Decision 7 clarity)

**Checkpoint**: Gate 2 approval confirmed - ready for Phase A execution

---

## Phase 2: User Story 1 - Design Specification Hand-off (P1) 🎯 CRITICAL PATH

**Goal**: Complete, exact Figma Make prompts establishing authoritative design baseline

**Independent Test**: Each prompt references approved design elements and is executable without implementation guesswork

### Tests for US1

- [ ] T005 [US1] Validate Prompt 1 preview includes: before/after navigation, numbered implementation steps, non-changes list, acceptance criteria (`contracts/prompt-1-navigation-exposure.md`)
- [ ] T006 [US1] Validate Prompt 2A exports both CSS variables and JSON design tokens matching 9-color approved baseline (`contracts/prompt-2a-design-baseline.md`)
- [ ] T007 [US1] Validate Prompt 2B navigation component shows 4 visible items with #FF3AAE hover/active state in all responsive breakpoints (`contracts/prompt-2b-navigation-design.md`)

### Implementation for US1

- [ ] T008 [P] [US1] Execute Prompt 1: Navigation Exposure in Figma Make (hide /speaking, /events, /media from sitemap; preserve as noindex)
- [ ] T009 [P] [US1] Execute Prompt 2A: Design Baseline Export (export CSS variables + JSON tokens with exact approved colors/typography)
- [ ] T010 [P] [US1] Execute Prompt 2B: Navigation Design (component design with all states, 4 visible items, responsive breakpoints 1024px/768px)
- [ ] T011 [US1] Collect and verify Prompt outputs match acceptance criteria from contracts/

**Checkpoint**: Phase A complete - US1 (Design Hand-off) is fully executable and approved

---

## Phase 3: User Story 2 - Reader Access Journey Definition (P1)

**Goal**: Exact copy, form wording, and error-state specifications for email-code verification journey

**Independent Test**: Copy text matches approved source, form states documented, error messages distinguish failure scenarios, newsletter separate from verification, no false success claims

### Tests for US2

- [ ] T012 [US2] Validate Prompt 3A preview: form explanation copy, error messages, newsletter CTA in separate section (`contracts/prompt-3a-reader-access.md`)
- [ ] T013 [US2] Confirm all form states designed: default, focused, error, loading, success (verify no hardcoded copy differs from approved source)

### Implementation for US2

- [ ] T014 [US2] Review Prompt 3A contract with blocking decision status (awaits Decisions 3, 4, 5, 6: code expiry timing, email provider, manuscript status, newsletter destination)
- [ ] T015 [US2] Once Decisions 3, 4, 5, 6 resolved: Execute Prompt 3A (reader access copy & forms) in Figma Make
- [ ] T016 [US2] Collect Prompt 3A output and verify: approved copy present, form states documented, newsletter link explicit non-subscription statement

**Checkpoint**: US2 (Reader Access) awaits decision resolution before execution

**BLOCKED BY**: Decisions 3 (code expiry start time), 4 (email provider), 5 (manuscript status), 6 (newsletter destination)

---

## Phase 4: User Story 3 - Implementation Readiness & Blocking Decisions (P2)

**Goal**: Documented blocking decisions and prerequisites so development knows what gates progress

**Independent Test**: All 7 blocking decisions listed with options, each identifies impact if unresolved, resolved decisions marked with dates, risk assessment complete

### Tests for US3

- [ ] T017 [US3] Validate blocking decision matrix: all 7 decisions present with 3+ options each, prerequisites documented (`research.md` and `contracts/blocking-decisions-audit.md`)
- [ ] T018 [US3] Confirm Prompts 3B and 3C marked "BLOCKED" with specific prerequisite decisions listed

### Decision Resolution for US3 (Parallel Track)

**Timeline**: 4–6 hours for decisions + clarification

- [ ] T019 [P] [US3] **Decision 1 (Recovery-first race condition)**: Clarify with Ash: when recovery and fresh verification race, which takes precedence? Options: A (recovery first), B (fresh first), C (last-writer-wins), D (user chooses). Update `research.md` with chosen option
- [ ] T020 [P] [US3] **Decision 2 (Recovery lifetime eligibility)**: Clarify with Ash: how long is recovery code valid? Options: 24h, 7d, 30d. Update `research.md`
- [ ] T021 [P] [US3] **Decision 3 (Code expiry start time)**: Clarify with product lead: from code generation? receipt? page load? Options: A (generation), B (receipt), C (page load). Update `research.md`
- [ ] T022 [P] [US3] **Decision 4 (Email service provider)**: Clarify with tech lead: SendGrid or Brevo? API/SMTP availability? Update `research.md`
- [ ] T023 [P] [US3] **Decision 5 (Manuscript publication readiness)**: Clarify with author: when is manuscript approved & available for readers? Draft timeline: 2027-01-31. Update `research.md` with status
- [ ] T024 [P] [US3] **Decision 6 (Newsletter destination)**: Clarify with product: Brevo signup link or other service? Update `research.md`

### Implementation for US3 (After Decision Resolution)

- [ ] T025 [US3] Once Decisions 1 & 2 resolved: Execute Prompt 3B (recovery flows) in Figma Make
- [ ] T026 [US3] Once Decision 3 resolved: Execute Prompt 3C (error states, code-expiry messaging) in Figma Make
- [ ] T027 [US3] Collect Prompt 3B and 3C outputs; verify race condition handling and error messaging match resolved decisions

**Checkpoint**: All blocking decisions resolved - Phase B execution unblocked

**BLOCKED BY**: Decisions 1, 2, 3, 4, 5, 6 (parallel resolution track)

---

## Phase 5: User Story 4 - Documentation-Only Workflow Completion (P1)

**Goal**: Complete documentation package ready for approval; no code, commits, or deployments

**Independent Test**: All six source files analyzed, gaps documented, previews exact, package submittable without implementation

### Tests for US4

- [ ] T028 [US4] Validate all six source files analyzed with version reconciliation (01-06 with versions and conflicts documented in `research.md`)
- [ ] T029 [US4] Confirm exact previews generated for Prompts 1, 2A, 2B, 3A (ready-state summary in `PROMPT_EXECUTION_PLAN.md`)
- [ ] T030 [US4] Verify blocked prompts (3B, 3C) explicitly marked with prerequisite decisions listed
- [ ] T031 [US4] Confirm zero code generated, zero commits created beyond spec folder, zero deployments triggered

### Approval Workflow for US4

- [ ] T032 [US4] Package review: verify `.github/specs/004-book-website-make/` contains all required artifacts
  - ✓ spec.md (requirements + user stories)
  - ✓ plan.md (technical approach)
  - ✓ research.md (decisions + reconciliation)
  - ✓ data-model.md (entities, fields)
  - ✓ contracts/ (6 prompt specifications)
  - ✓ quickstart.md (validation scenarios)
  - ✓ PROMPT_EXECUTION_PLAN.md (phase roadmap)
  - ✓ GATE_2_SIGN_OFF_SUMMARY.md (approval checklist)
  - ✓ GATE_2_READINESS_REPORT.md (technical validation)

- [ ] T033 [US4] Prepare for user approval: Ash reviews complete documentation package against `01-book-website-specification.md` master contract
- [ ] T034 [US4] Collect approval sign-off: Ash confirms design baseline locked, Phase A ready, decision timeline acceptable

**Checkpoint**: Documentation package complete and approved - implementation pre-reqs satisfied

---

## Phase 6: Polish & Post-Gate 2 Validation

**Purpose**: Cross-cutting validation before Phase A/B execution begins

- [ ] T035 [P] Validate all contract files use consistent terminology (Specification File, Design Baseline, Blocking Decision, Figma Make Prompt)
- [ ] T036 [P] Run `npm test` validation suite (if exists) on spec documents
- [ ] T037 Run final checklist: no TODO markers, all decisions documented or blocked, no implementation code present
- [ ] T038 Archive Gate 2 sign-off as reference for Phase B decision resolution timeline

**Checkpoint**: Documentation validated - ready for Figma Make execution

---

## Dependencies & Execution Order

### Phase Dependencies

- **Gate 2 Approval (Phase 1)**: No dependencies - prerequisite for all work
- **US1 (Phase 2)**: Depends on Gate 2 - can start immediately after approval
- **US2 (Phase 3)**: Depends on Gate 2 + US1 foundation - can run after Phase 1
- **US3 Decision Resolution (Phase 4)**: Parallel to US1/US2 execution - 6 decisions resolved in parallel
- **US4 Documentation (Phase 5)**: Can run parallel to US1/US2/US3
- **Polish (Phase 6)**: Depends on all user stories being documented and approved

### Within Each User Story

**US1**: Tests (T005-007) → Execution (T008-010) → Verification (T011)
**US2**: Tests (T012-013) → Await decisions → Execution (T015) → Verification (T016)
**US3**: Tests (T017-018) → Decisions (T019-024 parallel) → Execution (T025-026) → Verification (T027)
**US4**: Tests (T028-031) → Approval workflow (T032-034)

### Parallel Opportunities

**Phase 1 (Gate 2)**:
- T002, T003 can run in parallel (design review + environment check)
- T004 can run anytime once Gate 2 summary reviewed

**Phase 2 (US1)**:
- T008, T009, T010 can execute in parallel (3 unblocked prompts, different files)

**Phase 3 (US2)**:
- Awaiting Decisions 3, 4, 5, 6 from Phase 4

**Phase 4 (US3)**:
- T019-024: All 6 decisions can be clarified in parallel (different decision owners)
- T025-026: Can execute once respective decisions resolved

**Phase 5 (US4)**:
- T032-034 can run in parallel with other phases (validation + approval workflow)

---

## Implementation Strategy

### MVP Scope: Phase A Execution Only

**Stop-point after US1 delivery**:

1. ✅ Gate 2 approval (Phase 1)
2. ✅ Execute Prompts 1, 2A, 2B (Phase 2 - US1)
3. ✅ Validate outputs match contracts
4. **STOP** - Phase A complete, ready for design-system export

**Timeline**: ~1 hour (3 unblocked prompts × 10-15 min each + review)

---

### Incremental Delivery: Phase A → Phase B

**After US1 ready**:

1. **Phase A MVP**: Prompts 1, 2A, 2B executed and validated (US1)
2. **Parallel decision resolution**: Decisions 1–6 clarified (US3)
3. **Phase B extension**: Once decisions resolved, execute Prompts 3A, 3B, 3C (US2, US3)
4. **Full package approval**: Complete documentation with Phase A+B outputs (US4)

**Timeline**: 
- Phase A: 1 hour
- Decisions: 4–6 hours (parallel with US1 validation)
- Phase B: 1 hour (once decisions resolved)
- Total: 6–8 hours

---

### Parallel Team Strategy

With multiple reviewers:

1. **Person A** (Design Lead): Gate 2 review (T001-004) → Validate US1 outputs (T005-007)
2. **Person B** (Product Owner): Clarify Decisions 1, 2, 5 (T019, T020, T023)
3. **Person C** (Tech Lead): Clarify Decisions 3, 4, 6 (T021, T022, T024)
4. **Person D** (Project Coordinator): Package review and approval workflow (T032-034)

All groups proceed in parallel; Phase B execution begins once decisions land.

---

## Notes

- **[P] markers**: Parallel execution within phase (independent owners/files)
- **[Story] labels**: Traceability to spec.md user stories
- **No code**: All tasks are documentation, approval, or Figma Make execution
- **Version tracking**: Reference reconciliation in `research.md` (all source file versions documented)
- **Stop points**: Gate 2 (US1/MVP) or Full Package (US1+US2+US3+US4)
- **Blocking checklist**: US3 decision resolution gates US2 Phase B prompts (3B, 3C)

---

## Success Criteria per User Story

- **US1 (Design Hand-off)**: All 3 Phase A prompts executable and validated ✅
- **US2 (Reader Access)**: Prompt 3A awaiting 4 decisions; executable once decisions resolved ⏳
- **US3 (Implementation Readiness)**: All 7 decisions clarified and documented ⏳
- **US4 (Documentation Completion)**: Complete package submitted for user approval ✅
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

```text
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
| ------- | ------- | ------- | ------- | -------- |
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
| --------- | ----- | ------------- | ----------- | -------------- |
| ✅ T052 | | Create version reconciliation artifact documenting all source file versions and differences per FR-002 precedence rule | `.github/specs/004-book-website-make/version-reconciliation.md` | T007, T010 |
| ✅ T053 | | Generate and document exact Prompt 1 preview (before/after navigation structure, numbered implementation steps, acceptance criteria, non-changes list) per SC-002 | `.github/specs/004-book-website-make/contracts/prompt-1-exact-preview.md` | T020 |
| ⏳ T054 | | Validate all Prompt previews against completeness checklist (Prompts 1, 2A, 2B, 3A include all required elements; 95%+ completeness) per SC-002/SC-003 | `.github/specs/004-book-website-make/checklists/prompt-preview-validation.md` | T053, T021, T022, T023 |
| ✅ T055 | | Audit and mark all approval boundaries in spec, plan, tasks, and contracts using standard notation (approved ✓, unapproved ~, unresolved ❌) per SC-007 | `.github/specs/004-book-website-make/approval-boundaries.md` | All phases 1-7 |
| ✅ T056 | | Create source file inventory with versions, update timestamps, and reconciliation status for all 6 source files (content/book/01-06) per FR-001 | `.github/specs/004-book-website-make/source-file-inventory.md` | T007 |
| ✅ T057 | | Validate all 7 blocking decisions have 3+ options documented with impact assessment in decision matrix per SC-004 | `.github/specs/004-book-website-make/checklists/blocking-decisions-validation.md` | T010 |
| ✅ T058 | | Audit prompt contracts (3B, 3C) to ensure user-editable decisions are clearly marked and all options visible to reader per FR-008 | `.github/specs/004-book-website-make/contracts/blocking-decisions-audit.md` | contracts/prompt-3b-recovery-flows.md, contracts/prompt-3c-error-states.md |
| ✅ T059 | | Add pre-approval reconciliation validation step: confirm zero version merge conflicts, all decisions documented, all previews validated, all boundaries marked | `.github/specs/004-book-website-make/checklists/pre-approval-reconciliation-validation.md` | T052–T058 |

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
