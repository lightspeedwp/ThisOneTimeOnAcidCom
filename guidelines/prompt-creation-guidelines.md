---
title: "Prompt Creation Guidelines"
filename: "/guidelines/prompt-creation-guidelines.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
---

# Prompt Creation Guidelines

This document defines the standards and conventions for creating AI prompts for auditing, analysis, and task automation within the Ash Shaw Makeup Portfolio project.

---

## 📁 File Organization

### Prompt Storage Location

**All prompts MUST be stored in `/prompts/`**

```
/prompts/
├── simple-audit-prompt.md           # Single-file prompts (no sub-prompts)
├── css-architecture-audit.md        # Another single-file prompt
└── modern-react-migration/          # Multi-prompt orchestrator folder
    ├── 00-ORCHESTRATOR.md           # Master orchestrator
    ├── 01-es5-react-best-practices.md
    ├── 02-tailwind-violations-audit.md
    ├── 03-wordpress-css-alignment.md
    └── 04-component-structure-audit.md
```

### Naming Conventions

| Prompt Type | Naming Convention | Example |
|-------------|-------------------|---------|
| **Single-file prompt** | `{topic}.md` | `css-audit.md` |
| **Orchestrator folder** | `{topic}/` | `modern-react-migration/` |
| **Orchestrator file** | `00-ORCHESTRATOR.md` | `00-ORCHESTRATOR.md` |
| **Sub-prompt files** | `{nn}-{descriptive-name}.md` | `01-es5-react-audit.md` |

**Rules:**
- Use kebab-case for all filenames
- Orchestrator file MUST be named `00-ORCHESTRATOR.md`
- Sub-prompts MUST be numbered sequentially: `01-`, `02-`, `03-`, etc.
- Sub-prompt numbers indicate execution order

---

## 📝 Prompt File Structure

### Required YAML Frontmatter

**Every prompt file MUST start with YAML frontmatter:**

```yaml
---
title: "Prompt Title Here"
filename: "/prompts/{topic}/{filename}.md"
created: "YYYY-MM-DD"
modified: "YYYY-MM-DD"
version: "X.Y.Z"
prompt_type: "orchestrator" | "sub-prompt" | "single-audit"
execution_order: 1  # For sub-prompts only
estimated_duration: "30 minutes"  # Optional but recommended
related_reports: "/reports/{topic}/"  # Where reports will be saved
related_tasks: "/tasks/{topic}-tasks.md"  # Task list file
---
```

### YAML Field Definitions

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | ✅ YES | Human-readable prompt title | "ES5 React Best Practices Audit" |
| `filename` | ✅ YES | Absolute path to this file | "/prompts/modern-react-migration/01-es5-audit.md" |
| `created` | ✅ YES | ISO date of creation | "2026-03-11" |
| `modified` | ✅ YES | ISO date of last modification | "2026-03-11" |
| `version` | ✅ YES | Semantic version number | "1.0.0" |
| `prompt_type` | ✅ YES | Type of prompt | "orchestrator", "sub-prompt", "single-audit" |
| `execution_order` | ⚠️ Sub-prompts only | Order in orchestrator sequence | 1, 2, 3, etc. |
| `estimated_duration` | 📝 Recommended | How long the audit will take | "30 minutes", "1 hour" |
| `related_reports` | 📝 Recommended | Where reports will be saved | "/reports/modern-react-migration/" |
| `related_tasks` | 📝 Recommended | Task list file location | "/tasks/modern-react-migration-tasks.md" |

---

## 🎯 Prompt Types

### 1. Single-File Prompt

**When to use:**
- Simple one-time audit
- No sub-components needed
- Single focused scan

**File location:** `/prompts/{topic}.md`

**Report location:** `/reports/{topic}.md` (single file, root of /reports/)

**Example:**
```yaml
---
title: "CSS Architecture Quick Audit"
filename: "/prompts/css-architecture-audit.md"
prompt_type: "single-audit"
related_reports: "/reports/css-architecture-audit.md"
---
```

---

### 2. Orchestrator Prompt

**When to use:**
- Complex multi-phase audit
- Multiple focused sub-scans needed
- Coordinated sequential execution

**File location:** `/prompts/{topic}/00-ORCHESTRATOR.md`

**Report location:** `/reports/{topic}/` (subfolder with multiple reports)

**Required sections:**

