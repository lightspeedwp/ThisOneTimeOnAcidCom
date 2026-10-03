Ash — the SoundCloud screenshots add an **important second dimension** to your music identity. Your Spotify shows your **foundational taste**, while SoundCloud shows your **current underground / club discovery pipeline**. That contrast will make the page far more interesting.

Below is a structured **add-on section** you can add to the page plus **repo notes + Figma prompt updates**.

---

# 1. New Page Section: SoundCloud Discoveries

This should sit **after Spotify favourites** on the page.

## Section Title

**Underground Discoveries on SoundCloud**

## Intro Text

While Spotify holds my long-term favourites, SoundCloud is where I explore the underground.

It’s where new DJs, experimental producers, and festival sets appear first.
Many of the artists I listen to here are connected to the European electronic scene — especially Berlin clubs, festival stages, and emerging labels.

This is where I discover the sounds behind long nights, festival mornings, and creative inspiration.

---

# 2. SoundCloud Music Themes (from your screenshots)

### Berlin Club Scene

Artists / DJs

Cotumo
Alle Farben
Klangtherapie
Marco1076
Sportbrigade Sparwasser

Context text:

A lot of these artists are connected to Berlin’s club culture.
Sets from places like **Sisyphos, Kater Blau, and Golden Gate** capture the raw energy of the city’s electronic scene.

---

### Festival Energy

From your screenshots:

Fusion Festival
Nation of Gondwana
Mystic Creatures Festival
Sisyphos events

Text:

Some of the best electronic music lives in festival recordings and live DJ sets.
These mixes capture moments that only exist on a dancefloor somewhere in the forest or at sunrise on a festival stage.

---

### Underground Electronic

Artists:

Gray Matter
Fadi Mohem
Pauli Pocket
Leon Licht
Sahra Bass

Text:

SoundCloud is where producers experiment, collaborate, and release music that doesn’t always fit traditional labels or platforms.

It’s a space where underground sounds grow before reaching the wider music world.

---

# 3. Discovery Sources Section

This section makes the page feel **authentic and personal**.

## Where I Discover Music

**Clubs**

Sisyphos
Kater Blau
Golden Gate

**Festivals**

Fusion Festival
Nation of Gondwana
Mystic Creatures Festival

**Online Platforms**

Spotify
SoundCloud
DJ Sets
Festival recordings

---

# 4. Page Layout Update

Final page structure:

```
Hero
↓
Music Philosophy
↓
Spotify Favourites
    Psychedelic
    Electronic
    Alternative
    Roots
↓
Daily Mixes
↓
SoundCloud Discoveries
    Berlin Club Scene
    Festival Sets
    Underground Producers
↓
Where I Discover Music
↓
Spotify Profile Link
```

---

# 5. Extra Feature Ideas

### Artist Carousel

Circle avatars like SoundCloud UI.

### Festival Posters

Large cards with artwork like:

Fusion Festival
Nation of Gondwana

### DJ Mix Cards

Cards that look like SoundCloud waveform previews.

---

# 6. Updated Figma Prompt

Use this updated prompt.

---

**Figma AI Prompt**

Design a funky music inspiration page for a makeup artist portfolio.

The page should mix the aesthetic of electronic music culture, psychedelic festivals, and Berlin club nightlife.

Sections to design:

Hero section
Title: "Soundtracks for the Dancefloor and the Canvas"

Spotify favourites section
Display artist cards grouped into:

Psychedelic trance
Electronic / melodic house
Alternative / industrial
Classic influences

SoundCloud discoveries section
Show DJ sets and underground artists connected to Berlin clubs and festivals.

Include festival artwork cards for:

Fusion Festival
Nation of Gondwana
Mystic Creatures Festival

Include club references like:

Sisyphos
Kater Blau
Golden Gate

Design style:

dark background
neon gradients
psychedelic colour palettes
album artwork grids
circular artist avatars
music waveform graphics
festival poster style visuals
asymmetrical editorial layout

The page should feel energetic, artistic and connected to electronic music culture.

---

# 7. Repo Add-On Notes (ashmakeup)

Add this to your project brief.

### New Data Source

```
data/music/soundcloud.ts
```

Example structure:

```ts
export const soundcloud = {
  berlin_clubs: [
    "Cotumo",
    "Alle Farben",
    "Klangtherapie"
  ],
  underground: [
    "Gray Matter",
    "Fadi Mohem",
    "Pauli Pocket"
  ],
  festivals: [
    "Fusion Festival",
    "Nation of Gondwana",
    "Mystic Creatures Festival"
  ]
}
```

---

### New Components

```
SoundCloudSection
DJCard
FestivalCard
ClubCard
```

---

# 8. Personal Narrative Block (nice touch)

Add a short paragraph like this.

**Music & Creativity**

Electronic music has always been part of my creative process.

From psychedelic trance festivals to Berlin club nights, music shapes the rhythm of how I work, travel, and create.
Whether it’s a deep melodic set while working or a sunrise festival mix, these sounds influence the colours and energy that appear in my makeup designs.

---

If you'd like, I can also help you build a **very cool feature** for the page:

• **Live Spotify + SoundCloud widgets**
• **Animated waveform backgrounds**
• **A music visualiser reacting to scroll**
• **A “Currently Listening” section via Spotify API**

It would make the page **one of the coolest portfolio pages for an artist online.**
