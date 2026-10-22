import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from '@jest/globals';

// Exercise the actual github-script step without credentials or network access.
const workflow = readFileSync(new URL('../.github/workflows/protected-files-guard.yml', import.meta.url), 'utf8');
const script = workflow.split('          script: |\n')[1].replace(/^ {12}/gm, '');
const runScript = new (Object.getPrototypeOf(async function () {}).constructor)('github', 'context', 'core', script);
const directory = '.github/specs/001-repo-governance-layout-and-agentic-workflows/';
const files = [directory + 'COMPLETION.md', directory + 'tasks.md'];
const reference = 'https://github.com/lightspeedwp/.github/issues/3975';
const prUrl = 'https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/429';

function approval(overrides = {}) {
  return {
    title: '[PROTECTED-FILE-CHANGE-REQUEST] Specification updates',
    body: `PR: ${prUrl}\nFiles in \`ThisOneTimeOnAcidCom/${directory}\`:\n### 1. **COMPLETION.md** (NEW)\n### 2. **tasks.md** (UPDATED)\n\nI approve the changes to these protected specification files.`,
    user: { login: 'ashleyshaw' },
    updated_at: '2026-10-22T08:00:00Z',
    html_url: reference,
    ...overrides,
  };
}

async function check({ changed = files.map(filename => ({ filename })), changedCount = changed.length,
  body = reference, issue = approval(), comments = [], lookupError = false } = {}) {
  const failures = [];
  const calls = [];
  const github = {
    rest: { pulls: { listFiles: 'files' }, issues: { get: async args => {
      calls.push(args);
      if (lookupError) throw new Error('Issue unavailable');
      return { data: issue };
    }, listComments: 'comments' } },
    paginate: async endpoint => endpoint === 'files' ? changed : comments,
  };
  const context = {
    repo: { owner: 'lightspeedwp', repo: 'ThisOneTimeOnAcidCom' },
    payload: { pull_request: { number: 429, changed_files: changedCount, body } },
  };
  await runScript(github, context, { info() {}, warning() {}, setFailed(message) { failures.push(message); } });
  return { ok: failures.length === 0, failures, calls };
}

test('accepts owner-authored approval with the directory and bold filename headings used by #3975', async () => {
  assert.equal((await check()).ok, true);
});

test('accepts explicit full paths and a subsequent owner approval comment', async () => {
  const issue = approval({ user: { login: 'contributor' }, body: `PR: ${prUrl}\n${files.map(file => '`' + file + '`').join('\n')}` });
  const comments = [{ user: { login: 'ashley' }, body: 'Approved.', created_at: '2026-10-22T09:00:00Z' }];
  assert.equal((await check({ issue, comments })).ok, true);
});

test('passes unprotected changes without consulting approvals', async () => {
  const result = await check({ changed: [{ filename: 'docs/example.md' }], lookupError: true });
  assert.equal(result.ok, true);
  assert.equal(result.calls.length, 0);
});

for (const [name, options] of [
  ['missing reference', { body: '' }],
  ['reference to another repository', { body: 'https://github.com/other/.github/issues/3975' }],
  ['lookalike issue URL', { body: reference + 'suffix' }],
  ['lookup failure', { lookupError: true }],
  ['ordinary issue', { issue: approval({ title: 'Please change files' }) }],
  ['pull request used as issue', { issue: approval({ pull_request: {} }) }],
  ['non-owner approval', { issue: approval({ user: { login: 'contributor' } }) }],
  ['no approval statement', { issue: approval({ body: `PR: ${prUrl}\n\`${directory}\` \`COMPLETION.md\` \`tasks.md\`\nApproval pending.` }) }],
  ['another PR', { issue: approval({ body: approval().body.replace('/pull/429', '/pull/430') }) }],
  ['PR number prefix collision', { issue: approval({ body: approval().body.replace('/pull/429', '/pull/4290') }) }],
  ['another repository PR', { issue: approval({ body: approval().body.replace('ThisOneTimeOnAcidCom/pull', 'other/pull') }) }],
  ['unlisted protected file', { changed: [{ filename: '.github/workflows/protected-files-guard.yml' }] }],
  ['directory-only approval', { issue: approval({ body: `PR: ${prUrl}\n\`${directory}\`\nI approve these changes.` }) }],
  ['non-owner comment', { issue: approval({ user: { login: 'contributor' } }), comments: [{ user: { login: 'contributor' }, body: 'Approved.', created_at: '2026-10-22T09:00:00Z' }] }],
  ['approval before scope edit', { issue: approval({ user: { login: 'contributor' } }), comments: [{ user: { login: 'ashleyshaw' }, body: 'Approved.', created_at: '2026-10-22T07:00:00Z' }] }],
]) {
  test('rejects ' + name, async () => assert.equal((await check(options)).ok, false));
}

test('requires approval for both old and new paths of a renamed protected file', async () => {
  const result = await check({ changed: [{ filename: 'docs/tasks.md', previous_filename: files[1] }], body: '' });
  assert.equal(result.ok, false);
  assert.match(result.failures[0], /\.github\/specs/);
});

test('rejects a truncated file list even when all returned files are approved', async () => {
  assert.equal((await check({ changedCount: 3001 })).ok, false);
});

test('does not execute filenames or PR body as code', async () => {
  const result = await check({ changed: [{ filename: '.github/`throw new Error("injected")`' }], body: '${{ throw new Error("injected") }}' });
  assert.equal(result.ok, false);
  assert.match(result.failures[0], /Owner approval required/);
});
