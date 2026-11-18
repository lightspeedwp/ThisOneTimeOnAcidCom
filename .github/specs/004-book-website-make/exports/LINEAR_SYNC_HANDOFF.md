# Linear sync hand-off — Spec 004 changes from PR #589

| Field | Value |
| --- | --- |
| Prepared | 2026-11-18 |
| Source | [PR #589](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/589) (merged into `main`) |
| Audience | The Linear agent, acting for Ash |
| Linear project | This One Time on Acid — book |
| Status | **Proposed changes only.** Nothing here has been saved to Linear. |

## Instructions for the Linear agent

1. Read each target document in Linear before changing it. If its current version or text no longer matches the "Expected current" values below, stop and report the difference instead of applying the patch.
2. Show Ash the exact change for each document and save it only after Ash approves that document. These documents record that saving does not authorise implementation, and that any correction needs an exact preview and explicit approval.
3. Apply only the edits listed. Keep all other content, links, mentions and changelog history unchanged.
4. Use the actual save date in Asia/Bangkok for "Last revised" and the changelog row. The dates below assume 2026-11-18.
5. After saving, read each document back, compare it with the approved patch and report any difference without silently repairing it.
6. Report the outcome as a comment on the pull request that added this file, or to Ash. Do not edit this repository.

## Part A — exact patches: superseded author-brief version

Both documents record the author brief ([TOA - Book website brief — author decisions and launch scope](https://linear.app/lightspeedwp/document/toa-book-website-brief-author-decisions-and-launch-scope-8d63b8dda8d8)) as "inspected version 1.2.1". That brief is now at **v1.3.0** in Linear. v1.2.2 (9 November 2026) reconciled the retained-page inventory, indexing and hand-off wording. Spec 004 FR-002 reconciles File 03 from v1.2.2 to v1.3.0. The repository copies were annotated in PR #589; see [version-reconciliation.md](../version-reconciliation.md).

### A1. TOA - Figma Make specification and prompt pack — Book website launch

- Linear: [document](https://linear.app/lightspeedwp/document/toa-figma-make-specification-and-prompt-pack-book-website-launch-33f83ff4f8cc)
- Repository copy: [references/01-book-website-specification.md](../references/01-book-website-specification.md)
- Expected current: Version `1.0.0`; Last revised `2026-11-09 (Asia/Bangkok)`

| # | Find (exact) | Replace with |
| --- | --- | --- |
| 1 | `\| Version \| 1.0.0 \|` | `\| Version \| 1.0.1 \|` |
| 2 | `\| Last revised \| 2026-11-09 (Asia/Bangkok) \|` | `\| Last revised \| 2026-11-18 (Asia/Bangkok) \|` |
| 3 | `revised 8 November 2026: book-first scope, launch inventory, editorial boundaries and continuing pause.` | `revised 8 November 2026: book-first scope, launch inventory, editorial boundaries and continuing pause. Superseded: the brief is now v1.3.0 (v1.2.2, 9 November 2026, reconciled retained-page inventory, indexing and hand-off wording). Recheck before use.` |

Changelog: add this row above the `1.0.0` row:

```markdown
| 1.0.1 | 2026-11-18 (Asia/Bangkok) | Record that the inspected author brief v1.2.1 is superseded by v1.3.0. No other content changed. No implementation, Git operations, publication or deployment authorised by saving. |
```

### A2. TOA - Figma Make companion session plan — navigation, themes and first podcast episode

- Linear: [document](https://linear.app/lightspeedwp/document/toa-figma-make-companion-session-plan-navigation-themes-and-first-69a72258146f)
- Repository copy: [references/02-companion-session-plan.md](../references/02-companion-session-plan.md)
- Expected current: Version `1.0.4`; Last revised `2026-11-09 (Asia/Bangkok)`

| # | Find (exact) | Replace with |
| --- | --- | --- |
| 1 | `\| Version \| 1.0.4 \|` | `\| Version \| 1.0.5 \|` |
| 2 | `\| Last revised \| 2026-11-09 (Asia/Bangkok) \|` | `\| Last revised \| 2026-11-18 (Asia/Bangkok) \|` |
| 3 | `\| v1.2.1; updated 8 November 2026 \|` | `\| v1.2.1; updated 8 November 2026 (superseded: now v1.3.0; v1.2.2 on 9 November reconciled retained-page inventory, indexing and hand-off wording) \|` |
| 4 | Review and approval row beginning `\| Previous saved revision \| 1.0.3;` | `\| Previous saved revision \| 1.0.4; records DR-03 audit provenance, requirement wording and unresolved applicability \|` |
| 5 | Review and approval row beginning `\| Current document revision \| 1.0.4;` | `\| Current document revision \| 1.0.5; records that the inspected author brief v1.2.1 is superseded by v1.3.0. Saving does not establish earlier approval provenance, policy adoption, prompt-transfer readiness or implementation authority \|` |

Changelog: add this row above the `1.0.4` row:

```markdown
| 1.0.5 | 2026-11-18 (Asia/Bangkok) | Record that the inspected author brief v1.2.1 is superseded by v1.3.0. Preserve all other content, historical approval qualifications and the implementation pause. |
```

## Part B — decisions to carry into Linear (preview wording with Ash first)

PR #589 recorded these decisions by Ash. The Linear records that hold reader, launch and design decisions do not yet show them. Propose wording for the affected documents (most likely the [design and reader decision register](https://linear.app/lightspeedwp/document/toa-book-website-design-and-reader-decision-register-be84aedd1a47), the [author brief](https://linear.app/lightspeedwp/document/toa-book-website-brief-author-decisions-and-launch-scope-8d63b8dda8d8) and the [PRD](https://linear.app/lightspeedwp/document/toa-prd-website-and-reading-experience-b7f8974e507e)), and save only what Ash approves.

| # | Decision (2026-11-13) | Repository record |
| --- | --- | --- |
| B1 | **Early release.** Build all reader screens and functionality now. Publish chapters and addendums one at a time as Ash approves each. The website edition is shorter than the printed book and will be offered for sale via the website later. Full-manuscript approval no longer gates the reader screens; per-chapter approval gates publication. | [research.md](../research.md) Decision 5; [spec.md](../spec.md) |
| B2 | **Reader access moves to Spec 005.** Reader access, recovery and error states (historically Spec 004 Prompts 3A–3C) are owned by [Spec 005](../../005-reader-access/spec.md). Stage IDs 3A–3C stay with the master contract's podcast stages. | [spec.md](../spec.md) stage ID section |
| B3 | **Reader-access email copy approved** (subject "Your reading code", signed "— Ash", 10-minute single-use code, optional newsletter link). | [contracts/prompt-3a-reader-access.md](../contracts/prompt-3a-reader-access.md) Email Copy |
| B4 | **Route enforcement**: noindex meta tags plus XML-sitemap exclusion for /speaking, /events and /media; no robots.txt `Disallow`. | [research.md](../research.md) Decision 7 |
| B5 | **Content location**: Ash is moving the root `content/` folder to `src/content/`. | [Spec 005 decisions](../../005-reader-access/decisions.md) |

### Open conflict — do not resolve without Ash

Spec 004 records recovery as ending 30 days after initial verification with no extension. The register (v1.13.0, per Spec 005) allows a later fresh-code redemption to restart up to thirty days repeatedly, with no overall ceiling. Raise this with Ash; do not pick a side when editing Linear.

## Not included

- No Linear issue, project, label, relationship or status changes.
- No changes to the repository copies of these documents. They keep their local annotations.
