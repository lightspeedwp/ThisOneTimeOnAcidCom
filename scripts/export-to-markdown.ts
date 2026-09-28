#!/usr/bin/env tsx
/**
 * Export all mock data content to editable markdown files.
 * Run: node --import ./scripts/figma-asset-register.mjs --no-warnings \
 *        $(npx which tsx 2>/dev/null || echo tsx) ./scripts/export-to-markdown.ts
 *
 * Or via: npm run export-content
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.resolve(ROOT, "src/content");
const TMP = path.join(os.tmpdir(), "md-export-" + process.pid);
fs.mkdirSync(TMP, { recursive: true });

/**
 * For TypeScript files that have `import x from 'figma:asset/...'` statements,
 * we strip those lines (replacing with `const x = ""`), write a sibling .tmp.ts
 * file next to the original (so relative imports still resolve), import it, then delete.
 */
async function importWithFigmaMock(absPath: string): Promise<Record<string, unknown>> {
  let src = fs.readFileSync(absPath, "utf-8");
  src = src.replace(
    /^import\s+(\w+)\s+from\s+['"]figma:asset\/[^'"]+['"]\s*;?\s*$/gm,
    (_m, name) => `const ${name} = "";`
  );
  const tmpFile = absPath.replace(/\.ts$/, ".__tmp__.ts");
  fs.writeFileSync(tmpFile, src, "utf-8");
  try {
    // Cache-bust with a query string so Node doesn't serve a cached version
    const mod = await import(pathToFileURL(tmpFile).href + "?t=" + Date.now());
    return mod as Record<string, unknown>;
  } finally {
    try { fs.unlinkSync(tmpFile); } catch { /* ignore */ }
  }
}

// ── helpers ────────────────────────────────────────────────────────────────

function mkdir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(filePath: string, content: string) {
  mkdir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`  ✓  ${path.relative(ROOT, filePath)}`);
}

function yamlStr(v: unknown): string {
  if (v === null || v === undefined) return '""';
  const s = String(v);
  if (/[:#\[\]{}&*!|>'"%@`,\n\r]/.test(s) || s.includes("\\") || s.trim() !== s)
    return JSON.stringify(s);
  return s;
}

function frontmatter(fields: Record<string, unknown>): string {
  const lines = ["---"];
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      if (v.length === 0) continue;
      lines.push(`${k}:`);
      v.forEach((item) => lines.push(`  - ${yamlStr(item)}`));
    } else {
      lines.push(`${k}: ${yamlStr(v)}`);
    }
  }
  lines.push("---", "");
  return lines.join("\n");
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, "");
}

// ── 1. JOURNAL POSTS ──────────────────────────────────────────────────────

async function exportJournalPosts() {
  console.log("\n📓 Journal posts");
  const mod = await import("../src/app/data/mock/journal-posts.js");
  const posts = mod.journalPosts as any[];
  const dir = path.join(OUT, "journal");
  for (const p of posts) {
    const fm = frontmatter({
      type: "journal-post",
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      featuredImage: p.featuredImage,
      publishedAt: p.publishedAt,
    });
    const body = p.excerpt ? `${p.excerpt}\n` : "";
    write(path.join(dir, `${p.slug}.md`), fm + body);
  }
}

// ── 2. BLOG POSTS ─────────────────────────────────────────────────────────

