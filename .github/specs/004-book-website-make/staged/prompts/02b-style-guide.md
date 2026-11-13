# Prompt 02B — Existing style-guide refinement

Stage: 02B · Requirement: GUIDE-01 (with THEME-01, THEME-02) · Tasks: GUIDE-T001–T007 · Context: TOA-445 (reference only)
Prerequisite: Stage 02A checkpoint confirmed.

```text
GOAL
Refine the existing /style-guide section by section. No new page, route or
design system.

EDIT CANDIDATES
src/app/components/pages/StyleGuidePage.tsx
src/styles/blocks/style-guide-page.css
INSPECT ONLY (legacy portfolio identity; never import wholesale)
src/app/data/mock/ui/style-guide.ts, src/app/data/mock/ui/branding.ts

PRESERVE
Route /style-guide, page shell, nine anchors in order:
brand, colors, typography, buttons, forms, cards, tags, icons, content.

SECTIONS
brand:      remove Nova News (repo lines ~84, 288, 371, 374, 615). Use a book
            logo only with an identified approved revision, rights and
            credits (decisions Q-09); otherwise mark unresolved. Missing logo
            approval does not block other corrections.
colors:     label primitive swatches, semantic aliases and computed
            specimens; no static hex shown as a computed theme value.
typography: Space Grotesk headings, Inter body/UI; artwork lettering
            separate; no invented font-loading or licensing evidence.
buttons/forms/cards/tags: reuse evidenced variants and states; specimen
            forms must not submit personal data.
icons:      verify library, use and count; remove unsupported claims.
content:    keep useful patterns; no invented autobiographical copy.
interaction: keyboard-operable swatches and copy controls (swatches lack
            key handling at 55079087), accessible names, truthful copy
            feedback, narrow-screen section navigation, reduced motion.

REPORT SEPARATELY (shared repairs, not silently fixed here)
body.dark selectors vs html-level theme class; nested <main> and duplicate
id="main-content" with RootLayout.

ACCEPTANCE
GUIDE-01: route and nine anchors preserved, no duplicate surface, no Nova
News. Consistent with approved 02A mappings. Checks V-GUIDE-01–02.
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
