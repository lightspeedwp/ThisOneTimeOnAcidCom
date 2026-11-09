# Integration validation plan

Source review: 24 October 2026, revision
`3f583002482d80ffd1910676bcf7c63e13989b20`.

Original plan date: 22 October 2026.
Historical branch reference: `fix/coderabbit-review-findings-netlify`.
Related work: PRs #345 and #343; issues #6 and #418.

This plan describes checks, not completed tests. No deployment checker,
browser integration or performance measurement was run for this review.
Use a specifically authorised deployment and record its exact revision.
Do not change hosting, CSP, application code or live customer data through
this documentation procedure.

## Integration checks

First identify a current route containing each integration. Source components
do not prove that an integration is present on the selected deployment.
Record absent test pages and unavailable services as coverage gaps, not passes.

### Google Fonts

Root `index.html` loads `src/main.tsx`, which imports `src/styles/index.css`.
The reviewed Vite configuration does not select `src/app/index.html` as an
alternate HTML input.

The nested HTML contains Google Fonts preconnects and a `display=swap` request
for Space Grotesk, Inter, Righteous, Playfair Display, JetBrains Mono, Fira Code,
Space Mono and Vampiro One. `src/styles/fonts.css` contains a different request.
Their existence does not establish which requests a deployed page makes.

Check actual HTML, loaded stylesheets, requested families/weights, network
responses and rendered fonts. Record fallback and final rendering under stated
browser, network and cache conditions. Inspect `fonts.googleapis.com` and
`fonts.gstatic.com` where actually requested.

Do not call every family variable, guarantee availability within three seconds,
or infer latency, layout stability or font rendering from a preconnect or
`display=swap` declaration. Record loading failures and console/CSP observations.

### Typeform

`src/app/components/common/TypeformEmbed.tsx` requests
`https://embed.typeform.com/next/embed.js` and checks for an existing embed
script before adding one. That source check does not prove successful rendering
or absence of duplicate loads during real navigation.

On a page containing the widget:

- Record script and frame requests and any CSP/CORS/loading errors.
- Check inline rendering, labels, keyboard interaction and validation behaviour.
- Observe repeated mounts/navigation for duplicate-loading behaviour.
- Submit only with separate authorisation using an appropriate test form and
  test data; do not send live submissions merely to complete this plan.

### YouTube and Vimeo

`src/app/components/ui/VideoPlayer.tsx` detects supported URL patterns and
renders iframe embeds. Its normalisation includes
`https://www.youtube.com/embed/` and `https://player.vimeo.com/video/`.

For each integration actually present:

- Record the original resource, resulting iframe URL and response/error evidence.
- Check rendering, playback, audio, controls and fullscreen behaviour.
- Check keyboard interaction and responsive states.
- Record console/CSP observations and provider restrictions.

Do not assume another hostname, including `youtube-nocookie.com`, is used or
authorised merely because it appeared in older documentation.

## CSP evidence

Root `netlify.toml` explicitly defers CSP and declares no
Content-Security-Policy header. The generated `dist/_headers` mechanism emits
asset cache rules, not a CSP. `src/app/netlify.toml` is absent at this revision;
references to its archived draft do not identify an available file.

For the selected deployment, inspect document responses for enforced and
report-only CSPs and inspect the HTML for a CSP meta policy. Record actual
values or absence, then correlate console/network observations with each
integration.

`frame-ancestors` governs ancestors embedding this site. It does not authorise
this site's external frames; `connect-src` alone does not authorise scripts
or iframe documents.

Do not copy the old proposed policy into hosting configuration or prescribe
`'unsafe-inline'` or nonces as a documentation correction. Policy design and
deployment support require separate review. Absence of CSP errors is not
proof of integration success or security.

## Deployment checker contract

The defined invocation is:

```bash
node scripts/check-netlify-headers.mjs <deployment-base-url>
```

Replace the argument placeholder with the exact authorised deployment URL.
The checker makes HTTP requests and does not follow redirects automatically.

| Probe | Implemented assertions |
|---|---|
| `/`, `/journal`, `/about-ash` | 200; HTML Content-Type; Cache-Control containing `max-age=0` and `must-revalidate`; configured nosniff, referrer and frame-option values; non-empty Permissions-Policy |
| `/assets/index-missing0.js` | 404; no immutable caching |
| `/favicon.ico` | 200; `image/*` Content-Type; no immutable caching |
| First JavaScript and CSS references extracted from home-page `/assets/` URLs | 200; matching Content-Types; exact immutable cache value after whitespace normalisation |

