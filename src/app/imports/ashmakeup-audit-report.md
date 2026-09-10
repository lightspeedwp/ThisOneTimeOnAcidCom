# **Audit: ashmakeup Figma‑Make Prototype**

## **Purpose**

ashmakeup is a Figma prototype and codebase for a makeup‑focused website. The aim of this audit is to improve the codebase’s modularity, reduce duplication and memory bloat, and align styling with WordPress and BEM conventions. Use the results to create actionable tasks for refactoring.

## **Audit Areas**

1. **Memory optimisation** – Run the memory-reduction-audit.md prompt on this repository first. Identify large images, hidden layers or variant sets that cause Figma to exceed the 2 GB tab limit[\[1\]](https://www.linkedin.com/pulse/figma-memory-limit-file-almost-out-browser-nabeel-saleem#:~:text=,Figma%20may%20not%20function%20properly). Compress or remove assets and split large pages into separate files.  
     
2. **DRY & reusable components** – Look for repeated sections such as product cards, testimonials or call‑to‑action banners. Propose creating reusable React/WordPress components or patterns that can be synced across projects. Suggest moving mock data (e.g. product details) into separate JSON files.  
     
3. **BEM CSS & naming** – Verify that all CSS classes follow the BEM structure with block, element and modifier forms[\[2\]](https://github.com/lightspeedwp/ashmakeup/blob/main/src/guidelines/css-architecture.md#L65-L100). Replace any Tailwind or inline utility classes with semantic BEM classes and move styling into CSS files. Ensure dark‑mode overrides use the .dark selector pattern[\[3\]](https://github.com/lightspeedwp/ashmakeup/blob/main/src/guidelines/css-architecture.md#L104-L117).  
     
4. **WordPress token usage** – Ensure colours, fonts, spacing and shadows reference WordPress preset variables (--wp--preset--\*) and the LSX design system tokens[\[4\]](https://github.com/lightspeedwp/ashmakeup/blob/main/src/guidelines/css-architecture.md#L131-L155). Replace hard‑coded hex values or pixel measurements with variables.  
     
5. **CSS modularity** – Break large CSS files (e.g. a monolithic globals.css) into logical segments: animations, base styles, block/page styles and WordPress compatibility files, similar to the architecture described in css-architecture.md[\[5\]](https://github.com/lightspeedwp/ashmakeup/blob/main/src/guidelines/css-architecture.md#L15-L25).  
     
6. **Component refactoring** – Identify large UI components (e.g. hero sections, product grids) and suggest splitting them into smaller components that pull their configuration from functions or data files. Where possible, align them with WordPress block patterns or custom blocks.

## **Deliverables**

* Produce an audit report AUDIT\_REPORT\_ashmakeup.md in /reports/ summarising memory issues, DRY violations, BEM issues, token usage and modularity problems. Include citations from guidelines where relevant.  
    
* After the report is complete, list actionable tasks in TASKS\_ashmakeup.md ordered by priority.

---

[\[1\]](https://www.linkedin.com/pulse/figma-memory-limit-file-almost-out-browser-nabeel-saleem#:~:text=,Figma%20may%20not%20function%20properly) Figma Memory Limit \- This file is almost out of browser memory figma

[https://www.linkedin.com/pulse/figma-memory-limit-file-almost-out-browser-nabeel-saleem](https://www.linkedin.com/pulse/figma-memory-limit-file-almost-out-browser-nabeel-saleem)

[\[2\]](https://github.com/lightspeedwp/ashmakeup/blob/main/src/guidelines/css-architecture.md#L65-L100) [\[3\]](https://github.com/lightspeedwp/ashmakeup/blob/main/src/guidelines/css-architecture.md#L104-L117) [\[4\]](https://github.com/lightspeedwp/ashmakeup/blob/main/src/guidelines/css-architecture.md#L131-L155) [\[5\]](https://github.com/lightspeedwp/ashmakeup/blob/main/src/guidelines/css-architecture.md#L15-L25) css-architecture.md

[https://github.com/lightspeedwp/ashmakeup/blob/main/src/guidelines/css-architecture.md](https://github.com/lightspeedwp/ashmakeup/blob/main/src/guidelines/css-architecture.md)  