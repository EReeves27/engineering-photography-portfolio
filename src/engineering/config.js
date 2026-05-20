/**
 * =============================================================================
 *  ENGINEERING — EDIT THIS FILE ONLY (HTML shells are empty; content is built here)
 * =============================================================================
 *
 *  Images: use /photos/… → public/photos/… on disk.
 *  Resume PDF: place at `public/ethan-reeves-resume-2026.pdf` (see ENG_RESUME.pdfHref).
 *
 * =============================================================================
 */

export const ENG_NAV = {
  backLabel: "Back",
  homeAriaLabel: "Home",
  bioLabel: "Biography",
  resumeLabel: "Resume",
};

/**
 * The six layers of the computer-engineering "full stack".
 * Each layer renders in the right-hand canvas with a CRT-chrome frame and
 * domain-true illustration. Layers with `active: false` are grayed out.
 *
 * Ordinals: 1 = bottom of stack (Materials) ... 6 = top (Applications).
 * Domain tag is used purely to pick the illustration in render.
 */
export const ENG_STACK = {
  computer: {
    label: "ETHAN-R 4.7",
    promptHint: "CLICK TO BOOT",
    bootLines: [
      "HanOS BIOS — POST OK",
      "MEM 640K · CPU OK · DISK OK",
      "MOUNT /stack ............ OK",
      "READY.",
    ],
  },
  layerSectionTitle: "Layers",
  layerSectionCount: "06 / 06",
  layers: [
    {
      id: "applications",
      ordinal: 6,
      title: "Applications",
      subtitle: "What people touch",
      domain: "applications",
      active: true,
      summary:
        "End-user systems built on top of every layer below — toys you can pick up, grid testbeds you can shake.",
      projects: [
        {
          title: "Spin Master · BAIC test controllers",
          meta: "Aug–Sep 2025 · Pleasanton, CA",
          body:
            "Built controllers and embedded prototypes used by design engineers to validate mechanical behavior in electronic toys. Trimmed BOM cost by simplifying designs.",
          tags: ["Embedded", "Prototyping", "Cost engineering"],
          link: { label: "Engineering detail", pageId: "page-sw" },
        },
        {
          title: "RTDS power-grid testbed",
          meta: "Jun–Aug 2025 · UC3M Madrid",
          body:
            "Real-time hardware-in-the-loop campaigns stressing the grid under fault scenarios. Compared grid-forming vs grid-following inverter behavior for stability.",
          tags: ["RTDS", "RSCAD FX", "Power systems"],
          link: { label: "Research detail", pageId: "page-re" },
        },
      ],
    },
    {
      id: "software",
      ordinal: 5,
      title: "Software & Algorithms",
      subtitle: "Code on top of architecture",
      domain: "software",
      active: true,
      summary:
        "Firmware, DSP, and signal-processing code that turns CPUs into something useful.",
      projects: [
        {
          title: "Goleta Sound Machine",
          meta: "Oct–Dec 2023 · Teensy 4",
          body:
            "Guitar tuner and real-time effects unit on Teensy. Frequency analysis on the audio path, LCD UI, and programmable effects chain.",
          tags: ["Embedded C", "DSP", "Real-time"],
          link: { label: "Software detail", pageId: "page-sw" },
        },
      ],
    },
    {
      id: "architecture",
      ordinal: 4,
      title: "Architecture",
      subtitle: "Microarchitecture & memory",
      domain: "architecture",
      active: true,
      summary:
        "How a CPU actually executes a program: pipelines, hazards, caches, branch prediction.",
      projects: [
        {
          title: "RISC-V five-stage pipeline (Verilog)",
          meta: "Jan–Mar 2026 · Course project",
          body:
            "RV32I subset (add, addi, sub, and, andi, or, slt, slti, lw, sw, beq, jal, lui) with a hazard-aware controller, branch predictor, and a critical-word-first / prefetch cache to cut runtime.",
          tags: ["Verilog", "RV32I", "Cache", "Branch predictor"],
          link: { label: "Architecture detail", pageId: "page-sw" },
        },
      ],
    },
    {
      id: "circuits",
      ordinal: 3,
      title: "Circuits",
      subtitle: "Gates, datapaths, timing",
      domain: "circuits",
      active: true,
      summary:
        "Where transistors become logic — standard cells laid out by hand, multi-bit datapaths timed out to run within frequency constraints.",
      projects: [
        {
          title: "16-bit parallel prefix adder",
          meta: "Dec 2025 · Skywater 130 nm · 500 MHz",
          body:
            "Kogge–Stone style adder taped out at 500 MHz in Cadence Virtuoso with custom gate logic on the Skywater 130 nm PDK.",
          tags: ["Virtuoso", "PPA", "130 nm", "500 MHz"],
          link: { label: "Hardware detail", pageId: "page-hw" },
        },
        {
          title: "CMOS standard-cell layout",
          meta: "Sep–Dec 2025 · INV, NAND, NOR, MUX, XOR",
          body:
            "Hand-drawn schematic and layout for the canonical CMOS cell set; sign-off with DRC and LVS clean.",
          tags: ["Layout", "DRC", "LVS"],
          link: { label: "Hardware detail", pageId: "page-hw" },
        },
      ],
    },
    {
      id: "devices",
      ordinal: 2,
      title: "Devices",
      subtitle: "Transistors from a wafer",
      domain: "devices",
      active: true,
      summary:
        "An NMOS that actually switches, fabricated from raw silicon in the UCSB cleanroom.",
      projects: [
        {
          title: "Fabricated NMOS + passives",
          meta: "Jan–Mar 2026 · UCSB Engineering II cleanroom",
          body:
            "Full process flow: masking, photolithography, doping, etch, thermal oxide growth, and metal deposition — followed by electrical test of NMOS, resistor, and capacitor.",
          tags: ["Cleanroom", "Photolithography", "Doping", "Electrical test"],
          link: { label: "Hardware detail", pageId: "page-hw" },
        },
      ],
    },
    {
      id: "materials",
      ordinal: 1,
      title: "Materials",
      subtitle: "Atoms, lattices, transport",
      domain: "materials",
      active: true,
      summary:
        "The thing the whole stack is made of — modeled at first-principles to ask what comes after copper.",
      projects: [
        {
          title: "Cu/Ru vs monolayer graphene interconnects",
          meta: "Jan–Mar 2026 · Synopsys QuantumATK",
          body:
            "Resistivity models for Cu/Ru nanowires with temperature effects, plus graphene monolayer resistivity simulated in QuantumATK — benchmarked against conventional back-end-of-line stacks.",
          tags: ["QuantumATK", "DFT-ish", "Transport modeling"],
          link: { label: "Research detail", pageId: "page-re" },
        },
      ],
    },
  ],
};

