#!/usr/bin/env node

/**
 * cleanup-branches.js — Report-only branch cleanup script.
 *
 * Identifies stale merged branches for review, producing Markdown and JSON reports
 * distinguishing retained branches, cleanup candidates and branches requiring discussion.
 * Report-only: never executes branch deletion commands.
 *
 * Usage:
 *   node scripts/cleanup-branches.js [options]
 *
 * Options:
 *   --verbose             Enable detailed logging (default: false)
 *   --inactiveDays=N      Inactivity threshold in days (default: 30)
 *   --excludePatterns=RE  Pipe-separated regex patterns to preserve (e.g., "release/.*|hotfix/.*")
 *   --reportFormat=TYPE   Output format: markdown or json (default: markdown)
 *   --reportDir=PATH      Directory to write report (default: .github/reports/branches)
 *
 * @module scripts/cleanup-branches
 */

import { execFileSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { categorizeBranch, getBranchType, daysSince } from './lib/branch-categorization.js';
import { REASON_CODES, DEFAULT_INACTIVITY_DAYS, AVG_STORAGE_BYTES_PER_COMMIT, MS_PER_DAY } from './lib/constants.js';
import { getBaseRef, getMergeStatus, getUniqueCommitCount, getLastCommitDate, getLastCommitAuthor, getLastCommitHash } from './lib/git-merge-utils.js';

// ============================================================================
// Logging
// ============================================================================

/**
 * Return the current UTC time as HH:mm:ss for log messages.
 */
function logTimestamp() {
  return new Date().toISOString().split('T')[1].split('.')[0];
}

/**
 * Write a timestamped message to stdout, using level to select the icon.
 */
function log(level, message) {
  const timestamp = logTimestamp();
  const prefix =
    level === 'error' ? '❌' : level === 'warn' ? '⚠️ ' : level === 'debug' ? '🔍' : 'ℹ️ ';
  console.log(`[${timestamp}] ${prefix} ${message}`);
}

/**
 * Write an error message to stdout and any supplied error detail to stderr
 * when verbose mode is enabled.
 */
function logError(message, error) {
  log('error', message);
  if (error && opts.verbose) {
    console.error(`    ${error.message || error}`);
  }
}

// ============================================================================
// CLI argument parsing
// ============================================================================

/**
 * Read the first matching --name=value or --name argument from the command line.
 * Return the value string, 'true' for a bare flag, or defaultValue if absent.
 */
function getArg(name, defaultValue) {
  const longFlag = `--${name}=`;
  const boolFlag = `--${name}`;
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith(longFlag)) {
      return arg.slice(longFlag.length);
    }
    if (arg === boolFlag) {
      return 'true';
    }
  }
  return defaultValue;
}

/**
 * Convert the exact strings 'true' and 'false' to booleans; use defaultValue
 * for any other input.
 */
function parseBool(value, defaultValue = false) {
  if (value === 'false') return false;
  if (value === 'true') return true;
  return defaultValue;
}

const opts = {
  verbose: parseBool(getArg('verbose', 'false'), false),
  inactiveDays: parseInt(getArg('inactiveDays', String(DEFAULT_INACTIVITY_DAYS)), 10),
  excludePatterns: getArg('excludePatterns', ''),
  reportFormat: getArg('reportFormat', 'markdown'),
  reportDir: getArg('reportDir', '.github/reports/branches'),
};

