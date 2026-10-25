# Testing guide

Original documentation review: 24 October 2026, revision
`3f583002482d80ffd1910676bcf7c63e13989b20`.
Command-sequence amendment checked against develop revision
`f99275b085cffd209b9bd42f6e463c0af643099a`.
Commands below describe available procedures, not checks executed for this
review. Dependency installation and test execution require their own authority
and may write files.

## Defined commands

| Purpose | Command | Configuration or behaviour |
|---|---|---|
| Unit tests | `npm run test:unit` | Jest, `jest.config.js` |
| Native tests | `npm run test:native` | Node test runner: `tests/sentry.test.mjs`, `tests/source-maps.test.mjs` |
| Unit watch mode | `npm run test:unit:watch` | Jest watch mode |
| Unit coverage | `npm run test:unit:coverage` | Jest coverage configuration |
| Build verification | `npm run test:build` | Production build, then `bats tests/build.bats` |
| E2E tests | `npm run test:e2e` | Playwright, `playwright.config.ts` |
| E2E debug mode | `npm run test:e2e:debug` | Playwright inspector |
| E2E UI mode | `npm run test:e2e:ui` | Playwright UI |
| Spec Kit regression | `node --test tests/speckit.test.mjs` | Separate Node test-runner suite |

`npm test` chains unit, native, build and E2E commands with `&&`. A failure
stops later suites. It does not include the separate Spec Kit suite or every
test file in the repository.

`package.json` defines no `lint`, `typecheck`, `type-check`, `verify` or
`format` script. References to those commands in root guidance are conflicting
documentation, not executable validation instructions.

## Jest discovery and module limits

`jest.config.js` discovers:

- `**/scripts/**/*.test.js`
- `**/tests/**/*.test.js`

Its transform matches `.js` and `.jsx` files and delegates to `@swc/jest`.
Listing TypeScript extensions in `moduleFileExtensions` does not add TypeScript
test discovery or transformation.

Vitest has separate `.test.ts` and `.test.js` patterns in `vitest.config.ts`,
but no npm script. That configuration is not used by `npm run test:unit`.

Vite's `@` alias points to `src/app`; Jest has no corresponding
`moduleNameMapper`. Do not assume alias imports, dynamic imports, top-level
await or a particular ESM/CommonJS case work merely because a transformer is
declared. Inspect the configuration and record the relevant executed test.

Coverage configuration collects JavaScript under `scripts/`, excluding test
files. It does not establish whole-application coverage.

## Build verification and side effects

`tests/build.bats` checks the build command, output directory and HTML file,
a regular readable `public/_redirects` containing the expected rule, copied
redirects, an assets directory and at least one JavaScript file.

Its coverage is narrower than some names suggest:

- The CSS-labelled check only asserts that `dist/assets` is a directory.
- The warnings-labelled check only asserts that output exists.
- It does not establish complete output cleanliness, deployed routing,
  cache headers or absence of regressions.

The suite's setup removes an existing `dist/`, and a test rebuilds it.
The npm script also builds before invoking Bats. Neither invocation is a
read-only inspection of an existing build.

For a failed assertion, distinguish build failure from output-contract failure.
Inspect actual output and whether redirects are regular files; do not
automatically change build or hosting configuration.

## Playwright setup and server

After an authorised installation of locked dependencies, browser setup is
separate:

```bash
npx playwright install
```

Configured projects use Chromium, Firefox and WebKit, including mobile profiles.
WebKit coverage is not proof that Safari itself was tested.
The test scripts do not install browsers; record downloads and operating-system
setup failures separately.

Tests belong in `e2e/`, including `e2e/routing.spec.ts`, not `tests/e2e/`.
Existing tests use relative navigation such as `page.goto('/journal')`.

The configured base URL is `http://localhost:3000`. Playwright's `webServer`
builds the site and starts `node scripts/test-server.js`; a separate Vite server
on port 5173 is not required. Outside CI, an existing server may be reused.
The test server defaults to 3000 but honours `PORT`; any override must agree
with Playwright's configured URL.

For server errors, inspect build and startup output. For port conflicts,
identify the process and its owner before stopping it; do not kill every
process matching a port. For timeouts, inspect the route, element and trace
before changing waits or timeouts.

Local server results do not validate Netlify's deployed routing or headers.

## Spec Kit regression

The separately invoked suite concerns specification numbering, pipeline
behaviour, template selection and path resolution. A test's existence does not
establish that its assertions pass or that all workflows are covered.

Earlier guidance reported 103 passing tests and one template-resolution failure,
104 total, rounded to 99%. It called the failure approved and non-critical.
No linked acceptance decision or current impact assessment was established in
this review. Known failure is not automatically accepted failure.

## CI configuration

At the reviewed revision:

- `tests.yml` runs Jest for PR head and base and compares reports through
  `No new test failures`. Qualifying documentation-only PRs skip that comparison.
  It does not run the build or E2E suite.
- `claude-guard-tests.yml` handles PR and merge-group events for `develop`
  and `main`. It conditionally runs contract tests and may skip for irrelevant
  changes or absent designated test files.

A successful comparison does not prove zero existing failures. A successful
conditional job does not prove tests executed. Inspect actual reports and
skip reasons. Workflow definitions alone do not establish live required checks
or merge readiness.

## Dependency and module troubleshooting

For a missing module, inspect the import, declared dependency and installation
error before modifying files.

For a separately authorised reinstall:

```bash
npm ci
```

Preserve `package-lock.json`. `npm ci` replaces the dependency installation
using that lockfile and runs the configured postinstall hook, which installs
Lefthook. If manifest and lockfile disagree, record the error and request a
reviewed dependency correction rather than deleting the lockfile.

For transformation errors, inspect `jest.config.js` and `@swc/jest` settings.
Do not change runner configuration or substitute another runner without
separate scope.

## Historical provenance and result recording

The original guide was dated 19 October 2026, attributed maintenance to
repository governance and referenced TOA-260. It reported:

- 588/588 unit tests and approximately five seconds for Jest
- 12/12 build tests and approximately five seconds including the build
- The 103/104 Spec Kit result described above
- E2E infrastructure as ready but without tests

These are historical claims, not current results or reliable performance
benchmarks. `e2e/routing.spec.ts` exists at the reviewed revision.
Earlier assurances about TypeScript discovery, module syntax, comprehensive
output checks and all suites passing have been replaced by the scoped
configuration descriptions above.

For each new authorised run, record revision, command, environment, complete
output, exit code, suite counts and any later suites not run. Keep passed,
failed, skipped, unavailable and not run distinct. Worker count, headed mode
and test grouping are choices, not verified speed improvements.

## References

- [Package scripts](../package.json)
- [Contributor workflow](../CONTRIBUTING.md)
- [Repository guidelines](../guidelines/Guidelines.md)
- [Specification catalogue](../.github/specs/CATALOG.md)
- [Jest configuration](../jest.config.js)
- [Playwright configuration](../playwright.config.ts)
- [Build assertions](../tests/build.bats)
- [CI workflow](../.github/workflows/tests.yml)
- [Claude guard workflow](../.github/workflows/claude-guard-tests.yml)
- [Playwright documentation](https://playwright.dev)
- [Jest documentation](https://jestjs.io)
- [Bats documentation](https://bats-core.readthedocs.io)
