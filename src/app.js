import { CAROUSEL_PHOTOS, SERIES, GRAD_PHOTOS } from "./photography/config.js";

/* ══════════════════════════════════════════════════════════════
   ADAPTIVE GRID BUILDER
   Loads images, detects orientation, builds grid automatically.
   Portrait  → single column cell
   Landscape → full-width cell (spans both columns)
══════════════════════════════════════════════════════════════ */
function buildAdaptiveGrid(container, folder, filenames, fallbackCount) {
  if (!container) return;
  container.innerHTML = "";

  if (!filenames || filenames.length === 0) {
    var count = fallbackCount || 6;
    for (var i = 0; i < count; i++) {
      var cell = document.createElement("div");
      cell.className = "ag-cell portrait";
      cell.innerHTML =
        '<div class="ag-cell-placeholder"><i class="ti ti-camera" style="font-size:27.5px;color:#9a8878;"></i><span class="sl">Photo ' +
        (i + 1) +
        "</span></div>";
      container.appendChild(cell);
    }
    return;
  }

  var loaded = 0;
  var cells = [];

  filenames.forEach(function (filename, idx) {
    var src = folder + filename;
    var cell = document.createElement("div");
    cell.className = "ag-cell";
    cells.push(cell);
    container.appendChild(cell);

    var img = new Image();
    img.onload = function () {
      var isLandscape = img.naturalWidth >= img.naturalHeight;
      cell.classList.add(isLandscape ? "landscape" : "portrait");
      cell.innerHTML = "";
      cell.appendChild(img);
      var cap = document.createElement("div");
      cap.className = "ag-caption";
      cap.textContent = filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      cell.appendChild(cap);
      loaded++;
    };
    img.onerror = function () {
      cell.classList.add("portrait");
      cell.innerHTML =
        '<div class="ag-cell-placeholder"><i class="ti ti-camera" style="font-size:27.5px;color:#9a8878;"></i><span class="sl">' +
        filename +
        "</span></div>";
      loaded++;
    };
    img.src = src;
    img.alt = filename;
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.display = "block";
  });
}

/* ══════════════════════════════════════════════════════════════
   CAROUSEL BUILDER
══════════════════════════════════════════════════════════════ */
var carouselCur = 0,
  carouselTotal = 0,
  carouselTimer = null;

function buildCarousel() {
  var track = document.getElementById("slides-track");
  var dotsEl = document.getElementById("dots");
  var scEl = document.getElementById("sc");
  track.innerHTML = "";
  dotsEl.innerHTML = "";

  var photos = CAROUSEL_PHOTOS;
  if (!photos || photos.length === 0) {
    for (var i = 0; i < 5; i++) {
      var slide = document.createElement("div");
      slide.className = "c-slide";
      slide.innerHTML =
        '<div class="c-slide-placeholder"><i class="ti ti-camera" style="font-size:27.5px;color:#9a8878;"></i><span class="sl">Photo ' +
        (i + 1) +
        "</span></div>";
      track.appendChild(slide);
    }
    carouselTotal = 5;
  } else {
    photos.forEach(function (p) {
      var slide = document.createElement("div");
      slide.className = "c-slide";
      var img = document.createElement("img");
      img.src = p.src;
      img.alt = p.caption || "";
      slide.appendChild(img);
      if (p.caption) {
        var cap = document.createElement("div");
        cap.className = "c-slide-caption";
        cap.textContent = p.caption;
        slide.appendChild(cap);
      }
      track.appendChild(slide);
    });
    carouselTotal = photos.length;
  }

  for (var j = 0; j < carouselTotal; j++) {
    var d = document.createElement("div");
    d.className = "dot" + (j === 0 ? " active" : "");
    dotsEl.appendChild(d);
  }
  updateCarousel();
}

