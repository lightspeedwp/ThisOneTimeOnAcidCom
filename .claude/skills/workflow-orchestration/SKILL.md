---
name: "Workflow Orchestration Skill"
description: "Guides the 4-step audit/prompt/report/task workflow with templates and best practices for ThisOneTimeOnAcidCom."
type: "skill"
category: "workflow"
enabled: true
tags: ["workflow", "audit", "prompt", "report", "task", "orchestration"]
version: "1.0.0"
created: "2026-10-22"
---

# Workflow Orchestration Skill

## Purpose

Guide teams through the **4-step AI-assisted workflow** used in ThisOneTimeOnAcidCom:

1. **Create prompt** — Define audit scope and methodology
2. **Run audit** — Execute against codebase and guidelines
3. **Save report** — Document findings with evidence
4. **Extract tasks** — Decompose into actionable checklist

This skill consolidates guidance from:
- `guidelines/Guidelines.md` § "Default AI Workflow"
- `guidelines/prompt-creation-guidelines.md`
- `guidelines/report-creation-guidelines.md`

---

## When to Use

Use this skill when:
- ✅ Writing a new audit or investigation prompt
- ✅ Setting up a report structure for findings
- ✅ Creating a task list from audit results
- ✅ Archiving completed work
- ✅ Running multi-step orchestrator audits

## Workflow Decision Tree

**Start here:** What are you doing?

```
Are you running an audit/investigation?
├─ YES → Continue below
└─ NO → This skill may not apply; check specific domain skills

Single audit or multi-step orchestrator?
├─ Single audit (one .md file) → Section: Single-File Workflow
├─ Multi-step (orchestrator + sub-prompts) → Section: Orchestrator Workflow
└─ Archiving completed work → Section: Archiving Completed Work
```

---

## Section 1: Single-File Workflow

**Use this for:** Simple one-time audits, quick investigations, focused scans

### Step 1A: Create the Prompt

**File location:** `/prompts/{topic}.md`

**Naming convention:** Lowercase, hyphens, descriptive
- ✅ `css-audit.md`
- ✅ `accessibility-violations-audit.md`
- ❌ `CSS Audit.md` (wrong case)
- ❌ `css_audit.md` (underscore instead of hyphen)

**Required YAML frontmatter:**

```yaml
---
title: "Audit Title Here"
filename: "/prompts/{topic}.md"
created: "YYYY-MM-DD"
modified: "YYYY-MM-DD"
version: "1.0.0"
prompt_type: "single-audit"
estimated_duration: "30 minutes"
related_reports: "/reports/{topic}/"
related_tasks: "/tasks/{topic}-tasks.md"
---
```

**Use this template:** Copy from `templates/prompt-frontmatter-single.yml`

### Step 1B: Define Audit Scope

**Structure your prompt with:**
- **Objective** — What are you auditing? (1–2 sentences)
- **Scope** — Which files/areas? (bullet list or file patterns)
- **Method** — How will you audit? (step-by-step process)
- **Acceptance criteria** — What counts as "complete"?

