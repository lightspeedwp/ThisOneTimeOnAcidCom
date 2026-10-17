# Phase 0 Research: TOA Media Library Strategy Clarifications

**Date Created**: 2026-10-17 | **Status**: ⏳ AWAITING OWNER RESPONSES | **Phase**: 0 (Research & Clarification)

---

## Overview

This document captures the three critical clarification questions raised in the specification and their resolution through owner decision or research findings. Completion of Phase 0 unblocks Phase 1 (design) and downstream work.

**Gate**: Phase 1 design cannot proceed until all three clarifications are resolved (Q1, Q2, Q3).

---

## Research Task 1: Provider Choice and Approval Status

**Specification Reference**: [spec.md § Clarification Questions — Question 1](spec.md#question-1-approved-storage-provider-and-visual-editing-workflow)

**Question**: Which storage provider is approved (GitHub + Netlify, Cloudinary, alternative), or should evaluation precede approval?

**Contradiction**: 
- Audit PR #285 decision log favours GitHub + Netlify
- Strategy report recommends Cloudinary
- Provider-comparison report lists trade-offs but no recommendation

**Options Provided**:

| Option | Decision | Downstream Impact |
|--------|----------|------------------|
| A | Approve GitHub + Netlify as working assumption | TOA-284 and TOA-285 can plan Git LFS, Netlify integration, static hosting |
| B | Approve Cloudinary as working assumption | TOA-284 and TOA-285 must plan Cloudinary API, hosted editing UI, CDN |
| C | Defer choice; proceed with evaluation (TOA-276 first) | TOA-284/285 remain blocked until TOA-276 completes; recovery/validation work proceeds independently |
| Custom | [Specify alternative provider or decision process] | [Document implications] |

**Research Status**: ⏳ PENDING OWNER DECISION

**Owner Response**: *[To be provided]*

**Resolution**: 
- **Decision Made**: [A|B|C|Custom]
- **Rationale**: [Why this choice; risk/benefit analysis if applicable]
- **Implications for TOA-284**: [Infrastructure planning, Git LFS/Netlify vs. Cloudinary API setup]
- **Implications for TOA-285**: [Build integration approach, responsive-image pipeline, deployment target]
- **Implications for TOA-276**: [If C selected, confirm evaluation scope and timeline]

---

## Research Task 2: Asset Recovery Baseline

**Specification Reference**: [spec.md § Clarification Questions — Question 2](spec.md#question-2-recoverable-asset-count-and-print-quality-baseline)

**Question**: What is the realistic count of recoverable assets? What are the minimum print-quality requirements?

**Ambiguities**:
- Audit reports cite "12 pilot assets" and "56 total assets" without verification
- Recovery percentage is not stated (assumption: 60–80%, not 100%)
- Print-quality requirements (resolution, format, colour space) are not defined
- Unknown whether print is essential for MVP or aspirational

**Options Provided**:

| Option | Decision | Success Metric Impact |
|--------|----------|----------------------|
| A | 40–50 of 56 recoverable as high-quality originals; print requires 300 DPI, RGB/CMYK, PNG/PDF | SC-001 targets 40–50; provider must support print formats |
| B | ~30 of 56 recoverable; many exist only as low-res web renderings; print aspirational | SC-001 targets ~30; provider must support print formats but recovery constraint |
| C | Recovery percentage is unknown; define success as "recover what is possible, document what is not" | SC-001 qualitative; provider choice less constrained by print |
| Custom | [Specify expected recovery rate and print baseline] | [Document impacts on effort, scope, validation] |

**Research Status**: ⏳ PENDING OWNER CONFIRMATION

**Owner Response**: *[To be provided]*

**Resolution**:
- **Decision Made**: [A|B|C|Custom]
- **Realistic Recovery Target**: [actual % and count, e.g., "35–40 of 56 assets recoverable"]
- **Print-Quality Baseline** (if applicable): [e.g., "minimum 300 DPI, RGB/CMYK, PNG or PDF support"]
- **Print Requirement Status**: [Essential for MVP|Aspirational|Out of scope]
- **Implications for SC-001**: [Updated success criteria with confirmed targets]
- **Implications for TOA-282 Validation**: [Scope of validation runs, quality gates, acceptable recovery %, manual-export gap documentation]
- **Implications for TOA-276 Evaluation**: [Provider must/should support print; recovery % affects provider comparison]

---

## Research Task 3: Implementation Sequencing and Blocker Logic

**Specification Reference**: [spec.md § Clarification Questions — Question 3](spec.md#question-3-boundaries-between-definition-validation-and-implementation-phases)

**Question**: What is the intended sequence? Does TOA-283 (finalise schema) extend TOA-277 (define schema), or are they distinct phases?

**Ambiguities**:
- Linear issue descriptions do not clarify whether TOA-283 extends or repeats TOA-277
- Blocker relationships are unmarked; only "related" links exist
- Unknown whether TOA-284/285 can start before TOA-282 validation completes
- Risk tolerance for parallel work vs. sequential safety not stated

**Options Provided**:

| Option | Decision | Project Sequencing |
|--------|----------|------------------|
| A | Sequential: define (TOA-277) → validate (TOA-282) → finalise (TOA-283) → implement (TOA-284/285) | TOA-283 is blocker for TOA-284/285; high safety, lower speed |
| B | Parallel: define (TOA-277) and implement (TOA-284 planning) concurrently; validate (TOA-282) parallel to both | Fast execution; rework risk if validation finds schema issues |
| C | TOA-283 is refinement only (not blocker); TOA-284/285 can start after TOA-277 | Medium speed/safety balance; TOA-283 polishes, doesn't gate |
| Custom | [Specify intended dependencies, parallel opportunities, risk tolerance] | [Document critical path, blocker chain] |

**Research Status**: ⏳ PENDING OWNER CLARIFICATION

**Owner Response**: *[To be provided]*

**Resolution**:
- **Decision Made**: [A|B|C|Custom]
- **Blocker Chain**: [Define which issues must complete before others start]
- **Parallel Opportunities**: [Identify work that can proceed concurrently]
- **Critical Path**: [Longest sequence of dependent issues; timeline impact]
- **Rework Risk Assessment** (if B or C selected): [What happens if validation finds schema issues?]
- **Implications for Project Schedule**: [Estimated timeline if sequential vs. parallel]
- **Implications for TOA-277/283**: [Are these sequential phases or overlapping?]
- **Implications for TOA-284/285 Start Date**: [Can they start before TOA-282 validation completes?]
- **Implications for Resource Planning**: [Can teams work in parallel or must they sequence?]

---

## Consolidated Research Findings

### From Audit PR #285 (Review Complete)

**Source**: `.github/reports/toa-media-library/` (PR #285, branch `claude/charming-thompson-iyxuvu`)

**Key Findings**:
- [To be documented after PR review and research summary]

### From Strategy and Provider-Comparison Reports

**Provider Comparison Summary** (from `.github/reports/toa-media-library/`):
- [To be documented after report review and provider evaluation]

### From Figma Extraction Pilot (TOA-280 Scope)

**Extraction Capability Assessment**:
- [To be documented after pilot runs; informs recovery baseline (Q2)]
- [Fidelity, supported formats, performance, manual-export gaps]

### Decision Rationale (Once Resolved)

**Q1 Provider Choice Rationale**:
- [Why GitHub + Netlify / Cloudinary / Alternative / Evaluation-first was chosen]
- [Trade-offs considered; risk assessment]

**Q2 Recovery Baseline Rationale**:
- [Why 40–50 / ~30 / qualitative target was chosen]
- [Evidence from pilot extraction, manual-export testing]
- [Print-quality baseline rationale]

**Q3 Implementation Sequencing Rationale**:
- [Why sequential / parallel / refinement-only approach was chosen]
- [Blocker logic and project schedule implications]

---

## Gate Evaluation — Phase 0 Complete

**When all three clarifications (Q1, Q2, Q3) are resolved**, re-evaluate gates:

- [ ] **Q1 Resolved**: Provider choice documented; implications for TOA-284/285 understood
- [ ] **Q2 Resolved**: Asset recovery baseline confirmed; success metrics (SC-001) updated
- [ ] **Q3 Resolved**: Implementation sequencing clarified; blocker chain and critical path documented
- [ ] **Owner Approval**: All decisions approved and documented
- [ ] **No Conflicts**: Resolved decisions do not conflict with specification constraints or Linear issue scope

**Gate Outcome**: ✅ PASS Phase 0 → Proceed to Phase 1 Design

**If Gate Fails**: [Document why; identify missing information; request clarification]

---

## Next Steps

1. **Owner Reviews Questions** → Selects options A/B/C or provides custom response for each question
2. **Owner Provides Responses** → This document is updated with decisions and rationale
3. **Phase 0 Validation** → Confirm no conflicts with specification or issue scope
4. **Phase 1 Execution** → `/speckit-plan` continues to Phase 1 (design artifacts: data-model.md, catalogue-schema.json, validation-checklist.md, quickstart.md)

---

**Research Version**: 1.0-draft | **Status**: Awaiting Owner Responses (Q1, Q2, Q3) | **Next Phase**: Phase 1 Design (after all clarifications resolved)
