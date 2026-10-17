# Tasks: TOA Media Library Strategy and Asset Recovery

**Input**: Specification from [spec.md](spec.md), implementation plan from [plan.md](plan.md)

**Prerequisites**: spec.md and plan.md (required for requirements, user story priorities, scope boundaries)

**Tests**: Not required for this definition/validation workflow. Validation consists of applying schemas and frameworks to recovered asset samples.

**Organization**: Tasks are grouped by definition/validation phase and user story to enable independent completion and testing against real recovered assets.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different documents, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
  - Phase 0: NO story label (research tasks apply to multiple stories)
  - Phase 1: Story label required for design tasks
- Include exact file paths in descriptions

---

## Phase 0: Research — Resolve Critical Clarifications

**Purpose**: Transform 3 pending owner decisions into documented recommendations and rationale (prerequisite gate for Phase 1 design)

**Gate**: All 3 clarifications (Q1, Q2, Q3) must be resolved before Phase 1 design can proceed

### Critical Clarification Tasks

- [ ] T001 Review audit PR #285 decision log and identify provider choice contradictions (GitHub + Netlify vs. Cloudinary vs. defer) in `.github/reports/toa-media-library/`
- [ ] T002 Review strategy report and provider-comparison report; document findings on provider suitability, cost model, integration complexity in research.md
- [ ] T003 Assess Figma Make extraction capability: authenticated access, extraction fidelity, supported formats, performance constraints for TOA-280 pilot
- [ ] T004 Define asset recovery baseline: realistic recovery target (40–50 vs. ~30 vs. qualitative) with evidence from extraction pilot or manual export testing
- [ ] T005 Assess print-quality requirements: minimum DPI, format support (PNG/PDF), RGB/CMYK compatibility, print as MVP requirement vs. aspirational
- [ ] T006 Clarify implementation sequencing: linear (define → validate → implement) vs. parallel (concurrent work) vs. refinement-only (TOA-283 non-blocking)
- [ ] T007 Document Q1 resolution (provider choice) in research.md § Research Task 1 with rationale, trade-offs, implications for TOA-284/285
- [ ] T008 Document Q2 resolution (asset recovery baseline) in research.md § Research Task 2 with recovery target, print baseline, implications for SC-001
- [ ] T009 Document Q3 resolution (sequencing) in research.md § Research Task 3 with blocker chain, critical path, team allocation strategy
- [ ] T010 Update research.md Gate Evaluation checklist; confirm Q1, Q2, Q3 resolved and no conflicts with specification constraints

**Checkpoint**: Phase 0 research complete — all 3 clarifications resolved, documented in research.md, owner approval confirmed

---

## Phase 1: Design — Create Catalogue, Evaluation and Validation Contracts

**Purpose**: Define the schemas, frameworks and procedures that will guide asset recovery, provider evaluation and validation

**Prerequisites**: research.md complete with all clarifications resolved

### User Story 1: Asset Recovery and Catalogue (P1) — Design Phase

**Goal**: Produce a validated asset catalogue schema and sample recovered-asset documentation proving the schema works with real assets

**Independent Test**: Apply data-model.md schema to 12 pilot recovered assets; verify all mandatory fields are populated or marked as unknown without data fabrication

#### Data Model & Schema (US1)

- [ ] T011 [P] [US1] Extract Asset entity attributes from spec.md FR-006 into data-model.md: asset_id, original_or_derivative, provenance, format, dimensions, print_suitable, usages, metadata fields
- [ ] T012 [P] [US1] Extract AssetRelationship entity from spec.md FR-007 into data-model.md: source_asset_id, target_asset_id, relationship_type (derived_from, variant_of, used_in, replaced_by), notes
- [ ] T013 [US1] Define validation rules in data-model.md: asset ID uniqueness, non-invention of unknown metadata (mark as null/"unknown" per FR-008), reference integrity, state transitions
- [ ] T014 [US1] Define recovery_status enum values in data-model.md: "recovered" | "partial" | "manual_export_required" | "unrecoverable" (map to TOA-282 validation findings)
- [ ] T015 [P] [US1] Create catalogue-schema.json from data-model.md; include required fields, optional fields, validation constraints, format enums
- [ ] T016 [P] [US1] Add JSON Schema examples to catalogue-schema.json: 2–3 sample asset records (one original, one derivative, one with unknown fields)
- [ ] T017 [US1] Validate catalogue-schema.json against 12 pilot recovered assets (from TOA-280); confirm all mandatory fields populated or marked unknown
- [ ] T018 [US1] Document field constraints in catalogue-schema.json (max length, nullable, required, enum values) quoted verbatim from FR-006 to prevent implementation-time discretion

