# Tasks: TOA Media Library Strategy and Asset Recovery

**Input**: Specification from [spec.md](spec.md), implementation plan from
[plan.md](plan.md), Phase 0 research from [research.md](research.md)

**Prerequisites**: spec.md and plan.md (required for requirements, user story
priorities, scope boundaries)

**Tests**: Not required for this definition/validation workflow. Validation
consists of applying schemas and frameworks to recovered asset samples.

**Organization**: Tasks are grouped by definition/validation phase and user
story to enable independent completion and testing against real recovered
assets.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different documents, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Phase 0: NO story label (research tasks apply to multiple stories)
- Phase 1: Story label required for design tasks
- Include exact file paths in descriptions

---

## Phase 0: Research — Resolve Critical Clarifications

**Purpose**: Transform 3 pending owner decisions into documented recommendations
and rationale (prerequisite gate for Phase 1 design)

**Status**: ✅ COMPLETE — All clarifications resolved and documented in
research.md

**Gate**: All 3 clarifications (Q1, Q2, Q3) resolved before Phase 1 design
proceeds

### Critical Clarification Tasks (COMPLETED)

- [x] T001 Review audit PR #285 decision log and identify provider choice contradictions (GitHub + Netlify vs. Cloudinary vs. defer) in `.github/reports/toa-media-library/`
- [x] T002 Review strategy report and provider-comparison report; document findings on provider suitability, cost model, integration complexity in research.md
- [x] T003 Assess Figma Make extraction capability: authenticated access, extraction fidelity, supported formats, performance constraints for TOA-280 pilot
- [x] T004 Define asset recovery baseline: realistic recovery target (40–50 vs. ~30 vs. qualitative) with evidence from extraction pilot or manual export testing
- [x] T005 Assess print-quality requirements: minimum DPI, format support (PNG/PDF), RGB/CMYK compatibility, print as MVP requirement vs. aspirational
- [x] T006 Clarify implementation sequencing: linear (define → validate → implement) vs. parallel (concurrent work) vs. refinement-only (TOA-283 non-blocking)
- [x] T007 Document Q1 resolution (provider choice) in research.md § Research Task 1 with rationale, trade-offs, implications for TOA-284/285
- [x] T008 Document Q2 resolution (asset recovery baseline) in research.md § Research Task 2 with recovery target, print baseline, implications for SC-001
- [x] T009 Document Q3 resolution (sequencing) in research.md § Research Task 3 with blocker chain, critical path, team allocation strategy
- [x] T010 Update research.md Gate Evaluation checklist; confirm Q1, Q2, Q3 resolved and no conflicts with specification constraints

**Phase 0 Resolution Summary** (from research.md):

- **Q1**: GitHub + Netlify approved as working assumption (Git LFS, Netlify deployment, responsive-image pipeline)
- **Q2**: 40–50 of 56 assets recoverable (71–89%); 300 DPI, RGB/CMYK, PNG/PDF print support essential for MVP
- **Q3**: Parallel implementation approved (Phase 0 → Phase 1 design → Phase 2/3 parallel; 30–40% timeline compression)

**Checkpoint**: Phase 0 research complete — all 3 clarifications resolved and
documented

---

## Phase 1: Design — Create Catalogue, Evaluation and Validation Contracts

**Purpose**: Define the schemas, frameworks and procedures that will guide asset
recovery, provider evaluation and validation

**Prerequisites**:

- Phase 0 research complete: All three clarification questions (Q1, Q2, Q3) resolved and documented in research.md ✅
- research.md complete with all clarifications resolved ✅

**Target Deliverables**:

- `data-model.md` — Entity definitions (Asset, AssetRelationship, StorageProvider, ValidationResult)
- `contracts/catalogue-schema.json` — JSON schema with validation rules, constraints, and examples (includes non-invention validation rules and field constraints per FR-008)
- `contracts/provider-evaluation.md` — Evaluation criteria matrix and decision framework
- `contracts/validation-checklist.md` — Quality gates, visual comparison, metadata checks, and operational runbook
- `quickstart.md` — Validation scenarios and sample workflows

---

## Phase 1: User Story 1 — Asset Recovery and Catalogue (P1)

**Goal**: Produce a validated asset catalogue schema and sample recovered-asset
documentation proving the schema works with real assets

**Independent Test**: Apply data-model.md schema to 12 pilot recovered assets;
verify all mandatory fields populated or marked unknown without data fabrication

### Data Model & Schema (US1)

