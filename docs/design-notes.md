# **Feature work (new pages, components, interactions)**

Are there any entirely new page concepts you've been thinking about? Some ideas: a Timeline/History page (visual chronological journey), a Collaborators/Credits page, a Map page (showing locations on a world map).

- Pitch ideas for my timeline, I definitely want to expand timelines, but maybe those timelines could be broken up and added to the subpages im relation to the about sub page.  
- Recommended face painting and makeup art

Any new interactive components you've seen on other portfolio sites that inspired you?

- I haven't researched portfolio posts, maybe you can research portfolio template and design trends  
- I am not that happy with the portfolio design, I feel that the card designs need to be way more funky and interesting.  
- Ask more questions about the portfolio layouts

## **Style guide expansion (content-type specimens)**

You want the style guide to show "samples of available styling within single post content" for videos, portfolio, posts, events, podcasts. Do you mean:

A. Rich text specimen — showing every typography/layout element available inside a blog post body (blockquotes, code blocks, image layouts, pull quotes, lists, tables, etc.)?

- Yes, but add tabs to present the different specimens.  
- Remember light and dark styles  
- Each content type should have an FAQ section with styles tailored to that section.  
- Each content type will have its own designed neon rainbow colour.

B. Content card specimens — showing how each content type's card looks in different contexts (grid, list, featured, sidebar)?

- yes, the more card styles the better, I would like 5 card styles per content type tailored to that content type.  
- Remember light and dark styles

C. Full page layout specimens — miniature previews of each content type's detail page layout?

- yes, not sure how you present these? Maybe like a template browser?  
- Remember light and dark styles

Should this live inside the existing StyleGuidePage, or as new dev-tools sub-pages (e.g., /dev-tools/blog-specimens, /dev-tools/portfolio-specimens)?

- Maybe we should try adding new dev tools under a specicial section to grow those tools together

## **Card styles**

The CardSpecimenPage currently shows blog, portfolio, tool, video, podcast, and sticker card patterns. What new scenarios are you thinking?

- I would like per post type for you to come up with at least 3-5 card design ideas per content type

Size variants — compact/mini cards for sidebars vs. full-width featured cards?

- I would like a variety of different sizes per card type, some of the cards may only suit smaller sizes like for example the polaroid 

Interaction variants — flip cards, expandable cards, cards with progress indicators?

- Yes, yes and yes

Context variants — "related content" cards, "trending" cards with rank badges, "pinned/featured" cards with special borders?

- Please suggest more variants 

Layout variants — horizontal cards, overlay-text-on-image cards, masonry-style cards? Should these be production-ready components that get used on actual pages, or dev-tool specimens for reference?

- Yes all of the suggested cards. The dev tools should use actual components. 

## **About sub-page design elements**

This is exciting territory. A few questions to narrow scope:

Animated SVGs — are you thinking decorative (floating neon shapes, pulsing borders, animated dividers) or illustrative (animated icons that tell a story, like a bike wheel spinning for the cycling page)?

- Yes, I want the graphics to be created inside a component that can be imported into any page or template  
- I am thinking about animated WebGL 3d graphics   
- I love the idea of a wheel spinning  
- Can you create a dev tools page to embed the different graphics you create on a single page,   
- Currently the /about/music page and the /dev-tools pages have webGL 3D graphics, lets start by making these graphics reusable and adding in variables into the graphics to enable us to customize the webGL graphics

Structural layouts — the current sub-pages follow a fairly uniform structure (hero → content sections). Do you want more variety? For example:

- I definitely want more variety

Parallax scroll sections with layered depth?

- Yes

Card grid layouts within sub-pages (e.g., the Six Cats page showing each cat as a card)?

- Yes

Split-screen layouts (image left / text right, alternating)?

- Yes, use unsplash images

Full-bleed image breaks between text sections?

- Yes

Neon hovers & glows — on what elements? Links, images, section borders, pull quotes, timeline nodes? Should each sub-page have its own signature neon colour?

- Yes, add neon hovers & glows to links, images, section borders, pull quotes, timeline nodes and each sub-page have its own signature neon colour

Do all 21 sub-pages get the treatment, or should we start with 3–4 flagship pages (e.g., Berlin, Six Cats, Travels, Fitness) and create a reusable pattern system?

- All 21 sub-pages get the treatment, just create a bunch of phases and systematically work through this

## **Interactions & animations dev tools**

The AnimationSpecimenPage currently shows all 26 keyframe animations with play/pause controls. What expansion do you want?

- Are there any new animations that you could introduce? I need you help coming up with new animations to make the site extremely unique. 

Transition specimens — hover states, focus states, page transitions?

- Yes, hover states, focus states, page transitions   
- Can you recommend any new transitions?

Interaction patterns — drag examples, scroll-triggered animations, parallax demos?

- Yes, drag examples, scroll-triggered animations, parallax demos  
- Can you recommend any new transition patterns?

Motion playground — a builder where you can tweak duration/easing/delay and see live results? Before/after — showing reduced-motion vs full-motion side by side?

- YES\!\!\! 

## **Fixed sidebar menu on About page**

You mentioned the About page "already has a" — I see ChapterNav is already imported and used as a sidebar with scroll spy. Is the issue that it's not fixed/sticky on scroll? Or do you want a different sidebar altogether?

Should the sidebar appear on:

A. Just the main AboutPage (the journey page with chapters)?

- Just the /about/journey/ 

B. The HiddenAboutPage (the landing page linking to all 21 sub-pages)?

- No

C. Every individual sub-page (sidebar showing all 21 sub-page links, highlighting current)?

- No

## **Neon colour-to-page mapping & legend**

You have 8 neon colours. Currently some pages use neon gradient subheadings (pink-purple-blue, blue-teal-green, gold-peach-coral, etc.) and you've already differentiated duplicates. Do you want:

A. A formal 1:1 mapping (each major page section gets a signature neon colour)?

- We should create a dev tools page called /dev-tools/neon-rainbow/   
- I want you to explain how you have implemented the neon rainbow

B. A dev-tools reference page showing which colour is used where?

- Yes, create this page

C. Both — define the system and build the reference?

- Yes, that would be great, display both on the page

Should the neon colour influence more than just the gradient subtitle and all matching the page's assigned neon? 

Yes, implement more elements matching the rainbow:

- section divider glow  
- card hover border colour  
- icon accent colour  
- scroll-to-top button tint  
- and add another 5-10 ideas