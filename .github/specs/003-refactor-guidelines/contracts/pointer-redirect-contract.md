# Contract: Pointer & Redirect Strategy

**Specification:** [Specification 003](../spec.md) | **Data Model:** [../data-model.md](../data-model.md)  
**Status:** Design Contract — Awaiting Owner Decision (D5)  
**Date:** 2026-10-24

---

## Overview

This contract defines how guideline documents are redirected when moved, consolidated or archived during the refactoring process. It implements the non-destructive consolidation principle and establishes the pointer/redirect interface.

---

## Pointer Types & Formats

### Type 1: Path Relocation Pointer

**Scenario:** A guideline is moved to a new location within `guidelines/`.

**Example:**
- Old path: `guidelines/old-rules.md` (exists at baseline)
- New path: `guidelines/core-rules.md` (after consolidation)
- Action: Replace `guidelines/old-rules.md` with pointer

**Format:**

```markdown
# [Original Title] — See Updated Location

> **This guideline has been relocated.**
> 
> **New location:** [New Path & Link]
> 
> **Why:** Brief explanation (consolidated with X, renamed for clarity, etc.)
> 
> **When:** [Date moved]

---

## Updated Content

For the current version of this guidance, see:

**→ [New Guideline Title](./core-rules.md)**

---

## Historical Note

This document previously provided guidance on [topic]. That guidance has been:
- ✅ Preserved and updated in the new location
- ✅ Cross-referenced in [related guidelines]
- ✅ Maintained for backward compatibility via this pointer

If you bookmarked this old URL, please update your reference to the new location above.
```

**Validation:**
- [ ] Old path exists (verified at baseline)
- [ ] New path exists and is accessible
- [ ] Link in pointer document works
- [ ] Explanation is accurate
- [ ] No hardcoded paths (use relative links)

---

### Type 2: Consolidation Pointer

**Scenario:** A guideline is consolidated into another document.

**Example:**
- Old path: `guidelines/old-pattern-a.md` (deprecated)
- Old path: `guidelines/old-pattern-b.md` (deprecated)
- New path: `guidelines/consolidated-patterns.md` (combined)
- Action: Both old paths become pointers to new consolidated document

**Format:**

```markdown
# [Original Title] — Consolidated

> **This content has been consolidated with related guidance.**
> 
> **Updated guideline:** [Link to Consolidated Document]
> 
> **What changed:** This guidance was merged with [related topic] in [date].

---

## See Also

- Related guidance now appears in: **[Consolidated Title](./consolidated-patterns.md)**
- Other pattern guidelines: 
  - [Pattern A](./patterns/pattern-a.md)
  - [Pattern B](./patterns/pattern-b.md)

---

## Archive Note

This document is now read-only and serves as a redirect.
For the current, maintained version, see the link above.
```

**Validation:**
- [ ] All old paths that are being consolidated exist (verified)
- [ ] New consolidated path exists
- [ ] All related old documents point to same new location
- [ ] Links work

---

### Type 3: Archival/Deprecation Pointer

**Scenario:** A guideline is no longer maintained and is archived. Must reference replacement guidance or explicitly state "No replacement guidance available".

**Example:**
- Old path: `guidelines/deprecated-tech-stack.md`
- Action: Document stays at old path but marked as archived with pointer to current guidance or explicit archive status
- **Requirement:** Either provide a `Current guidance` link OR explicitly state "No replacement guidance available"

**Format (with replacement):**

```markdown
# [Original Title] — Archived

> **This guidance is archived and no longer maintained.**
> 
> **Status:** Archived on [date]
> 
> **Why:** [Reason — technology deprecated, approach superseded, decision reversed, etc.]
> 
> **Current guidance:** See [New/Related Guideline](./link.md)

---

## Original Content (Historical Reference)

> [Original content preserved in full below — read-only]

[Original guideline content here, unchanged]

---

## Context & History

This guideline was created [date] to address [original purpose].
It was archived because [reason].

For questions about this historical content, see:
- Related issue: [#NNN or TOA-NNN]
- Decision record: [Link if applicable]
```

**Validation:**
- [ ] Original content is preserved in full
- [ ] Archival reason is clear
- [ ] Either: replacement guidance link exists and is accurate, OR explicit "No replacement guidance available" statement is present
- [ ] File remains readable (not deleted)

---

## Pointer Governance

### Creation Authority

Pointers (P-entities) are created only when:

1. **D5 (Preservation Strategy) is resolved** — Owner decision defines pointer approach
2. **Scope is approved in plan.md** — Each pointer operation is explicitly scoped
3. **Old path is verified** — Document exists at baseline and is accessible

### Pointer Maintenance

**During implementation:**
- [ ] Pointer is created AFTER new document exists and is verified
- [ ] Old document is replaced with pointer (not deleted)
- [ ] New document is linked from pointer
- [ ] Reverse link is added to new document (if applicable): "Formerly: [old path]"

**After merge:**
- [ ] Pointer link is tested (both directions)
- [ ] Search indexing respects pointer (no duplicate index entries)
- [ ] No hardcoded paths in pointer (use relative links)

### Pointer Limits

**Maximum pointer chain depth:** 1 hop
- ❌ WRONG: Old Path → Pointer A → Pointer B → New Path (2 hops)
- ✅ RIGHT: Old Path → Pointer → New Path (1 hop)

**Reason:** Prevents link decay and reader confusion. If a document moves twice, update all pointers to point directly to the final location.

---

## Link Integrity Validation

### Before Merge

Run validation to confirm all pointers work:

```bash
# Manual check (no automation available yet):
# 1. Find all pointer documents (search for "This guideline has been")
# 2. Test each link: does old path → new path work?
# 3. Verify new document is accessible
# 4. Check reverse reference if applicable
```

**Checklist per pointer:**
- [ ] Old path exists and is accessible
- [ ] Pointer document replaces old file
- [ ] Pointer link to new path works (relative path syntax checked)
- [ ] New document exists and has content
- [ ] Reverse link in new document (if applicable)
- [ ] No hardcoded absolute paths

### Post-Merge

- [ ] Link validation passes (run again after merge)
- [ ] Search results updated (verify old path doesn't appear in search)
- [ ] Analytics/redirect tracking (if applicable)

---

## Relation to Other Contracts

### vs. Guideline Interface Contract

Pointer documents are **exempt** from the full Guideline Interface structure:
- ❌ Do NOT require Purpose & Scope sections (pointer IS the scope)
- ❌ Do NOT require Core Rules sections (pointer explains relocation)
- ✅ DO preserve historical content in full (archival pointers)
- ✅ DO include links to related/new guidelines

### vs. Approval Process Contract

Pointer creation is governed by:
- ✅ **`locked-files-guard` approval** (modifications to `guidelines/` require protected-files approval)
- ✅ **D5 approval** (preservation strategy gate decision; required in addition to locked-files-guard)
- ✅ **Scope-bounded changes** (pointer creation is explicit operation)

---

## Acceptance Criteria

This pointer contract is satisfied when:

1. ✅ All pointer documents conform to one of three type formats above
2. ✅ Pointer links are valid and tested
3. ✅ D5 (preservation strategy) decision authorizes pointer operations
4. ✅ Each pointer operation is scoped in plan.md and verified before merge
5. ✅ No pointer chains exceed depth 1
6. ✅ Link integrity validation passes
7. ✅ Historical content is preserved in archival pointers

---

*Contract complete 2026-10-24 | Awaiting D5 (Preservation Strategy) decision*
