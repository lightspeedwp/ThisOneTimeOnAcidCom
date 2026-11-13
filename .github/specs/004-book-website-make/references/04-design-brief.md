# TOA - Design brief — Book website and verified reading experience

| Field | Value |
| -- | -- |
| Version | 1.1.2 |
| Document status | Brief content approved for recording — design deliverables, acceptance and implementation not authorised |
| Last revised | 2026-11-08 (Asia/Bangkok) |
| Design surface and audience | Book website, public content and verified reading experience; readers interested in personal storytelling, creativity and lived experience |
| Design source baseline | Website scope brief, PRD v1.1.1 and design and reader decision register v1.0.0; scoped confirmed design and visibility decisions are recorded below. Authoritative Figma frames, asset revisions, component mappings and implementation parity remain unconfirmed |

Document versions follow the local document SemVer convention: patch for compatible corrections, minor for compatible additions and major for incompatible instructions, commitments or assumptions. Unsaved review rounds and no-ops add no increments. Historical identifiers and revision references must be preserved. Last revised records this document’s content-revision date, not an assessment, approval or publication date.

This brief covers website design discovery, refinement and specifications. Conditional requirements remain explicitly unresolved rather than being treated as approved.

This is a design requirements record, not a technical implementation plan, commercial agreement or production authorisation. Approval applies only to the exact artefact, revision, scope and action recorded.

## Objective

Define a coherent, book-first website experience that introduces **This One Time on Acid**, explains its shorter living-manuscript edition and supports reading after email verification.

The existing website scope brief records launch pages, editorial boundaries, access policies and outstanding operational decisions. This design brief translates those sources into observable design requirements, journeys, content states and review criteria without duplicating or superseding their authority.

The design problem is to make the relationship between public book information, protected reading, optional newsletter subscription and contact clear, while preserving the book’s distinct identity and separating it from Ash’s portfolio.

Existing page annotations report missing thank-you and podcast surfaces and privacy/terms errors. These are recorded observations requiring verification, not independently confirmed live findings.

## Goals

| Goal ID | Desired outcome | Success signal or observable evidence | Source | Unresolved measurement |
| -- | -- | -- | -- | -- |
| G-01 | Establish a clear book-first identity | Reviewed hierarchy introduces the book, author, shorter website edition and reading action without becoming a portfolio | S-01 | Design-review method and participant coverage unconfirmed |
| G-02 | Make verified reading understandable | Reviewed journey distinguishes email submission, code verification, access granted and reader loading | S-01, S-02, S-03 | Usability method and acceptance evidence unconfirmed |
| G-03 | Keep newsletter and contact purposes separate | Forms, notices and confirmation states do not imply that reading requires newsletter subscription | S-01, S-03 | Operational behaviour remains subject to separate validation |
| G-04 | Support inclusive, sustained reading | Designs address prose, navigation, focus, contrast, responsive behaviour and relevant interaction states | S-01, S-05 | Browser/device matrix and specialist review arrangements unconfirmed |
| G-05 | Provide traceable design decisions | Requirements, source revisions, deliverables, acceptance evidence and unresolved conditions are linked | S-01, S-08 | No completed design acceptance established |

Design quality and usability checks are distinct from later conversion, search, publication or commercial results. A reviewed concept does not establish those results.

## Audience

The recorded primary audience includes people interested in personal storytelling, creativity, alternative culture and lived experience—particularly misfits, makers, dancers, seekers, festival people and people who feel wired a little differently.

Secondary audiences include people familiar with Ash’s creative work and potential collaborators. This positioning is author-supplied direction, not validated audience research.

Primary audience jobs are:

* Understand the book and the status of the website-specific manuscript.
* Verify an email address and read the entire shorter website edition.
* Return to reading with clear explanations when verification is required again.
* Independently choose newsletter subscription or contact.
* Find accurate information about Ash and approved future-edition plans.

Relevant needs include readable long-form content, keyboard access, clear form instructions, understandable errors and accessible verification states. Specific assistive-technology, language, device and connection-use findings remain unconfirmed.

No additional language editions, audience segments or accessibility certifications are assumed.

## Scope and non-goals

* **Included design surfaces, media and activities:** Public website hierarchy, launch-page layouts, verified-reading journeys, forms and confirmation states, responsive behaviour, visual-system reconciliation and design acceptance planning.
* **Excluded scope:** Portfolio redesign; manuscript writing or adaptation; provider implementation; account configuration; analytics activation; repository changes; deployment; publication; expenditure; printed products.
* **Confirmed decisions and approved boundaries:** Book-first positioning; entire shorter website manuscript after verification; optional separate newsletter; Ash’s design and publication authority; recorded access lifecycle; offline manuscript downloads deferred. Apply the scoped typography, palette, layout and dark-first preservation of light support recorded below. Speaking/workshops, events and media/press remain public at retained direct URLs, without menu/footer links and with noindex directives; their claims and assets require separate approval.
* **Proposed additions or later candidates:** Deliverables and validation approach below; detailed analytics consent interfaces where the approved processing arrangement requires them. R3, T1, RT2 and C1 remain unapproved review candidates, not adopted specifications.
* **Relevant timing and deliverable:** Unconfirmed. No design, publication or launch date is proposed.
* **Commercial coverage or approval reference:** Unconfirmed. This personal-project draft establishes no commercial authorisation.

