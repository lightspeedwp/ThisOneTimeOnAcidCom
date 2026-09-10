# Ebook Preferences & Settings

## Overview
The ebook reader allows users to configure their reading experience. These preferences are managed in `/utils/ebookPreferences.ts`.

## Stored Configurations
1. **Font Size**:
   - Stored in `localStorage` under `ash_ebook_font_size`.
   - Options: `'small'`, `'normal'`, `'large'`, `'xlarge'`.
   - Default: `'normal'`.
   - Mapped to a CSS custom property `--ebook-font-scale` dynamically.

2. **Minimal Mode**:
   - Stored in `localStorage` under `ash_ebook_minimal_mode`.
   - A boolean value toggling the distraction-free UI.
   - Default: `false`.
   - Adds the `.ebook-reader--minimal` BEM modifier.

3. **Paging Effect**:
   - Stored in `localStorage` under `ash_ebook_paging_effect`.
   - Options: `'slide'`, `'fade'`, `'none'`.
   - Default: `'slide'`.
   - Adjusts the animation state during page transition.

4. **Saved Page**:
   - Stored in `localStorage` under `ash_ebook_saved_page`.
   - Stores the last read `currentPage` integer.
   - Falls back to `0` if not present.

## Implementation Details
The `ebookPreferences.ts` utility exports read and write functions for each setting. The `EbookPage.tsx` component synchronizes these values to state on initial render and updates `localStorage` within `useEffect` hooks whenever a preference is changed by the user.