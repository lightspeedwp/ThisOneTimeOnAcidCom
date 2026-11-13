# Codebase consistency crosswalk

**Status:** Proposed supplemental evidence crosswalk; not implementation authority.
**Inspected branch:** `docs/book-website-make-spec`
**Inspected revision:** `4483a40eccddd1a29ed470c9434e86ba9b2b6c5b`
**Historical consistency baseline:** `3f583002482d80ffd1910676bcf7c63e13989b20`

## Governing interpretation

Ash confirmed the following interpretation for this crosswalk on
11 November 2026.

[Source 01](references/01-book-website-specification.md) supplies the governing
stable requirements and staged sequence, consistent with its designation as
the master execution contract in the [reference index](references/README.md).

The companion supplies context. Author decisions, the design brief, decision
register and PRD apply within their specifically recorded decision scopes.
A larger version number on a different document does not establish global
precedence or supersede another source.

The governing sequence is:

1. Source verification and specification.
2. Navigation exposure changes.
3. Separately approved shared-theme reconciliation.
4. Refinement of the existing nine-section style guide.
5. Separately approved podcast data, routing and genuine playback.

This interpretation governs this crosswalk only. It does not amend `spec.md`,
`plan.md`, `tasks.md`, contracts or other existing artefacts. Conflicting
derived meanings remain explicitly unresolved pending a separately reviewed
amendment.

## Stable source requirements

The following summaries preserve the source requirement identifiers.
Source 01 retains the complete requirement wording.

- BASE-01: identify current Make sources and revision limits.
- BASE-02: maintain specification-first, approval-gated traceability.
- NAV-01 and NAV-02: apply the agreed navigation exposure and human-sitemap
  treatment while preserving retained pages and the reading entry.
- THEME-01 and THEME-02: reconcile approved foundations through explicit
  mappings, preserving light support and saved-light preferences.
- GUIDE-01: refine the existing nine-section style guide rather than create
  a replacement surface.
- POD-01, POD-02 and POD-03: provide an intentional one-episode experience,
  approved real audio, recording-checked equivalent text and truthful
  media-backed playback and recovery.
- SAFE-01: preserve manual GitHub and separate publication/release boundaries.

The [supplemental delivery candidate](references/09-toa-figma-make-delivery-specification.md)
supports this sequence. Its DOC-, NAV-, THEME-, GUIDE-, POD- and SAFE-prefixed
task identifiers remain a separate proposed namespace. They do not replace
or renumber T001–T059 in the derived task list.

## Evidence and coverage rules

The [original consistency plan](../../../plan/codebase-consistency-implementation-plan.md)
remains the historical record at its existing path.

Its June finding identifiers and September domain letters retain their
original namespaces. Historical findings, counts and reported implementation
states are not fresh verification results.

Coverage classifications mean:

- **Partial:** relevant documentation overlaps, without establishing complete
  implementation or acceptance.
- **Conflicting:** derived material changes the source meaning or claims more
  than the inspected evidence supports.
- **Unmapped:** no dedicated matching task was identified in the inspected
  task list.

All T-prefixed identifiers below refer to
[tasks.md](tasks.md). They are references to existing tasks, not new tasks,
renumbering instructions or completion-state changes.

## Source-to-requirement/task crosswalk

