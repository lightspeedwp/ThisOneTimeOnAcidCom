# Book-site route and URL integrity review

## 1. Objective

Assess the current registered routes and incoming/outgoing links without recreating former site routes.

## 2. Inputs and scope

[repository instructions](../../AGENTS.md); [guideline reading order](../../guidelines/README.md); [book brief](../../content/book/this-one-time-on-acid-brief.md); [registered routes](../../src/app/routes.ts); [package manifest](../../package.json).

Inputs: current repository instructions, actual source/configuration/manifest, approved scope and relevant existing work. Confirm paths and scripts against the inspected revision; no implied command execution.

Read current evidence before following historical path examples. This is a React/TypeScript/Vite book website, not a WordPress runtime or makeup-portfolio rebuild. Retain sourced memoir material without restoring its former page architecture.

## 3. Audit steps

1. Inventory the actual route tree, nesting, index routes, aliases, parameters, catch-all and page consumers from src/app/routes.ts. Multiple index routes in different parent scopes may be valid; do not enforce a single global index.

2. Check current public routes: /, /the-book, /read-the-draft, /read-the-book alias, /thank-you, /ebook, /about-ash, /waitlist, /journal, /journal/:slug, /events, /speaking, /contact, /media, /search, /sitemap, /style-guide and catch-all, then refresh from source before execution.

3. Trace navigation, CTA, footer, content/Markdown, data, search/sitemap, deep links and parameter/query consumers. Distinguish current routes, deliberate aliases, external URLs and historical example links.

4. Assess book-discovery/waitlist/reader flows, invalid IDs/slugs/queries, not-found/error behaviour and direct-load/deep-link handling where an environment is authorised. Source declarations alone do not prove server fallback or redirects.

5. An unregistered page file is not automatically orphaned or required to become a route; trace imports and held work before proposing its disposition. Preserve the historical entry points needed by incoming links.

6. Return a route/link matrix, exact proposed destination corrections and dependencies. No route, navigation, sitemap, rewrite-rule, data or guideline edits; no arbitrary URL fetches.

## 4. Missing evidence and permission boundaries

If a required source, current requirement, environment or permission is unavailable, identify the affected check and stop that part; do not fabricate a substitute or silently broaden scope. Treat historical totals and completion statements as reported evidence, not current results.

Default to read-only assessment. A request to edit or review this prompt does not authorise its underlying task. Do not edit application files, manuscript, images, guidelines, configuration, trackers or Linear records; execute commands, publish, archive or delete only under separately explicit authorisation. Never use age, zero imports or route absence alone as deletion approval. Preserve protected files and existing image sources.

Use UK English and sentence case while preserving exact quotations and proper nouns. Use he/him for Ash; do not alter other people’s pronouns. Do not invent dates, authors, social accounts, quotes, testimonials, transcripts, counts, progress, performance savings or duration estimates.

## 5. Success criteria

- [ ] The complete in-scope inventory, consumers and protected exceptions are recorded.
- [ ] Each proposed change preserves actual contracts and has evidence, dependencies and verification needs.
- [ ] Coverage, exclusions and source revisions are recorded; planned, static and executed checks are distinct.
- [ ] Proposed changes and unresolved decisions are presented for approval; no implementation or publication is implied.

## 6. Report output

Return Markdown containing scope/revision, inspected inventory, evidence-linked findings, accepted exceptions, proposed actions and limitations. Record each finding’s path and lines, expected versus observed behaviour, impact, uncertainty and verification needed. Mark checks passed, failed, blocked, not tested or not applicable from evidence; never prefill results.

Drafts stay in the response unless a destination is explicitly approved. If repository report persistence is separately requested, propose a relevant root `reports/{topic}/` path and exact content first; task lists and tracker changes require their own approval. Do not overwrite historical reports, mark work complete automatically or move prompts to `.github/prompts/`.

## 7. Revision provenance

[Original prompt at the reviewed baseline](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/3f583002482d80ffd1910676bcf7c63e13989b20/prompts/project-stability-audit/03-routes-urls.md). The original remains historical evidence, not additional execution instructions. Proposed replacement prepared on 24 October 2026; refresh the revision/date and seek renewed approval for material changes before application.