if (Number.isNaN(opts.inactiveDays) || opts.inactiveDays < 0) {
  logError('Invalid --inactiveDays value; defaulting to 30.');
  opts.inactiveDays = DEFAULT_INACTIVITY_DAYS;
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_EXCLUDE_PATTERN = /^(release\/|hotfix\/)/;

// ============================================================================
// Helpers
// ============================================================================

/**
 * Combine release/ and hotfix/ prefix exclusions with custom regex patterns.
 * Invalid combined regex syntax produces a warning and returns the defaults.
 *
 * @param {object} [options=opts] - Options, defaulting to the CLI configuration
 * @param {string} [options.excludePatterns] - Pipe-separated regex alternatives
 * @returns {RegExp} Pattern matching branch names to preserve
 */
function buildExcludeRegex(options = opts) {
  const parts = [DEFAULT_EXCLUDE_PATTERN.source];
  if (options.excludePatterns) {
    parts.push(
      ...options.excludePatterns
        .split('|')
        .map((p) => p.trim())
        .filter(Boolean)
    );
  }

  const source = `(${parts.join('|')})`;
  try {
    return new RegExp(source);
  } catch (err) {
    console.warn(`⚠️  Invalid --excludePatterns regex; falling back to defaults: ${err.message}`);
    return DEFAULT_EXCLUDE_PATTERN;
  }
}

/**
 * Format a ratio as a percentage with two decimal places; return '0.00%'
 * when the denominator is zero.
 */
function toPct(numerator, denominator) {
  if (denominator === 0) return '0.00%';
  return `${((numerator / denominator) * 100).toFixed(2)}%`;
}

/**
 * Format bytes using B, KB, or MB with 1024-based units. KB and MB values
 * have two decimal places; values at or above one MB remain in MB.
 */
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

/**
 * Estimate storage impact in bytes using 4096 bytes per commit.
 * This estimate does not measure space recoverable by deleting a branch.
 */
function estimateStorageFreedBytes(commitCount) {
  return commitCount * AVG_STORAGE_BYTES_PER_COMMIT;
}

/**
 * Aggregate report statistics without deleting branches.
 * successfulDeletes counts candidates, failedDeletes counts analysis errors,
 * and successRate is candidates / (candidates + errors), or '0.00%' if empty.
 *
 * @param {object[]} deleted - Candidates with branch, optional type and author,
 *   commitCount, and estimatedStorageBytes; missing counts contribute zero
 * @param {object[]} preserved - Retained branches, including DISCUSS entries
 * @param {object[]} errors - Branch analysis errors
 * @returns {object} Counts, percentage, retained-to-candidate ratio, candidates
 *   by type, commit and byte totals, formatted storage, and sorted unique authors
 */
function getMetrics(deleted, preserved, errors) {
  const byType = {};
  const authorSet = new Set();
  let totalCommits = 0;
  let estimatedStorageBytes = 0;

  for (const b of deleted) {
    const type = b.type || getBranchType(b.branch);
    byType[type] = (byType[type] || 0) + 1;
    if (b.author) authorSet.add(b.author);
    totalCommits += b.commitCount || 0;
    estimatedStorageBytes += b.estimatedStorageBytes || 0;
  }

  const successfulDeletes = deleted.length;
  const failedDeletes = errors.length;
  const successRate = toPct(successfulDeletes, successfulDeletes + failedDeletes);
  const preservedDeletedRatio = deleted.length
    ? `${preserved.length}:${deleted.length}`
    : `${preserved.length}:0`;

  return {
    successfulDeletes,
    failedDeletes,
    successRate,
    preservedDeletedRatio,
    byType,
    totalCommits,
    estimatedStorageBytes,
    estimatedStorageHuman: formatBytes(estimatedStorageBytes),
    authorsAffected: Array.from(authorSet).sort(),
  };
}

/**
 * Create options.reportDir and missing parent directories if the path is absent.
 * Options default to the CLI configuration.
 *
 * @throws {Error} Propagates filesystem errors from creating the directory.
 */
function ensureReportDir(options = opts) {
  if (!fs.existsSync(options.reportDir)) {
    fs.mkdirSync(options.reportDir, { recursive: true });
  }
}

// ============================================================================
// Reporting
// ============================================================================

/**
 * Write a UTF-8 Markdown analysis report, creating the output directory as needed.
 * Sort deleted in place by branch name. An existing file with the same
 * timestamp (second precision) is overwritten.
 *
 * @param {object[]} deleted - Candidates with branch, author, lastCommitDate,
 *   hash, age in days, commitCount, estimatedStorageBytes, and reason
 * @param {object[]} preserved - Branches with branch, category, and reason
 * @param {object[]} errors - Entries with branch and error message
 * @param {object} metrics - Aggregates returned by getMetrics
 * @param {object} [options=opts] - CLI defaults or reportDir and inactiveDays
 * @returns {string} Written file path, relative if reportDir is relative
 * @throws {Error} Propagates filesystem errors from directory creation or writing.
 */
function writeMarkdownReport(deleted, preserved, errors, metrics, options = opts) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filePath = path.join(options.reportDir, `branch-cleanup-${timestamp}.md`);

  const lines = [
    `# Branch Cleanup Report`,
    ``,
    `**Date:** ${new Date().toISOString()}`,
    `**Mode:** Report-only (no deletions executed)`,
    `**Threshold:** ${options.inactiveDays} days inactive`,
    ``,
    `## Summary`,
    ``,
    `| Metric | Value |`,
    `| --- | --- |`,
    `| Branches eligible for deletion | ${deleted.length} |`,
    `| Branches retained (KEEP) | ${preserved.filter((b) => b.category === 'KEEP').length} |`,
    `| Branches requiring discussion | ${preserved.filter((b) => b.category === 'DISCUSS').length} |`,
    `| Errors encountered | ${errors.length} |`,
    `| Total commits affected (estimate) | ${metrics.totalCommits} |`,
    `| Estimated storage impact | ${metrics.estimatedStorageHuman} |`,
    ``,
  ];

  lines.push(`## Branches Eligible for Deletion`, ``);

  if (deleted.length === 0) {
    lines.push(`No branches are eligible for deletion. Repository is clean!`, ``);
  } else {
    lines.push(`### Summary by Type`, ``);
    const types = Object.entries(metrics.byType).sort(([a], [b]) => a.localeCompare(b));
    for (const [type, count] of types) {
      lines.push(`- **\`${type}/\`**: ${count} branches`);
    }
    lines.push('');

    lines.push(`### Candidates for Deletion`, ``);
    for (const b of deleted.sort((a, b) => a.branch.localeCompare(b.branch))) {
      lines.push(
        `#### \`${b.branch}\``,
        `- **Author:** ${b.author || 'unknown'}`,
        `- **Last commit:** ${b.lastCommitDate || 'unknown'}`,
        `- **Inactivity:** ${Math.round(b.age || 0)} days`,
        `- **Commit hash:** \`${b.hash || 'unknown'}\``,
        `- **Unique commits:** ${b.commitCount || 0}`,
        `- **Estimated storage:** ${formatBytes(b.estimatedStorageBytes || 0)}`,
        `- **Reason for deletion:** ${b.reason}`,
        ``
      );
    }
  }

  const kept = preserved.filter((branch) => branch.category === 'KEEP');
  if (kept.length) {
    lines.push(`## Branches Retained (KEEP)`, ``);
    for (const branch of kept.sort((a, b) => a.branch.localeCompare(b.branch))) {
      lines.push(`- \`${branch.branch}\` — ${branch.reason}`);
    }
    lines.push(``);
  }

  const discuss = preserved.filter((branch) => branch.category === 'DISCUSS');
  if (discuss.length) {
    lines.push(`## Branches Requiring Discussion`, ``);
    lines.push(
      `These branches cannot be automatically classified and require human review:`,
      ``
    );
    for (const branch of discuss.sort((a, b) => a.branch.localeCompare(b.branch))) {
      lines.push(`- \`${branch.branch}\` — ${branch.reason}`);
    }
    lines.push(``);
  }

  if (errors.length) {
    lines.push(`## Errors Encountered`, ``);
    for (const e of errors) {
      lines.push(`- \`${e.branch}\`: ${e.error}`);
    }
    lines.push(``);
  }

  lines.push(
    `## Branch Recovery`,
    ``,
    `To restore a branch that has been deleted:`,
    ``,
    '```bash',
    `git branch <branch-name> <commit-hash>`,
    `git push origin <branch-name>`,
    '```',
    ``,
    `> Commit hashes for candidate branches are listed above.`
  );

  const content = lines.join('\n');
  ensureReportDir(options);
  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
}

