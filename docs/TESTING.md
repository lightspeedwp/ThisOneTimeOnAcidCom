# Testing Guide

This guide covers all testing infrastructure in ThisOneTimeOnAcidCom: unit
tests, build verification, end-to-end tests, and specification regression
testing.

## Quick Start

Run all test suites:

```bash
npm test

```text

Run individual test suites:

```bash
npm run test:unit        # Jest unit tests
npm run test:build       # Bats build verification  
npm run test:e2e         # Playwright end-to-end tests

```text

## Test Infrastructure Overview

| Suite | Tool | Command | Purpose | Status |
|-------|------|---------|---------|--------|
| Unit tests | Jest ESM | `npm run test:unit` | Component logic, utilities, scripts | ✅ 588/588 pass |
| Build verification | Bats | `npm run test:build` | Bundle integrity, output files, routing | ✅ 12/12 pass |
| E2E tests | Playwright | `npm run test:e2e` | Browser interactions, full app flows | ⏳ Ready (no tests yet) |
| Spec Kit regression | Node test runner | `node --test tests/speckit.test.mjs` | Spec Kit pipeline validation | ⚠️ 103/104 (approved baseline) |

## Unit Tests (Jest ESM)

Jest is configured with ESM support via `@swc/core`, enabling modern JavaScript
test syntax.

### Running Unit Tests

```bash

# Run all unit tests once

npm run test:unit

# Watch mode (re-run on file changes)

npm run test:unit:watch

# Coverage report

npm run test:unit:coverage

```text

### Test Files

Unit tests are located throughout the codebase using the `.test.js` or
`.test.ts` extension:

- `scripts/**/*.test.js` – Build and validation script tests
- `scripts/__tests__/**/*.test.js` – Grouped test files
- `tests/contracts/**/*.test.js` – Contract validation tests

### ESM Support

Jest is configured to transform ES modules automatically:

```typescript
// ✅ Modern syntax works
import { helperFunction } from "@/lib/helpers";
const result = await asyncFunction();

// ✅ Dynamic imports
const module = await import("./dynamic-module.js");

// ✅ Top-level await
await setupDatabase();

```text

### Common Issues

**Issue**: Tests fail with "Cannot find module"

**Solution**: Verify the module is exported and the import path is correct. Jest
resolves paths relative to the source file.

**Issue**: ESM import of CommonJS module fails

**Solution**: Use dynamic import or configure `jest.config.js` to handle the
specific module type.

## Build Verification (Bats)

Bats is a Bash testing framework that validates the build output without running
the app.

### Running Build Tests

```bash

# Run build and verify output

npm run test:build

```text

This command:
1. Runs `npm run build` (production build via Vite)
2. Runs `tests/build.bats` to validate output

### What Build Tests Check

- ✅ Build succeeds without errors
- ✅ `dist/` directory created
- ✅ `dist/index.html` exists
- ✅ `public/_redirects` copied to `dist/_redirects` (SPA routing)
- ✅ CSS assets compiled and bundled
- ✅ JavaScript bundles created
- ✅ Build output is clean (no unexpected files)

### Viewing Build Tests

```bash
cat tests/build.bats

```text

### Common Issues

**Issue**: Build test fails with "dist directory not created"

**Solution**: Check `npm run build` output for errors. Fix the build issue, then
re-run `npm run test:build`.

**Issue**: Redirect rules not copied to dist

**Solution**: Verify `public/_redirects` is a file (not a directory) and Vite is
configured to copy the `public/` directory.

## End-to-End Tests (Playwright)

Playwright enables browser-based testing of the full application. Setup is
required before running tests.

### Installing Browsers

First-time setup — install Playwright browsers separately:

```bash
npx playwright install

```text

This installs Playwright browsers (Chromium, Firefox, Safari) needed for running
tests.

### Running E2E Tests

```bash

# Run all e2e tests

npm run test:e2e

# Debug mode (open inspector)

npm run test:e2e:debug

# UI mode (visual test runner)

npm run test:e2e:ui

```text

### Writing E2E Tests

E2E tests go in `tests/e2e/` and follow Playwright conventions:

```typescript
// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads and displays title', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle(/Ash Shaw/);
});

test('navigation menu works', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('nav a[href="/about"]');
  await expect(page).toHaveURL(/about/);
});

```text

