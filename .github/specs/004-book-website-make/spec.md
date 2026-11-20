# Feature Specification: Book Website Figma Make Prompt Pack

**Feature Branch**: `docs/book-website-make-spec`

**Created**: 2026-11-09

**Status**: ✅ Documentation complete; ✅ All 7 blocking decisions **RESOLVED** (2026-11-13). Execution gates remain:

- ✅ All blocking decisions approved with selected options documented
- ✅ Design baseline (Space Grotesk, Inter, 9-color palette) locked and approved
- ✅ Prompts 1, 2A, 2B ready for Phase A execution (design system export)
- ✅ Prompts 3A–3C handover to [Spec 005](../005-reader-access/spec.md) complete (not executed here)
- ⏳ Explicit authority to resume/begin Figma Make execution (Decision 7 Option A: noindex meta tags + sitemap exclusion verified in contracts)
- ⏳ Chapter publication: each chapter needs Ash's approval before it is published (Decision 5: Early release approved; build screens now)

**Input**: Complete staged Figma Make prompts for ThisOneTimeOnAcidCom book website, prepared as documentation-only package with exact previews for approval.

---

## Source Documents

All six authoritative source documents are available in the [`references/`](./references/) folder:

- **[01-book-website-specification.md](./references/01-book-website-specification.md)** — Master execution contract (v1.0.0)
- **[02-companion-session-plan.md](./references/02-companion-session-plan.md)** — Companion session plan (v1.0.4)
- **[03-author-decisions-launch-scope.md](./references/03-author-decisions-launch-scope.md)** — Author decisions and scope (v1.3.0)
- **[04-design-brief.md](./references/04-design-brief.md)** — Design brief and baseline (v1.1.2)
- **[05-design-reader-decision-register.md](./references/05-design-reader-decision-register.md)** — Decision register (v1.9.0)
- **[06-website-reading-prd.md](./references/06-website-reading-prd.md)** — Product requirements (v1.1.1)

---

## Gate 2 Readiness Review

**Status**: ⏳ Pending Gate 2 Approval (as of 2026-11-12)

All critical design baseline requirements have been verified and documented:

- **[GATE_2_READINESS_REPORT.md](./exports/GATE_2_READINESS_REPORT.md)** — Comprehensive technical readiness report (195 lines; all 4 critical fixes verified; design baseline locked)
- **[GATE_2_SIGN_OFF_SUMMARY.md](./exports/GATE_2_SIGN_OFF_SUMMARY.md)** — Executive approval summary for project owner (Ash); ready for sign-off
- **[PROMPT_EXECUTION_PLAN.md](./PROMPT_EXECUTION_PLAN.md)** — Phase A & B execution roadmap; 3 unblocked prompts ready, 3 blocked by decisions

**Gate 2 Approval Checklist**: See GATE_2_SIGN_OFF_SUMMARY.md for full approval criteria and timeline.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Design Specification Hand-off (Priority: P1)

**As** a product owner (Ash), **I want** complete, exact Figma Make prompts for the book website redesign **so that** design-system exports, navigation components, and reader-access forms can be generated consistently without implementation guesswork.

**Why this priority**: Design hand-off is the critical path blocker. Without documented design specifications, implementation cannot proceed reliably. This story establishes the authoritative design baseline across all visual components.

**Independent Test**: Can be tested by validating that each prompt:
- References approved design elements (Space Grotesk, Inter, 9-color palette)
- Specifies exact component names and states
- Preserves all approved design decisions
- Documents all unapproved candidates separately
- Includes acceptance criteria verifiable against generated Figma output

**Acceptance Scenarios**:

1. **Given** approved design baseline (typography, colors, both themes), **When** Prompt 2A is executed, **Then** both CSS variables and JSON design-token files are exported matching exact approved values

2. **Given** unapproved candidates R3, T1, RT2, C1, **When** Prompt 2A is executed, **Then** these candidates are NOT present in exported tokens

3. **Given** navigation specification (Speaking/Events/Media hidden from sitemap), **When** Prompt 1 is executed, **Then** updated navigation component includes only approved visible items

---

### User Story 2 - Reader Access Journey Definition — ✅ MOVED TO SPEC 005