async function exportBlogPosts() {
  console.log("\n📝 Blog posts");
  const dir = path.join(OUT, "blog");

  async function exportPosts(modPath: string, label: string) {
    const absPath = path.resolve(ROOT, modPath.replace("../", "").replace(/\.js$/, ".ts"));
    const hasFigma = fs.readFileSync(absPath, "utf-8").includes("figma:asset/");
    const mod = hasFigma
      ? await importWithFigmaMock(absPath)
      : await import(modPath);
    const posts: any[] =
      mod.blogPosts ?? mod.timelineBlogPosts ?? mod.phase8Posts ?? [];
    for (const p of posts) {
      const slug = p.slug ?? slugify(p.title ?? p.id ?? "post");
      const fm = frontmatter({
        type: "blog-post",
        id: p.id,
        slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        author: p.author?.name ?? p.author,
        publishedAt: p.publishedAt,
        updatedAt: p.updatedAt,
        tags: p.tags,
        featured: p.featured,
        readTime: p.readTime,
        featuredImage: p.featuredImage?.src ?? p.featuredImage ?? "",
        featuredImageAlt: p.featuredImage?.alt ?? "",
        featuredImageCaption: p.featuredImage?.caption ?? "",
      });
      const body = p.content ?? p.excerpt ?? "";
      write(path.join(dir, `${slug}.md`), fm + body + "\n");

      if (Array.isArray(p.faqs) && p.faqs.length > 0) {
        let faqBlock = "\n\n## FAQs\n";
        for (const faq of p.faqs) {
          faqBlock += `\n### ${faq.question}\n\n${faq.answer}\n`;
        }
        fs.appendFileSync(path.join(dir, `${slug}.md`), faqBlock);
      }
    }
    console.log(`   ${label}: ${posts.length} posts`);
  }

  await exportPosts("../src/app/data/mock/blog/posts.js", "Main posts");
  await exportPosts("../src/app/data/mock/blog/posts-timeline.js", "Timeline posts");
  await exportPosts("../src/app/data/mock/blog/posts-phase8.js", "Phase 8 posts");
}

// ── 3. EVENTS ─────────────────────────────────────────────────────────────

async function exportEvents() {
  console.log("\n🎪 Events");
  const dir = path.join(OUT, "events");

  const eventFiles = [
    ["../src/app/data/mock/events/organik.js", "organik"],
    ["../src/app/data/mock/events/origin-festival.js", "originFestival"],
    ["../src/app/data/mock/events/nation-of-gondwana.js", "nationOfGondwana"],
    ["../src/app/data/mock/events/vortex.js", "vortex"],
  ] as const;

  for (const [modPath, exportKey] of eventFiles) {
    const absPath = path.resolve(ROOT, modPath.replace("../", ""));
    const mod = await import(modPath);
    const e: any = mod[exportKey] ?? Object.values(mod).find((v) => v && typeof v === "object" && !Array.isArray(v) && (v as any).slug);
    if (!e) continue;

    const appearances: any[] = e.appearances ?? [];
    const upcomingApps = appearances.filter((a: any) => a.status === "upcoming");
    const pastApps = appearances.filter((a: any) => a.status !== "upcoming");

    const fm = frontmatter({
      type: "event",
      id: e.id,
      slug: e.slug,
      name: e.name,
      tagline: e.tagline,
      eventType: e.type,
      genre: e.genre,
      website: e.website,
      venueName: e.location?.venue,
      city: e.location?.city,
      country: e.location?.country,
      recurring: e.recurring,
    });

    let body = `# ${e.name}\n\n${e.description ?? ""}\n`;

    if (e.location) {
      body += `\n## Location\n\n`;
      body += `**Venue:** ${e.location.venue ?? "TBC"}  \n`;
      body += `**City:** ${e.location.city ?? ""}  \n`;
      body += `**Country:** ${e.location.country ?? ""}  \n`;
      if (e.location.description) body += `\n${e.location.description}\n`;
    }

    if (Array.isArray(e.genre) && e.genre.length) {
      body += `\n## Music\n\n${e.genre.join(", ")}\n`;
    }

    if (upcomingApps.length) {
      body += `\n## Upcoming Appearances\n\n`;
      for (const a of upcomingApps) {
        body += `### ${a.year ?? ""} — ${a.edition ?? e.name}\n\n`;
        if (a.dates) body += `**Dates:** ${a.dates}\n\n`;
        if (a.role) body += `**Role:** ${a.role}\n\n`;
        if (a.notes) body += `${a.notes}\n\n`;
      }
    }

    if (pastApps.length) {
      body += `\n## Past Appearances\n\n`;
      for (const a of pastApps) {
        body += `### ${a.year ?? ""} — ${a.edition ?? e.name}\n\n`;
        if (a.dates) body += `**Dates:** ${a.dates}\n\n`;
        if (a.role) body += `**Role:** ${a.role}\n\n`;
        if (a.notes) body += `${a.notes}\n\n`;
      }
    }

    write(path.join(dir, `${e.slug}.md`), fm + body);
  }
}

// ── 4. FAQ ────────────────────────────────────────────────────────────────

