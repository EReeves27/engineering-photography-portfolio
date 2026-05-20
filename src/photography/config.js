/**
 * Photography site copy and paths. Images live under `public/photos/…`
 * (URLs start with `/photos/…`).
 *
 * Home gallery (`HOME_PHOTOS`): drop images in `public/photos/home-photos/`.
 * Omit `images` (or `[]`) to auto-list files at build time (`vite.config.js`).
 * Use `images: ["a.jpg", "b.jpg"]` to pin order or a subset.
 *
 * Grad gallery (`GRAD_PHOTOS`): same rule for `public/photos/grad/`.
 */

export const PHOTO_BRAND = {
  logoHtml: 'Ethan<em style="font-style:italic;color:#c8a97e;">R.</em>',
};

export const PHOTO_NAV = {
  backLabel: "Back",
  homeAriaLabel: "Home",
};

export const PHOTO_HOME = {
  heroModeTag: "Photography Portfolio",
  bio: {
    avatarSrc: "/photos/profile/profile_pic.jpeg",
    avatarAlt: "Ethan Reeves",
    name: "Ethan Reeves",
    role: "Photographer",
    body: "Hello! I'm from the Bay Area and currently attending UCSB. *insert more here*",
    /**
     * Up to 3 photos shown side-by-side on the Bio page.
     * Point to any file under public/ (e.g. "/photos/profile/…").
     * Leave as [] to show placeholders.
     */
    photos: [
      "/photos/profile/profile_pic.jpeg",
    ],
    aboutTitle: "About Me",
  },
  gradStrip: {
    sectionTitle: "Graduate photos",
    seeAllLabel: "See all ›",
    teaserImageSrc: "",
    teaserImageAlt: "Graduate photos",
    eyebrow: "Class of 2025 · Now booking",
    titleHtml: "Graduate <em>Photos</em>",
    desc: "Looking for grad photos? Celebrate your milestone with portraits that feel as meaningful as the moment — natural light, real locations, no stiff poses. Sessions available across Southern California.",
    ctaLabel: "View packages & book",
    placeholderCaption: "Sample portrait — golden hour",
  },
};

/**
 * Home scroll gallery — auto-loads every image in `public/photos/home-photos/`.
 * Drop .jpg / .png / .webp files there; no manual list needed.
 * Optional: set `images: ["a.jpg", "b.jpg"]` to pin order or use a subset only.
 */
export const HOME_PHOTOS = {
  folder: "/photos/home-photos/",
  images: [],
};

/** Grad sample gallery. Omit `images` (or `[]`) to auto-fill from `public/photos/grad/` at build time. */
export const GRAD_PHOTOS = {
  folder: "/photos/grad/",
};

export const PHOTO_GRAD_PAGE = {
  heroEyebrow: "Class of 2026",
  heroTitleHtml: "Graduate <em>Photos</em>",
  heroTagline:
    "Celebrate your milestone with photos that feel as meaningful as the moment!",
  heroCtaLabel: "Book your session",
  gallerySectionLabel: "Sample gallery",
  packagesSectionLabel: "Packages",
  packages: [
    {
      name: "Solo",
      price: "$125",
      priceNote: " / session",
      featured: false,
      badge: "",
      features: ["2 hour session", "2 location", "Edited photos", "Online gallery"],
    },
    {
      name: "Group (2+)",
      price: "$100 / person",
      priceNote: " / session",
      featured: true,
      badge: "Most popular",
      features: ["3 hour session", "3 locations", "Solo photos for everyone", "Group photos", "Edited photos", "Online gallery"],
    },
  ],
  testimonialsSectionLabel: "What past clients say",
  testimonials: [
    {
      text: '"Ethan made the whole session feel relaxed and fun. The photos came out better than I ever imagined — my family cried."',
      attribution: "— Maya L., Class of 2024",
    },
    {
      text: '"Booked the Signature package and it was worth every penny. Beautiful light, great locations, and fast turnaround."',
      attribution: "— Jordan K., Class of 2024",
    },
  ],
  faqSectionLabel: "FAQ",
  faq: [
    {
      q: "When should I book?",
      a: "Sessions book up fast around graduation season. I recommend reaching out 2-4 weeks in advance to lock in your date.",
    },
    {
      q: "Where do shoots take place?",
      a: "Anywhere you'd like! At UCSB, I've done Henley Gate, Devs Beanch, Coal Oil Point, Goleta Beach, the Library, and DP!",
    },
    {
      q: "How long until I get my photos?",
      a: "Edited photos delivered via online gallery within 7–14 days. Rush delivery available on request.",
    },
    {
      q: "What should I wear?",
      a: "Wear what makes you feel like yourself!",
    },
  ],
  bottomCtaLabel: "Book your session",
};

export const PHOTO_CONTACT_GRAD = {
  eyebrow: "Grad photo booking",
  headingHtml: "Book your <em>session</em>",
  sub:
    "Fill out the form below and I'll get back to you within 24 hours to confirm your date and details.",
  emailNote: "Submissions go directly to your-email@placeholder.com",
  fields: {
    nameLabel: "Your name",
    namePlaceholder: "Full name",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell me your grad date, preferred location, or any questions...",
  },
  submitLabel: "Send booking request",
  successTitle: "Request sent.",
  successBody: "I'll be in touch within 24 hours to confirm your session details.",
};

export const PHOTO_CONTACT_GENERAL = {
  eyebrow: "Photography enquiries",
  headingHtml: "Get in <em>touch</em>",
  sub: "Whether it's a print inquiry, a collaboration, or just to say hello — I'd love to hear from you.",
  emailNote: "Submissions go directly to your-email@placeholder.com",
  fields: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message",
    messagePlaceholder: "What's on your mind?",
  },
  submitLabel: "Send message",
  successTitle: "Message sent.",
  successBody: "Thanks for reaching out — I'll get back to you within a day or two.",
  socialsTitle: "Find me elsewhere",
  socialLinks: [
    {
      icon: "ti-brand-instagram",
      href: "https://www.instagram.com/ethan_r.photo/",
      title: "Instagram",
      subtitle: "@ethan_r.photo",
    }
  ],
};
