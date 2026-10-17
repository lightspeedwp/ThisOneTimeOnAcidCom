#!/usr/bin/env node

/**
 * Deterministic branch name validation script.
 * Validates branch names against the repository branching strategy.
 * Exit codes: 0=valid, 1=invalid, 2=execution error
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const AUTHORISED_TYPES = [
  'feat', 'fix', 'hotfix', 'release', 'refactor', 'chore', 'task',
  'doc', 'docs', 'test', 'perf', 'ci', 'build', 'deps', 'security',
  'revert', 'research', 'design', 'a11y', 'ux', 'i18n', 'ops', 'audit',
  'codex', 'aiops', 'automation', 'epic', 'proto', 'ds', 'api', 'schema',
  'telemetry', 'content', 'seo', 'config', 'migrate', 'qa', 'uat'
];

const FORBIDDEN_PREFIXES = ['claude', 'copilot', 'openai'];

const PATTERNS = {
  standard: /^[a-z][a-z0-9]*\/[a-z][a-z0-9]*-[a-z0-9]+(-[a-z0-9]+)*$/,
  releaseVersioned: /^release\/v\d+\.\d+\.\d+(-[a-z0-9]+(\.[a-z0-9]+)*)?$/,
  releaseStandard: /^release\/\d{4}-\d{2}-\d{2}$/,
  dependabot: /^dependabot\/.+$/,
  renovate: /^renovate\/.+$/
};

class ValidationResult {
  /**
   * Create a branch validation outcome with optional diagnostic details.
   * @param {boolean} isValid - Whether the branch name is accepted.
   * @param {*} branch - Original or normalized branch value being validated.
   * @param {string} message - Human-readable validation message.
   * @param {string} [type='valid'] - Validation outcome category.
   * @param {Object|null} [details=null] - Additional diagnostic fields.
   */
  constructor(isValid, branch, message, type = 'valid', details = null) {
    this.isValid = isValid;
    this.branch = branch;
    this.message = message;
    this.type = type;
    this.details = details || {};
  }

  /**
   * Return the validation fields as a plain object for JSON serialization.
   * @returns {Object} Validity, branch, message, category, and diagnostic details.
   */
  toJSON() {
    return {
      isValid: this.isValid,
      branch: this.branch,
      message: this.message,
      type: this.type,
      details: this.details
    };
  }
}

/**
 * Read the current branch name from Git in the working directory.
 * @returns {string} Trimmed branch name reported by Git.
 * @throws {Error} If Git cannot determine the current branch.
 */
function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  } catch (error) {
    throw new Error('Not in a git repository or git command failed');
  }
}

/**
 * Check whether a branch starts with a prohibited automation prefix.
 * @param {string} branch - Branch name to inspect.
 * @returns {ValidationResult|null} Failure result, or null if no prefix matches.
 */
function checkForbiddenPrefix(branch) {
  for (const prefix of FORBIDDEN_PREFIXES) {
    if (branch.startsWith(`${prefix}/`)) {
      return new ValidationResult(
        false,
        branch,
        `❌ Branch prefix '${prefix}/' is forbidden. It breaks PR template routing and GitHub Actions automation.`,
        'forbidden-prefix',
        { forbiddenPrefix: prefix }
      );
    }
  }
  return null;
}

/**
 * Check dependency bot exemptions and validate special release branch formats.
 * @param {string} branch - Branch name to inspect.
 * @returns {ValidationResult|null} Exemption or invalid-release result, or null
 *   when standard branch validation should continue.
 */
function checkExemptions(branch) {
  if (PATTERNS.dependabot.test(branch)) {
    return new ValidationResult(
      true,
      branch,
      `✅ Branch '${branch}' is a valid dependabot exemption.`,
      'exemption',
      { pattern: 'dependabot', exemption: true }
    );
  }

  if (PATTERNS.renovate.test(branch)) {
    return new ValidationResult(
      true,
      branch,
      `✅ Branch '${branch}' is a valid renovate exemption.`,
      'exemption',
      { pattern: 'renovate', exemption: true }
    );
  }

  if (branch.startsWith('release/')) {
    if (PATTERNS.releaseVersioned.test(branch)) {
      return new ValidationResult(
        true,
        branch,
        `✅ Branch '${branch}' is a valid semantic version release branch.`,
        'exemption',
        { pattern: 'releaseVersioned', exemption: true }
      );
    }

    if (PATTERNS.releaseStandard.test(branch)) {
      return new ValidationResult(
        true,
        branch,
        `✅ Branch '${branch}' is a valid date-based release branch.`,
        'exemption',
        { pattern: 'releaseStandard', exemption: true }
      );
    }

    return new ValidationResult(
      false,
      branch,
      `❌ Branch '${branch}' does not match release branch pattern. Use release/v{version} (e.g., release/v1.0.0) or release/YYYY-MM-DD format.`,
      'invalid-release-pattern',
      { pattern: 'release', received: branch }
    );
  }

  return null;
}

