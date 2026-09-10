# Create /about/music/ Page

## Objective
Refactor and expand the existing `/about/music/` page into a comprehensive "Music Identity" page. The new page will integrate Ash's Spotify and SoundCloud profiles, showcase curated playlists, top artists, and feature editorial content connecting music to his creative makeup process.

## Inputs
- **Spotify Profile:** https://open.spotify.com/user/31sfctixrywxowo6b3qs6p4s655a
- **SoundCloud Profile:** https://soundcloud.com/ash-shaw
- **Content Sources:**
  - `music-identity-page-content.md`
  - `spotify-page-brief.md`
  - `spotify-music-brief.md`
  - `soundcloud-discoveries.md`

## Architecture & Guidelines
1. **Mock Data:** Update `src/data/mock/pages/about/music.ts` to include the new structured data for Spotify artists (grouped by Psychedelic, Electronic, Alternative, Roots), SoundCloud discoveries (Berlin Club Scene, Festival Sets, Underground), and Daily Mixes. 
2. **Components:** Refactor `src/components/pages/about/MusicPage.tsx`. Use BEM classes and strict `React.createElement` (no JSX). Do not use arrow functions in the component body.
3. **Styling:** Adhere to the "Neon vs Atomic Black" visual identity. Use `bg-atomic-noise` for the page background. Utilize existing CSS classes from `/styles/globals.css`. Ensure focus indicators and reduced motion support are intact.
4. **Icons:** Use `@phosphor-icons/react` (e.g., SpotifyLogo, SoundcloudLogo, Play, Headphones).
5. **No API Integration:** Rely strictly on static mock data (Phase 1 approach from brief) and hardcoded links to Spotify and SoundCloud profiles.

## Scope of Work
1. **Hero Section:** Update to include the title "Soundtracks for the Dancefloor and the Canvas", standard intro text, and prominent CTAs for Spotify and SoundCloud.
2. **Spotify Favourites:** Create grids for the 4 major artist worlds.
3. **SoundCloud Discoveries:** Create a section dedicated to underground discoveries, Berlin clubs, and festival sets.
4. **Listening Rituals / Playlists:** Incorporate Daily Mixes and specific rituals (Morning focus, Cycling, Festival, Creative studio).
5. **Music x Makeup:** Add editorial narrative about how music influences Ash's painting rhythm and UV art.
6. **Where I Discover Music:** Add a section linking clubs, festivals, and platforms.

## Steps to Execute
1. Update types in `src/data/mock/pages/about/types.ts` or within `music.ts` to support the new data structures.
2. Replace `musicPageData` in `src/data/mock/pages/about/music.ts` with the new, richer content model.
3. Rewrite `MusicPage.tsx` using `React.createElement` to map through the new data and render the styled grids and cards.
4. Verify accessibility (WCAG 2.1 AA) and responsive layouts (1 column on mobile, 3+ columns on desktop for grids).