- [ ] T011 [P] [US1] Extract Asset entity attributes from spec.md (FR-001–006) into data-model.md: asset*id, original*or*derivative, provenance, format, dimensions, print*suitable, usages, metadata (alt*text, caption, credits, rights*notes)
- [ ] T012 [P] [US1] Extract AssetRelationship entity from spec.md (FR-007) into data-model.md: source*asset*id, target*asset*id, relationship*type, notes; define relationship*type enum (derived*from, variant*of, used*in, replaced*by)
- [ ] T013 [P] [US1] Extract StorageProvider entity from spec.md (FR-010–013) into data-model.md: name, cost*model, formats*supported, max*file*size, print*quality*support, api*availability, integration*complexity
- [ ] T014 [US1] Define validation rules in data-model.md: asset_id uniqueness, non-invention enforcement (mark unknown metadata as null/"unknown" per FR-008, no fabrication), reference integrity, state transitions
- [ ] T015 [US1] Define recovery*status enum in data-model.md: "recovered" | "partial*recovery" | "manual*export*required" | "unrecoverable"; map to SC-001 acceptance criteria
- [ ] T016 [P] [US1] Create contracts/catalogue-schema.json from data-model.md using JSON Schema format; include required fields, optional fields, validation constraints, format enums (PNG, SVG, JPEG, PDF per FR-004)
- [ ] T017 [P] [US1] Add JSON Schema examples to contracts/catalogue-schema.json: 3 sample asset records (original high-res, derivative web-rendered, unknown provenance) with all fields populated
- [ ] T018 [US1] Document field constraints in contracts/catalogue-schema.json (maxLength, minLength, pattern, enum, nullable, required) quoted verbatim from spec.md FR-006 to prevent implementation-time discretion
- [ ] T019 [US1] Validate contracts/catalogue-schema.json against 12 pilot recovered assets (from TOA-280 scope); confirm all mandatory fields populated or marked unknown without data invention

**Checkpoint**: US1 design complete — catalogue schema validated against pilot
assets

---

## Phase 1: User Story 2 — Catalogue Schema and Provenance Model (P1)

**Goal**: Produce a finalised catalogue schema with provenance tracking and
proven non-invention rule enforcement

**Independent Test**: Apply finalised schema to batch of 12+ pilot recovered
assets; verify relationships are explicit (original ↔ derivative, asset ↔ usage)
and non-circular

### Provenance & Relationships (US2)

- [ ] T020 [P] [US2] Design AssetRelationship tracking in data-model.md (per FR-007): map original → derivative chains, asset → published usage contexts, variant relationships; include confidence/verification status
- [ ] T021 [US2] Add provenance field to Asset entity in data-model.md: source tracking (e.g., "Figma file X page Y exported 2026-10-17; manual upload by user Z; archive scan"), verification_status (verified | assumed | unknown)
- [ ] T022 [P] [US2] Add non-invention validation rules to contracts/catalogue-schema.json: required*metadata (asset*id, original*or*derivative, format, dimensions), optional*if*unknown (credits, rights*notes, alt*text if marked unknown), forbidden (empty strings, placeholder values)
- [ ] T023 [US2] Create contracts/validation-metadata-rules.json: define which fields trigger non-invention warnings (null vs. "unknown" vs. "unrecoverable"), document acceptable reasons for missing data per FR-008
- [ ] T024 [P] [US2] Test non-invention rule on pilot assets: apply schema validation to 12 recovered assets; confirm no metadata is fabricated, all unknowns are explicitly marked, no circular relationships
- [ ] T025 [US2] Document provenance tracking workflow in data-model.md: how to record asset origin, verify against originals, track changes during migration

**Checkpoint**: US2 design complete — provenance schema and non-invention rules
proven with pilot data

---

## Phase 1: User Story 3 — Provider and Workflow Evaluation (P2)

**Goal**: Produce a provider comparison matrix and decision framework to
evaluate GitHub+Netlify, Cloudinary and alternatives against defined criteria

**Independent Test**: Apply evaluation framework to 2–3 candidate providers;
verify decision criteria are objective and decision logic is clear

### Provider Evaluation Framework (US3)

