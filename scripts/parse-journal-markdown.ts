#!/usr/bin/env tsx
/**
 * @fileoverview Journal markdown parser and JSON exporter.
 *
 * Reads all .md files from journal-content/, validates frontmatter against
 * the shared Zod schema, splits body on --- page breaks, and writes
 * structured JSON payloads to export/journal/.
 *
 * Also generates export/journal/index.json — a lightweight listing of all
 * entries (no body text) suitable for pagination/listing pages.
 *
 * Usage:
 *   pnpm journal:parse                   parse + export JSON (default)
 *   pnpm journal:validate                validate only — no file output (CI)
 *   pnpm journal:parse --verbose         verbose per-file output
 *
 * Exit codes:
 *   0 — success (or validate-only with no errors)
 *   1 — one or more validation errors
 *   2 — filesystem / I/O error
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { ZodError } from 'zod';

var __dirname = dirname(fileURLToPath(import.meta.url));
import {
  JournalFrontmatterSchema,
  type JournalFrontmatter,
  type JournalJsonPayload,
  type JournalIndexEntry,
  type JournalIndex,
  type ValidationError,
  type ValidationResult,
} from './journal-schema';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PATHS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

var PROJECT_ROOT = join(__dirname, '..');
var JOURNAL_DIR = join(PROJECT_ROOT, 'journal-content');
var EXPORT_DIR = join(PROJECT_ROOT, 'export', 'journal');

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CLI FLAGS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

var args = process.argv.slice(2);
var VALIDATE_ONLY = args.includes('--validate-only');
var VERBOSE = args.includes('--verbose');

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LOGGING UTILITIES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function log(msg: string) { process.stdout.write(msg + '\n'); }
function info(msg: string) { log('  ℹ️  ' + msg); }
function ok(msg: string) { log('  ✅  ' + msg); }
function warn(msg: string) { log('  ⚠️  ' + msg); }
function fail(msg: string) { process.stderr.write('  ❌  ' + msg + '\n'); }
function verbose(msg: string) { if (VERBOSE) log('       ' + msg); }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PARAGRAPH / PAGE SPLITTING
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function toParas(block: string): string[] {
  return block
    .split(/\n\n+/)
    .map(function (p) { return p.trim(); })
    .filter(Boolean);
}

function splitPages(body: string): string[] {
  return body
    .split(/\n---\n/)
    .map(function (b) { return b.trim(); })
    .filter(Boolean);
}

function countWords(text: string): number {
  return text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FRONTMATTER VALIDATION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function validateFrontmatter(
  data: unknown,
  filePath: string
): { frontmatter: JournalFrontmatter | null; errors: ValidationError[] } {
  var result = JournalFrontmatterSchema.safeParse(data);

  if (result.success) {
    return { frontmatter: result.data, errors: [] };
  }

  var issues = result.error.issues ?? (result.error as any).errors ?? [];
  var errors: ValidationError[] = issues.map(function (issue: { path: (string | number)[]; message: string }) {
    return {
      file: filePath,
      field: issue.path.join('.') || '(root)',
      message: issue.message,
    };
  });

  return { frontmatter: null, errors: errors };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SLUG UNIQUENESS CHECK
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function checkSlugUniqueness(
  payloads: JournalJsonPayload[]
): ValidationError[] {
  var seen: Record<string, string> = {};
  var errors: ValidationError[] = [];

  for (var i = 0; i < payloads.length; i++) {
    var p = payloads[i];
    if (seen[p.slug]) {
      errors.push({
        file: p.sourceFile,
        field: 'slug',
        message: 'Duplicate slug "' + p.slug + '" — already used in ' + seen[p.slug],
      });
    } else {
      seen[p.slug] = p.sourceFile;
    }
  }

  return errors;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FILE DISCOVERY
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function collectMarkdownFiles(dir: string): string[] {
  if (!existsSync(dir)) {
    fail('journal-content/ directory not found: ' + dir);
    process.exit(2);
  }

  return readdirSync(dir)
    .filter(function (name) {
      return extname(name) === '.md' && name !== 'README.md';
    })
    .map(function (name) { return join(dir, name); })
    .sort();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PARSE ONE FILE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function parseFile(
  filePath: string
): { payload: JournalJsonPayload | null; errors: ValidationError[]; warnings: string[] } {
  var relPath = filePath.replace(PROJECT_ROOT + '/', '');
  var warnings: string[] = [];

  var raw: string;
  try {
    raw = readFileSync(filePath, 'utf-8');
  } catch (e) {
    return {
      payload: null,
      errors: [{ file: relPath, field: '(file)', message: 'Cannot read file: ' + String(e) }],
      warnings: [],
    };
  }

  // gray-matter handles full YAML including arrays, booleans, etc.
  var parsed = matter(raw);
  var data = parsed.data;
  var body = parsed.content.trim();

  // Validate frontmatter against Zod schema
  var validation = validateFrontmatter(data, relPath);
  if (validation.errors.length > 0) {
    return { payload: null, errors: validation.errors, warnings: [] };
  }
  var fm = validation.frontmatter!;

  // Warn on empty body
  if (!body) {
    warnings.push(relPath + ': body content is empty');
  }

  // Split into pages then into paragraphs
  var pageBlocks = splitPages(body);
  var pages = pageBlocks.map(function (block) {
    return { paragraphs: toParas(block) };
  });

  // At least one page block even if body is empty
  if (pages.length === 0) {
    pages = [{ paragraphs: [] }];
  }

  var wordCount = countWords(body);
  var expectedReadMinutes = Math.ceil(wordCount / 200);

  if (wordCount > 0 && wordCount < 50) {
    warnings.push(relPath + ': very short entry (' + wordCount + ' words)');
  }

  verbose(relPath + ' — ' + wordCount + ' words, ~' + expectedReadMinutes + ' min read, ' + pages.length + ' page(s)');

  var payload: JournalJsonPayload = {
    id: fm.slug,
    type: 'journal-entry',
    slug: fm.slug,
    title: fm.title,
    subtitle: fm.subtitle,
    author: fm.author,
    date: fm.date,
    tags: fm.tags,
    series: fm.series,
    draft: fm.draft ?? false,
    pages: pages,
    wordCount: wordCount,
    sourceFile: relPath,
  };

  return { payload: payload, errors: [], warnings: warnings };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WRITE OUTPUTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function writePayload(payload: JournalJsonPayload) {
  mkdirSync(EXPORT_DIR, { recursive: true });
  var outPath = join(EXPORT_DIR, payload.slug + '.json');
  writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n', 'utf-8');
  verbose('Wrote ' + outPath.replace(PROJECT_ROOT + '/', ''));
}

function writeIndex(payloads: JournalJsonPayload[]) {
  var entries: JournalIndexEntry[] = payloads
    .sort(function (a, b) {
      // Newest first; drafts last within same date
      if (a.date !== b.date) return a.date > b.date ? -1 : 1;
      if (a.draft !== b.draft) return a.draft ? 1 : -1;
      return a.slug.localeCompare(b.slug);
    })
    .map(function (p) {
      var entry: JournalIndexEntry = {
        id: p.id,
        slug: p.slug,
        title: p.title,
        author: p.author,
        date: p.date,
        tags: p.tags,
        draft: p.draft,
        wordCount: p.wordCount,
      };
      if (p.subtitle !== undefined) entry.subtitle = p.subtitle;
      if (p.series !== undefined) entry.series = p.series;
      return entry;
    });

  var published = entries.filter(function (e) { return !e.draft; });
  var drafts = entries.filter(function (e) { return e.draft; });

  var index: JournalIndex = {
    generatedAt: new Date().toISOString(),
    totalEntries: entries.length,
    publishedEntries: published.length,
    draftEntries: drafts.length,
    entries: entries,
  };

  mkdirSync(EXPORT_DIR, { recursive: true });
  var indexPath = join(EXPORT_DIR, 'index.json');
  writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n', 'utf-8');
  ok('Wrote index: ' + indexPath.replace(PROJECT_ROOT + '/', '') +
     ' (' + published.length + ' published, ' + drafts.length + ' draft)');
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function main() {
  var mode = VALIDATE_ONLY ? 'Validating' : 'Parsing';
  log('\n' + mode + ' journal content...\n');

  var files = collectMarkdownFiles(JOURNAL_DIR);

  if (files.length === 0) {
    warn('No .md files found in journal-content/');
    process.exit(0);
  }

  info('Found ' + files.length + ' file(s) in journal-content/\n');

  var allErrors: ValidationError[] = [];
  var allWarnings: string[] = [];
  var payloads: JournalJsonPayload[] = [];

  // Parse each file
  for (var i = 0; i < files.length; i++) {
    var filePath = files[i];
    var relPath = filePath.replace(PROJECT_ROOT + '/', '');
    var result = parseFile(filePath);

    if (result.errors.length > 0) {
      for (var e = 0; e < result.errors.length; e++) {
        fail(result.errors[e].file + ' [' + result.errors[e].field + ']: ' + result.errors[e].message);
      }
      allErrors = allErrors.concat(result.errors);
    } else if (result.payload) {
      ok(relPath);
      payloads.push(result.payload);
    }

    allWarnings = allWarnings.concat(result.warnings);
  }

  // Cross-file checks
  var slugErrors = checkSlugUniqueness(payloads);
  for (var s = 0; s < slugErrors.length; s++) {
    fail(slugErrors[s].file + ' [slug]: ' + slugErrors[s].message);
  }
  allErrors = allErrors.concat(slugErrors);

  // Warnings
  if (allWarnings.length > 0) {
    log('');
    for (var w = 0; w < allWarnings.length; w++) {
      warn(allWarnings[w]);
    }
  }

  // Summary
  log('');

  if (allErrors.length > 0) {
    fail(allErrors.length + ' validation error(s). Fix before merging.\n');
    process.exit(1);
  }

  ok(payloads.length + ' file(s) valid.\n');

  // Write output (unless validate-only mode)
  if (!VALIDATE_ONLY) {
    log('Writing JSON exports...\n');
    for (var p = 0; p < payloads.length; p++) {
      writePayload(payloads[p]);
    }
    writeIndex(payloads);
    log('');
    ok('Export complete. Files written to export/journal/\n');
  } else {
    ok('Validation complete — no output written (--validate-only mode)\n');
  }
}

main();