export const ENG_BIOGRAPHY = {
  eyebrow: "Biography",
  name: "Ethan H Reeves",
  tagline: "Building things across the full stack of computer engineering.",
  avatarSrc: "",
  avatarAlt: "Ethan H Reeves",
  story: [
    {
      heading: "Where I'm coming from",
      body:
        "I'm a third-year in Computer Engineering at UCSB, based out of the Bay Area. I love solving problems, and especially as a computer engineer toward problems that touch more than one layer of the stack at once — the kind that need a circuit person to talk to a firmware person without losing the plot.",
    },
    {
      heading: "What I've been working on",
      body:
        "Recent work has spanned cleanroom fabrication of a working NMOS, a 500 MHz parallel prefix adder in Cadence Virtuoso, a Verilog RISC-V pipeline with cache and branch prediction, and a summer of real-time grid testing on an RTDS simulator at UC3M Madrid. Earlier, I built a guitar tuner and effects unit on Teensy and spent a summer prototyping electronic toys at Spin Master.",
    },
    {
      heading: "Outside of school",
      body:
        "President of UCSB Theta Tau, co-historian for TASA, and a fairly serious photographer (see the other side of this site). Off-screen: guitar, piano (Liszt and Debussy mostly), reading, soccer, surfing, swimming.",
    },
  ],
  facts: [
    { valueHtml: "06", label: "Projects shipped" },
    { valueHtml: "02", label: "Industry / research" },
    { valueHtml: "3.76", label: "GPA · College of Engineering" },
    { valueHtml: '15<span>+</span>', label: "Tools & labs" },
  ],
  ctas: [
    { label: "View resume", icon: "ti-file-cv", pageId: "page-resume" },
    { label: "LinkedIn", icon: "ti-brand-linkedin", href: "https://linkedin.com/in/ethanhreeves" },
    { label: "Email", icon: "ti-mail", href: "mailto:ethanhreeves@engineering.ucsb.edu" },
  ],
};

