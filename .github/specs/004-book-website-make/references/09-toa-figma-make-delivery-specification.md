# TOA - Main-based Figma Make delivery specification and persistence prompt

| Field | Value |
| -- | -- |
| Version | 1.0.0 |
| Document status | Draft specification and Make prompt — saved for reference; downstream actions separately approval-gated |
| Last revised | 2026-11-11 |
| Project | This One Time on Acid — personal book website |
| Repository | `lightspeedwp/ThisOneTimeOnAcidCom` |
| Recorded source-branch direction | `main`, as directed by Ash on 9 November 2026 |
| Historical inspected repository revision | `2f6958a48097eed901d82f4ddf5d10b0c6a02453` |
| Intended operator | Ash |
| Execution environment | Existing Figma Make project; current editable revision and GitHub parity require verification |
| Authority boundary | Saving this document authorises no repository writes, branch-policy changes, Make execution, implementation, Git operations, publication or deployment |

This document preserves the main-based delivery specification and accompanying Make persistence prompt drafted on 9 November 2026. Repository revisions, source versions, file inventories and reported Make findings are historical evidence, not a fresh verification of current state. The proposed `.github/specs/004-book-website-make/` destination remains conditional on a collision and overlap check. This document supplements the existing specification and companion; saving it does not automatically supersede them, reconcile repository-policy conflicts or approve the proposed direct-main exception. Approval gates must be resolved before the affected downstream action.

## 1. Purpose

Convert the supplied Figma Make outputs into a traceable, file-level specification and staged delivery plan for:

1. Navigation, footer and human-facing sitemap exposure.
2. Shared-theme reconciliation.
3. Refinement of the existing nine-section style guide.
4. One approved podcast episode, through separate data, routing and playback stages.

Prepare durable specification, plan, task and prompt files so Make can reread them between sessions. Saving planning files does not authorise application implementation.

This remains Ash’s personal book project. Do not introduce LightSpeed contributors, change Linear routing or create duplicate work.

## 2. Source authority and current branch direction

### Owner direction

On 9 November 2026, Ash reported removing `develop` and moving development to `main` to accommodate Figma Make.

For this proposed workflow:

* Read current source and the book-document packet from `main`.
* Do not recreate `develop` or switch to it.
* Do not assume Make’s internal `main` equals GitHub `main`.
* Verify the connected repository, local HEAD and export destination before writes.
* Ash retains manual GitHub review, commit and push.

### Repository-policy conflict

At the inspected revision, `AGENTS.md` still requires approved task branches and prohibits edits on `main` or `develop`.

The proposed exception is:

> Use `main` for this bounded book-website Make workflow, as expressly directed by Ash. This exception changes neither organisation-wide branching policy nor permissions for unrelated repository work. It does not authorise automatic commits, pushes, deployment or bypassing hooks.

Approval of the eventual exact save or implementation proposal must identify whether it covers this exception for that action. Do not amend governance files incidentally.

A branch-name validation pass is not proof that direct-main editing or pushing is permitted.

### Source packet

Read these files at one pinned `main` commit:

| Path | Role |
| -- | -- |
| `content/book/01-book-website-specification.md` | Existing stage contract and stable requirement IDs |
| `content/book/02-companion-session-plan.md` | Supporting evidence and sequencing |
| `content/book/03-author-decisions-launch-scope.md` | Author scope and recorded decisions |
| `content/book/04-design-brief.md` | Design requirements and confirmed foundations |
| `content/book/05-design-reader-decision-register.md` | Scoped decisions, candidates and unresolved mappings |
| `content/book/06-website-reading-prd.md` | Product requirements and acceptance references |
| `content/book/this-one-time-on-acid-brief.md` | Historical supplementary brief |

Preserve historical version references. The supplementary brief must not restore superseded excerpt-only access, automatic newsletter enrolment, unsupported future commitments or deferred-page navigation.

Make cannot access Linear MCP. Missing material Linear passages must be supplied as text or exported Markdown; links alone are not inspection evidence.

