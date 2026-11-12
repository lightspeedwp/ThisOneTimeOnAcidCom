# Netlify asset caching and header verification

Source review: 24 October 2026, revision
`3f583002482d80ffd1910676bcf7c63e13989b20`.

Original guide date: 18 October 2026.
Historical branch: `perf/netlify-asset-caching-headers`.
Related work: [GitHub issue #6](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues/6).

This guide separates source configuration, historical reports and outstanding
verification. No build, TOML validation, deployment request, browser check or
performance measurement was executed for this review.

## Repository configuration

Root [`netlify.toml`](../netlify.toml) declares:

- Build command `npm run build`; publish directory `dist`
- Node version `24` and npm version `10` in build environment settings
- HTML revalidation for `/` and `/index.html`
- Baseline headers and a catch-all SPA rewrite

`src/app/netlify.toml` is absent at this revision. Root guidance and configuration
comments still referring to that file are unresolved documentation conflicts.
Source comments describing root configuration as active do not establish the
effective settings of a particular deployment.

| Source | Cache-Control | Scope |
|---|---|---|
| Root configuration | `public, max-age=0, must-revalidate` | `/` and `/index.html` |
| Generated `dist/_headers` | `public, max-age=31536000, immutable` | Exact matching content-hashed bundle paths |

The Vite plugin in
[`scripts/netlify-hashed-asset-headers.mjs`](../scripts/netlify-hashed-asset-headers.mjs)
generates rules from bundle entries matching its filename pattern. It excludes
unchanged public-file copies and emits no `/assets/*` wildcard.
Do not edit generated output or assume every assets-directory file is hashed.

Declared baseline headers are:

```text
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
```

Root configuration declares neither Content-Security-Policy nor X-XSS-Protection.
Earlier baseline examples also included `interest-cohort`; that value is not in
the reviewed root declaration. None of these source observations establishes
live headers or security adequacy.

## Verification procedure and boundaries

For separately authorised verification:

1. Record the deployment URL, revision, observation time and effective
   configuration from deployment/build evidence.
2. Record an authorised build command's actual result and inspect emitted asset
   references and exact-path rules. Reading TOML text is not syntax validation.
3. Capture actual statuses, Content-Types and response headers for HTML,
   sampled assets, missing assets and public files.
4. Check intended routes, including `/journal`, `/about-ash` and `/contact`,
   in the browser. A 200 SPA response does not prove the intended page rendered.
5. Record browser integration and performance results separately using the
   [integration validation plan](INTEGRATION-VALIDATION-PLAN.md).

The defined checker invocation is:

```bash
node scripts/check-netlify-headers.mjs <deployment-base-url>
```

The argument represents the exact authorised deployment URL, not a literal
placeholder to execute. See the integration plan for the checker's actual
assertions and limits. Do not manufacture before-and-after response transcripts.

The checker requires a missing asset to return 404 without immutable caching,
and `/favicon.ico` to return 200 with an image Content-Type and no immutable
caching. The root catch-all does not explicitly define the missing-asset
exception. Record observed mismatches without changing routing as a
documentation correction.

### Update behaviour

This guide does not authorise a production deployment or a test-only CSS change.
When two approved preview revisions already exist, compare their HTML asset
references, response headers and browser behaviour with caching enabled.
Unchanged immutable assets may legitimately remain cached.

Record hard-reload and service-worker observations separately. Do not clear
reader storage or unrelated site data. Cache policy alone does not establish
immediate updates, faster pages or absence of stale resources.

### CSP and integrations

Root configuration explicitly defers CSP. Inspect enforced and report-only
response headers and any CSP meta policy before describing a deployment's
policy as present or absent.

`frame-ancestors` controls who may embed this site, not which external frames
this site may load. `connect-src` alone does not authorise scripts or frames.
A passing cache checker is not a CSP audit or an integration success.
Policy design and deployment changes require separate approval.

## Historical evidence and displaced claims

The following reports are preserved as historical observations, not new results.

### Earlier examples and local-build assertions

The guide listed `index-BiYfWfa0.js`, `index-BMyFmeQv.css` and
`EventsPage-qaO06gmE.js` as example assets. These are not a current manifest.

It marked a local build, all asset hashing, TOML validity and nested
configuration presence complete without attaching a revision or command output
in that section. The nested-path assertion conflicts with the reviewed tree.

### Reported deployment — 22 October 2026

Recorded deployment:
[6ad9545513526f6206a1b8d2](https://6ad9545513526f6206a1b8d2--thisonetimeonacid.netlify.app).

| Path | Reported observation |
|---|---|
| `/`, `/index.html` | 200; `text/html; charset=UTF-8`; `public,max-age=0,must-revalidate` |
| `/journal`, `/about`, `/contact` | 200; `public,max-age=0,must-revalidate` |
| `/assets/AboutAshPage-CrDw5K_g.js` | 200; `public,max-age=0,must-revalidate`, contrary to expected immutable caching |
| `/robots.txt` | 200; `text/plain; charset=UTF-8`; revalidation |
| `/sitemap.xml` | 200; `application/xml` |
| `/manifest.json` | 200; `application/json` |

The original diagnosis blamed nested configuration discovery and prescribed
changing the Netlify base directory. The asset response alone does not prove
that cause; do not apply that historical remedy. Metadata observations were
associated with [PR #344](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/344).

### Reported preview #343 — 22 October 2026

Recorded preview:
[deploy-preview-343](https://deploy-preview-343--thisonetimeonacid.netlify.app).

The entry reported revalidation on `/` and `/index.html`, immutable caching on
`/assets/index-BMyFmeQv.css` and `/assets/index-D5rnMSiG.js`, accessible metadata
files, and 200/revalidation responses for `/journal`, `/about` and `/contact`.

Typeform, YouTube/Vimeo, Google Fonts and CSP console observations remained
pending in that report. Production headers, monitoring and performance
measurements also lacked completed evidence. These reports do not validate
another revision or establish current production status.

### Reported React build incident

The guide recorded:
`[vite]: Rollup failed to resolve import "react/jsx-runtime"`.

It attributed a fix to `ee98664` and later claimed a successful build with
4713 modules transformed, root configuration loading and correct cache headers.
That identifier could not be resolved during this review; retain its attribution
as unverified. A local build does not establish deployed headers.

Verified repository patches are:

- [ac82e7a37bd486b9ae773ee63080be388a3c08fc](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/commit/ac82e7a37bd486b9ae773ee63080be388a3c08fc):
  adds React 18.3.1 and React-DOM 18.3.1 to regular dependencies.
- [55299ce70d4178741d62b738272cb7d187d1e793](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/commit/55299ce70d4178741d62b738272cb7d187d1e793):
  restores React external resolution and Rollup external configuration.

These distinct patches do not establish that either alone fixed a particular
deployment. Do not generalise the old diagnosis into a universal Vite requirement.

Earlier acceptance ticks also claimed baseline review, reproducibility, CI
success, no regressions, documentation/changelog completion and correct PR
metadata. They are historical claims, not acceptance for an unidentified revision.

## Acceptance evidence still required

For a selected revision, establish:

- Exact-path generated rules and actual HTML/asset responses
- Missing-asset, favicon, intended-route and update-behaviour results
- Baseline-header assessment and actual before-and-after captures
- Browser integration and CSP observations
- Performance measurements and applicable targets
- Required CI results, skips and untested areas
- Documentation, applicable changelog requirement and actual PR metadata
- A decision on relevant automated performance coverage

No current deployment acceptance or merge readiness is established here.

## Documentation-only changelog proposal

The earlier example credited runtime/hosting changes and unverified effects.
It is not suitable for this documentation-only correction.
Whether a changelog entry is required remains an approval decision.

If required, proposed wording is:

```markdown
### Changed
- Corrected testing and deployment guidance to distinguish source configuration, historical reports and outstanding verification.
```

This is not a change to the protected root changelog.

## References

- [Root configuration](../netlify.toml)
- [Vite configuration](../vite.config.ts)
- [Header generator](../scripts/netlify-hashed-asset-headers.mjs)
- [Deployment checker](../scripts/check-netlify-headers.mjs)
- [Integration validation](INTEGRATION-VALIDATION-PLAN.md)
- [Specification](../.github/specs/001-repo-governance-layout-and-agentic-workflows/)
