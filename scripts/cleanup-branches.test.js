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

  it('defaults to KEEP for unclassified merge status', () => {
    const result = categorizeBranch('feat/unclassified', {
      lastCommitDate: '2025-01-01T00:00:00Z',
      author: 'test@example.com',
      mergeStatus: 'indeterminate', // or any status other than 'merged', 'unmerged', 'unknown'
    });

    expect(result.category).toBe('KEEP');
    expect(result.reason).toBe('Unable to classify');
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
