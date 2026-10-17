# Feature Specification: TOA Media Library Strategy and Asset Recovery

**Feature Branch**: `002-media-library`

**Created**: 2026-10-17

**Status**: Draft — Awaiting clarifications on critical decisions

**Input**: User request: "Draft the TOA media-library specification using GitHub Spec Kit. Repository: lightspeedwp/ThisOneTimeOnAcidCom. Requested feature prefix: 002. Proposed feature name: 002-media-library"

---

## Overview

This specification defines the strategy for recovering, cataloguing and managing website assets (images, vectors, branded materials) to support both website delivery and future book publishing pipelines. The feature encompasses asset discovery, metadata capture, provider evaluation and operational handoff — but explicitly excludes implementation details such as responsive-image processing, build integration or deployment.

**Scope Boundary**: This specification covers the *definition phase* (requirements, catalogue schema, evaluation criteria, validation approach). *Implementation* (provider selection approval, infrastructure setup, migration pipelines, operational runbooks) follows in separate Linear issues.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Asset Recovery and Catalogue (Priority: P1)

As a website maintainer, I need to discover, recover and document all original website assets (Figma artwork, images, brand materials) with stable identifiers, provenance and usage metadata so that I can understand what exists, track print-suitability and plan recovery before committing to a provider or migration approach.

**Why this priority**: Asset discovery is the foundation. Without recovered originals and verified metadata, downstream decisions about storage, provider, format support and migration strategy cannot be made reliably.

**Independent Test**: Can be fully tested by running the Figma Make extraction pilot (TOA-280 scope) and validating recovered asset quality and metadata against the catalogue schema (TOA-282, TOA-283 scope). Delivers: a verified sample of recovered assets with catalogue entries, proving extraction fidelity and schema coverage.

**Acceptance Scenarios**:

1. **Given** original Figma artwork exists and Figma Make extraction is authenticated, **When** the pilot extraction runs, **Then** sample assets are recovered with dimensions, format, provenance and verified-complete metadata.
2. **Given** recovered assets exist, **When** manual export gaps are identified, **Then** limitations are documented for handoff to later migration planning.
3. **Given** recovered assets exist, **When** the catalogue schema is applied, **Then** all fields required by TOA-277 (asset ID, provenance, original/derivative flag, usage rights, print suitability) are populated or marked as unknown/unrecoverable.

---

### User Story 2 — Catalogue Schema and Provenance Model (Priority: P1)

As a content owner, I need a clearly defined schema describing what metadata is captured for each asset (asset ID, provenance, format, dimensions, original vs. derivative status, usage rights, alt text, captions, print-quality assessment) so that I can apply it consistently, track recovery completeness and hand off to a storage provider with confidence.

**Why this priority**: The catalogue schema *defines the contract* between recovery, storage and publishing workflows. Without it, metadata capture is inconsistent and later reference migration becomes unreliable.

**Independent Test**: Can be fully tested by applying the finalised schema to a batch of recovered assets (from the pilot, or manually exported assets) and verifying all fields are populated or marked as unknown. Delivers: a validated schema that works with recovered asset samples.

**Acceptance Scenarios**:

1. **Given** TOA-277 defines catalogue fields, **When** the schema is applied to 12 pilot assets, **Then** all mandatory fields are populated or marked as unrecoverable/unknown without data invention.
2. **Given** the schema includes provenance tracking, **When** asset relationships (original → derivative, asset → usage) are mapped, **Then** dependencies are clear and no circular references exist.
3. **Given** the schema includes rights and credits, **When** incomplete metadata is identified, **Then** gaps are flagged and no missing information is fabricated.

---

### User Story 3 — Provider and Workflow Evaluation (Priority: P2)

As a project planner, I need to evaluate media storage providers (GitHub + Netlify, Cloudinary, or alternatives) against defined criteria (cost, asset limits, integration complexity, editing workflows, print-quality support) using representative recovery findings so that I can recommend a provider and publishing workflow with evidence, not assumptions.

**Why this priority**: Provider choice has long-term consequences for cost, maintenance and capability. Evaluation must be based on real recovery findings and workflow testing, not free-tier assumptions or vendor marketing.

**Independent Test**: Can be fully tested by documenting criteria, running representative workflows against 2–3 shortlisted providers, and generating a comparison matrix. Delivers: a provider evaluation report with recommendations.

**Acceptance Scenarios**:

