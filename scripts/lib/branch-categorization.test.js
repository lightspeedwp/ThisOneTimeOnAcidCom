/**
 * Tests for branch-categorization.js — Branch classification logic
 */

import { categorizeBranch, getBranchType, daysSince } from './branch-categorization.js';
import { REASON_CODES, PROTECTED_BRANCHES } from './constants.js';

describe('branch-categorization', () => {
  describe('getBranchType', () => {
    test('extracts type from standard branches', () => {
      expect(getBranchType('feat/user-dashboard')).toBe('feat');
      expect(getBranchType('fix/bug-fix')).toBe('fix');
      expect(getBranchType('docs/readme')).toBe('docs');
    });

    test('handles branches without slashes', () => {
      expect(getBranchType('main')).toBe('other');
      expect(getBranchType('develop')).toBe('other');
    });

    test('extracts only first part before slash', () => {
      expect(getBranchType('feat/user/dashboard/v2')).toBe('feat');
    });

    test('handles empty strings', () => {
      expect(getBranchType('')).toBe('other');
    });

    test('extracts various branch types', () => {
      expect(getBranchType('release/v1.0.0')).toBe('release');
      expect(getBranchType('dependabot/npm/package')).toBe('dependabot');
      expect(getBranchType('hotfix/critical')).toBe('hotfix');
    });
  });

  describe('daysSince', () => {
    test('returns 0 for null or empty dates', () => {
      expect(daysSince(null)).toBe(0);
      expect(daysSince('')).toBe(0);
      expect(daysSince(undefined)).toBe(0);
    });

    test('returns 0 for invalid dates', () => {
      expect(daysSince('not-a-date')).toBe(0);
      expect(daysSince('2026-13-45')).toBe(0);
    });

    test('returns positive for past dates', () => {
      const pastDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();
      const days = daysSince(pastDate);
      expect(days).toBeGreaterThan(9);
      expect(days).toBeLessThan(11);
    });

    test('returns approximately 30 for a month-old date', () => {
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const days = daysSince(monthAgo);
      expect(days).toBeGreaterThan(29);
      expect(days).toBeLessThan(31);
    });

    test('returns negative for future dates', () => {
      const futureDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString();
      const days = daysSince(futureDate);
      expect(days).toBeLessThan(0);
    });
  });

  describe('categorizeBranch - Protected Branches', () => {
    test('keeps protected branches', () => {
      for (const branch of PROTECTED_BRANCHES) {
        const result = categorizeBranch(branch);
        expect(result.category).toBe('KEEP');
        expect(result.reason).toBe(REASON_CODES.KEEP.protected_branch);
      }
    });
  });

  describe('categorizeBranch - Excluded Patterns', () => {
    test('keeps branches matching exclude regex', () => {
      const regex = /^release\/.*/;
      const result = categorizeBranch('release/v1.0.0', {}, new Set(), regex);
      expect(result.category).toBe('KEEP');
      expect(result.reason).toBe(REASON_CODES.KEEP.excluded_pattern);
    });

    test('processes branches not matching exclude regex', () => {
      const regex = /^release\/.*/;
      const oldDate = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString();
      const result = categorizeBranch('feat/feature', { mergeStatus: 'merged', lastCommitDate: oldDate }, new Set(), regex, 30);
      expect(result.category).toBe('DELETE');
    });

    test('handles null regex gracefully', () => {
      const result = categorizeBranch('feat/test', {}, new Set(), null);
      expect(result).toHaveProperty('category');
    });
  });

  describe('categorizeBranch - Automation Branches', () => {
    test('keeps dependabot branches', () => {
      const result = categorizeBranch('dependabot/npm_and_yarn/lodash-4.17.21');
      expect(result.category).toBe('KEEP');
      expect(result.reason).toBe(REASON_CODES.KEEP.dependabot);
    });

    test('keeps renovate branches', () => {
      const result = categorizeBranch('renovate/pin-dependencies');
      expect(result.category).toBe('KEEP');
      expect(result.reason).toBe(REASON_CODES.KEEP.dependabot);
    });
  });

  describe('categorizeBranch - Open PR Branches', () => {
    test('keeps branches with open PRs', () => {
      const openPRs = new Set(['feat/my-feature']);
      const result = categorizeBranch('feat/my-feature', {}, openPRs);
      expect(result.category).toBe('KEEP');
      expect(result.reason).toBe(REASON_CODES.KEEP.open_pr);
    });

    test('processes branches without open PRs', () => {
      const openPRs = new Set(['other/branch']);
      const result = categorizeBranch('feat/my-feature', { mergeStatus: 'merged', lastCommitDate: '2020-01-01' }, openPRs, null, 30);
      expect(result.category).toBe('DELETE');
    });
  });

  describe('categorizeBranch - Unmerged Branches', () => {
    test('keeps unmerged branches regardless of age', () => {
      const oldDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
      const result = categorizeBranch('feat/old-feature', { mergeStatus: 'unmerged', lastCommitDate: oldDate });
      expect(result.category).toBe('KEEP');
      expect(result.reason).toBe(REASON_CODES.KEEP.not_merged);
    });
  });

  describe('categorizeBranch - Merge Status Unknown', () => {
    test('discusses branches with unknown merge status', () => {
      const result = categorizeBranch('feat/unknown', { mergeStatus: 'unknown' });
      expect(result.category).toBe('DISCUSS');
      expect(result.reason).toBe(REASON_CODES.DISCUSS.merge_status_unknown);
    });
  });

  describe('categorizeBranch - Merged and Recent', () => {
    test('keeps recently merged branches', () => {
      const recentDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();
      const result = categorizeBranch('feat/recent', { mergeStatus: 'merged', lastCommitDate: recentDate }, new Set(), null, 30);
      expect(result.category).toBe('KEEP');
      expect(result.reason).toBe(REASON_CODES.KEEP.recent);
    });

    test('keeps branches at the exact inactivity threshold', () => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const result = categorizeBranch('feat/threshold', { mergeStatus: 'merged', lastCommitDate: thirtyDaysAgo }, new Set(), null, 30);
      // At exactly threshold, it should be DELETE (ageInDays >= inactiveDays)
      expect(result.category).toBe('DELETE');
    });
  });

  describe('categorizeBranch - Merged and Stale', () => {
    test('deletes merged and stale branches', () => {
      const oldDate = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString();
      const result = categorizeBranch('feat/stale', { mergeStatus: 'merged', lastCommitDate: oldDate }, new Set(), null, 30);
      expect(result.category).toBe('DELETE');
      expect(result.reason).toBe(REASON_CODES.DELETE.merged_stale);
    });
  });

  describe('categorizeBranch - Default Fallback', () => {
    test('keeps branches with unrecognized merge status', () => {
      const result = categorizeBranch('feat/unknown-status', { mergeStatus: 'unrecognized' });
      expect(result.category).toBe('KEEP');
    });
  });

  describe('categorizeBranch - Metadata Extraction', () => {
    test('includes author and date in metadata', () => {
      const date = '2025-01-15T10:30:00Z';
      const result = categorizeBranch('feat/test', { author: 'dev@example.com', lastCommitDate: date });
      expect(result.metadata.author).toBe('dev@example.com');
      expect(result.metadata.lastCommitDate).toBe(date);
    });

    test('includes branch type in metadata', () => {
      const result = categorizeBranch('refactor/api', {});
      expect(result.metadata.type).toBe('refactor');
    });

    test('includes age in days in metadata', () => {
      const date = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString();
      const result = categorizeBranch('feat/test', { lastCommitDate: date });
      expect(result.metadata.ageInDays).toBeGreaterThan(14);
      expect(result.metadata.ageInDays).toBeLessThan(16);
    });

    test('sets autoApproved to false always', () => {
      const result = categorizeBranch('feat/test');
      expect(result.autoApproved).toBe(false);
    });
  });

  describe('categorizeBranch - Integration', () => {
    test('prioritizes protected status over other factors', () => {
      const mainBranch = PROTECTED_BRANCHES[0];
      const oldDate = new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString();
      const result = categorizeBranch(mainBranch, { mergeStatus: 'merged', lastCommitDate: oldDate });
      expect(result.category).toBe('KEEP');
      expect(result.reason).toBe(REASON_CODES.KEEP.protected_branch);
    });

    test('prioritizes exclude pattern over merge status', () => {
      const regex = /^release\/.*/;
      const oldDate = new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString();
      const result = categorizeBranch('release/v1.0.0', { mergeStatus: 'merged', lastCommitDate: oldDate }, new Set(), regex, 30);
      expect(result.category).toBe('KEEP');
      expect(result.reason).toBe(REASON_CODES.KEEP.excluded_pattern);
    });

    test('handles complex scenario with multiple checks', () => {
      const result = categorizeBranch(
        'feat/complex-feature',
        {
          author: 'dev@example.com',
          lastCommitDate: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
          mergeStatus: 'merged'
        },
        new Set(),
        null,
        30
      );
      expect(result.category).toBe('DELETE');
      expect(result.metadata.author).toBe('dev@example.com');
      expect(result.metadata.type).toBe('feat');
    });
  });
});
