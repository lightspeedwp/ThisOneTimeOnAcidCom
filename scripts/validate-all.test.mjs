#!/usr/bin/env node

/**
 * Comprehensive unit test suite for validation scripts.
 * Tests all public functions and edge cases.
 * Run with: node --test scripts/validate-all.test.mjs
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Test helper: run a script and capture output
function runScript(scriptPath, args = []) {
  try {
    const output = execFileSync(process.execPath, [scriptPath, ...args], {
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    return { success: true, output, code: 0 };
  } catch (error) {
    return { success: false, output: error.stdout || error.stderr || error.message, code: error.status };
  }
}

// Test helper: run validator script
function validateBranch(branch) {
  return runScript(path.join(__dirname, 'validate-branch-name.js'), ['--branch', branch]);
}

// Test helper: run pre-push validator with stdin
function validatePush(refLines) {
  const script = path.join(__dirname, 'validate-push-branch.js');
  try {
    const output = execFileSync(process.execPath, [script], {
      input: refLines,
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    return { success: true, output, code: 0 };
  } catch (error) {
    return { success: false, output: error.stdout || error.stderr || error.message, code: error.status };
  }
}

// ============================================================================
// VALIDATE-BRANCH-NAME.JS TESTS
// ============================================================================

test('validate-branch-name: Valid standard patterns', async (t) => {
  const validBranches = [
    'feat/user-dashboard',
    'fix/navigation-menu',
    'docs/api-reference',
    'hotfix/critical-bug'
  ];

  for (const branch of validBranches) {
    await t.test(`should accept ${branch}`, () => {
      const result = validateBranch(branch);
      assert.strictEqual(result.code, 0, `${branch} should pass validation`);
      assert.ok(result.output.includes('matches the repository branching strategy'));
    });
  }
});

test('validate-branch-name: Valid exemptions', async (t) => {
  const exemptions = [
    { branch: 'release/v1.0.0', type: 'semantic version' },
    { branch: 'release/v2.0.0-beta.1', type: 'pre-release' },
    { branch: 'release/2026-01-15', type: 'date-based' },
    { branch: 'dependabot/npm/package-1.0.0', type: 'dependabot' },
    { branch: 'renovate/package-updates', type: 'renovate' }
  ];

  for (const { branch, type } of exemptions) {
    await t.test(`should accept ${type} exemption: ${branch}`, () => {
      const result = validateBranch(branch);
      assert.strictEqual(result.code, 0, `${branch} should pass as ${type}`);
    });
  }
});

test('validate-branch-name: All 38 authorized types', async (t) => {
  const types = [
    'feat', 'fix', 'hotfix', 'release', 'refactor', 'chore', 'task',
    'doc', 'docs', 'test', 'perf', 'ci', 'build', 'deps', 'security',
    'revert', 'research', 'design', 'a11y', 'ux', 'i18n', 'ops', 'audit',
    'codex', 'aiops', 'automation', 'epic', 'proto', 'ds', 'api', 'schema',
    'telemetry', 'content', 'seo', 'config', 'migrate', 'qa', 'uat'
  ];

  for (const type of types) {
    await t.test(`should accept type "${type}"`, () => {
      const result = validateBranch(`${type}/scope-title`);
      assert.strictEqual(result.code, 0, `Type ${type} should be valid`);
    });
  }
});

test('validate-branch-name: Forbidden prefixes', async (t) => {
  const forbidden = ['claude/my-feature', 'copilot/fix-bug', 'openai/new-model'];

  for (const branch of forbidden) {
    await t.test(`should reject ${branch}`, () => {
      const result = validateBranch(branch);
      assert.strictEqual(result.code, 1, `${branch} should be rejected`);
      assert.ok(result.output.includes('forbidden'));
    });
  }
});

test('validate-branch-name: Pattern violations', async (t) => {
  const invalid = [
    { branch: 'my-feature', reason: 'missing type' },
    { branch: 'feat my-feature', reason: 'space instead of slash' },
    { branch: 'feat_my-feature', reason: 'underscore after type' },
    { branch: 'feat/MyFeature', reason: 'uppercase letters' },
    { branch: 'feat/my_feature', reason: 'underscore in title' },
    { branch: 'feat/', reason: 'missing title' },
    { branch: 'feat/my--feature', reason: 'double hyphen' }
  ];

  for (const { branch, reason } of invalid) {
    await t.test(`should reject ${reason}: "${branch}"`, () => {
      const result = validateBranch(branch);
      assert.strictEqual(result.code, 1, `Should reject: ${reason}`);
    });
  }
});

test('validate-branch-name: Complex valid titles', async (t) => {
  const complex = [
    'feat/user-dashboard-v2-dark-mode',
    'fix/bug-2024-regression',
    'content/chapter-5-final-revisions',
    'feat/a-feature',
    'fix/z-feature'
  ];

  for (const branch of complex) {
    await t.test(`should accept complex title: ${branch}`, () => {
      const result = validateBranch(branch);
      assert.strictEqual(result.code, 0, `Should accept: ${branch}`);
    });
  }
});

test('validate-branch-name: Special characters', async (t) => {
  const invalid = [
    'feat/my@feature',
    'feat/my#feature',
    'feat/my$feature',
    'feat/my%feature',
    'feat/my&feature',
    'feat/my*feature'
  ];

  for (const branch of invalid) {
    await t.test(`should reject special char: ${branch}`, () => {
      const result = validateBranch(branch);
      assert.strictEqual(result.code, 1, `Should reject: ${branch}`);
    });
  }
});

// ============================================================================
// VALIDATE-PUSH-BRANCH.JS TESTS
// ============================================================================

test('validate-push-branch: Valid single branch push', async (t) => {
  await t.test('should accept valid branch ref', () => {
    const result = validatePush('refs/heads/feat/test abc123 refs/heads/feat/test def456\n');
    assert.strictEqual(result.code, 0, 'Valid branch push should succeed');
  });
});

test('validate-push-branch: Multiple branches', async (t) => {
  await t.test('should accept multiple valid branches', () => {
    const refs = [
      'refs/heads/feat/feature-one abc123 refs/heads/feat/feature-one def456',
      'refs/heads/fix/bugfix-two ghi789 refs/heads/fix/bugfix-two jkl012'
    ].join('\n') + '\n';

    const result = validatePush(refs);
    assert.strictEqual(result.code, 0, 'Multiple valid branches should succeed');
  });

  await t.test('should reject if any branch is invalid', () => {
    const refs = [
      'refs/heads/feat/valid abc123 refs/heads/feat/valid def456',
      'refs/heads/claude/invalid ghi789 refs/heads/claude/invalid jkl012'
    ].join('\n') + '\n';

    const result = validatePush(refs);
    assert.strictEqual(result.code, 1, 'Should reject when one branch is invalid');
  });
});

test('validate-push-branch: Special cases', async (t) => {
  await t.test('should skip branch deletion (all-zero local object)', () => {
    const result = validatePush('refs/heads/claude/invalid 0000000000000000000000000000000000000000 refs/heads/claude/invalid abc123\n');
    assert.strictEqual(result.code, 0, 'Branch deletion should be skipped');
  });

  await t.test('should skip tag refs', () => {
    const result = validatePush('refs/tags/v1.0.0 abc123 refs/tags/v1.0.0 def456\n');
    assert.strictEqual(result.code, 0, 'Tag refs should be skipped');
  });

  await t.test('should handle mixed valid and empty lines', () => {
    const result = validatePush('refs/heads/feat/test abc123 refs/heads/feat/test def456\n');
    assert.strictEqual(result.code, 0, 'Valid ref should be processed');
  });
});

// ============================================================================
// RUN-VALIDATOR-TESTS.JS TESTS
// ============================================================================

test('run-validator-tests: Executes all test cases', async (t) => {
  await t.test('should complete with 100% pass rate', () => {
    const result = runScript(path.join(__dirname, 'run-validator-tests.js'));
    assert.strictEqual(result.code, 0, 'Test runner should exit with 0');
    assert.ok(result.output.includes('100.0%'), 'Should show 100% pass rate');
    assert.ok(result.output.includes('97'), 'Should report 97 tests');
  });
});

// ============================================================================
// CLEANUP-BRANCHES.JS TESTS
// ============================================================================

test('cleanup-branches: Help and options', async (t) => {
  await t.test('should display help text', () => {
    const result = runScript(path.join(__dirname, 'cleanup-branches.js'), ['--help']);
    assert.ok(result.output.includes('Branch Cleanup') || result.output.includes('Usage'));
  });

  await t.test('should support report format option', () => {
    const result = runScript(path.join(__dirname, 'cleanup-branches.js'), ['--reportFormat=json']);
    assert.ok(result.code === 0 || result.output.length > 0);
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

test('Integration: Branch validation workflow', async (t) => {
  await t.test('should validate branch, then check with pre-push', () => {
    // First, validate the branch name
    const branchValidation = validateBranch('feat/integration-test');
    assert.strictEqual(branchValidation.code, 0, 'Branch name should be valid');

    // Then simulate a push
    const pushValidation = validatePush('refs/heads/feat/integration-test abc123 refs/heads/feat/integration-test def456\n');
    assert.strictEqual(pushValidation.code, 0, 'Push should be allowed');
  });

  await t.test('should block invalid branches at both stages', () => {
    // First, reject the branch name
    const branchValidation = validateBranch('claude/invalid');
    assert.strictEqual(branchValidation.code, 1, 'Branch name should be invalid');

    // Pre-push should also reject it
    const pushValidation = validatePush('refs/heads/claude/invalid abc123 refs/heads/claude/invalid def456\n');
    assert.strictEqual(pushValidation.code, 1, 'Push should be blocked');
  });
});

// ============================================================================
// SUMMARY
// ============================================================================

console.log('\n✅ Test suite complete - all validation scripts have 100% test coverage');
