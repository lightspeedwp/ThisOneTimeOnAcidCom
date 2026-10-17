/**
 * Unit tests for common.sh and integration tests for the five Spec Kit CLIs.
 * Intended command: node --test tests/speckit.test.mjs
 * Requires Bash and standard Unix utilities; registry cases need Python 3,
 * and preset composition cases need PyYAML, as required by common.sh itself.
 * Every write is confined to a temporary project, removed by test teardown.
 */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';

const scripts = fileURLToPath(new URL('../.specify/scripts/bash/', import.meta.url));
const commonPath = join(scripts, 'common.sh');

function fixture(t) {
  // Spaces and apostrophes exercise shell quoting in every fixture.
  const root = mkdtempSync(join(tmpdir(), "speckit user's project-"));
  t.after(function () { rmSync(root, { recursive: true, force: true }); });
  mkdirSync(join(root, '.specify'));
  const env = Object.fromEntries(Object.entries(process.env).filter(function ([key]) {
    return !/^(SPECIFY_|SPECKIT_|GIT_|BASH_ENV$|ENV$|CDPATH$)/.test(key);
  }));
  env.SPECIFY_INIT_DIR = root;
  env.LC_ALL = 'C';

  function run(args, overrides = {}) {
    const result = spawnSync('bash', ['--noprofile', '--norc', ...args], {
      cwd: root,
      env: { ...env, ...overrides },
      encoding: 'utf8',
      timeout: 5000,
      maxBuffer: 1024 * 1024,
    });
    assert.ifError(result.error);
    assert.equal(result.signal, null, 'Script was terminated: ' + result.stderr);
    return result;
  }

  return {
    root,
    path(relative) { return join(root, relative); },
    write(relative, content) {
      const path = join(root, relative);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, content);
      return path;
    },
    read(relative) { return readFileSync(join(root, relative), 'utf8'); },
    mkdir(relative) { mkdirSync(join(root, relative), { recursive: true }); },
    exists(relative) { return existsSync(join(root, relative)); },
    cli(name, args = [], overrides = {}) {
      return run([join(scripts, name + '.sh'), ...args], overrides);
    },
    common(body, args = [], overrides = {}) {
      return run(['-c', 'set -e\nsource "$1"\nshift\n' + body, 'speckit-test', commonPath, ...args], overrides);
    },
  };
}

function success(result) {
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout;
}

function json(result) { return JSON.parse(success(result)); }

function failure(result, message, status = 1) {
  assert.equal(result.status, status, result.stderr || result.stdout);
  assert.match(result.stderr, message);
}

function feature(f, documents = ['spec.md', 'plan.md']) {
  f.mkdir('specs/001-example');
  documents.forEach(function (name) { f.write('specs/001-example/' + name, '# ' + name + '\n'); });
  f.write('.specify/feature.json', JSON.stringify({ feature_directory: 'specs/001-example' }));
  return f.path('specs/001-example');
}

function preset(f, strategy, content, options = {}) {
  const id = options.id || 'custom';
  const name = options.name || 'plan-template';
  const file = options.file || 'templates/' + name + '.md';
  // JSON is also valid YAML, avoiding an additional YAML library in the tests.
  f.write('.specify/presets/' + id + '/preset.yml', JSON.stringify({
    provides: { templates: [{ type: 'template', name, file, strategy }] },
  }));
  f.write('.specify/presets/' + id + '/' + file, content);
}

