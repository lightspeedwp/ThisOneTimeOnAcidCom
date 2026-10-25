# Quickstart: Repository Governance Validation Runbook

**Feature**: TOA-241 – Repository Governance Layout & Agentic Workflows
**Phase**: 1 – Design & Contracts
**Date**: 2026-10-17
**Expected Duration**: 20–30 minutes (end-to-end validation)

---

## Overview

This validation runbook provides step-by-step procedures to verify that
repository governance infrastructure is correctly implemented and integrated.
Each scenario proves specific aspects of the governance system work end-to-end.

**Success Definition**: All scenarios complete without errors; outputs match
expected results.

---

## Prerequisites

1. **Repository cloned and branch created**:
Run these commands in Bash and keep the same shell open through Cleanup. Review
the initial status and note any existing edits before running scenarios.

   ```bash
   git status --short
   validation*created*branch=''
   validation*return*branch=$(git symbolic-ref --quiet --short HEAD) &&
validation_branch="feat/test-governance-validation-$(date -u +%Y%m%d%H%M%S)-$$"
&&
   git fetch origin develop &&
   git checkout -b "$validation_branch" origin/develop &&
   validation*created*branch="$validation_branch"

```text
Continue only if branch creation succeeds. `-b` refuses to overwrite an existing
branch.

1. **Node.js 24 installed** (validate with `node --version`; expect v24.x.x)

1. **npm dependencies installed**:

   ```bash
   npm ci

```text

1. **Test suites available**:

   ```bash
   npm run test:unit   # Jest ESM tests
   npm run test:build  # Bats build tests

```text

1. **Branch naming script available**:

   ```bash
   npm run validate:branch-name

```text

---

## Validation Scenarios

### Scenario 1: Branch Naming Validation

**Goal**: Verify branch naming convention is enforced and validated.

**Setup**: You're on the unique branch recorded in `$validation*created*branch`.

**Test Commands**:

```bash

# Test 1.1: Validate current branch (should pass)

npm run validate:branch-name

# Expected output

# Branch 'feat/test-governance-validation-<timestamp>-<pid>' matches the repository branching strategy

# Exit code: 0 ✅

# Test 1.2: Check branch type extraction

npm run validate:branch-name -- --branch fix/invalid*branch*with_underscores

# Expected output (1)

# Branch 'fix/invalid*branch*with_underscores' does NOT match the repository branching strategy

# Reason: Title portion uses underscores; use hyphens instead

# Exit code: 1 ❌

# Test 1.3: Validate forbidden prefix detection

npm run validate:branch-name -- --branch claude/test-feature

# Expected output (2)

# Branch 'claude/test-feature' does NOT match the repository branching strategy

# Reason: Prefix 'claude/' is FORBIDDEN. Reserved for Claude Code internal sessions

# Exit code: 1 ❌ (1)

```text

**Validation Pass Criteria**:

- ✅ Valid branches return exit code 0
- ✅ Invalid branches return exit code 1
- ✅ Forbidden prefixes explicitly rejected
- ✅ Error messages guide users to correct format

**References**: data-model.md (RepositoryPath entity), ci-cd-workflows.md
(branch-name-validation.yml)

---

### Scenario 2: Configuration File Structure

**Goal**: Verify governance configuration files are present and correctly
structured.

**Test Commands**:

