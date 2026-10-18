#!/usr/bin/env node

/**
 * PR Template Router
 * Routes PR templates and applies labels based on branch name prefix
 * Outputs JSON with template path and labels array
 */

const branchName = process.argv[2];

if (!branchName) {
  console.error('Error: Branch name required');
  process.exit(1);
}

// Extract the type prefix from branch name (e.g., "feat/my-feature" -> "feat")
const typeMatch = branchName.match(/^([a-z]+)\//);
const branchType = typeMatch ? typeMatch[1] : 'task';

// Map branch types to PR templates and default labels
const typeMap = {
  feat: {
    template: '.github/PULL_REQUEST_TEMPLATE/feat.md',
    labels: ['type:feature']
  },
  fix: {
    template: '.github/PULL_REQUEST_TEMPLATE/fix.md',
    labels: ['type:bug']
  },
  docs: {
    template: '.github/PULL_REQUEST_TEMPLATE/docs.md',
    labels: ['type:documentation']
  },
  doc: {
    template: '.github/PULL_REQUEST_TEMPLATE/docs.md',
    labels: ['type:documentation']
  },
  design: {
    template: '.github/PULL_REQUEST_TEMPLATE/design.md',
    labels: ['type:design']
  },
  test: {
    template: '.github/PULL_REQUEST_TEMPLATE/test.md',
    labels: ['type:test']
  },
  refactor: {
    template: '.github/PULL_REQUEST_TEMPLATE/refactor.md',
    labels: ['type:refactor']
  },
  perf: {
    template: '.github/PULL_REQUEST_TEMPLATE/perf.md',
    labels: ['type:performance']
  },
  security: {
    template: '.github/PULL_REQUEST_TEMPLATE/security.md',
    labels: ['type:security']
  },
  chore: {
    template: '.github/PULL_REQUEST_TEMPLATE/chore.md',
    labels: ['type:chore']
  },
  ci: {
    template: '.github/PULL_REQUEST_TEMPLATE/ci.md',
    labels: ['type:ci', 'area:ci']
  },
  hotfix: {
    template: '.github/PULL_REQUEST_TEMPLATE/fix.md',
    labels: ['type:hotfix']
  }
};

const config = typeMap[branchType] || typeMap.task || {
  template: '.github/PULL_REQUEST_TEMPLATE/default.md',
  labels: ['type:task']
};

// Output JSON that GitHub Actions can parse
const output = {
  template: config.template,
  labels: config.labels,
  branch_type: branchType
};

console.log(JSON.stringify(output));