export const ENG_NAV_THEMES = {
  sw: { backStyle: "background:#4f8ef7;color:#0d0d1a;", logoEm: "#4f8ef7" },
  hw: { backStyle: "background:#5dcaa5;color:#04342c;", logoEm: "#5dcaa5" },
  re: { backStyle: "background:#7f77dd;color:#26215c;", logoEm: "#afa9ec" },
  resume: { backStyle: "background:#4f8ef7;color:#0d0d1a;", logoEm: "#4f8ef7" },
};

export const ENG_HOME = {
  stats: [
    { valueHtml: "06", label: "Projects" },
    { valueHtml: "02", label: "Experience" },
    { valueHtml: "3.76", label: "GPA" },
    { valueHtml: '15<span>+</span>', label: "Tools & labs" },
  ],
  heroModeTag: "B.S. Computer Engineering · UCSB",
  heroTitleHtml: "Building things<br>that <em>work.</em>",
  heroDesc:
    "VLSI and computer architecture, cleanroom fabrication, embedded systems, and power-grid research — from RTL to silicon.",
  bio: {
    avatarSrc: "",
    avatarAlt: "Ethan H Reeves",
    name: "Ethan H Reeves",
    role: "Candidate for B.S. Computer Engineering · UCSB · Expected June 2027",
    body: "Based in Pleasanton, CA. Coursework spans high-speed IC design, VLSI, computer architecture, OS, and cleanroom fabrication. Research experience in Madrid on real-time grid testing (RTDS) and interconnect modeling.",
  },
  resumeButtonLabel: "View resume",
  worksSectionTitle: "Selected work",
  worksProjectCountLabel: "06 projects",
  projectCards: [
    {
      pageId: "page-hw",
      thumbnailInnerHtml:
        '<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><rect x="8" y="10" width="34" height="30" rx="3" stroke="#5dcaa5" stroke-width="1" opacity=".45"/><rect x="14" y="16" width="22" height="8" rx="1" fill="#5dcaa5" opacity=".25"/><circle cx="25" cy="32" r="4" fill="#5dcaa5" opacity=".55"/></svg>',
      catClass: "cat-hw",
      category: "Fabrication",
      title: "Working NMOS from wafer",
      subtitle: "UCSB cleanroom · Jan–Mar 2026",
      thumbnailSrc: "",
      thumbnailAlt: "",
      viewLinkStyle: "color:#5dcaa5;",
    },
    {
      pageId: "page-re",
      thumbnailInnerHtml:
        '<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><path d="M8 38 L18 14 L28 28 L38 10 L42 38" stroke="#afa9ec" stroke-width="1.3" fill="none" opacity=".75"/><circle cx="18" cy="14" r="2.5" fill="#afa9ec"/></svg>',
      catClass: "cat-re",
      category: "Research",
      title: "Cu vs graphene interconnects",
      subtitle: "QuantumATK & modeling · Jan–Mar 2026",
      thumbnailSrc: "",
      thumbnailAlt: "",
      viewLinkStyle: "color:#afa9ec;",
    },
    {
      pageId: "page-sw",
      thumbnailInnerHtml:
        '<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><rect x="10" y="12" width="30" height="8" rx="2" fill="#4f8ef7" opacity=".35"/><rect x="10" y="24" width="14" height="8" rx="2" fill="#4f8ef7" opacity=".5"/><rect x="26" y="24" width="14" height="8" rx="2" fill="#4f8ef7" opacity=".35"/><rect x="10" y="36" width="30" height="6" rx="2" fill="#4f8ef7" opacity=".25"/></svg>',
      catClass: "cat-sw",
      category: "Architecture",
      title: "RISC-V pipeline in Verilog",
      subtitle: "Cache & branch predictor · Jan–Mar 2026",
      thumbnailSrc: "",
      thumbnailAlt: "",
      viewLinkStyle: "",
    },
    {
      pageId: "page-hw",
      thumbnailInnerHtml:
        '<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><path d="M10 40 L16 12 L25 28 L34 10 L40 40" stroke="#5dcaa5" stroke-width="1.2" fill="none" opacity=".7"/></svg>',
      catClass: "cat-hw",
      category: "Analog / digital IC",
      title: "500 MHz parallel prefix adder",
      subtitle: "Skywater 130 nm · Dec 2025",
      thumbnailSrc: "",
      thumbnailAlt: "",
      viewLinkStyle: "color:#5dcaa5;",
    },
    {
      pageId: "page-hw",
      thumbnailInnerHtml:
        '<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><rect x="12" y="12" width="26" height="26" rx="2" stroke="#5dcaa5" stroke-width="1" opacity=".5"/><path d="M18 25 h14 M25 18 v14" stroke="#5dcaa5" stroke-width="1.2" opacity=".6"/></svg>',
      catClass: "cat-hw",
      category: "Layout",
      title: "CMOS gates in Virtuoso",
      subtitle: "INV, NAND, NOR, MUX, XOR · Sep–Dec 2025",
      thumbnailSrc: "",
      thumbnailAlt: "",
      viewLinkStyle: "color:#5dcaa5;",
    },
    {
      pageId: "page-sw",
      thumbnailInnerHtml:
        '<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><circle cx="25" cy="22" r="8" stroke="#4f8ef7" stroke-width="1" opacity=".55"/><path d="M12 38 Q25 28 38 38" stroke="#4f8ef7" stroke-width="1.1" fill="none" opacity=".5"/></svg>',
      catClass: "cat-sw",
      category: "Embedded",
      title: "Goleta Sound Machine",
      subtitle: "Teensy · tuner & effects · Oct–Dec 2023",
      thumbnailSrc: "",
      thumbnailAlt: "",
      viewLinkStyle: "",
    },
  ],
};