### Common Issues

**Issue**: "Playwright browsers not installed" error

**Solution**: Run `npm run test:e2e` once to install browsers, then run again.

**Issue**: Tests fail with "target page, context or browser has been closed"

**Solution**: Ensure the dev server is running (`npm run dev`) or configure
Playwright to start the server automatically.

**Issue**: Timeouts waiting for elements

**Solution**: Increase timeout in Playwright config or use `waitForNavigation()`
explicitly.

## Spec Kit Regression Testing

The Spec Kit pipeline (create → plan → tasks) is validated by a regression test
suite.

### Running Spec Kit Tests

```bash
node --test tests/speckit.test.mjs

```text

### Current Baseline

- ✅ **103 passing tests** – All core Spec Kit workflows working
- ⚠️ **1 failing test** – Template resolution edge case (approved to accept)
- **Total**: 104 tests, 99% pass rate

The failing test is a known, non-critical edge case in template precedence
resolution and does not affect feature specification workflows.

### Test Coverage

The regression test suite validates:

- Specification creation and numbering
- Plan generation from specifications
- Task decomposition and dependency ordering
- Template routing and selection
- Path resolution for feature directories

## Running All Tests Together

```bash
npm test

```text

This runs all three suites in sequence:
1. Jest unit tests (`npm run test:unit`)
2. Build verification (`npm run test:build`)
3. Playwright e2e tests (`npm run test:e2e`)

**Expected output**: All suites pass (or e2e tests may require browser setup on
first run).

## CI/CD Integration

Tests are integrated into GitHub Actions workflows:

- **`tests.yml`** – Runs unit and build verification tests on every PR
- **`claude-guard-tests.yml`** – Runs Claude agent validation tests
- E2E tests are manual or triggered on release branches (optional)

All checks must pass before merging to `develop`.

## Performance & Optimization

### Unit Test Performance

Jest discovers and runs 588 tests in ~5 seconds.

**Optimization tips**:
- Use `npm run test:unit:watch` during development
- Run focused tests with `jest -t "test name"` to avoid full suite
- Check `jest --coverage` for untested code paths

### Build Test Performance

Bats tests run after production build (~5 seconds total).

**Optimization tips**:
- Run `npm run build` alone to check build performance
- Run `tests/build.bats` separately if build succeeds but tests fail

### E2E Test Performance

Playwright tests are slower due to browser startup and interaction simulation.

**Optimization tips**:
- Use `--workers=1` to run tests sequentially (faster for small suites)
- Use `--headed` mode to watch tests execute
- Group related tests into single files to reduce browser startup overhead

## Troubleshooting

### All Tests Fail with "Cannot find module"

**Cause**: Dependencies not installed or lockfile out of sync

**Fix**:

```bash
rm -rf node_modules package-lock.json
npm ci

```text

### Jest Tests Fail with ESM Error

**Cause**: Module transformation issue

**Fix**: Verify `jest.config.js` has `@swc/core` configured:

```bash
cat jest.config.js | grep -i swc

```text

### Build Tests Fail but `npm run build` Succeeds

**Cause**: Output validation issue (e.g., wrong file format)

**Fix**:

```bash

# Inspect build output

ls -la dist/
file dist/index.html

```text

### E2E Tests Won't Start

**Cause**: Dev server not running or port in use

**Fix**:

```bash

# Kill any existing process on port 5173

lsof -ti:5173 | xargs kill -9

# Start dev server in another terminal

npm run dev

# Then run e2e tests

npm run test:e2e

```text

## Related Documentation

- [CONTRIBUTING.md](../CONTRIBUTING.md) – Contributor workflow and validation checklist
- [guidelines/Guidelines.md](../guidelines/Guidelines.md) – Code standards and testing conventions
- [.github/specs/CATALOG.md](../.github/specs/CATALOG.md) – Specification documentation
- [Playwright Documentation](https://playwright.dev) – E2E testing reference
- [Jest Documentation](https://jestjs.io) – Unit testing reference
- [Bats Documentation](https://bats-core.readthedocs.io) – Bash testing reference

---

**Last updated**: 2026-10-19 | **Maintained by**: Repository governance
(TOA-260)
