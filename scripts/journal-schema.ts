/**
 * @fileoverview Shared Zod schemas for journal and ebook frontmatter validation.
 *
 * Used by:
 *   - scripts/parse-journal-markdown.ts  (parse + export)
 *   - scripts/check-journal-links.ts     (link integrity)
 *   - GitHub Actions CI checks
 *
 * Not imported by the Vite application bundle — keeps runtime dependencies lean.
 */

import { z } from 'zod';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SHARED PRIMITIVES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const KebabSlugSchema = z
  .string()
  .min(2)
  .regex(
    /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
    'Slug must be lowercase kebab-case (e.g. my-entry-title)'
  );

const IsoDatеSchema = z.preprocess(
  function (val) {
    // gray-matter parses unquoted YAML dates as Date objects
    if (val instanceof Date) {
      return val.toISOString().slice(0, 10);
    }
    return val;
  },
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be ISO format YYYY-MM-DD')
    .refine(function (val) {
      var d = new Date(val);
      return !isNaN(d.getTime());
    }, 'Date must be a valid calendar date')
);

const TagSchema = z
  .string()
  .min(1)
  .max(40)
  .regex(/^[a-z0-9][a-z0-9- ]*$/, 'Tags must be lowercase (spaces and hyphens allowed)');

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   JOURNAL FRONTMATTER SCHEMA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const JournalFrontmatterSchema = z.object({
  type: z.literal('journal-entry'),

  // Identity
  title: z.string().min(1, 'Title is required').max(120, 'Title exceeds 120 characters'),
  slug: KebabSlugSchema,
  author: z.string().min(1, 'Author is required').max(80),

  // Temporal
  date: IsoDatеSchema,

  // Taxonomy
  tags: z
    .array(TagSchema)
    .min(1, 'At least one tag is required')
    .max(10, 'Maximum 10 tags per entry'),

  // Optional metadata — mirrors e-book subtitle/series conventions
  subtitle: z.string().max(200).optional(),
  series: z.string().min(1).max(80).optional(),

  // Publishing control
  draft: z.boolean().optional().default(false),

  // Legacy page-number field for e-book parity (rarely used in journal context)
  pageNumber: z.number().int().positive().optional(),
});

export type JournalFrontmatter = z.infer<typeof JournalFrontmatterSchema>;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EBOOK FRONTMATTER SCHEMA (shared document schema parity)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const EbookBaseSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  pageNumber: z.number().int().positive().optional(),
});

export const EbookFrontmatterSchema = z.discriminatedUnion('type', [
  EbookBaseSchema.extend({ type: z.literal('cover') }),
  EbookBaseSchema.extend({ type: z.literal('inside-front') }),
  EbookBaseSchema.extend({ type: z.literal('title') }),
  EbookBaseSchema.extend({ type: z.literal('dedication') }),
  EbookBaseSchema.extend({ type: z.literal('epigraph') }),
  EbookBaseSchema.extend({ type: z.literal('foreword') }),
  EbookBaseSchema.extend({
    type: z.literal('part-title'),
    part: z.number().int().positive(),
  }),
  EbookBaseSchema.extend({
    type: z.literal('chapter'),
    chapter: z.number().int().positive(),
    part: z.number().int().positive(),
    startPage: z.number().int().nonnegative().optional(),
  }),
  EbookBaseSchema.extend({ type: z.literal('afterword') }),
  EbookBaseSchema.extend({ type: z.literal('appendix-divider') }),
  EbookBaseSchema.extend({
    type: z.literal('appendix'),
    appendixId: z.string().regex(/^[a-z]$/),
  }),
  EbookBaseSchema.extend({ type: z.literal('about-author') }),
  EbookBaseSchema.extend({ type: z.literal('back-cover') }),
]);

export type EbookFrontmatter = z.infer<typeof EbookFrontmatterSchema>;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EXPORTED JSON PAYLOAD TYPES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface JournalPageBlock {
  paragraphs: string[];
}

export interface JournalJsonPayload {
  id: string;
  type: 'journal-entry';
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
  sourceFile: string;
}

export interface JournalIndexEntry {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  tags: string[];
  series?: string;
  draft: boolean;
  wordCount: number;
}

export interface JournalIndex {
  generatedAt: string;
  totalEntries: number;
  publishedEntries: number;
  draftEntries: number;
  entries: JournalIndexEntry[];
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VALIDATION RESULT TYPES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface ValidationError {
  file: string;
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: string[];
}
