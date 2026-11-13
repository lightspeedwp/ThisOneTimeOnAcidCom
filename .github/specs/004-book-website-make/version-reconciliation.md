# Version Reconciliation: Book Website Figma Make Prompt Pack

**Spec Reference**: FR-002 (reconcile version mismatches 02 v1.0.3→v1.0.4, 03 v1.2.2→v1.3.0 and 05 v1.7.0→v1.9.0; newer version takes precedence; conflicts documented with explicit rationale)  
**Analysis Date**: 2026-11-09 (revision assessment added 2026-11-13)  
**Reconciliation Method**: Newer-revision precedence applies **within each document's own revision history**. Version numbers of different documents are independent and are not compared to rank one document above another; cross-document authority is assigned by topic (see the matrix below).

---

## Source Files Inventory

Six specification files from `content/book/` analysed for version consistency and conflict resolution.

| File | Current Version | Last Revised | Status | FR-002 revision |
| ------ | ----------------- | -------------- | -------- | ----------- |
| 01-book-website-specification.md | v1.0.0 | 2026-11-09 | ✓ Current | Not named |
| 02-companion-session-plan.md | v1.0.4 | 2026-11-09 | ✓ Current | v1.0.3 → v1.0.4 |
| 03-author-decisions-launch-scope.md | v1.3.0 | 2026-11-09 | ✓ Current | v1.2.2 → v1.3.0 |
| 04-design-brief.md | v1.1.2 | 2026-11-08 | ✓ Current | Not named |
| 05-design-reader-decision-register.md | v1.9.0 | 2026-11-09 | ✓ Current | v1.7.0 → v1.9.0 |
| 06-website-reading-prd.md | v1.1.1 | 2026-11-04 | ⚠ Older | Not named |

---

## Version Reconciliation Matrix

Topic authority is assigned by each document's role, not by comparing version numbers across documents.

| Category | Authoritative source | Supporting sources | Rationale |
| ---------- | ------------------- | ------------------ | ----------- |
| **Navigation Exposure** | **File 03 (v1.3.0)** | File 01, File 02, File 05 | File 03 records Ash's author decisions on launch scope and navigation boundaries; File 05 is consulted for related component directions only |
| **Design Baseline** | **File 04 (v1.1.2)** | File 05 (approved foundations versus candidates) | File 04 is the explicit design-requirements document; File 05 distinguishes approved values from unapproved candidates |
| **Reader Access Policy** | **File 05 (v1.9.0)** | File 06 (v1.1.1, provisional draft) | File 05 is the decision register; File 06 is marked a provisional draft |
| **Recovery Flows** | **File 05 (v1.9.0)** | File 02, File 06 | File 05 records the selected recovery boundaries; supporting mechanics remain unapproved |
| **Error States** | **File 05 (v1.9.0)** | File 06 | File 05 contains the only explicit form-feedback direction |
| **Approval Boundaries** | **Each document's own approval record** | File 05 (register approvals) | Approval in one document does not approve content in another |

---

## Material Version Differences (FR-002 Revisions)

The earlier revisions named in FR-002 are not stored separately in this repository. Each assessment below relies on the bottom changelog or in-body revision entries of the current file in `references/`. Content-level diffs of the earlier revisions were **not** performed and remain unverified.

### File 02: v1.0.3 → v1.0.4

**Source**: File 02 changelog, v1.0.4 entry (2026-11-09).

**Change**: Records the DR-03 audit provenance, the inspected skill revision and the exact native-reference requirement; qualifies the earlier violation conclusion as unestablished for the assessed scope.

**Material effect on the prompt pack**: None identified. The change affects planning provenance only; no prompt contract, design value or reader-access rule changes. The unresolved catalogue applicability, guidance-source ambiguity and transfer gaps remain open.

**Resolution**: v1.0.4 takes precedence.

---

### File 03: v1.2.2 → v1.3.0

**Source**: File 03 changelog, v1.3.0 entry (2026-11-09).

**Change**: Records the wording-approved shared launch HTML-sitemap requirement to omit the Speaking/workshops, Events and Media/press cards, while keeping their public URLs, no menu or footer links, `noindex` and no page deletion or private treatment. The editable Figma Make destination and revision, exact URL mappings and implementation responsibility remain unconfirmed; XML-sitemap work remains separate.