async function exportFaq() {
  console.log("\n❓ FAQ");
  const mod = await import("../src/app/data/mock/sections/faq.js");
  const dir = path.join(OUT, "faq");

  // Global FAQ
  const global: any[] = mod.faqData ?? [];
  if (global.length) {
    let body = frontmatter({ type: "faq-group", pageId: "global", title: "Frequently Asked Questions" });
    body += "# Frequently Asked Questions\n\n";
    for (const item of global) {
      body += `## ${item.question}\n\n${item.answer}\n\n`;
    }
    write(path.join(dir, "global.md"), body);
  }

  // Per-page FAQ groups
  const groups: any[] = mod.faqGroups ?? [];
  for (const group of groups) {
    let body = frontmatter({ type: "faq-group", pageId: group.pageId, title: group.title, description: group.description });
    body += `# ${group.title}\n\n`;
    if (group.description) body += `${group.description}\n\n`;
    for (const item of group.faqs ?? []) {
      body += `## ${item.question}\n\n${item.answer}\n\n`;
    }
    write(path.join(dir, `${group.pageId}.md`), body);
  }
}

// ── 5. TESTIMONIALS ───────────────────────────────────────────────────────

async function exportTestimonials() {
  console.log("\n⭐ Testimonials");
  const mod = await import("../src/app/data/mock/testimonials/index.js");
  const items: any[] = mod.testimonials ?? [];
  const dir = path.join(OUT, "testimonials");

  for (const t of items) {
    const slug = t.id ?? slugify(t.name);
    const fm = frontmatter({
      type: "testimonial",
      id: t.id,
      name: t.name,
      role: t.role,
      event: t.event,
      rating: t.rating,
      date: t.date,
      featured: t.featured,
    });
    write(path.join(dir, `${slug}.md`), fm + (t.text ?? "") + "\n");
  }

  // Section header content
  const section: any = mod.testimonialsSectionContent ?? {};
  if (section.title) {
    const fm = frontmatter({ type: "section-content", section: "testimonials" });
    write(path.join(dir, "_section.md"), fm + `# ${section.title}\n\n${section.description ?? ""}\n`);
  }
}

// ── 6. TIMELINE ───────────────────────────────────────────────────────────

async function exportTimeline() {
  console.log("\n📅 Timeline");
  const mod = await import("../src/app/data/mock/timeline/index.js");
  const entries: any[] = mod.timelineEntries ?? mod.entries ?? [];
  const categories: any[] = mod.timelineCategories ?? [];
  const dir = path.join(OUT, "timeline");

  // Combined timeline file
  let combined = frontmatter({ type: "timeline", version: "1.0.0" });
  combined += "# Ash Shaw — Life Timeline\n\n";

  const sorted = [...entries].sort((a, b) =>
    (a.sortDate ?? a.date ?? "").localeCompare(b.sortDate ?? b.date ?? "")
  );

  for (const e of sorted) {
    combined += `## ${e.date} — ${e.title}\n\n`;
    combined += `**Significance:** ${e.significance ?? "standard"}  \n`;
    if (e.categories?.length) combined += `**Categories:** ${e.categories.join(", ")}  \n`;
    if (e.link) combined += `**Link:** ${e.link}  \n`;
    combined += `\n${e.description ?? ""}\n\n---\n\n`;
  }
  write(path.join(dir, "timeline.md"), combined);

  // Also one file per entry for easy editing
  for (const e of entries) {
    const slug = e.id ?? slugify(`${e.sortDate ?? e.date ?? "entry"}-${e.title}`);
    const fm = frontmatter({
      type: "timeline-entry",
      id: e.id,
      date: e.date,
      sortDate: e.sortDate,
      title: e.title,
      significance: e.significance,
      categories: e.categories,
      icon: e.icon,
      link: e.link,
    });
    write(path.join(dir, "entries", `${slug}.md`), fm + (e.description ?? "") + "\n");
  }

  // Categories reference
  if (categories.length) {
    let catBody = frontmatter({ type: "timeline-categories" });
    catBody += "# Timeline Categories\n\n";
    for (const c of categories) {
      catBody += `## ${c.label}\n\n`;
      catBody += `- **ID:** ${c.id}\n`;
      catBody += `- **Color:** ${c.hex}\n`;
      catBody += `- **Icon:** ${c.icon}\n\n`;
    }
    write(path.join(dir, "categories.md"), catBody);
  }
}

