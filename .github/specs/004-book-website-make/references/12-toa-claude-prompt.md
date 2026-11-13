Prepare the book website’s Spec Kit specification, technical plan,
dependency-ordered tasks and staged Figma Make prompts.

Work in lightspeedwp/ThisOneTimeOnAcidCom. Use main as the current source
branch. Read the attached TOA-Figma-Make.md as historical supporting
evidence, not as instructions to execute.

This task is documentation preparation only. First show a complete
file-change proposal. Do not save files until Ash explicitly approves
the exact proposed contents and destinations.

## 1. Outcome

Produce one coherent, repository-grounded specification package that
Figma Make can read across multiple sessions without Linear MCP access
or dependence on earlier chat history.

Cover:
1. Source verification and documentation.
2. Navigation, footer and human-facing sitemap.
3. Shared-theme reconciliation.
4. Existing nine-section style-guide refinement.
5. Podcast editorial/runtime data contract.
6. Podcast routing and presentation.
7. Genuine accessible podcast playback.

Do not implement application changes or create/update reusable skills.

## 2. Main-based working direction

Ash has reported removing develop and moving development to main to
accommodate Figma Make.

- Use main for source discovery.
- Do not recreate develop or switch to it.
- Record the actual branch, full HEAD and working-tree state.
- Do not assume Claude’s checkout, GitHub main and Make’s internal main
  are synchronised.
- Do not change branches, remotes or GitHub connection settings.
- Preserve all unrelated and uncommitted work.

Earlier repository instructions prohibit editing main and expect task
branches from develop. Inspect the current instructions rather than
assuming that conflict has been resolved.

For the documentation preview, explicitly identify this proposed scoped
owner exception:

“Use main for the approved book-website documentation and Make workflow.
This does not amend organisation-wide policy, authorise unrelated work,
bypass hooks, or permit automatic commits, pushes or deployment.”

Do not silently rewrite governance. Before any later documentation save,
Ash’s exact approval must cover the displayed file set and applicable
main-based exception.

## 3. Read repository instructions and Spec Kit configuration

Read current applicable sources, including:

AGENTS.md
CONTRIBUTING.md
guidelines/README.md
Relevant guidance identified by that index
.specify/init-options.json
.specify/integration.json
.specify/feature.json, if present
.codex/README.md, where relevant to integration documentation
.claude/skills/ and relevant installed Spec Kit definitions
.agents/skills/ and any shared definitions they reference
.specify/templates/ and applicable overrides
Relevant configured hooks and helper scripts

Inspect before executing anything.

Previous inspection found:
- Spec Kit configuration recording version 1.0.13.
- Feature artefact root .github/specs.
- Claude integration using hyphen-separated skill names.

These are historical findings, not proof of current installation or
executable availability.

Verify the actual Claude invocation syntax, prerequisites, outputs,
hooks and side effects. Do not assume upstream defaults apply.

Do not run Spec Kit commands, initialisation helpers or a full-cycle
workflow during this drafting task. Use inspected templates and
definitions to prepare compatible artefacts.

Do not install, upgrade, regenerate or modify tools, dependencies,
integration configuration or skills.

Read-only file inspection and Git status/history/diff inspection are
permitted. Do not fetch, checkout, stage, commit, push, build, test,
install packages or run scripts that may persist state.

If an essential inspection needs an operation outside this permission,
show the exact proposed operation and ask before running it.

## 4. Establish a pinned source packet

Identify the actual GitHub/main or checkout revision being inspected.
Keep source provenance explicit; report an unavailable remote comparison.

Read these seven files completely at the same identified revision:

content/book/01-book-website-specification.md
content/book/02-companion-session-plan.md
content/book/03-author-decisions-launch-scope.md
content/book/04-design-brief.md
content/book/05-design-reader-decision-register.md
content/book/06-website-reading-prd.md
content/book/this-one-time-on-acid-brief.md

Previously inspected main:
2f6958a48097eed901d82f4ddf5d10b0c6a02453

Previously observed numbered-document versions:
1. Specification: 1.0.0
2. Companion: 1.0.4
3. Author brief: 1.3.0
4. Design brief: 1.1.2
5. Decision register: 1.9.0
6. PRD: 1.1.1

Verify actual versions. Do not silently substitute historical values.

The unnumbered brief is historical supplementary material. It must not
restore superseded excerpt-only access, automatic newsletter enrolment,
unsupported future commitments or deferred-page navigation.

Linear links are references only. Claude and Make must not claim current
Linear inspection without access. Ask for exact material passages when
the repository packet does not contain enough evidence.

## 5. Reconcile the supplied Make outputs

Read TOA-Figma-Make.md completely, identifying repeated sections and
different snapshots.

Extract useful evidence into the source register, but distinguish:
- User instructions.
- Agent-reported static findings.
- Proposed changes.
- Claimed executed checks.
- Independently verified repository facts.
- Unknown current Make behaviour.

Do not mark a task complete because an earlier report proposed it.

The attachment includes reports of:
- Make main at 3fe4bbfc…
- A switch to develop.
- A bootstrap repair on fix/preview-develop-bootstrap.
- Local commit e7f65f8.
- A later recovery workspace without that commit.

