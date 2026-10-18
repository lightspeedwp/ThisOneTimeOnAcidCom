/**
 * Phase 1 Stub: Changelog validation
 * Phase 2: Replace with real changelog format/content validation
 */
const path = require('path');

module.exports = {
  validateChangelog: async (changelogPath = 'CHANGELOG.md') => {
    // Phase 1: Always return success
    // Phase 2: Implement actual validation against Keep a Changelog format
    console.log(`[STUB] Validating changelog: ${changelogPath}`);
    return { valid: true, errors: [] };
  },

  validateEntry: (entry) => {
    // Phase 1: Accept any entry object
    // Phase 2: Validate entry structure, date format, version semver
    return { valid: true, errors: [] };
  }
};