// ── 7. PODCASTS ───────────────────────────────────────────────────────────

async function exportPodcasts() {
  console.log("\n🎙️ Podcasts");
  const dir = path.join(OUT, "podcasts");

  async function exportEps(modPath: string, label: string) {
    const mod = await import(modPath);
    const episodes: any[] =
      mod.season1Episodes ?? mod.podcastEpisodes ?? mod.episodes ?? [];
    for (const ep of episodes) {
      const slug = ep.slug ?? slugify(ep.title ?? ep.id ?? "episode");
      const fm = frontmatter({
        type: "podcast-episode",
        id: ep.id,
        slug,
        title: ep.title,
        description: ep.description,
        season: ep.season,
        episode: ep.episode,
        publishedAt: ep.publishedAt,
        duration: ep.duration,
        tags: ep.tags,
        audioUrl: ep.audioUrl,
      });
      const body = ep.content ?? ep.transcript ?? ep.description ?? "";
      write(path.join(dir, `${slug}.md`), fm + body + "\n");
    }
    console.log(`   ${label}: ${episodes.length} episodes`);
  }

  await exportEps("../src/app/data/mock/podcasts/episodes-season1.js", "Season 1");
  await exportEps("../src/app/data/mock/podcasts/episodes.js", "All episodes");
}

// ── 8. VIDEOS ─────────────────────────────────────────────────────────────

async function exportVideos() {
  console.log("\n🎬 Videos");
  const mod = await import("../src/app/data/mock/videos/entries.js");
  const videos: any[] = mod.videos ?? [];
  const dir = path.join(OUT, "videos");

  for (const v of videos) {
    const slug = v.slug ?? slugify(v.title ?? v.id ?? "video");
    const fm = frontmatter({
      type: "video",
      id: v.id,
      slug,
      title: v.title,
      description: v.description,
      videoUrl: v.videoUrl,
      platform: v.platform,
      duration: v.duration,
      category: v.category,
      tags: v.tags,
      featured: v.featured,
      publishedAt: v.publishedAt,
      views: v.views,
      likes: v.likes,
    });
    let body = v.content ?? v.description ?? "";
    if (Array.isArray(v.faqs) && v.faqs.length > 0) {
      body += "\n\n## FAQs\n";
      for (const faq of v.faqs) {
        body += `\n### ${faq.question}\n\n${faq.answer}\n`;
      }
    }
    write(path.join(dir, `${slug}.md`), fm + body + "\n");
  }
}

// ── 9. PORTFOLIO ──────────────────────────────────────────────────────────

async function exportPortfolio() {
  console.log("\n🎨 Portfolio");
  const dir = path.join(OUT, "portfolio");

  const portfolioFiles = [
    ["../src/app/data/mock/portfolio/festivals.js", "festivalWork", "festivals"],
    ["../src/app/data/mock/portfolio/nail-art.js", "nailArtWork", "nail-art"],
    ["../src/app/data/mock/portfolio/uv-makeup.js", "uvMakeupWork", "uv-makeup"],
    ["../src/app/data/mock/portfolio/swiss-festivals.js", "swissFestivalWork", "swiss-festivals"],
    ["../src/app/data/mock/portfolio/thailand.js", "thailandWork", "thailand"],
    ["../src/app/data/mock/portfolio/editorial.js", "editorialWork", "editorial"],
  ] as const;

  for (const [modPath, exportKey, subdir] of portfolioFiles) {
    try {
      const absPath = path.resolve(ROOT, modPath.replace("../", "")).replace(/\.js$/, ".ts");
      const hasFigma = fs.readFileSync(absPath, "utf-8").includes("figma:asset/");
      const mod = hasFigma
        ? await importWithFigmaMock(absPath)
        : await import(modPath);
      const items: any[] =
        (mod as any)[exportKey] ??
        Object.values(mod).find((v) => Array.isArray(v)) as any[] ??
        [];
      for (const item of items) {
        const slug = item.slug ?? slugify(item.title ?? item.id ?? "item");
        const fm = frontmatter({
          type: "portfolio-item",
          id: item.id,
          slug,
          title: item.title,
          category: item.category,
          date: item.date,
          location: item.location,
          tags: item.tags,
          featured: item.featured,
        });
        let body = `# ${item.title ?? ""}\n\n`;
        if (item.description) body += `${item.description}\n\n`;
        if (item.body) body += `${item.body}\n\n`;

        if (Array.isArray(item.images) && item.images.length) {
          body += `## Images\n\n`;
          for (const img of item.images) {
            const src = img.src ?? img.url ?? "";
            const alt = img.alt ?? img.title ?? "";
            const cap = img.caption ?? img.description ?? "";
            body += `![${alt}](${src})\n`;
            if (cap) body += `*${cap}*\n`;
            body += "\n";
          }
        }

        if (Array.isArray(item.faqs) && item.faqs.length) {
          body += `## FAQs\n\n`;
          for (const faq of item.faqs) {
            body += `### ${faq.question}\n\n${faq.answer}\n\n`;
          }
        }

        write(path.join(dir, subdir, `${slug}.md`), fm + body);
      }
      console.log(`   ${subdir}: ${items.length} items`);
    } catch (e) {
      console.warn(`   ⚠ skipped ${subdir}: ${e}`);
    }
  }
}

