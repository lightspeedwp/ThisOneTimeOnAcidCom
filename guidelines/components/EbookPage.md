# EbookPage Component Guidelines

## Overview
The `EbookPage` component serves as a fully responsive, two-page (spread) or single-page eBook reader. It is split into modular subcomponents to manage complexity, supporting touch swipe, keyboard navigation, dynamic font scaling, and a sliding table of contents.

## Architecture
- **EbookPage.tsx**: The main orchestrator. Handles state for current page, flip/fade animations, fullscreen mode, swipe gestures, and preference persistence.
- **EbookPageContent.tsx**: Renders the specific content based on the page type (e.g., cover, chapter-start, toc, foreword).
- **EbookDrawer.tsx**: A collapsible drawer for the table of contents and chapter jump links.
- **EbookReaderNav.tsx**: Bottom navigation bar containing previous/next controls, page progress, and the settings modal trigger.
- **EbookSettingsModal.tsx**: Modal to adjust font scaling and minimal mode.

## State Management & Logic
- **Pagination Source of Truth**: `currentPage` (number). Everything else (spread mode, progress) derives from this single integer.
- **Spread Layout Logic**: When the viewport exceeds 1024px, the `useSpreadMode()` hook returns true. The component groups `bookPages` into `spreads` (two pages side-by-side).
- **Swipe Logic**: Managed via `onTouchStart`, `onTouchMove`, and `onTouchEnd` on the main wrapper. Swipes apply a temporary CSS transform, mapping touch distance to a percentage offset. On release, it resolves to a page turn or snaps back.

## Styling & BEM
All Ebook styles use strict BEM and are split into specific files within `/styles/blocks/`:
- `ebook-base.css`: `.ebook-reader`, `.ebook-reader__hero`, custom property `--ebook-font-scale`.
- `ebook-drawer.css`: `.ebook-drawer`, `.ebook-drawer__group`.
- `ebook-navigation.css`: `.ebook-nav`, `.ebook-nav__button`.
- `ebook-page-types.css`: `.ebook-page__title`, `.ebook-page__paragraph`.

## Accessibility (WCAG 2.1 AA)
- Uses `role="main"` and `role="region"` for key structural boundaries.
- Uses `aria-live="polite"` on the reader region so screen readers announce page changes.
- Focus management ensures the user's focus correctly transfers when the settings modal or TOC drawer opens/closes.
- Custom keyboard event listeners fallback to Space/Enter for interactions and Escape to close modals.
