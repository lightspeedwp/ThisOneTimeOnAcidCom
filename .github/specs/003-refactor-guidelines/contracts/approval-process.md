# Contract: Approval Process for Protected-File Edits

**Specification:** [Specification 003](../spec.md) | **Guideline Interface:** [guideline-interface.md](./guideline-interface.md)  
**Status:** Design Contract — Awaiting Owner Approval  
**Date:** 2026-10-24

---

## Overview

This contract defines the approval workflow for changes to S-documents (supporting documents in protected paths). It implements Constitution § II (Repository Governance) and AGENTS.md § 331–343 (Protected Files).

---

## Approval Scope

### Protected Paths Requiring Approval

The following S-documents require `locked-files-guard` approval before changes merge:

1. **S002–S007:** Six existing skills in `.claude/skills/`
   - `workflow-orchestration/SKILL.md`
   - `validate/SKILL.md`
   - `test/SKILL.md`
   - `changelog/SKILL.md`
   - `branch-validation/SKILL.md`
   - `labeling/SKILL.md`

2. **S008:** `AGENTS.md` (agent instructions, repository governance)

3. **S009:** `CONTRIBUTING.md` (contributor workflow, governance)

**Note:** S001 (`.claude/skills/INVENTORY.md`) is a reference document; edits may not require formal approval if scope-bounded to inventory only.

### Unprotected Paths (Reference Only)

- `guidelines/` documents (G-entities) — No approval required; changes validated through code review
- Proposed new documents (N-entities) — Approval required via D4 gate (owner decision), not via `locked-files-guard`

---

## Approval Workflow

### Pre-Approval Phase

1. **Scope Definition** (in plan.md § Implementation)
   - Define exactly which S-document will be changed
   - List each change type: update reference, add new skill definition, clarify scope
   - Estimate effort: hours to complete edits

2. **Dependency Mapping** (in data-model.md)
   - Identify all G-entities this S-document references
   - Identify all N-entities this S-document will reference after refactor
   - Document which changes depend on D-gate resolutions

3. **Change Review** (static review, no merge)
   - Author prepares changes locally
   - Create branch (validation required)
   - Stage changes; do NOT commit yet
   - Request review from governance stakeholder (owner or designated reviewer)

### Approval Request Phase

**PR Description Format (for protected-file edits):**

```markdown
## S-Document Refactor: [S00X name]

### Changes Requested
- [ ] Update reference from G042 → G042 (consolidated path)
- [ ] Add new skill definition for [feature]
- [ ] Clarify scope boundaries
- [ ] Update cross-references (list)

### Scope Bounded To
- **File:** `.claude/skills/[name]/SKILL.md`
- **Lines changed:** [count]
- **Type:** [reference update / new definition / clarification]

### Approval Required
- **Type:** `locked-files-guard` (Constitution § II, AGENTS.md § 331)
- **Justification:** Changes to protected governance documentation
- **Impact:** Affects [N developers/agents/processes]

### Related Gates
- Depends on: D1, D4 (owner decisions)
- Blocks: Phase 2 implementation until approved

### Verification Checklist
- [ ] All safeguards preserved
- [ ] Cross-references validated
- [ ] No unrelated changes included
- [ ] Branch name follows pattern: `docs/spec-003-*`
```

### Approval Phase

**Approver Checklist:**

- [ ] Scope is bounded to stated S-document
- [ ] Changes do not leak into unrelated files
- [ ] All unique safeguards are preserved
- [ ] References are accurate and updated
- [ ] Rationale for changes is clear
- [ ] Depends-on D-gates are resolved or noted
- [ ] No governance policy simplification without recorded amendment

**Approval Evidence:**

- GitHub PR approval by owner or designated reviewer
- OR recorded decision in requirements.md checklist
- Evidence persisted as: PR comment, checklist entry, or decision issue

---

## Post-Approval Phase

### Commit & Merge

1. **Commit** (after approval recorded)
   ```bash
   git add [specific S-file paths only]
   git commit -m "refactor(003-guidelines): Update references in AGENTS.md

   - Consolidate G042 reference to new location
   - Add scope clarification for protected files
   - Update cross-references to S007 (labeling skill)

   Closes: TOA-358 (part 3 of 3: S-documents)
   Approval: [PR URL or decision reference]
   Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
   ```

2. **Push** (to feature branch)
   ```bash
   git push -u origin docs/spec-003-guidelines-reconcile
   ```

3. **Create PR** (draft or ready)
   - Title: "Refactor 003: Update supporting documents (S-Documents)"
   - Body: Approval request template above
   - Labels: `type:documentation`, `area:governance`
   - Link: "Related to TOA-358"

4. **Review & Merge**
   - Require approval from owner or reviewer
   - Require CI pass (branch validation, build, etc.)
   - Squash or rebase per repo convention
   - Mark as completed when merged

---

## Approval Authority

**Decision Gates That Unblock Approval:**

| Gate | Impact | Resolution Required |
|---|---|---|
| **D0** (protected-file policy) | Confirms approval requirement retained | ✅ RESOLVED — existing policy |
| **D1** (book/site identity) | Blocks S-documents that claim identity | Owner decision session (recorded in requirements.md D1 section) |
| **D4** (destinations & N-subset) | Gates S-documents that reference new N-paths | Owner decision session (recorded in requirements.md D4 section) |

**Approval Without D-Gate Resolution:**

- S-documents that update *references only* (no new claims) can be approved before D1/D4 resolve
- S-documents that clarify *existing scope* can be approved before D-gates resolve
- **Exceptions:** S-documents that make identity claims or reference N-paths MUST await gate resolution

---

## Governance Anchors

**Constitutional Basis:**
- Constitution § II.Protected Files: "AGENTS.md, CONTRIBUTING.md ... are read-only system artifacts"
- Constitution § II.Amendment Process: "All amendments ... must be ... Approved by owner before implementation"

**Repository Basis:**
- AGENTS.md § 331–343: Protected and locked files (full list)
- CONTRIBUTING.md § 612–627: Repository governance and policy

---

## Acceptance Criteria

This approval process is followed when:

1. ✅ S-document changes are scoped and defined in plan.md
2. ✅ Approval request is formatted per template above
3. ✅ D-gate dependencies are documented
4. ✅ Approval evidence is recorded (PR comment, decision, checklist)
5. ✅ Changes are committed with approval reference
6. ✅ PR includes all required information before merge

---

*Contract complete 2026-10-24 | Awaiting D-gate resolutions and owner approval authority*
