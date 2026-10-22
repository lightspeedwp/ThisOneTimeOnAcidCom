# Implementation Plan: TOA Media Library Strategy and Asset Recovery

**Branch**: `002-media-library` | **Date**: 2026-10-17 | **Spec**:
[spec.md](spec.md)

**Input**: Feature specification from
[.github/specs/002-media-library/spec.md](spec.md)

**Status**: Definition & Validation Planning (NOT implementation of
storage/build integration)

---

## Summary

**Primary Requirement**: Define a comprehensive strategy for recovering,
cataloguing and validating website assets (Figma artwork, images, brand
materials) before committing to a storage provider or migration approach.

**Scope**: This plan covers the *definition and validation phases*:

- Phase 0: Research (resolve 3 critical clarifications on provider choice, asset recovery baseline, implementation sequencing)
- Phase 1: Design (catalogue schema, provider evaluation criteria, validation approach, operational runbook structure)

**Out of Scope** (deferred to separate implementation issues TOA-284/285/286):
Provider infrastructure, build integration, responsive-image processing,
operational deployment.

**Technical Approach**: Specification-driven workflow—definition precedes
provider selection; evaluation precedes approval; validation approach is defined
before migration begins.

---

## Technical Context

**Project Type**: Specification & validation workflow (not a coding project;
deliverables are documentation, schemas, decision frameworks)

**Language/Version**: Markdown, JSON (for catalogue schema and asset metadata)

**Primary Dependencies**:

- Figma Make API (for authenticated asset extraction in TOA-280)
- No build-system, database or infrastructure dependencies for definition phase

**Storage**: N/A (definition phase); catalogue storage location (Git, JSON,
database) is a design decision in Phase 1, not a technical dependency

**Testing**: Definition phase testing is validation of schemas, workflows and
criteria using recovered asset samples; NOT unit tests or integration tests

**Target Outcome**:

- Catalogue schema (JSON schema definition)
- Provider evaluation framework (comparison matrix, decision criteria)
- Validation approach (checklists, runbooks, quality gates)
- Figma extraction assessment (capabilities, limitations, manual-export gaps)

**Performance Goals**: Not applicable (this is definition/validation, not
runtime performance)

**Constraints**:

- Non-invention rule: do not fabricate missing metadata (credits, provenance, rights)
- Figma references preserved until recovered assets and mappings verified
- Asset IDs independent of storage provider (enable future migration)
- Recovery assessment must be evidence-based (pilot extraction, manual export testing, not assumptions)

**Scale/Scope**:

- Recover and catalogue ~56 website assets (12 pilot + ~44 additional via Figma Make or manual export)
- Evaluate 2–3 candidate storage providers against defined criteria
- Define validation approach for ~56 assets before migration
- No responsive-image processing or build-system changes in this phase

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Repository Constitution Status**: The `.specify/memory/constitution.md` file
is a template (not yet filled with project principles).

**Standard Gates for Definition/Validation Workflow**:

- ✅ **Specification Complete**: Specification reviewed and approved; outstanding clarifications documented
- ✅ **Requirements Testable**: All functional requirements (FR-001–018) are observable and verifiable
- ✅ **Traceability Mapped**: All 11 child Linear issues and parent (TOA-269) mapped to requirements
- ✅ **Scope Boundaries Clear**: Definition phase distinguished from implementation (TOA-284/285/286 separate)
- ⏳ **Critical Clarifications Pending**: 3 owner decisions required before Phase 1 design can proceed:
- Q1: Approved storage provider choice or evaluation-first approval
- Q2: Recoverable asset count and print-quality baseline
- Q3: Implementation sequencing and blocker logic

**Gate Outcome**:

- ✅ Specification ready for Phase 0 research
- ⏳ Phase 0 research must resolve Q1, Q2, Q3 before proceeding to Phase 1 design
- **ERROR if Phase 0 completes without resolving clarifications**: Phase 1 design blocked until owner provides answers

---

## Project Structure

### Documentation (this feature)

**Feature Definition Documents** (location: `.github/specs/002-media-library/`):