## 3. Evidence reconciliation

The attachment contains repeated proposals and reports from different snapshots. Deduplicate repeated outcomes without deleting the source attachment.

| Finding | Classification | Required treatment |
| -- | -- | -- |
| Make reported `main` at `3fe4bbfc…` | Historical agent report | Recheck current workspace |
| Earlier switch to `develop` and bootstrap commit `e7f65f8` | Historical agent report | Establish whether that work survives or was incorporated |
| Final recovery report says the bootstrap commit is absent from its shallow workspace | Snapshot-specific report | Do not infer permanent loss or absence elsewhere |
| Navigation data exposes deferred destinations | Reported static finding | Re-read current data and consumers |
| Header/footer theme state differs | Reported static finding | Trace current provider, controls, storage and DOM targets |
| Style-guide contains nine sections and legacy identity | Reported static finding | Preserve structure; verify current content |
| Podcast playback uses simulated progress | Reported static finding | Recheck before proposing replacement |
| Earlier bootstrap/build checks passed | Reported execution results | Do not reuse as current acceptance evidence |
| Source parity and current Make revision | Unresolved | Establish before affected edits |

A clean working tree does not establish parity with GitHub, correct branch ancestry, approved content or working behaviour.

## 4. Requirements and acceptance criteria

Existing requirement IDs are retained.

| ID | Required outcome | Acceptance input |
| -- | -- | -- |
| BASE-01 | Identify current Make and GitHub snapshots and comparison limits | Full available SHAs, destination identities and bounded parity table |
| BASE-02 | Maintain specification-first, exact-preview stages | Requirements → tasks → files → approval → verification traceability |
| NAV-01 | Remove Events, Speaking and Media menu/footer exposure while retaining direct public routes | Exact before/after entries; unchanged retained routes |
| NAV-02 | Apply recorded human-sitemap omissions without changing reader-route meaning | Exact card inventory and approved destination mapping |
| THEME-01 | Reconcile foundations through explicit token/role/state mappings | Definition, alias, consumer and theme comparison |
| THEME-02 | Preserve both themes and saved-light preferences | Approved control, reload, navigation and storage behaviour |
| GUIDE-01 | Refine the existing `/style-guide` | Same route and all nine anchors; no duplicate guide |
| POD-01 | Support one approved episode intentionally | Truthful archive/detail content, eligibility and counts |
| POD-02 | Use approved audio and recording-checked equivalent text | Identified revisions, hosting, rights and credits |
| POD-03 | Provide genuine accessible playback | Media-driven state, controls and recovery evidence |
| SAFE-01 | Preserve manual GitHub and release boundaries | No automatic commit, push, publication or deployment |

### Navigation treatment

Propose removal of:

* Menu: Events → `/events`, Speaking → `/speaking`, Media → `/media`.
* Footer: the corresponding three destinations.
* Human sitemap: those three destinations, generic `/thank-you` and `/style-guide`.
* Human sitemap: withhold `/draft-viewer` and `/ebook`.
* Preserve `/read-the-draft`, unrelated entries and retained relative order.

The author brief v1.3.0 records wording-approved omission of the three retained-page sitemap cards. Earlier kickoff wording calling that planning treatment unresolved is historical. Exact current mappings, file changes and implementation authority still require review.

Keep XML sitemap, robots, page-level noindex, canonical origin and Google-removal verification outside this navigation stage.

### Design preservation

Preserve:

* Space Grotesk headings and Inter body/UI.
* Palette: `#0B0B10`, `#12121A`, `#171722`, `#F6F2EB`, `#CFC7BB`, `#9C9488`, `#FF3AAE`, `#F4FF3C`, `#8A63FF`.
* Both themes, switching and saved-light preferences.
* Existing third-mode behaviour until its treatment is explicitly decided.
* Style-guide anchors: `brand`, `colors`, `typography`, `buttons`, `forms`, `cards`, `tags`, `icons`, `content`.
* Protected assets and separate logo/rights approval.
* WCAG 2.2 AAA as a target, not a certification.