// ── 10. PAGES ─────────────────────────────────────────────────────────────

async function exportPages() {
  console.log("\n📄 Pages");
  const dir = path.join(OUT, "pages");

  // HOME
  {
    const mod = await import("../src/app/data/mock/pages/home.js");
    const hero: any = mod.homepageHero ?? {};
    const why: any[] = mod.whyReasons ?? [];
    const whySec: any = mod.whySectionContent ?? {};
    const fm = frontmatter({ type: "page", slug: "home", title: hero.title });
    let body = `# ${hero.title ?? "Home"}\n\n`;
    if (hero.subtitle) body += `**${hero.subtitle}**\n\n`;
    if (hero.description) body += `${hero.description}\n\n`;
    if (hero.ctaText) body += `CTA: [${hero.ctaText}](${hero.ctaLink ?? "#"})\n\n`;
    if (whySec.title) {
      body += `## ${whySec.title}\n\n`;
      if (whySec.subtitle) body += `*${whySec.subtitle}*\n\n`;
    }
    for (const r of why) {
      body += `### ${r.title}\n\n${r.description}\n\n`;
    }
    write(path.join(dir, "home.md"), fm + body);
  }

  // CONTACT
  {
    const mod = await import("../src/app/data/mock/pages/contact.js");
    const d: any = mod.contactPageContent ?? {};
    const fm = frontmatter({ type: "page", slug: "contact", title: d.hero?.title });
    let body = `# ${d.hero?.title ?? "Contact"}\n\n`;
    if (d.hero?.subtitle) body += `**${d.hero.subtitle}**\n\n`;
    if (d.hero?.description) body += `${d.hero.description}\n\n`;
    if (d.about?.title) {
      body += `## ${d.about.title}\n\n${d.about.description ?? ""}\n\n`;
      if (d.about.quote) body += `> ${d.about.quote}\n\n`;
    }
    if (d.contactInfo) {
      body += `## Contact Information\n\n`;
      if (d.contactInfo.email) body += `**Email:** ${d.contactInfo.email}\n\n`;
      if (d.contactInfo.location) body += `**Location:** ${d.contactInfo.location}\n\n`;
    }
    write(path.join(dir, "contact.md"), fm + body);
  }

  // MANIFESTO
  {
    const mod = await import("../src/app/data/mock/pages/manifesto.js");
    const d: any = mod.manifestoPageData ?? {};
    const fm = frontmatter({ type: "page", slug: "manifesto", title: d.hero?.title });
    let body = `# ${d.hero?.title ?? "Manifesto"}\n\n`;
    if (d.hero?.description) body += `${d.hero.description}\n\n`;
    for (const s of d.sections ?? []) {
      body += `## ${s.title}\n\n${s.content}\n\n`;
    }
    if (d.footerQuote) body += `> ${d.footerQuote}\n`;
    write(path.join(dir, "manifesto.md"), fm + body);
  }

  // PRESS
  {
    const mod = await import("../src/app/data/mock/pages/press.js");
    const d: any = mod.pressKitData ?? {};
    const fm = frontmatter({ type: "page", slug: "press", title: d.hero?.title });
    let body = `# ${d.hero?.title ?? "Press"}\n\n`;
    if (d.hero?.subtitle) body += `**${d.hero.subtitle}**\n\n`;
    if (d.hero?.description) body += `${d.hero.description}\n\n`;

    if (d.bios) {
      body += `## Biographies\n\n`;
      for (const [, bio] of Object.entries(d.bios as Record<string, any>)) {
        body += `### ${bio.title}\n\n${bio.content}\n\n`;
      }
    }

    const quotes: any[] = d.quotes ?? [];
    if (quotes.length) {
      body += `## Press Quotes\n\n`;
      for (const q of quotes) {
        body += `> ${q.text}\n>\n> — ${q.source}${q.publication ? `, *${q.publication}*` : ""}${q.date ? ` (${q.date})` : ""}\n\n`;
      }
    }

    const topics: any[] = d.speakingTopics ?? [];
    if (topics.length) {
      body += `## Speaking Topics\n\n`;
      for (const t of topics) {
        body += `### ${t.title}\n\n${t.description}\n\n`;
      }
    }

    write(path.join(dir, "press.md"), fm + body);
  }

  // GEAR
  {
    const mod = await import("../src/app/data/mock/pages/gear.js");
    const d: any = mod.gearPageData ?? {};
    const fm = frontmatter({ type: "page", slug: "gear", title: d.hero?.title });
    let body = `# ${d.hero?.title ?? "Gear"}\n\n`;
    if (d.hero?.subtitle) body += `**${d.hero.subtitle}**\n\n`;
    if (d.hero?.description) body += `${d.hero.description}\n\n`;

    for (const cat of d.categories ?? []) {
      body += `## ${cat.title}\n\n${cat.description ?? ""}\n\n`;
      for (const item of cat.items ?? []) {
        body += `### ${item.name}\n\n${item.desc}  \n**Usage:** ${item.usage}\n\n`;
      }
    }

    if (d.brands?.length) {
      body += `## Recommended Brands\n\n`;
      for (const b of d.brands) {
        body += `### [${b.name}](${b.url})\n\n*${b.tagline}*\n\n${b.specialty}  \nFeatured: ${b.featured}\n\n`;
      }
    }

    write(path.join(dir, "gear.md"), fm + body);
  }

  // LEGAL
  {
    const mod = await import("../src/app/data/mock/pages/legal.js");
    const privacy: any = mod.privacyPolicy ?? {};
    const terms: any = mod.termsOfService ?? {};

    if (privacy.title) {
      const fm = frontmatter({ type: "page", slug: "privacy-policy", title: privacy.title, lastUpdated: privacy.lastUpdated });
      let body = `# ${privacy.title}\n\n*Last updated: ${privacy.lastUpdated ?? ""}*\n\n${privacy.intro ?? ""}\n\n`;
      for (const s of privacy.sections ?? []) {
        body += `## ${s.heading}\n\n${stripHtml(s.content)}\n\n`;
        if (s.list?.length) {
          for (const li of s.list) body += `- ${stripHtml(li)}\n`;
          body += "\n";
        }
      }
      write(path.join(dir, "privacy-policy.md"), fm + body);
    }

    if (terms.title) {
      const fm = frontmatter({ type: "page", slug: "terms-of-service", title: terms.title, lastUpdated: terms.lastUpdated });
      let body = `# ${terms.title}\n\n*Last updated: ${terms.lastUpdated ?? ""}*\n\n${terms.intro ?? ""}\n\n`;
      for (const s of terms.sections ?? []) {
        body += `## ${s.heading}\n\n${stripHtml(s.content)}\n\n`;
        if (s.list?.length) {
          for (const li of s.list) body += `- ${stripHtml(li)}\n`;
          body += "\n";
        }
      }
      write(path.join(dir, "terms-of-service.md"), fm + body);
    }
  }

  // MANIFESTO (tribes)
  {
    const mod = await import("../src/app/data/mock/pages/tribes.js");
    const d: any = mod.tribesPageData ?? mod.default ?? {};
    if (d.title || d.hero?.title) {
      const title = d.hero?.title ?? d.title ?? "Tribes";
      const fm = frontmatter({ type: "page", slug: "tribes", title });
      let body = `# ${title}\n\n`;
      if (d.hero?.description ?? d.description) body += `${d.hero?.description ?? d.description}\n\n`;
      for (const tribe of d.tribes ?? []) {
        body += `## ${tribe.name}\n\n${tribe.description ?? ""}\n\n`;
        if (tribe.traits?.length) {
          body += `**Traits:**\n`;
          for (const t of tribe.traits) body += `- ${t}\n`;
          body += "\n";
        }
      }
      write(path.join(dir, "tribes.md"), fm + body);
    }
  }

  // HISTORY
  {
    const mod = await import("../src/app/data/mock/pages/history.js");
    const d: any = mod.historyPageData ?? mod.default ?? {};
    if (d.hero?.title ?? d.title) {
      const title = d.hero?.title ?? d.title ?? "History";
      const fm = frontmatter({ type: "page", slug: "history", title });
      let body = `# ${title}\n\n`;
      if (d.hero?.description ?? d.description) body += `${d.hero?.description ?? d.description}\n\n`;
      write(path.join(dir, "history.md"), fm + body);
    }
  }

  // SIX CATS
  {
    const mod = await import("../src/app/data/mock/pages/six-cats.js");
    const d: any = mod.sixCatsPageData ?? mod.default ?? {};
    const title = d.hero?.title ?? "Six Cats Club";
    const fm = frontmatter({ type: "page", slug: "six-cats", title });
    let body = `# ${title}\n\n`;
    if (d.hero?.subtitle) body += `**${d.hero.subtitle}**\n\n`;
    if (d.hero?.description) body += `${d.hero.description}\n\n`;

    for (const section of d.sections ?? []) {
      body += `## ${section.title}\n\n${section.content ?? section.description ?? ""}\n\n`;
    }

    if (d.cats?.length) {
      body += `## The Cats\n\n`;
      for (const cat of d.cats) {
        body += `### ${cat.name} *"${cat.nickname}"*\n\n`;
        body += `**Role:** ${cat.role}  \n`;
        if (cat.status === "memorial" && cat.datePassed) body += `**In memory:** passed ${cat.datePassed}  \n`;
        body += `\n${cat.bio}\n\n`;
      }
    }

    if (d.grades?.length) {
      body += `## Grades\n\n`;
      for (const g of d.grades) {
        body += `### Grade ${g.grade}: ${g.name}\n\n*${g.tagline}*\n\n${g.description}\n\n`;
      }
    }

    write(path.join(dir, "six-cats.md"), fm + body);
  }
}

