/**
 * git-merge-utils.js — Git merge status and history utilities.
 * @module scripts/lib/git-merge-utils
 */

import * as cp from 'child_process';

/**
 * Run Git command and return trimmed stdout.
 * Git failures return empty string rather than throwing.
 *
 * @param {string[]} args - Git arguments
 * @returns {string} Git output or empty string
 */
function runGit(args) {
  try {
    return cp.execFileSync('git', args, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch {
    return '';
  }
}

/**
 * Get the default base branch for merge checks.
 * Prefer locally available origin/develop, then origin/main, then origin/master.
 * Return origin/main if none can be verified, including when Git fails.
 *
 * @returns {string} Base reference including the origin/ prefix
 */
export function getBaseRef() {
  const candidates = ['origin/develop', 'origin/main', 'origin/master'];
  for (const ref of candidates) {
    const check = runGit(['rev-parse', '--verify', ref]);
    if (check) {
      return ref;
    }
  }
  return 'origin/main';
}

/**
 * Determine merge status of a remote branch.
 * A branch is 'merged' when its tip is an ancestor of the base; equivalent
 * changes from squash or rebase merges are not detected. Git failures other
 * than the non-ancestor result return 'unknown' rather than throwing.
 *
 * @param {string} branch - Remote branch name (without 'origin/' prefix)
 * @param {string|null} [baseRef=null] - Base reference (e.g., 'origin/main');
 *   falsy values use getBaseRef()
 * @returns {string} 'merged' | 'unmerged' | 'unknown'
 */
export function getMergeStatus(branch, baseRef = null) {
  const base = baseRef || getBaseRef();
  try {
    // is-ancestor returns exit code 0 if first is ancestor of second (i.e., merged)
    const result = cp.spawnSync('git', ['merge-base', '--is-ancestor', `origin/${branch}`, base], {
      encoding: 'utf8',
    });
    if (result.status === 0) {
      return 'merged';
    }
    if (result.status === 1) {
      return 'unmerged';
    }
    return 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * Get the unique commit count on a branch compared to base.
 * Count commits reachable from the branch but not from the base. Git failures
 * or an unparseable count return 0.
 *
 * @param {string} branch - Remote branch name (without 'origin/' prefix)
 * @param {string|null} [baseRef=null] - Base reference (e.g., 'origin/main');
 *   falsy values use getBaseRef()
 * @returns {number} Count of unique commits
 */
export function getUniqueCommitCount(branch, baseRef = null) {
  const base = baseRef || getBaseRef();
  const output = runGit(['rev-list', '--count', `${base}..origin/${branch}`]);
  const count = parseInt(output, 10);
  return isNaN(count) ? 0 : count;
}

/**
 * Get the last commit's committer date (ISO 8601) for a remote branch.
 *
 * @param {string} branch - Remote branch name (without 'origin/' prefix)
 * @returns {string} ISO 8601 date or empty string
 */
export function getLastCommitDate(branch) {
  return runGit(['log', '-1', '--format=%cI', `origin/${branch}`]);
}

/**
 * Get the last commit author email for a remote branch.
 *
 * @param {string} branch - Remote branch name (without 'origin/' prefix)
 * @returns {string} Author email or empty string
 */
export function getLastCommitAuthor(branch) {
  return runGit(['log', '-1', '--format=%ae', `origin/${branch}`]);
}

/**
 * Get the last commit hash for a remote branch.
 *
 * @param {string} branch - Remote branch name (without 'origin/' prefix)
 * @returns {string} Commit hash or empty string
 */
export function getLastCommitHash(branch) {
  return runGit(['log', '-1', '--format=%H', `origin/${branch}`]);
}