const SCHEMATIC_SW_HTML =
  '<svg width="260" height="110" viewBox="0 0 260 110" fill="none"><rect x="20" y="22" width="70" height="36" rx="4" fill="#0d1a2e" stroke="#378add" stroke-width=".9"/><text x="55" y="44" font-size="8" fill="#85b7eb" text-anchor="middle" font-family="monospace">IF/ID</text><rect x="110" y="22" width="70" height="36" rx="4" fill="#0d1a2e" stroke="#4f8ef7" stroke-width="1"/><text x="145" y="44" font-size="8" fill="#85b7eb" text-anchor="middle" font-family="monospace">EXE</text><rect x="200" y="22" width="40" height="36" rx="4" fill="#0d1a2e" stroke="#378add" stroke-width=".8"/><text x="220" y="44" font-size="7" fill="#85b7eb" text-anchor="middle" font-family="monospace">MEM</text><rect x="70" y="68" width="120" height="28" rx="4" fill="#0d1a2e" stroke="#378add" stroke-width=".8"/><text x="130" y="86" font-size="8" fill="#85b7eb" text-anchor="middle" font-family="monospace">Cache / prefetch</text><line x1="90" y1="40" x2="110" y2="40" stroke="#4f8ef7" stroke-width=".8" opacity=".7"/><line x1="180" y1="40" x2="200" y2="40" stroke="#4f8ef7" stroke-width=".8" opacity=".7"/></svg>';
const SCHEMATIC_HW_HTML =
  '<svg width="260" height="110" viewBox="0 0 260 110" fill="none"><rect x="30" y="28" width="90" height="54" rx="4" fill="#0d1a14" stroke="#1d9e75" stroke-width="1.1"/><text x="75" y="52" font-size="8" fill="#5dcaa5" text-anchor="middle" font-family="monospace">NMOS / CMOS</text><text x="75" y="66" font-size="7" fill="#1d9e75" text-anchor="middle" font-family="monospace">Skywater 130 nm</text><rect x="150" y="30" width="80" height="22" rx="3" fill="#0d1a14" stroke="#1d9e75" stroke-width=".7" opacity=".85"/><text x="190" y="45" font-size="7" fill="#5dcaa5" text-anchor="middle" font-family="monospace">DRC / LVS</text><rect x="150" y="60" width="80" height="22" rx="3" fill="#0d1a14" stroke="#1d9e75" stroke-width=".7" opacity=".85"/><text x="190" y="75" font-size="7" fill="#5dcaa5" text-anchor="middle" font-family="monospace">Cleanroom</text></svg>';

