/**
 * =============================================================================
 *  PHOTOGRAPHY — EDIT THIS FILE ONLY (no HTML changes needed)
 * =============================================================================
 *
 *  Images: public URLs start with /photos/…  → files under:
 *           public/photos/<folder>/<filename>
 *
 *  Sections in this file:
 *    • PHOTO_BRAND / PHOTO_NAV     — logo + nav button labels
 *    • PHOTO_HOME                  — photo tab home (stats, hero, bio, carousel strip, grad teaser, series intro)
 *    • CAROUSEL_PHOTOS             — featured carousel images
 *    • SERIES                      — albums (copy + paths)
 *    • GRAD_PHOTOS                 — grad gallery filenames
 *    • PHOTO_GRAD_PAGE             — full grad booking page
 *    • PHOTO_CONTACT_GRAD          — grad contact form page
 *    • PHOTO_CONTACT_GENERAL       — general contact + socials
 *
 * =============================================================================
 */

/** Logo markup inside the cream nav bar (HTML allowed). */
export const PHOTO_BRAND = {
  logoHtml: 'Ethan<em style="font-style:italic;color:#c8a97e;">R.</em>',
};

export const PHOTO_NAV = {
  backLabel: "Back",
  homeAriaLabel: "Home",
};

/** Photo home tab (#pp): all copy + image paths. `stat.valueHtml` is raw HTML inside the big number. */
export const PHOTO_HOME = {
  stats: [
    { valueHtml: '2000<span>+</span>', label: "Images" },
    { valueHtml: '3<span>yr</span>', label: "Shooting" },
    { valueHtml: "4", label: "Genres" },
    { valueHtml: 'CANON DSLR,<span> LUMIX Mirrorless</span>', label: "Format" },
  ],
  heroModeTag: "Photography Portfolio",
  /** HTML allowed (e.g. <br>, <em>) */
  heroTitleHtml: "Light, shadow<br>and <em>time.</em>",
  heroDesc:
    "Documentary and fine-art photography — urban landscapes, portraiture, and natural environments.",
  bio: {
    /** Set to "" to show the default user icon instead of a photo */
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
    /** Hero image on the home grad strip; "" = decorative placeholder */
    teaserImageSrc: "",
    teaserImageAlt: "Graduate photos",
    eyebrow: "Class of 2025 · Now booking",
    /** HTML allowed */
    titleHtml: "Graduate <em>Photos</em>",
    desc: "Looking for grad photos? Celebrate your milestone with portraits that feel as meaningful as the moment — natural light, real locations, no stiff poses. Sessions available across Southern California.",
    ctaLabel: "View packages & book",
    placeholderCaption: "Sample portrait — golden hour",
  },
  seriesSectionTitle: "Selected series",
};

// -----------------------------------------------------------------------------
// Featured carousel — files in public/photos/featured/
// -----------------------------------------------------------------------------
export const CAROUSEL_PHOTOS = [
  // { src: "/photos/featured/shot1.jpg", caption: "Downtown LA, 5:42am" },
];