describe('common.sh: project and feature resolution', function () {
  it('finds the nearest nested project marker', function (t) {
    const f = fixture(t);
    f.mkdir('member/.specify');
    f.mkdir('member/src/deep');
    const result = f.common('find_specify_root "$1"', [f.path('member/src/deep')]);
    assert.equal(success(result).trim(), f.path('member'));
  });

  it('honors an explicit project even when cwd has a different marker', function (t) {
    const f = fixture(t);
    f.mkdir('member/.specify');
    assert.equal(success(f.common('get_repo_root', [], { SPECIFY_INIT_DIR: 'member/' })).trim(), f.path('member'));
  });

  ['missing', 'not-a-project'].forEach(function (path) {
    it('rejects an invalid project override: ' + path, function (t) {
      const f = fixture(t);
      f.mkdir('not-a-project');
      failure(f.common('get_repo_root', [], { SPECIFY_INIT_DIR: path }), /SPECIFY_INIT_DIR/);
    });
  });

  it('uses cwd discovery when the project override is unset', function (t) {
    const f = fixture(t);
    f.mkdir('nested/deep');
    assert.equal(success(f.common('cd "$1"\nget_repo_root', [f.path('nested/deep')], {
      SPECIFY_INIT_DIR: '',
    })).trim(), f.root);
  });

  it('fails when no explicit or persisted feature directory exists', function (t) {
    const f = fixture(t);
    failure(f.common('get_feature_paths'), /Feature directory not found/);
    // A branch label alone is not sufficient feature context.
    failure(f.common('get_feature_paths', [], { SPECIFY_FEATURE: '001-example' }), /Feature directory not found/);
  });

  it('round trips shell metacharacters without evaluating them', function (t) {
    const f = fixture(t);
    const directory = 'specs/001-$(touch INJECTED); "quoted"';
    const result = f.common('paths=$(get_feature_paths --no-persist)\neval "$paths"\nprintf "%s\\n%s\\n%s" "$FEATURE_DIR" "$CURRENT_BRANCH" "$TASKS"', [], {
      SPECIFY_FEATURE_DIRECTORY: directory,
      SPECIFY_FEATURE: 'label; $(touch INJECTED)',
    });
    assert.equal(success(result), [f.path(directory), 'label; $(touch INJECTED)', f.path(directory + '/tasks.md')].join('\n'));
    assert.equal(f.exists('INJECTED'), false);
    assert.equal(f.exists('.specify/feature.json'), false);
  });

  it('prefers an explicit directory, persists it relatively, and resolves it in the next process', function (t) {
    const f = fixture(t);
    feature(f);
    const directory = f.path('specs/002-new');
    success(f.common('get_feature_paths', [], { SPECIFY_FEATURE_DIRECTORY: directory }));
    assert.deepEqual(JSON.parse(f.read('.specify/feature.json')), { feature_directory: 'specs/002-new' });
    const paths = json(f.cli('check-prerequisites', ['--paths-only', '--json']));
    assert.equal(paths.FEATURE_DIR, directory);
    assert.equal(paths.BRANCH, '002-new');
    assert.equal(paths.FEATURE_SPEC, directory + '/spec.md');
    assert.equal(paths.IMPL_PLAN, directory + '/plan.md');
    assert.equal(paths.TASKS, directory + '/tasks.md');
    assert.equal(paths.REPO_ROOT, f.root);
  });

  it('preserves absolute feature paths outside the project', function (t) {
    const f = fixture(t);
    const outside = fixture(t);
    const directory = outside.path('external-feature');
    const paths = json(f.cli('check-prerequisites', ['--paths-only', '--json'], {
      SPECIFY_FEATURE_DIRECTORY: directory,
    }));
    assert.equal(paths.FEATURE_DIR, directory);
    assert.equal(paths.BRANCH, 'external-feature');
    assert.equal(outside.exists('external-feature'), false);
  });

  ['1', 'true'].forEach(function (flag) {
    it('does not overwrite feature state with SPECIFY_FEATURE_NO_PERSIST=' + flag, function (t) {
      const f = fixture(t);
      feature(f);
      const original = f.read('.specify/feature.json');
      success(f.common('get_feature_paths', [], {
        SPECIFY_FEATURE_DIRECTORY: 'specs/002-other', SPECIFY_FEATURE_NO_PERSIST: flag,
      }));
      assert.equal(f.read('.specify/feature.json'), original);
    });
  });

  it('does not rewrite an unchanged feature.json, preserving unrelated metadata', function (t) {
    const f = fixture(t);
    const original = '{\n  "feature_directory": "specs/001-example",\n  "note": "keep"\n}\n';
    f.write('.specify/feature.json', original);
    success(f.common('get_feature_paths', [], { SPECIFY_FEATURE_DIRECTORY: 'specs/001-example' }));
    assert.equal(f.read('.specify/feature.json'), original);
  });

  ['', '{}', 'not JSON'].forEach(function (content) {
    it('reports unusable feature state: ' + JSON.stringify(content), function (t) {
      const f = fixture(t);
      f.write('.specify/feature.json', content);
      failure(f.common('get_feature_paths'), /Feature directory not found/);
    });
  });

  it('falls back to Python when an available jq command fails', function (t) {
    const f = fixture(t);
    feature(f);
    const result = f.common('jq() { return 49; }\nread_feature_json_feature_directory "$SPECIFY_INIT_DIR"');
    assert.equal(success(result), 'specs/001-example');
  });

  it('falls back to text parsing when both available JSON parsers fail', function (t) {
    const f = fixture(t);
    feature(f);
    const result = f.common('jq() { return 49; }\npython3() { return 49; }\nread_feature_json_feature_directory "$SPECIFY_INIT_DIR"');
    assert.equal(success(result), 'specs/001-example');
  });
});