Concepts, accepted designs, handoff files and published experiences remain distinct.

Coding, architecture changes, integrations, deployment, manufacture, print ordering, publication and expenditure are outside this brief’s authorisation. They may be dependencies, not delivery commitments. Unknown commercial coverage does not authorise delivery.

## Messaging priorities

1. **Book identity:** Introduce the working title and author-supplied subtitle, subject to final publication approval.
2. **Reading offer:** Explain that verified readers receive the complete shorter website edition—not selected excerpts or the future full-length book.
3. **Manuscript status:** Describe a living, evolving manuscript without implying editorial completion or publication clearance.
4. **Primary action:** Make the reading entry point prominent and its email-verification requirement explicit.
5. **Secondary actions:** Offer newsletter subscription and contact independently, without guaranteed schedules or response times.
6. **Future editions:** Present print, ebook/Kindle and audiobook intentions only through approved, qualified wording.

Required content includes an approved biography, manuscript manifest and order, cover, selected imagery, captions, rights and credits, journal entries, podcast material, privacy information and terms.

No pre-orders, printed sales or PDF delivery are included at launch. Sample testimonials, unconfirmed appearances and placeholder artwork must not be presented as approved factual content.

Portfolio links may support the author context; the website does not contain a portfolio section. Autobiographical claims and third-party assets require supporting approval.

## Recommended structure

The following page inventory is recorded direction; the detailed arrangement and navigation model remain design proposals.

| Surface | Recorded purpose and design consideration |
| -- | -- |
| Home | Introduce the book and provide a clear reading entry point |
| The book | Explain themes, shorter edition, draft status and qualified future plans |
| Read the draft | Present verification and the complete approved shorter manuscript |
| About Ash | Concise approved biography, selected imagery and contact section |
| Waitlist/newsletter | Separate optional subscription and accurate benefits |
| Newsletter thank-you | Distinguish submission from confirmed subscription |
| Journal/blog | Launch conditional on at least three approved entries and a clear purpose |
| Podcast | Launch conditional on at least one approved item and a clear purpose |
| Contact | Dedicated form with agreed storage and confirmation behaviour |
| Contact thank-you | Acknowledge the actual recorded submission outcome |
| Privacy policy | Explain approved actual processing |
| Terms and conditions | Present appropriately reviewed terms |

Speaking/workshops, events and media/press must remain publicly accessible at their retained direct URLs, without menu or footer links, and carry noindex directives. Do not delete these pages or make them private. Retention does not approve their content for publication. Deployment was user-reported; retained-route responses, effective noindex and Google removal have not been verified. Noindex is not access control or proof of removal from search results.

**Proposed journeys**

* Public discovery → book explanation → email submission → code verification → access granted → manuscript loading → reading.
* Returning reader → authorised reading or clear reverification requirement.
* Optional newsletter → submission acknowledgement → double-opt-in confirmation.
* Contact → validation → successful storage acknowledgement or accurate failure/retry state.

The manuscript navigation model, chapter contents layout and any local reading-position behaviour require review. Cross-device progress synchronisation is excluded from launch.

Physical-media faces, panels and production specifications are not applicable to this website brief. No software architecture or implementation tasks are prescribed here.

## Requirements and constraints

Requirement IDs are stable draft identifiers and must be preserved through revisions. Priorities remain unconfirmed unless separately agreed.

