# Music Identity Page - Audit & Analysis

## Current State Analysis
1. **Component (`src/components/pages/about/MusicPage.tsx`)**:
   - Currently uses JSX syntax, which violates the strict Figma Make bundler constraints.
   - Follows an older pattern for rendering sections and artists.
   - Misses integration points for external platforms (Spotify/SoundCloud).

2. **Data (`src/data/mock/pages/about/music.ts`)**:
   - Contains a flat `artists` array, `stats`, and `sections`.
   - Lacks the categorised data structures required by the new briefs (e.g., Psychedelic vs Electronic vs Alternative vs Roots).
   - Missing fields for playlist covers, URLs, and DJ/Festival groupings for SoundCloud.

3. **Styling**:
   - The current CSS (`about-subpage.css`) is likely insufficient for the new grid-heavy "festival poster" and "music magazine" layout described in the briefs. 

## Gap Analysis vs Requirements
- **Hero Update**: Needs updating to include Spotify/Soundcloud CTAs and a new narrative "Soundtracks for the Dancefloor and the Canvas".
- **Spotify Groupings**: Requires four new data arrays and rendered grids for Psychedelic, Electronic, Alternative, and Classic Roots.
- **SoundCloud Discoveries**: A brand-new section is needed, showcasing underground artists, festivals (Fusion, Nation of Gondwana), and Berlin clubs.
- **Visuals**: The briefs suggest album-art style cards, circular avatars, and waveform graphics. Current implementation only uses text-based destination cards.

## Recommendations
1. Completely rewrite `MusicPage.tsx` to use `React.createElement` safely.
2. Introduce a new modular data structure in `music.ts` to separate Spotify artists, SoundCloud discoveries, playlists, and editorial text.
3. Use Phosphor icons (`SpotifyLogo`, `SoundcloudLogo`, etc.) to enhance the CTAs.
4. Implement custom BEM classes for the new card layouts (e.g., `.music-card`, `.music-grid`, `.music-hero`).