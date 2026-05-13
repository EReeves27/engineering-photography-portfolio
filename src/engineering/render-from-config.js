import {
  ENG_NAV,
  ENG_NAV_THEMES,
  ENG_HOME,
  ENG_PAGE_SW,
  ENG_PAGE_HW,
  ENG_PAGE_RE,
  ENG_RESUME,
} from "./config.js";

function escapeHtml(s) {
  if (s == null || s === "") return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/'/g, "&#39;");
}

function engDetNav(backPageId, themeKey) {
  const t = ENG_NAV_THEMES[themeKey];
  const nl = ENG_NAV;
  const resumeStyle =
    themeKey === "resume"
      ? ' style="background:#0d0d1a;border-bottom:.5px solid #2a2a40;"'
      : "";
  return (
    '<div class="det-nav"' +
    resumeStyle +
    ">" +
    '<div class="det-nav-actions">' +
    '<button type="button" class="eng-back" onclick="showPage(\'' +
    escapeAttr(backPageId) +
    '\')" style="' +
    t.backStyle +
    '"><i class="ti ti-arrow-left"></i>' +
    escapeHtml(nl.backLabel) +
    '</button>' +
    '<button type="button" class="home-btn" onclick="goHome()" aria-label="' +
    escapeAttr(nl.homeAriaLabel) +
    '"><i class="ti ti-home"></i></button>' +
    "</div>" +
    '<div class="det-logo" style="color:#e8eaf6;">Ethan<em style="font-style:italic;color:' +
    t.logoEm +
    ';">R.</em></div></div>'
  );
}

function thumbInner(card) {
  if (card.thumbnailSrc) {
    return (
      '<img src="' +
      escapeAttr(card.thumbnailSrc) +
      '" alt="' +
      escapeAttr(card.thumbnailAlt || card.title) +
      '" style="width:100%;height:100%;object-fit:cover;">'
    );
  }
  return card.thumbnailInnerHtml || "";
}

function buildEngHomeInnerHtml() {
  const h = ENG_HOME;
  const statsHtml = h.stats
    .map(function (row, i) {
      var d = i === 0 ? "" : " d" + i;
      return (
        '<div class="stat fade-in' +
        d +
        '"><div class="stat-n">' +
        row.valueHtml +
        '</div><div class="stat-l">' +
        escapeHtml(row.label) +
        "</div></div>"
      );
    })
    .join("");

  const cardsHtml = h.projectCards
    .map(function (c, i) {
      var d = i % 2 === 1 ? " d2" : " d1";
      var clh = c.viewLinkStyle
        ? '<div class="clh" style="' + escapeAttr(c.viewLinkStyle) + '">'
        : '<div class="clh">';
      return (
        '<div class="card fade-in' +
        d +
        '" onclick="showPage(\'' +
        escapeAttr(c.pageId) +
        '\')">' +
        '<div class="cv" style="background:#0d0d1a">' +
        thumbInner(c) +
        "</div>" +
        '<div class="cb"><span class="cat-badge ' +
        escapeAttr(c.catClass) +
        '">' +
        escapeHtml(c.category) +
        "</span><div class=\"cn\">" +
        escapeHtml(c.title) +
        '</div><div class="cs">' +
        escapeHtml(c.subtitle) +
        "</div>" +
        clh +
        '<i class="ti ti-arrow-up-right" style="font-size:11.25px;"></i>View</div></div></div>'
      );
    })
    .join("");

  var bioPhotoInner =
    h.bio.avatarSrc ?
      '<img class="bio-photo-img" src="' +
      escapeAttr(h.bio.avatarSrc) +
      '" alt="' +
      escapeAttr(h.bio.avatarAlt) +
      '">'
    : '<div class="bio-photo-placeholder"><i class="ti ti-user"></i></div>';

  return (
    '<div class="stats">' +
    statsHtml +
    '</div><div class="eng-bio-standalone fade-in">' +
    '<div class="bio-side bio-side--row">' +
    '<div class="bio-photo-col eng-bio-photo">' +
    bioPhotoInner +
    '</div><div class="bio-copy-col">' +
    '<div class="bio-name">' +
    escapeHtml(h.bio.name) +
    '</div><div class="bio-role">' +
    escapeHtml(h.bio.role) +
    '</div><div class="bio-body">' +
    escapeHtml(h.bio.body) +
    "</div></div></div></div>" +
    '<div class="strip">' +
    '<button class="res-btn" onclick="showPage(\'page-resume\')"><i class="ti ti-file-cv"></i> ' +
    escapeHtml(h.resumeButtonLabel) +
    "</button></div>" +
    '<div class="divider"></div>' +
    '<div class="works">' +
    '<div class="sec-hdr"><span class="sec-title">' +
    escapeHtml(h.worksSectionTitle) +
    '</span><span class="sec-count">' +
    escapeHtml(h.worksProjectCountLabel) +
    '</span></div><div class="grid">' +
    cardsHtml +
    "</div></div>"
  );
}