**Checkpoint**: US1 design complete — catalogue schema validated against pilot assets, schema location confirmed (Git JSON, database, or provider-native)

---

### User Story 2: Catalogue Schema and Provenance Model (P1) — Design Phase

**Goal**: Produce a finalised, specification-compliant catalogue schema with provenance tracking and proven non-invention rule enforcement

**Independent Test**: Apply finalised schema to batch of 12+ pilot recovered assets; verify all relationships (original ↔ derivative, asset ↔ usage) are explicit and non-circular

#### Provenance & Relationships (US2)

- [ ] T019 [P] [US2] Design AssetRelationship tracking in data-model.md: map original → derivative, asset → published usage, variant relationships
- [ ] T020 [US2] Add provenance field to Asset entity in data-model.md: source (e.g., "Figma file X, page Y; exported from Z; manual upload") with confidence/verification status
- [ ] T021 [US2] Implement non-invention rule in catalogue-schema.json: mark unknown credits, rights, provenance as null or "unknown" (not fabricated); add validation examples showing rejection of invalid data
- [ ] T022 [US2] Create asset relationship validation in catalogue-schema.json: no circular references, relationship types enforced, source/target asset IDs must exist in catalogue
- [ ] T023 [P] [US2] Design asset state machine in data-model.md: transitions (recovered → validated → approved → published), terminal states (unrecoverable, retired, deprecated)
- [ ] T024 [US2] Test schema against 12+ pilot assets; verify relationships are explicit, non-invention rule is enforced, no missing metadata fabricated
- [ ] T025 [US2] Document schema version, maintenance procedures and changelog rules in data-model.md for future schema evolution
- [ ] T026 [US2] Confirm catalogue storage location decision from Q1 resolution: Git-tracked JSON, database schema, or provider-native catalogue (document choice in data-model.md § Storage)

**Checkpoint**: US2 design complete — schema handles relationships, provenance, and non-invention rule; validated against pilot assets

---

### User Story 3: Provider and Workflow Evaluation (P2) — Design Phase

**Goal**: Produce a provider evaluation framework and decision criteria for shortlisted storage providers (GitHub + Netlify, Cloudinary, alternatives)

**Independent Test**: Apply provider-evaluation.md criteria to 2–3 shortlisted providers using representative recovered assets; generate comparison matrix with recommendations

#### Provider Evaluation Framework (US3)

- [ ] T027 [P] [US3] Extract evaluation criteria from spec.md FR-010–013: cost model, asset limit, supported formats, max file size, API availability, visual editing UI, batch processing, print quality, concurrent users, integration complexity
- [ ] T028 [US3] Define scoring/weighting in provider-evaluation.md: critical criteria (e.g., print support, format flexibility, 56+ asset limit), nice-to-have criteria (visual editing UI, batch processing)
- [ ] T029 [US3] Create comparison matrix template in provider-evaluation.md: providers (rows) × criteria (columns) with scoring guidance
- [ ] T030 [P] [US3] Document decision framework in provider-evaluation.md: pass/fail gates (e.g., "must support PNG/SVG"), decision logic (e.g., "minimum integration complexity <40 hours")
- [ ] T031 [US3] Assess candidate providers: GitHub + Netlify (from Q1), Cloudinary (from Q1), and 1 alternative; test representative recovered assets against each provider
- [ ] T032 [US3] Populate comparison matrix with test results: cost, formats, print suitability, integration complexity, concurrent users, visual editing workflow
- [ ] T033 [US3] Generate provider recommendation report in provider-evaluation.md: recommended provider, rationale, trade-offs, risk assessment
- [ ] T034 [US3] Distinguish evaluation (this task) from approval: document that Q1 provider decision is owner's to make; this phase informs the decision with evidence

