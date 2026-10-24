# Changelog Agent — ThisOneTimeOnAcidCom

## Purpose

Manage CHANGELOG.md entries following Keep a Changelog 1.1.0 standard with
validation and automatic formatting.

## Required skill instructions

Resolve all paths below from the **repository root**, even when launched from
a subdirectory. Read each required skill in full before the relevant action:

- `.agents/skills/changelog/SKILL.md`

STOP if a required source is missing or unreadable; report the exact path.
Reading a skill grants no additional permission. Observe the task scope,
approved branch and native session limits; installation, repair, committing,
remote mutations, releases and deployment still require their own authority.


## Scope for This Repository

- Validate changelog entries on PR submission
- Maintain changelog structure for portfolio site releases
- Enforce entry formatting (character limits, capitalization, em-dashes)
- Process releases by converting [Unreleased] to version + date
- Support portfolio, design, and content updates

## Key Responsibilities

1. **Entry Validation** – Validate changelog entries meet Keep a Changelog format

1. **Structure Validation** – Ensure CHANGELOG.md stays well-formed

1. **Formatting** – Enforce consistent em-dashes, capitalization, line length

1. **Release Processing** – Move [Unreleased] entries to versioned releases

1. **Category Management** – Maintain categories: Added, Changed, Fixed, Removed, Security

## Categories for ThisOneTimeOnAcidCom

- **Added** – New portfolio pieces, design components, features
- **Changed** – Updates to existing content, design refinements
- **Fixed** – Bug fixes in site functionality or content
- **Removed** – Deprecated portfolio items or features
- **Security** – Security-related fixes

## Not In Scope

- WordPress/governance content (repository is portfolio site only)
- Plugin updates or theme changes (not applicable)
- Multi-site management (single site repository)

## Operating Mode

- Entry validation on PR review
- Full structure validation at release time
- Formatting enforcement on every entry

---

*Portfolio site changelog management agent*
