/**
 * Phase 1 Stub: Changelog utility functions
 * Phase 2: Replace with real changelog parsing, section detection, entry extraction
 */
module.exports = {
  parseChangelog: (content) => {
    // Phase 1: Return minimal structure
    // Phase 2: Parse Keep a Changelog format, extract sections by version
    return {
      versions: [],
      unreleased: { added: [], changed: [], deprecated: [], removed: [], fixed: [], security: [] }
    };
  },

  getVersionEntry: (content, version) => {
    // Phase 1: Return empty entry
    // Phase 2: Extract changelog section for specific version with all subsections
    return { version, sections: {} };
  },

  formatEntry: (data) => {
    // Phase 1: Return stringified entry
    // Phase 2: Format changelog entry in canonical Keep a Changelog style
    return JSON.stringify(data);
  }
};
