#!/usr/bin/env node

/**
 * validate-changelog.cjs - Changelog format and schema validation
 * Stub implementation for Phase 1 governance workflows
 * Full implementation deferred to Phase 2 infrastructure work
 */

const fs = require('fs');

const changelogFile = process.argv[2];

if (!changelogFile) {
  console.error('Usage: validate-changelog.cjs <changelog-file>');
  process.exit(1);
}

if (!fs.existsSync(changelogFile)) {
  console.error(`Error: Changelog file not found: ${changelogFile}`);
  process.exit(1);
}

const content = fs.readFileSync(changelogFile, 'utf8');

// Stub validation: just check that file is not empty
if (content.trim().length === 0) {
  console.error('Error: Changelog file is empty');
  process.exit(1);
}

// Stub validation: check for basic Keep a Changelog structure
if (!content.includes('## [Unreleased]') && !content.includes('## [')) {
  console.warn('⚠ Warning: Changelog does not appear to follow Keep a Changelog format');
}

console.log(`✓ Changelog validation stub: ${changelogFile} is valid`);
process.exit(0);
