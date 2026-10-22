# Claude Code Worktrees Guide

## Overview

This guide covers using Git worktrees with Claude Code to work on multiple
branches in parallel while maintaining complete isolation between branches.

**What are worktrees?** Git worktrees allow you to have multiple working
directories for the same repository, each with a different branch checked out.
This enables:

- Working on multiple features simultaneously
- Parallel agent sessions without branch conflicts
- Safe experimentation without affecting your main work
- Clean separation between independent feature branches

## Prerequisites

- Git 2.6+ (to use worktrees)
- Claude Code v1.0.0+ (verified version)
- Bash or shell with git installed
- Permission to create directories

## Setup

### 1. Verify Git Worktree Support

```bash
git --version

# Output: git version X.Y.Z

```text

If the command fails, upgrade Git to 2.6+.

### 2. Understand Worktree Directory Structure

```text
.
├── .git (worktree metadata, not duplicated)
├── .gitworktrees/ (optional directory for organizing worktrees)
│   ├── feat-auth-refactor/
│   ├── fix-nav-bug/
│   └── docs-update/
└── [main branch checkout]

```text

Each worktree is a separate directory with its own working tree but shares the
`.git` object database.

### 3. Create a Worktree

**Pattern:** `git worktree add <path> <branch>`

```bash

# Create worktree for an existing branch

git worktree add ../.gitworktrees/feat-auth-refactor feat/auth-refactor

# Create worktree and branch simultaneously

git worktree add --b feat/auth-refactor ../.gitworktrees/feat-auth-refactor
origin/develop

# Create worktree in custom location

git worktree add ~/code/auth-work feat/auth-refactor

```text

### 4. Switch Into Worktree

```bash
cd ../.gitworktrees/feat-auth-refactor

# Verify branch

git branch --show-current

# Output: feat/auth-refactor

# Verify isolation

git status

```text

## Branch Naming in Worktrees

**All branches must follow the {type}/{scope}-{title} naming pattern**, even in
worktrees. Validation runs the same whether in main checkout or worktree.

### Validate Branch Name in Worktree

```bash

# Inside worktree

node ../../scripts/validate-branch-name.js

# Expected output

Branch 'feat/auth-refactor' matches the repository branching strategy.

```text

## Parallel Agent Work

Worktrees enable multiple Claude agents to work independently:

### Setup for Parallel Work

```bash

# Terminal 1: Main checkout

cd /home/user/thisonetimeonacidcom
git checkout develop

# Terminal 2: Worktree for Feature A

git worktree add --b feat/feature-a ../.gitworktrees/feat-a origin/develop
cd ../.gitworktrees/feat-a

# Terminal 3: Worktree for Feature B

git worktree add --b feat/feature-b ../.gitworktrees/feat-b origin/develop
cd ../.gitworktrees/feat-b

```text

### Agent Isolation

Each agent gets:

- ✅ Separate git branch checkout
- ✅ Independent file system
- ✅ Isolated git state (commits, stash, refs)
- ✅ Separate node_modules (if installed locally per worktree)

Each agent cannot:

- ❌ Interfere with other worktrees' branches
- ❌ Accidentally commit to wrong branch
- ❌ Cause merge conflicts in other worktrees
- ❌ Force-push another agent's work

## Usage Patterns

### Pattern 1: Feature + Documentation Work

**Scenario:** Write a feature and update documentation in parallel

```bash

# Worktree 1: Feature implementation

git worktree add --b feat/user-dashboard ../.gitworktrees/dashboard
origin/develop

# Worktree 2: Documentation updates

git worktree add --b docs/dashboard-guide ../.gitworktrees/docs-dashboard
origin/develop

# Work independently, then merge both to develop

```text

### Pattern 2: Multi-Agent Bug Fix and Testing

**Scenario:** One agent fixes a bug, another creates tests

```bash

# Agent 1: Fix the bug

git worktree add --b fix/auth-timeout ../.gitworktrees/fix-auth origin/develop

# Agent 2: Add comprehensive tests

git worktree add --b test/auth-timeout-coverage ../.gitworktrees/test-auth
origin/develop

# Both branches merge independently to develop

```text

### Pattern 3: Experimentation Without Risk

**Scenario:** Try a risky refactor in isolation

```bash

# Create experimental worktree (proto branch)

git worktree add --b proto/new-state-management ../.gitworktrees/experiment
origin/develop

# Work freely, knowing main checkout and other worktrees are unaffected

# If experiment succeeds, merge to develop

# If it fails, delete worktree without impact

```text

## Worktree Isolation Details

### File System Isolation

Each worktree has its own:

- Working directory (separate from other worktrees)
- Staged changes (git index per worktree, stored via `git rev-parse --git-path index`)
- Untracked files
- Local configuration

Each worktree shares:

- Object database (`.git/objects`)
- Repository configuration (`.git/config` shared across worktrees)
- Refs (branches, tags, shared by default)
- Hooks (`.git/hooks` shared across worktrees)
- Stash storage (by default, but can be isolated with worktree-specific setup)

### Git State Isolation

Each worktree maintains separate:

- Current branch checkout
- Uncommitted changes
- Staged files
- Git index (per worktree; use `git rev-parse --git-path index` to locate it)

Each worktree can read (but must not force-push):

- All branches and tags
- Commit history
- Remote tracking branches
- Shared stash storage (by default; use caution when multiple worktrees access stash)

