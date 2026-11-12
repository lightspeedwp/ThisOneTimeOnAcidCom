# Reader access specification

| Field | Value |
| --- | --- |
| Proposed path | .github/specs/005-reader-access/ |
| Status | Draft documentation package; implementation not authorised |
| Owner | Ash; This One Time on Acid personal book project |
| Baseline | lightspeedwp/ThisOneTimeOnAcidCom@fe09574da48ecaff1b41c78ee6c1fa1dbe9bc66b |
| Language | UK English |

## Outcome

Provide truthful, secure access to the complete shorter website edition after server-authorised email verification. Newsletter consent remains separate and optional.

## Clarifications

Answers below are Ash's selected directions. They do not approve implementation, provider selection, publication or deployment.

### Session 2026-11-12

- Q: Where should the server-side check that a reader has verified their email run, given the site is a static app hosted on Netlify? → A: Netlify Functions on the existing host issue and check codes and serve protected chapters (Option A).
- Q: When does a code's ten-minute validity start? → A: When the Netlify Function creates the code; visitor wording says "within 10 minutes of requesting it" (Option A).

## Scope

Email and code forms, delivery copy, verification, expiry, recovery, renewal, revocation, sign-out, session lifetime, error states, separate newsletter consent, provider and manuscript dependencies, and reconciliation of the six 004 reader-access contracts.

Exclude podcast work, theme/style-guide/navigation work, indexing, manuscript rewriting/publication, PDF/payment/offline access, cross-device progress, provider provisioning, Supabase integration, application code, Linear changes, governance, catalogues, .specify/feature.json and the master task list.

## Requirements

- RA-001: Only valid server-authorised verified-email access may read the website edition or direct chapter URLs. Selected direction: authorisation, code issue/verification and protected chapter delivery run in Netlify Functions on the existing host; protected content is not included in the static bundle. Supabase remains excluded.
- RA-002: Codes are emailed, single-use and invalid after consumption or expiry.
- RA-003: A code expires ten minutes after the Netlify Function creates it; that server-recorded creation time is the authoritative start event. Visitor wording must say "within 10 minutes of requesting it" and must not imply ten minutes from email receipt. Resend, attempt and rate mechanics remain unresolved.
- RA-004: Returning access is device/profile-scoped and ends on sign-out, revocation, storage clearance or approved expiry; new devices require reverification.
- RA-005: Browser credentials contain no email; sign-out invalidates server access.
- RA-006: Access records contain only necessary email, verification status, internal ID and lifecycle timestamps; delete after twelve months without authenticated use. Provider logs/backups remain separate.
- RA-007: Newsletter signup is separate, optional and independently consented.
- RA-008: Feedback distinguishes pending, receipt, delivery uncertainty, verified access, invalid, expired, used, limited, provider-failure and unavailable-content states.
- RA-009: Recovery, renewal and concurrent redemption preserve authorised sessions and prevent duplicate effects.
- RA-010: Manuscript availability requires an approved edition manifest, source revisions, rights, credits and publication approval.
- RA-011: Historical 004 identifiers and reviewer markers remain source-qualified and unchanged.
- RA-012: Every implementation stage requires an exact preview, approval, fresh baseline, bounded path check, read-back and evidence.

## Acceptance scenarios

Given a reader requests a code and submits the current code before authoritative expiry, when the server validates it, then one authorised session permits online reading.

Given a submission, delivery or thank-you page occurs without verification, when feedback is shown, then it does not claim access or subscription.

Given matching recovery succeeds first during competing fresh verification, then the fresh request continues without disrupting recovery; completion remains optional.

Given recovery is absent, invalid, revoked, expired or uncertain, then the system falls back to fresh verification without guessing.

Given a reader declines newsletter consent, then reading remains possible when access requirements are met.

Given an unauthorised request targets a direct chapter, then protected content is not returned or publicly bundled.

## Historical requirement origins

Use 004/source-file#identifier@full-SHA; never redefine bare identifiers.

- 004/spec.md#FR-005@ff9b152f6b57dadb08d672acac9f1690d59988d4 maps to RA-001, RA-002, RA-008.
- 004/spec.md#FR-006@ff9b152f6b57dadb08d672acac9f1690d59988d4 maps to RA-003; Decision 7 remains separate indexing scope.
- 004/spec.md#FR-008@ff9b152f6b57dadb08d672acac9f1690d59988d4 maps to RA-003, RA-004, RA-007.
- 004/spec.md#FR-009–010@ff9b152f6b57dadb08d672acac9f1690d59988d4 maps to RA-011, RA-012.
- 004/contracts/prompt-3a-reader-access.md#CR-3A.1–3A.8@ff9b152f6b57dadb08d672acac9f1690d59988d4 maps to RA-001–008.
- 004/contracts/prompt-3b-recovery-flows.md#CR-3B.1–3B.6@ff9b152f6b57dadb08d672acac9f1690d59988d4 maps to RA-004, RA-009.
- 004/contracts/prompt-3c-error-states.md#CR-3C.1–3C.8@ff9b152f6b57dadb08d672acac9f1690d59988d4 maps to RA-003, RA-008.

Reader-access 3A/3B/3C is distinct from podcast 3A/3B/3C.

## Success criteria

SC-001 all requirements have source-qualified origins or are labelled proposed additions.
SC-002 no implementation, provider, publication or deployment claim is marked complete without evidence.
SC-003 all access states distinguish confirmed, unconfirmed and failed outcomes.
SC-004 direct and protected-content requests use the same server-authorisation contract.
SC-005 newsletter consent is independent.
SC-006 recovery, renewal, revocation and concurrency decisions are explicit before implementation.
SC-007 planned checks remain Not run until executed against a named revision/environment.

This documentation commit does not authorise implementation, moving 004 contracts, catalogue edits or deployment.