| Requirement ID | Design requirement | Rationale / source | Priority, if agreed | Applicable surface / variant | Acceptance references | Decision state |
| -- | -- | -- | -- | -- | -- | -- |
| WEB-D01 | Maintain a book-first hierarchy with a clear reading action | S-01 | Unconfirmed | Public pages | AC-01 | Recorded direction; design pending |
| WEB-D02 | Distinguish the shorter website edition from excerpts and future editions | S-01, S-02 | Unconfirmed | Book and reading entry | AC-02 | Recorded scope |
| WEB-D03 | Distinguish submission, code dispatch, verification success, failure and content loading | S-02, S-03 | Unconfirmed | Verification journey | AC-03 | Policy recorded; interface pending |
| WEB-D04 | Explain expiry, sign-out and reverification without misleading access promises | S-02, S-03 | Unconfirmed | Returning-reader states | AC-03 | Policy recorded; interface pending |
| WEB-D05 | Keep manuscript access, newsletter and contact purposes and notices separate | S-01, S-03 | Unconfirmed | Forms and notices | AC-04 | Recorded boundary |
| WEB-D06 | Reflect actual success outcomes rather than treating thank-you visits as conversions | S-01, S-07 | Unconfirmed | Confirmation states | AC-04 | Business definitions recorded |
| WEB-D07 | Use approved manuscript, biography, imagery and publication wording | S-01, S-06 | Unconfirmed | All content surfaces | AC-02 | Exact content approvals outstanding |
| WEB-D08 | Address readable prose, keyboard/focus behaviour, contrast and responsive layouts | S-01, S-05 | Unconfirmed | All interactive surfaces | AC-05 | AAA target recorded; acceptance unresolved |
| WEB-D09 | Apply scoped confirmed typography, palette, layout and theme direction; reconcile remaining components, tokens and voice against that baseline | S-01, S-10, S-11 | Unconfirmed | Visual system | AC-06 | Book brief is the starting baseline; Ash approves exact reconciled values; remaining mappings and acceptance evidence unresolved |
| WEB-D10 | Preserve conditional journal/podcast requirements and retain speaking/workshops, events and media/press at public direct URLs without menu/footer links and with noindex directives | S-01, S-10, S-11 | Unconfirmed | Navigation and content modules | AC-01, AC-02 | Scoped visibility direction confirmed; content approval, retained-route and effective-noindex evidence pending; no deletion or private access authorised |
| WEB-D11 | Provide traceable, revision-specific design evidence and unresolved conditions | S-08 | Unconfirmed | All deliverables | AC-07 | Proposed review requirement |
| WEB-D12 | Do not offer offline manuscript downloads or imply cross-device progress synchronisation | S-02, S-03, S-05 | Unconfirmed | Reading interface | AC-03 | Recorded launch exclusions |

### Sources, assets and design direction

* **Source assets and repository references:** Website scope brief, decision records and `lightspeedwp/ThisOneTimeOnAcidCom`. The original brief candidate did not inspect repository contents. Later revision-specific findings below and the targeted static evidence referenced by S-10/S-11 have bounded coverage; neither establishes a fresh complete repository inspection, runtime behaviour or design parity.
* **Verified asset versions, frames, pages or revisions:** Figma and artwork revisions remain unconfirmed. The scoped design baseline below does not establish asset clearance, frame authority or implementation parity.
* **Existing components, tokens and brand rules:** Confirmed typography, palette and layout direction are recorded below and in S-10/S-11. Component revisions, complete token mappings, interaction verification and voice reconciliation remain unresolved.
* **Visual direction and references:** Ash holds design and final editorial/publication authority. The book brief is the starting design baseline; existing CSS, theme JSON and unverified Figma do not automatically take precedence.

### Confirmed design reconciliation — 4 November 2026

This section records scoped decisions, not completed design deliverables or implementation acceptance. Use PRD v1.1.1 (S-10) and the design and reader decision register v1.0.0 (S-11) for their decision evidence and approval boundaries. Register-save approval did not approve its embedded candidate specifications or establish DEL-01 acceptance.

**Typography and layout**

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

Separately approved cover/logo lettering may fall outside the two-family interface limit. Existing Righteous, Playfair or Vampiro One declarations do not approve individual artwork lettering. Artwork selection, rights, credits and placement remain separately gated.

**Colour and interaction decisions**

Use S-11’s exact Approved design baseline tables for the confirmed dark palette and approved dark interaction-colour candidates. Do not silently substitute competing repository values or create a separately maintained interaction table here.

The approved palette values are `#0B0B10`, `#12121A`, `#171722`, `#F6F2EB`, `#CFC7BB`, `#9C9488`, `#FF3AAE`, `#F4FF3C` and `#8A63FF`. Semantic mapping and pairing-specific verification remain distinct from palette approval.

Ash approved the displayed dark interaction candidates on 4 November 2026 at 14:30 Asia/Bangkok subject to the stated checks. This establishes design choices, not verified contrast, accessibility conformance or implementation.

**Theme preservation**

Preserve both themes while reconciling dark mode first. Retain existing light capability, switching and saved-light preferences. Light design, first-visit default, system preference and persistence reconciliation remain unresolved. No dark-only launch or removal of light support is authorised.

**Unapproved candidates and evidence limits**

R3 responsive mappings, T1 additional typography/weights, RT2 reader typography and C1 continuity remain unapproved. Do not adopt their proposed numerical mappings, controls, heading-range exceptions, persistence, recovery or reset contracts through this brief.

