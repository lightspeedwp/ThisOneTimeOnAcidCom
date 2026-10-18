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

// Count failures by test file
function countFailures(report, root) {
  const failures = Object.create(null);
  if (!report || !Array.isArray(report.testResults)) {
    return failures;
  }

  report.testResults.forEach(result => {
    let count = result.numFailingTests || 0;
    // Jest's --json output lists assertions instead of numFailingTests.
    if (Array.isArray(result.assertionResults)) {
      count = result.assertionResults.filter(assertion => assertion.status === 'failed').length;
    }
    if (count === 0 && result.status === 'failed') {
      count = 1;
    }
    if (count > 0) {
      const file = path.relative(root, path.resolve(root, result.name));
      failures[file] = count;
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

// Count failures
const headFailures = countFailures(headReport, opts['head-root']);
const baseFailures = countFailures(baseReport, opts['base-root']);

// Compare
const headTotal = Object.values(headFailures).reduce((total, count) => total + count, 0);
const baseTotal = Object.values(baseFailures).reduce((total, count) => total + count, 0);
const newFailures = Object.entries(headFailures).reduce((total, [file, count]) => {
  return total + Math.max(0, count - (baseFailures[file] || 0));
}, 0);

console.log(`Base branch failures: ${baseTotal}`);
console.log(`PR head failures: ${headTotal}`);
console.log(`New failures in this PR: ${newFailures}`);

if (newFailures > 0) {
  console.error(`\n❌ This PR introduces ${newFailures} new test failure(s)`);
  process.exit(1);
}

console.log('\n✅ No new test failures introduced');
process.exit(0);
