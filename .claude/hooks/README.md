# Claude Code Hooks — ThisOneTimeOnAcidCom

Portable hook definitions and executable handlers for Claude Code automation, including Git hooks via Lefthook.

## Overview

Hooks enable automated tasks at two key points in the development workflow:

### Claude Code Hooks
Automate tasks within Claude Code sessions:
- **SessionStart** — Runs when a Claude Code session opens (validation, setup)
- **PreToolUse** — Runs before tool execution (guards, confirmations)
- **PostEdit** — Runs after file edits (formatting, regeneration)

### Git Hooks (via Lefthook)
Automate validation at critical Git operations:
- **pre-commit** — Runs before staging changes (branch validation, file checks)
- **pre-push** — Runs before pushing to remote (branch validation, build checks)

This directory contains Claude Code hook definitions; Git hooks are configured in `lefthook.yml`.

## Git Hooks (Lefthook)

### Installation

Git hooks are installed automatically via the postinstall script in `package.json`:

```bash
# Automatic installation (runs after npm install)
npm ci

# Manual installation
npx lefthook install
```

The hooks are installed to `.git/hooks/pre-commit` and `.git/hooks/pre-push` and are managed by Lefthook 2.2.2.

### Pre-commit Hook

**Purpose:** Validate branch naming and journal content before staging

**Runs:**
1. `npm run validate:branch-name` — Validates branch name follows `{type}/{scope}-{title}` pattern
2. `npm run journal:validate` — Validates journal markdown files (only if changed)

**Behaviour:**
- ✅ Valid branches: Hook succeeds, commit proceeds
- ❌ Invalid branches: Hook fails with descriptive error, commit blocked
- ⏭️ Merge/rebase: Hook skipped (automatic recovery)

**Example output:**
```
❌ Branch prefix 'claude/' is forbidden. It breaks PR template routing and GitHub Actions automation.
✅ 8 file(s) valid. Validation complete — no output written
```

### Pre-push Hook

**Purpose:** Validate branch naming and build integrity before pushing to remote

**Runs:**
1. `npm run validate:branch-name` — Validates branch name
2. `npm run build` — Builds the production bundle (validates no build errors)

**Behaviour:**
- ✅ Valid branch + build succeeds: Hook passes, push proceeds
- ❌ Invalid branch: Hook fails immediately
- ❌ Build fails: Hook fails, push blocked, build errors displayed
- ⏭️ Merge/rebase: Hook skipped

**Example output:**
```
❌ Branch prefix 'claude/' is forbidden...
✓ built in 7.07s ✅ Build verified
```

## Claude Code Hooks

### SessionStart

**Purpose:** Validate environment on session open

**Handler:** `scripts/claude/validate.sh`

**What it does:**
- Checks `npm ls --depth=0` (dependency consistency)
- Confirms `npm run build` would succeed
- Verifies `.claude/settings.json` exists

**Configuration:**
```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/scripts/claude/validate.sh",
            "timeout": 60,
            "match_output": true
          }
        ]
      }
    ]
  }
}
```

**When to disable:**
Remove SessionStart hook if validation noise becomes problematic (uncommon).

## Bypassing Git Hooks

Git hooks can be bypassed if necessary (e.g., emergency fixes):

```bash
# Bypass pre-commit hook
git commit --no-verify

# Bypass pre-push hook
git push --no-verify
```

**⚠️ Use with caution.** Bypassing hooks should be rare. If you find yourself doing this frequently, consider:
- Whether your branch name is correct (consider `/aiops/branches-agent-enforce-local-validation` pattern)
- Whether your build is failing and needs investigation
- Whether you should create a separate issue to track the problem

## Worktree Development

When using Git worktrees for parallel feature development:

### Worktree Setup

```bash
# Create a worktree for a new feature
git worktree add -b feat/my-feature /path/to/worktree develop

# Create a worktree for a hotfix (based on main)
git worktree add -b hotfix/critical-issue /path/to/worktree main
```

### Dependency Installation

Each worktree should have its own `node_modules/`:

```bash
cd /path/to/worktree
npm ci --include=dev
```

**Why separate installations?** npm links native bindings and stores environment metadata per installation. Sharing `node_modules/` across worktrees can cause:
- Inconsistent Lefthook installations
- Different native binding versions
- Stale dependency caches

### Port Isolation

If you run `npm run dev` in parallel worktrees, use different ports:

```bash
# Worktree 1: default port 5173
cd /path/to/worktree1
npm run dev

# Worktree 2: custom port
cd /path/to/worktree2
npm run dev -- --port 5174
```

The Vite config respects `--port` argument but does NOT automatically detect worktree names. Port management is manual.

### Database Isolation

This repository uses mock data only (no backend database). Worktrees do not require database isolation.

If a backend were added in future, consider:
- Environment-specific connection strings (`.env.local` per worktree)
- Separate test databases per worktree (not shared dev DB)
- Clear documentation of which worktree uses which database

## Hook Configuration Management

### Checking Hook Status

```bash
# List installed hooks
npx lefthook list

# View hook configuration
cat lefthook.yml

# Run hooks manually (for testing)
npx lefthook run pre-commit --force
npx lefthook run pre-push --force
```

### Modifying Hooks

Edit `lefthook.yml` to add, modify, or remove hook commands:

```yaml
pre-commit:
  parallel: false
  commands:
    my-new-check:
      run: npm run my:check
      skip:
        - merge
        - rebase
```

Changes take effect immediately. Reinstall hooks if configuration is not recognized:

```bash
npx lefthook install --force
```

### Disabling Specific Commands

To disable a single command without removing it:

```bash
# In environment or shell
export LEFTHOOK=0
git commit -m "message"

# Or disable just pre-commit
export LEFTHOOK_PRE_COMMIT=0
```

Alternatively, use `--no-verify` to skip the entire hook.

## References

- [Lefthook Documentation](https://lefthook.evilmartians.io/)
- [Claude Code Hooks Documentation](https://code.claude.com/docs/en/hooks)
- [Branch Validation Skill](../skills/branch-validation/SKILL.md)
- [Settings Configuration](../settings.json)
- [Cloud Environment Setup](../cloud/README.md)
- [Configuration Guide](../../docs/claude-configuration.md)

---

**Last Updated:** 2026-10-17  
**Maintained By:** Repository  
**Git Hook Configuration Location:** `lefthook.yml`  
**Claude Code Hook Configuration Location:** `.claude/settings.json`
