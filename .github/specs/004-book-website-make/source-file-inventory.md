# Source File Inventory

**Spec Reference**: FR-001 (System MUST analyze all six source specification files and create inventory)  
**Inventory Date**: 2026-11-09  
**Auditor**: Convergence Phase 8 (T056)

---

## Inventory Overview

Complete documentation of six specification files from `content/book/` directory that serve as authoritative sources for the Figma Make prompt pack feature.

| File ID | Document Name | Current Version | Status | Recency | Evidence |
| --------- | --------------- | ----------------- | -------- | --------- | ---------- |
| **01** | Book Website Figma Make specification and prompt pack | v1.0.0 | ✓ CURRENT | 2026-11-09 | Master execution contract |
| **02** | Figma Make companion session plan | v1.0.4 | ✓ CURRENT | 2026-11-09 | Companion planning document |
| **03** | Book website brief — author decisions and launch scope | v1.3.0 | ✓ CURRENT | 2026-11-09 | Scope and author decisions |
| **04** | Design brief — Book website and verified reading experience | v1.1.2 | ✓ CURRENT | 2026-11-08 | Design requirements & baseline |
| **05** | Design and reader decision register | v1.9.0 | ✓ CURRENT | 2026-11-09 | Design decisions & candidates |
| **06** | PRD — Website and reading experience | v1.1.1 | ⚠️ OLDER | 2026-11-04 | Provisional draft PRD |

---

## Detailed File Record

### File 01: Book Website Figma Make Specification and Prompt Pack

**File Path**: `content/book/01-book-website-specification.md`  
**Version**: 1.0.0  
**Last Revised**: 2026-11-09 (Asia/Bangkok)  
**Document Status**: Draft specification and prompts — stage execution separately approval-gated  
**Authority**: Ash  
**Purpose**: Master execution contract for Figma Make staged prompt pack

**Content Summary**:
- Purpose and source authority documentation
- Four Figma Make execution stages (0–3C, approval gates between)
- Specification of all 6 prompts (Prompt 0 placeholder through Prompt 3C)
- Approval boundaries and stage gates
- Reader access policy overview (10-minute codes, 30-day device lifecycle)

**Key Sections**:
- 1. Purpose and source authority (stage-based delivery model)
- 2. Prompts and stage gates (0, 1, 2A/2B, 3A/3B/3C with approval gates)
- 3. Reader access policy framework
- 4. Design system baseline specification

**Reconciliation Status**: ✓ AUTHORITATIVE BASE  
**Conflicts with Other Files**: None identified  
**Material Changes from Previous Version**: Version 1.0.0 (baseline; no prior versions in history)

---

### File 02: Figma Make Companion Session Plan

**File Path**: `content/book/02-companion-session-plan.md`  
**Version**: 1.0.4  
**Last Revised**: 2026-11-09 (Asia/Bangkok)  
**Document Status**: Working draft — companion planning only; implementation paused  
**Authority**: Based on source briefs and decision register  
**Purpose**: Practical companion for session planning and next working steps

**Content Summary**:
- Planning basis and readiness assessment
- Candidate evaluation (Candidate 3 recorded as source proposal)
- Navigation exposure changes (Speaking, Events, Media routes)
- Design system refinement and shared theme reconciliation
- Implementation prerequisites

**Key Sections**:
- 1. Planning basis and readiness
- 2. Document versions and history tracking
- 3. Candidate evaluation summary
- 4. Navigation and theme decisions

**Reconciliation Status**: ✓ COMPANION PLANNING  
**Conflicts with File 01**: None (complements base specification)  
**Conflicts with File 03**: Minor scope differences on author decisions; File 03 is authoritative for scope

---

### File 03: Book Website Brief — Author Decisions and Launch Scope

**File Path**: `content/book/03-author-decisions-launch-scope.md`  
**Version**: 1.3.0  
**Last Revised**: 2026-11-09 (Asia/Bangkok)  
**Document Status**: Planning document — implementation, editorial completion and launch readiness not established  
**Authority**: Ash (author decisions documented 27 October and 3 November 2026)  
**Purpose**: Define intended website based on author decisions for book launch scope