The responsive checklist remains planned review material. The contrast, rendered typography, responsive, accessibility, persistence and continuity checks proposed in this chat remain Not run; this is not an exhaustive statement about historical project checks.

Font loading/licensing, component mappings, reader-setting limits, spread geometry, support coverage and criterion-specific WCAG 2.2 AAA evidence remain unresolved. Historical source conflicts remain evidence to reconcile, not authority to reverse the confirmed decisions.

**Partial support for DEL-01**

S-11 provides an identified supporting register with confirmed decisions, scoped precedence, candidate states and missing-input categories. It does not complete the website-wide source-precedence and design-gap deliverable.

Outstanding coverage includes exact Figma and asset revisions; source-by-source conflicts and dispositions; an inventory of retained components and patterns; remaining token and voice reconciliation; and requirement-to-source-to-acceptance traceability. Its OPEN-01–12 inventory does not establish exhaustive gap coverage.

S-11 records the historical v1.0.0 register snapshot inspected for the v1.1.0 brief reconciliation. Its PRD-reconciliation to-do wording predates the saved PRD updates. Later register recording corrections do not change that historical source snapshot; consult the current PRD and register for their latest status. This brief remains partial design documentation, not evidence of DEL-01 completion or candidate adoption.

* **Elements to retain, avoid or explore:** Retain book-first positioning and clear reading access; avoid portfolio takeover, unsupported promotional claims and misleading confirmation states. Explore hierarchy and reading layouts within the approved direction.
* **Content accuracy, rights, licences and credits:** Cover, photographs and illustrations require individual approval; biography and manuscript claims require factual verification.

A linked asset does not establish approval, ownership or reproduction permission. Repository references do not authorise repository changes.

### Medium-specific constraints

* **Print and physical media:** Not applicable; promotional business cards and stickers have a separate brief.
* **Digital interfaces:** Responsive public pages, forms, verification states and sustained manuscript reading are applicable. Exact viewport, browser and device coverage remains unconfirmed.
* **Branding and visual content:** Typography, colour, imagery, identity usage and composition require source reconciliation and Ash’s review.
* **Technical and editor constraints:** DEC-002 records React/Vite on Netlify as the retained direction, with conditional Netlify server functions and Supabase Auth/private storage. This is feasibility context, not implementation permission. Current platform limits and Figma-hosted parity remain unverified.
* **Other requirements:** No invented production dimensions, platform capabilities or variant counts.

Technical feasibility must be checked against current applicable sources before a design is described as ready for handoff.

### Accessibility and inclusive design

Preserve the recorded **WCAG 2.2 AAA target** without claiming conformance.

Design review should address:

* Legible typography, prose hierarchy and reading order.
* Contrast and colour-independent meaning.
* Keyboard navigation, visible focus and logical focus movement.
* Form labels, instructions, errors and recovery.
* Verification, loading, confirmation and expiry states.
* Responsive content and interaction behaviour.

The exact test matrix, assistive-technology coverage, reviewer and specialist verification arrangements remain unresolved. Proposed checks are not completed checks; design review does not establish accessibility certification or deployed conformance.

### Dependencies and constraints

Dependencies include:

* Approved manuscript revision, order and publication manifest.
* Approved biography, subtitle treatment, cover, imagery, rights and credits.
* Approved journal and podcast material.
* Apply the recorded book-brief starting baseline and Ash’s exact-value authority; establish identifiable Figma, asset and implementation revisions for remaining design and acceptance decisions.
* Provider feasibility and accurate form/access-state definitions.
* Approved privacy notices and processing arrangements.
* Browser/device matrix and acceptance methods.
* Separate permission for testing, implementation, handoff and release where applicable.

Ash is the confirmed design and final editorial/publication authority. No additional contributor, reviewer, operator or delivery deadline is assigned by this brief.

## Deliverables and variants

The following are proposed design-stage artefacts, not an authorised production schedule.

| Deliverable ID | Artefact and stage | Surface / variants | Required fidelity and content | Format and source location | Linked requirements | Review gate |
| -- | -- | -- | -- | -- | -- | -- |
| DEL-01 | Source-precedence and design-gap register | Website-wide | Current references, conflicts, retained patterns and missing inputs; complete outstanding source, component and traceability coverage | S-11 is identified partial supporting material, not an accepted complete deliverable; complete artefact scope and location remain to be agreed | WEB-D09, WEB-D11 | Brief agreement; register creation approval does not establish deliverable acceptance |
| DEL-02 | Information architecture and journey/state map | Public, reading, newsletter and contact | Page hierarchy and relevant success/error/returning states | Review diagram; format/location unconfirmed | WEB-D01–06, WEB-D10, WEB-D12 | Design direction |
| DEL-03 | Representative responsive layouts | Key page families selected at review | Enough detail to assess hierarchy, prose, forms and visual direction | Editable source and review preview; revisions unconfirmed | WEB-D01–10, WEB-D12 | Design direction |
| DEL-04 | Design specification and handoff package, if requested | Agreed layouts and states | Accepted revisions, assets, tokens, requirements, evidence and unresolved conditions | Source files and exports; destination unconfirmed | All | Design acceptance, then handoff |

