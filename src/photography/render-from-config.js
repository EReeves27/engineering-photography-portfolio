import {
  PHOTO_BRAND,
  PHOTO_NAV,
  PHOTO_HOME,
  PHOTO_GRAD_PAGE,
  PHOTO_CONTACT_GRAD,
  PHOTO_CONTACT_GENERAL,
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

function phoDetNav(backPageId) {
  const nl = PHOTO_NAV;
  const logo = PHOTO_BRAND.logoHtml;
  return (
    '<div class="det-nav">' +
    '<div class="det-nav-actions">' +
    '<button type="button" class="pho-back" onclick="showPage(\'' +
    escapeAttr(backPageId) +
    "')\"><i class=\"ti ti-arrow-left\"></i>" +
    escapeHtml(nl.backLabel) +
    '</button>' +
    '<button type="button" class="home-btn" onclick="goHome()" aria-label="' +
    escapeAttr(nl.homeAriaLabel) +
    '"><i class="ti ti-home"></i></button>' +
    "</div>" +
    '<div class="det-logo" style="color:#1c1410;">' +
    logo +
    "</div>" +
    "</div>"
  );
}

function gradTeaserImageBlock() {
  const g = PHOTO_HOME.gradStrip;
  if (g.teaserImageSrc) {
    return (
      '<img src="' +
      escapeAttr(g.teaserImageSrc) +
      '" alt="' +
      escapeAttr(g.teaserImageAlt) +
      '" style="width:100%;height:100%;object-fit:cover;">'
    );
  }
  return (
    '<div class="bokeh" style="width:90px;height:90px;background:#c8a97e;top:-20px;right:20px;"></div>' +
    '<div class="bokeh" style="width:50px;height:50px;background:#c8a97e;bottom:10px;left:30px;"></div>' +
    '<div class="grad-preview-img-placeholder">' +
    '<svg width="56" height="56" viewBox="0 0 56 56" fill="none">' +
    '<circle cx="28" cy="20" r="12" stroke="#c8a97e" stroke-width="1.4" opacity=".7"/>' +
    '<circle cx="28" cy="20" r="5" fill="#c8a97e" opacity=".5"/>' +
    '<path d="M10 48 Q28 34 46 48" stroke="#c8a97e" stroke-width="1.4" fill="none" opacity=".5"/>' +
    '<polygon points="28,6 40,12 28,18 16,12" fill="#c8a97e" opacity=".55"/>' +
    '<line x1="40" y1="12" x2="40" y2="22" stroke="#c8a97e" stroke-width="1.2" opacity=".6"/>' +
    '<circle cx="40" cy="23" r="2" fill="#c8a97e" opacity=".6"/>' +
    "</svg>" +
    '<span style="font-family:\'DM Mono\',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#9a8878;">' +
    escapeHtml(g.placeholderCaption) +
    "</span></div>"
  );
}

function photoBioMediaHtml() {
  const b = PHOTO_HOME.bio;
  if (b.avatarSrc) {
    return (
      '<img class="bio-photo-img" src="' +
      escapeAttr(b.avatarSrc) +
      '" alt="' +
      escapeAttr(b.avatarAlt) +
      '">'
    );
  }
  return (
    '<div class="bio-photo-placeholder">' +
    '<i class="ti ti-user"></i></div>'
  );
}

/** Standalone bio (photo home — placed below grad preview). */
function photoBioStandaloneHtml() {
  const h = PHOTO_HOME;
  return (
    '<div class="pho-bio-standalone fade-in">' +
    '<div class="bio-side bio-side--row">' +
    '<div class="bio-photo-col pho-bio-photo">' +
    photoBioMediaHtml() +
    '</div><div class="bio-copy-col">' +
    '<div class="bio-name" style="color:#1c1410;">' +
    escapeHtml(h.bio.name) +
    '</div><div class="bio-role" style="color:#c8a97e;">' +
    escapeHtml(h.bio.role) +
    '</div><div class="bio-body" style="color:#9a8878;">' +
    escapeHtml(h.bio.body) +
    "</div></div></div></div>"
  );
}

function buildPhotoHomeInnerHtml() {
  const h = PHOTO_HOME;
  const g = h.gradStrip;
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

  return (
    '<div class="stats">' +
    statsHtml +
    '</div><div class="wheel-wrap">' +
    '<div class="sec-hdr">' +
    '<span class="sec-title" style="color:#9a8878;">' +
    escapeHtml(h.carouselSectionTitle) +
    '</span><span class="sec-count" id="sc" style="color:#c8a97e;"></span></div>' +
    '<div class="wheel-outer">' +
    '<div class="wheel" id="wheel"><div class="slides-track" id="slides-track"></div></div>' +
    '<button class="wheel-arr wl" id="warr-l" aria-label="Previous"><i class="ti ti-arrow-left"></i></button>' +
    '<button class="wheel-arr wr" id="warr-r" aria-label="Next"><i class="ti ti-arrow-right"></i></button>' +
    "</div>" +
    '<div class="wheel-nav">' +
    '<button class="wbtn" id="prev" aria-label="Previous"><i class="ti ti-arrow-left"></i></button>' +
    '<div class="wheel-dots" id="dots"></div>' +
    '<button class="wbtn" id="next" aria-label="Next"><i class="ti ti-arrow-right"></i></button>' +
    "</div></div>" +
    '<div style="padding: 4px 18px 6px;">' +
    '<div class="sec-hdr" style="margin-bottom:14px;">' +
    '<span class="sec-title" style="color:#9a8878;">' +
    escapeHtml(g.sectionTitle) +
    '</span><span style="font-family:\'DM Mono\',monospace;font-size:11.25px;color:#c8a97e;cursor:pointer;" onclick="showPage(\'page-grad\')">' +
    escapeHtml(g.seeAllLabel) +
    "</span></div></div>" +
    '<div class="grad-preview fade-in" onclick="showPage(\'page-grad\')">' +
    '<div class="grad-preview-img" id="grad-preview-img">' +
    gradTeaserImageBlock() +
    "</div>" +
    '<div class="grad-preview-body">' +
    '<div class="grad-preview-eyebrow">' +
    escapeHtml(g.eyebrow) +
    '</div><div class="grad-preview-title">' +
    g.titleHtml +
    '</div><div class="grad-preview-desc">' +
    escapeHtml(g.desc) +
    '</div><button class="grad-preview-cta" onclick="event.stopPropagation();showPage(\'page-grad\')">' +
    '<i class="ti ti-school" style="font-size:16.25px;"></i> ' +
    escapeHtml(g.ctaLabel) +
    "</button></div></div>" +
    photoBioStandaloneHtml() +
    '<div class="divider" style="background:#e0d8cd;margin-top:0;"></div>' +
    '<div class="works">' +
    '<div class="sec-hdr">' +
    '<span class="sec-title" style="color:#9a8878;">' +
    escapeHtml(h.seriesSectionTitle) +
    '</span><span class="sec-count" style="color:#c8a97e;" id="series-count"></span></div>' +
    '<div class="grid" id="series-grid"></div></div>'
  );
}

function buildGradPageInnerHtml() {
  const p = PHOTO_GRAD_PAGE;
  var pkgs = p.packages
    .map(function (pkg) {
      var feat = pkg.features
        .map(function (f) {
          return "<li>" + escapeHtml(f) + "</li>";
        })
        .join("");
      var badge = pkg.badge
        ? '<div class="pkg-badge">' + escapeHtml(pkg.badge) + "</div>"
        : "";
      var featured = pkg.featured ? " featured" : "";
      return (
        '<div class="pkg-card' +
        featured +
        '">' +
        badge +
        '<div class="pkg-name">' +
        escapeHtml(pkg.name) +
        '</div><div class="pkg-price">' +
        escapeHtml(pkg.price) +
        "<span>" +
        escapeHtml(pkg.priceNote) +
        '</span></div><ul class="pkg-features">' +
        feat +
        "</ul></div>"
      );
    })
    .join("");

  var testi = p.testimonials
    .map(function (t) {
      return (
        '<div class="testi"><div class="testi-text">' +
        escapeHtml(t.text) +
        '</div><div class="testi-name">' +
        escapeHtml(t.attribution) +
        "</div></div>"
      );
    })
    .join("");

  var faq = p.faq
    .map(function (item) {
      return (
        '<div class="faq-item" onclick="toggleFaq(this)">' +
        '<div class="faq-q">' +
        escapeHtml(item.q) +
        '<i class="ti ti-plus"></i></div>' +
        '<div class="faq-a">' +
        escapeHtml(item.a) +
        "</div></div>"
      );
    })
    .join("");

  return (
    '<div class="grad-hero">' +
    '<div class="grad-eyebrow">' +
    escapeHtml(p.heroEyebrow) +
    '</div><h1 class="grad-title-big">' +
    p.heroTitleHtml +
    '</h1><p class="grad-tagline">' +
    escapeHtml(p.heroTagline) +
    '</p><button class="grad-cta-big" onclick="showPage(\'page-contact-grad\')"><i class="ti ti-calendar"></i> ' +
    escapeHtml(p.heroCtaLabel) +
    "</button></div>" +
    '<div class="grad-section"><div class="grad-sec-label">' +
    escapeHtml(p.gallerySectionLabel) +
    '</div><div class="grad-justified-gallery" id="grad-gallery"></div></div>' +
    '<div class="grad-section" style="padding-top:0;"><div class="grad-sec-label">' +
    escapeHtml(p.packagesSectionLabel) +
    '</div><div class="package-grid">' +
    pkgs +
    "</div></div>" +
    '<div class="grad-section" style="padding-top:0;"><div class="grad-sec-label">' +
    escapeHtml(p.testimonialsSectionLabel) +
    '</div><div class="testimonial-row">' +
    testi +
    "</div></div>" +
    '<div class="grad-section" style="padding-top:0;"><div class="grad-sec-label">' +
    escapeHtml(p.faqSectionLabel) +
    '</div><div class="faq-list">' +
    faq +
    "</div></div>" +
    '<div class="grad-section" style="padding-top:0;padding-bottom:28px;">' +
    '<button class="grad-cta-big" style="width:100%;justify-content:center;" onclick="showPage(\'page-contact-grad\')"><i class="ti ti-calendar"></i> ' +
    escapeHtml(p.bottomCtaLabel) +
    "</button></div>"
  );
}

function buildContactGradInnerHtml() {
  const c = PHOTO_CONTACT_GRAD;
  const f = c.fields;
  return (
    '<div class="contact-wrap">' +
    '<div class="contact-eyebrow">' +
    escapeHtml(c.eyebrow) +
    '</div><h1 class="contact-heading">' +
    c.headingHtml +
    '</h1><p class="contact-sub">' +
    escapeHtml(c.sub) +
    '</p><div class="email-note"><i class="ti ti-mail"></i> ' +
    escapeHtml(c.emailNote) +
    '</div><div id="grad-form">' +
    '<div class="cf"><label for="gf-name">' +
    escapeHtml(f.nameLabel) +
    '</label><input type="text" id="gf-name" placeholder="' +
    escapeAttr(f.namePlaceholder) +
    '"></div>' +
    '<div class="cf"><label for="gf-email">' +
    escapeHtml(f.emailLabel) +
    '</label><input type="email" id="gf-email" placeholder="' +
    escapeAttr(f.emailPlaceholder) +
    '"></div>' +
    '<div class="cf"><label for="gf-msg">' +
    escapeHtml(f.messageLabel) +
    '</label><textarea id="gf-msg" placeholder="' +
    escapeAttr(f.messagePlaceholder) +
    '"></textarea></div>' +
    '<button class="pho-submit" onclick="submitForm(\'grad-form\',\'grad-succ\')"><i class="ti ti-send"></i> ' +
    escapeHtml(c.submitLabel) +
    "</button></div>" +
    '<div class="form-succ" id="grad-succ"><div class="big">' +
    escapeHtml(c.successTitle) +
    "</div><p>" +
    escapeHtml(c.successBody) +
    "</p></div></div>"
  );
}

function buildContactGeneralInnerHtml() {
  const c = PHOTO_CONTACT_GENERAL;
  const f = c.fields;
  var socials = "";
  if (c.socialLinks && c.socialLinks.length) {
    socials =
      '<div class="socials-title">' +
      escapeHtml(c.socialsTitle) +
      "</div>" +
      c.socialLinks
        .map(function (s) {
          return (
            '<a href="' +
            escapeAttr(s.href) +
            '" class="soc-link" target="_blank" rel="noopener noreferrer"><i class="ti ' +
            escapeAttr(s.icon) +
            '"></i><div><div>' +
            escapeHtml(s.title) +
            '</div><div class="soc-sub">' +
            escapeHtml(s.subtitle) +
            "</div></div></a>"
          );
        })
        .join("");
  }
  return (
    '<div class="contact-wrap">' +
    '<div class="contact-eyebrow">' +
    escapeHtml(c.eyebrow) +
    '</div><h1 class="contact-heading">' +
    c.headingHtml +
    '</h1><p class="contact-sub">' +
    escapeHtml(c.sub) +
    '</p><div class="email-note"><i class="ti ti-mail"></i> ' +
    escapeHtml(c.emailNote) +
    '</div><div id="gen-form">' +
    '<div class="cf"><label for="gn-name">' +
    escapeHtml(f.nameLabel) +
    '</label><input type="text" id="gn-name" placeholder="' +
    escapeAttr(f.namePlaceholder) +
    '"></div>' +
    '<div class="cf"><label for="gn-email">' +
    escapeHtml(f.emailLabel) +
    '</label><input type="email" id="gn-email" placeholder="' +
    escapeAttr(f.emailPlaceholder) +
    '"></div>' +
    '<div class="cf"><label for="gn-msg">' +
    escapeHtml(f.messageLabel) +
    '</label><textarea id="gn-msg" placeholder="' +
    escapeAttr(f.messagePlaceholder) +
    '"></textarea></div>' +
    '<button class="pho-submit" onclick="submitForm(\'gen-form\',\'gen-succ\')"><i class="ti ti-send"></i> ' +
    escapeHtml(c.submitLabel) +
    "</button></div>" +
    '<div class="form-succ" id="gen-succ"><div class="big">' +
    escapeHtml(c.successTitle) +
    "</div><p>" +
    escapeHtml(c.successBody) +
    "</p></div>" +
    socials +
    "</div>"
  );
}

/** Call after #app innerHTML is set; fills all photography views from config.js */
export function mountPhotographyFromConfig() {
  var pp = document.getElementById("pp");
  if (pp) pp.innerHTML = buildPhotoHomeInnerHtml();

  var grad = document.getElementById("page-grad");
  if (grad) grad.innerHTML = phoDetNav("page-home") + buildGradPageInnerHtml();

  var cg = document.getElementById("page-contact-grad");
  if (cg) cg.innerHTML = phoDetNav("page-grad") + buildContactGradInnerHtml();

  var gen = document.getElementById("page-contact-general");
  if (gen) gen.innerHTML = phoDetNav("page-home") + buildContactGeneralInnerHtml();

  var series = document.getElementById("page-series-detail");
  if (series) {
    series.innerHTML =
      phoDetNav("page-home") + '<div id="series-detail-content"></div>';
  }
}