The missing-asset probe does not require a particular Content-Type; a 200 HTML
SPA response is a failure. The checker does not establish that every extracted
filename matches the generator's hash pattern or that every asset is covered.

Output lists HTML routes, missing asset and favicon before sampled assets.
Record real output rather than manufacturing a transcript with old filenames.
Missing URL exits 2; collected assertion failures exit 1.

A success message covers implemented assertions only. It does not verify
security headers on every route, CSP compatibility, application rendering,
browser integrations or performance.
The root catch-all does not explicitly define the required missing-asset
exception; record mismatches without changing deployment configuration.

## Performance measurement

The earlier plan attributed these targets to PR #345. They remain reported
targets, not new measurements or newly verified acceptance decisions.

| Metric | Reported target | Evidence |
|---|---|---|
| LCP | < 3.0s | Result with page and test conditions |
| INP | < 200ms | Suitable field data and its scope, or explicit unavailability |
| CLS | < 0.1 | Result with page and test conditions |
| FCP | < 1.8s | Result with page and test conditions |
| TTFB | < 600ms | Result with request and test conditions |
| TBT | No separate target established here | Distinct lab result |

TBT is not measured INP and must not be substituted into the INP threshold.

Record deployment revision, route, observation time, tool/version, device,
network/CPU settings, cache state and run conditions. Preserve mobile and
desktop lab results separately. Record the source and page/origin scope of
field INP data, or its unavailability. Compare only like-for-like measurements.

## Results template

This section is a template, not factual results.

- Deployment URL and revision: ___
- Date, tester and evidence locations: ___
- Browser/device/network/cache conditions: ___
- Checker command, complete output and exit code: ___
- CSP response/meta observations: ___
- Font loading and rendering: ___
- Typeform rendering/interaction and any separately authorised submission: ___
- YouTube/Vimeo playback, controls and responsive behaviour: ___
- Missing integrations, unavailable services and other coverage gaps: ___

| Metric | Reported target | Result | Evidence and status |
|---|---|---|---|
| LCP | < 3.0s | ___ s | ___ |
| CLS | < 0.1 | ___ | ___ |
| FCP | < 1.8s | ___ s | ___ |
| TTFB | < 600ms | ___ ms | ___ |
| TBT, lab | No separate target established | ___ ms | ___ |
| INP, field | < 200ms | ___ ms or unavailable | Source/scope: ___ |

Use passed, failed, skipped, unavailable and not run explicitly.
Do not mark unavailable field data or an absent integration as passed.
Conclude only for the checks and revision evidenced; list unresolved findings
and required checks whose results are missing.

## Historical PR-426 results

Recorded date: 22 October 2026.
Recorded preview:
[deploy-preview-426](https://deploy-preview-426--thisonetimeonacid.netlify.app).

The [dated PR-426 record](integration-validation/2026-10-22-pr-426-validation-plan.md)
preserves original output and the updated checker's rejection:

- HTML routes returned 200 with revalidation headers.
- Sample hashed JavaScript and CSS responses had immutable caching.
- `/assets/index-missing0.js` returned 200 HTML, not the required 404.
- `/favicon.ico` returned `text/html; charset=UTF-8`, not an image Content-Type.
- The record reports that the updated checker exited 1 against the same preview.

The earlier permissive checker's success message is not a passing result under
the updated contract. The previous summary's verified-404/all-pass assertions
contradicted the dated record and must not be carried forward.

The record also describes a favicon source addition with deployment verification
pending and an unresolved missing-asset routing requirement. These are historical
statements, not newly verified implementation or deployment outcomes.

Google Fonts, Typeform, YouTube, Vimeo, CSP browser observations and performance
evidence remained incomplete in that record. References to PR #427 being current
are historical context, not a newly checked PR status. None of these observations
validates another revision or establishes current production acceptance.

## References

- [PR #345](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/345)
- [PR #343](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/343)
- [Issue #418](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues/418)
- [Issue #6](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues/6)
- [Root Netlify configuration](../netlify.toml)
- [Header checker](../scripts/check-netlify-headers.mjs)
- [Header generator](../scripts/netlify-hashed-asset-headers.mjs)
- [Caching verification guide](NETLIFY_CACHE_VERIFICATION.md)
- [Preserved historical PR-426 record](integration-validation/2026-10-22-pr-426-validation-plan.md)