```markdown
---
title: "Orchestrator Title"
prompt_type: "orchestrator"
---

# Orchestrator Title

## Overview
Brief description of the full audit scope

## Execution Sequence

This orchestrator runs the following sub-prompts IN ORDER:

1. **01-{first-audit}.md** - Description
2. **02-{second-audit}.md** - Description
3. **03-{third-audit}.md** - Description

## Workflow

### Step 1: Run Sub-Prompt 01
- Execute `/prompts/{topic}/01-{first-audit}.md`
- Save report to `/reports/{topic}/01-{first-audit}.md`
- Wait for completion before proceeding

### Step 2: Run Sub-Prompt 02
- Execute `/prompts/{topic}/02-{second-audit}.md`
- Save report to `/reports/{topic}/02-{second-audit}.md`
- Wait for completion before proceeding

### Step 3: Process All Reports into Task List
- Read ALL reports in `/reports/{topic}/`
- Extract actionable items
- Create consolidated task list: `/tasks/{topic}-tasks.md`
- Group tasks logically by phase/priority

## Success Criteria
- [ ] All sub-prompts executed
- [ ] All reports saved to `/reports/{topic}/`
- [ ] Task list created in `/tasks/{topic}-tasks.md`
```

---

### 3. Sub-Prompt

**When to use:**
- Part of an orchestrator sequence
- Focused single-topic audit
- Sequential execution required

**File location:** `/prompts/{topic}/{nn}-{name}.md`

**Numbering:** `01-`, `02-`, `03-`, etc. (indicates execution order)

**Required YAML field:** `execution_order: {n}`

**Example:**
```yaml
---
title: "ES5 React Best Practices Audit"
filename: "/prompts/modern-react-migration/01-es5-react-audit.md"
prompt_type: "sub-prompt"
execution_order: 1
related_reports: "/reports/modern-react-migration/01-es5-react-audit.md"
---
```

---

## 🏗️ Prompt Content Structure

### Required Sections (All Prompts)

Every prompt MUST include these sections:

```markdown
## 1. Objective
Clear statement of what this audit will accomplish

## 2. Scope
What files/folders/components will be audited

## 3. Audit Steps
Sequential numbered steps to execute the audit

## 4. Success Criteria
Checklist of what defines completion

## 5. Report Output
- **Location:** Where to save the report
- **Format:** Structure of the report
- **Required sections:** What must be in the report
```

### Optional Sections

```markdown
## Background
Context for why this audit is needed

## Related Guidelines
Links to relevant guideline files

## Tools & References
External tools or documentation needed

## Estimated Duration
How long this should take
```

---

## 📊 Report Output Specifications

### Single-File Prompt → Single Report

**Report location:** `/reports/{topic}.md`

**Example:**
```
Prompt: /prompts/css-audit.md
Report: /reports/css-audit.md
```

---

### Orchestrator Prompt → Subfolder with Multiple Reports

**Report location:** `/reports/{date}-{topic}/`

**Naming convention:** Reports are saved to a dated subfolder

**Example:**
```
Orchestrator: /prompts/modern-react-migration/00-ORCHESTRATOR.md

Reports folder: /reports/2026-03-11-modern-react-migration/
├── 01-es5-react-audit.md
├── 02-tailwind-violations.md
├── 03-wordpress-css-alignment.md
└── 04-component-structure.md
```

**Folder naming:**
- Format: `/reports/{YYYY-MM-DD}-{topic}/`
- Date is the date the orchestrator was executed
- Topic matches the orchestrator folder name

---

## ✅ Task List Creation

### When to Create Task List

**Single-file prompt:**
- Create task list immediately after report is complete
- Location: `/tasks/{topic}-tasks.md`

**Orchestrator prompt:**
- Create task list ONLY after ALL sub-prompts have completed
- Process ALL reports in `/reports/{topic}/` folder
- Location: `/tasks/{topic}-tasks.md`

### Task List Requirements

**One task list per orchestrator/prompt:**
- ✅ Consolidated single file
- ❌ NOT one task list per sub-prompt

**Task grouping:**
- Group by logical phase (Phase 1, Phase 2, etc.)
- Group by priority (Critical, High, Medium, Low)
- Group by component type (Navigation, Content, Forms, etc.)