**Example:**
```markdown
---
title: "CSS Architecture Audit"
# [frontmatter]
---

## Objective

Identify Tailwind utility violations in `/styles/blocks/` and recommend BEM refactoring.

## Scope

- All files in `src/styles/blocks/*.css`
- Component JSX files using Tailwind classes
- Exclude: node_modules, dist, archived/

## Method

1. Scan all block CSS files for forbidden patterns
2. List each Tailwind utility found
3. Cross-reference with BEM CSS Compliance Skill
4. Prioritize by frequency and impact

## Acceptance Criteria

- [ ] All Tailwind utilities catalogued
- [ ] BEM replacements identified
- [ ] Report saved to `/reports/css-audit/`
```

### Step 2A: Run the Audit

Execute the audit prompt against the codebase. The AI will follow your methodology and document findings.

### Step 3A: Save the Report

**File location:** `/reports/{topic}/report.md` (single file inside topic folder)

**Required YAML frontmatter:**

```yaml
---
title: "Audit Title Report"
filename: "/reports/{topic}/report.md"
created: "YYYY-MM-DD"
modified: "YYYY-MM-DD"
version: "1.0.0"
report_type: "audit"
related_prompt: "/prompts/{topic}.md"
related_tasks: "/tasks/{topic}-tasks.md"
status: "complete"
---
```

**Use this template:** Copy from `templates/report-frontmatter-single.yml`

**Report structure:**
- Executive summary (1 paragraph)
- Findings register (table: ID | Finding | File | Severity | Evidence | Recommendation)
- Recommendations (prioritized by impact)
- Verification steps (how to validate findings)
- Next steps (link to task list)

### Step 4A: Extract Tasks

**File location:** `/tasks/{topic}-tasks.md`

**Required YAML frontmatter:**

```yaml
---
title: "Task List: {Topic}"
filename: "/tasks/{topic}-tasks.md"
created: "YYYY-MM-DD"
modified: "YYYY-MM-DD"
version: "1.0.0"
related_prompt: "/prompts/{topic}.md"
related_report: "/reports/{topic}.md"
status: "active"
---
```

**Task list structure:**
- Overview (1–2 sentences on what these tasks accomplish)
- Task checklist (each line is one actionable task)
- Dependencies (if any)
- Estimated completion date

**Example:**
```markdown
---
title: "Task List: CSS Architecture Audit"
# [frontmatter]
---

## Overview

Refactor Tailwind utilities to BEM classes across `/styles/blocks/`. 10 tasks, ~4 hours.

## Tasks

- [ ] Task 1: Refactor `hero.css` utilities → BEM (hero-hero.css)
- [ ] Task 2: Refactor `blog-card.css` utilities → BEM
- [ ] Task 3: Update component imports (Hero.tsx uses new classes)
- [ ] Task 4: Validate CSS with `/bem-css-compliance` skill
- [ ] Task 5: Run build test to confirm no regressions
- [ ] Task 6: Archive old Tailwind-based block files
- [ ] Task 7: Update Guidelines.md § CSS references
- [ ] Task 8: Commit and push
- [ ] Task 9: Create PR
- [ ] Task 10: Archive completed task list (after PR merge)

## Dependencies

- Report: `/reports/css-audit.md` must be complete
- Skill: `/bem-css-compliance` should be available

## Estimated Completion

2026-11-01 (4 hours, 2 developers)
```

---

## Section 2: Orchestrator Workflow

**Use this for:** Complex audits with multiple stages, different teams, or interdependent investigations

### Step 1B: Create Orchestrator Folder

**File location:** `/prompts/{topic}/`

**Naming convention:** Lowercase, hyphens, descriptive folder

```
/prompts/modern-react-migration/           ← folder name
├── 00-ORCHESTRATOR.md                     ← always named 00-ORCHESTRATOR.md
├── 01-es5-react-audit.md                  ← sub-prompts numbered 01, 02, 03...
├── 02-tailwind-violations-audit.md
├── 03-css-architecture-alignment.md
└── 04-component-structure-audit.md
```

### Step 2B: Create Orchestrator Prompt

**File location:** `/prompts/{topic}/00-ORCHESTRATOR.md`

**Required YAML frontmatter:**

```yaml
---
title: "Orchestrator: {Topic}"
filename: "/prompts/{topic}/00-ORCHESTRATOR.md"
created: "YYYY-MM-DD"
modified: "YYYY-MM-DD"
version: "1.0.0"
prompt_type: "orchestrator"
estimated_duration: "2 hours"
sub_prompts: ["01-...", "02-...", "03-..."]
related_reports: "/reports/YYYY-MM-DD-{topic}/"
related_tasks: "/tasks/{topic}-tasks.md"
---
```

**Orchestrator structure:**
- Overview (what does this orchestrator accomplish?)
- Sub-prompt list (1–3 sentences per sub-prompt)
- Execution order (which runs first, which depend on others?)
- Consolidation step (how to merge sub-audit findings?)
- Acceptance criteria

**Example:**
```markdown
---
title: "Orchestrator: Modern React Migration"
# [frontmatter]
---

## Overview

Audit ThisOneTimeOnAcidCom's React codebase against modern best practices (ES5 bundler compat, 
no Tailwind, BEM-only CSS). Four sub-audits run in parallel, then findings consolidate.

## Sub-Prompts

### 01-es5-react-audit.md
Verify code conforms to Figma Make bundler restrictions (no optional chaining, nullish 
coalescing, import.meta.env, nested ternaries, for...of).

### 02-tailwind-violations-audit.md
Identify remaining Tailwind utility classes; map to BEM equivalents.

### 03-css-architecture-alignment.md
Verify all CSS follows semantic BEM; no inline styles; no !important; correct dark mode 
selectors.

### 04-component-structure-audit.md
Review component file organization; confirm protected files aren't modified; validate data 
imports from mock/.

## Execution Order

**Parallel phase (all run simultaneously):**
- Sub-prompt 01 (ES5 audit)
- Sub-prompt 02 (Tailwind audit)
- Sub-prompt 03 (CSS architecture)
- Sub-prompt 04 (Component structure)

**Consolidation phase (after all complete):**
- Merge findings into master report
- Prioritize by frequency + impact
- Create unified task list

## Acceptance Criteria

- [ ] All 4 sub-audits complete
- [ ] Consolidated report in `/reports/YYYY-MM-DD-modern-react-migration/`
- [ ] Task list extracted to `/tasks/modern-react-migration-tasks.md`
```

### Step 3B: Create Sub-Prompts

**File location:** `/prompts/{topic}/01-{title}.md`, `/prompts/{topic}/02-{title}.md`, etc.

**Required YAML frontmatter for each sub-prompt:**

```yaml
---
title: "Sub-Audit: {Title}"
filename: "/prompts/{topic}/01-{title}.md"
created: "YYYY-MM-DD"
modified: "YYYY-MM-DD"
version: "1.0.0"
prompt_type: "sub-prompt"
execution_order: 1
parent_orchestrator: "/prompts/{topic}/00-ORCHESTRATOR.md"
related_report: "/reports/YYYY-MM-DD-{topic}/01-{title}.md"
---
```

### Step 4B: Run Sub-Audits

Execute each sub-prompt independently. Document findings in parallel.

### Step 5B: Save Sub-Reports

**File location:** `/reports/YYYY-MM-DD-{topic}/01-{title}.md`, etc.

**Required YAML frontmatter:**

```yaml
---
title: "Report: {Sub-Audit Title}"
filename: "/reports/YYYY-MM-DD-{topic}/01-{title}.md"
created: "YYYY-MM-DD"
modified: "YYYY-MM-DD"
version: "1.0.0"
report_type: "audit"
related_prompt: "/prompts/{topic}/01-{title}.md"
parent_orchestrator_report: "/reports/YYYY-MM-DD-{topic}/00-CONSOLIDATED.md"
status: "complete"
---
```

### Step 6B: Consolidate Findings

**File location:** `/reports/YYYY-MM-DD-{topic}/00-CONSOLIDATED.md`

**Consolidation structure:**
- Executive summary (findings across all sub-audits)
- Master findings register (merged from all sub-reports)
- Prioritized recommendations (high → low impact)
- Unified task list link

### Step 7B: Extract Master Task List

**File location:** `/tasks/{topic}-tasks.md`

One task list per orchestrator. Tasks should be grouped by sub-audit or by priority.

---

## Section 3: Archiving Completed Work

**Use this when:** Task list is 100% complete, findings are implemented, work is done

### Archive Checklist

Before archiving, confirm:
- [ ] All tasks in task list are marked complete
- [ ] All findings have been addressed or explicitly deferred
- [ ] Report is finalized (no draft sections)
- [ ] No open questions or blockers

### Archive Process

**Step 1: Move report to archive**

```bash
# Single-file report
mv ./reports/{topic}.md ./reports/archived/{topic}.md

# Orchestrator report folder
mv ./reports/YYYY-MM-DD-{topic}/ ./reports/archived/YYYY-MM-DD-{topic}/
```

**Step 2: Update master task list**

Edit `/tasks/master-task-list.md`:
- Move entry from "Active" section to "Completed (pending archive)"
- Add completion date

**Step 3: Keep prompt for reference (optional)**

Prompts can stay in `/prompts/` for re-running. Leave as-is unless superseded.

**Step 4: Clean up after 30 days**

After task list is in "Completed" section for 30 days, permanently move to `./tasks/archived/`.

---

## Critical Rules (Never Violate)

### Rule 1: Never Delete `/tasks/task-list.md`

```
🚫 FORBIDDEN:
rm /tasks/task-list.md
git rm /tasks/task-list.md
```

This is the **master general-purpose task list**. It must always exist.

**Why?** It's the catch-all for quick tasks that don't justify a dedicated orchestrator. Losing it breaks ongoing task tracking.

**What to do instead:**
- Archive completed tasks within task-list.md (move to "Archived" section)
- Never delete the file itself
- Keep at least one active entry so the file is never empty

### Rule 2: One Task List Per Orchestrator

Each multi-step orchestrator prompt gets exactly one task list:
- `/tasks/{topic}-tasks.md` ← linked from prompt and report

Don't create:
- ❌ `/tasks/{topic}-part-1.md` + `/tasks/{topic}-part-2.md` (split tasks)
- ❌ `/tasks/{topic}.md` + `/tasks/{topic}-followup.md` (orphaned followups)

**Why?** Tracking is easier when all related tasks live in one file.

### Rule 3: Frontmatter Is Always Required

Every prompt, report, and task list starts with YAML frontmatter. No exceptions.

**Required fields:**
- `title` — Human-readable title
- `filename` — Full path to this file
- `created` — ISO date (YYYY-MM-DD)
- `modified` — ISO date (YYYY-MM-DD)
- `version` — Semantic version (X.Y.Z)
- Context fields (prompt_type, report_type, related_prompt, etc.)
- If a prompt relies on project guidance, it MUST link each specific guideline file that it uses in a `Related Guidelines` section

Missing frontmatter means:
- ❌ Automation tools can't discover the file
- ❌ Versioning is broken
- ❌ Cross-references are unclear

### Rule 4: Use Correct Folder Locations

**No exceptions:**

| Content | Location | Example |
|---------|----------|---------|
| Prompts | `/prompts/` | `/prompts/css-audit.md` |
| Reports | `/reports/` | `/reports/css-audit.md` or `/reports/2026-10-22-css-audit/` |
| Tasks | `/tasks/` | `/tasks/css-audit-tasks.md` |
| Archived | `/reports/archived/`, `/tasks/archived/` | `/reports/archived/2026-02-01-old-audit/` |

**Never put:**
- ❌ Prompts in `/reports/` or `/docs/`
- ❌ Reports in `/prompts/` or root
- ❌ Tasks in `/reports/` or root

---

## Templates

### Template 1: Prompt Frontmatter (Single-File)

**Location:** `templates/prompt-frontmatter-single.yml`

Copy and customize:

```yaml
---
title: "Audit: {Your Title Here}"
filename: "/prompts/{topic}.md"
created: "2026-10-22"
modified: "2026-10-22"
version: "1.0.0"
prompt_type: "single-audit"
estimated_duration: "1 hour"
related_reports: "/reports/{topic}/"
related_tasks: "/tasks/{topic}-tasks.md"
---
```

### Template 2: Report Frontmatter (Single-File)

**Location:** `templates/report-frontmatter-single.yml`

Copy and customize:

```yaml
---
title: "Report: {Your Title Here}"
filename: "/reports/{topic}.md"
created: "2026-10-22"
modified: "2026-10-22"
version: "1.0.0"
report_type: "audit"
related_prompt: "/prompts/{topic}.md"
related_tasks: "/tasks/{topic}-tasks.md"
status: "complete"
---
```

### Template 3: Task List Frontmatter

**Location:** `templates/task-frontmatter.yml`

Copy and customize:

```yaml
---
title: "Task List: {Your Title Here}"
filename: "/tasks/{topic}-tasks.md"
created: "2026-10-22"
modified: "2026-10-22"
version: "1.0.0"
related_prompt: "/prompts/{topic}.md"
related_report: "/reports/{topic}.md"
status: "active"
---
```

### Template 4: Orchestrator Frontmatter

**Location:** `templates/orchestrator-frontmatter.yml`

Copy and customize:

```yaml
---
title: "Orchestrator: {Your Title Here}"
filename: "/prompts/{topic}/00-ORCHESTRATOR.md"
created: "2026-10-22"
modified: "2026-10-22"
version: "1.0.0"
prompt_type: "orchestrator"
estimated_duration: "2 hours"
sub_prompts: ["01-first", "02-second", "03-third"]
related_reports: "/reports/2026-10-22-{topic}/"
related_tasks: "/tasks/{topic}-tasks.md"
---
```

---

## References

**Full documentation (for deep dives):**
- `guidelines/prompt-creation-guidelines.md` — Complete prompt spec
- `guidelines/report-creation-guidelines.md` — Complete report spec
- `guidelines/Guidelines.md` § "Default AI Workflow" — High-level workflow
- `guidelines/Guidelines.md` § "Mandatory Folder Conventions" — Folder rules
- `guidelines/Guidelines.md` § "Task list management conventions" — Archiving process

**Related skills:**
- `/bem-css-compliance` — For CSS audits
- `/dark-mode-implementation` — For dark mode audits

---

## Quick Start Checklist

Running your first audit?

- [ ] Decide: Single-file or orchestrator?
- [ ] Create `/prompts/{topic}.md` (or folder + 00-ORCHESTRATOR.md)
- [ ] Add required YAML frontmatter (copy from templates)
- [ ] Define scope, method, acceptance criteria
- [ ] Run audit; document findings
- [ ] Create `/reports/{topic}.md` with frontmatter
- [ ] Extract `/tasks/{topic}-tasks.md`
- [ ] Link all three files together (cross-reference in frontmatter)
- [ ] Begin implementing tasks
- [ ] Archive when 100% complete

---

_Workflow orchestration skill for ThisOneTimeOnAcidCom audits and investigations._
