# Reader access decisions and provenance

## Bounded direction

The source packet records: complete shorter website edition after verification; passwordless emailed single-use codes; ten-minute policy; maximum thirty-day returning access per device; separate optional newsletter; purpose-limited records deleted after twelve months without authenticated use; online reading only at launch.

These are product boundaries, not provider, architecture, implementation, publication or deployment approval.

## Current Linear selections

The v1.13.0 register records that a competing fresh-verification request continues when matching recovery succeeds first, without disrupting recovery; completion remains optional; and an authoritative later fresh-code redemption may restart up to thirty days for a still-valid matching recovered session, repeatedly without an overall ceiling.

The register does not settle provider behaviour, concurrency mechanics, recovery duration/start, exact renewal duration, additional-session coexistence, absent/invalid/uncertain sessions, abuse controls or feasibility. The two 9 November selections are evidenced by a supplied handover rather than independently retrieved original chat messages.

## Decisions recorded 2026-11-13

Ash recorded these while resolving review feedback on Spec 004 (PR #589):

- **Ownership**: reader access, recovery and error-state work (historically Spec 004 Prompts 3A–3C) is owned by this specification, which defines its own flow, stages and dependencies. Spec 004 identifiers stay unchanged as historical references (RA-011).
- **Early release**: build all reader screens and functionality now. Chapters and addendums are published one at a time as Ash approves each. The website edition is shorter than the printed book and will be offered for sale via the website at a later stage. Full-manuscript approval no longer gates the screens; per-chapter approval gates publication. This narrows unresolved decision 2 below.
- **Content location**: Ash is moving the root `content/` folder to `src/content/`.
- **Delivery email copy**: approved wording is recorded in [Spec 004 Prompt 3A contract](../004-book-website-make/contracts/prompt-3a-reader-access.md) (Email Copy section).

**Open conflict**: Spec 004 records recovery as ending 30 days after initial verification with no extension, while the v1.13.0 register (above) allows a later fresh-code redemption to restart up to thirty days repeatedly without an overall ceiling. Resolve under unresolved decisions 4 and 5.

## Unresolved decisions

1. Provider and transactional email, capabilities and retention.
2. Edition manifest, manuscript availability, rights, credits and publication approval.
3. Expiry authoritative event and user-visible timing.
4. Recovery duration, start event, session identity and storage fallback.
5. Exact renewal duration within the thirty-day upper bound.
6. Concurrency ordering, duplicate effects, revocation and sign-out.
7. Resend, attempt and rate controls.
8. Newsletter destination, double opt-in, consent wording and deletion.
9. Privacy reviewer, notice, support-access disclosure and deletion procedure.
10. Deployment trigger and production authority.

## Approval distinctions

Wording approval, selected direction, register-save approval, implementation authority, verification, acceptance, publication and deployment remain distinct. The commit records documentation only.
