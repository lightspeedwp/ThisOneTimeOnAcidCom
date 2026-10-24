---
title: "TOA-365 shared workflow safeguards — acceptance and handoff report"
filename: "/reports/agent-workflows/2026-10-24-toa-365-shared-workflow-safeguards-handoff.md"
created: "2026-10-24"
modified: "2026-10-24"
version: "1.0.0"
report_type: "summary"
related_prompt: null
status: "draft"
---

# TOA-365 / PR #442 — acceptance and handoff report

> Historical implementation snapshot for commit `979e4d5`. This report preserves
> the findings and validation from that continuation; it does not assert that
> the PR's current CI or outstanding acceptance checks have since passed.
> The source prompt was supplied in chat rather than saved under `prompts/`.

24 October 2026. Local branch: `config/agents-speckit-setup`. PR target: `develop`.
Inspected starting head: `f01b99017667c0017d491fcf160befc8d9e2613c`.
Base inspected for the implementation: `6b3b76baa955acdfaee0d5e4aef39e099b4b083e`.
Review: [PR #442](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/442)

Status: bounded edits committed and pushed as `979e4d5f610823375de631c5de33790c12ca471c`; whole-issue acceptance remains incomplete. Existing PR #442 updated by a normal push, using the earlier publication authorisation. Local pre-commit and pre-push hooks passed; journal validation was correctly skipped because no journal files were staged. No record metadata, review-thread resolution, merge, deployment or closure performed.

## Implemented changes

- Fifteen native Specify, Plan, Checklist, Analyze and Converge instruction files now lead with consistent safety contracts, retaining each client's arguments and invocation syntax.
- Specify separately validates the safe current branch and exact approved target; only an explicitly authorised branch-only transition can precede actual-target checkout. Writing hooks and core writes remain gated. Failed, cancelled, missing or unconfirmed hook outcomes stop progression. Unresolved mandatory conditions no longer silently skip.
- The configured root is validated before scanning, numbering and path construction, preserving `.github/specs` as the default. Component containment includes checkout, root, candidate, existing ancestors, artefact symlinks and feature-state destinations.
- Analyze, Converge and Checklist prerequisite commands select `SPECIFY_FEATURE_NO_PERSIST=1`; Analyze and Converge retain required-file checks. Converge requires an exact proposed append, explicit confirmation and unchanged byte snapshots; clean results write nothing and skip writing hooks.
- Eight shared roles have explicit required/conditional root-relative skill dependencies, missing-source stops and no permission expansion.
- Five custom skills have repaired migration references and assessment-versus-write boundaries. Inventories and six client/shared guides explain ownership, discovery and limits.
- Fifty-one new checks: 46 structural/reference checks and five executable no-persistence/gap-characterisation cases. These do not simulate or prove LLM obedience.

## Acceptance matrix

| Requirement | Result and evidence |
| --- | --- |
| Existing approved branch; preserve history and unrelated work | Implemented: exact/current branch validators pass; user authorised return to existing branch; no replacement branch, reset, rebase or force-push. |
| Six canonical custom skills and six individual Claude links | Already implemented; preserved; symlink/source-content tests pass. No seventh skill or whole-directory link. |
| Twenty shared roles and native adapters | Existing architecture preserved; eight relevant dependency chains tested across three client adapters. Other twelve roles unchanged. |
| Required/conditional role dependencies; missing sources stop | Implemented as instructions and structural checks. Actual role activation/loading not model-smoke-tested. |
| Broken build/changelog/label/template/worktree references | Repaired in allowed files; existing destinations verified. Organisation labelling authority is upstream, not an invented local file. |
| Read-only validation versus installation/repair/commit | Instruction boundary clarified; no dependency installation, repair automation, lockfile or protected-file change. |
| Inventory categories/counts and client guidance | Implemented: six custom + ten generated Codex skills; twenty roles. Claude inventory pointer preserved. |
| Specify current versus target branch | Instruction contract implemented across three clients. Actual branch-changing hooks deliberately not exercised. |
| Plan/Checklist/Converge gate before hooks/setup/writes | Instruction contract implemented; existing checklist gates and reviewer checkbox semantics preserved. No host-enforcement claim. |
| Hook success, cancellation and mandatory-condition handling | Structural contracts implemented; actual native hook failure/cancellation paths not exercised. |
| Configured nested root used consistently | Instruction scanning/numbering/destination corrected across three clients. Existing create helper still hardcodes default root; executable consistency remains blocked. |
| Root/candidate/ancestor/artefact-symlink containment before effects | Instruction contract implemented. Raw resolver still accepts sibling-prefix, traversal and symlink escapes; executable fixture demonstrates the gap without persistence. No protected-write guarantee established. |
| Analyze read-only / non-persisting context | Actual prerequisite fixtures preserve state and artefact bytes with NO_PERSIST and still reject missing required files. Full native Analyze execution unperformed. |
| Converge assessment no persistence | Same executable prerequisite evidence. Full assessment model behaviour not verified. |
| Approved append / unchanged clean convergence | Explicit contract with snapshot/recheck and separate hook approval, structurally tested. Actual native append and clean execution not performed; runtime acceptance remains open. |
| Generated integration locations/manifests/fingerprints | Preserved. Disposable upgrades for Codex, Claude and Gemini refuse customised-file overwrite without force. No fingerprints reset. |
| Gemini generated-skill isolation | Blocked: installed 0.41.2 supports skills.disabled; current checkout untrusted. settings.json unchanged; no trust/credential change. |
| Codex discovery | Current native app-server skills/list: all sixteen repository skills, no errors, from root, src/app and .agents/roles. Discovery does not prove execution/permission enforcement. |
| Claude discovery | Six symlinks and adapter references verified structurally, including tracked archive preservation. Interactive skill menu and representative native activation not performed. |
| Gemini discovery/runtime | Installed skills-list command reports untrusted checkout and skips project definitions. Not counted as successful repository discovery or runtime smoke coverage. |
| Upgrade safety | All three disposable upgrades refused drift; relevant files unchanged. Successful upgrade/reconciliation not claimed. |
| Client permissions/budgets | Metadata/prose is not host enforcement. Effective restrictions and representative role execution remain unverified. |
| Routing/record boundaries | Shared config routing selects Chore; local router/workflow disagree. Reported, untouched. No labels, titles, descriptions, status, associations or checklists changed. |
| Application/deployment/accessibility/WordPress/release | Not applicable to this tooling-only contribution. No application, deployment, workflow, protected changelog or attribution changes. |
| Whole issue completion | Not met: executable-helper/client-control plan and authorised native runtime verification remain necessary. |

## Commands and actual results

Runtime: Node 26.0.0, npm 11.12.1; installed Node meets package >=24, but this is not a Node-24-specific validation. Specify 1.0.13; Gemini 0.41.2; Claude 2.1.309. No packages upgraded or installed.

| Check | Actual result |
| --- | --- |
| `npm run validate:branch-name -- --branch config/agents-speckit-setup` | Pass. |
| `npm run validate:branch-name` | Pass. |
| `npm run test:unit -- --runInBand` | 601 passed; 12 suites. |
| `node --test --test-reporter=tap tests/speckit.test.mjs` | 154 passed, 1 failed; 155 total. Environment set TMPDIR=/private/tmp and Specify's Python environment on PATH for PyYAML. |
| Untouched f01b990 archived baseline, same node suite/environment | 103 passed, same 1 failed. Failure: preset template path contains a double slash; pre-existing, not repaired outside scope. |
| `node --test --test-name-pattern=TOA-365 --test-reporter=tap tests/speckit.test.mjs` | 51 passed, 0 failed. Earlier red run: 37 of original 48 checks failed before implementation. |
| `npm run test:build` | Pass: invokes `npm run build`; Vite production build succeeds and Bats 12/12 passes using installed local binary. |
| Native JSON/TOML parsing | Pass for Gemini commands/settings, Codex config/adapters and Specify JSON. |
| Cross-client leading-contract comparison | All five corresponding leading contracts identical across three clients. |
| `git diff --check` | Pass. |
| Disposable `specify integration upgrade codex/claude/gemini` | Expected refusal, exit 1: local customisations detected; no force and no overwrite. Claude/Gemini before/after file hashes identical. |
| Codex app-server `skills/list` | Six custom + ten generated skills, zero errors at root and both nested directories. |
| `gemini skills list` | Command exits successfully but reports untrusted project and skips definitions; blocked smoke test. |
| CodeRabbit review | First review found ambiguous Converge wording in three copies and missing Checklist no-persistence prefixes in Codex/Claude. All corrected, 51 focused checks pass; final CodeRabbit review completed with zero findings across all 35 changed files. |

No invented lint/typecheck commands; no live branch-creating/writing hooks, end-to-end native workflow executions or E2E browser tests. Passing structural tests do not cover native approval rejection, protected/detached execution, hook failures, escaping writes, approved appends or clean convergence end to end.

## Current review findings

- r4366054794: addressed at instruction level across three clients: current/approved target distinction and branch-only transition exception. Actual hook enforcement unverified.
- r4366054799: addressed at instruction level: consistent validated configured-root scan and construction. Existing executable helper mismatch still needs revised scope.
- r4365734677 / r4365734686: checklist branch gates already present at f01b990; preserved and strengthened with leading contracts and non-persisting setup.
- r4356760163: Implement branch gate already present at f01b990; unchanged because outside allowed workflow edits.
- r4356760168 / r4365734679 / r4365734688: existing Specify branch/artefact safeguards retained; target-transition distinction and hook outcomes clarified.
- r4365734684 / r4365734692: existing configured-root instruction containment retained and extended to ancestors, artefacts and feature-state paths. Raw helpers remain unenforced.
- No remote review thread was marked resolved or replied to.

## Proposed record edits — exact text, not applied

Retain existing titles, Chore PR structure, labels and contribution associations. No closing directives.

### PR: replace “Canonical skills audit and proposed follow-up” content

> Six canonical custom skills, six individual Claude discovery links and twenty shared roles are preserved. This continuation adds explicit required/conditional dependencies to eight relevant roles, repairs migration references, updates inventories and client guidance, and aligns fifteen native workflow instruction contracts. Codex discovers all sixteen repository skills from root and nested directories. Structural checks and no-persistence fixtures pass; native workflow execution, host enforcement and conditional Gemini isolation remain incomplete. Generated integrations retain separate installer ownership and original fingerprints.

### PR: replace Verification section with

- [ ] CI passes for continuation commit `979e4d5f610823375de631c5de33790c12ca471c` (not yet verified)
- [ ] Full native-client smoke tests completed
- [x] Developer documentation updated locally
- [x] Exact/current branch validators passed locally
- [x] Jest: 601 tests, 12 suites passed locally
- [x] Production build and 12 Bats checks passed locally
- [x] Fifty-one new contract/reference/no-persistence checks passed locally
- [ ] Full Spec Kit suite passes: 154/155; baseline template-path double-slash failure remains
- [x] Codex root/nested discovery verified without errors
- [ ] Claude/Gemini representative native execution verified
- [ ] Gemini generated-skill isolation validated and applied
- [ ] Host-enforced branch/path/hook/append guarantees established

> Evidence applies to continuation commit 979e4d5f610823375de631c5de33790c12ca471c on starting head f01b99017667c0017d491fcf160befc8d9e2613c, tested on Node 26.0.0 and npm 11.12.1. Historical remote CI results remain tied to their recorded revisions. The earlier Claude guard job that skipped absent tests is not coverage. The full Spec Kit baseline reproduces the one remaining failure. Native workflow runtime checks remain open.

### PR: replace Rollback sentence with

> Before rollback, inspect the actual PR commit graph and develop merge. Prepare a reviewed reversal of the intended non-merge tooling changes, accounting for dependencies and subsequent changes. Do not blindly revert a fixed number of commits or revert the develop merge. Rollback execution requires separate approval.

### Issue #445 / TOA-365: replace copied branch/template criteria

Replace both “PR uses correct branch prefix (aiops/)” items with:

- [x] Existing approved `config/agents-speckit-setup` branch validated against repository policy.

Replace the DoD PR-template item with:

- [x] Existing Chore PR structure retained under refreshed shared `config/` routing; conflicting local routing reported without protected automation edits.

Replace stale branch instructions with:

> Implementation was authorised for the bounded edit-only continuation on config/agents-speckit-setup. Inspected published head f01b99017667c0017d491fcf160befc8d9e2613c; target develop at 6b3b76baa955acdfaee0d5e4aef39e099b4b083e. Exact and checked-out branch validators passed. Changes were committed and normally pushed as 979e4d5f610823375de631c5de33790c12ca471c to the existing PR branch with local hooks enabled and passing. No replacement branch, rebase, reset, force-push, metadata mutation, merge, deployment, closure or trust change was performed. The PR remains a partial contribution; no parent or closing target exists.

### Issue: proposed acceptance/checklist corrections

- [x] AI workflow/agent described; problem/opportunity scoped; success measure defined.
- [x] Documentation and inventory updates implemented locally.
- [x] Six canonical custom sources and individual Claude links preserved; generated integrations retain native ownership.
- [x] Inventory categories/totals reconciled; Claude inventory remains a pointer.
- [x] All three clients express consistent branch, hook, destination and persistence instruction contracts.
- [ ] Focused native-runtime checks establish missing/invalid approval, protected/detached branches, failed hooks and rejected escaping writes. Structural checks and helper gap fixtures are evidence of contracts/limits only.
- [ ] Native Analyze/Converge execution proves no-write, append-only and clean-result behaviour end to end. Non-persisting prerequisites are verified separately.
- [x] Evidence distinguishes structural checks, discovery, actual prerequisite execution, failures and unperformed runtime checks.
- [x] Custom skill procedures retain one canonical authored source.
- [x] Required/conditional dependencies are explicit and referenced sources resolve structurally.
- [ ] Actual native role execution demonstrates missing-required-source stops.
- [x] Verified broken references corrected without new skills/templates.
- [x] Read-only assessment distinguished from authorised repair.
- [x] Claude symlinks and generated ownership preserved.
- [ ] Gemini isolation validated/applied: blocked by existing trust state.
- [x] Disposable upgrades refuse customised-file overwrite; successful upgrade reconciliation not claimed.
- [ ] All acceptance criteria met / solution fully verified / human/remote review approval / new-head CI complete.

> Changelog preparation is N/A for this internal-tooling contribution; protected CHANGELOG.md remains unchanged. Label/type assessment remains separate; no labels were changed. DoR estimate remains unchecked. Branch deletion, linked-record closure, release notes and epic closure are outside this contribution's authority; no parent or closing target exists. Review approval remains unchecked. PR description corrections above are proposed, not already applied.

## Remaining plan/approval and environment dependencies

1. Review commit `979e4d5f610823375de631c5de33790c12ca471c` in PR #442. Commit and normal push are complete under the earlier publication authority. Verify new-head CI separately; no remote acceptance or review approval is inferred.
2. Approve a revised executable-helper/client-control plan before touching .specify/scripts or any new enforcement paths. It should validate current/approved branches and canonical R/B/C/F paths before effects, support configured nested roots, reject ancestor/artefact/state symlink escapes, preserve bytes on rejected paths, enforce no-persistence and exact approved append/clean behaviour, and add adversarial runtime tests. Native clients require genuine operation controls, not prose alone.
3. Establish an already authorised trusted Gemini smoke-validation environment before conditionally editing skills.disabled. Do not alter trust or credentials to obtain a pass.
4. Run representative native skill and role activation in each authorised client, including negative cases. Keep broader operational acceptance and relocation work separately owned.
5. Existing template-precedence helper failure and centrally managed routing conflict remain separately scoped. No helper or protected automation edits were made here.

## Implementation changed files (35 existing files; edits only)

- [.agents/README.md](../../.agents/README.md)
- [.agents/roles/INVENTORY.md](../../.agents/roles/INVENTORY.md)
- [.agents/roles/branches-agent.md](../../.agents/roles/branches-agent.md)
- [.agents/roles/changelog-agent.md](../../.agents/roles/changelog-agent.md)
- [.agents/roles/labeling-agent.md](../../.agents/roles/labeling-agent.md)
- [.agents/roles/playwright-agent.md](../../.agents/roles/playwright-agent.md)
- [.agents/roles/pr-agent.md](../../.agents/roles/pr-agent.md)
- [.agents/roles/release-agent.md](../../.agents/roles/release-agent.md)
- [.agents/roles/reviewer-agent.md](../../.agents/roles/reviewer-agent.md)
- [.agents/roles/testing-agent.md](../../.agents/roles/testing-agent.md)
- [.agents/skills/INVENTORY.md](../../.agents/skills/INVENTORY.md)
- [.agents/skills/changelog/SKILL.md](../../.agents/skills/changelog/SKILL.md)
- [.agents/skills/labeling/SKILL.md](../../.agents/skills/labeling/SKILL.md)
- [.agents/skills/speckit-analyze/SKILL.md](../../.agents/skills/speckit-analyze/SKILL.md)
- [.agents/skills/speckit-checklist/SKILL.md](../../.agents/skills/speckit-checklist/SKILL.md)
- [.agents/skills/speckit-converge/SKILL.md](../../.agents/skills/speckit-converge/SKILL.md)
- [.agents/skills/speckit-plan/SKILL.md](../../.agents/skills/speckit-plan/SKILL.md)
- [.agents/skills/speckit-specify/SKILL.md](../../.agents/skills/speckit-specify/SKILL.md)
- [.agents/skills/test/SKILL.md](../../.agents/skills/test/SKILL.md)
- [.agents/skills/validate/SKILL.md](../../.agents/skills/validate/SKILL.md)
- [.agents/skills/workflow-orchestration/SKILL.md](../../.agents/skills/workflow-orchestration/SKILL.md)
- [.claude/skills/speckit-analyze/SKILL.md](../../.claude/skills/speckit-analyze/SKILL.md)
- [.claude/skills/speckit-checklist/SKILL.md](../../.claude/skills/speckit-checklist/SKILL.md)
- [.claude/skills/speckit-converge/SKILL.md](../../.claude/skills/speckit-converge/SKILL.md)
- [.claude/skills/speckit-plan/SKILL.md](../../.claude/skills/speckit-plan/SKILL.md)
- [.claude/skills/speckit-specify/SKILL.md](../../.claude/skills/speckit-specify/SKILL.md)
- [.codex/README.md](../../.codex/README.md)
- [.gemini/GEMINI.md](../../.gemini/GEMINI.md)
- [.gemini/commands/speckit.analyze.toml](../../.gemini/commands/speckit.analyze.toml)
- [.gemini/commands/speckit.checklist.toml](../../.gemini/commands/speckit.checklist.toml)
- [.gemini/commands/speckit.converge.toml](../../.gemini/commands/speckit.converge.toml)
- [.gemini/commands/speckit.plan.toml](../../.gemini/commands/speckit.plan.toml)
- [.gemini/commands/speckit.specify.toml](../../.gemini/commands/speckit.specify.toml)
- [CLAUDE.md](../../CLAUDE.md)
- [tests/speckit.test.mjs](../../tests/speckit.test.mjs)

## Publication evidence

Commit: `979e4d5f610823375de631c5de33790c12ca471c`. Normal push: `f01b990..979e4d5 HEAD -> config/agents-speckit-setup`. Pre-commit branch validation passed; journal check skipped no matching staged files. Pre-push push-ref validation and production build passed. Final CodeRabbit review: completed, zero findings. No tests or hooks bypassed.
