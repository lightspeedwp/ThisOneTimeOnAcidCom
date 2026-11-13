# Feature Specification: Book website — staged Figma Make specification package

| Field | Value |
| -- | -- |
| Package location | `.github/specs/004-book-website-make/staged/` (feature 004) |
| Version | 1.0.0 |
| Status | Draft — documentation only; implementation paused |
| Last revised | 2026-11-12 (Asia/Bangkok) |
| Inspected revision | Application source: `main` at `55079087373e6bc2c85e689aecde2815130b146b`. Documentation branch tip at save: `f5ef1ef`. Between these two, the relevant application paths differ only in comments in `RootLayout.tsx` and `SafetyWrapper.tsx`. |
| Documentation branch | `docs/book-website-make-spec` |
| Authority | Ash — design, editorial and publication authority |
| Authority boundary | Saving this package authorises no implementation, Git operation by agents, publication or deployment |

This package sits alongside the existing 004 files in the parent folder: `spec.md`, `plan.md`, `tasks.md`, `contracts/`, `exports/`, `references/` and the Gate 1 and Gate 2 records. It does not modify any of them.

Those files define stages 2B–3C as navigation design and reader access. This package follows the recorded source stages instead: 2B is the style guide and 3A–3C are the podcast stages.

Deciding which set governs Make, and whether either set is retired, is a separate decision for Ash. See `sources.md` §5 and `decisions.md` §4 (Q-19).

## 1. Outcome

Produce one repository-grounded package that Figma Make can read across sessions without Linear MCP access, Claude skills or earlier chat history, covering:

1. Source verification and documentation.
2. Navigation, footer and human-facing sitemap.
3. Shared-theme reconciliation.
4. Existing nine-section style-guide refinement.
5. Podcast editorial/runtime data contract.
6. Podcast routing and presentation.
7. Genuine accessible podcast playback.

Make's current source is the **editing target**. It is not automatically the approved product or design authority. Authority comes from the recorded source documents (`sources.md`) and Ash's explicit decisions (`decisions.md`).

## 2. Scope and exclusions

### In scope

- Stage prompts 00, 01, 02A, 02B, 03A, 03B and 03C under `prompts/`.
- Requirements BASE-01 to SAFE-01, their acceptance scenarios and their task mappings.
- Recorded decisions, unapproved candidates and blocking questions.
- Proposed verification, with every result recorded as **Not run** until it is performed.

### Excluded

- Application changes of any kind through this package.
- Reader-access verification, recovery, code-expiry and email-provider design. These belong to DEC-001/DEC-003 work, not this feature. The earlier 004 draft's CC-05 and recovery-race material is out of scope here.
- XML sitemap, `robots.txt`, noindex implementation, canonical-origin changes and Google-removal verification.
- Legal-route repairs (`/privacy`, `/terms`), social-link changes and footer-data property clean-up.
- Bootstrap recovery work (`fix/preview-develop-bootstrap`, `e7f65f8`).
- The reader-access Gate 1 decisions recorded on this branch. This package neither adopts nor disputes them; see `decisions.md` §5.
- Podcast RSS, analytics, offline support, directory submission and additional episodes.
- New Linear issues, changes to issue status, ownership or parent relationships, and LightSpeed contributors.
- Changes to reusable skills, Spec Kit configuration, `.specify/feature.json`, `CATALOG.md` or governance.

## 3. Preserved positions

- Book-first positioning. The website contains no portfolio section.
- Verified readers receive the **entire shorter website edition**, not excerpts only.
- Newsletter and contact are separate and optional. Reading access never enrols readers.
- Recorded access and privacy boundaries (DEC-001, DEC-003) are unchanged.
- There is no PDF delivery at launch and no manuscript offline downloads.
- Typography: Space Grotesk headings; Inter body/UI.
- Palette: `#0B0B10` `#12121A` `#171722` `#F6F2EB` `#CFC7BB` `#9C9488` `#FF3AAE` `#F4FF3C` `#8A63FF`.
- Both themes and saved-light preferences are preserved. The existing third mode (`brutalist`) stays until Ash explicitly decides.
- Existing `/style-guide` and its nine anchors: `brand`, `colors`, `typography`, `buttons`, `forms`, `cards`, `tags`, `icons`, `content`.
- Protected assets, separate logo approval, rights and credits.
- WCAG 2.2 AAA is a **target**, not a conformance claim.
- R3, T1, RT2 and C1 remain unapproved.
- `/speaking`, `/events` and `/media` stay public direct routes. Only their agreed menu/footer/sitemap exposure is removed, and only in Stage 01.

