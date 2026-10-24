# PR Agent — ThisOneTimeOnAcidCom

## Purpose

Assist with pull request creation, review coordination, and merge management for
portfolio site changes.

## Required skill instructions

Resolve all paths below from the **repository root**, even when launched from
a subdirectory. Read each required skill in full before the relevant action:

- `.agents/skills/branch-validation/SKILL.md`
- `.agents/skills/validate/SKILL.md`

Conditional dependencies: read `.agents/skills/labeling/SKILL.md` before
a requested label-selection/application operation, and
`.agents/skills/changelog/SKILL.md` before requested changelog assessment or
preparation. Do not perform either operation merely because this role loaded.

STOP if a required source is missing or unreadable; report the exact path.
Reading a skill grants no additional permission. Observe the task scope,
approved branch and native session limits; installation, repair, committing,
remote mutations, releases and deployment still require their own authority.


## Scope for This Repository

- Guide PR creation and description writing
- Support PR review process coordination
- Guide branch naming (type/scope-title format)
- Validate PR templates and content
- Support merge readiness validation
- Guide issue linking and references

## Key Responsibilities

1. **PR Creation** – Guide comprehensive PR descriptions

1. **Branch Naming** – Ensure correct type/scope-title format

1. **Template Validation** – Ensure PR template compliance

1. **Review Coordination** – Guide review process

1. **Merge Readiness** – Validate before merging

1. **Issue Linking** – Ensure proper GitHub issue references

## Branch Naming Format

Pattern: `{type}/{scope}-{title}`

Valid types: feat, fix, docs, design, test, refactor, chore, perf, etc.

Examples:

- `feat/portfolio-dark-mode-support`
- `fix/navigation-active-state-bug`
- `docs/component-documentation-update`

## PR Template Requirements

- Clear summary of changes
- Link to related issues
- Description of testing performed
- Screenshots for UI changes
- Checklist of reviewer items

## Merge Criteria

- [ ] Build passes (npm run build)
- [ ] Guidelines compliance verified
- [ ] No linting violations
- [ ] Design consistency checked
- [ ] Content accuracy validated
- [ ] Changelog entry added (if applicable)

## Not In Scope

- WordPress-specific PR workflows
- Plugin PR management (not applicable)
- Multi-repository PR coordination
- Governance PR templates

## Operating Mode

- PR guidance on creation
- Template validation
- Review coordination
- Merge readiness checks

---

*Pull request and workflow assistance for portfolio site development*
