/**
 * =============================================================================
 *  ENGINEERING — EDIT THIS FILE ONLY (HTML shells are empty; content is built here)
 * =============================================================================
 *
 *  Images: use /photos/… → public/photos/… on disk.
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
    { valueHtml: '12<span>+</span>', label: "Projects" },
    { valueHtml: '4<span>yr</span>', label: "Experience" },
    { valueHtml: "6", label: "Technologies" },
    { valueHtml: "3", label: "Open-source" },
  ],
  heroModeTag: "Engineering Portfolio",
  heroTitleHtml: "Building things<br>that <em>work.</em>",
  heroDesc:
    "Software, hardware, and research engineering — clean architecture, real systems, meaningful results.",
  bio: {
    avatarSrc: "",
    avatarAlt: "Ethan Reeves",
    name: "Ethan Reeves",
    role: "Software & Systems Engineer",
    body: "Based in Southern California. Building fast, reliable software — from embedded systems to full-stack platforms.",
  },
  resumeButtonLabel: "View resume",
  worksSectionTitle: "Selected work",
  worksProjectCountLabel: "06 projects",
  projectCards: [
  {
    "pageId": "page-sw",
    "thumbnailInnerHtml": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\"><rect x=\"6\" y=\"17\" width=\"38\" height=\"6\" rx=\"2\" fill=\"#4f8ef7\" opacity=\".8\"/><rect x=\"6\" y=\"27\" width=\"24\" height=\"5\" rx=\"2\" fill=\"#4f8ef7\" opacity=\".4\"/><rect x=\"6\" y=\"9\" width=\"14\" height=\"4\" rx=\"2\" fill=\"#4f8ef7\" opacity=\".5\"/></svg>",
    "catClass": "cat-sw",
    "category": "Software",
    "title": "REST API Platform",
    "subtitle": "Node.js, PostgreSQL",
    "thumbnailSrc": "",
    "thumbnailAlt": "",
    "viewLinkStyle": ""
  },
  {
    "pageId": "page-hw",
    "thumbnailInnerHtml": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\"><rect x=\"12\" y=\"12\" width=\"26\" height=\"26\" rx=\"3\" stroke=\"#5dcaa5\" stroke-width=\"1.1\" opacity=\".5\"/><circle cx=\"25\" cy=\"25\" r=\"5\" fill=\"#5dcaa5\" opacity=\".7\"/><line x1=\"12\" y1=\"19\" x2=\"6\" y2=\"19\" stroke=\"#5dcaa5\" stroke-width=\"1\" opacity=\".5\"/><line x1=\"38\" y1=\"19\" x2=\"44\" y2=\"19\" stroke=\"#5dcaa5\" stroke-width=\"1\" opacity=\".5\"/></svg>",
    "catClass": "cat-hw",
    "category": "Hardware",
    "title": "Sensor Array",
    "subtitle": "STM32, RTOS",
    "thumbnailSrc": "",
    "thumbnailAlt": "",
    "viewLinkStyle": "color:#5dcaa5;"
  },
  {
    "pageId": "page-re",
    "thumbnailInnerHtml": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\"><circle cx=\"25\" cy=\"18\" r=\"8\" stroke=\"#afa9ec\" stroke-width=\"1.1\" opacity=\".5\"/><line x1=\"25\" y1=\"26\" x2=\"25\" y2=\"34\" stroke=\"#afa9ec\" stroke-width=\"1\" opacity=\".5\"/><circle cx=\"25\" cy=\"18\" r=\"3\" fill=\"#afa9ec\" opacity=\".6\"/></svg>",
    "catClass": "cat-re",
    "category": "Research",
    "title": "ML Latency Study",
    "subtitle": "PyTorch, Analysis",
    "thumbnailSrc": "",
    "thumbnailAlt": "",
    "viewLinkStyle": "color:#afa9ec;"
  },
  {
    "pageId": "page-sw",
    "thumbnailInnerHtml": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\"><rect x=\"8\" y=\"8\" width=\"13\" height=\"13\" rx=\"2\" fill=\"#4f8ef7\" opacity=\".3\" stroke=\"#4f8ef7\" stroke-width=\"1\"/><rect x=\"29\" y=\"8\" width=\"13\" height=\"13\" rx=\"2\" fill=\"#4f8ef7\" opacity=\".3\" stroke=\"#4f8ef7\" stroke-width=\"1\"/><rect x=\"8\" y=\"29\" width=\"13\" height=\"13\" rx=\"2\" fill=\"#4f8ef7\" opacity=\".3\" stroke=\"#4f8ef7\" stroke-width=\"1\"/><rect x=\"29\" y=\"29\" width=\"13\" height=\"13\" rx=\"2\" fill=\"#4f8ef7\" opacity=\".5\" stroke=\"#4f8ef7\" stroke-width=\"1\"/></svg>",
    "catClass": "cat-sw",
    "category": "Software",
    "title": "Cache Layer",
    "subtitle": "Redis, Go",
    "thumbnailSrc": "",
    "thumbnailAlt": "",
    "viewLinkStyle": ""
  },
  {
    "pageId": "page-hw",
    "thumbnailInnerHtml": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\"><rect x=\"8\" y=\"14\" width=\"34\" height=\"22\" rx=\"2\" stroke=\"#5dcaa5\" stroke-width=\"1.1\" opacity=\".4\"/><rect x=\"14\" y=\"20\" width=\"8\" height=\"10\" rx=\"1\" fill=\"#5dcaa5\" opacity=\".2\"/><rect x=\"26\" y=\"20\" width=\"10\" height=\"10\" rx=\"1\" fill=\"#5dcaa5\" opacity=\".35\"/></svg>",
    "catClass": "cat-hw",
    "category": "Hardware",
    "title": "Motor Driver PCB",
    "subtitle": "KiCad, BLDC",
    "thumbnailSrc": "",
    "thumbnailAlt": "",
    "viewLinkStyle": "color:#5dcaa5;"
  },
  {
    "pageId": "page-re",
    "thumbnailInnerHtml": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\"><polyline points=\"6,40 14,22 22,30 30,12 44,26\" stroke=\"#afa9ec\" stroke-width=\"1.4\" fill=\"none\" opacity=\".7\"/><circle cx=\"14\" cy=\"22\" r=\"2.5\" fill=\"#afa9ec\" opacity=\".7\"/><circle cx=\"22\" cy=\"30\" r=\"2.5\" fill=\"#afa9ec\" opacity=\".7\"/><circle cx=\"30\" cy=\"12\" r=\"2.5\" fill=\"#afa9ec\" opacity=\".7\"/></svg>",
    "catClass": "cat-re",
    "category": "Research",
    "title": "Edge Inference Survey",
    "subtitle": "TensorFlow, C++",
    "thumbnailSrc": "",
    "thumbnailAlt": "",
    "viewLinkStyle": "color:#afa9ec;"
  }
],
};

const SCHEMATIC_SW_HTML = "<svg width=\"260\" height=\"110\" viewBox=\"0 0 260 110\" fill=\"none\"><rect x=\"10\" y=\"40\" width=\"50\" height=\"28\" rx=\"4\" fill=\"#0d1a2e\" stroke=\"#378add\" stroke-width=\".8\"/><text x=\"35\" y=\"58\" font-size=\"8\" fill=\"#85b7eb\" text-anchor=\"middle\" font-family=\"monospace\">Client</text><rect x=\"105\" y=\"8\" width=\"50\" height=\"28\" rx=\"4\" fill=\"#0d1a2e\" stroke=\"#378add\" stroke-width=\".8\"/><text x=\"130\" y=\"26\" font-size=\"8\" fill=\"#85b7eb\" text-anchor=\"middle\" font-family=\"monospace\">Auth</text><rect x=\"105\" y=\"40\" width=\"50\" height=\"28\" rx=\"4\" fill=\"#0d1a2e\" stroke=\"#4f8ef7\" stroke-width=\"1\"/><text x=\"130\" y=\"58\" font-size=\"8\" fill=\"#85b7eb\" text-anchor=\"middle\" font-family=\"monospace\">API Gateway</text><rect x=\"105\" y=\"72\" width=\"50\" height=\"28\" rx=\"4\" fill=\"#0d1a2e\" stroke=\"#378add\" stroke-width=\".8\"/><text x=\"130\" y=\"90\" font-size=\"8\" fill=\"#85b7eb\" text-anchor=\"middle\" font-family=\"monospace\">Rate Limit</text><rect x=\"200\" y=\"24\" width=\"50\" height=\"28\" rx=\"4\" fill=\"#0d1a2e\" stroke=\"#378add\" stroke-width=\".8\"/><text x=\"225\" y=\"42\" font-size=\"8\" fill=\"#85b7eb\" text-anchor=\"middle\" font-family=\"monospace\">Postgres</text><rect x=\"200\" y=\"56\" width=\"50\" height=\"28\" rx=\"4\" fill=\"#0d1a2e\" stroke=\"#378add\" stroke-width=\".8\"/><text x=\"225\" y=\"74\" font-size=\"8\" fill=\"#85b7eb\" text-anchor=\"middle\" font-family=\"monospace\">Redis</text><line x1=\"60\" y1=\"54\" x2=\"105\" y2=\"54\" stroke=\"#4f8ef7\" stroke-width=\".8\" opacity=\".7\"/><line x1=\"155\" y1=\"22\" x2=\"200\" y2=\"38\" stroke=\"#378add\" stroke-width=\".7\" opacity=\".5\"/><line x1=\"155\" y1=\"54\" x2=\"200\" y2=\"70\" stroke=\"#378add\" stroke-width=\".7\" opacity=\".5\"/></svg>";
const SCHEMATIC_HW_HTML = "<svg width=\"260\" height=\"110\" viewBox=\"0 0 260 110\" fill=\"none\"><rect x=\"90\" y=\"35\" width=\"80\" height=\"40\" rx=\"4\" fill=\"#0d1a14\" stroke=\"#1d9e75\" stroke-width=\"1.2\"/><text x=\"130\" y=\"53\" font-size=\"8\" fill=\"#5dcaa5\" text-anchor=\"middle\" font-family=\"monospace\">STM32F4</text><text x=\"130\" y=\"65\" font-size=\"7\" fill=\"#1d9e75\" text-anchor=\"middle\" font-family=\"monospace\">MCU</text><rect x=\"10\" y=\"15\" width=\"44\" height=\"18\" rx=\"3\" fill=\"#0d1a14\" stroke=\"#1d9e75\" stroke-width=\".7\" opacity=\".7\"/><text x=\"32\" y=\"27\" font-size=\"7\" fill=\"#5dcaa5\" text-anchor=\"middle\" font-family=\"monospace\">Sensor 1</text><rect x=\"10\" y=\"46\" width=\"44\" height=\"18\" rx=\"3\" fill=\"#0d1a14\" stroke=\"#1d9e75\" stroke-width=\".7\" opacity=\".7\"/><text x=\"32\" y=\"58\" font-size=\"7\" fill=\"#5dcaa5\" text-anchor=\"middle\" font-family=\"monospace\">Sensor 2</text><rect x=\"10\" y=\"77\" width=\"44\" height=\"18\" rx=\"3\" fill=\"#0d1a14\" stroke=\"#1d9e75\" stroke-width=\".7\" opacity=\".7\"/><text x=\"32\" y=\"89\" font-size=\"7\" fill=\"#5dcaa5\" text-anchor=\"middle\" font-family=\"monospace\">Sensor N</text><rect x=\"206\" y=\"15\" width=\"44\" height=\"18\" rx=\"3\" fill=\"#0d1a14\" stroke=\"#1d9e75\" stroke-width=\".7\" opacity=\".7\"/><text x=\"228\" y=\"27\" font-size=\"7\" fill=\"#5dcaa5\" text-anchor=\"middle\" font-family=\"monospace\">UART</text><rect x=\"206\" y=\"46\" width=\"44\" height=\"18\" rx=\"3\" fill=\"#0d1a14\" stroke=\"#1d9e75\" stroke-width=\".7\" opacity=\".7\"/><text x=\"228\" y=\"58\" font-size=\"7\" fill=\"#5dcaa5\" text-anchor=\"middle\" font-family=\"monospace\">Flash</text><rect x=\"206\" y=\"77\" width=\"44\" height=\"18\" rx=\"3\" fill=\"#0d1a14\" stroke=\"#1d9e75\" stroke-width=\".7\" opacity=\".7\"/><text x=\"228\" y=\"89\" font-size=\"7\" fill=\"#5dcaa5\" text-anchor=\"middle\" font-family=\"monospace\">Power</text><line x1=\"54\" y1=\"24\" x2=\"90\" y2=\"47\" stroke=\"#1d9e75\" stroke-width=\".7\" opacity=\".6\"/><line x1=\"54\" y1=\"55\" x2=\"90\" y2=\"55\" stroke=\"#1d9e75\" stroke-width=\".7\" opacity=\".6\"/><line x1=\"54\" y1=\"86\" x2=\"90\" y2=\"63\" stroke=\"#1d9e75\" stroke-width=\".7\" opacity=\".6\"/><line x1=\"170\" y1=\"47\" x2=\"206\" y2=\"24\" stroke=\"#1d9e75\" stroke-width=\".7\" opacity=\".6\"/><line x1=\"170\" y1=\"55\" x2=\"206\" y2=\"55\" stroke=\"#1d9e75\" stroke-width=\".7\" opacity=\".6\"/><line x1=\"170\" y1=\"63\" x2=\"206\" y2=\"86\" stroke=\"#1d9e75\" stroke-width=\".7\" opacity=\".6\"/></svg>";

export const ENG_PAGE_SW = {
  navTheme: "sw",
  catBadgeStyle: "background:#0d1a2e;color:#85b7eb;border:.5px solid #378add;",
  catBadgeText: "Software",
  titleHtml: 'REST API <em style="color:#4f8ef7;">Platform</em>',
  sub: "High-throughput REST API platform for multi-tenant SaaS. Sub-50ms response times, distributed rate limiting, and real-time analytics at scale.",
  buttons: [
    {
      style: "background:#4f8ef7;color:#0d0d1a;border:none;",
      icon: "ti-external-link",
      label: "Live demo",
    },
    {
      style: "border:.5px solid #2a2a40;color:#e8eaf6;",
      icon: "ti-brand-github",
      label: "GitHub",
    },
  ],
  schematic: { kind: "svg", html: SCHEMATIC_SW_HTML },
  chipsSectionTitle: "Tech stack",
  chips: [
    { label: "Node.js", color: "#85b7eb" },
    { label: "PostgreSQL", color: "#85b7eb" },
    { label: "Redis", color: "#85b7eb" },
    { label: "Docker", color: "#85b7eb" },
    { label: "AWS Lambda", color: "#85b7eb" },
  ],
  metricsSectionTitle: "Key metrics",
  metrics: [
    { valueHtml: '&lt;50<span style="color:#4f8ef7;">ms</span>', label: "Avg response" },
    { valueHtml: '99.9<span style="color:#4f8ef7;">%</span>', label: "Uptime SLA" },
    { valueHtml: '12<span style="color:#4f8ef7;">k</span>', label: "Req/sec peak" },
    { valueHtml: '3<span style="color:#4f8ef7;">mo</span>', label: "Build time" },
  ],
  featuresSectionTitle: "Features",
  featureBulletColor: "#4f8ef7",
  features: [
    "Multi-tenant JWT auth with role-based access and refresh token rotation",
    "Distributed rate limiting via Redis with per-user and per-endpoint granularity",
    "Real-time analytics dashboard with sub-second query latency",
  ],
  timelineSectionTitle: "Timeline",
  timelineDotColor: "#4f8ef7",
  timeline: [
    {
      date: "Jan 2024",
      title: "Architecture & design",
      sub: "Data models, auth strategy, API contract",
    },
    {
      date: "Apr 2024",
      title: "Deploy & load test",
      sub: "AWS Lambda, 12k req/sec stress test",
    },
  ],
};

export const ENG_PAGE_HW = {
  navTheme: "hw",
  catBadgeStyle: "background:#1a2a1a;color:#5dcaa5;border:.5px solid #1d9e75;",
  catBadgeText: "Hardware",
  titleHtml: 'Sensor Array <em style="color:#5dcaa5;">Controller</em>',
  sub: "STM32-based embedded controller managing 16 sensor nodes over I2C with real-time RTOS scheduling and fault detection.",
  buttons: [
    {
      style: "background:#5dcaa5;color:#04342c;border:none;",
      icon: "ti-brand-github",
      label: "GitHub",
    },
    {
      style: "border:.5px solid #2a2a40;color:#e8eaf6;",
      icon: "ti-file-description",
      label: "Datasheet",
    },
  ],
  schematic: { kind: "svg", html: SCHEMATIC_HW_HTML },
  chipsSectionTitle: "Hardware stack",
  chips: [
    { label: "STM32F4", color: "#5dcaa5" },
    { label: "FreeRTOS", color: "#5dcaa5" },
    { label: "I2C / SPI", color: "#5dcaa5" },
    { label: "KiCad", color: "#5dcaa5" },
    { label: "C++", color: "#5dcaa5" },
  ],
  metricsSectionTitle: "Key specs",
  metrics: [
    { valueHtml: "16", label: "Sensor nodes" },
    { valueHtml: '1<span style="color:#5dcaa5;">ms</span>', label: "Sample interval" },
    { valueHtml: '72<span style="color:#5dcaa5;">MHz</span>', label: "Clock speed" },
    { valueHtml: '3.3<span style="color:#5dcaa5;">V</span>', label: "Operating voltage" },
  ],
  timelineSectionTitle: "Build log",
  timelineDotColor: "#5dcaa5",
  timeline: [
    {
      date: "Mar 2023",
      title: "Schematic & PCB layout",
      sub: "4-layer board in KiCad, sent for fab",
    },
    {
      date: "Jun 2023",
      title: "Deployed to production",
      sub: "3 facilities, 0 failures in 6 months",
    },
  ],
};

export const ENG_PAGE_RE = {
  navTheme: "re",
  catBadgeStyle: "background:#2a1a2e;color:#afa9ec;border:.5px solid #7f77dd;",
  catBadgeText: "Research",
  titleHtml: 'ML Inference <em style="color:#afa9ec;">Latency Study</em>',
  sub: "Systematic study of inference latency trade-offs for transformer models on edge hardware across four devices.",
  buttons: [
    {
      style: "background:#7f77dd;color:#26215c;border:none;",
      icon: "ti-file-text",
      label: "Full paper",
    },
    {
      style: "border:.5px solid #2a2a40;color:#e8eaf6;",
      icon: "ti-brand-github",
      label: "Dataset",
    },
  ],
  abstractTitleStyle: "color:#afa9ec;",
  abstractSectionTitle: "Abstract",
  abstractText:
    "Edge deployment of transformer models presents latency challenges poorly characterized across hardware profiles. This study finds a 4.2× latency reduction with INT8 quantization at under 1% accuracy loss across four target devices.",
  findingsSectionTitle: "Key findings",
  findings: [
    {
      num: "Finding 01",
      text: "INT8 quantization reduced mean latency by 4.2× on Jetson Nano vs FP32 baseline",
      sub: "0.8% accuracy loss on CIFAR-10",
    },
    {
      num: "Finding 02",
      text: "FPGA target outperformed MCU by 11× at equivalent power draw",
      sub: "Custom accelerator reduced off-chip memory access by 60%",
    },
  ],
  metricsSectionTitle: "Key metrics",
  metrics: [
    { valueHtml: '4.2<span style="color:#afa9ec;">×</span>', label: "Latency reduction" },
    { valueHtml: '&lt;1<span style="color:#afa9ec;">%</span>', label: "Accuracy loss" },
    { valueHtml: "4", label: "Target devices" },
    { valueHtml: '11<span style="color:#afa9ec;">×</span>', label: "FPGA vs MCU" },
  ],
};

export const ENG_RESUME = {
  nameHtml: 'Ethan <em>Reeves</em>',
  tagline: "Software & Systems Engineer",
  contacts: [
    { icon: "ti-mail", text: "ethan@placeholder.com" },
    { icon: "ti-map-pin", text: "Southern California" },
    { icon: "ti-brand-github", text: "github.com/ethanr" },
  ],
  experienceSectionTitle: "Experience",
  experience: [
    {
      title: "Senior Software Engineer",
      dateRange: "2022–Present",
      orgLine: "Acme Corp · Full-time",
      body: "Led architecture of a multi-tenant API platform serving 50k DAU. Reduced p95 latency by 60%.",
    },
    {
      title: "Embedded Systems Engineer",
      dateRange: "2020–2022",
      orgLine: "TechStart Inc · Full-time",
      body: "Designed firmware for STM32-based IoT sensor arrays in 3 manufacturing facilities.",
    },
    {
      title: "Software Engineering Intern",
      dateRange: "Summer 2019",
      orgLine: "BuildCo · Internship",
      body: "Built CI/CD tooling cutting deploy time from 18 to 4 minutes.",
    },
  ],
  educationSectionTitle: "Education",
  education: [
    {
      title: "B.S. Computer Engineering",
      dateRange: "2016–2020",
      orgLine: "University of California · GPA 3.8",
    },
  ],
  skillsSectionTitle: "Skills",
  skills: ["Node.js", "Python", "Go", "C++", "PostgreSQL", "Redis", "Docker", "AWS", "STM32", "FreeRTOS"],
  downloadLabel: "Download PDF",
};
