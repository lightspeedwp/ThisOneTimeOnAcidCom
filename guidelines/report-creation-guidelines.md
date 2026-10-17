---
title: "Report Creation Guidelines"
filename: "/guidelines/report-creation-guidelines.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
---

# Report Creation Guidelines

This document defines the standards and conventions for creating audit reports, analysis findings, and documentation within the Ash Shaw Makeup Portfolio project.

---

## 📁 File Organization

### Report Storage Location

**All reports MUST be stored in `/reports/`**

```
/reports/
├── css-audit.md                     # Single-file report (root level)
├── accessibility-audit.md           # Another single-file report
├── 2026-03-11-modern-react-migration/  # Orchestrator report folder (dated)
│   ├── 01-es5-react-audit.md
│   ├── 02-tailwind-violations.md
│   ├── 03-wordpress-css-alignment.md
│   └── 04-component-structure.md
└── archived/                        # Completed/old reports
    └── 2026-02-25-root-cleanup/
        ├── 01-orphaned-files.md
        └── 02-folder-structure.md
```

### Folder Structure Rules

| Scenario | Report Location | Example |
|----------|----------------|---------|
| **Single-file prompt** | `/reports/{topic}.md` | `/reports/css-audit.md` |
| **Orchestrator prompt** | `/reports/{YYYY-MM-DD}-{topic}/` | `/reports/2026-03-11-modern-react-migration/` |
| **Completed reports** | `/reports/archived/{date}-{topic}/` | `/reports/archived/2026-02-25-cleanup/` |

---

## 📝 Report File Structure

### Required YAML Frontmatter

**Every report file MUST start with YAML frontmatter:**

```yaml
---
title: "Report Title Here"
filename: "/reports/{topic}/{filename}.md"
created: "YYYY-MM-DD"
modified: "YYYY-MM-DD"
version: "X.Y.Z"
report_type: "audit" | "analysis" | "findings" | "summary"
related_prompt: "/prompts/{topic}/{prompt}.md"
related_tasks: "/tasks/{topic}-tasks.md"
status: "draft" | "complete" | "archived"
---
```

### YAML Field Definitions

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | ✅ YES | Human-readable report title | "ES5 React Best Practices Audit Report" |
| `filename` | ✅ YES | Absolute path to this file | "/reports/modern-react-migration/01-es5-audit.md" |
| `created` | ✅ YES | ISO date of creation | "2026-03-11" |
| `modified` | ✅ YES | ISO date of last modification | "2026-03-11" |
| `version` | ✅ YES | Semantic version number | "1.0.0" |
| `report_type` | ✅ YES | Type of report | "audit", "analysis", "findings", "summary" |
| `related_prompt` | ✅ YES | Prompt that generated this report | "/prompts/modern-react-migration/01-es5-audit.md" |
| `related_tasks` | 📝 Optional | Task list file location | "/tasks/modern-react-migration-tasks.md" |
| `status` | ✅ YES | Current status | "draft", "complete", "archived" |

---

## 📊 Report Types

### 1. Audit Report

**Purpose:** Document findings from systematic codebase scan

**Required sections:**
```markdown
## Executive Summary
High-level overview of findings (3-5 bullet points)

## Scope
What was audited (files, folders, patterns)

## Methodology
How the audit was conducted

## Findings
### Critical Issues (P0)
- Issue 1
- Issue 2

### High Priority (P1)
- Issue 3
- Issue 4

### Medium Priority (P2)
- Issue 5

### Low Priority (P3)
- Issue 6

## Statistics
- Total files scanned: X
- Total issues found: Y
- Critical: Z
- High: A
- Medium: B
- Low: C

## Recommendations
Prioritized action items

## Next Steps
What should happen after this report
```

---

### 2. Analysis Report

**Purpose:** Deep-dive investigation of specific pattern or issue

**Required sections:**
```markdown
## Overview
What was analyzed and why

## Analysis Approach
Methods and tools used

## Key Findings
Primary discoveries

## Detailed Analysis
In-depth breakdown with code examples

## Impact Assessment
How this affects the project

## Recommendations
Suggested solutions or improvements

## References
Links to related documentation
```

---

### 3. Findings Report

**Purpose:** Document specific discoveries (bugs, violations, patterns)

**Required sections:**
```markdown
## Summary
Quick overview of what was found

## Findings List
Detailed list of all discoveries

## Examples
Code examples illustrating findings

## Root Cause Analysis
Why these issues exist

## Suggested Fixes
How to resolve each finding
```

---

### 4. Summary Report

**Purpose:** Consolidate multiple sub-reports into executive overview

**Required sections:**
```markdown
## Overview
High-level summary of all audits

## Reports Processed
List of all sub-reports analyzed

## Aggregate Statistics
Combined metrics from all reports

## Priority Matrix
Issues grouped by priority across all reports

## Consolidated Recommendations
Top recommendations from all reports

## Task List Preview
Link to consolidated task list
```

---

## 🏗️ Report Naming Conventions

### Single-File Reports

**Format:** `{topic}.md`

**Examples:**
- `css-architecture-audit.md`
- `accessibility-findings.md`
- `performance-analysis.md`

