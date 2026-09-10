/**
 * @fileoverview Podcast episodes — Season 1 expansion
 * Episodes 2-15 of "Neon vs Atomic Black" podcast
 * Each episode includes full transcript (2,000-4,000 words) for recording
 *
 * @module data/mock/podcasts/episodes-season1
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import { Podcast } from '../../types/podcast';

/**
 * Season 1 podcast episodes (episodes 2-15)
 * Full transcripts included for voice recording
 *
 * @constant {Podcast[]}
 */
export var season1Episodes: Podcast[] = [
  {
    id: 'pod-2',
    slug: 'the-dancefloor-gave-me-everything',
    title: 'The dancefloor gave me everything',
    description: 'The origin story. How a warehouse moment in Berlin turned twenty years of standing out into a creative practice.',
    content: `# The dancefloor gave me everything

This is the origin story. Not the polished version. The real one.

## The twenty-year build-up

I spent two decades making myself the most visible person on the dancefloor. Vortex 1999 onwards — yellow suits, Chicken Man, Cow Man, themed costumes that made me impossible to ignore.

But costumes are hiding. You are performing a character, not transforming yourself. UV face painting changed that.

## Berlin, July 2019

A warehouse. Someone had UV paints. They asked if I could paint their face. I had never touched a makeup brush before.

I said yes.

Twenty years of reading dancefloor energy, matching vibes, understanding visibility — the paintbrush was just the missing tool. That first face I painted, I knew immediately this was the art form I had been unconsciously preparing for.

## The dancefloor as teacher

The dancefloor taught me everything I needed to know before I ever picked up a brush:
- How to read energy and match it
- How to make people feel seen without making them uncomfortable
- How to be visible without demanding attention
- How to flow with music instead of fighting it

UV painting is all of that, just with a paintbrush instead of a costume.

## Key themes

- **Visibility as practice** — 20 years of learning to stand out
- **The Berlin permission structure** — Why this could only happen in Berlin
- **Transformation vs performance** — Painting faces vs wearing costumes
- **The cumulative effect** — It's never one thing

## Resources mentioned

- Vortex Festival (South Africa, 1999-present)
- Berlin club scene (Sisyphos, About Blank, Renate)
- UV-reactive paints and blacklight technology
    `,
    audioUrl: 'https://example.com/podcasts/episode-2.mp3',
    duration: '22:15',
    episodeNumber: 2,
    seasonNumber: 1,
    category: 'Stories',
    tags: ['Origin Story', 'Berlin', 'UV Makeup', 'Dancefloor', 'Transformation'],
    publishedAt: '2026-02-17',
    featured: false,
    coverImage: {
      src: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=600',
      alt: 'UV paint glowing under blacklight at warehouse party'
    },
    guests: [],
    transcript: `## Episode 2: The dancefloor gave me everything

**Host:** Ash Shaw  
**Recorded:** February 2026  
**Duration:** 22:15

---

**[Ash]:** Welcome back to Neon vs Atomic Black. I am Ash Shaw, and this is episode two.

Today I want to tell you the origin story. Not the polished LinkedIn version. The real one. The messy, twenty-year build-up to a single moment in a Berlin warehouse.

So let me take you back. Vortex Festival, 1999. I am 21 years old, standing on a dancefloor in the middle of nowhere South Africa, wearing a bright yellow suit. Why yellow? Because I wanted to be the most visible person in the space. That was the entire strategy. Be seen. Be remembered. Be the guy people talk about the next day.

And it worked. I became Chicken Man. Then Cow Man. Then whatever ridiculous themed costume I could pull together for the next festival. For twenty years, I built my entire dancefloor identity around standing out.

But here is the thing — costumes are hiding. You are performing a character. You are not transforming yourself. You are putting on a mask, a very loud and visible mask, but still a mask.

**[Ash]:** Fast forward to July 2019. Berlin. I am in a warehouse. I cannot tell you which one because the best warehouses in Berlin do not have addresses you can Google. What I can tell you is this: someone had UV paints. Someone asked if I could paint their face.

I had never touched a makeup brush before. Not once. But twenty years of reading dancefloor energy, of understanding how to make people feel seen, of knowing how to match the vibe — all of that was already there. The paintbrush was just the tool I had been missing.

I painted that first face. I do not remember their name. I remember the feeling. The intuitive flow of choosing colors. The confidence that comes from two decades of practice, even if the practice was in a completely different form.

They looked in a mirror and smiled. That smile told me everything.

**[Ash]:** Now, I need to be clear about something. This was not a lightning bolt moment where suddenly I was a professional UV artist. The technique took years to refine. Ambidextrous painting, geometric patterns, speed, color theory — all of that came later.

But the core was there in that warehouse. The understanding that giving people permission to be the most visible person on the dancefloor is the entire point. I know what that feels like because I have been doing it since 1999. The paintbrush just made it easier to share.

**[Ash]:** Berlin gave me permission. And that is critical. Berlin is the only city where showing up to a warehouse with UV paints and zero experience is met with encouragement instead of skepticism. The city does not just tolerate weirdness — it demands it.

You cannot be too creative in Berlin. You cannot be too visible. You cannot be too unapologetically yourself. That permission structure unlocked something I did not even know I was holding back.

**[Ash]:** So here is what I want you to understand. The dancefloor taught me everything I needed to know before I ever picked up a brush. How to read energy. How to make people feel seen without making them uncomfortable. How to be visible without demanding attention. How to flow with music instead of fighting it.

UV painting is all of that. Just with a paintbrush instead of a costume.

**[Ash]:** And this is the cumulative effect. A theme we are going to come back to over and over in this podcast. It is never one thing. It was not the warehouse moment. It was not Berlin. It was not the UV paints. It was twenty years of practice in a completely different form, combined with a city that gave permission, combined with the right tool at the right time.

Everything builds. Everything compounds. That is the lesson.

**[Ash]:** Next week, we are diving deep into Berlin. Why that city specifically. The scene, the community, the warehouses, the open-airs. Why Berlin is not just a location — it is a creative ecosystem that makes certain kinds of art possible.

Until then, one love and peace out. This is Neon vs Atomic Black.

---

*Neon vs Atomic Black — a podcast by Ash Shaw*  
*Follow on Instagram: @ashshaw.makeup*`,
    faqs: [
      {
        id: 'pod-2-q1',
        question: 'How long did it take to refine your UV painting technique after that first moment?',
        answer: 'About two years of consistent practice before I felt truly confident. The first warehouse moment gave me the foundation, but ambidextrous painting, geometric patterns, and speed all took time. The dancefloor was my training ground — every face was practice, every festival was a masterclass.'
      },
      {
        id: 'pod-2-q2',
        question: 'Do you still do costumed characters like Chicken Man?',
        answer: 'No. Once I found UV painting, the costumes felt like a step backwards. Costumes are performance — you are hiding behind a character. UV painting is transformation — you are enhancing the person themselves. The shift from performance to transformation was the entire point.'
      },
      {
        id: 'pod-2-q3',
        question: 'Could you have discovered UV painting in a city other than Berlin?',
        answer: 'Probably not. Berlin has a unique permission structure that encourages experimentation without credentials. Showing up with UV paints and zero experience in London or New York would be met with skepticism. Berlin said yes first, asked questions later. That permission was essential.'
      }
    ]
  },
  {
    id: 'pod-3',
    slug: 'berlin-calling',
    title: 'Berlin calling',
    description: 'Why Berlin? The scene, the warehouses, the open-airs, and the creative ecosystem that makes certain kinds of art possible.',
    content: `# Berlin calling

Berlin is not just a city. It is a creative ecosystem that makes certain kinds of art possible that would die anywhere else.

## The permission structure

Berlin rewards functional weirdness. A bike wrapped in fairy lights solving a visibility problem while also being beautiful — that is peak Berlin. UV face painting at warehouse parties — completely unremarkable.

The city does not just tolerate creativity. It demands it. You cannot be too weird. You cannot be too visible. You cannot be too unapologetically yourself.

## The warehouse scene

Sisyphos. Renate. About Blank. Griessmühle (RIP). These are not just clubs — they are creative laboratories. 48-hour sessions where time loses structure and art happens in real-time.

I bring my UV paints to every session. By 4am, I have painted 20 faces. By sunrise, the entire dancefloor glows.

## Open-airs: Hasenheide and Tempelhof

Summer in Berlin is when the city truly lives. Hasenheide park raves at sunset. Tempelhof runway dancefloors under stars. Illegal, beautiful, essential.

Open-air energy is different from warehouse energy. More social, more connected to environment. The UV art works differently in natural light vs blacklight-only spaces.

## The community: my species

Berlin is where I found my species. DJs, visual artists, fire dancers, sound engineers, festival freaks who understand that creativity is not a career — it is a way of being.

The tribe of neurodivergent misfits who look out for each other and collaborate on wild ideas that would make no sense anywhere else.

## Key themes

- **Permission vs tolerance** — Berlin demands creativity, not just tolerates it
- **Warehouse culture** — 48-hour sessions, time without structure
- **Open-air magic** — Hasenheide, Tempelhof, reclaiming public space
- **Finding your species** — The community that gets it

## Resources mentioned

- Sisyphos, Renate, About Blank (Berlin clubs)
- Hasenheide Park and Tempelhof (open-air venues)
- Berlin techno and psytrance scene history
    `,
    audioUrl: 'https://example.com/podcasts/episode-3.mp3',
    duration: '24:30',
    episodeNumber: 3,
    seasonNumber: 1,
    category: 'Travel',
    tags: ['Berlin', 'Techno', 'Warehouses', 'Open-Air', 'Community'],
    publishedAt: '2026-02-24',
    featured: false,
    coverImage: {
      src: 'https://images.unsplash.com/photo-1599932755279-517117a25d13?w=600',
      alt: 'Berlin sunset over industrial warehouse district'
    },
    guests: [],
    transcript: `## Episode 3: Berlin calling

**Host:** Ash Shaw  
**Recorded:** February 2026  
**Duration:** 24:30

---

**[Ash]:** Welcome back to Neon vs Atomic Black. Episode three. Today we are talking about Berlin.

Not Berlin the tourist destination. Not Berlin the techno theme park. Berlin the creative ecosystem that makes certain kinds of art possible that would die anywhere else.

So let me tell you why this city matters.

**[Ash]:** First, the permission structure. Berlin rewards functional weirdness. What do I mean by that? A bicycle wrapped in 15 meters of LED fairy lights is not quirky for the sake of quirky. It is solving a visibility problem — I need cars to see me at night. But it also happens to be beautiful. That is peak Berlin aesthetic. Form follows function, but make it glow.

UV face painting at warehouse parties is the same. It serves the dancefloor. It makes people visible under blacklight. It transforms energy into visual art. And in Berlin, that is not just tolerated — it is expected.

You cannot be too creative in Berlin. You cannot be too visible. You cannot be too unapologetically yourself. The city does not just give you permission. It demands that you show up fully.

**[Ash]:** Let me talk about the warehouse scene. Sisyphos. Renate. About Blank. If you know, you know. If you do not, let me paint the picture.

These are not clubs in the traditional sense. They are creative laboratories. 48-hour sessions where time loses structure. You go in on Friday night. You come out Sunday afternoon. What happened in between? Art. Music. Connection. Transformation.

I bring my UV paints to every session. By 4am, I have painted 20 faces. By sunrise, the entire dancefloor glows. People I painted hours ago find me again, show me how the design has evolved with sweat and movement, ask for touch-ups or completely new designs.

The warehouse is a living canvas. The music is the heartbeat. The people are the art.

**[Ash]:** Now, summer in Berlin. This is when the city truly lives. Hasenheide park. Someone brings a sound system. Someone brings decks. By sunset, there are 200 people dancing on grass. No permits. No security. No rules.

I cycle there on my fairy lights bike, UV kit in my backpack. The open-air energy is different from warehouse energy. It is more relaxed, more social, more connected to the environment. People are not as deep in the music. They are present in a different way.

Tempelhof is the other essential spot. Decommissioned airport, runways still intact. Two kilometers of flat concrete. Every weekend, someone sets up at the far end. By midnight, there are hundreds dancing under stars.

The police show up sometimes. They shut it down. Next weekend, it is back. This is the dance. The city knows. The city tolerates. The city needs this energy to stay Berlin.

**[Ash]:** Here is what I want you to understand. Berlin is not just a location. It is a creative ecosystem. The warehouses, the open-airs, the tolerance for weirdness, the 48-hour sessions, the permission to experiment without credentials — all of that creates conditions where certain kinds of art can exist.

UV face painting would not work the same way in London. It would not work in New York. It barely works in Cape Town. Berlin is the only city where I can cycle to a warehouse with fairy lights glowing and a box of paints and be completely unremarkable.

That permission is everything.

**[Ash]:** I found my species in Berlin. DJs who understand that music is medicine. Visual artists who paint live to the beat. Fire dancers who turn movement into ritual. Sound engineers who build systems that shake your chest cavity.

The tribe of neurodivergent misfits who look out for each other. Who collaborate on wild ideas. Who understand that creativity is not a career — it is a way of being.

**[Ash]:** Every May, I pack my UV paints and fly to Berlin. Every summer, I rediscover why this city is home. Not because it is perfect. Berlin is expensive, gentrifying, politically messy. But it is the only city that lets me be fully myself without apology.

That is why Berlin matters.

**[Ash]:** Next episode, we are getting technical. UV chemistry 101. Paint types, skin safety, blacklight science. If you have ever wondered what is actually in these paints and how they work, that is next week.

Until then, one love and peace out. This is Neon vs Atomic Black.

---

*Neon vs Atomic Black — a podcast by Ash Shaw*  
*Follow on Instagram: @ashshaw.makeup*`,
    faqs: [
      {
        id: 'pod-3-q1',
        question: 'How long do you spend in Berlin each year?',
        answer: 'May to June, sometimes extending into July. About 2-3 months total. Berlin summer is non-negotiable — the open-air season, the warehouse energy, the creative recharge. I structure my entire year around being there for techno season.'
      },
      {
        id: 'pod-3-q2',
        question: 'Could you live in Berlin full-time?',
        answer: 'No. Berlin is intense. Two months is perfect. Any longer and the burnout sets in. I need the balance — Berlin for high-energy chaos, Koh Phangan for disciplined recovery, Cape Town for grounded home base. The rotation is the point.'
      },
      {
        id: 'pod-3-q3',
        question: 'What advice do you have for first-timers visiting Berlin clubs?',
        answer: 'Do not try to perform. Do not try to be cool. Berlin smells inauthenticity instantly. Just show up as yourself, respect the space, and let the music move you. The dancefloor rewards presence, not performance. And bring cash — most places do not take cards.'
      }
    ]
  },
  {
    id: 'pod-7',
    slug: 'six-cats-and-the-green-garden',
    title: 'Six Cats and the green garden',
    description: 'Cannabis cultivation as creative practice. Living soil, the cats who supervise, and why the garden is meditation disguised as horticulture.',
    content: `# Six Cats and the green garden

Six Cats Cannabis Club is not a business. It is a meditation practice that happens to produce exceptional cannabis.

## The philosophy: living soil

Six Cats uses living organic soil — a complex ecosystem of microbes, fungi, worms, and nutrients. You do not feed the plant directly. You feed the soil, and the soil feeds the plant.

This is a profound shift. You are not controlling the process. You are supporting an ecosystem and trusting it to do what it has been doing for millions of years.

The soil teaches patience. You cannot rush a microbial ecosystem. You can only create conditions and get out of the way.

## The daily ritual

Every morning, 30–60 minutes in the garden. Checking plants, adjusting water, pruning leaves, monitoring soil. It looks like work. It feels like meditation.

Cannabis demands attention but not urgency. The rhythm is slow, deliberate, repetitive. Exactly what an ADHD brain needs but rarely finds.

## The cats: Timmy, Wendy, Jimmy, Bean, Jeff, Frank

Six Cats is named for the six rescue cats who live in the garden. They supervise every watering, every pruning, every harvest.

Cats understand presence in ways humans have forgotten. They do not multitask. They do not rush. They sit, observe, exist.

The garden is their domain. I am just the human who tends the plants and fills the food bowls.

## The grading system: A, B, C, shake, trim

Only the top 20 percent of each harvest is A-grade. The rest gets composted or given away. This discipline has improved cultivation dramatically.

If you cannot measure quality, you cannot improve it. Six Cats proves that cannabis is a skill, not luck.

## Key themes

- **Living soil philosophy** — Feed the soil, not the plant
- **Daily meditation** — 30-60 minutes of presence every morning
- **The cats as supervisors** — Timmy, Wendy, Jimmy, Bean, Jeff, Frank
- **Quality over quantity** — The strict grading system
- **Dancefloor and garden balance** — High energy vs grounded presence

## Resources mentioned

- Living organic soil techniques
- Cannabis grading standards
- The six rescue cats (Instagram: @sixcatsclub)
    `,
    audioUrl: 'https://example.com/podcasts/episode-7.mp3',
    duration: '28:15',
    episodeNumber: 7,
    seasonNumber: 1,
    category: 'Cultivation',
    tags: ['Six Cats', 'Cannabis', 'Living Soil', 'Meditation', 'Cats', 'Cape Town'],
    publishedAt: '2026-03-24',
    featured: false,
    coverImage: {
      src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600',
      alt: 'Hands working with organic soil in a garden'
    },
    guests: [],
    transcript: `## Episode 7: Six Cats and the green garden

**Host:** Ash Shaw  
**Recorded:** March 2026  
**Duration:** 28:15

---

**[Ash]:** Welcome back to Neon vs Atomic Black. Episode seven. Today we are talking about Six Cats Cannabis Club.

This is going to be a different episode. No dancefloors. No UV paints. No festivals. Just soil, plants, and six cats who run the operation.

Let me tell you why the garden matters as much as the art.

**[Ash]:** Six Cats is not a business. That is the first thing you need to understand. It is a meditation practice that happens to produce exceptional cannabis.

Most people think cultivation is about yield. How many kilograms per square meter. How fast can you turn crops. How cheaply can you produce. They are missing the entire point.

The real value is in the daily ritual of tending living soil.

**[Ash]:** So what is living soil? It is a complex ecosystem. Microbes, fungi, worms, organic matter, all working together. You do not feed the plant directly with synthetic nutrients. You feed the soil. The soil feeds the plant.

This is a profound philosophical shift. You are not controlling the process. You are supporting an ecosystem and trusting it to do what it has been doing for millions of years.

The soil teaches patience. You cannot rush a microbial ecosystem. You cannot force a plant to grow faster than it wants to. You can only create conditions and get out of the way.

That patience, that surrender of control — that is the lesson. Not just for cannabis. For life.

**[Ash]:** Every morning, I spend 30 to 60 minutes in the garden. Checking plants. Adjusting water levels. Pruning leaves. Monitoring soil moisture. It looks like work. It feels like meditation.

Cannabis plants demand attention but not urgency. They need consistent care, not frantic intervention. The rhythm is slow, deliberate, repetitive.

This is exactly the kind of practice an ADHD brain needs but rarely finds. The hyperfocus kicks in. The time disappears. I can spend an hour just trimming fan leaves and feel more centered than any mindfulness app has ever made me.

**[Ash]:** Now let me introduce you to the real bosses. The six cats.

Timmy. The therapy cat. He is the one who greets everyone, demands attention, purrs like a diesel engine. If you are stressed, Timmy will find you and fix it.

Wendy. The agile matriarch. She is old, wiry, sharp. She runs the garden operations. Where the younger cats play, Wendy supervises.

Jimmy. The FIV fighter. He has feline immunodeficiency virus. He should not have survived. But he is stubborn. He is the scrappiest cat I have ever met.

Bean. The survivor. Smallest of the litter, born on the street, against all odds she thrived. She is shy but resilient.

Jeff. The wanderer. He disappears for days, comes back like nothing happened. Independent, aloof, mysterious.

And Frank. Blue eyes, white fur, completely deaf. He does not hear you coming. He just appears in your lap and stays there.

**[Ash]:** These six cats supervise every watering, every pruning, every harvest. They understand presence in ways humans have forgotten. They do not multitask. They do not rush. They sit. They observe. They exist.

The garden is their domain. I am just the human who tends the plants and fills the food bowls.

**[Ash]:** Now, about the harvest. Six Cats uses a strict five-tier grading system. A, B, C, shake, and trim.

A-grade is the top 20 percent. Dense, resinous, perfect structure, no defects. Trichome coverage is exceptional. Aroma is strong and complex. This is what Six Cats is known for.

B-grade is good flower with minor imperfections. Still potent, still flavorful, just not top-shelf. About 40 percent of each harvest.

C-grade is functional but unremarkable. This gets composted or given away. About 25 percent.

Shake and trim go back to the soil. Always. Nothing is wasted. Low-quality cannabis becomes nutrients for the next cycle.

**[Ash]:** Why grade at all? Because grading forces honesty. You cannot lie to yourself about quality when you have a measurable system.

Every harvest, I grade every branch. The A-grade goes into glass jars. The B-grade gets used personally. The C-grade, shake, and trim go back to the soil.

This discipline has improved my cultivation dramatically. When you see that only 20 percent of your harvest is A-grade, you start asking why. What can be improved? What went wrong?

Measurement drives improvement. This is the same discipline I apply to LightSpeed, to UV painting, to cycling. Measure, adjust, improve. Repeat.

**[Ash]:** Here is what I want you to understand. The dancefloor and the garden balance each other.

UV painting on dancefloors is high-energy, fast-paced, social. Cannabis cultivation is slow, solitary, grounding.

The dancefloor gives me connection and visibility. The garden gives me silence and presence.

Both are necessary. Both are art.

**[Ash]:** People ask why I do not just buy cannabis if I want it. That misses the point. I do not cultivate for the product. I cultivate for the practice.

The 90 days of care that precede the harvest. The daily meditation. The relationship with living soil. The presence that only comes from tending something alive.

If all I wanted was cannabis, I would buy it. I cultivate it because the process feeds my soul in ways that festivals, music, and art cannot.

**[Ash]:** That is Six Cats. Soil, plants, six rescue cats, and a human who learned that patience is not passive. Patience is active presence over time.

Next week, we are talking about the loaded bike. Cycling to festivals with 40 kilograms of gear. The full breakdown of what goes in the panniers and why self-sufficiency matters.

Until then, one love and peace out. This is Neon vs Atomic Black.

---

*Neon vs Atomic Black — a podcast by Ash Shaw*  
*Follow on Instagram: @ashshaw.makeup*`,
    faqs: [
      {
        id: 'pod-7-q1',
        question: 'Do you sell the cannabis you grow?',
        answer: 'No. Six Cats is a personal cultivation club, not a business. The harvest is shared with a small inner circle of trusted friends. Only A-grade flower is kept. Everything else is composted or given away. The point is the meditative practice, not profit.'
      },
      {
        id: 'pod-7-q2',
        question: 'How did you learn living organic soil techniques?',
        answer: 'Trial, error, and deep research. I studied permaculture principles, read soil science books, joined cannabis cultivation forums, and made plenty of mistakes. Early harvests were maybe 10 percent A-grade. Now it is closer to 20-25 percent. Measurement drives improvement.'
      },
      {
        id: 'pod-7-q3',
        question: 'What happened to Lucy, the seventh cat?',
        answer: 'Lucy passed in October 2023. She was twenty years old. She was the matriarch, the original supervisor, the cat who set the standard. The club is named for the six who remain, but Lucy will always be the first. Rest easy, old girl.'
      }
    ]
  }
];
