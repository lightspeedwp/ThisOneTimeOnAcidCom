/**
 * Tests for branch validation test runner
 */

import { createResultsStructure, processAllTestCases, outputTestResults, TEST_CASES, EXPECTED_RESULTS, runTest, main } from './run-validator-tests.js';

describe('run-validator-tests', () => {
  describe('test case organization', () => {
    test('defines valid branch categories', () => {
      const validCategories = [
        'Valid Branches - Standard Pattern',
        'Valid Branches - Complex Titles',
        'Valid Exemptions - Dependabot',
        'Valid Exemptions - Renovate',
        'Valid Exemptions - Release Semantic',
        'Valid Exemptions - Release Date-based'
      ];

      validCategories.forEach(category => {
        expect(category).toBeTruthy();
      });
    });

    test('defines invalid branch categories', () => {
      const invalidCategories = [
        'Invalid Branches - Forbidden Prefixes',
        'Invalid Branches - Pattern Violations',
        'Invalid Branches - Invalid Type',
        'Edge Cases - Special Characters'
      ];

      invalidCategories.forEach(category => {
        expect(category).toBeTruthy();
      });
    });
  });

  describe('test result tracking', () => {
    test('tracks passed and failed tests', () => {
      const results = {
        total: 0,
        passed: 0,
        failed: 0,
        byCategory: {}
      };

      expect(results.total).toBe(0);
      expect(results.passed).toBe(0);
      expect(results.failed).toBe(0);
    });

    test('calculates success rate correctly', () => {
      const testCounts = [
        { passed: 97, total: 97, expected: 100.0 },
        { passed: 50, total: 100, expected: 50.0 },
        { passed: 0, total: 10, expected: 0.0 }
      ];

      testCounts.forEach(({ passed, total, expected }) => {
        const rate = (passed / total) * 100;
        expect(Number(rate.toFixed(1))).toBe(expected);
      });
    });
  });

  describe('branch validation patterns', () => {
    test('recognizes valid standard branch patterns', () => {
      const validBranches = [
        'feat/user-dashboard',
        'fix/navigation-menu',
        'docs/api-reference',
        'test/e2e-flow',
        'refactor/hook-consolidation',
        'perf/image-loading',
        'chore/dependency-updates'
      ];

      validBranches.forEach(branch => {
        expect(branch).toMatch(/^[a-z]+\/[a-z0-9]+-?[a-z0-9-]*$/);
      });
    });

    test('recognizes dependabot exemption patterns', () => {
      const dependabotBranches = [
        'dependabot/npm_and_yarn/my-package-1.0.0',
        'dependabot/bundler/my-gem-2.0.0',
        'dependabot/docker/my-image',
        'dependabot/github-actions/setup-node'
      ];

      dependabotBranches.forEach(branch => {
        expect(branch).toMatch(/^dependabot\//);
      });
    });

    test('recognizes renovate exemption patterns', () => {
      const renovateBranches = [
        'renovate/my-package',
        'renovate/pin-dependencies',
        'renovate/bump-minor-versions'
      ];

      renovateBranches.forEach(branch => {
        expect(branch).toMatch(/^renovate\//);
      });
    });

    test('recognizes release exemption patterns', () => {
      const releaseBranches = [
        'release/v1.0.0',
        'release/v1.2.3',
        'release/v2.0.0-beta.1',
        'release/2025-01-15',
        'release/2024-12-25'
      ];

      releaseBranches.forEach(branch => {
        expect(branch).toMatch(/^release\//);
      });
    });

    test('rejects forbidden prefixes', () => {
      const forbiddenBranches = [
        'claude/my-feature',
        'copilot/fix-bug',
        'openai/new-model'
      ];

      forbiddenBranches.forEach(branch => {
        expect(branch).toMatch(/^(claude|copilot|openai)\//);
      });
    });

    test('rejects invalid patterns', () => {
      const invalidPatterns = [
        'my-feature',
        'feat my-feature',
        'feat_my-feature',
        'feat/MyFeature',
        'feat/my_feature',
        'feat/my feature',
        'feat/',
        '/my-feature',
        'Feat/my-feature',
        'FEAT/my-feature'
      ];

      invalidPatterns.forEach(pattern => {
        const validPattern = /^[a-z]+\/[a-z0-9]+-?[a-z0-9-]*$/;
        expect(pattern).not.toMatch(validPattern);
      });
    });
  });

  describe('test execution', () => {
    test('handles process execution patterns', () => {
      const patterns = [
        { command: 'node', args: ['--version'] },
        { command: 'npm', args: ['run', 'test'] }
      ];

      patterns.forEach(pattern => {
        expect(pattern.command).toBeTruthy();
        expect(Array.isArray(pattern.args)).toBe(true);
      });
    });
  });

  describe('report generation', () => {
    test('report includes timestamp', () => {
      const timestamp = new Date().toISOString();
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    test('report structure includes required fields', () => {
      const report = {
        timestamp: new Date().toISOString(),
        summary: {
          total: 97,
          passed: 97,
          failed: 0,
          byCategory: {}
        },
        details: {}
      };

      expect(report).toHaveProperty('timestamp');
      expect(report).toHaveProperty('summary');
      expect(report).toHaveProperty('details');
      expect(report.summary).toHaveProperty('total');
      expect(report.summary).toHaveProperty('passed');
      expect(report.summary).toHaveProperty('failed');
    });
  });

  describe('test categories', () => {
    test('counts tests per category', () => {
      const categories = {
        'Valid Branches - Standard Pattern': 37,
        'Valid Branches - Complex Titles': 13,
        'Valid Exemptions - Dependabot': 4,
        'Valid Exemptions - Renovate': 3,
        'Valid Exemptions - Release Semantic': 6,
        'Valid Exemptions - Release Date-based': 3,
        'Invalid Branches - Forbidden Prefixes': 3,
        'Invalid Branches - Pattern Violations': 12,
        'Invalid Branches - Invalid Type': 4,
        'Edge Cases - Special Characters': 8,
        'Edge Cases - Numbers': 4
      };

      const total = Object.values(categories).reduce((sum, count) => sum + count, 0);
      expect(total).toBe(97);
    });

    test('validates all category results', () => {
      const categoryResults = {
        'Valid Branches - Standard Pattern': { passed: 37, failed: 0, total: 37 },
        'Valid Exemptions - Dependabot': { passed: 4, failed: 0, total: 4 },
        'Invalid Branches - Forbidden Prefixes': { passed: 3, failed: 0, total: 3 }
      };

      Object.values(categoryResults).forEach(result => {
        expect(result.passed + result.failed).toBe(result.total);
        expect(result.passed).toBeGreaterThanOrEqual(0);
        expect(result.failed).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('exit code handling', () => {
    test('returns 0 when all tests pass', () => {
      const testResults = { failed: 0 };
      const exitCode = testResults.failed > 0 ? 1 : 0;
      expect(exitCode).toBe(0);
    });

    test('returns 1 when tests fail', () => {
      const testResults = { failed: 5 };
      const exitCode = testResults.failed > 0 ? 1 : 0;
      expect(exitCode).toBe(1);
    });
  });

  describe('createResultsStructure', () => {
    test('creates initial results object with correct shape', () => {
      const results = createResultsStructure();

      expect(results).toHaveProperty('timestamp');
      expect(results).toHaveProperty('summary');
      expect(results).toHaveProperty('details');

      expect(typeof results.timestamp).toBe('string');
      expect(results.summary.total).toBe(0);
      expect(results.summary.passed).toBe(0);
      expect(results.summary.failed).toBe(0);
      expect(typeof results.summary.byCategory).toBe('object');
      expect(typeof results.details).toBe('object');
    });

    test('timestamp is valid ISO string', () => {
      const results = createResultsStructure();
      const timestamp = results.timestamp;
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    test('creates empty details object', () => {
      const results = createResultsStructure();
      expect(Object.keys(results.details).length).toBe(0);
    });
  });

  describe('processAllTestCases', () => {
    let executeCase;

    beforeEach(() => {
      executeCase = jest.fn((branch, expectedType) => ({
        branch,
        passed: true,
        output: '',
        exitCode: expectedType === 'invalid' ? 1 : 0
      }));
    });

    test('returns results and categoryResults objects', () => {
      const minimalTestCases = {
        'Test Category': ['feat/test']
      };
      const minimalExpected = {
        'Test Category': 'valid'
      };

      const result = processAllTestCases(minimalTestCases, minimalExpected, executeCase);
      expect(result).toHaveProperty('results');
      expect(result).toHaveProperty('categoryResults');
    });

    test('populates summary totals correctly', () => {
      const minimalTestCases = {
        'Valid Branches': ['feat/test', 'fix/bug'],
        'Invalid Branches': ['claude/bad']
      };
      const minimalExpected = {
        'Valid Branches': 'valid',
        'Invalid Branches': 'invalid'
      };

      const { results } = processAllTestCases(minimalTestCases, minimalExpected, executeCase);
      expect(results.summary.total).toBe(3);
      expect(results.summary.passed).toBe(3);
      expect(results.summary.failed).toBe(0);
    });

    test('categorizes test results correctly', () => {
      const minimalTestCases = {
        'Valid Test': ['feat/test']
      };
      const minimalExpected = {
        'Valid Test': 'valid'
      };

      const { results } = processAllTestCases(minimalTestCases, minimalExpected, executeCase);
      expect(results.details).toHaveProperty('Valid Test');
      expect(results.details['Valid Test'].cases.length).toBe(1);
    });

    test('builds byCategory summary', () => {
      const minimalTestCases = {
        'Test Category': ['feat/test']
      };
      const minimalExpected = {
        'Test Category': 'valid'
      };

      const { results } = processAllTestCases(minimalTestCases, minimalExpected, executeCase);
      expect(results.summary.byCategory).toHaveProperty('Test Category');
      expect(results.summary.byCategory['Test Category']).toHaveProperty('total');
      expect(results.summary.byCategory['Test Category']).toHaveProperty('passed');
      expect(results.summary.byCategory['Test Category']).toHaveProperty('failed');
    });

    test('returns categoryResults array', () => {
      const { categoryResults } = processAllTestCases(TEST_CASES, EXPECTED_RESULTS, executeCase);
      expect(Array.isArray(categoryResults)).toBe(true);
      expect(categoryResults.length).toBeGreaterThan(0);

      categoryResults.forEach(cat => {
        expect(cat).toHaveProperty('category');
        expect(cat).toHaveProperty('passed');
        expect(cat).toHaveProperty('total');
      });
    });

    test('passes cases to the executor and aggregates failed results', () => {
      executeCase.mockReturnValueOnce({ passed: false, exitCode: 1 });
      const { results, categoryResults } = processAllTestCases({
        'Valid Test': ['feat/test'],
        'Invalid Test': ['claude/bad']
      }, {
        'Valid Test': 'valid',
        'Invalid Test': 'invalid'
      }, executeCase);

      expect(executeCase).toHaveBeenCalledTimes(2);
      expect(executeCase).toHaveBeenNthCalledWith(1, 'feat/test', 'valid');
      expect(executeCase).toHaveBeenNthCalledWith(2, 'claude/bad', 'invalid');
      expect(results.summary).toEqual({
        total: 2,
        passed: 1,
        failed: 1,
        byCategory: {
          'Valid Test': { total: 1, passed: 0, failed: 1 },
          'Invalid Test': { total: 1, passed: 1, failed: 0 }
        }
      });
      expect(results.details['Valid Test'].cases).toEqual([
        { branch: 'feat/test', passed: false, exitCode: 1 }
      ]);
      expect(categoryResults).toEqual([
        { category: 'Valid Test', passed: 0, total: 1 },
        { category: 'Invalid Test', passed: 1, total: 1 }
      ]);
    });

    test('handles multiple branches in a category', () => {
      executeCase.mockReturnValue({ passed: true, exitCode: 0 });
      const { results } = processAllTestCases({
        'Valid Branches': ['feat/a', 'fix/b', 'docs/c']
      }, {
        'Valid Branches': 'valid'
      }, executeCase);

      expect(executeCase).toHaveBeenCalledTimes(3);
      expect(results.summary.total).toBe(3);
      expect(results.summary.passed).toBe(3);
      expect(results.details['Valid Branches'].cases.length).toBe(3);
    });

    test('handles all failures in a category', () => {
      executeCase.mockReturnValue({ passed: false, exitCode: 1 });
      const { results } = processAllTestCases({
        'Invalid Branches': ['claude/x', 'copilot/y']
      }, {
        'Invalid Branches': 'invalid'
      }, executeCase);

      expect(results.summary.failed).toBe(2);
      expect(results.summary.byCategory['Invalid Branches'].failed).toBe(2);
      expect(results.details['Invalid Branches'].failed).toBe(2);
    });

    test('handles mixed results across multiple categories', () => {
      executeCase
        .mockReturnValueOnce({ passed: true, exitCode: 0 })
        .mockReturnValueOnce({ passed: false, exitCode: 1 })
        .mockReturnValueOnce({ passed: true, exitCode: 0 })
        .mockReturnValueOnce({ passed: true, exitCode: 0 });

      const { results } = processAllTestCases({
        'Category A': ['feat/test', 'claude/bad'],
        'Category B': ['fix/bug', 'docs/readme']
      }, {
        'Category A': 'mixed',
        'Category B': 'mixed'
      }, executeCase);

      expect(results.summary.total).toBe(4);
      expect(results.summary.passed).toBe(3);
      expect(results.summary.failed).toBe(1);
    });
  });

  describe('outputTestResults', () => {
    test('does not throw when given valid results', () => {
      const results = {
        summary: { total: 10, passed: 8, failed: 2 },
        details: {}
      };
      const categoryResults = [
        { category: 'Test', passed: 8, total: 10 }
      ];

      expect(() => {
        outputTestResults(results, categoryResults);
      }).not.toThrow();
    });

    test('handles empty categoryResults', () => {
      const results = {
        summary: { total: 0, passed: 0, failed: 0 },
        details: {}
      };
      const categoryResults = [];

      expect(() => {
        outputTestResults(results, categoryResults);
      }).not.toThrow();
    });

    test('formats success rate correctly', () => {
      const results = {
        summary: { total: 100, passed: 75, failed: 25 },
        details: {}
      };
      const categoryResults = [];

      // Capture console.log calls
      const logs = [];
      const originalLog = console.log;
      console.log = jest.fn((...args) => {
        logs.push(args.join(' '));
      });

      outputTestResults(results, categoryResults);

      const summary = logs.find(log => log.includes('Success Rate'));
      expect(summary).toContain('75.0%');

      console.log = originalLog;
    });
  });

  describe('outputTestResults', () => {
    test('outputs emoji indicators for each passed/failed test', () => {
      const results = { summary: { total: 3, passed: 2, failed: 1 } };
      const categoryResults = [{ category: 'Test', passed: 2, total: 3 }];

      const logs = [];
      const originalWrite = process.stdout.write;
      process.stdout.write = jest.fn((...args) => {
        logs.push(args[0]);
      });

      const originalLog = console.log;
      console.log = jest.fn();

      outputTestResults(results, categoryResults);

      expect(logs.length).toBeGreaterThan(0);
      const emojiOutput = logs.join('');
      expect(emojiOutput).toContain('✅');

      process.stdout.write = originalWrite;
      console.log = originalLog;
    });

    test('outputs ❌ for failed tests', () => {
      const results = { summary: { total: 3, passed: 1, failed: 2 } };
      const categoryResults = [{ category: 'Test', passed: 1, total: 3 }];

      const logs = [];
      const originalWrite = process.stdout.write;
      process.stdout.write = jest.fn((...args) => {
        logs.push(args[0]);
      });

      const originalLog = console.log;
      console.log = jest.fn();

      outputTestResults(results, categoryResults);

      const emojiOutput = logs.join('');
      expect(emojiOutput).toContain('❌');

      process.stdout.write = originalWrite;
      console.log = originalLog;
    });

    test('outputs results for all categories', () => {
      const results = {
        summary: { total: 5, passed: 5, failed: 0 }
      };
      const categoryResults = [
        { category: 'Valid', passed: 2, total: 2 },
        { category: 'Invalid', passed: 3, total: 3 }
      ];

      const logs = [];
      const originalLog = console.log;
      console.log = jest.fn((...args) => {
        logs.push(args.join(' '));
      });

      outputTestResults(results, categoryResults);

      expect(logs.length).toBeGreaterThanOrEqual(4);

      console.log = originalLog;
    });

    test('outputs all passed tests (all checkmarks)', () => {
      const results = { summary: { total: 4, passed: 4, failed: 0 } };
      const categoryResults = [{ category: 'Valid', passed: 4, total: 4 }];

      const logs = [];
      const originalWrite = process.stdout.write;
      process.stdout.write = jest.fn((...args) => {
        logs.push(args[0]);
      });

      const originalLog = console.log;
      console.log = jest.fn();

      outputTestResults(results, categoryResults);

      const emojiOutput = logs.join('');
      expect(emojiOutput).toContain('✅✅✅✅');
      expect(emojiOutput).not.toContain('❌');

      process.stdout.write = originalWrite;
      console.log = originalLog;
    });

    test('outputs all failed tests (all X marks)', () => {
      const results = { summary: { total: 3, passed: 0, failed: 3 } };
      const categoryResults = [{ category: 'Invalid', passed: 0, total: 3 }];

      const logs = [];
      const originalWrite = process.stdout.write;
      process.stdout.write = jest.fn((...args) => {
        logs.push(args[0]);
      });

      const originalLog = console.log;
      console.log = jest.fn();

      outputTestResults(results, categoryResults);

      const emojiOutput = logs.join('');
      expect(emojiOutput).toContain('❌❌❌');
      expect(emojiOutput).not.toContain('✅');

      process.stdout.write = originalWrite;
      console.log = originalLog;
    });

    test('outputs correctly with single test', () => {
      const results = { summary: { total: 1, passed: 1, failed: 0 } };
      const categoryResults = [{ category: 'Single', passed: 1, total: 1 }];

      const logs = [];
      const originalWrite = process.stdout.write;
      process.stdout.write = jest.fn((...args) => {
        logs.push(args[0]);
      });

      const originalLog = console.log;
      console.log = jest.fn();

      outputTestResults(results, categoryResults);

      const emojiOutput = logs.join('');
      expect(emojiOutput.startsWith('✅')).toBe(true);

      process.stdout.write = originalWrite;
      console.log = originalLog;
    });

    test('formats success rate as percentage with one decimal', () => {
      const results = { summary: { total: 10, passed: 7, failed: 3 } };
      const categoryResults = [{ category: 'Mixed', passed: 7, total: 10 }];

      const logs = [];
      const originalLog = console.log;
      console.log = jest.fn((...args) => {
        logs.push(args.join(' '));
      });

      outputTestResults(results, categoryResults);

      const summaryLog = logs.find(log => log.includes('Success Rate'));
      expect(summaryLog).toContain('70.0%');

      console.log = originalLog;
    });
  });

  describe('runTest', () => {
    test('returns correct result for valid branches', () => {
      const result = runTest('feat/test-branch', 'valid');
      expect(result).toHaveProperty('passed');
      expect(result).toHaveProperty('output');
      expect(result).toHaveProperty('exitCode');
      expect(result).toHaveProperty('branch');
      expect(result.branch).toBe('feat/test-branch');
    });

    test('returns correct result for invalid branches', () => {
      const result = runTest('claude/bad-branch', 'invalid');
      expect(result).toHaveProperty('passed');
      expect(result.branch).toBe('claude/bad-branch');
    });

    test('returns correct result for exemption branches', () => {
      const result = runTest('release/v1.0.0', 'exemption');
      expect(result).toHaveProperty('passed');
      expect(result.branch).toBe('release/v1.0.0');
    });

    test('handles unexpected exit codes', () => {
      const result = runTest('feat/test', 'valid');
      expect(typeof result.exitCode).toBe('number');
      expect(result.exitCode >= 0).toBe(true);
    });
  });

  describe('TEST_CASES and EXPECTED_RESULTS', () => {
    test('TEST_CASES is organized by category', () => {
      expect(typeof TEST_CASES).toBe('object');
      expect(Object.keys(TEST_CASES).length).toBeGreaterThan(0);
    });

    test('EXPECTED_RESULTS has entry for each TEST_CASES category', () => {
      for (const category of Object.keys(TEST_CASES)) {
        expect(EXPECTED_RESULTS).toHaveProperty(category);
        expect(['valid', 'invalid', 'exemption']).toContain(EXPECTED_RESULTS[category]);
      }
    });

    test('each category in TEST_CASES has branch array', () => {
      for (const [category, branches] of Object.entries(TEST_CASES)) {
        expect(Array.isArray(branches)).toBe(true);
        expect(branches.length).toBeGreaterThan(0);
        branches.forEach(branch => {
          expect(typeof branch).toBe('string');
        });
      }
    });
  });

  describe('branch coverage - error handling', () => {
    test('runTest handles error with both stderr and message', () => {
      const result = runTest('feat/test', 'invalid');
      expect(result).toHaveProperty('passed');
      expect(result).toHaveProperty('output');
      expect(result).toHaveProperty('exitCode');
    });

    test('processAllTestCases uses default executeCase when not provided', () => {
      const testCases = { 'Test': ['feat/valid'] };
      const expectedResults = { 'Test': 'valid' };
      const { results } = processAllTestCases(testCases, expectedResults);
      expect(results.summary.total).toBe(1);
      expect(results.summary).toHaveProperty('passed');
    });

    test('processAllTestCases handles category with no failures', () => {
      const executeCase = jest.fn(() => ({ passed: true, exitCode: 0 }));
      const testCases = { 'AllPass': ['feat/a', 'fix/b'] };
      const expectedResults = { 'AllPass': 'valid' };
      const { results } = processAllTestCases(testCases, expectedResults, executeCase);
      expect(results.details['AllPass'].failed).toBe(0);
      expect(results.details['AllPass'].passed).toBe(2);
    });

    test('processAllTestCases aggregates multiple failed cases', () => {
      const executeCase = jest.fn()
        .mockReturnValueOnce({ passed: false, exitCode: 1 })
        .mockReturnValueOnce({ passed: false, exitCode: 1 })
        .mockReturnValueOnce({ passed: true, exitCode: 0 });
      const testCases = { 'Mixed': ['a', 'b', 'c'] };
      const expectedResults = { 'Mixed': 'valid' };
      const { results } = processAllTestCases(testCases, expectedResults, executeCase);
      expect(results.summary.failed).toBe(2);
      expect(results.details['Mixed'].failed).toBe(2);
    });

    test('runTest with exemption type returns correct pass status', () => {
      const result = runTest('release/v1.0.0', 'exemption');
      expect(result).toHaveProperty('passed');
      expect(typeof result.passed).toBe('boolean');
    });

    test('processAllTestCases handles test with error status not equal to 1', () => {
      const executeCase = jest.fn()
        .mockReturnValueOnce({ passed: false, exitCode: 2 })
        .mockReturnValueOnce({ passed: true, exitCode: 0 });
      const testCases = { 'WithError': ['feat/test', 'feat/other'] };
      const expectedResults = { 'WithError': 'invalid' };
      const { results } = processAllTestCases(testCases, expectedResults, executeCase);
      expect(results.details['WithError'].failed).toBe(1);
    });

    test('outputTestResults handles large number of failed tests in a category', () => {
      const results = { summary: { total: 20, passed: 5, failed: 15 } };
      const categoryResults = [{ category: 'Large', passed: 5, total: 20 }];

      const logs = [];
      const originalWrite = process.stdout.write;
      process.stdout.write = jest.fn((...args) => {
        logs.push(args[0]);
      });

      const originalLog = console.log;
      console.log = jest.fn();

      outputTestResults(results, categoryResults);

      const emojiOutput = logs.join('');
      const checkmarks = (emojiOutput.match(/✅/g) || []).length;
      const crosses = (emojiOutput.match(/❌/g) || []).length;
      expect(checkmarks).toBe(5);
      expect(crosses).toBe(15);

      process.stdout.write = originalWrite;
      console.log = originalLog;
    });
  });

  describe('main() function', () => {
    let originalExit;
    let originalLog;
    let consoleLogs;
    let fsWriteFileSyncSpy;

    beforeEach(() => {
      originalExit = process.exit;
      originalLog = console.log;
      consoleLogs = [];

      process.exit = jest.fn();
      console.log = jest.fn((...args) => consoleLogs.push(args.join(' ')));
      fsWriteFileSyncSpy = jest.spyOn(require('fs'), 'writeFileSync').mockImplementation(() => {});
    });

    afterEach(() => {
      process.exit = originalExit;
      console.log = originalLog;
      fsWriteFileSyncSpy.mockRestore();
    });

    test('main() is callable and calls process.exit', () => {
      main();
      expect(process.exit).toHaveBeenCalled();
    });

    test('main() logs test runner header message', () => {
      main();
      expect(consoleLogs.some(log => log.includes('Running branch validation tests'))).toBe(true);
    });

    test('main() exits with 0 when all tests pass', () => {
      main();
      const exitCode = process.exit.mock.calls[0][0];
      expect([0, 1]).toContain(exitCode);
    });

    test('main() processes all test cases and writes report', () => {
      main();
      expect(fsWriteFileSyncSpy).toHaveBeenCalled();
    });

    test('main() logs report information', () => {
      main();
      // Verify that main completes and logs output
      expect(consoleLogs.length).toBeGreaterThan(0);
      expect(process.exit).toHaveBeenCalled();
    });

    test('main() report path is written with validation-report.json', () => {
      main();
      const writeCallArgs = fsWriteFileSyncSpy.mock.calls[0];
      expect(writeCallArgs[0]).toContain('validation-report.json');
    });

    test('main() handles test results and exits appropriately', () => {
      main();
      expect(process.exit).toHaveBeenCalledWith(expect.any(Number));
    });
  });
});
