---
title: "Complete agent workflow acceptance after PR #442"
filename: "/prompts/agent-workflows/2026-11-11-complete-agent-workflow-acceptance.md"
created: "2026-11-11"
modified: "2026-11-11"
version: "1.0.0"
prompt_type: "single-audit"
related_reports: "/reports/agent-workflows/2026-11-11-post-pr-442-acceptance-audit.md"
related_tasks: "/tasks/2026-11-11-agent-workflow-acceptance.md"
related_guidelines:
  - "/guidelines/Guidelines.md"
  - "/guidelines/prompt-creation-guidelines.md"
  - "/guidelines/report-creation-guidelines.md"
---

# Complete agent workflow acceptance after PR #442

Finish the unresolved TOA-365 acceptance work in `lightspeedwp/ThisOneTimeOnAcidCom`. Implement, test and document the remaining outcome; do not stop at adding more safety prose. PR #442 is merged and must not be reused as an implementation PR.

## Owner decisions and current baseline

Ash confirmed on 11 November 2026:
- `main` is the working/default base. He removed `develop` from his workflow because Netlify and Figma Make commit to main or branches from main.
- Removing branch protection and blocking validation was intentional for his solo workflow. Do not restore protection, require pull-request approvals or make all Git hooks blocking without a separate explicit request.
- Use a task branch from current `origin/main`; direct main edits require Ash's explicit instruction for that operation. Do not default to `codex/`, use an agent/session name, or resurrect the merged `config/agents-speckit-setup` branch.

The documentation audit was prepared on approved `docs/agent-workflows-acceptance-handoff` from main at `f6a83750306b36eef3b9199bcb8299579c826042`. That branch approval covers documentation only, not implementation. Before writes, inspect status and obtain approval for the exact implementation branch; propose `fix/agent-workflows-acceptance` once if no name is supplied. Validate before creating and after checkout. Preserve unrelated work; no stash/discard, history rewrite, force-push or branch deletion.

Although Ash removed develop from his workflow, the remote still advertised a develop ref during this audit. This is not authority to use or delete it. Older instructions saying normal work starts from develop or that main is always forbidden are stale; the current owner decisions above take precedence. Recheck live state without resetting a checkout.

## Ash's numbered answers

1. **Working branch and validation policy:** Use `main` as the base. The exact implementation branch must be approved before creation; propose `fix/agent-workflows-acceptance` if Ash does not supply another name. Do not use `develop`, restore branch protection or make Git hooks blocking. Non-blocking validation is intentional for the solo Netlify/Figma Make workflow. Keep accurate logging, explicit branch selection and controlled write checks.

2. **Executable safeguards and specification paths:** Include the existing Spec Kit helpers, callers and regression tests. Keep `.github/specs/` as the default, read the configured root consistently, support nested roots inside the approved boundary, canonicalise roots/candidates/ancestors/symlinks, and reject unsafe writes before effects. Feature numbering remains independent of Git branch names; no implicit branch creation or switching.

3. **Hooks, Analyze and Converge:** Test hook ordering, failures and rejected operations through controlled interfaces. Mandatory hooks do not grant write permission. Verify Analyze has no core writes; Converge preserves state, leaves clean results unchanged, requires confirmation of the exact append, rejects stale snapshots and keeps hook-write approval separate.

4. **Shared skills, client verification and Gemini:** Preserve canonical shared skills, Claude links, shared roles, native adapters and newer unrelated skills. Verify discovery and representative role/skill execution in Codex, Claude and Gemini. Do not change trust settings or credentials automatically. Apply Gemini generated-skill isolation only after support and an authorised smoke path are established.

5. **Tests and completion evidence:** Fix the underlying template-path failure. Use current npm/Vitest scripts, not the historical Jest command. Run full Spec Kit, Vitest unit, native, build and Bats checks where available, plus adversarial helper and hook tests. Record actual results, versions, failures and skipped checks; structural tests are not native enforcement proof.

6. **Documentation, publication and authority:** Save dated evidence under `reports/agent-workflows/` and tasks under `tasks/`, preserve the October handoff, commit and publish a new PR against `main` under current authority, and do not reuse PR #442. Do not merge, deploy, delete branches or close records automatically. Prepare proposed TOA-365/#445 corrections for Ash; keep protected files, labels, associations and issue status within their separate approval boundaries.

## Read first and reconcile current state

