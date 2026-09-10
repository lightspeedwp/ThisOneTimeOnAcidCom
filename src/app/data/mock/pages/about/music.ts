/**
 * @fileoverview Music sub-page data. Updated to include Spotify & SoundCloud identities.
 */
import type { AboutSubpageData } from './types';

export interface MusicArtist { id: string; name: string; }
export interface MusicGroup { id: string; title: string; description: string; artists: MusicArtist[]; }

export interface PlaylistCardData { id: string; title: string; artists: string; }

export interface SoundcloudCategory { id: string; title: string; description: string; items: string[]; }

export interface MusicPageData extends AboutSubpageData {
  pullQuote: string;
  spotifyProfileUrl: string;
  soundcloudProfileUrl: string;
  spotifyGroups: MusicGroup[];
  dailyMixes: PlaylistCardData[];
  soundcloudGroups: SoundcloudCategory[];
}

export var musicPageData: MusicPageData = {
  hero: {
    badge: 'Music',
    title: 'Soundtracks for the dancefloor and the canvas',
    description: 'Music has always been the engine behind my creativity. From psychedelic trance festivals to Berlin techno basements, the rhythms and textures of electronic music have shaped how I think about colour, energy, and movement.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Music' },
  ],
  pullQuote: 'Some artists push the mind outward. Some pull it inward. Together they form the soundtrack behind the makeup, the festivals, the travel, and the long nights creating.',
  spotifyProfileUrl: 'https://open.spotify.com/user/31sfctixrywxowo6b3qs6p4s655a',
  soundcloudProfileUrl: 'https://soundcloud.com/ash-shaw',
  
  spotifyGroups: [
    {
      id: 'group-psychedelic',
      title: 'Psychedelic Universe',
      description: 'Psytrance festivals were some of the first places where music, art, colour, and community merged into something magical.',
      artists: [
        { id: 'hallucinogen', name: 'Hallucinogen' },
        { id: 'shpongle', name: 'Shpongle' },
        { id: '1200mics', name: '1200 Micrograms' },
        { id: 'electric-universe', name: 'Electric Universe' },
        { id: 'space-tribe', name: 'Space Tribe' },
        { id: 'mad-tribe', name: 'Mad Tribe' },
        { id: 'eat-static', name: 'Eat Static' },
        { id: 'man-with-no-name', name: 'Man With No Name' },
        { id: 'logic-bomb', name: 'Logic Bomb' },
        { id: 'cosmosis', name: 'Cosmosis' }
      ]
    },
    {
      id: 'group-electronic',
      title: 'Electronic Journeys',
      description: 'The artists behind the long sets, sunrise moments, and endless Berlin nights. Music that creates landscapes you can travel through without leaving the dancefloor.',
      artists: [
        { id: 'rufus-du-sol', name: 'RÜFÜS DU SOL' },
        { id: 'whomadewho', name: 'WhoMadeWho' },
        { id: 'ben-bohmer', name: 'Ben Böhmer' },
        { id: 'oliver-koletzki', name: 'Oliver Koletzki' },
        { id: 'eli-and-fur', name: 'Eli & Fur' },
        { id: 'acid-pauli', name: 'Acid Pauli' },
        { id: 'orbital', name: 'Orbital' },
        { id: 'leftfield', name: 'Leftfield' },
        { id: 'underworld', name: 'Underworld' },
        { id: 'massive-attack', name: 'Massive Attack' },
        { id: 'chemical-brothers', name: 'The Chemical Brothers' }
      ]
    },
    {
      id: 'group-dark',
      title: 'Dark Energy',
      description: 'Not every creative moment is calm and meditative. Sometimes the best ideas come from chaos, distortion, and raw industrial energy.',
      artists: [
        { id: 'nin', name: 'Nine Inch Nails' },
        { id: 'marilyn-manson', name: 'Marilyn Manson' },
        { id: 'deftones', name: 'Deftones' },
        { id: 'tool', name: 'TOOL' },
        { id: 'korn', name: 'Korn' },
        { id: 'white-zombie', name: 'White Zombie' },
        { id: 'soad', name: 'System Of A Down' },
        { id: 'rammstein', name: 'Rammstein' }
      ]
    },
    {
      id: 'group-roots',
      title: 'Musical Roots',
      description: 'Before festivals and electronic music, these bands opened the door to experimentation and atmosphere.',
      artists: [
        { id: 'doors', name: 'The Doors' },
        { id: 'talking-heads', name: 'Talking Heads' },
        { id: 'david-bowie', name: 'David Bowie' },
        { id: 'queen', name: 'Queen' },
        { id: 'rolling-stones', name: 'The Rolling Stones' },
        { id: 'new-order', name: 'New Order' },
        { id: 'cure', name: 'The Cure' },
        { id: 'depeche-mode', name: 'Depeche Mode' },
        { id: 'pixies', name: 'Pixies' }
      ]
    }
  ],
  
  dailyMixes: [
    { id: 'mix-1', title: 'Daily Mix 1', artists: 'Chemical Brothers, Underworld & more' },
    { id: 'mix-2', title: 'Daily Mix 2', artists: 'The Doors, Jimi Hendrix & more' },
    { id: 'mix-3', title: 'Daily Mix 3', artists: 'Township Rebellion, Booka Shade & more' },
    { id: 'mix-4', title: 'Daily Mix 4', artists: 'New Order, Soft Cell & more' },
    { id: 'mix-5', title: 'Daily Mix 5', artists: 'Daft Punk, Harrington & more' }
  ],
  
  soundcloudGroups: [
    {
      id: 'sc-berlin',
      title: 'Berlin Club Scene',
      description: 'Sets from places like Sisyphos, Kater Blau, and Golden Gate that capture the raw energy of the city’s electronic scene.',
      items: ['Cotumo', 'Alle Farben', 'Klangtherapie', 'Marco1076', 'Sportbrigade Sparwasser']
    },
    {
      id: 'sc-festivals',
      title: 'Festival Energy',
      description: 'These mixes capture moments that only exist on a dancefloor somewhere in the forest or at sunrise on a festival stage.',
      items: ['Fusion Festival', 'Nation of Gondwana', 'Mystic Creatures Festival', 'Sisyphos events']
    },
    {
      id: 'sc-underground',
      title: 'Underground Electronic',
      description: 'Where producers experiment, collaborate, and release music that doesn’t always fit traditional labels.',
      items: ['Gray Matter', 'Fadi Mohem', 'Pauli Pocket', 'Leon Licht', 'Sahra Bass']
    }
  ],

  sections: [
    {
      id: 'music-x-makeup',
      title: 'Music & Creativity',
      paragraphs: [
        'Electronic music has always been part of my creative process. From psychedelic trance festivals to Berlin club nights, music shapes the rhythm of how I work, travel, and create. Whether it’s a deep melodic set while working or a sunrise festival mix, these sounds influence the colours and energy that appear in my makeup designs.',
        'I don’t sketch designs beforehand. I read the energy of the music and let it guide the brush. A driving bassline produces sharp geometric patterns. A melodic breakdown opens into flowing organic shapes. The relationship between what I hear and what I paint is so direct that people watching often describe it as visible music.'
      ]
    },
    {
      id: 'where-i-discover',
      title: 'Where I Discover Music',
      paragraphs: [
        'Clubs: Sisyphos, Kater Blau, Golden Gate',
        'Festivals: Fusion Festival, Nation of Gondwana, Mystic Creatures Festival',
        'Online: Spotify, SoundCloud, Live DJ Sets, Festival recordings'
      ]
    }
  ]
};