1. **Given** TOA-276 defines evaluation criteria, **When** representative recovered assets are tested against shortlisted providers, **Then** real-world upload, tagging, retrieval and visual-editing workflows are documented.
2. **Given** providers are evaluated, **When** cost, storage limits and concurrent-user support are verified against actual pricing (not free-tier assumptions), **Then** hidden costs or limitations are surfaced.
3. **Given** providers support different formats, **When** print-quality requirements are assessed, **Then** provider suitability for print workflows is documented (not assumed).

---

### User Story 4 — Validation and Handoff (Priority: P2)

As a project lead, I need a defined validation approach (visual comparison, broken-reference detection, metadata completeness checks) and operational publishing guidance so that recovered assets are verified before migration, and the team has a runbook for ongoing maintenance after go-live.

**Why this priority**: Validation confirms recovery quality. Without it, bad data propagates into the live site or book pipeline.

**Independent Test**: Can be fully tested by running validation checks on recovered assets and generating sample operational runbooks. Delivers: a validation checklist and draft operational guide.

**Acceptance Scenarios**:

1. **Given** recovered assets and their metadata exist, **When** visual comparison is performed against the original website and original Figma files, **Then** missing or degraded assets are identified.
2. **Given** reference mappings are defined (old → new asset IDs), **When** broken-reference detection runs, **Then** all internal website links point to valid new asset IDs.
3. **Given** the migration is complete, **When** the operational runbook is executed, **Then** the team can perform common tasks (add asset, tag, publish, recover from backup) without ambiguity.

---

### User Story 5 — Figma Extraction Capability and Limitations (Priority: P3)

As a technical lead, I need to understand Figma Make's asset-extraction capabilities and limitations (authenticated access, extraction fidelity, supported formats, performance at scale) so that I can plan recovery workflows and estimate manual-export effort.

**Why this priority**: Figma Make automation reduces manual effort, but understanding its constraints is essential for realistic planning.

**Independent Test**: Can be fully tested by running the pilot extraction (TOA-280), documenting what was recovered successfully and what required manual export, and validating the reusability of extraction skills/agents for wider deployment.

**Acceptance Scenarios**:

1. **Given** authenticated Figma Make access is available, **When** the extraction pilot runs, **Then** extraction succeeds and fidelity is verified (no corruption, formats preserved, metadata intact).
2. **Given** extraction completes, **When** manual gaps are identified (e.g., assets that Figma Make cannot extract), **Then** manual-export approach and effort are documented.
3. **Given** pilot extraction succeeds, **When** reusable skills or agent prompts are tested against new Figma files, **Then** extraction consistency and error handling are assessed.

---

### Edge Cases

- What happens when an asset's original provenance is unknown or unrecoverable?
- How does the system handle assets marked for print but missing high-resolution originals?
- What is the recovery plan if Figma Make extraction fails mid-batch?
- How are retired or deprecated assets marked in the catalogue?
- How does the team handle rights/credits disputes during recovery?

---

## Requirements *(mandatory)*

### Functional Requirements

#### Asset Recovery and Inventory

- **FR-001**: System MUST support authenticated extraction of artwork from Figma Make files without modifying source files (read-only extraction).
- **FR-002**: System MUST catalogue recovered assets with unique stable identifiers (independent of storage provider or file path).
- **FR-003**: Recovery workflow MUST distinguish original artwork from rendered derivatives and variant formats.
- **FR-004**: Recovery workflow MUST capture or infer print-suitability assessment (original resolution, format compatibility with print workflows).
- **FR-005**: Recovery process MUST document unrecoverable assets and manual-export gaps for handoff.

#### Metadata and Catalogue

- **FR-006**: Catalogue schema MUST define and enforce fields for: asset ID, original/derivative status, provenance, dimensions, format(s), usage context(s), alt text, captions, credits/rights, print-suitability flag.
- **FR-007**: Catalogue MUST support asset relationships (original ↔ derivative, asset ↔ published usage) without data fabrication when relationships are unknown.
- **FR-008**: Catalogue MUST enforce: do not invent missing credits, rights or source identifiers; mark unknown/unverified data explicitly.
- **FR-009**: Catalogue storage location MUST be defined and validated for accessibility and durability (candidate: Git-tracked JSON, separate database, or provider-native tagging).

#### Provider Evaluation and Workflow

