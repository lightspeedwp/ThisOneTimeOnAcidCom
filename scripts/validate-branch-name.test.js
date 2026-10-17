/**
 * Jest test suite for branch name validation.
 * Tests all 38 authorised types, forbidden prefixes, exemptions, and edge cases.
 */

import {
  validateBranch,
  ValidationResult,
  AUTHORISED_TYPES
} from './validate-branch-name.js';

describe('Branch Name Validation', () => {
  describe('Valid Branches - Standard Pattern', () => {
    test.each([
      'feat/user-dashboard',
      'fix/navigation-menu',
      'docs/api-reference',
      'test/e2e-flow',
      'refactor/hook-consolidation',
      'perf/image-loading',
      'chore/dependency-updates',
      'content/chapter-one-revisions',
      'fix/typo-chapter-five',
      'a11y/form-labels',
      'design/button-component',
      'ci/github-actions',
      'build/vite-config',
      'security/xss-vulnerability',
      'hotfix/critical-bug',
      'task/auth-refactor',
      'doc/readme-typo',
      'revert/pr-2345-merge',
      'research/performance-benchmarks',
      'ux/form-validation',
      'i18n/german-translation',
      'ops/database-migration',
      'audit/code-review',
      'codex/auto-documentation',
      'aiops/model-monitoring',
      'automation/issue-routing',
      'epic/platform-modernisation',
      'proto/new-caching',
      'ds/component-library',
      'api/rest-endpoints',
      'schema/user-model',
      'telemetry/event-tracking',
      'seo/meta-tags',
      'config/environment-vars',
      'migrate/user-table',
      'qa/test-automation',
      'uat/staging-validation'
    ])('should validate "%s" as valid', (branch) => {
      const result = validateBranch(branch);
      expect(result.isValid).toBe(true);
      expect(result.type).toBe('valid');
      expect(result.message).toContain('matches the repository branching strategy');
    });

    test('should accept multiple hyphens in title', () => {
      const result = validateBranch('feat/user-dashboard-v2-dark-mode');
      expect(result.isValid).toBe(true);
    });

    test('should accept numbers in title', () => {
      const result = validateBranch('fix/bug-2024-regression');
      expect(result.isValid).toBe(true);
    });

    test('should accept single-character scope', () => {
      const result = validateBranch('feat/a-feature');
      expect(result.isValid).toBe(true);
    });
  });

  describe('Valid Branches - All 38 Authorised Types', () => {
    AUTHORISED_TYPES.forEach(type => {
      test(`should validate "${type}/scope-title" as valid`, () => {
        const branch = `${type}/scope-title`;
        const result = validateBranch(branch);
        expect(result.isValid).toBe(true);
        expect(result.details.matchedType).toBe(type);
      });
    });
  });

  describe('Invalid Branches - Forbidden Prefixes', () => {
    test.each([
      'claude/my-feature',
      'copilot/fix-bug',
      'openai/new-model'
    ])('should reject "%s" as forbidden prefix', (branch) => {
      const result = validateBranch(branch);
      expect(result.isValid).toBe(false);
      expect(result.type).toBe('forbidden-prefix');
      expect(result.message).toContain('forbidden');
    });
  });

  describe('Invalid Branches - Pattern Violations', () => {
    test.each([
      'my-feature', // Missing type
      'feat my-feature', // Space instead of slash
      'feat_my-feature', // Underscore instead of slash
      'feat/MyFeature', // Uppercase letters
      'feat/my_feature', // Underscore in scope
      'feat/my feature', // Space in scope-title
      'feat/my@feature', // Special character
      'feat/', // Missing scope-title
      '/my-feature', // Missing type
      'feat/my--feature', // Double hyphen (not allowed in validation regex)
      'Feat/my-feature', // Uppercase type
      'FEAT/my-feature' // Uppercase type
    ])('should reject "%s" as invalid pattern', (branch) => {
      const result = validateBranch(branch);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('does not match');
    });
  });

  describe('Invalid Branches - Invalid Type', () => {
    test.each([
      'feature/my-feature', // Wrong type (should be 'feat')
      'bugfix/my-fix', // Wrong type (should be 'fix')
      'documentation/my-docs', // Wrong type (should be 'docs')
      'feat123/my-feature' // Invalid type (numbers in type)
    ])('should reject "%s" as invalid type', (branch) => {
      const result = validateBranch(branch);
      expect(result.isValid).toBe(false);
      expect(result.type).toBe('invalid-type');
    });
  });

  describe('Valid Exemptions - Dependabot', () => {
    test.each([
      'dependabot/npm_and_yarn/my-package-1.0.0',
      'dependabot/bundler/my-gem-2.0.0',
      'dependabot/docker/my-image',
      'dependabot/github-actions/setup-node'
    ])('should allow "%s" as dependabot exemption', (branch) => {
      const result = validateBranch(branch);
      expect(result.isValid).toBe(true);
      expect(result.type).toBe('exemption');
    });
  });

  describe('Empty and edge case branches', () => {
    test('should reject empty string', () => {
      const result = validateBranch('');
      expect(result.isValid).toBe(false);
      expect(result.type).toBe('empty-branch');
    });

    test('should reject null', () => {
      const result = validateBranch(null);
      expect(result.isValid).toBe(false);
      expect(result.type).toBe('empty-branch');
    });

    test('should reject whitespace-only string', () => {
      const result = validateBranch('   ');
      expect(result.isValid).toBe(false);
      expect(result.type).toBe('empty-branch');
    });

    test('should trim whitespace from branch name', () => {
      const result = validateBranch('  feat/my-feature  ');
      expect(result.isValid).toBe(true);
    });
  });

  describe('Valid Exemptions - Renovate', () => {
    test.each([
      'renovate/my-package',
      'renovate/pin-dependencies',
      'renovate/bump-minor-versions'
    ])('should allow "%s" as renovate exemption', (branch) => {
      const result = validateBranch(branch);
      expect(result.isValid).toBe(true);
      expect(result.type).toBe('exemption');
    });
  });

  describe('Valid Exemptions - Release Branches (Semantic Versioning)', () => {
    test.each([
      'release/v1.0.0',
      'release/v1.2.3',
      'release/v2.0.0-beta.1',
      'release/v1.0.0-alpha',
      'release/v3.1.0-rc.2',
      'release/v0.0.1'
    ])('should allow "%s" as semantic version release branch', (branch) => {
      const result = validateBranch(branch);
      expect(result.isValid).toBe(true);
      expect(result.type).toBe('exemption');
    });
  });

  describe('Valid Exemptions - Release Branches (Date-based)', () => {
    test.each([
      'release/2025-01-15',
      'release/2024-12-25',
      'release/2026-10-16'
    ])('should allow "%s" as date-based release branch', (branch) => {
      const result = validateBranch(branch);
      expect(result.isValid).toBe(true);
      expect(result.type).toBe('exemption');
    });
  });

  describe('Content Repository Patterns', () => {
    test.each([
      'content/chapter-one-revisions',
      'content/chapter-two-final-edit',
      'content/chapter-three-fact-check',
      'feat/author-bio-section',
      'feat/glossary-terms',
      'feat/bibliography-index',
      'fix/typo-chapter-five',
      'fix/broken-reference-link',
      'fix/formatting-inconsistency',
      'docs/content-style-guide',
      'docs/editing-workflow',
      'docs/github-workflow'
    ])('should validate content repository pattern "%s"', (branch) => {
      const result = validateBranch(branch);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Edge Cases - Empty or Null', () => {
    test('should reject empty string', () => {
      const result = validateBranch('');
      expect(result.isValid).toBe(false);
      expect(result.type).toBe('empty-branch');
    });

    test('should reject null', () => {
      const result = validateBranch(null);
      expect(result.isValid).toBe(false);
    });

    test('should reject undefined', () => {
      const result = validateBranch(undefined);
      expect(result.isValid).toBe(false);
    });

    test('should reject whitespace-only string', () => {
      const result = validateBranch('   ');
      expect(result.isValid).toBe(false);
      expect(result.type).toBe('empty-branch');
    });
  });

  describe('ValidationResult Class', () => {
    test('should create valid result', () => {
      const result = new ValidationResult(true, 'feat/test', 'Valid branch', 'valid');
      expect(result.isValid).toBe(true);
      expect(result.branch).toBe('feat/test');
      expect(result.message).toBe('Valid branch');
      expect(result.type).toBe('valid');
    });

    test('should create invalid result', () => {
      const result = new ValidationResult(false, 'invalid', 'Invalid branch', 'invalid-pattern');
      expect(result.isValid).toBe(false);
      expect(result.type).toBe('invalid-pattern');
    });

    test('should serialize to JSON', () => {
      const result = new ValidationResult(
        true,
        'feat/test',
        'Valid branch',
        'valid',
        { matchedType: 'feat' }
      );
      const json = result.toJSON();
      expect(json.isValid).toBe(true);
      expect(json.details.matchedType).toBe('feat');
    });
  });

  describe('Case Sensitivity', () => {
    test.each([
      'Feat/my-feature', // Uppercase type
      'feat/My-Feature', // Uppercase scope
      'feat/my-FEATURE', // Uppercase title
      'FEAT/MY-FEATURE' // All uppercase
    ])('should reject "%s" due to case sensitivity', (branch) => {
      const result = validateBranch(branch);
      expect(result.isValid).toBe(false);
    });
  });

  describe('Special Characters', () => {
    test.each([
      'feat/my@feature',
      'feat/my#feature',
      'feat/my$feature',
      'feat/my%feature',
      'feat/my&feature',
      'feat/my*feature',
      'feat/my!feature',
      'feat/my?feature'
    ])('should reject "%s" due to special characters', (branch) => {
      const result = validateBranch(branch);
      expect(result.isValid).toBe(false);
    });
  });

  describe('Whitespace Handling', () => {
    test('should trim leading/trailing whitespace', () => {
      const result = validateBranch('  feat/my-feature  ');
      expect(result.isValid).toBe(true);
    });

    test('should reject internal spaces', () => {
      const result = validateBranch('feat/my feature');
      expect(result.isValid).toBe(false);
    });
  });

  describe('Scope and Title Extraction', () => {
    test('should extract scope and title correctly', () => {
      const result = validateBranch('feat/user-dashboard-v2');
      expect(result.details.scope).toBe('user');
      expect(result.details.title).toBe('dashboard-v2');
    });

    test('should handle single-word title', () => {
      const result = validateBranch('feat/user-dashboard');
      expect(result.details.scope).toBe('user');
      expect(result.details.title).toBe('dashboard');
    });

    test('should handle multi-word title', () => {
      const result = validateBranch('feat/user-dashboard-dark-mode');
      expect(result.details.scope).toBe('user');
      expect(result.details.title).toBe('dashboard-dark-mode');
    });
  });

  describe('Numbers in Branches', () => {
    test.each([
      'feat/user-v2',
      'fix/bug-2024-regression',
      'release/v1.0.0',
      'content/chapter-5-revisions'
    ])('should accept numbers in "%s"', (branch) => {
      const result = validateBranch(branch);
      expect(result.isValid).toBe(true);
    });

    test('should reject numbers-only scope', () => {
      const result = validateBranch('feat/123-feature');
      expect(result.isValid).toBe(false);
    });
  });
});