**Material effect on the prompt pack**: **Affects Prompt 1 (navigation exposure)**. Prompt 1 and its acceptance criteria must omit those three cards from the HTML sitemap and must not remove the routes, add menu or footer links, or treat the pages as private.

**Resolution**: v1.3.0 takes precedence.

**Recorded-version discrepancy (annotated)**: File 01 (v1.0.0, line 27) and File 02 (v1.0.4, line 40) both record File 03 as "inspected version 1.2.1", but FR-002 names v1.2.2 as the earlier revision. File 03's changelog contains both v1.2.1 (2026-11-08) and v1.2.2 (2026-11-09); the v1.2.2 entry reconciles the retained-page inventory, indexing and hand-off wording. Both entries are historical inspection records, so the recorded version is preserved and each is now annotated as superseded, pointing to FR-002 and the current v1.3.0. The upstream Linear source documents still need the same correction.

---

### File 05: v1.7.0 → v1.9.0

**Source**: File 05 in-body revision entry for v1.8.0 and changelog entry for v1.9.0.

**Changes**:

- **v1.8.0 (2026-11-09)**: Adds the corrected partial-success recovery candidate, four selected recovery boundaries, a separate PSR review and the PSR-02 amendment history. The recovery-first race, lifetime, numerical controls, safeguards and feasibility remain unresolved.
- **v1.9.0 (2026-11-09)**: Records Ash's selected primary waitlist-action, conditional whole-card navigation and evidence-based form-feedback directions, separately from proposal-only component acceptance and register candidate C1.

**Material effect on the prompt pack**:

- **Prompt 3B (recovery flows)**: Must use only the four selected recovery boundaries and must not treat the unresolved mechanics as approved.
- **Prompt 2A (component guidance)** and **Prompt 3C (error states)**: The waitlist-action, whole-card and form-feedback directions are selected directions, not accepted component specifications.

**Resolution**: v1.9.0 takes precedence. File 02 (line 42) still cites the register at v1.7.0; this is a historical reference and is not updated here.

---

### File 04 (v1.1.2) and File 06 (v1.1.1)

FR-002 names no revision change for these files. File 06 remains a provisional draft ("needs substantial revision; not implementation- or launch-ready"). Where File 06 differs from File 05 on reader access, File 05 is used because it is the decision register for that topic, not because its version number is higher.

---

## Approved Baseline Confirmation

✓ **Design Baseline** (from File 04 v1.1.2):

- Typography: Space Grotesk (headings), Inter (body/UI)
- Colour palette: as approved in File 05; unresolved mappings remain unapproved

⚠ **Approval Status**: The six source files are used as the specification basis. This does not approve their unresolved candidates, mappings or execution.

---

## Reconciliation Summary

| Metric | Result |
| -------- | -------- |
| **FR-002 revisions assessed** | 3 of 3 (from changelog and revision entries) |
| **Revisions with material prompt effects** | 2 (File 03 → Prompt 1; File 05 → Prompts 2A, 3B, 3C) |
| **Content-level diffs of earlier revisions** | Not performed (earlier revisions unavailable) |
| **Recorded-version discrepancies** | 1 annotated locally (File 03 recorded as v1.2.1 in Files 01 and 02; FR-002 names v1.2.2); upstream correction pending |
| **Cross-document version comparison** | Not used for precedence |

**Status**: ⚠️ **PARTIAL** — Revision changes and their material effects are documented from changelog evidence. Full reconciliation remains pending until the upstream source documents correct the File 03 recorded version and the prompt contracts reflect the effects listed above.

---

## Acceptance Criteria (FR-002 Compliance)

- ✅ All six source files analysed and versions extracted
- ✅ FR-002 revision changes documented with material-effect assessment (changelog-based)
- ✅ Precedence rule applied within each document's revision history
- ✅ Conflicts documented with explicit rationale
- ✅ File 03 recorded-version discrepancy annotated in local Files 01 and 02
- ⬜ File 03 recorded-version discrepancy (v1.2.1 vs v1.2.2) corrected in upstream source documents
- ⬜ Prompt contracts updated for the material effects above

**Reconciliation Recorded**: 2026-11-09 (revised 2026-11-13) | **Created by**: Convergence Phase 8 (T052)
