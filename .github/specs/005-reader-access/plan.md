# Implementation Plan: Reader access

**Branch**: `docs/reader-access-plan` | **Date**: 2026-11-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `.github/specs/005-reader-access/spec.md`
**Inspected revision**: `3b37b82bf09ffb83bc238f163ef257f81afc48d4` (main) plus clarification commits on this branch

This plan documents design only. It does not authorise implementation, provider
selection, provisioning, publication or deployment.

## Summary

Readers verify an email address with a single-use emailed code and then read the
complete shorter website edition online. Clarifications (2026-11-12) select
Netlify Functions on the existing host for code issue, verification, session
handling and protected chapter delivery; a code expires ten minutes after the
function creates it; each fresh-code verification or renewal grants up to thirty
days on that device/profile, repeatable without an overall ceiling. Newsletter
consent stays a separate journey. Provider, storage, manuscript readiness,
recovery mechanics, concurrency and privacy operations remain open.

## Constraints

Drafting baseline was `fe09574da48ecaff1b41c78ee6c1fa1dbe9bc66b`; this plan was
re-based on `3b37b82bf09ffb83bc238f163ef257f81afc48d4`. The repository requires
.github/specs, explicit branch/path checks and preservation of machine-local
.specify/feature.json. Product policy records emailed single-use codes, online
reading of the shorter edition, up to thirty days of returning access per
fresh-code verification or renewal (no overall ceiling), separate optional
newsletter, purpose-limited records and no launch offline manuscript access.

## Technical Context

**Language/Version**: TypeScript; Node.js 24 (`package.json` engines `>=24`; `netlify.toml` `NODE_VERSION = "24"`)
**Primary Dependencies**: React 19.3.1, React Router 8, Vite 8 (verified in `package.json`; AGENTS.md still records React 18/Vite 6). Netlify Functions runtime — selected direction, not yet present (no `netlify/functions/`). Email provider SDK — NEEDS CLARIFICATION (decision 1)
**Storage**: Code, access-record and session storage — NEEDS CLARIFICATION (see research R-02). Supabase excluded
**Testing**: Vitest 5 and Jest 30 (unit), Playwright (end-to-end), Bats (shell), Spec Kit regression baseline
**Target Platform**: Netlify (`netlify.toml` at repository root; existing edge function `deny-source-maps`). Vercel also builds previews through its GitHub app; production host — NEEDS CLARIFICATION (decision 10)
**Project Type**: Single-page web application with server-side functions added for this feature
**Performance Goals**: Not specified by the spec — NEEDS CLARIFICATION (no latency targets recorded)
**Constraints**: Protected chapter text must never enter the public client bundle (RA-001, SC-004); browser credential contains no email (RA-005); code validity starts at server-side creation (RA-003); Figma Make bundler rules apply to client code; BEM-only styling; UI strings from `src/app/data/mock/`
**Scale/Scope**: Single book, one edition, ~100–150 pages (author brief v1.3.0). Reader volume — NEEDS CLARIFICATION

## Constitution Check

*GATE: evaluated before Phase 0 and re-checked after Phase 1 (constitution v1.0.0).*

| Principle | Assessment | Status |
| --- | --- | --- |
| I Specification-first | spec, plan, research, data-model, contracts and quickstart exist; tasks.md exists (hand-authored). Spec Kit regression baseline for feature 005 not run | Pass for design artefacts; regression Not run |
| II Governance | Documentation only; no workflow, protected-file, catalogue or `.specify/feature.json` change | Pass |
| III Figma Make bundler | Client changes (forms, states, reader) must avoid `?.`, `??`, `import.meta.env`, nested ternaries and `for...of`. Function code runs server-side, outside the Make bundle, but should follow the same rules to stay reviewable | Applies at implementation; Not run |
| IV Content and data | UI strings belong in `src/app/data/mock/`; manuscript belongs in `content/`; Supabase excluded. Adding server functions changes the "static mock data" description — owner direction recorded (Clarifications Q1); see Complexity Tracking. `bookContentLoader.ts` eagerly bundles `/src/content/book/**/*.md` into the client — incompatible with protected delivery if used for the edition | Conditional pass — risk R-04 |
| V BEM-only CSS | Reader-access forms and states styled in `src/styles/blocks/` | Applies at implementation; Not run |
| VI Package/runtime | npm only, Node 24. Any function or email-provider dependency needs separate npm/lockfile review | Pass for design; dependencies NEEDS CLARIFICATION |
| VII Testing | Function unit tests (Vitest/Jest), Playwright access journeys and CI gating required before merge of any implementation stage | Planned; Not run |