**Content Summary**:
- Purpose and status (planning document, not implementation authority)
- Audience and positioning (book-first website)
- Author decisions (27 October and 3 November 2026)
- Website scope and content strategy
- Scope exclusions and future plans (print, e-book, audiobook editions)

**Key Sections**:
- 1. Purpose and status (planning document, not launch-ready)
- 2. Audience and positioning (book-first)
- 3. Author decisions (two dated decisions: 27 Oct, 3 Nov)
- 4. Website edition specifications

**Reconciliation Status**: ✓ AUTHORITATIVE SCOPE  
**Conflicts with File 01**: None (File 01 is execution model; File 03 is scope)  
**Conflicts with File 06**: File 06 is provisional draft; File 03 is more recent (supersedes PRD v1.1.1 for scope decisions)

---

### File 04: Design Brief — Book Website and Verified Reading Experience

**File Path**: `content/book/04-design-brief.md`  
**Version**: 1.1.2  
**Last Revised**: 2026-11-08 (Asia/Bangkok)  
**Document Status**: Brief content approved for recording — design deliverables, acceptance and implementation not authorised  
**Authority**: Ash (design and final editorial authority)  
**Purpose**: Define design requirements and approved baseline for website and reader experience

**Content Summary**:
- Design surface and audience (book website, readers interested in personal storytelling)
- Approved design baseline (Space Grotesk/Inter typography; 9-color palette with light/dark themes)
- Design discovery and specifications
- Component design requirements
- Conditional requirements and unresolved items

**Key Sections**:
- 1. Objective (book-first website design)
- 2. Design baseline (typography, colors, components)
- 3. Component specifications
- 4. Responsive design requirements
- 5. Reader experience design

**Reconciliation Status**: ✓ AUTHORITATIVE DESIGN BASELINE  
**Design Baseline Locked**: ✓ YES (v1.1.2 frozen for this feature; no changes during preflight)  
**Conflicts with Other Files**: None (File 04 is authoritative for design; other files reference it)

**One Day Older**: File 04 last revised 2026-11-08 (vs. 2026-11-09 for Files 01, 02, 03, 05). Revision time does not affect authority; design baseline is stable and locked.

---

### File 05: Design and Reader Decision Register

**File Path**: `content/book/05-design-reader-decision-register.md`  
**Version**: 1.9.0  
**Last Revised**: 2026-11-09 (Asia/Bangkok)  
**Document Status**: Decision register draft; candidate specifications remain unapproved  
**Authority**: Ash (design and final editorial/publication authority)  
**Purpose**: Record approved baseline, preserved candidate proposals, and unresolved decisions

**Content Summary**:
- Approved baseline design (Space Grotesk/Inter, 9-color palette)
- Candidate proposals (R3, T1, RT2, C1) — all marked unapproved
- Unresolved decisions (recovery flows, error states, etc.)
- Review planning updates (4–5 November 2026)
- Validation status (static screenshots completed; behavioral/responsive/accessibility checks pending)

**Key Sections**:
- 1. Purpose and source authority
- 2. Approved baseline
- 3. Design candidates (R3, T1, RT2, C1 — all unapproved)
- 4. Decision register entries
- 5. Validation summary

**Reconciliation Status**: ✓ AUTHORITATIVE DECISION REGISTER  
**Highest Version Number in Set**: v1.9.0 (File 05). Version numbers belong to separate documents and do not rank one document above another.  
**Conflicts with Other Files**: None (File 05 is authoritative for design decisions and candidates)

**Special Status**: This file is the authoritative source for:
- Approved design baseline confirmation
- Unapproved candidate listing (R3, T1, RT2, C1)
- Design decision register entries
- Validation status tracking

---

### File 06: PRD — Website and Reading Experience

**File Path**: `content/book/06-website-reading-prd.md`  
**Version**: 1.1.1  
**Last Revised**: 2026-11-04 (Asia/Bangkok)  
**Document Status**: Provisional draft; needs substantial revision; not implementation- or launch-ready  
**Authority**: Ash (project lead, design and final editorial/publication authority)  
**Purpose**: Product requirements and reading experience specification