No fixed concept count, viewport count or export set is assumed. Existing design material should be reused where supported rather than recreated by default.

Editable sources, review previews and final exports remain distinct. Production-ready claims require verified destination specifications and appropriate review; file preparation does not authorise publication.

## Acceptance criteria and validation

All criteria below are proposed and **not run**.

| Acceptance ID | Requirement / deliverable IDs | Observable pass condition | Review method and context | Evidence reference | Result / unresolved condition |
| -- | -- | -- | -- | -- | -- |
| AC-01 | WEB-D01, WEB-D10; DEL-02–03 | Hierarchy reflects book-first positioning and conditional launch requirements; speaking/workshops, events and media/press remain publicly reachable at retained direct URLs, without menu/footer links and with noindex directives, neither deleted nor private | Annotated architecture/layout review; selected-candidate route, menu/footer and effective-noindex inspection; content approval review | S-10/S-11 record direction; candidate-specific validation evidence unconfirmed | Not run; design acceptance and effective-noindex evidence outstanding; no Google-removal result established |
| AC-02 | WEB-D02, WEB-D07, WEB-D10; DEL-02–03 | Content is traceable to approved edition, copy and asset revisions; placeholders and unapproved material are identified | Editorial/design comparison | Unconfirmed | Not run; content approvals outstanding |
| AC-03 | WEB-D03–04, WEB-D12; DEL-02–03 | Journey distinguishes relevant access states and reflects recorded expiry, reverification and launch exclusions | State-map/prototype review | Unconfirmed | Not run; runtime validation separate |
| AC-04 | WEB-D05–06; DEL-02–03 | Access, newsletter and contact purposes remain separate; confirmation wording matches actual defined outcomes | Form/copy/state review | Unconfirmed | Not run; processing details outstanding |
| AC-05 | WEB-D08; DEL-03 | Agreed layouts and states have recorded legibility, contrast, focus, reading-order and responsive review findings | Approved matrix and appropriate review methods | Unconfirmed | Not run; conformance not established |
| AC-06 | WEB-D09; DEL-01, DEL-03 | Typography, colour and layout reflect the scoped confirmed baseline; components and voice cite applicable approved sources; remaining conflicts and unapproved candidates stay explicit | Source-to-design comparison against S-10/S-11; component, font, contrast and responsive evidence | S-10/S-11 provide scoped baseline evidence, not completed validation | Not run; remaining mappings and criterion-specific evidence unresolved; DEL-01 acceptance not established |
| AC-07 | WEB-D11; DEL-04 | Handoff identifies exact sources, revisions, assets, acceptance findings and remaining conditions | Package completeness review | Unconfirmed | Not run; handoff not yet requested or approved |

Record checks as not run, passed, failed or not applicable with a reason. Planned checks do not establish completion.

Approve the identified test-pack revision separately from authorising execution. Safe test data, expected state changes and cleanup must be recorded before execution. This brief does not authorise live submissions, analytics events or configuration changes.

## Review gates and approval

| Gate | Candidate and exact revision | Review focus | Reviewer / decision-maker, if confirmed | Decision and evidence | Conditions / next authorised action |
| -- | -- | -- | -- | -- | -- |
| Brief agreement | Initial 1.0.0 | Outcome, audience, scope, requirements and proposed deliverables | Ash | Brief content approved for recording on 3 November 2026; creation proposal approved in this conversation | Recording only; no design execution, design acceptance, implementation or publication authorised |
| Design direction | Unconfirmed | Sources, alternatives, hierarchy and selected visual direction | Ash | Pending | Exact candidate and permitted next action required |
| Design acceptance | Unconfirmed | Agreed deliverables and acceptance evidence | Ash; additional specialist reviewers unconfirmed | Pending | Outstanding findings and exceptions remain explicit |
| Design handoff, where requested | Unconfirmed | Source completeness, specifications and unresolved conditions | Ash’s design authority recorded; recipient unconfirmed | Pending; conditional | Requires an explicit handoff request and approved scope |

Record approval, requested changes, rejection or pending review explicitly. Silence, file availability and completed issues do not establish design acceptance.

Brief approval does not approve a design. Design approval does not authorise implementation, expenditure, printing, manufacture, publication or deployment.

Material changes to an approved baseline require an exact revised proposal and approval for the affected scope. Unchanged approvals are not repeated solely because another review round occurs.

## Open questions