- **FR-010**: Evaluation workflow MUST compare candidate providers against defined criteria using representative recovered assets (not free-tier assumptions).
- **FR-011**: Provider assessment MUST validate cost, storage limits, concurrent-user support and editing-workflow integration with real-world testing.
- **FR-012**: Assessment MUST distinguish provider evaluation from provider approval (evaluation informs recommendation; approval is a separate decision).
- **FR-013**: Assessment MUST document print-quality support (file formats, resolution limits, batch processing) per provider.

#### Validation and Handoff

- **FR-014**: Validation workflow MUST include visual comparison (recovered vs. original website and Figma) and broken-reference detection.
- **FR-015**: Validation MUST verify catalogue metadata completeness before migration begins.
- **FR-016**: Operational handoff MUST include a runbook for common tasks: add asset, tag asset, publish, recover from backup, retire asset.
- **FR-017**: Operational guidance MUST document maintenance procedures and escalation paths for asset-related issues.

#### Boundaries and Exclusions

- **FR-018**: This specification covers *definition* of catalogue schema, evaluation criteria and validation approach. **[NOT INCLUDED]**: implementation of responsive-image processing, build-system integration, automated migration pipeline execution, or storage-provider infrastructure setup (those are implementation issues TOA-284, TOA-285, TOA-286).

---

### Key Entities

#### Asset

Represents a single recoverable media item (image, vector, design file, branded material).

**Attributes**:
- `asset_id`: Unique stable identifier, independent of storage provider
- `original_or_derivative`: "original" | "derivative" | "variant"
- `provenance`: Source (e.g., "Figma file X, page Y"; "exported from Z"; "manual upload")
- `format`: File format(s) (PNG, SVG, JPEG, PDF, etc.)
- `dimensions`: Width × height (pixels for digital, also note print-capable resolution)
- `print_suitable`: Boolean; notes on print resolution/format compatibility
- `usages`: Array of contexts where this asset is used (e.g., website hero, book cover, social media)
- `alt_text`: Accessibility description
- `caption`: Human-readable label
- `credits`: Creator/artist/source attribution
- `rights_notes`: Licencing, usage restrictions, or verification status
- `recovery_status`: "recovered" | "partial" | "manual_export_required" | "unrecoverable"
- `recovery_method`: How it was obtained (Figma extraction, manual export, archive, etc.)
- `created_at`: When catalogued
- `updated_at`: Last modified

#### AssetRelationship

Captures relationships between assets (original ↔ derivative, asset ↔ published usage).

**Attributes**:
- `source_asset_id`: Asset that is the origin
- `target_asset_id`: Asset that derives from or uses the source
- `relationship_type`: "derived_from" | "variant_of" | "used_in" | "replaced_by"
- `notes`: Additional context (e.g., format change, scaling notes)

#### StorageProvider

Candidate for asset storage and visual editing.

**Attributes**:
- `name`: Provider name (GitHub + Netlify, Cloudinary, etc.)
- `asset_limit`: Maximum assets or storage quota
- `cost_model`: Free, per-asset, per-month, tiered, etc.
- `formats_supported`: List of file formats
- `max_file_size`: Largest single asset supported
- `api_available`: Boolean; API documentation URL
- `visual_editing_ui`: Boolean; description if available
- `batch_processing`: Boolean; batch upload/export capability
- `print_quality_notes`: Format support for print workflows
- `concurrent_users`: Simultaneous editor limit or undefined
- `integration_complexity`: Estimated effort to integrate with build/publish pipeline

#### ValidationResult

Captures findings from validation runs.

**Attributes**:
- `asset_id`: Asset checked
- `check_type`: "visual_comparison" | "broken_reference" | "metadata_completeness" | "format_validation"
- `status`: "pass" | "fail" | "partial" | "unverifiable"
- `details`: Specific finding (e.g., "visual degradation in JPG conversion"; "alt text missing")
- `severity`: "critical" | "high" | "low"
- `recovery_note`: Any impact on recovery status

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 40–50 of 56 recoverable original assets are identified and catalogued with complete metadata (asset ID, format, provenance, print suitability, usage); unrecoverable assets are documented with recovery method attempted and reason unrecoverable.
- **SC-002**: Catalogue schema is validated against a minimum of 12 pilot assets and confirmed to capture all required fields without data fabrication for unknown/missing provenance.
- **SC-003**: Provider evaluation report includes real-world workflow testing (upload, tag, retrieve, edit) for at least 2 shortlisted providers using representative recovered assets, with documented cost, limits and print-quality support.
- **SC-004**: Validation approach (visual comparison, broken-reference detection, metadata checks) is defined and tested against recovered assets, with a sample operational runbook delivered.
- **SC-005**: Figma Make extraction capabilities are documented, including fidelity, supported formats, performance and manual-export gaps, with reusable skills/prompts for wider recovery deployment validated.
- **SC-006**: Specification document includes requirement-to-issue traceability mapping all 11 child issues and distinguishes definition work from implementation work.
- **SC-007**: All clarification questions critical to downstream decisions are answered or explicitly preserved as unresolved for owner confirmation.

