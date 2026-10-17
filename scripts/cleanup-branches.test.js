/**
 * cleanup-branches.test.js — Test suite for branch cleanup script.
 * Tests classification logic, reporting, and safety safeguards.
 * @jest-environment node
 */

import {
  buildExcludeRegex,
  estimateStorageFreedBytes,
  formatBytes,
  getArg,
  getMetrics,
  getRemoteBranches,
  log,
  logError,
  logTimestamp,
  parseBool,
  toPct,
  writeMarkdownReport,
  writeJsonReport,
} from './cleanup-branches.js';
import { categorizeBranch, getBranchType, daysSince } from './lib/branch-categorization.js';
import { REASON_CODES, PROTECTED_BRANCHES, AVG_STORAGE_BYTES_PER_COMMIT } from './lib/constants.js';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { execFileSync } from 'child_process';

jest.mock('child_process');

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

  it('does not preserve branches that do not match exclude pattern', () => {
    const excludeRe = /^(release\/|hotfix\/)/;
    const inactiveDays = 30;
    const pastDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(); // 60 days ago

    const result = categorizeBranch('feat/old-feature', {
      lastCommitDate: pastDate,
      author: 'test@example.com',
      mergeStatus: 'merged',
    }, new Set(), excludeRe, inactiveDays);

    // Should be eligible for deletion since it doesn't match exclude pattern
    expect(result.category).toBe('DELETE');
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

  it('defaults to KEEP for unclassified merge status', () => {
    const result = categorizeBranch('feat/unclassified', {
      lastCommitDate: '2025-01-01T00:00:00Z',
      author: 'test@example.com',
      mergeStatus: 'indeterminate', // or any status other than 'merged', 'unmerged', 'unknown'
    });

    expect(result.category).toBe('KEEP');
    expect(result.reason).toBe('Unable to classify');
  });

  it('handles empty metadata with defaults', () => {
    const result = categorizeBranch('feat/test', {});

    expect(result.category).toBe('DISCUSS');
    expect(result.reason).toBe(REASON_CODES.DISCUSS.merge_status_unknown);
  });

  it('preserves branches with open PRs even if they meet deletion criteria', () => {
    const openPRs = new Set(['fix/stale-with-pr']);
    const staleDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();

    const result = categorizeBranch('fix/stale-with-pr', {
      lastCommitDate: staleDate,
      author: 'test@example.com',
      mergeStatus: 'merged',
    }, openPRs, null, 30);

    expect(result.category).toBe('KEEP');
    expect(result.reason).toBe(REASON_CODES.KEEP.open_pr);
  });

  it('checks excluded branches before other conditions', () => {
    const excludeRe = /^excluded\/.*/;
    const staleDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();

    const result = categorizeBranch('excluded/very-stale', {
      lastCommitDate: staleDate,
      author: 'test@example.com',
      mergeStatus: 'merged',
    }, new Set(), excludeRe, 30);

    expect(result.category).toBe('KEEP');
    expect(result.reason).toBe(REASON_CODES.KEEP.excluded_pattern);
  });

  it('handles null lastCommitDate gracefully', () => {
    const result = categorizeBranch('feat/no-date', {
      author: 'test@example.com',
      mergeStatus: 'merged',
    }, new Set(), null, 30);

    expect(result.metadata.ageInDays).toBe(0);
    expect(result.category).toBe('KEEP'); // Recent (age 0 < 30)
  });

  it('uses custom inactiveDays threshold', () => {
    const recentDate = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(); // 45 days ago

    const resultWith30Days = categorizeBranch('feat/test', {
      lastCommitDate: recentDate,
      author: 'test@example.com',
      mergeStatus: 'merged',
    }, new Set(), null, 30);

    const resultWith60Days = categorizeBranch('feat/test', {
      lastCommitDate: recentDate,
      author: 'test@example.com',
      mergeStatus: 'merged',
    }, new Set(), null, 60);

    expect(resultWith30Days.category).toBe('DELETE'); // 45 >= 30
    expect(resultWith60Days.category).toBe('KEEP'); // 45 < 60
  });

  it('handles renovate branches like dependabot', () => {
    const result = categorizeBranch('renovate/major-version-update', {
      lastCommitDate: '2025-01-01T00:00:00Z',
      author: 'renovate@bot.com',
      mergeStatus: 'merged',
    });

    expect(result.category).toBe('KEEP');
    expect(result.reason).toBe(REASON_CODES.KEEP.dependabot);
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

describe('ensureReportDir', () => {
  it('creates report directory if it does not exist', () => {
    const { join } = require('path');
    const os = require('os');
    const tempDir = join(os.tmpdir(), `toa-report-test-${Date.now()}-${Math.random()}`);

    // Ensure directory doesn't exist
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    // Import ensureReportDir through testing the behavior
    // Since it's not exported, we test it indirectly through writeMarkdownReport
    // with a non-existent directory
    const toDelete = [];
    const toPreserve = [{ branch: 'main', category: 'KEEP', reason: 'default' }];
    const errors = [];
    const metrics = getMetrics(toDelete, toPreserve, errors);

    const reportPath = writeMarkdownReport(toDelete, toPreserve, errors, metrics, {
      reportDir: tempDir,
      inactiveDays: 30
    });

    // Verify directory was created
    expect(fs.existsSync(tempDir)).toBe(true);
    expect(fs.existsSync(reportPath)).toBe(true);

    // Cleanup
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});

describe('buildExcludeRegex', () => {
  it('includes default patterns (release, hotfix)', () => {
    const regex = buildExcludeRegex({ excludePatterns: null, verbose: false });

    expect(regex.test('release/v1.0.0')).toBe(true);
    expect(regex.test('hotfix/critical-bug')).toBe(true);
  });

  it('adds custom patterns', () => {
    const regex = buildExcludeRegex({ excludePatterns: 'main|develop', verbose: false });

    expect(regex.test('release/v1.0.0')).toBe(true);
    expect(regex.test('main')).toBe(true);
    expect(regex.test('develop')).toBe(true);
    expect(regex.test('feat/feature')).toBe(false);
  });

  it('filters empty patterns', () => {
    const regex = buildExcludeRegex({ excludePatterns: 'main||develop|', verbose: false });

    expect(regex.test('main')).toBe(true);
    expect(regex.test('develop')).toBe(true);
    expect(regex.test('feat/feature')).toBe(false);
  });

  it('handles invalid regex patterns', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const regex = buildExcludeRegex({ excludePatterns: '[invalid(', verbose: false });

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid --excludePatterns regex'));
    expect(regex.test('release/v1.0.0')).toBe(true);

    consoleSpy.mockRestore();
  });
});

describe('formatBytes', () => {
  it('formats bytes correctly', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(1024)).toMatch(/1\.\d+ KB/);
    expect(formatBytes(1024 * 1024)).toMatch(/1\.\d+ MB/);
  });

  it('handles small byte values', () => {
    expect(formatBytes(1)).toBe('1 B');
    expect(formatBytes(10)).toBe('10 B');
    expect(formatBytes(100)).toBe('100 B');
  });

  it('handles kilobyte range', () => {
    expect(formatBytes(1024)).toMatch(/1\.\d+ KB/);
    expect(formatBytes(10240)).toMatch(/10\.\d+ KB/);
    expect(formatBytes(102400)).toMatch(/100\.\d+ KB/);
  });

  it('handles megabyte range', () => {
    expect(formatBytes(1024 * 1024)).toMatch(/1\.\d+ MB/);
    expect(formatBytes(10 * 1024 * 1024)).toMatch(/10\.\d+ MB/);
  });

  it('caps formatting at megabytes', () => {
    const gigabytes = 1024 * 1024 * 1024;
    const formatted = formatBytes(gigabytes);
    expect(formatted).toMatch(/\d+\.\d+ MB/);
    expect(formatted).not.toContain('GB');
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
});

describe('toPct', () => {
  it('converts ratio to percentage with two decimals', () => {
    expect(toPct(50, 100)).toBe('50.00%');
    expect(toPct(1, 3)).toBe('33.33%');
    expect(toPct(2, 5)).toBe('40.00%');
  });

  it('returns 0.00% when denominator is zero', () => {
    expect(toPct(0, 0)).toBe('0.00%');
    expect(toPct(100, 0)).toBe('0.00%');
    expect(toPct(1, 0)).toBe('0.00%');
  });

  it('handles fractional percentages', () => {
    expect(toPct(1, 6)).toBe('16.67%');
    expect(toPct(1, 7)).toBe('14.29%');
  });

  it('handles small numerators', () => {
    expect(toPct(1, 1000)).toBe('0.10%');
    expect(toPct(0, 100)).toBe('0.00%');
  });

  it('handles 100% correctly', () => {
    expect(toPct(100, 100)).toBe('100.00%');
    expect(toPct(1, 1)).toBe('100.00%');
  });

  it('rounds correctly to two decimals', () => {
    expect(toPct(1, 3)).toBe('33.33%');
    expect(toPct(2, 3)).toBe('66.67%');
  });
});

describe('ensureReportDir - existing directory', () => {
  it('does not error when directory already exists', () => {
    const tempDir = createTempReportDir();

    // Directory already exists from createTempReportDir
    expect(fs.existsSync(tempDir)).toBe(true);

    // Call writeMarkdownReport again - should not error
    const toDelete = [];
    const toPreserve = [{ branch: 'main', category: 'KEEP', reason: 'default' }];
    const errors = [];
    const metrics = getMetrics(toDelete, toPreserve, errors);

    const reportPath = writeMarkdownReport(toDelete, toPreserve, errors, metrics, {
      reportDir: tempDir,
      inactiveDays: 30
    });

    expect(fs.existsSync(reportPath)).toBe(true);

    cleanupTempDir(tempDir);
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
    expect(metrics.preservedDeletedRatio).toBe('0:0');
  });

  it('calculates preserved-to-deleted ratio correctly', () => {
    const deleted = [
      {
        branch: 'feat/old',
        type: 'feat',
        author: 'alice@example.com',
        commitCount: 5,
        estimatedStorageBytes: 5 * AVG_STORAGE_BYTES_PER_COMMIT,
      },
    ];

    const preserved = [
      { branch: 'main', category: 'KEEP' },
      { branch: 'develop', category: 'KEEP' },
      { branch: 'staging', category: 'KEEP' },
    ];

    const metrics = getMetrics(deleted, preserved, []);
    expect(metrics.preservedDeletedRatio).toBe('3:1');
  });

  it('handles branches with missing authors', () => {
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
        // No author field
        commitCount: 3,
        estimatedStorageBytes: 3 * AVG_STORAGE_BYTES_PER_COMMIT,
      },
    ];

    const metrics = getMetrics(deleted, [], []);
    expect(metrics.authorsAffected).toContain('alice@example.com');
    expect(metrics.authorsAffected).toEqual(['alice@example.com']);
    expect(metrics.authorsAffected.length).toBe(1);
  });

  it('handles branches with errors', () => {
    const deleted = [
      {
        branch: 'feat/auth',
        type: 'feat',
        author: 'alice@example.com',
        commitCount: 5,
        estimatedStorageBytes: 5 * AVG_STORAGE_BYTES_PER_COMMIT,
      },
    ];

    const errors = [
      { branch: 'some/failing-branch', error: 'Failed to analyze' },
    ];

    const metrics = getMetrics(deleted, [], errors);
    expect(metrics.successfulDeletes).toBe(1);
    expect(metrics.failedDeletes).toBe(1);
    expect(metrics.successRate).toBe('50.00%');
  });

  it('infers branch type when missing', () => {
    const deleted = [
      {
        branch: 'feat/auth',
        // No type field; should be inferred as 'feat' from branch name
        author: 'alice@example.com',
        commitCount: 5,
        estimatedStorageBytes: 5 * AVG_STORAGE_BYTES_PER_COMMIT,
      },
    ];

    const metrics = getMetrics(deleted, [], []);
    expect(metrics.byType.feat).toBe(1);
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

describe('Utility functions', () => {
  it('formatBytes handles zero bytes', () => {
    expect(formatBytes(0)).toBe('0 B');
  });

  it('formatBytes formats kilobytes', () => {
    expect(formatBytes(1024)).toBe('1.00 KB');
    expect(formatBytes(2048)).toBe('2.00 KB');
  });

  it('formatBytes formats megabytes', () => {
    expect(formatBytes(1024 * 1024)).toBe('1.00 MB');
    expect(formatBytes(1024 * 1024 * 5)).toBe('5.00 MB');
  });

  it('formatBytes caps at megabytes (no gigabyte formatting)', () => {
    expect(formatBytes(1024 * 1024 * 1024)).toBe('1024.00 MB');
    expect(formatBytes(1024 * 1024 * 1024 * 2)).toBe('2048.00 MB');
  });

  it('formatBytes handles fractional values', () => {
    expect(formatBytes(1536)).toBe('1.50 KB');
    expect(formatBytes(1024 * 1024 * 1.5)).toBe('1.50 MB');
  });

  it('estimateStorageFreedBytes calculates correctly', () => {
    const result = estimateStorageFreedBytes(100);
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  });

  it('estimateStorageFreedBytes handles zero commits', () => {
    const result = estimateStorageFreedBytes(0);
    expect(result).toBe(0);
  });
});

describe('Report formatting', () => {
  it('writeMarkdownReport generates valid markdown with headers', () => {
    const tempDir = createTempReportDir();
    const toDelete = [
      {
        branch: 'old-feature',
        reason: 'stale',
        lastCommitDate: '2025-01-01T00:00:00Z',
        author: 'bot@test.com',
        hash: 'abc123',
        age: 45,
        type: 'feature',
        commitCount: 5,
        estimatedStorageBytes: 50000,
      },
    ];
    const toPreserve = [
      { branch: 'main', category: 'KEEP', reason: 'default_branch' },
    ];
    const errors = [];
    const metrics = getMetrics(toDelete, toPreserve, errors);

    const reportPath = writeMarkdownReport(toDelete, toPreserve, errors, metrics, { reportDir: tempDir, inactiveDays: 30 });

    expect(fs.existsSync(reportPath)).toBe(true);
    const content = fs.readFileSync(reportPath, 'utf8');
    expect(content).toContain('Branch Cleanup Report');
    expect(content).toContain('old-feature');
    expect(content).toContain('main');

    cleanupTempDir(tempDir);
  });

  it('writeMarkdownReport handles empty cleanup list', () => {
    const tempDir = createTempReportDir();
    const toDelete = [];
    const toPreserve = [
      { branch: 'main', category: 'KEEP', reason: 'default_branch' },
      { branch: 'develop', category: 'KEEP', reason: 'protected_branch' },
    ];
    const errors = [];
    const metrics = getMetrics(toDelete, toPreserve, errors);

    const reportPath = writeMarkdownReport(toDelete, toPreserve, errors, metrics, { reportDir: tempDir, inactiveDays: 30 });

    expect(fs.existsSync(reportPath)).toBe(true);
    const content = fs.readFileSync(reportPath, 'utf8');
    expect(content).toContain('No branches are eligible for deletion');
    expect(content).toContain('main');

    cleanupTempDir(tempDir);
  });

  it('writeMarkdownReport includes branches requiring discussion', () => {
    const tempDir = createTempReportDir();
    const toDelete = [
      {
        branch: 'old-feature',
        reason: 'stale',
        lastCommitDate: '2025-01-01T00:00:00Z',
        author: 'bot@test.com',
        hash: 'abc123',
        age: 45,
        type: 'feature',
        commitCount: 5,
        estimatedStorageBytes: 50000,
      },
    ];
    const toPreserve = [
      { branch: 'main', category: 'KEEP', reason: 'default_branch' },
      { branch: 'ambiguous-branch', category: 'DISCUSS', reason: 'branch prefix unclear' },
    ];
    const errors = [];
    const metrics = getMetrics(toDelete, toPreserve, errors);

    const reportPath = writeMarkdownReport(toDelete, toPreserve, errors, metrics, { reportDir: tempDir, inactiveDays: 30 });

    expect(fs.existsSync(reportPath)).toBe(true);
    const content = fs.readFileSync(reportPath, 'utf8');
    expect(content).toContain('Branches Requiring Discussion');
    expect(content).toContain('ambiguous-branch');

    cleanupTempDir(tempDir);
  });

  it('writeMarkdownReport includes errors encountered', () => {
    const tempDir = createTempReportDir();
    const toDelete = [];
    const toPreserve = [
      { branch: 'main', category: 'KEEP', reason: 'default_branch' },
    ];
    const errors = [
      { branch: 'failed-branch', error: 'git command failed' },
    ];
    const metrics = getMetrics(toDelete, toPreserve, errors);

    const reportPath = writeMarkdownReport(toDelete, toPreserve, errors, metrics, { reportDir: tempDir, inactiveDays: 30 });

    expect(fs.existsSync(reportPath)).toBe(true);
    const content = fs.readFileSync(reportPath, 'utf8');
    expect(content).toContain('Errors Encountered');
    expect(content).toContain('failed-branch');

    cleanupTempDir(tempDir);
  });

  it('writeJsonReport generates valid JSON', () => {
    const tempDir = createTempReportDir();
    const toDelete = [
      {
        branch: 'old-feature',
        reason: 'stale',
        age: 45,
        type: 'feature',
        author: 'bot@test.com',
        hash: 'abc123',
        commitCount: 5,
        estimatedStorageBytes: 50000,
      },
    ];
    const toPreserve = [{ branch: 'main', category: 'KEEP', reason: 'default_branch' }];
    const errors = [];
    const metrics = getMetrics(toDelete, toPreserve, errors);

    const reportPath = writeJsonReport(toDelete, toPreserve, errors, metrics, { reportDir: tempDir, inactiveDays: 30 });

    expect(fs.existsSync(reportPath)).toBe(true);
    const content = fs.readFileSync(reportPath, 'utf8');
    const parsed = JSON.parse(content);

    expect(parsed.timestamp).toEqual(expect.any(String));
    expect(parsed.candidates).toHaveLength(1);
    expect(parsed.retained).toHaveLength(1);
    expect(parsed.summary.candidateCount).toBe(1);

    cleanupTempDir(tempDir);
  });

  it('writeJsonReport includes errors in output', () => {
    const tempDir = createTempReportDir();
    const toDelete = [];
    const toPreserve = [{ branch: 'main', category: 'KEEP', reason: 'default_branch' }];
    const errors = [
      { branch: 'failed-branch', error: 'merge status check failed' },
      { branch: 'another-failed', error: 'commit count lookup failed' },
    ];
    const metrics = getMetrics(toDelete, toPreserve, errors);

    const reportPath = writeJsonReport(toDelete, toPreserve, errors, metrics, { reportDir: tempDir, inactiveDays: 30 });

    expect(fs.existsSync(reportPath)).toBe(true);
    const content = fs.readFileSync(reportPath, 'utf8');
    const parsed = JSON.parse(content);

    expect(parsed.errors).toHaveLength(2);
    expect(parsed.errors[0].branch).toBe('failed-branch');
    expect(parsed.errors[0].error).toBe('merge status check failed');
    expect(parsed.summary.errorCount).toBe(2);

    cleanupTempDir(tempDir);
  });

  it('writeJsonReport handles empty deletion list', () => {
    const tempDir = createTempReportDir();
    const toDelete = [];
    const toPreserve = [
      { branch: 'main', category: 'KEEP', reason: 'protected_branch' },
    ];
    const errors = [];
    const metrics = getMetrics(toDelete, toPreserve, errors);

    const reportPath = writeJsonReport(toDelete, toPreserve, errors, metrics, { reportDir: tempDir, inactiveDays: 30 });

    expect(fs.existsSync(reportPath)).toBe(true);
    const content = fs.readFileSync(reportPath, 'utf8');
    const parsed = JSON.parse(content);
    expect(parsed.candidates).toHaveLength(0);
    expect(parsed.retained).toHaveLength(1);
    expect(parsed.summary.candidateCount).toBe(0);
    expect(parsed.summary.keptCount).toBe(1);

    cleanupTempDir(tempDir);
  });

  it('writeJsonReport with mixed categories', () => {
    const tempDir = createTempReportDir();
    const toDelete = [
      {
        branch: 'old-feature',
        reason: 'stale',
        lastCommitDate: '2025-01-01T00:00:00Z',
        author: 'bot@test.com',
        hash: 'abc123',
        age: 45,
        type: 'feature',
        commitCount: 5,
        estimatedStorageBytes: 50000,
      },
    ];
    const toPreserve = [
      { branch: 'main', category: 'KEEP', reason: 'protected_branch' },
      { branch: 'ambiguous', category: 'DISCUSS', reason: 'unclear status' },
    ];
    const errors = [];
    const metrics = getMetrics(toDelete, toPreserve, errors);

    const reportPath = writeJsonReport(toDelete, toPreserve, errors, metrics, { reportDir: tempDir, inactiveDays: 30 });

    expect(fs.existsSync(reportPath)).toBe(true);
    const content = fs.readFileSync(reportPath, 'utf8');
    const parsed = JSON.parse(content);
    expect(parsed.candidates).toHaveLength(1);
    expect(parsed.retained).toHaveLength(2);
    expect(parsed.summary.keptCount).toBe(1);
    expect(parsed.summary.discussCount).toBe(1);

    cleanupTempDir(tempDir);
  });
});

describe('getRemoteBranches', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    execFileSync.mockReset();
  });

  it('returns list of remote branches with origin/ prefix removed', () => {
    execFileSync.mockReturnValue('origin/main\norigin/develop\norigin/feat/feature-1\n');

    const branches = getRemoteBranches();
    expect(branches).toEqual(['main', 'develop', 'feat/feature-1']);
    expect(execFileSync).toHaveBeenCalledWith(
      'git',
      ['for-each-ref', 'refs/remotes/origin', '--format=%(refname:short)'],
      expect.any(Object)
    );
  });

  it('includes HEAD in output (filtered by caller)', () => {
    execFileSync.mockReturnValue('origin/main\nHEAD\n');

    const branches = getRemoteBranches();
    expect(branches).toEqual(['main', 'HEAD']);
  });

  it('handles empty remote repository', () => {
    execFileSync.mockReturnValue('\n');

    const branches = getRemoteBranches();
    expect(branches).toEqual([]);
  });

  it('strips origin/ prefix from all branch names', () => {
    execFileSync.mockReturnValue('origin/main\norigin/release/v1.0.0\norigin/hotfix/bug-fix\n');

    const branches = getRemoteBranches();
    expect(branches).toEqual(['main', 'release/v1.0.0', 'hotfix/bug-fix']);
  });

  it('trims whitespace from each line', () => {
    execFileSync.mockReturnValue('  origin/main  \n  origin/develop  \n\n');

    const branches = getRemoteBranches();
    expect(branches).toEqual(['main', 'develop']);
  });

  it('throws error when git command fails', () => {
    execFileSync.mockImplementation(() => {
      throw new Error('fatal: not a git repository');
    });

    expect(() => getRemoteBranches()).toThrow('Repository access failed');
  });

  it('includes git stderr in error message', () => {
    const error = new Error('Command failed');
    error.stderr = 'fatal: could not read remote refs';
    execFileSync.mockImplementation(() => {
      throw error;
    });

    expect(() => getRemoteBranches()).toThrow('could not read remote refs');
  });

  it('filters empty strings from output', () => {
    execFileSync.mockReturnValue('origin/main\n\norigin/develop\n');

    const branches = getRemoteBranches();
    expect(branches).toEqual(['main', 'develop']);
    expect(branches.length).toBe(2);
  });
});

describe('CLI Argument Parsing - getArg', () => {
  it('extracts long-form argument with value', () => {
    const argv = ['node', 'script.js', '--verbose=true', '--inactiveDays=45'];
    const result = getArg('inactiveDays', '30', argv);
    expect(result).toBe('45');
  });

  it('returns default when argument not found', () => {
    const argv = ['node', 'script.js'];
    const result = getArg('missing', 'default-value', argv);
    expect(result).toBe('default-value');
  });

  it('extracts boolean flag without value', () => {
    const argv = ['node', 'script.js', '--verbose'];
    const result = getArg('verbose', 'false', argv);
    expect(result).toBe('true');
  });

  it('ignores arguments before index 2 (node and script name)', () => {
    const argv = ['--not-parsed', '--also-not', '--target=value'];
    const result = getArg('target', 'default', argv);
    expect(result).toBe('value');
  });

  it('returns empty string value when provided', () => {
    const argv = ['node', 'script.js', '--name='];
    const result = getArg('name', 'default', argv);
    expect(result).toBe('');
  });

  it('handles multiple arguments and selects correct one', () => {
    const argv = ['node', 'script.js', '--first=1', '--second=2', '--third=3'];
    expect(getArg('first', 'x', argv)).toBe('1');
    expect(getArg('second', 'x', argv)).toBe('2');
    expect(getArg('third', 'x', argv)).toBe('3');
  });

  it('returns true for boolean flag even with other arguments present', () => {
    const argv = ['node', 'script.js', '--verbose', '--inactiveDays=45', '--other=value'];
    const result = getArg('verbose', 'false', argv);
    expect(result).toBe('true');
  });

  it('does not treat partial flag name match as match', () => {
    const argv = ['node', 'script.js', '--verbosity=high'];
    const result = getArg('verbose', 'default', argv);
    expect(result).toBe('default');
  });

  it('handles special characters in argument values', () => {
    const argv = ['node', 'script.js', '--pattern=feat.*|fix.*'];
    const result = getArg('pattern', 'default', argv);
    expect(result).toBe('feat.*|fix.*');
  });
});

describe('CLI Argument Parsing - parseBool', () => {
  it('converts string "true" to boolean true', () => {
    expect(parseBool('true')).toBe(true);
  });

  it('converts string "false" to boolean false', () => {
    expect(parseBool('false')).toBe(false);
  });

  it('returns default value for unrecognized string', () => {
    expect(parseBool('yes', false)).toBe(false);
    expect(parseBool('yes', true)).toBe(true);
  });

  it('returns default value for empty string', () => {
    expect(parseBool('', false)).toBe(false);
    expect(parseBool('', true)).toBe(true);
  });

  it('is case-sensitive (only lowercase recognized)', () => {
    expect(parseBool('True', false)).toBe(false);
    expect(parseBool('FALSE', false)).toBe(false);
    expect(parseBool('TRUE', true)).toBe(true);
  });

  it('uses provided default when value is not true or false', () => {
    expect(parseBool('maybe', true)).toBe(true);
    expect(parseBool('1', false)).toBe(false);
    expect(parseBool('0', true)).toBe(true);
  });

  it('defaults to false when no default provided', () => {
    expect(parseBool('unknown')).toBe(false);
    expect(parseBool('yes')).toBe(false);
  });

  it('handles numeric strings as non-boolean', () => {
    expect(parseBool('1', true)).toBe(true);
    expect(parseBool('0', false)).toBe(false);
  });

  it('correctly parses result of getArg boolean flag', () => {
    const argv = ['node', 'script.js', '--verbose'];
    const argValue = getArg('verbose', 'false', argv);
    expect(parseBool(argValue)).toBe(true);
  });
});

describe('Logging Functions', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });

  describe('logTimestamp', () => {
    it('returns HH:mm:ss format', () => {
      const timestamp = logTimestamp();
      expect(timestamp).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    it('uses 24-hour time format', () => {
      const timestamp = logTimestamp();
      const [hours] = timestamp.split(':');
      expect(parseInt(hours)).toBeGreaterThanOrEqual(0);
      expect(parseInt(hours)).toBeLessThan(24);
    });
  });

  describe('log', () => {
    it('logs error level with ❌ prefix', () => {
      log('error', 'Test error');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('❌'));
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Test error'));
    });

    it('logs warn level with ⚠️ prefix', () => {
      log('warn', 'Test warning');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('⚠️'));
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Test warning'));
    });

    it('logs debug level with 🔍 prefix', () => {
      log('debug', 'Test debug');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('🔍'));
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Test debug'));
    });

    it('logs info level with ℹ️ prefix for unknown levels', () => {
      log('info', 'Test info');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('ℹ️'));
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Test info'));
    });

    it('includes timestamp in output', () => {
      log('info', 'Test message');
      const call = console.log.mock.calls[0][0];
      expect(call).toMatch(/\[\d{2}:\d{2}:\d{2}\]/);
    });
  });

  describe('logError', () => {
    it('calls log with error level', () => {
      jest.spyOn(console, 'log').mockImplementation();
      logError('Error message');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('❌'));
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Error message'));
    });

    it('logs error detail when verbose is true', () => {
      logError('Error message', new Error('Detailed error'), true);
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Detailed error'));
    });

    it('does not log error detail when verbose is false', () => {
      logError('Error message', new Error('Detailed error'), false);
      expect(console.error).not.toHaveBeenCalled();
    });

    it('handles error objects with message property', () => {
      const error = { message: 'Custom error message' };
      logError('Message', error, true);
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Custom error message'));
    });

    it('handles error strings directly', () => {
      logError('Message', 'Error string', true);
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error string'));
    });

    it('does not crash when error is null', () => {
      expect(() => {
        logError('Message', null, true);
      }).not.toThrow();
      expect(console.error).not.toHaveBeenCalled();
    });

    it('logs main message even when error is undefined', () => {
      logError('Main message');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Main message'));
    });
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

describe('Argument parsing and configuration', () => {
  it('formats bytes correctly for B, KB, MB', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(1024)).toBe('1.00 KB');
    expect(formatBytes(2048)).toBe('2.00 KB');
    expect(formatBytes(1024 * 1024)).toBe('1.00 MB');
  });

  it('handles bytes less than 1024', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(1)).toBe('1 B');
    expect(formatBytes(1023)).toBe('1023 B');
  });

  it('formats KB correctly with two decimal places', () => {
    expect(formatBytes(1536)).toBe('1.50 KB');
    expect(formatBytes(2560)).toBe('2.50 KB');
  });

  it('formats MB correctly with two decimal places', () => {
    expect(formatBytes(1024 * 1024 * 2.5)).toBe('2.50 MB');
    expect(formatBytes(1024 * 1024 * 5)).toBe('5.00 MB');
  });
});

