---
title: "Post-PR #442 acceptance audit"
filename: "/reports/agent-workflows/2026-11-11-post-pr-442-acceptance-audit.md"
created: "2026-11-11"
modified: "2026-11-11"
version: "1.0.0"
report_type: "analysis"
related_prompt: "/prompts/agent-workflows/2026-11-11-complete-agent-workflow-acceptance.md"
related_tasks: "/tasks/2026-11-11-agent-workflow-acceptance.md"
status: "complete"
related_guidelines:
  - "/guidelines/Guidelines.md"
  - "/guidelines/prompt-creation-guidelines.md"
  - "/guidelines/report-creation-guidelines.md"
---

# Post-PR #442 acceptance audit

Checked 11 November 2026 against fetched origin/main `f6a83750306b36eef3b9199bcb8299579c826042`. The initial local main was `4eebd5104c998fb1082b7ae0bb11c199f2e31704`; its only diff from the fetched main was Spec 004 content, outside this audit. No implementation was changed. The audit report is complete as a snapshot; implementation acceptance is not complete.

## Executive summary

- PR #442's configuration, instruction contracts, shared layout, report and root-file relocations are merged. The remaining executable/client acceptance has not been completed in the inspected source or records.
- A fresh full Spec Kit run still yields 154 passes and one template-path failure. Gemini remains untrusted with no generated-skill isolation applied.
- Ash clarified main-only workflow and intentionally non-blocking Git validation. The follow-up must reconcile stale instructions, not restore removed branch protection or blocking hooks.
- TOA-451 remains the planning/evidence record for the Jest-to-Vitest migration, while TOA-453 is the implementation record. The current package already exposes Vitest scripts and dependencies but still retains Jest packages and historical configuration consumers; migration is not complete.

## Ash's numbered answers incorporated into the handoff

1. Use `main` as the base and an explicitly approved implementation branch; do not use `develop`, restore branch protection or make Git hooks blocking.
2. Implement executable Spec Kit helper/path safeguards with configured-root support and canonical containment before writes.
3. Verify hook ordering/failure handling, Analyze no-write behaviour and Converge confirmation/snapshot/clean-result behaviour through controlled tests.
4. Preserve shared skills and native adapters; verify Codex, Claude and Gemini discovery/runtime without changing trust or credentials automatically.
5. Use Vitest as the current test runner, fix the template-path failure, run current suites and record evidence rather than relying on historical Jest results.
6. Save dated reports/tasks, publish a new PR against `main`, and leave record mutations and protected-file changes separately authorised.

## Owner decisions recorded today

Main is the current base for Netlify/Figma Make work; do not use develop as a working base. Ash removed branch protection as unnecessary for his solo workflow. A remote develop ref was still advertised, but that does not override his decision or authorise deletion. He approved docs/agent-workflows-acceptance-handoff from main for this audit/prompt/task documentation. Implementation branch naming still needs an exact approved name. No implementation or protected automation changes are authorised by the documentation branch choice.

## Acceptance matrix and evidence

| Item left open in October | Current finding | Disposition |
| --- | --- | --- |
| Canonical shared layout / role dependencies / instruction parity | Merged in c3ca303; existing structural/reference tests pass. New unrelated Claude skills and a PRD-role extension also exist. | Preserve correct work and newer skills; do not repeat wholesale migration. |
| Executable canonical containment | common.sh still takes an explicit feature path and may persist it before any containment validation. The existing gap-characterisation fixture still passes by demonstrating sibling-prefix, traversal and symlink acceptance. No diff from c3ca303 to origin/main for this helper. | Unresolved: implement/test controlled write boundaries. |
| Configured nested root consistency | create-new-feature.sh:202 hardcodes SPECS_DIR to repository .github/specs and mkdir occurs at 204. init-options.json still declares the configurable root. No helper change since #442. | Unresolved: one validated configured root for discovery/numbering/destination/state. |
| Branch/hook enforcement | Workflow markdown contracts remain. No new executable rejection tests or native outcome evidence in the inspected follow-up. | Unverified runtime acceptance; do not call structural tests host enforcement. |
| Git hook enforcement | #586 merged 9 November deliberately makes wrappers exit 0. Disposable fixtures with mocked npm exit 23 confirm both hooks return 0. Pre-push also incorrectly reports the failed build as passed because tail determines the pipeline status. | Non-blocking exit is owner-confirmed policy, not a defect to reverse. Truthful logging and stale guidance still need correction. |
| Analyze / Converge no-persistence | Current executable fixtures preserve artefact/state bytes and still reject missing required files. Full native Analyze, approved append, stale-snapshot rejection and unchanged clean convergence have no new verified runtime evidence. | Prerequisite behaviour tested; whole native outcome remains unverified. |
| Gemini isolation | skills.enabled true; no skills.disabled. Gemini 0.41.2 still reports untrusted folder, skips project agents and disables project hooks during skills list. | Still blocked on authorised trust/runtime path; do not change personal trust to pass. |
| Three-client role loading / missing-source stops | No new recorded representative native execution evidence located. Tests cover source references and links. | Remains unverified, not proven broken. |
| Template precedence failure | Fresh full suite reproduces custom//templates/plan-template.md mismatch. Suite source unchanged since c3ca303. | Still unresolved; fix underlying path join. |
| Jest-to-Vitest migration (TOA-451/TOA-453) | `package.json` currently uses Vitest scripts and retains Vitest dependencies, but also retains Jest, `@swc/jest`, Jest environment/types and lockfile packages. Migration acceptance still requires discovery, transforms, mocks, snapshots, coverage, reporting and CI consumer review. | Still unresolved: complete TOA-453 using TOA-451's evidence; preserve Node/Bats/Playwright and document rollback. |
| Migration references | workflow-orchestration still contains absent-template copy instructions near lines 101/166 despite inline alternatives later, plus a misresolved ../guidelines backend link introduced by the D6 addition. | Still needs a complete verified-link pass. Preserve adopted D3–D6 content. |
| Upgrades | Historical non-forced upgrade refusal evidence is retained; not re-executed in this audit. | Re-test after follow-up changes; do not claim fresh successful upgrade. |
| Record reconciliation | GitHub #445 remains Open (updated 24 October 05:25 UTC), TOA-365 remains In Progress (updated 24 October 10:05 UTC); descriptions/checklists remain earlier proposals. | Prepare corrections after implementation; no record mutations made. |