- [ ] T026 [P] [US3] Extract evaluation criteria from spec.md (FR-010–013) into contracts/provider-evaluation.md: cost*model, asset*limit, supported*formats, max*file*size, api*availability, visual*editing*ui, batch*processing, print*quality*support, concurrent*users, integration_complexity
- [ ] T027 [P] [US3] Create provider comparison matrix in contracts/provider-evaluation.md: rows = providers (GitHub+Netlify, Cloudinary, alternative), columns = criteria; populate based on research.md findings and vendor documentation
- [ ] T028 [US3] Define scoring and weighting in contracts/provider-evaluation.md: critical criteria (must-haves: print support, format flexibility, 56+ assets), nice-to-have (visual editing UI, CDN), cost factors
- [ ] T029 [US3] Document decision framework logic in contracts/provider-evaluation.md: pass/fail gates (e.g., "must support PNG/SVG"), scoring rules (e.g., cost per GB × 12 months), tie-breaker criteria
- [ ] T030 [P] [US3] Add non-cost evaluation criteria to contracts/provider-evaluation.md per spec.md FR-011–013: usability, support quality, roadmap alignment, lock-in risk, migration path clarity
- [ ] T031 [US3] Validate provider evaluation against Q1 decision (GitHub+Netlify) in contracts/provider-evaluation.md: confirm chosen provider meets or exceeds all critical criteria, document rationale for priority weighting

**Checkpoint**: US3 design complete — provider evaluation framework validated,
decision justified

---

## Phase 1: User Story 4 — Validation and Handoff (P2)

**Goal**: Produce comprehensive validation procedures and operational handoff
documentation to guide asset quality gates and publishing workflow

**Independent Test**: Apply validation checklist to 12 pilot recovered assets;
verify each check is executable and produces clear pass/fail outcomes

### Validation Procedures & Handoff (US4)

- [ ] T032 [P] [US4] Extract validation requirements from spec.md (FR-014–016) into contracts/validation-checklist.md: visual*comparison, broken*reference*detection, metadata*completeness, format*validation, print*quality_assessment
- [ ] T033 [P] [US4] Define visual comparison procedure in contracts/validation-checklist.md (per FR-014): tools (file diff, side-by-side rendering), acceptance criteria (acceptable degradation thresholds per print baseline), documented edge cases
- [ ] T034 [P] [US4] Define broken-reference detection procedure in contracts/validation-checklist.md (per FR-014): link scanning tools, asset ID verification, coverage scope (all published assets vs. sample)
- [ ] T035 [P] [US4] Define metadata completeness check in contracts/validation-checklist.md: required*vs*optional fields per schema, unknown-data handling (allowed null/"unknown" but not fabricated), rights/credits dispute escalation
- [ ] T036 [US4] Add severity levels to contracts/validation-checklist.md: CRITICAL (missing asset, broken reference), HIGH (missing metadata), LOW (minor visual degradation); escalation procedures
- [ ] T037 [US4] Create operational handoff section in quickstart.md: prerequisites (asset catalogue file, original website, original Figma files, comparison tools), step-by-step validation guide, expected outcomes
- [ ] T038 [P] [US4] Add troubleshooting guide to quickstart.md: common failures (visual comparison mismatch → format degradation, link scan fails → verify asset ID), remediation steps, owner notification procedures

**Checkpoint**: US4 design complete — validation checklist and handoff
procedures proven with pilot assets

---

## Phase 1: User Story 5 — Figma Extraction Capability and Limitations (P3)

**Goal**: Produce assessment of Figma Make extraction fidelity and documented
manual-export gaps for downstream implementation

**Independent Test**: Run Figma extraction on pilot files; document recovered
formats, fidelity vs. originals, manual-export requirements

### Figma Extraction Assessment (US5)

- [ ] T039 [P] [US5] Run Figma Make extraction pilot (TOA-280 scope) on representative Figma files: authenticated access validation, batch extraction performance, output format support
- [ ] T040 [P] [US5] Document extraction fidelity findings in data-model.md § Figma Extraction: supported formats (SVG, PNG, PDF per FR-004), dimensional accuracy, colour space handling (RGB vs. CMYK for print)
- [ ] T041 [US5] Identify manual-export gaps in data-model.md: asset types requiring manual intervention, recovery percentage expectation per Q2 (40–50 of 56 = 71–89%), effort estimates
- [ ] T042 [P] [US5] Create Figma extraction quickstart in quickstart.md: authenticated Make API setup, batch extraction command, expected output format, validation checks for recovered assets
- [ ] T043 [US5] Document extraction failure scenarios in quickstart.md: mid-batch failures, permission issues, unsupported component types; recovery procedures and escalation

**Checkpoint**: US5 design complete — Figma extraction assessment documented and
proved with pilot data

---

## Phase 1: Polish & Cross-Cutting Concerns

**Purpose**: Improvements and documentation that affect multiple user stories