**Content Summary**:
- Document control and versioning conventions
- Product baseline and scope approval (27 October 2026: shorter website edition, 100–150 pages)
- Access policy and verification method (10-minute codes, device lifecycle)
- Reader access specification
- Newsletter signup (separate from reading verification)

**Key Sections**:
- 1. Document control (baseline approval, versioning)
- 2. Purpose and scope
- 3. Access policy specifications
- 4. Reader journey documentation

**Reconciliation Status**: ⚠️ OLDER (last revised 5 days before the other files; provisional draft)  
**Topic Precedence**: File 05 (decision register) takes precedence for reader access policy decisions because it is the decision register for that topic, not because of its version number  
**Conflicts with File 05**: File 06 marked "provisional draft"; File 05 is more current decision source  
**Recommendation**: File 06 should be updated to v1.2.0 or v2.0.0 post-feature to reflect all decisions

---

## Version Reconciliation & Conflict Analysis

### Version Precedence Rule (FR-002)

**Rule**: Within a single document, the newer revision takes precedence over its earlier revisions (02 v1.0.3→v1.0.4, 03 v1.2.2→v1.3.0, 05 v1.7.0→v1.9.0). Across different documents, version numbers are independent and are not compared; authority is assigned per topic as shown below. All conflicts are documented with explicit rationale.

**Application**:

| Topic | File 01 | File 02 | File 03 | File 04 | File 05 | File 06 | Winner | Rationale |
| ------- | --------- | --------- | --------- | --------- | --------- | --------- | -------- | ----------- |
| **Design Baseline** | Reference | Reference | Reference | v1.1.2 | v1.9.0 | v1.1.1 | **File 04/05** | File 04 is specification authority; File 05 is most current (v1.9.0) confirmation |
| **Reader Access Policy** | Framework | Reference | Scope | Reference | v1.9.0 | v1.1.1 | **File 05** | v1.9.0 (current) vs v1.1.1 (5 days old) |
| **Navigation Exposure** | Staging | Proposal | **v1.3.0 Decisions** | Reference | v1.9.0 | Reference | **File 03** | Author decisions are authoritative; File 05 confirms (v1.9.0) |
| **Approval Boundaries** | Master | Plan | Scope | Brief | **Register** | Draft | **File 05** | Decision register (v1.9.0) is authoritative source |

### Conflicts Identified

| Conflict | Files Involved | Resolution | Impact |
| ---------- | ---------------- | ----------- | -------- |
| **Version Age (File 06)** | File 06 (v1.1.1, 2026-11-04) vs Files 01/02/03/05 (2026-11-09) | File 05 takes precedence for reader access policy as the decision register (topic authority, not version number) | Low impact; File 06 marked as provisional draft; recommendations for v1.2.0 update noted |
| **Reader Access Details** | File 02 (companion plan) vs File 05 (decision register) | File 05 (v1.9.0, most current) authoritative | Low impact; File 02 is companion planning, not authoritative |
| **Scope Specification** | File 03 (v1.3.0 author decisions) vs File 06 (v1.1.1 scope) | File 03 takes precedence for scope decisions as the author-decisions record | Low impact; File 06 is provisional draft; File 03 reflects latest author decisions (27 Oct, 3 Nov 2026) |

**Conflict Resolution Summary**: No critical conflicts identified. Each conflict above is resolved by topic authority, not by comparing version numbers across documents:

- **Reader access policy and recovery**: File 05 (decision register).
- **Navigation exposure and launch scope**: File 03 (author decisions), consistent with the precedence table above.
- **Design baseline**: File 04 (design brief), with File 05 distinguishing approved values from unapproved candidates.
- **Revisions of the same document**: the newer revision applies (see `version-reconciliation.md` for the FR-002 revision assessments).

No single file is authoritative for every conflict. A recorded-version discrepancy for File 03 (recorded as v1.2.1 in Files 01 and 02; FR-002 names v1.2.2) remains open in `version-reconciliation.md`.

---

## Timestamps & File Tracking