⚠️ **Status Change (2026-11-13)**: Reader access specification and execution (User Story 2, Prompts 3A–3C) is now owned by **[Spec 005 — Reader Access](../005-reader-access/spec.md)**.

Spec 004 no longer executes reader-access work. Stage IDs 3A–3C remain documented here for historical reference and master-contract traceability, but their implementation is Spec 005's responsibility.

**Previous intention** (before handover):  
**As** a reader verification designer, **I want** exact copy, form wording, and error-state specifications for email-code verification **so that** the reader access journey can be implemented with consistent, approved messaging.

**Handoff notes**:
- Contracts remain available in `contracts/prompt-3a-reader-access.md`, `contracts/prompt-3b-recovery-flows.md`, `contracts/prompt-3c-error-states.md` for reference
- Decision mapping:
  - Email provider (Spec 004 Decision 4) → Spec 005 item 1
  - Manuscript status (Spec 004 Decision 5) → Spec 005 item 2
  - Code expiry (Spec 004 Decision 3) → Spec 005 item 3
  - Newsletter destination (Spec 004 Decision 6) → Spec 005 item 8
  - See [Spec 005 decisions](../005-reader-access/decisions.md) for full tracking
- Decision 7 (route enforcement) stays with Spec 004 design
- Timeline for Spec 005 completion documented in [Spec 005 spec](../005-reader-access/spec.md)

---

### User Story 3 - Implementation Readiness & Blocking Decisions (Priority: P2)

**As** a development lead, **I want** documented blocking decisions and prerequisites **so that** I can identify what must be decided before implementation can begin and what can proceed with placeholders.

**Why this priority**: Unresolved decisions block implementation. By documenting them explicitly, the team knows exactly what decisions gate development and can parallelize resolved work.

**Independent Test**: Can be tested by confirming:
- All blocking decisions are listed with options
- Each blocking item identifies what happens if it remains unresolved
- Resolved decisions are marked approved with dates/evidence
- Placeholders are identified for implementation phase
- Risk assessment addresses impact of each unresolved decision

**Acceptance Scenarios**:

1. **Given** recovery-first race (unresolved), **When** reviewing blocking matrix, **Then** Prompt 3B is marked as blocked with specific options A/B/C/D listed

2. **Given** email service provider unspecified, **When** reviewing deployment prerequisites, **Then** "BLOCKED until provider selected" appears in decision matrix

3. **Given** manuscript publication status unknown, **When** planning access-journey deployment, **Then** "Cannot publish reading access without confirmed manuscript" appears as prerequisite

---

### User Story 4 - Documentation-Only Workflow Completion (Priority: P1)

**As** a project coordinator, **I want** a complete documentation package ready for approval before any code, commits, or deployments occur **so that** all stakeholders can review and approve the entire plan before implementation begins.

**Why this priority**: Approval gates prevent rework. This user story ensures the documentation package is complete, reviewable, and ready for the approval workflow defined in 01-book-website-specification.md (Prompts 0–3C, stage gates, approval routing).

**Independent Test**: Can be tested by confirming:
- All six source files are analyzed and reconciled
- Source gaps and conflicts are documented
- Exact previews are generated for all four ready prompts (1, 2A, 2B, 3A)
- Blocked prompts (3B, 3C partial) explain their blocking conditions
- Complete blocking decision matrix is provided
- Package is submitted for user approval with no implementation performed

**Acceptance Scenarios**:

1. **Given** all six source files, **When** preflight analysis is complete, **Then** version differences are documented with material-effect assessment

2. **Given** Prompt 1 specification, **When** exact preview is generated, **Then** it includes before/after navigation structure, acceptance criteria, and non-changes

3. **Given** unresolved recovery decisions, **When** Prompt 3B preview is generated, **Then** it is marked "BLOCKED" with three prerequisite decisions listed

---

### Edge Cases

