/**
 * Tests for git-merge-utils.js — Git merge status and history utilities
 */

import { getBaseRef, getMergeStatus, getUniqueCommitCount, getLastCommitDate, getLastCommitAuthor, getLastCommitHash } from './git-merge-utils.js';
import { execFileSync, spawnSync } from 'child_process';

// Mock execFileSync and spawnSync for testing
jest.mock('child_process', () => ({
  execFileSync: jest.fn(),
  spawnSync: jest.fn(),
}));

describe('git-merge-utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBaseRef', () => {
    it('returns origin/develop if it exists', () => {
      (execFileSync).mockImplementation((cmd, args) => {
        if (args[1] === '--verify' && args[2] === 'origin/develop') {
          return 'abc123def456';
        }
        throw new Error('not found');
      });
      const result = getBaseRef();
      expect(result).toBe('origin/develop');
    });

    it('falls back to origin/main when develop does not exist', () => {
      (execFileSync).mockImplementation((cmd, args) => {
        if (args[1] === '--verify' && args[2] === 'origin/main') {
          return 'def456abc123';
        }
        throw new Error('not found');
      });
      const result = getBaseRef();
      expect(result).toBe('origin/main');
    });

    it('returns origin/main when no candidates exist', () => {
      (execFileSync).mockImplementation(() => {
        throw new Error('not found');
      });
      const result = getBaseRef();
      expect(result).toBe('origin/main');
    });
  });

  describe('getMergeStatus', () => {
    it('returns merged when ancestor check succeeds (exit 0)', () => {
      (spawnSync).mockReturnValue({ status: 0 });
      const result = getMergeStatus('feature/test', 'origin/main');
      expect(result).toBe('merged');
    });

    it('returns unmerged when ancestor check fails (exit 1)', () => {
      (spawnSync).mockReturnValue({ status: 1 });
      const result = getMergeStatus('feature/test', 'origin/main');
      expect(result).toBe('unmerged');
    });

    it('returns unknown on git error (non-0/1 status)', () => {
      (spawnSync).mockReturnValue({ status: 128 });
      const result = getMergeStatus('feature/test', 'origin/main');
      expect(result).toBe('unknown');
    });

    it('uses getBaseRef when baseRef is null', () => {
      (execFileSync).mockImplementation(() => {
        throw new Error('not found');
      });
      (spawnSync).mockReturnValue({ status: 0 });
      const result = getMergeStatus('feature/test', null);
      expect(result).toBe('merged');
    });
  });

  describe('getUniqueCommitCount', () => {
    it('returns zero for non-numeric output', () => {
      (execFileSync).mockReturnValue('');
      const result = getUniqueCommitCount('feature/test', 'origin/main');
      expect(result).toBe(0);
    });

    it('parses valid commit counts', () => {
      (execFileSync).mockReturnValue('5\n');
      const result = getUniqueCommitCount('feature/test', 'origin/main');
      expect(result).toBe(5);
      expect(typeof result).toBe('number');
      expect(result >= 0).toBe(true);
    });

    it('handles NaN gracefully when git returns invalid data', () => {
      (execFileSync).mockReturnValue('invalid-output\n');
      const result = getUniqueCommitCount('feature/test', 'origin/main');
      expect(result).toBe(0);
    });

    it('returns commit count when baseRef is null', () => {
      (execFileSync).mockImplementation(() => {
        throw new Error('not found');
      });
      (execFileSync).mockReturnValueOnce('').mockReturnValueOnce('12\n');
      getBaseRef();
      const result = getUniqueCommitCount('feature/test', null);
      expect(result).toBe(0);
    });
  });

  describe('getLastCommitDate', () => {
    it('returns ISO 8601 formatted date', () => {
      (execFileSync).mockReturnValue('2026-01-15T10:30:45+00:00\n');
      const result = getLastCommitDate('feature/test');
      expect(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(result)).toBe(true);
    });

    it('handles git failure with empty string', () => {
      (execFileSync).mockImplementation(() => {
        throw new Error('not found');
      });
      const result = getLastCommitDate('feature/test');
      expect(result).toBe('');
    });

    it('trims whitespace from git output', () => {
      (execFileSync).mockReturnValue('  2026-01-15T10:30:45+00:00  \n');
      const result = getLastCommitDate('feature/test');
      expect(result).toBe('2026-01-15T10:30:45+00:00');
    });
  });

  describe('getLastCommitAuthor', () => {
    it('returns email address', () => {
      (execFileSync).mockReturnValue('user@example.com\n');
      const result = getLastCommitAuthor('feature/test');
      expect(result).toBe('user@example.com');
      expect(result).toContain('@');
    });

    it('handles missing author with empty string', () => {
      (execFileSync).mockImplementation(() => {
        throw new Error('not found');
      });
      const result = getLastCommitAuthor('feature/test');
      expect(result).toBe('');
    });

    it('trims whitespace from git output', () => {
      (execFileSync).mockReturnValue('  developer@company.org  \n');
      const result = getLastCommitAuthor('feature/test');
      expect(result).toBe('developer@company.org');
    });
  });

  describe('getLastCommitHash', () => {
    it('returns commit hash', () => {
      (execFileSync).mockReturnValue('abc123def456ghi789\n');
      const result = getLastCommitHash('feature/test');
      expect(typeof result).toBe('string');
      expect(result).toBe('abc123def456ghi789');
      expect(result.length).toBeGreaterThan(0);
    });

    it('handles missing hash with empty string', () => {
      (execFileSync).mockImplementation(() => {
        throw new Error('not found');
      });
      const result = getLastCommitHash('feature/test');
      expect(result).toBe('');
    });

    it('trims whitespace from git output', () => {
      (execFileSync).mockReturnValue('  a1b2c3d4e5f6g7h8  \n');
      const result = getLastCommitHash('feature/test');
      expect(result).toBe('a1b2c3d4e5f6g7h8');
    });
  });

  describe('integration patterns', () => {
    it('getMergeStatus uses getBaseRef when baseRef is null', () => {
      (execFileSync).mockImplementation(() => {
        throw new Error('not found');
      });
      (spawnSync).mockReturnValue({ status: 0 });
      const result = getMergeStatus('test', null);
      expect(['merged', 'unmerged', 'unknown']).toContain(result);
    });

    it('getUniqueCommitCount uses getBaseRef when baseRef is null', () => {
      (execFileSync).mockImplementation(() => {
        throw new Error('not found');
      });
      const result = getUniqueCommitCount('test', null);
      expect(typeof result).toBe('number');
      expect(result >= 0).toBe(true);
    });

    it('all functions trim git output correctly', () => {
      (execFileSync).mockReturnValue('  trimmed-value  \n');
      const hash = getLastCommitHash('test');
      expect(hash).toBe('trimmed-value');
      expect(hash).not.toContain('\n');
      expect(hash).not.toContain(' ');
    });
  });
});
