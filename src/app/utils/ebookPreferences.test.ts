import { findPageForPosition, positionForPage, readSavedPosition, savePosition } from './ebookPreferences';

function storage(): Storage {
  var values: Record<string, string> = {};
  return {
    getItem: function (key) { return values[key] ?? null; },
    setItem: function (key, value) { values[key] = value; },
    removeItem: function (key) { delete values[key]; },
    clear: function () { values = {}; },
    key: function () { return null; },
    length: 0,
  };
}

describe('ebook reading continuity', function () {
  var originalStorage: Storage;

  beforeEach(function () {
    originalStorage = globalThis.localStorage;
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: storage() });
  });

  afterEach(function () {
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: originalStorage });
  });

  it('maps a source paragraph to a page after re-pagination', function () {
    var pages = [
      { id: 'a', type: 'chapter-content' as const, sourceId: 'chapter.md', paragraphStart: 0 },
      { id: 'b', type: 'chapter-content' as const, sourceId: 'chapter.md', paragraphStart: 3 },
    ];
    expect(findPageForPosition(pages, { sourceId: 'chapter.md', paragraphIndex: 4 })).toBe(1);
    expect(positionForPage(pages[1])).toEqual({ sourceId: 'chapter.md', paragraphIndex: 3 });
  });

  it('reads the stable position format and falls back to legacy numeric progress', function () {
    var pages = [{ id: 'a', type: 'chapter-content' as const, sourceId: 'chapter.md', paragraphStart: 0 }];
    savePosition({ sourceId: 'chapter.md', paragraphIndex: 0 });
    expect(readSavedPosition(pages)).toBe(0);

    localStorage.removeItem('ash-ebook-position-v2');
    localStorage.setItem('ash-ebook-position', '12');
    expect(readSavedPosition(pages)).toBe(0);
  });

  it('recovers from corrupt storage without throwing', function () {
    localStorage.setItem('ash-ebook-position-v2', '{not-json');
    expect(readSavedPosition([])).toBe(0);
  });
});
