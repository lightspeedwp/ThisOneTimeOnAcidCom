**Originally created:** March 6, 2026

# Book-site launch-readiness evidence review

## 1. Objective

Assess evidence for launch readiness without deploying, fabricating check results or reopening the former site’s feature programme.

## 2. Inputs and scope

[repository instructions](../../AGENTS.md); [guideline reading order](../../guidelines/README.md); [book brief](../../content/book/this-one-time-on-acid-brief.md); [registered routes](../../src/app/routes.ts); [package manifest](../../package.json).

Inputs: current book-first journeys, actual deployment/configuration evidence, approved release scope and separately authorised browser/CI results. Current source alone does not prove deployed behaviour.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory launch-critical journeys: book discovery, draft/reader access, waitlist validation/success/error/privacy, author/Journal/events/speaking/media/contact, search and 404/deep links. Distinguish UI access-gate appearance from verified security or backend submission.

2. Assess current metadata, canonical/social URLs, indexability, sitemap/robots, structured data and legitimate source claims. No blanket allow-all crawler policy or unsupported SearchAction schema; validate applicable types and actual search behaviour.

3. Assess keyboard/focus, semantics, names, contrast, responsive/reduced-motion states and reader comfort. Record WCAG target and sampled scope; an automated score is not whole-site compliance.

4. Assess available bundle/load/asset/runtime measurements, caching and performance risks; separate measured outcomes from proposed optimisations. Do not replace images or invent targets, savings or results.

5. Assess manifest/service worker/PWA and offline behaviour only where currently implemented and required. Do not add installation/offline features solely because a historical launch checklist names them.

6. Assess cross-browser/content/legal/privacy readiness and effective deployment headers/security where evidence exists. A configuration declaration is not proof of active production headers; absent access is a limitation.

7. Return a readiness matrix across SEO, accessibility, performance/PWA, browser/functionality, source/content accuracy, deployment, legal and privacy readiness. Identify blockers, accepted decisions and untested checks; no deploy, publishing, dependency changes, task updates or automatic sign-off.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] Readiness claims identify exact source/build/environment and scope.
- [ ] Five historical launch areas are retained without false passes or unapproved features.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/production-launch-prep/orchestrator.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
