# Shared skills and agent roles

Custom workflow instructions are maintained here for Codex, Gemini CLI and
Claude Code. Root [AGENTS.md](../AGENTS.md) remains the repository instruction
source, including the approved branch check before edits.

## Layout

| Location | Purpose |
| --- | --- |
| `skills/<name>/SKILL.md` | Six canonical custom skills |
| `skills/speckit-*/SKILL.md` | Ten generated Codex Spec Kit skills |
| `roles/*-agent.md` | Twenty canonical role instruction documents |
| [Skill inventory](skills/INVENTORY.md) | Shared skills and their purposes |
| [Role inventory](roles/INVENTORY.md) | Roles, dependencies and operating rules |

Codex and Gemini discover `.agents/skills/` natively. Each custom skill folder
in `.claude/skills/` is a relative symlink to its canonical folder here, so
editing a linked skill edits the shared source. Git must preserve symlinks in
the checkout. Do not replace them with independent copies.

## Native agent definitions

Shared role documents are instructions, not an automatic agent discovery
format. Each role has a small native definition:

- `.claude/agents/<name>.md`: Claude metadata and native tool names.
- `.gemini/agents/<name>.md`: Gemini metadata and native tool names.
- `.codex/agents/<name>.toml`: Codex metadata and developer instructions.

Each definition tells its agent to read the matching `.agents/roles/<name>.md`
in full before acting, resolving the path from the Git repository root. It
also requires root `AGENTS.md` and stops if the role document is unavailable.
The role then reads its required or conditional canonical skills before the
relevant action; missing required instructions stop progression.
There is no separate shared-role path setting or file import assumed by these
definitions. Models and session permission settings are inherited.

Edit behaviour in `roles/`; update a native definition only when its discovery
metadata or tool configuration changes. Tool access remains subject to the
client, parent session and repository rules. Creating these definitions does
not grant permission to delegate tasks or send messages externally.

## Spec Kit ownership

Keep generated Codex skills in `.agents/skills/speckit-*`, generated Claude
skills in `.claude/skills/speckit-*` and Gemini commands in `.gemini/commands/`.
Spec Kit tracks these paths and their hashes in `.specify/integrations/`.
Do not move or symlink the generated files across integrations. Use
`specify integration status` to inspect their state before upgrading.

## Verify discovery

Start a new session after changing configuration or agent definitions.
Workspace skills and agents remain subject to each client's trust controls.
Gemini currently reports this checkout as untrusted and skips its project
definitions; review it with `/trust` in Gemini and restart to load them. This
migration does not change your personal trust settings.

- Claude: inspect the skill menu and `/agents`; custom skill folders resolve
  through `.claude/skills/`.
- Gemini: use `gemini skills list` or `/skills list`, and inspect `/agents`.
- Codex: inspect available skills and use a native agent by its declared name
  when delegation is authorised.

Verify relative links resolve in a fresh checkout, parse the native TOML/YAML
files and confirm that every definition points to an existing shared role.
File validation establishes layout integrity; an actual agent invocation is
needed to exercise that client's runtime tool behaviour.

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

## Sources

Official documentation checked 23 October 2026:

- [Codex skills](https://developers.openai.com/codex/skills)
- [Codex custom agents](https://developers.openai.com/codex/multi-agent)
- [Gemini skill discovery](https://geminicli.com/docs/cli/using-agent-skills/)
- [Gemini custom agents](https://geminicli.com/docs/core/subagents/)
- [Claude skills and symlink support](https://code.claude.com/docs/en/skills)
- [Claude custom agents](https://code.claude.com/docs/en/sub-agents)