```bash

# Test 2.1: Verify .github directory structure

test -d .github/workflows && echo "✅ workflows/ exists" || echo "❌ Missing
workflows/"
test -d .github/ISSUE*TEMPLATE && echo "✅ ISSUE*TEMPLATE/ exists" || echo "❌
Missing ISSUE_TEMPLATE/"
test -d .github/PULL*REQUEST*TEMPLATE && echo "✅ PULL*REQUEST*TEMPLATE/ exists"

|| echo "❌ Missing PULL*REQUEST*TEMPLATE/"
test -d .github/DISCUSSION*TEMPLATE && echo "✅ DISCUSSION*TEMPLATE/ exists" ||
echo "❌ Missing DISCUSSION_TEMPLATE/"
test -f .github/labels.yml && echo "✅ labels.yml exists" || echo "❌ Missing
labels.yml"
test -f .github/issue-types.yml && echo "✅ issue-types.yml exists" || echo "❌
Missing issue-types.yml"

# Test 2.2: Verify spec directory

test -d .github/specs/001-repo-governance-layout-and-agentic-workflows && \
  echo "✅ Spec directory exists" || echo "❌ Missing spec directory"

# Test 2.3: Verify specification documents

test -f .github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md
&& \
  echo "✅ spec.md exists" || echo "❌ Missing spec.md"
test -f .github/specs/001-repo-governance-layout-and-agentic-workflows/plan.md
&& \
  echo "✅ plan.md exists" || echo "❌ Missing plan.md"
test -f
.github/specs/001-repo-governance-layout-and-agentic-workflows/data-model.md &&
\
  echo "✅ data-model.md exists" || echo "❌ Missing data-model.md"

# Test 2.4: Verify contracts directory

test -d .github/specs/001-repo-governance-layout-and-agentic-workflows/contracts
&& \
  echo "✅ contracts/ exists" || echo "❌ Missing contracts/"
test -f
.github/specs/001-repo-governance-layout-and-agentic-workflows/contracts/ci-cd-workflows.md
&& \
  echo "✅ ci-cd-workflows.md exists" || echo "❌ Missing ci-cd-workflows.md"
test -f
.github/specs/001-repo-governance-layout-and-agentic-workflows/contracts/agent-specifications.md
&& \
echo "✅ agent-specifications.md exists" || echo "❌ Missing
agent-specifications.md"

# Test 2.5: Verify agent/skill structure

test -d .claude/agents && echo "✅ .claude/agents/ exists" || echo "❌ Missing
agents/"
test -d .claude/skills && echo "✅ .claude/skills/ exists" || echo "❌ Missing
skills/"

```text

**Validation Pass Criteria**:

- ✅ All `.github/` subdirectories present
- ✅ All configuration files exist and are YAML/Markdown
- ✅ Specification document hierarchy complete
- ✅ Contracts directory created with both contract files
- ✅ Agent and skill directories present

**References**: plan.md (Project Structure section), data-model.md
(RepositoryPath entity)

---

### Scenario 3: Testing Infrastructure

**Goal**: Verify Jest ESM, Bats, and Playwright test infrastructure is
configured and baseline passing.

**Test Commands**:

```bash

# Test 3.1: Run Jest unit tests (ESM support)

npm run test:unit

# Expected output (example)

# PASS  src/components/Button.test.tsx

# PASS  src/utils/helpers.test.ts

# ..

# Test Suites: X passed, X total

# Tests: Y passed, Y total

# Coverage: > 80%

# Test 3.2: Run Bats build tests

npm run test:build

# Expected output (example) (1)

# ✓ npm run build succeeds

# ✓ Generated dist/ contains index.html

# ✓ Source maps present for debugging

# .. (1)

# X tests passed in 15.23s

# Test 3.3: Check Speckit baseline

node --test tests/speckit.test.mjs

# Expected output (example) (2)

# Speckit baseline: 103/104 tests passing

# 1 known limitation: template-resolution-edge-case (approved)

```text

**Validation Pass Criteria**:

- ✅ Jest unit tests run with ESM (@swc/core transpilation)
- ✅ All unit tests pass (advisory: >80% coverage)
- ✅ Bats build tests pass
- ✅ Speckit baseline at 103/104 (known limitation accepted)
- ✅ No JavaScript errors in test output

**References**: data-model.md (GitHubActionsWorkflow entity for tests.yml),
plan.md (Test Infrastructure section)

---

### Scenario 4: Node.js Pinning

**Goal**: Verify Node.js 24 LTS pinning is enforced.

**Test Commands**:

