---
title: "Modern React Migration Orchestrator"
filename: "/prompts/modern-react-migration/00-ORCHESTRATOR.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
prompt_type: "orchestrator"
estimated_duration: "3-4 hours"
related_reports: "/reports/2026-03-11-modern-react-migration/"
related_tasks: "/tasks/modern-react-migration-tasks.md"
---

# Modern React Migration Orchestrator

## Overview

This orchestrator coordinates a comprehensive audit of the React codebase to identify opportunities for improvement **within ES5 constraints** imposed by the Figma Make bundler. The audit focuses on:

1. **ES5 React Best Practices** - Enforce modern React patterns while respecting bundler constraints
2. **Tailwind Violations** - Identify and document all forbidden Tailwind utility usage
3. **Tailwind-to-BEM Mapping** - Create a reference guide mapping Tailwind utilities to BEM classes
4. **WordPress CSS Alignment** - Audit alignment with WordPress block editor CSS patterns
5. **Component Structure** - Review component architecture and organization

**IMPORTANT:** This is NOT a migration to modern JSX syntax. We are STAYING in ES5 but improving React patterns within those constraints.

---

## Execution Sequence

This orchestrator runs the following sub-prompts **IN ORDER**:

1. **[01-es5-react-best-practices.md](./01-es5-react-best-practices.md)** - Audit React patterns (hooks, prop types, state management) within ES5 constraints
2. **[02-tailwind-violations-audit.md](./02-tailwind-violations-audit.md)** - Scan for all Tailwind utility class usage (forbidden by BEM architecture)
3. **[03-tailwind-to-bem-mapping.md](./03-tailwind-to-bem-mapping.md)** - Create mapping guide between Tailwind utilities and BEM classes
4. **[04-wordpress-css-alignment.md](./04-wordpress-css-alignment.md)** - Audit alignment with WordPress block editor CSS patterns
5. **[05-component-structure-audit.md](./05-component-structure-audit.md)** - Review component architecture and file organization

---

## Workflow

### Step 1: Run Sub-Prompt 01 - ES5 React Best Practices

**Execute:** `/prompts/modern-react-migration/01-es5-react-best-practices.md`

**What it does:**
- Audits all React components for best practices within ES5 constraints
- Checks for proper hook usage (allowed in ES5)
- Verifies prop types and TypeScript interfaces
- Reviews state management patterns
- Checks for proper cleanup in useEffect
- Identifies anti-patterns

**Output:** `/reports/2026-03-11-modern-react-migration/01-es5-react-best-practices.md`

**Wait for completion** before proceeding to Step 2

---

### Step 2: Run Sub-Prompt 02 - Tailwind Violations Audit

**Execute:** `/prompts/modern-react-migration/02-tailwind-violations-audit.md`

**What it does:**
- Scans all `.tsx` files for Tailwind utility classes (e.g., `flex`, `p-4`, `text-center`)
- Documents every violation with file path and line number
- Categorizes by severity (critical vs. minor)
- Provides statistics on violation frequency

**Output:** `/reports/2026-03-11-modern-react-migration/02-tailwind-violations-audit.md`

**Wait for completion** before proceeding to Step 3

---

### Step 3: Run Sub-Prompt 03 - Tailwind-to-BEM Mapping

**Execute:** `/prompts/modern-react-migration/03-tailwind-to-bem-mapping.md`

**What it does:**
- Creates a comprehensive mapping guide
- Maps Tailwind utilities → BEM classes → WordPress CSS custom properties
- Documents all available BEM classes in `/styles/globals.css`
- Provides conversion examples for common patterns

**Output:** 
- Report: `/reports/2026-03-11-modern-react-migration/03-tailwind-to-bem-mapping.md`
- Guideline: `/guidelines/tailwind-to-bem-mapping.md` (permanent reference)

**Wait for completion** before proceeding to Step 4

---

### Step 4: Run Sub-Prompt 04 - WordPress CSS Alignment

**Execute:** `/prompts/modern-react-migration/04-wordpress-css-alignment.md`

**What it does:**
- Audits BEM classes for alignment with WordPress Full Site Editing patterns
- Checks custom properties for `--wp--preset--*` naming
- Verifies block editor CSS class patterns (`.wp-block-*`, `.has-*`)
- Documents gaps in WordPress alignment

**Output:** `/reports/2026-03-11-modern-react-migration/04-wordpress-css-alignment.md`

**Wait for completion** before proceeding to Step 5

---

### Step 5: Run Sub-Prompt 05 - Component Structure Audit

**Execute:** `/prompts/modern-react-migration/05-component-structure-audit.md`