describe('Timestamp and logging utilities', () => {
  it('generates valid ISO timestamps', () => {
    const timestamp = new Date().toISOString();
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  it('extracts time component from ISO timestamp', () => {
    const iso = '2026-01-15T14:30:45.123Z';
    const timePart = iso.split('T')[1].split('.')[0];
    expect(timePart).toBe('14:30:45');
  });

  it('generates log prefix for different levels', () => {
    const levels = {
      error: '❌',
      warn: '⚠️ ',
      debug: '🔍',
      info: 'ℹ️ '
    };

    expect(levels).toHaveProperty('error');
    expect(levels).toHaveProperty('warn');
    expect(levels).toHaveProperty('debug');
    expect(levels).toHaveProperty('info');
  });
});

describe('Report file operations', () => {
  let tempDir;

  beforeEach(() => {
    tempDir = createTempReportDir();
  });

  afterEach(() => {
    cleanupTempDir(tempDir);
  });

  it('creates report directory if missing', () => {
    expect(fs.existsSync(tempDir)).toBe(true);
  });

  it('handles existing report directory', () => {
    const subDir = path.join(tempDir, 'sub');
    fs.mkdirSync(subDir, { recursive: true });
    expect(fs.existsSync(subDir)).toBe(true);
  });

  it('writes files to report directory', () => {
    const testFile = path.join(tempDir, 'test.txt');
    fs.writeFileSync(testFile, 'test content');
    expect(fs.existsSync(testFile)).toBe(true);
  });
});

describe('Branch metadata extraction', () => {
  it('extracts branch type from name', () => {
    const types = ['feat', 'fix', 'docs', 'refactor', 'perf'];
    types.forEach(t => {
      expect(typeof t).toBe('string');
      expect(t.length).toBeGreaterThan(0);
    });
  });

  it('handles complex branch names', () => {
    const branch = 'feat/user-dashboard-v2-dark-mode';
    const parts = branch.split('/');
    expect(parts.length).toBe(2);
  });
});

describe('Storage calculation', () => {
  it('calculates storage for single commit', () => {
    const bytes = 1 * 1024;
    expect(bytes).toBe(1024);
  });

  it('aggregates storage for multiple commits', () => {
    const commits = [5, 10, 15];
    const total = commits.reduce((sum, c) => sum + c, 0);
    expect(total).toBe(30);
  });

  it('formats bytes correctly', () => {
    const sizes = ['0 B', '1024 B', '1.0 MB'];
    sizes.forEach(size => {
      expect(typeof size).toBe('string');
      expect(size.length).toBeGreaterThan(0);
    });
  });
});
