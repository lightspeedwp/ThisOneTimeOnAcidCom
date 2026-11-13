import {
  BOOK_SOURCE_DIRECTORIES,
  formatSourceDiagnostics,
  parseBookSource,
  sortBookSourcePaths,
} from './bookContentSource';

describe('book manuscript source model', function () {
  it('selects only the six canonical manuscript directories', function () {
    expect(BOOK_SOURCE_DIRECTORIES).toEqual([
      '00-front-matter',
      '01-part-1-early-life',
      '02-part-2-carefree-20s',
      '03-part-3-nomadic-life',
      '04-part-4-re-emergence',
      '05-back-matter',
    ]);
  });

  it('orders numeric source names deterministically', function () {
    expect(sortBookSourcePaths([
      '/src/content/book/02-part-2-carefree-20s/10.md',
      '/src/content/book/02-part-2-carefree-20s/2.md',
      '/src/content/book/00-front-matter/01.md',
    ])).toEqual([
      '/src/content/book/00-front-matter/01.md',
      '/src/content/book/02-part-2-carefree-20s/2.md',
      '/src/content/book/02-part-2-carefree-20s/10.md',
    ]);
  });

  it('parses multiline quoted metadata and emits stable source identity', function () {
    var parsed = parseBookSource('---\ntype: chapter\nchapter: 2\npart: 1\nsubtitle: "First line\n  second line"\n---\n\nOne paragraph.', '/src/content/book/01-part-1-early-life/02.md');
    expect(parsed.sourceId).toBe('src/content/book/01-part-1-early-life/02.md');
    expect(parsed.meta.subtitle).toBe('First line\nsecond line');
    expect(parsed.diagnostics).toEqual([]);
  });

  it('reports missing, unsupported and empty source conditions', function () {
    var missing = parseBookSource('No frontmatter', '/src/content/book/01-part-1-early-life/bad.md');
    var unsupported = parseBookSource('---\ntype: brief\n---\n\nReference', '/src/content/book/01-part-1-early-life/brief.md');
    var empty = parseBookSource('---\ntype: foreword\n---\n', '/src/content/book/00-front-matter/06.md');

    expect(missing.diagnostics[0].severity).toBe('error');
    expect(unsupported.diagnostics[0].message).toContain('Unsupported type');
    expect(empty.diagnostics[0].severity).toBe('warning');
    expect(formatSourceDiagnostics(unsupported.diagnostics)).toContain('brief.md');
  });
});