**What it does:**
- Reviews component file organization
- Checks for proper separation of concerns
- Audits component naming conventions
- Identifies opportunities for component reuse
- Reviews export patterns

**Output:** `/reports/2026-03-11-modern-react-migration/05-component-structure-audit.md`

**Wait for completion** before proceeding to Step 6

---

### Step 6: Process All Reports into Task List

**After ALL sub-prompts have completed:**

1. Read ALL reports in `/reports/2026-03-11-modern-react-migration/`
2. Extract actionable items from each report
3. Group tasks logically by:
   - **Phase 1: Critical Fixes** (P0 - blocking issues)
   - **Phase 2: High Priority** (P1 - important but not blocking)
   - **Phase 3: Improvements** (P2 - nice-to-have enhancements)
   - **Phase 4: Documentation** (P3 - docs and guidelines)
4. Create consolidated task list: `/tasks/modern-react-migration-tasks.md`

**Task list format:**
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

## Phase 1: Critical Fixes (P0)
- [ ] Task 1 from report 01
- [ ] Task 2 from report 02

## Phase 2: High Priority (P1)
- [ ] Task 3 from report 03
- [ ] Task 4 from report 04

## Phase 3: Improvements (P2)
- [ ] Task 5 from report 05

## Phase 4: Documentation (P3)
- [ ] Task 6 from report 03
```

---

## Success Criteria

This orchestrator is COMPLETE when:

- [x] All 5 sub-prompts have been executed
- [x] All 5 reports saved to `/reports/2026-03-11-modern-react-migration/`
- [x] Tailwind-to-BEM mapping guideline created in `/guidelines/`
- [x] Consolidated task list created in `/tasks/modern-react-migration-tasks.md`
- [x] All reports have status: "complete" in YAML frontmatter

---

## Expected Outcomes

### Reports Generated (5 total)

1. **01-es5-react-best-practices.md** - React patterns audit
2. **02-tailwind-violations-audit.md** - Tailwind usage violations
3. **03-tailwind-to-bem-mapping.md** - Conversion mapping guide
4. **04-wordpress-css-alignment.md** - WordPress CSS audit
5. **05-component-structure-audit.md** - Component architecture review

### Guidelines Created (1 total)

1. **`/guidelines/tailwind-to-bem-mapping.md`** - Permanent reference for developers

### Tasks Created (1 total)

1. **`/tasks/modern-react-migration-tasks.md`** - Consolidated action items

---

## Related Documentation

**Generated By:** Modern React Migration Orchestrator

**Related Guidelines:**
- [Guidelines.md](../../guidelines/Guidelines.md) - Main project guidelines
- [BEM CSS Architecture](../../guidelines/css-architecture.md) - BEM naming conventions
- [Component Guidelines](../../guidelines/overview-components.md) - Component patterns
- [Bundler Constraints](../../guidelines/Guidelines.md#bundler-compatibility-rules-figma-make) - Figma Make limitations

**Bundler Constraints Reference:**
```
Forbidden:
❌ Optional chaining (?.)
❌ Nullish coalescing (??)
❌ JSX (must use React.createElement)
❌ Arrow functions (in certain contexts)
❌ let/const (prefer var)
❌ for...of loops
❌ Tailwind utility classes (use BEM)

Required:
✅ React.createElement
✅ var declarations
✅ Classic for loops
✅ Explicit null checks
✅ BEM CSS classes
✅ Named function expressions
```

---

## Execution Instructions

### How to Run This Orchestrator

1. **Start Here:** Read this orchestrator document
2. **Execute Sub-Prompts in Order:** Run 01 → 02 → 03 → 04 → 05
3. **Wait Between Prompts:** Each must complete before starting the next
4. **Create Task List LAST:** Only after all reports are complete

### Estimated Timeline

| Step | Sub-Prompt | Est. Duration |
|------|-----------|---------------|
| 1 | ES5 React Best Practices | 45 min |
| 2 | Tailwind Violations Audit | 30 min |
| 3 | Tailwind-to-BEM Mapping | 60 min |
| 4 | WordPress CSS Alignment | 45 min |
| 5 | Component Structure Audit | 30 min |
| 6 | Task List Creation | 30 min |
| **TOTAL** | | **3-4 hours** |

---

## Re-execution Notes

This orchestrator can be run:
- After major codebase changes
- Quarterly as maintenance
- When new components are added
- Before major releases
- When updating WordPress block patterns

Each execution will generate a new dated folder in `/reports/` (e.g., `/reports/2026-06-15-modern-react-migration/`)

---

**Last Updated:** March 11, 2026  
**Maintained By:** Development Team
