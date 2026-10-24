# Data Model: Guidelines Refactor (TOA-358)

**Specification:** [Specification 003](./spec.md) | **Research:** [research.md](./research.md)  
**Status:** Phase 1 Design — Pending Owner Gate Decisions  
**Date:** 2026-10-24

---

## Overview

The Guidelines Refactor consolidates, reorganises and documents 116 existing guideline artefacts plus 9 supporting documents, with conditional creation of up to 33 new guidance documents. This data model defines the entity types, relationships and state transitions that govern the refactoring operation.

---

## Entity Types

### 1. Guideline Document (G-Entity)

**Definition:** An existing markdown document in `guidelines/` that provides development or design guidance.

**Fields:**
- `id`: G001–G116 (sequential identifier)
- `current_path`: Path relative to repository root (e.g., `guidelines/Guidelines.md`, `guidelines/components/Button.md`)
- `current_hash`: SHA-256 hash of file content at baseline commit `b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9`
- `content_type`: One of `rule`, `reference`, `example`, `decision`, `pattern`, `troubleshooting`
- `unique_safeguards`: List of critical safeguards, bundler restrictions or preservation rules
- `historical_provenance`: Author, creation date, related issues/PRs (if documented)
- `dependencies`: List of other guideline IDs this document references or depends on

**State Transitions (G-Document):**
```text
BASELINE (verified at creation)
  → REVIEWED (read-only inspection complete)
  → RECONCILED (decision D4 specifies destination)
  → CONSOLIDATED (changes applied; old path mapped if moved)
  → VERIFIED (verification checksum matches expected)
  → COMPLETE
```

**Validation Rules:**
- Each G-entity must preserve all unique safeguards and historical notes
- No content deletion without explicit approval (D5)
- Current path must exist and be accessible (gate Phase 2 start)
- Hash must match baseline or discrepancy must be documented

---

### 2. Supporting Document (S-Entity)

**Definition:** A protected or specially governed document that supports guideline refactor operations.

**Fields:**
- `id`: S001–S009 (sequential identifier)
- `path`: Repository-relative path to document (e.g., `.claude/skills/branch-validation/SKILL.md`, `AGENTS.md`)
- `status`: One of `protected`, `locked`, `inventory`, `reference`
- `protected_file_approval_required`: Boolean (true if requires `locked-files-guard`)
- `current_content_hash`: SHA-256 hash at baseline
- `dependencies`: List of G-entities or N-entities this document references
- `edits_required`: Scope of changes (e.g., "Update references to G042", "Add new skill definition")

**Mapped S-Entities:**
```text
S001: .claude/skills/INVENTORY.md (reference)
S002: .agents/skills/workflow-orchestration/SKILL.md (protected; symlinked from .claude/skills/)
S003: .agents/skills/validate/SKILL.md (protected; symlinked from .claude/skills/)
S004: .agents/skills/test/SKILL.md (protected; symlinked from .claude/skills/)
S005: .agents/skills/changelog/SKILL.md (protected; symlinked from .claude/skills/)
S006: .agents/skills/branch-validation/SKILL.md (protected; symlinked from .claude/skills/)
S007: .agents/skills/labeling/SKILL.md (protected; symlinked from .claude/skills/)
S008: AGENTS.md (protected)
S009: CONTRIBUTING.md (protected)
```

**State Transitions (S-Document):**
```text
BASELINE
  → SCOPED (edits defined)
  → APPROVAL REQUESTED (locked-files-guard or protected-file approval sought)
  → APPROVED (explicit approval recorded)
  → UPDATED (changes applied)
  → VERIFIED (checksum validated)
  → COMPLETE
```

**Validation Rules:**
- All protected S-entities require approval before merge
- Changes must be bounded to scope defined in plan.md
- No unrelated changes permitted on protected files
- Approval evidence must be traceable (GitHub review, recorded decision)

---

### 3. New Guidance Document (N-Entity)

**Definition:** A conditional new document proposed for creation as part of guidelines refactor.

**Fields:**
- `id`: N001–N033 (sequential identifier)
- `proposed_path`: Path where document would be created (e.g., `guidelines/accessibility-checklist.md`)
- `category`: One of `reference`, `inspiration`, `wordpress`, `organization`, `pages`, `patterns`, `reports`, `platform`
- `approval_status`: One of `pending`, `approved`, `rejected`, `conditional`
- `dependencies`: Gate(s) that must be resolved before creation (e.g., D1, D4)
- `related_g_entities`: List of G-entities this document complements or replaces
- `estimated_size`: Word count estimate for planning

**State Transitions (N-Document):**
```text
PROPOSED (at spec creation)
  → APPROVAL PENDING (awaiting owner decision D4)
  → APPROVED (explicit approval recorded in D4)
  → CONTENT DEVELOPED (written, reviewed)
  → INTEGRATED (pointers created, G-replacements mapped)
  → VERIFIED (linkage validated)
  → COMPLETE

OR

  → REJECTED (not approved in D4)
  → ARCHIVED (decision recorded, path reserved)
```