---

## Assumptions

- **Figma Access**: Figma Make authentication and API access are available or can be configured without delays.
- **Asset Recover ability**: A significant portion of original artwork is recoverable via Figma Make or manual export within reasonable effort.
- **Provider Choice Pending**: Storage provider (GitHub + Netlify, Cloudinary, or alternative) remains unresolved; evaluation precedes approval.
- **Print Requirements Exist**: "Print suitability" is a real requirement (e.g., for book publishing); if digital-only, print assessment is out of scope.
- **Naming Convention**: Asset IDs are independent of storage provider to support future migration if needed.
- **Non-Invention Rule**: Missing metadata (credits, rights, provenance) will not be inferred or fabricated; marked as "unknown" or "unrecoverable".
- **Existing References Preserved**: Original Figma file references are kept intact until recovered assets and replacement mappings are verified and approved.
- **Sequential Implementation**: Recovery is performed and validated *before* selecting a provider and designing migration/build integration.

---

## Clarification Questions — CRITICAL DECISIONS REQUIRED

These questions must be answered to resolve specification ambiguities that impact downstream work. Recommended answers are provided; owner confirmation is required.

### **Question 1: Approved Storage Provider and Visual Editing Workflow**

**Context**: Audit PR #285 and its decision log favour GitHub + Netlify, but the strategy report and provider-comparison reports recommend Cloudinary or leave the choice open. This contradiction creates uncertainty for downstream work (TOA-284, TOA-285).

**What we need to know**: Which storage provider and visual editing/tagging workflow are approved or pre-approved for planning purposes? (This does NOT close TOA-276 evaluation; it informs estimation and dependencies.)

**Suggested Answers**:

| Option | Decision | Implications |
|--------|----------|--------------|
| A | Approve GitHub + Netlify (per audit decision log) as working assumption for planning | TOA-284 and TOA-285 can assume Git LFS, Netlify build integration, static hosting constraints |
| B | Approve Cloudinary (per strategy and provider-comparison reports) as working assumption | TOA-284 and TOA-285 must plan for Cloudinary API, hosted editing UI, CDN delivery |
| C | Defer provider choice; proceed with evaluation per TOA-276 and recommend later | TOA-284 and TOA-285 remain blocked until TOA-276 completes; recovery and catalogue work proceed independently |
| Custom | [Specify alternative provider or decision process] | [Impacts on downstream issues] |

**Your choice**: **Option A** ✅ RESOLVED
- Decision: Approve GitHub + Netlify as working assumption for planning
- Rationale: Audit PR #285 decision log supports this approach; aligns with existing Netlify deployment; enables Git LFS integration for binary asset management
- Implications: TOA-284 and TOA-285 can plan infrastructure around Git LFS quotas, Netlify deployment, and static hosting strategy

---

### **Question 2: Recoverable Asset Count and Print-Quality Baseline**

**Context**: Audit and pilot reports mention "12 pilot assets" and "56 total assets", but these figures are cited as claims, not verified. Print-quality requirements (resolution, format support) are stated as constraints but not defined.

**What we need to know**: What is the realistic count of recoverable originals (out of 56 total)? What are the minimum print-quality requirements (resolution, format, colour space)?

**Suggested Answers**:

| Option | Decision | Implications |
|--------|----------|--------------|
| A | 40–50 of 56 assets are recoverable as high-quality originals; print requires 300 DPI, RGB/CMYK, PNG/PDF | Extraction and validation can assume high recovery rate; provider must support print formats |
| B | ~30 of 56 assets are recoverable; many exist only as low-resolution web renderings; print is aspirational, not requirement | Recovery effort increases for manual export; provider choice less constrained by print support |
| C | Recovery percentage is unknown; define success as "recover what is possible, document what is not" and assess print suitability after recovery | Recovery metrics are qualitative; validation focuses on quality, not quantity |
| Custom | [Specify expected recovery rate and print baseline] | [Impacts on effort estimation and provider evaluation] |