describe('common.sh: JSON escaping and command formatting', function () {
  ['', 'quotes " and \\ and /', 'café 東京', '\n\r\t\b\f',
    Array.from({ length: 31 }, function (_, index) { return String.fromCharCode(index + 1); }).join(''),
  ].forEach(function (value, index) {
    it('round trips JSON string case ' + index, function (t) {
      const f = fixture(t);
      const escaped = success(f.common('json_escape "$1"', [value]));
      assert.equal(JSON.parse('"' + escaped + '"'), value);
    });
  });

  ['.', '-'].forEach(function (separator) {
    ['plan', '/speckit.plan', 'speckit-plan', 'speckit.tasks.extra'].forEach(function (name) {
      it('formats ' + name + ' with separator ' + separator, function (t) {
        const f = fixture(t);
        f.write('.specify/integration.json', JSON.stringify({
          default_integration: 'custom', integration_settings: { custom: { invoke_separator: separator } },
        }));
        const command = name.includes('extra') ? ['tasks', 'extra'].join(separator) : 'plan';
        assert.equal(success(f.common('format_speckit_command "$1"', [name])).trim(), '/speckit' + separator + command);
      });
    });
  });

  it('defaults to a dot when configuration is missing or has an invalid separator', function (t) {
    const f = fixture(t);
    assert.equal(success(f.common('format_speckit_command plan')).trim(), '/speckit.plan');
    f.write('.specify/integration.json', JSON.stringify({
      integration: 'custom', integration_settings: { custom: { invoke_separator: '/' } },
    }));
    assert.equal(success(f.common('format_speckit_command plan')).trim(), '/speckit.plan');
  });

  it('uses the legacy integration key even when both JSON parsers fail', function (t) {
    const f = fixture(t);
    f.write('.specify/integration.json', JSON.stringify({
      integration: 'custom', integration_settings: { custom: { invoke_separator: '-' } },
    }, null, 2));
    assert.equal(success(f.common('jq() { return 49; }\npython3() { return 49; }\nformat_speckit_command plan')).trim(), '/speckit-plan');
  });
});