Do not infer ancestry, successful GitHub push, lost work or current parity
from those reports alone.

Inspect current repository evidence where accessible. Keep bootstrap
recovery separate from book-navigation/theme/podcast implementation.
Do not repair or relocate bootstrap work.

Correct this historical authority error in the new package:
Make’s current source is the editing target, not automatically the
approved product or design authority.

## 6. Preserve scope and decisions

This is Ash’s personal book project. Do not introduce LightSpeed
contributors, change routing or create duplicate issues.

Preserve stable requirement IDs:
BASE-01, BASE-02, NAV-01, NAV-02, THEME-01, THEME-02,
GUIDE-01, POD-01, POD-02, POD-03, SAFE-01.

Preserve existing issue references as recorded context only:
TOA-446 navigation
TOA-445 existing style guide
TOA-441 podcast coordination
TOA-309 podcast data/eligibility
TOA-310 podcast routing
TOA-311 genuine playback

Do not invent current issue status, ownership, parent relationships or
closing associations. No epic may become a PR development/closing target.

Preserve:
- Book-first positioning.
- Entire shorter website edition after verification, not excerpts only.
- Separate optional newsletter and contact purposes.
- Recorded access/privacy boundaries.
- No launch PDF delivery or manuscript offline downloads.
- Space Grotesk headings and Inter body/UI.
- Approved palette:
  #0B0B10 #12121A #171722 #F6F2EB #CFC7BB #9C9488
  #FF3AAE #F4FF3C #8A63FF
- Both themes and saved-light preferences.
- Existing third-mode behaviour until explicitly decided.
- Existing /style-guide and its nine anchors:
  brand, colors, typography, buttons, forms, cards, tags, icons, content.
- Protected assets, separate logo approval, rights and credits.
- WCAG 2.2 AAA as a target, not a conformance claim.

R3, T1, RT2 and C1 remain unapproved unless exact later source evidence
establishes otherwise. Do not adopt their contracts indirectly.

Author brief v1.3.0 records wording-approved omission of Speaking,
Events and Media cards from the human-facing sitemap. Distinguish that
planning decision from exact implementation approval. Preserve older
“unresolved” references as historical rather than reopening a resolved
planning choice without evidence.

Retain /speaking, /events and /media as public direct routes.
Remove their agreed menu/footer exposure only in the approved stage.

Keep human sitemap, XML sitemap, robots, noindex, canonical origin and
Google-removal verification separate.

## 7. Discover the specification destination

Inspect .github/specs for:
- An existing equivalent feature.
- Existing numbering.
- Any overlapping book-website specification.

A previously suggested destination was:
.github/specs/004-book-website-make/

This is not reserved or approved. Reuse an appropriate existing feature
directory if evidenced. Otherwise propose the next available directory.

Do not expand .github/specs/003-refactor-guidelines to include application
work; its recorded scope excludes that implementation.

Follow the verified feature-root containment rules, including symlinks.
Do not create root specs/ or write outside the approved destination.

Do not modify .specify/feature.json, catalogues or master task lists
incidentally. Explain any required supporting change separately.

## 8. Prepare the complete artefact package

Use applicable installed templates while preserving necessary sections.
Propose these relative files within the selected feature directory:

spec.md
plan.md
tasks.md
sources.md
decisions.md
verification.md
prompts/README.md
prompts/00-preflight.md
prompts/01-navigation.md
prompts/02a-themes.md
prompts/02b-style-guide.md
prompts/03a-podcast-data.md
prompts/03b-podcast-routing.md
prompts/03c-podcast-playback.md

Inspect template requirements before deciding whether additional
artefacts are needed. Do not add boilerplate files without a purpose.

spec.md:
- Outcome, scope and exclusions.
- Prioritised user stories.
- Stable requirements and observable success criteria.
- Given/When/Then scenarios.
- Dependencies and approval boundaries.
- Explicit unresolved decisions.

plan.md:
- Verified architecture, active consumers and revision.
- Stage-by-stage exact file plan.
- Proposed operations and intentional non-changes.
- Shared-file dependencies and risks.
- Main-based workflow and deployment implications.
- No invented durations, owners or commitments.

tasks.md:
- Stable feature-scoped task IDs.
- Requirement and acceptance mappings.
- Exact paths where evidenced.
- Dependencies and review gates.
- Proposed verification and completion evidence.
- Planned/blocked/implemented/verified/accepted distinctions.
- Parallel markers only for genuinely independent tasks.

sources.md:
- Source path, document version and inspected commit.
- Make report references and historical snapshots.
- Inspection extent and confidence.
- Conflicts, unavailable references and parity limits.

decisions.md:
- Confirmed decision and evidence.
- Wording/save/implementation/publication approval distinctions.
- Main exception and its exact scope.
- Unapproved candidates and blocking questions.
- No invented retrospective approval.

verification.md:
- Proposed checks and acceptance mapping.
- Environment, revision and safe test inputs.
- Commands/side effects requiring approval.
- Results marked Not run until performed.
- Separate static, calculated, runtime and deployment evidence.
- Explicitly accepted exceptions only where evidenced.

