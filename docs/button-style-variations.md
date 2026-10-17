To keep your Figma-to-Dev handoff airtight, here are the 20 Button Style Variations defined by their technical DNA. These are categorized by "Vibe" to help you map them to your funky post types.
The Button Block: 20 Style VariationsCategory A: Retro-Brutalist & High Contrast

   1. "The 90s Pop":
   * Properties: background: #FF00FF; border: 3px solid #000; box-shadow: 5px 5px 0px #000;
      * Animation: On hover, shadow goes to 0px 0px, button "pushes" down.
   2. "Neo-Grotesque":
   * Properties: font-family: "Space Mono"; text-transform: uppercase; border-radius: 0; background: #00FF41; color: #000;
      * Animation: Background-color inverts to black with neon green text on hover.
   3. "The Sticker":
   * Properties: Scalloped edges (SVG mask), white border, rotated 3 degrees.
      * Animation: Slight "peel" lift effect using transform: rotate(0deg) scale(1.1).
   4. "Caution Tape":
   * Properties: Yellow/Black diagonal striped background (repeating-linear-gradient).
      * Animation: Stripes animate/scroll sideways on hover using background-position.
   5. "The Blueprint":
   * Properties: Ghost button with blueprint grid lines background; technical crosshair icons in corners.
   
Category B: Glass, Liquid & Futuristic

   1. "Acid Glass":
   * Properties: backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3);
      * Animation: Internal "glow" expands from the center on hover.
   2. "Mercury Liquid":
   * Properties: background: linear-gradient(145deg, #e6e6e6, #ffffff); border-radius: 50px;
      * Animation: Blob-like movement using border-radius morphing (e.g., 30% 70% 70% 30% / 30% 30% 70% 70%).
   3. "Cyber-Punk Glitch":
   * Properties: Sharp angular clips (clip-path); neon cyan and magenta text-shadows.
      * Animation: Rapid 0.2s glitch jitter on hover.
   4. "Plasma Pulse":
   * Properties: Dark background with a moving mesh gradient (radial-gradients of purple, blue, and teal).
   5. "The Portal":
   * Properties: Circular button; background is a slow-rotating space/nebula texture.
   
Category C: Tactile & Skeuomorphic (The "Funky" Edit)

   1. "Claymorphism":
   * Properties: Pastel base; box-shadow: inset 10px 10px 20px rgba(0,0,0,0.1), 10px 10px 20px rgba(0,0,0,0.1);
      * Animation: Button "squishes" (scales Y down, scales X up) when clicked.
   2. "The Puffy Coat":
   * Properties: Looks like quilted fabric; high-gloss "vinyl" finish.
   3. "Inflatables":
   * Properties: Ultra-rounded; gradient highlights that look like light reflecting off a balloon.
   4. "The Arcade Switch":
   * Properties: Round, bright red, deep "well" border.
      * Animation: 3D "depress" motion with a mechanical click sound effect (optional dev trigger).
   5. "Rough Hand-Drawn":
   * Properties: border: 2px solid black; using an SVG-path filter to make the line look like a shaky marker drawing.
   
Category D: Interactive & Experimental

   1. "The Snake":
   * Properties: The border is actually a moving line that travels around the perimeter of the button.
   2. "Magnetic Pull":
   * Properties: Minimalist style.
      * Animation: Dev tool logic—the button physically moves toward the user's cursor when they get within 50px.
   3. "Confetti Popper":
   * Properties: Standard clean style.
      * Animation: On click, bursts particles (CSS particles) from behind the button.
   4. "The Window":
   * Properties: Button is transparent; the text is a "hole" showing the section's background image behind it.
   5. "Variable Weight":
   * Properties: Font-weight is at 100.
      * Animation: As you hover, the font-weight transitions to 900 dynamically.
   
------------------------------
Implementation Logic for Figma Brief

* Color Palette: For the "wild" selection, use a Global CSS Variable system (e.g., --accent-1, --bg-primary) so you can swap "Acid Green" for "Cyber Blue" across all 20 styles instantly.
* Typography: Map styles 1-10 to Sans-Serifs/Display fonts and 11-20 to Monospace/Serif fonts to test diversity.

Next Step: Should we move to the Forms Style Switcher (showing how input fields, checkboxes, and toggles look in these 20 styles) or the 10 Divider/Separator patterns?

