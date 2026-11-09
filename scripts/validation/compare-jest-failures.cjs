#!/usr/bin/env node

/**
 * compare-jest-failures.cjs - Compare test results between PR head and base
 *
 * Supports both Jest and Vitest JSON output formats. Compares test failure
 * counts between the PR head and base branch to detect if the PR introduces
 * new test failures. Known failures on develop don't block the PR, only NEW
 * failures introduced by the PR are reported.
 *
 * Usage:
 *   node compare-jest-failures.cjs \
 *     --head <head-report.json> --head-root <path> \
 *     --base <base-report.json> --base-root <path>
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
  console.error('Usage: node compare-jest-failures.cjs --head <file> --head-root <path> --base <file> --base-root <path>');
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
function detectFormat(report) {
  if (!report || !Array.isArray(report.testResults)) {
    return null;
  }

  // Both formats have testResults array, but field names differ slightly
  // Vitest uses 'assertionResults' for individual test results
  // Jest uses 'numFailingTests' prominently but also 'assertionResults'

  // Check first result to infer format (heuristic)
  const firstResult = report.testResults[0];
  if (!firstResult) return 'unknown';

  // Both use assertionResults, so check other fields
  if (firstResult.numFailingTests !== undefined || report.numFailedTests !== undefined) {
    return 'jest';
  }

  // Vitest typically has 'duration' and other fields
  if (firstResult.duration !== undefined) {
    return 'vitest';
  }

  // Default to jest for compatibility
  return 'jest';
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

// Calculate per-file comparison: count new failures (head > base)
const newFailuresByFile = Object.entries(headFailures).reduce((acc, [file, count]) => {
  const baseCount = baseFailures[file] || 0;
  const newCount = Math.max(0, count - baseCount);
  if (newCount > 0) {
    acc[file] = { head: count, base: baseCount, new: newCount };
  }
  return acc;
}, {});

const headTotal = Object.values(headFailures).reduce((a, b) => a + b, 0);
const baseTotal = Object.values(baseFailures).reduce((a, b) => a + b, 0);
const totalNewFailures = Object.values(newFailuresByFile).reduce((a, b) => a + b.new, 0);

console.log(`Base branch failures: ${baseTotal} (${Object.keys(baseFailures).length} files) [${baseFormat}]`);
console.log(`PR head failures: ${headTotal} (${Object.keys(headFailures).length} files) [${headFormat}]`);
console.log(`New failures in this PR: ${totalNewFailures}`);

if (totalNewFailures > 0) {
  console.error(`\n❌ This PR introduces ${totalNewFailures} new test failure(s):`);
  Object.entries(newFailuresByFile).forEach(([file, data]) => {
    console.error(`  • ${file}: ${data.new} new (base: ${data.base}, head: ${data.head})`);
  });
  process.exit(1);
}

console.log('\n✅ No new test failures introduced');
process.exit(0);