- **What happens if a blocking decision remains unresolved after user review?** The corresponding prompt cannot be executed; documentation package notes the decision for future phases.
- **How does system handle version mismatches between source files?** All mismatches are documented separately in "Material Version Differences" section with reconciliation notes.
- **What if the Figma Make environment is not ready?** Entire Prompt 2A is blocked; design-system confirmation cannot proceed until Make environment is available.
- **How are unapproved design candidates preserved?** All candidates (R3, T1, RT2, C1) are listed separately from approved baseline, with explicit non-approval notation.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST analyze all six source specification files from `.github/specs/004-book-website-make/references/` directory and identify version differences, gaps, and conflicts
- **FR-002**: System MUST reconcile version mismatches (02 v1.0.3→v1.0.4, 03 v1.2.2→v1.3.0, 05 v1.7.0→v1.9.0) using precedence rule: newer version takes precedence; all conflicts documented in research.md with explicit rationale
- **FR-003**: System MUST prepare exact Prompt 1 (navigation exposure) as executable Figma Make specification with before/after structure and acceptance criteria
- **FR-004**: System MUST prepare exact Prompts 2A (design baseline), 2B (navigation design), and 3A (reader access copy) as complete, unexecuted specifications
- **FR-005**: System MUST identify and document Prompts 3B (recovery flows) and 3C (error states) as blocked, listing prerequisite decisions for each
- **FR-006**: System MUST create comprehensive blocking decision matrix identifying all 7 critical gaps: recovery-first race condition, recovery lifetime eligibility, code expiry start time, email service provider selection, manuscript publication readiness, newsletter destination, and route enforcement verification
- **FR-007**: System MUST preserve all approval boundaries, distinguishing approved elements (navigation intent, design baseline, access policy framework) from unapproved candidates (R3, T1, RT2, C1)
- **FR-008**: System MUST document all user-editable decisions required before each prompt can be executed (recovery-first race, recovery lifetime, code expiry start time, manuscript status, email provider, newsletter destination)
- **FR-009**: System MUST generate specification documentation that is completely implementation-agnostic (no code, no commits, no deployments, no file writes beyond this spec folder)
- **FR-010**: System MUST prepare the complete documentation package for explicit user approval before any implementation workflow can proceed

### Key Entities

- **Specification File**: One of six source files (01–06) in `.github/specs/004-book-website-make/references/` directory; has version, approval status, content sections, and cross-references to Linear issues
- **Design Baseline**: Approved set of typography (Space Grotesk/Inter), colors (9-named-palette, both themes), component styles, and theme states
- **Design Candidate**: Unapproved design proposal (R3 responsive typography, T1 additional typography, RT2 reader controls, C1 continuity) with full specification but no approval
- **Blocking Decision**: Unresolved choice that prevents one or more prompts from being executed (recovery-first race, recovery lifetime, code expiry timing, etc.)
- **Figma Make Prompt**: Executable specification for Figma Make, staged 0–3C with approval gates between stages; Prompts 1, 2A, 2B, 3A are unblocked; Prompts 3B, 3C partial are blocked
- **Preflight Analysis**: Complete inventory of source state, gaps, conflicts, approved/unapproved boundaries, and exact previews ready for user approval

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All six source files are retrieved and analyzed; version reconciliation is documented with zero silent merges (100% reconciliation coverage)
- **SC-002**: Exact Prompt 1 preview includes all four elements: before/after navigation structure, numbered list of implementation steps (file/component changes), acceptance criteria, and 2–3 bullet points describing non-changes
- **SC-003**: Exact Prompts 2A, 2B, 3A are 95%+ complete specifications (missing only user decisions on blocked prerequisites, not missing core content); Prompt 2A exports both CSS variables (`.css` with custom properties) and JSON design tokens for full design-system coverage
- **SC-004**: All blocking decisions are identified and presented with specific options (3+ options per decision with impact assessment) before user approval
- **SC-005**: Zero implementation code generated; zero commits created; zero deployments executed; 100% documentation-only until explicit user approval for implementation phase
- **SC-006**: Complete documentation package includes blocking decision matrix, source inventory, version reconciliation, and decision-routing plan
- **SC-007**: All approval boundaries are explicitly marked (approved ✓, unapproved candidates ~, unresolved decisions ❌) with no ambiguous items
- **SC-008**: User can read and understand all prompt previews without requiring code execution, designer interaction, or system testing

---

## Assumptions