```text
.github/specs/002-media-library/
├── spec.md                          # Feature specification (✅ COMPLETE)
├── checklists/
│   └── requirements.md              # Quality validation checklist (✅ COMPLETE)
├── plan.md                          # This file (IN PROGRESS)
├── research.md                      # Phase 0 output (✅ COMPLETE — All clarifications resolved)
├── data-model.md                    # Phase 1 output (TO BE CREATED)
├── quickstart.md                    # Phase 1 output (TO BE CREATED)
├── contracts/                       # Phase 1 output (TO BE CREATED)
│   ├── catalogue-schema.json        # Asset catalogue schema contract
│   ├── provider-evaluation.md       # Provider comparison framework
│   └── validation-checklist.md      # Quality gates and procedures
└── tasks.md # Phase 2 output (NOT created by /speckit.plan; created by
/speckit.tasks)

```text

### Deliverables by Phase

**Definition/Validation Phase** (this plan):

| Phase | Deliverable | Location | Purpose | Consumed By |
|---|---|---|---|---|
| **Phase 0** | `research.md` | `.github/specs/002-media-library/` | Resolve 3 clarifications (Q1, Q2, Q3); document decision rationale | Phase 1 design |
| **Phase 1** | `data-model.md` | `.github/specs/002-media-library/` | Asset and relationship entity definitions; metadata schema | TOA-283, TOA-277 |
| **Phase 1** | `contracts/catalogue-schema.json` | `.github/specs/002-media-library/contracts/` | JSON schema for asset metadata validation | TOA-284, TOA-285, storage provider |
| **Phase 1** | `contracts/provider-evaluation.md` | `.github/specs/002-media-library/contracts/` | Evaluation criteria matrix and decision framework | TOA-276 |
| **Phase 1** | `contracts/validation-checklist.md` | `.github/specs/002-media-library/contracts/` | Quality gates, visual comparison procedures, metadata checks | TOA-279, TOA-282 |
| **Phase 1** | `quickstart.md` | `.github/specs/002-media-library/` | Validation runbook and sample workflows | TOA-282, TOA-279 |

**Implementation Phase** (separate issues):

- TOA-284 (Configure Git LFS & Netlify) — Uses catalogue schema and provider choice from Phase 1
- TOA-285 (Image migration pipeline) — Uses catalogue schema, reference mappings and validation checklist from Phase 1
- TOA-286 (Operational handover) — Uses validation checklist and quickstart runbook from Phase 1

**No code repositories** or source directories are created in this phase. All
deliverables are specification documents, schemas and frameworks.

---

## Phase 0: Research — Resolve Critical Clarifications

**Purpose**: Transform 3 pending owner decisions into documented recommendations
and rationale.

**Input**: Specification with 3 unresolved questions (Q1, Q2, Q3).

**Output**: `research.md` with resolved clarifications, decision rationale and
implications for downstream work.

### Research Tasks

#### **Research Task 1: Provider Choice and Approval Status**

**Question**: Which storage provider is approved (GitHub + Netlify, Cloudinary,
alternative) or should evaluation precede approval?

**Scope**:

- Review audit PR #285 decision log (favours GitHub + Netlify)
- Review strategy report (recommends Cloudinary or defers)
- Review provider-comparison report (lists trade-offs)
- Identify contradictions and decision process

**Research Approach**:

- Compare free-tier vs. actual pricing and quotas for 2–3 providers
- Document integration complexity (build system, API, visual editing UI)
- Assess print-quality support per provider
- Recommend decision path: approve one provider OR approve TOA-276 evaluation-first approach

**Deliverable**: Provider recommendation section in `research.md`

**Impacts**:

- If approved: TOA-284 and TOA-285 can plan infrastructure and build integration
- If evaluation-first: TOA-276 becomes gating issue; TOA-284/285 dependent on TOA-276 completion

---

#### **Research Task 2: Asset Recovery Baseline**

**Question**: What is the realistic count of recoverable assets? What are
print-quality requirements?

**Scope**:

- Verify "12 pilot assets" and "56 total assets" figures from audit reports
- Assess Figma Make extraction capability against actual Figma files (if accessible)
- Identify manual-export gaps and effort estimates
- Define print-quality baseline (resolution, format, colour space) if print is a requirement

**Research Approach**:

- Run extraction pilot on a sample of Figma files (part of TOA-280 validation)
- Document what Figma Make recovered successfully vs. manual-export requirements
- Assess print suitability of recovered samples (resolution, format compatibility)
- Estimate recovery percentage (realistically ~60–80%, not 100%)
- Confirm print requirements or mark as aspirational

