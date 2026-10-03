# Sub-audit 1: Timeline expansion to about sub-pages

**Parent:** [orchestrator.md](./orchestrator.md)
**Status:** READY

---

## Objective

Break the single monolithic History page timeline into contextual timelines distributed across relevant about sub-pages. Keep the master History page as an interactive overview that links to sub-pages. Add per-topic timeline data and enhance the Timeline component for interactivity.

---

## Current state

- **History page** (`/about/history`): Single vertical timeline with ~12 milestones spanning 2019–2025, generic and incomplete
- **Timeline component** (`/components/ui/Timeline.tsx`): Supports vertical/horizontal variants, neon colour accents (8 colours), icon slots
- **About sub-pages**: 21 pages, none currently have their own timelines
- **Source material**: `/docs/website-content.md` has rich timeline data for cycling, education, fitness, LightSpeed, travel, and more

---

## Step 1: Create a comprehensive categorised timeline dataset

Create `/data/mock/timeline/index.ts` with ALL milestones across Ash's life, each tagged with one or more categories:

### Categories

| Category | About sub-page | Neon colour | Icon |
|---|---|---|---|
| `makeup` | AboutPage (journey) | Pink | PaintBrush |
| `cycling` | CyclingPage | Green | Bicycle |
| `fitness` | FitnessPage | Cyan | Heartbeat |
| `music` | MusicPage | Purple | MusicNotes |
| `travel` | TravelsPage | Orange | Airplane |
| `lightspeed` | LightSpeedPage | Blue | Code |
| `education` | EducationPage | Yellow | GraduationCap |
| `sixcats` | SixCatsPage | Green | Leaf |
| `berlin` | BerlinPage | Pink | Buildings |
| `adhd` | AdhdPage | Cyan | Brain |
| `personal` | BioPage | Red | User |
| `book` | BookPage | Yellow | BookOpen |

### Data structure

```typescript
export interface TimelineEntry {
  id: string;
  date: string;           // Display date (e.g., "July 2019", "1994", "December 1999")
  sortDate: string;       // ISO date for sorting (e.g., "2019-07-01")
  title: string;          // Sentence case
  description: string;    // 1–3 sentences
  categories: string[];   // One or more category IDs
  icon?: string;          // Phosphor icon name
  link?: string;          // Optional link to relevant page/post
  significance: 'major' | 'standard' | 'minor';
}
```

### Milestone inventory (source from `/docs/website-content.md`)

**Personal / Education:**
- 1986–1993: Paarl Junior School (Miss Scott, school projects)
- 1994–1998: Paarl Boys High (MTB racing, "2 o'clock club", matric at 17)
- 1999: Daemelin College (marketing, MTB championships)
- Age 12–13: First computer (Windows 3.1, self-taught)

**Cycling:**
- 1994: Started racing bicycles
- 1995: First provincial mountain bike race
- 1997: WP MTB colours — 3rd overall
- 1998: WP MTB colours — 1st overall (champion)
- 1999: WP MTB colours — 3rd overall
- 2012: Started bike packing
- 2014: 300km California bike trip
- 2018: Started riding to festivals
- 2020: First cycling pilgrimage to Origin Festival
- 2022: Origin cycling pilgrimage (resumed post-COVID)
- 2023: Birthday sash ride Origin to Grabouw
- 2026: Epic 300km Origin birthday ride (40kg pack, 3,200m climbing)
- Thailand: 7,000+ km touring total
- Munich to Amsterdam: 1,000km in 10 days
- Hua Hin to Phuket: 900km in 6 days

**Fitness:**
- Early 2000s: Started yoga
- 2006: Started trail running
- 2010: Started triathlon
- 2019: Started Muay Thai; swimming improved significantly
- 2025: 900km dancing in 8 weeks (Berlin)

**Music / Festivals:**
- 1999: First Vortex festival (December Vortex — life-defining)
- 2001: Solipse solar eclipse festival, Zambia (86-hour bus)
- 2000s: 2–4 festivals a month in Cape Town
- 2019 onwards: Festival UV painting
- 2025: Berlin summer dancing record

**LightSpeed:**
- 2003: Founded LightSpeed as IT support company
- 2005: First employee hired
- 2006: BarCamp Cape Town → WordPress pivot; Warwick joined
- 2007: WordPress community engagement
- 2008–2011: Media24 Scrum Master (concurrent with LightSpeed)
- 2009: Chris joined
- 2010: Barbara joined (partner)
- 2011–2012: Organised WordCamp Cape Town
- 2020: Justin rejoined
- 2021: Lourens and Adam joined
- 2023: Tibi and Zared joined
- 2025: Hugo, Brandon, Seren interns + José rejoined; WCEU Basel speaker
- 2025–2026: AI workflow transformation

**Makeup:**
- July 2019: First UV paint experience in Berlin
- 2020: First festival painting gig
- 2022+: International festival painting (Ozora, MoDem, Shankra, etc.)
- 2025: NOG inspiration for UV design

**Six Cats:**
- May 2019: Founded Six Cats Cannabis Club
- 2003: Adopted Bart and Lisa (first cats)
- 2020: Lisa passed (age 17)
- 2022 Jan: Moe passed; Bean rescued
- 2022 May: Jeff rescued
- 2023 Oct: Lucy passed

