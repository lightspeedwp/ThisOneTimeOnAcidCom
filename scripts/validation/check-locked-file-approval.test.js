import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { runInNewContext } from 'node:vm';

const scriptPath = path.resolve('scripts/validation/check-locked-file-approval.cjs');
const source = fs.readFileSync(scriptPath, 'utf8');

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

it('a readable manifest retains exact paths and escaped directory matching', () => {
  const guard = loadGuard((filePath, encoding) => {
    expect(filePath).toBe(path.resolve('.github/PROTECTED_FILES.txt'));
    expect(encoding).toBe('utf8');
    return '# Protected paths\r\n\r\n .github/labels.yml \r\nguidelines.v2/\r\n';
  });
  expect(guard.LOCKED_PATHS.length).toBe(2);
  expect(guard.isLocked('.github/labels.yml')).toBe(true);
  expect(guard.isLocked('.github/labels.yml.bak')).toBe(false);
  expect(guard.isLocked('guidelines.v2/nested/file.md')).toBe(true);
  expect(guard.isLocked('guidelinesXv2/file.md')).toBe(false);
});

it('an absent manifest disables enforcement', () => {
  const guard = loadGuard(() => {
    throw Object.assign(new Error('Manifest absent'), { code: 'ENOENT' });
  });
  expect(guard.LOCKED_PATHS.length).toBe(0);
  expect(guard.isLocked('.github/labels.yml')).toBe(false);
  expect(guard.evaluate({ changedFiles: ['.github/labels.yml'] }).ok).toBe(true);
});

it.each(['EACCES', 'EPERM', 'EIO', 'EISDIR', undefined])(
  'manifest read failure %s propagates the original error',
  (code) => {
    const error = Object.assign(new Error('Read failed'), { code });
    expect(() => loadGuard(() => { throw error; })).toThrow(error);
  },
);