/**
 * Validate the type/scope-title format and its authorised branch type.
 * @param {string} branch - Branch name to validate against the standard pattern.
 * @returns {ValidationResult} Validation outcome with parsed fields on success.
 */
function validateStandardPattern(branch) {
  if (!PATTERNS.standard.test(branch)) {
    return new ValidationResult(
      false,
      branch,
      `❌ Branch '${branch}' does not match the required pattern {type}/{scope}-{title}. ` +
      'All parts must be lowercase, separated by hyphens (not underscores), and contain only letters, numbers, and hyphens.',
      'invalid-pattern',
      { pattern: 'standard', received: branch }
    );
  }

  const [typePart, scopeTitlePart] = branch.split('/');
  const matchedType = AUTHORISED_TYPES.find(t => t === typePart);

  if (!matchedType) {
    return new ValidationResult(
      false,
      branch,
      `❌ Type '${typePart}' is not in the authorised types list. Valid types: ${AUTHORISED_TYPES.join(', ')}`,
      'invalid-type',
      { type: typePart, validTypes: AUTHORISED_TYPES }
    );
  }

  const parts = scopeTitlePart.split('-');
  return new ValidationResult(
    true,
    branch,
    `✅ Branch '${branch}' matches the repository branching strategy.`,
    'valid',
    { pattern: 'standard', matchedType, scope: parts[0], title: parts.slice(1).join('-') }
  );
}

/**
 * Trim and validate a branch value, checking forbidden prefixes before exemptions.
 * @param {*} branch - Candidate branch value; non-strings and blank names fail.
 * @returns {ValidationResult} The first applicable validation outcome.
 */
function validateBranch(branch) {
  if (!branch || typeof branch !== 'string') {
    return new ValidationResult(
      false,
      branch,
      '❌ Branch name is empty or invalid.',
      'empty-branch'
    );
  }

  const trimmed = branch.trim();
  if (trimmed.length === 0) {
    return new ValidationResult(
      false,
      branch,
      '❌ Branch name is empty.',
      'empty-branch'
    );
  }

  // Check forbidden prefixes first
  const forbiddenCheck = checkForbiddenPrefix(trimmed);
  if (forbiddenCheck) {
    return forbiddenCheck;
  }

  // Check exemptions
  const exemptionCheck = checkExemptions(trimmed);
  if (exemptionCheck) {
    return exemptionCheck;
  }

  // Validate standard pattern
  return validateStandardPattern(trimmed);
}

/**
 * Validate --branch or the current Git branch and print the result.
 * Also print structured output when --json is supplied, then exit with status
 * 0 for a valid branch, 1 for an invalid branch, or 2 for an execution error.
 * @returns {void}
 */
function main() {
  try {
    const args = process.argv.slice(2);
    let branchName;

    if (args.includes('--branch')) {
      const index = args.indexOf('--branch');
      if (index + 1 < args.length) {
        branchName = args[index + 1];
      } else {
        console.error('Error: --branch requires a value');
        process.exit(2);
      }
    } else {
      branchName = getCurrentBranch();
    }

    const result = validateBranch(branchName);

    console.log(result.message);

    if (process.argv.includes('--json')) {
      console.log(JSON.stringify(result.toJSON(), null, 2));
    }

    process.exit(result.isValid ? 0 : 1);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(2);
  }
}

// Export for testing
export {
  validateBranch,
  checkForbiddenPrefix,
  checkExemptions,
  validateStandardPattern,
  getCurrentBranch,
  ValidationResult,
  AUTHORISED_TYPES,
  FORBIDDEN_PREFIXES,
  PATTERNS,
  main
};

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