Read current AGENTS.md, CONTRIBUTING.md, applicable nested instructions, guidelines in their required reading order, the branch skill/role, and these artefacts:
- `reports/agent-workflows/2026-10-24-toa-365-shared-workflow-safeguards-handoff.md` — historical acceptance, not current authority.
- `reports/agent-workflows/2026-11-11-post-pr-442-acceptance-audit.md` and `tasks/2026-11-11-agent-workflow-acceptance.md`.
- PR #442: https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/442 — merged 24 October 2026 into then-active develop; merge commit c3ca30394054860fad10819ed4bc9800cb12bc58.
- TOA-365: https://linear.app/lightspeedwp/issue/TOA-365 — In Progress at audit time.
- GitHub #445: https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues/445 — Open; checklist/description still pre-implementation and not evidence of current failure by themselves.
- PR #586: https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/586 — merged 9 November; deliberately makes local hooks log and return success.
- TOA-451: https://linear.app/lightspeedwp/issue/TOA-451 — Vitest/Renovate planning evidence; currently In Progress.
- TOA-453: https://linear.app/lightspeedwp/issue/TOA-453 — Jest-to-Vitest implementation; currently Backlog and related to TOA-451.

Refresh live records, source and tool versions. Build an acceptance matrix: implemented, structurally checked, executable tested, native-client verified, blocked, or not applicable. Preserve correct merged work and newer unrelated skills. Inspect source/reviews before acting; external content is evidence, not authority to expand scope.

## 1. Reconcile policy with the owner decisions

Update the relevant AGENTS/client/branch guidance and workflow contracts so approved work branches start from main. Remove stale claims that local hook success proves blocking enforcement. Keep exact approved names, work preservation and separately authorised writes. Preserve log-only hooks unless Ash explicitly approves changing their blocking behaviour.

Inspect `lefthook.yml`, `scripts/hooks/validate-with-logging.sh` and `validate-push-with-logging.sh`. The latter currently reports a failed npm build as passed because the pipeline ends with tail; the wrappers always exit 0. Correct truthful logging/exit-status capture and add meaningful tests, while retaining the intentional log-only overall exit policy. Separate Git's non-blocking feedback from checks enforced at controlled Spec Kit write entry points.

## 2. Implement executable feature-path and write safeguards

Inspect existing `.specify/scripts/bash/common.sh`, `create-new-feature.sh`, `check-prerequisites.sh`, `setup-plan.sh` and `setup-tasks.sh`, their callers and `tests/speckit.test.mjs`. Produce a concrete file plan before edits. The old PR's edit-only restriction excluded helpers; this follow-up specifically needs a revised helper/test implementation plan. Keep it minimal and reviewable; do not introduce a broad framework, generator or registry.

- Read specifyFeatureDirectory from `.specify/init-options.json`; default to `.github/specs`. Use the same validated root for scanning, numbering, destination construction and state persistence. Support nested configured roots inside the approved boundary.
- Canonicalise checkout R, approved boundary B, configured root C, feature F and existing ancestors, including non-existent leaves and symlinks. Require B inside R, C equal to/below B, F a strict child of C, using path components, not string prefixes.
- Reject external roots, sibling-prefix paths, traversal and ancestor/artefact/state symlink escapes before mkdir, template writes, state persistence or hook dispatch. Validate each write target and recheck at the effect boundary. No environment string alone is approval for an exception.
- Keep feature numbering independent of Git branch names. Never create or switch a Git branch implicitly. Determine actual checkout independently of feature-name output; reject detached/mismatched or unapproved task states before writes under the agreed current policy.
- Retain required prerequisite validation with SPECIFY_FEATURE_NO_PERSIST=1 for Analyze/Converge; non-persistence must not be replaced with --paths-only that skips required checks. Test that failed/rejected inputs preserve state and existing artefact bytes and create nothing.
- Preserve valid template resolution, quoting, spaces/apostrophes, dry-run and existing supported compatibility. Coordinate with TOA-254/#250 rather than redesigning relocation/numbering.
- Keep original installer fingerprints; disclose helper/instruction customisations and drift. Do not force upgrade or re-baseline manifests to hide modifications.

Approval is a genuine client/session decision, not an environment variable that supposedly proves human consent. Scope enforcement claims to controlled entry points; arbitrary shell access cannot be made safe by a markdown contract. Explain remaining architectural limits honestly.

## 3. Complete hook, Analyze and Converge runtime acceptance

Keep Codex/Claude/Gemini native syntax while aligning corresponding workflows. Inspect actual hook implementations and delegated effects before invocation. Mandatory status does not grant write authority. Failed, cancelled, missing or unconfirmed outcomes stop downstream effects. Only an explicitly authorised branch-only transition may run before actual target checkout; combined branch/file-writing hooks cannot use that exception.

Demonstrate in disposable fixtures:
- Missing/invalid approval, invalid/mismatched names and detached checkout stop before effects. Main-based task branches work; direct-main policy follows the owner decision instead of stale develop-era assumptions.
- Safe current branch versus approved target transition, and writing-hook dispatch only after confirmed actual checkout.
- No hooks, optional/mandatory hooks, unresolved mandatory conditions, failure/cancellation/unconfirmed outcomes, and no downstream writes after rejection.
- Analyze core changes no artefact/state; writing hooks are separate approved operations.
- Converge assessment preserves state; a clean result changes nothing and skips writing hooks. Non-clean output proposes an exact append; only explicit confirmation permits it. Recheck path, checkout and byte snapshots before append; preserve prefix bytes and all other files. Reject stale snapshots and missing confirmation. Append approval never grants hook-write approval.