// ── 11. ABOUT PAGES ───────────────────────────────────────────────────────

async function exportAboutPages() {
  console.log("\n👤 About sub-pages");
  const dir = path.join(OUT, "pages", "about");

  const aboutFiles = [
    ["../src/app/data/mock/pages/about/bio.js", "bioPageData", "bio"],
    ["../src/app/data/mock/pages/about/music.js", "musicPageData", "music"],
    ["../src/app/data/mock/pages/about/cycling.js", "cyclingPageData", "cycling"],
    ["../src/app/data/mock/pages/about/fitness.js", "fitnessPageData", "fitness"],
    ["../src/app/data/mock/pages/about/berlin.js", "berlinPageData", "berlin"],
    ["../src/app/data/mock/pages/about/adhd.js", "adhdPageData", "adhd"],
    ["../src/app/data/mock/pages/about/travels.js", "travelsPageData", "travels"],
    ["../src/app/data/mock/pages/about/education.js", "educationPageData", "education"],
    ["../src/app/data/mock/pages/about/lightspeed.js", "lightspeedPageData", "lightspeed"],
    ["../src/app/data/mock/pages/about/lucy.js", "lucyPageData", "lucy"],
    ["../src/app/data/mock/pages/about/aquarius.js", "aquariusPageData", "aquarius"],
    ["../src/app/data/mock/pages/about/process.js", "processPageData", "process"],
    ["../src/app/data/mock/pages/about/podcast.js", "podcastPageData", "podcast"],
    ["../src/app/data/mock/pages/about/book.js", "bookPageData", "book"],
    ["../src/app/data/mock/pages/about/ebook.js", "ebookPageData", "ebook"],
    ["../src/app/data/mock/pages/about/resources.js", "resourcesPageData", "resources"],
    ["../src/app/data/mock/pages/about/partners.js", "partnersPageData", "partners"],
  ] as const;

  for (const [modPath, exportKey, slug] of aboutFiles) {
    try {
      const mod = await import(modPath);
      const d: any = (mod as any)[exportKey] ?? Object.values(mod).find((v) => v && typeof v === "object" && !Array.isArray(v));
      if (!d) continue;

      const title = d.hero?.title ?? slug;
      const fm = frontmatter({
        type: "about-subpage",
        slug,
        title,
        badge: d.hero?.badge,
        description: d.hero?.description,
      });

      let body = `# ${title}\n\n`;
      if (d.hero?.description) body += `${d.hero.description}\n\n`;
      if ((d as any).pullQuote) body += `> ${(d as any).pullQuote}\n\n`;

      // Quick facts
      const facts: any[] = (d as any).quickFacts ?? [];
      if (facts.length) {
        body += `## Quick Facts\n\n`;
        for (const f of facts) body += `- **${f.label}:** ${f.value}\n`;
        body += "\n";
      }

      // Sections
      for (const section of d.sections ?? []) {
        body += `## ${section.title}\n\n`;
        for (const para of section.paragraphs ?? []) body += `${para}\n\n`;
        if (section.content) body += `${section.content}\n\n`;
      }

      // Artists/groups (music page)
      for (const group of (d as any).spotifyGroups ?? []) {
        body += `## ${group.title}\n\n${group.description ?? ""}\n\n`;
        for (const a of group.artists ?? []) body += `- ${a.name}\n`;
        body += "\n";
      }

      // Resources
      for (const resource of (d as any).resources ?? []) {
        body += `## Resources\n\n`;
        body += `### ${resource.title ?? ""}\n\n${resource.description ?? ""}\n\n`;
      }

      write(path.join(dir, `${slug}.md`), fm + body);
    } catch (e) {
      console.warn(`   ⚠ skipped ${slug}: ${e}`);
    }
  }
}