- [ ] T044 [P] Review data-model.md for consistency across all entity definitions (Asset, AssetRelationship, StorageProvider, ValidationResult); ensure field naming, enums, and validation rules align
- [ ] T045 [P] Review all contracts/ files for traceability: every requirement (FR-001–018) from spec.md linked to at least one contract task or checklist item
- [ ] T046 Create comprehensive traceability section in quickstart.md: map each success criterion (SC-001–007) to validation checklist items or acceptance scenarios
- [ ] T047 [P] Add architecture diagram to data-model.md: Entity-Relationship diagram showing Asset ↔ AssetRelationship ↔ StorageProvider ↔ ValidationResult relationships
- [ ] T048 Validate all contracts/ files against non-functional requirements (spec.md FR-018): confirm no build integration, no responsive-image processing, no unresolved dependencies
- [ ] T049 Run specification-quality checklist review (checklists/specification-quality.md): confirm all Phase 1 design outputs satisfy CHK001–CHK060 quality gates for Phase 1 readiness

**Checkpoint**: Phase 1 design complete — all contracts validated, traceability
confirmed, specification maturity gates satisfied

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 0 (Research)**: ✅ COMPLETE — Prerequisites for Phase 1 unblocked
- **Phase 1 (Design)**: Can proceed immediately with all clarifications resolved
- US1 and US2 should complete before US3 (provider evaluation uses recovered asset evidence)
- US4 (validation) can proceed parallel to US1/US2/US3 (independent procedures)
- US5 (Figma assessment) runs parallel to design tasks (pilot extraction concurrent)

### User Story Sequence (Priority-Based)

1. **US1 (P1)** → Asset Recovery and Catalogue schema

1. **US2 (P1)** → Catalogue Schema and Provenance (builds on US1 data model)

1. **US3 (P2)** → Provider Evaluation (uses recovered asset evidence from US1/US2)

1. **US4 (P2)** → Validation and Handoff (independent, can run parallel to US3)

1. **US5 (P3)** → Figma Extraction Assessment (pilot runs parallel to all design tasks)

### Within Each User Story

- Data model tasks [P] can run in parallel (T011–T015 for US1)
- Schema and examples [P] can run in parallel (T016–T017 for US1)
- Validation tasks [P] can run in parallel (T024, T032–T035 for US2/US4)
- Cross-story polish tasks [P] run after all stories complete

### Parallel Opportunities

- **Parallel by file**: T011–T015 (different entities) can work concurrently
- **Parallel by story**: US1 design → US2 provenance can start once T015 (schema structure) completes
- **Parallel by evaluation**: US3 provider comparison can start once T019 (pilot validation) confirms schema works
- **Parallel research → design**: Phase 1 design can begin before Phase 0 Phase 0 research closes (once Q1/Q2/Q3 answers available)

---

## Implementation Strategy

### MVP (Phase 1 Complete)

## Deliverables when Phase 1 finishes

1. data-model.md with 4 entity definitions and validation rules

1. contracts/catalogue-schema.json validated against pilot assets

1. contracts/provider-evaluation.md with decision rationale (Q1 choice)

1. contracts/validation-checklist.md with executable procedures

1. quickstart.md with runbooks for validation and Figma extraction

**Success Metrics:**

- Schema accepts/rejects pilot assets correctly
- Validation procedures run without ambiguity
- Provenance tracking demonstrates non-invention rule
- Provider evaluation justifies Q1 choice with objective criteria
- All Phase 1 gate tests pass (CHK058–CHK060)

### After Phase 1 Complete

- **Phase 2 (Validation)**: TOA-282 (validate recovered assets) proceeds using Phase 1 schemas and checklists
- **Phase 3 (Infrastructure)**: TOA-284/285 (Git LFS, pipeline) proceed using Phase 1 provider choice and schema
- **Phase 4 (Handover)**: TOA-286 (operational handoff) uses Phase 1 validation checklist and quickstart runbook

---

## Notes

- [P] tasks = different documents/entities, no cross-dependencies
- [Story] label maps task to specific user story for traceability
- Each user story design is independently testable with pilot recovered assets
- Validation checklist items must be executable (clear inputs, outputs, pass/fail criteria)
- Provenance and non-invention rule enforcement are critical across US1/US2/US4
- Figma extraction (US5) informs recovery baseline (Q2) and catalogue schema (US1/US2)

---

## Checklist Status

- ✅ Phase 0 research complete (all 3 clarifications resolved)
- ⏳ Phase 1 design in progress (tasks T011–T049 ready for execution)
- ⏳ Phase 1 readiness gates CHK058–CHK060 to be confirmed upon completion
- 📋 Phase 2–4 parallel execution unblocked after Phase 1 completes

**Plan Version**: 1.0-phase1-ready | **Status**: Phase 0 COMPLETE, Phase 1 READY
FOR EXECUTION | **Last Updated**: 2026-10-17