/**
 * Write a UTF-8 JSON analysis report, creating the output directory as needed.
 * Candidate order is preserved and inactivity days are rounded to integers.
 * An existing file with the same timestamp (second precision) is overwritten.
 *
 * @param {object[]} deleted - Candidates with branch, author, lastCommitDate,
 *   hash, age in days, commitCount, estimatedStorageBytes, and reason
 * @param {object[]} preserved - Branches with branch, category, and reason
 * @param {object[]} errors - Entries with branch and error message
 * @param {object} metrics - Aggregates returned by getMetrics
 * @param {object} [options=opts] - CLI defaults or reportDir and inactiveDays
 * @returns {string} Written file path, relative if reportDir is relative
 * @throws {Error} Propagates filesystem errors from directory creation or writing.
 * @throws {TypeError} Propagates JSON serialization errors, such as circular data.
 */
function writeJsonReport(deleted, preserved, errors, metrics, options = opts) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filePath = path.join(options.reportDir, `branch-cleanup-${timestamp}.json`);

  const report = {
    timestamp: new Date().toISOString(),
    mode: 'report-only',
    inactiveDays: options.inactiveDays,
    summary: {
      candidateCount: deleted.length,
      keptCount: preserved.filter((b) => b.category === 'KEEP').length,
      discussCount: preserved.filter((b) => b.category === 'DISCUSS').length,
      errorCount: errors.length,
      totalCommitsAffected: metrics.totalCommits,
      estimatedStorageBytes: metrics.estimatedStorageBytes,
      estimatedStorageHuman: metrics.estimatedStorageHuman,
    },
    metrics: {
      candidatesByType: metrics.byType,
      authorsAffected: metrics.authorsAffected,
    },
    candidates: deleted.map((b) => ({
      branch: b.branch,
      author: b.author,
      lastCommitDate: b.lastCommitDate,
      inactivityDays: Math.round(b.age || 0),
      commitHash: b.hash,
      uniqueCommits: b.commitCount,
      estimatedStorageBytes: b.estimatedStorageBytes,
      reason: b.reason,
    })),
    retained: preserved.map((b) => ({
      branch: b.branch,
      category: b.category,
      reason: b.reason,
    })),
    errors: errors.map((e) => ({
      branch: e.branch,
      error: e.error,
    })),
  };

  ensureReportDir(options);
  fs.writeFileSync(filePath, JSON.stringify(report, null, 2), 'utf8');
  return filePath;
}

