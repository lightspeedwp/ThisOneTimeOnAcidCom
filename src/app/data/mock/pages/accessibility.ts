/**
 * @fileoverview Accessibility Statement mock data
 */

export const accessibilityPageData = {
  hero: {
    title: 'Accessibility statement',
    description: 'We are committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability.',
  },
  
  content: [
    {
      title: 'Our commitment',
      text: 'Ash Shaw Makeup Portfolio is built with inclusion in mind. We strive to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. Accessibility is an ongoing process, and we continuously test and improve our digital presence.'
    },
    {
      title: 'Features implemented',
      items: [
        'High Contrast Mode: A dedicated "Atomic Black" theme designed for optimal readability and reduced eye strain.',
        'Reduced Motion Support: Respects system preferences for reduced motion, disabling non-essential animations.',
        'Keyboard Navigation: Full keyboard support with visible focus indicators throughout the site.',
        'Screen Reader Optimization: Proper semantic HTML, ARIA labels, and alternative text for all meaningful images.',
        'Text Scaling: Fluid typography that responds to user font size preferences and viewport changes.',
        'Clear Focus Indicators: Enhanced focus rings for interactive elements to aid navigation.'
      ]
    },
    {
      title: 'Testing & Tools',
      text: 'We utilize a suite of developer tools to monitor compliance, including automated accessibility audits (axe-core), manual keyboard testing, and screen reader verification (VoiceOver/NVDA).'
    },
    {
      title: 'Feedback',
      text: 'We welcome your feedback on the accessibility of this site. If you encounter any barriers or have suggestions for improvement, please contact us.'
    }
  ],

  contact: {
    title: 'Contact us',
    emailLabel: 'Email: ',
    email: 'accessibility@ashshaw.makeup',
    response_time: 'We aim to respond to accessibility feedback within 3 business days.'
  }
};