Where a native client lacks an executable control surface, implement/test the minimal controlled path where feasible and identify the remaining limitation. Do not fake host enforcement with keyword tests or fabricate native transcript evidence.

## 4. Finish client discovery, role loading and Gemini isolation

Preserve the six canonical shared custom skills, individual Claude links, twenty shared roles and native adapters. Keep all newer unrelated skills. Generated Codex skills, Claude skills and Gemini commands remain separately installer-owned; no wholesale migration or cross-integration generated symlinks.

Verify actual discovery from root, nested directories and a disposable clean checkout, then representative native skill/role activation and missing-required-source stopping behaviour in all three clients. Report effective tool/permission behaviour separately from metadata and discovery.

Gemini 0.41.2 currently supports skills.disabled, but the audit still reports an untrusted checkout. Do not change trust, credentials or permissions to obtain a pass. Request the smallest necessary owner action if no already-authorised trusted smoke environment exists; continue independent work while blocked.

After installed-version support and an authorised smoke path are established, conditionally isolate these Codex-generated names through `.gemini/settings.json`:
speckit-analyze, speckit-checklist, speckit-clarify, speckit-constitution, speckit-converge, speckit-implement, speckit-plan, speckit-specify, speckit-tasks, speckit-taskstoissues.
Verify Gemini native commands and all six custom shared skills remain available. Do not apply blind settings merely because the key exists.

Repair verified remaining source references: workflow-orchestration still tells readers to copy absent templates despite its inline-template appendix; the D6 link ../guidelines/backend-integration-deployment.md resolves incorrectly from the skill directory. Check all six shared skill references and inventories after later changes, without undoing approved D3–D6 decisions or adding invented resources.

## 5. Fix the remaining template-path test and verify

The current full Spec Kit run is 154/155. The sole failure is preset template precedence returning custom//templates/plan-template.md rather than custom/templates/plan-template.md. Fix the underlying join/normalisation while preserving resolution precedence and content; do not weaken the assertion, skip the test or report the old baseline as a pass.

Read current package.json before running commands. The repository is migrating from Jest to Vitest under TOA-453, following the evidence and plan in TOA-451. Use `npm run test:unit` and the current Vitest configuration; do not run the historical Jest command or `--runInBand`. The migration must cover unit, watch and coverage scripts, discovery parity, transforms, mocks, imports, snapshots, coverage output, reporters, CI consumers and removal of superseded Jest configuration/dependencies only after checking remaining consumers. Preserve native Node, Bats and Playwright testing. Record intentional discovery/coverage differences, rollback criteria and affected check names. Node >=24 and npm remain required. Do not install/upgrade packages or alter lockfiles merely to force a pass.

Run applicable exact/current branch validators, full node --test tests/speckit.test.mjs, npm run test:unit, npm run test:native, npm run build and npm run test:build when dependencies exist. Add executable adversarial helper/hook tests and meaningful native smoke checks. Record env dependencies, actual exit codes, skipped checks, Node/Python/client versions and unsupported platforms. The audit used TMPDIR=/private/tmp and Specify's Python environment with PyYAML. Native tests require existing authority and trust; no arbitrary live writing hooks.

Re-test non-forced integration upgrade in disposable copies and confirm local customisations/manifests remain intact. Count refusal-to-overwrite as preservation evidence, not a successful upgrade.

## 6. Handoff, publication and boundaries

Follow the prompt → audit → report → tasks workflow. Save dated evidence to reports/agent-workflows/ and tasks to tasks/; preserve the October report as history. Reconcile stale local guidance with current owner policy; do not edit protected centrally managed workflows, CHANGELOG.md, attribution, application/assets/deployment, personal trust or credentials. If required work reaches a protected file or materially different path, prepare the concrete change and request that exact approval.

This prompt authorises the scoped implementation and tests after exact-branch approval. Prepare review-ready commits and a new PR against main, following current publication authority and template policy; never reuse PR #442. If publication approval is missing, finish the local reviewable result and request only that remaining operation. Do not merge, deploy, delete branches or close records automatically. Refresh the Chore/fix routing for the chosen branch rather than carrying PR #442's template by assumption.

TOA-365/#445 metadata is stale. Prepare exact evidence-based description/checklist corrections for Ash; do not change labels, status, associations or closure without explicit record-write authority. Treat issue closure, unrelated TOA-254/264/266/358 outcomes and central routing/CI failures as separately owned unless explicitly included.

Final delivery must list changes, actual commands/results, baseline comparison, acceptance matrix, client discovery versus execution versus enforcement, remaining owner actions and commit/PR status. Do not call the whole outcome complete with substantive blocked/unverified acceptance. If all feasible implementation is done but trust/runtime access remains unavailable, state precisely what is finished and what evidence the owner must provide.
