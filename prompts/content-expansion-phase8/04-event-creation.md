# Sub-audit 4: Event creation (1 → 5+ events)

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/content-expansion-phase8/04-event-creation.md`

---

## Objective

Expand the events system from 1 event (Origin Festival) to 5+ events. Add the 4 confirmed festivals from the brief, plus historical events that Ash has attended. Each event follows the rich data structure defined in `/data/types/events.ts`. One post per event — future editions update the same event entry.

---

## Confirmed new events

### 1. Organik
- **Dates:** 11–12 April 2026
- **Type:** festival
- **Genre:** Psytrance
- **Location:** South Africa (exact venue TBC from website)
- **Status:** Upcoming
- **Website:** https://organik.co.za/
- **Social links:**
  - Facebook: https://facebook.com/organikpsy
  - Instagram: https://instagram.com/organikpsy
  - YouTube: https://youtube.com/organikpsy
  - SoundCloud: https://soundcloud.com/organikpsy
- **Ash's connection:** Upcoming event in South Africa, aligns with Cape Town festival season

### 2. Nation of Gondwana (NOG)
- **Dates:** 16–19 July 2026
- **Type:** festival
- **Genre:** Techno, house, electronic
- **Location:** Grünefeld, near Berlin, Germany
- **Status:** Upcoming (2026), Attended (2025)
- **Website:** https://www.pyonen.de/nog2026/en
- **Social links:**
  - Instagram: https://www.instagram.com/nation_of_gondwana_pyonen/
  - Facebook: https://www.facebook.com/pyonen
  - SoundCloud: https://soundcloud.com/pyonen-nation-of-gondwana
  - YouTube: https://www.youtube.com/@pyonennog
- **Ash's connection:** Attended NOG 2025 (video: https://www.youtube.com/watch?v=9o_GGvEZEio — "Nation of Gondwana festival 2025 | a visual experience"). Close to Berlin base. Inspired UV art design during a trip there (see `/docs/website-content.md` Lucy section).
- **Editions:** 2025 (attended), 2026 (upcoming)

### 3. Moov Festival
- **Type:** festival
- **Genre:** Electronic / multi-genre
- **Location:** South Africa (check website for venue)
- **Website:** https://moovfestival.co.za/
- **Mission page:** https://moovfestival.co.za/our-mission/
- **Gallery:** https://moovfestival.co.za/gallery/
- **Social links:**
  - Facebook: https://www.facebook.com/MOOVFestival
  - Instagram: https://www.instagram.com/moov_festival/
  - YouTube: https://www.youtube.com/@moovfestival3191
- **Ash's connection:** South African festival scene

### 4. Little Forest (Alien Safari NYE)
- **Dates:** 31 December 2026 – 2 January 2027
- **Type:** festival
- **Genre:** Psytrance
- **Location:** South Africa
- **Organiser:** Alien Safari
- **Social links:**
  - Instagram: https://www.instagram.com/alien_safari_south_africa/
  - Facebook: https://www.facebook.com/aliensafari/
- **Reference:** 2025–2026 edition: https://www.quicket.co.za/events/265339-the-little-forest-nye-festival-2025-2026/
- **What On in Cape Town:** https://whatsonincapetown.com/event/alien-safari-little-forest-festival/
- **Ash's connection:** Alien Safari is one of the longest-running psytrance event series in South Africa. Ash attended "every single Alien Safari" for years (from website-content.md).

---

## Additional historical events to consider

Based on `/docs/website-content.md` content, these events are significant to Ash's story:

| Event | Type | Location | Ash's history | Priority |
|---|---|---|---|---|
| Vortex | festival | Various, South Africa | First festival experiences (1999 onwards), December Vortex = defining life moment | High |
| Alien Safari | festival series | Various, South Africa | Attended "every single" one for years | High |
| AfricaBurn | festival | Tankwa Karoo, South Africa | Cycled there with loaded bike (2022?) | High |
| Shankra | festival | Switzerland | Regular psytrance festival | Medium |
| Reiserfieber | festival | Switzerland | Regular psytrance festival | Medium |
| Solipse | festival | Zambia | Solar eclipse festival 2001 — life-defining trip | Medium |
| Origin Festival | festival | Helderstroom, South Africa | Already exists — reference only | — |

**Note:** Create one entry per event. Multiple years attended are tracked via the `editions` array within each event. This is already how Origin Festival works — follow that pattern exactly.

---

## Data structure reference

Follow the `Event` type from `/data/types/events.ts` and the Origin Festival example at `/data/mock/events/origin-festival.ts`.

Key fields:
```typescript
{
  id: string,
  slug: string,
  name: string,
  shortName: string,
  tagline: string,
  description: string,
  type: EventType,
  genre: string[],
  website: string,
  socialLinks: EventSocialLink[],
  location: EventLocation,
  recurring: boolean,
  recurrencePattern: string,
  featuredImage: EventImage,
  tags: string[],
  featured: boolean,
  order: number,
  editions: EventEdition[],
  faqs: { id: string; question: string; answer: string }[],
}
```

### Edition structure
```typescript
{
  year: number,
  dates: { start: string, end: string },
  status: 'attended' | 'upcoming' | 'cancelled' | 'missed',
  highlights: string[],
  travel?: { method: TravelMethod, ... },
  facesCount?: number,
  personalNote?: string,
  gallery?: EventImage[],
}
```

---

## File organisation

Create one file per event in `/data/mock/events/`:
```
/data/mock/events/
├── origin-festival.ts        (existing)
├── organik.ts                (new)
├── nation-of-gondwana.ts     (new)
├── moov-festival.ts          (new)
├── little-forest.ts          (new)
├── vortex.ts                 (new — if included)
├── africaburn.ts             (new — if included)
├── categories.ts             (existing — update)
└── index.ts                  (existing — update barrel export)
```

---

## Step-by-step

1. Create data files for each confirmed event (4 minimum)
2. Add 2–3 per-event FAQs to each event's `faqs` array
3. Consider creating 2–3 additional historical events (Vortex, Alien Safari, AfricaBurn)
4. Update `/data/mock/events/index.ts` barrel export — add all new events to `allEvents` array
5. Update `/data/mock/events/categories.ts` if new event types are needed
6. Add an `events` FAQ group to `/data/mock/sections/faq.ts` (page-level FAQs)
7. Use `unsplash_tool` for cover images (festival, outdoor, camping, cycling themes) — do NOT use the events' actual logos/images from their websites
8. Cross-reference `/docs/website-content.md` for accurate descriptions of Ash's experiences at each event

---

## Output

- **Report:** `/reports/content-expansion-phase8/04-event-creation.md` with:
  - Events created (name, slug, editions count)
  - Total events count (before and after)
  - FAQs added per event
  - Categories/tags updated
  - Historical events included or deferred
