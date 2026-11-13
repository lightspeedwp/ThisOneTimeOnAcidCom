# TOA - Book website — Design and reader decision register

| Field | Value |
| -- | -- |
| Version | 1.9.0 |
| Document status | Decision register draft; candidate specifications remain unapproved |
| Last revised | 9 November 2026 — Asia/Bangkok |
| Scope | TOA personal book website, design and reader continuity |
| Design and final editorial/publication authority | Ash |
| Approval boundary | Saving this register does not approve embedded proposals, implementation, testing, publication or launch |
| Validation | Static screenshot inspection completed within the recorded boundary; planned behavioural, responsive and accessibility checks remain Not run |

## Purpose and source authority

Record the approved baseline, preserved candidate proposals, unresolved decisions and subsequent review-planning and evidence updates from the 4–5 November 2026 discussion.

This register supports, but does not replace:

* [PRD — This One Time on Acid website and reading experience](https://linear.app/lightspeedwp/document/prd-this-one-time-on-acid-website-and-reading-experience-b7f8974e507e)
* [Design brief — Book website and verified reading experience](https://linear.app/lightspeedwp/document/design-brief-book-website-and-verified-reading-experience-26b0558529b0)
* [Book website brief — author decisions and launch scope](https://linear.app/lightspeedwp/document/book-website-brief-author-decisions-and-launch-scope-8d63b8dda8d8)

The book brief is the starting design baseline. Ash approves exact reconciled values. Existing CSS, theme JSON and unverified Figma do not automatically take precedence. Exclude makeup-portfolio material, styling, biography and voice.

Repository evidence was refreshed through targeted static inspection at `84242de7857e1ec03742e20aaaf1df469f44355f`. It does not establish runtime behaviour, deployment, font loading or accessibility conformance.

## Approved design baseline

### Typography and layout direction

| Role | Confirmed direction |
| -- | -- |
| Interface fonts | Space Grotesk headings; Inter body and UI |
| Hero headings | 48–80px |
| Section headings | 32–48px |
| Card headings | 20–24px |
| Website body | 16–20px; line height 1.6 |
| Reader starting comparison | 18px; line height 1.7; reader adjustment |
| Short supporting text | 14px; not sustained prose or essential instructions |
| Preferred prose measure | 65 characters, allowing responsive narrowing; not a guaranteed count |
| Reading wrapper | Maximum 768px |
| Forms | Maximum 640px |
| Standard content | Maximum 1280px |
| Wide media | Optional 1600px comparison, not universal |

Separately approved cover/logo lettering may fall outside the two-family interface limit. No particular artwork lettering is approved by existing font declarations.

### Dark palette

| Proposed semantic role | Approved value |
| -- | -- |
| Page background | `#0B0B10` |
| Secondary surface | `#12121A` |
| Panel | `#171722` |
| Primary text | `#F6F2EB` |
| Secondary text | `#CFC7BB` |
| Tertiary text | `#9C9488` |
| Pink accent | `#FF3AAE` |
| Yellow accent | `#F4FF3C` |
| Violet accent | `#8A63FF` |

Palette direction is approved; these role assignments do not establish verified component mappings or contrast results.

### Dark interaction choices

Ash approved the displayed candidates on 4 November 2026 at 14:30 Asia/Bangkok as design choices subject to the stated checks—not as verified accessibility results.

| Role | Approved candidate |
| -- | -- |
| Error | `#FF8FA3` text/icon/outline on secondary surface or panel |
| Warning | `#F4FF3C` on dark surfaces |
| Success | `#8DE0B2` on dark surfaces; confirmed outcomes only |
| Focus | `#F4FF3C`; candidate 3px outline, 3px offset; dark separator where needed |
| Decorative border | `#3A3545`; not the sole interactive boundary |
| Control border | `#9C9488` |
| Disabled | `#9C9488` text, `#171722` background, `#3A3545` border; no blanket opacity reduction |
| Hover emphasis | `#CFC7BB` border; links also gain underline emphasis |
| Pressed emphasis | `#F6F2EB` border with a non-colour state cue |
| Primary action | `#FF3AAE` fill, `#0B0B10` label; hover `#FF67C0`; pressed `#E82D98` |
| Secondary action | Default `#12121A` fill / `#F6F2EB` label / `#9C9488` border; hover `#171722` fill / `#CFC7BB` border; pressed `#0B0B10` fill / `#F6F2EB` border |
| Inline links | `#FF3AAE`, underlined; stronger underline on hover; underline retained when pressed |

Colour must not be the only error, warning, success or state cue. Every applicable pairing still requires verification.

### Theme scope

Ash selected preservation of both themes with dark-mode reconciliation first. Preserve existing light capability, switching and saved-light preferences. Light design, first-visit default, system preference and persistence reconciliation remain unresolved. Dark-first sequencing does not approve a dark-only launch.

## Current candidate register

The candidate summaries below remain unapproved. Their original review text is preserved under Unapproved candidate review material, separately from subsequent review findings. Preservation does not adopt the proposals or resolve their open findings.

| Reference | Current candidate | Approval and outstanding boundary |
| -- | -- | -- |
| R3 | Responsive typography, gutters, spacing and containers; clarifies gutter ownership, fractional interpolation and spacing composition | Unapproved. Additional layouts, typography roles, mixed prose spacing and acceptance coverage remain open |
| T1 | Chapter titles, prose subheadings, modal headings and font weights; separates visual roles from semantic levels | Unapproved. Font availability/styles and complete role coverage remain unresolved |
| RT2 | Reader sizing, root-relative heading scaling, text-role inheritance, persistence and typography-only reset | Unapproved. Proposed size range 16–28 in increments of 1; line-height range 1.5–2.0 in increments of 0.1. Reader-specific heading-range exception requires approval |
| C1 | Exact automatic restoration, reader-confirmed approximate recovery and explicit storage-failure states | Unapproved. Source contract, mapping eligibility, recovery state and privacy dependencies remain open |
| Responsive checklist | Human-readable wrapping, reflow, zoom, text-spacing, narrow-screen, theme and continuity checks | Planned only; no execution approval or results |

R1/R2 and RT1 are historical drafts, not competing current candidates. Saving review material does not approve it. Original preparation-state statements within the preserved drafts describe their historical state, not a claim that this register has never saved them. R3, T1, RT2 and C1 retain their identifiers and unresolved findings.

## Unapproved candidate review material

# Original R3

# TOA responsive candidate R3

**Status: unsaved and unapproved.** R3 incorporates the three proposed amendments to R2: gutter ownership, fractional-width interpolation and spacing composition. All numerical values, approval states and other boundaries remain unchanged.

## Typography

**Confirmed families:** Space Grotesk headings; Inter body/UI. Font weights remain unresolved.

### Fluid hero and section headings — proposed

| Viewport width | Hero heading | Section heading |
| -- | -- | -- |
| 320px and below | 48px | 32px |
| 640px | 56px | 36px |
| 1024px | 64px | 40px |
| 1536px and above | 80px | 48px |

Use viewport width in CSS pixels, including fractional widths. At each stated anchor, use its exact heading size. Between adjacent anchors, interpolate continuously and linearly without rounding the viewport width or calculated font size to whole pixels.

At widths less than or equal to 320px, hold the minimum. At widths greater than or equal to 1536px, hold the maximum. The heading anchors do not create stepped changes.

The separately specified stepped bands remain lower-bound inclusive and upper-bound exclusive: below 640px; 640–<1024px; 1024–<1536px; and 1536px upwards.

Proposed line height: **1.2** for both roles. These mappings remain within the confirmed hero **48–80px** and section **32–48px** ranges.

### Stepped and viewport-independent text

| Role | Below 640px | 640–<1024px | 1024–<1536px | 1536px upwards | Line height |
| -- | -- | -- | -- | -- | -- |
| Card heading | 20px | 20px | 22px | 24px | 1.3 — proposed |
| Website body | 16px | 18px | 18px | 20px | 1.6 — confirmed |
| Reader prose starting comparison | 18px | 18px | 18px | 18px | 1.7 — confirmed |
| Short supporting text | 14px | 14px | 14px | 14px | 1.5 — proposed |

Card and website-body mappings are proposed. Changes occur at the exact band boundary.

Reader prose does not automatically enlarge with viewport width. Reader adjustment remains part of the confirmed direction; limits, increments and persistence remain unresolved.

Supporting text must not contain sustained prose, essential instructions, errors or form labels.

## Gutters and spacing — proposed

| Property | Below 640px | 640–<1024px | 1024–<1536px | 1536px upwards |
| -- | -- | -- | -- | -- |
| Page gutter, each side | 16px | 24px | 32px | 48px |
| Section padding, top and bottom | 48px | 64px | 80px | 96px |
| Card padding, each side | 16px | 24px | 24px | 32px |
| Grid gap | 16px | 24px | 24px | 32px |
| Heading-to-content gap | 16px | 24px | 24px | 32px |
| Prose paragraph gap | 1em | 1em | 1em | 1em |

Paragraph spacing uses the prose element’s computed font size. Between consecutive prose paragraphs, apply the stated 1em gap once; do not accumulate separate trailing and leading paragraph margins.

Between a heading and its following content block, apply the stated heading-to-content gap once. Do not add a paragraph’s leading margin or a default heading margin to that gap.

Card padding provides the space between the card boundary and its content. Do not add the heading-to-content or paragraph gap before the first child or after the last child. Grid gaps apply between grid items, separately from their internal padding.

Adjacent sections retain their own top and bottom padding. Those paddings accumulate intentionally, with no additional section margin.

Spacing for lists, quotations, other prose-block combinations and additional heading roles remains unresolved. Their existing margins must not be treated as approved mappings or silently normalised through this proposal.

These values are not yet adopted tokens; component exceptions require a separate identified proposal.

## Containers and layout

The maxima and preferred prose measure are **confirmed**; centring, gutter application and content-width interpretation below remain **proposed mappings**.

| Area | R3 rule |
| -- | -- |
| Standard content | Centred; maximum 1280px, within page gutters |
| Reading wrapper | Centred; maximum 768px, within page gutters |
| Reader text | Preferred maximum 65ch, constrained by the wrapper; not a guaranteed character count |
| Forms | Centred; maximum 640px, within page gutters |
| Wide media | Optional maximum 1600px for explicitly selected media components only; never inherited by prose |

Container maxima describe content width, excluding page gutters. The outer page layout applies the selected page gutter once on each side. Nested standard-content, reading and form containers use their parent’s available content width without adding page gutters again.

A container rendered outside that outer layout receives equivalent gutters from its enclosing layout, not from both layers. Card padding remains internal component spacing and is not a second page gutter.

Every container is constrained by its parent’s available width and its own stated maximum.

* No universal column-count mapping is selected; the proposed fallback is single-column pending component-specific review.
* No 768px exception is included.
* Page/spread geometry and navigation collapse thresholds remain unresolved.
* No fixed responsive pagination is introduced.

## Unresolved decisions and review findings

* **R2-01:** gutter ownership is addressed by proposed wording only; implementation is unverified.
* **R2-02:** additional typography roles and font weights remain unresolved. Visual roles must not be assumed to determine semantic heading levels.
* **R2-03:** reader-setting limits, increments, precedence, persistence, reset behaviour and continuity fallbacks remain unresolved.
* **R2-04:** fractional-width interpolation is addressed by proposed wording only; implementation is unverified.
* **R2-05:** spacing composition is partly addressed. Lists, quotations, other prose-block combinations and additional heading roles remain unresolved.
* **R2-06:** accumulated section padding remains intentional in the proposal but visually unreviewed. Combined gaps between adjacent sections’ content edges remain **96–192px**.
* **R2-07:** component-specific transitions, including navigation, reader controls, cards and forms, remain unresolved.
* **R2-08:** acceptance prerequisites remain incomplete: exact candidate revision, routes/components, browser/device coverage, reader settings and continuity contract must be identified.

Proposed wording is not verified resolution.

## Preserved boundaries and validation state

Existing light support, switching and saved-light preferences remain intact. No new light colours or theme-behaviour changes are proposed. Approved dark interaction colours remain unchanged.

Confirmed values retain their existing approval. All responsive mappings and amendments in this candidate remain unapproved.

All wrapping, zoom/reflow, text-spacing, narrow-screen, theme-preservation and continuity checks remain **Not run**. This candidate establishes neither visual approval, accessibility conformance nor implementation or launch readiness.

No records, repository files or Figma content were changed.

# Original T1

**Typography extension T1 — unsaved and unapproved.** These proposals supplement R3 without changing its values or approval state.

## Additional visual roles

| Role | Proposed size mapping | Proposed line height | Family / weight |
| -- | -- | -- | -- |
| Chapter title | Reuse R3’s section anchors: 32px at ≤320px; 36px at 640px; 40px at 1024px; 48px at ≥1536px; linear interpolation between anchors | 1.2 | Space Grotesk / 600 |
| Primary prose subheading | 24px below 1024px; 28px from 1024px | 1.3 | Space Grotesk / 600 |
| Secondary prose subheading | 20px below 1024px; 22px from 1024px | 1.3 | Space Grotesk / 500 |
| Modal heading | 20px below 1024px; 24px from 1024px | 1.3 | Space Grotesk / 600 |

Chapter titles reuse the confirmed **32–48px section range**, with R3’s mapping still proposed. The prose-subheading and modal mappings are **new proposals**, not previously approved ranges.

Modal headings should wrap without truncation. Reader subheading behaviour under user typography adjustments remains unresolved; these sizes must not silently override reader preferences.

## Proposed font weights

| Role | Proposed weight |
| -- | -- |
| Hero heading | Space Grotesk 700 |
| Section and chapter heading | Space Grotesk 600 |
| Card and modal heading | Space Grotesk 600 |
| Primary prose subheading | Space Grotesk 600 |
| Secondary prose subheading | Space Grotesk 500 |
| Body and reader prose | Inter 400 |
| Essential form labels and buttons | Inter 600 |
| Short supporting text | Inter 400 |
| Strong emphasis within prose | Inter 600 |

These weights require verification against the selected font files, loading configuration and licences. No synthetic weight or successful loading is assumed. Sizes and line heights for form labels and buttons are not selected here.

## Semantic heading structure

Visual styling does not determine heading level.

* A chapter title may be the page’s `h1` on a dedicated chapter route, but a lower level within a combined reading document.
* Prose subheadings follow the actual content hierarchy without skipping levels merely to obtain a smaller style.
* A modal heading supplies the dialog’s accessible name; its heading level follows the surrounding structure rather than inheriting a fixed level from its appearance.
* Card headings use a level appropriate to their section, independently of their visual size.

The exact semantic mapping depends on the selected document and reader structure and remains unresolved.

## Review conditions

Before accepting T1, review long chapter titles, nested subheadings, narrow modals, enlarged reader text and emphasis in sustained prose. Confirm that heading sizes remain distinguishable from reader-adjusted body text without preventing enlargement or causing overflow.

All checks remain **Not run**. Existing light support, confirmed typography direction and approved dark colours remain unchanged. T1 and R3 remain unapproved; nothing was saved or implemented.

# Original RT2

# TOA reader typography candidate RT2

**Status: unsaved and unapproved.** RT2 incorporates the exact root-relative scaling and manuscript-role amendments into RT1. All numerical proposals, approval states, source limitations and other unresolved decisions are preserved.

## Source baseline and limitations

Read-only static inspection used repository `develop@84242de7857e1ec03742e20aaaf1df469f44355f`.

* [Preferences](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/84242de7857e1ec03742e20aaaf1df469f44355f/src/app/utils/ebookPreferences.ts>) define four saved size presets, defaulting to medium.
* [Settings controls](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/84242de7857e1ec03742e20aaaf1df469f44355f/src/app/components/ui/EbookSettingsModal.tsx>) expose size adjustment, but no line-height or typography-reset control.
* Static inspection found [responsive declarations](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/84242de7857e1ec03742e20aaaf1df469f44355f/src/styles/blocks/ebook-responsive.css>) overriding scaled typography variables. This is a source-level conflict, not a reproduced runtime result.
* Existing position handling uses numerical pages; it does not establish source-anchored continuity after resizing.

No runtime behaviour, successful font loading, contrast result or accessibility conformance was established.

## Reader controls — proposed

| Setting | Starting value | Proposed range | Proposed increment |
| -- | -- | -- | -- |
| Reader body size | **18px comparison — confirmed** | 16–28px | 1px |
| Reader body line height | **1.7 — confirmed** | 1.5–2.0 | 0.1 |

These ranges are **new proposals**, not confirmed limits. They bound the reader controls—not browser zoom, operating-system enlargement or user stylesheet overrides.

### Root-relative sizing contract — proposed

Store the chosen body-size reference as a number within the proposed 16–28 range, starting at 18. These numbers express reference sizes at a 16px root; they are not measurements of rendered text.

Let **B** be the chosen body-size reference and **R** the effective root text size in CSS pixels:

* Reader body size = **(B ÷ 16) rem**, equivalent to **B × R ÷ 16 CSS pixels**.
* Reader scale = **B ÷ 18**. Calculate this from the stored reference, not the rendered body size.
* Each editorial heading baseline is also root-relative: a baseline reference of **H** becomes **(H ÷ 16) rem**.
* Final heading size = **(H ÷ 16) rem × (B ÷ 18)**.

For chapter titles, calculate H from R3’s viewport anchors first. For prose subheadings, select H from T1’s proposed band mapping first. Apply root-relative conversion once and reader scaling once.

Browser zoom does not enter these calculations as an additional multiplier. Browser and user accessibility overrides remain available and must not be counteracted.

## Editorial heading baselines — proposed

| Role | Baseline before reader scaling |
| -- | -- |
| Chapter title | R3’s fluid anchors: 32 / 36 / 40 / 48px at viewport widths 320 / 640 / 1024 / 1536px |
| Primary prose subheading | T1: 24px below 1024px; 28px from 1024px |
| Secondary prose subheading | T1: 20px below 1024px; 22px from 1024px |

R3 and T1 remain unapproved. Reader adjustment and root enlargement may take rendered headings outside these baseline reference ranges. That is a **new reader-specific exception requiring approval**, not an interpretation of the existing range approval.

## Manuscript text coverage — proposed

Apply reader typography by content role:

| Manuscript role | Size behaviour | Line-height behaviour |
| -- | -- | -- |
| Body paragraphs | Selected reader body size | Selected reader body line height |
| Ordered/unordered list text, including nested items | Inherit reader body size without compounding by nesting level | Selected reader body line height |
| Prose quotations and blockquotes | Inherit reader body size without an additional size multiplier | Selected reader body line height |
| Inline links, emphasis and strong emphasis within those roles | Inherit the containing text size | Inherit the containing line height |
| Chapter titles | Root-relative chapter baseline × reader scale | Proposed 1.2 |
| Primary and secondary prose subheadings | Root-relative subheading baseline × reader scale | Proposed 1.3 |

Do not impose a second heading-size cap that defeats reader enlargement.

Captions, epigraph attributions, footnotes/endnotes, running labels, chapter metadata, tables, verse and other specialised manuscript roles remain unresolved. Do not infer a smaller supporting-text treatment or declare their typography settled through this amendment. Essential content must not automatically inherit the 14px supporting-text style.

Navigation, settings controls, modal headings and other reader chrome do not inherit the reader-specific scale. Their response to root text enlargement, browser zoom and user overrides remains required review coverage—not permission to make them fixed or non-enlargeable.

This role mapping does not select semantic heading levels, font styles or spacing rules.

## Precedence and persistence — proposed

1. The reader’s current explicit choice takes precedence.
2. On entry, restore valid saved typography settings for that browser.
3. Missing, invalid or inaccessible saved settings fall back individually to **18px / 1.7**.

Responsive rules determine baseline heading sizes only; they must not overwrite reader scaling. Browser/user accessibility overrides remain available.

If saving fails, retain the choice for the current view and communicate that persistence is unavailable without claiming it was saved.

**Legacy migration remains unresolved.** Existing presets must not be silently converted, discarded or interpreted as new numerical sizes. An exact migration proposal is needed before implementation.

Storage-notification frequency and cross-tab behaviour also remain unresolved.

## Typography-only reset — proposed

Reset restores **18px / 1.7** and recalculates editorial headings from the viewport baseline.

It must not reset:

* Theme or saved light preference.
* Reading location or manuscript authorisation.
* Other reader display, paging or fullscreen settings.

Reset follows the same persistence-failure behaviour as other changes.

Preserving reading location through reset depends on the unresolved continuity contract; this is a proposed outcome, not guaranteed current behaviour.

## Layout and continuity boundaries

Preserve the confirmed **65-character preferred measure** and **768px reading-wrapper maximum**, with responsive narrowing. Reflow content rather than silently reducing the chosen font size.

Before changing typography, retain a stable source/location reference; restore the same passage after reflow. Numerical page clamping alone is insufficient. Missing-anchor fallback and interaction with the existing spread layout remain unresolved—not permission to replace either behaviour.

## Approval and unresolved decisions

* Confirmed Space Grotesk headings, Inter body/UI, the **18px / 1.7** starting comparison, preferred measure and wrapper maximum retain their existing approval.
* Control ranges, increments, adjustable line height, scaling exception, role mappings, persistence behaviour and reset remain unapproved proposals.
* R3 and T1 remain unapproved dependencies.
* Specialised manuscript roles, semantic hierarchy, font styles, spacing, legacy migration, storage notifications, cross-tab behaviour, continuity fallbacks and spread geometry remain unresolved.
* RT2 proposes textual resolution of RT1-04 and partial resolution of RT1-05; neither is verified closure. Other RT1 findings remain open.

## Preservation and validation state

Existing light support, switching and saved-light preferences remain intact. Approved dark interaction colours remain unchanged. No theme-behaviour or authorisation changes are proposed.

All rendered, continuity, accessibility and persistence checks remain **Not run**. This candidate establishes neither implementation success, visual approval, accessibility conformance nor launch readiness.

Nothing was saved, implemented or changed.

# Original C1

# TOA continuity candidate C1

**Status: unsaved and unapproved.** C1 selects Option B as a proposed contract: automatic exact restoration, reader-confirmed approximate recovery and explicit storage-failure states. It does not approve R3, T1 or RT2.

## 1. Position and reflow

Reading position must identify a manuscript source, its revision and a location within that source independently of displayed page numbers.

Before a typography adjustment, typography reset, viewport/orientation change or single/spread transition:

1. Retain the leading visible source passage as the restoration target.
2. Recalculate the layout.
3. Resolve that target in the resulting layout.
4. If the same location resolves exactly, display its containing page or spread automatically.

Do not replace the saved target with an intermediate layout position while restoration is pending. Numerical page clamping alone must not be reported as restored continuity.

The definition of “leading visible passage”, anchor representation and layout-completion signal remain prerequisites.

## 2. Recovery rules

| Resolution | Proposed behaviour |
| -- | -- |
| Exact location resolves in the same source revision | Restore automatically. |
| An approved revision mapping identifies an equivalent location | Restore automatically using that mapping. Do not imply the text is unchanged. |
| Exact location fails; section survives | Offer **Start of this section**, **Start of this chapter** and **Contents**, where each destination exists. |
| Section is unavailable; chapter survives | Offer **Start of this chapter** and **Contents**. |
| Chapter is removed or cannot be identified | Open contents with an explanation that the saved location could not be restored. Do not select another chapter automatically. |
| Manuscript collection is empty or invalid | Show an unavailable-content state; do not dereference a page or fabricate recovery destinations. |

For approximate recovery, state:

> Your saved passage could not be restored exactly. Choose where to continue.

Only present destinations established by the current authorised manuscript inventory. Preserve the unresolved saved target until the reader chooses a destination; do not silently overwrite it with an approximate location.

## 3. Changed sources and legacy progress

* Automatic cross-revision restoration requires an explicit, approved mapping. Similar wording, matching page numbers or proximity alone is insufficient.
* Mapping ownership, revision identifiers and approval evidence remain unresolved.
* Legacy numerical progress may restore automatically only when its original source/layout relationship is demonstrably reliable.
* Otherwise, explain that the old page position cannot be restored reliably and offer identifiable recovery destinations.
* Do not describe a guessed destination as an exact restoration.

## 4. Storage states

| State | Proposed behaviour |
| -- | -- |
| Saved position is valid | Resolve it using the recovery rules above. |
| No saved position exists | Show contents with no claim of resumed progress. |
| Saved position is corrupt or invalid | Explain that saved progress could not be read; offer contents and an explicit progress-only reset. Do not clear other preferences automatically. |
| Storage cannot be read | Allow authorised reading using current-view memory; explain that saved progress is unavailable. |
| Saving fails | Preserve the current-view position and explain that it has not been saved for later visits. Do not label an older stored value as updated. |
| Storage later becomes available | Do not replace the current-view position automatically with an older saved position. Reconciliation behaviour requires a separate decision. |

Proposed storage-failure message:

> Your place is available while this reading view remains open, but it has not been saved for your next visit.

Notification frequency, retry behaviour, cross-tab reconciliation and the exact progress-reset action remain unresolved.

## 5. Reset and protected boundaries

Typography-only reset must use the same restoration process as other typography changes. It must not clear reading progress, theme, saved light preference, authorisation or unrelated reader settings.

A progress-only reset is a separate action requiring explicit reader selection. It must not reuse a broad preference-clear operation that also removes theme or other settings.

If manuscript access expires, require reverification before delivering protected content. A saved location is not an access credential and must never bypass authorisation.

Existing light support remains intact. No cross-device progress synchronisation, offline manuscript caching or additional collection is introduced.

## 6. Unresolved prerequisites

* Stable source, revision and within-source location contract.
* Leading-visible-passage selection, including spreads and partially visible text.
* Reliable reflow completion, including font-loading changes.
* Approved revision mappings and their responsible authority.
* Legacy-position migration evidence.
* Storage notices, retries, reconciliation and progress-reset details.
* Privacy treatment of persisted location data.
* Candidate-specific validation fixtures and browser/layout coverage.

**Evidence boundary:** refreshed static sources show numerical position handling, not this proposed contract. No runtime restoration or storage behaviour has been verified.

All checks remain **Not run**. Nothing was approved, saved, implemented or changed.

# Original responsive checklist

This is an **unsaved review checklist**, not an executed assessment. Every check below is **Not run**.

### Baseline to review

* **Confirmed:** Space Grotesk headings; Inter body/UI; approved typography ranges, body line height 1.6, reader starting comparison 18px/1.7, preferred 65-character measure and container maxima.
* **Proposed, not approved:** four-band size mapping, fluid heading interpolation, heading line heights, gutters, section/card spacing and any component-specific 768px exception.
* **Preserve:** existing light support and reader access boundaries. Neither responsive review nor a passing check authorises implementation or publication.

Before review, identify the exact candidate revision, selected mapping, routes/components, browsers, viewports and theme states. Record unavailable coverage rather than assuming it passes.

## Planned checks

| Area | Check | Observable pass condition |
| -- | -- | -- |
| Heading wrapping | Inspect representative short and long headings across each proposed band and immediately around its boundaries. | No clipping, overlap or obscured content; headings remain within their confirmed size ranges. Awkward editorial breaks are recorded for Ash’s review. |
| Prose wrapping | Inspect paragraphs, links, emphasis, lists and long unbroken strings. | Text stays within its container without page-level horizontal overflow; long strings do not displace neighbouring content. |
| Measure and containers | Compare narrow screens and wide layouts. | Prose respects the preferred measure within the 768px wrapper; forms stay within 640px and standard content within 1280px. Optional wide media does not widen prose. |
| Text resize | Review text enlarged to 200%. | Content and functionality remain available without clipped labels, hidden instructions or overlapping controls. |
| Reflow | Review at a width equivalent to 320 CSS pixels, including desktop zoom where applicable. | No two-dimensional scrolling for ordinary reading and controls; any genuinely necessary exception is identified and justified. |
| Text-spacing overrides | Apply line height 1.5 times font size, paragraph spacing 2 times, letter spacing 0.12 times and word spacing 0.16 times. | No loss of content or functionality. These are override-tolerance checks, not replacements for the approved typography. |
| Narrow-screen navigation | Inspect menus, headers, footers and direct-route entry. | Controls remain reachable, labels readable and navigation operable without covering essential reading content. |
| Reader controls | Inspect typography/settings controls, chapter navigation and any sticky elements. | Controls neither obscure prose nor overlap each other; keyboard focus remains visible and reachable. |
| Forms and feedback | Inspect labels, inputs, errors, pending states and acknowledgements. | Essential instructions remain readable; controls and messages wrap without clipping. Supporting-text styling does not shrink essential content to 14px. |
| Reader adjustment | Exercise each available setting and combinations at its proposed limits. | Settings remain operable; text stays readable and contained. Limits not yet selected are recorded as an unresolved prerequisite. |
| Reading continuity | Change reader settings, viewport and orientation. | Logical reading location is preserved against the selected continuity contract; numerical page persistence alone is insufficient evidence. |
| Theme preservation | Repeat representative checks in dark and existing light states. | Neither theme loses content, controls or focus visibility; no light-support removal is introduced. This does not establish colour conformance. |
| Optional 768px exception | Compare the affected component with and without the exception. | Record the specific crowding problem and demonstrated improvement; do not adopt a site-wide breakpoint without justification. |

### Result record

For each check, capture:

**Check → candidate revision → environment/theme/settings → expected outcome → observed outcome → evidence → Not run / Passed / Failed / Blocked.**

Keep responsive usability findings separate from WCAG findings. A passed sample does not establish whole-site AAA conformance, visual approval or launch readiness.

No checks were executed and nothing was changed.

# Separate review findings

These findings remain separate from the preserved drafts. They do not amend or approve them.

## T1 review findings

| Finding | Classification | Impact / unresolved decision |
| -- | -- | -- |
| **T1-01 — Reader-adjustment relationship** | Major unresolved choice | Fixed 20–28px prose subheadings could become smaller than enlarged reader body text. T1 acknowledges this but does not define scaling, precedence or limits. |
| **T1-02 — Chapter-title context** | Major unresolved choice | Reusing viewport-driven section sizing is compatible with R3, but does not establish whether reader chapter titles should respond to reader settings. Dedicated chapter pages and combined reading views may need different treatment. |
| **T1-03 — Semantic mapping** | Unresolved choice, not contradiction | T1 correctly separates visual roles from heading levels. Actual levels remain dependent on the selected page, chapter and dialog structure; no semantic hierarchy is approved. |
| **T1-04 — Weight availability** | Verification prerequisite | Proposed weights are internally consistent, but selected font files, loading, licensing and synthetic-weight behaviour have not been verified. Availability must not be reported as established. |
| **T1-05 — Prose emphasis** | Minor coverage gap | T1 proposes strong emphasis but leaves italic/emphasised text and combined strong emphasis unspecified. Their source-content treatment and available font styles remain unresolved. |
| **T1-06 — Form/UI typography** | Coverage gap, explicitly bounded | Weight 600 is proposed for labels and buttons, but sizes and line heights remain open. T1 cannot serve as a complete UI typography contract. |
| **T1-07 — Spacing integration** | Existing unresolved choice | Additional heading roles do not resolve R3’s spacing before subheadings or between headings, lists and quotations. |

RT2 proposes responses to some reader-scaling questions; it does not establish approved closure of T1 findings.

## RT1/RT2 review findings

| Finding | Classification | Impact / unresolved decision |
| -- | -- | -- |
| **RT1-01 — Heading-range exception** | New scope, explicitly disclosed | Reader scaling can exceed or fall below confirmed baseline heading ranges. The exception remains unapproved. |
| **RT1-02 — Line-height control** | New scope | Adjustable 1.5–2.0 line height and 0.1 increments extend the confirmed starting comparison. |
| **RT1-03 — Control limits** | New scope | The 16–28px range and 1px increments remain proposals, separate from browser enlargement. |
| **RT1-04 — Root-relative scaling** | Major ambiguity in RT1 | RT2 supplies proposed wording to prevent double scaling or headings failing to follow root enlargement. No implementation is verified. |
| **RT1-05 — Line-height coverage** | Unresolved choice | RT2 supplies proposed coverage for paragraphs, lists and quotations; specialised manuscript roles remain unresolved. |
| **RT1-06 — Reset and continuity** | Major unresolved choice | Reset’s promised location preservation depends on the unresolved continuity contract. |
| **RT1-07 — Storage failure and migration** | Major unresolved choice | Notification frequency, cross-tab behaviour and legacy-setting precedence remain unspecified. |
| **RT1-08 — Reader chrome enlargement** | Coverage prerequisite | Exclusion from reader-specific scaling must not prevent root/browser enlargement. |
| **RT1-09 — Measure and spread geometry** | Major unresolved choice | The changing physical width of 65ch interacts with the 768px cap, spreads, pagination and available height. |

## C1 review findings

| Finding | Classification | Impact / unresolved prerequisite |
| -- | -- | -- |
| **C1-01 — Recovery screen versus saved target** | Major ambiguity | Opening contents could trigger ordinary position-saving and overwrite the unresolved target. Recovery screens and reader-selected destinations need distinct treatment. |
| **C1-02 — Exact versus mapped restoration** | Major ambiguity | Automatic revision mapping requires eligibility rules distinguishing equivalent from approximate replacements. |
| **C1-03 — Pending reflow failure** | Major coverage gap | Failed, indefinitely pending or superseded layout changes lack a defined recovery/precedence rule. |
| **C1-04 — Persistence scope** | Ambiguity against RT2 | Position and typography saving may have different outcomes. Messages must distinguish partial success. |
| **C1-05 — Corrupt progress and reset** | Unresolved choice | Choosing recovery versus replacing corrupt data and confirming progress-only reset remain undefined. |
| **C1-06 — Authorisation expiry during recovery** | Major unresolved prerequisite | Pending-target retention and resumption need definition without retaining manuscript content or bypassing authorisation. |
| **C1-07 — Source and location contract** | Major unresolved prerequisite | Stable identifiers, leading-passage selection, mappings and layout completion remain unestablished. |
| **C1-08 — Privacy and deletion interaction** | Unresolved prerequisite | Local progress retention and sign-out, reader-record deletion and shared-device effects remain undecided. |
| **C1-09 — Launch inclusion** | Unresolved scope decision | Drafting continuity behaviour does not approve its inclusion in launch. |

## Preservation-specific finding

The original checklist requires headings to remain within confirmed ranges, while RT2 proposes a reader-specific enlargement exception. Both original texts are preserved. Their joint acceptance rule remains unresolved; neither is silently changed to make them appear reconciled.

## Recommended next decisions

The three recommendations below are retained as the original decision prompts. Ash selected the bounded planning answers recorded immediately afterwards on 5 November 2026. These selections do not approve candidate specifications.

1. **Select the next bounded design-review scope.** Ash to select representative pages, reader states and exact source revisions, and the decision the review should establish. Identify candidate artwork without treating it as publication-cleared. This bounds the remaining DEL-01 work rather than expanding into an indefinite website-wide review. Related: OPEN-11; design-brief Q-01 and Q-08.
2. **Choose the reader typography model.** Ash to decide whether to pursue RT2’s size-and-line-height controls or a smaller size-only scope, and whether reader adjustment may exceed baseline heading ranges. Keep continuity and spread dependencies explicit. This establishes which R3/T1 comparisons are meaningful without approving those candidates. Related: OPEN-02 and OPEN-03.
3. **Define the acceptance boundary.** Ash to select browser/device coverage, accessibility review methods and the light-theme coverage required for the bounded review. Distinguish approval of a comparison candidate from final design acceptance. Preserve the WCAG 2.2 AAA target without claiming conformance; specialist review responsibility remains unconfirmed. Related: OPEN-10 and OPEN-12; design-brief Q-03.

### Selected review-planning decisions — 5 November 2026

**1. Bounded design-review scope**

Ash selected a review covering:

* Homepage: hero, introductory prose and reading-entry action.
* Reading-access screen: code entry, invalid or expired code and reverification states. Provider feasibility remains separate.
* Contents and one representative chapter: long chapter title, nested subheadings, sustained prose, reader controls and typography adjustment.
* Continuity recovery: exact restoration, reader-confirmed approximate recovery and unavailable-storage notices, as proposed in C1.

The purpose is to decide whether the confirmed book-first direction and selected candidate treatments provide a suitable basis for further design refinement.

Compare narrow, intermediate and wide layouts; exact viewport anchors remain subject to selecting the responsive candidate. Use dark mode for the primary comparison, with corresponding existing light states to identify regressions. Do not remove or silently redesign light support.

Use identified manuscript excerpts and artwork only within their evidenced permissions; label placeholders. Pin the PRD, brief and register revisions, together with exact design and repository references used for the comparison. Those references still require selection; unverified Figma is not automatically authoritative.

Exclude a website-wide audit, final artwork or publication clearance, provider selection, implementation, executed accessibility checks and launch acceptance. The expected review output is a bounded findings list identifying what to retain, revise or decide next—not completion of DEL-01 or proof of conformance.

Ash selected this scope at 08:51 Asia/Bangkok on 5 November 2026.

**2. Reader typography model for comparison**

Ash selected RT2’s size-and-line-height model for comparison, including assessment of its proposed reader-only heading-range exception.

The comparison is to assess whether chapter titles and subheadings remain distinguishable as prose enlarges, whether adjustable line height supports reading without breaking controls or continuity, and whether the proposed limits work within the reading wrapper.

RT2’s numerical limits, scaling rules, role inheritance, persistence and reset behaviour remain unapproved specifications. Selecting the model for comparison does not adopt the heading-range exception. Browser enlargement and accessibility overrides must remain available.

Ash selected this comparison model at 09:55 Asia/Bangkok on 5 November 2026.

**3. Acceptance boundary — review planning only**

Ash selected:

* Narrow, intermediate and wide layouts, with representative mobile Safari, mobile Chrome and desktop Safari, Chrome and Firefox coverage. Exact versions and available devices must be recorded before checks.
* Bounded assessment of wrapping, keyboard and focus, zoom and reflow, text-spacing overrides, reader adjustments and contrast. Preserve the WCAG 2.2 AAA target; this bounded review cannot establish overall conformance.
* Dark-first comparison, with corresponding existing light states assessed for content, controls, focus and readability regressions. Final light-theme design remains unresolved.
* An outcome limited to suitability for further refinement—not final design acceptance, implementation readiness or launch approval. Record unassessed coverage explicitly.

Ash selected this acceptance boundary for planning the review only at 10:58 Asia/Bangkok on 5 November 2026.

**Shared limits and outstanding prerequisites**

These selections answer the three planning questions; they do not resolve the underlying specification and evidence gaps. Exact source revisions, representative content, permitted assets, viewport anchors, browser versions, devices, review arrangements and criterion-specific methods remain to be identified where not already established.

R3, T1, RT2 and C1 remain unapproved specifications. The responsive checklist remains planned and Not run. Existing approved values, light support, access boundaries, unrelated preferences, historical approvals and unresolved findings are preserved.

No review execution, commands, tests, implementation, publication or launch is authorised by these selections. Recording them does not complete DEL-01 or establish accessibility conformance.

## Outstanding decision register

| ID | Decision or evidence needed |
| -- | -- |
| OPEN-01 | Responsive component transitions, navigation collapse, remaining prose spacing and intentional accumulated section padding |
| OPEN-02 | Font weights/styles/loading/licensing; specialised manuscript roles and semantic hierarchy |
| OPEN-03 | Reader control scope, limits, root-relative scaling, heading-range exception and spread interaction |
| OPEN-04 | Legacy migration, partial position/settings saving, notifications, retries and cross-tab reconciliation |
| OPEN-05 | Stable source/revision/location identifiers and leading-visible-passage selection |
| OPEN-06 | Eligibility for automatic revision mapping versus reader-confirmed approximate recovery |
| OPEN-07 | Recovery-screen persistence, failed or overlapping reflow, authorisation interruption and progress-only reset |
| OPEN-08 | Local progress privacy, retention, sign-out/deletion effects and shared-device behaviour |
| OPEN-09 | Continuity launch inclusion; drafting C1 does not resolve it |
| OPEN-10 | Light-theme design and acceptance; default/system/saved-choice behaviour |
| OPEN-11 | Exact artwork, rights, credits and placement; publication inventory and reference layout |
| OPEN-12 | Browser/device coverage and criterion-specific visual, contrast, accessibility and continuity evidence |

## Related PRD and design-brief reconciliation status

### Completed PRD recording updates

PRD v1.1.1, updated 4 November 2026 at 14:40:15.853 UTC, records the following completed document updates:

* Confirmed typography, palette and layout direction, with the approved dark interaction choices referenced through this register.
* Dark-first reconciliation while preserving existing light support.
* Retained public speaking/workshops, events and media/press URLs: no menu/footer links, noindex, neither deleted nor private. Effective noindex and Google removal remain unverified.
* Approved business conversion counting, distinguished from unapproved instrumentation and collection.
* Corrected recording of the completed PRD save and its adopted document-version convention.

These are completed recording updates, not implementation, validation, publication or launch results. R3, T1, RT2 and C1 remain unapproved.

### Outstanding PRD work

* Reconcile D6’s approved future-stack history with the unresolved repository-policy restrictions without ratifying architecture or policy through wording alone.
* Develop and separately approve any source/continuity, contact partial-success/retry, existing-work traceability and stage-specific readiness refinements that remain necessary. Existing PRD wording and partial coverage must be preserved; this entry does not assert those concerns are wholly absent.
* Resolve the outstanding decisions in this register and obtain relevant evidence before claiming implementation or launch readiness.

### Completed design-brief recording update

Ash approved saving the corrected design-brief patch and register correction on 4 November 2026 at 22:19 Asia/Bangkok. The design brief was saved as v1.1.0 at 15:20:32.668 UTC, and the register correction as v1.0.1 at 15:20:40.088 UTC. Both were read back against their approved previews; no substantive deviations were reported.

The saved brief reconciles confirmed design and visibility decisions, preserves unconfirmed priorities and identifies this register as partial DEL-01 supporting material. It does not establish DEL-01 completion, design acceptance or adoption of R3, T1, RT2 or C1.

The completed PRD and design-brief recording updates were separately authorised. Candidate preservation and later specification adoption retain separate approval boundaries. This status correction does not authorise implementation, execution, publication or launch.

## TOA bounded design-review source manifest

**Manifest status:** proposed source selections recorded for review planning. Source identification and proposed specimen selection do not establish editorial approval, publication clearance, candidate adoption or permission to execute checks.

**Prepared:** 5 November 2026. This manifest consolidates the preceding bounded source inspections; it is not a fresh complete repository, manuscript, Figma or live-site inspection.

### 1. Purpose and selected review boundary

Prepare a comparison covering:

* Homepage: hero, introductory prose and reading-entry action.
* Reading access: code entry, invalid/expired code and reverification.
* Contents and one representative chapter: title, prose, reader controls and typography adjustment.
* Continuity recovery: exact restoration, reader-confirmed approximate recovery and unavailable-storage notices.

Use dark-first comparison while preserving corresponding existing light states. RT2’s size-and-line-height model is selected **for comparison only**.

Exclude website-wide auditing, provider selection, implementation, final artwork clearance, publication and launch acceptance. DEL-01 remains partially supported, not completed.

### 2. Document baseline

These revisions were identified through the preceding read-only inspections. Update timestamps identify the observed saved content; they are not immutable snapshot identifiers.

| Reference | Document and revision | Observed update, UTC | Role |
| -- | -- | -- | -- |
| M-01 | [Decision register v1.3.0](<https://linear.app/lightspeedwp/document/book-website-design-and-reader-decision-register-be84aedd1a47>) | 5 November 2026, 04:17:42.867 | Confirmed design baseline, preserved candidates, findings and selected review-planning decisions. |
| M-02 | [PRD v1.1.1](<https://linear.app/lightspeedwp/document/prd-this-one-time-on-acid-website-and-reading-experience-b7f8974e507e>) | 4 November 2026, 14:40:15.853 | Recorded requirements, authorisation, privacy, visibility and publication boundaries. Provisional draft. |
| M-03 | [Design brief v1.1.1](<https://linear.app/lightspeedwp/document/design-brief-book-website-and-verified-reading-experience-26b0558529b0>) | 4 November 2026, 16:02:16.929 | WEB-D requirements, acceptance references and partial DEL-01 coverage. |
| M-04 | [Author-decisions brief v1.1.1](<https://linear.app/lightspeedwp/document/book-website-brief-author-decisions-and-launch-scope-8d63b8dda8d8>) | 4 November 2026, 05:01:59.680 | Starting book brief, intended inventory, shorter-edition direction and editorial authority. |

M-01 identifies the pre-insertion v1.3.0 source baseline, not the resulting register version. M-03’s S-11 reference intentionally identifies historical register v1.0.0. Preserve those historical references; consult the current register for later recording updates.

### 3. Proposed manuscript specimens

#### M-05 — Primary sustained-prose source

[**Manuscript — This One Time on Acid — Chapter: Eighty-six hours**](<https://linear.app/lightspeedwp/document/this-one-time-on-acid-chapter-eighty-six-hours-228a21d3e51a>)

* **Internal version:** 1.0.1.
* **Latest observed update:** 5 November 2026, 08:52:09.386 UTC.
* **Exact selection:** the complete fenced manuscript under `Complete proposed copy`, identified as the reconciled working draft pending author confirmation.
* **Preserve:** wording, metadata and all standalone scene/page breaks.
* **Proposed use:** sustained prose, paragraph wrapping, scene transitions and reader-adjustment comparison.
* **Limitations:** short title; no nested prose subheadings identified in the earlier complete-copy inspection. `startPage: 22` is source metadata, not verified responsive pagination.
* **Approval boundary:** factual, editorial, website-edition inclusion and publication decisions remain unresolved.

**Source drift:** the earlier manifest identified this document before its “Manuscript —” title prefix and recorded an update of 5 November 2026, 04:02:55.891 UTC. The current title and update timestamp differ, while the internal version remains 1.0.1.

**Completed manual copy comparison — 5 November 2026:** the complete fenced manuscript under `Complete proposed copy`, retrieved from the document updated at 08:52:09.386 UTC, was compared manually with the earlier complete copy retrieved in this chat from the document updated at 04:02:55.891 UTC. No wording, punctuation, paragraph-order, frontmatter or body-separator differences were found. Chapter 5, part 2, `startPage: 22`, title and subtitle are unchanged; all five standalone body `---` breaks remain in the same positions.

**Comparison limitations:** this finding covers the complete fenced manuscript exposed by Linear, not byte-level identity, hidden formatting, changes elsewhere in the review document, repository parity, rendered pagination or factual accuracy. The copy remains a reconciled working draft pending author confirmation—not publication-approved. No executable checks were run.

#### M-06 — Longer chapter-title specimen

[**Manuscript — This One Time on Acid — Chapter: The dancefloor gave me everything**](<https://linear.app/lightspeedwp/document/manuscript-this-one-time-on-acid-chapter-the-dancefloor-gave-me-48473f70af85>)

* **Internal version:** 1.0.1.
* **Observed update:** 5 November 2026, 08:52:09.455 UTC.
* **Exact location:** `Complete proposed copy` → frontmatter.
* **Title:** “The dancefloor gave me everything”
* **Subtitle:** “The people, the connections, the life built on 140 BPM.”
* **Proposed use:** title/subtitle wrapping alongside M-05’s shorter title.
* **Limitations:** not established as the manuscript’s longest or worst-case title; no rendered comparison performed.
* **Approval boundary:** available working proposal, not approved publication copy.

Using its title/subtitle as a separate specimen does not combine Chapters 5 and 7 into a new manuscript.

#### M-07 — Unassigned section-label specimens

[**Manuscript — This One Time on Acid — Chapter: Twenty-three years**](<https://linear.app/lightspeedwp/document/manuscript-this-one-time-on-acid-chapter-twenty-three-years-e57e252fb3a9>)

* **Internal version:** 1.0.1.
* **Observed update:** 5 November 2026, 08:52:20.500 UTC.
* **Exact location:** manuscript within `Complete proposed copy`.
* **Exact standalone lines:**
  * “BarCamp Cape Town 2006: the story”
  * “The people who changed everything”
  * “What we build”
  * “The AI shift”
  * “What twenty-three years teaches you”
* **Proposed use:** possible section-label comparisons only.
* **Limitations:** stored as plain text, without explicit heading markup or nested hierarchy. Do not assign semantic levels or primary/secondary subheading roles without a separate proposal.
* **Approval boundary:** working assembly with unresolved factual and editorial decisions; not publication-cleared.

Chapters 7 and 19 retain the controls and update timestamps observed during specimen inspection. Their saved bodies contain historical preparation-state wording; that wording is not evidence that these existing records are unsaved, nor is their existence evidence of manuscript approval. No correction to those documents is included here.

### 4. Repository pin

**Repository:** `lightspeedwp/ThisOneTimeOnAcidCom`

**Last verified** `develop` **head:** [`84242de7857e1ec03742e20aaaf1df469f44355f`](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/commit/84242de7857e1ec03742e20aaaf1df469f44355f>)

Use the immutable commit, not a moving branch URL, for the proposed repository comparison.

Relevant references preserved in RT2:

* [Reader preferences](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/84242de7857e1ec03742e20aaaf1df469f44355f/src/app/utils/ebookPreferences.ts>)
* [Reader settings modal](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/84242de7857e1ec03742e20aaaf1df469f44355f/src/app/components/ui/EbookSettingsModal.tsx>)
* [Responsive reader styles](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/84242de7857e1ec03742e20aaaf1df469f44355f/src/styles/blocks/ebook-responsive.css>)

The chapter document separately records:

* Historical repository baseline: `0423fb8b935235c61defe6324251e0205ca9372d`.
* Historical issue-linked source: `cb53d2c4cdf35a69fc322644e3c22f608d7f03f2`.
* Path: `content/book/02-part-2-carefree-20s/05-eighty-six-hours.md`.

These references are not interchangeable. The reconciled Linear copy has not been established as matching the repository file at the comparison commit. Branch-head verification does not establish deployment or runtime behaviour. The repository was not freshly inspected during preparation of this insertion preview.

### 5. Design representation

#### Available written representation

M-01 preserves the exact original **R3, T1, RT2, C1 and responsive checklist**, separately from review findings.

* RT2 is selected for comparison.
* R3, T1, RT2 and C1 remain unapproved specifications.
* The checklist remains planned and **Not run**.
* Written candidates are not rendered designs or proof of behaviour.

#### Unresolved Figma representation

[TOA-402](<https://linear.app/lightspeedwp/issue/TOA-402/review-book-design-assess-figma-integration-and-guidelines>) records:

* **File key:** `Tcr8NnPxJZnQPPTYv02O7B`
* **Node:** `76:4`
* [**Recorded Figma pointer**](<https://www.figma.com/design/Tcr8NnPxJZnQPPTYv02O7B/This-one-time-on-acid...?node-id=76-4>)

Its exact version, node contents, website applicability and coverage of the selected states remain unverified. It is a discovery pointer—not yet the selected rendered comparison baseline.

Existing homepage and draft-access screenshot assets are identified in the screenshot evidence update below and support bounded static comparison. Their capture dates and source/deployment revisions remain unknown. No rendered contents, manuscript-reader, settings or recovery-state representation was found within the inspected records; this is a bounded finding, not proof that none exists elsewhere.

### 6. Artwork treatment

**Proposal:** no artwork for the initial prose, typography and continuity comparison.

A clearly labelled placeholder may reserve homepage image space without implying artwork acceptance. No exact original artwork is selected: [TOA-8](<https://linear.app/lightspeedwp/issue/TOA-8/bug-assets-restore-original-figma-artwork>) retains unresolved export, provenance, mapping and rights evidence.

If artwork becomes necessary, identify its exact file/revision, source, placement, rights, credits and permitted review use before inclusion. Do not substitute portfolio artwork.

### 7. Explicit coverage gaps

| Gap | Current position |
| -- | -- |
| Nested manuscript subheadings | No explicit nested structure found in the complete proposed copies inspected for Chapters 7, 16, 17 and 19. This was not an exhaustive manuscript audit. |
| Long-title stress coverage | M-06 provides a longer existing title, not a verified worst-case specimen. |
| Heading semantics | M-07’s labels have no assigned hierarchy. Review-document headings are not manuscript specimens. |
| Chapter 5 drift | Document title and update-timestamp drift remain recorded. Completed manual comparison found no differences in the complete fenced manuscript, including frontmatter and five body breaks; byte-level identity, hidden formatting, other document sections, repository parity, rendered pagination and factual accuracy remain outside that finding. |
| Contents | Exact website-edition inventory, order and comparison revision remain unselected. |
| Homepage/access copy | Existing screenshots identify captured review copy, not approved final visitor copy. Capture dates and source/deployment revisions remain unknown; no frame/component mapping is established. |
| Rendered design | Homepage and draft-access screenshots support bounded static review. Additional reader-state representations were not found within the inspected records. Figma remains an unverified historical pointer, not a required input for this comparison. |
| Continuity | Stable source/revision/location contract, mapping eligibility and recovery-state details remain unresolved. |
| Environments | Exact viewports, browser versions, available devices and review arrangements remain to be recorded. |
| Light states | Preserve existing support; corresponding comparison references and final light design remain unresolved. |

### 8. Use and approval boundary

This manifest proposes source selections for the already selected review scope. Recording the manifest does not:

* approve manuscript claims, adaptation, edition inclusion or publication;
* approve candidate specifications or heading semantics;
* authorise source copying into another destination, Figma edits or implementation;
* establish rendered parity, accessibility conformance or launch readiness;
* authorise execution of the planned checks.

Continue static review using the identified screenshot assets. Remaining reader-state representations and their available provenance are the next evidence gaps, not replacement homepage/access screenshots or Figma links. Nested-subheading coverage remains explicitly unresolved until suitable existing content or a separately proposed specimen is selected.

No implementation or checks were performed in preparing this manifest. Saving it would record supporting material only, not complete DEL-01 or resolve its gaps.

## Proposed TOA design-review coverage matrix

**Planning baseline:** [register v1.4.1](<https://linear.app/lightspeedwp/document/book-website-design-and-reader-decision-register-be84aedd1a47>), inspected updated 5 November 2026, 09:35:27.713 UTC. This identifies the pre-insertion source baseline, not the resulting register version.

The review scope and RT2 comparison model are selected. **The mappings below remain proposals; their planned checks remain Not run.** Static homepage and draft-access inspection is recorded separately below. Screenshot assets are identified, but capture/source revisions and browser/device environments remain unverified.

### 1. Proposed comparison environments

| Reference | Proposed coverage | Availability |
| -- | -- | -- |
| V-N | 320 and 390 CSS-pixel widths: reflow stress and representative narrow layout | Heights, devices and representations unselected |
| V-M | 768 CSS-pixel width: intermediate comparison, not adoption of a site-wide breakpoint | Environment unconfirmed |
| V-W | 1280 and 1536 CSS-pixel widths: wide layout and R3 upper anchor | Environment unconfirmed |
| V-B | Immediately below, at and above R3’s proposed 640, 1024 and 1536 boundaries; fractional widths between fluid anchors | Supplementary candidate checks, not approved breakpoints |
| B-M | Mobile Safari on iOS and mobile Chrome on Android | Exact versions, devices and access unconfirmed |
| B-D | Desktop Safari, Chrome and Firefox | Exact versions, operating systems and access unconfirmed |
| T-D/L | Dark-first comparison, followed by corresponding existing light states | Exact light-state references unpinned; preserve support |

Viewport width does not establish a device, browser or usable height. Record actual dimensions, orientation and zoom before any later execution.

### 2. Surface and specimen matrix

| Surface / specimen | Proposed viewports and browsers | Themes | Planned review methods | Missing inputs |
| -- | -- | -- | -- | -- |
| Homepage: hero, prose, reading action | V-N/M/W; B-M and B-D; V-B where R3 affects layout | T-D/L | Heading/action wrapping, hierarchy, reading order, keyboard/focus, zoom/reflow, text-spacing tolerance and contrast | Exact copy, rendered revision and artwork placeholder treatment |
| Reading access: code entry, invalid/expired code, reverification | V-N/M/W; B-M and B-D | T-D/L | Labels/instructions, error association, non-colour cues, focus order/visibility, narrow-screen controls and acknowledgement clarity | Exact state designs, copy and interaction representation; provider behaviour unverified |
| Contents | V-N/M/W; B-M and B-D | T-D/L | Title/link wrapping, hierarchy, keyboard navigation, focus and distinction between contents and protected reading | Edition inventory/order, exact design and route |
| Chapter 5 complete proposed copy, M-05 | V-N/M/W plus relevant V-B; B-M and B-D | T-D/L | Sustained prose, scene breaks, measure/container relationships, zoom/reflow and text-spacing tolerance | Rendered chapter revision and permitted comparison use; source-to-render mapping |
| Chapter 7 title/subtitle, M-06 | V-N/M/W plus fluid-anchor/boundary comparisons; B-M and B-D | T-D/L | Multi-line wrapping, title/subtitle separation and interaction with reader enlargement | Rendered specimen; not established as worst-case title |
| Chapter 19 standalone labels, M-07 | V-N/M/W; B-M and B-D | T-D/L | Compare label wrapping only; assess hierarchy only after a separately identified role proposal | Semantic levels and primary/secondary visual roles unassigned |
| RT2 typography controls and reset | V-N/M/W; B-M and B-D | T-D/L | Control reachability, labels, keyboard/focus, enlargement, heading/body distinction and reset feedback | Exact controls, specialised text roles, legacy settings and persistence notices |
| C1 exact restoration | V-N/M/W, including proposed orientation/layout transitions; B-M and B-D | T-D/L | Trace expected source/location before and after adjustment/reset; distinguish exact from mapped restoration | Stable identifiers, mapping eligibility and reflow-completion contract |
| C1 approximate recovery | V-N/M/W; B-M and B-D | T-D/L | Reader choice, truthful approximation wording, focus and preservation of unresolved saved target | Exact destinations, recovery-screen persistence and authorisation-interruption rules |
| C1 unavailable storage | V-N/M/W; B-M and B-D | T-D/L | Distinguish current-view changes from saved changes; review notice/retry clarity and preservation of unrelated preferences | Storage-failure representation, partial-success rules, retry and notification decisions |

**Shared representation limits:** identified homepage and empty draft-access screenshots provide partial static coverage. No additional verification, contents, manuscript-reader, settings or recovery-state screenshots were found within the bounded inspection. Asset references do not establish capture/source revisions. Screenshots cannot establish keyboard behaviour, semantics, announcements, persistence or continuity.

### 3. Proposed accessibility and reader-adjustment methods

* **Wrapping and reflow:** inspect selected headings, prose, controls and messages at proposed widths, including 320 CSS-pixel-equivalent reflow and 200% text enlargement. Record clipping, overlap, obscured content and any justified scrolling exception.
* **Text-spacing overrides:** use the preserved checklist’s line height **1.5**, paragraph spacing **2**, letter spacing **0.12** and word spacing **0.16** times the relevant font size. These are tolerance checks—not replacement design values.
* **Keyboard and semantics:** review focus order, visibility, operation, labels, errors and heading structure against an inspectable interactive representation. Screen-reader/browser pairing and assistive-technology versions remain unselected.
* **Contrast:** assess exact rendered foreground/background/state pairings, including focus, error and disabled treatments. Approved colours are not verified contrast results.
* **RT2 comparison settings:** propose starting **18 / 1.7**, size endpoints **16 and 28**, and line-height endpoints **1.5 and 2.0**, including endpoint combinations and reset. Ranges, increments and heading-scaling exception remain unapproved.
* **Continuity:** compare expected logical passage before and after typography/reset changes. Numerical page retention alone is insufficient. No live authorisation, storage manipulation or service action is authorised.

The original checklist’s confirmed-heading-range expectation and RT2’s proposed reader-specific exception remain unresolved. Record that conflict rather than silently selecting a joint pass rule.

### 4. Coverage limits and result recording

* Nested manuscript-subheading coverage remains **unavailable in the inspected specimens**; do not invent headings.
* Chapter 5’s manual copy comparison found no differences, but does not establish repository parity or rendered fidelity.
* Preserve verified-reader access, existing light support and unrelated preferences.
* Retain the **WCAG 2.2 AAA target** without presenting this sample as a conformance audit.

For any separately authorised review, record:

**Surface/specimen → exact source and rendered revision → viewport/browser/device/theme/settings → method → expected outcome → observation/evidence → Not run / Passed / Failed / Blocked / Not applicable with reason.**

Identified screenshots permit continued bounded static review without Figma links. Additional reader-state representations are needed for the remaining visual coverage. An inspectable environment, recorded browser/device details, applicable state contracts and separate execution authority are prerequisites for later behavioural assessment, not for observations supported by existing images. Recording this matrix authorises no checks, implementation, publication or launch and does not approve R3, T1, RT2 or C1.

## Screenshot evidence update — 5 November 2026

### Inspection baseline and coverage

This update records completed read-only screenshot inspection and evidence discovery against register v1.5.0, updated 5 November 2026, 12:09:47.343 UTC. It does not record executed behavioural, responsive or accessibility checks.

Inspected records included:

* [TOA-321 — website launch](<https://linear.app/lightspeedwp/issue/TOA-321>), including its complete eight-child listing and existing nine-image reference set.
* [TOA-40 — page reconciliation](<https://linear.app/lightspeedwp/issue/TOA-40>), including its complete 29-child listing.
* Access references [TOA-223](https://linear.app/lightspeedwp/issue/TOA-223/content-capture-and-verify-read-the-draft-page-content) and [TOA-235](https://linear.app/lightspeedwp/issue/TOA-235/content-capture-and-verify-rough-draft-notes-page-content); reading/design decisions [TOA-355](https://linear.app/lightspeedwp/issue/TOA-355/decision-website-define-launch-reading-requirements) and [TOA-356](https://linear.app/lightspeedwp/issue/TOA-356/decision-website-define-visual-and-accessibility-acceptance); source loading [TOA-328](https://linear.app/lightspeedwp/issue/TOA-328/feat-ebook-align-manuscript-loading-with-validated-sources); continuity [TOA-329](https://linear.app/lightspeedwp/issue/TOA-329/feat-ebook-add-source-anchored-reading-continuity); reader coordination [TOA-308](https://linear.app/lightspeedwp/issue/TOA-308/epic-ebook-connect-manuscript-sources-and-harden-reader-behaviour); settings-focus work [TOA-376](https://linear.app/lightspeedwp/issue/TOA-376/fix-ebook-contain-settings-focus-and-restore-it-on-close); reader regression work [TOA-330](https://linear.app/lightspeedwp/issue/TOA-330/test-ebook-verify-manuscript-rendering-and-reader-interactions); contents work [TOA-429](https://linear.app/lightspeedwp/issue/TOA-429/content-book-contents-approve-the-website-editions-contents-and); and Next steps planning [TOA-447](https://linear.app/lightspeedwp/issue/TOA-447/design-website-plan-the-next-steps-page-and-reader-journey).

Descriptions and returned comments/attachments were inspected for the relevant access and reader records. This was not an exhaustive inspection of every project issue, historical upload or external counterpart. No repository refresh, live-site inspection or browser execution formed part of this evidence-discovery pass.

### Identified screenshot assets

* **SS-01 — Homepage:** [totoa-home.png](<https://uploads.linear.app/0858b26b-89d0-4f9c-882a-280581c122d5/4937e33a-069f-435e-a0c0-b3dd0c1b005c/4032e76c-642d-4efa-87bf-c4e2d0f3d376>), referenced by [TOA-321](https://linear.app/lightspeedwp/issue/TOA-321/epic-website-launch-website-v10-and-reading-experience). Visually inspected for the bounded homepage comparison.
* **SS-02 — Draft-access entry:** [totoa-unlock-the-draft.png](<https://uploads.linear.app/0858b26b-89d0-4f9c-882a-280581c122d5/19974ffe-02cb-40a7-9ea5-a1e87c771e23/1c7b5848-d3fe-467e-86fd-c1d4d0e52a6d>), referenced by [TOA-223](<https://linear.app/lightspeedwp/issue/TOA-223>) and [TOA-321](https://linear.app/lightspeedwp/issue/TOA-321/epic-website-launch-website-v10-and-reading-experience). Visually inspected; shows the empty email-entry presentation.
* **SS-03 — Alternate draft-entry upload:** [totoa-unlock-the-draft.png](<https://uploads.linear.app/0858b26b-89d0-4f9c-882a-280581c122d5/5567527b-1d8c-4ddd-95f9-963b0febff15/e09dca8f-fea6-4821-91ec-d0d037ca6369>), stored in [TOA-235](<https://linear.app/lightspeedwp/issue/TOA-235>). Visually inspected; shows the same draft-entry presentation, not an additional verification or reader state. Byte identity was not established. Its correspondence to the rough-draft-notes page remains unresolved.

These asset URLs identify inspected images, not source commits or deployed builds. Capture dates, browser versions, CSS viewports, zoom and device pixel ratios remain unknown. Image dimensions do not establish CSS viewport dimensions. Screenshot availability does not approve captured copy, artwork, claims or publication.

### Completed static findings

| Finding | Visible evidence and comparison | Limit |
| -- | -- | -- |
| VIS-01 | Draft-access wording describes early excerpts and selected chapters, rather than the complete approved shorter website edition after verification. | Captured wording does not establish current deployed copy or actual entitlement. |
| VIS-02 | Homepage/access wording associates reading entry with updates and launch news without a visible independent consent choice in those forms. | Actual subscription processing is unknown; this does not establish that newsletter enrolment occurs. |
| VIS-03 | The draft-entry presentation does not explain the emailed-code verification step. | This is a visible communication gap, not evidence that verification is bypassed. |
| VIS-04 | Both reviewed page footers link to Speaking/Workshops, Events and Media/Press, conflicting with confirmed retention without menu/footer links. | Captures do not establish current deployment, effective noindex or Google removal. |
| VIS-05 | Primary actions visibly use pink-to-violet gradients and pale labels rather than the approved pink-fill/dark-label candidate pairing. | Exact colours and contrast were not measured. |
| VIS-06 | Stylised interface heading/button lettering requires reconciliation with confirmed Space Grotesk/Inter direction. | Font identity cannot be established from these images alone; artwork exceptions do not automatically extend to interface text. |

Additional observations remain bounded: unfinished process-like visitor copy is visible; the homepage email field lacks a visible persistent label in the capture; existing spacing and card arrangements do not demonstrate conformity with unapproved R3; and visible cover artwork does not establish rights or approval. Accessible naming, runtime behaviour and exact typography measurements remain unknown.

### Available coverage and remaining gaps

| Review area | Available evidence | Remaining coverage |
| -- | -- | -- |
| Homepage and access entry | SS-01 and SS-02 support static hierarchy, copy, form and action observations; SS-03 supplies another upload of the entry presentation. | No replacement images are needed for these observations. Source/deployment provenance remains unresolved. |
| Verification | Empty email-entry form only. | Code entry, invalid/expired messages, successful verification and reverification were not found. |
| Contents | Editorial and planned navigation requirements exist in [TOA-429](https://linear.app/lightspeedwp/issue/TOA-429/content-book-contents-approve-the-website-editions-contents-and)/330. | No rendered contents screen found. |
| Manuscript reading | Written source/reader requirements exist; the launch image set also contains a journal article. | No manuscript-reader capture found. A journal article does not substitute for Chapter 5 prose or Chapter 7 title/subtitle. |
| Settings and adjustments | [TOA-376](https://linear.app/lightspeedwp/issue/TOA-376/fix-ebook-contain-settings-focus-and-restore-it-on-close) explicitly records that no screenshots were supplied. | No settings dialog, reader enlargement, adjusted line height or reset representation found. |
| Recovery and storage | [TOA-329](https://linear.app/lightspeedwp/issue/TOA-329/feat-ebook-add-source-anchored-reading-continuity) and preserved C1 provide written requirements/proposals. | No exact-restoration, approximate-recovery or storage-failure representation found. |
| Narrow and light reader | Existing references include narrow About Ash presentation and visible theme controls. | Neither establishes narrow manuscript/settings layouts or existing light reader states. |

“Not found” applies only to the inspected records. It is not proof of absence elsewhere, missing implementation or a need to create duplicate work.

### Smallest next evidence

First reuse any existing captures or labelled static representations of:

1. Verification-code entry and invalid/expired/reverification messages.
2. Contents, selected chapter prose/title, settings, enlarged text and reset, including narrow and existing-light coverage.
3. Exact restoration, reader-confirmed approximate recovery and unavailable-storage or failed-save messaging.

Identify the source issue/file, represented state, theme, available revision/capture date and dimensions; record unknowns rather than inventing provenance. These are comparison inputs, not publication approval or evidence of working behaviour. No Figma link is required.

Additional intermediate/wide samples, fractional-width comparisons, artwork and unassigned/nested heading specimens may extend coverage later; they need not block observations supported by the existing images. Existing nested-subheading and semantic-role gaps remain explicit.

### Recording and approval limits

The screenshot inspection establishes visible findings only. Keyboard operation, semantics, announcements, zoom/reflow, text-spacing tolerance, contrast, authorisation, newsletter processing, saved preferences and continuity remain unverified.

R3, T1, RT2 and C1 remain unapproved. RT2 remains selected for comparison only. Existing light support, confirmed values, historical approvals, manuscript/publication boundaries and unrelated preferences are preserved. No finding is marked resolved by recording it.

**Revision note — proposed v1.5.1:** correct overly broad rendered-evidence wording and record completed static inspection, its sources and remaining gaps. No requirements, candidate numerical values or approval states change. The revision date remains 5 November 2026.

# TOA resend candidate R-B — consolidated with timing and concurrency amendments

**Status: complete unsaved, unapproved candidate.** Option A remains unapproved. The four selected scope/recovery boundaries below do not approve the whole lifecycle contract.

## 1. Approval position

**Previously approved product policy**

* Emailed single-use verification codes with ten-minute expiry.
* Submission or email delivery alone grants no manuscript access.
* Newsletter consent remains separate and optional.

**Selected boundaries incorporated here**

1. Pending verification journeys shared across linked tabs in the same browser profile, with separate journeys on other devices/browser profiles.
2. Another replacement on explicit reader retry after confirmed send failure.
3. Reconciliation first when replacement is confirmed but sending is uncertain.
4. Explicit reader-requested replacement after reconciliation cannot establish the send outcome.

**Still proposed:** Option A’s creation-based expiry, R-B replacement mechanics, the timing and concurrency amendments, and the remaining lifecycle details.

## 2. Verification-context scope

A pending verification journey is shared across its linked tabs in the same browser profile. Journeys on other devices or browser profiles remain separate.

Replacement affects earlier pending challenges **within that journey only**. It does not invalidate another journey’s codes, sign out readers or revoke established authorised sessions.

How journeys are identified, linked across tabs and handled when storage is unavailable remains unresolved. Changing the email address within a journey also requires a defined rule.

## 3. Replacement and expiry

An accepted resend creates a replacement challenge within the same verification journey. When that replacement becomes authoritative, every earlier active challenge in that journey becomes invalid.

Replacement creation and earlier-challenge invalidation must have one authoritative outcome:

* **Replacement takes effect:** the replacement is established and earlier challenges are invalidated.
* **Replacement does not take effect:** earlier challenges retain only their existing validity; they are not extended or reactivated.
* No intermediate outcome may permit both earlier and replacement challenges to be accepted.

Under **proposed Option A**, the replacement expires ten minutes after authoritative server creation. Email queuing, send acceptance, delivery, opening or code entry does not restart or extend that period. Browser clocks and countdowns cannot override server expiry.

**Proposed authoritative event:** creation of a usable replacement challenge and its activation are one authoritative state transition. At that transition, the replacement becomes current, its creation timestamp is recorded, its expiry is set ten minutes later under proposed Option A, and earlier active challenges in the journey become invalid.

Preliminary preparation does not create a usable challenge or start its validity period. A replacement must not become usable before this transition.

If the transition does not take effect, no usable replacement is established and earlier challenges retain only their existing validity. If its outcome is uncertain, reconcile the authoritative state before asserting which challenge is current or initiating another replacement.

Concurrent operations must have a determinate authoritative order. The mechanism for establishing that order remains unresolved; no database, locking or provider architecture is selected.

## 4. Sending and recovery

Challenge replacement, email-send acceptance and delivery are separate outcomes. None proves the next occurred.

| Situation | Candidate behaviour |
| -- | -- |
| Replacement takes effect; sending is confirmed failed | Earlier challenges remain invalid. On explicit reader retry, create another replacement; invalidate the failed-send challenge when that replacement takes effect. Do not automatically loop. |
| Replacement is confirmed; send outcome is uncertain | Keep the current challenge within its original expiry while reconciling. Report uncertainty without claiming successful sending or delivery. Do not automatically replace or extend it. |
| Reconciliation cannot establish the send outcome | Allow an explicit reader-requested replacement, subject to unresolved abuse controls. The current challenge retains only its original validity until replacement takes effect, then becomes invalid. It may already have expired. |
| Replacement outcome itself is uncertain | Do not claim which challenge is current or blindly issue further replacements. Reconcile the authoritative replacement outcome. The selected uncertain-send recovery does not settle this case. |

An explicit retry is not an automatic retry. Repeating the **same logical replacement request** must not accidentally create additional challenges; a deliberate subsequent request is distinct. The mechanism for distinguishing them remains unresolved.

## 5. Delayed and out-of-order email

A superseded code remains invalid even if its email arrives after the replacement email. Inbox arrival order does not determine validity.

Reader communication must explain that replacement invalidates earlier codes. It must not promise:

* that the last email received contains the valid code;
* that delivery leaves ten usable minutes;
* or that send acceptance proves delivery.

Final messages and recovery controls remain unapproved. Expired-code recovery is not fully specified by the selected send-failure rules.

## 6. Redemption and access

Only the current, unused, unexpired challenge in the defined journey may be accepted. At or after its authoritative expiry, it is expired.

Concurrent submissions must not redeem the same challenge successfully more than once. Successful use invalidates the challenge.

**Proposed redemption-versus-replacement rule:** the authoritative order determines the outcome.

* **Replacement takes effect first:** the earlier challenge is superseded and cannot subsequently be redeemed.
* **Redemption succeeds first:** the challenge becomes consumed and its verification journey is completed. A concurrent replacement request for that completed journey must not create or activate another pending challenge.
* **No reliable order or outcome is established:** do not report successful verification or replacement based on an assumption. Reconcile the authoritative outcome; do not treat uncertainty as permission to accept both operations.

Successful redemption and journey completion must have one authoritative outcome so that a replacement cannot slip between them. Concurrent redemption requests must not consume the same challenge more than once.

Successful redemption does not itself prove that subsequent session establishment or manuscript delivery completed. Partial-success recovery for those later steps remains unresolved. Established authorised sessions are not revoked by pending-code replacement.

Resending, replacement creation and email delivery grant no manuscript access. Valid verification and server authorisation remain required, including direct chapter access.

## 7. Outstanding decisions and prerequisites

| Area | Still unresolved |
| -- | -- |
| Timing | Option A and the proposed single creation/activation event remain unapproved. The authoritative timestamp source and failure/reconciliation mechanism require feasibility assessment. |
| Concurrency | The proposed ordering outcomes remain unapproved. The mechanism for enforcing them, concurrent replacement-request handling and recovery after successful redemption but incomplete session establishment remain unresolved. |
| Journey identity | Linked-tab identification, unavailable storage, email-address changes and isolation between journeys. |
| Uncertain replacement | Reconciliation mechanism and reader recovery if the authoritative outcome cannot be established. |
| Send reconciliation | Evidence distinguishing failure, acceptance, delivery and continuing uncertainty; when reconciliation is considered unsuccessful. |
| Reader feedback | Pending, failed, expired and superseded-code messages; accessible status communication and retry actions. |
| Abuse controls | Justified resend, attempt and rate limits; no numerical values selected. |
| Feasibility and privacy | Provider support, secure challenge handling, request identity, necessary records and operational retention. |

## 8. Preservation and evidence limits

Preserve established authorised sessions, existing light support, unrelated preferences and separate optional newsletter consent. No cross-device progress synchronisation or other launch expansion is introduced.

This consolidates the chat proposals, selections and exact timing/concurrency amendments; it is **not a fresh provider or repository assessment**, implementation evidence or a completed access-flow specification. Earlier findings are not verified as closed merely by inclusion here.

**Option A and R-B remain unapproved. Nothing saved, implemented or checked.**

## Recording context for the preserved R-B candidate

The complete candidate above preserves its original draft-state wording. Its references to “unsaved” and “Nothing saved” describe the candidate when prepared in chat; they must not be interpreted as its persistence state after any subsequently authorised register save.

The four selected boundaries were explicitly selected by Ash on 8 November 2026: browser-profile journey scope at 08:38 UTC; confirmed-send-failure recovery at 09:24 UTC; reconciliation first for uncertain sending at 09:32 UTC; and explicit replacement after unsuccessful send reconciliation at 12:24 UTC. These selections do not approve Option A or R-B as a whole, provider feasibility, implementation or publication.

The incorporated timing and concurrency amendments were requested for consolidation, not approved as policy. This insertion does not mark RB-02, RB-04 or other findings resolved.

**Revision entry — 8 November 2026, v1.6.0:** add the complete amended R-B candidate and distinguish selected scope/recovery boundaries from unapproved lifecycle proposals. Existing content and historical approvals remain unchanged. Saving this material records it only; it does not adopt the candidate or authorise execution.

# TOA visitor-copy proposal and separate review findings

## Recording context and approval boundaries

This section preserves the complete consolidated visitor-copy proposal prepared on 8 November 2026, its subsequent CC-06 placement clarification and separate CF/CC review findings. Their historical draft-state wording is retained below.

Ash approved “website edition” as visitor-facing terminology on 8 November 2026 at 03:53 UTC. That naming approval does not approve surrounding copy, placement, publication, implementation or any record save.

The consolidated proposal already incorporates the CF-04 distinction between navigation links and code-request buttons. The later placement clarification supplements it: do not interpret the earlier instruction to reuse an explanation as requiring every explanatory block at every entry point.

The ten-minute duration is approved, but its starting event is not settled policy. Register v1.6.0 records Option A and R-B as unapproved proposals, including the proposed authoritative creation/activation event. References below to unresolved expiry timing remain applicable at approval level; they do not imply that no candidate has been drafted.

References to “unsaved”, “Nothing saved” or “Nothing approved” within the preserved material describe its original preparation/review state and scoped actions. They do not negate the separately approved terminology, imply that historical decisions were withdrawn or describe persistence after a subsequently authorised register save.

## Preserved complete consolidated visitor-copy proposal

# TOA homepage and draft-access copy proposal

**Status:** complete unsaved proposal. Ash approved **“website edition”** as visitor-facing terminology on 8 November 2026. All other copy below remains unapproved.

## 1. Homepage

Preserve the existing book title and unrelated introductory copy.

### Reading invitation

**Heading**

> Read the website edition.

**Supporting copy**

> A complete, self-contained shorter edition of *This one time on acid...*, free to read online. This is the website edition—not a sample chapter or the complete future long-form book.

### Navigation-only reading links

Use where an action **opens the reading-access page**, without submitting an email address.

**Link label**

> Read the website edition

**Supporting explanation**

> Verify your email to read the complete shorter website edition free online.

These links do not request a code or grant manuscript access.

### Homepage email form

Use only where the form’s intended submission **requests a verification code**.

**Field label**

> Email address

**Placeholder**

> [you@example.com](<mailto:you@example.com>)

**Submit button**

> Send a reading code

**Form explanation**

> We’ll email you a single-use verification code. Enter it within 10 minutes to access the website edition. No password needed. Reading does not subscribe you to the newsletter.

Repeated homepage entry points must use the wording appropriate to their action: navigation links and code-request forms are not interchangeable.

## 2. Draft-access page

**Heading**

> Read the website edition.

**Introduction**

> Read the complete, self-contained shorter website edition of *This one time on acid...* free online. Verify your email address to begin.

### Email form

**Field label**

> Email address

**Placeholder**

> [you@example.com](<mailto:you@example.com>)

**Submit button**

> Send a reading code

**Form explanation**

> We’ll email you a single-use verification code. Enter it within 10 minutes to access the website edition. No password needed. Reading does not subscribe you to the newsletter.

### Reading entitlement

**Heading**

> What you’ll read

**Copy**

> The complete shorter website edition, with its own narrative arc—not selected excerpts or the complete future long-form book.

### Edition context

**Heading**

> A shorter edition for the website

**Copy**

> This edition is intended to stand on its own. Future long-form editions are separate plans.

This replaces the captured early-excerpts, automatic-updates, future-event-access and incomplete-manuscript promises. Unrelated quotations and other page copy are not approved or revised by this proposal.

## 3. Separate optional newsletter invitation

Keep this separate from reading entry on either page. Do not introduce mandatory newsletter consent.

**Heading**

> Want book news too?

**Copy**

> Newsletter signup is optional and separate from reading. If you choose to subscribe, you’ll need to confirm your subscription by email.

**Navigation action**

> Sign up for the newsletter

This action opens the separately defined newsletter journey; its exact destination remains unresolved. Requesting or receiving a reading code does not establish newsletter subscription.

## 4. Placement and publication conditions

* **Navigation:** “Read the website edition” opens the access journey; it does not send a code.
* **Form submission:** “Send a reading code” requests a code. It does not establish successful delivery, verification or manuscript access.
* **Access:** valid email verification remains required, including direct chapter access. Newsletter subscription is not required.
* **Feedback:** later messages must distinguish request processing, email delivery and verified access. No success/error copy is selected here.
* **Availability:** publish reading invitations only when the complete approved website edition and authorised access journey are available.
* **Outstanding:** exact routes, existing action behaviour, final privacy wording, edition publication approval and operational feasibility remain unresolved.
* **Approval:** only the term **“website edition”** is approved. This proposal does not approve the remaining copy, candidate designs, saving, publication or implementation.
* **Preservation:** existing light support and R3, T1, RT2 and C1 approval states remain unchanged.

**Nothing saved, implemented or checked.**

## Preserved subsequent placement clarification — CC-06

## Unsaved placement clarification — CC-06

**“Website edition” remains approved terminology. All placement and surrounding copy below remain proposals.**

### Homepage

| Placement | Proposed content |
| -- | -- |
| Main reading introduction | Show the full explanation of the complete, self-contained shorter edition **once**. |
| Navigation-only reading link | **Read the website edition** |
| First standalone reading link without nearby access explanation | Add: “Verify your email to read the complete shorter website edition free online.” |
| Repeated reading links within an already explained section | Use the link label only; do not repeat the full edition or verification explanation. |
| Email form requesting a code | Show its field label, **Send a reading code** button and the form explanation below. Do not also add the navigation-link explanation. |

### Code-request forms

Place this explanation beside each independently usable email form, including the draft-access form:

> We’ll email you a single-use verification code. Enter it within 10 minutes to access the website edition. No password needed. Reading does not subscribe you to the newsletter.

The ten-minute starting point remains unresolved under **CC-05**; this clarification does not settle it.

### Draft-access page

* Keep the edition introduction above the form.
* Keep the verification explanation beside the form.
* Retain **“What you’ll read”** as the entitlement summary.
* Treat **“A shorter edition for the website”** as optional supporting context: do not automatically place it beside the entitlement summary where it repeats the same distinction.

### Newsletter invitation

Keep the optional newsletter invitation in a separate section. Do not repeat it beneath every reading link or make it part of code submission. Preserve the explicit non-subscription statement beside reading forms.

### Boundaries

“Nearby” means available in the same reading-entry section—not assumed to have been seen elsewhere on the page. Final layouts must establish that relationship; it has not been verified.

This addresses repetition **within the proposal**, not verified closure of CC-06. Exact routes, action behaviour, publication conditions and candidate approval states remain unchanged.

**Nothing saved, implemented or checked.**

## Separate historical review — CF-01–CF-06

## Findings — unsaved copy proposal

**Baseline:** the copy proposed above, compared with VIS-01–VIS-03 in register v1.5.1 and confirmed policy in PRD v1.1.1. Sources were re-read during drafting; no further source refresh or behavioural checks occurred for this review.

### CF-01 — Reading entitlement is corrected

The proposal consistently describes a complete, self-contained shorter website edition—not selected excerpts or the future long-form book. This addresses **VIS-01 at wording level**, but does not resolve the saved finding or establish publication readiness.

### CF-02 — Verification is explained without granting premature access

“Send a reading code” and the single-use, ten-minute explanation accurately reflect confirmed policy. Access follows verification, not email submission. This addresses **VIS-03 at wording level**.

Delivery remains an intended action, not a verified outcome. The proposal appropriately avoids claiming that a code was sent or received.

### CF-03 — Newsletter separation is clear

The explicit non-subscription statement and separate optional invitation address **VIS-02 at wording level**. Reading verification and newsletter confirmation remain distinct.

The newsletter destination and actual processing remain unverified; copy alone cannot establish independent consent.

### CF-04 — Repeated homepage actions remain ambiguous

**Minor ambiguity:** the instruction to reuse the invitation and explanation at repeated entry points does not specify which existing buttons submit an email form and which navigate to the access page. “Send a reading code” would be misleading on a navigation-only action.

The action’s destination and effect need confirming before placement approval.

### CF-05 — Publication conditions are necessary

“Read … free online” and “the complete … edition” are supported intended product claims, but availability and the exact approved edition are not established. The proposal correctly makes publication conditional.

Calling the invitation “publication-ready” subject to conditions must not be interpreted as an editorial, rights, accessibility or launch approval.

### CF-06 — Shorter-edition naming remains an editorial choice

“Website edition” is consistent with policy, but replacing all “rough draft” language changes the visitor-facing presentation. It remains an unapproved naming proposal, not a settled title or publication-status decision.

**No contradiction found in the stated access or newsletter policy.** Placement semantics, final naming and actual availability remain unresolved. Nothing revised, approved, saved or executed.

## Historical-review applicability note

CF-01–CF-06 assessed the earlier copy proposal, not the consolidated text or subsequent placement clarification. References to “the copy proposed above” in that preserved review identify its original chat baseline.

Ash’s later naming selection supersedes CF-06’s uncertainty about the term “website edition” only; publication status and surrounding copy remain unapproved. CF-04 received a proposed wording clarification incorporated in the consolidated proposal; actual destinations and behaviour remain unverified. No historical finding is silently deleted or marked fully resolved.

## Separate consolidated-copy review — CC-01–CC-06

## Findings — consolidated copy proposal

**Baseline:** the complete unsaved proposal immediately above. This is a wording review against confirmed decisions, not a fresh source or runtime assessment.

* **CC-01 — Naming approval is correctly bounded.** “Website edition” is approved terminology. The proposal does not extend that approval to surrounding copy, publication or implementation.
* **CC-02 — CF-04 is addressed in the proposed wording.** Navigation links open reading access; “Send a reading code” submits a code request. Exact routes and existing behaviour remain unverified, so placement still requires confirmation.
* **CC-03 — Newsletter separation is consistent.** Reading forms explicitly exclude newsletter subscription. The separate newsletter action opens another journey, with confirmation required. No bundled consent or automatic subscription is promised.
* **CC-04 — Edition entitlement is consistent.** Both pages describe the complete shorter edition, not excerpts or the future long-form book. Availability remains conditional on approved publication content and a working authorised access journey.
* **CC-05 — Verification wording has a minor timing ambiguity.** “Enter it within 10 minutes” does not identify when that period begins. It must not imply ten minutes from receipt if the eventual expiry mechanism uses another starting point. The expiry reference remains to be confirmed; no delivery guarantee is established.
* **CC-06 — Repeated explanations may become redundant.** The homepage invitation, navigation explanation and form explanation overlap. This is a placement/editorial question—not a policy contradiction. The proposal does not establish that all three should appear together at every entry point.

**No material policy contradiction found.** Remaining decisions concern placement, expiry timing, destinations and publication prerequisites. Earlier VIS findings are not verified as resolved by proposed copy.

Nothing revised, approved, saved, implemented or checked.

## Consolidated-review applicability note

CC-01–CC-06 assessed the consolidated copy before the subsequent CC-06 placement clarification. Its preserved reference to the proposal “immediately above” identifies that original chat baseline, not the historical review inserted between sections here.

The placement clarification proposes a response to CC-06; it does not establish approved placement or verified closure. CC-05 remains unresolved at policy-approval level despite the separately recorded unapproved Option A candidate. Do not publish wording implying ten minutes from email receipt.

## Source references and recording limits

The drafting and review used [PRD v1.1.1](<https://linear.app/lightspeedwp/document/prd-this-one-time-on-acid-website-and-reading-experience-b7f8974e507e>), [TOA-223’s draft-access capture](<https://linear.app/lightspeedwp/issue/TOA-223>), and VIS-01–VIS-03 recorded in this register at v1.5.1. The screenshot sources, provenance limitations and uncovered states remain recorded in the existing screenshot evidence section.

This insertion previews preservation of generated content and review history, not a fresh provider, repository, screenshot or runtime assessment. No final copy, route, action behaviour, delivery outcome, publication approval or conformance result is established.

The existing Option A/R-B candidate, four selected scope/recovery boundaries, R3, T1, RT2, C1, light-support preservation and other unresolved decisions remain unchanged. This insertion does not save or alter homepage/access implementation, the PRD, design brief or source issues.

**Revision entry — 8 November 2026, v1.7.0:** record the complete consolidated visitor-copy proposal, subsequent placement clarification and separate CF/CC review findings. Preserve approved terminology separately from unapproved copy and proposed expiry timing. Saving this material records it only; it does not approve publication or implementation.

# TOA partial-success recovery candidate and separate review

## Recording context and approval boundaries

This section preserves the complete corrected partial-success recovery candidate and the separate PSR-01–PSR-07 review. The review assessed the earlier candidate before the PSR-02 wording amendment; it did not assess implementation or approve the corrected candidate.

Ash explicitly selected four recovery boundaries on 9 November 2026:

1. Secure recovery from confirmed redemption reliably tied to the same browser-profile journey — selected at 03:33 UTC.
2. Fresh email verification after confirmed loss of that secure link, distinguishing temporary uncertainty — selected at 03:41 UTC.
3. Explicit reader choice of fresh verification during temporary recovery-link uncertainty — selected at 04:16 UTC.
4. Supersession of pending recovery when fresh verification becomes authoritative, not on click alone — selected at 04:27 UTC.

These selections do not approve all supporting mechanics, the complete candidate, Option A or R-B. The recovery-first race remains unresolved.

Historical references to “unsaved” and “Nothing saved” below describe preparation in chat, not persistence after any subsequently authorised register save. Recording the candidate and review does not approve policy additions, implementation, testing, publication or launch.

## Preserved complete corrected candidate

# TOA partial-success recovery candidate

**Status: complete unsaved candidate.** The four recovery boundaries below were explicitly selected by Ash. This consolidated wording and its supporting mechanics remain unapproved. **Option A and R-B remain unapproved.**

## 1. Scope

This candidate covers **confirmed successful code redemption followed by incomplete session establishment**.

Successful redemption does not prove that a usable authorised session exists or that manuscript delivery succeeded. It is distinct from an uncertain redemption outcome, which remains outside this candidate’s selected recovery direction.

The consumed code remains invalid throughout recovery.

## 2. Four selected boundaries

### A. Secure recovery from confirmed redemption

Allow session recovery where the server can reliably associate confirmed redemption with the **same browser-profile verification journey**.

Recovery must not reuse the consumed code. Manuscript content must not be delivered until valid server authorisation is established.

Recovery lifetime, safeguards and technical feasibility remain unresolved.

### B. Confirmed loss of the secure journey link

Require fresh email verification when the server confirms that redeemed-code recovery cannot be securely linked to the same browser-profile journey.

Do not interpret a temporary inability to verify that link as confirmed loss.

### C. Temporary uncertainty about the journey link

When the server temporarily cannot verify the recovery link:

* Report uncertainty truthfully.
* Do not claim recovery eligibility is confirmed or permanently lost.
* Allow the reader to **explicitly choose fresh email verification**.
* Do not reuse the consumed code or grant manuscript access without valid server authorisation.

Numerical limits and the mechanisms for resolving uncertainty remain unresolved.

### D. Supersession by fresh verification

Supersede the pending recovery attempt **when the fresh verification journey is authoritatively established—not when the reader clicks**.

* If the fresh journey is not established, the click alone does not cancel recovery.
* Once superseded, the old recovery attempt cannot establish a session.
* Preserve any authorised session established first.

The competing fresh-request outcome when recovery establishes a session first remains explicitly unresolved.

## 3. Consolidated state contract

| Observed state | Candidate response |
| -- | -- |
| Redemption confirmed; session establishment incomplete; secure same-journey link established | Permit secure session recovery, subject to unresolved safeguards and lifetime. Do not redeem the code again. |
| Server confirms loss of the secure link between confirmed redemption and the same browser-profile verification journey—not merely temporary inability to verify that link | Require fresh email verification. Temporary inability remains uncertainty, with fresh verification available only by explicit reader choice under the separately selected uncertainty rule. |
| Secure-link verification is temporarily unavailable or uncertain | Communicate uncertainty and allow explicit fresh verification. Do not treat uncertainty as confirmed link loss. |
| Reader requests fresh verification, but the new journey is not established | The request alone does not supersede pending recovery. |
| Fresh verification journey becomes authoritative before recovery establishes a session | Supersede pending recovery; it must not later establish a session. |
| Recovery establishes an authorised session before the fresh journey becomes authoritative | Preserve that session. Treatment of the competing fresh-verification request remains unresolved. |
| Redemption itself is uncertain | Do not apply the confirmed-redemption recovery path by assumption. Reconciliation and recovery rules remain unresolved. |

These are selected directions expressed as a consolidated candidate—not verified provider behaviour.

## 4. Access and preservation boundaries

* Recovery eligibility is not manuscript authorisation.
* Session establishment is not evidence of successful manuscript delivery.
* A consumed code must never be reactivated or reused.
* Preserve established authorised sessions, including those unrelated to the pending recovery attempt.
* Preserve the selected browser-profile journey boundary: linked tabs share that journey; other devices/browser profiles have separate journeys.
* Preserve the four previously selected R-B journey/send-recovery boundaries. This candidate does not change their treatment of confirmed send failure, uncertain sending or unsuccessful send reconciliation.
* Newsletter consent remains separate and optional.
* Existing light support and unrelated reader preferences remain unchanged.
* No cross-device reading-progress synchronisation or other launch expansion is introduced.

## 5. Outstanding decisions and prerequisites

| Area | Still unresolved |
| -- | -- |
| Recovery-first race | Whether the competing fresh-verification request is cancelled, suppressed or otherwise handled when recovery establishes the matching session first. No recommendation has been selected. |
| Recovery lifetime | How long confirmed redemption remains eligible for recovery; no numerical duration is selected. The ten-minute code expiry must not silently become a recovery lifetime. |
| Secure association | Evidence and safeguards establishing the same browser-profile journey without treating the consumed code as a reusable credential. |
| Authoritative transitions | How fresh-journey establishment and recovery supersession obtain a consistent outcome across concurrent requests and linked tabs. |
| Uncertain outcomes | How to reconcile uncertain redemption, session establishment or supersession without assuming success or failure. |
| Repeated requests | How retries avoid duplicate session-establishment effects and how deliberate fresh verification differs from repeated requests. |
| Numerical controls | Attempt, retry and rate limits; none are selected here. |
| Privacy and security | Necessary recovery records, retention/deletion, shared-device treatment and permitted operational access. |
| Reader feedback | Accessible pending, unavailable, superseded, recovered and fresh-verification messages; exact wording remains unapproved. |
| Feasibility | Provider support, server/session architecture and operational capability remain unverified. |
| Delivery failure | Recovery when an authorised session exists but manuscript delivery fails remains separately unresolved. |

## 6. Approval and evidence limits

This candidate consolidates the four explicit selections from **9 November 2026**. It does not approve the complete recovery specification, Option A, R-B, provider selection, visitor copy, publication or implementation.

No fresh repository/provider assessment was performed. Existing findings are not verified as resolved merely by drafting this candidate.

**Nothing saved, implemented or checked.**

## Separate preserved review — PSR-01–PSR-07

## Findings — partial-success recovery candidate

**Baseline:** the complete unsaved candidate above, compared with Ash’s four explicit recovery selections. This is a wording review, not a fresh source or runtime assessment.

* **PSR-01 — All four selections are preserved.** Secure same-journey recovery, fresh verification after confirmed link loss, optional fresh verification during temporary uncertainty and supersession only when the fresh journey becomes authoritative are represented without an evident omission.
* **PSR-02 — “Link cannot be established” is potentially broader than the selection.** In the state table, that phrase could include temporary technical inability. The selected fallback applies to **confirmed loss of secure linkage**, not merely failure to establish it during an attempt. Other sections preserve this distinction, creating a local ambiguity rather than an explicit policy change.
* **PSR-03 — Session incompleteness needs classification.** The scope includes incomplete session establishment, while uncertain session outcomes remain unresolved. It does not define how to distinguish a confirmed missing session from an existing session whose establishment response was lost. That distinction matters before attempting recovery; confirmed redemption alone is insufficient.
* **PSR-04 — Authoritative supersession remains a technical prerequisite.** The selected outcome is clear, but the mechanism preventing late recovery completion after supersession is not established. The candidate correctly leaves concurrency and linked-tab enforcement unresolved.
* **PSR-05 — Additional safeguards remain proposals.** Duplicate-session-effect prevention, recovery records, retention and authoritative-transition mechanics extend the specification beyond the four selections. They are relevant prerequisites, but must not inherit approval from those selections.
* **PSR-06 — The recovery-first race remains open.** Preserving a session established first does not decide what happens to the competing fresh-verification request. The candidate explicitly retains that unresolved choice; no cancellation policy has been adopted.
* **PSR-07 — Approval and access boundaries are consistent.** Consumed codes remain invalid; recovery eligibility, authorised sessions and manuscript delivery are distinct. No numerical recovery lifetime, provider capability, newsletter enrolment or implementation authority is inferred. Option A and R-B remain unapproved.

**Conclusion:** no direct contradiction with the four selections found. PSR-02 is a wording ambiguity; PSR-03–PSR-05 identify unresolved specification and feasibility matters—not verified defects or approved additions.

Nothing revised, approved, saved, implemented or checked.

## Review applicability and PSR-02 amendment

The review’s reference to the candidate “above” identifies its original chat baseline: the earlier candidate before the PSR-02 amendment, not the corrected candidate preserved in this insertion.

The exact proposed PSR-02 amendment replaced this earlier table row:

| Observed state | Candidate response |
| -- | -- |
| Server confirms the secure recovery link cannot be established | Require fresh email verification. |

With this row, incorporated in the corrected candidate:

| Observed state | Candidate response |
| -- | -- |
| Server confirms loss of the secure link between confirmed redemption and the same browser-profile verification journey—not merely temporary inability to verify that link | Require fresh email verification. Temporary inability remains uncertainty, with fresh verification available only by explicit reader choice under the separately selected uncertainty rule. |

This is a proposed wording clarification aligned with the selected distinction, not a new selected fallback, approval of supporting mechanics or verified closure of PSR-02. No fresh assessment of the corrected candidate is recorded here. PSR-03–PSR-06 and the candidate’s other unresolved decisions remain open.

## Revision and preservation note

**Revision entry — 9 November 2026, v1.8.0:** add the complete corrected partial-success recovery candidate, four selected recovery boundaries, separate PSR review and exact PSR-02 amendment history. Preserve selected directions separately from unapproved supporting mechanics. The recovery-first race, lifetime, numerical controls, safeguards and feasibility remain unresolved.

Existing register material, historical approvals, Option A/R-B status, visitor-copy status, source limitations and planned-check results remain unchanged. This insertion records proposals and decisions only; it does not alter the PRD, design brief, issues, repository, services or Figma, or authorise checks, implementation, publication or launch.

### Component interaction directions and bounded source findings — 9 November 2026

**Decision status:** Ash selected the three design directions below in this conversation. These selections do not authorise saving, implementation, migration, Figma edits, publication or test execution. Any later permission to save this register applies only to recording the displayed content.

The local **component proposal C1-R1** was accepted as a proposal baseline only. It is distinct from this register’s existing **C1 reader-continuity candidate**. Neither that acceptance nor the three selections below approve unresolved component mappings, visual exceptions or implementation-system selection.

| Direction | Selected design direction | Conditions and unresolved evidence |
| -- | -- | -- |
| Waitlist action hierarchy | Treat the waitlist submit control as the form’s primary action. | Selection recorded on 9 November 2026 at 11:55 Asia/Bangkok. Exact typography, combined states, implementation mapping and validation remain unresolved. No migration from the existing button system is selected. |
| Whole-card navigation | Allow whole-card navigation where a card has one destination and no conflicting nested controls. | Selection recorded on 9 November 2026 at 11:55 Asia/Bangkok. Verify actual structure before applying. Preserve a single interactive target rather than creating nested links or conflicting controls. Do not invent destinations for informational cards. |
| Truthful form feedback | Use neutral acknowledgement rather than success wording or styling when an outcome is unverified. Use success feedback only when evidence supports the claimed outcome. | Selection recorded on 9 November 2026 at 11:56 Asia/Bangkok. Local state, navigation, a page visit or an acknowledgement response alone does not establish stored receipt, newsletter enrolment, email delivery or verified manuscript access. Exact visitor-facing wording remains unapproved. |

#### Bounded repository evidence

The following findings come from static inspection of `lightspeedwp/ThisOneTimeOnAcidCom`, `develop` revision `84242de7857e1ec03742e20aaaf1df469f44355f`. They describe inspected source, not executed behaviour, deployed configuration or independently verified service outcomes.

| Source and inspected area | Source finding | Consequence and limit |
| -- | -- | -- |
| `src/app/components/pages/book-site/BookHomePage.tsx` — `handleUnlock` | Prevents default submission, reads and lowercases the email value, routes a hardcoded special-case address to `/ebook` and other values to `/thank-you`. No request, persistence or provider-confirmation handling was observed in this handler. | Navigation does not establish receipt, enrolment, email verification or authorised reading access. The source contains a special-case navigation branch; actual route enforcement was not tested. |
| `src/app/components/pages/book-site/WaitlistPage.tsx` — `handleWaitlist` | Uses the same special-case navigation; otherwise sets local `submitted` state to true. No request, persistence or provider-confirmation handling was observed in this handler. | The local submitted state does not establish enrolment. The current secondary-styled submit differs from the selected primary-action direction. |
| `WaitlistPage.tsx` — submitted branch | Displays “You're on the list.”, promises future updates and shows a checkmark/confetti treatment. | Those outcome claims and success cues are not supported by the inspected handler evidence. Exact replacement copy and presentation require a separate proposal. |
| `src/app/components/pages/book-site/ThankYouPage.tsx` | Displays “Success”, “You’re in.” and claims reading access and future updates without response verification in the inspected component. | The inspected home-form transition does not substantiate those claims. Preserve the separate requirements for verified manuscript access and optional newsletter consent. |
| Both inspected forms | Required email-field attributes are present. The waitlist has an explicitly associated label; the home input has an accessible label attribute. | Validation was not executed. Request-loading, provider-error and double-opt-in handling were not observed in these inspected flows; behaviour elsewhere remains unverified. |

Source references:

* [Book-home page and handler](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/84242de7857e1ec03742e20aaaf1df469f44355f/src/app/components/pages/book-site/BookHomePage.tsx>)
* [Waitlist page and handler](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/84242de7857e1ec03742e20aaaf1df469f44355f/src/app/components/pages/book-site/WaitlistPage.tsx>)
* [Thank-you component](<https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/blob/84242de7857e1ec03742e20aaaf1df469f44355f/src/app/components/pages/book-site/ThankYouPage.tsx>)

#### Card-structure assessment

| Inspected group | Current structure | Assessment against the selected direction |
| -- | -- | -- |
| Home journal Essay, Video and Podcast cards | Each non-interactive card container contains one anchor to `/journal`, with no other nested controls observed. | Structurally eligible for consideration using the existing destination, subject to preserving one interactive target. No whole-card conversion or media-specific destination is approved. |
| Home Stories, Lessons, Energy and Permission cards | Heading and paragraph only; no destination or controls observed. | Not eligible by inference. A destination would require a separate decision. |
| Home draft-preview inner card | Text/list only; the reading button is outside that card. | Do not borrow the adjacent button’s destination. |
| Waitlist informational card | Heading/list, separate from the form; no destination or controls observed. | Remains informational unless a separate purpose and destination are approved. |

#### Existing work and preservation boundaries

Existing waitlist capture, acknowledgement repair, shared form capture, content verification, journal and form-test records remain the work-coordination baseline. This section creates no new issue, changes no existing issue and authorises no execution.

The existing waitlist issue’s proposed accepted-response/confetti behaviour must be assessed against the selected evidence-based feedback direction before any separately approved amendment or implementation. Do not silently equate accepted transport response, stored receipt and confirmed subscription, or retrospectively rewrite the issue’s approval history.

Preserve the recorded palette, Space Grotesk headings, Inter body/UI, both-theme requirement, protected-asset controls and separate newsletter consent. R3, T1, RT2 and C1 retain their existing approval states. Planned behavioural and accessibility checks remain **Not run**.

Inspection covered the two requested page modules and the home form’s acknowledgement destination. It was not a complete backend, route-enforcement, provider or site-wide card audit. No commands ran, forms were submitted, repository files changed or Figma edits occurred.

## Preservation and validation

Preserve verified-email authorisation, purpose-limited reader records, separate optional newsletter consent, launch offline exclusions and no cross-device progress synchronisation. Local progress policy must not be inferred from the reader-record retention period.

The bounded static screenshot inspection recorded above is complete. Planned behavioural, responsive, persistence and accessibility checks remain **Not run**. Static findings, approved colours and saved documentation do not establish implementation, conformance, publication or launch readiness.

## Changelog

| Version | Date | Change |
| -- | -- | -- |
| 1.9.0 | 9 November 2026 — Asia/Bangkok | Recorded Ash’s selected primary waitlist-action, conditional whole-card navigation and evidence-based form-feedback directions, separately from proposal-only component acceptance and register candidate C1. Added bounded revision-specific card and form-handler findings, source links, overlap boundaries and evidence limits. Preserved existing revision notes, candidate states, verified-access and consent requirements. Added this bottom changelog. No implementation, testing, Figma edits, publication or launch authorised. |