**Checkpoint**: US3 design complete — provider evaluation framework complete, comparison matrix populated, recommendation documented with evidence

---

### User Story 4: Validation and Handoff (P2) — Design Phase

**Goal**: Produce validation checklists, procedures and operational runbook for asset migration and ongoing maintenance

**Independent Test**: Run validation checklist against batch of pilot recovered assets; confirm all checks are executable and produce clear pass/fail outcomes

#### Validation Procedures & Handoff (US4)

- [ ] T035 [P] [US4] Extract validation requirements from spec.md FR-014–017: visual comparison (recovered vs. original website/Figma), broken-reference detection, metadata completeness, format validation, print-quality assessment
- [ ] T036 [US4] Design validation checks in validation-checklist.md: check type, procedure, tools/commands, pass/fail criteria, severity levels (critical, high, low)
- [ ] T037 [P] [US4] Document visual comparison procedure: tool selection (image diff, pixel-perfect comparison, manual review), comparison criteria (fidelity, format degradation, size changes), acceptance thresholds
- [ ] T038 [P] [US4] Document broken-reference detection procedure: reference mapping validation (old → new asset ID), link scanning (internal and external), orphaned asset detection
- [ ] T039 [P] [US4] Document metadata completeness check: required fields per FR-006 (asset ID, provenance, format, dimensions, usage rights), optional fields, unknown/unrecoverable handling
- [ ] T040 [P] [US4] Document format validation: supported formats per provider decision (Q1), file size limits, resolution limits for print, batch processing verification
- [ ] T041 [US4] Add severity levels and escalation paths to validation-checklist.md: critical (missing asset, broken reference) → team lead; high (missing metadata) → content owner; low (visual degradation) → log and document
- [ ] T042 [US4] Test validation checklist against 12+ pilot recovered assets; confirm all checks execute independently and produce clear outcomes
- [ ] T043 [US4] Create operational runbook section in quickstart.md: common tasks (add asset, tag asset, publish, recover from backup, retire asset), step-by-step procedures, troubleshooting
- [ ] T044 [US4] Document maintenance procedures in quickstart.md: schedule (when, who), escalation (what to do if validation fails), approval workflow (who signs off on migration)

**Checkpoint**: US4 design complete — validation checklist executable, procedures documented, operational runbook ready for handoff

---

### User Story 5: Figma Extraction Capability and Limitations (P3) — Design Phase

**Goal**: Document Figma Make extraction capabilities, limitations, and reusability of extraction skills/agents for wider deployment

**Independent Test**: Run extraction pilot (TOA-280 scope) on sample Figma files; document what was recovered successfully, what required manual export, and skill reusability

#### Figma Extraction Assessment (US5)

- [ ] T045 [US5] Run Figma Make extraction pilot on 12 sample Figma files (TOA-280 scope); document authenticated access setup, API call patterns, rate limiting
- [ ] T046 [P] [US5] Document extraction fidelity assessment: successful extractions (format, metadata, dimensions preserved), failed extractions (format unsupported, dimensions truncated), partial extractions (nested components)
- [ ] T047 [P] [US5] Document manual-export gaps: asset types Figma Make cannot extract (fonts, linked components, prototypes), effort estimate per asset type, recommended workflow
- [ ] T048 [US5] Assess Figma Make performance at scale: extraction time for 12 assets, memory usage, concurrent extraction limits, batch processing capability
- [ ] T049 [US5] Document reusability of extraction skills/agents: prompts used, parameter flexibility, error handling, applicability to new Figma files (TOA-280 scope extends to wider deployment)
- [ ] T050 [US5] Test extraction skill against new Figma files (proof of concept); verify consistency and document error patterns
- [ ] T051 [US5] Create Figma extraction limitations document in quickstart.md: supported/unsupported formats, fidelity guarantees, performance expectations, manual-export requirements
- [ ] T052 [US5] Recommend extraction workflow for 56-asset recovery: % via Figma Make, % via manual export, estimated timeline, resource requirements

**Checkpoint**: US5 design complete — extraction capabilities documented, limitations clear, reusable skills validated for wider deployment

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Finalise all deliverables, validate completeness, prepare for handoff to implementation phases

