import {
  PHOTO_HOME,
  PHOTO_GRAD_PAGE,
  PHOTO_CONTACT_GRAD,
  PHOTO_CONTACT_GENERAL,
} from "./config.js";
import { assetUrl } from "../asset-url.js";

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

function photoInstagramHref() {
  var igHref = "https://instagram.com";
  if (PHOTO_CONTACT_GENERAL.socialLinks) {
    PHOTO_CONTACT_GENERAL.socialLinks.forEach(function (s) {
      if (s.icon === "ti-brand-instagram") igHref = s.href;
    });
  }
  return igHref;
}

/** Nav links for the shared #photo-sidebar (mounted once; active state via updatePhotoSidebar). */
var PHOTO_NAV_LABELS = {
  "page-home": "Home",
  "page-grad": "Grad Photos",
  "page-bio": "Bio",
  "page-instagram": "Instagram",
  "page-contact": "Contact",
  "page-contact-general": "Contact",
  "page-contact-grad": "Contact",
};

function buildPhotoSidebarNavHtml() {
  var igHref = photoInstagramHref();
  return (
    '<nav class="mk-nav" id="photo-mk-nav">' +
    '<button type="button" class="mk-nav-menu-btn" id="photo-nav-menu-btn" aria-expanded="false" aria-controls="photo-nav-menu" aria-haspopup="true">' +
    '<span class="mk-nav-menu-label" id="photo-nav-menu-label">Home</span>' +
    '<i class="ti ti-chevron-down" aria-hidden="true"></i>' +
    "</button>" +
    '<div class="mk-nav-group" id="photo-nav-menu" role="menu">' +
    '<button type="button" class="mk-nav-link" role="menuitem" data-pho-nav="page-home" onclick="goHome()">Home</button>' +
    '<button type="button" class="mk-nav-link" role="menuitem" data-pho-nav="page-grad" onclick="showPage(\'page-grad\')">Grad Photos</button>' +
    '<button type="button" class="mk-nav-link" role="menuitem" data-pho-nav="page-bio" onclick="showPage(\'page-bio\')">Bio</button>' +
    '<a class="mk-nav-link" role="menuitem" data-pho-nav="page-instagram" href="' +
    escapeAttr(igHref) +
    '" target="_blank" rel="noopener noreferrer">Instagram</a>' +
    '<button type="button" class="mk-nav-link" role="menuitem" data-pho-nav="page-contact" onclick="showPage(\'page-contact-general\')">Contact</button>' +
    "</div></nav>"
  );
}

function setPhotoNavMenuOpen(open) {
  var nav = document.getElementById("photo-mk-nav");
  var btn = document.getElementById("photo-nav-menu-btn");
  var menu = document.getElementById("photo-nav-menu");
  if (!nav || !btn || !menu) return;
  nav.classList.toggle("is-open", open);
  btn.setAttribute("aria-expanded", open ? "true" : "false");
  if (open) {
    var rect = btn.getBoundingClientRect();
    menu.style.top = Math.round(rect.bottom + 6) + "px";
    menu.style.left = Math.round(rect.left) + "px";
    menu.style.width = Math.round(Math.min(280, Math.max(160, rect.width))) + "px";
    menu.style.right = "auto";
  } else {
    menu.style.top = "";
    menu.style.left = "";
    menu.style.width = "";
    menu.style.right = "";
  }
}

export function updatePhotoSidebar(activePageId) {
  var sidebar = document.getElementById("photo-sidebar");
  if (!sidebar) return;
  var contactActive =
    activePageId === "page-contact-general" || activePageId === "page-contact-grad";
  var labelKey = contactActive ? "page-contact" : activePageId;
  var labelEl = document.getElementById("photo-nav-menu-label");
  if (labelEl) {
    labelEl.textContent = PHOTO_NAV_LABELS[labelKey] || "Menu";
  }
  sidebar.querySelectorAll("[data-pho-nav]").forEach(function (el) {
    var key = el.getAttribute("data-pho-nav");
    var active =
      key === activePageId ||
      (key === "page-contact" && contactActive);
    el.classList.toggle("mk-nav-link--active", active);
  });
  setPhotoNavMenuOpen(false);
}

function bindPhotoNavDropdown() {
  var btn = document.getElementById("photo-nav-menu-btn");
  var nav = document.getElementById("photo-mk-nav");
  var menu = document.getElementById("photo-nav-menu");
  if (!btn || !nav || !menu || btn._phoNavBound) return;
  btn._phoNavBound = true;

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    setPhotoNavMenuOpen(!nav.classList.contains("is-open"));
  });

  menu.querySelectorAll(".mk-nav-link").forEach(function (el) {
    el.addEventListener("click", function () {
      setPhotoNavMenuOpen(false);
    });
  });

  document.addEventListener(
    "click",
    function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || menu.contains(e.target)) return;
      setPhotoNavMenuOpen(false);
    },
    true
  );

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setPhotoNavMenuOpen(false);
  });

  window.addEventListener(
    "resize",
    function () {
      if (nav.classList.contains("is-open")) setPhotoNavMenuOpen(true);
    },
    { passive: true }
  );

  window.addEventListener(
    "scroll",
    function () {
      if (nav.classList.contains("is-open")) setPhotoNavMenuOpen(false);
    },
    { passive: true, capture: true }
  );
}

