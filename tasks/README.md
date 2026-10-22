# Tasks Directory

Master task tracker and project management documents for ThisOneTimeOnAcidCom
feature development and governance work.

---

## Core File (Protected)

### `task-list.md` ⚠️ PROTECTED

## Never delete, move or rename this file

`task-list.md` is the master task tracker that:

- Lists all active, in-progress, and completed tasks across all projects
- Serves as the source of truth for project status
- Is referenced by specifications, prompts, and reports
- Must be maintained as the primary task coordination document

## When making changes to `task-list.md`

1. Use GitHub Issues as the primary interface (tasks reference issues)

1. Update the master list with completion status

1. Link to related specifications and prompts

1. Never delete historical task entries; mark as archived instead

---

## Organization

Task documents are organized by project phase, feature area, or initiative:

```text
tasks/
├── task-list.md                  ← Master tracker (PROTECTED)
├── {topic}-tasks.md              ← Individual feature/audit task breakdowns
├── {topic}-implementation-plan.md  ← Implementation details and timelines
├── archived/                     ← Completed or deferred task documents
└── README.md                     ← This file

```text

**Subdirectories:**

- **`archived/`** — Completed or deferred task documents (clean up the root `tasks/` directory by moving finished tasks here)

---

## Task Naming Convention

Task documents follow descriptive naming patterns:

### Active Tasks

```text
{topic}-tasks.md
{topic}-implementation-plan.md
{topic}-checklist.md
{topic}-deployment-checklist.md

```text

**Examples:**

- `animation-movement-tasks.md` — Feature: animation and movement
- `dark-mode-implementation-checklist.md` — Feature: dark mode implementation
- `codebase-consistency-implementation-plan.md` — Audit: codebase consistency

### Archived Tasks

Move completed or deferred tasks to `archived/`:

```text
archived/{topic}-tasks.md
archived/{topic}-deployment-checklist.md (archived 2026-10-17)

```text

---

## How Tasks Connect to Other Systems

### Specifications → Tasks

1. **Spec written** — `/speckit-specify` creates `.github/specs/{NNN-feature}/spec.md`

1. **Plan created** — `/speckit-plan` creates `.github/specs/{NNN-feature}/plan.md`

1. **Tasks decomposed** — `/speckit-tasks` creates `.github/specs/{NNN-feature}/tasks.md`

1. **Reference in master list** — Link to spec in `task-list.md` with status

**Example entry:**

```markdown

- [ ] Repository Governance (TOA-241) — `.github/specs/001-repo-governance-*/tasks.md`

```text

### Prompts → Reports → Tasks

1. **Audit run** — Copy prompt from `prompts/` into Claude

1. **Findings documented** — Results saved to `.github/reports/{category}/{date}-{topic}.md`

1. **Action items extracted** — Add to `task-list.md` with links to report

**Example:**

```markdown

- [ ] Fix bundler compatibility issues (see `.github/reports/audit/2026-10-17-bundler-review.md`)

```text

### Issues → Tasks

1. **GitHub Issue created** — Describes work needed

1. **Task added to `task-list.md`** — With issue reference

1. **Linked specification or prompt** — If applicable

1. **Implementation tasks** — Breakdown in related `.md` file

---

## Task Status Tracking

### In `task-list.md`

Use checkboxes to track completion:

```markdown

## Feature: Dark Mode Implementation

- [x] Design dark palette (completed 2026-09-15)
- [ ] Implement theme switcher component
- [ ] Test dark mode across all pages
- [ ] Deploy to production

```text

### In Feature-Specific Files

Detailed checklists within feature documents:

```markdown

## Phase 1: Design System Updates

- [x] Create dark theme tokens in `design-tokens/`
- [x] Update `guidelines/dark-mode-implementation.md`
- [ ] Audit component contrast ratios
- [ ] Add component dark-mode stories

**Progress:** 2/4 (50%)

```text

---

## Creating New Tasks

### From a Specification

After `/speckit-tasks` generates `.github/specs/{NNN-feature}/tasks.md`:

1. Link it in `task-list.md` with a summary

1. Use spec-level checkboxes to track implementation

1. Reference individual tasks in PRs and commits

### From an Audit Report

After completing an audit and saving findings to `.github/reports/`:

1. Extract action items into a new `{topic}-tasks.md`

1. Reference the report: `See `.github/reports/audit/2026-10-17-{topic}.md``

1. Add summary entry to `task-list.md`

### From an Issue

When a GitHub Issue needs detailed task breakdown:

1. Create `{feature}-tasks.md` or add to existing file

1. Link the issue: `Closes #123` or `Related to #123`

1. Update `task-list.md` with issue reference and status

---

## Cleanup Guidelines

Keep the root `tasks/` directory clean:

1. **After completion** → Move to `archived/` with completion date

1. **Superseded tasks** → Archive the old file, create new one with reference

1. **Deferred indefinitely** → Archive with note on deferral reason

1. **Keep `task-list.md`** → Master list stays at root, never archive

## Example archival note

```markdown

# {topic}-tasks.md (archived 2026-10-17)

*Archived after completion. See task-list.md for summary and `.github/reports/`
for findings.*

```text

---

## Related Files

- **[Task Master Tracker](./task-list.md)** — Source of truth for all tasks
- **[Specification Catalog](../.github/specs/CATALOG.md)** — Feature specifications with task breakdowns
- **[Reports Directory](../.github/reports/)** — Audit findings and metrics
- **[Prompts Directory](../prompts/)** — Audit and feature prompts
- **[GitHub Issues](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues)** — Issue tracking

---

*Last updated: 2026-10-17*
*Remember: Never delete `task-list.md`. Archive completed tasks instead.*