```bash

# Test 4.1: Check .nvmrc exists and contains Node 24

test -f .nvmrc && echo "✅ .nvmrc exists" || echo "❌ Missing .nvmrc"
grep -q "^24" .nvmrc && echo "✅ Node 24 pinned in .nvmrc" || echo "❌ Wrong
version in .nvmrc"

# Test 4.2: Check package.json engines field

grep -q '"engines".*"node".*"24' package.json && \
  echo "✅ Node 24 pinned in package.json engines" || \
  echo "❌ engines field missing or wrong version"

# Test 4.3: Verify current runtime

node --version | grep -q "^v24" && \
  echo "✅ Current Node.js version is v24.x" || \
  echo "❌ Running wrong Node version (run 'nvm use' or update)"

# Test 4.4: Check npm version

npm --version | grep -q "^11" && \
  echo "✅ npm v11.x installed (correct for Node 24)" || \
  echo "⚠️  npm version may differ (expected v11.x)"

```text

**Validation Pass Criteria**:

- ✅ `.nvmrc` exists and pins to Node 24.x
- ✅ `package.json` has `engines` field with Node 24 constraint
- ✅ Current runtime is Node.js v24.x
- ✅ npm v11+ installed

**References**: plan.md (Runtime section), data-model.md (GovernanceDecision:
NODE-001)

---

### Scenario 5: Package Manager (npm-only)

**Goal**: Verify npm-only enforcement and pnpm removal.

**Test Commands**:

```bash

# Test 5.1: Verify pnpm artifacts removed

test ! -f pnpm-workspace.yaml && echo "✅ pnpm-workspace.yaml removed" || echo "❌
pnpm-workspace.yaml still present"
test ! -f pnpm-lock.yaml && echo "✅ pnpm-lock.yaml removed" || echo "❌
pnpm-lock.yaml still present"

# Test 5.2: Verify npm lock file is canonical

test -f package-lock.json && echo "✅ package-lock.json exists" || echo "❌
Missing package-lock.json"
test ! -f yarn.lock && echo "✅ yarn.lock not present" || echo "❌ yarn.lock
should be removed"

# Test 5.3: Verify npm ci succeeds

npm ci --audit > /tmp/npm-ci.log 2>&1 && \
  echo "✅ npm ci succeeds with current lock file" || \
  echo "❌ npm ci failed (see /tmp/npm-ci.log)"

# Test 5.4: Check package.json has no pnpm config

grep -q "pnpm" package.json && echo "⚠️ pnpm references found in package.json"

|| \
  echo "✅ No pnpm references in package.json"

```text

**Validation Pass Criteria**:

- ✅ pnpm artifacts completely removed
- ✅ npm lockfile (package-lock.json) is canonical
- ✅ `npm ci` succeeds without errors
- ✅ No yarn or pnpm configuration remains

**References**: plan.md (Package Manager section), data-model.md
(GovernanceDecision: PKG-001)

---

### Scenario 6: CSS Styling (BEM-only)

**Goal**: Verify BEM-only CSS enforcement and Tailwind removal.

**Test Commands**:

```bash

# Test 6.1: Verify Tailwind dependencies removed

grep -q "tailwindcss" package.json && echo "⚠️ Tailwind still in dependencies"

|| \
  echo "✅ Tailwind removed from package.json"

# Test 6.2: Check no Tailwind config

test ! -f tailwind.config.js && test ! -f tailwind.config.mjs && \
  echo "✅ No Tailwind config files" || echo "⚠️  Tailwind config present"

# Test 6.3: Verify BEM naming in components (sample check)

find src/components -name "*.tsx" -o -name "*.css" | head -5 | while read file;
do
grep -Eq
"(className=[\"'][^\"']*|\\.)[a-z][a-z0-9-]*(__[a-z][a-z0-9-]*|--[a-z][a-z0-9-]*)"
"$file" && \
    echo "✅ BEM patterns found in $file" || echo "⚠️  Check BEM usage in $file"
done

# Test 6.4: Linting enforces BEM

lint_status=0
npm run lint:js || lint_status=$?
if [ "$lint_status" -eq 0 ]; then
  echo "✅ JavaScript lint passed"
else
  echo "❌ JavaScript lint failed (exit status $lint_status)"
fi

```text

**Validation Pass Criteria**:

- ✅ Tailwind dependencies and config removed
- ✅ BEM naming patterns present in components
- ✅ ESLint lint check passes without Tailwind violations
- ✅ Guidelines remain BEM-only (Figma Make compatible)