function updateCarousel() {
  var track = document.getElementById("slides-track");
  var dotsEl = document.getElementById("dots");
  var scEl = document.getElementById("sc");
  track.style.transform = "translateX(-" + carouselCur * 100 + "%)";
  if (scEl) scEl.textContent = carouselCur + 1 + " / " + carouselTotal;
  var ds = dotsEl.querySelectorAll(".dot");
  ds.forEach(function (d, i) {
    d.className = "dot" + (i === carouselCur ? " active" : "");
  });
}

function goTo(n) {
  carouselCur = (n + carouselTotal) % carouselTotal;
  updateCarousel();
}

function startTimer() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(function () {
    goTo(carouselCur + 1);
  }, 5000);
}
function resetTimer() {
  clearInterval(carouselTimer);
  startTimer();
}

/* ══════════════════════════════════════════════════════════════
   SERIES CARDS BUILDER
══════════════════════════════════════════════════════════════ */
var SVG_ICONS = [
  '<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><rect x="7" y="11" width="36" height="26" rx="2" fill="none" stroke="#c8a97e" stroke-width="1.1" opacity=".6"/><circle cx="25" cy="24" r="7" stroke="#c8a97e" stroke-width="1.1" opacity=".8"/><circle cx="25" cy="24" r="3" fill="#c8a97e" opacity=".7"/></svg>',
  '<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><path d="M6 38 Q16 10 25 28 Q34 44 44 16" stroke="#c8a97e" stroke-width="1.4" fill="none" opacity=".7"/><circle cx="25" cy="11" r="5" fill="none" stroke="#c8a97e" stroke-width="1.1" opacity=".5"/></svg>',
  '<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><circle cx="25" cy="21" r="10" fill="none" stroke="#c8a97e" stroke-width="1.1" opacity=".6"/><path d="M19 27 Q25 33 31 27" stroke="#c8a97e" stroke-width="1.1" fill="none" opacity=".8"/></svg>',
  '<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><rect x="6" y="6" width="38" height="38" rx="2" fill="none" stroke="#c8a97e" stroke-width=".5" opacity=".3"/><rect x="11" y="11" width="8" height="6" rx="1" fill="#c8a97e" opacity=".4"/><rect x="27" y="16" width="10" height="13" rx="1" fill="#c8a97e" opacity=".5"/></svg>',
  '<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><path d="M6 44 L15 25 L23 35 L33 13 L44 32" stroke="#c8a97e" stroke-width="1.4" fill="none" opacity=".5"/></svg>',
  '<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><ellipse cx="25" cy="32" rx="15" ry="8" stroke="#c8a97e" stroke-width="1.1" opacity=".4"/><path d="M12 28 Q25 8 38 28" stroke="#c8a97e" stroke-width="1.1" fill="none" opacity=".6"/><circle cx="25" cy="18" r="4" fill="#c8a97e" opacity=".5"/></svg>',
];

function buildSeriesGrid() {
  var grid = document.getElementById("series-grid");
  var count = document.getElementById("series-count");
  if (!grid) return;
  grid.innerHTML = "";
  if (count) count.textContent = String(SERIES.length).padStart(2, "0") + " series";

  SERIES.forEach(function (s, idx) {
    var card = document.createElement("div");
    card.className = "pho-card";
    card.onclick = function () {
      openSeriesDetail(s);
    };

    var coverHtml;
    if (s.images && s.images.length > 0) {
      coverHtml =
        '<div class="pho-card-img"><img src="' +
        s.folder +
        s.images[0] +
        '" alt="' +
        s.title +
        '"></div>';
    } else {
      coverHtml =
        '<div class="pho-card-img" style="background:#ede8e0;">' +
        SVG_ICONS[idx % SVG_ICONS.length] +
        "</div>";
    }

    card.innerHTML =
      coverHtml +
      '<div class="pho-card-body">' +
      '<div class="pho-cc">' +
      s.tag.split("·")[0].trim() +
      "</div>" +
      '<div class="pho-cn">' +
      s.title +
      "</div>" +
      '<div class="pho-cs">' +
      s.meta +
      "</div>" +
      '<div class="pho-clh"><i class="ti ti-arrow-up-right" style="font-size:11.25px;"></i>View</div>' +
      "</div>";
    grid.appendChild(card);
  });
}

