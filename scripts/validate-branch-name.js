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
  standard: /^[a-z][a-z0-9]*\/[a-z][a-z0-9]*(-[a-z0-9]+)+$/,
  releaseVersioned: /^release\/v\d+\.\d+\.\d+(-[a-z0-9]+(\.[a-z0-9]+)*)?$/,
  releaseStandard: /^release\/\d{4}-\d{2}-\d{2}$/,
  dependabot: /^dependabot\/.+$/,
  renovate: /^renovate\/.+$/
};

class ValidationResult {
  constructor(isValid, branch, message, type = 'valid', details = null) {
    this.isValid = isValid;
    this.branch = branch;
    this.message = message;
    this.type = type;
    this.details = details || {};
  }

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

function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  } catch (error) {
    throw new Error('Not in a git repository or git command failed');
  }
}

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

    // Release branch that doesn't match valid patterns
    return new ValidationResult(
      false,
      branch,
      `❌ Release branch '${branch}' does not match valid patterns. Use 'release/v{major}.{minor}.{patch}' or 'release/YYYY-MM-DD'.`,
      'invalid-release-pattern',
      { pattern: 'release', invalidPattern: true }
    );
  }

  return null;
}

/**
 * Check the standard branch-name syntax and authorised type, without exemptions.
 * @param {string} branch - Branch name to check, already trimmed by the caller
 * @returns {ValidationResult} Validation outcome with pattern or type details
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
 * Validate a branch name after trimming whitespace. Reject empty or non-string
 * inputs, then check forbidden prefixes, exemptions, and the standard pattern.
 * @param {string} branch - Branch name to validate
 * @returns {ValidationResult} Validation outcome with a message and details
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
 * Parse command-line arguments to extract branch name.
 * @param {string[]} args - Command-line arguments (process.argv.slice(2))
 * @returns {{branchName: string|null, error: string|null}} Parsed result
 */
export function parseArgs(args) {
  if (args.includes('--branch')) {
    const index = args.indexOf('--branch');
    if (index + 1 < args.length) {
      const operand = args[index + 1];
      // Reject empty string or flag-like operands (starting with -)
      if (!operand || operand.startsWith('-')) {
        return { branchName: null, error: 'Error: --branch requires a non-empty value that is not a flag' };
      }
      return { branchName: operand, error: null };
    } else {
      return { branchName: null, error: 'Error: --branch requires a value' };
    }
  }
  return { branchName: null, error: null };
}

/**
 * Validate the explicit --branch value or current Git branch and print the result.
 * Include structured output when --json is supplied. Exit with 0 for a valid
 * branch, 1 for an invalid branch, or 2 for argument or execution errors.
 * @returns {void}
 */
function main() {
  try {
    const args = process.argv.slice(2);
    const { branchName: argBranch, error: parseError } = parseArgs(args);

    let branchName;
    if (parseError) {
      console.error(parseError);
      process.exit(2);
    }
    branchName = argBranch || getCurrentBranch();

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

// Run main if this is the entry point
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
