#!/usr/bin/env node

/**
 * Comprehensive test runner for branch name validation
 * Extracts all test cases from validate-branch-name.test.js and runs them
 * Records results to validation-report.json
 */

import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

let _scriptDir, _projectRoot;
function getPaths() {
  if (!_scriptDir) {
    _scriptDir = path.dirname(fileURLToPath(import.meta.url));
    _projectRoot = path.dirname(_scriptDir);
  }
  return { _scriptDir, _projectRoot };
}

// Test cases extracted from validate-branch-name.test.js
const TEST_CASES = {
  'Valid Branches - Standard Pattern': [
    'feat/user-dashboard',
    'fix/navigation-menu',
    'docs/api-reference',
    'test/e2e-flow',
    'refactor/hook-consolidation',
    'perf/image-loading',
    'chore/dependency-updates',
    'content/chapter-one-revisions',
    'fix/typo-chapter-five',
    'a11y/form-labels',
    'design/button-component',
    'ci/github-actions',
    'build/vite-config',
    'security/xss-vulnerability',
    'hotfix/critical-bug',
    'task/auth-refactor',
    'doc/readme-typo',
    'revert/pr-2345-merge',
    'research/performance-benchmarks',
    'ux/form-validation',
    'i18n/german-translation',
    'ops/database-migration',
    'audit/code-review',
    'codex/auto-documentation',
    'aiops/model-monitoring',
    'automation/issue-routing',
    'epic/platform-modernisation',
    'proto/new-caching',
    'ds/component-library',
    'api/rest-endpoints',
    'schema/user-model',
    'telemetry/event-tracking',
    'seo/meta-tags',
    'config/environment-vars',
    'migrate/user-table',
    'qa/test-automation',
    'uat/staging-validation'
  ],
  'Valid Branches - Complex Titles': [
    'feat/user-dashboard-v2-dark-mode',
    'fix/bug-2024-regression',
    'feat/a-feature',
    'content/chapter-two-final-edit',
    'content/chapter-three-fact-check',
    'feat/author-bio-section',
    'feat/glossary-terms',
    'feat/bibliography-index',
    'fix/broken-reference-link',
    'fix/formatting-inconsistency',
    'docs/content-style-guide',
    'docs/editing-workflow',
    'docs/github-workflow'
  ],
  'Valid Exemptions - Dependabot': [
    'dependabot/npm_and_yarn/my-package-1.0.0',
    'dependabot/bundler/my-gem-2.0.0',
    'dependabot/docker/my-image',
    'dependabot/github-actions/setup-node'
  ],
  'Valid Exemptions - Renovate': [
    'renovate/my-package',
    'renovate/pin-dependencies',
    'renovate/bump-minor-versions'
  ],
  'Valid Exemptions - Release Semantic': [
    'release/v1.0.0',
    'release/v1.2.3',
    'release/v2.0.0-beta.1',
    'release/v1.0.0-alpha',
    'release/v3.1.0-rc.2',
    'release/v0.0.1'
  ],
  'Valid Exemptions - Release Date-based': [
    'release/2025-01-15',
    'release/2024-12-25',
    'release/2026-10-16'
  ],
  'Invalid Branches - Forbidden Prefixes': [
    'claude/my-feature',
    'copilot/fix-bug',
    'openai/new-model'
  ],
  'Invalid Branches - Pattern Violations': [
    'my-feature',
    'feat my-feature',
    'feat_my-feature',
    'feat/MyFeature',
    'feat/my_feature',
    'feat/my feature',
    'feat/my@feature',
    'feat/',
    '/my-feature',
    'feat/my--feature',
    'Feat/my-feature',
    'FEAT/my-feature'
  ],
  'Invalid Branches - Invalid Type': [
    'feature/my-feature',
    'bugfix/my-fix',
    'documentation/my-docs',
    'feat123/my-feature'
  ],
  'Edge Cases - Special Characters': [
    'feat/my@feature',
    'feat/my#feature',
    'feat/my$feature',
    'feat/my%feature',
    'feat/my&feature',
    'feat/my*feature',
    'feat/my!feature',
    'feat/my?feature'
  ],
  'Edge Cases - Numbers': [
    'feat/user-v2',
    'fix/bug-2024-regression',
    'release/v1.0.0',
    'content/chapter-5-revisions'
  ]
};