**Berlin:**
- 2019: Moved to Berlin for seasonal visits
- 2019+: Open-airs, Hasenheide, fairy lights bike
- The seasonal May–September cycle

**Travel:**
- 2005: First Thailand trip (met Mel Heinz, Koh Phangan)
- 2009: Thailand with Barbara (40th birthday)
- 2014: San Francisco bike trip
- Various: Netherlands (800km), Munich→Amsterdam (1,000km)
- Annual cycle: Cape Town → Berlin → Thailand → Cape Town

---

## Step 2: Add filtered timelines to about sub-pages

For each sub-page that has relevant milestones:

### Implementation pattern

```typescript
// In CyclingPage.tsx:
import { getTimelineByCategory } from '../../../data/mock/timeline';

// Inside component body:
var cyclingTimeline = getTimelineByCategory('cycling');

// In JSX:
<section className="about-subpage__timeline">
  <h2 className="about-subpage__section-title">Cycling timeline</h2>
  <Timeline
    events={cyclingTimeline}
    colorAccent="green"
    ariaLabel="Cycling milestones timeline"
  />
</section>
```

### Pages to add timelines to

| Page | Category filter | Colour | Expected milestones |
|---|---|---|---|
| CyclingPage | `cycling` | Green | ~15 milestones |
| FitnessPage | `fitness` | Cyan | ~8 milestones |
| LightSpeedPage | `lightspeed` | Blue | ~15 milestones |
| BerlinPage | `berlin` | Pink | ~6 milestones |
| SixCatsPage | `sixcats` | Green | ~8 milestones |
| MusicPage | `music` | Purple | ~8 milestones |
| TravelsPage | `travel` | Orange | ~10 milestones |
| EducationPage | `education` | Yellow | ~10 milestones |
| AdhdPage | `adhd` | Cyan | ~5 milestones |
| ProcessPage | `makeup` | Pink | ~6 milestones |

---

## Step 3: Enhance the master History page

Transform `/about/history` from a flat list into an **interactive timeline hub**:

1. **Category filter chips** — Click a category to filter the timeline (e.g., show only cycling milestones)
2. **All categories view** — Default shows all milestones in chronological order, colour-coded by category
3. **Clickable milestones** — Each milestone with a `link` field becomes clickable, navigating to the relevant sub-page or blog post
4. **Significance levels** — Major milestones get larger dots and bolder typography; minor milestones are subtle
5. **Category legend** — Visual legend showing which colour represents which category

### Enhanced History page layout

```
┌──────────────────────────────────────────────────────────────┐
│  Breadcrumbs: Home > About > History                         │
│  H1: History (gradient)                                      │
│  Subtitle: Every milestone in Ash's journey...               │
├──────────────────────────────────────────────────────────────┤
│  Category filter:                                            │
│  [All] [Makeup] [Cycling] [Fitness] [Music] [LightSpeed]    │
│  [Travel] [Education] [Six Cats] [Berlin] [ADHD]            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ●━━ 1986 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  │   ○ Paarl Junior School (education, yellow)              │
│  │                                                           │
│  ●━━ 1994 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  │   ● Started racing bicycles (cycling, green) [MAJOR]     │
│  │   ○ Paarl Boys High (education, yellow)                  │
│  │                                                           │
│  ●━━ 1999 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  │   ● First Vortex festival (music, purple) [MAJOR]        │
│  │   ○ WP MTB — 3rd overall (cycling, green)                │
│  │                                                           │
│  ...                                                         │
│                                                              │
│  Category legend:                                            │
│  ● Pink = Makeup  ● Green = Cycling  ● Blue = LightSpeed    │
│  ● Purple = Music  ● Orange = Travel  ● Yellow = Education  │
│  ● Cyan = Fitness/ADHD  ● Red = Personal                    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Step 4: Enhance Timeline component

The existing Timeline component may need enhancements:

1. **Clickable events** — Add optional `onClick` or `href` to TimelineEvent interface
2. **Category colour per event** — Currently the whole timeline has one `colorAccent`. Add per-event colour support:
   ```typescript
   interface TimelineEvent {
     year: string;
     title: string;
     description: string;
     icon?: React.ReactNode;
     colorAccent?: string;  // NEW: per-event neon colour
     href?: string;         // NEW: clickable link
     significance?: 'major' | 'standard' | 'minor'; // NEW: visual weight
   }
   ```
3. **Significance styling** — Major events get larger dots (12px vs 8px), bolder titles
4. **Grouping by year/decade** — Optional year headers for long timelines

---

## Step 5: Update data and barrel exports

1. Create `/data/mock/timeline/index.ts` with all milestone data and helper functions
2. Export `getTimelineByCategory()`, `getTimelineByDateRange()`, `getAllTimeline()` helpers
3. Update History page data to use the new centralised timeline
4. Add timeline CSS enhancements to `/styles/blocks/timeline.css`

---

## Output

- Data: `/data/mock/timeline/index.ts` (comprehensive categorised timeline)
- Component updates: `Timeline.tsx` (clickable events, per-event colours, significance levels)
- Page updates: HistoryPage (interactive hub), 10 about sub-pages (contextual timelines)
- CSS: Timeline enhancements
- Report: `/reports/feature-work/01-timeline-expansion.md`