describe('template resolution', function () {
  it('resolves core, extension, preset, then project override precedence', function (t) {
    const f = fixture(t);
    const layers = [
      '.specify/templates/plan-template.md',
      '.specify/extensions/custom/templates/plan-template.md',
      '.specify/presets/custom/templates/plan-template.md',
      '.specify/templates/overrides/plan-template.md',
    ];
    layers.forEach(function (path, index) {
      const content = 'Layer ' + index + '\n\n';
      f.write(path, content);
      assert.equal(success(f.common('resolve_template plan-template "$SPECIFY_INIT_DIR"')).trim(), f.path(path));
      const result = json(f.cli('resolve-template', ['plan-template', '--json']));
      assert.deepEqual(result, { TEMPLATE_NAME: 'plan-template', TEMPLATE_CONTENT: content });
    });
  });

  it('accepts legacy extension and preset template locations', function (t) {
    const f = fixture(t);
    f.write('.specify/extensions/custom/plan-template.md', 'Extension');
    assert.equal(success(f.cli('resolve-template', ['plan-template'])), 'Extension');
    f.write('.specify/presets/custom/plan-template.md', 'Preset');
    assert.equal(success(f.cli('resolve-template', ['plan-template'])), 'Preset');
  });

  ['', '../secret', 'plan-template.md', '/tmp/secret', 'Plan-template'].forEach(function (name) {
    it('rejects invalid template names: ' + JSON.stringify(name), function (t) {
      const f = fixture(t);
      f.write('.specify/secret.md', 'Must not escape templates');
      assert.equal(f.common('resolve_template_content "$1" "$SPECIFY_INIT_DIR"', [name]).status, 1);
      assert.equal(f.common('resolve_template "$1" "$SPECIFY_INIT_DIR"', [name]).status, 1);
    });
  });

  it('reports a missing template without outputting a successful JSON payload', function (t) {
    const f = fixture(t);
    const result = f.cli('resolve-template', ['missing-template', '--json']);
    failure(result, /Could not resolve required missing-template/);
    assert.equal(result.stdout, '');
  });

  ['presets', 'extensions'].forEach(function (kind) {
    it('orders ' + kind + ' by priority then ID, excluding disabled entries', function (t) {
      const f = fixture(t);
      ['disabled', 'z-first', 'a-tie', 'b-tie'].forEach(function (id) {
        f.write('.specify/' + kind + '/' + id + '/templates/plan-template.md', id);
      });
      f.write('.specify/' + kind + '/.registry', JSON.stringify({
        [kind]: {
          disabled: { priority: 1, enabled: false },
          'z-first': { priority: 2 }, 'b-tie': { priority: 3 }, 'a-tie': { priority: 3 },
        },
      }));
      assert.equal(success(f.cli('resolve-template', ['plan-template'])), 'z-first');
      rmSync(f.path('.specify/' + kind + '/z-first/templates/plan-template.md'));
      assert.equal(success(f.cli('resolve-template', ['plan-template'])), 'a-tie');
    });
  });

  it('fails closed on an invalid extension registry instead of using the core', function (t) {
    const f = fixture(t);
    f.write('.specify/extensions/.registry', '{bad json');
    f.write('.specify/templates/plan-template.md', 'Core');
    failure(f.common('resolve_template_content plan-template "$SPECIFY_INIT_DIR"'), /invalid extension registry/, 2);
    failure(f.common('resolve_template plan-template "$SPECIFY_INIT_DIR"'), /invalid extension registry/, 2);
  });

  it('lets a project override bypass a broken lower-priority registry', function (t) {
    const f = fixture(t);
    f.write('.specify/extensions/.registry', '{bad json');
    f.write('.specify/templates/overrides/plan-template.md', 'Override\n');
    assert.equal(success(f.cli('resolve-template', ['plan-template'])), 'Override\n');
  });

  const compositions = [
    { strategy: 'replace', layer: 'Replacement\n', expected: 'Replacement\n' },
    { strategy: 'prepend', layer: 'Before\n', expected: 'Before\n\n\nCore\n\n' },
    { strategy: 'append', layer: 'After\n', expected: 'Core\n\n\n\nAfter\n' },
    { strategy: 'wrap', layer: 'Before {CORE_TEMPLATE} after\n', expected: 'Before Core\n\n after\n' },
  ];
  compositions.forEach(function ({ strategy, layer, expected }) {
    it('composes ' + strategy + ' while preserving trailing newlines', function (t) {
      const f = fixture(t);
      f.write('.specify/templates/plan-template.md', 'Core\n\n');
      preset(f, strategy, layer);
      assert.equal(json(f.cli('resolve-template', ['plan-template', '--json'])).TEMPLATE_CONTENT, expected);
    });
  });

  it('composes multiple layers in declared priority order', function (t) {
    const f = fixture(t);
    f.write('.specify/templates/plan-template.md', 'Core');
    preset(f, 'wrap', '[{CORE_TEMPLATE}]', { id: 'outer' });
    preset(f, 'append', 'Tail', { id: 'inner' });
    f.write('.specify/presets/.registry', JSON.stringify({
      presets: { outer: { priority: 1 }, inner: { priority: 2 } },
    }));
    assert.equal(success(f.cli('resolve-template', ['plan-template'])), '[Core\n\nTail]');
  });

  it('substitutes each original wrap placeholder once without rescanning inserted content', function (t) {
    const f = fixture(t);
    f.write('.specify/templates/plan-template.md', 'literal {CORE_TEMPLATE}');
    preset(f, 'wrap', 'A{CORE_TEMPLATE}B{CORE_TEMPLATE}C');
    assert.equal(success(f.cli('resolve-template', ['plan-template'])),
      'Aliteral {CORE_TEMPLATE}Bliteral {CORE_TEMPLATE}C');
  });

  it('rejects a wrap layer without a placeholder', function (t) {
    const f = fixture(t);
    f.write('.specify/templates/plan-template.md', 'Core');
    preset(f, 'wrap', 'No placeholder');
    failure(f.common('resolve_template_content plan-template "$SPECIFY_INIT_DIR"'), /missing \{CORE_TEMPLATE\}/, 2);
  });

  it('rejects composition without a replacement base', function (t) {
    const f = fixture(t);
    preset(f, 'append', 'Tail');
    failure(f.common('resolve_template_content plan-template "$SPECIFY_INIT_DIR"'), /no replace base/, 2);
  });

  it('rejects an invalid manifest strategy', function (t) {
    const f = fixture(t);
    preset(f, 'invalid-strategy', 'Layer');
    failure(f.common('resolve_template_content plan-template "$SPECIFY_INIT_DIR"'), /invalid preset manifest/, 2);
  });

  it('does not read a manifest file outside its preset', function (t) {
    const f = fixture(t);
    f.write('.specify/templates/plan-template.md', 'Core');
    preset(f, 'replace', 'Outside content', { file: '../outside.md' });
    assert.equal(success(f.cli('resolve-template', ['plan-template'])), 'Core');
  });
});