- [ ] T053 [P] Validate data-model.md against spec.md requirements (FR-001–018): all entities defined, all attributes present, all relationships explicit
- [ ] T054 [P] Validate catalogue-schema.json against data-model.md: schema structure matches entity definitions, validation rules match FR-008 (non-invention rule enforced)
- [ ] T055 [P] Validate provider-evaluation.md against spec.md FR-010–013: all criteria present, scoring logic clear, decision framework testable
- [ ] T056 [P] Validate validation-checklist.md against spec.md FR-014–017: all checks present, procedures executable, severity levels assigned
- [ ] T057 [P] Validate quickstart.md against all phase 1 outputs: runbook procedures cross-reference schema, evaluation framework, validation checklist; no duplication
- [ ] T058 Cross-reference all deliverables to Linear issues: data-model.md input for TOA-277/283; catalogue-schema.json consumed by TOA-284/285; provider-evaluation.md consumed by TOA-276; validation-checklist.md consumed by TOA-279/282; quickstart.md consumed by TOA-282/279/286
- [ ] T059 Update research.md § Consolidated Findings with Phase 1 design results: what schema was chosen, why, what provider evaluation revealed, what validation approach is recommended
- [ ] T060 Run specification completeness audit: confirm all 18 functional requirements (FR-001–018) are satisfied by Phase 1 deliverables; document any gaps or deferred work
- [ ] T061 Prepare Phase 1 → Phase 2 handoff: document which deliverables are ready for implementation (TOA-284/285/286), which require owner approval, which depend on ongoing decisions

**Checkpoint**: All design deliverables complete, validated against requirements, ready for implementation phases (TOA-284/285/286)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 0 (Research)**: No dependencies — can start immediately (T001–T010)
  - **GATE**: T010 must complete and Q1, Q2, Q3 must be resolved before Phase 1 can proceed
- **Phase 1 (Design)**: Depends on Phase 0 completion
  - User Story 1 & 2 (US1, US2 — P1): Can start immediately after Phase 0; both are foundational for US3
  - User Story 3 (US3 — P2): Can start after Phase 0; uses US1/US2 schema for provider testing
  - User Story 4 (US4 — P2): Can start after Phase 0; uses US1/US2 schema for validation design; uses US3 results for provider-specific validation
  - User Story 5 (US5 — P3): Can start after Phase 0; runs Figma extraction pilot (TOA-280 scope)
- **Polish (Phase N)**: Depends on all Phase 1 user stories complete

### User Story Dependencies

- **US1 (Recovery & Catalogue)**: Can start after Phase 0 — No dependencies on other stories
- **US2 (Schema & Provenance)**: Can start after Phase 0; enhances US1 with relationship tracking and provenance fields
- **US3 (Provider Evaluation)**: Can start after Phase 0; consumes US1/US2 schema for testing providers; independent of US4/US5
- **US4 (Validation & Handoff)**: Can start after Phase 0; uses US1/US2 schema in validation procedures; benefits from US3 provider evaluation (provider-specific checks)
- **US5 (Figma Extraction)**: Can start after Phase 0; runs pilot in parallel; informs US1 recovery feasibility and effort

### Within Each User Story

- Schema definition (T011–T018 for US1) before validation (T017)
- Data model completed before JSON schema creation
- Criteria definition (T027–T030 for US3) before provider testing (T031–T033)
- Validation check design (T035–T041 for US4) before runbook procedures (T043–T044)
- Extraction assessment (T045–T050 for US5) before limitations documentation (T051–T052)

### Parallel Opportunities

- **Phase 0 research**:
  - T001–T003 (audit review, reports, extraction assessment) can run in parallel
  - T004–T006 (recovery baseline, print requirements, sequencing) can run in parallel

- **Phase 1 design (after Phase 0 complete)**:
  - **US1**: T011–T018 (asset/relationship definitions and schema creation) — all T011–T013 can run in parallel; T015–T016 depend on T011–T013
  - **US2**: T019–T026 (provenance model and validation rules) — can run in parallel with US1 after schema basics are defined
  - **US3**: T027–T034 (provider evaluation) — T027–T029 (criteria definition) can run in parallel with T031 (provider testing)
  - **US4**: T035–T044 (validation procedures) — T035–T041 (check design) can run in parallel; T043–T044 (runbook) depend on validation checks
  - **US5**: T045–T052 (Figma assessment) — can run in parallel with US1–US4 (independent assessment)