**Validation Rules:**
- Creation only if approved as part of D4 gate decision
- Must reference related G-entities or pointer replacements
- Pointers to old G-paths must be maintained if G-document is replaced
- No orphaned documents (every N must have clear purpose and linkage)

---

### 4. Pointer / Redirect (P-Entity)

**Definition:** A short document that redirects readers from an old guideline location to a new one.

**Fields:**
- `id`: P001–P∞ (temporary, not pre-numbered)
- `old_path`: Previous location (e.g., `guidelines/old-pattern.md`)
- `new_path`: Current location (e.g., `guidelines/patterns/new-pattern.md`)
- `redirect_type`: One of `moved`, `merged`, `archived`, `renamed`
- `status`: One of `pending`, `deployed`, `verified`
- `created_timestamp`: When redirect was created

**Validation Rules:**
- Old path must exist at baseline (verified during G-entity inspection)
- New path must exist or be created before pointer is deployed
- Redirect must be authorised by D5 (preservation strategy decision)
- Markdown must link explicitly to new location with context

---

## Relationships & Dependencies

### G-to-N Dependencies
```text
G-Entity → [CONSOLIDATED TO] → N-Entity
(if G is deprecated and replaced by new N-document)

G-Entity → [REFERENCED BY] → N-Entity
(if N complements or extends G)
```

**Example:**
- G042: "CSS Architecture Rules" → moves to N014: "Styling Discipline & BEM Guidelines"
- G015: "Component Patterns" → referenced by N027: "Advanced Pattern Library"

### G-to-P Dependencies
```text
G-Entity → [REDIRECTED VIA] → P-Entity → [POINTS TO] → G-or-N-Entity
(if G is moved but old path must remain discoverable)
```

**Example:**
- Old location: `guidelines/old-rules.md` (G-entity at baseline)
- New location: `guidelines/consolidated/new-rules.md` (G-entity after consolidation)
- Redirect: `guidelines/old-rules.md` becomes a pointer to new location

### S-to-G/N Dependencies
```text
S-Entity → [REFERENCES] → G-Entity or N-Entity
(S-documents like AGENTS.md reference guideline locations)
```

**Example:**
- S008 (AGENTS.md) references G012 (path convention table)
- When G012 moves, S008 must update reference

---

## Validation & State Model

### Inventory Reconciliation
```text
BASELINE STATE:
  G-count: 116 files in guidelines/
  S-count: 9 protected/reference documents
  N-count: 33 proposed new documents (pending D4 approval)
  
EXPECTED COMPLETE STATE:
  G-count: 116 ✓ (no G-documents deleted; paths mapped or redirected)
  S-count: 9 ✓ (updated references, no new S-documents unless approved)
  N-count: 0–33 (depends on D4 approval subset)
  P-count: Variable (depends on D5 preservation strategy)
```

### Verification Checksum
```text
Baseline checksum (all 116 G-files + 9 S-files):
  Computed at: b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9
  
Expected post-refactor checksum:
  All 116 unique safeguards preserved ✓
  All 9 S-files dependencies updated ✓
  All references/pointers validated ✓
```

---

## Decision Gates & State Dependencies

| Gate | Controls | Impact on Model |
| --- | --- | --- |
| **D1** (book/site identity) | N-documents that make identity claims | Blocks N-content development for identity-bearing docs |
| **D2** (manuscript/access) | Publication boundaries in documentation | Blocks N-documents about access control, visibility |
| **D3** (design authority) | Design examples, palette/font references | Blocks design-related N-documents until authority confirmed |
| **D4** (destinations & N-subset) | Which N-documents are created; G→new-path mapping | Blocks all G/N operations until mapping confirmed |
| **D5** (preservation) | P-entity creation, old-path handling | Blocks pointer/redirect operations |
| **D6** (backend) | Backend integration documentation | Blocks N-documents about signup/contact/providers |
| **D7** (branch naming) | Specification branch validation and PR routing | ✅ RESOLVED — Branch `docs/spec-003-guidelines-reconcile` validated |
| **D8** (WordPress) | WordPress-related guidance scope | Blocks N-documents about WordPress migration |

---

## Summary

**Entities:**
- 116 G-documents (existing guidelines)
- 9 S-documents (supporting/protected documents)
- 33 N-documents (conditional new documents; pending D4)
- P-documents (redirects/pointers; count depends on D5)

**Key Constraints:**
- Non-destructive consolidation: all G-documents preserved or explicitly redirected
- Protected files require approval: S-documents locked until `locked-files-guard` approval
- Conditional creation: N-documents only created if D4-approved
- Verification: all unique safeguards and dependencies traced and validated

**Next Phase:**
Proceed to contracts/ and quickstart.md once owner decisions (D1–D8) are recorded in requirements.md checklist.

---

*Data model complete 2026-10-24 | Awaiting gate decisions for Phase 2*
