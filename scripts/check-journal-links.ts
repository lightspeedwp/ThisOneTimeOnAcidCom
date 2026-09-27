#!/usr/bin/env tsx
/**
 * @fileoverview Journal markdown link integrity checker.
 *
 * Extracts all Markdown links from journal-content/*.md files and:
 *   - Validates internal links (starting with /) point to existing files
 *     or known route patterns within the project
 *   - Reports external links as informational (not errors — they can't be
 *     checked in CI without network access)
 *   - Reports broken internal links as errors (exit code 1)
 *
 * Usage:
 *   pnpm journal:check-links                 check all links
 *   pnpm journal:check-links --verbose       show all links including valid ones
 *   pnpm journal:check-links --external      also fetch external URLs (slow)
 *
 * Exit codes:
 *   0 — no broken internal links found
 *   1 — one or more broken internal links
 *   2 — filesystem error
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

var __dirname = dirname(fileURLToPath(import.meta.url));

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PATHS + FLAGS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

var PROJECT_ROOT = join(__dirname, '..');
var JOURNAL_DIR = join(PROJECT_ROOT, 'journal-content');

var args = process.argv.slice(2);
var VERBOSE = args.includes('--verbose');
var CHECK_EXTERNAL = args.includes('--external');

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LOGGING UTILITIES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function log(msg: string) { process.stdout.write(msg + '\n'); }
function ok(msg: string) { log('  ✅  ' + msg); }
function warn(msg: string) { log('  ⚠️  ' + msg); }
function fail(msg: string) { process.stderr.write('  ❌  ' + msg + '\n'); }
function info(msg: string) { log('  ℹ️  ' + msg); }
function verbose(msg: string) { if (VERBOSE) log('       ' + msg); }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LINK TYPES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface FoundLink {
  text: string;
  url: string;
  sourceFile: string;
  line: number;
  type: 'internal' | 'external' | 'anchor';
}

interface LinkResult {
  link: FoundLink;
  status: 'ok' | 'broken' | 'skipped' | 'warn';
  reason?: string;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LINK EXTRACTION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

var LINK_RE = /\[([^\]]*)\]\(([^)]+)\)/g;

function extractLinks(content: string, filePath: string): FoundLink[] {
  var links: FoundLink[] = [];
  var lines = content.split('\n');

  for (var lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    var line = lines[lineIdx];
    LINK_RE.lastIndex = 0;
    var match: RegExpExecArray | null;

    while ((match = LINK_RE.exec(line)) !== null) {
      var text = match[1];
      var url = match[2].trim();

      // Strip title attribute (e.g. [text](url "title"))
      var urlWithoutTitle = url.replace(/\s+"[^"]*"$/, '').trim();

      var type: 'internal' | 'external' | 'anchor';
      if (urlWithoutTitle.startsWith('#')) {
        type = 'anchor';
      } else if (urlWithoutTitle.startsWith('/') || urlWithoutTitle.startsWith('./') || urlWithoutTitle.startsWith('../')) {
        type = 'internal';
      } else if (urlWithoutTitle.startsWith('http://') || urlWithoutTitle.startsWith('https://')) {
        type = 'external';
      } else {
        // Relative file path — treat as internal
        type = 'internal';
      }

      links.push({
        text: text,
        url: urlWithoutTitle,
        sourceFile: filePath.replace(PROJECT_ROOT + '/', ''),
        line: lineIdx + 1,
        type: type,
      });
    }
  }

  return links;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   INTERNAL LINK RESOLUTION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

// Known route patterns — internal links to these paths are valid SPA routes
var KNOWN_ROUTE_PREFIXES = [
  '/journal/',
  '/about',
  '/about/',
];

function resolveInternal(link: FoundLink): LinkResult {
  var url = link.url;

  // Strip hash fragment
  var urlBase = url.split('#')[0];
  if (!urlBase) {
    // Pure anchor link — can't validate without DOM
    return { link: link, status: 'skipped', reason: 'anchor-only link — not validated' };
  }

  // Known SPA routes
  for (var i = 0; i < KNOWN_ROUTE_PREFIXES.length; i++) {
    if (urlBase.startsWith(KNOWN_ROUTE_PREFIXES[i]) || urlBase === KNOWN_ROUTE_PREFIXES[i].replace(/\/$/, '')) {
      verbose('[' + link.text + '](' + url + ') — known route (' + KNOWN_ROUTE_PREFIXES[i] + ')');
      return { link: link, status: 'ok' };
    }
  }

  // Try resolving as a filesystem path from project root
  var absPath = urlBase.startsWith('/')
    ? join(PROJECT_ROOT, urlBase)
    : join(PROJECT_ROOT, 'journal-content', urlBase);

  if (existsSync(absPath)) {
    verbose('[' + link.text + '](' + url + ') — file exists');
    return { link: link, status: 'ok' };
  }

  // Try with common extensions
  var extensions = ['.md', '.ts', '.tsx', '.json'];
  for (var e = 0; e < extensions.length; e++) {
    if (existsSync(absPath + extensions[e])) {
      verbose('[' + link.text + '](' + url + ') — resolved as ' + urlBase + extensions[e]);
      return { link: link, status: 'ok' };
    }
  }

  return {
    link: link,
    status: 'broken',
    reason: 'No file or known route found at: ' + urlBase,
  };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EXTERNAL LINK CHECK
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function checkExternal(link: FoundLink): Promise<LinkResult> {
  return new Promise(function (resolve) {
    var url = link.url;
    var proto = url.startsWith('https') ? https : http;
    var req = proto.request(url, { method: 'HEAD', timeout: 8000 }, function (res) {
      var status = res.statusCode ?? 0;
      if (status >= 200 && status < 400) {
        resolve({ link: link, status: 'ok' });
      } else {
        resolve({ link: link, status: 'warn', reason: 'HTTP ' + status });
      }
    });
    req.on('error', function (err) {
      resolve({ link: link, status: 'warn', reason: err.message });
    });
    req.on('timeout', function () {
      req.destroy();
      resolve({ link: link, status: 'warn', reason: 'Request timed out' });
    });
    req.end();
  });
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
    .filter(function (name) { return extname(name) === '.md'; })
    .map(function (name) { return join(dir, name); })
    .sort();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

async function main() {
  log('\nChecking journal link integrity...\n');

  var files = collectMarkdownFiles(JOURNAL_DIR);

  if (files.length === 0) {
    warn('No .md files found in journal-content/');
    process.exit(0);
  }

  info('Scanning ' + files.length + ' file(s)...\n');

  var allLinks: FoundLink[] = [];
  for (var i = 0; i < files.length; i++) {
    var content = readFileSync(files[i], 'utf-8');
    var links = extractLinks(content, files[i]);
    allLinks = allLinks.concat(links);
  }

  var internal = allLinks.filter(function (l) { return l.type === 'internal'; });
  var external = allLinks.filter(function (l) { return l.type === 'external'; });
  var anchors = allLinks.filter(function (l) { return l.type === 'anchor'; });

  info('Found ' + allLinks.length + ' link(s): '
    + internal.length + ' internal, '
    + external.length + ' external, '
    + anchors.length + ' anchors\n');

  var broken: LinkResult[] = [];
  var warnings: LinkResult[] = [];

  // Check internal links
  for (var j = 0; j < internal.length; j++) {
    var result = resolveInternal(internal[j]);
    if (result.status === 'broken') {
      broken.push(result);
    } else if (result.status === 'warn') {
      warnings.push(result);
    } else if (result.status === 'ok' && VERBOSE) {
      ok(result.link.sourceFile + ':' + result.link.line + ' [' + result.link.text + '](' + result.link.url + ')');
    }
  }

  // Check external links (optional)
  if (CHECK_EXTERNAL && external.length > 0) {
    log('Checking ' + external.length + ' external link(s) (slow)...\n');
    var extChecks = await Promise.all(external.map(checkExternal));
    for (var k = 0; k < extChecks.length; k++) {
      var extResult = extChecks[k];
      if (extResult.status === 'warn') {
        warnings.push(extResult);
      } else if (extResult.status === 'ok' && VERBOSE) {
        ok(extResult.link.sourceFile + ':' + extResult.link.line + ' ' + extResult.link.url);
      }
    }
  } else if (external.length > 0) {
    info('Skipping external link checks (run with --external to include)');
    if (VERBOSE) {
      for (var ex = 0; ex < external.length; ex++) {
        verbose('  external: ' + external[ex].url + ' (' + external[ex].sourceFile + ':' + external[ex].line + ')');
      }
    }
  }

  // Report broken links
  if (broken.length > 0) {
    log('');
    for (var b = 0; b < broken.length; b++) {
      var br = broken[b];
      fail(br.link.sourceFile + ':' + br.link.line
        + ' [' + br.link.text + '](' + br.link.url + ')'
        + (br.reason ? ' — ' + br.reason : ''));
    }
  }

  // Report warnings
  if (warnings.length > 0) {
    log('');
    for (var w = 0; w < warnings.length; w++) {
      var wn = warnings[w];
      warn(wn.link.sourceFile + ':' + wn.link.line
        + ' [' + wn.link.text + '](' + wn.link.url + ')'
        + (wn.reason ? ' — ' + wn.reason : ''));
    }
  }

  log('');

  if (broken.length > 0) {
    fail(broken.length + ' broken internal link(s) found.\n');
    process.exit(1);
  }

  ok('All internal links are valid.\n');
}

main();
