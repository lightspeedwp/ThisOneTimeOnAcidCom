# Reader access functions contract

Phase 1 interface contract for the server functions selected in Clarifications
Q1. It defines request and response behaviour only; paths, status codes and
field names are proposals for review, and no function exists yet.

This contract does not replace or duplicate the 004 Figma Make reader-access
contracts (prompt-3a, 3b, 3c), which remain in 004 as historical UI sources.

## Common rules

- All responses use JSON and `Cache-Control: no-store`.
- The session cookie is `HttpOnly`, `Secure`, `SameSite=Lax`, first-party, and carries only an opaque session identifier (RA-005).
- Responses never reveal whether an email address is already known.
- Every response carries a `state` value from the data model's reader-visible states.

## Request a code

`POST /api/reader/code-requests` — body `{ "email": string }`

| Outcome | Status | `state` |
| --- | --- | --- |
| Accepted for sending | 202 | `request-received` — neutral wording; never claims delivery |
| Provider reports a failure | 502 | `provider-failure` |
| Request limit reached | 429 | `limited` |
| Malformed email | 400 | `code-invalid` |

Creates a VerificationCode with `created_at` = server time (RA-003). Does not
create a session, a reader record or a newsletter subscription.

## Verify a code

`POST /api/reader/verifications` — body `{ "email": string, "code": string }`

| Outcome | Status | `state` |
| --- | --- | --- |
| Valid, unexpired, unused | 200, sets cookie | `verified` |
| Wrong code | 400 | `code-invalid` |
| Expired | 410 | `code-expired` |
| Already consumed | 410 | `code-used` |
| Attempt limit reached | 429 | `limited` |

A success consumes the code atomically and starts or renews a DeviceSession for up
to thirty days (RA-004). Concurrent submissions of the same code yield one
success (RA-009). Recovery behaviour is deferred (research R-09).

## Session status

`GET /api/reader/session`

| Outcome | Status | Body |
| --- | --- | --- |
| Active session | 200 | `{ "state": "verified", "expiresAt": string }` |
| No, expired or revoked session | 401 | `{ "state": "request-pending" }` |

Returns no email or reader identifier.

## Sign out

`DELETE /api/reader/session` → 204. Ends the server session and clears the
cookie (RA-005). Signing out an already-ended session also returns 204.

## Read a chapter

`GET /api/reader/chapters/{chapterId}`

| Outcome | Status | `state` |
| --- | --- | --- |
| Active session and chapter in an approved manifest | 200 with chapter content | `verified` |
| No valid session | 401 | `request-pending` — no content returned |
| Unknown chapter | 404 | `content-unavailable` |
| Edition not approved or source unavailable | 503 | `content-unavailable` |

Direct chapter URLs in the application use this same check (SC-004). Chapter
text is never part of the static client bundle (RA-001).