function openSeriesDetail(s) {
  var content = document.getElementById("series-detail-content");
  var titleHtml = s.title.replace(s.titleItalic, "<em>" + s.titleItalic + "</em>");
  var tagsHtml = s.tags
    .map(function (t) {
      return '<span class="stag">' + t + "</span>";
    })
    .join("");

  content.innerHTML =
    '<div class="series-hero">' +
    '<div class="series-eyebrow">' +
    s.tag +
    "</div>" +
    '<h1 class="series-title-big">' +
    titleHtml +
    "</h1>" +
    '<div class="series-meta">' +
    s.meta +
    (s.shots ? " · " + s.shots : "") +
    "</div>" +
    '<p class="series-desc">' +
    s.desc +
    "</p>" +
    '<div class="stags">' +
    tagsHtml +
    "</div>" +
    "</div>" +
    '<div class="photo-grid-wrap">' +
    '<div class="photo-grid-label">Series photos</div>' +
    '<div class="adaptive-grid" id="series-adaptive-grid"></div>' +
    "</div>" +
    '<div class="specs-grid">' +
    '<div class="spec-card"><div class="spec-lbl">Camera</div><div class="spec-val">' +
    (s.camera || "—") +
    "</div></div>" +
    '<div class="spec-card"><div class="spec-lbl">Film</div><div class="spec-val">' +
    (s.film || "—") +
    "</div></div>" +
    '<div class="spec-card"><div class="spec-lbl">Duration</div><div class="spec-val">' +
    (s.duration || "—") +
    "</div></div>" +
    '<div class="spec-card"><div class="spec-lbl">Total shots</div><div class="spec-val">' +
    (s.shots || "—") +
    "</div></div>" +
    "</div>";

  showPage("page-series-detail");

  requestAnimationFrame(function () {
    var grid = document.getElementById("series-adaptive-grid");
    buildAdaptiveGrid(grid, s.folder, s.images, 8);
  });
}

function sumAspectRatios(row) {
  var s = 0;
  for (var k = 0; k < row.length; k++) s += row[k].w / row[k].h;
  return s;
}

function rowHeightForWidth(row, widthPx, gapPx) {
  if (row.length === 0) return 0;
  return (widthPx - (row.length - 1) * gapPx) / sumAspectRatios(row);
}

/**
 * Grad sample page: justified rows (Flickr-style) so images keep aspect ratio,
 * pack edge-to-edge, and order can differ from config for nicer rows.
 */
