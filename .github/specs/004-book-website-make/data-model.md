# Data Model: Book Website Figma Make Prompt Pack

**Feature**: 004-book-website-make | **Date**: 2026-11-09

---

## Entities

### Specification File

**Purpose**: Source truth for design and product requirements (one of six authoritative files in content/book/)

**Fields**:
- `id`: filename (01–06)
- `path`: absolute path to file (content/book/NN-title.md)
- `version`: semantic version (e.g., v1.0.0)
- `status`: "current" | "superseded" | "in-review"
- `approval_status`: "approved" | "pending" | "rejected"
- `last_updated`: ISO 8601 timestamp
- `dependencies`: array of Linear issue references (e.g., TOA-446, TOA-445)
- `sections`: map of section titles → content hash (for change tracking)

**Relationships**:
- Has many `DesignBaseline` elements (from 04-design-brief.md)
- Has many `DesignCandidate` elements (from 05-design-reader-decision-register.md)
- Has many `BlockingDecision` references (extracted from all six files)

**Validation Rules**:
- Version must be semantic (MAJOR.MINOR.PATCH)
- Must have at least one Linear issue reference
- Approval status must match file content
- Sections must not be empty

---

### Design Baseline

**Purpose**: Approved design elements locked for implementation (Space Grotesk, Inter, 9-color palette)

**Fields**:
- `id`: "design-baseline-001"
- `typography_headings`: "Space Grotesk" (font family, weights, sizes)
- `typography_body`: "Inter" (font family, weights, sizes)
- `typography_ui`: "Inter" (font family, weights, sizes)
- `colors_light_theme`: map of 9 named colors (e.g., { "primary": "#1a1a1a", ... })
- `colors_dark_theme`: map of 9 named colors (e.g., { "primary": "#ffffff", ... })
- `component_styles`: map of component names → style definitions (e.g., "Button", "Card", "Navigation")
- `theme_states`: array of ["light", "dark"]
- `approval_date`: ISO 8601 timestamp
- `approved_by`: "ashley" (owner name)

**Relationships**:
- Derived from `Specification File` (04-design-brief.md v1.1.2, 05-design-reader-decision-register.md v1.9.0)
- Excludes all `DesignCandidate` elements (R3, T1, RT2, C1)
- Used in Figma Make Prompt 2A (design-system baseline)

**Validation Rules**:
- All 9 colors must be defined for both themes
- Typography must include at least heading, body, and UI variants
- Component styles must reference Space Grotesk (headings) and Inter (body/UI)
- Approval date and approver must be present

---

### Design Candidate

**Purpose**: Unapproved design proposal with full specification but no approval status

**Fields**:
- `id`: "R3" | "T1" | "RT2" | "C1" (candidate identifier)
- `name`: full name (e.g., "Responsive Typography", "Additional Typography", "Reader Typography Controls", "Reader Continuity/Progress Tracking")
- `description`: detailed proposal
- `specification`: full technical specification (same level of detail as approved baseline)
- `rationale`: why this candidate was proposed
- `approval_status`: "unapproved" (explicit; never approved or rejected in current scope)
- `source_file`: reference to Specification File (always 05-design-reader-decision-register.md)
- `proposed_date`: ISO 8601 timestamp
- `proposed_by`: author name

**Relationships**:
- Not included in `DesignBaseline` (explicitly separate)
- Preserved in documentation (Prompt 2A notes which candidates are excluded)
- May be reconsidered in future phases

**Validation Rules**:
- Approval status must always be "unapproved"
- Specification must be complete (not stub)
- Must have rationale and source reference
- Must be documented as "not included" when baseline is generated

---

### Blocking Decision

**Purpose**: Unresolved choice preventing one or more Prompts from execution

**Fields**:
- `id`: "CC-01" through "CC-07" (decision identifier)
- `title`: short name (e.g., "Recovery-First Race Condition")
- `question`: complete decision point as question
- `blocking_prompts`: array of Prompt IDs affected (e.g., ["3B"], ["3A", "3C"])
- `options`: map of option ID → { description, trade-offs, impact }
- `decision`: "PENDING" | selected option ID
- `decided_date`: ISO 8601 timestamp (null if PENDING)
- `decided_by`: user name (null if PENDING)
- `rationale`: why decision was made (null if PENDING)

**Relationships**:
- Each blocking decision prevents one or more `FigmaMakePrompt` from execution
- Documented in research.md with full analysis
- Must be resolved before Prompt execution

**Validation Rules**:
- Blocking decision status must be "PENDING" initially
- Once resolved, decision field must contain selected option ID
- Decided date and decided_by must be present after resolution
- Must affect at least one Prompt

---

### Figma Make Prompt

**Purpose**: Executable specification for Figma Make with exact component names, acceptance criteria, and error handling