function projButtonsHtml(buttons) {
  return buttons
    .map(function (b) {
      return (
        '<button class="pbtn" style="' +
        escapeAttr(b.style) +
        '"><i class="ti ' +
        escapeAttr(b.icon) +
        '"></i> ' +
        escapeHtml(b.label) +
        "</button>"
      );
    })
    .join("");
}

function schematicBlock(s) {
  if (!s) return "";
  if (s.kind === "img" && s.src) {
    return (
      '<div class="schematic"><img src="' +
      escapeAttr(s.src) +
      '" alt="' +
      escapeAttr(s.alt || "") +
      '" style="max-width:100%;max-height:200px;object-fit:contain;border-radius:8px;"></div>'
    );
  }
  if (s.kind === "svg" && s.html) {
    return '<div class="schematic">' + s.html + "</div>";
  }
  return "";
}

function chipsSection(title, chips) {
  var inner = chips
    .map(function (ch) {
      return (
        '<span class="chip" style="color:' +
        escapeAttr(ch.color) +
        ';">' +
        escapeHtml(ch.label) +
        "</span>"
      );
    })
    .join("");
  return (
    '<div class="proj-sec"><div class="proj-sec-title">' +
    escapeHtml(title) +
    '</div><div class="chips">' +
    inner +
    "</div></div>"
  );
}

function metricsSection(title, metrics) {
  var cells = metrics
    .map(function (m) {
      return (
        '<div class="metric"><div class="metric-val">' +
        m.valueHtml +
        '</div><div class="metric-lbl">' +
        escapeHtml(m.label) +
        "</div></div>"
      );
    })
    .join("");
  return (
    '<div class="proj-sec"><div class="proj-sec-title">' +
    escapeHtml(title) +
    '</div><div class="metrics-grid">' +
    cells +
    "</div></div>"
  );
}

function featuresSection(title, lines, bulletColor) {
  var col = bulletColor || "#4f8ef7";
  var lis = lines
    .map(function (line) {
      return (
        "<li><span style=\"color:" +
        col +
        ';position:absolute;left:0;">—</span>' +
        escapeHtml(line) +
        "</li>"
      );
    })
    .join("");
  return (
    '<div class="proj-sec"><div class="proj-sec-title">' +
    escapeHtml(title) +
    '</div><ul class="feat-list">' +
    lis +
    "</ul></div>"
  );
}

function timelineSection(title, items, dotColor) {
  var rows = items
    .map(function (it) {
      return (
        '<div class="tl-item"><div class="tl-l"><div class="tl-dot" style="background:' +
        escapeAttr(dotColor) +
        ';"></div><div class="tl-line"></div></div><div><div class="tl-date" style="color:' +
        escapeAttr(dotColor) +
        ';">' +
        escapeHtml(it.date) +
        '</div><div class="tl-text">' +
        escapeHtml(it.title) +
        '</div><div class="tl-sub">' +
        escapeHtml(it.sub) +
        "</div></div></div>"
      );
    })
    .join("");
  return (
    '<div class="proj-sec"><div class="proj-sec-title">' +
    escapeHtml(title) +
    '</div><div class="tl">' +
    rows +
    "</div></div>"
  );
}

function buildSwPageBody() {
  const p = ENG_PAGE_SW;
  return (
    '<div class="proj-body">' +
    '<span class="proj-cat-badge" style="' +
    escapeAttr(p.catBadgeStyle) +
    '">' +
    escapeHtml(p.catBadgeText) +
    '</span><h1 class="proj-title">' +
    p.titleHtml +
    '</h1><p class="proj-sub">' +
    escapeHtml(p.sub) +
    '</p><div class="proj-btns">' +
    projButtonsHtml(p.buttons) +
    '</div><div class="proj-divider"></div>' +
    schematicBlock(p.schematic) +
    chipsSection(p.chipsSectionTitle, p.chips) +
    metricsSection(p.metricsSectionTitle, p.metrics) +
    featuresSection(p.featuresSectionTitle, p.features, p.featureBulletColor) +
    timelineSection(p.timelineSectionTitle, p.timeline, p.timelineDotColor) +
    "</div>"
  );
}

function buildHwPageBody() {
  const p = ENG_PAGE_HW;
  return (
    '<div class="proj-body">' +
    '<span class="proj-cat-badge" style="' +
    escapeAttr(p.catBadgeStyle) +
    '">' +
    escapeHtml(p.catBadgeText) +
    '</span><h1 class="proj-title">' +
    p.titleHtml +
    '</h1><p class="proj-sub">' +
    escapeHtml(p.sub) +
    '</p><div class="proj-btns">' +
    projButtonsHtml(p.buttons) +
    '</div><div class="proj-divider"></div>' +
    schematicBlock(p.schematic) +
    chipsSection(p.chipsSectionTitle, p.chips) +
    metricsSection(p.metricsSectionTitle, p.metrics) +
    timelineSection(p.timelineSectionTitle, p.timeline, p.timelineDotColor) +
    "</div>"
  );
}