const EXPECTED_RESULTS = {
  'Valid Branches - Standard Pattern': 'valid',
  'Valid Branches - Complex Titles': 'valid',
  'Valid Exemptions - Dependabot': 'exemption',
  'Valid Exemptions - Renovate': 'exemption',
  'Valid Exemptions - Release Semantic': 'exemption',
  'Valid Exemptions - Release Date-based': 'exemption',
  'Invalid Branches - Forbidden Prefixes': 'invalid',
  'Invalid Branches - Pattern Violations': 'invalid',
  'Invalid Branches - Invalid Type': 'invalid',
  'Edge Cases - Special Characters': 'invalid',
  'Edge Cases - Numbers': 'valid'
};

/**
 * Run a single branch name validation test.
 * @param {string} branch - The branch name to validate
 * @param {string} expectedType - Expected result type: 'valid', 'invalid', or 'exemption'
 * @returns {{passed: boolean, output: string, exitCode: number, branch: string}} Test result
 */
function runTest(branch, expectedType) {
  try {
    const { _scriptDir } = getPaths();
    const output = execFileSync(
      process.execPath,
      [path.join(_scriptDir, 'validate-branch-name.js'), '--branch', branch],
      { encoding: 'utf-8', stdio: 'pipe' }
    );
    return {
      passed: expectedType === 'valid' || expectedType === 'exemption',
      output,
      exitCode: 0,
      branch
    };
  } catch (error) {
    return {
      passed: expectedType === 'invalid' && error.status === 1,
      output: error.stderr || error.message,
      exitCode: error.status,
      branch
    };
  }
}

/**
 * Main test runner: execute all test cases and write results report.
 */
function main() {
  const results = {
    timestamp: new Date().toISOString(),
    summary: {
      total: 0,
      passed: 0,
      failed: 0,
      byCategory: {}
    },
    details: {}
  };

  console.log('🧪 Running branch validation tests...\n');

  for (const [category, branches] of Object.entries(TEST_CASES)) {
    const expectedType = EXPECTED_RESULTS[category];
    results.details[category] = {
      expected: expectedType,
      cases: [],
      passed: 0,
      failed: 0
    };

    for (const branch of branches) {
      results.summary.total++;
      const testResult = runTest(branch, expectedType);
      testResult.passed ? results.summary.passed++ : results.summary.failed++;
      results.details[category].cases.push({
        branch,
        passed: testResult.passed,
        exitCode: testResult.exitCode
      });

      if (testResult.passed) {
        results.details[category].passed++;
        process.stdout.write('✅');
      } else {
        results.details[category].failed++;
        process.stdout.write('❌');
      }
    }

    results.summary.byCategory[category] = {
      passed: results.details[category].passed,
      failed: results.details[category].failed,
      total: branches.length
    };

    console.log(` ${category} (${results.details[category].passed}/${branches.length})`);
  }

  console.log(`\n📊 Test Results Summary:`);
  console.log(`  Total: ${results.summary.total}`);
  console.log(`  Passed: ${results.summary.passed}`);
  console.log(`  Failed: ${results.summary.failed}`);
  console.log(`  Success Rate: ${((results.summary.passed / results.summary.total) * 100).toFixed(1)}%\n`);

  // Write report
  const { _projectRoot } = getPaths();
  const reportPath = path.join(_projectRoot, 'validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`📄 Full report: ${reportPath}`);

  process.exit(results.summary.failed > 0 ? 1 : 0);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(`Fatal error: ${error.message}`);
    process.exit(2);
  });
}

export { runTest, main };
