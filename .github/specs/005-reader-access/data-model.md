# Reader access data model

Phase 1 output for [plan.md](plan.md). Entities are logical; the storage
technology is open (research R-02). Fields marked *open* depend on unresolved
decisions. Nothing here is implemented.

## VerificationCode

One emailed single-use code (RA-002, RA-003).

| Field | Notes |
| --- | --- |
| `id` | Opaque random identifier |
| `email_normalised` | Lower-cased, trimmed; used only to send and match the code |
| `code_hash` | Salted hash; the plain code is never stored |
| `created_at` | Server time when the function creates the code — the authoritative validity start |
| `expires_at` | `created_at` + 10 minutes |
| `attempt_count` | Wrong submissions; the limit is *open* (R-05) |
| `consumed_at` | Set once on successful verification |
| `status` | `issued` → `consumed` \| `expired` \| `invalidated` |

**Rules**: consume at most once, atomically; a consumed or expired code is never
reactivated; issuing a resend invalidates the previous `issued` code for the same
email (*open*: confirm under R-05).

## ReaderAccessRecord

The purpose-limited record of a verified reader (RA-006).

| Field | Notes |
| --- | --- |
| `reader_id` | Internal identifier; never sent to the browser |
| `email_normalised` | Necessary for sending codes |
| `verification_status` | `verified` once any code has been consumed |
| `first_verified_at` | Lifecycle timestamp |
| `last_authenticated_at` | Updated on each successful verification or authorised session use |
| `delete_after` | `last_authenticated_at` + 12 months |

**Rules**: no other personal data; provider logs and backups are governed
separately; no newsletter fields.

## DeviceSession

Returning access for one browser profile (RA-004, RA-005).

| Field | Notes |
| --- | --- |
| `session_id` | Opaque random value stored in the cookie; contains no email |
| `reader_id` | Links to ReaderAccessRecord, server-side only |
| `created_at` | Session start |
| `expires_at` | ≤ 30 days after the latest fresh-code verification or renewal; exact duration *open* |
| `renewed_at` | Latest renewal time; renewals repeat with no overall ceiling |
| `ended_at` / `end_reason` | `signed_out` \| `revoked` \| `expired` |

**State transitions**: `active` → `renewed` (fresh code on the same profile;
`expires_at` resets) → `ended`. A new device or profile, or cleared storage, has
no session and needs fresh verification.

## RecoveryAttempt — deferred

Recovery after confirmed redemption but incomplete session establishment
(register v1.8.0 candidate). Fields, lifetime, identity across linked tabs and
race handling are *open* (research R-09). Not modelled until decided.

## EditionManifest

Governs what the chapter function may serve (RA-010).

| Field | Notes |
| --- | --- |
| `edition_id` | The approved shorter website edition |
| `source_revision` | Commit or content revision the edition is built from |
| `chapters` | Ordered list of chapter identifiers and titles |
| `rights_cleared`, `credits` | Required before publication |
| `publication_approved_by`, `publication_approved_at` | Owner approval record |

**Rule**: the chapter function returns "content unavailable" for any chapter not
in an approved manifest.

## Reader-visible states (RA-008)

`request-pending`, `request-received` (neutral acknowledgement, no delivery
claim), `delivery-uncertain`, `verified`, `code-invalid`, `code-expired`,
`code-used`, `limited` (*open*: definition under R-05), `provider-failure`,
`content-unavailable`. Newsletter states are outside this model.