**References**: plan.md (Styling section), data-model.md (GovernanceDecision:
STYLE-001)

---

### Scenario 7: Label Taxonomy

**Goal**: Verify canonical labels are defined and correctly prefixed.

**Test Commands**:

```bash

# Test 7.1: Verify labels.yml exists

test -f .github/labels.yml && echo "✅ labels.yml exists" || echo "❌ Missing
labels.yml"

# Test 7.2: Check label family prefixes

echo "Checking label family prefixes..."
grep -c "^  - name: type:" .github/labels.yml | grep -q "[1-9]" && \
  echo "✅ type: labels defined" || echo "❌ Missing type: labels"
grep -c "^  - name: status:" .github/labels.yml | grep -q "[1-9]" && \
  echo "✅ status: labels defined" || echo "❌ Missing status: labels"
grep -c "^  - name: area:" .github/labels.yml | grep -q "[1-9]" && \
  echo "✅ area: labels defined" || echo "❌ Missing area: labels"
grep -c "^  - name: priority:" .github/labels.yml | grep -q "[1-9]" && \
  echo "✅ priority: labels defined" || echo "❌ Missing priority: labels"
grep -c "^  - name: meta:" .github/labels.yml | grep -q "[1-9]" && \
  echo "✅ meta: labels defined" || echo "❌ Missing meta: labels"

# Test 7.3: Check for bare labels (should not exist)

echo "Checking for non-prefixed bare labels..."
grep "^ - name: bug\|^ - name: feature\|^ - name: urgent" .github/labels.yml &&
\
echo "❌ Bare labels found (should be type:bug, type:feature, priority:critical)"
|| \
  echo "✅ No bare labels; all prefixed correctly"

# Test 7.4: Total label count

label_count=$(grep -c "^  - name:" .github/labels.yml)
echo "Total labels defined: $label_count (expected ~150+)"

```text

**Validation Pass Criteria**:

- ✅ `.github/labels.yml` exists and is valid YAML
- ✅ All 5 label families (type, status, area, priority, meta) defined
- ✅ No bare labels without family prefix
- ✅ ~150+ labels in canonical set

**References**: data-model.md (GitHubLabel entity), ci-cd-workflows.md
(labeling-unified.yml)

---

### Scenario 8: GitHub Actions Workflows

**Goal**: Verify CI/CD workflows are syntactically valid and correctly
configured.

**Test Commands**:

```bash

# Test 8.1: Count implementation workflows (should be 9)

impl_count=$(ls -1 .github/workflows/lint.yml .github/workflows/tests.yml \
  .github/workflows/documentation.yml .github/workflows/workflow-lint.yml \
  .github/workflows/branch-name-validation.yml .github/workflows/changelog-unified.yml \
  .github/workflows/labeling-unified.yml .github/workflows/pr-template-routing.yml \
  .github/workflows/locked-files-guard.yml 2>/dev/null | wc -l)
echo "Implementation workflows present: $impl_count / 9"

# Test 8.2: Validate workflow syntax

# The js-yaml CLI is installed by npm ci from the committed lockfile

for workflow in .github/workflows/*.yml .github/workflows/*.yaml; do
  [ -f "$workflow" ] || continue
  if ./node_modules/.bin/js-yaml "$workflow" > /dev/null; then
    echo "✅ Valid structure: $(basename "$workflow")"
  else
    echo "❌ Invalid structure: $(basename "$workflow")"
  fi
done

# Test 8.3: Check for locked-files-guard workflow (per Q2 clarification)

test -f .github/workflows/locked-files-guard.yml && \
echo "✅ locked-files-guard.yml present (Q2 clarification: moved to
implementation)" || \
  echo "❌ Missing locked-files-guard.yml"

# Test 8.4: Verify protected file list in locked-files-guard

grep -q "CHANGELOG.md\|AGENTS.md\|guidelines/"
.github/workflows/locked-files-guard.yml && \
  echo "✅ Protected files configured" || echo "⚠️  Verify protected file list"

```text

