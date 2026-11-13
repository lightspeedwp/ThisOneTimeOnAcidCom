# TOA - PRD — Website and reading experience

| Field | Value |
| -- | -- |
| Version | 1.1.1 |
| Document status | provisional draft; needs substantial revision; not implementation- or launch-ready |
| Last revised | 2026-11-04 (Asia/Bangkok) |
| Product / feature | Website and reading experience |
| Related project | [This One Time on Acid — book](<https://linear.app/lightspeedwp/project/this-one-time-on-acid-book-f9e95edbb528>) |
| Repository | [lightspeedwp/ThisOneTimeOnAcidCom](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom>), `develop@eeb4b185ef0b4a96c99721adebba44cee1f2b037` |
| Audience | product, editorial, design, engineering and QA reviewers |
| Historical revision reference | 0.1 baseline — 26 October 2026; approved website-edition scope revision — 27 October 2026 |
| Approved baseline and approval evidence | See the preserved baseline and 27 October access/privacy/offline reconciliation, the dated 4 November reconciliation and source-evidence section, and Review, approval and change history. Decision approval, register-save approval and approval to save this PRD revision are distinct. |
| Review responsibility | Ash is project lead and holds design and final editorial/publication authority; specialist reviewers and release authority remain unconfirmed. |

Document versions use SemVer-style increments for this PRD: patch for compatible corrections, minor for compatible additions and major for incompatible requirements or commitments. Unsaved previews and no-op reviews do not increment the saved version. Ash approved adopting this convention for this PRD with the exact revision 1.1.0 save proposal on 4 November 2026 at 21:27 Asia/Bangkok. No project-wide adoption is asserted.

## Document control

* **Baseline:** discovery records Ash’s earlier 25–26 October complete-manuscript launch baseline and verified-email access approval. On 27 October 2026 at 09:34 Bangkok, Ash approved replacing the full-length manuscript launch scope with a complete, self-contained shorter website edition of approximately 100–150 pages in an agreed reference layout. It is not a sample chapter or the complete long-form manuscript. Free website reading remains restricted to readers who verify their email, including direct chapter access. Newsletter signup remains separate and optional. Full-length print, commercial e-book and audiobook editions are future plans with no agreed length, date or launch commitment. PDF delivery and e-commerce/printed sales remain outside website launch. That edition approval did not select verification/provider details or establish editorial, full privacy, implementation or launch approval; the later access-policy approval below selects the verification method and lifecycle only.
* **Access/privacy/offline reconciliation — 27 October 2026:** at 09:26 UTC / 16:26 Asia/Bangkok, Ash approved recording the policy detailed below in DEC-001, DEC-003, DEC-006 and this PRD: passwordless single-use emailed codes expiring after 10 minutes with resend/attempt controls; server-enforced valid authorisation including direct chapters without publicly bundled manuscript content; maximum 30-day returning access per device; minimal purpose-limited reader records deleted after 12 months without authenticated use; separate optional newsletter double opt-in; and deferral of manuscript offline downloads from v1.0 without intentional chapter caching for offline access. The earlier session-only email retention and cross-session offline exception are historically preserved but superseded for launch at policy level. Provider lifecycle, privacy review/procedures and technical feasibility remain unresolved. No provider, repository-policy amendment, implementation, testing, publication or launch is approved.

### Scoped decision clarification — 28 October 2026

Ash approved the decision wording below. This records bounded requirements and unresolved decisions, not implementation, testing, publication or launch authorisation. Earlier approvals and history remain preserved; existing REQ and AC IDs are unchanged.

**Access and architecture.** Retain single-use emailed codes expiring after 10 minutes, maximum 30-day returning access per device and reader-record deletion after 12 months without authenticated use. Preserve earlier termination on sign-out, revocation or relevant-storage clearance, reverification on expiry/new devices, email-free browser credentials and server-invalidating sign-out. Require server authorisation for every manuscript/chapter request without public manuscript bundles.

DEC-002 records a conditionally preferred Netlify server-functions/Supabase Auth/private-storage direction, not implementation acceptance. Do not integrate Supabase while repository prohibitions remain in force; any required amendment needs separate explicit approval through the applicable process. The capture-only planning proposal does not authorise authentication or protected delivery. Provider suitability/configuration, transactional email, numeric resend/attempt/rate controls, privacy review/procedures and provider delivery/log/backup retention and deletion remain unresolved.

**Contact, newsletter and measurement.** Distinguish stored contact receipt, confirmation-email outcome, Brevo-confirmed newsletter double opt-in and manuscript verification. Email delivery or a thank-you-page visit alone proves neither subscription nor successful conversion. Prevent duplicate pending submissions; retain entered submission data for retry where applicable after failure, without bypassing verification or reporting false success. If contact storage succeeds but confirmation-email processing fails, report those outcomes separately.

Exclude enquiry text, email addresses, verification codes and credentials from analytics. Retain the existing additional reporting exclusions and proposal-only measurement worksheet. Contact processing requires its own approved fields, purpose, permissions, retention, deletion, operator and confirmation behaviour; manuscript policy does not authorise it. Exact contact-processing providers, analytics events, payloads, destinations and operational details remain unresolved and require approval before collection or tracking.

**Publication and handoff.** Retain the complete, self-contained shorter website edition, with approximately 100–150 pages as an indicative direction in an agreed reference layout, not fixed responsive pagination. Exact publication content requires an edition-specific manifest recording canonical sources and revisions, order, factual verification, assets, rights, credits and Ash’s final publication approval.

Existing portfolio exclusions remain unchanged; no copying or adaptation is authorised, and any future proposal requires separate approval. Preserve the recorded launch inventory, journal/blog condition of at least three approved entries and a clear purpose, and podcast condition of at least one approved item and a clear purpose. Manuscript offline downloads remain deferred from v1.0, without intentional chapter caching for offline access.

Preserve the recorded WCAG 2.2 AAA target without downgrade; support-matrix, design-source precedence, fallback and review decisions remain unresolved. Map requirements and acceptance evidence to existing work without creating new issues or treating issue existence as passing coverage.

### Reconciliation and source evidence — 4 November 2026

This dated reconciliation records later decisions without changing the dates or scope of earlier approvals. Historical statements that design precedence or business conversion definitions remained unresolved describe their earlier baseline; the scoped decisions below clarify the current position.

**Design authority and precedence.** The book brief is the starting design baseline. Ash approves exact reconciled values; existing CSS, theme JSON and unverified Figma do not automatically take precedence. Preserve the recorded WCAG 2.2 AAA target. Support-matrix, fallback and acceptance evidence remain unresolved.

**Decision evidence.**

* The 4 November handover supplied by Ash confirms the typography, palette, layout and retained-page visibility directions. The original approval dates for all those earlier decisions were not independently established in this reconciliation; do not assign them a 28 October date.
* Ash approved the displayed dark interaction-colour candidates on 4 November 2026 at 14:30 Asia/Bangkok, subject to the stated checks—not as verified accessibility results.
* Ash selected preservation of both themes with dark-mode reconciliation first on 4 November 2026 at 11:31 Asia/Bangkok. That selection did not authorise removing existing light support.
* The author-decisions brief records Ash’s 28 October approval of business conversion definitions and counting rules. Instrumentation, collection and operational privacy remain separately unapproved.
* Ash approved creating the design and reader decision register on 4 November 2026 at 20:59 Asia/Bangkok. That approval covered recording the displayed register, not adoption of R3, T1, RT2 or C1 and not saving this PRD revision.

The visibility direction requires speaking/workshops, events and media/press to remain publicly accessible at retained direct URLs, without menu/footer links and with noindex directives; they must not be deleted or made private. Content claims, assets and publication permissions remain separately gated. Deployment was user-reported; effective noindex and Google removal were not verified.

No decision above authorises implementation, tracking, repository-policy ratification, test execution, publication or launch.

## Problem and context

TOA needs a publication-ready website that introduces the book, supports separate optional newsletter subscriptions and provides reliable, free reading of a complete, deliberately shorter website edition after email verification, not PDF delivery. This edition must offer a satisfying narrative arc in its own right rather than an isolated sample chapter or unfinished extract.

The shorter edition is intended to lower the commitment required to discover the story, build reader interest and offer readers a separate choice to receive updates about future commercial editions. These are product hypotheses, not established conversion outcomes or permission to reuse manuscript-entry emails for marketing.

Recorded review findings identify inconsistent email-entry enforcement, mobile text obstruction and reading-position changes. Existing manuscript coverage does not prove that every chapter is complete, verified or approved for publication.

Current sources also disagree about backend architecture and deployment readiness. This PRD preserves agreed product outcomes without treating proposed technical plans as approved implementation.

## Users and jobs to be done

These roles are inferred from existing scope, not validated audience research.

| Role | Job | Principal journey |
| -- | -- | -- |
| Prospective reader | Understand the book and read a satisfying shorter edition free online on the website | Book information → email entry → verify emailed single-use code within 10 minutes → server-authorised complete website edition |
| Returning reader | Continue with valid device access without losing their place | Reopen reader → establish valid authorisation within the maximum 30-day device lifecycle → recover logical location; reverify after expiry or on a new device |
| Newsletter subscriber | Receive updates knowingly | Signup → confirmation → subscription → unsubscribe |
| Author/editor | Preserve the fuller narrative while preparing an approved shorter website edition | Compare repository and Linear drafts → decide edition treatment → approve website publication manifest |

Failure journeys include invalid submissions, delivery without verification, expired/used codes, resend/attempt controls, incomplete or failed verification, provider failure, unavailable content, lost browser storage and interrupted reading. Maximum 30-day device access ends earlier on sign-out, revocation or clearance of relevant storage; sign-out must invalidate server access, and expiry/new devices require verification again. No email belongs in the browser access credential. Returning access does not include cross-device reading-progress synchronisation. The earlier cross-session offline exception is explicitly superseded for launch: online verified reading only, with manuscript offline downloads deferred and no intentional chapter caching for offline access.

## Outcomes and success measures

| Outcome | Measure | Baseline | Target / method | Responsibility |
| -- | -- | -- | -- | -- |
| Complete website-edition availability | Approved website-edition sections available and correctly ordered | Edition selection and full coverage unverified | Match approved website-edition publication manifest; inspect production build | Editorial and QA roles unassigned |
| Reliable reading continuity | Location retained across supported layout changes | Recorded position changes | Pass approved continuity scenarios | Unassigned |
| Trustworthy newsletter journey | Confirmed signup and unsubscribe behaviour | End-to-end verification outstanding | Verify provider records and user feedback | Newsletter operator unconfirmed |
| Correct verified-email access | Fresh, returning and direct chapter journeys require valid server-authorised verified-email access | Fresh-session bypass recorded | Validate DEC-001’s approved code/device lifecycle and direct-content enforcement after provider/architecture and operational privacy resolution | Ash approved product policy; technical feasibility unverified and validation owner unassigned |

No supported conversion, traffic, performance or commercial targets are available. Ash approved the business conversion definitions and counting rules on 28 October 2026: count successful reader verifications including reverification, not unique readers; count newsletter subscriptions only after Brevo confirms intended-list double opt-in, distinguishing new subscriptions and resubscriptions where reliable evidence permits; count distinct valid stored contact enquiries, excluding tests and duplicate retries. Acknowledgement-email outcomes are separate. Reading-engagement measures, instrumentation, consent-compatible collection, baselines, targets and operating responsibilities remain unresolved.

## Scope

**Recorded launch baseline**

* Approved book information and publication-ready content.
* A complete approved shorter website edition available to read free on the website, not through PDF delivery. Approximately 100–150 pages is a provisional editorial/design direction in an agreed reference layout, not a fixed count across responsive reader settings.
* Verified email required before website reading, including direct reader and chapter URLs; submission alone does not grant access.
* Separate, optional newsletter signup using the recorded Brevo direction, including double opt-in and unsubscribe; newsletter subscription is not a condition of manuscript access.
* Passwordless verification by emailed single-use code expiring after 10 minutes, invalidated on use or expiry; require resend and attempt controls without selecting numeric attempt or rate limits.
* Server-enforced valid authorisation before serving manuscript content, including direct chapter URLs; do not expose manuscript content through public bundles.
* Maximum 30-day returning access per device, ending earlier on sign-out, revocation or clearance of relevant storage; reverify on expiry/new devices. No email in the browser access credential; sign-out invalidates server access, not merely browser storage.
* Purpose-limited manuscript-access records and deletion after 12 months without authenticated use under DEC-003; access never enrols readers into marketing. Newsletter unsubscribe/deletion remains separate from manuscript-access deletion, which revokes future website access.
* Online verified website reading for v1.0, without manuscript offline downloads or intentional chapter caching for offline access. No passwords, payment or cross-device progress synchronisation at launch.

**Proposed supporting requirements, pending approval**

* Reliable source loading, navigation and reading continuity.
* Accessible submission, loading, empty and error states.
* Explicit production validation, operational ownership and rollback conditions.

### Editions and editorial planning

* **Website edition:** self-contained, satisfying and intentionally concise; not a sample chapter, unfinished extract or promise of the entire full-length manuscript. Establish its word budget from an approved reference layout rather than inventing a words-per-page conversion.
* **Full-length edition:** preserve the fuller narrative for future print, commercial e-book and audiobook formats. Final length remains unconfirmed and requires research and editorial advice. The author’s earlier 500–1,000-page possibility is exploratory, not a commitment. Approximately 80,000–95,000 words is a discussion benchmark only, not an approved target, cap or delivery requirement; audiobook length remains undefined.
* **Shared facts, distinct treatments:** retain one factual source baseline while preparing edition-specific selections and manifests. For each chapter, propose retaining, condensing, combining or reserving material for the full edition, with explicit author/editorial review. Do not discard fuller narration merely to fit the website edition. This planning direction does not approve any particular passage selection, rewrite or issue change.
* **Future commercial formats:** future plans, not website-launch deliverables, release promises or approval of sales, export or audio-production functionality.

The earlier whole-book cross-session offline exception remains historical evidence in DEC-001 but is explicitly superseded for launch by the 27 October 2026 approval: manuscript offline downloads are deferred, with verified online website reading and no intentional chapter caching for offline access. DEC-006 preserves earlier download eligibility and existing offline/PWA work as later candidates; no issues are cancelled. Later entitlement, expiry, shared-device behaviour, revocation and the exact edition manifest remain undecided. No eligibility is silently extended to future full-length editions or PDF delivery. Only DEC-001, DEC-003, DEC-006 and this PRD are updated by this approved reconciliation; other records remain unchanged.

## Non-goals

* Automatically enrolling manuscript readers into the newsletter.
* Treating email verification as proof of a reader’s wider identity or secure manuscript protection.
* Selecting a provider or approving Supabase or a platform migration through this PRD; emailed single-use-code verification and the product lifecycle are approved, not their technical architecture.
* Passwords, payment, cross-device reading-progress synchronisation or manuscript offline downloads at launch; do not intentionally cache chapters for offline access.
* PDF delivery, e-commerce, printed sales or production/delivery of the future full-length print, commercial e-book and audiobook editions at website launch. No release date, sales functionality or final length is approved.
* Automatically including eBook exports, podcasts, blog or journal work in launch.
* Creating delivery issues, changing statuses or authorising implementation.
* Declaring manuscript, accessibility or production readiness without evidence.

## Requirements

Priorities have not been agreed.

| ID | Requirement | Source | Dependencies | Acceptance | Approval state |
| -- | -- | -- | -- | -- | -- |
| REQ-001 | Publish only approved book information and content included in the website edition | S1, S2, S6 | Edition-specific publication manifest; editorial approval | AC-001 | Publication approval outstanding |
| REQ-002 | Provide free reading of the complete approved, self-contained website edition at launch, approximately 100–150 reference-layout pages, with correct ordering and navigation; neither a sample chapter nor the complete full-length manuscript, and not PDF delivery | S6; earlier S1, S2 and DEC-001 baseline superseded for edition scope only | Canonical source comparison; approved edition selection, reference layout and publication manifest | AC-001–002 | Revised edition scope approved by Ash, 27 October 2026; word budget, selection, reference layout and publication approval outstanding |
| REQ-003 | Restrict free website manuscript reading, including direct chapter access, to valid server-authorised verified-email access using passwordless emailed single-use codes with 10-minute expiry and a maximum 30-day device lifecycle | S1, S2, S7; DEC-001 | DEC-001–003; provider, enforcement architecture and operational privacy details | AC-003–004 | Access policy approved 26 October; code/device lifecycle and online-only manuscript launch scope approved by Ash, 27 October 2026; technical feasibility unverified |
| REQ-004 | Keep manuscript access and optional newsletter consent separate; subscription is not required for reading | S2, S3; DEC-001, DEC-003 | Consent wording; provider configuration | AC-005 | Separation approved; operational detail pending |
| REQ-005 | Support Brevo signup, double opt-in and unsubscribe with honest feedback | S2 | Account, list, sender and operator | AC-005–006 | Recorded direction; validation outstanding |
| REQ-006 | Preserve logical reading location through supported presentation changes | S2 | Stable source anchors; fallback rules | AC-007 | Existing work; launch inclusion unconfirmed |
| REQ-007 | Meet repository accessibility requirements across approved journeys | S4 | Device/browser matrix; review ownership | AC-008 | Repository target; conformance unverified |
| REQ-008 | Apply approved data, privacy and integration boundaries, including purpose-limited minimal reader records, deletion after 12 months without authenticated use and separate optional newsletter processing | S2–S4, S7 | DEC-002–003; provider delivery/log/backup lifecycle, privacy notice/reviewer and deletion procedures | AC-004, AC-009 | Product privacy/lifecycle policy accepted within scope on 27 October 2026; architecture, operational privacy and provider lifecycle incomplete |
| REQ-009 | Release only against an approved, traceable content and deployment baseline | S2 | Release authority; validation; rollback | AC-010 | Proposed acceptance gate |

### Functional requirements

* Distinguish idle, submitting, successful and failed form states.
* Show submission success only after the selected capture system confirms receipt; neither receipt nor email delivery alone is verification or permission to read.
* Verify through an emailed single-use code expiring after 10 minutes; invalidate the challenge on use or expiry and apply resend/attempt controls. Numeric attempt/rate limits remain unselected. Keep unverified, verified, expired, used-code and failed-verification outcomes distinct.
* Require server-enforced valid authorisation for website reading, including direct reader/chapter URLs; prevent public manuscript exposure through bundles. An interface gate alone is insufficient.
* Prevent duplicate pending submissions and allow recovery after failure.
* Handle missing manuscript sources without crashes, misleading completeness claims or broken navigation.
* Recognise valid returning access for a maximum of 30 days per device, ending earlier on sign-out, revocation or clearance of relevant storage. Require reverification after expiry or on a new device; exclude email from the browser access credential and invalidate server access on sign-out. No passwords, payment or cross-device progress synchronisation at launch.
* Retain only the necessary email address, verification status, internal reader ID and access-lifecycle timestamps to administer access, not marketing. Delete the access record after 12 months without authenticated use; access-record deletion revokes future website access.
* Keep optional newsletter signup and double opt-in separate; access verification never enrols a reader. Newsletter unsubscribe/deletion is separate from manuscript-access deletion.
* Defer manuscript offline downloads from v1.0 and do not intentionally cache chapters for offline access. Historical offline eligibility/work remains a later candidate, not cancelled work or launch entitlement.

### Content and WordPress requirements

WordPress requirements are **not applicable**: this repository is a React/Vite application.

Manuscript Markdown lives under `content/book/`. The working editorial baseline comprises both current repository content and specific Linear manuscript issues/drafts; neither silently takes precedence. Record the inspected file/issue revisions, differences, proposed keep/combine/reject/defer disposition and author decision. Historical draft labels are not proof of comprehensive editorial comparison or approval.

Publication must use a website-edition-specific manifest covering approved chapters/passages and supporting material. Preserve the full-length source and track edition-specific treatment separately; the website brief is not manuscript content. Preserve metadata, ordering and page-break structure unless an exact change is separately approved. Editorial verification, sensitive-content review and publication approval remain separate from website implementation.

The memoir guide remains provisional while all passages are reviewed and author-approved anchors established. Makeup-portfolio material is excluded entirely as a source, reference, voice authority, design authority or autobiographical corroboration. This exclusion does not silently approve a replacement memoir guide or edit references in other records.

### Technical and integration requirements

The inspected source declares React 19.3.1, `react-router` ^8.4.0 and Vite ^8.3.4, with TypeScript, npm and Node 24 tooling. These are source dependency/tooling declarations at `develop@0423fb8b935235c61defe6324251e0205ca9372d`, inspected on 26 October 2026, not verified deployed versions; the earlier React 18 statement was incorrect.

Current instructions describe static Netlify deployment. Existing Netlify Forms scope and the later Supabase manuscript-access proposal conflict. The Supabase planning document does not override the repository prohibition or authorise changes to protected `src/app/utils/supabase/`.

The PRD specifies required outcomes and the approved emailed-code/device lifecycle, not a selected replacement architecture or provider. Serve manuscript content only under valid server-enforced authorisation, including direct chapter requests, and do not expose it in public bundles. An interface gate alone cannot fulfil the approved restriction. Technical feasibility and any required repository-policy amendment remain unresolved; this document edit authorises neither implementation nor prohibited integration work.

### Non-functional requirements

* **Accessibility:** current repository instructions specify WCAG 2.2 AAA. Older README wording differs; reconcile it during review.
* **Privacy:** administer access, not marketing, using only the necessary email, verification status, internal ID and access-lifecycle timestamps; delete access records after 12 months without authenticated use. Ash is the sole authorised internal manuscript-access operator and deletion-request handler/verifier; provider processing/support access must be separately disclosed. Optional newsletter double opt-in and unsubscribe/deletion remain separate. Privacy notice/reviewer, deletion procedures and provider-specific delivery/log/backup retention and deletion schedules remain required. Do not claim instant provider deletion or invent a provider-log TTL from code expiry. The session-only retention conflict is historically superseded at product-policy level, not evidence of complete privacy acceptance or technical feasibility.
* **Security:** do not expose secrets or grant manuscript access on submission/email delivery alone. Enforce valid authorisation on the server, including direct chapters, without publicly bundled manuscript content. Use email-free browser access credentials and server-invalidating sign-out. Verified email ownership is not proof of a reader’s wider identity or protection of content already publicly distributed.
* **Reliability:** provide recoverable submission and reader failures.
* **Performance and compatibility:** targets and supported environments remain unresolved.
* **Monitoring:** Sentry errors-only safeguards are proposed, not accepted or verified.

## Design and handover

* **Design reference:** [TOA Figma Make](<https://www.figma.com/make/WGrQbNWvPQfiaGY1pnkwaq/This-One-Time-on-Acid>)
* **Repository references:** `guidelines/README.md`, `guidelines/Guidelines.md`, `guidelines/accessibility-checklist.md`
* **Required states:** navigation, reader settings, email entry, code entry, unverified/verified, expired/used code and failed-verification outcomes, resend/attempt controls, device expiry/reverification, sign-out/revocation, separate optional newsletter consent, loading, empty content, errors and confirmation.
* **Review focus:** mobile header obstruction, overlapping controls, duplicate navigation, reading position and counter consistency.
* **Handover prerequisites:** approved assets, page inventory, responsive states, accessibility evidence and identified visual reviewer.

Design references are not proof of implementation parity or accessibility conformance.

### Confirmed design baseline and pending candidates — 4 November 2026

The saved [Book website — Design and reader decision register](https://linear.app/lightspeedwp/document/book-website-design-and-reader-decision-register-be84aedd1a47) version 1.0.0 records the scoped design decisions and outstanding choices. Its creation approval authorised saving that register only; it did not approve the embedded candidate specifications.

**Authority and theme scope**

The book brief is the starting design baseline. Ash approves exact reconciled values. Existing CSS, theme JSON and unverified Figma do not automatically take precedence. Makeup-portfolio material, styling, biography and voice remain excluded.

Preserve both themes while reconciling dark mode first. Preserve existing light capability, switching and saved-light preferences. Light design, first-visit default, system preference and persistence reconciliation remain unresolved; no dark-only launch or removal of light support is authorised.

**Confirmed typography and layout direction**

| Role | Confirmed direction |
| -- | -- |
| Interface fonts | Space Grotesk headings; Inter body and UI |
| Hero headings | 48–80px |
| Section headings | 32–48px |
| Card headings | 20–24px |
| Website body | 16–20px; line height 1.6 |
| Reader starting comparison | 18px; line height 1.7; reader adjustment |
| Short supporting text | 14px; not sustained prose or essential instructions |
| Preferred prose measure | 65 characters with responsive narrowing; not a guaranteed count per line |
| Reading wrapper | Maximum 768px |
| Forms | Maximum 640px |
| Standard content | Maximum 1280px |
| Wide media | Optional 1600px comparison, not universal |

Separately approved cover/logo lettering may fall outside the two-family interface limit. Existing Righteous, Playfair or Vampiro One declarations do not establish individual artwork approvals.

**Approved dark-palette direction**

| Proposed semantic role | Approved value |
| -- | -- |
| Page background | `#0B0B10` |
| Secondary surface | `#12121A` |
| Panel | `#171722` |
| Primary text | `#F6F2EB` |
| Secondary text | `#CFC7BB` |
| Tertiary text | `#9C9488` |
| Pink accent | `#FF3AAE` |
| Yellow accent | `#F4FF3C` |
| Violet accent | `#8A63FF` |

The register records the dark interaction colours and pairings approved on 4 November 2026 at 14:30 Asia/Bangkok, including error, warning, success, focus, borders, disabled, hover, pressed and action states. Preserve that exact approved candidate there rather than introducing a second independently maintained interaction table here. Approval establishes design choices subject to checks, not verified contrast or accessibility.

**Unapproved specifications and validation**

R3 responsive mappings, T1 additional typography/weights, RT2 reader typography and C1 continuity remain unapproved. Their ranges, increments, heading-scaling exceptions, persistence, recovery and reset proposals are not adopted requirements through this PRD reconciliation.

The responsive checklist is planned review material only. Font loading/licensing, rendered comparisons, component mappings, reader-setting limits, spread geometry, support coverage and criterion-specific AAA evidence remain unresolved.

The contrast, rendered typography, responsive, accessibility, persistence and continuity checks proposed in this chat remain Not run. This is not an exhaustive statement about historical project checks; no new execution evidence was gathered for this reconciliation.

Targeted repository inspection at `84242de7857e1ec03742e20aaaf1df469f44355f` is static evidence only. Earlier repository references remain historical evidence; they are not replaced or treated as current runtime verification.

### Supporting brief reconciliation and review handoff

This section records reconciliation requirements; it does not approve additional pages, claims, offers or implementation.

**Sources and authority**

Use the PRD’s recorded scoped approvals and accepted portions of DEC-001 and DEC-003 for manuscript access and privacy decisions. The supporting book-site brief is review input, not independent approval or authority to override repository instructions. Record contradictions explicitly; proposed ADR sections and design references do not supersede accepted decisions.

Maintain the findings, 15 author questions and their dispositions in [TOA-82](<https://linear.app/lightspeedwp/issue/TOA-82/review-book-website-brief-review-the-supporting-book-site>). Reconcile the brief’s audience and primary visitor action against the approved shorter website-edition baseline. Exclude makeup-portfolio sources and requirements entirely; the full-length commercial formats remain future plans, not launch offers. Distinguish approved scope, proposals and placeholders throughout access, signup, publication, print, pre-order and speaking copy. Existing launch exclusions remain unchanged.

**Page inventory and editorial evidence**

Use [TOA-354](https://linear.app/lightspeedwp/issue/TOA-354/scoping-website-define-launch-pages-and-editorial-boundaries) to propose the launch-page inventory, distinguishing retained, unpublished and deferred pages. For each retained page, record its purpose, canonical copy/source revision, assets and rights, relevant editorial work, unresolved dependencies and approval evidence.

Manuscript verification and rewriting remain under [TOA-35](https://linear.app/lightspeedwp/issue/TOA-35/epic-book-verify-and-rewrite-the-book-manuscript). Website-brief review does not establish manuscript completion or publication readiness.

Record evidence and approval state for the title/subtitle, publication status, biography, contact promises and any speaking, event, testimonial or print claims. Unsupported claims and sample content must not become confirmed public promises.

**Design handoff and acceptance**

Preserve repository sentence-case requirements and the recorded WCAG 2.2 AAA target. Identify authoritative typography, colour/token and voice sources; record conflicts and obtain approval for exceptions rather than silently selecting a competing system.

Map the approved page inventory, copy, assets and responsive/component states to the existing design handoff and validation requirements. Design availability does not establish implementation parity or accessibility conformance.

Map this evidence to existing AC-001–002 for publication scope, AC-008 for accessibility and AC-010 for release evidence. Do not renumber or mark criteria passed. Publication decisions remain with DEC-004; compatibility, visual acceptance and offline launch scope remain with DEC-006.

The 27 October reconciliation resolves verification/device lifecycle, reader-record retention and manuscript offline launch policy within DEC-001/003/006. Provider implementation, numeric resend/attempt/rate controls, privacy notice/reviewer, provider delivery/log/backup lifecycle and deletion procedures remain open; newsletter validation and publication/release gates remain separate. Product-policy acceptance is not verified feasibility or readiness.

### Author decisions — 27 October 2026

**Source:** [Book website brief — author decisions and launch scope](https://linear.app/lightspeedwp/document/book-website-brief-author-decisions-and-launch-scope-8d63b8dda8d8). Ash approved this planning brief in the current conversation. Its approval establishes planning direction, not publication clearance, implementation approval or launch readiness.

Where earlier PRD wording conflicts with the decisions below, retain its historical approval evidence and flag reconciliation. Do not silently amend linked ADRs or issues.

#### Positioning and website manuscript

The website is book-first. Reading is the primary visitor action; newsletter subscription is separate, optional and secondary.

The audience direction includes personal storytelling, creativity, alternative culture and lived experience, particularly misfits, makers, dancers, seekers and festival people. This is author-defined positioning, not validated audience research.

The website presents a shorter, evolving website-specific manuscript that forms a foundation for a future full-length book. “Living manuscript” describes editorial status, not publication approval.

**Approved content boundary:** Ash confirmed on 27 October 2026 that verified readers receive the entire website-specific short manuscript, not selected excerpts. This confirms the complete-short-edition scope recorded in REQ-002 and AC-002. It does not include the future full-length manuscript or approve exact content, publication, implementation or launch. Any excerpt-based promotional wording must accurately reflect this reading entitlement.

Email verification remains required; submission or delivery alone does not establish access. DEC-001/003/006 now record the approved emailed-code/device lifecycle, reader-record retention and manuscript offline launch deferral. Provider/architecture feasibility, operational privacy and later offline entitlement/expiry/shared-device/revocation remain unresolved; no tests or implementation are approved by this update.

#### Launch inventory

| Direction | Pages and conditions |
| -- | -- |
| Launch | Home; The book; Read the draft; About Ash; Waitlist/newsletter; newsletter thank-you; Contact; contact thank-you; Privacy policy; Terms and conditions |
| Conditional launch | Journal/blog with at least three approved entries and a clear purpose; Podcast with at least one approved podcast and a clear purpose |
| Retained public, unlinked and noindex | Speaking/workshops; Events; Media/press. Offers, appearances, claims and assets still require their applicable approval. |

Journal and podcast replace the earlier assumption that these were outside launch scope. Their content is not yet evidenced as approved or available. Removing either from launch requires an explicit scope decision. Their online inclusion does not amend offline download eligibility.

Contact requires a dedicated page, approved entry storage and confirmation emails. About also includes a contact section. No response time is promised.

There is no portfolio section. External links may point to [Ash’s portfolio](<https://ashshaw.makeup/portfolio>) and [LightSpeed’s work](<https://lightspeedwp.agency/work>). Portfolio material is not automatically cleared for manuscript adaptation.

#### Editorial and publication direction

Working title: **This One Time on Acid**.

Author-supplied subtitle: **A hybrid memoir and creative-life guide about dancefloors, difference, freedom, and becoming fully yourself.**

Final presentation, cover and public status wording require approval. Ash and Aix are developing the manuscript; its publication candidate will be identified after manuscript issues and author questions are addressed.

Ash retains final editorial/publication approval. Aix Rey is an additional editorial reviewer, not an independent publication authority. Architecture, privacy, QA and release authority remain separately unresolved.

Biography may draw on the author-confirmed roles and activities in the source brief. Additional life-story claims and final copy require verification. Ash approves each image individually; rights and credits must be recorded.

No testimonials, media appearances or events are currently publication-approved. An Origin Festival talk is an idea, not a confirmed appearance.

Print, Kindle ebook and an Ash-narrated audiobook are future intentions without guaranteed dates, availability or fulfilment. Launch still excludes pre-orders, printed sales and PDF delivery. Waitlist wording must not imply approved future pre-orders or guaranteed communication frequency.

#### Forms, measurement and design

Newsletter and contact thank-you pages are required. Submission receipt, confirmed newsletter subscription, manuscript verification and page visits are distinct states. Business conversion definitions and counting rules are approved as recorded under Outcomes and success measures; technical event specifications and privacy-compatible collection remain unresolved. A page visit alone must not count as a successful conversion.

Contact processing requires approved providers, data flows, permissions, retention, deletion and confirmation behaviour. Manuscript-access permissions or retention rules must not automatically transfer to contact or analytics processing.

Preserve sentence case, the recorded WCAG 2.2 AAA target and Ash’s design authority. Apply the scoped confirmed design baseline recorded under Design and handover; unresolved token mappings, voice-source conflicts, exceptions and acceptance evidence remain open. No accessibility conformance or design parity is established here.

#### Privacy and operations clarification — 28 October 2026

Ash confirmed these requirements on 28 October 2026, Asia/Bangkok. They clarify existing access, privacy, contact and measurement requirements; they do not establish completed validation.

Reader verification must provide accessible feedback and recovery for delivery failure, invalid or expired codes, resend controls and exhausted attempts, without bypassing verification or reporting false success. Propose numeric resend and attempt limits with their rationale for approval before selecting them.

Before deciding contact processing, present the proposed fields, purpose, permissions, retention, deletion procedure and responsible operator. Keep contact records separate from manuscript-access and newsletter records. Confirm receipt truthfully according to actual storage and delivery outcomes; do not promise a response time.

The 28 October clarification identified completed reader verification, confirmed newsletter subscription and successfully stored contact submission as separate conversion outcomes. The approved business definitions and counting rules are now recorded under Outcomes and success measures. Technical events, associated data and privacy implications still require approval before tracking. Thank-you-page visits alone are not successful conversions.

Apply DEC-003’s notice, provider-review and deletion requirements to each relevant processing purpose. Provider and operational choices remain unresolved; these confirmations do not approve implementation or tracking.

**Proposed measurement worksheet—not approved tracking:** report aggregate counts using the approved business definitions and counting rules over an agreed period. Exclude raw emails, codes, messages, manuscript text and persistent visitor identifiers from reporting. Verification counts include reverification and must not be described as unique readers. Privacy-safe technical deduplication and reporting implementation remain unapproved.

Before implementation, approve exact triggers, associated data, reporting period, technical duplicate-handling methods, destinations, permissions, retention/deletion and privacy implications against the approved business counting rules. Inspect actual payloads and underlying provider/log collection; aggregate output does not establish anonymity. Verify that failures, direct navigation and repeated thank-you visits do not create false conversions. All validation remains planned.

#### Additional requirements

| ID | Requirement | Acceptance | Approval state |
| -- | -- | -- | -- |
| REQ-010 | Deliver the launch inventory and journal/podcast prerequisites above; retain speaking/workshops, events and media/press at public direct URLs without menu/footer links and with noindex directives; exclude unapproved claims | AC-011 | Author-confirmed planning and visibility direction; publication and effective-noindex evidence outstanding |
| REQ-011 | Provide dedicated contact storage and confirmation emails, plus an About contact section | AC-012 | Required outcome; processing decisions unresolved |
| REQ-012 | Provide newsletter/contact thank-you pages with truthful states and approved measurement | AC-013 | Required pages and business counting rules approved; instrumentation and collection unresolved |

These extend REQ-001’s publication-evidence scope and REQ-008’s privacy scope. They do not change existing access-policy approvals.

#### Additional acceptance criteria

| ID | Observable pass condition | Prerequisites and validation |
| -- | -- | -- |
| AC-011 | Published pages match the approved inventory; journal has at least three approved entries and podcast at least one approved item; copy/assets have publication evidence; speaking/workshops, events and media/press pages remain publicly accessible at their retained direct URLs, without menu or footer links, and carry noindex directives; these pages are not deleted or made private; unsupported claims are absent | Approved manifest, editorial purpose, rights and build comparison; inspect retained-route responses, menu/footer coverage and effective noindex directives on the selected candidate. Record conflicting indexing configuration and unassessed coverage. Noindex is not access control or evidence that Google has removed existing results. Validation is planned, not passed. |
| AC-012 | Valid contact submissions are stored and receive the agreed confirmation; invalid or failed operations do not claim completion; About includes the contact section | Approved processing policy; success, failure, duplicate, permissions and deletion checks |
| AC-013 | Both thank-you pages show truthful states; measurement distinguishes approved conversion events; direct or repeated page visits alone do not create successful conversions | Approved business counting rules; separately approved technical event and privacy specifications before collection; success, pending, failure and direct-navigation checks |

All validation is planned, not passed.

**Readiness:** planning refinement can continue. Entire-short-manuscript scope and the approved access/device/retention/offline-launch product policy are resolved. Reader implementation remains subject to provider/architecture and repository-policy resolution, privacy review/procedures and provider lifecycle; technical feasibility is unverified. Contact/measurement implementation remains blocked by its separate processing and event decisions. Existing editorial, compatibility/accessibility/visual, publication and release blockers remain applicable.

## Acceptance criteria

All validation below is planned, not passed.

| ID | Requirement | Observable pass condition | Validation / prerequisites |
| -- | -- | -- | -- |
| AC-001 | 001–002 | Every section in the approved website-edition publication manifest appears once, in the approved order, without the website brief, unapproved passages or full-length-only material | Full edition-manifest comparison against selected build; explicit editorial selection and publication approval |
| AC-002 | 002 | After verified-email access, the complete approved website edition is free to read with working chapter navigation and a self-contained narrative, not just a sample chapter; the approved reference layout evidences the approximate 100–150-page direction, without requiring identical responsive pagination. PDF delivery or payment is not required. Unavailable or empty sources produce recoverable feedback without crashing | Approved website-edition manifest, reference layout/word budget and author/editorial assessment of completeness; content and boundary-case tests; full-length commercial formats, PDF delivery and e-commerce/printed sales excluded from launch |
| AC-003 | 003 | Fresh, returning and direct reader/chapter journeys require server-enforced valid verified-email authorisation; manuscript content is not exposed in public bundles. Returning access lasts no more than 30 days per device and ends earlier on sign-out, revocation or clearing relevant storage; expiry/new devices require reverification. Browser access credentials contain no email; sign-out invalidates server access. V1.0 offers online reading without manuscript offline downloads or intentional offline chapter caching; no passwords, payment or cross-device progress synchronisation | Approved provider/enforcement architecture and privacy procedures; isolated devices/sessions; direct-content and bundle inspection; expiry, sign-out/revocation, new-device and cleared/unavailable-storage scenarios; launch offline-exclusion checks. Planned, not passed |
| AC-004 | 003, 008 | Access requires successful verification of an emailed single-use code expiring after 10 minutes; challenges invalidate on use or expiry. Resend/attempt controls apply. Invalid, pending, expired, used or failed verification never grants access or reports success; submission receipt or email delivery alone does not unlock reading | Selected provider/backend; controlled single-use, expiry, resend/attempt and failure tests; numeric attempt/rate limits still to be selected; provider privacy lifecycle and deletion procedures. No provider log-deletion TTL inferred from code expiry |
| AC-005 | 004–005 | Email verification/access never subscribes a reader; newsletter consent is separate and optional with its own double opt-in, subscription is not required for access, and pending/confirmed states remain distinct. Newsletter unsubscribe/deletion remains separate from manuscript-access deletion | Provider/consent verification and independent access/newsletter lifecycle checks |
| AC-006 | 005 | Confirmation, duplicate submissions, provider failure and unsubscribe produce accurate outcomes | End-to-end Brevo checks |
| AC-007 | 006 | Supported typography, viewport and layout changes preserve logical location; missing anchors/storage failure use an approved fallback | Approved scenarios and fallback rules |
| AC-008 | 007 | Keyboard, focus, screen-reader, contrast and responsive checks satisfy the approved repository checklist | Human review; supported device/browser matrix |
| AC-009 | 008 | Data destinations, secrets, controls and telemetry match approved policy. The reader record contains only necessary email, verification status, internal ID and access-lifecycle timestamps, used to administer access, not marketing, and is deleted after 12 months without authenticated use. Access-record deletion revokes future website access. Ash-only internal manuscript-access operations and deletion handling/verification are distinguished from separately disclosed provider processing/support access. Newsletter double opt-in, unsubscribe and deletion remain separate. No unauthorised parallel capture or extension beyond the approved lifecycle | Configuration, field/data-flow and permissions review; approved privacy notice/reviewer and deletion procedures; verified provider-specific delivery/log/backup retention and deletion schedule, without instant-erasure claims; challenge invalidation on use/expiry verified separately from provider retention. Product policy accepted within scope; operational privacy incomplete, tests not passed |
| AC-010 | 009 | Release evidence identifies deployed revision, approved content, test results, exceptions, approver and rollback procedure | Selected production environment |

## Dependencies, risks, and open decisions

### Dependencies and sequencing

* Approve website-edition selection, reference layout, word budget and publication manifest before publication acceptance; full-length editorial development remains separately scoped.
* Use the approved emailed-code verification, maximum 30-day device lifecycle, minimal reader record and 12-month inactivity deletion to assess capture/enforcement architecture. Provider delivery/log/backup lifecycle, privacy notice/reviewer, deletion procedures, numeric resend/attempt/rate controls and technical feasibility remain unresolved; the earlier session-only retention conflict is reconciled at product-policy level.
* Ratify any required policy amendment before prohibited integration work.
* Confirm provider configuration before newsletter acceptance.
* Design and editorial review can proceed independently where they do not assume unresolved architecture.

### Risks and assumptions

| ID | Risk | Impact | Mitigation / responsibility |
| -- | -- | -- | -- |
| R-001 | Listed full-length chapters mistaken for the approved website edition, or a sample mistaken for a satisfying shorter book | Incorrect or premature publication and wrong edition scope | Edition-specific manifest, narrative review and sign-off; reviewer unassigned |
| R-002 | Submission receipt mistaken for verified access, or verification mistaken for wider identity, secure manuscript protection or newsletter consent | Privacy and misleading-access risks | Enforce verified-email access; separate optional consent; Ash approved access policy, privacy review remains incomplete |
| R-003 | Figma and Netlify treated as equivalent | Incorrect release evidence | Validate selected environment and deployed revision |
| R-004 | Proposed architecture treated as accepted | Governance conflict and rework | Resolve DEC-002 before implementation |

### Open decisions

| ID | Decision | Required role | Consequence |
| -- | -- | -- | -- |
| DEC-001 | Free passwordless online reading of the complete shorter website manuscript; emailed single-use code with 10-minute expiry and resend/attempt controls; valid server-authorised direct chapters without public manuscript bundles; maximum 30-day device access with earlier sign-out/revocation/storage-clearance termination, email-free browser credentials and server-invalidating sign-out; reverify on expiry/new devices | Product/privacy decision-maker | Product policy accepted by Ash, 27 October 2026, in the scoped ADR/PRD update; provider/enforcement feasibility and numeric controls unresolved. Earlier cross-session offline exception explicitly superseded for launch; no passwords/payment/cross-device progress sync. No implementation/validation or launch approved |
| DEC-002 | Conditionally preferred Netlify server-functions/Supabase Auth/private-storage direction recorded in DEC-002 version 1.0.1; transactional email, provider suitability/configuration and repository-policy ratification remain unresolved | Architecture/governance authority | Preferred direction approved; implementation acceptance remains blocked pending the recorded conditions; no prohibited integration authorised |
| DEC-003 | Administer manuscript access, not marketing, with necessary email, verification status, internal ID and access-lifecycle timestamps; delete after 12 months without authenticated use, revoking future website access. Ash is sole authorised internal operator/deletion handler/verifier; provider processing/support access separately disclosed. Optional newsletter double opt-in, unsubscribe and deletion remain separate | Privacy reviewer/operator | Product privacy/lifecycle policy accepted within scope by Ash, 27 October 2026, replacing session-only retention; no blanket acceptance. Privacy notice/reviewer, deletion procedures and provider-specific delivery/log/backup lifecycle remain incomplete, without instant-deletion claims |
| DEC-004 | Shorter website edition of approximately 100–150 reference-layout pages approved on 27 October; exact chapter/passage selection, word budget, reference layout, launch pages, imagery and publication wording unresolved | Editorial/product reviewer | Edition direction accepted; detailed publication scope and acceptance blocked pending evidence and approval; linked ADR unchanged |
| DEC-005 | Production environment, release authority and rollback owner | Release decision-maker | Launch blocked |
| DEC-006 | Manuscript offline downloads deferred from v1.0; verified online website reading without intentional offline chapter caching. Historical download eligibility and work remain later candidates, no issues cancelled. Later entitlement/expiry/shared-device/revocation decisions open; supported browsers/devices, accessibility and visual acceptance unresolved | Product/design/QA reviewers | Offline launch deferral accepted by Ash, 27 October 2026; DEC-006 not fully accepted. Compatibility/accessibility/visual validation gates remain incomplete |

### PRD decision ADRs

The following records map one-to-one to DEC-001–006. The approved 27 October access/privacy/offline reconciliation updates only DEC-001, DEC-003, DEC-006 and this PRD: DEC-001 records the complete website-specific short manuscript, emailed-code/device lifecycle and server-enforced access; DEC-003 records accepted product privacy/lifecycle policy within scope, with operational privacy/provider lifecycle incomplete; DEC-006 records accepted manuscript offline launch deferral, not blanket compatibility/accessibility/visual acceptance. Earlier session-only retention and cross-session offline approvals remain historically preserved and are explicitly superseded for launch at policy level. Technical feasibility is unverified. Earlier whole-book wording must not override website-edition scope or extend eligibility to future full-length formats. DEC-004 and other linked ADRs remain unchanged: exact publication content, reference layout and other publication gates are not accepted by this reconciliation. No provider, architecture, repository-policy amendment, implementation, testing, publication or launch is approved. Existing platform ADRs remain separate related evidence.

| PRD decision | Decision record |
| -- | -- |
| DEC-001 | [ADR — PRD DEC-001: Manuscript entry and returning-reader access](https://linear.app/lightspeedwp/document/adr-prd-dec-001-manuscript-entry-and-returning-reader-access-5d00ad544425) |
| DEC-002 | [ADR — PRD DEC-002: Manuscript capture platform and policy authority](https://linear.app/lightspeedwp/document/adr-prd-dec-002-manuscript-capture-platform-and-policy-authority-6e6fd177c1e2) |
| DEC-003 | [ADR — PRD DEC-003: Personal-data purpose, retention and consent](https://linear.app/lightspeedwp/document/adr-prd-dec-003-personal-data-purpose-retention-and-consent-132b620a39da) |
| DEC-004 | [ADR — PRD DEC-004: Launch publication scope and editorial approval](https://linear.app/lightspeedwp/document/adr-prd-dec-004-launch-publication-scope-and-editorial-approval-adb6a648c238) |
| DEC-005 | [ADR — PRD DEC-005: Production designation and release authority](https://linear.app/lightspeedwp/document/adr-prd-dec-005-production-designation-and-release-authority-38ac320dff7c) |
| DEC-006 | [ADR — PRD DEC-006: Compatibility, visual acceptance and offline launch scope](https://linear.app/lightspeedwp/document/adr-prd-dec-006-compatibility-visual-acceptance-and-offline-launch-d43d7c54dee9) |

## Discovery packets — 27 October 2026

These packets consolidate prior discovery from 26 October 2026, including static inspection of [lightspeedwp/ThisOneTimeOnAcidCom at `0423fb8b935235c61defe6324251e0205ca9372d`](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/tree/0423fb8b935235c61defe6324251e0205ca9372d>). They are findings and open decisions, not new requirements, provider selection or additional approvals. No runtime, provisioning, build or test work was performed for this review; source observations do not establish deployed behaviour.

These historical findings are retained as evidence. References to manuscript completeness or the historical whole-book offline exception do not reverse the later website-edition scope revision or the 27 October 2026 access/privacy/offline policy reconciliation. Historic policy conflicts below are marked reconciled/superseded at product-policy level, not erased or treated as technically verified. No source behaviour has been re-tested for these document updates.

### DISC-001 — Access and privacy

**Findings**

* Inspected entry forms use a hardcoded demonstration email and navigation rather than provider-confirmed verification; inspected routes leave `/ebook` unguarded. This does not demonstrate REQ-003 or AC-003–004 being met.
* Verified-email access needs an enforcement boundary for serving manuscript content, not just an interface gate. Publicly bundled manuscript content would remain accessible outside that gate; capture-only options do not fulfil the approved verified-access outcome.
* **Historical policy conflict — reconciled 27 October 2026:** DEC-003’s then-strict no-email-retention-beyond-session constraint conflicted with verification, delivery, logs and backups; browser closure is not a universally reliable deletion signal. Ash explicitly replaced that constraint with the minimal reader record and deletion after 12 months without authenticated use, alongside the emailed-code/maximum 30-day device lifecycle. Provider delivery/log/backup schedules and deletion procedures remain required; no instant-deletion guarantee or technically verified solution is established.
* **Historical offline conflict — superseded for launch 27 October 2026:** the earlier exception allowed cross-session downloaded-book reading. Launch now defers manuscript offline downloads, requires verified online reading and excludes intentional offline chapter caching. Preserve earlier download eligibility and existing work as later candidates; no issues cancelled. Later entitlement, expiry, shared-device and revocation remain undecided.
* Ash-only manuscript-entry operations do not establish Ash as the privacy reviewer or release authority.

**Evidence and limitations:** S1–S3 and S5; source-only form/route inspection and recorded decisions. No provider, storage, email-delivery, deletion or end-to-end access behaviour was validated.

**Current disposition:** DEC-001/003/006 reconcile the verification/device lifecycle, reader-record retention and manuscript offline launch policy through Ash’s 27 October approval. An emailed single-use code is selected as product policy; no provider or technical architecture is selected. Data destinations, numeric resend/attempt/rate controls, provider delivery/log/backup lifecycle, privacy notice/reviewer and deletion procedures remain open, and technical feasibility is unverified. Historical findings are not passed acceptance criteria.

### DISC-002 — Platform and release

**Findings**

* Repository constitution and `AGENTS.md` non-use constraints for Supabase conflict with the repository’s D6 stack assertions and the later integration proposal. S3’s approved planning amendment excludes authentication/private delivery and does not ratify a policy change or resolve verified-access architecture.
* Package declarations are React 19.3.1, `react-router` ^8.4.0 and Vite ^8.3.4, with npm/Node 24 tooling; these are newer than the earlier stack guidance. Source declarations are not evidence of deployed versions.
* The Figma-hosted live experience and Netlify deployment are separate surfaces. No deployed SHA, configuration/parity evidence, production designation or release approval has been established.
* Inspected Sentry source includes replay/tracing, whereas errors-only safeguards remain proposed. Runtime telemetry and privacy configuration are unverified.
* Static PWA evidence includes merge markers in the manifest and no service-worker registration in the inspected active entrypoint. This is not a tested offline capability. Manuscript offline downloads are now deferred from v1.0; existing work remains a later candidate, requiring separately approved scope and validation.

**Evidence and limitations:** S3–S5 and existing platform/PRD decision records. No deployment, provisioning, runtime configuration, build or tests were inspected through execution; no environment parity or release readiness is inferred.

**Open decisions:** DEC-002 needs architecture/governance resolution and any required ratified policy amendment before prohibited integration work. DEC-005 needs the production environment, deployed baseline, release authority and rollback owner. DEC-006 now records manuscript offline launch deferral; later offline scope and compatibility/accessibility/visual gates remain unresolved. No platform/provider selection or release authority is invented.

### DISC-003 — Publication and acceptance

**Findings**

* Source inspection counted 37 Markdown files under `content/book/`, while the loader eagerly targets `/src/content/book/**/*.md`, absent in the inspected source tree. File count does not establish complete, loadable or publication-approved manuscript coverage; this mismatch was not runtime-tested.
* An approved publication manifest, canonical source/order, page and asset inventory, rights clearance and editorial sign-off remain missing. Existing chapter records are not substitutes for publication approval.
* WCAG 2.2 AAA is the repository target, not evidence of compliance. The Playwright configuration offers candidate desktop Chromium/Firefox/WebKit and Pixel 5/iPhone 12 emulation; it does not approve a support matrix or demonstrate real-device or assistive-technology coverage.
* Visual/design acceptance, supported environments, validation ownership and publication/release approvals remain unconfirmed. No acceptance criteria are marked passed by this review.

**Evidence and limitations:** S1–S2 and S4–S5; static content/loader and test-configuration inspection, not executed tests, complete editorial review or live accessibility validation.

**Open decisions:** DEC-004 needs publication scope, source manifest, assets/rights and editorial approval. DEC-006 needs the browser/device, real-device/assistive-technology and visual acceptance scope and reviewers. DEC-005 still governs release approval; manuscript operations alone confer no approval authority.

### Decision sequence

1. Apply the accepted DEC-001/003/006 product-policy baseline to architecture/privacy assessment: 10-minute single-use emailed codes, maximum 30-day device access, minimal access records deleted after 12 months without authenticated use, and v1.0 manuscript offline deferral. Earlier session-only retention and cross-session offline conflicts are historically preserved but reconciled/superseded for launch at policy level; resolve provider lifecycle, privacy notice/reviewer, deletion procedures, numeric controls and technical feasibility rather than reopening those settled product choices without new approval.
2. Resolve architecture and repository-policy contradictions under DEC-002 without assuming that capture-only planning authorises authentication/private delivery.
3. Resolve publication and acceptance scope, evidence and reviewer responsibilities under DEC-004/006.
4. Establish the release baseline, authority, validation evidence and rollback ownership under DEC-005 before launch approval.

## Delivery breakdown and traceability

No delivery backlog is created or changed. The approved editorial planning direction calls for chapter-by-chapter retain/condense/combine/reserve proposals and separate edition manifests; exact selections, delivery mapping, ownership and acceptance coverage remain unverified. This PRD edit does not create or update chapter issues.

The existing PRD preparation record is [TOA-384](https://linear.app/lightspeedwp/issue/TOA-384/docs-product-requirements-prepare-the-website-prd). Requirements above map to acceptance IDs, but existing delivery and validation coverage remains **partly covered or unverified**. Record existence is not evidence of completed implementation or passing QA.

## Gap review and readiness

| Gap | Finding | Severity | Resolution |
| -- | -- | -- | -- |
| GAP-001 | Code/device/reader-record lifecycle and manuscript offline launch policy are accepted within scope; server-enforcement architecture, provider lifecycle, numeric controls, privacy review/procedures and technical feasibility remain unresolved | Critical for access implementation | Resolve DEC-002 architecture/policy and DEC-003 operational privacy/provider schedules against the accepted product lifecycle; do not infer implementation approval or complete privacy acceptance |
| GAP-002 | Shorter website-edition selection, reference layout/word budget and publication approval absent | Major; blocks launch | Approve edition-specific manifest and editorial baseline; preserve fuller source separately |
| GAP-003 | Environment and release authority unresolved | Major; blocks launch | Resolve DEC-005 |
| GAP-004 | Accessibility, compatibility and visual evidence incomplete | Major; blocks acceptance | Approve matrix and execute review |

**Readiness:** Needs substantial revision; not implementation- or launch-ready. Access/device/retention and manuscript offline launch product policy are now reconciled within scope, while DISC-001–003 preserve historical findings and unresolved technical/privacy, architecture/policy, publication/acceptance and release evidence. DEC-003 operational privacy and DEC-006 compatibility/accessibility/visual gates remain incomplete. No tests or acceptance criteria are passed by this document update. This is a review conclusion, not a Linear status change.

## Rollout and measurement

Release requires approved content, an identified deployment revision, completed reader/newsletter/access validation, documented exceptions and explicit authorisation.

Record a known-good deployment, rollback trigger and responsible operator. Confirm monitoring privacy settings and newsletter operations before handover. No release date or performance threshold is asserted.

## Review, approval and change history

Required review roles: product, editorial, design/accessibility, architecture/privacy, QA and release operations. Role assignments remain unresolved.

| Revision | Change | Approval |
| -- | -- | -- |
| 0.1 | Initial evidence-led draft; REQ-001–009 and AC-001–010 | Pending |
| 26 October 2026 scope revision | Free website reading after email verification, including direct chapters; separate optional newsletter; PDF delivery and e-commerce/printed sales outside launch; DEC-001 acceptance and DEC-003 partial direction reflected, with offline/retention conflicts flagged | Ash approved these scoped record changes on 26 October 2026; no provider, verification method, retention period, implementation or launch approved |
| 27 October 2026 discovery revision | Added DISC-001–003 with findings, evidence limitations and open decisions; corrected source dependency declarations; recorded decision sequence and substantial-revision readiness | Ash approved this scoped PRD update on 27 October 2026, Asia/Bangkok (26 October 2026 at 23:37 UTC); approval records discovery only, not new requirements, policy ratification, provider selection, completed validation, implementation or launch |
| 27 October 2026 website-edition revision | Replaced full-length complete-manuscript launch scope with a satisfying self-contained shorter website edition, approximately 100–150 reference-layout pages; preserved verified access and optional newsletter separation; recorded future full-length print/commercial e-book/audiobook plans without a final length; updated REQ-001–002, AC-001–002, edition planning and publication gaps without renumbering IDs | Ash approved the previewed recommendations and requested the PRD update on 27 October 2026 at 09:34 Bangkok. Approval covers this scoped document revision, not exact passage selection, a mandatory full-length word/page target, marketing reuse of entry emails, altered retention, related ADR edits, implementation, sales functionality or launch |
| 27 October 2026 access/privacy/offline reconciliation | Aligned DEC-001/003/006 and this PRD: passwordless single-use emailed codes expiring after 10 minutes with resend/attempt controls; server-authorised direct chapters without public manuscript bundles; maximum 30-day device access ending earlier on sign-out/revocation/relevant-storage clearance, reverification on expiry/new devices, email-free browser credentials and server-invalidating sign-out; minimal access record deleted after 12 months without authenticated use; access-record deletion revokes future website access; separate optional newsletter double opt-in/unsubscribe/deletion; Ash-only internal operator/deletion handling with separate provider disclosure; manuscript offline downloads deferred from v1.0 and no intentional offline chapter caching. Historical session-only retention and cross-session offline approvals preserved but superseded/reconciled for launch; download eligibility/work retained as later candidates, no issues cancelled; REQ/AC IDs and publication gates preserved | Ash approved the displayed scoped proposal and recording on 27 October 2026 at 09:26 UTC / 16:26 Asia/Bangkok. Provider-specific delivery/log/backup retention/deletion schedules, privacy notice/reviewer, deletion procedures and technical feasibility remain unresolved. Numeric attempt/rate limits not selected; no instant provider-deletion claim. DEC-003 accepted only within product-policy scope; DEC-006 not fully accepted. No provider, repository-policy change, implementation, tests, content publication or launch authorised |
| 1.1.0 — 4 November 2026 reconciliation | Recorded confirmed design direction, dark-first preservation of light support, retained public/unlinked/noindex visibility and approved business counting; linked the saved decision register; preserved candidate and validation boundaries | Existing decision approvals retain their individually recorded scope and dates. Register creation approval covers that register only. Ash approved the exact PRD patch, including its document-version convention, on 4 November 2026 at 21:27 Asia/Bangkok. It was saved at 14:28:04 UTC / 21:28:04 Asia/Bangkok and read back against the approved patch, with no substantive discrepancies reported. Approval covered this scoped document update, not adoption of R3, T1, RT2 or C1; no implementation, collection, testing, publication or launch was authorised. |

The recorded scoped approval does not authorise implementation, resolve remaining open decisions, establish full privacy acceptance or approve launch. Other content and review requirements remain provisional.

## Resources

### Evidence register

| Source | Reference | Inspected extent / date | Classification and authority |
| -- | -- | -- | -- |
| S1 | [Discovery Findings — This One Time on Acid — book](<https://linear.app/lightspeedwp/document/discovery-findings-this-one-time-on-acid-book-e81cdaee6ad9>) | Discovery baseline and recorded 25 October decisions | Recorded product approval; not publication approval |
| S2 | Current project, PRD preparation and related editorial, reader, newsletter and release records | Read on 26 October; includes stored 25 October browser findings | Mixed scope, proposals and observations; not independently retested |
| S3 | [Supabase integration plan — This One Time on Acid — book](<https://linear.app/lightspeedwp/document/supabase-integration-plan-this-one-time-on-acid-book-81729d6d79df>) | Integration planning and approval boundary | Approved planning document; architecture unapproved |
| S4 | Repository `AGENTS.md`, `CONTRIBUTING.md`, README and relevant guidelines | Revision `eeb4b185…`, 26 October | Current repository constraints; no runtime validation |
| S5 | [Repository source snapshot](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/tree/0423fb8b935235c61defe6324251e0205ca9372d>): package declarations, constitution/`AGENTS.md` and D6 assertions, entry forms/routes, manuscript loader and `content/book/`, Sentry/PWA source and Playwright configuration | Prior discovery on 26 October 2026 at `develop@0423fb8b935235c61defe6324251e0205ca9372d`; consolidated in DISC-001–003 on 27 October | Static source evidence only; not live validation, deployed-version verification, executed tests or approval |
| S6 | Ash’s edition decision, previewed brief/PRD revision and explicit approval in the current conversation | 27 October 2026: decision at 09:31 Bangkok; approval at 09:34 Bangkok | Approved scope change to a complete shorter website edition, approximately 100–150 reference-layout pages; future full-length formats remain undefined in length. Product/marketing hypotheses are not validated results or permission for automatic subscription, entry-email reuse or longer retention. Current repository plus specific Linear drafts form the editorial baseline; makeup-portfolio sources are excluded; memoir voice remains provisional. No additional repository inspection or tests performed for this document edit |
| S7 | Ash’s displayed access/privacy/offline proposal and explicit approval in the current conversation; recorded in DEC-001, DEC-003, DEC-006 and this PRD | 27 October 2026 at 09:26 UTC / 16:26 Asia/Bangkok | Approved product-policy reconciliation: 10-minute single-use emailed codes, maximum 30-day device access, minimal reader record deleted after 12 months without authenticated use, separate optional newsletter double opt-in, Ash-only internal operations with separate provider disclosure, and v1.0 manuscript offline deferral without intentional offline chapter caching. Historical policies/eligibility/work preserved; no issue cancellations. Provider delivery/log/backup lifecycle, privacy notice/reviewer, deletion procedures, numeric controls and technical feasibility unresolved. No provider, repository-policy change, implementation, tests, publication or launch approval |

## Changelog

| Version | Date | Change |
| -- | -- | -- |
| 1.0.1 | 2026-11-03 (Asia/Bangkok) | Updated document-control version and revision date and added this bottom changelog. Preserved all requirements, acceptance IDs, discovery findings, decision records, historical approvals, evidence references and unresolved readiness limitations unchanged. No implementation, privacy acceptance, publication or launch approval is added. |
| 1.1.0 | 2026-11-04 (Asia/Bangkok) | Proposed scoped reconciliation of confirmed design, theme-preservation, retained-page visibility and business-counting decisions; linked the saved decision register and added dated source/approval distinctions. Proposed explicit PRD version convention. Preserved historical approval dates, access policies and unapproved R3/T1/RT2/C1 candidates. Chat-proposed validation remains Not run; no new implementation, collection, testing, publication or launch is authorised. |
| 1.1.1 | 2026-11-04 (Asia/Bangkok) | Corrected stale pending-save and proposed-convention wording to reflect the approved and completed v1.1.0 save. The v1.1.0 changelog wording is retained as historical evidence of that saved text. Requirements, approval boundaries, candidate states and validation results are unchanged. |