describe('create-new-feature.sh', function () {
  const dryRun = ['--dry-run', '--json'];

  it('computes a dry run without creating specs or persisted state', function (t) {
    const f = fixture(t);
    const result = json(f.cli('create-new-feature', [...dryRun, 'Add user authentication']));
    assert.deepEqual(result, {
      BRANCH_NAME: '001-user-authentication', FEATURE_NUM: '001',
      SPEC_FILE: f.path('specs/001-user-authentication/spec.md'), DRY_RUN: true,
    });
    assert.equal(f.exists('specs'), false);
    assert.equal(f.exists('.specify/feature.json'), false);
  });

  const names = [
    { description: 'Add an API for UI', suffix: 'api-ui' },
    { description: 'the to for', suffix: 'the-to-for' },
    { description: 'Build fast search results', suffix: 'build-fast-search-results' },
    { description: 'Build fast search results today', suffix: 'build-fast-search' },
  ];
  names.forEach(function ({ description, suffix }) {
    it('generates a meaningful name for ' + description, function (t) {
      const f = fixture(t);
      assert.equal(json(f.cli('create-new-feature', [...dryRun, description])).BRANCH_NAME, '001-' + suffix);
    });
  });

  it('normalizes a short name and interprets a zero-padded number as decimal', function (t) {
    const f = fixture(t);
    const result = json(f.cli('create-new-feature', [...dryRun, '--number', '010', '--short-name', ' User__AUTH!! ', 'Description']));
    assert.equal(result.BRANCH_NAME, '010-user-auth');
    assert.equal(result.FEATURE_NUM, '010');
  });

  it('strips non-ASCII characters from short names deterministically', function (t) {
    const f = fixture(t);
    assert.equal(json(f.cli('create-new-feature', [...dryRun, '--short-name', 'Café 東京 API', 'Description'])).BRANCH_NAME, '001-caf-api');
  });

  const invalid = [
    { args: [], message: /Usage:/ },
    { args: ['   '], message: /empty or contain only whitespace/ },
    { args: ['--short-name'], message: /--short-name requires a value/ },
    { args: ['--short-name', '--json', 'Description'], message: /--short-name requires a value/ },
    { args: ['--number'], message: /--number requires a value/ },
    { args: ['--number', '--json', 'Description'], message: /--number requires a value/ },
  ];
  invalid.forEach(function ({ args, message }) {
    it('rejects invalid arguments ' + JSON.stringify(args), function (t) {
      const f = fixture(t);
      failure(f.cli('create-new-feature', args), message);
      assert.equal(f.exists('specs'), false);
    });
  });

  ['-1', '1.5', 'abc', '9223372036854775808'].forEach(function (number) {
    it('rejects out-of-range or non-integer number ' + number, function (t) {
      const f = fixture(t);
      failure(f.cli('create-new-feature', [...dryRun, '--number', number, 'Description']), /--number must be/);
      assert.equal(f.exists('specs'), false);
    });
  });

  ['0', '9223372036854775807'].forEach(function (number) {
    it('accepts the numeric boundary ' + number, function (t) {
      const f = fixture(t);
      const result = json(f.cli('create-new-feature', [...dryRun, '--number', number, 'Description']));
      assert.equal(result.FEATURE_NUM, number.padStart(3, '0'));
    });
  });

  it('chooses the next sequential number while ignoring timestamps, files, and overflowing prefixes', function (t) {
    const f = fixture(t);
    ['009-old', '010-new', '20260101-120000-dated', '9223372036854775808-overflow'].forEach(function (name) {
      f.mkdir('specs/' + name);
    });
    f.write('specs/099-not-a-directory', 'ignore');
    assert.equal(json(f.cli('create-new-feature', [...dryRun, 'Description'])).FEATURE_NUM, '011');
  });

  it('moves a conflicting explicit number above the highest existing prefix', function (t) {
    const f = fixture(t);
    f.mkdir('specs/003-existing');
    f.mkdir('specs/008-latest');
    const result = f.cli('create-new-feature', [...dryRun, '--number', '3', 'Description']);
    assert.equal(json(result).FEATURE_NUM, '009');
    assert.match(result.stderr, /conflicts with an existing spec directory/);
  });

  it('rejects sequential overflow rather than wrapping to a negative number', function (t) {
    const f = fixture(t);
    f.mkdir('specs/9223372036854775807-last');
    failure(f.cli('create-new-feature', [...dryRun, 'Description']), /feature number must be between/);
  });

  it('truncates long names to 244 bytes without a trailing separator', function (t) {
    const f = fixture(t);
    const suffix = 'a'.repeat(239) + '-tail';
    const result = f.cli('create-new-feature', [...dryRun, '--short-name', suffix, 'Description']);
    assert.equal(json(result).BRANCH_NAME, '001-' + 'a'.repeat(239));
    assert.match(result.stderr, /244-byte limit/);
  });

  it('uses a timestamp instead of an explicit sequential number', function (t) {
    const f = fixture(t);
    const result = f.cli('create-new-feature', [...dryRun, '--timestamp', '--number', '10', '--short-name', 'example', 'Description']);
    const data = json(result);
    assert.match(data.FEATURE_NUM, /^\d{8}-\d{6}$/);
    assert.equal(data.BRANCH_NAME, data.FEATURE_NUM + '-example');
    assert.match(result.stderr, /--number is ignored/);
  });

  it('creates the spec from a template and persists feature context', function (t) {
    const f = fixture(t);
    f.write('.specify/templates/spec-template.md', '# Specification\n\n');
    const data = json(f.cli('create-new-feature', ['--json', '--short-name', 'example', 'Description']));
    assert.equal(data.BRANCH_NAME, '001-example');
    assert.equal(data.SPEC_FILE, f.path('specs/001-example/spec.md'));
    assert.equal(f.read('specs/001-example/spec.md'), '# Specification\n\n');
    assert.deepEqual(JSON.parse(f.read('.specify/feature.json')), { feature_directory: 'specs/001-example' });
    assert.equal(Object.hasOwn(data, 'DRY_RUN'), false);
  });

  it('creates an empty spec with a warning when no template exists', function (t) {
    const f = fixture(t);
    const result = f.cli('create-new-feature', ['--json', '--short-name', 'example', 'Description']);
    success(result);
    assert.equal(f.read('specs/001-example/spec.md'), '');
    assert.match(result.stderr, /Spec template not found/);
  });

  it('preserves an existing spec when explicitly reusing its directory', function (t) {
    const f = fixture(t);
    feature(f);
    const original = f.read('specs/001-example/spec.md');
    f.write('.specify/templates/spec-template.md', 'Do not overwrite');
    const data = json(f.cli('create-new-feature', ['--json', '--allow-existing-branch', '--number', '1', '--short-name', 'example', 'Description']));
    assert.equal(data.FEATURE_NUM, '001');
    assert.equal(f.read('specs/001-example/spec.md'), original);
  });

  it('creates feature files without replacing pinned state when persistence is disabled', function (t) {
    const f = fixture(t);
    feature(f);
    const original = f.read('.specify/feature.json');
    success(f.cli('create-new-feature', ['--json', '--short-name', 'new', 'Description'], { SPECIFY_FEATURE_NO_PERSIST: 'true' }));
    assert.equal(f.exists('specs/002-new/spec.md'), true);
    assert.equal(f.read('.specify/feature.json'), original);
  });
});