- **User Context**: Ash (project owner) and development team will review and approve this documentation package before any implementation proceeds
- **Source Files**: All six specification files (01–06) in `.github/specs/004-book-website-make/references/` directory are authoritative and will not change during this preflight phase
- **Design Baseline Approval**: Space Grotesk headings, Inter body/UI, 9-color palette (both themes) are locked and require no changes during preflight
- **Blocking Decisions**: ✅ ALL 7 decisions **RESOLVED** (2026-11-13):
  - Recovery-first race: **Option A** (Recovery takes precedence)
  - Recovery lifetime: **Option A** (30-day absolute expiry + session refresh)
  - Code expiry start: **Option A** (From code generation)
  - Email provider: **Hybrid** (SendGrid transactional + Brevo newsletter)
  - Manuscript readiness: **Early release** (Build screens now; chapters as approved)
  - Newsletter destination: **Brevo** (External signup link)
  - Route enforcement: **Option A** (Noindex meta tags + sitemap exclusion)
- **Implementation Timing**: This spec prepares documentation only; no actual implementation, Figma Make execution, or deployment occurs until separate approval
- **Figma Make Environment**: Make environment exists and is operational; prompts can be executed once unblocked and approved (readiness verification deferred to implementation phase)
- **Newsletter Integration**: Newsletter service (Brevo or alternative) will be selected separately; copy and mechanics are placeholders in this spec
- **Reader Access Provider**: Email service and manuscript-delivery mechanism will be confirmed separately; specifications reference generic "email service" and "verified access" without provider detail

---

## Specification Notes

### Source Reference

This specification is derived from comprehensive analysis of:

1. `.github/specs/004-book-website-make/references/01-book-website-specification.md` (v1.0.0) — Master execution contract
2. `.github/specs/004-book-website-make/references/02-companion-session-plan.md` (v1.0.4) — Preparation queue
3. `.github/specs/004-book-website-make/references/03-author-decisions-launch-scope.md` (v1.3.0) — Author decisions & scope
4. `.github/specs/004-book-website-make/references/04-design-brief.md` (v1.1.2) — Design requirements & baseline
5. `.github/specs/004-book-website-make/references/05-design-reader-decision-register.md` (v1.9.0) — Design tracking & candidates
6. `.github/specs/004-book-website-make/references/06-website-reading-prd.md` (v1.1.1) — Product requirements & access policy

### Cross-References

- Linear Issues: TOA-446, TOA-445, TOA-441, TOA-309, TOA-310, TOA-311, TOA-90, TOA-420
- Project Scope: ThisOneTimeOnAcidCom (lightspeedwp/ThisOneTimeOnAcidCom)
- Repository Branch: `docs/book-website-make-spec`
- Approval Gate: /speckit-clarify (if clarifications needed) → /speckit-plan (after approval)

### Deliverables for This Spec

**Scope Clarification (2026-11-19)**: Spec 004 covers **Prompts 1–2B only** (design baseline & navigation). Reader-access work (Prompts 3A–3C) is owned by [Spec 005 — reader access](../005-reader-access/spec.md).

Once approved, Phase A will include:

1. **Prompt 1 Exact Preview** — Navigation exposure (Speaking/Events/Media hidden)
2. **Prompt 2A Exact Preview** — Design-system baseline confirmation
3. **Prompt 2B Exact Preview** — Navigation component design spec
4. **Blocking Decision Matrix** — All 7 decisions APPROVED with implementation rationale
5. **Implementation Prerequisites Checklist** — Figma Make environment readiness & Phase A gate conditions

---

## Blocking Decisions — Approved (2026-11-11)

**Status**: ✅ All 7 blocking decisions approved by product owner (Ash)

| # | Decision | Resolution | Execution Impact |
| --- | ---------- | ----------- | --- |
| 1 | Recovery-first race condition | Option A: Recovery takes precedence | Decision resolved for Prompt 3B (execution deferred — manuscript gate) |
| 2 | Recovery lifetime eligibility | Option A: session refresh on recovery; absolute expiry 30 days after initial verification | Decision resolved for Prompt 3B (execution deferred — manuscript gate) |
| 3 | Code expiry start time | Option A: From code generation | Decision resolved for Prompts 3A, 3C (execution deferred — manuscript gate) |
| 4 | Email service provider | Hybrid: SendGrid (transactional) + Brevo (newsletter) | Decision resolved for Prompt 3A (execution deferred — manuscript gate) |
| 5 | Manuscript publication readiness | ✅ Revised 2026-11-13: early release — build reader screens now; chapters and addendums published individually once Ash approves each | No longer gates the reader screens; per-chapter approval gates publication |
| 6 | Newsletter destination | Brevo (external signup link) | Decision resolved for Prompt 3A (execution deferred — manuscript gate) |
| 7 | Route enforcement verification | Option A: noindex meta tags + sitemap exclusion; no robots.txt Disallow | Decision resolved for Prompt 1 |