**Gate result**: design may proceed. **Implementation gate: FAIL** until research
items marked "Owner decision" are resolved and the regression baseline runs.

## Boundaries

005 owns reader-access requirements and reconciliation. 004 remains launch
package and historical source. The six 004 reader-access contracts (prompt-3a,
3b, 3c and their execution guides) remain in 004 until a separate exact move
proposal; `contracts/reader-access-functions.md` in this package defines the new
server interface and does not supersede or duplicate them. Mixed 004
coordination files do not move.

Candidate source/destination pairs, not executed: each of the six
004/contracts/prompt-3 files to corresponding 005/contracts paths. A later move
requires complete content or reconstructable move-plus-diff, relative-link
repairs, identity mappings and backlink review. 004 design values (including the
3A execution guide colours) carry no authority here; the approved palette,
Space Grotesk headings and Inter body/UI apply.

## Project Structure

### Documentation (this feature)

```text
.github/specs/005-reader-access/
├── spec.md
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1 validation guide (all checks Not run)
├── contracts/
│   └── reader-access-functions.md   # Phase 1 server interface
├── tasks.md             # Existing; not regenerated by this command
├── decisions.md
├── sources.md
├── crosswalk.md
└── verification.md
```

### Source Code (repository root) — proposed, not created

```text
netlify/
├── edge-functions/
│   └── deny-source-maps.js          # existing; unchanged
└── functions/                        # proposed (Q1 direction)
    ├── reader-code-request.ts
    ├── reader-verify.ts
    ├── reader-session.ts
    └── reader-chapter.ts
src/app/
├── data/mock/                        # reader-access UI strings
├── components/pages/book-site/       # existing BookHomePage, WaitlistPage, ThankYouPage consumers
├── components/pages/about/EbookPage.tsx   # existing reader; must fetch from reader-chapter
└── utils/bookContentLoader.ts        # existing eager glob; must not load protected edition
src/styles/blocks/                    # BEM blocks for forms and states
content/                              # edition source location — Owner decision (R-03)
tests/ and colocated tests            # Vitest/Jest units; Playwright journeys
```

**Structure Decision**: keep the single application and add server functions
under `netlify/functions/`. Exact file names are proposals for later task
previews; no source files are created by this plan.

## Sequence

1. Reconcile current main, 004 sources, Linear v1.13.0 and destination.
2. Resolve provider, storage, manuscript, recovery, concurrency, consent, privacy and deployment decisions (research.md).
3. Preview one bounded implementation stage.
4. Obtain stage approval; re-read sources and validate canonical containment.
5. Implement only the approved stage; read back and verify.
6. Stop at the manual GitHub checkpoint.

Preserve all source documents, governance, application code, deployment
configuration, Linear records, catalogues, task lists, 004 files and reviewer
markers. No tests, forms, provider calls or deployment checks were run.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --- | --- | --- |
| Server functions added to an application described as static mock data (principle IV purpose) | RA-001/SC-004 require server-authorised access; protected text cannot be shipped to every visitor | Client-only gating exposes the edition in the public bundle |
| Replacing eager client loading of book content for the protected edition | `import.meta.glob(..., { eager: true })` places every matched file in the client bundle | Keeping it would publish the edition without verification |
