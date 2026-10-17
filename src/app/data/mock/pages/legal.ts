/**
 * @fileoverview Legal pages content data
 * Privacy Policy and Terms of Service
 * 
 * @module data/mock/pages/legal
 */

export const privacyPolicy = {
  title: "Privacy Policy",
  lastUpdated: "February 2026",
  intro: "Ash Shaw Makeup Portfolio is a personal art project. We respect your privacy and are committed to transparency regarding any data interaction.",
  sections: [
    {
      heading: "1. Introduction",
      content: "This website is a personal portfolio showcasing artistic work. It is not a commercial e-commerce site. We do not sell user data, nor do we use it for advertising purposes."
    },
    {
      heading: "2. Data We Collect",
      content: "We collect minimal data to ensure the website functions correctly and to facilitate communication:",
      list: [
        "<strong>Contact Form Data:</strong> If you use the contact form, we receive the name and email address you provide solely to reply to your message.",
        "<strong>Technical Data:</strong> Standard server logs (IP address, browser type) used for security and debugging purposes only.",
        "<strong>Analytics:</strong> We use local, privacy-focused analytics to understand which art pieces are most popular. This data is anonymized."
      ]
    },
    {
      heading: "3. How We Use Your Data",
      content: "Any data collected is used strictly for:",
      list: [
        "Responding to your inquiries or collaboration requests.",
        "Improving the technical performance of the portfolio.",
        "Ensuring the security of the website."
      ]
    },
    {
      heading: "4. Third-Party Services",
      content: "We may use trusted third-party services for specific functionality:",
      list: [
        "<strong>Typeform:</strong> Used for the contact form. Please refer to Typeform's privacy policy for details on how they handle form submissions.",
        "<strong>Unsplash:</strong> Used for image assets. No personal data is shared with Unsplash by visiting this site."
      ]
    },
    {
      heading: "5. Contact Details",
      content: "For any privacy-related questions, please contact me via the contact form on this website."
    }
  ]
};

export const termsOfService = {
  title: "Terms & Conditions",
  lastUpdated: "February 2026",
  sections: [
    {
      heading: "1. Introduction",
      content: "Welcome to the Ash Shaw Makeup Portfolio. This website is a personal art project displayed for inspirational and educational purposes."
    },
    {
      heading: "2. Intellectual Property",
      content: "All artwork, makeup designs, photographs, and content displayed on this website are the intellectual property of Ash Shaw unless otherwise credited. The 'Neon vs Atomic Black' aesthetic and associated branding are proprietary.",
      list: [
        "You may view and share links to this content for personal, non-commercial use.",
        "You must not reproduce, sell, or distribute high-resolution images without explicit written permission.",
        "Press and media usage is permitted only in accordance with the guidelines in the <a href='/press'>Press Kit</a>."
      ]
    },
    {
      heading: "3. Non-Commercial Nature",
      content: "This website is strictly for portfolio display. No commercial services, booking facilities, or products are offered directly through this site. Any mention of collaboration or availability refers to artistic partnerships and is not a commercial transaction processed here."
    },
    {
      heading: "4. User Conduct",
      content: "Visitors agree to use this website respectfully. Harassment, spamming via the contact form, or attempts to compromise the site's security are strictly prohibited."
    },
    {
      heading: "5. Disclaimer",
      content: "The content is provided 'as is'. While I strive for accuracy in my tutorials and posts, I accept no liability for any reliance placed on the information provided."
    }
  ]
};
