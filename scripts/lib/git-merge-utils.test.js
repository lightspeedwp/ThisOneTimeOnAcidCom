/**
 * Jest test suite for git merge utilities.
 * Tests git merge status, commit counting, and branch metadata functions.
 */

import { execFileSync, spawnSync } from 'child_process';
import {
  getBaseRef,
  getMergeStatus,
  getUniqueCommitCount,
  getLastCommitDate,
  getLastCommitAuthor,
  getLastCommitHash
} from './git-merge-utils.js';

jest.mock('child_process');

describe('Git Merge Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    execFileSync.mockReset();
    spawnSync.mockReset();
  });

  describe('getBaseRef', () => {
    test('should return develop when it exists', () => {
      execFileSync.mockReturnValue('abc123');
      const baseRef = getBaseRef();
      expect(baseRef).toBe('origin/develop');
      expect(execFileSync).toHaveBeenCalledWith(
        'git',
        ['rev-parse', '--verify', 'origin/develop'],
        expect.objectContaining({ encoding: 'utf8' })
      );
    });

    test('should fallback to main when develop does not exist', () => {
      // First call (develop) fails
      execFileSync.mockImplementationOnce(() => {
        throw new Error('Not found');
      });
      // Second call (main) succeeds
      execFileSync.mockReturnValueOnce('def456\n');

      const baseRef = getBaseRef();
      expect(baseRef).toBe('origin/main');
      expect(execFileSync).toHaveBeenCalledTimes(2);
    });

    test('should fallback to master when main does not exist', () => {
      // Develop and main fail, master succeeds
      execFileSync
        .mockImplementationOnce(() => { throw new Error('Not found'); })
        .mockImplementationOnce(() => { throw new Error('Not found'); })
        .mockReturnValueOnce('ghi789\n');

      const baseRef = getBaseRef();
      expect(baseRef).toBe('origin/master');
      expect(execFileSync).toHaveBeenCalledTimes(3);
    });

    test('should return origin/main when no candidates exist', () => {
      execFileSync.mockImplementation(() => {
        throw new Error('Not found');
      });

      const baseRef = getBaseRef();
      expect(baseRef).toBe('origin/main');
    });

    test('should trim whitespace from git output', () => {
      execFileSync
        .mockReturnValueOnce('   \n')
        .mockReturnValueOnce('abc123');
      const baseRef = getBaseRef();
      expect(baseRef).toBe('origin/main');
    });
  });

  describe('getMergeStatus', () => {
    test('should return merged when branch is ancestor of base', () => {
      spawnSync.mockReturnValue({ status: 0, stdout: '', stderr: '' });

      const status = getMergeStatus('feature-branch');
      expect(status).toBe('merged');
      expect(spawnSync).toHaveBeenCalledWith(
        'git',
        ['merge-base', '--is-ancestor', 'origin/feature-branch', expect.any(String)],
        expect.objectContaining({ encoding: 'utf8' })
      );
    });

    test('should return unmerged when branch is not ancestor of base', () => {
      spawnSync.mockReturnValue({ status: 1, stdout: '', stderr: '' });

      const status = getMergeStatus('feature-branch');
      expect(status).toBe('unmerged');
    });

    test('should return unknown when git returns non-0/1 exit code', () => {
      spawnSync.mockReturnValue({ status: 128, stdout: '', stderr: 'fatal error' });

      const status = getMergeStatus('feature-branch');
      expect(status).toBe('unknown');
    });

    test('should return unknown when git throws error', () => {
      spawnSync.mockImplementation(() => {
        throw new Error('Git error');
      });

      const status = getMergeStatus('feature-branch');
      expect(status).toBe('unknown');
    });

    test('should use provided baseRef instead of getBaseRef', () => {
      spawnSync.mockReturnValue({ status: 0 });

      getMergeStatus('feature-branch', 'origin/custom-base');

      expect(spawnSync).toHaveBeenCalledWith(
        'git',
        ['merge-base', '--is-ancestor', 'origin/feature-branch', 'origin/custom-base'],
        expect.any(Object)
      );
    });

    test('should use getBaseRef when baseRef is null', () => {
      execFileSync.mockReturnValue('abc123');
      spawnSync.mockReturnValue({ status: 0 });

      getMergeStatus('feature-branch', null);

      expect(execFileSync).toHaveBeenCalled();
      expect(spawnSync).toHaveBeenCalledWith(
        'git',
        ['merge-base', '--is-ancestor', 'origin/feature-branch', 'origin/develop'],
        expect.any(Object)
      );
    });
  });

  describe('getUniqueCommitCount', () => {
    test('should return commit count when valid number', () => {
      execFileSync.mockReturnValue('5\n');

      const count = getUniqueCommitCount('feature-branch');
      expect(count).toBe(5);
      expect(execFileSync).toHaveBeenCalledWith(
        'git',
        ['rev-list', '--count', expect.stringContaining('..origin/feature-branch')],
        expect.any(Object)
      );
    });

    test('should return 0 for empty commit count', () => {
      execFileSync.mockReturnValue('0\n');

      const count = getUniqueCommitCount('feature-branch');
      expect(count).toBe(0);
    });

    test('should return 0 when output is not parseable', () => {
      execFileSync.mockReturnValue('invalid\n');

      const count = getUniqueCommitCount('feature-branch');
      expect(count).toBe(0);
    });

    test('should return 0 when git fails', () => {
      execFileSync.mockImplementation(() => {
        throw new Error('Git error');
      });

      const count = getUniqueCommitCount('feature-branch');
      expect(count).toBe(0);
    });

    test('should return 0 when output is empty string', () => {
      execFileSync.mockReturnValue('');

      const count = getUniqueCommitCount('feature-branch');
      expect(count).toBe(0);
    });

    test('should use provided baseRef', () => {
      execFileSync.mockReturnValue('3\n');

      getUniqueCommitCount('feature-branch', 'origin/custom-base');

      expect(execFileSync).toHaveBeenCalledWith(
        'git',
        ['rev-list', '--count', 'origin/custom-base..origin/feature-branch'],
        expect.any(Object)
      );
    });
  });

  describe('getLastCommitDate', () => {
    test('should return ISO 8601 date for branch', () => {
      execFileSync.mockReturnValue('2026-10-17T14:30:00+00:00\n');

      const date = getLastCommitDate('feature-branch');
      expect(date).toBe('2026-10-17T14:30:00+00:00');
      expect(execFileSync).toHaveBeenCalledWith(
        'git',
        ['log', '-1', '--format=%cI', 'origin/feature-branch'],
        expect.any(Object)
      );
    });

    test('should return empty string when git fails', () => {
      execFileSync.mockImplementation(() => {
        throw new Error('Git error');
      });

      const date = getLastCommitDate('feature-branch');
      expect(date).toBe('');
    });

    test('should trim whitespace from output', () => {
      execFileSync.mockReturnValue('  2026-10-17T14:30:00+00:00  \n');

      const date = getLastCommitDate('feature-branch');
      expect(date).toBe('2026-10-17T14:30:00+00:00');
    });
  });

  describe('getLastCommitAuthor', () => {
    test('should return author email for branch', () => {
      execFileSync.mockReturnValue('user@example.com\n');

      const author = getLastCommitAuthor('feature-branch');
      expect(author).toBe('user@example.com');
      expect(execFileSync).toHaveBeenCalledWith(
        'git',
        ['log', '-1', '--format=%ae', 'origin/feature-branch'],
        expect.any(Object)
      );
    });

    test('should return empty string when git fails', () => {
      execFileSync.mockImplementation(() => {
        throw new Error('Git error');
      });

      const author = getLastCommitAuthor('feature-branch');
      expect(author).toBe('');
    });

    test('should trim whitespace from output', () => {
      execFileSync.mockReturnValue('  user@example.com  \n');

      const author = getLastCommitAuthor('feature-branch');
      expect(author).toBe('user@example.com');
    });
  });

  describe('getLastCommitHash', () => {
    test('should return commit hash for branch', () => {
      execFileSync.mockReturnValue('abc123def456\n');

      const hash = getLastCommitHash('feature-branch');
      expect(hash).toBe('abc123def456');
      expect(execFileSync).toHaveBeenCalledWith(
        'git',
        ['log', '-1', '--format=%H', 'origin/feature-branch'],
        expect.any(Object)
      );
    });

    test('should return empty string when git fails', () => {
      execFileSync.mockImplementation(() => {
        throw new Error('Git error');
      });

      const hash = getLastCommitHash('feature-branch');
      expect(hash).toBe('');
    });

    test('should trim whitespace from output', () => {
      execFileSync.mockReturnValue('  abc123def456  \n');

      const hash = getLastCommitHash('feature-branch');
      expect(hash).toBe('abc123def456');
    });

    test('should handle short hash format', () => {
      execFileSync.mockReturnValue('abc123d\n');

      const hash = getLastCommitHash('feature-branch');
      expect(hash).toBe('abc123d');
    });
  });

  describe('Integration Tests', () => {
    test('should handle branch names with special characters in getLastCommitDate', () => {
      execFileSync.mockImplementation(() => '2026-10-17T14:30:00+00:00\n');

      const date = getLastCommitDate('feat/user-dashboard-v2');
      expect(date).toBe('2026-10-17T14:30:00+00:00');
    });

    test('should handle git command failures gracefully', () => {
      execFileSync.mockImplementation(() => {
        throw new Error('No git repository');
      });
      spawnSync.mockImplementation(() => {
        throw new Error('No git repository');
      });

      expect(getUniqueCommitCount('branch')).toBe(0);
      expect(getLastCommitDate('branch')).toBe('');
      expect(getLastCommitAuthor('branch')).toBe('');
      expect(getLastCommitHash('branch')).toBe('');
      expect(getMergeStatus('branch')).toBe('unknown');
    });

    it('getMergeStatus with undefined baseRef', () => {
      (execFileSync).mockImplementation(() => {
        throw new Error('not found');
      });
      (spawnSync).mockReturnValue({ status: 0 });
      const result = getMergeStatus('test', undefined);
      expect(result).toBe('merged');
    });

    it('getMergeStatus with empty string baseRef', () => {
      (execFileSync).mockImplementation(() => {
        throw new Error('not found');
      });
      (spawnSync).mockReturnValue({ status: 1 });
      const result = getMergeStatus('test', '');
      expect(result).toBe('unmerged');
    });

    it('getUniqueCommitCount with undefined baseRef', () => {
      (execFileSync).mockImplementation((cmd, args) => {
        if (args[0] === 'rev-parse') return 'abc123';
        if (args[0] === 'rev-list') return '7\n';
        throw new Error('not found');
      });
      const result = getUniqueCommitCount('test', undefined);
      expect(result).toBe(7);
    });

    it('getUniqueCommitCount with false baseRef', () => {
      (execFileSync).mockImplementation((cmd, args) => {
        if (args[0] === 'rev-parse') return 'def456';
        if (args[0] === 'rev-list') return '3\n';
        throw new Error('not found');
      });
      const result = getUniqueCommitCount('test', false);
      expect(result).toBe(3);
    });

    it('getMergeStatus with 0 baseRef (falsy but not null/undefined)', () => {
      // When baseRef is 0 (falsy), getMergeStatus calls getBaseRef()
      // Mock getBaseRef to return origin/main by making develop/master lookups fail
      (execFileSync).mockImplementation((cmd, args) => {
        if (args[0] === 'rev-parse' && args[2] === 'origin/main') {
          return 'abc123';
        }
        throw new Error('not found');
      });
      (spawnSync).mockReturnValue({ status: 0 });
      const result = getMergeStatus('test', 0);
      expect(result).toBe('merged');
      // Verify spawnSync was called with the fallback base ref (origin/main)
      expect(spawnSync).toHaveBeenCalledWith(
        'git',
        ['merge-base', '--is-ancestor', 'origin/test', 'origin/main'],
        expect.any(Object)
      );
    });
  });
});