function findingsSection(title, items) {
  var cards = items
    .map(function (f) {
      return (
        '<div class="finding-card"><div class="finding-num">' +
        escapeHtml(f.num) +
        '</div><div class="finding-text">' +
        escapeHtml(f.text) +
        '</div><div class="finding-sub">' +
        escapeHtml(f.sub) +
        "</div></div>"
      );
    })
    .join("");
  return (
    '<div class="proj-sec"><div class="proj-sec-title">' +
    escapeHtml(title) +
    "</div>" +
    cards +
    "</div>"
  );
}

function buildRePageBody() {
  const p = ENG_PAGE_RE;
  return (
    '<div class="proj-body">' +
    '<span class="proj-cat-badge" style="' +
    escapeAttr(p.catBadgeStyle) +
    '">' +
    escapeHtml(p.catBadgeText) +
    '</span><h1 class="proj-title">' +
    p.titleHtml +
    '</h1><p class="proj-sub">' +
    escapeHtml(p.sub) +
    '</p><div class="proj-btns">' +
    projButtonsHtml(p.buttons) +
    '</div><div class="proj-divider"></div>' +
    '<div class="proj-sec"><div class="proj-sec-title" style="' +
    escapeAttr(p.abstractTitleStyle) +
    '">' +
    escapeHtml(p.abstractSectionTitle) +
    '</div><div class="abstract-block">' +
    escapeHtml(p.abstractText) +
    "</div></div>" +
    findingsSection(p.findingsSectionTitle, p.findings) +
    metricsSection(p.metricsSectionTitle, p.metrics) +
    "</div>"
  );
}

function buildResumeInnerHtml() {
  const r = ENG_RESUME;
  var contacts = r.contacts
    .map(function (c) {
      return (
        '<span class="res-ci"><i class="ti ' +
        escapeAttr(c.icon) +
        '"></i>' +
        escapeHtml(c.text) +
        "</span>"
      );
    })
    .join("");

  var expItems = r.experience
    .map(function (e) {
      return (
        '<div class="res-item"><div class="res-ih"><span class="res-it">' +
        escapeHtml(e.title) +
        '</span><span class="res-id">' +
        escapeHtml(e.dateRange) +
        '</span></div><div class="res-is">' +
        escapeHtml(e.orgLine) +
        '</div><div class="res-ib">' +
        escapeHtml(e.body) +
        "</div></div>"
      );
    })
    .join("");

  var eduItems = r.education
    .map(function (e) {
      return (
        '<div class="res-item"><div class="res-ih"><span class="res-it">' +
        escapeHtml(e.title) +
        '</span><span class="res-id">' +
        escapeHtml(e.dateRange) +
        '</span></div><div class="res-is">' +
        escapeHtml(e.orgLine) +
        "</div></div>"
      );
    })
    .join("");

  var skills = r.skills
    .map(function (s) {
      return '<span class="res-skill">' + escapeHtml(s) + "</span>";
    })
    .join("");

  return (
    '<div class="res-page">' +
    '<div class="res-name">' +
    r.nameHtml +
    '</div><div class="res-tagline">' +
    escapeHtml(r.tagline) +
    '</div><div class="res-contact-row">' +
    contacts +
    '</div><div class="res-sec"><div class="res-sec-title">' +
    escapeHtml(r.experienceSectionTitle) +
    "</div>" +
    expItems +
    '</div><div class="res-sec"><div class="res-sec-title">' +
    escapeHtml(r.educationSectionTitle) +
    "</div>" +
    eduItems +
    '</div><div class="res-sec"><div class="res-sec-title">' +
    escapeHtml(r.skillsSectionTitle) +
    '</div><div class="res-skills">' +
    skills +
    '</div></div><button class="res-dl"><i class="ti ti-download"></i> ' +
    escapeHtml(r.downloadLabel) +
    "</button></div>"
  );
}

export function mountEngineeringFromConfig() {
  var pe = document.getElementById("pe");
  if (pe) pe.innerHTML = buildEngHomeInnerHtml();

  var sw = document.getElementById("page-sw");
  if (sw) sw.innerHTML = engDetNav("page-home", ENG_PAGE_SW.navTheme) + buildSwPageBody();

  var hw = document.getElementById("page-hw");
  if (hw) hw.innerHTML = engDetNav("page-home", ENG_PAGE_HW.navTheme) + buildHwPageBody();

  var re = document.getElementById("page-re");
  if (re) re.innerHTML = engDetNav("page-home", ENG_PAGE_RE.navTheme) + buildRePageBody();

  var res = document.getElementById("page-resume");
  if (res) res.innerHTML = engDetNav("page-home", "resume") + buildResumeInnerHtml();
}