export const ENG_PAGE_SW = {
  navTheme: "sw",
  catBadgeStyle: "background:#0d1a2e;color:#85b7eb;border:.5px solid #378add;",
  catBadgeText: "Architecture & embedded",
  titleHtml: 'RTL, audio & <em style="color:#4f8ef7;">prototyping</em>',
  sub: "RISC-V five-stage pipeline in Verilog with cache and branch prediction, a Teensy-based guitar tuner and effects unit, and embedded prototyping at Spin Master’s Bay Area Innovation Center.",
  buttons: [
    {
      style: "background:#4f8ef7;color:#0d0d1a;border:none;",
      icon: "ti-brand-linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/ethanhreeves",
    },
    {
      style: "border:.5px solid #2a2a40;color:#e8eaf6;",
      icon: "ti-mail",
      label: "Email",
      href: "mailto:ethanhreeves@engineering.ucsb.edu",
    },
  ],
  schematic: { kind: "svg", html: SCHEMATIC_SW_HTML },
  chipsSectionTitle: "Tools & languages",
  chips: [
    { label: "Verilog", color: "#85b7eb" },
    { label: "Teensy", color: "#85b7eb" },
    { label: "C / C++", color: "#85b7eb" },
    { label: "Assembly (RISC-V)", color: "#85b7eb" },
    { label: "Embedded C", color: "#85b7eb" },
  ],
  metricsSectionTitle: "Highlights",
  metrics: [
    { valueHtml: "RV32I", label: "ISA subset" },
    { valueHtml: '16<span style="color:#4f8ef7;">bit</span>', label: "Parallel audio path" },
    { valueHtml: "RT", label: "Effects & tuner" },
    { valueHtml: "2023", label: "Goleta build" },
  ],
  featuresSectionTitle: "What I shipped",
  featureBulletColor: "#4f8ef7",
  features: [
    "RISC-V pipeline supporting add, addi, sub, and, andi, or, slt, slti, lw, sw, beq, jal, and lui — controller, branch predictor, and critical-word-first / prefetch cache to cut runtime.",
    "Goleta Sound Machine: guitar tuner and effects on Teensy with real-time frequency analysis, LCD UI, and programmable audio effects.",
    "Spin Master BAIC (Aug–Sep 2025): built test controllers for electronic toys, wrote embedded bring-up code, and trimmed BOM cost by simplifying designs.",
  ],
  timelineSectionTitle: "Timeline",
  timelineDotColor: "#4f8ef7",
  timeline: [
    {
      date: "Aug–Sep 2025",
      title: "Spin Master · Engineering intern",
      sub: "Controllers, embedded prototypes, cost-aware design",
    },
    {
      date: "Jan–Mar 2026",
      title: "RISC-V CPU · Course project",
      sub: "Pipeline, cache hierarchy, branch prediction",
    },
    {
      date: "Oct–Dec 2023",
      title: "Goleta Sound Machine",
      sub: "Teensy audio path and UI",
    },
  ],
};

