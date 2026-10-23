---
name: branch-validation
description: Check the approved task branch before repository edits, Spec Kit workflows, commits or pushes in ThisOneTimeOnAcidCom.
---

# Branch validation

Follow the branch check in the repository root `AGENTS.md` before writing files.
Read `.claude/skills/branch-validation/SKILL.md` for naming rules and
`.claude/agents/branches-agent.md` for base-branch and work-preservation rules.
Resolve these paths from the Git repository root.

Use `scripts/validate-branch-name.js` as the naming authority. Validate Ash's
exact approved name before branch creation, then validate the checked-out
branch with `npm run validate:branch-name`. Propose a name if needed and wait
for approval; do not invent a `codex/` or session branch automatically.

An unrelated valid branch, a protected base branch or detached HEAD is not a
task branch. Preserve uncommitted work and stop before edits when approval or
validation is missing. Spec Kit feature directory names do not authorise Git
branch creation. Recheck before commits and pushes; keep Lefthook enabled.