### Naming Isolation

Each worktree branch is independent. Example:

```bash

# Worktree 1: feat/auth-refactor

cd ../.gitworktrees/feat-a
git checkout feat/auth-refactor

# Only this worktree sees uncommitted changes to feat/auth-refactor

# Worktree 2: feat/api-docs

cd ../.gitworktrees/feat-b
git checkout feat/api-docs

# Independent of worktree 1; unaffected by changes above

```text

## Failure Scenarios & Recovery

### Scenario 1: Forgot Which Worktree I'm In

**Symptom:** Made changes thinking I was on Feature A, but I'm on Feature B

**Recovery:**

```bash

# Check current branch

git branch --show-current

# Check worktree path

pwd

# If wrong branch, stash changes and switch

git stash
git checkout correct-branch
git stash pop

```text

### Scenario 2: Worktree Has Uncommitted Changes

**Symptom:** Trying to switch or delete worktree but changes are uncommitted

**Recovery:**

```bash

# Option 1: Commit changes

git add .
git commit -m "Work in progress"

# Option 2: Stash changes

git stash

# Option 3: Keep worktree with uncommitted changes

# (it stays valid for continued work)

```text

### Scenario 3: Force-Push Conflict Between Worktrees

**Symptom:** Worktree A force-pushed branch, Worktree B can't push

**Recovery:**

```bash

# In Worktree B (affected)

git fetch origin

# Check what happened

git log --oneline origin/feat-shared..HEAD

# Rebase onto remote if safe

git rebase origin/feat-shared

# Or reset to remote if local work is discardable

git reset --hard origin/feat-shared

```text

**Best Practice:** Never force-push from multiple worktrees to the same branch.
Use separate branches (e.g., `feat/auth-agent-a` and `feat/auth-agent-b`) if
multiple agents work on related features.

### Scenario 4: Deleted Worktree Directory But Worktree Still Registered

**Symptom:** `git worktree list` shows deleted worktree, `git worktree remove`
fails

**Recovery:**

```bash

# Check worktree status

git worktree list --porcelain

# Force-remove stale entry

git worktree prune

# Verify

git worktree list

```text

## Cleanup Procedures

### Remove a Single Worktree

```bash

# Option 1: Clean removal (preferred)

git worktree remove ../.gitworktrees/feat-auth-refactor

# Option 2: Force removal (if worktree is damaged)

git worktree remove --force ../.gitworktrees/feat-auth-refactor

```text

### Remove All Worktrees

```bash

# List all worktrees

git worktree list

# Remove each one

git worktree remove ../.gitworktrees/feat-a
git worktree remove ../.gitworktrees/feat-b
git worktree remove ../.gitworktrees/fix-bug

# Prune stale references

git worktree prune

```text

### Manual Cleanup (If Automated Removal Fails)

```bash

# Remove directory

rm -rf ../.gitworktrees/feat-auth-refactor

# Prune git metadata

git worktree prune

# Verify (1)

git worktree list

```text

## Verification Checklist

Use this checklist to verify worktree setup is correct:

- ✅ `git worktree list` shows all active worktrees
- ✅ Each worktree directory exists and is readable
- ✅ `git branch --show-current` in each worktree matches expected branch
- ✅ `git status` in each worktree shows correct branch state
- ✅ Branch validation passes: `node scripts/validate-branch-name.js`
- ✅ No worktree is checked out in multiple locations
- ✅ `.git` directory exists in main checkout (not per-worktree)
- ✅ Each worktree has separate `.git/index` (worktree-specific staging)

### Verification Script

```bash

#!/bin/bash

# Verify worktree setup

echo "Active worktrees:"
git worktree list

echo ""
echo "Validating each worktree..."

git worktree list --porcelain | awk '{print $1}' | while read worktree_path; do
  if [ -n "$worktree_path" ]; then
    echo "Checking $worktree_path..."
    cd "$worktree_path" || continue
    git branch --show-current
    node scripts/validate-branch-name.js
    echo "✅ $worktree_path is valid"
    cd - > /dev/null || true
  fi
done

echo ""
echo "All worktrees verified!"

```text

## What Is NOT Verified

⚠️ **Limitations:** The worktree setup in this guide does NOT address:

- Pre-commit hook enforcement (must be configured per agent)
- CI/CD pipeline behavior when multiple agents push simultaneously
- Database state isolation (if your project uses a local database)
- Environment variable conflicts (`.env` per worktree is not automated)
- Test parallelization and port conflicts (agents may collide on ports 3000, 5173, etc.)
- Node.js dependency management (`node_modules` installation per worktree)
- Build cache conflicts (Vite cache directory shared across worktrees)

**Recommendation:** When using parallel worktrees, coordinate with your team on:

- Port allocation for dev servers (e.g., Agent A uses 3000, Agent B uses 3001)
- Database state (use separate test databases per worktree)
- Environment variables (copy `.env.local` per worktree if needed)

## Related Resources

- [Git Worktrees Documentation](https://git-scm.com/docs/git-worktree)
- `.claude/agents/branches-agent.md` — Interactive branch naming
- `.claude/skills/branch-validation/SKILL.md` — Branch validation
- `scripts/validate-branch-name.js` — Validation script
- `docs/BRANCH*NAMING*LOCAL.md` — Local developer guide

---

*Last updated: 2026-10-16. For issues or feedback, open a PR or contact
maintainers.*
