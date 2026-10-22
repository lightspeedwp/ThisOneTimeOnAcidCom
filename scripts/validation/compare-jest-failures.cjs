#!/usr/bin/env node

/**
 * compare-jest-failures.cjs - Compare Jest test results between PR head and base
 *
 * Compares test failure counts between the PR head and base branch to detect
 * if the PR introduces new test failures. Known failures on develop don't block
 * the PR, only NEW failures introduced by the PR are reported.
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

// Count failures by test file, normalized relative to root
function countFailures(report, root) {
  const failures = {};
  if (!report || !Array.isArray(report.testResults)) {
    return failures;
  }

  report.testResults.forEach(result => {
    const normalised = path.relative(root || '.', result.name);

    // Prioritize numFailingTests if present
    if (result.numFailingTests !== undefined && result.numFailingTests > 0) {
      failures[normalised] = result.numFailingTests;
      return;
    }

    // Count failed assertions if available
    if (Array.isArray(result.assertionResults)) {
      const failedCount = result.assertionResults.filter(a => a.status === 'failed').length;
      if (failedCount > 0) {
        failures[normalised] = failedCount;
        return;
      }
    }

    // Count as 1 failure if status is 'failed' (suite-level failure)
    if (result.status === 'failed') {
      failures[normalised] = 1;
    }
  });

  return failures;
}

// Read reports
const headReport = readReport(opts.head);
const baseReport = readReport(opts.base);

if (!headReport || !baseReport) {
  console.error('Failed to read Jest reports');
  process.exit(1);
}

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

console.log(`Base branch failures: ${baseTotal} (${Object.keys(baseFailures).length} files)`);
console.log(`PR head failures: ${headTotal} (${Object.keys(headFailures).length} files)`);
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
