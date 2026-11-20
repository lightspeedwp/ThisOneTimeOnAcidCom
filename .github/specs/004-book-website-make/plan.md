# Implementation Plan: Book Website Claude Direct Execution

**Branch**: `feat/spec-004-claude-execution-model` | **Date**: 2026-11-09 | **Pivoted**: 2026-11-20 | **Spec**: [.github/specs/004-book-website-make/spec.md](./spec.md)

**Input**: Feature specification from `.github/specs/004-book-website-make/spec.md`

**Source Documents**: Reference materials available in [`./references/`](./references/) folder with complete version history and decision tracking

**Execution Model**: SC-004 (Execution Model Pivot) approved 2026-11-20. Prompts 1, 2A, 2B now execute via Claude direct execution (not Figma Make).

## Summary

✅ **Complete staged Claude-executable prompts for the ThisOneTimeOnAcidCom book website redesign**, prepared as documentation-only package with exact specifications **ready for approval**. The feature delivers **three unblocked executable prompts** (Prompt 1: navigation exposure, Prompt 2A: design-system baseline, Prompt 2B: navigation design) with **all 7 blocking decisions RESOLVED** (2026-11-13). Reader-access work (Prompts 3A–3C) handed to **Spec 005**. No implementation code is generated; the deliverable is documentation ready for Claude direct execution and component generation via TypeScript/CSS specs.

**Technical Approach**: Preflight analysis of six source specification files (references/01-06) with version reconciliation, approval boundary documentation, and exact Prompt specification generation. Each contract includes Claude execution specification (input format, output format, validation criteria). Three staged gates prevent unblocked prompt execution: (1) blocking decision resolution, (2) user design approval, (3) SC-004 approval & implementation authorization.

## Technical Context

**Project Type**: Documentation-only specification package (no code generation, no deployment)

**Source Files**: Six specification files in `.github/specs/004-book-website-make/references/` (01-book-website-specification.md, 02-companion-session-plan.md, 03-author-decisions-launch-scope.md, 04-design-brief.md, 05-design-reader-decision-register.md, 06-website-reading-prd.md) with version tracking and reconciliation

**Design System**: Space Grotesk headings, Inter body/UI, 9-color palette (light & dark themes)

**Reader Access Policy**: 10-minute single-use verification codes, 30-day device lifecycle, purpose-limited records

**Execution Model** (SC-004, approved 2026-11-20):
- **Primary**: Claude direct execution for Prompts 1, 2A, 2B
  - Each contract includes: Input spec, output format (CSS/JSON/TypeScript), validation criteria, example output
  - Output: Markdown specs + code/data files (not Figma canvas)
  - Timeline: 45–60 min total (Prompts 1, 2A, 2B)
  - Deliverable: Version-controlled, reviewable, iterable specs
- **Deprecated**: Figma Make execution (replaced by SC-004)
- **Staged gates**: (1) Blocking decisions resolved, (2) Design approval, (3) SC-004 approval, (4) Implementation authorization
- **Prompts 1, 2A, 2B**: Approved for Claude execution; unblocked
- **Prompts 3B, 3C**: Blocked pending decision resolution; same Claude execution model recommended for Spec 005

**Blocking Decisions** (7 total, **ALL RESOLVED & APPROVED 2026-11-13**):
- ✅ **Decision 1**: Recovery-first race condition → **Option A**: Recovery takes precedence
- ✅ **Decision 2**: Recovery lifetime eligibility → **Option A**: 30-day absolute expiry + session refresh on recovery
- ✅ **Decision 3**: Code expiry start time → **Option A**: From code generation
- ✅ **Decision 4**: Email service provider → **Hybrid**: SendGrid (transactional) + Brevo (newsletter)
- ✅ **Decision 5**: Manuscript publication readiness → **Early release**: Build screens now; chapters published individually as Ash approves
- ✅ **Decision 6**: Newsletter destination → **Brevo**: External signup link
- ✅ **Decision 7**: Route enforcement verification → **Option A**: Noindex meta tags + sitemap exclusion

**Target Output**: Claude-executable specifications (Prompts 1–2B) with exact component specs, acceptance criteria, and output format validation. Each contract includes Claude execution section (input, output, validation). Reader-access work (Prompts 3A–3C) handed to Spec 005 with same Claude execution model.

