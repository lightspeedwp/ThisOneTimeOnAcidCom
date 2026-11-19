# Reader access research

Phase 0 output for [plan.md](plan.md). Each item records a decision, its
rationale and the alternatives considered. **Status** distinguishes Ash's
selected directions (Clarifications 2026-11-12), proposals awaiting Ash, and
owner decisions that research cannot settle. A proposal is not approval.

No provider, network, runtime or deployment check was run for this research.

## R-01 Server-side authorisation location

- **Status**: Selected direction (Clarifications Q1)
- **Decision**: Netlify Functions on the existing Netlify site issue and verify codes, manage sessions and serve protected chapters.
- **Rationale**: Keeps one host (`netlify.toml` already configures the site and an edge function); avoids Supabase, which the constitution excludes.
- **Alternatives considered**: Edge Functions gating chapter routes; a separate hosted passwordless service; leaving it unresolved.
- **Open point**: confirm that function routes take precedence over the SPA fallback (`/*` → `/index.html`) in `netlify.toml` for the chosen paths.

## R-02 Storage for codes, access records and sessions

- **Status**: Proposal — awaiting Ash
- **Decision (proposed)**: Netlify Blobs on the same site, with codes stored only as salted hashes.
- **Rationale**: Same host as R-01; no new platform account. Single-use codes need an atomic "consume once" step, so the store must support conditional writes or strongly consistent reads.
- **Alternatives considered**: An external managed database (stronger transactions, new provider and data-processing review); signed stateless tokens (cannot enforce single use or server-side sign-out on their own, so they fail RA-002/RA-005).
- **Verify before acceptance**: whether Netlify Blobs offers the consistency and conditional-write guarantees needed for single use and concurrent redemption (RA-009).

## R-03 Protected edition source and delivery

- **Status**: Owner decision (decision 2) with a technical constraint
- **Decision (constraint)**: The protected edition must be readable only by the chapter function. It must not be matched by the eager `import.meta.glob` in `src/app/utils/bookContentLoader.ts`, which bundles every file matched by `BOOK_SOURCE_GLOBS` into the client.
- **Current state (static inspection at `d3b0694`)**: `content/` has moved to `src/content/` (PR #608). `BOOK_SOURCE_GLOBS` in `src/app/utils/bookContentSource.ts` now matches only `/src/content/book/<dir>/*.md` for the six chapter directories (`00-front-matter` … `05-back-matter`), so the planning documents at the `src/content/book/` root are excluded, but the manuscript chapters in those directories are bundled.
- **Proposed option**: keep the approved edition in a server-only location that no client glob matches, and ship it to the chapter function as function-only files. The exact location is an owner decision (decision 11); constitution IV still names `content/` as the home for editorial content.
- **Alternatives considered**: storing chapters in the blob store (adds a publish step); keeping chapters in the client bundle behind UI gating (rejected: violates RA-001).
- **Owner input needed**: edition manifest, source revision, rights, credits and publication approval (RA-010).

## R-04 Existing client paths that bypass verification

- **Status**: Finding — must be addressed by an implementation stage
- **Evidence (static inspection at `3b37b82`)**: route `ebook` → `EbookPage` reads `bookPages` from `bookContentLoader`; register v1.9.0 records `BookHomePage` and `WaitlistPage` handlers that navigate to `/ebook` or `/thank-you` without any request; `ThankYouPage` claims access without verification.
- **Decision**: protected reading must fetch through the chapter function; acknowledgement pages must use neutral wording until verification succeeds (RA-008, register direction "Truthful form feedback"). **No protected chapters should be bundled into the public client bundle**; they must be served exclusively through the chapter function once verification succeeds (RA-001, SC-004).
- **Update at `d3b0694`**: `src/content/book/` is now populated with the manuscript chapters, and route `ebook` still reads them through `bookContentLoader`, so they are part of the static client bundle and readable without verification. All bundled chapters must be stored in a server-only location not matched by `BOOK_SOURCE_GLOBS` until the chapter function (RA-035/RA-037) exists to serve them securely.
- **Not established**: runtime behaviour; which build is deployed to production.

## R-05 Code format and verification attempts

- **Status**: Selected direction (Clarifications Q5) for format and attempts; owner decision (decision 7) for the rest
- **Decision**: six-digit numeric code, stored hashed; it stops working after five wrong attempts and the reader must request a new code.
- **Proposed**: resend creates a new code and invalidates the previous one.
- **Rationale**: Short numeric codes suit mobile entry; five attempts leave roughly a 1-in-200,000 guessing chance per code.
- **Open**: resend cooldown and per-email/per-network request limits.

## R-06 Code validity start

- **Status**: Selected direction (Clarifications Q2)
- **Decision**: validity starts when the function creates the code; expiry is creation + 10 minutes; wording says "within 10 minutes of requesting it".
- **Alternatives considered**: provider acceptance time; email open time (not measurable).

## R-07 Device session credential

- **Status**: Proposal — awaiting Ash
- **Decision (proposed)**: an opaque random session identifier in an `HttpOnly`, `Secure`, `SameSite=Lax` first-party cookie; the email and reader identity stay server-side; sign-out deletes the server session and clears the cookie.
- **Rationale**: Meets RA-005 (no email in the browser credential; sign-out invalidates server access) and scopes access to one browser profile (RA-004).
- **Alternatives considered**: tokens in `localStorage` (readable by scripts; rejected); self-contained signed tokens (cannot be revoked server-side without a store).

## R-08 Renewal and session lifetime

- **Status**: Selected direction (Clarifications Q3)
- **Decision**: each fresh-code verification or renewal grants up to thirty days on that device/profile; renewals repeat with no overall ceiling.
- **Open**: the exact duration within thirty days (decision 5).

## R-09 Recovery and concurrent verification

- **Status**: Selected direction (Clarifications Q4) for the recovery-first race; owner decision (decisions 4 and 6) for the rest
- **Decision**: when matching recovery establishes a session first, a competing fresh-code request continues without ending it, and finishing the new code is optional. This confirms the Linear v1.13.0 selection in the repository; register 05 v1.9.0 predates it.
- **Rationale**: Recovery-first prevents readers from losing access when two tabs race to verify. If recovery wins, the reader gains a session immediately (better UX); if a fresh code finishes later, the same session extends, so there is no duplicate. This avoids session conflicts and respects the existing Linear v1.13.0 decision.
- **Alternatives considered**: Fresh-code-first (simpler logic, but loses recovery sessions if a competing fresh code wins); mutual exclusion (requires coordination on the reader record, adding latency); sequential race detection (more complex, same outcome as recovery-first).
- **Open**: recovery duration and start, session identity across linked tabs, and uncertain-outcome handling.

## R-10 Email provider

- **Status**: Owner decision (decision 1)
- **Requirements for any candidate**: transactional sending from a Netlify Function; delivery status reporting sufficient to distinguish "request accepted" from "delivery uncertain" (RA-008); provider log retention compatible with RA-006; a data-processing agreement.
- **Not evaluated**: no provider was contacted or compared.

## R-11 Newsletter separation

- **Status**: Owner decision (decision 8)
- **Decision (constraint)**: the reader-access functions never create a newsletter subscription; the newsletter journey has its own destination and double opt-in.

## R-12 Deployment trigger

- **Status**: Owner decision (decision 10)
- **Evidence**: pushing `docs/reader-access-plan` produced a Vercel preview (Vercel GitHub app) on 2026-11-12; the repository's `netlify.toml` configures Netlify builds. Which host serves production, and whether a push to `main` deploys automatically, is not established.
