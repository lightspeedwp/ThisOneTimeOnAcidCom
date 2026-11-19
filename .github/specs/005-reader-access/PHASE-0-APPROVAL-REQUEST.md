# Phase 0 Owner Approval Request
## Reader Access (Spec 005) — Blocking Decisions RA-T006, RA-T007, RA-T009

**Date**: 2026-11-19 | **Status**: Awaiting approval to unblock Phase 1 | **For**: @ashley

---

## Executive Summary

Phase 8 Convergence is complete: Constitution Amendment (RA-T053) ✓ and chapter bundling restriction (RA-T054) ✓ are merged to main.

**Three Phase 0 owner decisions remain** and block all Phase 1–7 implementation:

1. **RA-T006** — Edition manuscript availability, rights, credits, publication approval
2. **RA-T007** — Recovery & renewal mechanics, resend/request-rate controls  
3. **RA-T009** — Privacy notice, reviewer, operator, deletion procedures

**What's already decided** (from Clarifications 2026-11-12 + decisions resolved 2026-11-19):
- ✅ Server: Netlify Functions on existing host
- ✅ Email: Mailgun for transactional SMTP
- ✅ Storage: Netlify Blobs for codes/records + `netlify/functions/protected-content/` for edition
- ✅ Newsletter: Brevo (double opt-in via workflows)
- ✅ Code format: 6-digit, single-use, 5 wrong attempts, 10-minute expiry
- ✅ Session: HttpOnly cookie, opaque token, device-scoped
- ✅ Renewal: up to 30 days per fresh-code, repeatable with no ceiling
- ✅ Recovery: recovery-first race (recovery session wins, fresh request continues)
- ✅ Constitution: v1.0.1 amended (editorial content = `src/content/`)

---

## Three Blocking Decisions

### 1️⃣ RA-T006: Edition Manuscript & Publication Authority

**Requirement**: RA-010 — Manuscript availability requires an approved edition manifest, source revisions, rights, credits and publication approval.

**Current State**:
- Book chapters currently live in `src/content/book/01-part-1-early-life/`, `02-part-2-carefree-20s/`, etc. (6 directories).
- These are bundled into the client via `bookContentLoader.ts` and are publicly readable.
- Decision 11 (resolved 2026-11-19): protected edition will be stored in `netlify/functions/protected-content/` (server-only, not bundled).

**What needs approval**:

| Item | Decision Needed | Impact on Phase 1–7 |
| --- | --- | --- |
| **Edition manifest** | Which chapters/sections comprise the "complete shorter website edition"? | Phase 2 (RA-T027 reads manifest) + Phase 3 (RA-T035 serves chapters) |
| **Manuscript source revision** | Exact Git commit/branch + which files are authoritative? | Baseline for all chapter bundling decisions |
| **Rights & credits** | Author, copyright, any third-party content rights? | RA-010 requirement; delivery must be truthful |
| **Publication authority** | Who approves which chapters go live and when? | Workflow for staged chapter releases per "Early release" decision |

**Option A (Recommended)**: Provide edition manifest now (list of approved chapters)
- **Pro**: Unblocks Phase 2 implementation immediately; server can read actual chapter paths
- **Pro**: Enables staged testing with real chapters
- **Con**: Requires decision on which chapters are "ready" now
- **Effort**: 30 minutes to list approved chapters + confirm source revision

**Option B**: Use placeholder chapters for Phase 1–3 development
- **Pro**: Phase 1–3 can proceed with mock chapters; real manifest can follow later
- **Con**: Requires a second pass to swap in real edition once approved
- **Con**: Reader testing must use placeholders (not representative)
- **Effort**: 2–3 hours rework when real chapters arrive

**Option C**: Defer to Phase 3 (US1 implementation)
- **Pro**: Keeps Phase 1 narrow (infrastructure only)
- **Con**: Phase 2 (RA-T027 edition reader) cannot be tested until Phase 3
- **Con**: Delays US1 MVP by 1 phase
- **Effort**: 1–2 days lost to downstream dependencies

**Recommendation**: **Option A** — provide the edition manifest and source revision now. This unblocks Phase 2 and enables true end-to-end testing in Phase 3.

---

### 2️⃣ RA-T007: Recovery & Renewal Mechanics + Abuse Controls

**Requirements**: RA-003, RA-004, RA-009 — Device sessions, renewal scope, recovery, concurrency.

**Already Decided**:
- ✅ Codes valid 10 minutes from creation (Clarifications Q2)
- ✅ Each fresh-code verification or renewal grants **up to 30 days** (Clarifications Q3)
- ✅ Renewals repeat with **no overall ceiling** (Clarifications Q3)
- ✅ Recovery-first race: when matching recovery wins, fresh-code request continues (Clarifications Q4)
- ✅ Codes stop working after 5 wrong attempts (Clarifications Q5)