function buildGradGallery() {
  var grid = document.getElementById("grad-gallery");
  if (!grid) return;

  var folder = GRAD_PHOTOS.folder;
  var names = GRAD_PHOTOS.images;
  if (!names || names.length === 0) {
    grid.className = "adaptive-grid";
    buildAdaptiveGrid(grid, folder, [], 6);
    return;
  }

  grid.className = "grad-justified-gallery";
  grid.innerHTML = "";

  var items = [];
  var pending = names.length;

  function tryLayout() {
    if (items.length === 0) {
      grid.className = "adaptive-grid";
      buildAdaptiveGrid(grid, folder, [], 6);
      return;
    }
    items.sort(function (a, b) {
      return b.w / b.h - a.w / a.h;
    });
    grid._gradItems = items;

    function layout() {
      var W = grid.clientWidth;
      var list = grid._gradItems;
      if (!list || list.length === 0) return;
      if (W < 48) return;

      var gap = 8;
      var minH = 140;
      var maxH = 400;
      grid.innerHTML = "";

      var i = 0;
      var n = list.length;
      while (i < n) {
        var row = [list[i++]];
        var h = rowHeightForWidth(row, W, gap);
        while (h > maxH && i < n) {
          row.push(list[i++]);
          h = rowHeightForWidth(row, W, gap);
        }

        while (i < n) {
          var cand = row.concat([list[i]]);
          var ch = rowHeightForWidth(cand, W, gap);
          if (ch < minH) break;
          row = cand;
          i++;
          h = ch;
        }

        var sumAr = sumAspectRatios(row);
        h = (W - (row.length - 1) * gap) / sumAr;
        if (h > maxH && row.length === 1) {
          h = maxH;
        }

        var rowEl = document.createElement("div");
        rowEl.className = "grad-jg-row";
        rowEl.style.gap = gap + "px";
        rowEl.style.marginBottom = gap + "px";
        rowEl.style.height = h + "px";

        var contentW = h * sumAr + (row.length - 1) * gap;
        if (W - contentW > 4) {
          rowEl.classList.add("grad-jg-row--center");
        }

        for (var r = 0; r < row.length; r++) {
          var it = row[r];
          var cw = h * (it.w / it.h);
          var cell = document.createElement("div");
          cell.className = "grad-jg-cell";
          cell.style.width = cw + "px";
          cell.style.flexShrink = "0";
          var imgEl = document.createElement("img");
          imgEl.src = it.src;
          imgEl.alt = "";
          imgEl.loading = "lazy";
          cell.appendChild(imgEl);
          rowEl.appendChild(cell);
        }
        grid.appendChild(rowEl);
      }
    }

    grid._gradLayout = layout;

    layout();

    if (typeof ResizeObserver !== "undefined") {
      if (!grid._gradRo) {
        var roScheduled = false;
        grid._gradRo = new ResizeObserver(function () {
          if (roScheduled) return;
          roScheduled = true;
          requestAnimationFrame(function () {
            roScheduled = false;
            layout();
          });
        });
        grid._gradRo.observe(grid);
      }
    }
  }

  names.forEach(function (filename) {
    var src = folder + filename;
    var im = new Image();
    im.onload = function () {
      items.push({ src: src, w: im.naturalWidth, h: im.naturalHeight });
      pending--;
      if (pending === 0) tryLayout();
    };
    im.onerror = function () {
      pending--;
      if (pending === 0) tryLayout();
    };
    im.src = src;
  });
}

/* ══════════════════════════════════════════════════════════════
   TOGGLE, NAVIGATION, FORMS
══════════════════════════════════════════════════════════════ */
var isP = false;
function sw() {
  isP = !isP;
  var p = document.getElementById("port");
  p.className = isP ? "pho" : "eng";
  document.getElementById("tog").setAttribute("aria-checked", isP ? "true" : "false");
  document.getElementById("le").classList.toggle("on", !isP);
  document.getElementById("lp").classList.toggle("on", isP);
  document.getElementById("pe").classList.toggle("active", !isP);
  document.getElementById("pp").classList.toggle("active", isP);
  document.getElementById("nav-li").style.display = isP ? "none" : "flex";
  document.getElementById("nav-ig").style.display = isP ? "flex" : "none";
  if (isP) {
    startTimer();
  } else {
    clearInterval(carouselTimer);
  }
}