// ============================================================================
// Git utilities
// ============================================================================

/**
 * List locally stored origin refs without fetching, removing the origin/ prefix.
 * The result can include 'HEAD'; callers must filter it if needed.
 *
 * @returns {string[]} Ref names, or an empty array when no refs are found
 * @throws {Error} If Git cannot list refs; the original error is available as cause.
 */
function getRemoteBranches() {
  let output;
  try {
    output = execFileSync(
      'git',
      ['for-each-ref', 'refs/remotes/origin', '--format=%(refname:short)'],
      {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }
    );
  } catch (err) {
    const detail = String(err.stderr || err.message || '').trim();
    throw new Error(`Repository access failed: could not list remote branches. ${detail}`.trim(), {
      cause: err,
    });
  }
  return output
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((b) => b.replace(/^origin\//, ''));
}

/**
 * Verify the current directory is in a Git repository with an origin URL.
 *
 * @throws {Error} If either Git check fails or origin has no URL.
 */
function validateEnvironment() {
  const gitDirResult = spawnSync('git', ['rev-parse', '--git-dir'], {
    encoding: 'utf8',
  });
  if (gitDirResult.status !== 0) {
    throw new Error('Not a git repository. Run this script from a git repo.');
  }

  const remoteResult = spawnSync('git', ['remote', 'get-url', 'origin'], {
    encoding: 'utf8',
  });
  if (remoteResult.status !== 0 || !remoteResult.stdout.trim()) {
    throw new Error('No "origin" remote found. Ensure the repository has an origin remote.');
  }

  if (opts.verbose) {
    log('debug', `Git directory: ${gitDirResult.stdout.trim()}`);
    log('debug', 'Origin remote is configured');
  }
}

// ============================================================================
// Main
// ============================================================================

/**
 * Fetch and prune origin refs, classify branches, and write the configured report.
 * Exit with 0 on completion, 2 after reporting per-branch errors, or 1 for
 * environment, fetch, or other fatal failures. Branches are never deleted.
 */
async function main() {
  try {
    console.log('🌿 Branch Cleanup Analysis');
    console.log('==========================');
    console.log('');
    console.log('Mode:         Report-only (no deletions)');
    console.log(`Threshold:    ${opts.inactiveDays} days inactive`);
    if (opts.excludePatterns) console.log(`Exclude:      ${opts.excludePatterns}`);
    console.log('');

    // Pre-flight validation
    if (opts.verbose) log('debug', 'Validating environment...');
    validateEnvironment();

    // Fetch latest remote state
    if (opts.verbose) log('debug', 'Fetching remote branch list...');
    const fetchResult = spawnSync('git', ['fetch', '--prune', 'origin'], {
      encoding: 'utf8',
    });
    if (fetchResult.status !== 0) {
      logError('Failed to fetch remote branches', fetchResult.stderr);
      if (!opts.verbose) {
        console.error('  Run with --verbose for details');
      }
      process.exit(1);
    }

    const remoteBranches = getRemoteBranches().filter((b) => b !== 'HEAD' && b.trim() !== '');
    const excludeRe = buildExcludeRegex();
    const baseRef = getBaseRef();

    console.log(`📊 Found ${remoteBranches.length} remote branches`);
    console.log('');

    const toDelete = [];
    const toPreserve = [];
    const errors = [];

    for (const branch of remoteBranches) {
      try {
        const lastCommitDate = getLastCommitDate(branch);
        const author = getLastCommitAuthor(branch);
        const mergeStatus = getMergeStatus(branch, baseRef);

        const classification = categorizeBranch(
          branch,
          {
            author,
            lastCommitDate,
            mergeStatus,
          },
          new Set(), // openPRBranches: empty for report-only
          excludeRe,
          opts.inactiveDays
        );

        if (classification.category !== 'DELETE') {
          toPreserve.push({
            branch,
            category: classification.category,
            reason: classification.reason,
          });
        } else {
          const commitCount = getUniqueCommitCount(branch, baseRef);
          toDelete.push({
            branch,
            reason: classification.reason,
            lastCommitDate: classification.metadata.lastCommitDate,
            author: classification.metadata.author,
            hash: getLastCommitHash(branch),
            age: classification.metadata.ageInDays,
            type: classification.metadata.type,
            commitCount,
            estimatedStorageBytes: estimateStorageFreedBytes(commitCount),
          });
        }
      } catch (err) {
        errors.push({
          branch,
          error: err.message,
        });
        if (opts.verbose) {
          console.error(`Error processing ${branch}:`, err);
        }
      }
    }

    console.log(`🗑️  Branches eligible for deletion: ${toDelete.length}`);
    console.log(
      `✅ Branches to retain: ${toPreserve.filter((b) => b.category === 'KEEP').length}`
    );
    console.log(
      `💬 Branches requiring discussion: ${toPreserve.filter((b) => b.category === 'DISCUSS').length}`
    );
    if (errors.length) console.log(`⚠️  Errors: ${errors.length}`);
    console.log('');

    const metrics = getMetrics(toDelete, toPreserve, errors);

    // Write report
    let reportPath;
    if (opts.reportFormat === 'json') {
      reportPath = writeJsonReport(toDelete, toPreserve, errors, metrics);
    } else {
      reportPath = writeMarkdownReport(toDelete, toPreserve, errors, metrics);
    }

    console.log('============================');
    console.log('📋 Analysis Summary');
    console.log('============================');
    console.log(`Candidates:  ${toDelete.length} branches`);
    console.log(`Retained:    ${toPreserve.length} branches`);
    if (errors.length) console.log(`Errors:      ${errors.length}`);
    console.log(`Commits:     ${metrics.totalCommits} affected (estimate)`);
    console.log(`Storage:     ${metrics.estimatedStorageHuman} impact (estimate)`);
    console.log(`Report:      ${reportPath}`);
    console.log('');

    if (toDelete.length > 0) {
      console.log('ℹ️  Review the report above to assess candidates for deletion.');
      console.log('This is a report-only analysis — no branches were deleted.');
    } else {
      console.log('🎉 No branches are eligible for deletion. Repository is clean!');
    }

    process.exit(errors.length > 0 ? 2 : 0);
  } catch (err) {
    logError('Unexpected error', err);
    if (opts.verbose) {
      console.error(err);
    }
    process.exit(1);
  }
}

// Run the script
if (
  process.env.CLEANUP_BRANCHES_SKIP_MAIN !== '1' &&
  process.argv[1] &&
  process.argv[1].includes('cleanup-branches.js')
) {
  main().catch((err) => {
    console.error('❌ Unexpected error:', err.message);
    process.exit(1);
  });
}

export {
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
};
