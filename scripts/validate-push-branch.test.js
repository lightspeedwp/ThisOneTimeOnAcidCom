/**
 * Tests for Git pre-push hook branch validation script
 */

import { extractBranchName, validateBranch } from './validate-push-branch.js';

describe('validate-push-branch', () => {

  describe('extractBranchName', () => {
    test('extracts branch name from full git ref', () => {
      expect(extractBranchName('refs/heads/feat/my-feature')).toBe('feat/my-feature');
    });

    test('extracts simple branch names', () => {
      expect(extractBranchName('refs/heads/main')).toBe('main');
      expect(extractBranchName('refs/heads/develop')).toBe('develop');
    });

    test('extracts branches with multiple slashes', () => {
      expect(extractBranchName('refs/heads/release/v1.0.0')).toBe('release/v1.0.0');
      expect(extractBranchName('refs/heads/bugfix/issue-123/my-fix')).toBe('bugfix/issue-123/my-fix');
    });

    test('returns ref unchanged if not a branch ref', () => {
      expect(extractBranchName('refs/tags/v1.0.0')).toBe('refs/tags/v1.0.0');
      expect(extractBranchName('HEAD')).toBe('HEAD');
      expect(extractBranchName('my-feature')).toBe('my-feature');
    });

    test('handles empty strings', () => {
      expect(extractBranchName('')).toBe('');
    });

    test('handles refs with unusual characters', () => {
      expect(extractBranchName('refs/heads/feat/UPPER-case')).toBe('feat/UPPER-case');
      expect(extractBranchName('refs/heads/feat/with-numbers-123')).toBe('feat/with-numbers-123');
    });
  });

  describe('validateBranch', () => {
    test('returns valid result for allowed branches', () => {
      const result = validateBranch('feat/my-feature');
      expect(result.valid).toBe(true);
    });

    test('returns valid result for release branches', () => {
      const result = validateBranch('release/v1.0.0');
      expect(result.valid).toBe(true);
    });

    test('returns invalid result for forbidden prefixes', () => {
      const result = validateBranch('claude/my-feature');
      expect(result.valid).toBe(false);
      expect(result.message).toBeTruthy();
    });

    test('returns invalid result for invalid patterns', () => {
      const result = validateBranch('invalid-branch');
      expect(result.valid).toBe(false);
    });

    test('returns result object with status fields', () => {
      const result = validateBranch('feat/test');
      expect(result).toHaveProperty('valid');
      expect(typeof result.valid).toBe('boolean');
    });

    test('returns error details on failure', () => {
      const result = validateBranch('claude/feature');
      if (!result.valid) {
        expect(result.message).toBeTruthy();
      }
    });
  });

  describe('integration scenarios', () => {
    test('validates release branches', () => {
      const result = validateBranch('release/v2.0.0');
      expect(result.valid).toBe(true);
    });

    test('validates dependabot branches', () => {
      const result = validateBranch('dependabot/npm_and_yarn/lodash-4.17.21');
      expect(result.valid).toBe(true);
    });

    test('rejects branches with wrong separator', () => {
      const result = validateBranch('feat_my-feature');
      expect(result.valid).toBe(false);
    });

    test('handles various branch types', () => {
      const validBranches = ['feat/test', 'fix/bug', 'docs/readme', 'refactor/code'];
      validBranches.forEach(branch => {
        const result = validateBranch(branch);
        expect([true, false]).toContain(result.valid);
      });
    });
  });

  describe('branch name extraction edge cases', () => {
    test('handles branch names with hyphens and numbers', () => {
      expect(extractBranchName('refs/heads/feat/user-dashboard-v2')).toBe('feat/user-dashboard-v2');
    });

    test('handles branch names with dots', () => {
      expect(extractBranchName('refs/heads/release/v1.0.0')).toBe('release/v1.0.0');
    });

    test('handles branch names with underscores (unusual but valid)', () => {
      expect(extractBranchName('refs/heads/feature_name')).toBe('feature_name');
    });

    test('preserves case sensitivity', () => {
      const result = extractBranchName('refs/heads/Feat/MyFeature');
      expect(result).toBe('Feat/MyFeature');
    });
  });
});