---

### Orchestrator Report Folders

**Format:** `{YYYY-MM-DD}-{topic}/`

**Date:** The date the orchestrator was executed (not individual audits)

**Examples:**
- `2026-03-11-modern-react-migration/`
- `2026-02-25-root-cleanup/`
- `2026-03-01-dark-mode-contrast-audit/`

---

### Sub-Reports (Inside Orchestrator Folders)

**Format:** `{nn}-{descriptive-name}.md`

**Numbering:** Must match the execution order of sub-prompts

**Examples:**
```
/reports/2026-03-11-modern-react-migration/
├── 01-es5-react-audit.md           # Matches 01- sub-prompt
├── 02-tailwind-violations.md        # Matches 02- sub-prompt
├── 03-wordpress-css-alignment.md    # Matches 03- sub-prompt
└── 04-component-structure.md        # Matches 04- sub-prompt
```

---

## 📈 Report Content Standards

### Executive Summary Requirements

**Every report MUST start with an executive summary:**

```markdown
## Executive Summary

**Status:** 🔴 CRITICAL | 🟡 NEEDS ATTENTION | 🟢 HEALTHY  
**Total Issues:** X  
**Critical:** Y  
**Priority:** P0 | P1 | P2 | P3

**Key Findings:**
- Finding 1 (most important)
- Finding 2
- Finding 3

**Recommended Actions:**
1. Most urgent action
2. Second priority action
3. Third priority action
```

---

### Code Examples Format

**All code examples MUST include:**
1. File path
2. Line numbers (if applicable)
3. Issue description
4. Suggested fix

**Format:**
```markdown
### Issue: Description of Problem

**File:** `/path/to/file.tsx`  
**Lines:** 45-52  
**Severity:** CRITICAL | HIGH | MEDIUM | LOW

**Current Code:**
```tsx
// ❌ WRONG
var Component = function() {
  return React.createElement('div', null, 'Content');
}
```

**Suggested Fix:**
```tsx
// ✅ CORRECT
var Component = function() {
  return React.createElement('div', { className: 'component' }, 'Content');
}
```

**Why:** Explanation of why this is better

**Impact:** What changes when this is fixed
```

---

### Statistics Format

**All reports SHOULD include quantitative data:**

```markdown
## Statistics

| Metric | Count | Percentage |
|--------|-------|------------|
| Total files scanned | 156 | 100% |
| Files with issues | 42 | 27% |
| Critical issues | 12 | 8% |
| High priority | 18 | 12% |
| Medium priority | 24 | 15% |
| Low priority | 8 | 5% |

**Breakdown by Component Type:**
- Navigation components: 8 issues
- Content components: 15 issues
- Form components: 12 issues
- UI components: 7 issues
```

---

## 🎯 Report Status Workflow

### Status Progression

```
draft → complete → archived
```

**Draft:**
- Audit in progress
- Findings being documented
- Not ready for task creation

**Complete:**
- All findings documented
- Ready for task list creation
- Can be referenced by other reports

**Archived:**
- All tasks completed
- Report moved to `/reports/archived/`
- Kept for historical reference

---

## 📦 Archiving Reports

### When to Archive

**Archive a report when:**
- ✅ All related tasks are 100% complete
- ✅ 30 days have passed since completion
- ✅ Report is no longer actively referenced

### Archiving Process

1. Update report status to `archived` in YAML frontmatter
2. Move report folder from `/reports/{topic}/` to `/reports/archived/{topic}/`
3. Update `master-task-list.md` with archive location
4. After 7 days in archive, can safely delete

**Example:**
```bash
# Before archive
/reports/2026-02-25-root-cleanup/

# After archive
/reports/archived/2026-02-25-root-cleanup/

# After 7 days
# Can be deleted
```

---

## 🔗 Cross-Referencing

### Linking to Related Files

**All reports MUST link to:**
1. The prompt that generated them
2. Related guideline files
3. Related task lists (if created)

**Example:**
```markdown
## Related Documentation

**Generated By:** [ES5 React Audit Prompt](../prompts/modern-react-migration/01-es5-react-audit.md)

**Related Guidelines:**
- [React Best Practices](../guidelines/react-best-practices-es5.md)
- [Component Structure](../guidelines/overview-components.md)

**Related Tasks:**
- [Modern React Migration Tasks](../tasks/modern-react-migration-tasks.md)
```

---

## ✅ Quality Standards

### Every Report Must

- ✅ Have complete YAML frontmatter
- ✅ Include executive summary
- ✅ Provide concrete examples with file paths
- ✅ Include statistics/metrics
- ✅ Offer actionable recommendations
- ✅ Link to related documentation
- ✅ Use consistent formatting
- ✅ Be free of spelling/grammar errors

### Every Report Should

- 📝 Include visual aids (tables, code blocks)
- 📝 Provide context for non-technical readers
- 📝 Explain WHY issues matter (impact)
- 📝 Offer multiple solution approaches when applicable
- 📝 Include a "Quick Wins" section for easy fixes

---

## 🚨 Common Mistakes to Avoid

### ❌ Don't