**Fields**:
- `id`: "Prompt 1" through "Prompt 3C" (Prompt identifier)
- `type`: "navigation-exposure" | "design-baseline" | "navigation-design" | "reader-access" | "recovery-flows" | "error-states"
- `title`: full name (e.g., "Navigation Exposure", "Design System Baseline Export", ...)
- `priority`: "P1" | "P2"
- `status`: "unblocked" | "blocked"
- `blocking_decisions`: array of BlockingDecision IDs that must be resolved
- `dependencies`: array of Prompt IDs that must execute first
- `exact_specification`: complete Figma Make prompt text (ready for execution)
- `acceptance_criteria`: array of testable criteria verifiable against Figma output
- `preview_generated`: ISO 8601 timestamp
- `approval_gate`: "design-approval" | "implementation-approval" | "none"

**Relationships**:
- Derived from `SpecificationFile` (01-06) and `DesignBaseline`
- Blocked by one or more `BlockingDecision` (Prompts 3B, 3C)
- Staged execution (Prompts 1→2A→2B→3A→3B/3C with approval gates)
- Generates output verified against `PreflightAnalysis`

**Validation Rules**:
- If status = "unblocked", blocking_decisions array must be empty
- If status = "blocked", blocking_decisions array must contain at least one ID
- Exact specification must be non-empty
- Acceptance criteria must be testable without implementation
- Approval gate must match workflow stage

---

### Preflight Analysis

**Purpose**: Complete inventory of source state, gaps, conflicts, approval boundaries, and exact previews ready for approval

**Fields**:
- `id`: "preflight-001"
- `analysis_date`: ISO 8601 timestamp
- `source_files_analyzed`: array of SpecificationFile IDs (01-06)
- `version_differences`: map of file ID → { current_version, previous_version, material_effect }
- `identified_gaps`: array of string descriptions (7 critical gaps documented in spec)
- `approval_boundaries`: { approved_elements: [...], unapproved_candidates: [...], unresolved_decisions: [...] }
- `exact_prompts_generated`: array of FigmaMakePrompt IDs with previews
- `blocked_prompts`: array of FigmaMakePrompt IDs with blocking reason
- `completeness_score`: percentage (0-100) of requirements covered

**Relationships**:
- Synthesizes all `SpecificationFile` analysis
- Documents all `BlockingDecision` items
- References all `FigmaMakePrompt` previews
- Used for user approval before implementation phase

**Validation Rules**:
- Must include all seven source files
- Must identify all 7 blocking decisions
- Completeness score must be ≥95 for "ready for planning"
- Approval boundaries must be exhaustive (no ambiguous items)

---

## Key Relationships

```text
SpecificationFile (01-06)
  ├── contains → DesignBaseline
  ├── contains → DesignCandidate (R3, T1, RT2, C1)
  └── references → BlockingDecision

DesignBaseline
  └── used_by → FigmaMakePrompt (2A, 2B)

DesignCandidate
  └── preserved_in → PreflightAnalysis (marked as unapproved)

BlockingDecision
  └── blocks → FigmaMakePrompt (3B, 3C)

FigmaMakePrompt
  └── documented_in → PreflightAnalysis

PreflightAnalysis
  └── synthesizes → all other entities (source state + approval boundaries)
```text

---

## State Transitions

### BlockingDecision State Machine

```text
PENDING
  └─ on decision made → RESOLVED (once decision field populated)
       └─ on implementation → CLOSED (after Prompt execution)
```text

### FigmaMakePrompt State Machine

```text
UNBLOCKED (if no blocking decisions)
  └─ on execution approved → EXECUTING → COMPLETED

BLOCKED (if any blocking decision PENDING)
  └─ on all blocking decisions RESOLVED → UNBLOCKED
       └─ on execution approved → EXECUTING → COMPLETED
```text

### PreflightAnalysis State Machine

```text
DRAFT (analysis in progress)
  └─ on all items documented → READY_FOR_REVIEW
       └─ on user approval → APPROVED
            └─ on implementation phase start → IN_EXECUTION
```text

---

## Validation Queries

**All Figma Make Prompts ready for execution?**
```text
SELECT * FROM FigmaMakePrompt WHERE status = 'unblocked'
Expected: 4 results (Prompts 1, 2A, 2B, 3A)
```text

**All blocking decisions resolved?**
```text
SELECT * FROM BlockingDecision WHERE decision = 'PENDING'
Expected: 0 results (none resolved until user input)
```text

**Design baseline complete?**
```text
SELECT * FROM DesignBaseline WHERE colors_light_theme.size == 9 
  AND colors_dark_theme.size == 9 
  AND typography_headings IS NOT NULL
Expected: 1 result (single baseline entity)
```text

**Unapproved candidates preserved?**
```text
SELECT * FROM DesignCandidate WHERE approval_status = 'unapproved'
Expected: 4 results (R3, T1, RT2, C1)
```text
