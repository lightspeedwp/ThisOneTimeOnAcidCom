---
spec_id: "003"
feature: "guidelines-refactor"
issue: "TOA-358"
status: "draft"
created: "2026-10-25"
---

# Decision-Gathering Template: Guidelines Refactor (TOA-358)

## Overview

**Purpose:** Historical template used to gather owner decisions on gates D1–D6, D8. Its pending statuses describe the earlier decision session; current resolved decisions are recorded in [requirements.md](./checklists/requirements.md).

## Requirements

Record a Decision Statement, Rationale, and Evidence / Source for each pending gate (D1, D2, D3, D4, D5, D6, D8). Keep the resolved D0 and D7 records intact.

---

### D1: Book/Site Identity & Voice (PENDING)

**Context:** Determines which N-documents make identity claims and how existing guidelines should evolve their tone to reflect site/book identity.

**Decision Scope:**
- What is the canonical brand voice for the site/book? (e.g., professional/conversational, authoritative/collaborative, formal/casual)
- Which existing guidelines need copy alignment to reflect this identity?
- Should N-documents on "Brand Voice & Messaging" be created, and if so, what identity should they reinforce?

**Decision Statement:**
```text
[OWNER RECORDS HERE]

Example: "Site adopts conversational but authoritative voice; guidelines on 
brand voice should emphasize accessibility and inclusivity; N-document 
'Voice & Tone Guidelines' is approved."
```

**Rationale:**
```text
[OWNER RECORDS HERE - explain why this approach aligns with site goals]
```

**Evidence / Source:**
```text
[OWNER RECORDS HERE - link to brand guidelines, design docs, past decisions, etc.]

Example: 
- Design brief: https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues/NNN
- Brand guidelines: [link to existing brand doc]
- Decision record: [Linear issue or GitHub discussion]
```

**Dependent Tasks:** T022 (G-document copy alignment), N-documents on identity

---

### D2: Manuscript Visibility & Publication Boundaries (PENDING)

**Context:** Defines whether documentation should acknowledge/reference the book manuscript, preview content, or maintain separation between published site and work-in-progress materials.

**Decision Scope:**
- Should guidelines reference manuscript status or upcoming content?
- Are there publication boundaries (e.g., "this content is for published site only" vs. "this includes draft material")?
- Which existing guidelines need updates to reflect publication boundaries?
- Should N-documents on "Publication & Access" be created?

**Decision Statement:**
```text
[OWNER RECORDS HERE]

Example: "Site and manuscript are separate; guidelines must NOT reference 
unpublished content; N-document 'Publishing Workflow & Boundaries' approved 
for author reference only (not published)."
```

**Rationale:**
```text
[OWNER RECORDS HERE]
```

**Evidence / Source:**
```text
[OWNER RECORDS HERE]

Example:
- Publication plan: [link to project spec or Linear issue]
- Manuscript status: [link to manuscript repo or doc]
```

**Dependent Tasks:** T022 (G-document updates), potential N-documents on publication

---

### D3: Design Authority & Accessibility Targets (PENDING)

**Context:** Specifies design system authority (who approved palette, spacing, typography, accessibility levels) and drives correctness of all design examples in guidelines.

**Decision Scope:**
- Who is the design authority (internal designer, external agency, design system owner)?
- What accessibility level is required (WCAG 2.2 AA, AAA, or another standard)?
- Which design tokens (colors, spacing, typography) are finalized vs. pending?
- Should N-documents on "Design System & Accessibility" be created, and should they reference the authority?

**Decision Statement:**
```text
[OWNER RECORDS HERE]

Example: "Design system approved by [Designer Name/Role]; accessibility 
target is WCAG 2.2 AA; color palette v2.1 is canonical; N-document 
'Design Token Reference' approved with authority link; N-document 
'Accessibility Checklist' approved for all components."
```

**Rationale:**
```text
[OWNER RECORDS HERE]
```

**Evidence / Source:**
```text
[OWNER RECORDS HERE]

Example:
- Design system Figma: [Figma Make project link]
- Authority approval: [GitHub review, Linear decision, etc.]
- Accessibility audit: [link to audit report or standard reference]
```

**Dependent Tasks:** T023 (G-document design corrections), T038–T040 (design verification)

---

### D4: Documentation Destinations & N-Document Approval Subset (PENDING) — CRITICAL

**Context:** Specifies which of 33 proposed N-documents are approved for creation, their destinations, and how existing guidelines map to new consolidated documentation.

