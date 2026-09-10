# Sub-audit 7 — Protected files and filesystem conventions

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/project-stability-audit/07-filesystem-conventions.md`

---

## Context

Cleanup audits and AI-assisted refactoring can accidentally delete protected files, misplace documentation, or break the project structure. This sub-audit establishes comprehensive filesystem conventions, protected file policies, and archiving rules to prevent these regressions.

---

## Step 1 — Protected files verification

Verify the following files exist and are documented as protected in `/guidelines/Guidelines.md`:

### Root directory protected files
- [ ] `/README.md` — Project overview (create if missing; follow standard format)
- [ ] `/CHANGELOG.md` — Release history (create if missing; must follow [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format and [Semver](https://semver.org/) versioning)
- [ ] `/Attributions.md` — System-protected (cannot be moved or deleted)

### Protected components
- [ ] `/components/figma/ImageWithFallback.tsx` — System-protected (cannot modify or delete)

### Protected system folders
- [ ] `/utils/supabase/` — Deployment artifact; cannot be deleted even though Supabase is NOT used on this project

### Protected workflow folders
- [ ] `/prompts/` — Never delete prompt files unless expressly stated by the user
- [ ] `/tasks/task-list.md` — All-purpose master checklist; never delete

---

## Step 2 — Supabase non-usage policy

Document clearly in Guidelines.md:

```markdown
### Supabase policy
- Supabase is **NOT used** on this project
- The `/utils/supabase/` folder is a system-protected deployment artifact — it cannot be deleted
- Never suggest, connect, or implement Supabase functionality
- If the `supabase_connect` tool is dismissed, do not suggest it again
```

---

## Step 3 — Folder convention verification

Verify every file is in its correct location:

| Content type | Required location | Check |
|---|---|---|
| Guideline `.md` files | `/guidelines/` or subfolders | [ ] |
| User-facing documentation `.md` | `/docs/` | [ ] |
| AI prompt `.md` files | `/prompts/` or subfolders | [ ] |
| Audit reports `.md` | `/reports/{topic}/` | [ ] |
| Task lists `.md` | `/tasks/` | [ ] |
| Scripts `.sh`, `.py`, `.ts` | `/scripts/` | [ ] |
| Figma imports | `/imports/` (root, not `/src/imports/`) | [ ] |

**Root directory check:**
- [ ] Only allowed `.md` files in root: `README.md`, `CHANGELOG.md`, `Attributions.md`
- [ ] No `.sh` scripts in root
- [ ] No orphaned `.md` files in root
- [ ] Config files (`.json`, `.js`, `.ts`, `.toml`) are acceptable in root

---

## Step 4 — Task list management conventions

### All-purpose task list
- `/tasks/task-list.md` is the master general-purpose checklist
- Simple one- or two-checkbox tasks go here
- Full audits get their own dedicated task list (e.g., `/tasks/project-stability-audit-tasks.md`)
- This file must NEVER be deleted

### Master task list tracker
Create or update `/tasks/master-task-list.md`:
- This file does NOT contain actual tasks
- It references all active and archived task lists with links
- It links related reports to each task list entry
- It is updated whenever a task list is created, completed, or archived

**Format:**
```markdown
# Master task list tracker

## Active task lists

| Task list | Created | Status | Related reports |
|---|---|---|---|
| [task-list.md](./task-list.md) | Feb 25, 2026 | Active (ongoing) | N/A |
| [project-stability-audit-tasks.md](./project-stability-audit-tasks.md) | Mar 4, 2026 | Active | [reports](../reports/project-stability-audit/) |

## Archived task lists

| Task list | Created | Archived | Related reports |
|---|---|---|---|
| [example-tasks.md](./archived/example-tasks.md) | Feb 20, 2026 | Mar 1, 2026 | [report](../reports/archived/example/) |
```

### Task list archiving process
1. When ALL tasks in a task list are marked complete:
   - Move the file from `/tasks/` to `/tasks/archived/`
   - Update `/tasks/master-task-list.md`: move entry from "Active" to "Archived" with archive date
   - Update `/guidelines/Guidelines.md` status section
2. Task lists in `/tasks/archived/` can be deleted after 30 days
3. Only delete from `/tasks/archived/` — never delete active task lists

---

## Step 5 — Report management conventions

### Report archiving process
1. When a report's associated task list is 100% complete:
   - Move the report folder from `/reports/{topic}/` to `/reports/archived/{topic}/`
   - Update `/tasks/master-task-list.md` with the new archived location
2. Reports in `/reports/archived/` can be deleted after 7 days
3. Only delete from `/reports/archived/` — never delete active reports
4. Run this cleanup check regularly to keep the system clean

### Report lifecycle
```
Created → Active (tasks in progress) → Completed (all tasks done) → Archived (7 days) → Deleted
```

---

## Step 6 — Guidelines.md update checklist

Update `/guidelines/Guidelines.md` with:

- [ ] Complete protected files list (root files, components, system folders)
- [ ] Supabase non-usage policy
- [ ] Task list management conventions (all-purpose list, master tracker, archiving)
- [ ] Report archiving conventions (7-day rule, archived folder, deletion process)
- [ ] Prompt folder protection rule (never delete unless expressly stated)
- [ ] `/imports/` folder location (root, not `/src/imports/`)
- [ ] Status update sections for each major audit

---

## Step 7 — CHANGELOG verification

If `/CHANGELOG.md` exists, verify:
- [ ] Follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format
- [ ] Uses [Semver](https://semver.org/) version numbers
- [ ] Has entries for recent changes
- [ ] Categories used: Added, Changed, Deprecated, Removed, Fixed, Security

If `/CHANGELOG.md` does NOT exist, create it with:
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Project stability audit orchestrator and 7 sub-audits

## [8.2.0] - 2026-03-04
...
```

---

## Output format

```markdown
## Protected files status

| File/Folder | Expected | Exists? | Protected in Guidelines? |
|---|---|---|---|
| `/README.md` | Root | ✅ | ✅ |
| `/CHANGELOG.md` | Root | ✅ | ✅ |

## Folder convention violations

| File | Current location | Correct location |
|---|---|---|

## Task list inventory

| File | Status | Tasks remaining |
|---|---|---|

## Report inventory

| Folder | Age | Status | Action |
|---|---|---|---|

## Guidelines.md updates needed

| Section | Status |
|---|---|
| Protected files list | Needs update |
| Supabase policy | Needs adding |
```
