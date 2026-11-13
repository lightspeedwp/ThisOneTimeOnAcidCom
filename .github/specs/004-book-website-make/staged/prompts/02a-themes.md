# Prompt 02A — Shared-theme reconciliation

Stage: 02A · Requirements: THEME-01, THEME-02 · Tasks: THEME-T001–T008

```text
GOAL
Reconcile the approved foundations across both themes through explicit
mappings, and make theme state consistent, preserving saved-light choices.

APPROVED FOUNDATIONS
Space Grotesk headings; Inter body/UI.
Palette: #0B0B10 #12121A #171722 #F6F2EB #CFC7BB #9C9488
         #FF3AAE #F4FF3C #8A63FF
Dark interaction choices: decisions D-08. Reconcile dark first; keep light.
Do not adopt R3, T1, RT2 or C1.

TRACE (entry → provider → control → storage → DOM → cascade)
src/main.tsx, src/app/App.tsx, src/app/components/common/RootLayout.tsx,
ThemeProvider.tsx, ThemeToggleES5.tsx, ThemeSwitcher.tsx, Header.tsx,
Footer.tsx, src/styles/index.css, default_theme.css, globals.css,
tokens/content-*.css, themes/light.css, dark.css, dark-extended.css,
themes/brutalist.css (present, not imported at 55079087),
blocks/book-dark-mode.css, book.css, theme-toggle.css, theme-switcher.css.
Repository findings to re-verify: ThemeProvider not mounted; footer switcher
setter is a no-op showing dark; header toggle has separate state, light/dark
only; storage key 'theme'; .dark and data-theme on <html>; modes
light|dark|brutalist; first visit writes 'dark'; globals.css uses #0F0F0F
and #FF10F0.

RETURN FIRST (before any diff)
1. Mapping table: approved role | current variable/value | definition |
   consumer | theme behaviour | conflict | proposed disposition
   (primitive → semantic → component → state).
2. Theme-state trace and missing-context behaviour.
3. Decisions needed: first-visit default, system preference, invalid value,
   unavailable storage, third-mode disposition (decisions Q-06–Q-08).
4. Shared-site repairs vs style-guide-local items.

RULES
No global hex replacement. Do not delete overrides only because duplicated.
Do not remove the brutalist mode without explicit approval. Calculated
contrast, source inspection and browser behaviour are reported separately.
AAA is a target; claim no conformance.

ACCEPTANCE
Both controls reflect the same actual theme; saved light survives reload and
navigation; invalid/unavailable storage falls back without crashing; no
false selected state; approved colours distinguished from verified pairings;
unrelated reader preferences unchanged. Checks V-THEME-01–05.
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
