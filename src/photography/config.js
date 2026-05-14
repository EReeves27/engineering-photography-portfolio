/**
 * Photography site copy and paths. Images live under `public/photos/…`
 * (URLs start with `/photos/…`).
 *
 * Albums (`SERIES`): set `folder` to `/photos/<dir>/`. Omit `images` (or `[]`)
 * to auto-list files in that folder at build time (`vite.config.js`). Use
 * `images: ["a.jpg"]` to pin order or a subset.
 * Optional `coverImage: "file.jpg"` sets the portfolio home card cover (basename
 * must match a file in that folder); omit to use the first image.
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
  stats: [
    { valueHtml: '2000<span>+</span>', label: "Images" },
    { valueHtml: '3<span>yr</span>', label: "Shooting" },
    { valueHtml: "Lightroom Classic", label: "Editing" },
    { valueHtml: 'CANON DSLR,<span> LUMIX Mirrorless</span>', label: "Equipment" },
  ],
  heroModeTag: "Photography Portfolio",
  heroTitleHtml: "Light, shadow<br>and <em>time.</em>",
  heroDesc:
    "Documentary and fine-art photography — urban landscapes, portraiture, and natural environments.",
  bio: {
    avatarSrc: "/photos/profile/profile_pic.jpeg",
    avatarAlt: "Ethan Reeves",
    name: "Ethan Reeves",
    role: "Photographer",
    body: "Hello! I'm from the Bay Area and currently attending UCSB. *insert more here*",
  },
  carouselSectionTitle: "Featured shots",
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
  seriesSectionTitle: "Selected series",
};

/** Featured carousel — add `{ src, caption }` entries; files in `public/photos/featured/`. */
export const CAROUSEL_PHOTOS = [];

/**
 * Curated home-page photos — individual shots shown in the immersive
 * scrolling collage. Add `{ src, alt }` entries pointing to any file
 * under `public/`. Leave empty ([]) to auto-pick one cover per series.
 *
 * Example:
 *   { src: "/photos/san-sebastian/IMG_001.jpg", alt: "San Sebastián harbour" }
 */
export const HOME_PHOTOS = [];

export const SERIES = [
  {
    title: "Solo Trip in Spain",
    titleItalic: "Solitude",
    tag: "Beach · Street · Sunset",
    meta: "San Sebastian, Spain · 2025",
    desc: "Coastal winter light, empty streets, and the rhythm of a solo walk through San Sebastian.",
    tags: ["Mirrorless", "Beach", "Street", "Golden hour"],
    camera: "LUMIX FZ80D",
    duration: "2 days",
    folder: "/photos/san-sebastian/",
  },
  {
    title: "Pacific Coast Dusk",
    titleItalic: "Dusk",
    tag: "Landscape · Natural",
    meta: "California · 2024",
    desc: "Golden hour along the Pacific coastline. Long exposures, wide skies, and the last light of the day.",
    tags: ["Digital", "Golden hour", "Landscape"],
    camera: "Sony A7III",
    duration: "3 months",
    folder: "/photos/pacific-coast/",
  },
  {
    title: "Quiet Faces",
    titleItalic: "Faces",
    tag: "Portrait · Fine-art",
    meta: "Studio · 2024",
    desc: "Candid and directed portraits — stillness, expression, and available light.",
    tags: ["Studio", "Portrait", "Film"],
    camera: "Nikon FM2",
    duration: "Ongoing",
    folder: "/photos/quiet-faces/",
  },
  {
    title: "Grid Lines",
    titleItalic: "Lines",
    tag: "Architecture · Urban",
    meta: "Downtown LA · 2023",
    desc: "The geometry of the built environment — repeating patterns, shadows on concrete, the city as abstract form.",
    tags: ["Architecture", "Urban", "35mm"],
    camera: "Nikon FM2",
    duration: "4 weeks",
    folder: "/photos/grid-lines/",
  },
  {
    title: "Desert Intervals",
    titleItalic: "Intervals",
    tag: "Landscape · Golden hour",
    meta: "Joshua Tree · 2023",
    desc: "Vast space, long light, and the silence of the high desert at dusk.",
    tags: ["Desert", "Landscape", "Golden hour", "35mm"],
    camera: "Nikon FM2",
    duration: "2 weekends",
    folder: "/photos/desert-intervals/",
  },
  {
    title: "Film Experiments",
    titleItalic: "Experiments",
    tag: "Abstract · Experimental",
    meta: "35mm analogue · 2024",
    desc: "Cross-processing, expired film, light leaks and happy accidents.",
    tags: ["Experimental", "35mm", "Analogue"],
    camera: "Various",
    duration: "Ongoing",
    folder: "/photos/film-experiments/",
  },
];

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
      href: "https://instagram.com/yourhandle",
      title: "Instagram",
      subtitle: "@yourhandle",
    },
    {
      icon: "ti-camera",
      href: "https://vsco.co/yourprofile",
      title: "VSCO",
      subtitle: "vsco.co/yourprofile",
    },
  ],
};