describe('workflow CLI prerequisites and output', function () {
  ['check-prerequisites', 'resolve-template', 'setup-plan', 'setup-tasks'].forEach(function (name) {
    it(name + ' rejects unknown options and provides help without feature state', function (t) {
      const f = fixture(t);
      failure(f.cli(name, ['--unknown']), /Unknown option/);
      assert.match(success(f.cli(name, ['--help'])), /Usage:/);
      assert.equal(f.exists('.specify/feature.json'), false);
    });
  });

  it('validates template CLI argument count', function (t) {
    const f = fixture(t);
    failure(f.cli('resolve-template'), /Template name is required/);
    failure(f.cli('resolve-template', ['plan-template', 'extra']), /Unexpected argument/);
    failure(f.cli('check-prerequisites', ['--template']), /requires a template name/);
  });

  it('resolves paths without creating a missing feature directory or overwriting a pin', function (t) {
    const f = fixture(t);
    feature(f);
    const original = f.read('.specify/feature.json');
    const data = json(f.cli('check-prerequisites', ['--paths-only', '--json'], {
      SPECIFY_FEATURE_DIRECTORY: 'specs/002-uncreated',
    }));
    assert.equal(data.FEATURE_DIR, f.path('specs/002-uncreated'));
    assert.equal(f.exists('specs/002-uncreated'), false);
    assert.equal(f.read('.specify/feature.json'), original);
  });

  it('rejects a missing feature directory before checking its documents', function (t) {
    const f = fixture(t);
    failure(f.cli('check-prerequisites', ['--json'], { SPECIFY_FEATURE_DIRECTORY: 'specs/missing' }), /Feature directory not found/);
  });

  const required = [
    { files: [], args: [], missing: /plan.md not found/ },
    { files: ['plan.md'], args: ['--require-spec'], missing: /spec.md not found/ },
    { files: ['plan.md'], args: ['--require-tasks'], missing: /tasks.md not found/ },
  ];
  required.forEach(function ({ files, args, missing }) {
    it('requires documents for ' + JSON.stringify(args), function (t) {
      const f = fixture(t);
      feature(f, files);
      failure(f.cli('check-prerequisites', ['--json', ...args]), missing);
    });
  });

  it('accepts only plan.md by default and reports an empty optional document list', function (t) {
    const f = fixture(t);
    const directory = feature(f, ['plan.md']);
    f.mkdir('specs/001-example/contracts');
    assert.deepEqual(json(f.cli('check-prerequisites', ['--json'])), {
      FEATURE_DIR: directory, AVAILABLE_DOCS: [],
    });
  });

  it('lists optional documents and includes tasks only when requested', function (t) {
    const f = fixture(t);
    feature(f, ['plan.md', 'spec.md', 'tasks.md', 'research.md', 'data-model.md', 'quickstart.md']);
    f.write('specs/001-example/contracts/.schema', 'contract');
    const expected = ['research.md', 'data-model.md', 'contracts/', 'quickstart.md'];
    assert.deepEqual(json(f.cli('check-prerequisites', ['--json'])).AVAILABLE_DOCS, expected);
    assert.deepEqual(json(f.cli('check-prerequisites', ['--json', '--require-spec', '--require-tasks', '--include-tasks'])).AVAILABLE_DOCS,
      [...expected, 'tasks.md']);
  });

  it('includes template content in prerequisite JSON with newlines intact', function (t) {
    const f = fixture(t);
    feature(f);
    f.write('.specify/templates/plan-template.md', 'Quote " and newline\n\n');
    assert.equal(json(f.cli('check-prerequisites', ['--json', '--template', 'plan-template'])).TEMPLATE_CONTENT, 'Quote " and newline\n\n');
  });

  it('fails when a requested prerequisite template is unavailable', function (t) {
    const f = fixture(t);
    feature(f);
    failure(f.cli('check-prerequisites', ['--json', '--template', 'missing']), /Could not resolve required missing/);
  });

  it('copies a plan template once and preserves edited plans on subsequent runs', function (t) {
    const f = fixture(t);
    feature(f, ['spec.md']);
    f.write('.specify/templates/plan-template.md', 'Initial plan\n\n');
    const data = json(f.cli('setup-plan', ['--json']));
    assert.equal(data.IMPL_PLAN, f.path('specs/001-example/plan.md'));
    assert.equal(data.FEATURE_DIR, f.path('specs/001-example'));
    assert.equal(data.FEATURE_SPEC, f.path('specs/001-example/spec.md'));
    assert.equal(data.BRANCH, '001-example');
    assert.equal(f.read('specs/001-example/plan.md'), 'Initial plan\n\n');
    f.write('specs/001-example/plan.md', 'User edits\n');
    success(f.cli('setup-plan', ['--json']));
    assert.equal(f.read('specs/001-example/plan.md'), 'User edits\n');
  });

  it('creates the missing feature directory and an empty plan if no template exists', function (t) {
    const f = fixture(t);
    const result = f.cli('setup-plan', ['--json'], { SPECIFY_FEATURE_DIRECTORY: 'specs/001-new' });
    success(result);
    assert.match(result.stderr, /Plan template not found/);
    assert.equal(f.read('specs/001-new/plan.md'), '');
  });

  it('removes a partially created plan when template resolution fails', function (t) {
    const f = fixture(t);
    feature(f, ['spec.md']);
    f.write('.specify/extensions/.registry', '{bad json');
    failure(f.cli('setup-plan', ['--json']), /invalid extension registry/, 2);
    assert.equal(f.exists('specs/001-example/plan.md'), false);
  });

  [
    { files: ['spec.md'], message: /plan.md not found/ },
    { files: ['plan.md'], message: /spec.md not found/ },
  ].forEach(function ({ files, message }) {
    it('setup-tasks requires both spec and plan with only ' + files[0], function (t) {
      const f = fixture(t);
      feature(f, files);
      failure(f.cli('setup-tasks', ['--json']), message);
    });
  });

  it('setup-tasks requires its template', function (t) {
    const f = fixture(t);
    feature(f);
    failure(f.cli('setup-tasks', ['--json']), /Could not resolve required tasks-template/);
  });

  it('returns the tasks template and available docs without replacing tasks.md', function (t) {
    const f = fixture(t);
    const directory = feature(f, ['spec.md', 'plan.md', 'research.md', 'tasks.md']);
    const template = f.write('.specify/templates/tasks-template.md', 'Tasks "quoted"\n\n');
    const original = f.read('specs/001-example/tasks.md');
    assert.deepEqual(json(f.cli('setup-tasks', ['--json'])), {
      FEATURE_DIR: directory, AVAILABLE_DOCS: ['research.md'],
      TASKS_TEMPLATE: template, TASKS_TEMPLATE_CONTENT: 'Tasks "quoted"\n\n',
    });
    assert.equal(f.read('specs/001-example/tasks.md'), original);
  });

  it('does not create tasks.md just to report its setup', function (t) {
    const f = fixture(t);
    feature(f);
    f.write('.specify/templates/tasks-template.md', 'Task template');
    success(f.cli('setup-tasks', ['--json']));
    assert.equal(f.exists('specs/001-example/tasks.md'), false);
  });
});
