# Changelog Guidelines

**Version:** 1.0.0
**Last Updated:** February 2026
**Applies to:** `/CHANGELOG.md` (root directory, protected file)

---

## Overview

The project maintains a `CHANGELOG.md` file in the project root that documents all notable changes across every version. This file is **protected** — it must never be deleted, moved, or renamed.

---

## Format: Keep a Changelog

The changelog strictly follows the [Keep a Changelog v1.1.0](https://keepachangelog.com/en/1.1.0/) format. The project also adheres to [Semantic Versioning (SemVer)](https://semver.org/spec/v2.0.0.html).

### File Header (Required)

Every changelog must start with this exact header block:

```markdown
# Changelog

All notable changes to the Ash Shaw Makeup Portfolio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
```

### Version Sections

Each release gets its own section with the version number and release date:

```markdown
## [X.Y.Z] - YYYY-MM-DD
```

- **Version number** follows SemVer: `MAJOR.MINOR.PATCH`
- **Date format** is always ISO 8601: `YYYY-MM-DD`
- Versions are listed in **reverse chronological order** (newest first)
- The `[Unreleased]` section always sits at the very top, below the header

### Change Categories (Types of Changes)

Group changes under these headings only. Use **exactly** these names:

| Category | Use For |
|---|---|
| `### Added` | New features, new components, new pages, new data files |
| `### Changed` | Changes to existing functionality, refactors, migrations |
| `### Deprecated` | Features that will be removed in a future version |
| `### Removed` | Features, files, or functionality that have been deleted |
| `### Fixed` | Bug fixes, corrections, resolved issues |
| `### Security` | Vulnerability patches, security improvements |

**Rules:**
- Only include categories that have entries — do not add empty sections
- Each entry is a bullet point (`-`) with a concise, human-readable description
- Group related entries together under the same category
- Write entries from the user/developer perspective, not the machine perspective

### The `[Unreleased]` Section

Always maintain an `[Unreleased]` section at the top of the changelog:

```markdown
## [Unreleased]

### Added

- Description of upcoming feature

### Fixed

- Description of upcoming fix
```

**Purpose:**
1. Track changes that haven't been released yet
2. At release time, rename `[Unreleased]` to `[X.Y.Z] - YYYY-MM-DD` and create a new empty `[Unreleased]` section above it

---

## Semantic Versioning Rules

Version numbers follow `MAJOR.MINOR.PATCH`:

| Increment | When To Use | Example |
|---|---|---|
| **MAJOR** (X.0.0) | Breaking changes, major architecture shifts, visual redesigns | `3.0.0` → Neon vs Atomic Black redesign |
| **MINOR** (X.Y.0) | New features, new pages, non-breaking additions | `5.3.0` → Personal Art Project migration |
| **PATCH** (X.Y.Z) | Bug fixes, typo corrections, minor documentation updates | `7.3.1` → Fix broken guideline link |

**Note:** The Guidelines.md version number and the CHANGELOG version number are synchronised. When Guidelines.md is updated to a new version, a corresponding changelog entry must be created.

---

## Writing Good Entries

### Do

- Write concise, human-readable descriptions
- Reference file paths when relevant (e.g., "Added `/utils/seo.ts` for centralised SEO management")
- Mention component names, page names, or system names clearly
- Group related changes into a single bullet when they form a cohesive unit
- Use sub-bullets for listing specifics under a parent change

### Don't

- Use commit messages as changelog entries
- Include trivial changes (whitespace fixes, variable renames)
- Write vague descriptions ("Updated stuff", "Various fixes")
- Include internal implementation details that don't affect users or developers
- Duplicate entries across categories

### Examples

```markdown
### Added

- Stickers Gallery page with 26 entries
- FAQ system with Schema.org FAQPage structured data
- Global search system with `ArchiveFilters` component

### Changed

- All 46 page components now use `setSEO()` instead of direct `document.title` manipulation
- Guidelines.md promoted to v7.3.0

### Removed

- `/data/schema.md` — relocated to `/docs/cms-field-mapping.md`
- All "Shop" and "Services" pages
```

---

## Protection Rules

| Rule | Detail |
|---|---|
| **Never delete** | `CHANGELOG.md` is a protected root file — it must always exist |
| **Never move** | It must remain at `/CHANGELOG.md` (project root) |
| **Never rename** | The filename must always be `CHANGELOG.md` |
| **Always update** | Every version bump must have a corresponding changelog entry |
| **Append only** | Never remove or rewrite historical entries (corrections are acceptable) |

---

## When To Update The Changelog

Update `CHANGELOG.md` whenever:

1. A new version of Guidelines.md is released
2. New features, pages, or components are added
3. Existing functionality is changed, deprecated, or removed
4. Bug fixes are applied
5. Architecture or infrastructure changes are made
6. Files are moved, renamed, or deleted as part of cleanup

**Workflow integration:** When the [Default AI Workflow](./Guidelines.md) is followed (prompt → audit → report → task list), the changelog should be updated in the same session if the work results in a version bump.

---

## Relationship to Other Files

| File | Relationship |
|---|---|
| `/guidelines/Guidelines.md` | Version numbers are synchronised — changelog tracks guideline version history |
| `/tasks/task-list.md` | Completed tasks may correspond to changelog entries |
| `/reports/` | Audit findings that lead to changes should be reflected in the changelog |

---

**Last Updated:** February 2026
