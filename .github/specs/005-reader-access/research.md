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
- **Decision (constraint)**: The protected edition must be readable only by the chapter function. It must not be matched by `import.meta.glob` in `src/app/utils/bookContentLoader.ts`, which eagerly bundles `/src/content/book/**/*.md` into the client.
- **Proposed option**: keep the approved edition under `content/` (constitution IV) and ship it to the function as server-only files.
- **Alternatives considered**: storing chapters in the blob store (adds a publish step); keeping chapters in the client bundle behind UI gating (rejected: violates RA-001).
- **Owner input needed**: edition manifest, source revision, rights, credits and publication approval (RA-010).

## R-04 Existing client paths that bypass verification

- **Status**: Finding — must be addressed by an implementation stage
- **Evidence (static inspection at `3b37b82`)**: route `ebook` → `EbookPage` reads `bookPages` from `bookContentLoader`; register v1.9.0 records `BookHomePage` and `WaitlistPage` handlers that navigate to `/ebook` or `/thank-you` without any request; `ThankYouPage` claims access without verification.
- **Decision**: protected reading must fetch through the chapter function; acknowledgement pages must use neutral wording until verification succeeds (RA-008, register direction "Truthful form feedback").
- **Not established**: runtime behaviour; whether `/src/content/book` is populated in any deployed build.

## R-05 Code format and verification attempts

- **Status**: Owner decision (decision 7)
- **Proposed**: six-digit numeric code; stored hashed; a code is invalidated after a small fixed number of wrong attempts; resend creates a new code and invalidates the previous one.
- **Rationale**: Short numeric codes suit mobile entry; attempt limits keep guessing odds low within the ten-minute window.
- **Open**: exact attempt limit, resend cooldown and per-email/per-IP request limits; the "limited" feedback state (RA-008) depends on these.

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

- **Status**: Owner decision — deferred (clarify Question 4 not answered)
- **Recorded source**: Linear v1.13.0 says a competing fresh-code request continues when matching recovery succeeds first, completion optional. Repository register 05 v1.9.0 still lists the race as unresolved.
- **Open**: confirmation of that rule, recovery duration and start, session identity across linked tabs, and uncertain-outcome handling (decisions 4 and 6).

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