Related operational/relocation issues #260, #262 and #250 are also still Open. The first two were last updated 20 October and #250 on 24 October; their descriptions retain outstanding operational validation. They provide no post-merge runtime completion evidence. Their broader acceptance and record changes remain separately owned.

## Changes since the merged PR

PR #442 was squash-merged on 24 October into then-active develop as c3ca30394054860fad10819ed4bc9800cb12bc58. Therefore the original branch commits need not be ancestors of current main to have their contents present. The old branch ref is gone; do not reuse it.

Comparing that merge to current origin/main shows no changes to common.sh, create-new-feature.sh, tests/speckit.test.mjs or .gemini/settings.json. Shared custom skills received D3–D6 guidance changes (2c0c902, later merge d5b4454); the PRD role and unrelated Claude skills also changed. None resolves the demonstrated helper/test/isolation gaps. This is source/history evidence, not a claim to have inspected every off-repository private runtime session.

PR #586 intentionally changed local hooks; current AGENTS wording claiming blocking hooks and default develop no longer matches owner policy. The pre-push build pipeline lacks failure-status propagation, a separate reporting bug demonstrated below. Central CI/routing work remains separately owned.

## Fresh checks performed

- Read live PR #442 merge state, GitHub #445 and Linear TOA-365 with relations; inspected PR #586 and current source/history; fetched origin without modifying main.
- Read-only comparison to fetched origin/main and local source: only unrelated Spec 004 diff, so tested helpers/suite match fetched main exactly.
- `env TMPDIR=/private/tmp PATH="<Specify Python environment>:$PATH" node --test --test-reporter=tap tests/speckit.test.mjs`: exit 1; 155 total, 154 pass, 1 fail. All 51 TOA-365 tests passed within that suite; most are structural. Sole failure at test line 257 is the same preset-template double-slash mismatch.
- Gemini skills list: exit 0, but untrusted-project warnings and no successful repository runtime smoke. Gemini 0.41.2; Claude 2.1.310; Node 26.13.0; no installation/upgrade.
- Disposable hook fixtures: fake npm exits 23; each real wrapper exits 0. The pre-push wrapper reports Build verification passed despite failure. No real commits/pushes/builds were invoked for this fixture; only temporary logs written.
- Exact proposed and checked-out documentation branch validators pass. No unit/build/e2e suites, live writing hooks, native model tasks, trust changes or upgrade tests were run for this audit.

Raw temporary logs are not committed and are not required to reproduce the documented checks. Old 601-test/Jest results are historical; package.json now uses Vitest and adds test:native. Do not run Jest's --runInBand against Vitest or call skipped CI coverage.

TOA-451/TOA-453 are the authoritative migration references: unit, watch and coverage commands must use Vitest; CI/reporting consumers and superseded Jest configuration/dependencies require explicit review before removal.

## Next work

Use the linked new-chat prompt and task list. Prioritise truthful policy alignment, helper/path tests and fixes, template join repair, then native smoke/isolation with explicit trust authority. Produce a new evidence report and PR against main; do not reopen or amend the merged PR. Host-enforcement claims must match actual controlled interfaces, not prose or discovery. Metadata changes/closure remain separately authorised.

## Sources

- [Merged PR #442](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/442), inspected 11 November 2026.
- [Open GitHub #445](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues/445) and [TOA-365](https://linear.app/lightspeedwp/issue/TOA-365), inspected 11 November 2026.
- [Intentional non-blocking hooks PR #586](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/586), merged 9 November 2026, inspected 11 November.
- [Current feature resolver](../../.specify/scripts/bash/common.sh), [feature creator](../../.specify/scripts/bash/create-new-feature.sh), [regression suite](../../tests/speckit.test.mjs), [Gemini settings](../../.gemini/settings.json), [pre-push wrapper](../../scripts/hooks/validate-push-with-logging.sh).
