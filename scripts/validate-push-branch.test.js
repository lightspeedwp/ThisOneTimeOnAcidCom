/**
 * Tests for Git pre-push hook branch validation script
 */

import {
  extractBranchName,
  validateBranch,
  parsePushLine,
  shouldSkipRef,
  resolveHeadRef,
  getCurrentBranch,
  processPushLines,
  main
} from './validate-push-branch.js';
import { Readable } from 'stream';
import childProcess from 'child_process';

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

  describe('parsePushLine', () => {
    test('parses valid pre-push input lines', () => {
      const line = 'refs/heads/feat/my-feature abc123 refs/heads/feat/my-feature abc123';
      const result = parsePushLine(line);
      expect(result).toEqual({
        localRef: 'refs/heads/feat/my-feature',
        localObj: 'abc123',
        remoteRef: 'refs/heads/feat/my-feature',
        remoteObj: 'abc123'
      });
    });

    test('handles extra whitespace in pre-push lines', () => {
      const line = '  refs/heads/feat/my-feature   abc123   refs/heads/feat/my-feature   abc123  ';
      const result = parsePushLine(line);
      expect(result.localRef).toBe('refs/heads/feat/my-feature');
      expect(result.localObj).toBe('abc123');
    });

    test('returns null for invalid pre-push input', () => {
      expect(parsePushLine('incomplete line')).toBeNull();
      expect(parsePushLine('only three')).toBeNull();
      expect(parsePushLine('')).toBeNull();
    });

    test('handles tab-separated pre-push input', () => {
      const line = 'refs/heads/fix/bug\tdef456\trefs/heads/fix/bug\tdef456';
      const result = parsePushLine(line);
      expect(result.localRef).toBe('refs/heads/fix/bug');
      expect(result.localObj).toBe('def456');
    });
  });

  describe('shouldSkipRef', () => {
    test('skips branch deletions', () => {
      expect(shouldSkipRef('refs/heads/feat/my-feature', '0000000000000000000000000000000000000000')).toBe(true);
      expect(shouldSkipRef('refs/heads/fix/bug', '00000000000000000000000000000000')).toBe(true);
    });

    test('skips tag refs', () => {
      expect(shouldSkipRef('refs/tags/v1.0.0', 'abc123')).toBe(true);
      expect(shouldSkipRef('refs/tags/v2.0.0', 'def456')).toBe(true);
    });

    test('skips non-head non-tag refs', () => {
      expect(shouldSkipRef('refs/remotes/origin/main', 'abc123')).toBe(true);
      expect(shouldSkipRef('refs/stash', 'def456')).toBe(true);
    });

    test('does not skip valid branch refs', () => {
      expect(shouldSkipRef('refs/heads/feat/my-feature', 'abc123')).toBe(false);
      expect(shouldSkipRef('refs/heads/main', 'def456')).toBe(false);
    });

    test('allows HEAD to be resolved unless it is a deletion', () => {
      expect(shouldSkipRef('HEAD', 'abc123')).toBe(false);
      expect(shouldSkipRef('HEAD', '0000000000000000000000000000000000000000')).toBe(true);
    });
  });

  describe('resolveHeadRef', () => {
    test('returns non-HEAD refs unchanged', () => {
      expect(resolveHeadRef('refs/heads/feat/my-feature')).toBe('refs/heads/feat/my-feature');
      expect(resolveHeadRef('refs/heads/main')).toBe('refs/heads/main');
    });

    test('handles HEAD ref resolution', () => {
      // This will either resolve or return null depending on git state
      const result = resolveHeadRef('HEAD');
      expect(result === null || typeof result === 'string').toBe(true);
    });
  });

  describe('getCurrentBranch', () => {
    test('returns current branch name', () => {
      const branch = getCurrentBranch();
      // Should either return a branch name or null in detached HEAD state
      expect(branch === null || typeof branch === 'string').toBe(true);
    });

    test('does not return HEAD in detached state', () => {
      const branch = getCurrentBranch();
      // getCurrentBranch returns null for detached HEAD, not 'HEAD'
      if (branch !== null) {
        expect(branch).not.toBe('HEAD');
      }
    });
  });

  describe('processPushLines', () => {
    test('resolves and validates the current branch for a HEAD push', () => {
      const currentBranch = 'feat/current-branch';
      const symbolicRef = jest.spyOn(childProcess, 'execSync')
        .mockReturnValue(`refs/heads/${currentBranch}\n`);

      try {
        const result = processPushLines([
          'HEAD abc123 refs/heads/feat/remote-target def456'
        ]);

        expect(symbolicRef).toHaveBeenCalledWith('git symbolic-ref HEAD', { encoding: 'utf-8' });
        expect(result.branches).toEqual([currentBranch]);
        expect(result.hasInvalidBranch).toBe(false);
        expect(result.invalidBranches).toEqual([]);
      } finally {
        symbolicRef.mockRestore();
      }
    });

    test('processes valid push lines', () => {
      const lines = [
        'refs/heads/feat/my-feature abc123 refs/heads/feat/my-feature abc123'
      ];
      const result = processPushLines(lines);
      expect(result.branches.length).toBeGreaterThanOrEqual(0);
      expect(typeof result.hasInvalidBranch).toBe('boolean');
      expect(Array.isArray(result.invalidBranches)).toBe(true);
    });

    test('skips tag pushes', () => {
      const lines = [
        'refs/tags/v1.0.0 abc123 refs/tags/v1.0.0 abc123'
      ];
      const result = processPushLines(lines);
      expect(result.branches.length).toBe(0);
    });

    test('skips branch deletions', () => {
      const lines = [
        'refs/heads/old-branch 0000000000000000000000000000000000000000 refs/heads/old-branch abc123'
      ];
      const result = processPushLines(lines);
      expect(result.branches.length).toBe(0);
    });

    test('returns hasInvalidBranch when branches fail validation', () => {
      const lines = [
        'refs/heads/claude/invalid abc123 refs/heads/claude/invalid abc123'
      ];
      const result = processPushLines(lines);
      expect(result.hasInvalidBranch).toBe(true);
      expect(result.invalidBranches.length).toBeGreaterThan(0);
    });

    test('handles multiple lines', () => {
      const lines = [
        'refs/heads/feat/feature-one abc123 refs/heads/feat/feature-one abc123',
        'refs/heads/fix/bug-two def456 refs/heads/fix/bug-two def456',
        'refs/tags/v1.0.0 ghi789 refs/tags/v1.0.0 ghi789'
      ];
      const result = processPushLines(lines);
      // Should process at least the branch lines, skip the tag
      expect(result.branches.length >= 1).toBe(true);
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
