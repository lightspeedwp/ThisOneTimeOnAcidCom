import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { runInNewContext } from 'node:vm';

const scriptPath = path.resolve('scripts/validation/check-locked-file-approval.cjs');
const source = fs.readFileSync(scriptPath, 'utf8');

// Evaluate module initialization with controlled manifest reads and no disk writes.
function loadGuard(readFileSync) {
  const module = { exports: {} };
  runInNewContext(source, {
    __dirname: path.dirname(scriptPath),
    module,
    require(id) {
      if (id === 'fs') return { readFileSync };
      if (id === 'path') return path;
      throw new Error(`Unexpected dependency: ${id}`);
    },
  }, { filename: scriptPath });
  return module.exports;
}

test('a readable manifest retains exact paths and escaped directory matching', () => {
  const guard = loadGuard((filePath, encoding) => {
    assert.equal(filePath, path.resolve('.github/PROTECTED_FILES.txt'));
    assert.equal(encoding, 'utf8');
    return '# Protected paths\r\n\r\n .github/labels.yml \r\nguidelines.v2/\r\n';
  });
  assert.equal(guard.LOCKED_PATHS.length, 2);
  assert.equal(guard.isLocked('.github/labels.yml'), true);
  assert.equal(guard.isLocked('.github/labels.yml.bak'), false);
  assert.equal(guard.isLocked('guidelines.v2/nested/file.md'), true);
  assert.equal(guard.isLocked('guidelinesXv2/file.md'), false);
});

test('an absent manifest disables enforcement', () => {
  const guard = loadGuard(() => {
    throw Object.assign(new Error('Manifest absent'), { code: 'ENOENT' });
  });
  assert.equal(guard.LOCKED_PATHS.length, 0);
  assert.equal(guard.isLocked('.github/labels.yml'), false);
  assert.equal(guard.evaluate({ changedFiles: ['.github/labels.yml'] }).ok, true);
});

test.each(['EACCES', 'EPERM', 'EIO', 'EISDIR', undefined])(
  'manifest read failure %s propagates the original error', (code) => {
    const error = Object.assign(new Error('Read failed'), { code });
    assert.throws(() => loadGuard(() => { throw error; }), (actual) => actual === error);
  },
);