**Still Unresolved**:

| Item | Decision Needed | Affects |
| --- | --- | --- |
| **Renewal duration** | Exactly how many days within the 30-day upper bound? (e.g., 28d, 30d) | RA-T034, RA-T041 (renew logic) + user experience (session persistence) |
| **Recovery duration & start** | How long does a recovered session last? When does the timer start? (e.g., 7d from last auth, 30d from first recovery, no limit?) | RA-T048 (recovery implementation) + Phase 6 testability |
| **Resend cooldown** | Minimum time between requesting new codes? (e.g., no cooldown, 60s, 5m) | Abuse control; Phase 1 (RA-T020 adds Mailgun SDK) |
| **Request-rate limits** | Max codes per email/IP per timeframe? (e.g., 10/day, 3/hour) | Abuse control; infrastructure design |
| **Revocation** | Can you revoke an active session before its expiry? How? Admin only or user-initiated? | RA-009 requirement; Phase 7 cleanup (RA-T050) |

**Option A (Recommended)**: Accept researched defaults
- Renewal duration: **30 days** (matches recovery upper bound; simpler logic)
- Recovery duration: **30 days from last authentication** (matches renewal; consistent user model)
- Resend cooldown: **60 seconds** (prevents accidental/spam resends; common pattern)
- Request-rate limits: **10 codes per email per day** (rate-limits abuse; allows ~1 weekly reader)
- Revocation: **User-initiated via sign-out only** (simpler; sign-out already clears server session)

| Sub-Option | Rationale |
| --- | --- |
| **A1 (Lenient)** | Longer durations (30d renewal + 30d recovery); higher rate limit (20/day); manual admin revocation available | Pro: User-friendly; Con: Higher operational/security burden |
| **A2 (Balanced)** | 30d + 30d; 10/day; sign-out only (Recommended) | Pro: Clear, low-ops, familiar model; Con: No manual revocation if abuse detected |
| **A3 (Strict)** | 14d renewal; 7d recovery; 5/day; admin revocation required | Pro: Stricter abuse controls; Con: Frequent re-auth friction |

