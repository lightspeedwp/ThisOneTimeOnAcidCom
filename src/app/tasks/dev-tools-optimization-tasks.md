# Developer Tools Optimization & Schema Integration Tasks

**Source Report:** `/reports/dev-tools-optimization/schema-and-cleanup.md`
**Date:** March 8, 2026
**Status:** Active

## Phase 1: Mock Data Schema Integration
- [x] Edit `/data/mock/ui/detail-templates-lab.ts`: Add `mockSchema` property to the `blog` sample containing a JSON-LD `BlogPosting` object.
- [x] Edit `/data/mock/ui/detail-templates-lab.ts`: Add `mockSchema` property to the `portfolio` sample containing a JSON-LD `VisualArtwork` object.
- [x] Edit `/data/mock/ui/detail-templates-lab.ts`: Add `mockSchema` property to the `video` sample containing a JSON-LD `VideoObject` object.
- [x] Edit `/data/mock/ui/detail-templates-lab.ts`: Add `mockSchema` property to the `podcast` sample containing a JSON-LD `PodcastEpisode` object.
- [x] Edit `/data/mock/ui/detail-templates-lab.ts`: Add `mockSchema` property to the `event` sample (if applicable) containing a JSON-LD `Event` object.
- [x] Edit `/data/mock/ui/detail-templates-lab.ts`: Add `mockSchema` property to the `ebook` sample containing a JSON-LD `Book` object.

## Phase 2: DetailTemplatePage Schema View
- [x] Edit `/components/pages/dev-tools/DetailTemplatePage.tsx`: Inject an explicit `mockSchema` getter via the `grab()` helper on the root `sample` object.
- [x] Edit `/components/pages/dev-tools/DetailTemplatePage.tsx`: Add a visual debugger section or JSON stringified `<pre>` tag at the bottom of the active layout preview to render out the mapped schema structure, giving developers confidence that metadata schemas are aligned to the correct content type.