**Implications**:

- Prompts 1, 2A, 2B have no outstanding blocking decisions; execution still requires the status gates listed at the top of this document
- ➡️ Prompts 3A, 3B, 3C (reader access, recovery, errors) are **handed over to Spec 005**. Decisions 1–6 recorded here are inputs to Spec 005, which owns their execution, stages and dependencies
- Decision 5 revised by Ash on 2026-11-13: **early release**. Build all reader screens and functionality now; publish chapters and addendums one at a time as Ash approves each. The website edition is shorter than the printed book and will be offered for sale via the website at a later stage. Full-manuscript approval no longer gates the reader screens; each chapter still needs Ash's approval before it is published. Ash is moving the root `content/` folder to `src/content/`.

**Stage ID conflict (resolved 2026-11-13)**:

| Stage ID | This specification (Spec 004) | Master execution contract ([01](./references/01-book-website-specification.md) §8–§10) |
| --- | --- | --- |
| 3A | Reader access copy and forms | Podcast decisions and data contract |
| 3B | Recovery flows | Podcast routing and archive/detail experience |
| 3C | Error states | Genuine accessible playback |

The two documents use the same IDs for different work. Resolution: stage IDs 3A–3C belong to the master execution contract (podcast work). Reader-access work (historically Spec 004 Prompts 3A–3C) is now owned by [Spec 005 — reader access](../005-reader-access/spec.md), which defines its own flow, stages and dependencies. The Spec 004 identifiers are kept unchanged as historical references (Spec 005 RA-011).

---

## Clarifications

### Session 2026-11-09

- Q: Should Prompt 2A export CSS variables, JSON design tokens, or both? → A: Both CSS and JSON for dual format support
- Q: When source files contradict, which version takes precedence? → A: Newer version; all conflicts documented in research.md with rationale
- Q: What should Prompt 1 preview "implementation steps" and "non-changes list" contain? → A: Numbered list of file/component changes; 2–3 bullet points describing preserved behavior
- Q: Are all 7 blocking decisions valid, or is the count 6? → A: Confirm all 7 are valid blockers; plan.md updated to list all 7 explicitly

### Session 2026-11-19 (Decision Clarification Phase)

- Q: Which document is authoritative for decision status—spec or plan? → A: spec.md is authoritative; all 7 decisions APPROVED (2026-11-13); plan.md updated to reflect approved status
- Q: Should Spec 004 document Prompts 3B/3C or stop at Prompt 2B? → A: Spec 004 stops at Prompt 2B (navigation design); Spec 005 owns all reader-access work (Prompts 3A–3C)
- Q: When should Gate 2 approval be collected—before or after Figma Make environment confirmation? → A: Approve Gate 2 NOW; Figma Make environment readiness is a Phase A prerequisite (parallel track)

---

## Next Steps

### Immediate (This Spec)

- [ ] Review specification content for completeness and accuracy
- [ ] Confirm scope boundaries match your intent
- [ ] Identify any missing user scenarios or requirements
- [ ] Mark any items that need clarification

### After Approval

- [ ] Run `/speckit-clarify` if clarifications are needed (max 3 critical questions)
- [ ] Run `/speckit-plan` to generate implementation plan
- [ ] Run `/speckit-tasks` to break down into actionable tasks
- [ ] Present exact Prompt previews (1, 2A, 2B, 3A) for approval
- [ ] Collect user decisions on blocking items (recovery race, lifetime, etc.)
- [ ] Prepare Prompts 3B, 3C once blockers are resolved
- [ ] Route to Figma Make execution phase with staged approval gates
