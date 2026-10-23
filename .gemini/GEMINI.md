# Gemini project setup

The project settings load `AGENTS.md` and `GEMINI.md` context files. The root
`AGENTS.md` is the authoritative repository instruction file; follow its
**Branch check before every task** before editing files or running Spec Kit.

Use npm and Node.js 24+. Follow semantic BEM CSS and the documented guidelines
reading order. Preserve the protected assets and files listed in `AGENTS.md`.

Spec Kit's Gemini commands live in `.gemini/commands/`. Invoke them in Gemini
chat with dotted names such as `/speckit.specify`, `/speckit.plan`,
`/speckit.tasks` and `/speckit.implement`. Shared configuration lives in
`.specify/`; Gemini remains the default integration alongside Codex and Claude
Code. See `.codex/README.md` for integration maintenance and branch checks.

Spec Kit feature directory numbering is independent of Git branch naming.
Use only Ash's supplied or approved branch name and validate the checked-out
branch with `npm run validate:branch-name` before writing files.

Shared custom skills are discovered in `.agents/skills/`. Native Gemini agent
files in `.gemini/agents/` load canonical role instructions from `.agents/roles/`.
See `.agents/README.md` for the shared layout and maintenance rules.
