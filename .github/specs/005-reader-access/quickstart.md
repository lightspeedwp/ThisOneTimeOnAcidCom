# Reader access validation guide

Phase 1 output for [plan.md](plan.md). These scenarios prove the feature end to
end once a stage is implemented. **Every result is Not run.** Running any of
them needs separate approval, a named revision and a named environment.

## Prerequisites

- An approved implementation stage on a named branch and revision.
- A non-production Netlify environment (deploy preview or local Netlify dev server). Installing the Netlify CLI or connecting a site needs separate approval.
- A test email provider account or sandbox (decision 1). No real reader addresses.
- A test edition manifest containing placeholder chapters only.

## Scenarios

| # | Scenario | Expected outcome | Maps to | Result |
| --- | --- | --- | --- | --- |
| Q-01 | Request a code, then submit it within 10 minutes of the request | `verified`; session cookie set; chapter loads | RA-001–RA-003 | Not run |
| Q-02 | Submit a code 10 minutes or more after the request | `code-expired`; no session | RA-003 | Not run |
| Q-03 | Submit the same code twice, including two submissions at the same moment | One `verified`, the other `code-used`; one session | RA-002, RA-009 | Not run |
| Q-04 | Load a chapter URL directly with no session | 401; no chapter text in the response or in the built JavaScript files | RA-001, SC-004 | Not run |
| Q-05 | Inspect the production build output for edition text | No protected chapter text found | RA-001 | Not run |
| Q-06 | Sign out, then reload a chapter | 401; the old session identifier no longer works | RA-005 | Not run |
| Q-07 | Inspect cookies and browser storage after verification | No email address present | RA-005 | Not run |
| Q-08 | Verify on a second browser profile | Requires its own code; first profile unaffected | RA-004 | Not run |
| Q-09 | Renew with a fresh code near the end of a session | `expiresAt` moves forward by up to 30 days | RA-004 | Not run |
| Q-10 | Request access while declining the newsletter | Reading works; no subscription created | RA-007, SC-005 | Not run |
| Q-11 | Exceed the attempt or request limit | `limited` state with accessible feedback | RA-008 | Not run |
| Q-12 | Simulate a provider failure | `provider-failure`; no claim that an email was sent | RA-008 | Not run |
| Q-13 | Request a chapter outside the approved manifest | `content-unavailable` | RA-010 | Not run |
| Q-14 | Keyboard, focus, screen-reader and contrast review of forms and states | Meets the WCAG 2.2 AAA target (not a conformance claim) | RA-008 | Not run |

Detailed request and response shapes are in
[contracts/reader-access-functions.md](contracts/reader-access-functions.md);
entity rules are in [data-model.md](data-model.md).
