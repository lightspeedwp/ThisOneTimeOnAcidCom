/**
 * @fileoverview Cycling sub-page data. Extracted from about-subpages.ts (T17).
 */
import type { AboutSubpageData } from './types';

export interface NotableRide { id: string; name: string; year: string; distance: string; description: string; }
export interface KitItem { id: string; number: number; title: string; description: string; }

export interface CyclingPageData extends AboutSubpageData {
  notableRides: NotableRide[];
  kitList: KitItem[];
  stats: { id: string; label: string; value: string }[];
}

export var cyclingPageData: CyclingPageData = {
  hero: {
    badge: 'Cycling',
    title: 'Two wheels & UV paint',
    description: 'Cycling isn\u2019t sport for Ash \u2014 it\u2019s identity. From Western Province mountain bike champion to festival pilgrim, the bicycle is transport, meditation, creative process, and ADHD medication rolled into two wheels.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Cycling' },
  ],
  stats: [
    { id: 'since', label: 'Racing since', value: '1994' },
    { id: 'colours', label: 'WP MTB colours', value: '1997\u20131999' },
    { id: 'best', label: 'Best season', value: '1998 \u2014 1st' },
    { id: 'packing', label: 'Bike packing since', value: '2012' },
    { id: 'origin-rides', label: 'Origin pilgrimages', value: '4 times' },
    { id: 'max-distance', label: 'Longest trip', value: '~300 km' },
    { id: 'max-weight', label: 'Max pack weight', value: '40 kg' },
    { id: 'max-climb', label: 'Max elevation', value: '3,200 m' },
    { id: 'max-speed', label: 'Top speed', value: '75+ km/h' },
    { id: 'daily', label: 'Berlin daily', value: 'Always' },
  ],
  sections: [
    { id: 'berlin-bike', title: 'Berlin by bike', paragraphs: [
      'Ash doesn\u2019t just cycle in Berlin \u2014 he lives on his bike. It\u2019s his primary transport, his meditation, and sometimes his stage. There\u2019s something about the flat, endless Berlin streets that frees the mind. Between G\u00f6rlitzer Park and Tempelhof, between the Spree canal and Tiergarten, ideas form with every pedal stroke.',
      'The guy cycling around covered in fairy lights became a recognisable figure at Berlin open-airs before the UV art even started. The bike was always part of the identity \u2014 the art just gave it a purpose beyond transport.',
      'For an ADHD brain, daily cycling is non-negotiable medicine. The rhythm of pedalling, the sensory input of the city, the physical exertion that burns off excess energy \u2014 it\u2019s the most effective daily regulation Ash has found. Berlin summer means painting faces at open-airs until 3am, then cycling home through warm streets that smell of linden trees.',
    ]},
    { id: 'festival-pilgrimage', title: 'The festival pilgrimage', paragraphs: [
      'When Ash cycles to a festival, the journey becomes part of the art. Hundreds of kilometres of road dissolve the noise of everyday life. By the time he arrives, he\u2019s present, clear, and creatively charged. It\u2019s a pilgrimage in the literal sense \u2014 a journey that prepares the traveller for what\u2019s ahead.',
      'The Origin Festival pilgrimage is the centrepiece. Every year around his birthday, Ash loads a touring bike with 40kg of UV paints, brushes, mirror stand, and camping gear, and cycles from Woodstock, Cape Town, through Sir Lowry\u2019s Pass and Houwhoek Pass to Elandskloof Guest Farm in Helderstroom. The ride is as important as the festival.',
      'He\u2019s also cycled to festivals across Germany, Czech Republic, and Austria \u2014 arriving at festival gates with panniers full of UV paint and a heart full of road-earned stories. In Thailand, he\u2019s logged over 7,000\u202Fkm touring by bicycle, including the Bangkok\u2013Chiang Rai\u2013Chiang Mai festival route. People at festivals don\u2019t believe he\u2019s going to ride home \u2014 until they see him pedalling out on the Monday morning. The less you carry, the further you go. But the UV paints always make the cut.',
    ]},
    { id: 'racing-roots', title: 'Racing roots', paragraphs: [
      'This isn\u2019t a hipster cycling habit. It\u2019s a lifelong relationship with two wheels that started at age thirteen. By 1995, Ash was racing provincial mountain bike events. By 1997, he had Western Province cross-country mountain bike colours \u2014 finishing 3rd overall. In 1998, he was 1st overall: Western Province champion.',
      'At Daemelin College in 1999, he studied marketing while training for the Western Province and South African mountain bike championships. The same year he discovered psytrance at Vortex. Two parallel universes \u2014 competitive sport and festival culture \u2014 that would eventually merge into the cycling-to-festivals identity.',
      'The competitive racing faded, but the engine it built never did. The endurance, the comfort with suffering, the ability to push through when the body says stop \u2014 all of it transferred directly into loaded touring bikes, 300km pilgrimages, and multi-day festival endurance.',
    ]},
    { id: 'what-road-teaches', title: 'What the road teaches you', paragraphs: [
      'A bicycle strips everything to essentials. You carry only what matters. You move at a speed that lets the landscape actually register. You arrive exhausted, present, and unable to pretend to be anything other than what you are. There\u2019s no hiding on a bike at kilometre 200.',
      'The loaded touring bike is a metaphor for Ash\u2019s entire philosophy: portability isn\u2019t a limitation \u2014 it\u2019s a design constraint that forces creative efficiency. Everything an artist needs, on two wheels. The same principle drives the UV art (minimal tools, maximum impact) and the business (lean team, maximum output).',
      'Every ride has a meditative quality. The repetitive motion, the breath, the gradual unspooling of thoughts. By the time Ash arrives at a festival after 150\u202Fkm of riding, he\u2019s processed everything the conscious mind was holding. The creative work that follows is cleaner, more instinctive, more honest. The road is the warm-up for the art.',
      'Hard-won wisdom from the road: in Thailand\u2019s humidity, keep daily distances between 80 and 120\u202Fkm. Not even chamois cream protects from saddle sores if you push past 150\u202Fkm a day \u2014 the Hua Hin to Phuket ride (900\u202Fkm in six days) left lasting scars. And always have a packing checklist. Even with a checklist, he leaves stuff behind \u2014 so every festival, the checklist gets adapted, duplicated, and customised again.',
    ]},
  ],
  notableRides: [
    { id: 'origin-2026', name: 'Origin 2026 \u2014 The 300km Birthday Ride', year: '2026', distance: '~300 km round trip', description: 'Day 1: 80km via Sir Lowry\u2019s Pass. Day 2 (birthday): 75km to Helderstroom. Arrived 11:30 AM, skipped the queue. 40kg pack, 3,200m climbing, top speed 75km/h. Return via Elgin farm, then Cape Town.' },
    { id: 'origin-2023', name: 'Origin 2023 \u2014 Birthday Sash Ride', year: '2023', distance: '~150 km one way', description: 'Left Origin on his birthday, a fellow festival-goer gifted him a happy birthday sash. Cycled the whole way to Peregrine Farmstall in Grabouw wearing it. The most "Ash" thing imaginable.' },
    { id: 'origin-2020', name: 'Origin 2020 \u2014 The First Pilgrimage', year: '2020', distance: '~150 km one way', description: 'The very first cycling pilgrimage to Origin Festival. Completed just weeks before COVID lockdowns. The ride that planted the seed for every ride that followed.' },
    { id: 'thailand-touring', name: 'Thailand \u2014 7,000+ km Touring', year: 'Ongoing', distance: '7,000+ km total', description: 'North to south and through untold adventures. Bangkok to Chiang Rai for a festival, then on to Chiang Mai. Hua Hin to Phuket: 900\u202Fkm in six days. Over 7,000\u202Fkm total touring in Thailand on a gravel bike with Arkel panniers and Tubus racks.' },
    { id: 'european-tours', name: 'European festival rides', year: 'Ongoing', distance: 'Various', description: 'Cycling through Germany, Czech Republic, Austria to reach festivals. Arriving at gates with panniers full of UV paint, dusty and grinning. The Bohemian forest routes are a particular favourite.' },
    { id: 'stormsvlei', name: 'Stormsvlei \u2014 185 km solo ride', year: '2024', distance: '185 km', description: 'A solo ride from Cape Town to Stormsvlei and back. 185\u202Fkm through the Overberg with no support vehicle and no particular destination in mind \u2014 just the road, the bike, and the need to process something the mind couldn\u2019t handle sitting still.' },
    { id: 'berlin-daily', name: 'Berlin daily circuit', year: 'Since 2019', distance: '10\u201340 km daily', description: 'G\u00f6rlitzer Park to Tempelhof, Spree canal to Tiergarten. Daily meditation on two wheels during May seasonal visits. The flat Berlin streets that free the mind and form ideas with every pedal stroke.' },
  ],
  kitList: [
    { id: 'kit-1', number: 1, title: 'UV paints & pigments', description: 'High-pigment UV-reactive face paints formulated for blacklight environments. The non-negotiable core \u2014 everything else on the bike exists to support these. The kit changes by location: in Berlin, the full Make-Up Studio Amsterdam mousse palette travels to every session. In Thailand, UV-only \u2014 the mousse dried out in the humidity once and had to be thrown away. Learned that lesson once.' },
    { id: 'kit-2', number: 2, title: 'Brush kit', description: 'Fine-detail brushes for geometric patterns and third-eye work, plus sponge applicators for base gradient layers. Compact roll-up pouch.' },
    { id: 'kit-3', number: 3, title: 'Mirror stand', description: 'Foldable mirror stand so subjects can see the reveal. Also doubles as the "studio" setup at the festival campsite.' },
    { id: 'kit-4', number: 4, title: 'Camping gear', description: 'Tent, sleeping bag, mat, cook kit. Festival-grade minimal setup. Light enough to cycle with, robust enough for multi-day outdoor living.' },
    { id: 'kit-5', number: 5, title: 'Arkel panniers & Tubus racks', description: 'Arkel pannier bags on Tubus racks, mounted front and rear on the gravel bike. Plus a bike bag on the top tube next to the handlebars and a phone mount. Total bike weight with everything: 40\u202Fkg. Heavy, but balanced. The bike handles like a loaded ship \u2014 slow to turn, unstoppable once moving.' },
    { id: 'kit-6', number: 6, title: 'Fairy lights', description: 'Because the bike covered in fairy lights is part of the identity. Solar-charged, waterproof, visible from 200 metres. The calling card before the UV paints even come out.' },
  ],
};