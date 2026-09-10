/**
 * @fileoverview Blog posts timeline expansion — 12 backdated posts (2016–2025)
 * Fills major timeline gaps to establish a long-running blog history.
 * All content sourced from ebook chapters and personal history.
 *
 * @module data/mock/blog/posts-timeline
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import { BlogPost } from '../../types';

/**
 * Timeline expansion blog posts
 * 12 posts spanning 2016–2025, filling gaps in the blog chronology
 *
 * @constant {BlogPost[]}
 */
export var timelineBlogPosts: BlogPost[] = [
  {
    id: 'snails-in-the-garden-where-it-all-began',
    slug: 'snails-in-the-garden-where-it-all-began',
    title: 'Snails in the garden: where it all began',
    excerpt: 'My parents paid me a few cents per snail. It was the first time I connected effort to reward. That small garden in Paarl planted every seed that followed \u2014 the Lego obsession, the twelve stiffy discs, and the relentless need to figure things out myself.',
    content: '# Snails in the garden: where it all began\n\n' +
      'I was born in Paarl, a small town in the Western Cape of South Africa, surrounded by vineyards and mountains and the kind of quiet that drives certain types of children slightly mad.\n\n' +
      'One of my earliest memories of earning anything was collecting snails in the garden. My parents would pay me a few cents per snail. It doesn\u2019t sound like much, but it was the first time I connected effort to reward \u2014 and the first sign that I\u2019d always prefer to figure out my own way to make things work.\n\n' +
      '## The Lego world\n\n' +
      'I spent hours alone in my room building intricate Lego systems. Towers, complex multi-level structures spanning an entire bookshelf that became my Lego world. The Lego men had systems to move up and down different levels. I would spend hours completely absorbed, amusing myself, building something nobody asked for with an intensity that should have been a clue about what was coming.\n\n' +
      '## Twelve stiffy discs\n\n' +
      'When I was twelve or thirteen, my dad gave me a gold computer. I needed to set it up with Windows myself. I went to a friend Guy for a bolt and got hold of Windows 3.1 installation discs on stiffy drives \u2014 about twelve discs to install Windows. I taught myself how to install it, then taught myself how to strip the computer and put it back together.\n\n' +
      'My friend Ron from up the road helped me resolve some hardware issues and taught me how to troubleshoot basic computer hardware problems. This was the beginning of the self-taught tech journey. Everything I\u2019ve built since \u2014 WordPress agencies, design systems, AI workflows \u2014 started with a twelve-year-old and twelve stiffy discs.\n\n' +
      '## The foundation\n\n' +
      'My parents modelled the values that still drive me today: honesty, hard work, dedication, good business ethics, and a good, honest set of morals. The foundation for everything that followed was poured in that small house in Paarl.\n\n' +
      'I was an only child. I spent a lot of time on my own or with my parents, which meant I was engaging with adults from a young age. My mum encouraged me as much as possible. Looking back, the Lego obsession, the snail business, the computer \u2014 it was all the same pattern. Give me a problem and leave me alone, and I will solve it.\n\n' +
      'That pattern has never changed. The problems just got bigger.',
    author: {
      name: 'Ash Shaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Global Psytrance Artist'
    },
    publishedAt: '2016-11-20',
    updatedAt: '2016-11-20',
    category: 'Insights',
    tags: ['Personal', 'Childhood', 'Cape Town', 'Entrepreneurship'],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1653940023746-191d6d056bf6?w=1080',
      alt: 'South African vineyard mountains landscape',
      caption: 'Paarl, Western Cape \u2014 where it all began'
    },
    featured: false,
    readTime: 4
  },
  {
    id: 'oregon-eclipse-chasing-totality-across-america',
    slug: 'oregon-eclipse-chasing-totality-across-america',
    title: 'Oregon eclipse: chasing totality across America',
    excerpt: 'Sixteen years after Solipse in Zambia, I chased another total solar eclipse \u2014 this time in Oregon. Different continent, different decade, same cosmic machinery. The Oregon Eclipse Festival was proof that the psytrance community is truly global.',
    content: '# Oregon eclipse: chasing totality across America\n\n' +
      'In 2001, I watched a total solar eclipse in Zambia from a clearing in the bush, surrounded by a thousand strangers who felt like family. Sixteen years later, in August 2017, I was in Oregon for the same reason: the moon, the sun, and a community gathered at the intersection.\n\n' +
      '## The Oregon Eclipse Festival\n\n' +
      'The Oregon Eclipse Festival was an ambitious gathering \u2014 a psytrance and electronic music festival timed to coincide with the total solar eclipse crossing the United States. Big Stump, a site in the Ochoco National Forest, hosted thousands of people from across the planet.\n\n' +
      'The South African contingent was strong. People I\u2019d been dancing with for nearly two decades showed up in Oregon, and the reunion felt like the scene had simply picked up and relocated to the other side of the world. That\u2019s the thing about the psytrance community \u2014 the dancefloor is portable. The people are the venue.\n\n' +
      '## Totality, again\n\n' +
      'The second time you witness totality, you think you\u2019ll be prepared. You\u2019re not.\n\n' +
      'The light flattening. The temperature dropping. The 360-degree sunset glow. The diamond ring as the first bead of sunlight pierces back around the moon\u2019s edge. It hits just as hard the second time because the cosmos doesn\u2019t do encores \u2014 every eclipse is a one-time event, unrepeatable, a reminder that you are standing on a rock hurtling through space.\n\n' +
      'The crowd roared. People cried. People held strangers. Sixteen years between eclipses, and my nervous system responded the same way it did at twenty in Zambia. Some things don\u2019t diminish with repetition. They deepen.\n\n' +
      '## America by festival\n\n' +
      'Oregon was also a chance to explore the American festival landscape. The production scale was different from South Africa \u2014 bigger stages, more infrastructure, a level of organisation that comes from a well-funded scene. But the energy on the dancefloor was the same. The bass was the same. The strangers becoming friends was the same.\n\n' +
      'I cycled parts of the route to and from the site, which in rural Oregon means empty highways, pine forests, and the kind of vast American landscape that makes a South African feel oddly at home. The scale is different but the feeling of open road is identical.\n\n' +
      '## The pattern\n\n' +
      'Solipse 2001. Oregon 2017. Two eclipses, two continents, sixteen years apart. The pattern is clear: when the universe offers you a front-row seat to the cosmic machinery, you go. You don\u2019t check your calendar. You don\u2019t worry about logistics. You say yes and you figure it out.\n\n' +
      'That\u2019s been the pattern of my entire life. The dancefloor, the bicycle, the paintbrush, the business \u2014 all of it started with saying yes to something I didn\u2019t fully understand.',
    author: {
      name: 'Ash Shaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Global Psytrance Artist'
    },
    publishedAt: '2017-08-25',
    updatedAt: '2017-08-25',
    category: 'Travel',
    tags: ['Travel', 'Solar Eclipse', 'Festivals', 'Psytrance', 'Adventure', 'Oregon'],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1761798980621-8a451d574d24?w=1080',
      alt: 'Total solar eclipse with corona visible',
      caption: 'Totality in Oregon, August 2017'
    },
    featured: false,
    readTime: 5
  },
  {
    id: 'day-zero-cape-town-water-crisis',
    slug: 'day-zero-cape-town-water-crisis',
    title: 'Day Zero: when Cape Town almost ran out of water',
    excerpt: 'In 2018, Cape Town came within weeks of becoming the first major city in the world to run out of water. Day Zero changed how we think about resources. For Six Cats, it accelerated the rainwater system that now feeds the entire garden.',
    content: '# Day Zero: when Cape Town almost ran out of water\n\n' +
      'In 2018, Cape Town almost became the first major city in the modern world to run out of water. The media called it Day Zero \u2014 the projected date when the taps would literally be turned off and residents would queue at municipal collection points for 25 litres per person per day.\n\n' +
      'Day Zero never arrived. The city survived through aggressive water restrictions, behavioural change, and eventual rain. But the crisis fundamentally changed how we live.\n\n' +
      '## The restriction reality\n\n' +
      'At the height of the crisis, every Cape Town household was limited to 50 litres per person per day. To put that in perspective: a typical shower uses 60\u201380 litres. A single toilet flush uses 9 litres. You learned to shower in 90 seconds, to flush only when necessary, to reuse grey water for the garden.\n\n' +
      'I was already an outdoor grower by this point \u2014 the garden that would eventually become Six Cats was well established. Watching the dam levels drop below 20% and knowing that my plants needed water forced a reckoning: either find a sustainable water source or stop growing.\n\n' +
      '## The rainwater solution\n\n' +
      'We installed 13,500 litres of rainwater storage with triple filtration \u2014 sediment, carbon, and UV stages. Every drop that touches our plants comes from the sky. No chlorine, no fluoride, no municipal dependency.\n\n' +
      'The system wasn\u2019t cheap, and installing it during a water crisis meant competing with every other Cape Town resident who had the same idea. But it was one of the best decisions I\u2019ve ever made. Cape Town\u2019s water situation has stabilised since then, but the habit of treating every drop as precious has stayed.\n\n' +
      '## What Day Zero taught me\n\n' +
      'Day Zero taught me that sustainability isn\u2019t a marketing term \u2014 it\u2019s a survival strategy. When your city nearly runs dry, you stop treating resources as infinite. You start building closed-loop systems: Bokashi composting feeds the worm farm, the worm farm feeds the soil, rainwater feeds the plants, the plants feed the cycle.\n\n' +
      'The same philosophy now underpins everything at Six Cats. Glass packaging returned and reused. Worm compost tea brewed every two weeks. Companion planting instead of chemical pest control. Nothing synthetic. Nothing wasted.\n\n' +
      '## The broader lesson\n\n' +
      'Day Zero also taught me that community matters during crisis. Neighbours shared water-saving tips. Restaurants displayed their usage. The city pulled together in a way that felt familiar to anyone who has been part of a festival community \u2014 collective responsibility, shared sacrifice, genuine care for each other.\n\n' +
      'Cape Town survived. The taps stayed on. But the memory of how close we came stays with every Cape Town resident. It\u2019s why I take water personally, not philosophically.',
    author: {
      name: 'Ash Shaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Global Psytrance Artist'
    },
    publishedAt: '2018-02-10',
    updatedAt: '2018-02-10',
    category: 'Insights',
    tags: ['Cape Town', 'Sustainability', 'Six Cats', 'Water', 'Community'],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1759248730489-4202df3511d1?w=1080',
      alt: 'Drought landscape with low water levels',
      caption: 'Day Zero: Cape Town\u2019s water crisis, 2018'
    },
    featured: false,
    readTime: 5
  },
  {
    id: 'first-season-koh-phangan-muay-thai-coral-reefs',
    slug: 'first-season-koh-phangan-muay-thai-coral-reefs',
    title: 'First season on Koh Phangan: Muay Thai, coral reefs, and island time',
    excerpt: 'September 2019. I arrived on Koh Phangan for the first proper training season \u2014 Muay Thai with a skilled trainer, open water swimming to coral reefs, and the realisation that this island would become my third home.',
    content: '# First season on Koh Phangan: Muay Thai, coral reefs, and island time\n\n' +
      'I\u2019d been to Koh Phangan before \u2014 first in 2005 with friends, then back for Barbara\u2019s 40th birthday, then for the parties: Black Moon, Half Moon, Ban Sabaii after-parties. Never the Full Moon Party. The psytrance parties were the draw.\n\n' +
      'But 2019 was different. This was the first time I came to train.\n\n' +
      '## Muay Thai\n\n' +
      'The gym on Koh Phangan is a meeting point for digital nomads, fighters, yogis, and people who have opted out of conventional life. I started Muay Thai with a skilled trainer, and the training was brutal and beautiful \u2014 pad work, bag work, clinching. Your body is your primary tool, and the tool needs maintenance.\n\n' +
      'What surprised me most was how the discipline of combat training complemented the freedom of the festival lifestyle. They seem like opposites, but they\u2019re the same: total presence, total commitment, total engagement with what\u2019s in front of you. The dancefloor and the ring both demand that you show up completely.\n\n' +
      '## Morning swims\n\n' +
      'Morning routine: swim out to the coral reefs. Not laps in a pool \u2014 open water, salt water, fish darting beneath you, sea urchins in the rocks, the sun already hot at 7am. The swim is meditation and exercise simultaneously, the ADHD brain focused by the sensory richness of the ocean.\n\n' +
      'At this point my swimming wasn\u2019t great. I could survive in water but I couldn\u2019t enjoy it. That would change later, after training with Lourens Visser. But even in 2019, swimming to the reefs was magical. The underwater world off Koh Phangan is extraordinary \u2014 colourful fish, coral formations, the occasional turtle. It\u2019s the kind of environment that makes you forget you\u2019re exercising.\n\n' +
      '## The laptop-and-bike lifestyle\n\n' +
      'Remote work from the island completed the picture. Mornings for training, afternoons for LightSpeed, evenings for the dancefloor or the sunset. The herbal steam bath at a temple for rest and recovery, with massage onsite. During the week I work and train, I live my best life there.\n\n' +
      'Koh Phangan is a small but not tiny island with a mountain for hiking, amazing beaches if you\u2019re willing to journey to find them. Everything you need fits on a bicycle, and everything I needed was already there.\n\n' +
      '## The third home\n\n' +
      'By the time I left in November 2019, I knew I\u2019d be back. Koh Phangan had joined Cape Town and Berlin in the annual cycle. Three homes, three seasons, three sets of training, three sets of festivals. The yearly rhythm was forming \u2014 even if I didn\u2019t realise yet that it would become the architecture of my entire life.\n\n' +
      'Then COVID happened, and everything stopped. But the island was waiting.',
    author: {
      name: 'Ash Shaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Global Psytrance Artist'
    },
    publishedAt: '2019-10-15',
    updatedAt: '2019-10-15',
    category: 'Travel',
    tags: ['Koh Phangan', 'Thailand', 'Muay Thai', 'Travel', 'Training', 'Island Life'],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1699734210448-f83a8e5da5d3?w=1080',
      alt: 'Tropical island beach in Thailand',
      caption: 'Koh Phangan: the third home'
    },
    featured: false,
    readTime: 4
  },
  {
    id: 'when-the-dancefloors-went-dark',
    slug: 'when-the-dancefloors-went-dark',
    title: 'When the dancefloors went dark',
    excerpt: 'COVID hit. The festivals disappeared. For a brain wired for sensory richness and community connection, the silence was deafening. But the bicycle was still there. And the question became: when the world opens again, who do you come back as?',
    content: '# When the dancefloors went dark\n\n' +
      'March 2020. South Africa went into hard lockdown. The festivals vanished overnight. The dancefloors went dark. For a brain wired for sensory richness and community connection, the silence was deafening.\n\n' +
      '## What disappeared\n\n' +
      'Try to explain to a neurotypical person what losing the dancefloor means to an ADHD brain. It\u2019s not losing a hobby. It\u2019s losing your primary regulation system. The sensory richness that keeps the brain calm. The community that provides external structure. The physical endurance of 12-hour dances that anchors the mind.\n\n' +
      'No festivals. No Alien Safari. No Vortex. No Berlin open-airs. No Thailand parties. The entire social infrastructure that I\u2019d built over twenty years \u2014 gone, indefinitely.\n\n' +
      '## What remained\n\n' +
      'The bicycle was still there. When the world went quiet, the roads went empty, and the mountain passes opened up in a way they hadn\u2019t before. Cycling became the only sensory outlet \u2014 the wind, the exertion, the rhythm of pedalling, the landscape scrolling past. Not a dancefloor, but the closest available approximation.\n\n' +
      'LightSpeed was still there. The business didn\u2019t stop \u2014 if anything, demand for web development increased as everyone moved online. Remote-first since 2003, we were accidentally pandemic-proof. The team adapted without drama because remote work wasn\u2019t a new concept. It was just Tuesday.\n\n' +
      'The cats were still there. Timmy, Wendy, Jimmy, Bean. The garden still needed tending. The soil still needed feeding. The rhythm of cultivation doesn\u2019t respect pandemics. The worm tea still needed brewing every two weeks.\n\n' +
      '## The question\n\n' +
      'COVID forced a question I hadn\u2019t asked in years: who am I without the dancefloor?\n\n' +
      'The answer took time. I was the cyclist. The gardener. The business owner. The cat person. The builder. The person who taught himself Windows from twelve stiffy discs and built everything that followed from that same stubbornness.\n\n' +
      'The dancefloor had given me everything, but it wasn\u2019t everything I was. The other threads \u2014 the cycling, the cultivation, the code \u2014 held firm when the music stopped.\n\n' +
      '## The return\n\n' +
      'When festivals came back, slowly and tentatively, the return was electric. The first outdoor party after months of silence was overwhelming \u2014 the bass in the chest, the UV lights, the faces of friends not seen in a year. It felt like coming home after a long, quiet exile.\n\n' +
      'But I came back different. More grateful. More aware that the things we take for granted can vanish overnight. And with a quiet certainty that when the world opens again, you come back as someone who has survived the silence and found that the beat was inside you all along.',
    author: {
      name: 'Ash Shaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Global Psytrance Artist'
    },
    publishedAt: '2020-05-20',
    updatedAt: '2020-05-20',
    category: 'Insights',
    tags: ['COVID', 'Festivals', 'ADHD', 'Cycling', 'Resilience', 'Personal'],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1766336086222-3a3b8c45eea2?w=1080',
      alt: 'Empty dancefloor in closed venue',
      caption: 'The silence after the beat'
    },
    featured: false,
    readTime: 5
  },
  {
    id: 'ambidextrous-painting-with-both-hands',
    slug: 'ambidextrous-painting-with-both-hands',
    title: 'Ambidextrous: painting with both hands',
    excerpt: 'Within the first weeks of painting faces I realised I was working ambidextrously \u2014 both hands simultaneously, one on each side of the face. This wasn\u2019t trained. It was how my hands wanted to move.',
    content: '# Ambidextrous: painting with both hands\n\n' +
      'The technique discoveries came fast after I picked up UV paint in July 2019. But the biggest surprise wasn\u2019t a technique at all \u2014 it was how my body chose to paint.\n\n' +
      '## Both hands, simultaneously\n\n' +
      'Within the first weeks I realised I was painting ambidextrously \u2014 both hands working simultaneously, one on each side of the face. This wasn\u2019t something I trained. It was how my hands wanted to move. Mirror-image designs flowing outward from the centre.\n\n' +
      'The ADHD brain that had always been doing three things at once had found its perfect outlet: both hemispheres engaged, symmetrical patterns emerging in real time, the dual-track processing that had always felt like chaos now channelled into something beautiful.\n\n' +
      '## What you see is not what you get\n\n' +
      'The other revelation was colour behaviour under UV light. This insight separates UV art from every other form of face painting.\n\n' +
      'What you see during application is NOT what you see under blacklight. The transformation is the art. Greens that look bland and almost military in daylight become nuclear, radioactive, alive under UV. Pinks that seem garish in natural light become ethereal and otherworldly under blacklight. Oranges that look like construction vests become solar flares.\n\n' +
      'I learned to paint for the reveal, not the application. Every stroke is placed knowing that the real artwork only appears when the blacklight hits. It\u2019s like composing music you won\u2019t hear until the concert hall is full \u2014 you have to trust the physics of light and pigment.\n\n' +
      '## The co-creation philosophy\n\n' +
      'I don\u2019t sketch beforehand. I don\u2019t look at Pinterest boards or follow trends. The creative process begins with a feeling \u2014 the energy of the music, the light conditions, and the vibe of the person sitting in front of me.\n\n' +
      'I don\u2019t impose a design. I listen. What does this person want to become tonight? Some people want fierce geometry. Others want flowing organic shapes. Some want to disappear into the crowd with subtle accents. Others want to become a beacon.\n\n' +
      'The conversation between artist and canvas is the creative act itself. I don\u2019t just paint faces \u2014 I unlock avatars.\n\n' +
      '## UV mascara: the eyebrow moment\n\n' +
      'I discovered that UV mascara transforms my blonde eyebrows into something that pops under blacklight \u2014 suddenly I had eyebrows. Multiple colours layered on the eyelashes create effects that are subtle yet striking. It sounds like a small thing, but it was a revelation.\n\n' +
      '## Practice philosophy\n\n' +
      'No Pinterest. No pre-sketching. No reference images. No mood boards. Pure spontaneous creation, every single time. Each face is a new canvas with its own bone structure, its own energy, its own story. Pre-planning would kill the thing that makes it alive.\n\n' +
      'The ADHD brain that struggles with routine and repetition thrives in this space where every design must be invented in the moment. It\u2019s not a limitation \u2014 it\u2019s the superpower.',
    author: {
      name: 'Ash Shaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Global Psytrance Artist'
    },
    publishedAt: '2021-02-15',
    updatedAt: '2021-02-15',
    category: 'Education',
    tags: ['UV Makeup', 'Technique', 'Art', 'ADHD', 'Creativity', 'Tutorial'],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1732887905835-62f28b94b996?w=1080',
      alt: 'Artist painting with creative process',
      caption: 'Both hands, simultaneously'
    },
    featured: false,
    readTime: 4
  },
  {
    id: 'the-loaded-bike-40kg-of-everything',
    slug: 'the-loaded-bike-40kg-of-everything',
    title: 'The loaded bike: 40kg of everything an artist needs',
    excerpt: 'UV paints, brush kit, mirror stand, camping gear, touring panniers. 40 kilograms on two wheels. When I cycle to a festival, the journey becomes part of the art.',
    content: '# The loaded bike: 40kg of everything an artist needs\n\n' +
      'When I cycle to a festival, the journey becomes part of the art. Hundreds of kilometres of road dissolve the noise of everyday life. By the time I arrive, I\u2019m present, clear, and creatively charged.\n\n' +
      '## The kit\n\n' +
      'The touring setup: a gravel bike, Arkel pannier bags, Tubus racks, a bike bag on the top tube next to the handlebars, phone mount. UV paints, brush kit, mirror stand when heading to festivals. Camping gear. Total weight: 40 kilograms.\n\n' +
      'Portability isn\u2019t a limitation \u2014 it\u2019s a design constraint that forces creative efficiency. When everything has to fit in panniers, you become ruthless about what matters. The same principle applies to makeup: the less you carry, the more creative you get with what you have.\n\n' +
      '## From racing to companionship\n\n' +
      'I started bike packing in 2012. It evolved from racing into something fundamentally different \u2014 endurance, self-sufficiency, meditation, and adventure. In my teens I was chasing provincial championships. In my thirties, the bicycle became a companion rather than a competitor.\n\n' +
      'The relationship transformed: from \"how fast can I go\" to \"how far can I see.\" Racing is about beating others. Touring is about discovering yourself.\n\n' +
      '## The notable routes\n\n' +
      '300 kilometres from San Francisco to Point Reyes and back in California \u2014 Pacific coast fog, redwoods, and the kind of empty road that makes you feel like the last person alive. Two trips in the Netherlands totalling nearly 800 kilometres, flat as paper but relentless in the wind. Munich to Amsterdam: 1,000 kilometres in ten days, crossing four countries.\n\n' +
      'And always, the Thai routes \u2014 over 7,000 kilometres total. Those journeys deserve their own post.\n\n' +
      '## The makeup kit adapts\n\n' +
      'The kit changes depending on where I\u2019m heading. In Berlin, I have the full makeup kit \u2014 Make-Up Studio Amsterdam mousse eyeshadows, nearly every colour, treated like a painter\u2019s palette. Maximum products, maximum options.\n\n' +
      'In Thailand, I travel light \u2014 UV products only. The mousse is expensive and the last time I brought it to Thailand it dried out in the humidity and I had to throw the whole lot away. Learned that lesson once. The UV kit is more portable anyway, and the blacklight conditions at Thai festivals are perfect for it.\n\n' +
      '## The checklist\n\n' +
      'I always have a checklist. If I don\u2019t have a checklist, I leave stuff behind. Even with a checklist, I leave stuff behind. So every time I do a party, I adapt my checklist. Times change, gear changes, and needs change.\n\n' +
      'The less you carry, the further you go. That\u2019s true on the bicycle and true in life.',
    author: {
      name: 'Ash Shaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Global Psytrance Artist'
    },
    publishedAt: '2022-03-01',
    updatedAt: '2022-03-01',
    category: 'Travel',
    tags: ['Cycling', 'Bike Packing', 'Adventure', 'UV Makeup', 'Travel', 'Endurance'],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1697437630050-840cbbc1fb6e?w=1080',
      alt: 'Loaded touring bicycle with panniers',
      caption: '40 kilograms of everything an artist needs'
    },
    featured: false,
    readTime: 4
  },
  {
    id: 'africaburn-three-burns-radical-self-expression',
    slug: 'africaburn-three-burns-radical-self-expression',
    title: 'AfricaBurn: three burns and the art of radical self-expression',
    excerpt: 'I attended AfricaBurn in 2015, 2017, and 2019 \u2014 South Africa\u2019s regional Burning Man event. Three burns, three versions of myself, and the gradual realisation that the costumes were getting closer to the skin.',
    content: '# AfricaBurn: three burns and the art of radical self-expression\n\n' +
      'AfricaBurn is South Africa\u2019s regional Burning Man event, held in the Tankwa Karoo \u2014 a semi-arid desert plain a few hours northeast of Cape Town. No cell signal. No shops. No spectators. Everyone participates.\n\n' +
      '## The first burn (2015)\n\n' +
      'My first AfricaBurn was sensory overload in the best possible way. The art installations in the desert, the mutant vehicles cruising the playa, the radical self-expression ethos that says: be whoever you want to be, and don\u2019t apologise.\n\n' +
      'I was still in the costume era. The outfits were elaborate, the dancing was relentless, and the community was unlike anything else in South Africa. AfricaBurn attracts a different crowd from the psytrance festivals \u2014 more art, more installation, more conceptual thinking. But the dancefloor energy was the same.\n\n' +
      '## The second burn (2017)\n\n' +
      'By 2017, I was evolving. The costumes were getting more UV-reactive. The onesies had given way to fabrics that glowed under blacklight. I was getting closer to the art that was coming, even though I didn\u2019t know it yet.\n\n' +
      'The Karoo desert under a full sky of stars, with fire installations blazing and electronic music pulsing across the playa \u2014 it\u2019s an environment that demands you show up as your most authentic self. There\u2019s nowhere to hide in the desert.\n\n' +
      '## The third burn (2019)\n\n' +
      'The last AfricaBurn before COVID. By now I had already picked up the UV paints in Berlin. This was the first burn where I brought a paint kit instead of a costume box. The shift from performer to artist was happening in real time.\n\n' +
      'I painted faces in our camp, under a makeshift shade structure, with dust coating everything and the sun hammering down. People lined up. The word spread across camps. By the third day, strangers were finding me and asking to be transformed.\n\n' +
      'The desert conditions were brutal on the makeup \u2014 dust, heat, and wind tested every product. But the UV results at night were extraordinary. The Karoo has zero light pollution. The blacklights had nothing to compete with. Faces glowed like beacons in the desert darkness.\n\n' +
      '## The principle of radical self-expression\n\n' +
      'AfricaBurn\u2019s ten principles mirror much of what I believe: radical self-expression, radical self-reliance, communal effort, gifting, leaving no trace. These aren\u2019t just festival rules. They\u2019re life principles.\n\n' +
      'Three burns showed me three versions of myself: the costumer (2015), the transitional figure (2017), and the artist (2019). The desert has a way of stripping away pretence and leaving only what\u2019s real. What was real, it turned out, was the paintbrush.',
    author: {
      name: 'Ash Shaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Global Psytrance Artist'
    },
    publishedAt: '2022-10-15',
    updatedAt: '2022-10-15',
    category: 'Travel',
    tags: ['AfricaBurn', 'Festivals', 'Art', 'UV Makeup', 'Cape Town', 'Desert'],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1768889097966-8a9720115a75?w=1080',
      alt: 'Desert art installation with fire at night',
      caption: 'The Tankwa Karoo: where pretence is impossible'
    },
    featured: false,
    readTime: 5
  },
  {
    id: 'berlin-summer-2023-nine-hundred-thousand-steps',
    slug: 'berlin-summer-2023-nine-hundred-thousand-steps',
    title: 'Berlin summer 2023: 900,000 steps and counting',
    excerpt: 'My Berlin season in 2023 was the most intense yet. Nearly one million steps in eight weeks, mostly dancing. Open-airs in parks, techno nights in Friedrichshain, and the cycling-to-festivals lifestyle at full throttle.',
    content: '# Berlin summer 2023: 900,000 steps and counting\n\n' +
      'Every May, I arrive in Berlin and the city immediately sets the tempo. The days are long, the parks are full, the open-air season is in full swing, and the dancefloors don\u2019t stop until Monday morning.\n\n' +
      '## The numbers\n\n' +
      'Summer 2023 was my most intense Berlin season yet. Nearly 900,000 steps over eight weeks \u2014 close to a million. Most of those steps were dancing. Not jogging, not hiking, not walking to the supermarket. Dancing. For hours. In warehouses, in parks, at open-airs, in basements.\n\n' +
      'The watch doesn\u2019t lie. When you\u2019re dancing from midnight to noon, you\u2019re covering serious distance without leaving the dancefloor. Add the cycling between venues \u2014 Kreuzberg to Friedrichshain, Neuk\u00F6lln to Tempelhof, the canal path at 4am \u2014 and the numbers stack up.\n\n' +
      '## The routine\n\n' +
      'Berlin has a routine, even if it doesn\u2019t look like one from the outside.\n\n' +
      'Weekdays: remote work for LightSpeed in the afternoon. Morning cycling. Evening painting prep. The flat, endless Berlin streets free the mind \u2014 between G\u00F6rlitzer Park and Tempelhof, ideas form with every pedal stroke.\n\n' +
      'Weekends: the dancefloor. Open-airs in Hasenheide Park if the weather holds. Techno nights in the warehouses of Friedrichshain. The after-parties that blur into the next day\u2019s pre-party. UV paint kit in the backpack, always ready.\n\n' +
      '## Cycling between festivals\n\n' +
      'The Berlin season isn\u2019t just the city. It\u2019s the orbit. Cycling to festivals across Germany, into Czech Republic, over to Austria. The bike becomes the vehicle that connects the dancefloors. Arriving at a festival by bicycle, dusty and grinning, panniers loaded with paint \u2014 it\u2019s become the signature entrance.\n\n' +
      '## The painting season\n\n' +
      'Berlin in summer 2023 was also the most productive painting season I\u2019ve had. The full Make-Up Studio Amsterdam mousse palette was in rotation \u2014 every colour available, treated like a painter\u2019s oil palette. The darkness of Berlin clubs and the quality of their UV rigs create perfect conditions for the art.\n\n' +
      'I painted more faces that summer than any previous season. The word-of-mouth effect was real: paint one person, and three more approach when they see the glow under the blacklight. By July, I was painting for hours straight at every event.\n\n' +
      '## Why Berlin\n\n' +
      'People ask why I keep going back. The answer is simple: Berlin is the only city in the world where a forty-something South African can cycle to a club in fairy lights with a box of UV paints and it\u2019s completely unremarkable. The city doesn\u2019t just accept this \u2014 it expects it.\n\n' +
      'That\u2019s not tolerance. That\u2019s home.',
    author: {
      name: 'Ash Shaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Global Psytrance Artist'
    },
    publishedAt: '2023-07-15',
    updatedAt: '2023-07-15',
    category: 'Travel',
    tags: ['Berlin', 'Festivals', 'Techno', 'Cycling', 'UV Makeup', 'Dancefloor'],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1766162833337-e070b26b3010?w=1080',
      alt: 'Berlin summer street scene with cyclist',
      caption: 'Berlin summer 2023: the most intense season yet'
    },
    featured: false,
    readTime: 4
  },
  {
    id: 'muay-thai-and-the-art-of-getting-hit',
    slug: 'muay-thai-and-the-art-of-getting-hit',
    title: 'Muay Thai and the art of getting hit',
    excerpt: 'I started Muay Thai in 2019 on Koh Phangan. By 2023 the training was intensive. Pad work, bag work, clinching, sparring. Your body is your primary tool, and the tool needs maintenance.',
    content: '# Muay Thai and the art of getting hit\n\n' +
      'There is something clarifying about getting punched in the face. Not the pain \u2014 the presence. In the split second between seeing the glove and feeling the impact, the ADHD brain finally shuts up. There is only this moment, this breath, this body.\n\n' +
      '## Starting Muay Thai\n\n' +
      'I started training Muay Thai in 2019 on Koh Phangan, but the intensive seasons came in 2023 and 2025. The gym is a meeting point for digital nomads, fighters, yogis, and people who have opted out of conventional life. It\u2019s one of the most diverse communities I\u2019ve ever been part of.\n\n' +
      'The training is brutal and beautiful. Pad work for combinations. Bag work for power. Clinching for control. Sparring for reality. Each session strips away whatever mental noise you walked in with.\n\n' +
      '## Why combat sports\n\n' +
      'People don\u2019t expect a UV face painter to also train Muay Thai. The combination sounds contradictory until you understand that both require the same thing: total body awareness, total presence, and the ability to read another person\u2019s energy in real time.\n\n' +
      'On the dancefloor, I read energy to decide what to paint. In the ring, I read energy to decide when to strike. Same skill, different application. The ADHD brain that processes a hundred inputs simultaneously is as useful in sparring as it is under UV lights.\n\n' +
      '## The discipline connection\n\n' +
      'Combat sports demand discipline that the ADHD brain typically resists. Fixed training times. Repetitive drills. Following instructions. But Muay Thai gets a pass because it\u2019s never boring. Every session is different. Every sparring partner brings a new puzzle. The brain stays engaged because the stakes are immediate \u2014 lose focus, and you get hit.\n\n' +
      'That\u2019s the paradox of ADHD and combat sports: the thing that makes it dangerous (losing focus) is also what makes it therapeutic (you can\u2019t lose focus).\n\n' +
      '## Body as primary tool\n\n' +
      'Your body is your primary tool, and the tool needs maintenance. Muay Thai is maintenance. Not gentle, yoga-style maintenance. Brutal, earn-it maintenance. The kind where you walk out of the gym with bruised shins and a clear mind.\n\n' +
      'The same hands that paint neon faces at 3am take punches at 7am. The same legs that dance for twelve hours throw kicks at a heavy bag. The body doesn\u2019t compartmentalise \u2014 everything feeds everything.\n\n' +
      '## Triathlon training\n\n' +
      'Muay Thai is one leg of the triathlon training I do on Koh Phangan: swim, bike, run. Adding combat sports to endurance training creates a balanced athlete \u2014 or at least, a less lopsided one. The island is small enough to lap by bicycle in a few hours but hilly enough to challenge you. Running in 35-degree humidity is character building.\n\n' +
      'After training, the herbal steam bath at the temple \u2014 recovery and meditation combined, the steam thick with eucalyptus and lemongrass. The perfect end to a session.\n\n' +
      'Muay Thai taught me something the dancefloor couldn\u2019t: that discipline and freedom are not opposites. They\u2019re partners.',
    author: {
      name: 'Ash Shaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Global Psytrance Artist'
    },
    publishedAt: '2023-09-20',
    updatedAt: '2023-09-20',
    category: 'Education',
    tags: ['Muay Thai', 'Koh Phangan', 'Thailand', 'Training', 'Fitness', 'ADHD'],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1557408833-91ef36660bcb?w=1080',
      alt: 'Muay Thai training in boxing gym',
      caption: 'Pad work, bag work, clinching, sparring'
    },
    featured: false,
    readTime: 5
  },
  {
    id: 'miss-scott-saw-it-first',
    slug: 'miss-scott-saw-it-first',
    title: 'Miss Scott saw it first: a letter to the teacher who believed',
    excerpt: 'At Paarl Junior School, there was one teacher who saw it differently. Miss Scott recognised the potential from Standard 1. In a school system that didn\u2019t know how to handle my brain, she did something different \u2014 she encouraged it.',
    content: '# Miss Scott saw it first: a letter to the teacher who believed\n\n' +
      'This is a letter I\u2019ll probably never send, to a teacher who probably doesn\u2019t know the impact she had.\n\n' +
      '## The school system\n\n' +
      'Growing up in a small Afrikaans town in the Western Cape in the 1990s, the school system had one speed: sit still, listen, repeat. My brain had a different speed: 200 km/h in every direction except the one the teacher was pointing.\n\n' +
      'I couldn\u2019t sit through forty minutes of mathematics. But I could spend six hours building an intricate Lego world nobody asked for. The school saw deficit. Miss Scott saw surplus.\n\n' +
      '## What she did\n\n' +
      'At Paarl Junior School, Miss Scott was our English and History teacher. She recognised the potential from Standard 1, then again in Standard 3, 4, and 5. In a system that tried to suppress what didn\u2019t fit, she did something different \u2014 she encouraged it.\n\n' +
      'I don\u2019t remember the specific words. I remember the feeling: that someone saw what was there and didn\u2019t try to fix it. She treated the intensity as an asset, not a problem. The kid who couldn\u2019t sit still was, in her classroom, the kid who was full of ideas.\n\n' +
      '## Why it mattered\n\n' +
      'One teacher. In the middle of a system that didn\u2019t have the language for ADHD, didn\u2019t have the framework for neurodivergence, and didn\u2019t have the patience for a kid who was wired differently. One teacher who chose encouragement over suppression.\n\n' +
      'I was bullied because I was small. The matric kids made me stand on stage and apologise to the entire school for not knowing the inter-school songs. I still cannot remember lyrics. That kind of public humiliation shapes you. It could have broken something permanently.\n\n' +
      'But Miss Scott\u2019s encouragement was a counterweight. For every moment of humiliation, there was a moment in English class where the brain was valued. For every time the system said \"wrong,\" there was a voice that said \"interesting.\"\n\n' +
      '## The ripple effect\n\n' +
      'I\u2019m forty-five now. I run a company. I paint faces on dancefloors across three continents. I cycle thousands of kilometres to festivals. I built a personal portfolio website with a design system so meticulous it has its own documentation ecosystem.\n\n' +
      'None of it looks like what a school report card would have predicted. But all of it traces back to the same qualities Miss Scott encouraged: intensity, curiosity, the refusal to do things the conventional way, and the belief that different is not deficient.\n\n' +
      '## The letter\n\n' +
      'Dear Miss Scott,\n\n' +
      'You probably don\u2019t remember me. There were a lot of kids in those classes, and I wasn\u2019t the loudest or the most obviously talented. But you saw something. And because you saw it, I eventually saw it too.\n\n' +
      'The kid who couldn\u2019t sit still now dances for twelve hours straight on dancefloors across the world. The kid who couldn\u2019t remember lyrics now writes twenty-chapter books. The kid who was publicly humiliated for being different now creates moments of public celebration for others.\n\n' +
      'That thread started in your classroom. I thought you should know.\n\n' +
      'Thank you.\n\n' +
      'Ash',
    author: {
      name: 'Ash Shaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Global Psytrance Artist'
    },
    publishedAt: '2025-04-15',
    updatedAt: '2025-04-15',
    category: 'Insights',
    tags: ['Education', 'ADHD', 'Personal', 'Gratitude', 'Childhood', 'Neurodivergence'],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1766867257943-0665537fb2dd?w=1080',
      alt: 'Teacher encouraging student in classroom',
      caption: 'One teacher who chose encouragement over suppression'
    },
    featured: false,
    readTime: 5
  },
  {
    id: 'wordcamp-europe-2025-crazy-south-african',
    slug: 'wordcamp-europe-2025-crazy-south-african',
    title: 'WordCamp Europe 2025: the crazy South African on stage',
    excerpt: 'Twenty years of WordCamps across four continents led to this: speaking at WordCamp Europe 2025 in Basel. The WordPress community taught me radical transparency, knowledge-sharing, and the power of building in public.',
    content: '# WordCamp Europe 2025: the crazy South African on stage\n\n' +
      'In June 2006, I walked into BarCamp Cape Town and met Dave Duarte, who told me about this open-source CMS called WordPress. Nineteen years later, I was standing on stage at WordCamp Europe 2025 in Basel, Switzerland, as a speaker.\n\n' +
      '## The WordPress journey\n\n' +
      'The path from that BarCamp to Basel covers twenty years of WordCamps across four continents. The community that started with twenty-seven people in a Cape Town co-working space grew into a global family. The Theme Review Team. The late-night discussions about block themes and design systems. The hallway track conversations that always teach more than the scheduled talks.\n\n' +
      'I\u2019ve always been known in the WordPress community as \"the crazy South African\" \u2014 the guy who cycles to conferences, who paints UV faces at afterparties, who runs a profitable agency while living a nomadic lifestyle that makes no sense on paper but works perfectly in practice.\n\n' +
      '## The talk\n\n' +
      'The Basel talk was about what it\u2019s like to run a WordPress agency for over two decades while embracing AI, remote-first culture, and a lifestyle that most business consultants would call insane. How LightSpeed has survived recessions, technology shifts, pandemics, and industry upheavals. How freedom and discipline aren\u2019t opposites. How the same brain that builds design systems also paints neon faces at 3am.\n\n' +
      'The response was overwhelming. People approached me afterward with stories of their own: agency owners who felt trapped by conventional business models, neurodivergent developers who hadn\u2019t been told their brain was an asset, remote workers who wanted permission to build a life rather than just a career.\n\n' +
      '## What WordPress taught me\n\n' +
      'The WordPress community taught me radical transparency and knowledge-sharing. Open source isn\u2019t just a licensing model \u2014 it\u2019s a philosophy. Build in public. Share what you know. Contribute back. These values mapped directly onto my parents\u2019 values: honesty, hard work, dedication, good business ethics.\n\n' +
      'The same openness that drives WordPress drives Six Cats (we don\u2019t hide our methods), drives the UV art practice (I share techniques freely), and drives LightSpeed (the team has maximum transparency into how the business operates).\n\n' +
      '## Basel itself\n\n' +
      'Basel was beautiful. The Rhine, the old town, the Swiss efficiency that makes everything run on time. The WordCamp was impeccably organised. The afterparty was, naturally, where the real connections happened.\n\n' +
      'I did bring the UV paints. Of course I did. By midnight, half the WordPress community was glowing.\n\n' +
      '## Nineteen years of WordCamps\n\n' +
      'From BarCamp Cape Town 2006 to WordCamp Europe 2025 in Basel. Nearly two decades of community, contribution, and the belief that building together is better than building alone.\n\n' +
      'The crazy South African is still crazy. Still cycling. Still painting. Still building WordPress sites. And now, apparently, speaking on European stages about it.\n\n' +
      'The BarCamp that changed everything was twenty-seven people. The WordCamp Europe audience was thousands. The message is the same: open source, open heart, open road.',
    author: {
      name: 'Ash Shaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Global Psytrance Artist'
    },
    publishedAt: '2025-07-01',
    updatedAt: '2025-07-01',
    category: 'Education',
    tags: ['WordPress', 'WordCamp', 'LightSpeed', 'Open Source', 'Community', 'Basel'],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?w=1080',
      alt: 'Speaker on conference stage with presentation',
      caption: 'WordCamp Europe 2025, Basel'
    },
    featured: true,
    readTime: 5
  }
];