**Your choice**: **Option A** ✅ RESOLVED
- Decision: 40–50 of 56 assets recoverable as high-quality originals; print requires 300 DPI, RGB/CMYK, PNG/PDF
- Realistic Recovery Target: 40–50 assets (71–89% of 56 total) recoverable as high-quality originals
- Print-Quality Baseline: Minimum 300 DPI, RGB/CMYK colour space, PNG or PDF format support
- Print Requirement Status: Essential for MVP (primary use case supports book publishing)

---

### **Question 3: Boundaries Between Definition, Validation and Implementation Phases**

**Context**: Seven issues (TOA-276, TOA-277, TOA-278, TOA-279, TOA-280, TOA-282, TOA-8) address definition and validation. Four issues (TOA-283, TOA-284, TOA-285, TOA-286) address implementation. There is known overlap (e.g., TOA-277 "define schema" vs. TOA-283 "finalise schema"). Linear issue descriptions do not clarify blocker relationships; only "related" links exist.

**What we need to know**: What is the intended sequence? Does TOA-283 (finalise schema) supersede TOA-277 (define schema), or are they distinct phases (first definition, then validation, then finalisation)? Are TOA-284/285/286 explicitly blocked until TOA-282/283 complete?

**Suggested Answers**:

| Option | Decision | Implications |
|--------|----------|--------------|
| A | TOA-277 → TOA-282/283 → TOA-284/285/286; TOA-283 extends TOA-277 based on validation findings | Definition and validation are sequential; implementation begins only after validation complete |
| B | TOA-277 and TOA-283 are parallel (define now, refine later); TOA-284 can start before TOA-283 closes | Faster parallelisation; risk of rework if validation findings contradict TOA-277 |
| C | TOA-277 is complete specification; TOA-283 is implementation optimisation only; no blocker relationship | Implementation can start after TOA-277; TOA-283 is a refinement task, not a gate |
| Custom | [Specify intended dependencies] | [Impacts on project scheduling and blocker logic] |

**Your choice**: **Option B** ✅ RESOLVED
- Decision: Parallel execution with coordinated validation (Phase 0 → Phase 1 + Phase 2 parallel → Phase 3)
- Blocker Chain: Phase 0 (research + clarifications) blocks Phase 1 design; Phase 1 can run parallel with Phase 2 (validation); TOA-284/285 can begin planning during Phase 1
- Parallel Opportunities: TOA-277, TOA-280, TOA-276, TOA-282 run concurrently in Phase 1; TOA-284/285 infrastructure planning begins immediately after Q1 provider approval
- Rework Risk Mitigation: If TOA-282 validation finds schema issues, TOA-284/285 infrastructure work is provider-independent and continues; pipeline implementation may need refinement

---

## Requirement-to-Issue Traceability

### Definition Phase (this specification covers)

| Requirement | Linear Issue(s) | Relationship |
|---|---|---|
| **Recovery Requirements (FR-001–005)** | TOA-8, TOA-280, TOA-282 | TOA-8 initiates Figma artwork restoration (read-only); TOA-280 evaluates extraction capability; TOA-282 validates pilot recovery quality |
| **Catalogue Schema (FR-006–009)** | TOA-277, TOA-283 | TOA-277 defines initial schema; TOA-283 finalises schema based on validation findings |
| **Reference Migration Workflow (FR-002, FR-007, FR-014, FR-016)** | TOA-278 | Design deduplication, reference mappings, verification and rollback; follows catalogue schema and storage provider decisions |
| **Provider Evaluation (FR-010–013)** | TOA-276 | Evaluation workflow using representative recovered assets |
| **Validation Approach (FR-014–016)** | TOA-279, TOA-282 | TOA-279 defines validation and handoff; TOA-282 performs pilot validation |
| **Figma Capabilities Assessment (FR-001, FR-005)** | TOA-280 | Assesses extraction fidelity, limitations, reusable skills |

### Implementation Phase (NOT this specification)

| Requirement | Linear Issue(s) | Scope |
|---|---|---|
| **Provider Approval & Infrastructure** | TOA-284 | After TOA-276 evaluation and provider decision: Git LFS, Netlify config, storage quotas |
| **Build Integration & Pipeline** | TOA-285 | Responsive images, reference migration, build-system integration, deployment |
| **Operational Handover** | TOA-286 | Runbook, training, rollback procedures, sign-off |

