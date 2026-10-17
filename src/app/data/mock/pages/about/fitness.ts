/**
 * @fileoverview Fitness sub-page data. Extracted from about-subpages.ts (T17).
 */
import type { AboutSubpageData } from './types';

export interface FitnessSport { id: string; name: string; since: string; description: string; }
export interface FitnessStat { id: string; label: string; value: string; }
export interface FitnessTrainingDetail { id: string; title: string; paragraphs: string[]; }
export interface FitnessIntersection { id: string; from: string; to: string; connection: string; }

export interface FitnessPageData extends AboutSubpageData {
  pullQuote: string;
  stats: FitnessStat[];
  sports: FitnessSport[];
  kohPhanganTraining: FitnessTrainingDetail;
  intersectionModel: {
    id: string;
    title: string;
    intro: string;
    connections: FitnessIntersection[];
    closing: string;
  };
}

export var fitnessPageData: FitnessPageData = {
  hero: {
    badge: 'Fitness',
    title: 'The moving body',
    description: 'For ADHD brains, movement isn\u2019t optional \u2014 it\u2019s medication. Cycling, dance, yoga, running, triathlon, Muay Thai, swimming. The body as creative instrument, neurological regulator, and festival endurance machine.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Fitness' },
  ],
  pullQuote: 'For ADHD brains, movement isn\u2019t optional \u2014 it\u2019s medication. Cycling daily in Berlin isn\u2019t fitness; it\u2019s brain chemistry.',
  stats: [
    { id: 'cycling', label: 'Cycling since', value: '1994' },
    { id: 'yoga', label: 'Yoga since', value: 'Early 2000s' },
    { id: 'running', label: 'Running since', value: '2006' },
    { id: 'triathlon', label: 'Triathlon since', value: '2010' },
    { id: 'swimming', label: 'Swimming since', value: '2010' },
    { id: 'muaythai', label: 'Muay Thai since', value: '2019' },
    { id: 'dancing', label: 'Dancefloor', value: '25+ years' },
    { id: 'record', label: 'Berlin 2025', value: '~900 km / 1M steps' },
  ],
  sports: [
    { id: 'sport-cycling', name: 'Cycling', since: '1994', description: 'Provincial mountain bike champion (1998). Daily transport in Berlin. Festival pilgrimage vehicle. The foundational sport that underpins everything. Racing since age 13, touring since 2012, daily commuting since always.' },
    { id: 'sport-yoga', name: 'Yoga', since: 'Early 2000s', description: 'Flexibility, breath work, and the counterbalance to high-intensity sports. The practice that teaches the body to recover and the mind to settle after sensory overload.' },
    { id: 'sport-running', name: 'Running', since: '2006', description: 'Trail running that evolved from cycling cross-training. Table Mountain Challenge top 10 three times, Hout Bay Trail Challenge top 10 once. The simplest form of movement medicine \u2014 just shoes and a path. Complements the cycling with different muscle engagement and mental rhythm.' },
    { id: 'sport-triathlon', name: 'Triathlon', since: '2010', description: 'The natural evolution: swim, bike, run. Combines all three disciplines into a single endurance challenge. The ultimate test of the multi-sport athlete.' },
    { id: 'sport-swimming', name: 'Swimming', since: '2010', description: 'Low-impact active recovery. Swimming only got good after two years of training with Lourens Visser (who later joined LightSpeed as project manager). On Koh Phangan, that means swimming out to coral reefs, seeing colourful fish and sea urchins. Functional, beautiful, and deeply calming.' },
    { id: 'sport-muaythai', name: 'Muay Thai', since: '2019', description: 'Discovered in Thailand. Discipline, rhythm, controlled aggression. The striking art that taught Ash about body mechanics in ways cycling never could. Weekly sessions when access allows.' },
    { id: 'sport-dance', name: 'Dancefloor', since: '1999', description: 'Twenty-five years of continuous movement practice disguised as recreation. Hours of dancing at 140 BPM is the most effective ADHD intervention Ash has ever found. Berlin summer 2025: approximately 900\u202Fkm or one million steps over eight weeks.' },
  ],
  kohPhanganTraining: {
    id: 'koh-phangan',
    title: 'Koh Phangan training camp',
    paragraphs: [
      'Thailand\u2019s Koh Phangan island has become Ash\u2019s annual training camp \u2014 not in the traditional gym sense, but in the way that the island\u2019s landscape and culture create perfect training conditions.',
      'Morning Muay Thai sessions at local gyms. Afternoon swims to coral reefs. Evening cycling along coastal roads. The island\u2019s heat and humidity build a different kind of endurance \u2014 the kind that transfers directly to multi-day festival conditions in tropical climates.',
      'The Muay Thai community on Koh Phangan is international, welcoming, and serious about the craft. Training alongside fighters from around the world provides a different kind of festival community \u2014 bonded through shared physical challenge rather than shared dancefloor.',
    ],
  },
  intersectionModel: {
    id: 'intersection',
    title: 'The fitness-art-business intersection',
    intro: 'Nothing in Ash\u2019s life is siloed. Every discipline feeds the others in a continuous loop:',
    connections: [
      { id: 'int-cycling-art', from: 'Cycling', to: 'UV painting', connection: 'Daily cycling clears the mind for creative work. Festival pilgrimages are the warm-up for painting.' },
      { id: 'int-dance-art', from: 'Dancefloor', to: 'UV painting', connection: 'Hours of movement create the sensory state where the best art emerges. The dancefloor IS the studio.' },
      { id: 'int-muaythai-discipline', from: 'Muay Thai', to: 'Business', connection: 'The discipline of martial arts mirrors the discipline needed to run a company. Both require showing up when you don\u2019t want to.' },
      { id: 'int-yoga-recovery', from: 'Yoga', to: 'Everything', connection: 'Recovery practice that underpins all other activities. Breath work for painting focus, flexibility for long rides.' },
      { id: 'int-biz-travel', from: 'LightSpeed', to: 'Travel', connection: 'Generates the income that funds the festival circuits.' },
      { id: 'int-travel-art', from: 'Travel', to: 'UV painting', connection: 'Provides the festivals that need the painting.' },
    ],
    closing: 'It\u2019s a flywheel, not a balance sheet. Nothing is sacrificed for the others because they are all expressions of the same underlying drive: the ADHD brain\u2019s need for novelty, stimulation, and deep engagement.',
  },
  sections: [
    { id: 'movement-medicine', title: 'Movement as medicine', paragraphs: [
      'For ADHD brains, movement isn\u2019t optional \u2014 it\u2019s medication. Cycling daily in Berlin isn\u2019t fitness; it\u2019s brain chemistry. The 300 km loaded-bike pilgrimage to Origin Festival isn\u2019t adventure; it\u2019s the ultimate dopamine regulation strategy.',
      'The pattern is clear: cycling since 1994, yoga since the early 2000s, running since 2006, triathlon since 2010, swimming from 2010, Muay Thai since 2019 in Thailand. Thirty years of discovering new ways to move, each one adding a different dimension to the physical practice that keeps the mind clear and the creativity flowing.',
      'This isn\u2019t gym fitness. This is functional endurance built through decades of sport, shaped by the specific demands of the psytrance lifestyle \u2014 dancing for hours, setting up and painting all day, cycling to and from festivals with full gear, recovering between sets, between days, between festivals.',
    ]},
    { id: 'festival-endurance', title: 'Festival endurance', paragraphs: [
      'Multi-day festivals require a specific kind of fitness that no gym programme can provide. Dancing for hours in heat or cold. Setting up camp and painting faces all day, then dancing all night. Cycling to the festival with 40 kg of gear, then having the energy to create art for three or four days straight.',
      'The endurance built through decades of competitive cycling, trail running, and triathlon transfers directly to festival conditions. The comfort with suffering, the ability to push through when the body says stop, the understanding that energy is a resource to be managed, not burned. Hearing protection is essential: Loop Experience 2 ear plugs protect without killing the music.',
      'Recovery is part of the practice. The yoga provides flexibility and breath work. The swimming provides low-impact active recovery \u2014 on Koh Phangan, that means swimming out to coral reefs, seeing colourful fish and sea urchins. The cycling between festival days provides the repetitive motion that an ADHD brain needs to process the sensory overload of the previous night.',
    ]},
    { id: 'cycling-meditation', title: 'Cycling as meditation', paragraphs: [
      'Every ride has a meditative quality. The repetitive motion, the breath, the gradual unspooling of thoughts. By the time Ash arrives at a festival after 150 km of riding, he\u2019s processed everything the conscious mind was holding. The creative work that follows is cleaner, more instinctive, more honest.',
      'The loaded touring bike is a metaphor for the entire philosophy: portability isn\u2019t a limitation \u2014 it\u2019s a design constraint that forces creative efficiency. Everything an artist needs, on two wheels.',
    ]},
    { id: 'mind-body-art', title: 'The mind-body-art connection', paragraphs: [
      'The connection between physical fitness and creative output is direct and measurable. The best painting sessions follow the best physical days. The sharpest business decisions follow morning cycling rides. The deepest creative states happen when the body is exhausted enough to let the mind stop trying to control the process.',
      'Ash shapes his year around what feeds his brain: cycling for daily regulation, festivals for creative immersion, sport for physical structure, dance for sensory processing. Every part of the life is designed to work with the ADHD wiring, not against it.',
    ]},
    { id: 'daily-practices', title: 'Daily practices', paragraphs: [
      'The daily practice is non-negotiable: cycling in Berlin, every day, regardless of weather or schedule. It\u2019s the anchor that holds everything else together. On top of that, weekly Muay Thai sessions for discipline, yoga for flexibility and breath work, and swimming when access to open water allows.',
      'On festival weekends, the dancefloor becomes the primary movement practice \u2014 hours of continuous movement that doubles as creative preparation, social connection, and the most effective ADHD intervention Ash has ever found. Berlin summer 2025 set a personal record: approximately 900\u202Fkm or one million steps over eight weeks, mostly dancing. After 25+ years immersed in psytrance, his heart now beats for house and techno too \u2014 though the roots remain.',
    ]},
  ],
};