**Scale/Scope**: 3 executable prompts (1, 2A, 2B), 7 approved blocking decisions, 10 functional requirements, 8 success criteria, 8 assumptions, 4 edge cases

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **Specification-First Development**: Feature begins with written specification; Spec Kit workflow applied correctly (Specification → Clarification → Planning → Task Decomposition)

✅ **Repository Governance**: Specifications stored in `.github/specs/004-book-website-make/`; no protected files modified

✅ **Bundler Compatibility**: Documentation-only package; no code syntax constraints apply. Figma Make compatibility verified via version reconciliation and prompt previewing.

✅ **Protected Content**: No hardcoded UI strings; all derive from design baseline and source specifications

✅ **Styling**: Documentation package; CSS constraints not applicable at planning phase

✅ **Package Management & Testing**: No code generation; no dependency changes; documentation validation only

**Gate Status**: ✅ All checks pass. No violations. Proceed to Phase 0 research.

## Project Structure

### Documentation (this feature)

```text
.github/specs/004-book-website-make/
├── spec.md                              # Feature specification (223 lines, complete)
├── plan.md                              # This file (implementation plan)
├── research.md                          # Phase 0: blocking decision analysis
├── data-model.md                        # Phase 1: entities and relationships
├── quickstart.md                        # Phase 1: validation and approval flow
├── contracts/                           # Phase 1: Figma Make prompt contracts
│   ├── prompt-1-navigation-exposure.md
│   ├── prompt-2a-design-baseline.md
│   ├── prompt-2b-navigation-design.md
│   ├── prompt-3a-reader-access.md
│   ├── prompt-3b-recovery-flows.md
│   └── prompt-3c-error-states.md
├── checklists/requirements.md           # Quality validation (all items passing)
└── tasks.md                             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

**Project Type: Documentation-only specification**

```text
.github/specs/004-book-website-make/references/
├── 01-book-website-specification.md     # Master execution contract (v1.0.0)
├── 02-companion-session-plan.md         # Preparation queue (v1.0.4)
├── 03-author-decisions-launch-scope.md  # Author decisions (v1.3.0)
├── 04-design-brief.md                   # Design requirements (v1.1.2)
├── 05-design-reader-decision-register.md # Design tracking (v1.9.0)
└── 06-website-reading-prd.md            # Product requirements (v1.1.1)
```

**Structure Decision**: Documentation-only package. No code structure required. Source specifications analyzed, reconciled, and staged for Figma Make execution. All deliverables remain in `.github/specs/004-book-website-make/` with no backend/frontend splits or implementation code paths.

**Note on `staged/` directory**: Contains historical drafts and earlier specification versions from initial analysis (Nov 9). Authoritative versions are in the root directory (spec.md, plan.md, tasks.md, etc.) with all Phase 9 convergence updates applied. The `staged/` folder is retained for reference only and is not part of active execution.

## Complexity Tracking

No violations. Constitution check passes; no complexity trade-offs required.

---

## Phase 0: Research (Blocking Decisions Analysis)

**Research Tasks** (7 blocking decisions to resolve):

1. **Recovery-First Race** — What happens if both recovery and fresh verification occur simultaneously? Document options A/B/C/D with conflict resolution strategy.

2. **Recovery Lifetime** — How long is a confirmed redemption eligible for recovery access? Document retention policy (time-based vs. event-based).

3. **Code Expiry Start Time** — From generation, receipt, or page load? Document timing model impact on UX and error messaging.

4. **Email Service Provider** — Brevo, SendGrid, or other? Document API capabilities, rate limits, and newsletter integration.

5. **Manuscript Publication Readiness** — Is manuscript approved and available for verified reader access? Document availability gate.

6. **Newsletter Destination** — Where does "Sign up" link direct? Separate form, external URL, or inline consent? Document integration point.

7. **Route Enforcement Verification** — Are /speaking, /events, /media preserved as noindex and sitemap-excluded? Document verification method (robots.txt, sitemap.xml, Meta tags).

**Output**: research.md with all 7 blocking decisions analyzed, options documented, and decision matrix created

## Phase 1: Design & Contracts

**Prerequisites**: research.md complete

**Deliverables**:
- **data-model.md**: Specification File, Design Baseline, Design Candidate, Blocking Decision, Figma Make Prompt, Preflight Analysis entities with fields and relationships
- **contracts/**: Six Figma Make prompt specifications (Prompts 1, 2A, 2B, 3A exact previews; Prompts 3B, 3C blocked with prerequisites)
- **quickstart.md**: Approval flow, validation scenarios, and gate conditions for staged prompt execution
