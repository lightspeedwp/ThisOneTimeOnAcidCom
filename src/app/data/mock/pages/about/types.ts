/**
 * @fileoverview Shared types for all About sub-page data files.
 * Extracted from about-subpages.ts (T17).
 */

import type { BreadcrumbItem } from '../../../../components/ui/Breadcrumbs';

export type { BreadcrumbItem };

export interface AboutSubpageSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface AboutSubpageData {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  breadcrumbs: BreadcrumbItem[];
  sections: AboutSubpageSection[];
}