**Decision Scope:**
- Of the 33 N-documents proposed in `plan.md`, which are APPROVED for creation?
- For each approved N-document: where should it live (`guidelines/` path)?
- For G-documents that consolidate into N-documents: should old G-paths become pointers?
- Which G-documents remain standalone (no consolidation)?
- **[REQUIRED]** How should updated guidelines reference the six existing skills (branch-validation, changelog, labeling, test, validate, workflow-orchestration)? Confirm the reference approach for all six.
- **[REQUIRED]** For each optional new skill proposal, explicitly APPROVE or REJECT it and record its name, purpose, proposed destination, rationale, and evidence link. New skill creation is out of scope in [Specification 003](spec.md#scope--constraints); approval requires a separately authorised scope change before implementation.

**Decision Statement:**
```text
[OWNER RECORDS HERE — must include N-documents, pointer strategy, AND skill decisions]

Example: "Approved N-documents:
- N001: Design Token Reference (guidelines/design/tokens.md)
- N002: Accessibility Checklist (guidelines/accessibility/checklist.md)
- N014: Styling Discipline & BEM (guidelines/styling/bem-architecture.md)
  - Replaces G042 (old path becomes pointer)

Not approved (defer to Phase 3 or future):
- N031–N033 (WordPress-related docs; deferred pending D8)

Approved with pointer-only (no new document):
- N005–N010 (reference; create redirect entries in G-docs, no new file)

Six-skill reference approach:
- All six existing skills (branch-validation, changelog, labeling, test, validate, 
  workflow-orchestration) are referenced from canonical .agents/skills/ locations
- Guidelines updated to link to skill documentation at canonical paths
- No new skills created in Phase 2; any future skill proposals require separate D-gate

Optional new skill decisions:
- REJECTED: S010 (codeowners-management) — deferred to Phase 3
- [APPROVE or REJECT each optional skill; record separate scope-change authorisation and evidence]
"
```

**Rationale:**
```text
[OWNER RECORDS HERE - explain prioritization and consolidation strategy]
```

**Evidence / Source:**
```text
[OWNER RECORDS HERE]

Example:
- N-document prioritization: [Linear epic or GitHub project]
- G→N mapping decision: [design doc or decision thread]
```

**Dependent Tasks:** T028–T032 (all N-document creation), T022–T026 (G-document edits)

⚠️ **BLOCKER:** Without D4, implementation cannot proceed. This gate controls the entire consolidation strategy.

---

### D5: Historical Preservation & Pointer Strategy (PENDING)

**Context:** Defines how old guideline paths remain discoverable when documents move or consolidate (pointer types, redirect approach, archive handling).

**Decision Scope:**
- When a guideline moves (G path → N path), should the old path become a pointer or be deleted?
- For archived guidelines: should they remain at old path with "archived" marker, or move to a historical archive location?
- Maximum pointer chain depth (specification requires 1 hop; confirm this is acceptable)?
- Should reverse links be added to new documents (e.g., "Formerly: [old path]")?

**Decision Statement:**
```text
[OWNER RECORDS HERE]

Example: "Use Type 1 (relocation) and Type 2 (consolidation) pointers per 
contract; Type 3 (archival) pointers to preserved archive locations in 
`guidelines/_archive/`; all pointers maximum 1 hop; reverse links 
recommended but not required."
```

**Rationale:**
```text
[OWNER RECORDS HERE]
```

**Evidence / Source:**
```text
[OWNER RECORDS HERE]

Example:
- Pointer contract: .github/specs/003-refactor-guidelines/contracts/pointer-redirect-contract.md
- Archive strategy: [GitHub issue or design doc]
```

**Dependent Tasks:** T033–T034 (pointer creation & validation)

---

### D6: Backend Provider & Integration Scope (PENDING)

**Context:** Specifies backend technology stack, provider (e.g., serverless function platform, managed service), and which N-documents should document backend integration.

**Decision Scope:**
- What is the canonical backend stack (serverless, managed database, third-party API, etc.)?
- Which provider(s) should be documented (AWS Lambda, Vercel Functions, Supabase, other)?
- Should N-documents on "Backend Integration & Deployment" be created?
- Which guidelines reference backend concerns and need updates?

**Decision Statement:**
```text
[OWNER RECORDS HERE]

Example: "Backend uses Vercel Functions (serverless) + Supabase (postgres); 
N-document 'Backend Integration Guide' approved; existing guidelines on 
routing and environment variables updated per D1 voice."
```

**Rationale:**
```text
[OWNER RECORDS HERE]
```

**Evidence / Source:**
```text
[OWNER RECORDS HERE]

Example:
- Tech stack decision: [AGENTS.md or CONTRIBUTING.md reference]
- Provider architecture: [system design doc or GitHub issue]
- Backend repo: [link to backend codebase]
```

**Dependent Tasks:** T022 (G-document updates), N-documents on backend integration

---

### D8: WordPress/Portfolio Role & Guidance Scope (PENDING)

**Context:** Clarifies whether WordPress is part of the site stack, whether portfolio-related guidance should be in main guidelines or separate, and which N-documents address WordPress/portfolio concerns.

**Decision Scope:**
- Is WordPress used on the site? (If no, D8 defaults to "out of scope")
- Should portfolio-related guidance be integrated into main guidelines or kept separate?
- Which existing guidelines reference WordPress, and should they be updated or deprecated?
- Should N-documents on "WordPress Integration" or "Portfolio Showcase" be created?

**Decision Statement:**
```text
[OWNER RECORDS HERE]

Example: "WordPress is NOT used; site is React/Next.js only; portfolio 
guidance kept in main guidelines under 'Featured Work'; D8-dependent 
N-documents (N031–N033) are DEFERRED to Phase 3; all WordPress references 
in existing guidelines marked as archived."
```

**Rationale:**
```text
[OWNER RECORDS HERE]
```

**Evidence / Source:**
```text
[OWNER RECORDS HERE]

Example:
- Tech stack confirmation: [AGENTS.md § 156–176]
- Portfolio approach: [design doc or GitHub issue]
```

**Dependent Tasks:** T022 (G-document updates), N-documents on WordPress/portfolio (conditional)

---

## Summary Table

| Gate   | Status        | Owner Input Required                    | Evidence Link                                                    |
| ------ | ------------- | --------------------------------------- | ---------------------------------------------------------------- |
| **D0** | ✅ RESOLVED   | No                                      | Protected-file policy retained                                   |
| **D1** | 🔄 PENDING    | Voice & identity decisions              | [Record above]                                                   |
| **D2** | 🔄 PENDING    | Publication boundaries                  | [Record above]                                                   |
| **D3** | 🔄 PENDING    | Design authority & accessibility        | [Record above]                                                   |
| **D4** | 🔄 PENDING    | N-doc approvals, G→N mapping & skills   | [Record above] — **CRITICAL**                                    |
| **D5** | 🔄 PENDING    | Pointer strategy & archive approach     | [Record above]                                                   |
| **D6** | 🔄 PENDING    | Backend tech stack & integration docs   | [Record above]                                                   |
| **D7** | ✅ RESOLVED   | No                                      | Historical Phase 1 branch: `docs/spec-003-guidelines-reconcile` (superseded by `docs/spec-003-phase2-implementation`)                     |
| **D8** | 🔄 PENDING    | WordPress presence & portfolio guidance | [Record above]                                                   |

---

## Success Criteria

- All seven pending gates have a complete Decision Statement, Rationale, and Evidence / Source with evidence links.
- Each complete gate record is copied under its matching checklist heading, and the corresponding checklist items reflect the decision.
- D4 records the six-existing-skill reference approach and an explicit approval or rejection for each optional new skill proposal.

## Implementation Plan

**Timeline:** Record decisions here, then copy each complete gate record (Decision Statement, Rationale, and Evidence / Source, including evidence links) under the matching D1, D2, D3, D4, D5, D6, and D8 headings in [Phase 1: Gate Resolution PENDING](checklists/requirements.md#phase-1-gate-resolution-pending). Update the corresponding checklist items.

### How to Use This Template

#### For the Owner

1. **Review each gate section** above (D1, D2, D3, D4, D5, D6, D8)
2. **Fill in the Decision Statement** — write concisely what was decided
3. **Add Rationale** — briefly explain why this decision aligns with site goals
4. **Provide Evidence** — link to where this decision is documented (GitHub issue, Linear issue, Figma file, design doc, etc.)
5. **Commit to repository** — once all 7 gates are complete, copy each complete gate record (Decision Statement, Rationale, and Evidence / Source, including evidence links) under the matching D1, D2, D3, D4, D5, D6, and D8 headings in [Phase 1: Gate Resolution PENDING](checklists/requirements.md#phase-1-gate-resolution-pending), then update the corresponding checklist items.

#### For Claude (Implementation Agent)

Once decisions are recorded in `checklists/requirements.md`:

1. Run **T001** (verification task): Confirm all D1–D6, D8 have evidence recorded
2. Proceed with **T002–T004** (pre-implementation verification)
3. Begin **Phase 2A–F** tasks in parallel (S-documents, G-documents, etc.)

---

### Next Steps

1. **Owner:** Review and fill out this template
2. **Owner:** Share filled template with implementation team (GitHub issue comment, Linear discussion, or direct message)
3. **Implementation:** Copy decisions into `checklists/requirements.md` with evidence links
4. **Implementation:** Run validation to confirm all gates are recorded (via `/speckit-clarify` or manual check)
5. **Implementation:** Begin Phase 2 tasks (T005+)

---

### Questions?

Refer to:
- **Specification:** `.github/specs/003-refactor-guidelines/spec.md`
- **Implementation Plan:** `.github/specs/003-refactor-guidelines/plan.md`
- **Task Breakdown:** `.github/specs/003-refactor-guidelines/tasks.md`
- **Contracts:** `.github/specs/003-refactor-guidelines/contracts/`

---

*Template generated 2026-10-25 | Ready for owner input*
