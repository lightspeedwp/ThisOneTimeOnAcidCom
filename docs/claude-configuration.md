# Claude Configuration — ThisOneTimeOnAcidCom

Guidance for setting up and maintaining AI agent configuration for this
repository.

---

## Configuration Ownership Matrix

| Configuration | Scope | Owner | Location | Committed | Notes |
|---|---|---|---|---|---|
| Shared settings (defaults, model, tools) | Repository | Repository | `.claude/settings.json` | ✓ Yes | Shared across all sessions and users |
| Example settings (template) | Repository | Repository | `.claude/settings.example.json` | ✓ Yes | Template only; never copy to .local.json |
| Personal/machine settings | User | Individual | `.claude/settings.local.json` | ✗ No | Each person's environment; git-ignored |
| Cloud environment config | Deployment | Cloud ops | (Cloud UI, not repo) | ✗ No | Set via claude.ai cloud environment settings |
| Agents | Repository | Repository | `.claude/agents/*.md` | ✓ Yes | Shared definitions |
| Skills | Repository | Repository | `.claude/skills/*/` | ✓ Yes | Reusable workflows |
| Hooks | Repository | Repository | `.claude/hooks/` + `scripts/claude/` | ✓ Yes | Hook definitions and executable scripts |
| Credentials/tokens | User | Individual | Environment variables or cloud settings | ✗ No | Never commit secrets |

---

## Settings Precedence (Lowest to Highest)

1. **Built-in defaults** — Claude Code hard-coded defaults

1. **User-wide settings** — `~/.claude/settings.json` (local machine only)

1. **Repository shared settings** — `.claude/settings.json` (this file)

1. **Repository local overrides** — `.claude/settings.local.json` (machine-specific, git-ignored)

1. **Session overrides** — `/config` command or API parameters

## Effective setting check

In Claude Code, run `/status` to see which settings are actually loaded and
their source.

---

## Setup Instructions

### Step 1: Clone & Navigate

```bash
git clone https://github.com/lightspeedwp/ThisOneTimeOnAcidCom.git
cd ThisOneTimeOnAcidCom
git checkout develop
git checkout -b aiops/claude-repository-configuration

```text

### Step 2: Install Dependencies

```bash
npm ci --include=dev

```text

### Step 3: Verify Build

```bash
npm run build

```text

Expected output: `✓ built in X ms` (dist/ directory created)

### Step 4: (Optional) Create Local Overrides

Only if you need machine-specific settings:

```bash
cp .claude/settings.example.json .claude/settings.local.json

# Edit .claude/settings.local.json with your overrides

# This file is git-ignored and will not be committed

```text

### Step 5: Reload Claude Code

Restart Claude Code or open the repository again. Verify settings loaded:

```text
/status

```text

---

## Shared Configuration

### `.claude/settings.json` — Repository Defaults

Locked settings that apply to all sessions and users:

- **Model:** `claude-sonnet-5-5` (latest Sonnet, suitable for code work)
- **Tools:** bash, file operations, git, agents (all enabled)
- **Hooks:** SessionStart (runs validation on session open)

**Do NOT commit:**

- Personal paths (`~/`, `/Users/`, `C:\Users\`)
- Credentials or API keys
- Machine-specific configuration

### `.claude/agents/` — Shared Agents

Seventeen agents adapted for this repository:

- `changelog-agent/` — Changelog management
- `design-partner-agent/` — Design system guidance
- `content-strategy-agent/` — Content planning
- (+ 14 more: see agent adaptation matrix below)

Agents are discovered automatically; invoke by name.

### `.claude/skills/` — Reusable Skills

Skills for common workflows:

- `validate/` — Dependency, build, and repository validation
- `test/` — Test suite execution
- `changelog/` — Changelog entry preparation
- `labeling/` — PR/issue labeling
- `branch-validation/` — Branch name and policy checks

### `.claude/hooks/` — Automation

Hooks and their executable handlers:

- `SessionStart` → `scripts/claude/validate.sh` (runs on session open)
- `PreToolUse` → (proposed: prevents risky operations; see setup options)

---

## Agent Adaptation Matrix

## All 17 requested agents are included. Adaptation status

| # | Agent | Source | Status | Notes |
|---|---|---|---|---|
| 1 | changelog-agent | .github/agents/changelog-agent | ✓ Adapted | Handles changelog generation and validation |
| 2 | design-partner-agent | .github/agents/design-partner-agent | ✓ Adapted | Figma Make design system guidance |
| 3 | content-strategy-agent | .github/agents/content-strategy-agent | ✓ Adapted | Content planning and voice |
| 4 | website-content-strategist-agent | .github/agents/website-content-strategist-agent | ✓ Adapted | Portfolio content specialist |
| 5 | testing-agent | .github/agents/testing-agent | ✓ Adapted | Test planning and execution |
| 6 | reviewer-agent | .github/agents/reviewer-agent | ✓ Adapted | Code and design review |
| 7 | reporting-agent | .github/agents/reporting-agent | ✓ Adapted | Report generation and analysis |
| 8 | release-agent | .github/agents/release-agent | ✓ Adapted | Release preparation and validation |
| 9 | prd-agent | .github/agents/prd-agent | ✓ Adapted | Product requirement documentation |
| 10 | pr-agent | .github/agents/pr-agent | ✓ Adapted | Pull request assistance |
| 11 | pagespeed-agent | .github/agents/pagespeed-agent | ✓ Adapted | Performance monitoring |
| 12 | metrics-agent | .github/agents/metrics-agent | ✓ Adapted | Analytics and metrics tracking |
| 13 | metadata-agent | .github/agents/metadata-agent | ✓ Adapted | Metadata validation and management |
| 14 | labeling-agent | .github/agents/labeling-agent | ✓ Adapted | Automated labeling workflows |
| 15 | issue-agent | .github/agents/issue-agent | ✓ Adapted | Issue triage and routing |
| 16 | document-reviewer-agent | .github/agents/document-reviewer-agent | ✓ Adapted | Documentation quality assurance |
| 17 | client-website-discovery-assistant-agent | .github/agents/client-website-discovery-assistant-agent | ✓ Adapted | Portfolio discovery and analysis |

## Adaptation approach

- Removed unrelated WordPress/governance assumptions
- Aligned with repository purpose (portfolio site built with Figma Make)
- Preserved applicable tools, permissions, and responsibilities
- Each agent has a `.md` definition in `.claude/agents/`

---

## Hook Options & Recommendations

### SessionStart (Enabled by Default)

**Purpose:** Validation on session open

**Current behavior:**

```bash
scripts/claude/validate.sh

```text

**What it does:**

- Checks `npm ls --depth=0` (dependency consistency)
- Confirms `npm run build` would succeed
- Reports validation status

**Customization:**

Remove SessionStart hook if validation noise becomes problematic:

```json
{
  "hooks": {}
}

```text

Or add specific validation events (journal content, changelog format, etc.):

```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "scripts/claude/validate.sh",
        "timeout": 60
      }
    ]
  }
}

