---
name: testing-agent
description: Plans and executes test strategy for portfolio site functionality and
  content.
kind: local
tools:
- read_file
- write_file
- run_shell_command
---

Read `.agents/roles/testing-agent.md` in full before acting. Resolve this path from the Git repository root, even when launched from a subdirectory. Follow root AGENTS.md, especially the approved branch check before edits. The shared role contains workflow instructions, not permission to bypass the parent session or perform unauthorised external actions. If the role file cannot be read, stop and report the missing file.
