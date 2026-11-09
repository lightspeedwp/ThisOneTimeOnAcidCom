# CLAUDE.md — ThisOneTimeOnAcidCom

> Repository-specific AI instructions for ThisOneTimeOnAcidCom. Read the
organisation-wide guidance first:
> -
[lightspeedwp/.github/CLAUDE.md](https://github.com/lightspeedwp/.github/blob/develop/CLAUDE.md)
> -
[lightspeedwp/.github/AGENTS.md](https://github.com/lightspeedwp/.github/blob/develop/AGENTS.md)
> - [Repository Root AGENTS.md](AGENTS.md) — Follow these rules for all
work in this session

## Shared custom skills and roles

Custom skills in `.claude/skills/` link to `.agents/skills/`. Native agent
files in `.claude/agents/` load the canonical instructions in `.agents/roles/`.
Edit the shared source for behaviour changes. Keep Spec Kit-generated skills
in their existing locations. See `.agents/README.md` for the layout.

## Dependency loading and verification limits

The twenty native adapters read their shared role from the repository root;
eight relevant roles now explicitly load required or conditional skills before
action. STOP for missing required sources. Skill loading does not approve
repair, installing dependencies, committing, remote changes or deployment.

Preserve all six individual Claude skill symlinks and the ten installer-owned
Claude Spec Kit skill files. Do not replace the whole skills directory with a
symlink or point generated Claude skills at Codex-generated files. Keep native
slash-command syntax and argument handling. Frontmatter and prose budgets do
not establish permission equivalence with other clients.

Workflow safety sections describe instruction contracts, not host-enforced
write guards. Analyze/converge use non-persisting prerequisite resolution;
converge appends only an approved block after snapshot/branch/path revalidation.
See `.agents/README.md` for runtime and executable-enforcement limits.

## Branch check before work

Follow `AGENTS.md` → **Branch check before every task** before editing files,
including when invoking Spec Kit skills. Use Ash's exact supplied or approved
branch name, validate it before creation and validate the checked-out branch
before edits. Read `.agents/skills/branch-validation/SKILL.md` and
`.agents/roles/branches-agent.md`; do not create agent/session branch names or
put unrelated work on the current branch. Keep the existing Lefthook checks
enabled for commits and pushes.

## 🎯 Active Initiatives

### Phase 2: Repository Restructuring & Canonical Governance Config

Consolidate duplicate governance config files into `lightspeedwp/.github`
(source of truth) and update all workflows to reference canonical files.

- **Status:** In Progress
- **Branch:** `docs/spec-001-phase2-governance`
- **Spec:** `.github/specs/001-repo-governance-layout-and-agentic-workflows/`

**Key Changes:**

- All workflows fetch canonical `.github/labels.yml`, `.github/issue-types.yml`
  from `lightspeedwp/.github`
- Local duplicate governance files deleted
- PR template routing via `lightspeedwp/.github`
- Configuration drift detection workflow active

### T011: Figma Make Project Access Validation

Validate Figma API connectivity and recover media library assets via Figma Make.

- **Status:** In Progress
- **Script:** `scripts/test-figma-access.js`
- **Tests:** `scripts/_*tests*_/test-figma-access.test.js` (15 tests, all
  passing)
- **Environment Variables:**
- `FIGMA*API*TOKEN` — Figma API personal access token
- `FIGMA*MAKE*FILE_KEY` — Figma Make project file key
- `FIGMA*TEAM*ID` — Figma team ID
- `FIGMA*EXPORT*FORMAT` — Export format (default: `png`)
- `FIGMA*EXPORT*SCALE` — Export scale multiplier (default: `2`)

**Pilot Assets:**

- `toa-heroImage1` (CRITICAL) — Homepage Hero
- `toa-jungleImage1` (HIGH) — Festival Portfolio - Jungle Festival Koh Phangan

## Extraction Time Estimates

- 10 assets (pilot): ~7 seconds (0.12 minutes, rounds to 0)
- 56 assets (full batch): ~42 seconds (0.7 minutes, rounds to 1)
- 100 assets: ~65 seconds (1.08 minutes, rounds to 1)

## 🌳 Repository Structure

```text
ThisOneTimeOnAcidCom/
├── .github/
│   ├── specs/                          # Feature specifications (SpecKit)
│   │   └── 001-repo-governance-layout-and-agentic-workflows/
│   │       ├── spec.md                 # Requirements and acceptance criteria
│   │       ├── plan.md                 # Implementation plan
│   │       ├── tasks.md                # Actionable task breakdown
│   │       └── checklists/
│   │           └── requirements.md     # Quality validation checklist
│   └── workflows/                      # GitHub Actions workflows
│       └── labeling-unified.yml        # Canonical labeling workflow
├── scripts/
│   ├── test-figma-access.js           # T011: Figma API validation script
│   └── _*tests*_/
│       └── test-figma-access.test.js  # Jest test suite (15 tests)
├── src/
│   ├── styles/
│   │   └── default-shadcn-theme.css   # shadcn/ui theme variables
│   └── ...
├── CLAUDE.md                           # This file (repo-specific guidance)
└── ...

```text

## 🔗 Branch Naming (From lightspeedwp/.github)

**Required pattern:** `{type}/{scope}-{title}`

Examples for this repo:

- ✅ `feat/figma-asset-recovery`
- ✅ `fix/labeling-workflow-routing`
- ✅ `docs/spec-001-phase2-governance`
- ❌ `claude/governance-audit` — FORBIDDEN (Claude Code reserved)
- ❌ `copilot/fix-something` — FORBIDDEN (GitHub Copilot reserved)

**Before pushing:**

```bash
npm run validate:branch-name -- --branch <your-branch>

```text

## 📋 Specification-First Workflow

All feature work follows this sequence:

1. Create branch with correct naming pattern (see Branch Naming above)

1. Run `/speckit-specify` to create `.github/specs/{feature}/spec.md`

1. Complete spec with requirements, success criteria, assumptions

1. Run `/speckit-clarify` to resolve ambiguities

1. Run `/speckit-plan` to create implementation plan

1. Run `/speckit-tasks` to decompose into actionable tasks

1. Implement, commit, push, then create draft PR

### Recent Specifications

| ID | Feature | Link | Status |
|---|---------|------|--------|
| 001 | Repository Governance & Agentic Workflows | [Spec](./.github/specs/001-repo-governance-layout-and-agentic-workflows/) | Phase 2 In Progress |

## 🚀 Key Development Commands

```bash

# Install dependencies

npm ci

# Run all tests (including Figma access tests)

npm test

# Run Figma access tests only

npm test -- scripts/_*tests*_/test-figma-access.test.js

# Validate branch name

npm run validate:branch-name

# Format code

npm run format

```text

## 🔐 Governance Files (LOCKED)

These files are canonically maintained in `lightspeedwp/.github` and synced to
ThisOneTimeOnAcidCom:

| File | Source | Purpose | Status |
|------|--------|---------|--------|
| `.github/labels.yml` | `lightspeedwp/.github` | Label definitions (158 labels) | 🔒 LOCKED |
| `.github/issue-types.yml` | `lightspeedwp/.github` | Issue type definitions | 🔒 LOCKED |
| `.github/ISSUE_TEMPLATE/*.md` | `lightspeedwp/.github` | Issue templates (26 templates) | 🔒 LOCKED |
| `.github/PULL*REQUEST*TEMPLATE/*.md` | `lightspeedwp/.github` | PR templates (19 templates) | 🔒 LOCKED |

**To request changes:** Open an issue on `lightspeedwp/.github` with
`[LABEL-UPDATE-REQUEST]`, `[ISSUE-TYPE-UPDATE-REQUEST]`, or
`[TEMPLATE-UPDATE-REQUEST]` tag.

## 📝 Coding Standards

- **Language:** UK English (optimise, organisation, colour)
- **JavaScript/TypeScript:** ESLint + Prettier (WordPress Coding Standards
  adapted)
- **CSS:** CSS variables follow shadcn/ui conventions
- **Tests:** Jest for Node.js scripts; use clear, testable scenarios
- **Security:** Validate all input, escape all output, never commit secrets
- **Accessibility:** WCAG 2.2 AA minimum

## 🔄 Workflow Integration

### Labeling Workflow (`labeling-unified.yml`)

The workflow now fetches canonical governance files from `lightspeedwp/.github`
at runtime:

```yaml

- name: Fetch canonical labeler.yml from lightspeedwp/.github
  run: |
    mkdir -p .github
    gh repo clone lightspeedwp/.github /tmp/github-repo -- --depth 1
    cp /tmp/github-repo/labeler.yml .github/labeler.yml

```text

This ensures:

- ✅ No local duplicate configs
- ✅ Single source of truth
- ✅ Automatic sync with org-wide changes
- ✅ No configuration drift

## 🎯 Current Work

### File Organization (In Progress)

- ✅ Moved `test-figma-access.js` → `scripts/test-figma-access.js`
- ✅ Moved `default*shadcn*theme.css` → `src/styles/default-shadcn-theme.css`
- ✅ Created comprehensive test suite:
  `scripts/_*tests*_/test-figma-access.test.js`
- 🔄 Added repo-specific CLAUDE.md

### Phase 2 Progress

- ✅ PR #334 merged into `develop`
- ✅ Labeling workflow updated to fetch canonical configs
- ✅ Figma API tests added (15 passing tests)
- 🔄 Draft PR #338 pending CI completion

## 📚 Related Documentation

- [Specification Catalog](./github/specs/CATALOG.md) — All active specifications
  [lightspeedwp/.github/CLAUDE.md](https://github.com/lightspeedwp/.github/blob/develop/CLAUDE.md)
  — Organisation-wide guidance
  [lightspeedwp/.github/AGENTS.md](https://github.com/lightspeedwp/.github/blob/develop/AGENTS.md)
  — AI agent rules
- `.github/workflows/` — GitHub Actions workflows
- `.github/specs/` — SpecKit feature specifications

---

*Maintained by Claude Haiku 4.5 and team*
Last updated: 2026-10-18
