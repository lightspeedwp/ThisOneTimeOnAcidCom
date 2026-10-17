/**
 * @fileoverview Mock data for Six Cats Club about sub-page
 *
 * Ash Shaw started the Six Cats Cannabis Club in Cape Town in May 2019.
 * He built the website at https://sixcats.club/ and grew craft cannabis
 * with nearly 20 years of experience. This page tells the story of
 * the club, the cats, and the cultivation philosophy.
 *
 * @module data/mock/pages/six-cats
 * @version 2.0.0
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TYPES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface SixCatsCat {
  id: string;
  name: string;
  nickname: string;
  status: 'alive' | 'memorial';
  role: string;
  bio: string;
  datePassed?: string;
}

export interface SixCatsGrade {
  id: string;
  grade: string;
  name: string;
  tagline: string;
  description: string;
}

export interface SixCatsValue {
  id: string;
  title: string;
  description: string;
}

export interface SixCatsCultivation {
  id: string;
  title: string;
  description: string;
}

export interface SixCatsSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface SixCatsPageData {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  breadcrumbs: BreadcrumbItem[];
  website: {
    name: string;
    tagline: string;
    url: string;
  };
  vision: string;
  mission: string;
  originStory: SixCatsSection;
  philosophy: SixCatsSection;
  values: SixCatsValue[];
  grades: SixCatsGrade[];
  cultivation: SixCatsCultivation[];
  harvest: SixCatsSection[];
  packaging: SixCatsSection[];
  cats: SixCatsCat[];
  sections: SixCatsSection[];
  a11y: {
    catsListLabel: string;
    memorialLabel: string;
    gradesLabel: string;
    valuesLabel: string;
    cultivationLabel: string;
    harvestLabel: string;
    packagingLabel: string;
    visionMissionLabel: string;
    originStoryLabel: string;
    philosophyLabel: string;
  };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DATA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const sixCatsPageData: SixCatsPageData = {
  hero: {
    badge: 'Six Cats Club',
    title: 'Craft cannabis \u2014 consciously cultivated',
    description:
      'In May 2019, Ash started the Six Cats Cannabis Club in Cape Town \u2014 a conscious cannabis community built on nearly 20 years of growing experience, sustainable farming, and a house full of rescue cats who became the brand\u2019s soul.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Six Cats Club' },
  ],
  website: {
    name: 'Six Cats',
    tagline: 'Craft Cannabis Club',
    url: 'https://sixcats.club/',
  },
  vision:
    'To enrich and improve lives through consciously crafted cannabis.',
  mission:
    'To grow, dry and cure exceptional cannabis using organic techniques that provide our customers with ethical, high-quality products and a world-class craft cannabis club experience.',

  /* ── Origin Story ── */
  originStory: {
    id: 'origin-story',
    title: 'The green garden',
    paragraphs: [
      'I\u2019ve always had green fingers. Long before Six Cats had a name or a website or a grading system, there was a garden in Cape Town and a quiet, patient relationship with growing that had been building for nearly two decades. Cannabis cultivation is an art form that rewards exactly the qualities I have in abundance: meticulousness, patience, obsessive attention to detail, and a genuine respect for the natural process.',
      'In May 2019, that passion became a club. Six Cats Cannabis Club \u2014 named, naturally, for the cats. The first cats were adopted in 2003, a brother and sister called Bart and Lisa. They quickly became the mascots for the yearly harvest. Over the years, nine homeless cats found their way to us, some have left, and the ones who remain are the soul of the operation.',
      'The cultivation philosophy is entirely organic: living soil built from Bokashi composting and worm farming, rainwater harvested and triple-filtered (Cape Town almost ran out of water in 2018 \u2014 we take water seriously), companion planting with basil, worm compost tea brewed every two weeks throughout the growing season. Nothing rushed. Nothing synthetic. Small-batch, hand-tended, high-quality flower grown outdoors using the natural cycles of the sun and seasons.',
    ],
  },

  /* ── Philosophy ── */
  philosophy: {
    id: 'philosophy',
    title: 'Ash\u2019s green fingers',
    paragraphs: [
      'Six Cats is the outlet for what I call my green fingers \u2014 the deeply satisfying practice of growing something from seed to harvest. These are the same hands that paint neon faces at festivals. Both practices require the same qualities: patience, attention to detail, sensitivity to the subject, and a deep respect for the process. The cannabis plant and the human face both reward the artist who listens before they paint.',
      'Six Cats was started with Barbara, who is also my partner at LightSpeed and one of my best friends. We\u2019ve built two creative businesses together, which is either a testament to our partnership or our mutual stubbornness \u2014 probably both. Every season since 2019 has been a new chapter. The cats have come and gone. Lucy, our cross-Burmese matriarch, left us in October 2023. The green garden carries on.',
      'What started as one man\u2019s garden has become a club, a community, and a philosophy. The eight values aren\u2019t just about cannabis \u2014 they\u2019re about how I approach everything. Authenticity in the art. Consciousness in the business. Consistency on the bicycle. Meticulousness in the code. Sustainability in the lifestyle. Passion in everything. Quality above all. Six Cats is not a side project. It\u2019s a mirror.',
    ],
  },

  /* ── Values ── */
  values: [
    {
      id: 'authenticity',
      title: 'Authenticity',
      description:
        'We spend a lot of our time researching the strains we grow, and have benefitted from the assistance given to us by our international network of fellow growers. The end result is a product that\u2019s verifiable as the real deal, every time.',
    },
    {
      id: 'consciousness',
      title: 'Consciousness',
      description:
        'From start to finish, seed to flower, we apply our whole mind to providing every small batch of our crop with care and nurturing energy, to ensure that the final result we share with you provides positivity and joy.',
    },
    {
      id: 'consistency',
      title: 'Consistency',
      description:
        'We regularly update our seed stock from the world\u2019s best cup-winning seed banks, and from season to season, we diligently examine every batch to make certain that this year\u2019s product matches the last, every time.',
    },
    {
      id: 'experience',
      title: 'Experience',
      description:
        'We have earned our knowledge from 20 years\u2019 worth of careful growing, and have learned with every season. This is the basis of our craft: careful and considerate observation, and the application of every lesson we\u2019ve learned along the way.',
    },
    {
      id: 'meticulousness',
      title: 'Meticulousness',
      description:
        'We go the distance to check and double-check our crop at every stage of its growth, taking care to make sure that every batch receives attention when needed to ensure as superb an end product as possible.',
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      description:
        'With every crop we grow, we apply our full mind to finding ways to work with nature, whether it comes to the materials we use to raise our batches to full flower, or how best to fall in step with the natural rhythms of each cycle\u2019s growth.',
    },
    {
      id: 'passion',
      title: 'Passion',
      description:
        'The craft of growing superior cannabis flowers has been our passion for two decades, and drives us to constantly be open to learning more with every season. Every plant gets our full attention and care.',
    },
    {
      id: 'quality',
      title: 'Quality',
      description:
        'With every choice of strain, we strive to meet the high standards that we hold ourselves to \u2014 and it\u2019s this that enables us to produce small-batch crops that are of a superior quality, every single time.',
    },
  ],

  /* ── Grading system ── */
  grades: [
    {
      id: 'quads',
      grade: 'AAAA',
      name: 'Quads',
      tagline: 'The best of the best!',
      description:
        'This premium cannabis ranks highest in all traits; well cured, with a pungent odour, a sharp flavour, and a smooth, clean-smelling burn & potent smoke. Our hand-selected quads are our best-trimmed buds and cost slightly more than topshelf.',
    },
    {
      id: 'topshelf',
      grade: 'AAA',
      name: 'Topshelf',
      tagline: 'Quality fitting for connoisseurs.',
      description:
        'Topshelf will exhibit an aesthetically pleasing cannabis flower structure, demonstrate desirable terpene aromas and flavours, and have a high cannabinoid content. The bud is dense and in good form. No harsh aftertaste is a good sign of this grade.',
    },
    {
      id: 'standard',
      grade: 'AA',
      name: 'Standard',
      tagline: 'Smaller buds than topshelf, but still top quality.',
      description:
        'Standard Grade has many of the same characteristics of Topshelf, but less bud density. Although it is still of excellent quality, many of the same qualities of the Topshelf bud are still present. The THC potency is also still high.',
    },
    {
      id: 'preground',
      grade: 'A+',
      name: 'Preground',
      tagline: 'Save time with fine-sieved convenience.',
      description:
        'Stretch your stash with the budtender\u2019s preground cannabis blend. We pass a blend of cannabis through a sieve to remove unwanted plant matter like stalks and seeds, giving you a smooth smoke.',
    },
    {
      id: 'budget',
      grade: 'A',
      name: 'Budget Blend',
      tagline: 'Perfect for making edibles.',
      description:
        'Budget grade is great for stretching your bud or making edibles. We do a tight trim on our Standard and Topshelf buds, which yields a lot of powdery goodness. This grade also includes some small popcorn buds \u2014 you\u2019re bound to find some gold nuggets in every jar.',
    },
  ],

  /* ── Cultivation ── */
  cultivation: [
    {
      id: 'living-soil',
      title: 'Living soil',
      description:
        'We recycle all our food waste using Bokashi bins and a worm farm composter. At the start of Spring each year, we work the organic waste into the soil, adding valuable nutrients, minerals and microorganisms for the new season of growing.',
    },
    {
      id: 'rainwater',
      title: 'Rainwater harvesting',
      description:
        'Cape Town was one of the first cities to almost run out of water in 2018. We collect rainwater and store 13,500 litres for household and growing usage. The water is pumped through a triple filter with UV light to ensure a neutral pH balance.',
    },
    {
      id: 'companion-planting',
      title: 'Companion planting',
      description:
        'Companion planting is the practice of pairing certain varieties of flora to naturally deter pests. We specifically plant basil with every cannabis plant we grow. We also use sulphur and diatomaceous earth for natural pest management.',
    },
    {
      id: 'worm-tea',
      title: 'Worm tea',
      description:
        'We brew worm compost tea every two weeks throughout the growing season using an aerobic compost tea system. The system efficiently extracts and amplifies beneficial microorganisms from the compost. It must be bubbled for 48 hours for best results.',
    },
  ],

  /* ── Harvest phases ── */
  harvest: [
    {
      id: 'flushing',
      title: 'Flushing',
      paragraphs: [
        'We start 10 days before harvest with flushing the cannabis plants. Flushing involves running water through the soil medium to remove traces of minerals and other nutrients, forcing the plant to consume stored nutrients in its final week.',
      ],
    },
    {
      id: 'drying',
      title: 'Drying',
      paragraphs: [
        'We hang the plants in darkness in the drying room, kept at 16\u201318\u00b0C with a relative humidity of 55\u201360%. A fan on low speed ensures decent air circulation to prevent mould. Once the branches snap, they are dry enough to jar.',
      ],
    },
    {
      id: 'dry-trimming',
      title: 'Dry trimming',
      paragraphs: [
        'After about 1\u20132 weeks on the drying nets, most moisture is gone. We do a very tight trim on our Standard Grade and Topshelf buds, which yields a lot of powdery goodness that we package as our Budget Grade.',
      ],
    },
    {
      id: 'curing',
      title: 'Curing',
      paragraphs: [
        'We place the dry flowers into airtight glass jars. During the first three weeks, we open the jars for ten minutes every day in a dark room. We taste the flowers every week to check their ripeness. After about 2 months we start to package and label \u2014 Homegrown Happiness!',
      ],
    },
  ],

  /* ── Packaging ── */
  packaging: [
    {
      id: 'glass',
      title: 'Glass & recycling',
      paragraphs: [
        'Our customers prefer purchasing products in glass packaging. Customers return the jars, which we sanitise and recycle for the next season\u2019s products. Glass is non-porous and impermeable, preserving the taste and aroma of our cannabis for well over a year.',
        'Glass bottles are endlessly recyclable. About 80% of recovered glass becomes new containers or other products. It\u2019s our way of saying thanks to Mother Earth.',
      ],
    },
    {
      id: 'sustainability',
      title: 'Sustainable growth',
      paragraphs: [
        'The Humans at Six Cats have an eco-friendly mindset and aim to make environmentally conscious decisions when growing, producing and dispensing our products. We grow our cannabis organically outdoors, using the natural cycles of the sun and seasons.',
      ],
    },
  ],

  /* ── The Cats ── */
  cats: [
    {
      id: 'timmy',
      name: 'Timmy',
      nickname: 'Timmmaaaahh',
      status: 'alive',
      role: 'Resident Therapy Cat',
      bio: 'Timmy is the gentle giant of the operation and the sole remaining member of the original six cats. He arrived as a stray, malnourished and cautious, and over months transformed into the most affectionate cat in the house. He has an uncanny sense for when someone needs comfort \u2014 he\u2019ll appear on your lap during a stressful work call or curl up next to you when you\u2019re feeling low. He is the unofficial emotional support officer of Six Cats. Every harvest, Timmy claims a spot in the drying room and supervises. His longevity and survival are a testament to resilience.',
    },
    {
      id: 'wendy',
      name: 'Wendy',
      nickname: 'Wendells \u2014 The Agile Matriarch',
      status: 'alive',
      role: 'Matriarch',
      bio: 'Wendy was rescued in a rainstorm at just 5 weeks old, tiny and drenched, and brought into the Six Cats family. She grew into a fast, agile, no-nonsense cat who rules the garden with quiet authority, patrolling the perimeter with the precision of a security consultant. The other cats defer to her. She loves playing soccer with rolled-up paper balls \u2014 she\u2019ll bat them across the floor for hours if you let her. Wendy\u2019s survival instinct and adaptability mirror the ethos of Six Cats itself \u2014 resourceful, resilient, and fiercely independent.',
    },
    {
      id: 'jimmy',
      name: 'Jimmy',
      nickname: 'Super Slim Jim',
      status: 'alive',
      role: 'FIV Fighter',
      bio: 'Jimmy tested positive for FIV (Feline Immunodeficiency Virus) when he arrived. The vet said to keep him comfortable. That was years ago. In late 2023, Jimmy suffered a serious illness that nearly took him \u2014 but he made a remarkable recovery that stunned everyone. He is still here, still eating, still fighting, still claiming the best sunny spot in the garden every morning. He is proof that a diagnosis is not a destiny. He requires extra care \u2014 immune-boosting supplements, regular vet checks, and isolation when he\u2019s run-down \u2014 but he gives back more than he takes. Jimmy is the most determined cat we\u2019ve ever known.',
    },
    {
      id: 'bean',
      name: 'Bean',
      nickname: 'The Survivor',
      status: 'alive',
      role: 'Rescue Cat',
      bio: 'Bean was found in January 2022 at a Wendy house at the local shopping centre, just weeks after Moe passed. His arrival felt like the universe sending a reminder that the cycle of rescue and healing continues. Bean arrived in the worst condition of any cat we\u2019ve taken in \u2014 underweight, dehydrated, covered in fleas, and terrified of humans. The first two months were slow \u2014 leaving food near his hiding spot, sitting quietly in the same room without approaching, waiting for him to decide when he was ready. When he finally climbed onto Ash\u2019s lap, it was one of the most rewarding moments of the entire Six Cats journey. Bean is now unrecognisable from the cat who arrived. He\u2019s gained weight, his coat gleams, and he greets visitors at the door like he owns the place. Because he does.',
    },
    {
      id: 'jeff',
      name: 'Jeff',
      nickname: 'The Wanderer',
      status: 'alive',
      role: 'Rescue Cat',
      bio: 'Jeff was found in May 2022 and immediately nestled into Ash\u2019s arms with a trust that felt instant and absolute. From that moment, he belonged. Jeff is the adventurer \u2014 he disappears for hours, sometimes days, returning with the air of someone who\u2019s been on a tremendous journey and has no intention of telling you about it. He\u2019s the most independent of all the cats, preferring the garden and the neighbourhood rooftops to the comfort of the couch. Jeff taught us that not every personality needs to be domesticated. Some spirits need to roam. You just make sure the door is always open for when they come home.',
    },
    {
      id: 'frank',
      name: 'Frank',
      nickname: 'Blue Eyes',
      status: 'alive',
      role: 'Stray Visitor',
      bio: 'Frank is striking \u2014 pure white with piercing blue eyes that stop visitors in their tracks. He\u2019s the most photogenic of the crew and seems to know it. Frank is gentle, almost regal, and moves through the house with an elegance the other cats lack. He arrived relatively healthy compared to the others, as though the universe decided to send us one cat who didn\u2019t need fixing. Frank is the calm at the centre of the Six Cats operation \u2014 beautiful, untroubled, and content.',
    },
    {
      id: 'lisa',
      name: 'Lisa',
      nickname: 'Granny Cat',
      status: 'memorial',
      role: 'Original Matriarch',
      bio: 'Lisa was one of the original two cats, adopted in 2003 alongside her brother Bart. She lived to a grand old age and earned the nickname Granny Cat in her final years. She was slow, dignified, and had a particular fondness for sitting in the exact spot where you needed to work. Lisa set the tone for everything that followed \u2014 the idea that rescued animals deserve not just shelter but a life of comfort and dignity. When she passed, the garden felt emptier for months.',
      datePassed: 'July 2020',
    },
    {
      id: 'moe',
      name: 'Moe',
      nickname: 'Fat-Boy-Fat',
      status: 'memorial',
      role: 'Couch Commissioner',
      bio: 'Moe earned his nickname honestly. He was enormous, unapologetic, and ate with the enthusiasm of someone who had once known hunger and decided it would never happen again. He had one particularly silly trait \u2014 he would go absolutely crazy when you blew air at him, spinning and batting at the invisible force like it was the greatest game ever invented. Moe was the comic relief of Six Cats \u2014 the cat who got stuck in places, who fell off shelves, who ate food that wasn\u2019t his and looked at you as if to say, \"And what are you going to do about it?\" Behind the comedy was a cat who had been abandoned and found safety. Moe reminded us that joy is a survival mechanism.',
      datePassed: '4 January 2022',
    },
    {
      id: 'lucy',
      name: 'Lucy',
      nickname: 'Dennis the Menace',
      status: 'memorial',
      role: 'Welcoming Committee',
      bio: 'Lucy was a cross-Burmese cat who took the role of matriarch after Lisa died. She was incredibly talkative and had a personality that could fill a stadium. She would visit everyone, sit in front of screens demanding attention, tap your face gently with her paw, and reach out to touch customers from a shelf to say hello. She was the welcoming cat \u2014 every visitor got the Lucy treatment. Nicknamed Dennis the Menace for her relentless energy, her mischief, and her ability to be in exactly the wrong place at exactly the wrong time. Lucy was the heartbeat of Six Cats. She was curious, demanding, affectionate on her terms, and utterly impossible to ignore. Her passing hit harder than any of the others. The book is dedicated to her. The green garden carries on, but it carries on with Lucy\u2019s spirit woven into every harvest.',
      datePassed: '24 October 2023',
    },
  ],

  /* ── Body sections ── */
  sections: [
    {
      id: 'the-humans',
      title: 'The humans',
      paragraphs: [
        'Six Cats was created for members to easily browse the product range and find either something to smoke or a medicinal remedy. Whether you are someone wanting to learn more on the subject, a patient with a medical condition or a veteran smoker, you\u2019re welcome in the private space.',
        'The Humans at Six Cats carry a wide range of high-quality homegrown products. The mission is to bring awareness to the way cannabis products are perceived in society, through education, accessibility and shared experience.',
      ],
    },
    {
      id: 'the-cats-intro',
      title: 'The cats \u2014 rulers of the humans',
      paragraphs: [
        'The first cats were adopted in 2003, a brother and sister called Bart and Lisa. They quickly became the mascots for the yearly harvest. Over the years, a total of 9 homeless cats have been adopted, sadly losing 3 to illness along the way.',
        'The current pack plays a vital role in the running of the homegrown operation, making the humans laugh with silly antics and giving some much-needed therapy time. They are the soul of Six Cats.',
      ],
    },
    {
      id: 'craft-cannabis',
      title: 'What craft cannabis means to us',
      paragraphs: [
        'Led by a passion for growing and consuming cannabis, we are committed to people, product quality and innovation. Our promise is simple: we will provide homegrown and homemade products, cultivated from carefully selected strains, of the highest quality.',
        'A craft product should be produced with intention, with a connection to the community it\u2019s produced in. We do all the growing and harvesting ourselves, hand-trimming with long curing times to develop a craft flower. Small-batch, hand-tended, high-quality flower grown outdoors using organic and environmentally friendly methods.',
        'From in-house skills and consistent genetic profiles to artisanal methods and locally sourced infusions \u2014 quality, trust and choice define Six Cats.',
      ],
    },
  ],

  /* ── Accessibility labels ── */
  a11y: {
    catsListLabel: 'Six Cats \u2014 cat profiles',
    memorialLabel: 'In memoriam \u2014 cats no longer with us',
    gradesLabel: 'Cannabis grading system',
    valuesLabel: 'Six Cats core values',
    cultivationLabel: 'Cultivation methods',
    harvestLabel: 'Harvest phases',
    packagingLabel: 'Packaging and sustainability',
    visionMissionLabel: 'Vision and mission',
    originStoryLabel: 'Origin Story',
    philosophyLabel: 'Philosophy',
  },
};