- ❌ Save reports without YAML frontmatter
- ❌ Use inconsistent date formats (always ISO: YYYY-MM-DD)
- ❌ Create reports without linking to generating prompt
- ❌ List issues without suggested fixes
- ❌ Forget to update `status` field as work progresses
- ❌ Mix multiple unrelated audits in one report

### ✅ Do

- ✅ Always include complete metadata
- ✅ Use dated folders for orchestrator reports
- ✅ Provide concrete code examples
- ✅ Quantify issues with statistics
- ✅ Link to all related documentation
- ✅ Keep each report focused on its specific audit

---

## 📋 Report Creation Checklist

Before publishing a report, verify:

- [ ] YAML frontmatter is complete and accurate
- [ ] `filename` field matches actual file path
- [ ] `created` and `modified` dates are set
- [ ] `status` field is set appropriately
- [ ] Executive summary is present
- [ ] All code examples include file paths
- [ ] Statistics are included (if applicable)
- [ ] Recommendations are actionable
- [ ] Links to prompt, guidelines, and tasks are present
- [ ] Spelling and grammar checked
- [ ] Report is saved in correct location

---

## 🎨 Report Templates

### Template: Audit Report

```markdown
---
title: "TITLE HERE"
filename: "/reports/{topic}/{filename}.md"
created: "YYYY-MM-DD"
modified: "YYYY-MM-DD"
version: "1.0.0"
report_type: "audit"
related_prompt: "/prompts/{topic}/{prompt}.md"
status: "draft"
---

# TITLE HERE

## Executive Summary

**Status:** 🔴 | 🟡 | 🟢  
**Total Issues:** X  
**Critical:** Y

**Key Findings:**
- Finding 1
- Finding 2
- Finding 3

## Scope

Files/folders/patterns audited

## Methodology

How the audit was conducted

## Findings

### Critical Issues (P0)

### High Priority (P1)

### Medium Priority (P2)

### Low Priority (P3)

## Statistics

| Metric | Count |
|--------|-------|
| Total files | X |
| Files with issues | Y |

## Recommendations

1. Top recommendation
2. Second recommendation
3. Third recommendation

## Next Steps

What happens after this report

## Related Documentation

**Generated By:** [Prompt Name](link)  
**Related Guidelines:** [Guideline](link)  
**Related Tasks:** [Task List](link)
```

---

### Template: Summary Report (Orchestrator)

```markdown
---
title: "ORCHESTRATOR SUMMARY"
filename: "/reports/{date}-{topic}/00-SUMMARY.md"
created: "YYYY-MM-DD"
modified: "YYYY-MM-DD"
version: "1.0.0"
report_type: "summary"
related_prompt: "/prompts/{topic}/00-ORCHESTRATOR.md"
status: "complete"
---

# ORCHESTRATOR SUMMARY

## Overview

High-level summary of all audits conducted

## Reports Processed

1. [Report 1](./01-report.md)
2. [Report 2](./02-report.md)
3. [Report 3](./03-report.md)

## Aggregate Statistics

| Metric | Total |
|--------|-------|
| Total files scanned | X |
| Total issues found | Y |
| Critical issues | Z |

## Priority Matrix

### Critical (P0)
- Issue from Report 1
- Issue from Report 2

### High (P1)
- Issue from Report 2
- Issue from Report 3

## Consolidated Recommendations

Top 5 recommendations across all reports

## Task List

All findings have been processed into: [Task List](../../tasks/{topic}-tasks.md)

## Related Documentation

**Generated By:** [Orchestrator Prompt](../../prompts/{topic}/00-ORCHESTRATOR.md)  
**Sub-Prompts Executed:**
- [01-{name}](../../prompts/{topic}/01-{name}.md)
- [02-{name}](../../prompts/{topic}/02-{name}.md)
```

---

## 🔄 Report Versioning

### Semantic Versioning

Follow semantic versioning: `MAJOR.MINOR.PATCH`

**MAJOR (1.0.0 → 2.0.0):**
- Complete re-audit with different methodology
- Changed scope significantly
- Incompatible with previous version

**MINOR (1.0.0 → 1.1.0):**
- Added new findings
- Expanded analysis
- New sections added

**PATCH (1.0.0 → 1.0.1):**
- Fixed typos
- Clarified explanations
- Updated statistics

### Updating Reports

**When modifying a report:**

1. Update `modified` field in YAML
2. Increment `version` appropriately
3. Add changelog at bottom:

```markdown
## Changelog

### v1.1.0 - 2026-03-12
- Added 5 new findings from re-scan
- Updated statistics
- Added WordPress block editor patterns section

### v1.0.0 - 2026-03-11
- Initial audit report
```

---

## ✅ Compliance Verification

Before finalizing a report, verify:

- [ ] YAML frontmatter complete
- [ ] Executive summary present
- [ ] All findings documented with examples
- [ ] Statistics included
- [ ] Recommendations actionable
- [ ] Cross-references to prompts/guidelines/tasks
- [ ] Saved in correct folder structure
- [ ] Status field accurate
- [ ] No broken links
- [ ] Code examples tested

---

**Last Updated:** March 11, 2026  
**Maintained By:** Documentation Team
