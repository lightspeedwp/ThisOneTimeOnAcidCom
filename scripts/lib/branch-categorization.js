/**
 * branch-categorization.js — Branch classification logic for cleanup decisions.
 * @module scripts/lib/branch-categorization
 */

import { REASON_CODES, PROTECTED_BRANCHES, MS_PER_DAY } from './constants.js';

/**
 * Extract the branch type from branch name (prefix before first slash).
 * Branches without a slash get type 'other'.
 * @param {string} branch - Branch name
 * @returns {string} Branch type
 */
export function getBranchType(branch) {
  if (branch.includes('/')) {
    return branch.split('/')[0];
  }
  return 'other';
}

/**
 * Calculate days since ISO date string.
 * Invalid dates return 0.
 * @param {string} isoDate - ISO 8601 date string
 * @returns {number} Days elapsed
 */
export function daysSince(isoDate) {
  if (!isoDate) return 0;
  const then = new Date(isoDate);
  if (isNaN(then.getTime())) return 0;
  return (Date.now() - then.getTime()) / MS_PER_DAY;
}

/**
 * Classify a branch as KEEP or DELETE based on merge status,
 * open PRs, exclusion patterns and inactivity threshold.
 *
 * Returns object with:
 * - category: 'KEEP' | 'DELETE' | 'DISCUSS'
 * - reason: Human-readable explanation
 * - metadata: age, author, lastCommitDate, type
 * - autoApproved: whether deletion can happen automatically (for DISCUSS/DELETE)
 *
 * @param {string} branch - Branch name
 * @param {object} metadata - Branch metadata
 * @param {string} metadata.author - Commit author email
 * @param {string} metadata.lastCommitDate - ISO 8601 date of last commit
 * @param {string} metadata.mergeStatus - 'merged' | 'unmerged' | 'unknown'
 * @param {Set<string>} openPRBranches - Set of branch names with open PRs
 * @param {RegExp} excludeRegex - Pattern for branches to preserve
 * @param {number} inactiveDays - Inactivity threshold
 * @returns {object} Classification result
 */
export function categorizeBranch(
  branch,
  metadata = {},
  openPRBranches = new Set(),
  excludeRegex = null,
  inactiveDays = 30
) {
  const { author = '', lastCommitDate = '', mergeStatus = 'unknown' } = metadata;

  // Protected branches are never deleted
  if (PROTECTED_BRANCHES.includes(branch)) {
    return {
      category: 'KEEP',
      reason: REASON_CODES.KEEP.protected_branch,
      metadata: {
        lastCommitDate,
        author,
        ageInDays: daysSince(lastCommitDate),
        type: getBranchType(branch),
      },
      autoApproved: false,
    };
  }

  // Excluded branches are never deleted
  if (excludeRegex && excludeRegex.test(branch)) {
    return {
      category: 'KEEP',
      reason: REASON_CODES.KEEP.excluded_pattern,
      metadata: {
        lastCommitDate,
        author,
        ageInDays: daysSince(lastCommitDate),
        type: getBranchType(branch),
      },
      autoApproved: false,
    };
  }

  // Dependabot/Renovate branches are preserved
  if (branch.startsWith('dependabot/') || branch.startsWith('renovate/')) {
    return {
      category: 'KEEP',
      reason: REASON_CODES.KEEP.dependabot,
      metadata: {
        lastCommitDate,
        author,
        ageInDays: daysSince(lastCommitDate),
        type: getBranchType(branch),
      },
      autoApproved: false,
    };
  }

  // Branches with open PRs are never deleted
  if (openPRBranches.has(branch)) {
    return {
      category: 'KEEP',
      reason: REASON_CODES.KEEP.open_pr,
      metadata: {
        lastCommitDate,
        author,
        ageInDays: daysSince(lastCommitDate),
        type: getBranchType(branch),
      },
      autoApproved: false,
    };
  }

  const ageInDays = daysSince(lastCommitDate);

  // Unmerged branches are preserved
  if (mergeStatus === 'unmerged') {
    return {
      category: 'KEEP',
      reason: REASON_CODES.KEEP.not_merged,
      metadata: {
        lastCommitDate,
        author,
        ageInDays,
        type: getBranchType(branch),
      },
      autoApproved: false,
    };
  }

  // If merge status is unknown, fail closed to DISCUSS
  if (mergeStatus === 'unknown') {
    return {
      category: 'DISCUSS',
      reason: REASON_CODES.DISCUSS.merge_status_unknown,
      metadata: {
        lastCommitDate,
        author,
        ageInDays,
        type: getBranchType(branch),
      },
      autoApproved: false,
    };
  }

  // Recent merged branches are preserved
  if (mergeStatus === 'merged' && ageInDays < inactiveDays) {
    return {
      category: 'KEEP',
      reason: REASON_CODES.KEEP.recent,
      metadata: {
        lastCommitDate,
        author,
        ageInDays,
        type: getBranchType(branch),
      },
      autoApproved: false,
    };
  }

  // Merged and stale = DELETE
  if (mergeStatus === 'merged' && ageInDays >= inactiveDays) {
    return {
      category: 'DELETE',
      reason: REASON_CODES.DELETE.merged_stale,
      metadata: {
        lastCommitDate,
        author,
        ageInDays,
        type: getBranchType(branch),
      },
      autoApproved: false,
    };
  }

  // Default to KEEP for unclassified
  return {
    category: 'KEEP',
    reason: 'Unable to classify',
    metadata: {
      lastCommitDate,
      author,
      ageInDays,
      type: getBranchType(branch),
    },
    autoApproved: false,
  };
}