// -----------------------------------------------------------------------------
// Albums — folder on disk public/photos/<folder>/ ; images = filenames only
// -----------------------------------------------------------------------------
export const SERIES = [
  {
    id: "urban-solitude",
    title: "Urban Solitude",
    titleItalic: "Solitude",
    tag: "Street · Documentary",
    meta: "Los Angeles · 2023",
    desc: "A study of stillness within chaos — early morning streets, long shadows, and the quiet architecture of a city before it wakes. Shot over six weeks on Kodak Portra 400.",
    tags: ["35mm", "Portra 400", "Street", "Golden hour"],
    camera: "Nikon FM2",
    film: "Portra 400",
    duration: "6 weeks",
    shots: "24 images",
    folder: "/photos/urban-solitude/",
    images: [],
  },
  {
    id: "pacific-coast",
    title: "Pacific Coast Dusk",
    titleItalic: "Dusk",
    tag: "Landscape · Natural",
    meta: "California · 2024",
    desc: "Golden hour along the Pacific coastline. Long exposures, wide skies, and the last light of the day.",
    tags: ["Digital", "Golden hour", "Landscape"],
    camera: "Sony A7III",
    film: "Digital",
    duration: "3 months",
    shots: "18 images",
    folder: "/photos/pacific-coast/",
    images: [],
  },
  {
    id: "quiet-faces",
    title: "Quiet Faces",
    titleItalic: "Faces",
    tag: "Portrait · Fine-art",
    meta: "Studio · 2024",
    desc: "Candid and directed portraits — stillness, expression, and available light.",
    tags: ["Studio", "Portrait", "Film"],
    camera: "Nikon FM2",
    film: "Ilford HP5",
    duration: "Ongoing",
    shots: "30 images",
    folder: "/photos/quiet-faces/",
    images: [],
  },
  {
    id: "grid-lines",
    title: "Grid Lines",
    titleItalic: "Lines",
    tag: "Architecture · Urban",
    meta: "Downtown LA · 2023",
    desc: "The geometry of the built environment — repeating patterns, shadows on concrete, the city as abstract form.",
    tags: ["Architecture", "Urban", "35mm"],
    camera: "Nikon FM2",
    film: "Kodak T-Max",
    duration: "4 weeks",
    shots: "20 images",
    folder: "/photos/grid-lines/",
    images: [],
  },
  {
    id: "desert-intervals",
    title: "Desert Intervals",
    titleItalic: "Intervals",
    tag: "Landscape · Golden hour",
    meta: "Joshua Tree · 2023",
    desc: "Vast space, long light, and the silence of the high desert at dusk.",
    tags: ["Desert", "Landscape", "Golden hour", "35mm"],
    camera: "Nikon FM2",
    film: "Portra 400",
    duration: "2 weekends",
    shots: "22 images",
    folder: "/photos/desert-intervals/",
    images: [],
  },
  {
    id: "film-experiments",
    title: "Film Experiments",
    titleItalic: "Experiments",
    tag: "Abstract · Experimental",
    meta: "35mm analogue · 2024",
    desc: "Cross-processing, expired film, light leaks and happy accidents.",
    tags: ["Experimental", "35mm", "Analogue"],
    camera: "Various",
    film: "Mixed",
    duration: "Ongoing",
    shots: "40 images",
    folder: "/photos/film-experiments/",
    images: [],
  },
];

export const GRAD_PHOTOS = {
  folder: "/photos/grad/",
  images: [],
};

/** Full grad page (below nav). */
export const PHOTO_GRAD_PAGE = {
  heroEyebrow: "Class of 2025",
  heroTitleHtml: "Graduate <em>Photos</em>",
  heroTagline:
    "Celebrate your milestone with photos that feel as meaningful as the moment. Natural light, real locations, no stiff poses.",
  heroCtaLabel: "Book your session",
  gallerySectionLabel: "Sample gallery",
  packagesSectionLabel: "Packages",
  packages: [
    {
      name: "Essential",
      price: "$150",
      priceNote: " / session",
      featured: false,
      badge: "",
      features: ["1 hour session", "1 location", "20 edited photos", "Online gallery"],
    },
    {
      name: "Signature",
      price: "$275",
      priceNote: " / session",
      featured: true,
      badge: "Most popular",
      features: ["2 hour session", "2 locations", "50 edited photos", "Online gallery", "Print release"],
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
      a: "Sessions book up fast around graduation season. I recommend reaching out 4–6 weeks in advance to lock in your date.",
    },
    {
      q: "Where do shoots take place?",
      a: "Anywhere you'd like — your campus, a local park, the beach, downtown. I'm familiar with great spots across Southern California.",
    },
    {
      q: "How long until I get my photos?",
      a: "Edited photos delivered via online gallery within 7–10 days. Rush delivery available on request.",
    },
    {
      q: "What should I wear?",
      a: "Wear what makes you feel like yourself. Solid colors tend to photograph well. Cap and gown shots are always a great addition.",
    },
  ],
  bottomCtaLabel: "Book your session",
};

/** Grad booking contact page (form ids must stay stable for submitForm). */
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

/** General photography contact page. */
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
  /** { iconTablerClass, href, title, subtitle } — e.g. icon: "ti-brand-instagram" */
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
