#!/usr/bin/env node

/**
 * Git pre-push hook branch validation script.
 * Reads pushed branch refs from stdin and validates them.
 *
 * Git pre-push input format: <local ref> <local object> <remote ref> <remote object>
 * Example: refs/heads/feat/my-feature abc123def456 refs/heads/feat/my-feature abc123def456
 *
 * Exit codes: 0=all branches valid, 1=invalid branch found, 2=execution error
 */

import { execSync, execFileSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';
import readline from 'readline';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);

let _validationScript;
function getValidationScript() {
  if (!_validationScript) {
    const __dirname = path.dirname(__filename);
    _validationScript = path.join(__dirname, 'validate-branch-name.js');
  }
  return _validationScript;
}

/**
 * Extract branch name from a Git ref (e.g., refs/heads/main -> main).
 * @param {string} ref - The Git reference string
 * @returns {string} The branch name without the ref prefix
 */
function extractBranchName(ref) {
  if (ref.startsWith('refs/heads/')) {
    return ref.slice('refs/heads/'.length);
  }
  return ref;
}

/**
 * Validate a single branch using the main validation script.
 * @param {string} branch - The branch name to validate
 * @returns {{valid: boolean, message?: string, exitCode?: number}} Validation result
 */
function validateBranch(branch) {
  try {
    execFileSync(
      process.execPath,
      [getValidationScript(), '--branch', branch],
      { stdio: 'pipe', encoding: 'utf-8' }
    );
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      message: error.message,
      exitCode: error.status
    };
  }
}

/**
 * Parse a single pre-push input line into its components.
 * Format: <local ref> <local object> <remote ref> <remote object>
 * @param {string} line - The pre-push input line
 * @returns {{localRef: string, localObj: string, remoteRef: string, remoteObj: string}|null}
 */
function parsePushLine(line) {
  const parts = line.trim().split(/\s+/);
  if (parts.length < 4) {
    return null;
  }
  return {
    localRef: parts[0],
    localObj: parts[1],
    remoteRef: parts[2],
    remoteObj: parts[3]
  };
}

/**
 * Check if a ref should be skipped (deletion or non-branch).
 * @param {string} localRef - The local reference
 * @param {string} localObj - The local object hash
 * @returns {boolean} True if should skip validation
 */
function shouldSkipRef(localRef, localObj) {
  // Skip deletion refs (indicated by all zeros for local object)
  if (/^0+$/.test(localObj)) {
    return true;
  }
  // Skip tags and other non-branch refs, allowing HEAD to be resolved later
  if (localRef !== 'HEAD' && !localRef.startsWith('refs/heads/')) {
    return true;
  }
  return false;
}

/**
 * Resolve HEAD ref to symbolic branch name.
 * @param {string} ref - The reference to resolve
 * @returns {string|null} Resolved ref or null if HEAD is detached
 */
function resolveHeadRef(ref) {
  if (ref !== 'HEAD') {
    return ref;
  }
  try {
    const symbolicRef = execSync('git symbolic-ref HEAD', {
      encoding: 'utf-8'
    }).trim();
    return symbolicRef;
  } catch (e) {
    // Detached HEAD state
    return null;
  }
}

/**
 * Get current branch name, with fallback validation.
 * @returns {string|null} Current branch name or null if in detached HEAD
 */
function getCurrentBranch() {
  try {
    const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8'
    }).trim();
    // Skip validation if in detached HEAD state
    return currentBranch === 'HEAD' ? null : currentBranch;
  } catch (e) {
    return null;
  }
}

/**
 * Process a batch of pre-push input lines and validate branches.
 * Resolves HEAD with Git and validates each branch in a child process.
 * @param {string[]} lines - Array of pre-push input lines
 * @returns {{branches: string[], hasInvalidBranch: boolean, invalidBranches: string[]}}
 */
function processPushLines(lines) {
  const branches = [];
  let hasInvalidBranch = false;
  const invalidBranches = [];

  for (const line of lines) {
    const parsed = parsePushLine(line);
    if (!parsed) {
      // Invalid format will be caught as error in main()
      continue;
    }

    if (shouldSkipRef(parsed.localRef, parsed.localObj)) {
      continue;
    }

    let localRef = resolveHeadRef(parsed.localRef);
    if (!localRef) {
      // Detached HEAD or resolution failed
      continue;
    }

    if (!localRef.startsWith('refs/heads/')) {
      continue;
    }

    const branch = extractBranchName(localRef);
    branches.push(branch);

    const result = validateBranch(branch);
    if (!result.valid) {
      hasInvalidBranch = true;
      invalidBranches.push(branch);
    }
  }

  return { branches, hasInvalidBranch, invalidBranches };
}

/**
 * Main function: read stdin and validate each pushed ref.
 * Processes pre-push input format and validates each branch.
 */
async function main() {
  try {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    const lines = [];
    for await (const line of rl) {
      lines.push(line);
    }

    // Validate parsed lines
    for (let i = 0; i < lines.length; i++) {
      const parsed = parsePushLine(lines[i]);
      if (!parsed) {
        console.error(`Error: Invalid pre-push input format on line ${i + 1}`);
        process.exit(2);
      }
    }

    // Process push lines
    const { hasInvalidBranch, invalidBranches } = processPushLines(lines);

    // If no input was received, try to validate the current branch (fallback)
    if (lines.length === 0) {
      const currentBranch = getCurrentBranch();
      if (currentBranch) {
        const result = validateBranch(currentBranch);
        if (!result.valid) {
          // Display validation error
          try {
            execFileSync(
              process.execPath,
              [getValidationScript(), '--branch', currentBranch],
              { stdio: 'inherit', encoding: 'utf-8' }
            );
          } catch (e) {
            // Error already printed
          }
          process.exit(1);
        }
      }
      process.exit(0);
    }

    // Display validation errors for invalid branches
    if (hasInvalidBranch) {
      for (const branch of invalidBranches) {
        try {
          execFileSync(
            process.execPath,
            [getValidationScript(), '--branch', branch],
            { stdio: 'inherit', encoding: 'utf-8' }
          );
        } catch (e) {
          // Error already printed to stderr
        }
      }
    }

    process.exit(hasInvalidBranch ? 1 : 0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(2);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(`Fatal error: ${error.message}`);
    process.exit(2);
  });
}

export {
  extractBranchName,
  validateBranch,
  parsePushLine,
  shouldSkipRef,
  resolveHeadRef,
  getCurrentBranch,
  processPushLines,
  main
};
