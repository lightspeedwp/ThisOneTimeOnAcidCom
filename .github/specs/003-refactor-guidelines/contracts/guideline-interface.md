# Contract: Guideline Interface & Structure

**Specification:** [Specification 003](../spec.md) | **Data Model:** [data-model.md](../data-model.md)  
**Status:** Design Contract — Awaiting Owner Approval  
**Date:** 2026-10-24

---

## Overview

This contract defines the structural and content expectations for all guideline documents, both existing (G-entities) and new (N-entities). It establishes the interface between guidelines authors, consumers (developers/agents), and the refactoring process.

---

## Guideline Structure Contract

### Required Sections

Every guideline document MUST include:

1. **Title & Metadata Block** (frontmatter or markdown h1)
   ```markdown
   # [Title]
   **Status:** [Active/Draft/Archived]
   **Last Updated:** [Date]
   **Author(s):** [Name(s)]
   **Related:** [Links to related guidelines or decisions]
   ```

2. **Purpose & Scope**
   - Clear statement of why this guideline exists
   - Explicit scope boundaries (what is/isn't covered)
   - Link to decision or requirement that established this guideline

3. **Core Rules or Recommendations**
   - Numbered or bulleted list of specific guidance
   - Each rule marked as ✅ REQUIRED or 🟡 RECOMMENDED
   - Bundler/tooling constraints called out explicitly

4. **Examples** (where applicable)
   - Code, configuration or pattern examples
   - Expected outcomes and edge cases
   - Links to real implementations in codebase

5. **Related Guidelines** (cross-references)
   - Links to complementary or prerequisite guidelines
   - Notation: "See also: [Guideline Name](path)"

6. **Questions & Clarification**
   - If guidelines are incomplete, note what's pending
   - Reference to decision gate that blocks completion
   - Example: "D1 approval required to define voice for memoir section"

### Optional Sections

- **History:** Timeline of changes and rationale
- **FAQ:** Common questions and answers
- **Troubleshooting:** Known issues and solutions
- **Appendix:** Reference tables, formulas, color palettes

---

## Content Expectations by Type

### Rule Guidelines (`content_type: rule`)
```text
Purpose: Establish absolute requirements or forbidden patterns

Format:
- Title: "Rule Name"
- Statement: "You MUST / MUST NOT [specific action]"
- Rationale: Why this rule exists (bundler constraint, safety, consistency)
- Examples: ✅ Correct & ❌ Wrong patterns side-by-side
- Exception Process: "To request exception, [process]"
```

**Examples:**
- "Bundler Compatibility Rules" (Guidelines.md § 2)
- "Protected Files" (AGENTS.md § 331)

---

### Reference Guidelines (`content_type: reference`)
```text
Purpose: Document architecture, structure or lookup tables

Format:
- Title: "Reference: [Topic]"
- Table or structured data
- Description of each row/column
- Usage notes: How to apply the reference
- Version: When last verified
```

**Examples:**
- "Path convention" (AGENTS.md § 124–137)
- "Tech stack" (AGENTS.md § 140–154)

---

### Example Guidelines (`content_type: example`)
```text
Purpose: Show working patterns or implementations

Format:
- Title: "Pattern: [Name]"
- Use case: When to apply this pattern
- Code/markup example
- Expected result
- Related guidelines: Links to rules this pattern follows
```

**Examples:**
- "Semantic BEM CSS" (CONTRIBUTING.md § 256–277)

---

### Decision Guidelines (`content_type: decision`)
```text
Purpose: Document architectural decisions and rationale

Format:
- Title: "Decision: [Topic]"
- Date & owner: When decided, who decided
- Problem: What was decided
- Options considered: Alternatives and why they were rejected
- Decision: What was chosen
- Impact: What changes as a result
- Status: Active/Superseded
```

**Examples:**
- "npm-only package manager" (AGENTS.md § 156–176)
- "Node.js 24 LTS pinning" (AGENTS.md § 178–191)

---

## Refactoring Expectations

### Preservation of Safeguards

When consolidating or moving guideline documents, the following MUST be preserved:

- ✅ All bundler restrictions (forbidden syntax patterns)
- ✅ All protected-file notations
- ✅ All "REQUIRED" rules (marked as must-follow)
- ✅ All rationale for decisions
- ✅ All links to related issues/decisions
- ✅ Author attribution and historical provenance

### Breaking Changes Not Permitted

The following operations are NOT permitted without explicit approval:

- ❌ Removing a REQUIRED rule without replacement
- ❌ Changing a forbidden pattern to allowed without rationale
- ❌ Deleting historical context or decision records
- ❌ Moving a guideline without updating all cross-references
- ❌ Creating inconsistent terminology (rename "should" vs "may" without explanation)

### Link Integrity Requirements

All guidelines MUST maintain:

- ✅ Internal cross-references (links between guidelines)
- ✅ External cross-references (links to issues #NNN, Linear TOA-NNN)
- ✅ Code examples linked to actual source files or inline code blocks
- ✅ Path references accurate to repository structure (see AGENTS.md § 124–137)

**Verification Method:**
```bash
# Before merge, validate guideline structure:
find guidelines -name "*.md" -type f | while read file; do
  # Check for valid frontmatter structure
  head -10 "$file" | grep -q "^---" || echo "WARN: $file missing frontmatter"
done
# Note: npm run journal:check-links validates content/journal/ only, not guidelines/
# Manual review: verify all cross-references in guidelines/ resolve correctly
```

---

## Quality Gates

### Before Refactor

- [ ] All 116 G-documents hash-verified at baseline
- [ ] All 9 S-documents dependencies mapped
- [ ] All cross-references inventoried (129 candidates identified)

### During Refactor

- [ ] Each G-document: safeguards preserved
- [ ] Each S-document edit: scope-bounded
- [ ] Each N-document: approval confirmed (D4)
- [ ] Each P-document: old path verified to exist

### After Refactor

- [ ] Link integrity validation passes
- [ ] Cross-reference reconciliation complete
- [ ] Unique safeguards audit completed
- [ ] Historical provenance preserved or noted as archived

---

## Governance & Approval

**Authority:** Constitution § II (Repository Governance)

**Approval Requirements:**
- G-document refactoring: No approval needed (read-only inspection + changes scoped to guidelines/ only)
- S-document refactoring: `locked-files-guard` approval required (AGENTS.md § 331–343)
- N-document creation: D4 approval required (owner decision gate)
- P-document creation: D5 approval required (preservation strategy)

---

## Acceptance Criteria

This contract is satisfied when:

1. ✅ All 116 G-documents conform to structure expectations or are marked as exceptions
2. ✅ All REQUIRED rules are preserved in current or consolidated form
3. ✅ All cross-references are updated and verified
4. ✅ All S-document changes have approval evidence
5. ✅ All N-documents approved via D4 follow structure expectations
6. ✅ Link integrity validation passes

---

*Contract complete 2026-10-24 | Awaiting gate decisions D1–D8*
