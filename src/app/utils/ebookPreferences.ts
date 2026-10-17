/**
 * @fileoverview Ebook Reading Preferences Service
 * 
 * Manages localStorage for ebook reader preferences:
 * - Current page position
 * - Font size preset
 * - Minimal mode toggle
 * - Theme preference
 * - Full-screen preference
 * 
 * @version 1.0.0
 */

const STORAGE_KEYS = {
  PAGE: 'ash-ebook-position',
  FONT_SIZE: 'ash-ebook-font-size',
  MINIMAL_MODE: 'ash-ebook-minimal-mode',
  THEME: 'ash-ebook-theme',
  FULLSCREEN_PREF: 'ash-ebook-fullscreen-pref',
  PAGING_EFFECT: 'ash-ebook-paging-effect',
};

export type FontSizePreset = 'small' | 'medium' | 'large' | 'x-large';
export type ThemePreference = 'light' | 'dark' | 'system';
export type PagingEffect = 'slide' | '3d-flip' | 'fade' | 'none';

export interface EbookPreferences {
  currentPage: number;
  fontSize: FontSizePreset;
  minimalMode: boolean;
  theme: ThemePreference;
  fullscreenPref: boolean;
  pagingEffect: PagingEffect;
}

const DEFAULT_PREFERENCES: EbookPreferences = {
  currentPage: 0,
  fontSize: 'medium',
  minimalMode: false,
  theme: 'system',
  fullscreenPref: false,
  pagingEffect: '3d-flip',
};

/**
 * Font size multipliers for each preset
 */
export const FONT_SIZE_SCALE: Record<FontSizePreset, number> = {
  'small': 0.875,    // 87.5%
  'medium': 1.0,     // 100% (default)
  'large': 1.125,    // 112.5%
  'x-large': 1.25,   // 125%
};

/**
 * Read current page position
 */
export function readSavedPage(maxIndex: number): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PAGE);
    if (raw === null) return 0;
    const parsed = parseInt(raw, 10);
    if (Number.isNaN(parsed) || parsed < 0 || parsed > maxIndex) return 0;
    return parsed;
  } catch {
    return 0;
  }
}

/**
 * Save current page position
 */
export function savePage(pageIndex: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PAGE, String(pageIndex));
  } catch {
    // Storage full or blocked — silent fail
  }
}

/**
 * Read font size preference
 */
export function readFontSize(): FontSizePreset {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FONT_SIZE);
    if (raw === 'small' || raw === 'medium' || raw === 'large' || raw === 'x-large') {
      return raw;
    }
    return DEFAULT_PREFERENCES.fontSize;
  } catch {
    return DEFAULT_PREFERENCES.fontSize;
  }
}

/**
 * Save font size preference
 */
export function saveFontSize(size: FontSizePreset): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FONT_SIZE, size);
  } catch {
    // Silent fail
  }
}

/**
 * Read minimal mode preference
 */
export function readMinimalMode(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MINIMAL_MODE);
    return raw === 'true';
  } catch {
    return DEFAULT_PREFERENCES.minimalMode;
  }
}

/**
 * Save minimal mode preference
 */
export function saveMinimalMode(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MINIMAL_MODE, enabled ? 'true' : 'false');
  } catch {
    // Silent fail
  }
}

/**
 * Read theme preference
 */
export function readTheme(): ThemePreference {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.THEME);
    if (raw === 'light' || raw === 'dark' || raw === 'system') {
      return raw;
    }
    return DEFAULT_PREFERENCES.theme;
  } catch {
    return DEFAULT_PREFERENCES.theme;
  }
}

/**
 * Save theme preference
 */
export function saveTheme(theme: ThemePreference): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch {
    // Silent fail
  }
}

/**
 * Read fullscreen preference
 */
export function readFullscreenPref(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FULLSCREEN_PREF);
    return raw === 'true';
  } catch {
    return DEFAULT_PREFERENCES.fullscreenPref;
  }
}

/**
 * Save fullscreen preference
 */
export function saveFullscreenPref(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FULLSCREEN_PREF, enabled ? 'true' : 'false');
  } catch {
    // Silent fail
  }
}

/**
 * Read paging effect preference
 */
export function readPagingEffect(): PagingEffect {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PAGING_EFFECT);
    if (raw === 'slide' || raw === '3d-flip' || raw === 'fade' || raw === 'none') {
      return raw;
    }
    return DEFAULT_PREFERENCES.pagingEffect;
  } catch {
    return DEFAULT_PREFERENCES.pagingEffect;
  }
}

/**
 * Save paging effect preference
 */
export function savePagingEffect(effect: PagingEffect): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PAGING_EFFECT, effect);
  } catch {
    // Silent fail
  }
}

/**
 * Read all preferences at once
 */
export function readAllPreferences(): EbookPreferences {
  return {
    currentPage: readSavedPage(999),
    fontSize: readFontSize(),
    minimalMode: readMinimalMode(),
    theme: readTheme(),
    fullscreenPref: readFullscreenPref(),
    pagingEffect: readPagingEffect(),
  };
}

/**
 * Clear all ebook preferences
 */
export function clearAllPreferences(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.PAGE);
    localStorage.removeItem(STORAGE_KEYS.FONT_SIZE);
    localStorage.removeItem(STORAGE_KEYS.MINIMAL_MODE);
    localStorage.removeItem(STORAGE_KEYS.THEME);
    localStorage.removeItem(STORAGE_KEYS.FULLSCREEN_PREF);
    localStorage.removeItem(STORAGE_KEYS.PAGING_EFFECT);
  } catch {
    // Silent fail
  }
}