**Example structure:**
```markdown
---
title: "Modern React Migration Tasks"
filename: "/tasks/modern-react-migration-tasks.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
related_reports: "/reports/2026-03-11-modern-react-migration/"
---

# Modern React Migration Tasks

## Phase 1: Critical ES5 Best Practices (Priority: HIGH)

- [ ] Task 1 from report 01
- [ ] Task 2 from report 01
- [ ] Task 3 from report 02

## Phase 2: Tailwind Removal (Priority: MEDIUM)

- [ ] Task 1 from report 02
- [ ] Task 2 from report 03

## Phase 3: WordPress CSS Alignment (Priority: LOW)

- [ ] Task 1 from report 03
- [ ] Task 2 from report 04
```

---

## 🔄 Prompt Versioning

### Semantic Versioning

Follow semantic versioning: `MAJOR.MINOR.PATCH`

**MAJOR (1.0.0 → 2.0.0):**
- Complete rewrite of audit logic
- Changed success criteria
- Different output format

**MINOR (1.0.0 → 1.1.0):**
- Added new audit steps
- Expanded scope
- New sections added

**PATCH (1.0.0 → 1.0.1):**
- Fixed typos
- Clarified instructions
- Updated file paths

### Updating Prompts

**When modifying a prompt file:**

1. Update `modified` field in YAML frontmatter
2. Increment `version` field appropriately
3. Add changelog entry at bottom of file:

```markdown
## Changelog

### v1.1.0 - 2026-03-12
- Added WordPress block editor CSS class audit
- Expanded scope to include theme.json alignment

### v1.0.0 - 2026-03-11
- Initial creation
```

---

## 📚 Cross-Referencing Guidelines

### Linking to Guidelines

All prompts SHOULD reference relevant guideline files:

```markdown
## Related Guidelines

This audit enforces the standards defined in:
- [BEM CSS Architecture](../guidelines/css-architecture.md)
- [Component Guidelines](../guidelines/overview-components.md)
- [WordPress FSE Patterns](../guidelines/wordpress-fse-patterns.md)
```

### Linking to Other Prompts

Orchestrator prompts MUST link to all sub-prompts:

```markdown
## Sub-Prompts

1. [ES5 React Best Practices](./01-es5-react-audit.md)
2. [Tailwind Violations Audit](./02-tailwind-violations.md)
3. [WordPress CSS Alignment](./03-wordpress-css-alignment.md)
```

---

## 🎯 Reusability Standards

### Design for Repeated Execution

All prompts MUST be designed to be **re-runnable**:

- ✅ Can be executed multiple times
- ✅ Generates fresh reports each time
- ✅ Detects changes since last run
- ✅ Updates task lists incrementally

**Example:**
```markdown
## Re-execution Notes

This prompt can be run:
- After every major code change
- Before deployments
- Monthly as maintenance
- When new components are added
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Don't

- ❌ Create prompts without YAML frontmatter
- ❌ Save reports to wrong folder structure
- ❌ Create multiple task lists for one orchestrator
- ❌ Create task list before all sub-prompts complete
- ❌ Use spaces in filenames (use kebab-case)
- ❌ Forget to number sub-prompts sequentially

### ✅ Do

- ✅ Always include complete YAML frontmatter
- ✅ Follow folder structure rules strictly
- ✅ Create one consolidated task list per orchestrator
- ✅ Wait for all audits to complete before creating tasks
- ✅ Use descriptive filenames
- ✅ Number sub-prompts in execution order

---

## 📋 Quick Reference

### Single-File Prompt Workflow

```
1. Create prompt: /prompts/{topic}.md
2. Run audit
3. Save report: /reports/{topic}.md
4. Create task list: /tasks/{topic}-tasks.md
```

### Orchestrator Prompt Workflow

```
1. Create folder: /prompts/{topic}/
2. Create orchestrator: /prompts/{topic}/00-ORCHESTRATOR.md
3. Create sub-prompts: /prompts/{topic}/01-*.md, 02-*.md, etc.
4. Run orchestrator (executes all sub-prompts sequentially)
5. Each sub-prompt saves report: /reports/{date}-{topic}/01-*.md, 02-*.md
6. After ALL reports complete, create task list: /tasks/{topic}-tasks.md
```

---

## ✅ Compliance Checklist

Before creating a prompt, verify:

- [ ] YAML frontmatter is complete and valid
- [ ] `filename` field matches actual file path
- [ ] `prompt_type` is set correctly
- [ ] All required sections are present
- [ ] Report output location is specified
- [ ] Task list location is specified
- [ ] Cross-references to guidelines are included
- [ ] Prompt is designed for reusability

---

**Last Updated:** March 11, 2026  
**Maintained By:** Prompt Engineering Team