Superseded positions in `content/book/this-one-time-on-acid-brief.md` must not be restored. Those positions are: signup-unlocks-excerpts, automatic newsletter follow-up, pre-order promises, and Speaking/Events/Media navigation.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Verified source baseline (Priority: P1)

Ash needs each Make session to start from a verified source snapshot. Repository findings must not be mistaken for current Make parity.

**Independent test:** Run Prompt 00 read-only. It returns a parity table and explicit gaps, and it changes no files.

1. **Given** a referenced path is absent or materially different in Make, **when** Prompt 00 runs, **then** it reports the difference and stops affected work rather than recreating the file.
2. **Given** Make's local commit differs from GitHub `main`, **when** Prompt 00 runs, **then** it reports that parity is not established and does not infer ancestry or a push.

### User Story 2 — Deferred pages leave the navigation (Priority: P1)

Visitors should see only launch destinations in the menu, footer and human sitemap, while retained pages stay reachable directly.

**Independent test:** Compare before/after navigation data and confirm that every route is still registered.

1. **Given** the approved Stage 01, **when** a visitor opens the desktop or narrow-screen menu, **then** Events, Speaking and Media are absent and the order of retained items is unchanged.
2. **Given** a visitor requests `/speaking`, `/events` or `/media` directly, **when** the page loads, **then** it renders as before.
3. **Given** the human sitemap, **when** it renders, **then** the seven approved omissions and withholdings apply (`decisions.md` D-12, D-15), and Read the draft → `/read-the-draft` is retained.

### User Story 3 — Consistent themes (Priority: P2)

Readers who choose light (or another existing mode) keep that choice. Both controls must show the actual selected theme.

**Independent test:** Review the primitive → semantic → component → state mapping and the theme-state trace before any edit.

1. **Given** a saved light preference, **when** the page reloads or the route changes, **then** light remains applied.
2. **Given** the header and footer controls, **when** either changes the theme, **then** both reflect the same selection and neither shows a false selected state.
3. **Given** storage is unavailable or holds an invalid value, **when** the page loads, **then** an approved non-crashing fallback applies.

### User Story 4 — Book-specific style guide (Priority: P2)

Ash needs the existing `/style-guide` to document the book's approved foundations, not Nova News or portfolio identity.

**Independent test:** The route and all nine anchors remain. No duplicate page is created.

1. **Given** no approved book-logo revision, **when** Stage 02B runs, **then** Nova News references are removed and the logo slot is marked unresolved; no substitute logo is used.
2. **Given** the colours section, **when** it renders, **then** primitive swatches, semantic aliases and computed specimens are labelled distinctly.

### User Story 5 — One genuine podcast episode (Priority: P3)

Visitors can discover the show, open one approved episode, play real audio and read checked equivalent text.

**Independent test:** Each podcast stage completes only with its own evidence. Static inspection cannot satisfy playback.

1. **Given** only one eligible episode, **when** the archive renders, **then** it shows one card and a truthful count, with no fabricated additional cards.
2. **Given** an unknown or unpublished slug, **when** it is requested, **then** a recovery state appears and no preview content is exposed.
3. **Given** an approved media source, **when** playback starts, **then** actual media events drive time and progress.
4. **Given** loading fails, **when** the player is shown, **then** it states the problem and offers retry without displaying false playback.
5. **Given** keyboard-only use, **when** the player is used, **then** play/pause and labelled seeking are operable with visible focus.

### Edge Cases

- **Make workspace lacks recent commits:** Prompt 00 reports this and stops; no repair or relocation happens.
- **Make destination differs for a navigation mapping:** the affected mapping stops for clarification.
- **A third theme value is saved:** preserve the current behaviour until Ash decides; report inconsistent handling between controls.
- **Podcast data reaches search while routes are unregistered:** report the exposure in 03A; do not fix it outside the approved stage.
- **Required verification cannot run:** end with `Blocked — do not commit yet`.

## Requirements *(mandatory)*

### Functional Requirements

