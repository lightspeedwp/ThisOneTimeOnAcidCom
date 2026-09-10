# Ebook Reader Audit Findings

## Overview
This report details all files, components, data, styles, and guidelines associated with the Ebook Reader implementation. The audit was conducted to understand the current architecture of the "incredibly powerful ebook reader" from the original site.

## 1. Components
The ebook reader uses a modular component structure located primarily in `/components/pages/about/`:
- `EbookPage.tsx`: The primary orchestrator page for the ebook reader. Handles fullscreen mode, layout toggling, and routing.
- `/components/pages/about/ebook/EbookPageContent.tsx`: Renders the content for individual book pages.
- `/components/pages/about/ebook/EbookDrawer.tsx`: The sliding drawer interface for table of contents and navigation.
- `/components/pages/about/ebook/EbookReaderNav.tsx`: The primary navigation bar controls (prev/next, settings toggle).
- `/components/ui/EbookSettingsModal.tsx`: A modal allowing users to configure reader preferences (font size, theme, etc.).

## 2. Helper Utilities & Configuration
Logic and preference management are separated into utility files:
- `/components/pages/about/ebook/ebookHelpers.ts`: Contains types, constants, data builders, and spread layout logic (e.g., `buildChapterIndex`, swipe thresholds).
- `/utils/ebookPreferences.ts`: Manages user settings for font size and readability adjustments.

## 3. Data & Content
Data for the ebook is completely mocked and centralized:
- `/data/mock/pages/ebook-pages.ts`: The actual content and structure of the 82-page ebook, encompassing 20 chapters and appendices.
- `/data/mock/ui/ebook.ts`: UI string constants and configuration for the reader interface.

## 4. Styles
The reader relies on a heavily modular CSS block architecture defined in `/styles/blocks/`:
- `ebook-base.css`: Base reader shell, hero, and typography variables (`--ebook-font-scale`).
- `ebook-page-types.css`: Visual styling for specific page types (covers, chapters, titles).
- `ebook-drawer.css`: Styles for the sliding table of contents drawer.
- `ebook-navigation.css`: Styling for top and bottom navigation bars.
- `ebook-responsive.css`: Media queries managing single-page vs. double-spread layouts.
- `ebook-settings-modal.css`: Styling for the modal overlay and its interactive elements.

## 5. Guidelines
**Finding:** There are no dedicated comprehensive documentation files for the Ebook components inside `/guidelines/`.
- `content-type-colours.md`: Identifies Ebook content as using Neon Yellow (`#FFFF00`) and the `BookOpen` icon.
- `sitemap-routes.md`: Maps the ebook reader route (`/ebook`).
- `Guidelines.md`: Contains formatting rules like "Sentence case for all ebook chapter titles."

## Identified Gaps
1. **Missing Component Documentation:** There is no `/guidelines/components/EbookPage.md` or equivalent detailing the props, state management, and accessibility features of the complex reader.
2. **Missing Feature Breakdown:** While the code indicates complex functionality (touch swipe, dual-spread on desktop, single-page on mobile), this is not documented in the project's standard `overview-*.md` files.