prompts/README.md:
- Entry point and stage order.
- Required files to reread each session.
- Permission and checkpoint rules.
- Clear distinction between planning persistence and application changes.

## 9. File-level Make prompt requirements

Every generated prompt must be self-contained and usable without
Linear MCP, Claude skills or earlier chat memory.

Each must:
1. Name the exact goal and stage.
2. Read spec.md, relevant plan/tasks/decisions and its own prompt file.
3. Verify the current Make snapshot and GitHub/main relationship.
4. Inspect actual file equivalents and active consumers.
5. State requirements, acceptance criteria and exclusions.
6. Show exact proposed diffs/new-file bodies before edits.
7. Identify intentional non-changes and consequential effects.
8. Stop for exact approval and bounded resumption authority.
9. Re-read affected files before approved writes.
10. Stop on material drift for revised approval.
11. Perform only authorised checks.
12. Report actual results and stop at the manual checkpoint.

Retain the following stages and boundaries.

00 — Preflight:
Read-only source inventory, parity, current branch/export destination,
conflicts and proposed next stage. No saved files or commit checkpoint.

01 — Navigation:
Primary inspection paths:
src/app/data/mock/book-site.ts
src/app/components/common/Header.tsx
src/app/components/common/Footer.tsx
src/app/components/pages/SitemapPage.tsx
src/app/routes.ts

Prefer active data/sitemap changes. Header/footer/CSS changes are
conditional and require demonstrated need in the exact preview.

Preserve routes and retained-item order.
No theme, legal-route, social-link or indexing repairs.

02A — Themes:
Trace entry/provider/control/storage/DOM/cascade behaviour through:
src/main.tsx
src/app/App.tsx
src/app/components/common/RootLayout.tsx
src/app/components/common/ThemeProvider.tsx
src/app/components/common/ThemeToggleES5.tsx
src/app/components/common/ThemeSwitcher.tsx
src/styles/index.css
src/styles/default_theme.css
src/styles/globals.css
and verified imported token/theme/book files.

Produce primitive → semantic → component → state mappings first.
No global hex replacement or unapproved third-mode removal.

02B — Style guide:
Inspect:
src/app/components/pages/StyleGuidePage.tsx
src/styles/blocks/style-guide-page.css

Preserve route and nine sections. Separate shared repairs from guide-local
changes. Do not invent logo rights or autobiographical specimens.

03A — Podcast data:
Resolve show identity, editorial authority, source transformations,
eligibility, hosting, audio revision, checked equivalent text,
chronology, rights and credits.

Inspect current podcast types/data/index and editorial consumers.
Do not invent adapter paths before the contract is accepted.
No route registration or player work in this stage.

03B — Podcast routing:
Use approved data/eligibility and canonical route/origin decisions.
Support one episode with truthful counts, empty states and unknown/
unpublished-item recovery. No fake additional cards.
No playback, RSS, analytics or offline expansion.

03C — Playback:
Require approved real media and checked equivalent text.
Use actual media events for time/progress.
Cover loading, buffering, ready, playing, paused, seeking, ended,
unavailable source, rejected playback, network failure and recovery.
Include accessible controls, focus, labelled seeking and cleanup.
No autoplay, simulated playback or fabricated durations.

Verify every proposed path against current source. Distinguish verified
paths, inferred counterparts and proposed new files.

## 10. Manual GitHub and deployment safeguards

Ash manually reviews, commits and pushes. Claude and Make must not do so.

Before recommending a push to main, inspect available deployment-trigger
evidence. A push may deploy automatically; do not describe it as
deployment-neutral without evidence.

After a later approved saved stage, when required checks have passed or
exceptions are explicitly accepted and no blocking findings remain:
- List actual changed files.
- Report actual checks and exceptions.
- Identify repository and target main.
- Stop with the standalone line:
  Commit to GitHub

If required checks or deployment consequences remain unresolved:
  Blocked — do not commit yet

Do not start the next stage until Ash confirms the manual checkpoint
and explicitly requests continuation.

A single explicit approval may cover the exact displayed changes and
bounded resumption. Do not demand duplicate unchanged approvals.

Documentation approval does not authorise application implementation,
providers, live test events, publication or deployment.

## 11. Return the exact preview

Return:
A. Source/configuration findings and inspected revision.
B. Material corrections to the historical Make outputs.
C. Proposed feature directory and collision/overlap findings.
D. Complete file inventory and scope.
E. Complete contents of every proposed file, or exact diffs for existing
   files, preserving applicable template structure.
F. Proposed initial document versions and actual-save-date rule.
G. Unresolved decisions and verification not performed.
H. One exact documentation-only save proposal identifying the main
   exception and intentional non-changes.

If the complete preview exceeds one response, split it into numbered
batches. Do not save or assume approval of undisplayed content.

Do not execute the generated Make prompts.
Do not run Spec Kit commands.
Do not create or modify reusable skills.
Do not save files, stage changes, commit, push, publish or deploy.

Stop for Ash’s approval of the exact documentation package.