export const ENG_PAGE_HW = {
  navTheme: "hw",
  catBadgeStyle: "background:#1a2a1a;color:#5dcaa5;border:.5px solid #1d9e75;",
  catBadgeText: "VLSI & fabrication",
  titleHtml: 'From layout to <em style="color:#5dcaa5;">silicon</em>',
  sub: "Cleanroom fabrication of a working NMOS (plus resistor and capacitor), Skywater 130 nm standard-cell layout through DRC/LVS, and a 500 MHz 16-bit parallel prefix adder in Cadence Virtuoso.",
  buttons: [
    {
      style: "background:#5dcaa5;color:#04342c;border:none;",
      icon: "ti-brand-linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/ethanhreeves",
    },
    {
      style: "border:.5px solid #2a2a40;color:#e8eaf6;",
      icon: "ti-mail",
      label: "Email",
      href: "mailto:ethanhreeves@engineering.ucsb.edu",
    },
  ],
  schematic: { kind: "svg", html: SCHEMATIC_HW_HTML },
  chipsSectionTitle: "Stack",
  chips: [
    { label: "Cadence Virtuoso", color: "#5dcaa5" },
    { label: "Skywater 130 nm", color: "#5dcaa5" },
    { label: "DRC / LVS", color: "#5dcaa5" },
    { label: "Cleanroom flow", color: "#5dcaa5" },
    { label: "HSPICE", color: "#5dcaa5" },
  ],
  featuresSectionTitle: "Build highlights",
  featureBulletColor: "#5dcaa5",
  features: [
    "Fabricated working NMOS, resistor, and capacitor from a silicon wafer in the UCSB Engineering II cleanroom — masking, metrology, doping, etch, oxide growth, and metal deposition.",
    "16-bit Kogge–Stone style parallel prefix adder taped out at 500 MHz with custom gate logic on Skywater 130 nm.",
    "Layout for INV, NAND, NOR, MUX, and XOR cells; sign-off with DRC and LVS.",
  ],
  metricsSectionTitle: "Specs",
  metrics: [
    { valueHtml: '500<span style="color:#5dcaa5;">MHz</span>', label: "Adder target" },
    { valueHtml: "130", label: "Process (nm)" },
    { valueHtml: "5", label: "Gate types (std cell)" },
    { valueHtml: "NMOS", label: "Active device demo" },
  ],
  timelineSectionTitle: "Milestones",
  timelineDotColor: "#5dcaa5",
  timeline: [
    {
      date: "Sep–Dec 2025",
      title: "CMOS gate layout",
      sub: "Skywater PDK, DRC/LVS clean",
    },
    {
      date: "Dec 2025",
      title: "Parallel prefix adder",
      sub: "Virtuoso schematic + layout",
    },
    {
      date: "Jan–Mar 2026",
      title: "Student fabrication run",
      sub: "NMOS + passives on wafer",
    },
  ],
};

export const ENG_PAGE_RE = {
  navTheme: "re",
  catBadgeStyle: "background:#2a1a2e;color:#afa9ec;border:.5px solid #7f77dd;",
  catBadgeText: "Research",
  titleHtml: 'Grid testing & <em style="color:#afa9ec;">interconnects</em>',
  sub: "Undergraduate researcher at Universidad Carlos III de Madrid on real-time power-grid experiments, plus an independent study modeling copper/ruthenium versus monolayer graphene interconnects.",
  buttons: [
    {
      style: "background:#7f77dd;color:#26215c;border:none;",
      icon: "ti-brand-linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/ethanhreeves",
    },
    {
      style: "border:.5px solid #2a2a40;color:#e8eaf6;",
      icon: "ti-mail",
      label: "Email",
      href: "mailto:ethanhreeves@engineering.ucsb.edu",
    },
  ],
  abstractTitleStyle: "color:#afa9ec;",
  abstractSectionTitle: "Summary",
  abstractText:
    "At UC3M I collaborated on RTDS-based experiments to stress the power grid under faults, contrasting grid-forming and grid-following inverters for stability. Separately I built resistivity models for Cu/Ru nanowires and simulated graphene interconnects in Synopsys QuantumATK to compare performance at finite temperature.",
  findingsSectionTitle: "Focus areas",
  findings: [
    {
      num: "Grid 01",
      text: "RTDS simulator campaigns for fault events and real-time protection validation.",
      sub: "Grid-forming vs grid-following inverter behavior",
    },
    {
      num: "Interconnect 02",
      text: "Cu/Ru resistance models with nanowire and temperature effects; graphene monolayer resistivity from QuantumATK.",
      sub: "Benchmarked against conventional backend stacks",
    },
  ],
  metricsSectionTitle: "Context",
  metrics: [
    { valueHtml: "RTDS", label: "Lab platform" },
    { valueHtml: "RSCAD", label: "Automation FX" },
    { valueHtml: "QM", label: "QuantumATK studies" },
    { valueHtml: "Jun–Aug", label: "2025 · Madrid" },
  ],
};

