/**
 * Jest test suite for branch name validation.
 * Tests all 38 authorised types, forbidden prefixes, exemptions, and edge cases.
 */

import {
  validateBranch,
  checkForbiddenPrefix,
  checkExemptions,
  validateStandardPattern,
  getCurrentBranch,
  ValidationResult,
  AUTHORISED_TYPES,
  FORBIDDEN_PREFIXES,
  PATTERNS,
  parseArgs
} from './validate-branch-name.js';
import { execSync } from 'child_process';

jest.mock('child_process');

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

  describe('Edge Cases - Empty and Invalid Inputs', () => {
    test('should reject null branch', () => {
      const result = validateBranch(null);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('empty or invalid');
    });

    test('should reject undefined branch', () => {
      const result = validateBranch(undefined);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('empty or invalid');
    });

    test('should reject empty string', () => {
      const result = validateBranch('');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('empty or invalid');
    });

    test('should reject numeric branch', () => {
      const result = validateBranch(123);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('empty or invalid');
    });

    test('should reject boolean branch', () => {
      const result = validateBranch(true);
      expect(result.isValid).toBe(false);
    });

    test('should reject object branch', () => {
      const result = validateBranch({ branch: 'feat/test' });
      expect(result.isValid).toBe(false);
    });

    test('should reject array branch', () => {
      const result = validateBranch(['feat', 'test']);
      expect(result.isValid).toBe(false);
    });
  });

  describe('Utility Functions - checkForbiddenPrefix', () => {
    test('should reject all forbidden prefixes', () => {
      for (const prefix of FORBIDDEN_PREFIXES) {
        const result = checkForbiddenPrefix(`${prefix}/some-branch`);
        expect(result).not.toBeNull();
        expect(result.isValid).toBe(false);
        expect(result.type).toBe('forbidden-prefix');
        expect(result.details.forbiddenPrefix).toBe(prefix);
      }
    });

    test('should allow non-forbidden prefixes', () => {
      const result = checkForbiddenPrefix('feat/my-feature');
      expect(result).toBeNull();
    });

    test('should not match partial prefix patterns', () => {
      const result = checkForbiddenPrefix('claud/something');
      expect(result).toBeNull();
    });
  });

  describe('Utility Functions - checkExemptions', () => {
    test('should recognise dependabot branches', () => {
      const result = checkExemptions('dependabot/npm_and_yarn/lodash-4.17.21');
      expect(result).not.toBeNull();
      expect(result.isValid).toBe(true);
      expect(result.details.pattern).toBe('dependabot');
      expect(result.type).toBe('exemption');
    });

    test('should recognise renovate branches', () => {
      const result = checkExemptions('renovate/npm-major-dependencies');
      expect(result).not.toBeNull();
      expect(result.isValid).toBe(true);
      expect(result.details.pattern).toBe('renovate');
      expect(result.type).toBe('exemption');
    });

    test('should recognise semantic version release branches', () => {
      const result = checkExemptions('release/v1.2.3');
      expect(result).not.toBeNull();
      expect(result.isValid).toBe(true);
      expect(result.details.pattern).toBe('releaseVersioned');
    });

    test('should recognise release branches with pre-release versions', () => {
      const result = checkExemptions('release/v2.0.0-beta.1');
      expect(result).not.toBeNull();
      expect(result.isValid).toBe(true);
    });

    test('should recognise date-based release branches', () => {
      const result = checkExemptions('release/2025-01-15');
      expect(result).not.toBeNull();
      expect(result.isValid).toBe(true);
      expect(result.details.pattern).toBe('releaseStandard');
    });

    test('should reject release branches that don\'t match patterns', () => {
      const result = checkExemptions('release/my-release');
      expect(result).toBeNull();
    });

    test('should return null for non-exemption branches', () => {
      const result = checkExemptions('feat/my-feature');
      expect(result).toBeNull();
    });
  });

  describe('Utility Functions - validateStandardPattern', () => {
    test('should validate standard pattern branches', () => {
      const result = validateStandardPattern('feat/user-dashboard');
      expect(result.isValid).toBe(true);
      expect(result.details.pattern).toBe('standard');
      expect(result.details.matchedType).toBe('feat');
    });

    test('should reject branches without standard pattern', () => {
      const result = validateStandardPattern('my-branch-without-slash');
      expect(result.isValid).toBe(false);
      expect(result.type).toBe('invalid-pattern');
    });

    test('should reject branches with invalid type', () => {
      const result = validateStandardPattern('invalid/my-branch');
      expect(result.isValid).toBe(false);
      expect(result.type).toBe('invalid-type');
    });

    test('should extract type, scope and title correctly', () => {
      const result = validateStandardPattern('refactor/component-hooks-consolidation');
      expect(result.isValid).toBe(true);
      expect(result.details.matchedType).toBe('refactor');
      expect(result.details.scope).toBe('component');
      expect(result.details.title).toBe('hooks-consolidation');
    });
  });

  describe('Utility Functions - getCurrentBranch', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      execSync.mockReset();
    });

    test('should return current git branch name', () => {
      execSync.mockReturnValue('feat/my-feature\n');
      const branch = getCurrentBranch();
      expect(branch).toBe('feat/my-feature');
      expect(execSync).toHaveBeenCalledWith(
        'git rev-parse --abbrev-ref HEAD',
        expect.objectContaining({ encoding: 'utf-8' })
      );
    });

    test('should trim whitespace from branch name', () => {
      execSync.mockReturnValue('  main  \n');
      const branch = getCurrentBranch();
      expect(branch).toBe('main');
    });

    test('should throw error when git command fails', () => {
      execSync.mockImplementation(() => {
        throw new Error('fatal: not a git repository');
      });
      expect(() => getCurrentBranch()).toThrow('Not in a git repository or git command failed');
    });

    test('should throw error when execSync throws any error', () => {
      execSync.mockImplementation(() => {
        throw new Error('Some git error');
      });
      expect(() => getCurrentBranch()).toThrow('Not in a git repository or git command failed');
    });
  });

  describe('Release Branch Pattern Edge Cases', () => {
    test('should accept release/ branch matching standard pattern', () => {
      const result = validateBranch('release/my-release');
      expect(result.isValid).toBe(true);
      expect(result.type).toBe('valid');
    });

    test('should accept release/v0.0.0 (semantic version)', () => {
      const result = validateBranch('release/v0.0.0');
      expect(result.isValid).toBe(true);
      expect(result.type).toBe('exemption');
    });

    test('should accept release/v1.2.3-alpha.1 (pre-release version)', () => {
      const result = validateBranch('release/v1.2.3-alpha.1');
      expect(result.isValid).toBe(true);
      expect(result.type).toBe('exemption');
    });

    test('should accept release/2026-10-17 (date-based release)', () => {
      const result = validateBranch('release/2026-10-17');
      expect(result.isValid).toBe(true);
      expect(result.type).toBe('exemption');
    });

    test('should reject release/v1.2 (invalid semantic version)', () => {
      const result = validateBranch('release/v1.2');
      expect(result.isValid).toBe(false);
      expect(result.type).toBe('invalid-pattern');
    });
  });
});

