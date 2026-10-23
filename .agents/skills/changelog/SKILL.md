---
name: changelog
description: Manages CHANGELOG.md using Keep a Changelog 1.1.0 standard with validation
  and formatting.
metadata:
  category: release
  enabled: 'True'
  tags: changelog, keep-a-changelog, release, validation
---

# Changelog Management Skill

## Purpose

Manage changelog entries following Keep a Changelog 1.1.0 standard with
automatic formatting and validation.

## What This Skill Does

- Validates changelog entry format and structure
- Adds new entries to [Unreleased] section
- Enforces Keep a Changelog compliance
- Manages release version sections
- Ensures entry completeness and quality

## Changelog Structure

```markdown

# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- New portfolio pieces, features, components

### Changed

- Updates to existing content, design refinements

### Fixed

- Bug fixes in site functionality

### Removed

- Deprecated content, removed features

### Security

- Security-related fixes

## [1.0.0] - 2026-10-16

### Added (1)

- Initial portfolio site release

[Unreleased]:
https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/compare/v1.0.0...HEAD
[1.0.0]:
https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/releases/tag/v1.0.0

```text

## When to Use

- **Adding Features:** Document in [Unreleased] Added section
- **Bug Fixes:** Document in [Unreleased] Fixed section
- **On Release:** Move [Unreleased] to version + date
- **PR Reviews:** Validate changelog entries are present and formatted

## Entry Guidelines

- **Format:** Concise user-facing description
- **Length:** Maximum 250 characters
- **Category:** Added, Changed, Fixed, Removed, or Security
- **Reference:** Link to related PR or issue when available
- **Grammar:** Consistent capitalization and punctuation

### Example Entries

✓ **Good:**

- Added dark mode support for portfolio theme
- Fixed active navigation state indicator on mobile
- Changed homepage headline for clarity

✗ **Bad:**

- Implementation of dark mode feature (too technical)
- Fixed the bug (too vague)
- Updated homepage (too generic)

## Validation Checklist

- [ ] Entry is in [Unreleased] section
- [ ] Entry is under appropriate category
- [ ] Entry is user-facing and concise
- [ ] Entry length ≤ 250 characters
- [ ] Grammar and capitalization are correct
- [ ] Related PR/issue is referenced when applicable

## References

- [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/)
- [Semantic Versioning](https://semver.org/)
- `CHANGELOG.md` – This project's changelog
- `/changelog-agent.md` – Changelog management agent

---

*Use this skill to maintain a clear, user-friendly changelog for releases.*
