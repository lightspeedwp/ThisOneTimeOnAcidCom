---
name: "Labeling Workflow Skill"
description: "Manages GitHub issue and PR labeling with consistent taxonomy for
ThisOneTimeOnAcidCom."
type: "skill"
category: "workflow"
enabled: true
tags: ["labeling", "github", "taxonomy", "automation"]
---

# Labeling Workflow Skill

## Purpose

Maintain consistent GitHub issue and PR labeling using standardized taxonomy for
organization and automation.

## Label Taxonomy

All labels follow a prefix format: `prefix:category`

### Type Labels

Classify the nature of work:

- `type:bug` – Defect or incorrect behavior
- `type:feature` – New functionality or enhancement
- `type:task` – Discrete unit of work
- `type:documentation` – Documentation improvement
- `type:design` – Design-related work
- `type:test` – Testing and QA work
- `type:chore` – Maintenance, no user-facing changes

### Status Labels

Track workflow state:

- `status:needs-triage` – Requires initial review and classification
- `status:in-progress` – Currently being worked on
- `status:blocked` – Work is blocked, waiting on something
- `status:done` – Work is complete
- `status:on-hold` – Intentionally paused

### Priority Labels

Indicate urgency and importance:

- `priority:critical` – Blocks deployment or major functionality
- `priority:high` – Significant impact, should be prioritized
- `priority:normal` – Standard priority work
- `priority:low` – Nice-to-have, lower priority

### Area Labels

Categorize by component or area:

- `area:content` – Portfolio content and copy
- `area:design` – Design system and components
- `area:performance` – Performance optimization
- `area:accessibility` – WCAG compliance and accessibility
- `area:infrastructure` – Build, CI/CD, tooling
- `area:documentation` – Guidelines and reference docs

### Meta Labels

Special purpose tags:

- `meta:needs-changelog` – Requires CHANGELOG.md entry
- `meta:has-pr` – Associated with a pull request
- `meta:duplicate` – Duplicate of another issue
- `meta:needs-review` – Awaiting review
- `meta:good-first-issue` – Suitable for new contributors

## When to Label

### On Issue Creation

Apply minimum labels:

- One `type:*` label
- One `priority:*` label (default: `priority:normal`)
- One `area:*` label if applicable
- `status:needs-triage` if not immediately triaged

### On PR Creation

Apply:

- One `type:*` label matching PR purpose
- One `area:*` label if applicable
- `meta:has-pr` if issue exists
- `meta:needs-changelog` if user-facing

### During Triage

- Add/update `status:*` label
- Refine priority if needed
- Add area if missing
- Consolidate duplicates with `meta:duplicate`

### Before Merge

- Update status to match current state
- Ensure `meta:needs-changelog` is applied for user-facing changes
- Mark blocked issues with `status:blocked`

## Labeling Best Practices

- ✓ Use only prefixed labels (type:, status:, area:, priority:, meta:)
- ✓ Apply one type: label per issue
- ✓ Apply one priority: label per issue
- ✓ Use multiple area: labels if appropriate
- ✗ Don't mix prefixed and bare labels
- ✗ Don't create bare labels without prefixes
- ✗ Don't apply conflicting status labels simultaneously

## Label Application Examples

### Bug Report

```text
type:bug
priority:high
area:design
status:needs-triage

```text

### Feature Request

```text
type:feature
priority:normal
area:content
meta:good-first-issue

```text

### Documentation Update

```text
type:documentation
priority:normal
area:documentation
status:in-progress
meta:has-pr

```text

## References

- `../../.github/labels.yml` – Canonical label definitions (organization-wide)
- `../../docs/LABEL_STRATEGY.md` – Label taxonomy documentation
- `../../docs/LABELING.md` – Labeling guide and conventions
- [GitHub Labeling](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels) – GitHub docs

---

*Use this skill to maintain consistent GitHub labeling across the repository.*
