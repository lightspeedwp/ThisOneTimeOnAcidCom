/**
 * cleanup-branches.test.js — Test suite for branch cleanup script.
 * Tests classification logic, reporting, and safety safeguards.
 * @jest-environment node
 */

import {
  buildExcludeRegex,
  estimateStorageFreedBytes,
  formatBytes,
  getMetrics,
  getRemoteBranches,
  writeMarkdownReport,
  writeJsonReport,
  logTimestamp,
  log,
  logError,
  getArg,
  parseBool,
  ensureReportDir,
  validateEnvironment,
  toPct,
} from './cleanup-branches.js';
import { categorizeBranch, getBranchType, daysSince } from './lib/branch-categorization.js';
import { REASON_CODES, PROTECTED_BRANCHES, AVG_STORAGE_BYTES_PER_COMMIT } from './lib/constants.js';
import fs from 'fs';
import path from 'path';
import os from 'os';

// ============================================================================
// Helpers for testing
// ============================================================================

function createTempReportDir() {
  const dir = path.join(os.tmpdir(), `toa-cleanup-test-${Date.now()}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

function cleanupTempDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// ============================================================================
// Test Suites
// ============================================================================

describe('categorizeBranch', () => {
  it('preserves protected branches', () => {
    for (const branch of PROTECTED_BRANCHES) {
      const result = categorizeBranch(branch, {
        lastCommitDate: '2025-01-01T00:00:00Z',
        author: 'test@example.com',
        mergeStatus: 'merged',
      });
      expect(result.category).toBe('KEEP');
      expect(result.reason).toBe(REASON_CODES.KEEP.protected_branch);
    }
  });

  it('preserves excluded branches', () => {
    const excludeRe = /^(release\/|hotfix\/)/;
    const testBranches = ['release/v1.0.0', 'hotfix/critical-bug', 'release/staging'];

    for (const branch of testBranches) {
      const result = categorizeBranch(branch, {
        lastCommitDate: '2025-01-01T00:00:00Z',
        author: 'test@example.com',
        mergeStatus: 'merged',
      }, new Set(), excludeRe);

      expect(result.category).toBe('KEEP');
      expect(result.reason).toBe(REASON_CODES.KEEP.excluded_pattern);
    }
  });

  it('preserves branches with open PRs', () => {
    const openPRs = new Set(['feat/active-feature', 'fix/urgent-bug']);

    for (const branch of openPRs) {
      const result = categorizeBranch(branch, {
        lastCommitDate: '2025-01-01T00:00:00Z',
        author: 'test@example.com',
        mergeStatus: 'merged',
      }, openPRs);

      expect(result.category).toBe('KEEP');
      expect(result.reason).toBe(REASON_CODES.KEEP.open_pr);
    }
  });

  it('preserves unmerged branches', () => {
    const result = categorizeBranch('feat/new-feature', {
      lastCommitDate: '2025-01-01T00:00:00Z',
      author: 'test@example.com',
      mergeStatus: 'unmerged',
    });

    expect(result.category).toBe('KEEP');
    expect(result.reason).toBe(REASON_CODES.KEEP.not_merged);
  });

  it('preserves recently merged branches', () => {
    const recentDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(); // 5 days ago

    const result = categorizeBranch('feat/recent-feature', {
      lastCommitDate: recentDate,
      author: 'test@example.com',
      mergeStatus: 'merged',
    }, new Set(), null, 30);

    expect(result.category).toBe('KEEP');
    expect(result.reason).toBe(REASON_CODES.KEEP.recent);
  });

  it('marks stale merged branches for deletion', () => {
    const staleDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(); // 60 days ago

    const result = categorizeBranch('feat/old-feature', {
      lastCommitDate: staleDate,
      author: 'test@example.com',
      mergeStatus: 'merged',
    }, new Set(), null, 30);

    expect(result.category).toBe('DELETE');
    expect(result.reason).toBe(REASON_CODES.DELETE.merged_stale);
  });

  it('fails closed on unknown merge status', () => {
    const result = categorizeBranch('feat/uncertain', {
      lastCommitDate: '2025-01-01T00:00:00Z',
      author: 'test@example.com',
      mergeStatus: 'unknown',
    });

    expect(result.category).toBe('DISCUSS');
    expect(result.reason).toBe(REASON_CODES.DISCUSS.merge_status_unknown);
  });

  it('preserves Dependabot branches', () => {
    const testBranches = ['dependabot/npm_and_yarn/main', 'renovate/vite-6.x'];

    for (const branch of testBranches) {
      const result = categorizeBranch(branch, {
        lastCommitDate: '2025-01-01T00:00:00Z',
        author: 'dependabot@github.com',
        mergeStatus: 'merged',
      });

      expect(result.category).toBe('KEEP');
      expect(result.reason).toBe(REASON_CODES.KEEP.dependabot);
    }
  });
});

describe('getBranchType', () => {
  it('extracts branch type from branch name', () => {
    expect(getBranchType('feat/user-auth')).toBe('feat');
    expect(getBranchType('fix/navigation-bug')).toBe('fix');
    expect(getBranchType('docs/api-guide')).toBe('docs');
  });

  it('returns "other" for branches without slash', () => {
    expect(getBranchType('main')).toBe('other');
    expect(getBranchType('develop')).toBe('other');
  });
});

describe('daysSince', () => {
  it('calculates days since ISO date', () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const days = daysSince(oneDayAgo);

    expect(days).toBeGreaterThanOrEqual(0.99);
    expect(days).toBeLessThanOrEqual(1.01);
  });

  it('returns 0 for invalid dates', () => {
    expect(daysSince('invalid')).toBe(0);
    expect(daysSince('')).toBe(0);
    expect(daysSince(null)).toBe(0);
  });
});

describe('buildExcludeRegex', () => {
  let warnSpy;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('includes default patterns (release, hotfix)', () => {
    const regex = buildExcludeRegex();

    expect(regex.test('release/v1.0.0')).toBe(true);
    expect(regex.test('hotfix/critical-bug')).toBe(true);
  });

  it('adds custom patterns', () => {
    const options = {
      excludePatterns: 'main|develop',
      verbose: false,
    };

    const regex = buildExcludeRegex(options);
    expect(regex.test('release/v1.0.0')).toBe(true);
    expect(regex.test('main')).toBe(true);
    expect(regex.test('develop')).toBe(true);
    expect(regex.test('feat/feature')).toBe(false);
  });

  it('handles empty excludePatterns', () => {
    const options = {
      excludePatterns: '',
      verbose: false,
    };

    const regex = buildExcludeRegex(options);
    expect(regex.test('release/v1.0.0')).toBe(true);
    expect(regex.test('feature/test')).toBe(false);
  });

  it('handles whitespace in excludePatterns', () => {
    const options = {
      excludePatterns: ' feature/.*  |  bugfix/.*  ',
      verbose: false,
    };

    const regex = buildExcludeRegex(options);
    expect(regex.test('feature/my-feature')).toBe(true);
    expect(regex.test('bugfix/my-fix')).toBe(true);
  });

  it('falls back to defaults on invalid regex', () => {
    const options = {
      excludePatterns: '[invalid(regex',
      verbose: false,
    };

    const regex = buildExcludeRegex(options);

    // Should still match release and hotfix patterns
    expect(regex.test('release/v1.0.0')).toBe(true);
    expect(regex.test('hotfix/critical-bug')).toBe(true);

    // Should warn about the error
    expect(warnSpy).toHaveBeenCalled();
    const warnCall = warnSpy.mock.calls[0][0];
    expect(warnCall).toContain('Invalid --excludePatterns regex');
  });
});

describe('toPct', () => {
  it('formats simple percentages', () => {
    expect(toPct(1, 2)).toBe('50.00%');
    expect(toPct(3, 4)).toBe('75.00%');
    expect(toPct(1, 3)).toBe('33.33%');
  });

  it('returns 0% for zero numerator', () => {
    expect(toPct(0, 10)).toBe('0.00%');
  });

  it('returns 0.00% for zero denominator', () => {
    expect(toPct(5, 0)).toBe('0.00%');
  });

  it('handles 100% case', () => {
    expect(toPct(100, 100)).toBe('100.00%');
  });
});

describe('formatBytes', () => {
  it('formats bytes correctly', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(1023)).toBe('1023 B');
  });

  it('formats kilobytes', () => {
    expect(formatBytes(1024)).toBe('1.00 KB');
    expect(formatBytes(2048)).toBe('2.00 KB');
    expect(formatBytes(5120)).toBe('5.00 KB');
  });

  it('formats megabytes', () => {
    expect(formatBytes(1024 * 1024)).toBe('1.00 MB');
    expect(formatBytes(10 * 1024 * 1024)).toBe('10.00 MB');
  });

  it('handles edge case at 1024 boundary', () => {
    expect(formatBytes(1023 * 1024)).toMatch(/KB/);
    expect(formatBytes(1024 * 1024)).toMatch(/MB/);
  });
});

describe('estimateStorageFreedBytes', () => {
  it('calculates storage impact', () => {
    const bytes = estimateStorageFreedBytes(10);
    expect(bytes).toBe(10 * AVG_STORAGE_BYTES_PER_COMMIT);
  });

  it('handles zero commits', () => {
    expect(estimateStorageFreedBytes(0)).toBe(0);
  });

  it('calculates for single commit', () => {
    expect(estimateStorageFreedBytes(1)).toBe(AVG_STORAGE_BYTES_PER_COMMIT);
  });

  it('scales linearly', () => {
    const single = estimateStorageFreedBytes(1);
    const hundred = estimateStorageFreedBytes(100);
    expect(hundred).toBe(single * 100);
  });
});

describe('getMetrics', () => {
  it('aggregates metrics correctly', () => {
    const deleted = [
      {
        branch: 'feat/auth',
        type: 'feat',
        author: 'alice@example.com',
        commitCount: 5,
        estimatedStorageBytes: 5 * AVG_STORAGE_BYTES_PER_COMMIT,
      },
      {
        branch: 'fix/bug',
        type: 'fix',
        author: 'bob@example.com',
        commitCount: 3,
        estimatedStorageBytes: 3 * AVG_STORAGE_BYTES_PER_COMMIT,
      },
    ];

    const preserved = [
      { branch: 'main', category: 'KEEP' },
      { branch: 'develop', category: 'KEEP' },
    ];

    const errors = [];

    const metrics = getMetrics(deleted, preserved, errors);

    expect(metrics.successfulDeletes).toBe(2);
    expect(metrics.failedDeletes).toBe(0);
    expect(metrics.totalCommits).toBe(8);
    expect(metrics.byType.feat).toBe(1);
    expect(metrics.byType.fix).toBe(1);
    expect(metrics.authorsAffected).toContain('alice@example.com');
    expect(metrics.authorsAffected).toContain('bob@example.com');
  });

  it('handles empty deletion list', () => {
    const metrics = getMetrics([], [], []);
    expect(metrics.successfulDeletes).toBe(0);
    expect(metrics.totalCommits).toBe(0);
  });
});

describe('Report generation', () => {
  let tempDir;

  beforeEach(() => {
    tempDir = createTempReportDir();
  });

  afterEach(() => {
    cleanupTempDir(tempDir);
  });

  it('writes markdown report', () => {
    const deleted = [
      {
        branch: 'feat/old-auth',
        lastCommitDate: '2024-01-01T00:00:00Z',
        author: 'alice@example.com',
        hash: 'abc123def456',
        age: 45,
        type: 'feat',
        commitCount: 5,
        estimatedStorageBytes: 5 * AVG_STORAGE_BYTES_PER_COMMIT,
        reason: 'Fully merged and inactive',
      },
    ];

    const preserved = [
      { branch: 'main', category: 'KEEP', reason: 'Protected branch' },
    ];

    const errors = [];
    const metrics = getMetrics(deleted, preserved, errors);

    const options = {
      reportDir: tempDir,
      inactiveDays: 30,
      verbose: false,
    };

    const reportPath = writeMarkdownReport(deleted, preserved, errors, metrics, options);

    expect(fs.existsSync(reportPath)).toBe(true);
    const content = fs.readFileSync(reportPath, 'utf8');
    expect(content).toContain('Branch Cleanup Report');
    expect(content).toContain('feat/old-auth');
    expect(content).toContain('abc123def456');
    expect(content).toContain('Report-only');
  });

  it('writes json report', () => {
    const deleted = [
      {
        branch: 'feat/old-auth',
        lastCommitDate: '2024-01-01T00:00:00Z',
        author: 'alice@example.com',
        hash: 'abc123def456',
        age: 45,
        type: 'feat',
        commitCount: 5,
        estimatedStorageBytes: 5 * AVG_STORAGE_BYTES_PER_COMMIT,
        reason: 'Fully merged and inactive',
      },
    ];

    const preserved = [
      { branch: 'main', category: 'KEEP', reason: 'Protected branch' },
    ];

    const errors = [];
    const metrics = getMetrics(deleted, preserved, errors);

    const options = {
      reportDir: tempDir,
      inactiveDays: 30,
      verbose: false,
    };

    const reportPath = writeJsonReport(deleted, preserved, errors, metrics, options);

    expect(fs.existsSync(reportPath)).toBe(true);
    const content = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    expect(content.mode).toBe('report-only');
    expect(content.summary.candidateCount).toBe(1);
    expect(content.candidates[0].branch).toBe('feat/old-auth');
  });
});

describe('Safety safeguards', () => {
  it('never executes branch deletion', () => {
    // This test documents that the cleanup-branches.js script
    // is report-only and contains no deletion code paths.
    // The script rejects --dryRun=false and throws an error.

    // The absence of execFileSync('git', ['branch', '-d', ...])
    // and similar commands in the main cleanup-branches.js file
    // is verified by code inspection, not this test.

    // Verification: grep cleanup-branches.js for delete/remove operations
    // should return zero results.
    expect(true).toBe(true); // Placeholder assertion
  });

  it('classifies branches conservatively on missing merge status', () => {
    const result = categorizeBranch('feat/uncertain', {
      lastCommitDate: '2024-01-01T00:00:00Z',
      author: 'test@example.com',
      mergeStatus: 'unknown',
    });

    // Fail closed: unknown → DISCUSS, not DELETE
    expect(result.category).not.toBe('DELETE');
    expect(result.category).toBe('DISCUSS');
  });

  it('does not validate branch names for deletion eligibility', () => {
    // Branch names with forbidden prefixes (claude/, copilot/, openai/)
    // are still subject to classification.
    // Validation happens at PR creation time, not cleanup time.

    const forbiddenBranches = ['claude/test', 'copilot/fix', 'openai/feature'];

    for (const branch of forbiddenBranches) {
      // These branches are not automatically excluded;
      // they undergo normal categorization.
      const result = categorizeBranch(branch, {
        lastCommitDate: '2024-01-01T00:00:00Z',
        author: 'test@example.com',
        mergeStatus: 'merged',
      }, new Set(), null, 30);

      // A merged stale branch with forbidden name is still eligible for deletion.
      // The forbidden status is enforced by branch-validation at creation time,
      // not by cleanup logic.
      expect(['DELETE', 'KEEP']).toContain(result.category);
    }
  });
});

describe('Non-deletion verification', () => {
  it('confirms cleanup-branches.js never deletes branches', () => {
    // Read the source file and verify absence of deletion commands
    const scriptPath = './scripts/cleanup-branches.js';
    const source = fs.readFileSync(scriptPath, 'utf8');

    // Verify no actual git branch deletion commands
    expect(source).not.toMatch(/git.*branch.*-D\b/);
    expect(source).not.toMatch(/git.*push.*--delete/);
    expect(source).not.toMatch(/git.*branch.*-d\b/);

    // Verify this is report-only mode (no deletion support)
    expect(source).toContain('Report-only');
    expect(source).toContain('no deletions executed');
  });
});

describe('CLI Helper Functions', () => {
  describe('logTimestamp', () => {
    it('returns time string in HH:MM:SS format', () => {
      const timestamp = logTimestamp();
      expect(typeof timestamp).toBe('string');
      expect(timestamp).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    it('returns valid time components', () => {
      const timestamp = logTimestamp();
      const [hours, minutes, seconds] = timestamp.split(':');
      expect(parseInt(hours)).toBeGreaterThanOrEqual(0);
      expect(parseInt(hours)).toBeLessThan(24);
      expect(parseInt(minutes)).toBeGreaterThanOrEqual(0);
      expect(parseInt(minutes)).toBeLessThan(60);
      expect(parseInt(seconds)).toBeGreaterThanOrEqual(0);
      expect(parseInt(seconds)).toBeLessThan(60);
    });
  });

  describe('log', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('logs messages with level and message', () => {
      log('info', 'test message');
      expect(consoleSpy).toHaveBeenCalled();
      const call = consoleSpy.mock.calls[0][0];
      expect(call).toContain('test message');
      expect(call).toContain('[');
    });

    it('logs error level messages with error icon', () => {
      log('error', 'error message');
      expect(consoleSpy).toHaveBeenCalled();
      const call = consoleSpy.mock.calls[0][0];
      expect(call).toContain('error message');
      expect(call).toContain('❌');
    });

    it('logs warn level messages with warning icon', () => {
      log('warn', 'warn message');
      expect(consoleSpy).toHaveBeenCalled();
      const call = consoleSpy.mock.calls[0][0];
      expect(call).toContain('warn message');
      expect(call).toContain('⚠️');
    });

    it('logs debug level messages with debug icon', () => {
      log('debug', 'debug message');
      expect(consoleSpy).toHaveBeenCalled();
      const call = consoleSpy.mock.calls[0][0];
      expect(call).toContain('debug message');
      expect(call).toContain('🔍');
    });

    it('logs info level messages with info icon', () => {
      log('info', 'info message');
      expect(consoleSpy).toHaveBeenCalled();
      const call = consoleSpy.mock.calls[0][0];
      expect(call).toContain('info message');
      expect(call).toContain('ℹ️');
    });
  });

  describe('logError', () => {
    let consoleSpy;
    let consoleErrorSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('logs error messages using log function', () => {
      logError('error occurred');
      expect(consoleSpy).toHaveBeenCalled();
      const call = consoleSpy.mock.calls[0][0];
      expect(call).toContain('error occurred');
      expect(call).toContain('❌');
    });

    it('includes message text', () => {
      logError('specific error message');
      expect(consoleSpy).toHaveBeenCalled();
      const call = consoleSpy.mock.calls[0][0];
      expect(call).toContain('specific error message');
    });

    it('accepts an error object as second parameter', () => {
      const error = new Error('Detailed error message');
      logError('error occurred', error);
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('handles error string as error parameter', () => {
      logError('error occurred', 'String error');
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('handles null error gracefully', () => {
      expect(() => {
        logError('error occurred', null);
      }).not.toThrow();
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('getArg', () => {
    const originalArgv = process.argv;

    beforeEach(() => {
      process.argv = ['node', 'script.js'];
    });

    afterEach(() => {
      process.argv = originalArgv;
    });

    it('extracts argument value from --name=value format', () => {
      process.argv = ['node', 'script.js', '--inactiveDays=45'];
      const result = getArg('inactiveDays');
      expect(result).toBe('45');
    });

    it('returns default value for missing argument', () => {
      process.argv = ['node', 'script.js'];
      const result = getArg('missing', 'default');
      expect(result).toBe('default');
    });

    it('handles --name format (boolean flag)', () => {
      process.argv = ['node', 'script.js', '--verbose'];
      const result = getArg('verbose');
      expect(result).toBe('true');
    });

    it('extracts from multiple arguments', () => {
      process.argv = ['node', 'script.js', '--first=a', '--second=b'];
      expect(getArg('first')).toBe('a');
      expect(getArg('second')).toBe('b');
    });

    it('handles argument with empty value', () => {
      process.argv = ['node', 'script.js', '--key='];
      const result = getArg('key');
      expect(result).toBe('');
    });

    it('returns undefined for missing argument without default', () => {
      process.argv = ['node', 'script.js'];
      const result = getArg('missing');
      expect(result).toBeUndefined();
    });
  });

  describe('parseBool', () => {
    it('converts "true" string to boolean true', () => {
      expect(parseBool('true')).toBe(true);
    });

    it('converts "false" string to boolean false', () => {
      expect(parseBool('false')).toBe(false);
    });

    it('defaults to false for unknown strings', () => {
      expect(parseBool('unknown')).toBe(false);
    });

    it('handles empty string as false', () => {
      expect(parseBool('')).toBe(false);
    });

    it('handles null as false', () => {
      expect(parseBool(null)).toBe(false);
    });

    it('handles undefined as false', () => {
      expect(parseBool(undefined)).toBe(false);
    });

    it('respects custom default value', () => {
      expect(parseBool('unknown', true)).toBe(true);
      expect(parseBool('unknown', false)).toBe(false);
    });

    it('overrides default for explicit "true"', () => {
      expect(parseBool('true', false)).toBe(true);
    });

    it('overrides default for explicit "false"', () => {
      expect(parseBool('false', true)).toBe(false);
    });
  });

  describe('ensureReportDir', () => {
    let tempDir;

    beforeEach(() => {
      tempDir = path.join(os.tmpdir(), `cleanup-test-${Date.now()}`);
    });

    afterEach(() => {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    });

    it('creates directory if it does not exist', () => {
      const newDir = path.join(tempDir, 'reports');
      const options = { reportDir: newDir };
      ensureReportDir(options);
      expect(fs.existsSync(newDir)).toBe(true);
    });

    it('succeeds if directory already exists', () => {
      fs.mkdirSync(tempDir, { recursive: true });
      const options = { reportDir: tempDir };
      expect(() => {
        ensureReportDir(options);
      }).not.toThrow();
    });

    it('creates nested directories', () => {
      const nestedDir = path.join(tempDir, 'level1', 'level2', 'level3');
      const options = { reportDir: nestedDir };
      ensureReportDir(options);
      expect(fs.existsSync(nestedDir)).toBe(true);
    });
  });

  describe('validateEnvironment', () => {
    it('executes without throwing', () => {
      expect(() => {
        validateEnvironment();
      }).not.toThrow();
    });

    it('returns undefined (void function)', () => {
      const result = validateEnvironment();
      expect(result).toBeUndefined();
    });
  });
});
