# Decisions — 004 book website Make package

| Field | Value |
| -- | -- |
| Version | 1.0.0 |
| Last revised | 2026-11-12 (Asia/Bangkok) |

This register records decisions; it does not create them. Saving it gives no retrospective approval to anything.

## 1. Approval types

| Type | Meaning | Does not cover |
| -- | -- | -- |
| Wording approval | Ash accepts the displayed text | Saving, execution |
| Save approval | Ash accepts the exact files at the exact paths | Implementation, publication |
| Implementation approval | Ash approves one stage's exact preview and gives bounded authority to resume | Other stages, publication, deployment |
| Publication approval | Ash approves public release | Not given by anything in this package |

One explicit approval may cover a displayed change together with bounded resumption. An unchanged approval is not requested twice.

## 2. Confirmed decisions

| ID | Decision | Evidence | Type |
| -- | -- | -- | -- |
| D-01 | The website is book-first and has no portfolio section. | 03 §Relationship to the portfolio | Author decision, 27 Oct 2026 |
| D-02 | Verified readers get the entire shorter website edition, not excerpts. | 03 §Access-scope reconciliation; PRD REQ-002 | Author decision, 27 Oct 2026 |
| D-03 | Newsletter and contact are separate and optional. | PRD REQ-004; 03 | Recorded boundary |
| D-04 | Access lifecycle (DEC-001, DEC-003): single-use codes valid for 10 minutes; up to 30 days per device; access record deleted after 12 months without authenticated use. | 03; PRD | Policy accepted, 27 Oct 2026; not implemented |
| D-05 | No PDF delivery and no manuscript offline downloads at launch. | 03; DEC-006 | Recorded exclusion |
| D-06 | Space Grotesk for headings; Inter for body and UI. | 04 §Confirmed design reconciliation; 05 | Confirmed design direction |
| D-07 | The nine-colour palette (see `spec.md` §3). | 04; 05 | Palette approved; mappings and pairings not verified |
| D-08 | Dark interaction colours as displayed in 05 | 05, approved 4 Nov 2026 14:30 Bangkok | Design choice, subject to checks |
| D-09 | Keep both themes; reconcile dark first; keep a saved light choice | 05, selected 4 Nov 2026 11:31 Bangkok | Not a dark-only launch |
| D-10 | Refine the existing `/style-guide` and keep its nine sections | 03; 04 | Planning direction |
| D-11 | Keep `/speaking`, `/events` and `/media` public at their direct URLs, with no menu or footer links and with noindex | 03; PRD REQ-010/AC-011 | Planning direction; noindex not verified |
| D-12 | Leave Speaking/Events/Media cards out of the human sitemap | 03 v1.3.0; wording approved 9 Nov 2026 05:07 UTC | Wording approval only, for planning; not save or execution approval |
| D-13 | Podcast launches only if there is at least one approved item with a clear purpose | 03; PRD AC-011 | Conditional launch requirement |
| D-14 | WCAG 2.2 AAA is a target | 03; 04; PRD | Target only; no conformance claim |
| D-15 | Also leave these out of the human sitemap: Thank you `/thank-you` and Style guide `/style-guide` (omit); Draft viewer `/draft-viewer` and Ebook reader `/ebook` (withhold). Pages and routes are unchanged. | 01 Prompt 1; Ash's approval in the Claude session on 2026-11-12 | Planning approval for NAV-02. Implementation still needs the Stage 01 exact preview and approval. |

## 3. Proposed main-based exception — not approved

> "Use main for the approved book-website documentation and Make workflow. This does not amend organisation-wide policy, authorise unrelated work, bypass hooks, or permit automatic commits, pushes or deployment."

This exception conflicts with current repository rules:

- `AGENTS.md:109`: "Do not edit on `main` or detached HEAD."
- `AGENTS.md:111–112` and `CONTRIBUTING.md:426, 660`: work branches derive from `main`.

