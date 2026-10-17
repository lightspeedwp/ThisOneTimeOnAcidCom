/**
 * @fileoverview Press & Media Kit page mock data
 */

export const pressKitData = {
  hero: {
    title: 'Press & media kit',
    subtitle: 'Resources for organizers & journalists',
    description: 'Download high-resolution assets, official biographies, and brand guidelines for features, interviews, and festival lineups.',
    image: 'https://images.unsplash.com/photo-1652341483339-9ad5eef3ea74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcHVycGxlJTIwcGluayUyMGJsdWUlMjBhYnN0cmFjdCUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcxNjg3MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  
  bios: {
    short: {
      title: 'Short bio (50 words)',
      content: 'Ash Shaw is a Cape Town-based neon and UV makeup artist working at the intersection of psytrance, techno, and visual art. His work transforms festival-goers into living light sculptures. Strictly a personal art project \u2014 no commercial bookings. He cycles to festivals, paints on the dancefloor, and builds WordPress themes by day.',
    },
    medium: {
      title: 'Medium bio (150 words)',
      content: 'Ash Shaw is a Cape Town-based neon and UV makeup artist specialising in spontaneous face painting at psytrance and techno festivals. His work emerged from the Berlin dancefloor in July 2019 and has since become a signature presence at festivals across Europe, South Africa, and Thailand. He follows a yearly creative cycle: Cape Town (November\u2013March), Berlin (May), Koh Phangan (September\u2013November), and the roads that connect them \u2014 always by bicycle. By day, he runs LightSpeed, a WordPress agency he founded in 2003. His management style mirrors his art style: freedom, trust, and creative autonomy. Ash is Aquarius, ADHD, and deeply committed to the dancefloor as sacred space. His work is strictly non-commercial \u2014 no weddings, no corporate events, no bridal makeup. Just pure creative expression in the glow of blacklight. He is also writing a memoir titled \"This one time on acid...\" about neurodivergence, psychedelics, and the lessons learned on the festival circuit.',
    },
    long: {
      title: 'Full biography',
      content: 'Ash Shaw is a makeup artist and creative technologist based in Cape Town, South Africa. His journey began in the vibrant underground scene of 2019, where he first experimented with UV-reactive paints. Since then, he has developed a signature style that fuses "Atomic Black" minimalism with explosive neon color palettes.\n\nAsh follows an annual creative cycle that fuels his artistic energy: based in Woodstock, Cape Town, he travels to Berlin each May for the techno season, returns to South Africa in August-September to swap bicycles, then relocates to Koh Phangan, Thailand (September-November) for Muay Thai training, triathlon, and remote work before returning to Cape Town for the South African summer festival season.\n\nAsh is not just a makeup artist but a visual storyteller who believes in the transformative power of adornment. His work is strictly non-commercial and driven by artistic expression, focusing on the connection between the performer and the audience. He is a regular contributor to the visual landscape of festivals like Ozora and MoDem, and his tutorials have inspired a growing community of aspiring artists.\n\nBeyond makeup, Ash advocates for accessibility in digital spaces and sustainable artistic practices.',
    },
  },

  assets: [
    {
      id: 'headshots',
      title: 'Headshots & portraits',
      description: 'High-resolution professional photos for promotional use.',
      items: [
        { label: 'Studio portrait (color)', format: 'JPG', size: '4.2 MB' },
        { label: 'Festival action shot', format: 'JPG', size: '3.8 MB' },
        { label: 'Black & white headshot', format: 'JPG', size: '2.1 MB' },
      ]
    },
    {
      id: 'logos',
      title: 'Brand assets',
      description: 'Official logos and color palette specifications.',
      items: [
        { label: 'Logo pack (vector)', format: 'SVG/AI', size: '1.5 MB' },
        { label: 'Neon color palette', format: 'PDF', size: '0.8 MB' },
        { label: 'Brand guidelines', format: 'PDF', size: '2.5 MB' },
      ]
    }
  ],

  quotes: [
    {
      id: 'entrepreneurship',
      text: 'LightSpeed wasn\u2019t born from a business plan \u2014 it was born from a fundamental need for autonomy. The same brain that rejected boredom in school rejected being told what to do at work.',
      context: 'On founding LightSpeed at age twenty-two'
    },
    {
      id: 'makeup-legacy',
      text: 'Someone I hadn\u2019t seen in two years came up to me \u2014 I\u2019d done their makeup two years prior. That day they felt extremely special; everyone kept complimenting them and it made their day. They still remembered.',
      context: 'On the lasting impact of festival makeup'
    },
    {
      id: 'wordpress-legacy',
      text: 'I\u2019ll be remembered as the crazy South African in the WordPress community \u2014 but definitely as a passionate contributor.',
      context: 'On his 20+ years in the WordPress community'
    },
    {
      id: 'ai-transformation',
      text: 'Technology fuels me. I embrace AI daily \u2014 GitHub Copilot, ChatGPT, Claude, and MCP \u2014 bringing them together with my love for Figma prototyping, design systems, and GitHub code management. The fusion of AI, creativity, and open source has been a radical, life-changing shift.',
      context: 'On the AI workflow transformation at LightSpeed'
    }
  ],

  contact: {
    email: 'press@ashshaw.makeup',
    instagram: '@ashshaw.makeup',
    location: 'Cape Town, South Africa'
  }
};