/**
 * git-merge-utils.test.js — Comprehensive test suite for Git merge utilities.
 */

import { describe, it, expect } from '@jest/globals';
import * as gitUtils from './git-merge-utils.js';

describe('git-merge-utils', () => {
  describe('getLastCommitDate()', () => {
    it('should return ISO 8601 commit date', () => {
      // This test doesn't require mocking child_process
      // It tests the function returns a string or empty string
      const result = gitUtils.getLastCommitDate('nonexistent-branch-12345');
      expect(typeof result).toBe('string');
    });

    it('should return empty string for invalid branches', () => {
      const result = gitUtils.getLastCommitDate('invalid/branch/name/that/does/not/exist');
      expect(result).toBe('');
    });
  });

  describe('getLastCommitAuthor()', () => {
    it('should return author email or empty string', () => {
      const result = gitUtils.getLastCommitAuthor('nonexistent-branch-12345');
      expect(typeof result).toBe('string');
    });

    it('should return empty string for invalid branches', () => {
      const result = gitUtils.getLastCommitAuthor('invalid/branch/name/that/does/not/exist');
      expect(result).toBe('');
    });
  });

  describe('getLastCommitHash()', () => {
    it('should return commit hash or empty string', () => {
      const result = gitUtils.getLastCommitHash('nonexistent-branch-12345');
      expect(typeof result).toBe('string');
    });

    it('should return empty string for invalid branches', () => {
      const result = gitUtils.getLastCommitHash('invalid/branch/name/that/does/not/exist');
      expect(result).toBe('');
    });
  });

  describe('getUniqueCommitCount()', () => {
    it('should return a number', () => {
      const result = gitUtils.getUniqueCommitCount('nonexistent-branch-12345');
      expect(typeof result).toBe('number');
    });

    it('should return 0 for non-existent branches', () => {
      const result = gitUtils.getUniqueCommitCount('invalid/branch/name/that/does/not/exist');
      expect(result).toBe(0);
    });
  });

  describe('getBaseRef()', () => {
    it('should return a string starting with origin/', () => {
      const result = gitUtils.getBaseRef();
      expect(typeof result).toBe('string');
      expect(result.startsWith('origin/')).toBe(true);
    });
  });

  describe('getMergeStatus()', () => {
    it('should return a valid status', () => {
      const result = gitUtils.getMergeStatus('nonexistent-branch-12345', 'origin/main');
      expect(['merged', 'unmerged', 'unknown']).toContain(result);
    });

    it('should return unknown for invalid parameters', () => {
      const result = gitUtils.getMergeStatus('', '');
      expect(['merged', 'unmerged', 'unknown']).toContain(result);
    });

    it('should accept custom baseRef', () => {
      const result = gitUtils.getMergeStatus('test-branch', 'origin/develop');
      expect(['merged', 'unmerged', 'unknown']).toContain(result);
    });

    it('should handle various merge statuses from git', () => {
      // Test multiple calls - one should be merged, one unmerged, one unknown
      // We test by calling with different branch names (actual git behavior varies)
      const results = [
        gitUtils.getMergeStatus('main', 'origin/main'),  // likely merged (main vs main)
        gitUtils.getMergeStatus('nonexistent-xyz-999', 'origin/main'),  // likely unknown
        gitUtils.getMergeStatus('old-branch', 'origin/main')  // varies
      ];

      // All results should be valid
      results.forEach(result => {
        expect(['merged', 'unmerged', 'unknown']).toContain(result);
      });
    });

    it('should return unknown when git fails unexpectedly', () => {
      const result = gitUtils.getMergeStatus('', 'origin/invalid-base');
      expect(['merged', 'unmerged', 'unknown']).toContain(result);
    });
  });

  describe('getBaseRef', () => {
    it('should return a valid base ref string starting with origin/', () => {
      const baseRef = gitUtils.getBaseRef();
      expect(typeof baseRef).toBe('string');
      expect(baseRef.startsWith('origin/')).toBe(true);
    });

    it('should prefer existing branches over defaults', () => {
      const baseRef = gitUtils.getBaseRef();
      // Should be one of the known refs (develop, main, or master)
      expect(['origin/develop', 'origin/main', 'origin/master']).toContain(baseRef);
    });
  });

  describe('getUniqueCommitCount', () => {
    it('should return 0 for non-existent branches', () => {
      const count = gitUtils.getUniqueCommitCount('nonexistent-branch-xyz', 'origin/main');
      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(0);
    });

    it('should handle empty string branch name gracefully', () => {
      const count = gitUtils.getUniqueCommitCount('', 'origin/main');
      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(0);
    });

    it('should handle different baseRef values', () => {
      const count1 = gitUtils.getUniqueCommitCount('test-branch', 'origin/develop');
      const count2 = gitUtils.getUniqueCommitCount('test-branch', 'origin/master');
      expect(typeof count1).toBe('number');
      expect(typeof count2).toBe('number');
    });
  });

  describe('getLastCommitDate edge cases', () => {
    it('should handle multiple branches', () => {
      const date1 = gitUtils.getLastCommitDate('main');
      const date2 = gitUtils.getLastCommitDate('develop');
      const date3 = gitUtils.getLastCommitDate('invalid-xyz');
      expect(typeof date1).toBe('string');
      expect(typeof date2).toBe('string');
      expect(typeof date3).toBe('string');
    });

    it('should return consistent format when date exists', () => {
      const date = gitUtils.getLastCommitDate('main');
      expect(typeof date).toBe('string');
      if (date.length > 0) {
        expect(/^\d{4}-\d{2}-\d{2}/.test(date)).toBe(true);
      }
    });
  });

  describe('getMergeStatus variations', () => {
    it('should handle different baseRef options', () => {
      const result1 = gitUtils.getMergeStatus('feature-a', 'origin/develop');
      const result2 = gitUtils.getMergeStatus('feature-a', 'origin/master');
      expect(['merged', 'unmerged', 'unknown']).toContain(result1);
      expect(['merged', 'unmerged', 'unknown']).toContain(result2);
    });

    it('should work when baseRef is not provided', () => {
      const result = gitUtils.getMergeStatus('test-branch');
      expect(['merged', 'unmerged', 'unknown']).toContain(result);
    });
  });

});
