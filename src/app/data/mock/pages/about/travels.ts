/**
 * @fileoverview Travels sub-page data. Extracted from about-subpages.ts (T17).
 */
import type { AboutSubpageData } from './types';

export interface TravelDestination { id: string; name: string; region: string; description: string; }
export interface TravelsPageData extends AboutSubpageData { destinations: TravelDestination[]; }

export var travelsPageData: TravelsPageData = {
  hero: { badge: 'Travels', title: 'Chasing summers & sound', description: 'Ash\u2019s life follows the festivals. From Cape Town to Berlin, from Thai jungles to Portuguese hills \u2014 wherever psytrance plays, he paints.' },
  breadcrumbs: [ { label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Travels' } ],
  sections: [
    { id: 'nomad', title: 'The nomad circuit', paragraphs: [
      'Ash\u2019s year isn\u2019t divided into months \u2014 it\u2019s divided into seasons that follow the sun and the sound. Cape Town summers (November\u2013March) at his home base in Woodstock. Berlin in May for the techno season \u2014 open-airs, cycling, painting faces until September. Back to South Africa briefly to swap bikes and gear, then Koh Phangan, Thailand (September\u2013November) for Muay Thai training, triathlon, island psytrance, and remote work in tropical humidity. Then home to Cape Town in November for the South African summer festival circuit. It\u2019s not a calendar \u2014 it\u2019s a migration pattern.',
      'This isn\u2019t glamorous digital nomadism. It\u2019s dusty festival campsites, sleeping on friends\u2019 couches, and learning that everything you need fits on a bicycle. The less you carry, the further you go.',
    ]},
    { id: 'cycling-travel', title: 'Travelling by bicycle', paragraphs: [
      'When Ash cycles to a festival, the journey becomes part of the art. Hundreds of kilometres of road dissolve the noise of everyday life. By the time he arrives, he\u2019s present, clear, and creatively charged.',
      'He\u2019s cycled through Germany, Czech Republic, Austria, and beyond \u2014 arriving at festival gates with panniers full of UV paint and a heart full of road-earned stories.',
    ]},
    { id: 'cultures', title: 'Painting across cultures', paragraphs: [
      'Every region brings different faces, different skin tones, different relationships to body art. Thai festival-goers embrace full-body UV coverage. Berlin clubbers want sharp geometric precision. South African crowds love bold, expressive colour blocks.',
      'Ash has learned to read and adapt \u2014 not changing his style, but letting it be informed by the culture and energy of each place. The art is universal; the expression is local.',
    ]},
  ],
  destinations: [
    { id: 'berlin', name: 'Berlin', region: 'Germany', description: 'Home base. The techno underground, open-air summers, and cycling freedom.' },
    { id: 'cape-town', name: 'Cape Town', region: 'South Africa', description: 'Where it all began. Origin Festival, outdoor trance, and the mother city.' },
    { id: 'thailand', name: 'Thailand', region: 'Southeast Asia', description: 'Island psytrance, jungle festivals, and full-body UV under tropical stars.' },
    { id: 'portugal', name: 'Portugal', region: 'Southern Europe', description: 'Boom Festival, rolling hills, and the European psytrance heartland.' },
    { id: 'czech-republic', name: 'Czech Republic', region: 'Central Europe', description: 'Forest festivals and the cycling route through Bohemia.' },
    { id: 'austria', name: 'Austria', region: 'Central Europe', description: 'Alpine raves, mountain passes by bike, and an unexpected creative community.' },
  ],
};