| Question ID | Decision or evidence needed | Affected requirements / deliverables | Options and evidence | Blocks which next stage? | Confirmed decision responsibility |
| -- | -- | -- | -- | -- | -- |
| Q-01 | Authoritative Figma frames, asset and implementation revisions, and remaining component/token mappings | WEB-D09; DEL-01, DEL-03 | Book brief is the starting baseline and Ash approves exact reconciled values; remaining sources require comparison without overriding confirmed decisions | Remaining design-direction and parity acceptance | Ash for design direction |
| Q-02 | Exact manuscript, copy and approved asset manifest | WEB-D02, WEB-D07; DEL-03 | Recorded publication direction does not approve individual content | Final content/design acceptance | Ash for editorial/publication approval |
| Q-03 | Supported viewports, browsers, devices and accessibility review method | WEB-D08; DEL-03 | Matrix and reviewer arrangements unconfirmed | Validation acceptance | Design authority: Ash; specialist responsibility unconfirmed |
| Q-04 | Detailed verification, returning-reader and failure-state behaviour supported by the selected service | WEB-D03–04; DEL-02–03 | Preserve accepted policy; verify feasibility and operation | Interaction specification/handoff | Technical responsibility unconfirmed |
| Q-05 | Contact/newsletter notices, processing and confirmation behaviour | WEB-D05–06; DEL-02–03 | Separate purposes and approved outcome definitions recorded | Final form/copy acceptance | Operational/privacy responsibility unconfirmed |
| Q-06 | Journal/podcast approved content and missing-page treatment | WEB-D07, WEB-D10; DEL-02–03 | Recorded minimum content conditions remain effective | Final launch design acceptance | Ash for content approval |
| Q-07 | Evidence for retained public, unlinked and noindex pages | WEB-D10; DEL-02 | Direct-access and noindex direction confirmed; route responses, menu/footer coverage, effective directives and content approval remain unverified | Final navigation/content handoff | Verification responsibility unconfirmed |
| Q-08 | Proposed deliverables, required fidelity, source locations and handoff recipient | WEB-D11; DEL-01–04 | Reuse existing suitable artefacts where verified | Authorising the next design stage | Ash for design scope; recipient unconfirmed |

Missing evidence is not a passed check. Some questions permit preliminary exploration but block acceptance or handoff; those distinctions must be recorded rather than treated as a single launch decision.

## Recommended next artefact

* **Proposed next artefact and purpose:** Complete the bounded DEL-01 source-precedence and design-gap assessment using S-11 as partial supporting material, to establish what existing website design material can be retained. Do not create a duplicate register or treat its creation approval as deliverable acceptance.
* **Prerequisite decisions and evidence:** Agreement on this brief’s scope; identifiable source frames, repository revision and existing assets.
* **Intended handoff recipient:** Unconfirmed. No company colleague is nominated for this personal project.
* **Required source files, exports and review evidence:** Relevant editable design sources, current page/state inventory and an annotated conflict register.
* **Unresolved conditions and downstream exclusions:** No implementation, provider configuration, testing, deployment, publication or expenditure is authorised.

A handoff recommendation is not permission to start downstream work.

## Sources and evidence