**Deliverable**: Asset recovery baseline section in `research.md`

**Impacts**:

- Informs success metrics (SC-001) and validation scope
- Determines provider evaluation baseline (print support required or optional)
- Affects effort estimation for TOA-282 validation

---

#### **Research Task 3: Implementation Sequencing**

**Question**: What is the intended sequence—is implementation blocked by
validation, or can phases overlap?

**Scope**:

- Clarify distinction between TOA-277 (define schema) and TOA-283 (finalise schema)
- Determine whether TOA-284/285 can start before TOA-282 validation completes
- Assess whether parallel work (e.g., infrastructure planning while validation continues) is acceptable

**Research Approach**:

- Map linear issue descriptions to intended blocker relationships
- Identify work that can proceed in parallel (e.g., TOA-280 extraction pilot parallel to TOA-277 schema definition)
- Document critical path: research → definition → validation → provider approval → infrastructure → migration
- Confirm owner's intention for schedule and risk tolerance

**Deliverable**: Implementation sequencing section in `research.md`

**Impacts**:

- Determines project schedule and blocker logic
- Affects team allocation and parallel work opportunities
- Influences risk (rework if validation finds schema issues) vs. speed (parallelise if acceptable)

---

## Phase 1: Design — Create Catalogue, Evaluation and Validation Contracts

**Prerequisites**: `research.md` complete with all 3 clarifications resolved.

**Purpose**: Define the schemas, frameworks and procedures that will guide asset
recovery, provider evaluation and validation.

**Output**:

- `data-model.md` — Entity definitions and metadata structure
- `contracts/catalogue-schema.json` — JSON schema for asset validation
- `contracts/provider-evaluation.md` — Provider comparison matrix and decision criteria
- `contracts/validation-checklist.md` — Quality gates and procedures
- `quickstart.md` — Validation runbook and sample workflows

### Design Task 1: Asset Catalogue Data Model

**Input**: Specification entities (Asset, AssetRelationship, StorageProvider,
ValidationResult).

**Scope**:

- Define Asset entity: asset*id, original/derivative flag, provenance, format, dimensions, print*suitability, usages, metadata (alt*text, caption, credits, rights*notes), recovery*status, recovery*method, timestamps
- Define AssetRelationship entity: source/target asset IDs, relationship_type, notes
- Define StorageProvider entity: name, cost_model, formats, performance, print support, API availability
- Define ValidationResult entity: asset*id, check*type, status, severity, details, recovery_notes
- Document validation rules (e.g., no fabrication of unknown metadata, asset ID uniqueness, reference integrity)
- Specify state transitions if applicable (e.g., recovered → validated → approved → published)

**Deliverable**: `data-model.md` — Entity definitions, attributes,
relationships, validation rules, state machine

---

### Design Task 2: Catalogue Schema Contract

**Input**: Data model; JSON Schema best practices; provider storage constraints.

**Scope**:

- Translate data model into JSON Schema format (industry standard for validation)
- Define required fields (asset_id, original/derivative, format, dimensions) vs. optional (credits, rights if unknown)
- Define field types, formats, ranges, enums (e.g., format: [PNG, SVG, JPEG, PDF])
- Add validation constraints (e.g., minLength, pattern for asset IDs; enum values for status)
- Include examples (1–2 sample asset records)
- Document how schema enforces non-invention rule (mark unknown data as null or "unknown", not fabricated)

**Deliverable**: `contracts/catalogue-schema.json` — JSON Schema with examples,
validation rules, documentation

---

### Design Task 3: Provider Evaluation Framework

**Input**: Specification requirements; research findings on providers;
evaluation criteria from spec.

**Scope**:

- Define evaluation criteria: cost model, asset limit, supported formats, max file size, API availability, visual editing UI, batch processing, print quality, concurrent users, integration complexity
- Create comparison matrix template (providers × criteria)
- Document scoring/weighting (e.g., critical criteria: print support, format flexibility; nice-to-have: visual editing UI)
- Include decision framework (e.g., "must support PNG/SVG"; "must handle 56+ assets"; "integration complexity <40 hours")
- Reference research findings (pricing, provider capabilities, print support assessment)

**Deliverable**: `contracts/provider-evaluation.md` — Evaluation criteria,
comparison matrix, decision framework, scoring guidance

---

