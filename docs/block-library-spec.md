To move this into Figma and development, we’ll start with the Paragraph Block (20 styles) and the Block Browser UI Architecture. This serves as the blueprint for all subsequent components.
Part 1: The "Block Browser" Page Architecture
This is the master landing page for your dev tools.

* Header: Title "Global Block Library" + Master Theme Switcher (Dark/Light/Neon/Brutalist modes).
* Grid Layout: 4-column responsive card grid.
* Card Anatomy:
* Live Preview Area: A micro-container showing a "funky" version of the block.
   * Metadata: Block Name, Number of Variants (e.g., "20 Styles"), and Status (e.g., "In-Dev").
   * CTA: "Explore Variations →" linking to the sub-page.

------------------------------
Part 2: Technical Spec: Paragraph Block (20 Variations)
Since paragraphs are usually "boring," these variations focus on typography as art and post-type specific personalities.
Category A: The "Wild & Funky" (Posts / Portfolio)

   1. Style 01 (Acid Retro): High-contrast serif, neon green text on black, variable letter spacing on hover.
   2. Style 02 (Liquid Text): Text uses a SVG mask with a moving gradient background.
   3. Style 03 (Glitch): Occasional "jitter" animation on specific characters; red/blue color split.
   4. Style 04 (Floating Glass): Text sits inside a semi-transparent blur (Glassmorphism) with a 3D shadow.
   5. Style 05 (Brutalist): Monospace, massive leading, black borders around every paragraph, no padding.

Category B: Editorial & Narrative (Videos / Podcasts / Pages)

   1. Style 06 (The Drop Cap): First letter is 4x the height, using an illustrative font or GIF.
   2. Style 07 (Mag-Spread): Two-column split within a single paragraph block, justified text.
   3. Style 08 (The Highlight): Animated "marker" stroke that follows the user's scroll.
   4. Style 09 (Vertical Sideways): Paragraph rotated 90 degrees for sidebar annotations.
   5. Style 10 (Typewriter): Sequential character reveal triggered when the block enters the viewport.

Category C: Functional & Clean (FAQs / Events)

   1. Style 11 (The Pill): Paragraph contained in a pill-shaped rounded box with an icon prefix.
   2. Style 12 (Dashed Border): Border-bottom on every line of text (like notebook paper).
   3. Style 13 (Blur-In): Text starts blurred and becomes sharp as you hover over it.
   4. Style 14 (Rainbow Hover): Each word changes to a different random color on hover.
   5. Style 15 (Shadow Depth): Text with a massive, non-blurry "hard" shadow (Retro 90s).

Category D: Interactive & Meta (Portfolio / Quotes)

   1. Style 16 (Tooltip Trigger): Specific words automatically trigger a preview image of a "Portfolio" item.
   2. Style 17 (Kinetic Scroll): Text size increases slightly as the user scrolls faster.
   3. Style 18 (Background Clip): The text acts as a "window" to a background video.
   4. Style 19 (Strikethrough Dynamic): Used for "old" info; lines draw across the text on click.
   5. Style 20 (The Morph): Switches from a Serif to a Sans-Serif font on a 3-second loop.

------------------------------
Part 3: Sub-Page Layout (The Dev Tool Interface)
Each block (like Paragraphs) gets this dedicated "Laboratory" page:

   1. The Stage: A large central area where the selected style is displayed.
   2. The Sidebar (Style Switcher): A list of the 20 styles to click through.
   3. The "Context" Toggle: A dropdown to see how the paragraph looks when placed inside a Portfolio page vs. an FAQ page.
   4. Code Export: A "Copy CSS/JSON" button for the dev team to grab the specific funky parameters.

Part 4: Explainer for Use Cases

* Where to use "Acid Retro": Use for Portfolio titles or Podcast descriptions to grab immediate attention.
* Where to use "Glassmorphism": Use on Pages with heavy imagery (like Hero sections) to maintain legibility without hiding the background.
* Where to use "Typewriter": Use for the introductory text of an Event or Video to build anticipation.

Shall I generate the specific CSS/Design properties (Colors, Fonts, Animations) for the Button Block (20 styles) or the Forms Style Switcher next?