| Source ID | Link / asset / record | Revision or observation date | Inspected extent | Supported finding | Limitations / approval relevance |
| -- | -- | -- | -- | -- | -- |
| S-01 | [Book website brief — author decisions and launch scope](https://linear.app/lightspeedwp/document/book-website-brief-author-decisions-and-launch-scope-8d63b8dda8d8) | Saved additions verified 3 November 2026 | Full saved body inspected during this conversation | Website scope, launch inventory, policies, authority and proposed operational additions | Page annotations are reported observations; no live validation |
| S-02 | [ADR — PRD DEC-001: Manuscript entry and returning-reader access](https://linear.app/lightspeedwp/document/adr-prd-dec-001-manuscript-entry-and-returning-reader-access-5d00ad544425) | Current record checked 3 November 2026 | Full body inspected during source review | Scoped access and verification decisions | Scoped acceptance does not establish implementation |
| S-03 | [ADR — PRD DEC-003: Personal-data purpose, retention and consent](https://linear.app/lightspeedwp/document/adr-prd-dec-003-personal-data-purpose-retention-and-consent-132b620a39da) | Current record checked 3 November 2026 | Full body inspected during source review | Access lifecycle, purpose separation and operator boundaries | Contact/newsletter operations remain separately unresolved |
| S-04 | [ADR — PRD DEC-002: Manuscript capture platform and policy authority](https://linear.app/lightspeedwp/document/adr-prd-dec-002-manuscript-capture-platform-and-policy-authority-6e6fd177c1e2) | Current record checked 3 November 2026 | Full body inspected during source review | Approved preferred architecture and outstanding conditions | Historical unresolved wording coexists with scoped later approval; no runtime verification |
| S-05 | [ADR — PRD DEC-006: Compatibility, visual acceptance and offline launch scope](https://linear.app/lightspeedwp/document/adr-prd-dec-006-compatibility-visual-acceptance-and-offline-launch-d43d7c54dee9) | Current record checked 3 November 2026 | Full body inspected during source review | Offline deferral and unresolved acceptance boundaries | Does not establish accessibility or release acceptance |
| S-06 | [ADR — PRD DEC-004: Launch publication scope and editorial approval](https://linear.app/lightspeedwp/document/adr-prd-dec-004-launch-publication-scope-and-editorial-approval-adb6a648c238) | Current passages checked 3 November 2026 | Targeted editorial passages | Shorter-edition direction and manifest requirements | Scoped clarification does not accept the entire record or approve publication |
| S-07 | [TOA-430](https://linear.app/lightspeedwp/issue/TOA-430/research-analytics-define-journeys-and-conversion-measurement) | Current description checked 3 November 2026 | Full description inspected during source review | Approved business conversion definitions | Instrumentation and collection remain unapproved |
| S-08 | Workspace Design brief template | Current template retrieved 3 November 2026 | Complete body and native properties | Structure, controls and design-stage safeguards | Workspace-scoped; no default project; availability does not authorise creation |
| S-09 | Figma, repository, live website and service configurations | Unconfirmed | Not inspected for this candidate | No independently verified design/runtime finding | Source revisions, parity and feasibility require bounded inspection |
| S-10 | [PRD — This One Time on Acid website and reading experience](https://linear.app/lightspeedwp/document/prd-this-one-time-on-acid-website-and-reading-experience-b7f8974e507e) | v1.1.1; updated 4 November 2026 at 14:40:15.853 UTC | Current controls and scoped design/visibility reconciliation inspected for this proposal | Recorded decisions and requirements, not design acceptance or runtime results | Preserve historical approvals and unapproved-candidate boundaries |
| S-11 | [Book website — Design and reader decision register](https://linear.app/lightspeedwp/document/book-website-design-and-reader-decision-register-be84aedd1a47) | v1.0.0; updated 4 November 2026 at 14:00:10.492 UTC | Approved baseline, interaction choices, candidate states and outstanding decisions inspected | Partial DEL-01 supporting register; saving it did not approve embedded proposals or complete the deliverable | R3, T1, RT2 and C1 remain unapproved; register PRD to-do wording predates subsequent PRD updates |

S-09 preserves the original brief candidate’s inspection boundary. Later supplied revision-specific findings below and the bounded supporting-document comparison in S-10/S-11 do not constitute a fresh complete repository, Figma or runtime review.

The separate print-design brief is not a website-design baseline. No content or assets are transferred from the portfolio or print work by this candidate.

## Review and change history

**1.1.0 reconciliation candidate — prepared 4 November 2026:** this entry records the preparation of a compatible reconciliation using S-10/S-11. It is not evidence of subsequent save approval, deliverable acceptance or design acceptance. Any later authorisation must be evidenced by its exact approval record rather than inferred from this entry. Historical rows below retain their original scope and dates. R3, T1, RT2 and C1 remain unapproved; no implementation, test execution, publication or launch is authorised by preparing this candidate.

| Document revision | Change and affected IDs | Source baseline | Review / approval evidence | Outstanding conditions |
| -- | -- | -- | -- | -- |
| 1.0.0 | Initial website-specific brief; G-01–05, WEB-D01–12, DEL-01–04, AC-01–07 and Q-01–08 | S-01–09 | Ash approved the brief content on 3 November 2026 and subsequently approved creation and project attachment in this conversation; design acceptance and implementation remain unauthorised | Source precedence, artefact revisions, content approvals, deliverable agreement and validation arrangements |

Historical source decisions retain their own identifiers and approval boundaries. No earlier proposal is retrospectively marked approved.

Saving or versioning this document does not establish acceptance, operational adoption or permission to produce or publish the design.

### Additional page — Style Guide

Refine the existing book-specific `/style-guide` page within the website-launch design scope; do not create a duplicate page. Read-only repository verification establishes the route and nine sections at the revision below, not an existing Figma page, deployed parity or runtime acceptance. Use the supplied screenshot as a structural reference, not as approval of its visual values or content.

Retain the existing page shell and introduction, followed by nine sections: brand identity, colour palette, typography, buttons, forms, cards, tags and badges, icon library, and content patterns. Apply the detailed section requirements and acceptance criteria in the associated style-guide issue without dropping useful requirements.

Remove Nova News branding from the page. Identify the intended book-logo revision, approval, rights and credits before using it; do not invent a replacement logo or use protected assets without permission. Compare palette, typography, tokens, components, icons and examples across the existing page, brief, Figma and repository guidance against the scoped confirmed baseline in S-10/S-11. Record conflicting values and revisions; obtain Ash’s decision for unresolved mappings or exceptions rather than reopening confirmed values or silently selecting competing source authority.

### Revision-specific source evidence

Read-only repository verification at [`develop` revision `84242de7857e1ec03742e20aaaf1df469f44355f`](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/tree/84242de7857e1ec03742e20aaaf1df469f44355f>) establishes the `/style-guide` route (`routes.ts`, lines 27 and 51) and all nine sections in `StyleGuidePage.tsx`. This establishes repository source, not the current Figma destination, runtime behaviour or deployed parity.

* `StyleGuidePage.tsx`, lines 84, 288, 371, 374 and 615, retains Nova News branding.
* `design-tokens-reference.md`, lines 33–37, records a palette including `#FF006E`; `globals.css`, lines 35–39, instead records `#FF10F0`, `#F4FF3C`, `#1F51FF`, `#D4008C` and `#8A63FF`. Preserve these historical differences as reconciliation evidence; apply the scoped confirmed palette in S-10/S-11 rather than treating either repository source as independently approved authority. Remaining semantic and component mappings require Ash’s decision.
* The guideline at line 78 specifies an Inter stack; `globals.css`, lines 51–52, specifies Space Grotesk/Righteous/Playfair Display for headings and Inter for body text; `StyleGuidePage.tsx`, lines 455–456, claims Space Grotesk body text. Preserve all three historical observations; apply the confirmed Space Grotesk headings and Inter body/UI baseline in S-10/S-11. Remaining mappings or exceptions require Ash’s decision; individual cover/logo lettering remains separately gated.
* `Logo.tsx`, line 11 and its theme variants, references a protected Figma light asset and an Ash Shaw/MAKEUP ARTIST dark SVG. Neither establishes an approved book logo or reproduction permission.

These file/line findings are tied to the [fixed repository revision](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/tree/84242de7857e1ec03742e20aaaf1df469f44355f>); exact file paths are not included in the supplied verification handoff, so no guessed file-level URLs are used. The findings remain historical source evidence. The subsequently recorded book-brief starting baseline and Ash’s exact-value authority are set out in S-10/S-11; approved book-logo revision, rights, credits and protected-asset permission remain unresolved. No tests, builds, Figma inspection or repository writes were performed.

Use the existing style-guide surface for section-specific refinement once its editable Figma Make destination and review preview are identified. Record responsive behaviour, applicable interaction states and accessibility findings. Preserve the WCAG 2.2 AAA target without claiming conformance; conformance remains unverified.

The approved logo revision, rights and credits, protected-asset permissions, remaining source/component mappings, exact editable Figma Make destination and revision remain unresolved. Apply the scoped confirmed baseline in S-10/S-11. Style Guide navigation exposure and publication remain separate decisions. This refinement does not replace DESIGN.md, remediate the wider specification, expand the Figma-variable or Storybook work, or authorise Figma edits, repository implementation, public-navigation changes or publication.

## Changelog

| Version | Date | Change |
| -- | -- | -- |
| 1.1.2 | 2026-11-08 (Asia/Bangkok) | Clarified how the historical Style Guide palette and typography discrepancies are reconciled against the already recorded scoped baseline: Space Grotesk headings, Inter body/UI and the S-10/S-11 palette. Preserved historical observations, remaining mapping decisions, separate cover/logo approval and asset-rights gates, Figma destination uncertainty and publication boundaries. Reordered existing changelog entries newest first without rewriting their contents. No design acceptance, implementation, publication or launch readiness established. |
| 1.1.1 | 2026-11-04 (Asia/Bangkok) | Clarified that S-11 identifies the historical register snapshot used for v1.1.0, not the register’s current completion status. Preserved source history, requirements, priorities, acceptance states and unapproved candidate boundaries. |
| 1.1.0 | 2026-11-04 (Asia/Bangkok) | Candidate prepared to reconcile scoped confirmed design and retained public/unlinked/noindex visibility using PRD v1.1.1 and register v1.0.0. Identifies partial DEL-01 support and outstanding coverage, preserves unconfirmed priorities and evidence-reference semantics, and distinguishes historical inspection limits. This entry records candidate preparation, not a later save approval or completed deliverable. Historical approvals and unapproved R3/T1/RT2/C1 states remain unchanged; no implementation, execution, publication or launch is authorised. |
| 1.0.1 | 2026-11-04 (Asia/Bangkok) | Added this bottom changelog and updated the document-control version and revision date. Preserved the complete website design brief, existing review and change history, additional Style Guide section, source references, unresolved conditions and approval boundaries unchanged. This maintenance revision does not establish design acceptance, source verification, implementation, publication or launch readiness. |
