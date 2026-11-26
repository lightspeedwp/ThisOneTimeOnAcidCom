#!/usr/bin/env node

/**
 * compare-jest-failures.cjs - Compare test results between PR head and base
 *
 * Supports both Jest and Vitest JSON output formats. Compares test failure
 * counts between the PR head and base branch to detect if the PR introduces
 * new test failures. Known failures on main don't block the PR, only NEW
 * failures introduced by the PR are reported.
 *
 * Usage:
 *   node compare-jest-failures.cjs \
 *     --head <head-report.json> --head-root <path> \
 *     --base <base-report.json> --base-root <path> \
 *     [--base-files <git-ls-files-at-base.txt>]
 *
 * When --base-files is given, a failing head file that is missing from the
 * base report but tracked at the base commit is reported as "not comparable"
 * rather than "new": base never ran it, so there is no baseline. A file the
 * PR adds is not tracked at base and still counts as new.
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const opts = {};
for (let i = 0; i < args.length; i += 2) {
  const key = args[i].replace(/^--/, '');
  opts[key] = args[i + 1];
}

if (!opts.head || !opts.base || !['head-root', 'base-root'].every(k => opts[k])) {
  console.error('Usage: node compare-jest-failures.cjs --head <file> --head-root <path> --base <file> --base-root <path> [--base-files <file>]');
  process.exit(1);
}

// Helper to read and parse report
function readReport(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to read report ${filePath}: ${error.message}`);
    return null;
  }
}

// Detect report format: Jest vs Vitest
//
// Vitest's JSON reporter mirrors Jest's top-level counters (including
// numFailedTests), so those cannot tell the formats apart. Jest alone emits
// numRuntimeErrorTestSuites, wasInterrupted and openHandles at the top level,
// and per-file numFailingTests in its legacy output.
function detectFormat(report) {
  if (!report || !Array.isArray(report.testResults)) {
    return null;
  }

  const jestOnlyKeys = ['numRuntimeErrorTestSuites', 'wasInterrupted', 'openHandles'];
  if (jestOnlyKeys.some(key => key in report)) {
    return 'jest';
  }
  if (report.testResults.some(result => result && result.numFailingTests !== undefined)) {
    return 'jest';
  }

  return 'vitest';
}

// List every test file in a report, normalised relative to root
function listFiles(report, root) {
  if (!report || !Array.isArray(report.testResults)) {
    return new Set();
  }
  return new Set(report.testResults.map(result => path.relative(root || '.', result.name)));
}

// Read the optional list of files tracked at the base commit (one per line,
// relative to the repository root, as printed by `git ls-files`)
function readFileList(filePath) {
  if (!filePath) {
    return null;
  }
  try {
    return new Set(
      fs.readFileSync(filePath, 'utf8').split('\n').map(line => line.trim()).filter(Boolean),
    );
  } catch (error) {
    console.error(`Failed to read base file list ${filePath}: ${error.message}`);
    process.exit(1);
  }
}

// Count failures by test file, normalized relative to root
// Handles both Jest and Vitest output formats
function countFailures(report, root) {
  const failures = {};
  if (!report || !Array.isArray(report.testResults)) {
    return failures;
  }

  report.testResults.forEach(result => {
    const normalised = path.relative(root || '.', result.name);

    // Try multiple failure detection methods for format compatibility

    // Method 1: numFailingTests field (Jest primary, Vitest fallback)
    if (result.numFailingTests !== undefined && result.numFailingTests > 0) {
      failures[normalised] = result.numFailingTests;
      return;
    }

    // Method 2: Count failed assertion results (both formats)
    if (Array.isArray(result.assertionResults)) {
      const failedCount = result.assertionResults.filter(a => a.status === 'failed').length;
      if (failedCount > 0) {
        failures[normalised] = failedCount;
        return;
      }
    }

    // Method 3: Suite-level failure status (both formats)
    if (result.status === 'failed') {
      failures[normalised] = 1;
    }

    // Vitest-specific: check 'failureMessage' for suite-level failures
    if (result.failureMessage && result.status !== 'passed') {
      if (!(normalised in failures)) {
        failures[normalised] = 1;
      }
    }
  });

  return failures;
}

// Read reports
const headReport = readReport(opts.head);
const baseReport = readReport(opts.base);

if (!headReport || !baseReport) {
  console.error('Failed to read test reports');
  process.exit(1);
}

// Detect formats (for informational logging)
const headFormat = detectFormat(headReport);
const baseFormat = detectFormat(baseReport);

// Count failures by file, normalised to respective roots
const headFailures = countFailures(headReport, opts['head-root']);
const baseFailures = countFailures(baseReport, opts['base-root']);

const baseReportFiles = listFiles(baseReport, opts['base-root']);
const baseTrackedFiles = readFileList(opts['base-files']);

// Calculate per-file comparison: count new failures (head > base). A file
// that base never reported cannot be compared if it already existed there.
const newFailuresByFile = {};
const notComparableByFile = {};
Object.entries(headFailures).forEach(([file, count]) => {
  if (!baseReportFiles.has(file) && baseTrackedFiles && baseTrackedFiles.has(file)) {
    notComparableByFile[file] = count;
    return;
  }
  const baseCount = baseFailures[file] || 0;
  const newCount = Math.max(0, count - baseCount);
  if (newCount > 0) {
    newFailuresByFile[file] = { head: count, base: baseCount, new: newCount };
  }
});

const headTotal = Object.values(headFailures).reduce((a, b) => a + b, 0);
const baseTotal = Object.values(baseFailures).reduce((a, b) => a + b, 0);
const totalNewFailures = Object.values(newFailuresByFile).reduce((a, b) => a + b.new, 0);

console.log(`Base branch failures: ${baseTotal} (${Object.keys(baseFailures).length} files) [${baseFormat}]`);
console.log(`PR head failures: ${headTotal} (${Object.keys(headFailures).length} files) [${headFormat}]`);
console.log(`New failures in this PR: ${totalNewFailures}`);

const notComparable = Object.entries(notComparableByFile);
if (notComparable.length > 0) {
  console.log(`\n⚠️  ${notComparable.length} failing file(s) not comparable (exist at base but missing from the base report):`);
  notComparable.forEach(([file, count]) => {
    console.log(`  • ${file}: ${count} failure(s) on head`);
  });
}

if (totalNewFailures > 0) {
  console.error(`\n❌ This PR introduces ${totalNewFailures} new test failure(s):`);
  Object.entries(newFailuresByFile).forEach(([file, data]) => {
    console.error(`  • ${file}: ${data.new} new (base: ${data.base}, head: ${data.head})`);
  });
  process.exit(1);
}

console.log('\n✅ No new test failures introduced');
process.exit(0);