**Validation Pass Criteria**:

- ✅ All 9 implementation workflows present
- ✅ All workflow files have valid YAML structure
- ✅ locked-files-guard.yml present (Q2 clarification move to implementation)
- ✅ Protected file paths correctly configured
- ✅ Evaluation workflows (5) present but not auto-triggered

**References**: ci-cd-workflows.md (complete workflow contracts), data-model.md
(GitHubActionsWorkflow entity)

---

### Scenario 9: CODEOWNERS Configuration

**Goal**: Verify CODEOWNERS file exists and enforces branch protection
authority.

**Test Commands**:

```bash

# Test 9.1: Verify CODEOWNERS file exists

test -f .github/CODEOWNERS && echo "✅ CODEOWNERS file exists" || echo "❌ Missing
.github/CODEOWNERS"

# Test 9.2: Check for central authority (@ashley)

grep -q "@ashley" .github/CODEOWNERS && \
  echo "✅ @ashley listed as authority (Q3 clarification: centralized)" || \
  echo "❌ Central authority not found"

# Test 9.3: Verify protected paths listed

echo "Checking CODEOWNERS for protected paths..."
coverage_complete=true
for protected_path in .github/workflows/ .github/labels.yml CHANGELOG.md
AGENTS.md guidelines/; do
  if awk -v path="$protected_path" '
    ($1 == path || $1 == "/" path) && NF > 1 && $2 !~ /^#/ { found = 1 }
    END { exit !found }
  ' .github/CODEOWNERS; then
    echo "✅ $protected_path in CODEOWNERS"
  else
    echo "⚠️  Missing CODEOWNERS entry for $protected_path"
    coverage_complete=false
  fi
done
if [ "$coverage_complete" = true ]; then
  echo "✅ Protected path coverage complete"
else
  echo "⚠️  Verify protected path coverage"
fi

# Test 9.4: Check PR template files mention CODEOWNERS

grep -r "CODEOWNERS" .github/PULL*REQUEST*TEMPLATE/ > /dev/null && \
  echo "✅ PR templates reference CODEOWNERS" || \
  echo "⚠️  PR templates should mention CODEOWNERS process"

```text

**Validation Pass Criteria**:

- ✅ CODEOWNERS file exists at `.github/CODEOWNERS`
- ✅ @ashley listed as central authority (Q3 clarification)
- ✅ Protected file paths mapped in CODEOWNERS
- ✅ Branch protection rules configured (visual verification in GitHub)

**References**: data-model.md (Q3 clarification: CODEOWNERS centralized
authority), ci-cd-workflows.md (locked-files-guard.yml)

---

### Scenario 10: Spec Kit Workflow End-to-End

**Goal**: Verify Spec Kit specification → planning → tasks pipeline works.

**Setup**:

```bash

# Verify .specify/ configuration exists

test -d .specify && echo "✅ .specify/ directory exists" || echo "❌ Missing
.specify/"
test -f .specify/memory/constitution.md && echo "✅ Constitution template exists"

|| echo "❌ Missing constitution"
```text

**Test Commands**:

```bash

# Test 10.1: Verify feature directory exists and has spec files

spec_dir=".github/specs/001-repo-governance-layout-and-agentic-workflows"
test -d "$spec_dir" && echo "✅ Feature directory exists" || exit 1

files=("spec.md" "plan.md" "research.md" "data-model.md" "quickstart.md"
"tasks.md")
for file in "${files[@]}"; do
  test -f "$spec_dir/$file" && echo "✅ $file present" || echo "⚠️  $file missing"
done

# Test 10.2: Verify contracts directory

test -d "$spec_dir/contracts" && echo "✅ contracts/ directory exists" || echo "❌
Missing contracts/"
test -f "$spec_dir/contracts/ci-cd-workflows.md" && echo "✅ CI/CD workflow
contracts present" || echo "❌ Missing CI/CD contracts"
test -f "$spec_dir/contracts/agent-specifications.md" && echo "✅ Agent
specification contracts present" || echo "❌ Missing agent contracts"

# Test 10.3: Verify checklists

test -d "$spec_dir/checklists" && echo "✅ checklists/ exists" || echo "⚠️
Missing checklists/"
test -f "$spec_dir/checklists/requirements.md" && echo "✅ requirements.md
present" || echo "⚠️ Missing requirements checklist"

# Test 10.4: Check specification document count

doc*count=$(ls -1 "$spec*dir"/*.md 2>/dev/null | wc -l)
echo "Specification documents: $doc_count files (expected 7+)"

```text