### Related but Outside Scope

- **TOA-269** (parent): Outcome is media-library strategy; this specification addresses strategy definition, not execution.

---

## Contradictions and Unresolved Tensions

### 1. Provider Decision Uncertainty

**Evidence**: 
- Audit PR #285 decision log recommends GitHub + Netlify
- Strategy report recommends Cloudinary
- Provider comparison report lists trade-offs but no recommendation

**Impact**: Downstream issues (TOA-284, TOA-285) cannot plan infrastructure or build integration without knowing the approved provider.

**Resolution Required**: Owner to confirm approved provider or approve TOA-276 evaluation to proceed without a prior decision.

---

### 2. Asset Count and Recovery Baseline

**Evidence**:
- Audit reports cite "12 pilot assets" and "56 total assets"
- No verification of recovery percentage or actual asset inventory

**Impact**: Success metrics (SC-001) cannot be defined without a realistic recovery target.

**Resolution Required**: Verify actual asset count and document realistic recovery expectations before validation begins.

---

### 3. Print Quality Requirements

**Evidence**:
- Constraint states "assess print suitability"
- No definition of acceptable resolution, format or colour space
- Unknown whether print is essential or aspirational

**Impact**: Provider evaluation (TOA-276) and validation approach (TOA-279) cannot assess print readiness without baselines.

**Resolution Required**: Confirm print-quality requirements or explicitly mark them as "aspirational, not MVP".

---

### 4. Schema Definition vs. Finalisation

**Evidence**:
- TOA-277 "Define the asset catalogue and provenance model"
- TOA-283 "Finalise the asset catalogue schema"
- No description of when/why TOA-283 differs from TOA-277

**Impact**: Unclear whether TOA-283 extends TOA-277 or repeats it.

**Resolution Required**: Clarify intended scope difference (define initial vs. refine based on validation).

---

## Next Steps

### When Specification is Ready for Planning

Once the three clarification questions above are answered, proceed to:

1. **`/speckit-clarify`** — Document owner's answers and resolve any follow-up ambiguities
2. **`/speckit-plan`** — Generate implementation plan and research tasks
3. **`/speckit-tasks`** — Decompose into actionable tasks

### Do NOT Proceed Until

- [ ] Provider choice or evaluation approval is confirmed (Q1)
- [ ] Asset recovery target is verified (Q2)
- [ ] Implementation-phase sequencing is clarified (Q3)

---

## References

### Linear Issues

- **Parent**: [TOA-269 — Media library strategy and asset recovery](https://linear.app/lightspeedwp/issue/TOA-269)
- **TOA-8** — [Restore original Figma artwork](https://linear.app/lightspeedwp/issue/TOA-8)
- **TOA-276** — [Evaluate media storage and publishing workflows](https://linear.app/lightspeedwp/issue/TOA-276)
- **TOA-277** — [Define the asset catalogue and provenance model](https://linear.app/lightspeedwp/issue/TOA-277)
- **TOA-278** — [Design the import and reference-migration workflow](https://linear.app/lightspeedwp/issue/TOA-278)
- **TOA-279** — [Define media-library validation and handoff](https://linear.app/lightspeedwp/issue/TOA-279)
- **TOA-280** — [Evaluate Figma skills and agent-assisted asset recovery](https://linear.app/lightspeedwp/issue/TOA-280)
- **TOA-282** — [Validate recovered assets](https://linear.app/lightspeedwp/issue/TOA-282)
- **TOA-283** — [Finalise the asset catalogue schema](https://linear.app/lightspeedwp/issue/TOA-283)
- **TOA-284** — [Configure Git LFS and Netlify](https://linear.app/lightspeedwp/issue/TOA-284)
- **TOA-285** — [Implement the image migration pipeline](https://linear.app/lightspeedwp/issue/TOA-285)
- **TOA-286** — [Validate readiness and operational handover](https://linear.app/lightspeedwp/issue/TOA-286)

### Repository

- [AGENTS.md](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/develop/AGENTS.md)
- [CONTRIBUTING.md](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/develop/CONTRIBUTING.md)
- [guidelines/](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/tree/develop/guidelines)

### Audit Artefacts (PR #285, not yet merged)

- `.github/reports/toa-media-library/` (contains inventory, strategy report, provider comparison, decision log, pilot plan)

---

**Version**: 1.0-draft | **Created**: 2026-10-17 | **Status**: Awaiting clarifications Q1, Q2, Q3
