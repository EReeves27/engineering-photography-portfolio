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
 * Each layer has projects; optional `more: { paragraphs, bullets }` expands
 * in-place on the stack (no separate detail pages).
 *
 * Ordinals: 1 = bottom of stack (Materials) ... 6 = top (Applications).
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
        "End-user systems built on top of every layer below — toys you can pick up, doors that open themselves, grids you can stress-test.",
      projects: [
        {
          title: "Spin Master · BAIC engineering intern",
          meta: "Jun 2026–present · Aug–Sep 2025 · Pleasanton, CA",
          body:
            "Returning engineering intern at Spin Master’s Bay Area Innovation Center. First tour: assembled test controllers, wrote embedded bring-up code, and brought mechanical toy animations to life with digital circuits. Now owning a full prototype from start to finish.",
          tags: ["Embedded", "Prototyping", "Toy electronics"],
          more: {
            paragraphs: [
              "Aug–Sep 2025: assembled controllers for design engineers to test mechanical and digital toy behavior, wrote embedded software to exercise prototype circuits, and created digital circuits that drove mechanical animations and toy features.",
              "Jun 2026–present: returned as an Engineering Intern to take a full project prototype from start to finish over the summer.",
            ],
            bullets: [
              "Test controllers for mechanical + digital validation of electronic toys",
              "Embedded firmware to bring up and improve prototype circuits",
              "Digital circuits that animate mechanical toy features",
              "Returning 2026: end-to-end ownership of a full summer prototype",
            ],
          },
        },
        {
          title: "RTDS power-grid testbed",
          meta: "Jun–Aug 2025 · UC3M Madrid",
          body:
            "International research internship developing real-time grid testing protocols. Modeled fault events on an RTDS and compared grid-forming vs grid-following inverters as renewables replace classical generators.",
          tags: ["RTDS", "RSCAD FX", "Power systems"],
          more: {
            paragraphs: [
              "Undergraduate researcher at Universidad Carlos III de Madrid. Collaborated on real-time testing protocols for the power grid, running RTDS simulations under fault events and studying how grid-forming vs grid-following inverters compete for reliability as renewables displace classical generators.",
            ],
            bullets: [
              "Real-time testing protocols for power-grid fault scenarios",
              "RTDS simulations of grid behavior under faults",
              "Grid-forming vs grid-following inverter research for renewable-heavy grids",
            ],
          },
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
        "Firmware, OS kernels, and signal-processing code that turns CPUs into something useful.",
      projects: [
        {
          title: "Automated garage door · STM32",
          meta: "May–Jun 2026 · STM32L476 · Nucleo",
          body:
            "Firmware integrating SPI accelerometer, I2C temperature sensor, and DMA-backed USART over Bluetooth to drive a stepper motor with non-blocking, interrupt-driven control.",
          tags: ["STM32", "Embedded C", "I2C/SPI/UART", "Real-time"],
          more: {
            paragraphs: [
              "Built an automated garage-door controller on an STM32L476 Nucleo board: continuously polls sensors, streams telemetry over Bluetooth, and drives a stepper motor while keeping the control loop non-blocking.",
            ],
            bullets: [
              "SPI accelerometer + I2C temperature sensor + DMA USART / Bluetooth telemetry",
              "Finite-state door controller with accelerometer end-stops and startup calibration",
              "Temperature hysteresis (Schmitt trigger) for automated open/close",
              "SysTick half-stepping motor control; 4 s post-move lockout; resolved pin conflicts across stepper, SPI, I2C, and dual UART at register level",
            ],
          },
        },
        {
          title: "Nachos OS projects",
          meta: "Apr–Jun 2026 · C/C++ · Simulated MIPS",
          body:
            "Core OS pieces in Nachos: thread scheduling/sync, multiprogramming, system calls, page tables, and virtual memory with page-fault handling — debugged concurrency and context switches in a simulated MIPS kernel.",
          tags: ["Operating Systems", "C/C++", "Virtual memory"],
          more: {
            paragraphs: [
              "Implemented core Nachos operating-system components including thread scheduling/synchronization, multiprogramming, and user process management (Fork, Exec, Join, Exit), then built out system-call and memory subsystems with page-table translation and process isolation.",
            ],
            bullets: [
              "Thread scheduling, synchronization, and multiprogramming",
              "System calls: Fork, Exec, Join, Exit, Read, Write, Open, Close, Create",
              "Page-table address translation + user↔kernel memory transfer",
              "Virtual memory: page-fault handling and replacement; kernel concurrency / exception debugging",
            ],
          },
        },
        {
          title: "Goleta Sound Machine",
          meta: "Oct–Dec 2023 · Teensy",
          body:
            "Guitar tuner and real-time effects unit on Teensy with an audio adapter board — frequency analysis, LCD output, and programmable effects.",
          tags: ["Embedded C", "DSP", "Teensy"],
          more: {
            paragraphs: [
              "Developed a guitar tuner and effects unit using a Teensy microcontroller and audio adapter board.",
            ],
            bullets: [
              "Real-time frequency analysis for tuning",
              "LCD output for mode / feedback",
              "Programmable audio effects on the signal path",
            ],
          },
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
            "5-stage pipelined RISC-V in Verilog with gshare + BTB branch prediction and a 4-way set-associative I-cache (critical-word-first / early-restart + hardware prefetcher).",
          tags: ["Verilog", "RV32I", "Cache", "Branch predictor"],
          more: {
            paragraphs: [
              "Designed and verified a 5-stage pipelined RISC-V processor in Verilog — core arithmetic/logic, load/store, branch, and jump instructions, with datapath/control extensions for jal, jalr, and lui.",
            ],
            bullets: [
              "Branch prediction: direct-mapped BTB + gshare (global history register + saturating counters)",
              "4-way set-associative I-cache with random replacement, miss handling, critical-word-first / early-restart, and a hardware prefetcher",
              "Testbench verification with waveform debug and counters for branch/jump miss rates, cache miss rates, and execution-time sweeps",
            ],
          },
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
        "Where transistors become logic — standard cells laid out by hand, multi-bit datapaths and clock trees timed within hard frequency constraints.",
      projects: [
        {
          title: "1 GHz skip-buffered H-tree clock network",
          meta: "Apr–Jun 2026 · Clock tree · HSPICE",
          body:
            "Designed a 1 GHz skip-buffered H-tree for a 5 mm × 5 mm, 100K flip-flop chip — 75.5 ps skew (spec <100 ps) with Monte Carlo validation in HSPICE.",
          tags: ["Clock tree", "HSPICE", "Monte Carlo", "1 GHz"],
          more: {
            paragraphs: [
              "High-speed IC design project: a 1 GHz skip-buffered H-tree clock distribution network for a 5 mm × 5 mm chip with 100K flip-flops. Hit 75.5 ps skew against a <100 ps spec after root-cause jitter analysis of supply-droop across series buffer stages.",
            ],
            bullets: [
              "Parametric models for buffer sizing, wire RC extraction, and power budgeting (2.26 W)",
              "Simulation-calibrated jitter estimator with per-tile coherent grouping + quadrature summation",
              "Monte Carlo HSPICE runs confirming statistical skew compliance",
            ],
          },
        },
        {
          title: "16-bit parallel prefix adder",
          meta: "Dec 2025 · Cadence Virtuoso · 2 ns / 500 MHz",
          body:
            "Transistor-level 16-bit parallel prefix adder in Virtuoso — propagate/generate logic, custom CMOS sizing, verified within a 2 ns timing target while driving 32 unit inverters per bit (~108 fF).",
          tags: ["Virtuoso", "PPA", "2 ns", "CMOS sizing"],
          more: {
            paragraphs: [
              "Designed and simulated a 16-bit parallel prefix adder at the transistor level in Cadence Virtuoso for unsigned addition. Outputs required to drive 32 unit inverters and meet a 2 ns timing target (~500 MHz).",
            ],
            bullets: [
              "Propagate/generate blocks, CMOS carry-computation (“black-box”) stages, and sum logic",
              "Critical-path analysis for Cout and MSB sum; custom INV/NAND/NOR/XOR sizing for rise/fall balance",
              "Load modeling ≈108 fF per bit; multi-vector transistor-level sims confirmed 2 ns compliance",
            ],
          },
        },
        {
          title: "CMOS standard-cell layout",
          meta: "Sep–Dec 2025 · Skywater 130 nm",
          body:
            "Functional INV, NAND, NOR, MUX, and XOR layouts on the Skywater 130 nm PDK — signed off with DRC and LVS clean.",
          tags: ["Layout", "DRC", "LVS", "130 nm"],
          more: {
            paragraphs: [
              "Designed functional INV, NAND, NOR, MUX, and XOR gates using the Skywater 130 nm PDK in Cadence Virtuoso, then verified layouts against DRC and LVS.",
            ],
            bullets: [
              "Cells: INV, NAND, NOR, MUX, XOR",
              "Skywater 130 nm PDK layout in Virtuoso",
              "DRC and LVS clean at sign-off",
            ],
          },
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
            "Fabricated and validated long-channel NMOS devices, resistors, and capacitors from bare silicon wafers — full process flow through metallization and electrical test.",
          tags: ["Cleanroom", "Photolithography", "Doping", "Electrical test"],
          more: {
            paragraphs: [
              "Started from bare silicon wafers in the UCSB Engineering II Cleanroom and fabricated working long-channel NMOS transistors plus resistors and capacitors, then measured electrical characteristics across samples to confirm MOSFET operation and process consistency.",
            ],
            bullets: [
              "Full flow: photolithography, mask alignment, metrology, doping, oxidation, etching, metallization",
              "Electrical characterization of transistors, resistors, and capacitors",
              "Hands-on process integration, device fab, and post-fab test",
            ],
          },
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
          title: "Cu / Ru / graphene interconnect transport",
          meta: "Jan–Mar 2026 · QuantumATK · 300–600 K",
          body:
            "Temperature-dependent transport models for Cu and Ru nanowires plus QuantumATK graphene simulations (MD-Landauer / BTE). Graphene degraded more slowly with temperature than the copper baseline.",
          tags: ["QuantumATK", "Transport", "BEOL"],
          more: {
            paragraphs: [
              "Modeled temperature-dependent transport in advanced interconnect materials, comparing Cu, Ru, and monolayer graphene under nanoscale scaling. Built a copper nanowire resistance model with Fuchs–Sondheimer surface scattering, Mayadas–Shatzkes grain-boundary scattering, barrier-area loss, and thermal effects, then benchmarked ruthenium and graphene against that baseline.",
            ],
            bullets: [
              "QuantumATK graphene sims via MD-Landauer and BTE mobility workflows (300 K–600 K)",
              "Graphene transport degraded more slowly with temperature than the Cu reference",
              "Noted practical limits: contact resistance and process nonidealities",
            ],
          },
        },
      ],
    },
  ],
};

export const ENG_BIOGRAPHY = {
  eyebrow: "Biography",
  name: "Ethan H Reeves",
  tagline: "Building things across the full stack of computer engineering.",
  avatarSrc: "/photos/profile/eng_profile.jpeg",
  avatarAlt: "Ethan H Reeves",
  story: [
    {
      heading: "Where I'm coming from",
      body:
        "I'm a third-year in Computer Engineering at UCSB based out of the Bay Area. Ever since I was a kid, I've been " +
        "fascinated with opening things up and seeing how they work and problem solving. " + 
        "Whether it was replacing the memory sticks in an old iMac to breath new life " +
        "into it, or writing a little code to solve Worlde puzzles to try and gain an upper hand on my family, I've always tried " +
        "applying my love for problem solving in both physical and digital means. " +
        "Now as a computer engineer, I've tried to carry my passion for finding out how things really work by learning how " + 
        "a computer works, from the top of the stack to the bottom.",
    },
    {
      heading: "What I've been working on",
      body:
        "Here at UCSB I've fabricated a working NMOS from wafer to electrical test, designed a 1 GHz H-tree clock network, built a RISC-V pipeline with cache and branch prediction, and shipped embedded firmware on STM32 and Teensy. " +
        "I've also done interconnect transport research (Cu/Ru/graphene), RTDS grid testing at UC3M Madrid, and engineering internships at Spin Master — including a return this summer owning a full prototype end to end.",
    },
    {
      heading: "Outside of school",
      body:
        "For organizations at UCSB, I wrapped up my tenure as President of Theta Tau (Professional Co-Ed Engineering Fraternity) " +
        "and as co-historian for TASA. " +
        "Besides that, I do some photography on the side (check out the other half of this website!) and " +
        "when I'm not stuck behind a screen, you'll find me playing guitar or piano (Liszt and Debussy mostly), " +
        "reading, playing soccer, surfing, or swimming.",
    },
  ],
  facts: [
    { valueHtml: "10", label: "Projects shipped" },
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
    body: "Based in the Bay Area. Coursework spans high-speed IC design, VLSI, computer architecture, OS, and cleanroom fabrication. Research experience in Madrid on real-time grid testing (RTDS) and interconnect modeling.",
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

export const ENG_RESUME = {
  nameHtml: 'Ethan <em>H Reeves</em>',
  tagline: "B.S. Computer Engineering · UCSB · GPA 3.76",
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
      title: "B.S. Computer Engineering",
      dateRange: "Sep 2023 – June 2027 (expected)",
      orgLine: "University of California, Santa Barbara · College of Engineering · GPA 3.76 / 4.00",
    },
  ],
  courseworkSectionTitle: "Relevant coursework",
  coursework: [
    "High Speed IC Design (M.S. level)",
    "Nanoelectronic Device Physics",
    "VLSI Design I & II",
    "Integrated Circuit Fabrication",
    "Computer Architecture I & II",
    "Operating Systems",
    "Sensor / Peripheral Design",
    "Signal Analysis & Processing*",
    "Distributed Systems*",
  ],
  experienceSectionTitle: "Experience",
  experience: [
    {
      title: "Returning Engineering Intern",
      dateRange: "Jun 2026 – present",
      orgLine: "Spin Master · Bay Area Innovation Center · Pleasanton, CA",
      body: "Returning engineering intern owning a full project prototype from start to finish over the summer.",
    },
    {
      title: "Engineering Intern",
      dateRange: "Aug–Sep 2025",
      orgLine: "Spin Master · Bay Area Innovation Center · Pleasanton, CA",
      body: "Assembled controllers for design engineers to test mechanical and digital toy operations. Wrote embedded software for prototype circuits and created digital circuits that brought mechanical animations and toy features to life.",
    },
    {
      title: "Electrical Engineering Undergraduate Researcher",
      dateRange: "Jun–Aug 2025",
      orgLine: "Universidad Carlos III de Madrid · Madrid, Spain",
      body: "Developed real-time testing protocols for the power grid using an RTDS simulator; modeled fault scenarios. Studied grid-forming versus grid-following inverters for reliability as renewables replace classical generators.",
    },
  ],
  projectsSectionTitle: "Projects",
  projects: [
    { title: "1 GHz skip-buffered H-tree clock network", meta: "Apr–Jun 2026 · 75.5 ps skew · HSPICE Monte Carlo" },
    { title: "Automated garage door system (STM32)", meta: "May–Jun 2026 · SPI/I2C/UART · real-time control" },
    { title: "Nachos operating systems projects", meta: "Apr–Jun 2026 · Threads, syscalls, virtual memory" },
    { title: "Fabricated working NMOS from silicon wafer", meta: "Jan–Mar 2026 · Cleanroom fabrication & electrical test" },
    { title: "Cu / Ru / graphene interconnect transport", meta: "Jan–Mar 2026 · QuantumATK · 300–600 K" },
    { title: "RISC-V pipeline processor in Verilog", meta: "Jan–Mar 2026 · gshare + BTB · 4-way I-cache" },
    { title: "16-bit parallel prefix adder in Virtuoso", meta: "Dec 2025 · 2 ns timing · transistor-level" },
    { title: "Layout of CMOS logic gates in Virtuoso", meta: "Sep–Dec 2025 · Skywater 130 nm · DRC/LVS" },
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
    "STM32",
    "Teensy",
    "Oscilloscope",
    "Soldering",
  ],
  extrasSectionTitle: "Leadership & interests",
  extrasText:
    "UCSB Theta Tau — President (Jun 2025–Jun 2026). UCSB TASA — Co-Historian / photographer (Jun 2025–Jun 2026). Graduation photos photographer (May 2025–present). Interests: guitar, photography (@ethan_r.photo), piano (Liszt, Debussy), reading (Blake Crouch), soccer, surfing, swimming.",
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
