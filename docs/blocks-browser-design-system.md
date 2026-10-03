PROJECT BRIEF: THE BLOCKS BROWSER & FUNKY DESIGN SYSTEM
Project Goal: Create a modular, "wild and funky" design system for a multi-content website (Pages, Posts, Portfolio, Events, Videos, Podcasts, FAQs, Quotes).
The Dev Tool: A "Blocks Browser" landing page that showcases 200+ style variations across all atomic blocks and 50+ pre-assembled patterns.
1. SYSTEM ARCHITECTURE: THE BLOCKS BROWSER
The "Blocks Browser" is a living UI kit and sandbox.
Landing Page: A 4-column responsive grid of "Block Cards." Each card features a live preview thumbnail, block name, and variant count.
Sub-Pages (The Laboratory): Dedicated pages for each block (e.g., "Paragraphs") featuring:
The Stage: A central workspace to view the active style.
The Sidebar: A list of all style variations (1–20+).
Context Toggle: View the block inside different post-type layouts (e.g., "See this Heading in a Podcast layout").
Code Export: Instant CSS/JSON parameters for developers.
2. ATOMIC BLOCKS (THE BRICKS)
A. Typography (The Voice)
Paragraphs (20 Styles):
Highlights: Acid Retro (neon on black), Liquid Mask, 90s Hard Shadow, Typewriter reveal, Glassmorphism boxes, and Brutalist borders.
Headings (30 Styles):
Highlights: Infinite Marquee, Video-in-Text mask, Anaglyph 3D offset, Chrome/Liquid metal, and Redacted "Censored" bars.
Code Blocks (10 Styles):
Highlights: Matrix Rain, Synthwave Glow, CRT Monitor (scanlines), and Hand-written "Paper Prototype."
B. Interaction & Action
Buttons (20 Styles):
Highlights: 3D Claymorphism, "Caution Tape" animated stripes, Liquid-fill hover, "Sticker" peel, and "Arcade Switch" mechanical click.
Forms (5 Master Themes):
Themes: Brutalist Lab (raw), Acid Dream (blurred), Desktop 95 (retro), Cyber-Organic (neon), and Hand-Drawn Sketch.
Social Icons (5 Styles):
Highlights: Gooey Liquid (blobs merging), RGB Ghost (flicker), and Spinning Vinyl records.
C. Structure & Data
Dividers / Separators (10 Styles):
Highlights: Ripped Paper edge, Ticker Tape info bar, Animated Waves, and "Window Slit" background reveal.
Tables (10 Styles):
Highlights: Blueprint Grid, Thermal Receipt (jagged), Neon Zebra (glow), and Dashboard HUD (micro-graphs).
Navigation & Breadcrumbs (10 Styles Each):
Highlights: Radial Hub, Bento-Box Overlay, HUD Cockpit, and "Snake Line" breadcrumb trails.
3. CONTENT BLOCKS (THE VISUALS)
Image Blocks (10 Styles):
Highlights: Organic Blob masks, Polaroid Stacks, Halftone Screen (comic dots), and 3D Tilt Glass.
Galleries & Slideshows (10 Styles):
Highlights: Bento Chaos (asymmetric), Scatter Deck (draggable pile), and 3D Carousel.
Media & Text (5 Styles):
Highlights: Asymmetric overlaps and split-scroll layouts.
4. PATTERN LIBRARY (THE ROOMS)
Hero Sections (10 Patterns): Immersive "front doors" featuring 3D Spline objects, Typographic Titans, and Full-Bleed Glitch videos.
Call-to-Action / CTA (10 Patterns): High-energy sections including Sticky Bottom bars, "Censored" reveals, and Split-Screen duels.
Pricing Tables (5 Patterns): Interactive Receipt Scrolls, Arcade Cabinets, and Liquid Sliders.
Social Proof (5 Patterns): Speech Bubble Clouds, Social Media Scrapers, and Video Toast circles.
Hype / Countdown (5 Patterns): Digital Flip-clocks, Circular Orbits, and Brutalist Redaction timers.
5. POST-TYPE STYLE LOGIC
Apply styles based on the content's personality:
Portfolio: High-visual / Minimalist / Glass & Blobs.
Podcasts: Audio-centric / High Contrast / Mono fonts.
Events: High Urgency / Animated Marquees / Neon Glows.
Videos: Immersive / Dark Mode / Glitch & Video Masks.
FAQs: Technical / Structured / Brutalist & Grid-based.
6. TECHNICAL DESIGN SPECS
Global CSS Variables: Define --accent-1, --bg-primary, and --font-display to allow for "Instant Theme Swapping" across the entire Browser.
Animation Easing: Use "Elastic" or "Bouncy" transitions for the funky vibe; avoid standard linear fades.
Responsive Scaling: Use Fluid Typography (clamp) to ensure Heading Style 01 looks massive on Desktop but legible on Mobile.