export const ENG_RESUME = {
  nameHtml: 'Ethan <em>H Reeves</em>',
  tagline: "B.S. Electrical & Computer Engineering · UCSB · GPA 3.76",
  pdfHref: "/ethan-reeves-resume-2026.pdf",
  contacts: [
    { icon: "ti-mail", text: "ethanhreeves@engineering.ucsb.edu", href: "mailto:ethanhreeves@engineering.ucsb.edu" },
    { icon: "ti-phone", text: "+1 (925) 353-0613", href: "tel:+19253530613" },
    { icon: "ti-map-pin", text: "Pleasanton, CA" },
    { icon: "ti-brand-linkedin", text: "linkedin.com/in/ethanhreeves", href: "https://linkedin.com/in/ethanhreeves" },
  ],
  educationSectionTitle: "Education",
  education: [
    {
      title: "B.S. Electrical & Computer Engineering",
      dateRange: "Sep 2023 – June 2027 (expected)",
      orgLine: "University of California, Santa Barbara · College of Engineering · GPA 3.76 / 4.00",
    },
  ],
  courseworkSectionTitle: "Relevant coursework",
  coursework: [
    "High Speed IC Design (M.S. level)",
    "Nanoelectronic Device Physics",
    "VLSI Design I & II (in progress)",
    "Computer Architecture I & II (in progress)",
    "Integrated Circuit Fabrication (cleanroom labs)",
    "Data Structures & Algorithms",
    "Operating Systems (in progress)",
    "Sensor / Peripheral Design (in progress)",
  ],
  experienceSectionTitle: "Experience",
  experience: [
    {
      title: "Engineering Intern",
      dateRange: "Aug–Sep 2025",
      orgLine: "Spin Master · Bay Area Innovation Center · Pleasanton, CA",
      body: "Assembled controllers used by design engineers to validate mechanical behavior in electronic toys. Built prototypes with embedded firmware and simplified designs to reduce component count and cost.",
    },
    {
      title: "Electrical Engineering Undergraduate Researcher",
      dateRange: "Jun–Aug 2025",
      orgLine: "Universidad Carlos III de Madrid · Madrid, Spain",
      body: "Developed real-time testing protocols for the power grid using an RTDS simulator; modeled fault scenarios. Studied grid-forming versus grid-following inverters for stability and fault tolerance.",
    },
  ],
  projectsSectionTitle: "Projects",
  projects: [
    { title: "Fabricated working NMOS from silicon wafer", meta: "Jan–Mar 2026 · Cleanroom fabrication & electrical test" },
    { title: "Research paper — Cu vs graphene interconnects", meta: "Jan–Mar 2026 · QuantumATK & analytical models" },
    { title: "Working RISC-V pipeline processor in Verilog", meta: "Jan–Mar 2026 · Cache + branch predictor" },
    { title: "Parallel prefix adder in Cadence Virtuoso", meta: "Dec 2025 · 500 MHz · Skywater 130 nm" },
    { title: "Layout of CMOS logic gates in Virtuoso", meta: "Sep–Dec 2025 · INV, NAND, NOR, MUX, XOR" },
    { title: "Goleta Sound Machine", meta: "Oct–Dec 2023 · Teensy · tuner & effects" },
  ],
  skillsSectionTitle: "Technical skills",
  skills: [
    "Cadence Virtuoso",
    "Logisim",
    "HSPICE",
    "Quartus II",
    "QuantumATK",
    "ModelSim",
    "Verilog",
    "SystemVerilog",
    "C",
    "C++",
    "Python",
    "Java",
    "SPICE",
    "Assembly (6502 / RISC-V)",
    "Cleanroom fabrication",
    "CMOS layout",
    "FPGA",
    "Fusion 360",
    "Git",
    "RTDS",
    "RSCAD FX",
    "Teensy",
    "Oscilloscope",
    "Soldering",
  ],
  extrasSectionTitle: "Leadership & interests",
  extrasText:
    "UCSB Theta Tau — President (Jun 2025–present). UCSB TASA — Co-Historian / photographer (Jun 2025–present). Interests: guitar, photography (@ethan_r.photo), piano (Liszt, Debussy), reading, soccer, surfing, swimming.",
  downloadLabel: "Download PDF",
};

/**
 * Live vinyl cover art from Spotify (via Cloudflare Worker).
 * Public Worker URL (not secret). Override with VITE_SPOTIFY_RECENT_URL at build if needed.
 */
const SPOTIFY_WORKER_RECENT_URL =
  "https://eng-spotify-vinyl.ethanhreeves.workers.dev/recent";

export const ENG_SPOTIFY = {
  recentUrl: import.meta.env.VITE_SPOTIFY_RECENT_URL || SPOTIFY_WORKER_RECENT_URL,
  /** Re-fetch interval (ms); 0 = only on load */
  refreshMs: 5 * 60 * 1000,
};