**Option B**: Defer to Phase 2 (RA-T023 codes.ts implementation)
- **Pro**: Decisions can be reviewed once implementation details are clearer
- **Con**: Phase 2 code will need rewrites if decisions change
- **Con**: Testing becomes speculative (don't know the actual timeouts)
- **Effort**: 1–2 days rework; test coverage delayed

**Recommendation**: **Option A2 (Balanced)** — the researched defaults fit the design and reduce operational complexity:
- 30d renewal + 30d recovery = consistent, easy to explain to users
- 60s resend cooldown = standard rate-limit pattern
- 10/day per email = allows normal use, rate-limits abuse
- Sign-out only revocation = aligns with RA-005 (sign-out invalidates server access)

---

### 3️⃣ RA-T009: Privacy Notice, Reviewer, Operator & Deletion Procedures

**Requirement**: RA-006 — Access records contain only necessary email, verification status, ID and timestamps; delete after 12 months without authenticated use.

**Current State**:
- Constitution IV requires privacy review (not explicitly stated, but operator transparency is a safeguard)
- Brevo (newsletter) has its own privacy/deletion workflow; reader-access storage is separate
- Mailgun provides 30-day transactional logs (standard retention); beyond that is storage, which we control

**What needs approval**:

| Item | Decision Needed | Consequence |
| --- | --- | --- |
| **Privacy reviewer** | Who reviews the privacy notice for accuracy and compliance? (e.g., Ash, external legal counsel, internal privacy team) | Phase 1 (RA-T021 visitor copy) must include the reviewed notice |
| **Privacy notice** | Exact wording disclosed to readers (e.g., "Your email and access history are stored for 12 months and then deleted" + data controller, processor, rights disclosure) | RA-008 (feedback states); RA-T036 (form UI) |
| **Data controller & processor** | Who is responsible for the data? (Ash/This One Time = controller; Netlify/Mailgun = processors) | Privacy notice must name them per GDPR/privacy law |
| **Support-access disclosure** | Can support/admin access reader records for debugging? (e.g., yes, with audit log; no, never) | Phase 7 (RA-T051 verification) + operational procedures |
| **Deletion procedure** | How are records deleted after 12 months? (e.g., automated Netlify Blobs cleanup, manual export+delete, Brevo API call) | Phase 7 (RA-T050 retention.ts scheduled function) |

**Option A (Recommended)**: Owner-reviewed notice + simple deletion
- **Privacy reviewer**: Ash (you have product authority; external review can follow at launch)
- **Notice wording**: Draft at RA-T021; Ash approves before Phase 1 ships
- **Data controller**: Ash/This One Time (the book project)
- **Support access**: Audit log only (read-only access to debug, logged)
- **Deletion**: Automated Netlify Blobs cleanup after 12 months (no auth in past 365d); Brevo newsletter deletion is separate

| Sub-Option | Trade-off |
| --- | --- |
| **A1 (Lightweight)** | Ash reviews notice; support access logged; automated deletion | Pro: Moves fast; Con: Requires audit logging setup (small effort) |
| **A2 (Formal)** | External legal review; strict support access (admin only, Ash approval per access); manual deletion audit | Pro: Higher compliance confidence; Con: Slower to launch, higher ops burden |

**Option B**: Defer privacy review to Phase 7 (RA-T049–RA-T051)
- **Pro**: Can proceed with implementation while review happens in parallel
- **Con**: Phase 1 visitor copy (RA-T021) cannot include the final notice
- **Con**: Readers see a placeholder until Phase 7 completes; adds confusion
- **Effort**: Phase 1 rework when notice arrives

**Option C**: Use a generic privacy template from Netlify/Supabase docs
- **Pro**: No review needed; "good enough" baseline
- **Con**: Not specific to this project; may not cover all data flows
- **Con**: Legally risky if incomplete

**Recommendation**: **Option A1 (Lightweight)** — owner review by Ash. The data flow is simple (Mailgun → email, Netlify Blobs → storage, Brevo → newsletter), so a straightforward notice is sufficient. External review can happen post-launch if desired:

- **Approval needed from Ash**:
  - ✅ Confirm Ash is data controller (yes/no/other)
  - ✅ Approve support access via audit log
  - ✅ Approve automated 12-month deletion
- **Ash then drafts & approves**:
  - Privacy notice text (at RA-T021 time)
  - Data controller statement (name, contact)
  - Deletion procedure (Netlify Blobs TTL setting)

---

## Summary Table: What Needs Your Decision

| Task | Category | Current State | Decision Needed |
| --- | --- | --- | --- |
| **RA-T006** | Manuscript | Chapters in `src/content/book/`; will move to `netlify/functions/protected-content/` | Edition manifest (list of approved chapters) + source revision |
| **RA-T007a** | Renewal duration | Up to 30d decided; exact amount open | 30d (recommended) or other (12d, 14d, 20d, 28d?) |
| **RA-T007b** | Recovery duration | No decision yet | 30d from last auth (recommended) or other? |
| **RA-T007c** | Resend cooldown | No decision yet | 60s (recommended) or other? |
| **RA-T007d** | Request-rate limit | No decision yet | 10/day per email (recommended) or other? |
| **RA-T007e** | Revocation | No decision yet | Sign-out only (recommended) or admin revocation? |
| **RA-T009a** | Privacy reviewer | None yet | Ash (recommended) or external counsel? |
| **RA-T009b** | Support access | None yet | Audit log only (recommended) or other? |
| **RA-T009c** | Deletion procedure | None yet | Automated Netlify TTL (recommended) or manual? |

---

## Next Steps

**To unblock Phase 1**, please provide approval/decisions for:

1. **RA-T006**: Edition manifest (chapter list) + source revision
2. **RA-T007**: Renewal/recovery duration, resend cooldown, rate limit, revocation (or accept recommended defaults)
3. **RA-T009**: Privacy reviewer, support-access policy, deletion procedure (or accept recommended defaults)

**Once approved**:
- Phase 0 tasks RA-T006, RA-T007, RA-T009 marked complete
- Phase 1 (shared infrastructure) can begin: `netlify/functions/`, dependencies, visitor copy
- Phase 2 (foundational) can begin: storage adapter, codes, session, response helpers
- Phases 3–7 (user stories + polish) follow in sequence

**Timeline**:
- With decisions now: Phase 1 starts tomorrow; Phase 2 starts end of week; Phase 3 (MVP) next week
- With decisions deferred: Each day adds 1 day to Phase 1 completion; cascades into Phases 2+

---

## Attachment: Recommended Decisions (Quick Reference)

If you approve the recommendations:

```yaml
RA-T006: Edition manifest = {approved chapter list}
         Source revision = {git commit/branch}

RA-T007: Renewal duration = 30 days
         Recovery duration = 30 days from last authentication
         Resend cooldown = 60 seconds
         Request-rate limit = 10 codes per email per 24h
         Revocation = User-initiated via sign-out only

RA-T009: Privacy reviewer = Ash (product owner)
         Support access = Read-only via audit log
         Deletion procedure = Automated Netlify Blobs TTL (12 months no-auth)
```

---

**Ready to review.** Please respond with decisions or confirmations, and Phase 1 implementation can begin immediately.
