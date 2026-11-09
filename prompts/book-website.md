# Book-website requirements reconciliation

## 1. Objective

Reconcile the book website’s current requirements, source content and unresolved decisions; produce an evidence-led specification draft, not a fresh site build.

## 2. Inputs and scope

[repository instructions](../AGENTS.md); [guideline reading order](../guidelines/README.md); [book brief](../content/book/this-one-time-on-acid-brief.md); [registered routes](../src/app/routes.ts); [package manifest](../package.json).

Inputs: current book brief, existing site implementation, manuscript and author-approved material. Treat the original long book-website specification as historical input rather than current approval.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory the current book-first journeys: discover the book, inspect/read the draft, join the waitlist, discover the author, Journal, events/speaking and media/contact. Use actual routes and access rules; do not create a parallel makeup portfolio, shop, API or gated account system.

2. Compare book positioning, synopsis, chapter samples, manuscript status, author biography, endorsements and publication/availability claims with their source and revision. Leave unknowns explicit; do not invent a title history, release date, testimonial or live preorder.

3. Compare current art direction with the brief: near-black #0B0B10, pink #FF3AAE, yellow #F4FF3C and at most two fonts. Verify current tokens and intentional exceptions rather than replacing every colour or adding fonts; preserve the readable light theme and reduced-motion behaviour.

4. Assess responsive navigation, accessible controls, search, signup validation/success/error/privacy, reader access/deep links, book imagery and content hierarchy. Distinguish visible interface from verified submission, email delivery or authorisation behaviour.

5. Catalogue historical identity, route, content-model, dependency and implementation proposals as adopt, adapt, hold or reject with evidence. Keep legitimate memoir makeup/festival/ADHD/cycling/company/cat material when relevant to the book; removing a former website reference does not authorise erasing the author’s history.

6. Present the smallest supported requirements change with acceptance criteria, dependencies, risks and unresolved author/design decisions. No automatic implementation, content generation, route creation, new dependency, tracker update or deployment.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] Requirements distinguish current authority from historical site-generation instructions.
- [ ] Book-first journeys and sourced memoir material are preserved.
- [ ] Any conflict or proposed future commerce/reader capability is an explicit decision, not an assumed ban or commitment.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/book-website.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
