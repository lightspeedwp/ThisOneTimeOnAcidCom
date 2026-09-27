/**
 * TypeScript types for journal pages consumed by the Vite application.
 *
 * Intentionally kept separate from scripts/journal-schema.ts (which imports
 * Zod and gray-matter) so the app bundle stays lean.
 */

export type JournalPageType = 'journal-entry';

export interface JournalPageBlock {
  paragraphs: string[];
}

export interface JournalPage {
  id: string;
  type: JournalPageType;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  tags: string[];
  series?: string;
  draft: boolean;
  pages: JournalPageBlock[];
  wordCount: number;
}
