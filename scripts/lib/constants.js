/**
 * constants.js — Reason codes and constants for branch cleanup.
 * @module scripts/lib/constants
 */

export const REASON_CODES = {
  KEEP: {
    protected_branch: 'Protected branch (main/develop)',
    excluded_pattern: 'Excluded by configuration',
    open_pr: 'Has open pull request',
    not_merged: 'Not fully merged to base branch',
    recent: 'Recent activity (under threshold)',
    dependabot: 'Dependabot/Renovate branch',
    author_preserved: 'Author preservation rule',
  },
  DISCUSS: {
    pr_verification_unavailable: 'PR verification unavailable; cannot confirm status',
    merge_status_unknown: 'Merge status could not be determined',
  },
  DELETE: {
    merged_stale: 'Fully merged and inactive',
  },
};

export const PROTECTED_BRANCHES = ['main', 'develop', 'production'];

export const DEFAULT_INACTIVITY_DAYS = 30;

export const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const AVG_STORAGE_BYTES_PER_COMMIT = 4096;
