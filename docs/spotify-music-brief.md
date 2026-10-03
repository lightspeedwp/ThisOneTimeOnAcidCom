# Ash Shaw Makeup — Spotify Favourites & Interests Page Brief

## Essential input still needed
- Spotify profile URL or Spotify username
- Optional: 3 playlists you definitely want featured first

## Recommended default approach
Use the existing `/about/music` story as the foundation and add a dedicated Spotify-led section or sibling page rather than inventing a disconnected new content type.

### Why this fits the current repo
- The router already includes `/about/music`.
- The current Music page is framed as “140 BPM heartbeat”.
- The current Music page data already contains stats, favourite artists, and curated playlist narrative.
- The page component already uses a hero, pull quote, stat cards, artist cards, and long-form content sections.

## Primary goals
1. Increase time on site with music-led exploration.
2. Strengthen Ash’s personal brand through authentic influences.
3. Connect festival makeup, psytrance culture, Berlin nightlife, and creative process.
4. Add a shareable page that feels more personal than a standard portfolio entry.

## Recommended route strategy
### Default
Expand `/about/music` with a major Spotify module.

### Optional phase 2
Create a dedicated page such as `/spotify-favourites` or `/music/favourites` once the content volume is big enough.

## Content model
### Hero
- Eyebrow: `Spotify favourites`
- Title: `The soundtrack behind the paint`
- Standfirst: short paragraph linking basslines, UV art, Berlin, sunrise sets, and festival energy
- Primary CTA: `Open Spotify profile`
- Secondary CTA: `View favourite playlists`

### Section 1 — Profile snapshot
Use Spotify profile data and editorial copy.
- Spotify display name
- Profile image
- Spotify profile link
- Short intro in Ash voice
- 3 genre chips
- 1 pull quote about music as medicine / fuel / ritual

### Section 2 — Top artists
Split into time-based groups if API data is used.
- All-time anchors
- Current rotation
- Berlin / dancefloor influence
- Cape Town roots

Each card should include:
- artist name
- genre
- why Ash rates them
- a “paint energy” tag such as `tribal`, `sunrise`, `liquid`, `industrial`, `playful`, `cosmic`

### Section 3 — Favourite playlists
Feature 3–6 playlists max at launch.
Suggested starter groups:
- Sunrise Set
- Cape Town Roots
- Berlin Afterhours
- Paint Flow Sessions
- Bike Ride Focus
- Soft Landing / Recovery

Each playlist block should include:
- cover art
- playlist title
- short editorial description
- mood tags
- Spotify link

### Section 4 — Music x makeup x movement
Editorial section explaining how music affects:
- brush rhythm
- line work
- colour choices
- interaction with people at festivals
- timing, stamina, and focus

### Section 5 — Favourite interests beyond music
This helps broaden the page beyond “Spotify widget”.
Suggested cards:
- Psytrance
- House / techno
- Long-distance cycling
- Berlin clubs and open-airs
- Sound systems and hearing care
- Festival rituals
- Creative flow states
- Sunrise culture

### Section 6 — Quick links strip
- Spotify profile
- featured playlist 1
- featured playlist 2
- music about page anchor
- related blog post
- related event or video

## Design direction
### Overall mood
Funky, immersive, music-reactive, but still readable.

### Visual system
- Atomic black base
- neon blue as primary accent for music
- supporting neon pink, cyan, acid green
- waveform lines
- equaliser bars
- radial sound halos
- marquee genre chips
- stacked album / ticket / sticker card motifs

### Recommended layout
- big hero
- asymmetrical bento grid
- mixed card sizes
- 1 oversized featured playlist card
- 2-column or 3-column artist / playlist grids on desktop
- sticky in-page nav on longer layouts

### Recommended interactions
- subtle pulse on play icons
- hover glow tied to genre / mood colour
- card tilt kept light, not gimmicky
- animated waveform dividers
- reduced-motion safe fallbacks

## Card ideas
1. **Playlist sleeve card** — square cover, neon frame, mood tags
2. **Artist pulse card** — portrait or abstract colour card with genre + why it matters
3. **Now spinning strip card** — horizontal, compact, useful in sidebars
4. **Festival memory card** — links a track or artist to a location / event / story
5. **Paint energy card** — maps a sound to a visual style

## Repo implementation notes
### Best fit with current codebase
- Keep content in mock data first.
- Add Spotify-specific data near the existing about music data.
- Reuse current page primitives: hero, pull quote, stat cards, content sections.
- Add one new reusable block for playlist cards if needed.
- Keep the first version mostly editorial with optional live Spotify enhancement later.

### Suggested data file additions
- `/src/data/mock/pages/about/music-spotify.ts`
- or expand `/src/data/mock/pages/about/music.ts`

Suggested interfaces:
- `SpotifyProfileLink`
- `SpotifyArtistInterest`
- `SpotifyPlaylistFeature`
- `MusicMoodTag`
- `MusicInfluenceStory`

### Suggested components
- `SpotifyProfileHero`
- `SpotifyPlaylistCard`
- `SpotifyArtistCard`
- `MusicMoodLegend`
- `NowPlayingLinksStrip`

## API / integration note
If you want live private/current-user data rather than hand-curated content, Spotify’s Web API can provide the current user profile, top artists/tracks, and playlists, but it requires OAuth access tokens and user permission for private data scopes. Public-user profile access exists in Spotify’s reference but is marked deprecated, so I would not make the long-term page architecture depend on that alone.

## Recommended launch version
### Phase 1
Curated editorial page with:
- profile link
- manual favourite artists
- manual favourite playlists
- custom commentary
- links out to Spotify

### Phase 2
Optional API-enhanced version with:
- top artists over time ranges
- current rotation
- playlist metadata refresh

## Acceptance criteria
- Page feels clearly different from standard blog / portfolio layouts.
- Page deepens Ash’s story rather than acting like a plain embed dump.
- Spotify link is obvious near the top.
- Cards are funky but readable.
- Mobile layout still works cleanly.
- Light/dark contrast stays accessible.
- Motion respects reduced-motion preferences.

## Starter heading ideas
- The soundtrack behind the paint
- Music, movement, and UV ritual
- The basslines that built the brushwork
- Favourite sounds, artists, and festival frequencies
- What’s in Ash’s headphones

## Starter intro copy
Music has always sat underneath the makeup. The brushwork, the pace, the confidence, the people I’m drawn to paint, the moment a look suddenly clicks — it all tracks back to sound. Psytrance gave me a language before I had the words for it. Berlin widened the spectrum. Cycling sharpened the focus. This page collects the artists, playlists, and musical rabbit holes that keep the paint moving.
