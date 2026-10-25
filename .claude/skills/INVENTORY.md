# Shared Skill Inventory

**Spec Reference:** `.github/specs/003-refactor-guidelines/spec.md` (S001)  
**Updated:** 2026-10-25  
**Status:** Pointer to canonical inventory

See [the canonical inventory](../../.agents/skills/INVENTORY.md) for complete documentation. This directory maintains six custom skill links to `.agents/skills/` and hosts ten Spec Kit generated skills.

## Six Custom Shared Skills

| Skill | Source | Purpose |
|-------|--------|---------|
| Branch Validation | `branch-validation/SKILL.md` | Validate branch names per repository strategy |
| Changelog | `changelog/SKILL.md` | Manage CHANGELOG.md per Keep a Changelog format |
| Labeling | `labeling/SKILL.md` | GitHub issue/PR labeling with consistent taxonomy |
| Testing | `test/SKILL.md` | Plan and execute test strategy and quality gates |
| Validation | `validate/SKILL.md` | Read-only assessment; separately authorised execution |
| Workflow Orchestration | `workflow-orchestration/SKILL.md` | Prompt, audit, report and task workflow |

## Guidelines Refactor Impact

Phase 2 of Specification 003 (Guidelines Refactor) preserves all existing skill definitions and references. Updated skill documentation may reference new `guidelines/` structure per consolidation results. See [Consolidation Requirements](../../.github/specs/003-refactor-guidelines/checklists/requirements.md) for implementation details.
