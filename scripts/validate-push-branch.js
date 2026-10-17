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
const __dirname = path.dirname(__filename);
const VALIDATION_SCRIPT = path.join(__dirname, 'validate-branch-name.js');

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
      [VALIDATION_SCRIPT, '--branch', branch],
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

    let hasInvalidBranch = false;
    let lineCount = 0;

    for await (const line of rl) {
      lineCount++;

      // Parse the pre-push input line
      const parts = line.trim().split(/\s+/);
      if (parts.length < 4) {
        console.error(`Error: Invalid pre-push input format on line ${lineCount}`);
        process.exit(2);
      }

      let localRef = parts[0];
      const localObj = parts[1];
      const remoteRef = parts[2];
      const remoteObj = parts[3];

      // Skip deletion refs (they're indicated by all zeros for the local object)
      if (/^0+$/.test(localObj)) {
        // Branch deletion, skip validation
        continue;
      }

      // Resolve HEAD to symbolic branch before checking ref type
      if (localRef === 'HEAD') {
        try {
          const symbolicRef = execSync('git symbolic-ref HEAD', {
            encoding: 'utf-8'
          }).trim();
          localRef = symbolicRef;
        } catch (e) {
          // Detached HEAD state, skip validation
          continue;
        }
      }

      // Skip tags and other non-branch refs
      if (!localRef.startsWith('refs/heads/')) {
        continue;
      }

      const branch = extractBranchName(localRef);
      const result = validateBranch(branch);

      if (!result.valid) {
        // Get more detailed output by running validation again for display
        try {
          execFileSync(
            process.execPath,
            [VALIDATION_SCRIPT, '--branch', branch],
            { stdio: 'inherit', encoding: 'utf-8' }
          );
        } catch (e) {
          // Error already printed to stderr
        }
        hasInvalidBranch = true;
      }
    }

    // If no input was received, try to validate the current branch (fallback)
    if (lineCount === 0) {
      try {
        const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', {
          encoding: 'utf-8'
        }).trim();

        // Skip validation if in detached HEAD state
        if (currentBranch === 'HEAD') {
          process.exit(0);
        }

        const result = validateBranch(currentBranch);
        if (!result.valid) {
          try {
            execFileSync(
              process.execPath,
              [VALIDATION_SCRIPT, '--branch', currentBranch],
              { stdio: 'inherit', encoding: 'utf-8' }
            );
          } catch (e) {
            // Error already printed
          }
          hasInvalidBranch = true;
        }
      } catch (e) {
        console.error('Error: Could not determine branch to validate');
        process.exit(2);
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

export { extractBranchName, validateBranch };