// ── 12. ARTISTRY PAGE (has figma:asset imports) ───────────────────────────

async function exportArtistryPage() {
  console.log("\n🖌️  Artistry page");
  const absPath = path.resolve(ROOT, "src/app/data/mock/pages/artistry.ts");
  const mod = await importWithFigmaMock(absPath);
  const d: any = mod.artistryPageData ?? mod.default ?? {};
  const dir = path.join(OUT, "pages");

  const title = d.hero?.title ?? "Artistry";
  const fm = frontmatter({ type: "page", slug: "artistry", title });
  let body = `# ${title}\n\n`;
  if (d.hero?.subtitle) body += `**${d.hero.subtitle}**\n\n`;
  if (d.hero?.description) body += `${d.hero.description}\n\n`;

  for (const section of d.sections ?? []) {
    body += `## ${section.title}\n\n${section.content ?? section.description ?? ""}\n\n`;
    for (const item of section.items ?? []) {
      body += `### ${item.title ?? item.name ?? ""}\n\n${item.description ?? item.content ?? ""}\n\n`;
    }
  }

  for (const technique of d.techniques ?? []) {
    body += `## ${technique.title}\n\n${technique.description ?? ""}\n\n`;
  }

  write(path.join(dir, "artistry.md"), fm + body);
}

// ── main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 Exporting content to markdown…\n");
  mkdir(OUT);

  const tasks = [
    exportJournalPosts,
    exportBlogPosts,
    exportEvents,
    exportFaq,
    exportTestimonials,
    exportTimeline,
    exportPodcasts,
    exportVideos,
    exportPortfolio,
    exportPages,
    exportAboutPages,
    exportArtistryPage,
  ];

  let total = 0;
  for (const task of tasks) {
    try {
      await task();
    } catch (e) {
      console.error(`  ✗ Error in ${task.name}: ${e}`);
    }
  }

  const allFiles = fs.readdirSync(OUT, { recursive: true }) as string[];
  total = allFiles.filter((f) => String(f).endsWith(".md")).length;
  console.log(`\n✅  Done — ${total} markdown files written to src/content/\n`);
}

main().catch(console.error);
