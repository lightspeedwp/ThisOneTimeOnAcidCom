# General Codebase Audit - Reusable Prompt Template

**Created:** February 25, 2026
**Type:** Reusable template prompt
**Usage:** Copy and customize for specific audit needs

---

## Purpose

This is a **reusable template** for running codebase audits. Customize the audit areas below for your specific needs.

## Pre-Audit Steps

1. Read [Guidelines.md](../guidelines/Guidelines.md) - especially the workflow folder conventions
2. Read [/tasks/task-list.md](../tasks/task-list.md) - check for previously identified issues
3. Create a report subfolder: `/reports/{audit-name}/`

## Standard Audit Areas

### 1. Orphaned File Scan
For each folder (`/components/`, `/hooks/`, `/utils/`, `/data/`, `/styles/`, `/lib/`):
- List all files
- Search for imports of each file across the codebase
- Flag files with zero imports as orphaned
- **Exceptions:** Protected files (see Guidelines.md), deployment artifacts, config files

### 2. Unused Import Scan
For each `.tsx` and `.ts` file:
- Check all `import` statements
- Verify the imported symbol is actually used in the file
- Flag unused imports for removal

### 3. Bundler Compatibility Check
Search all `.tsx` and `.ts` files for forbidden patterns:
- `?.` (optional chaining) - except in comments
- `??` (nullish coalescing) - except in comments and protected files
- `import.meta.env` - except in comments
- `for...of` loops
- `new Set<>()` generics in `.tsx` files
- Nested ternaries
- Object literals in certain contexts

### 4. CSS Orphan Check
For each CSS file in `/styles/blocks/`:
- Search for import statements in `.tsx` files
- Search for BEM class usage in component JSX
- Flag CSS files with zero usage

### 5. Data File Verification
For each file in `/data/mock/`:
- Verify it's imported by at least one component or barrel export
- Check for deprecated field names
- Verify TypeScript types match actual data shape

## Post-Audit Steps

1. Write findings to `/reports/{audit-name}/` (one report per audit area)
2. Add actionable items to `/tasks/task-list.md`
3. Prioritize: Critical > High > Medium > Low
4. Archive completed tasks in the Completed section

## Rules

- **Never delete** `/tasks/task-list.md`
- **Never modify** protected files (see Guidelines.md)
- **Never replace** existing images with Unsplash/placeholders
- **Always reference** the specific guideline file when citing rules
- **Always create** reports in a subfolder of `/reports/`
