# Claude Code Hooks — ThisOneTimeOnAcidCom

Portable hook definitions and executable handlers for Claude Code automation.

## Overview

Hooks enable automated tasks at key points in the Claude Code workflow:

- **SessionStart** — Runs when a Claude Code session opens (validation, setup)
- **PreToolUse** — Runs before tool execution (guards, confirmations)
- **PostEdit** — Runs after file edits (formatting, regeneration)

This directory contains hook definitions; executable scripts live in
`scripts/claude/`.

## Enabled Hooks

### SessionStart

**Purpose:** Validate environment on session open

**Handler:** `scripts/claude/validate.sh`

**What it does:**

- Checks `npm ls --depth=0` (dependency consistency)
- Confirms `npm run build` would succeed
- Reports validation status to user

**Configuration:**

```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "\"$CLAUDE*PROJECT*DIR\"/scripts/claude/validate.sh",
        "timeout": 60,
        "match_output": true
      }
    ]
  }
}

```text

**When to disable:**
Remove SessionStart hook if validation noise becomes problematic (uncommon).

## Optional Hooks (Not Enabled by Default)

### PreToolUse

**Purpose:** Guard against destructive operations (optional safeguard)

**When to enable:**
If you want guards against:

- Unintended branch deletions
- Accidental force-pushes
- Risky file deletions

**Configuration:**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "patterns": ["git push --force", "rm -rf", "git reset --hard"],
        "type": "prompt",
        "message": "This operation is destructive. Confirm before proceeding."
      }
    ]
  }
}

```text

**Handler:** `scripts/claude/pre-tool-guard.sh` (if implemented)

**Recommendation:** Enable only if destructive operations occur frequently.

### PostEdit

**Purpose:** Cleanup or validation after file edits (not recommended for this
repo)

**When to enable:**

- Auto-format edited files (`prettier`, `eslint --fix`)
- Regenerate lockfiles
- Validate JSON/YAML syntax

**Not recommended** for this repository (no formatting requirements; manual
review preferred).

## Hook Development

To add a new hook:

1. Define in `.claude/settings.json` under `hooks`

1. Create executable script in `scripts/claude/`

1. Test manually: `bash scripts/claude/{handler}.sh`

1. Document here with purpose, triggers, and configuration

## References

- [Claude Code Documentation: Hooks](https://code.claude.com/docs/en/hooks)
- [Settings Configuration](../settings.json)
- [Cloud Environment Setup](../cloud/README.md)
- [Configuration Guide](../../docs/claude-configuration.md)

---

**Last Updated:** 2026-10-16
**Maintained By:** Repository
**Configuration Location:** `.claude/settings.json`
