#!/usr/bin/env node

/**
 * Changelog validation stub
 * Phase 1: validates changelog exists and is readable
 * Full validation (Keep a Changelog format, entries, dates) deferred to Phase 2
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const outputFormat = args[args.indexOf('--output') + 1] || 'text';

let gateResult = 'pass';
let failedChecks = 0;

// Minimal Phase 1 validation: check if CHANGELOG.md exists
const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
if (!fs.existsSync(changelogPath)) {
  gateResult = 'fail';
  failedChecks = 1;
}

const report = {
  summary: {
    passed: gateResult === 'pass' ? 1 : 0,
    failed: failedChecks,
    warnings: 0,
    new_failed: failedChecks
  },
  recommendation: gateResult === 'fail'
    ? 'CHANGELOG.md not found at repository root'
    : 'Phase 1 stub: detailed changelog validation deferred to Phase 2',
  ci_gate_result: gateResult
};

if (outputFormat === 'json') {
  console.log(JSON.stringify(report));
} else {
  if (gateResult === 'pass') {
    console.log('✓ CHANGELOG.md found; detailed validation deferred to Phase 2');
  } else {
    console.log('✗ CHANGELOG.md not found at repository root');
  }
}

process.exit(gateResult === 'pass' ? 0 : 1);