The exception would apply only to Make's editing workflow against `main`, where Make defaults to `main`, and to Ash's manual commits of approved stages. It does not amend `AGENTS.md` or `CONTRIBUTING.md`. Whether it applies is Ash's decision.

This documentation package was saved on branch `docs/book-website-make-spec`, so saving it did not depend on the exception.

## 4. Unapproved candidates and blocking questions

| ID | Item | Blocks | State |
| -- | -- | -- | -- |
| R3 | Responsive typography, gutters and containers | Nothing in stages 00–03C; must not be adopted indirectly | Unapproved |
| T1 | Additional typography roles and weights | Same | Unapproved |
| RT2 | Reader sizing and reset | Same | Unapproved |
| C1 | Reader continuity and recovery | Same (C1-R1 is a separate component baseline) | Unapproved |
| Q-01 | Editable Make revision, parity and credits | All stages after 00 | Open |
| Q-02 | Bounded resumption authority for each stage | Each implementation stage | Open |
| Q-03 | Main-based exception (§3) | Make write stages | Open |
| Q-04 | Whether to also omit or withhold Thank you, Style guide, Draft viewer and Ebook from the human sitemap | NAV-02 completion | Resolved: see D-15 |
| Q-05 | Footer group heading "Author & Press" once three items are removed | NAV-01 presentation | Keep unless separately approved |
| Q-06 | Semantic/component mappings for both themes | THEME-01 | Open (OPEN-10) |
| Q-07 | First-visit default, system preference, invalid or unavailable storage | THEME-02 | Open |
| Q-08 | What happens to the third (`brutalist`) mode | THEME-02 | Keep until decided |
| Q-09 | Book-logo revision, rights and credits | GUIDE-01 brand section | Open (OPEN-11) |
| Q-10 | Font loading and licensing evidence | THEME-01, GUIDE-01 | Open (OPEN-02) |
| Q-11 | Podcast show identity, artwork and relationship to the book | POD-01 | Open |
| Q-12 | Podcast editorial source authority (Markdown or TypeScript) and transformation | POD-01, POD-02 | Open |
| Q-13 | Canonical podcast routes and origin (`/podcasts`, `/podcast/:slug`) | POD-01 | Open |
| Q-14 | Audio hosting and access | POD-02, POD-03 | Open |
| Q-15 | Preview/public eligibility and exclusion from search and counts | POD-01 | Open |
| Q-16 | First-episode audio, recording-checked text, date and duration | POD-02, POD-03 | Open |
| Q-17 | Chronology: South Africa "spontaneous" painting vs Berlin "first face" (02 WP-04) | POD-02, if that episode is selected | Ash to clarify |
| Q-18 | Rights, credits and disclosure for artwork, music and voice | POD-02 | Open |
| Q-19 | Which 004 document set governs Make: this `staged/` package or the parent-folder `spec.md`/`contracts/` set. The two define stages 2B–3C differently. Also, whether either set is retired. | Stage 00 onwards | Open |

## 5. Not decided here

- Launch date: 27 January 2027 is an unapproved intention (03).
- XML sitemap, robots rules, noindex, canonical origin, legal routes and social links.
- Reader-access provider, email and recovery design.

### Gate 1 records on this branch (reader access)

The following are recorded on this branch but are outside this package's scope:

- `../research.md` and `../exports/BLOCKING_DECISIONS_PROPOSAL.md`, from commit `12a2276`, record seven "Gate 1" decisions. They cover recovery race, recovery lifetime, code-expiry start, email provider, manuscript readiness, newsletter destination and route enforcement.
- This package does not adopt, restate or dispute them.

The records are internally inconsistent in two places that matter for future reconciliation:

- Decision 4 reads "Hybrid (SendGrid + Brevo)" in its text but "SendGrid" in the summary table.
- Decision 7 says to avoid robots `Disallow` rules in its text, while the summary table lists "Meta + Robots + Sitemap".

XML sitemap, robots and noindex work stays outside Stage 01 regardless.
