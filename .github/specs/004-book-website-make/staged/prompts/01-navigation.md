# Prompt 01 — Navigation, footer and human sitemap

Stage: 01 · Requirements: NAV-01, NAV-02 · Tasks: NAV-T001–T007 · Context: TOA-446 (reference only)

```text
GOAL
Remove deferred navigation exposure for Events, Speaking and Media without
deleting pages or routes, and apply the approved human-sitemap treatment.

INSPECT
src/app/data/mock/book-site.ts           (bookSiteData.nav, footerGroups)
src/app/components/common/Header.tsx
src/app/components/common/Footer.tsx
src/app/components/pages/SitemapPage.tsx (local bookPages)
src/app/routes.ts
Conditional CSS, only if active: src/styles/blocks/footer.css,
mobile-menu.css, sitemap-page.css (header.css is not imported at 55079087).
Do not substitute ui/navigation.ts or ui/sitemap.ts.

PROPOSE (verify destinations first; stop affected mappings if they differ)
Menu:    remove Events /events, Speaking /speaking, Media /media.
Footer:  in "Author & Press" remove Speaking & Workshops /speaking,
         Events /events, Media & Press /media; keep About Ash and Contact;
         keep the heading unless separately approved (decisions Q-05).
Sitemap: omit Events, Speaking & workshops, Media & press (decisions
         D-12).
         Omit Thank you /thank-you and Style guide /style-guide; withhold
         Draft viewer /draft-viewer and Ebook reader /ebook (decisions
         D-15). Routes and pages stay.
         Keep Read the draft /read-the-draft.

PRESERVE
All routes including /speaking, /events, /media, /read-the-draft,
/read-the-book; retained-item order; confirmation journeys; unrelated
labels, assets and styling. /ebook, /draft-viewer and the reading entry are
not interchangeable. Prefer data edits; Header/Footer/CSS only with a
demonstrated need shown in the preview.

EXCLUDE
public/sitemap.xml, public/robots.txt, noindex, canonical origin, search
removal, /privacy or /terms repairs (report only), social links, footer-data
properties, page deletion, new destinations, theme work.

ACCEPTANCE
NAV-01: the three destinations are absent from menu and footer; routes
unchanged; desktop and narrow layouts usable.
NAV-02: all seven approved omissions/withholdings applied; reading entry
retained.
Proposed checks: V-NAV-01–05 (open/close, Escape, focus return,
containment, scrolling). Report pre-existing failures separately.
```

```text
PROTOCOL (applies to this stage; self-contained)
1. Goal and stage are named above. Do only this stage.
2. Re-read: .github/specs/004-book-website-make/staged/spec.md, plan.md (this
   stage), tasks.md (this phase), decisions.md, sources.md, verification.md
   and this prompt file. Do not rely on chat memory, Linear or skills.
3. Record the current Make snapshot (branch, local commit) and its relation
   to GitHub main. Do not assume they match or infer a push.
4. Inspect the actual files and active consumers listed in this prompt. Similar names
   are not proof of use. Label each path: verified / inferred counterpart /
   proposed new.
5. Restate the requirements, acceptance criteria and exclusions in this prompt.
6. Show exact proposed diffs or new-file bodies BEFORE any edit.
7. List intentional non-changes and consequential effects.
8. STOP for Ash's exact approval and bounded authority to resume.
9. After approval, re-read affected files before writing.
10. If source changed materially since the preview, stop for revised approval.
11. Perform only checks Ash authorised; report results as passed / failed /
    Not run. Separate static, calculated, runtime and deployment evidence.
12. Report actual changed files and results, then stop at the checkpoint:
    - all required checks passed or exceptions explicitly accepted, no
      blocking findings → list changed files, checks, exceptions, target
      repository lightspeedwp/ThisOneTimeOnAcidCom and branch main; note a
      push to main may trigger a Netlify production deploy; end with the
      standalone line:  Commit to GitHub
    - otherwise end with:  Blocked — do not commit yet
   Do not start the next stage until Ash confirms the checkpoint and asks.

PERMISSIONS
Never: commit, push, create branches/PRs, publish, deploy, install packages,
change dependencies, provision providers, upload media, change credentials,
edit governance/workflows/skills/guidelines, change Linear records.
Make's current source is the editing target, not the product or design
authority. Use UK English. Do not invent biography, media, rights or credits.
```