R3, T1, RT2 and C1 remain unapproved. Do not adopt their detailed mappings or persistence contracts indirectly.

## 5. Proposed durable artefacts

The repository currently contains specification directories 001–003. The following **004 directory is proposed, not reserved or created**. Recheck for collisions before approval or saving.

| Proposed path | Purpose |
| -- | -- |
| `.github/specs/004-book-website-make/spec.md` | This consolidated specification |
| `.github/specs/004-book-website-make/plan.md` | Architecture, file map, dependencies and sequence |
| `.github/specs/004-book-website-make/tasks.md` | Stable task IDs and evidence-backed status |
| `.github/specs/004-book-website-make/sources.md` | Pinned sources, versions, parity and historical evidence |
| `.github/specs/004-book-website-make/decisions.md` | Confirmed decisions, unresolved questions and approval scope |
| `.github/specs/004-book-website-make/verification.md` | Proposed checks and subsequent actual results |
| `.github/specs/004-book-website-make/prompts/00-preflight.md` | Read-only source and branch preflight |
| `.github/specs/004-book-website-make/prompts/01-navigation.md` | Navigation preview and bounded execution contract |
| `.github/specs/004-book-website-make/prompts/02a-themes.md` | Shared-theme mapping and stage contract |
| `.github/specs/004-book-website-make/prompts/02b-style-guide.md` | Existing-guide refinement contract |
| `.github/specs/004-book-website-make/prompts/03a-podcast-data.md` | Editorial/runtime and eligibility contract |
| `.github/specs/004-book-website-make/prompts/03b-podcast-routing.md` | Archive/detail routing contract |
| `.github/specs/004-book-website-make/prompts/03c-podcast-playback.md` | Genuine playback contract |

These feature-specific prompts remain under the specification directory in accordance with the inspected feature-artefact containment rule.

Do not create an additional competing master task list. Do not modify `.specify/feature.json`, the catalogue, governance files or existing source documents without separately previewing those exact changes.

## 6. Delivery plan and task sequence

| Task | Outcome | Dependency |
| -- | -- | -- |
| DOC-T001 | Verify current `main`, Make identity and source packet | None |
| DOC-T002 | Reconcile attachment reports against current sources | DOC-T001 |
| DOC-T003 | Produce complete proposed bodies for all planning files | DOC-T002 |
| DOC-T004 | Save only the exact approved planning-file set | Approved bodies, paths and scoped main exception |
| NAV-T001 | Produce exact navigation diff | Current source verification and planning checkpoint |
| NAV-T002 | Apply approved navigation delta | Exact approval and bounded resumption |
| THEME-T001 | Map active primitives, aliases, components and state | Current cascade/control inspection |
| THEME-T002 | Resolve remaining theme decisions and preview diff | THEME-T001 |
| THEME-T003 | Apply approved shared-theme changes | Exact approval and bounded resumption |
| GUIDE-T001 | Preview nine-section refinement | Accepted relevant theme mappings |
| GUIDE-T002 | Apply approved guide-local changes | Exact approval and bounded resumption |
| POD-T001 | Resolve identity, editorial authority, media and eligibility | Approved source inputs |
| POD-T002 | Preview and apply approved data contract | POD-T001 and separate stage approval |
| POD-T003 | Preview and apply approved routing/presentation | Data checkpoint and route/origin decision |
| POD-T004 | Preview and apply genuine playback | Approved media/text and routing checkpoint |
| SAFE-T001 | Manual GitHub checkpoint after each saved stage | Required checks or explicitly accepted exceptions |

Task status must distinguish **planned, blocked, implemented, verified and accepted**. Do not mark implementation complete because a proposal exists.

Podcast editorial preparation may run alongside theme planning. Shared-file edits remain serialised. Theme reconciliation precedes affected style-guide polish.

## 7. File-level implementation boundaries

These paths are inspection targets from the source packet and Make reports—not blanket edit approval.

### Navigation

Primary proposed edits:

