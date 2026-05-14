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
  heroModeTag: "B.S. Electrical & Computer Engineering · UCSB",
  heroTitleHtml: "Building things<br>that <em>work.</em>",
  heroDesc:
    "VLSI and computer architecture, cleanroom fabrication, embedded systems, and power-grid research — from RTL to silicon.",
  bio: {
    avatarSrc: "",
    avatarAlt: "Ethan H Reeves",
    name: "Ethan H Reeves",
    role: "Electrical & Computer Engineering · UCSB · Expected June 2027",
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