| Consistency-plan finding | Governing source requirement and intended scope | Existing derived requirement/task and actual scope | Coverage and remaining boundary |
| --- | --- | --- | --- |
| CRIT-01; MED-05 — shadows, radii, layering and dual token aliases | THEME-01: explicit source-to-token-to-consumer mappings. GUIDE-01: demonstrate accepted mappings in the existing guide. | FR-004; T019 documents component styles and states; T021 validates exported baseline tokens and component states. | Partial. No dedicated layering, alias-consumer or active-cascade verification task was identified. Token export does not establish compatibility. |
| CRIT-02; HIGH-01; HIGH-05 — semantic aliases, selector colours and theme sweep | THEME-01 and THEME-02: approved role/state mappings across both themes, preserving saved-light preferences. | FR-004; T016 checks the claimed nine-light/nine-dark palette; T019 documents colours and states; T021 validates exports. | Partial and conflicting. Palette presence does not establish approved light mappings, contrast, active overrides or persistence. Derived interaction values require reconciliation with recorded source decisions. |
| CRIT-03; HIGH-02 — font/spacing aliases and fluid typography | THEME-01 and GUIDE-01: approved foundations and existing-guide specimens, without adopting unapproved typography candidates. | FR-004; T015 compares typography with the design brief; T019 extracts tokens; T021 checks exported fonts, weights and sizes. | Partial. Export checks do not establish current consumers, spacing aliases, zoom behaviour or cascade correctness. |
| CRIT-04; MED-04 — fluid button padding and legacy `.button` compatibility | THEME-01 and GUIDE-01: approved component mappings and guide-local examples. | FR-004; T019 and T021 document/export Button styles and states. | Partial. No dedicated current-consumer inventory, legacy migration or regression task was identified. No deletion or bulk consolidation is authorised. |
| HIGH-03 — logging and bundler compatibility | BASE-01 and BASE-02 support recording current evidence and conflicts; SAFE-01 preserves bounded execution. No source requirement selects a replacement logging design. | FR-009 limits work to documentation; T003 checks governance alignment. | Unmapped for remediation. Governance review is not a logging fix. The inspected `import.meta.env.DEV` policy conflict remains unresolved. |
| HIGH-04; MED-01; MED-02; MED-03 — palette layout and contextual runtime values | BASE-01 supports source verification. THEME-01 applies only where approved token mappings touch actual consumers. | T003 checks governance; FR-004/T019 concern baseline component styles and states, not the specific runtime expressions. | Unmapped for the specific consumers. Preserve distinctions between static layout, dynamic custom properties, generated swatches and asset URLs. No universal inline-style exemption is established. |
| September G — human-facing sitemap/navigation subset | NAV-01 and NAV-02: agreed exposure changes, retained routes and reading entry. | FR-003; T017 validates hidden destinations; T020 specifies navigation; T025 documents changes; T053 creates the exact navigation preview. | Partial. Preserve unrelated entries and retained order. A derived four-link inventory must not silently replace that requirement. XML sitemap, robots, noindex, canonical origin and broader search-removal verification are not authorised by this mapping. |
| Historical provenance; September H/F/E/B/A/C/D and remaining G coverage | BASE-01, BASE-02 and SAFE-01 support bounded evidence and traceability, not adoption of the entire audit backlog. | FR-001/FR-002; T052 addresses version reconciliation, T055 approval boundaries, T056 the six-source inventory and T059 reconciliation validation. | Partial and conflicting. These tasks concern the feature packet, not a current codebase-wide audit. Cross-document SemVer precedence and unsupported readiness claims remain disputed. Packages, backlog reconciliation and remaining web-standard checks receive no automatic implementation coverage. |

## Explicit unresolved conflicts

### Stage meanings

Source stages 2A and 2B concern shared-theme reconciliation and refinement of
the existing style guide. Derived FR-004 and associated contracts instead
describe design-token export and navigation design.

Source stages 3A–3C concern podcast data, routing and playback. Derived
FR-004/FR-005 and T022–T038 concern reader access, recovery and error
documentation.

Keep both meanings visible until an exact amendment is approved. Do not
relabel reader tasks as podcast coverage or treat an export as shared-theme
remediation.

### Design and accessibility requirements

The design brief and decision register retain scoped decisions and unresolved
candidates. Conflicting derived typography ranges, interaction colours,
light-theme mappings and accessibility targets are not resolved by this
crosswalk.

Do not import historical numerical values as approved design or infer that
an exported token has been validated in its rendered consumer.

### Readiness and provenance

Checked reconciliation rows, saved artefacts and readiness assertions do not
establish implementation, design acceptance or launch readiness.

Preserve the distinction between source requirements, proposed candidates,
documentation checks and executed runtime evidence. No application, browser,
accessibility, build or test checks were executed for this crosswalk.

POD-01–POD-03 remain outside the historical consistency findings mapped above.
Historical progress-width exceptions do not satisfy media eligibility,
rights, credits, equivalent-text or genuine-playback requirements.

## Preserved scope and non-changes

The original consistency plan remains at its existing path, with its
historical evidence, exceptions, expanded audit domains and unresolved
decisions intact. Its differently counted audit findings and implementation
groups are not converted into a new completion total.

This crosswalk introduces no executable tasks, new task identifiers,
checkbox changes or issue changes. Existing specification, plan, task,
contract and source files remain unchanged.

Planning-document relocation remains separate work. Dependency/bootstrap
repair, governance changes, provider changes, manuscript work, portfolio
adaptation, publication and deployment are outside this proposal.

The selected documentation branch does not inherit any supplemental
candidate's proposed direct-main exception. This crosswalk authorises no
branch creation, Spec Kit helper execution, full-cycle workflow, repository
implementation or publication.

## Subsequent amendment boundary

Any proposed reconciliation of the derived specification must separately
identify:

- Exact source requirements and existing task identifiers affected.
- Current and proposed wording.
- Preserved requirements and unresolved decisions.
- Any scope additions, removals or changed acceptance requirements.
- Exact affected files and required approvals.

Do not amend existing artefacts or claim their conflicts resolved merely
because this crosswalk is accepted or saved.
