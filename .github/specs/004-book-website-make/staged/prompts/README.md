# Figma Make prompts — book website

| Field | Value |
| -- | -- |
| Version | 1.0.0 |
| Last revised | 2026-11-12 (Asia/Bangkok) |

## Entry point

Start with `00-preflight.md`. After that, run only the stage Ash selects explicitly.

| Order | File | Stage | Requirements | Prerequisite |
| -- | -- | -- | -- | -- |
| 1 | `00-preflight.md` | Read-only preflight | BASE-01, BASE-02 | — |
| 2 | `01-navigation.md` | Navigation, footer, human sitemap | NAV-01, NAV-02 | 00 |
| 3 | `02a-themes.md` | Shared-theme reconciliation | THEME-01, THEME-02 | 01 checkpoint |
| 4 | `02b-style-guide.md` | Existing style guide | GUIDE-01 | 02A checkpoint |
| 5 | `03a-podcast-data.md` | Podcast decisions and data contract | POD-01, POD-02 | 00. Decision gathering may run alongside 02A. |
| 6 | `03b-podcast-routing.md` | Podcast routes and presentation | POD-01 | 03A checkpoint |
| 7 | `03c-podcast-playback.md` | Genuine playback | POD-03 | 03B checkpoint; approved media |

## Read at the start of every session

Read these files in `.github/specs/004-book-website-make/staged/`:

- `spec.md`
- `plan.md` (the section for the current stage)
- `tasks.md` (the phase for the current stage)
- `decisions.md`
- `sources.md`
- `verification.md`
- this README
- the prompt for the current stage

Do not rely on chat history, Linear access or Claude skills.

## Permissions and checkpoints

- Every prompt shows its exact proposed changes and stops for Ash's approval and bounded authority to resume.
- A single explicit approval may cover the displayed changes and resumption together.
- Ash reviews, commits and pushes manually. Make and Claude never do.
- A stage ends with `Commit to GitHub` or `Blocked — do not commit yet`. The next stage waits until Ash confirms the checkpoint and asks to continue.
- A push to `main` may trigger a Netlify production deploy (`verification.md` §5).
- Make's current source is the **editing target**. It is not the product or design authority.

## Planning persistence vs application changes

- These Markdown files are planning documents. Saving or updating them changes no application behaviour.
- Approving the documentation authorises no implementation, provider, live test event, publication or deployment.
- If Make proposes updating this specification during a stage, that update is a separate documentation change. It needs its own exact preview and approval, and it must not be bundled into an application diff.