| File | Created | Last Revised | Age (days) | Recency Status |
| ------ | --------- | -------------- | ----------- | ---------------- |
| 01-book-website-specification.md | Unknown | 2026-11-09 | Current | ✓ Current (today) |
| 02-companion-session-plan.md | Unknown | 2026-11-09 | Current | ✓ Current (today) |
| 03-author-decisions-launch-scope.md | Unknown | 2026-11-09 | Current | ✓ Current (today) |
| 04-design-brief.md | Unknown | 2026-11-08 | 1 day | ✓ Current (yesterday) |
| 05-design-reader-decision-register.md | Unknown | 2026-11-09 | Current | ✓ Current (today) |
| 06-website-reading-prd.md | Unknown | 2026-11-04 | 5 days | ⚠️ Older |

**Recency Summary**: 5 of 6 files current (updated 2026-11-08 or 2026-11-09); 1 file 5 days old (File 06, marked as provisional draft)

---

## Authority Matrix

| File | Primary Authority | Secondary Authority | Use Case | Precedence |
| ------ | ------------------- | --------------------- | ---------- | ----------- |
| **01** | Ash (author) | Specification author | Master execution contract | Highest (orchestrates all prompts) |
| **02** | Planning team | Ash | Companion session planning | Supporting (complements File 01) |
| **03** | Ash (author decisions) | Scope team | Launch scope definition | Authoritative (author decisions) |
| **04** | Ash (design authority) | Design team | Design baseline specification | Locked (no changes during preflight) |
| **05** | Ash (decision authority) | Design team | Current decision register | Highest version (v1.9.0); overrides others |
| **06** | Ash (project lead) | Product team | Product requirements | Supporting (provisional draft; File 05 governs reader access policy) |

---

## File Interdependencies

```text
File 01 (Master Specification)
  ├─ References File 02 (Companion Plan)
  ├─ References File 03 (Author Scope Decisions)
  ├─ References File 04 (Design Brief)
  ├─ References File 05 (Decision Register) ← AUTHORITATIVE for decisions
  └─ References File 06 (PRD) ← PROVISIONAL (older)

File 03 (Author Decisions)
  └─ Feeds into File 05 (Decision Register)

File 04 (Design Brief)
  └─ Locked for this feature (no changes during preflight)
  └─ Referenced by File 05 (Decision Register)

File 05 (Decision Register) ← AUTHORITATIVE CURRENT SOURCE
  ├─ Builds on File 04 (Design Brief)
  ├─ Incorporates File 03 (Author Decisions)
  └─ Supersedes File 06 (Provisional Draft)
```

---

## Inventory Compliance (FR-001)

| Requirement | Status | Evidence | Notes |
| ------------- | -------- | ---------- | ------- |
| All 6 source files analyzed | ✓ | Detailed file records above (01–06) | Complete |
| Versions extracted | ✓ | Version column: v1.0.0, v1.0.4, v1.3.0, v1.1.2, v1.9.0, v1.1.1 | All versions documented |
| Update timestamps documented | ✓ | Last Revised column: dates range 2026-11-04 to 2026-11-09 | Complete timestamp audit |
| Reconciliation status recorded | ✓ | Reconciliation Status column shows ✓ AUTHORITATIVE or ⚠️ OLDER | Clear status notation |
| Authority documented | ✓ | Authority Matrix section shows primary/secondary authorities | Role clarity |
| Conflicts identified | ✓ | Conflicts Identified table shows zero critical conflicts | Transparent conflict analysis |
| Precedence rule applied | ✓ | Version Precedence Rule section documents within-document revision precedence and per-topic authority | Rule followed per FR-002 |

**FR-001 Compliance**: ✅ **PASS** — All six source files analyzed, versions extracted, timestamps documented, reconciliation status recorded.

---

## Next Actions

1. ✓ **Inventory Complete** (T056 output)
2. 🔄 **Proceed to T057**: Blocking decisions validation (7 decisions × 3+ options each)
3. 🔄 **Proceed to T058**: Audit Prompt 3B/3C contracts for decision clarity
4. 🔄 **Proceed to T059**: Pre-approval reconciliation validation

---

**Inventoried**: 2026-11-09 | **Convergence Task**: T056 (FR-001 compliance) | **Authoritative Source**: File 05 (v1.9.0)