### Design Task 4: Validation Checklist and Procedures

**Input**: Specification validation requirements (FR-014–016); recovery
findings.

**Scope**:

- Define validation checks: visual comparison (recovered vs. original website and Figma), broken-reference detection, metadata completeness, format validation, print-quality assessment
- Create checklist template with checkboxes and guidance for each check type
- Document procedures: how to perform visual comparison (tools, criteria for acceptance), how to detect broken references (link scanning, asset ID verification), how to assess metadata completeness (required vs. optional fields), how to test print quality
- Define severity levels (critical: missing asset or broken reference; high: missing metadata; low: minor visual degradation)
- Include escalation procedures (who to notify if validation fails, approval process for known gaps)

**Deliverable**: `contracts/validation-checklist.md` — Checks, procedures,
severity levels, escalation

---

### Design Task 5: Quickstart Validation Runbook

**Input**: Validation checklist; data model; sample recovered assets (from
pilot).

**Scope**:

- Create step-by-step validation guide for a batch of recovered assets
- Include prerequisites (asset catalogue file, original website, original Figma files, comparison tools)
- Document how to run each check type (visual comparison command, reference verification script, metadata validation query)
- Include expected outcomes for passing/failing checks
- Document troubleshooting (e.g., "visual comparison fails: possible format degradation, escalate to team lead")
- Provide sample results (1–2 example asset validation runs)

**Deliverable**: `quickstart.md` — Runbook, prerequisites, procedures, expected
outcomes, sample runs, troubleshooting

---

### Gate Re-Evaluation (Post-Phase 1 Design)

After Phase 1 design completes, re-check gates:

- ✅ **Data Model Aligns with Spec**: All entities from spec are defined with complete attributes and relationships
- ✅ **Catalogue Schema is Testable**: Schema can validate sample assets; examples provided
- ✅ **Provider Evaluation is Objective**: Criteria are testable; weighting or decision logic is clear
- ✅ **Validation Procedures are Executable**: Each check can be performed by a human or tool; expected outcomes are defined
- ✅ **Downstream Issues Can Proceed**: TOA-276 has evaluation framework; TOA-277/283 have schema; TOA-279 has validation procedures; TOA-284/285 have inputs

**ERROR Condition**: If Phase 1 design reveals that research did not adequately
resolve a clarification, halt and return to Phase 0 to get additional owner
input.

---

## Complexity Tracking

| Decision Point | Complexity | Why Critical | Owner Sign-Off |
|---|---|---|---|
| Q1: Provider Choice | MEDIUM | Drives infrastructure (TOA-284) and build integration (TOA-285) architecture | YES — must decide or approve evaluation-first |
| Q2: Asset Recovery Baseline | MEDIUM | Informs success metrics, validation scope, effort estimation | YES — must confirm realistic targets |
| Q3: Implementation Sequencing | MEDIUM | Determines project schedule, blocker logic, risk tolerance for parallel work | YES — must clarify definition→validate→implement flow |

**Complexity Justification**: These are decision complexities, not
implementation complexities. No code is being written, no infrastructure is
being set up, and no unjustified architectural choices are being made. The
definition and validation workflow is appropriate in scope and effort for the
feature's requirements.

---

## Execution Summary

| Phase | Duration | Inputs | Outputs | Gate |
|---|---|---|---|---|
| **Phase 0 (Research)** | 2–3 days | Spec with 3 clarifications | `research.md` with decisions resolved | Clarifications resolved; owner confirms answers |
| **Phase 1 (Design)** | 3–5 days | `research.md`; spec data entities | `data-model.md`, `contracts/*`, `quickstart.md` | All downstream issues have inputs; gates re-checked |
| **Phase 2 (Tasks)** | Separate | Phase 1 design outputs | `tasks.md` with actionable tasks | /speckit.tasks command (NOT part of this plan) |

**Next Command**: After Phase 0 and Phase 1 complete, run `/speckit-tasks` to
decompose design into actionable implementation tasks for each Linear issue.

**Critical Path**: Q1, Q2, Q3 → research.md → data-model.md →
catalogue-schema.json → TOA-277/283 → TOA-282/279 → TOA-284/285

---

**Plan Version**: 1.0-draft | **Created**: 2026-10-17 | **Status**: Ready for
Phase 0 research execution

## Complexity Tracking (1)

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
