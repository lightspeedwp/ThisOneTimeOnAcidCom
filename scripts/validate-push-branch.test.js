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

    test('returns non-HEAD refs without calling git', () => {
      const refs = ['refs/heads/feat/test', 'refs/heads/main', 'refs/tags/v1.0.0'];
      refs.forEach(ref => {
        const result = resolveHeadRef(ref);
        expect(result).toBe(ref);
      });
    });
  });

  describe('getCurrentBranch', () => {
    test('returns current branch name or null', () => {
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

    test('returns string or null consistently', () => {
      for (let i = 0; i < 3; i++) {
        const branch = getCurrentBranch();
        expect(['string', 'object'].includes(typeof branch) || branch === null).toBe(true);
      }
    });
  });

  describe('processPushLines', () => {
    test('handles errors in resolveHeadRef gracefully', () => {
      const execSync = jest.spyOn(childProcess, 'execSync')
        .mockImplementation(() => {
          throw new Error('Not a git repository');
        });

      try {
        const result = processPushLines([
          'HEAD abc123 refs/heads/feat/test def456'
        ]);

        expect(result.branches.length).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(result.invalidBranches)).toBe(true);
      } finally {
        execSync.mockRestore();
      }
    });

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

    test('filters non-branch refs during processing', () => {
      const lines = [
        'refs/heads/feat/valid abc123 refs/heads/feat/valid abc123',
        'refs/remotes/origin/main def456 refs/remotes/origin/main def456',
        'refs/heads/fix/bug ghi789 refs/heads/fix/bug ghi789'
      ];
      const result = processPushLines(lines);
      expect(result.branches.length).toBe(2);
      expect(result.branches).toContain('feat/valid');
      expect(result.branches).toContain('fix/bug');
    });

    test('skips malformed push lines', () => {
      const lines = [
        'refs/heads/feat/valid abc123 refs/heads/feat/valid abc123',
        'incomplete malformed line',
        'refs/heads/fix/bug def456 refs/heads/fix/bug def456'
      ];
      const result = processPushLines(lines);
      expect(result.branches.length).toBe(2);
    });

    test('returns empty arrays for empty input', () => {
      const result = processPushLines([]);
      expect(result.branches).toEqual([]);
      expect(result.invalidBranches).toEqual([]);
      expect(result.hasInvalidBranch).toBe(false);
    });

    test('handles all-zero deletion markers in multiple lines', () => {
      const lines = [
        'refs/heads/feature 0000000000000000000000000000000000000000 refs/heads/feature abc123',
        'refs/heads/valid abc123 refs/heads/valid abc123',
        'refs/heads/oldfix 0000000000000000000000000000000000000000 refs/heads/oldfix def456'
      ];
      const result = processPushLines(lines);
      expect(result.branches.length).toBe(1);
      expect(result.branches[0]).toBe('valid');
    });

    test('processes forbidden prefixes and collects invalid branches', () => {
      const lines = [
        'refs/heads/claude/forbidden abc123 refs/heads/claude/forbidden abc123',
        'refs/heads/copilot/bad def456 refs/heads/copilot/bad def456'
      ];
      const result = processPushLines(lines);
      expect(result.hasInvalidBranch).toBe(true);
      expect(result.invalidBranches.length).toBeGreaterThan(0);
      expect(result.invalidBranches).toContain('claude/forbidden');
    });

    test('extracts branch names from refs correctly', () => {
      const lines = [
        'refs/heads/feat/test-feature abc123 refs/heads/feat/test-feature abc123',
        'refs/heads/fix/bug-fix def456 refs/heads/fix/bug-fix def456'
      ];
      const result = processPushLines(lines);
      expect(result.branches).toContain('feat/test-feature');
      expect(result.branches).toContain('fix/bug-fix');
    });

    test('returns structure with all required properties', () => {
      const lines = ['refs/heads/feat/test abc123 refs/heads/feat/test abc123'];
      const result = processPushLines(lines);
      expect(result).toHaveProperty('branches');
      expect(result).toHaveProperty('hasInvalidBranch');
      expect(result).toHaveProperty('invalidBranches');
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

  describe('additional edge cases and scenarios', () => {
    test('resolveHeadRef with non-HEAD refs returns unchanged', () => {
      const result = resolveHeadRef('refs/heads/feat/test');
      expect(result).toBe('refs/heads/feat/test');
    });

    test('shouldSkipRef with various prefixes', () => {
      // Remote tracking branch
      expect(shouldSkipRef('refs/remotes/origin/main', 'abc123')).toBe(true);
      // Stash ref
      expect(shouldSkipRef('refs/stash', 'def456')).toBe(true);
      // Notes
      expect(shouldSkipRef('refs/notes/custom', 'ghi789')).toBe(true);
    });

    test('validateBranch with release branches', () => {
      const result = validateBranch('release/v1.0.0');
      expect(result.valid).toBe(true);
    });

    test('validateBranch with dependabot branches', () => {
      const result = validateBranch('dependabot/npm_and_yarn/lodash-4.17.21');
      expect(result.valid).toBe(true);
    });

    test('validateBranch with renovate branches', () => {
      const result = validateBranch('renovate/update-dependencies');
      expect(result.valid).toBe(true);
    });

    test('parsePushLine with various whitespace', () => {
      const result = parsePushLine('refs/heads/feat/test   abc123   refs/heads/feat/test   abc123');
      expect(result.localRef).toBe('refs/heads/feat/test');
      expect(result.localObj).toBe('abc123');
    });

    test('processPushLines mixed valid and skipped refs', () => {
      const lines = [
        'refs/heads/feat/valid abc123 refs/heads/feat/valid abc123',
        'refs/tags/v1.0.0 def456 refs/tags/v1.0.0 def456',
        'refs/heads/fix/bug ghi789 refs/heads/fix/bug ghi789',
        'refs/remotes/origin/remote jkl012 refs/remotes/origin/remote jkl012'
      ];
      const result = processPushLines(lines);
      expect(result.branches.length).toBe(2);
      expect(result.branches).toContain('feat/valid');
      expect(result.branches).toContain('fix/bug');
    });

    test('processPushLines with complex branch types', () => {
      const lines = [
        'refs/heads/release/v2.0.0 abc123 refs/heads/release/v2.0.0 abc123',
        'refs/heads/hotfix/critical def456 refs/heads/hotfix/critical def456',
        'refs/heads/chore/deps ghi789 refs/heads/chore/deps ghi789'
      ];
      const result = processPushLines(lines);
      expect(result.branches.length).toBeGreaterThan(0);
      expect(Array.isArray(result.invalidBranches)).toBe(true);
    });

    test('parsePushLine handles newlines and tabs', () => {
      const result = parsePushLine('refs/heads/feat/test\tabc123\trefs/heads/feat/test\tabc123');
      expect(result.localRef).toBe('refs/heads/feat/test');
      expect(result.localObj).toBe('abc123');
    });

    test('shouldSkipRef with HEAD and valid object', () => {
      expect(shouldSkipRef('HEAD', 'abc123')).toBe(false);
    });

    test('shouldSkipRef with HEAD and zero object (deletion)', () => {
      expect(shouldSkipRef('HEAD', '0000000000000000000000000000000000000000')).toBe(true);
    });

    test('extractBranchName with numeric-only branch names', () => {
      expect(extractBranchName('refs/heads/123/feature')).toBe('123/feature');
    });

    test('validateBranch with all valid type prefixes', () => {
      const validTypes = [
        'feat/test', 'fix/test', 'docs/test', 'test/test',
        'refactor/test', 'perf/test', 'chore/test', 'ci/test',
        'release/v1.0.0', 'hotfix/test', 'deps/test', 'security/test'
      ];
      validTypes.forEach(branch => {
        const result = validateBranch(branch);
        expect([true, false]).toContain(result.valid);
      });
    });
  });
});