```text

### PreToolUse (Optional — Not Yet Enabled)

**Purpose:** Prevent risky operations (optional safeguard)

**When to enable:**

If you want guards against:

- Unintended branch deletions
- Accidental force-pushes
- Risky file deletions

**Implementation:**

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

**Recommendation:** Not enabled by default; enable if risky operations occur
frequently.

### PostEdit (Optional — Not Yet Enabled)

**Purpose:** Cleanup or validation after file edits

**When to enable:**

- Auto-format edited files (`prettier`, `eslint --fix`)
- Regenerate lockfiles
- Validate JSON/YAML syntax

**Not recommended for this repo** (no formatting requirements; manual review
preferred).

---

## Cloud Environment Defaults

### Minimal Baseline

The cloud environment starts with:

- **Network:** Trusted (no secrets or env vars initially)
- **Runtime:** Node 22.x, npm 10.x
- **Dependencies:** Installed via `npm ci --include=dev`
- **Build validation:** `npm run build` on each session

### Adding to Cloud Setup

If additional configuration is needed (credentials, custom hosts, etc.):

1. Document the requirement with justification

1. Request addition through the cloud environment UI

1. Never hardcode secrets in this repository

1. Test on a fresh session after setup

### Supported Features

- ✓ Local `.claude/` configuration
- ✓ Agents and subagents
- ✓ Skills
- ✓ Hooks with executable scripts
- ✓ MCP connections (when configured in cloud environment)
- ⚠ Workflows (supported but advanced; requires feature verification)
- ⚠ Worktrees (supported but optional; not used by default)

---

## Troubleshooting

### Settings Not Loading

**Symptom:** `/status` shows unexpected model or missing hooks

**Fixes:**

1. Verify `.claude/settings.json` exists and is valid JSON

1. Check for `.claude/settings.local.json` overriding defaults

1. Restart Claude Code

1. Run `/status` again to confirm

### Hook Execution Fails

**Symptom:** SessionStart hook fails; validation errors appear

**Fixes:**

1. Check `scripts/claude/validate.sh` is executable: `chmod +x scripts/claude/validate.sh`

1. Run manually: `bash scripts/claude/validate.sh` (test outside Claude Code)

1. Check `npm ci --include=dev` succeeded: `npm ls --depth=0`

1. Verify `npm run build` works locally

### Agents Not Discovered

**Symptom:** Agent names not auto-complete; invoke by name fails

**Fixes:**

1. Verify `.claude/agents/` directory exists

1. Check agent `.md` files have proper frontmatter

1. Reload Claude Code session

1. Confirm agent names match directory names

### Cloud Session Differences

**Symptom:** Cloud session behaves differently than local

**Known differences:**

- User-wide `~/.claude/settings.json` does NOT transfer to cloud
- Cloud sessions do NOT have personal `.claude/settings.local.json`
- Cloud environment settings (env vars, credentials) are separate

**Solutions:**

- Store session-critical config in `.claude/settings.json` (committed)
- Use cloud environment UI for credentials
- Document cloud-specific setup in `.claude/cloud/README.md`

---

## Rollback & Cleanup

### Remove Claude Configuration

To completely remove Claude configuration:

```bash
rm -rf .claude/
rm -rf scripts/claude/
rm docs/claude-configuration.md
git add .
git commit -m "Remove Claude configuration"
git reset --hard HEAD~1  # undo if needed

```text

### Disable Specific Features

Remove hooks (keep settings and agents):

```json
{
  "model": "claude-sonnet-5-5",
  "tools": { ... },
  "hooks": {}
}

```text

Remove agents (keep settings and hooks):

```bash
rm -rf .claude/agents/

```text

---

## References

- [Claude Code Documentation](https://code.claude.com/docs/en/)
- [Settings & Privacy](https://code.claude.com/docs/en/settings)
- [Agents & Subagents](https://code.claude.com/docs/en/sub-agents)
- [Skills](https://code.claude.com/docs/en/skills)
- [Hooks](https://code.claude.com/docs/en/hooks)
- [Cloud Environments](https://code.claude.com/docs/en/cloud-environments)
- [ThisOneTimeOnAcidCom: Guidelines](./guidelines/README.md)
- [ThisOneTimeOnAcidCom: Cloud Setup](../.claude/cloud/README.md)

---

**Last Updated:** 2026-10-16
**Configuration Owner:** Repository
**Next Review:** After first agent/hook usage
