/**
 * Jest test runner configuration for ThisOneTimeOnAcidCom.
 * Validates branch names, validates scripts, and runs test suites.
 *
 * ESM Configuration:
 * - Package type is "module" (ESM) → Jest auto-detects ESM files (.js treated as ESM)
 * - @swc/jest transformer: handles ESM import/export syntax and async/await
 * - Requires Node.js >=24 for stable ESM support (via engines field in package.json)
 * - Test files use import syntax natively; Jest compiles via @swc/jest
 */

export default {
  testEnvironment: 'node',
  testMatch: ['**/scripts/**/*.test.js'],
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': ['@swc/jest'],
  },
  collectCoverageFrom: [
    'scripts/**/*.js',
    '!scripts/**/*.test.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
