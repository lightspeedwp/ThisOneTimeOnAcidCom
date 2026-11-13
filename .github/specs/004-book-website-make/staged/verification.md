# Verification — 004 book website Make package

| Field | Value |
| -- | -- |
| Version | 1.0.0 |
| Last revised | 2026-11-12 (Asia/Bangkok) |
| Baseline revision | `55079087373e6bc2c85e689aecde2815130b146b` |

Results stay **Not run** until a check is performed and its evidence is recorded. A check passes only with evidence. An exception counts only if Ash accepts it explicitly.

## 1. Evidence classes

| Class | Meaning | Example |
| -- | -- | -- |
| Static | Reading source files | Route registered in `routes.ts` |
| Calculated | Derived without rendering | Contrast ratio of two hex values |
| Runtime | Observed in a browser or with assistive technology | Theme persists across reload |
| Deployment | Observed on a deployed URL | noindex present in production |

## 2. Proposed checks

| Check | Requirement | Class | Method | Side effects / approval | Result |
| -- | -- | -- | -- | -- | -- |
| V-BASE-01 | BASE-01 | Static | Prompt 00 parity table (reference path, actual path, consumer, status, difference) | Read-only | Not run |
| V-BASE-02 | BASE-02 | Static | Every task maps to a requirement; no edit is made before approval | None | Not run |
| V-NAV-01 | NAV-01 | Static | Diff `book-site.ts` `nav`/`footerGroups`: three entries removed, retained order unchanged | None | Not run |
| V-NAV-02 | NAV-01 | Static | `routes.ts` unchanged for `/speaking`, `/events`, `/media` | None | Not run |
| V-NAV-03 | NAV-02 | Static | `SitemapPage` `bookPages` reflects the approved omissions; `/read-the-draft` retained | None | Not run |
| V-NAV-04 | NAV-01 | Runtime | Desktop and narrow menu: open/close, Escape, focus return, focus containment, scrolling | Needs a Make preview; approve first | Not run |
| V-NAV-05 | NAV-01 | Runtime | Direct load of the three retained routes | Make preview | Not run |
| V-THEME-01 | THEME-01 | Static | Primitive → semantic → component → state mapping table | None | Not run |
| V-THEME-02 | THEME-01 | Calculated | Contrast for each approved pairing in both themes | None | Not run |
| V-THEME-03 | THEME-02 | Runtime | Saved light survives reload and route change | Writes browser storage in the preview; approve first | Not run |
| V-THEME-04 | THEME-02 | Runtime | Header and footer controls show the same actual theme | Make preview | Not run |
| V-THEME-05 | THEME-02 | Runtime | Invalid or unavailable storage falls back without crashing | Make preview; approve first | Not run |
| V-GUIDE-01 | GUIDE-01 | Static | Route and nine anchors preserved; no Nova News references | None | Not run |
| V-GUIDE-02 | GUIDE-01 | Runtime | Copy controls and swatches are keyboard-operable; reduced motion respected | Make preview | Not run |
| V-POD-01 | POD-01 | Static | Data contract table and eligibility filter defined | None | Not run |
| V-POD-02 | POD-01 | Runtime | One-card archive, truthful count, unknown-slug recovery, direct load and refresh | Make preview | Not run |
| V-POD-03 | POD-02 | Static | Media and text revisions, rights and credits recorded | Needs Ash's inputs | Not run |
| V-POD-04 | POD-03 | Runtime | Real playback: loading, buffering, play, pause, seek, ended, error and retry, cleanup | Plays real media; approve first | Not run |
| V-POD-05 | POD-03 | Runtime | Keyboard and screen-reader operation of the player | Make preview | Not run |
| V-SAFE-01 | SAFE-01 | Static | No agent commit, push, publish or deploy in the stage report | None | Not run |
| V-DEPLOY-01 | NAV-01 (D-11) | Deployment | noindex present and routes reachable on production | Separate scope; out of this package | Not run |

## 3. Environment and safe inputs

- **Revision.** Record the Make snapshot or local commit at each stage, and compare it to GitHub `main` without assuming parity.
- **Test data.** Use no personal data. Specimen forms must not submit. Podcast checks use only approved media; there is no placeholder audio.
- **Browser storage.** Clear only the `theme` key after the check.

## 4. Commands requiring approval

None are authorised by this package. Any of the following needs Ash's explicit approval, scoped to a single stage:

- `npm ci`
- `npm run build`
- `npm test`
- `npm run test:unit`
- Playwright runs
- Starting a dev server

The approval must state the side effects (`dist/`, `node_modules/`, caches).

## 5. Deployment consequence

`netlify.toml` has no branch contexts. `AGENTS.md:404–410` records a Netlify site building `main` with `npm run build` and publishing `dist`. `CONTRIBUTING.md:647` calls `main` the "deployment branch".

**A push to `main` should be treated as a likely production deploy.** The live Netlify setting is unverified. No GitHub Actions workflow deploys the site.

## 6. Accepted exceptions

None recorded.
