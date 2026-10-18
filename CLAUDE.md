# CLAUDE.md — ThisOneTimeOnAcidCom

> Repository-specific AI instructions for ThisOneTimeOnAcidCom. Read the organisation-wide guidance first:
> - [lightspeedwp/.github/CLAUDE.md](https://github.com/lightspeedwp/.github/blob/develop/CLAUDE.md)
> - [lightspeedwp/.github/AGENTS.md](https://github.com/lightspeedwp/.github/blob/develop/AGENTS.md)
> - [Repository Root AGENTS.md](../../AGENTS.md) — Follow these rules for all work in this session

## 🎯 Active Initiatives

### Phase 2: Repository Restructuring & Canonical Governance Config

Consolidate duplicate governance config files into `lightspeedwp/.github` (source of truth) and update all workflows to reference canonical files.

- **Status:** In Progress
- **Branch:** `docs/spec-001-phase2-governance`
- **Spec:** `.github/specs/001-repo-governance-layout-and-agentic-workflows/`

**Key Changes:**
- All workflows fetch canonical `.github/labels.yml`, `.github/issue-types.yml` from `lightspeedwp/.github`
- Local duplicate governance files deleted
- PR template routing via `lightspeedwp/.github`
- Configuration drift detection workflow active

### T011: Figma Make Project Access Validation

Validate Figma API connectivity and recover media library assets via Figma Make.

- **Status:** In Progress
- **Script:** `scripts/test-figma-access.js`
- **Tests:** `scripts/__tests__/test-figma-access.test.js` (15 tests, all passing)
- **Environment Variables:**
  - `FIGMA_API_TOKEN` — Figma API personal access token
  - `FIGMA_MAKE_FILE_KEY` — Figma Make project file key
  - `FIGMA_TEAM_ID` — Figma team ID
  - `FIGMA_EXPORT_FORMAT` — Export format (default: `png`)
  - `FIGMA_EXPORT_SCALE` — Export scale multiplier (default: `2`)

**Pilot Assets:**
- `toa-heroImage1` (CRITICAL) — Homepage Hero
- `toa-jungleImage1` (HIGH) — Festival Portfolio - Jungle Festival Koh Phangan

**Extraction Time Estimates:**
- 10 assets (pilot): ~7 seconds (0.12 minutes, rounds to 0)
- 56 assets (full batch): ~42 seconds (0.7 minutes, rounds to 1)
- 100 assets: ~65 seconds (1.08 minutes, rounds to 1)

## 🌳 Repository Structure

```
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
│   └── __tests__/
│       └── test-figma-access.test.js  # Jest test suite (15 tests)
├── src/
│   ├── styles/
│   │   └── default-shadcn-theme.css   # shadcn/ui theme variables
│   └── ...
├── CLAUDE.md                           # This file (repo-specific guidance)
└── ...
```

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
```

## 📋 Specification-First Workflow

All feature work follows this sequence:

1. Create branch with correct naming pattern (see Branch Naming above)
2. Run `/speckit-specify` to create `.github/specs/{feature}/spec.md`
3. Complete spec with requirements, success criteria, assumptions
4. Run `/speckit-clarify` to resolve ambiguities
5. Run `/speckit-plan` to create implementation plan
6. Run `/speckit-tasks` to decompose into actionable tasks
7. Implement, commit, push, then create draft PR

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
npm test -- scripts/__tests__/test-figma-access.test.js

# Validate branch name
npm run validate:branch-name

# Format code
npm run format
```

## 🔐 Governance Files (LOCKED)

These files are canonically maintained in `lightspeedwp/.github` and synced to ThisOneTimeOnAcidCom:

| File | Source | Purpose | Status |
|------|--------|---------|--------|
| `.github/labels.yml` | `lightspeedwp/.github` | Label definitions (158 labels) | 🔒 LOCKED |
| `.github/issue-types.yml` | `lightspeedwp/.github` | Issue type definitions | 🔒 LOCKED |
| `.github/ISSUE_TEMPLATE/*.md` | `lightspeedwp/.github` | Issue templates (26 templates) | 🔒 LOCKED |
| `.github/PULL_REQUEST_TEMPLATE/*.md` | `lightspeedwp/.github` | PR templates (19 templates) | 🔒 LOCKED |

**To request changes:** Open an issue on `lightspeedwp/.github` with `[LABEL-UPDATE-REQUEST]`, `[ISSUE-TYPE-UPDATE-REQUEST]`, or `[TEMPLATE-UPDATE-REQUEST]` tag.

## 📝 Coding Standards

- **Language:** UK English (optimise, organisation, colour)
- **JavaScript/TypeScript:** ESLint + Prettier (WordPress Coding Standards adapted)
- **CSS:** CSS variables follow shadcn/ui conventions
- **Tests:** Jest for Node.js scripts; use clear, testable scenarios
- **Security:** Validate all input, escape all output, never commit secrets
- **Accessibility:** WCAG 2.2 AA minimum

## 🔄 Workflow Integration

### Labeling Workflow (`labeling-unified.yml`)

The workflow now fetches canonical governance files from `lightspeedwp/.github` at runtime:

```yaml
- name: Fetch canonical labeler.yml from lightspeedwp/.github
  run: |
    mkdir -p .github
    gh repo clone lightspeedwp/.github /tmp/github-repo -- --depth 1
    cp /tmp/github-repo/labeler.yml .github/labeler.yml
```

This ensures:
- ✅ No local duplicate configs
- ✅ Single source of truth
- ✅ Automatic sync with org-wide changes
- ✅ No configuration drift

## 🎯 Current Work

### File Organization (In Progress)

- ✅ Moved `test-figma-access.js` → `scripts/test-figma-access.js`
- ✅ Moved `default_shadcn_theme.css` → `src/styles/default-shadcn-theme.css`
- ✅ Created comprehensive test suite: `scripts/__tests__/test-figma-access.test.js`
- 🔄 Added repo-specific CLAUDE.md

### Phase 2 Progress

- ✅ PR #334 merged into `develop`
- ✅ Labeling workflow updated to fetch canonical configs
- ✅ Figma API tests added (15 passing tests)
- 🔄 Draft PR #338 pending CI completion

## 📚 Related Documentation

- [Specification Catalog](./github/specs/CATALOG.md) — All active specifications
- [lightspeedwp/.github/CLAUDE.md](https://github.com/lightspeedwp/.github/blob/develop/CLAUDE.md) — Organisation-wide guidance
- [lightspeedwp/.github/AGENTS.md](https://github.com/lightspeedwp/.github/blob/develop/AGENTS.md) — AI agent rules
- `.github/workflows/` — GitHub Actions workflows
- `.github/specs/` — SpecKit feature specifications

---

_Maintained by Claude Haiku 4.5 and team_
Last updated: 2026-10-18