function mountPhotoSidebar() {
  var sidebar = document.getElementById("photo-sidebar");
  if (sidebar) sidebar.innerHTML = buildPhotoSidebarNavHtml();
  bindPhotoNavDropdown();
}

function wrapPhotoPage(_activePageId, mainHtml) {
  return (
    '<div class="pho-page-layout">' +
    '<div class="mk-main mk-page-main">' +
    mainHtml +
    "</div></div>"
  );
}

function gradTeaserImageBlock() {
  const g = PHOTO_HOME.gradStrip;
  if (g.teaserImageSrc) {
    return (
      '<img src="' +
      escapeAttr(assetUrl(g.teaserImageSrc)) +
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

function buildPhotoHomeInnerHtml() {
  return wrapPhotoPage(
    "page-home",
    '<div class="mk-waterfall" id="mk-waterfall" aria-label="Photography gallery"></div>'
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

  var packagesSection =
    p.showPackages === false
      ? ""
      : '<div class="grad-section" style="padding-top:0;"><div class="grad-sec-label">' +
        escapeHtml(p.packagesSectionLabel) +
        '</div><div class="package-grid">' +
        pkgs +
        "</div></div>";

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
    '</div><div class="photo-collage-gallery" id="grad-gallery"></div></div>' +
    packagesSection +
    '<div class="grad-section" style="padding-top:0;"><div class="grad-sec-label">' +
    escapeHtml(p.faqSectionLabel) +
    '</div><div class="faq-list">' +
    faq +
    "</div></div>" +
    '<div class="grad-section grad-section--footer">' +
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
    '<div class="form-err" id="grad-err" role="alert"></div>' +
    '<div class="cf"><label for="gf-name">' +
    escapeHtml(f.nameLabel) +
    '</label><input type="text" id="gf-name" name="name" autocomplete="name" placeholder="' +
    escapeAttr(f.namePlaceholder) +
    '"></div>' +
    '<div class="cf"><label for="gf-email">' +
    escapeHtml(f.emailLabel) +
    '</label><input type="email" id="gf-email" name="email" autocomplete="email" placeholder="' +
    escapeAttr(f.emailPlaceholder) +
    '"></div>' +
    '<div class="cf"><label for="gf-msg">' +
    escapeHtml(f.messageLabel) +
    '</label><textarea id="gf-msg" name="message" placeholder="' +
    escapeAttr(f.messagePlaceholder) +
    '"></textarea></div>' +
    '<button type="button" class="pho-submit" onclick="submitForm(\'grad-form\',\'grad-succ\',\'grad\')"><i class="ti ti-send"></i> ' +
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
    '<div class="form-err" id="gen-err" role="alert"></div>' +
    '<div class="cf"><label for="gn-name">' +
    escapeHtml(f.nameLabel) +
    '</label><input type="text" id="gn-name" name="name" autocomplete="name" placeholder="' +
    escapeAttr(f.namePlaceholder) +
    '"></div>' +
    '<div class="cf"><label for="gn-email">' +
    escapeHtml(f.emailLabel) +
    '</label><input type="email" id="gn-email" name="email" autocomplete="email" placeholder="' +
    escapeAttr(f.emailPlaceholder) +
    '"></div>' +
    '<div class="cf"><label for="gn-msg">' +
    escapeHtml(f.messageLabel) +
    '</label><textarea id="gn-msg" name="message" placeholder="' +
    escapeAttr(f.messagePlaceholder) +
    '"></textarea></div>' +
    '<button type="button" class="pho-submit" onclick="submitForm(\'gen-form\',\'gen-succ\',\'general\')"><i class="ti ti-send"></i> ' +
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

function buildBioPageInnerHtml() {
  const b = PHOTO_HOME.bio;
  const photos = b.photos || [];
  const src = photos[0] || b.avatarSrc || "";

  var photoHtml = src
    ? '<div class="bio-pg-photo">' +
      '<img src="' + escapeAttr(assetUrl(src)) + '" alt="' + escapeHtml(b.name) + '">' +
      "</div>"
    : '<div class="bio-pg-photo bio-pg-photo--ph"><i class="ti ti-user"></i></div>';

  return (
    '<div class="bio-pg-wrap">' +
    '<div class="bio-pg-photos">' + photoHtml + '</div>' +
    '<h2 class="bio-pg-title">' + escapeHtml(b.aboutTitle || 'About Me') + '</h2>' +
    '<div class="bio-pg-body">' + escapeHtml(b.body) + '</div>' +
    '</div>'
  );
}

/** Call after #app innerHTML is set; fills all photography views from config.js */
export function mountPhotographyFromConfig() {
  mountPhotoSidebar();

  var pp = document.getElementById("pp");
  if (pp) pp.innerHTML = buildPhotoHomeInnerHtml();

  var grad = document.getElementById("page-grad");
  if (grad) grad.innerHTML = wrapPhotoPage("page-grad", buildGradPageInnerHtml());

  var cg = document.getElementById("page-contact-grad");
  if (cg) cg.innerHTML = wrapPhotoPage("page-contact-grad", buildContactGradInnerHtml());

  var gen = document.getElementById("page-contact-general");
  if (gen) gen.innerHTML = wrapPhotoPage("page-contact-general", buildContactGeneralInnerHtml());

  var bio = document.getElementById("page-bio");
  if (bio) bio.innerHTML = wrapPhotoPage("page-bio", buildBioPageInnerHtml());

}
