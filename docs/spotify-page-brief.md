* **Value:** You do **not** need a full question round. The repo already has an `/about/music` route, and that page is already framed as “140 BPM heartbeat” with favourite artists, stats, curated playlist copy, and reusable content sections, so this can grow from an existing story rather than start from zero. ([GitHub][1])
* **Risks:** I cannot safely guess your Spotify profile link, and if you want live “top artists / top tracks / playlists” data instead of curated copy, Spotify’s Web API needs OAuth plus user-granted scopes such as `user-top-read` and `user-read-private`; Spotify’s public user-profile endpoint is marked deprecated. ([Spotify for Developers][2])
* **Next step:** Send me your **Spotify profile URL or username**. Until then, the safest default is: expand `/about/music` first, place the Spotify link high in the hero, and treat API-driven data as phase 2. ([GitHub][1])

1. **Only one essential question**

   What is your **Spotify profile URL or username**?

   That is the only thing I actually need before I can make this specific to you and include the correct profile link. Everything else can be sensibly defaulted.

2. **My recommended structure**

   I would make this a **funky editorial music page**, not a plain Spotify embed dump. The current codebase already supports that direction: the Music page uses a hero, pull quote, stat cards, artist cards, and long-form content sections, and the router already gives music a dedicated place in the About architecture. ([GitHub][3])

   Default page structure:

   1. Hero with your Spotify CTA
   2. “Favourite artists” grid
   3. “Favourite playlists / sets” section
   4. “Music x makeup x movement” editorial story
   5. “Interests beyond Spotify” cards — cycling, Berlin, sunrise sets, psytrance, hearing care, creative flow
   6. Quick links strip back to Spotify, blog posts, videos, events

   That fits the site’s existing music narrative, which already leans into psytrance, Berlin, festival culture, and curated playlists. ([GitHub][4])

3. **Best implementation route for `ashmakeup`**

   My default recommendation is **not** a brand-new top-level page first. Start by expanding `/about/music`, because that route already exists and already contains artist and playlist-oriented content. If the section becomes large enough later, then split it into a dedicated page such as `/spotify-favourites` or `/music/favourites`. ([GitHub][1])

   Also, the repo already has a Phosphor icon direction and a dedicated `/dev-tools/phosphor-icons` page, so a Spotify-themed page can lean into bold, fill, or duotone icon treatments without inventing a parallel icon system. ([GitHub][1])

4. **Copy/paste brief for the repo**

   Use this as the working brief:

   ```md
   # Spotify Favourites & Interests — Page Brief

   ## Purpose
   Create a funky, high-personality music page that deepens Ash’s story, increases time on site, and links music taste directly to festival makeup, Berlin nightlife, movement, and creative process.

   ## Recommended route
   Expand `/about/music` first.

   ## Primary CTA
   Open Spotify profile

   ## Secondary CTAs
   View favourite playlists
   Explore music-inspired blog posts
   See festival portfolio work

   ## Content blocks
   - Hero with Spotify profile link
   - Favourite artists grid
   - Favourite playlists / sets
   - Music x makeup x movement editorial section
   - Interests cards (cycling, sunrise culture, psytrance, techno, Berlin, hearing care, creative flow)
   - Related content strip

   ## Design direction
   - Atomic black base
   - Neon blue as primary music accent
   - Supporting cyan, pink, acid green
   - Waveform dividers, equaliser lines, sticker-like square cards, glow hovers
   - Mixed card sizes, asymmetrical layout, music-reactive feel
   - Keep accessibility and reduced-motion support intact

   ## Data approach
   Phase 1: curated mock data + Spotify links
   Phase 2: optional Spotify API integration for top artists, tracks, and playlists

   ## Components
   - SpotifyProfileHero
   - SpotifyArtistCard
   - SpotifyPlaylistCard
   - MusicMoodTag
   - RelatedContentStrip

   ## Success criteria
   - Clearly more personal than a normal portfolio page
   - Spotify link is visible high on the page
   - Funky card design without harming readability
   - Strong mobile layout
   - Clear connection between music taste and visual art practice
   ```

5. **Full brief**

   I packaged the fuller version here: [spotify_favourites_page_brief.md](sandbox:/mnt/data/spotify_favourites_page_brief.md)

Send your Spotify profile URL or username, and I’ll turn the placeholder into a finished page brief with the correct link and suggested section copy.

[1]: https://raw.githubusercontent.com/lightspeedwp/ashmakeup/main/src/routes.ts "raw.githubusercontent.com"
[2]: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks?utm_source=chatgpt.com "Web API Reference | Spotify for Developers"
[3]: https://raw.githubusercontent.com/lightspeedwp/ashmakeup/main/src/components/pages/about/MusicPage.tsx "raw.githubusercontent.com"
[4]: https://raw.githubusercontent.com/lightspeedwp/ashmakeup/main/src/data/mock/pages/about/music.ts "raw.githubusercontent.com"