| ID | Requirement | Acceptance evidence | Source |
| -- | -- | -- | -- |
| BASE-01 | Identify current Make sources and revision limits. | File-equivalence table with explicit gaps. | 01 §3 |
| BASE-02 | Use a specification-first, approval-gated sequence. | Requirements, plan and tasks are traceable; no automatic implementation. | 01 §3 |
| NAV-01 | Remove deferred navigation exposure without deleting pages. | The exact entries are removed; retained routes are unchanged. | 01 §3; 03 v1.3.0; PRD REQ-010/AC-011 |
| NAV-02 | Apply the recorded sitemap-card treatment. | Correct omissions/withholdings; the reading entry is preserved. | 01 §5; 03 v1.3.0 |
| THEME-01 | Apply approved foundations through explicit mappings. | Source → token → consumer comparison. | 01 §3; 04; 05 |
| THEME-02 | Preserve light support and saved-light preferences. | Approved switching/persistence contract and verification evidence. | 01 §3; 05 |
| GUIDE-01 | Refine the existing nine-section style guide. | Route and anchors preserved; no duplicate surface. | 01 §3; 03; 04 |
| POD-01 | Support an intentional one-episode experience. | Archive and detail work without invented additional episodes. | 01 §3; 02 WP-04 |
| POD-02 | Use approved real audio and checked equivalent text. | Identified revisions, eligibility, rights and credits. | 01 §3 |
| POD-03 | Provide truthful playback and recovery states. | Actual media-backed behaviour, or honest unavailability. | 01 §3 |
| SAFE-01 | Preserve manual GitHub and release boundaries. | No automatic commit, push, publication or deployment. | 01 §2; PRD REQ-009 |

### Key Entities

- **Stage:** one of 00, 01, 02A, 02B, 03A, 03B, 03C. Each has its own prompt, approval gate and checkpoint.
- **Requirement:** one of the 11 stable IDs above. It is never renumbered.
- **Decision:** a recorded choice with evidence and an approval type (wording, save, implementation or publication).
- **Candidate:** an unapproved proposal (R3, T1, RT2, C1). It is preserved, not adopted.
- **Source:** a repository file or Make report with its version, revision and inspection extent.
- **Check:** a proposed verification with a classification (static, calculated, runtime or deployment) and a result (Not run, passed, failed or accepted exception).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001:** Every prompt names its stage and the files to re-read, and stops for exact approval before edits.
- **SC-002:** Every one of the 11 requirement IDs maps to at least one task and one proposed check.
- **SC-003:** Every path cited in a prompt is labelled as verified, inferred counterpart or proposed new file.
- **SC-004:** Every verification result in `verification.md` is "Not run" until evidence is recorded.
- **SC-005:** No document in the package claims Make parity, accessibility conformance, deployment or approval without cited evidence.
- **SC-006:** The package itself causes no application, configuration or skill change.

## Dependencies and approval boundaries

- Stage order: 00 → 01 → 02A → 02B → 03A → 03B → 03C.
- 03A decision preparation may run alongside 02A review. Shared-file implementation is serialised.
- Each stage needs (a) an exact preview, (b) Ash's explicit approval of that preview and (c) bounded authority to resume paused implementation. A single explicit approval may cover (a)–(c) together.
- After each stage, the agent stops at `Commit to GitHub` or `Blocked — do not commit yet`. Ash commits and pushes manually.
- A push to `main` is likely to trigger a Netlify production deploy (`verification.md` §5). No stage may describe a push as deployment-neutral.

## Unresolved decisions

See `decisions.md` §4. In summary:

- The editable Make revision and its parity.
- Credits.
- Resumption authority per stage.
- Semantic/component mappings.
- First-visit default, system preference and storage fallback.
- Third-mode disposition.
- Book-logo revision, rights and credits.
- Which 004 document set governs Make (Q-19).
- Podcast identity, source authority, routes/origin, hosting, eligibility, first-episode media/text, chronology, rights and credits.
- The main-based exception.

## Assumptions

- The documents `01`–`06` form the governing packet. On this branch they are at `../references/`, and those copies are byte-identical to `content/book/` on `main` at `5507908`. Their versions are verified in `sources.md`.
- Linear links are references only. Neither Claude nor Make has inspected current Linear state for this package.
- Repository paths reflect the inspected revision only. Make paths must be re-verified each session.