function showPage(id, scrollSmooth) {
  document.querySelectorAll(".page").forEach(function (p) {
    p.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
  if (scrollSmooth) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.scrollTo(0, 0);
  }
  if (id === "page-grad") {
    var gg = document.getElementById("grad-gallery");
    if (gg && gg._gradLayout) {
      requestAnimationFrame(function () {
        gg._gradLayout();
      });
    }
  }
}
function goHome() {
  showPage("page-home", true);
}

function submitForm(formId, succId) {
  var form = document.getElementById(formId);
  var valid = true;
  form.querySelectorAll("input, textarea").forEach(function (el) {
    if (!el.value.trim()) valid = false;
  });
  if (!valid) return;
  form.style.display = "none";
  document.getElementById(succId).style.display = "block";
}

function toggleFaq(el) {
  var isOpen = el.classList.contains("open");
  document.querySelectorAll(".faq-item").forEach(function (f) {
    f.classList.remove("open");
  });
  if (!isOpen) el.classList.add("open");
}

/* ══════════════════════════════════════════════════════════════
   Album / grad gallery fullscreen lightbox
══════════════════════════════════════════════════════════════ */
var photoLightboxEl = null;
var photoLightboxImg = null;

function ensurePhotoLightbox() {
  if (photoLightboxEl) return;
  photoLightboxEl = document.createElement("div");
  photoLightboxEl.id = "photo-lightbox";
  photoLightboxEl.className = "photo-lightbox";
  photoLightboxEl.setAttribute("role", "dialog");
  photoLightboxEl.setAttribute("aria-modal", "true");
  photoLightboxEl.setAttribute("aria-hidden", "true");
  photoLightboxEl.innerHTML =
    '<button type="button" class="photo-lightbox-close" aria-label="Close"><i class="ti ti-x"></i></button>';
  photoLightboxImg = document.createElement("img");
  photoLightboxImg.alt = "";
  photoLightboxEl.appendChild(photoLightboxImg);
  photoLightboxEl.querySelector(".photo-lightbox-close").addEventListener("click", function (e) {
    e.stopPropagation();
    closePhotoLightbox();
  });
  photoLightboxEl.addEventListener("click", function (e) {
    if (e.target === photoLightboxEl) closePhotoLightbox();
  });
  document.body.appendChild(photoLightboxEl);
}

function openPhotoLightbox(src, alt) {
  if (!src) return;
  ensurePhotoLightbox();
  photoLightboxImg.src = src;
  photoLightboxImg.alt = alt || "";
  photoLightboxEl.classList.add("open");
  photoLightboxEl.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePhotoLightbox() {
  if (!photoLightboxEl || !photoLightboxEl.classList.contains("open")) return;
  photoLightboxEl.classList.remove("open");
  photoLightboxEl.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  photoLightboxImg.removeAttribute("src");
  photoLightboxImg.alt = "";
}

function onDocumentClickPhotoLightbox(e) {
  if (e.target.tagName !== "IMG") return;
  if (e.target.closest(".photo-lightbox")) return;

  var gradCell = e.target.closest("#grad-gallery .grad-jg-cell");
  if (gradCell && gradCell.querySelector(":scope > img") === e.target) {
    e.preventDefault();
    e.stopPropagation();
    openPhotoLightbox(e.target.currentSrc || e.target.src, e.target.getAttribute("alt") || "");
    return;
  }

  var cell = e.target.closest(".ag-cell");
  if (!cell || !cell.closest(".adaptive-grid")) return;
  if (cell.querySelector(":scope > img") !== e.target) return;
  e.preventDefault();
  e.stopPropagation();
  openPhotoLightbox(e.target.currentSrc || e.target.src, e.target.getAttribute("alt") || "");
}

function onDocumentKeydownPhotoLightbox(e) {
  if (e.key !== "Escape") return;
  if (photoLightboxEl && photoLightboxEl.classList.contains("open")) closePhotoLightbox();
}

export function initApp() {
  window.showPage = showPage;
  window.goHome = goHome;
  window.sw = sw;
  window.submitForm = submitForm;
  window.toggleFaq = toggleFaq;

  buildCarousel();
  buildSeriesGrid();
  buildGradGallery();

  document.getElementById("tog").addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      sw();
    }
  });

  document.getElementById("prev").onclick = document.getElementById("warr-l").onclick = function () {
    goTo(carouselCur - 1);
    resetTimer();
  };
  document.getElementById("next").onclick = document.getElementById("warr-r").onclick = function () {
    goTo(carouselCur + 1);
    resetTimer();
  };

  var sx = 0;
  var wheelEl = document.getElementById("wheel");
  wheelEl.addEventListener(
    "touchstart",
    function (e) {
      sx = e.touches[0].clientX;
    },
    { passive: true }
  );
  wheelEl.addEventListener(
    "touchend",
    function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) {
        dx < 0 ? goTo(carouselCur + 1) : goTo(carouselCur - 1);
        resetTimer();
      }
    },
    { passive: true }
  );

  document.addEventListener("click", onDocumentClickPhotoLightbox, true);
  document.addEventListener("keydown", onDocumentKeydownPhotoLightbox);
}
