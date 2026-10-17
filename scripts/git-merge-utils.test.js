/**
 * Tests for git-merge-utils.js
 * @jest-environment node
 */

import { execFileSync, spawnSync } from 'child_process';
import * as gitUtils from './lib/git-merge-utils.js';

jest.mock('child_process');

describe('git-merge-utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBaseRef', () => {
    it('returns origin/develop when it exists', () => {
      execFileSync.mockImplementation((cmd, args) => {
        if (args.includes('origin/develop')) return 'abc123\n';
        throw new Error('not found');
      });

      const result = gitUtils.getBaseRef();
      expect(result).toBe('origin/develop');
    });

    it('returns origin/main when develop does not exist', () => {
      execFileSync.mockImplementation((cmd, args) => {
        if (args.includes('origin/develop')) throw new Error('not found');
        if (args.includes('origin/main')) return 'def456\n';
        throw new Error('not found');
      });

      const result = gitUtils.getBaseRef();
      expect(result).toBe('origin/main');
    });

    it('returns origin/master when develop and main do not exist', () => {
      execFileSync.mockImplementation((cmd, args) => {
        if (args.includes('origin/develop')) throw new Error('not found');
        if (args.includes('origin/main')) throw new Error('not found');
        if (args.includes('origin/master')) return 'ghi789\n';
        throw new Error('not found');
      });

      const result = gitUtils.getBaseRef();
      expect(result).toBe('origin/master');
    });

    it('returns origin/main as fallback when all refs fail', () => {
      execFileSync.mockImplementation(() => {
        throw new Error('git failed');
      });

      const result = gitUtils.getBaseRef();
      expect(result).toBe('origin/main');
    });
  });

  describe('getMergeStatus', () => {
    it('returns "merged" when branch is ancestor of base', () => {
      spawnSync.mockReturnValue({ status: 0, encoding: 'utf8' });

      const result = gitUtils.getMergeStatus('feature-branch', 'origin/main');
      expect(result).toBe('merged');
      expect(spawnSync).toHaveBeenCalledWith(
        'git',
        ['merge-base', '--is-ancestor', 'origin/feature-branch', 'origin/main'],
        { encoding: 'utf8' }
      );
    });

    it('returns "unmerged" when branch is not ancestor of base', () => {
      spawnSync.mockReturnValue({ status: 1, encoding: 'utf8' });

      const result = gitUtils.getMergeStatus('feature-branch', 'origin/main');
      expect(result).toBe('unmerged');
    });

    it('returns "unknown" for unexpected git status codes', () => {
      spawnSync.mockReturnValue({ status: 128, encoding: 'utf8' });

      const result = gitUtils.getMergeStatus('feature-branch', 'origin/main');
      expect(result).toBe('unknown');
    });

    it('returns "unknown" when git throws error', () => {
      spawnSync.mockImplementation(() => {
        throw new Error('git error');
      });

      const result = gitUtils.getMergeStatus('feature-branch', 'origin/main');
      expect(result).toBe('unknown');
    });

    it('uses getBaseRef() when baseRef is null', () => {
      execFileSync.mockImplementation((cmd, args) => {
        if (args.includes('origin/develop')) return 'abc123\n';
        throw new Error('not found');
      });
      spawnSync.mockReturnValue({ status: 0, encoding: 'utf8' });

      const result = gitUtils.getMergeStatus('feature-branch', null);
      expect(result).toBe('merged');
    });

    it('uses getBaseRef() when baseRef is undefined', () => {
      execFileSync.mockImplementation((cmd, args) => {
        if (args.includes('origin/main')) return 'def456\n';
        throw new Error('not found');
      });
      spawnSync.mockReturnValue({ status: 0, encoding: 'utf8' });

      const result = gitUtils.getMergeStatus('feature-branch');
      expect(result).toBe('merged');
    });
  });

  describe('getUniqueCommitCount', () => {
    it('returns commit count when git succeeds', () => {
      execFileSync.mockReturnValue('42\n');

      const result = gitUtils.getUniqueCommitCount('feature-branch', 'origin/main');
      expect(result).toBe(42);
      expect(execFileSync).toHaveBeenCalledWith(
        'git',
        ['rev-list', '--count', 'origin/main..origin/feature-branch'],
        expect.any(Object)
      );
    });

    it('returns 0 when git returns non-numeric output', () => {
      execFileSync.mockReturnValue('not a number\n');

      const result = gitUtils.getUniqueCommitCount('feature-branch', 'origin/main');
      expect(result).toBe(0);
    });

    it('returns 0 when git fails', () => {
      execFileSync.mockImplementation(() => {
        throw new Error('git failed');
      });

      const result = gitUtils.getUniqueCommitCount('feature-branch', 'origin/main');
      expect(result).toBe(0);
    });

    it('uses getBaseRef() when baseRef is null', () => {
      execFileSync.mockImplementation((cmd, args) => {
        if (args.includes('rev-parse')) return 'abc123\n';
        if (args.includes('rev-list')) return '5\n';
        throw new Error('not found');
      });

      const result = gitUtils.getUniqueCommitCount('feature-branch', null);
      expect(result).toBe(5);
    });
  });

  describe('getLastCommitDate', () => {
    it('returns ISO 8601 date when git succeeds', () => {
      execFileSync.mockReturnValue('2026-10-17T04:33:37Z\n');

      const result = gitUtils.getLastCommitDate('feature-branch');
      expect(result).toBe('2026-10-17T04:33:37Z');
      expect(execFileSync).toHaveBeenCalledWith(
        'git',
        ['log', '-1', '--format=%cI', 'origin/feature-branch'],
        expect.any(Object)
      );
    });

    it('returns empty string when git fails', () => {
      execFileSync.mockImplementation(() => {
        throw new Error('git failed');
      });

      const result = gitUtils.getLastCommitDate('feature-branch');
      expect(result).toBe('');
    });
  });

  describe('getLastCommitAuthor', () => {
    it('returns author email when git succeeds', () => {
      execFileSync.mockReturnValue('user@example.com\n');

      const result = gitUtils.getLastCommitAuthor('feature-branch');
      expect(result).toBe('user@example.com');
      expect(execFileSync).toHaveBeenCalledWith(
        'git',
        ['log', '-1', '--format=%ae', 'origin/feature-branch'],
        expect.any(Object)
      );
    });

    it('returns empty string when git fails', () => {
      execFileSync.mockImplementation(() => {
        throw new Error('git failed');
      });

      const result = gitUtils.getLastCommitAuthor('feature-branch');
      expect(result).toBe('');
    });
  });

  describe('getLastCommitHash', () => {
    it('returns commit hash when git succeeds', () => {
      execFileSync.mockReturnValue('abc123def456\n');

      const result = gitUtils.getLastCommitHash('feature-branch');
      expect(result).toBe('abc123def456');
      expect(execFileSync).toHaveBeenCalledWith(
        'git',
        ['log', '-1', '--format=%H', 'origin/feature-branch'],
        expect.any(Object)
      );
    });

    it('returns empty string when git fails', () => {
      execFileSync.mockImplementation(() => {
        throw new Error('git failed');
      });

      const result = gitUtils.getLastCommitHash('feature-branch');
      expect(result).toBe('');
    });
  });
});