* `src/app/data/mock/book-site.ts`
* `src/app/components/pages/SitemapPage.tsx`

Inspect consumers:

* `src/app/components/common/Header.tsx`
* `src/app/components/common/Footer.tsx`
* `src/app/routes.ts`

Header/footer/CSS edits are conditional and require their own demonstrated need in the exact preview. Preserve route registrations and page modules.

### Themes

Trace the active chain through:

* `src/main.tsx`
* `src/app/App.tsx`
* `src/app/components/common/RootLayout.tsx`
* `src/app/components/common/ThemeProvider.tsx`
* `src/app/components/common/ThemeToggleES5.tsx`
* `src/app/components/common/ThemeSwitcher.tsx`
* `src/styles/index.css`
* `src/styles/default_theme.css`
* `src/styles/globals.css`

Inspect additional imported theme/token/book styles before naming operations. Do not globally replace hex values or delete overrides merely because they appear duplicated.

### Style guide

Primary scope:

* `src/app/components/pages/StyleGuidePage.tsx`
* `src/styles/blocks/style-guide-page.css`

Shared layout, theme and component repairs must remain separately identified. Do not silently expand this stage to every page.

### Podcast

Inspect:

* `src/app/data/types/podcast.ts`
* `src/app/data/mock/podcasts/episodes.ts`
* `src/app/data/mock/podcasts/episodes-season1.ts`
* `src/app/data/mock/podcasts/index.ts`
* Existing podcast archive/detail/taxonomy components.
* `src/app/routes.ts`

The attachment reports different podcast-index behaviour across snapshots. Resolve the current consumer and transformation chain before choosing Markdown or TypeScript authority.

New adapters, media components and eligibility files require proposed exact paths and complete contracts before approval.

## 8. Podcast acceptance detail

Before public eligibility, identify:

* Show identity and relationship to the book.
* Canonical editorial source and selected episode revision.
* Canonical routes and origin.
* Hosting and approved real audio revision.
* Preview versus public eligibility.
* Recording-checked equivalent text, distinguished from notes/scripts.
* Rights, credits and factual/chronology decisions.

Playback must cover:

* Metadata loading and ready state.
* Playing, paused, seeking and ended.
* Buffering, rejected playback, unavailable source and network failure.
* Appropriate retry/recovery.
* Keyboard controls, labelled seeking and visible focus.
* Truthful duration/progress and proportionate announcements.
* Cleanup on navigation.

No autoplay, placeholder audio, fabricated duration/progress, invented additional episodes or automatic publication.

## 9. Approval gates and manual checkpoints

### Gate A — planning preview

Return complete proposed files and intentional non-changes. Do not save yet.

### Gate B — planning persistence

After exact approval, re-read the baseline and save only the approved documentation. Verify saved contents. Material drift requires a revised preview.

This gate does not authorise application edits.

### Gate C — implementation preview

For one selected stage, show:

1. Current source revision and parity limits.
2. Exact paths and operations.
3. Complete diff or proposed new-file bodies.
4. Consequential effects and intentional non-changes.
5. Acceptance criteria and proposed verification.
6. Blocking decisions and authority to resume.

### Gate D — bounded execution

Proceed only after explicit approval of that exact stage and resumption scope. One sufficiently explicit approval may cover both; do not demand duplicate unchanged approvals.

### Gate E — manual GitHub checkpoint

When required checks have passed or exceptions have been explicitly accepted:

* Report actual changed files.
* Report evidence and unresolved limitations.
* Identify GitHub repository and target `main`.
* Stop with:

**Commit to GitHub**

Ash reviews, commits and pushes. Make must not perform these operations.

If blockers remain, use:

**Blocked — do not commit yet**

Do not begin the next stage until Ash confirms the manual checkpoint and explicitly selects continuation.

## 10. Verification and release boundaries

Separate:

* Static inspection.
* Calculated contrast.
* Executed tests/builds.
* Browser and assistive-technology observations.
* Deployment and search-indexing evidence.