describe('Main CLI functionality', () => {
  test('validateBranch handles empty input', () => {
    const result = validateBranch('');
    expect(result.isValid).toBe(false);
    expect(result.type).toBe('empty-branch');
  });

  test('validateBranch handles null input', () => {
    const result = validateBranch(null);
    expect(result.isValid).toBe(false);
    expect(result.type).toBe('empty-branch');
  });

  test('validateBranch handles whitespace-only input', () => {
    const result = validateBranch('   ');
    expect(result.isValid).toBe(false);
    expect(result.type).toBe('empty-branch');
  });

  test('validateBranch trims whitespace', () => {
    const result = validateBranch('  feat/my-feature  ');
    expect(result.isValid).toBe(true);
  });

  test('checkForbiddenPrefix detects claude prefix', () => {
    const result = checkForbiddenPrefix('claude/my-branch');
    expect(result.isValid).toBe(false);
    expect(result.type).toBe('forbidden-prefix');
  });

  test('checkForbiddenPrefix detects copilot prefix', () => {
    const result = checkForbiddenPrefix('copilot/my-branch');
    expect(result.isValid).toBe(false);
    expect(result.type).toBe('forbidden-prefix');
  });

  test('checkForbiddenPrefix detects openai prefix', () => {
    const result = checkForbiddenPrefix('openai/my-branch');
    expect(result.isValid).toBe(false);
    expect(result.type).toBe('forbidden-prefix');
  });

  test('checkForbiddenPrefix returns null for valid branches', () => {
    const result = checkForbiddenPrefix('feat/my-branch');
    expect(result).toBeNull();
  });

  test('checkExemptions detects dependabot branches', () => {
    const result = checkExemptions('dependabot/npm_and_yarn/main');
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('exemption');
    expect(result.details.pattern).toBe('dependabot');
  });

  test('checkExemptions detects renovate branches', () => {
    const result = checkExemptions('renovate/vite-6.x');
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('exemption');
    expect(result.details.pattern).toBe('renovate');
  });

  test('checkExemptions detects semantic version release branches', () => {
    const result = checkExemptions('release/v1.2.3');
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('exemption');
    expect(result.details.pattern).toBe('releaseVersioned');
  });

  test('checkExemptions detects pre-release version branches', () => {
    const result = checkExemptions('release/v2.0.0-beta.1');
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('exemption');
  });

  test('checkExemptions detects date-based release branches', () => {
    const result = checkExemptions('release/2025-01-15');
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('exemption');
    expect(result.details.pattern).toBe('releaseStandard');
  });

  test('checkExemptions returns null for non-exempt branches', () => {
    const result = checkExemptions('feat/my-feature');
    expect(result).toBeNull();
  });

  test('validateStandardPattern detects invalid pattern', () => {
    const result = validateStandardPattern('InvalidPattern');
    expect(result.isValid).toBe(false);
    expect(result.type).toBe('invalid-pattern');
  });

  test('validateStandardPattern detects invalid type', () => {
    const result = validateStandardPattern('invalid/my-feature');
    expect(result.isValid).toBe(false);
    expect(result.type).toBe('invalid-type');
  });

  test('ValidationResult toJSON converts to JSON', () => {
    const result = new ValidationResult(true, 'feat/test', 'Valid', 'valid', { detail: 'info' });
    const json = result.toJSON();
    expect(json.isValid).toBe(true);
    expect(json.branch).toBe('feat/test');
    expect(json.type).toBe('valid');
    expect(json.details.detail).toBe('info');
  });

  describe('parseArgs', () => {
    it('should extract branch name when --branch flag is present', () => {
      const result = parseArgs(['--branch', 'feat/test-feature']);
      expect(result.branchName).toBe('feat/test-feature');
      expect(result.error).toBeNull();
    });

    it('should return error when --branch flag has no value', () => {
      const result = parseArgs(['--branch']);
      expect(result.branchName).toBeNull();
      expect(result.error).toBe('Error: --branch requires a value');
    });

    it('should return null when --branch flag is not present', () => {
      const result = parseArgs(['--json', '--other']);
      expect(result.branchName).toBeNull();
      expect(result.error).toBeNull();
    });

    it('should handle empty args array', () => {
      const result = parseArgs([]);
      expect(result.branchName).toBeNull();
      expect(result.error).toBeNull();
    });

    it('should extract branch name with special characters', () => {
      const result = parseArgs(['--branch', 'feat/my-special_branch.name']);
      expect(result.branchName).toBe('feat/my-special_branch.name');
      expect(result.error).toBeNull();
    });

    it('should reject empty string operand for --branch', () => {
      const result = parseArgs(['--branch', '']);
      expect(result.branchName).toBeNull();
      expect(result.error).toBe('Error: --branch requires a non-empty value that is not a flag');
    });

    it('should reject flag-like operand for --branch', () => {
      const result = parseArgs(['--branch', '--json']);
      expect(result.branchName).toBeNull();
      expect(result.error).toBe('Error: --branch requires a non-empty value that is not a flag');
    });

    it('should reject operand starting with dash for --branch', () => {
      const result = parseArgs(['--branch', '-something']);
      expect(result.branchName).toBeNull();
      expect(result.error).toBe('Error: --branch requires a non-empty value that is not a flag');
    });
  });
});