- **Polish**:
  - All validation tasks (T053–T057) can run in parallel
  - T058–T061 (cross-reference and handoff) depend on all validation tasks

---

## Parallel Example: Phase 1 Design (Post-Phase 0)

```
Team A (US1):
  Parallel: T011, T012 (Asset, AssetRelationship entities)
  Then: T013 (validation rules) → T014 (recovery_status enum) → T015 (JSON schema) → T016 (examples) → T017 (validation)

Team B (US2):
  Parallel: T019, T020, T023 (provenance, relationships, state machine)
  Then: T021 (non-invention rule) → T022 (validation) → T024 (schema testing) → T025 (maintenance)

Team C (US3):
  Parallel: T027, T028, T029 (criteria, weighting, framework)
  Then: T030 (decision framework) → T031 (provider testing) → T032 (matrix population) → T033 (recommendation)

Team D (US4):
  Parallel: T035, T036, T037, T038, T039, T040, T041 (validation checks)
  Then: T042 (checklist testing) → T043 (runbook) → T044 (maintenance procedures)

Team E (US5):
  Run in parallel: T045 (extraction pilot) → T046, T047, T048 (fidelity, gaps, performance)
  Then: T049, T050 (reusability assessment) → T051 (limitations) → T052 (workflow recommendation)

All teams converge: T053–T061 (validation, cross-reference, handoff)
```

---

## Implementation Strategy

### MVP First (US1 & US2 Only)

1. Complete Phase 0: Research (T001–T010)
2. Complete Phase 1, US1: Asset Recovery & Catalogue (T011–T018)
3. Complete Phase 1, US2: Catalogue Schema & Provenance (T019–T026)
4. **STOP and VALIDATE**: Apply schema to 12 pilot assets, confirm non-invention rule, verify relationships
5. Stop here if owner approves; proceed to US3–US5 only if timeline and scope allow

### Incremental Delivery

1. **Foundation** (Phase 0): Research — resolve Q1, Q2, Q3 (T001–T010)
2. **Core MVP** (Phase 1, US1–US2): Define catalogue schema, test with pilot assets (T011–T026)
3. **Provider Decision** (Phase 1, US3): Evaluate providers, generate recommendation (T027–T034)
4. **Validation Approach** (Phase 1, US4): Design validation procedures, operational runbook (T035–T044)
5. **Figma Assessment** (Phase 1, US5): Document extraction capabilities, recommend workflow (T045–T052)
6. **Polish** (Phase N): Validate all deliverables, prepare for implementation phases (T053–T061)

### Parallel Team Strategy (6+ People)

- **Research Team** (2 people): Phase 0 research tasks (T001–T010), run to completion
- **Schema Team** (2 people): Phase 1, US1–US2 (T011–T026), parallel work
- **Provider Team** (1 person): Phase 1, US3 (T027–T034)
- **Validation Team** (1 person): Phase 1, US4 (T035–T044)
- **Extraction Team** (1 person): Phase 1, US5 (T045–T052)
- **Validation & Handoff** (1–2 people): Phase N (T053–T061), run after all stories complete

---

## Notes

- [P] tasks = different documents, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable against recovered asset samples
- Tasks are validation/documentation work, not code implementation (implementation deferred to TOA-284/285/286)
- Commit after each task or logical group
- Stop at any checkpoint to validate story design independently
- Avoid: vague procedures, undocumented assumptions, cross-story dependencies that break independence
- All tasks reference specific file paths to ensure clarity and enable independent execution

---

## Success Criteria

- [ ] All Phase 0 research tasks complete with Q1, Q2, Q3 resolved
- [ ] All Phase 1 design tasks complete with all 5 user stories' deliverables produced
- [ ] Each deliverable validated against recovered asset samples (no fabricated data)
- [ ] Traceability confirmed: all FR-001–018 requirements satisfied by Phase 1 outputs
- [ ] Implementation phases (TOA-284/285/286) have clear inputs from Phase 1 deliverables
- [ ] Owner approval obtained for all design decisions before proceeding to implementation