Each result must identify environment, source revision, method, actual outcome and evidence. Proposed checks remain **Not run** until executed.

Before a manual push to `main`, establish whether that push triggers deployment. Existing documentation records a historical Netlify/main relationship; current behaviour is unverified. Do not imply that a push is deployment-neutral.

Publication, deployment and release require their own authority. A successful preview, saved plan, commit or passing build does not establish launch readiness.

## 11. Exclusions

No incidental:

* Repository-policy rewrite or branch recreation.
* Dependency/runtime/bootstrap repair.
* Provider provisioning, account changes or audio uploads.
* Analytics activation or live test events.
* Manuscript rewriting or portfolio adaptation.
* Legal-route, social-link or indexing repair.
* Offline podcast/manuscript functionality.
* Linear record changes.
* Publication or deployment.

## Prompt to give Figma Make

```text
Prepare a durable, main-based specification and prompt package for the
personal This One Time on Acid book website.

Do not implement application changes during this task.

OWNER DIRECTION

Ash has moved this workflow to main and reports removing develop.
Use main as the source branch. Do not recreate or switch to develop.

The attached main-based delivery specification proposes a scoped owner
exception to older repository rules prohibiting edits on main. Identify
that conflict explicitly in the preview. Do not edit governance files or
pretend the existing policy has already been reconciled.

No Linear MCP is available. Use repository Markdown and supplied files.
Do not invoke Linear saved skills or claim to inspect inaccessible links.

PHASE 1 — READ AND RECONCILE; NO WRITES

1. Identify current Make project/workspace, local branch, full HEAD,
   uncommitted changes, connected GitHub repository and export target.
   Do not equate internal main with GitHub main.

2. Resolve GitHub main to a full SHA and read all seven files at that SHA:

content/book/01-book-website-specification.md
content/book/02-companion-session-plan.md
content/book/03-author-decisions-launch-scope.md
content/book/04-design-brief.md
content/book/05-design-reader-decision-register.md
content/book/06-website-reading-prd.md
content/book/this-one-time-on-acid-brief.md

Repository:
https://github.com/lightspeedwp/ThisOneTimeOnAcidCom

Previously inspected main:
2f6958a48097eed901d82f4ddf5d10b0c6a02453

Report drift rather than assuming that SHA is still current.

3. Read applicable AGENTS.md, CONTRIBUTING.md, guidelines index and
   relevant instructions, .specify/init-options.json and integration
   configuration. Inspect .github/specs for existing feature directories.

4. Read the attached TOA-Figma-Make.md as historical evidence.
   It contains repeated outputs and different snapshots. Deduplicate
   findings without converting agent reports into verified current facts.

5. Recheck current relevant source files and consumers.
   In particular reconcile:
   - Make/GitHub/bootstrap revision differences;
   - current podcast index and Markdown/TypeScript transformation;
   - active CSS imports and theme state ownership;
   - retained routes and actual navigation/sitemap collections.

6. Record actual source versions and their approval scope.
   Preserve historical references and unapproved R3/T1/RT2/C1 candidates.
   Recognise author-brief v1.3.0's recorded sitemap wording decision
   without treating wording approval as implementation authority.

7. Inspect deployment-trigger evidence before describing a later push
   to main as safe or deployment-neutral.

Use read-only file/API access. Do not install tools, execute Spec Kit
commands or invoke the full-cycle workflow. If an essential read requires
 a command, show the exact proposed command and side effects, then stop
for separate authorisation.

PHASE 2 — COMPLETE FILE PREVIEW; STILL NO WRITES

Use the attached main-based delivery specification as a candidate,
not proof of approval.

Propose this feature directory:
.github/specs/004-book-website-make/

004 is not reserved. Check for collisions or an existing equivalent.
If occupied or overlapping, report the evidence and propose a revised
destination; do not overwrite or create a duplicate specification.

Prepare the COMPLETE contents of:
spec.md
plan.md
tasks.md
sources.md
decisions.md
verification.md
prompts/00-preflight.md
prompts/01-navigation.md
prompts/02a-themes.md
prompts/02b-style-guide.md
prompts/03a-podcast-data.md
prompts/03b-podcast-routing.md
prompts/03c-podcast-playback.md

Keep these feature artefacts within the approved specification directory.
Check canonical path containment and existing symlink redirections before
any later write.

The files must form one consistent package:

spec.md:
Outcome, scope, stable requirements, user stories, Given/When/Then
acceptance, exclusions, dependencies and approval boundaries.

plan.md:
Current architecture/consumers, exact file-level stages, intended
operations, preserved files, risks and serial/parallel distinctions.

tasks.md:
Stable IDs, requirement mapping, dependencies, target files,
stage gates and evidence-backed status. Do not mark proposals implemented.

sources.md:
GitHub SHA, document versions, actual inspection coverage,
Make snapshot, historical report references and parity limits.

decisions.md:
Confirmed decisions, exact approval scope, unresolved decisions,
scoped main exception and historical candidates. No invented approvals.

verification.md:
Proposed checks, environment/revision, side effects, execution authority,
actual results or Not run, and accepted exceptions only where evidenced.

Each prompt:
Self-contained source-reading instructions, bounded outcome, exact
inspection paths, requirements, preservation rules, proposed file
operations, approval gate, verification proposal and stop condition.
Reference the package by repository-relative path.
Do not depend on chat memory or Linear access.

Each stage must reread spec.md, its relevant plan/tasks/decisions,
and its own prompt before proposing or applying work.

Preserve the sequence:
documentation -> navigation -> shared themes -> existing style guide ->
podcast data -> podcast routing -> genuine playback.

Prepare podcast editorial decisions alongside theme planning only where
independent. Do not combine all application edits into one pass.

Show:
- Exact proposed paths and whether each is Create or Edit.
- Complete new-file bodies or exact diffs for existing files.
- Proposed document versions, status and actual-save-date handling.
- References between files.
- Intentional non-changes and consequential effects.
- The scoped main-policy exception required for the proposed save.
- Whether a commit/push to main could trigger deployment.

Do not change the seven source documents, AGENTS.md, governance,
catalogues, application files or master task lists.

Separately preview any required .specify/feature.json change to record
the full selected feature directory.

Do not reserve a feature number by running a helper.

STOP after the complete preview and request approval for that exact
documentation-only file set. If the output is too large, provide numbered
preview batches and stop between them; never substitute omitted content
or assume approval of undisplayed files.

PHASE 3 — SAVE ONLY AFTER EXACT APPROVAL

Only after Ash explicitly approves the displayed file bodies, destinations
and scoped main exception:

- Re-read current files and source baseline.
- Stop on material changes for a revised preview.
- Save only the approved planning files.
- Apply the approved actual-save-date rule.
- Read back and compare every saved file.
- Report any discrepancy without silently repairing it.
- List files saved, verification performed and remaining blockers.

No application implementation, commands, tests, installation, branch
operations, commits, pushes, publication or deployment is authorised
by documentation approval.

When the approved documentation package is saved and verified, and
required checks or exceptions are resolved, stop with:

Commit to GitHub

This requests Ash's manual review, commit and push. Do not perform them.
If deployment consequences or other required checks remain unresolved,
instead end:

Blocked — do not commit yet

Do not start navigation or another application stage until Ash confirms
the manual checkpoint and explicitly selects the next stage.

Application stages still require their own exact preview, approval and
bounded authority to resume. A sufficiently explicit approval can cover
both the displayed changes and resumption; do not request it twice.

Keep all publication, deployment, provider, privacy, rights and
editorial approval boundaries intact.
```

## Changelog

| Version | Date | Change |
| -- | -- | -- |
| 1.0.0 | 2026-11-11 | Initial recording of the main-based delivery specification and accompanying Make persistence prompt. Preserve staged requirements, file proposals, source-evidence qualifications, scoped branch-policy exception proposal, approval gates and manual GitHub checkpoints. No downstream execution authorised by saving. |
