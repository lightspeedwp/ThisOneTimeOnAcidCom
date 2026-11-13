export const BOOK_SOURCE_DIRECTORIES = [
  '00-front-matter',
  '01-part-1-early-life',
  '02-part-2-carefree-20s',
  '03-part-3-nomadic-life',
  '04-part-4-re-emergence',
  '05-back-matter',
] as const;

export const BOOK_SOURCE_GLOBS = BOOK_SOURCE_DIRECTORIES.map(function (directory) {
  return '/src/content/book/' + directory + '/*.md';
});

export type SourceDiagnosticSeverity = 'warning' | 'error';

export interface SourceDiagnostic {
  source: string;
  severity: SourceDiagnosticSeverity;
  message: string;
}

export interface BookSourceMeta {
  type: string;
  chapter?: number;
  part?: number;
  title?: string;
  subtitle?: string;
  startPage?: number;
  pageNumber?: number;
  appendixId?: string;
}

export interface ParsedBookSource {
  sourceId: string;
  meta: BookSourceMeta;
  body: string;
  diagnostics: SourceDiagnostic[];
}

const SUPPORTED_TYPES = new Set([
  'cover', 'inside-front', 'title', 'dedication', 'epigraph', 'foreword',
  'part-title', 'chapter', 'afterword', 'appendix-divider', 'appendix',
  'about-author', 'back-cover',
]);

const ALLOWED_FIELDS: Record<string, Set<string>> = {
  cover: new Set(['type', 'title', 'subtitle']),
  'inside-front': new Set(['type']),
  title: new Set(['type', 'title', 'subtitle', 'pageNumber']),
  dedication: new Set(['type', 'pageNumber']),
  epigraph: new Set(['type', 'pageNumber']),
  foreword: new Set(['type', 'title', 'pageNumber']),
  'part-title': new Set(['type', 'part', 'title', 'subtitle', 'pageNumber']),
  chapter: new Set(['type', 'chapter', 'part', 'startPage', 'title', 'subtitle']),
  afterword: new Set(['type', 'title', 'pageNumber']),
  'appendix-divider': new Set(['type', 'pageNumber', 'title']),
  appendix: new Set(['type', 'appendixId', 'pageNumber', 'title', 'subtitle']),
  'about-author': new Set(['type', 'pageNumber', 'title']),
  'back-cover': new Set(['type', 'title']),
};

function sourceIdForPath(path: string): string {
  return path.replace(/^\/?src\//, 'src/').replace(/\\/g, '/');
}

function scalar(value: string): string | number {
  var trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    trimmed = trimmed.slice(1, -1);
  }
  var numeric = Number(trimmed);
  return trimmed !== '' && Number.isFinite(numeric) ? numeric : trimmed;
}

function parseYamlBlock(block: string): Record<string, string | number> {
  var values: Record<string, string | number> = {};
  var currentKey = '';
  var lines = block.replace(/\r\n/g, '\n').split('\n');

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var match = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (match) {
      currentKey = match[1];
      values[currentKey] = scalar(match[2]);
    } else if (currentKey && line.trim() !== '') {
      var previous = String(values[currentKey]);
      values[currentKey] = previous + '\n' + line.trim();
    }
  }

  var keys = Object.keys(values);
  for (var k = 0; k < keys.length; k++) {
    var key = keys[k];
    if (typeof values[key] === 'string') {
      var value = values[key] as string;
      if (value.startsWith('"') && value.endsWith('"')) {
        values[key] = value.slice(1, -1);
      }
    }
  }
  return values;
}

export function sortBookSourcePaths(paths: string[]): string[] {
  return paths.slice().sort(function (a, b) {
    return a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' });
  });
}

export function parseBookSource(raw: string, path: string): ParsedBookSource {
  var sourceId = sourceIdForPath(path);
  var diagnostics: SourceDiagnostic[] = [];
  var normalized = raw.replace(/\r\n/g, '\n');
  var match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return {
      sourceId,
      meta: { type: 'unknown' },
      body: normalized.trim(),
      diagnostics: [{ source: sourceId, severity: 'error', message: 'Missing YAML frontmatter.' }],
    };
  }

  var values = parseYamlBlock(match[1]);
  var meta = values as unknown as BookSourceMeta;
  var type = typeof meta.type === 'string' ? meta.type : '';

  if (!SUPPORTED_TYPES.has(type)) {
    diagnostics.push({ source: sourceId, severity: 'error', message: type ? 'Unsupported type "' + type + '".' : 'Missing type.' });
  } else {
    var allowed = ALLOWED_FIELDS[type];
    var keys = Object.keys(values);
    for (var i = 0; i < keys.length; i++) {
      if (!allowed.has(keys[i])) {
        diagnostics.push({ source: sourceId, severity: 'error', message: 'Unsupported frontmatter field "' + keys[i] + '" for type "' + type + '".' });
      }
    }

    if (type === 'chapter' && (typeof meta.chapter !== 'number' || typeof meta.part !== 'number')) {
      diagnostics.push({ source: sourceId, severity: 'error', message: 'Chapter sources require numeric chapter and part fields.' });
    }
    if (type === 'part-title' && typeof meta.part !== 'number') {
      diagnostics.push({ source: sourceId, severity: 'error', message: 'Part titles require a numeric part field.' });
    }
    if (type === 'appendix' && typeof meta.appendixId !== 'string') {
      diagnostics.push({ source: sourceId, severity: 'error', message: 'Appendix sources require an appendixId field.' });
    }
  }

  var body = match[2].trim();
  if (!body) {
    diagnostics.push({ source: sourceId, severity: 'warning', message: 'Source body is empty; the structural page will still be emitted.' });
  }

  return { sourceId, meta, body, diagnostics };
}

export function formatSourceDiagnostics(diagnostics: SourceDiagnostic[]): string {
  return diagnostics.map(function (item) {
    return '[' + item.severity + '] ' + item.source + ': ' + item.message;
  }).join('\n');
}
