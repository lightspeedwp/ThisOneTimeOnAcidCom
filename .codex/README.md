# Codex project setup

This folder contains the shared OpenAI Codex configuration for
ThisOneTimeOnAcid. It sits alongside `.claude/` and `.gemini/`, using Codex's
native configuration format.

## Configuration and instructions

| Purpose | Location |
| --- | --- |
| Shared project settings | [config.toml](config.toml) |
| Automatically discovered project instructions | [AGENTS.md](../AGENTS.md) |
| Authoritative development and design guidance | [guidelines/README.md](../guidelines/README.md) |
| Personal settings, authentication and MCP connections | Your user-level `~/.codex/` folder |
| Repository skills | [.agents/skills/](../.agents/skills/) |

The shared configuration raises the project instruction limit to 65,536 bytes.
Model selection, reasoning effort, permissions and MCP connections inherit your
personal or managed settings. No API key is required for this folder setup.

Keep instructions in the root `AGENTS.md`; do not duplicate them into an
`OPENAI.md` or a second Codex instruction file. Read the guidelines in their
documented order before making changes. The repository uses npm, Node.js 24+
and semantic BEM CSS; older agent-specific notes may contain stale pnpm or
Tailwind references.

## Start using it

1. Open this repository in Codex, or run `codex` from its root directory.
2. Trust the project through your Codex client's normal trust flow if prompted.
   Project configuration loads only for trusted projects; this repository does
   not set trust on your behalf.
3. Start a new session after adding or changing configuration.
4. Ask Codex to implement a specific task. The root `AGENTS.md` supplies the
   repository rules automatically.

Use existing npm scripts for validation and report only checks actually run.
See [package.json](../package.json) and [docs/TESTING.md](../docs/TESTING.md).

## Spec Kit workflows

Spec Kit 1.0.13 is registered for Codex, Gemini CLI and Claude Code. Gemini
remains the default integration; adding an integration does not change the
default. All three use the existing `.specify/` constitution, templates and
scripts.

Feature artefacts live in `.github/specs/<NNN-short-name>/`. The repository's
`specifyFeatureDirectory` setting in `.specify/init-options.json`, local Bash
creation script, agent specification instructions and plan/task templates are
aligned to that location. Continue numbering from the existing `001` and `002`
directories. The setting is a repository convention read by the agents; do not
assume an upstream Spec Kit installation will automatically honour it.

The three generated specification commands contain this local path
customisation. Integration upgrades will report them as modified; preserve or
reapply the customisation when reviewing an upgrade.

| Agent | Generated files | Invoke in agent chat |
| --- | --- | --- |
| Codex | `.agents/skills/speckit-*/SKILL.md` | `$speckit-specify`, `$speckit-plan`, `$speckit-tasks`, `$speckit-implement` |
| Gemini CLI | `.gemini/commands/speckit.*.toml` | `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement` |
| Claude Code | `.claude/skills/speckit-*/SKILL.md` | `/speckit-specify`, `/speckit-plan`, `/speckit-tasks`, `/speckit-implement` |

For an existing checkout, use integration management rather than reinitialising:

```sh
specify integration status
specify integration install codex
specify integration install claude
```

Gemini is already installed. On a checkout without it, use
`specify integration install gemini`. Use `specify integration use <agent>` only
when intentionally changing the default; extension and preset commands follow
that default. Review managed-file changes before any integration upgrade; do
not force-overwrite repository customisations. Spec Kit reports locally modified managed files, including preserved
pre-existing customisations and the repository-specific `.github/specs/`
defaults. Review these diffs rather than force-overwriting them.

For reusable Codex workflows, add repository skills under `.agents/skills/`.
Gemini command TOML and Claude agent/settings files are not Codex configuration.
Codex custom prompts are deprecated and are not the basis of this setup.

## Shared custom skills and roles