**Validation Pass Criteria**:

- ✅ Feature directory exists with complete specification hierarchy
- ✅ All Phase 1 design artifacts present (plan.md, research.md, data-model.md)
- ✅ Contracts directory with CI/CD and agent specifications
- ✅ quickstart.md (this runbook) present
- ✅ tasks.md present (Phase 2 output)
- ✅ Specification quality checklist present

**References**: All spec artifacts in
`.github/specs/001-repo-governance-layout-and-agentic-workflows/`

---

## Cleanup

After validation completes, clean up test changes:

```bash

# Compare with the initial status; review unstaged and staged changes first

git status --short
git diff
git diff --cached

# Add only tracked paths changed by validation scenarios to this array

validation*changed*files=()
if [ "${#validation*changed*files[@]}" -gt 0 ]; then
  # Select only scenario hunks; keep unrelated edits in the same files.
  git restore --patch -- "${validation*changed*files[@]}"
fi

# Return to the starting branch, then delete only the branch created above

if [ -n "${validation*created*branch:-}" ] &&
   [ "$(git branch --show-current)" = "$validation*created*branch" ]; then
  git checkout "$validation*return*branch" &&
  git branch -d "$validation*created*branch"
else
  echo "⚠️  No matching validation branch recorded; skipping branch cleanup"
fi

```text

Keep unrelated edits. Review staged and untracked files individually; do not
delete them automatically. If `git branch -d` refuses because validation commits
remain, inspect and preserve those commits before deciding how to remove the
branch.

---

## Success Checklist

Review this checklist after completing all scenarios:

- [ ] Scenario 1: Branch naming validation passes
- [ ] Scenario 2: Configuration file structure complete
- [ ] Scenario 3: All test suites pass (Jest, Bats, Speckit baseline)
- [ ] Scenario 4: Node.js 24 pinning enforced
- [ ] Scenario 5: npm-only enforcement verified
- [ ] Scenario 6: BEM-only CSS configuration confirmed
- [ ] Scenario 7: Label taxonomy correctly prefixed
- [ ] Scenario 8: GitHub Actions workflows syntactically valid
- [ ] Scenario 9: CODEOWNERS authority centralized
- [ ] Scenario 10: Spec Kit pipeline end-to-end functional

**Result**: ✅ All 10 scenarios passing = Repository governance infrastructure
ready for implementation

---

## Troubleshooting

**Branch validation fails**:

- Verify `npm run validate:branch-name` script exists in `scripts/validate-branch-name.js`
- Check branch name matches pattern: `{type}/{scope}-{title}`

**Tests fail**:

- Run `npm ci` to reinstall dependencies
- Check Node.js version: `node --version` should be v24.x
- Run individual test suite: `npm run test:unit` or `npm run test:build`

**Configuration files missing**:

- Verify `.github/` directory structure matches plan.md Project Structure
- Create missing files as specified in respective task descriptions

**Workflow syntax errors**:

- Validate YAML: `npm run lint:yaml` (if available)
- Check GitHub Actions syntax: https://github.com/actions/setup-node/blob/main/.github/workflows/

---

## References

- **Data Model**: `data-model.md` — Entity definitions, validation rules, state transitions
- **CI/CD Contracts**: `contracts/ci-cd-workflows.md` — Workflow input/output specs, failure modes
- **Agent Contracts**: `contracts/agent-specifications.md` — Agent purpose, tools, budgets
- **Implementation Plan**: `plan.md` — Technical strategy, project structure
- **Specification**: `spec.md` — Requirements (R1–R9), decisions, acceptance criteria
- **Constitution**: `.specify/memory/constitution.md` — Governance principles