Six custom skills live in `.agents/skills/`, alongside Codex's generated Spec
Kit skills. Codex and Gemini discover that shared skill location natively (no `skillRoot` setting is used);
Claude uses relative links from `.claude/skills/`. Shared instructions for
all twenty roles live in `.agents/roles/` and are loaded by native definitions
in `.codex/agents/`, `.claude/agents/` and `.gemini/agents/`.

See [the shared layout](../.agents/README.md) for maintenance and discovery.

## Branch naming before every task

Follow **Branch check before every task** in [AGENTS.md](../AGENTS.md). Codex's
[$branch-validation skill](../.agents/skills/branch-validation/SKILL.md) points to
the canonical shared branch skill and role, so their naming policy is shared.
Ash must supply or approve the exact branch name before creation or switching;
do not automatically prefix names with `codex/`. Validate both the proposed
name and the checked-out branch before edits.

Instructions require this check before work. The installed Lefthook pre-commit
and pre-push hooks reject invalid names at commit/push time, and the existing
GitHub Actions workflow validates PR branches. A skill alone cannot enforce
behaviour, and local Git hooks can be bypassed; agents must not bypass them.
Required server-side checks depend on GitHub branch protection settings, which
this setup does not change.

Spec Kit feature directories such as `specs/001-feature-name` are independent
of the approved Git branch. Do not turn numbered feature names into branches.

## Shared and personal configuration

The repository `.codex/` folder is committed normally, with no `.gitignore`
entry. Store credentials, session state and machine-specific settings in your
user-level `~/.codex/` folder. A `config.local.toml` is not an automatically
loaded override; use supported user-level configuration for personal settings.

## Safeguards and verification limits

The native Specify, Plan, Checklist, Analyze and Converge instructions retain
separate installer ownership and client invocation syntax. Their leading
workflow contracts require approved branch/operation checks before writing
hooks or setup; Specify distinguishes a safe current branch from an approved
branch-only transition and revalidates actual target checkout before writes.
Use the validated configured specification root for scanning, numbering and
candidate construction. Canonical component containment must include existing
ancestors, symlinks, artefacts and feature-state destinations.

Analyze and converge prerequisite resolution uses
`SPECIFY_FEATURE_NO_PERSIST=1` with required-file validation. Analyze core is
read-only. Converge assessment preserves state; an append needs approval of the
exact task block and an unchanged snapshot. A clean result changes nothing.
Writing-hook permission is independent of append permission.

These instructions and structural tests do not establish host enforcement.
The existing raw helpers still accept out-of-boundary path inputs. Strong
approval, branch, configured-root, symlink and append enforcement requires a
separately approved executable-helper/client-control plan and adversarial
runtime tests. Do not describe a structural pass as a protected write path.

Gemini 0.41.2 supports `skills.disabled` for generated-skill isolation, but the
checkout is untrusted during this run. The conditional settings change is
blocked; no trust settings were changed. Discovery/configuration inspection
is distinct from representative model execution and permission validation.

Integration manifests deliberately retain their original fingerprints. Review
local drift and upgrade behaviour in a disposable checkout; do not force an
upgrade or re-baseline hashes to hide customisations.

## References

Official OpenAI documentation, checked 23 October 2026:

- [Configuration basics](https://developers.openai.com/codex/config-basic)
- [Configuration reference](https://developers.openai.com/codex/config-reference)
- [Repository skills](https://developers.openai.com/codex/skills)
- [Custom prompt deprecation](https://developers.openai.com/codex/custom-prompts)

Official GitHub Spec Kit integration documentation, checked 23 October 2026:

- [Codex CLI](https://github.github.com/spec-kit/integrations/codex.html)
- [Gemini CLI](https://github.github.com/spec-kit/integrations/gemini.html)
- [Claude Code](https://github.github.com/spec-kit/integrations/claude.html)
- [Integration management](https://github.github.com/spec-kit/integrations/cli.html)

Gemini's shared instruction discovery uses the documented `context.fileName`
setting: [Gemini CLI configuration](https://geminicli.com/docs/reference/configuration/).
