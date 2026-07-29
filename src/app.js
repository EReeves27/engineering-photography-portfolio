import {
  GRAD_PHOTOS,
  HOME_PHOTOS,
  PHOTO_CONTACT_SUBMIT,
  PHOTO_FORMSPREE_URL,
} from "./photography/config.js";
import { updatePhotoSidebar } from "./photography/render-from-config.js";
import { applyCrtRoomLayoutVars } from "./engineering/crt-room.js";
import { assetUrl } from "./asset-url.js";
import { SERIES_ALBUM_IMAGES } from "virtual:series-album-images";

/** Last segment of `folder` (e.g. `/photos/san-sebastian/` → `san-sebastian`). */
function albumSlugFromFolder(folder) {
  var s = String(folder || "").replace(/\/+$/, "");
  var m = s.match(/\/photos\/([^/]+)$/);
  return m ? m[1] : "";
}

/** Manual `images` in config wins; else filenames from `public/photos/home-photos/` at build time. */
function resolvedHomeImages() {
  if (HOME_PHOTOS.images && HOME_PHOTOS.images.length > 0) return HOME_PHOTOS.images;
  var slug = albumSlugFromFolder(HOME_PHOTOS.folder);
  var list = SERIES_ALBUM_IMAGES[slug];
  return Array.isArray(list) ? list.slice() : [];
}

/** Optional `GRAD_PHOTOS.images` overrides auto-list for `public/photos/grad/`. */
function resolvedGradImages() {
  if (GRAD_PHOTOS.images && GRAD_PHOTOS.images.length > 0) return GRAD_PHOTOS.images;
  var slug = albumSlugFromFolder(GRAD_PHOTOS.folder);
  var list = SERIES_ALBUM_IMAGES[slug];
  return Array.isArray(list) ? list.slice() : [];
}

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
    var src = assetUrl(folder + filename);
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
   HOME WATERFALL — scroll gallery from public/photos/home-photos/
══════════════════════════════════════════════════════════════ */
var mkWaterfallObserver = null;
var mkWaterfallMetaCache = null;
var mkWaterfallResizeBound = false;
var WATERFALL_PACK_ATTEMPTS = 50;

function waterfallColCount() {
  var w = window.innerWidth || 800;
  if (w >= 1080) return 3;
  if (w >= 720) return 2;
  return 1;
}

/** Relative row height when item spans `span` columns (aspect ratio preserved). */
function waterfallItemHeight(meta, span) {
  return span / (meta.w / meta.h);
}

function waterfallPackScore(heights) {
  var max = heights[0];
  var min = heights[0];
  for (var i = 1; i < heights.length; i++) {
    if (heights[i] > max) max = heights[i];
    if (heights[i] < min) min = heights[i];
  }
  return max - min;
}

function placeWaterfallInColumns(heights, cols, meta) {
  var landscape = meta.w >= meta.h;
  var span = landscape && cols >= 2 ? 2 : 1;
  var h = waterfallItemHeight(meta, span);

  if (span === 1) {
    var col = 0;
    for (var i = 1; i < cols; i++) {
      if (heights[i] < heights[col]) col = i;
    }
    heights[col] += h;
    return;
  }

  if (cols === 2) {
    var rowBase = Math.max(heights[0], heights[1]);
    heights[0] = rowBase + h;
    heights[1] = rowBase + h;
    return;
  }

  var base01 = Math.max(heights[0], heights[1]);
  var base12 = Math.max(heights[1], heights[2]);
  var next01 = base01 + h;
  var next12 = base12 + h;
  if (next01 <= next12) {
    heights[0] = next01;
    heights[1] = next01;
  } else {
    heights[1] = next12;
    heights[2] = next12;
  }
}

/** Random order, many attempts — pick packing with the least ragged column bottoms. */
function packWaterfallOrder(metas, cols) {
  if (cols <= 1) return shuffleArray(metas);

  var best = null;
  var bestScore = Infinity;

  for (var attempt = 0; attempt < WATERFALL_PACK_ATTEMPTS; attempt++) {
    var order = shuffleArray(metas);
    var heights = [];
    for (var c = 0; c < cols; c++) heights.push(0);

    for (var i = 0; i < order.length; i++) {
      placeWaterfallInColumns(heights, cols, order[i]);
    }

    var score = waterfallPackScore(heights);
    if (score < bestScore) {
      bestScore = score;
      best = order;
    }
  }

  return best || metas;
}

function bindHomeWaterfallResize() {
  if (mkWaterfallResizeBound) return;
  mkWaterfallResizeBound = true;
  var timer = null;
  window.addEventListener("resize", function () {
    if (!mkWaterfallMetaCache) return;
    var grid = document.getElementById("mk-waterfall");
    if (!grid) return;
    clearTimeout(timer);
    timer = setTimeout(function () {
      renderHomeWaterfall(grid, mkWaterfallMetaCache.items);
    }, 220);
  });
}

function renderHomeWaterfall(grid, metas) {
  var cols = waterfallColCount();
  var ordered = packWaterfallOrder(metas, cols);

  if (mkWaterfallObserver) {
    mkWaterfallObserver.disconnect();
    mkWaterfallObserver = null;
  }

  grid.innerHTML = "";

  ordered.forEach(function (meta, i) {
    var item = document.createElement("div");
    item.className = "mk-waterfall-item";
    if (meta.w >= meta.h && cols >= 2) {
      item.classList.add("mk-waterfall-item--landscape");
    }

    var img = document.createElement("img");
    img.src = meta.src;
    img.alt = meta.alt || "";
    img.loading = i < 3 ? "eager" : "lazy";
    img.decoding = "async";
    img.width = meta.w;
    img.height = meta.h;
    item.appendChild(img);
    grid.appendChild(item);
  });

  initHomeWaterfallReveal(grid);
}

function loadHomeWaterfallMetas(files, folder, done) {
  var cacheKey = folder + "|" + files.join(",");
  if (mkWaterfallMetaCache && mkWaterfallMetaCache.key === cacheKey) {
    done(mkWaterfallMetaCache.items);
    return;
  }

  if (!files.length) {
    done([]);
    return;
  }

  var metas = [];
  var pending = files.length;

  files.forEach(function (name) {
    var src = assetUrl(folder + name);
    var img = new Image();
    var settled = false;

    function finish(w, h) {
      if (settled) return;
      settled = true;
      metas.push({
        name: name,
        src: src,
        alt: "",
        w: w || 3,
        h: h || 4,
      });
      pending -= 1;
      if (pending === 0) {
        mkWaterfallMetaCache = { key: cacheKey, items: metas };
        done(metas);
      }
    }

    img.onload = function () {
      finish(img.naturalWidth, img.naturalHeight);
    };
    img.onerror = function () {
      finish(3, 4);
    };
    img.src = src;
    if (img.complete && img.naturalWidth) {
      finish(img.naturalWidth, img.naturalHeight);
    }
  });
}

function initHomeWaterfallReveal(container) {
  if (mkWaterfallObserver) {
    mkWaterfallObserver.disconnect();
    mkWaterfallObserver = null;
  }
  var items = container.querySelectorAll(".mk-waterfall-item");
  if (!items.length) return;
  mkWaterfallObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        mkWaterfallObserver.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
  );
  items.forEach(function (el) {
    mkWaterfallObserver.observe(el);
  });

  // Reveal anything already on screen (e.g. first photo before user scrolls)
  requestAnimationFrame(function () {
    items.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.92 && r.bottom > 0) {
        el.classList.add("is-visible");
        if (mkWaterfallObserver) mkWaterfallObserver.unobserve(el);
      }
    });
  });
}

function buildHomeWaterfall() {
  var grid = document.getElementById("mk-waterfall");
  if (!grid) return;

  var files = resolvedHomeImages();
  var folder = HOME_PHOTOS.folder || "/photos/home-photos/";
  grid.innerHTML = "";

  if (!files.length) {
    mkWaterfallMetaCache = null;
    grid.innerHTML =
      '<p class="mk-waterfall-empty">Add images to <code>public/photos/home-photos/</code></p>';
    return;
  }

  bindHomeWaterfallResize();

  loadHomeWaterfallMetas(files, folder, function (metas) {
    renderHomeWaterfall(grid, metas);
  });
}

function shuffleArray(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
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

/** 0 at narrow widths → 1 at wide; linear in between (album grids shrink smoothly). */
function albumGalleryWidthT(vw) {
  var wMin = 320;
  var wMax = 1280;
  if (vw <= wMin) return 0;
  if (vw >= wMax) return 1;
  return (vw - wMin) / (wMax - wMin);
}

/**
 * Justified row targets: ~3× prior “default” size at wide viewports, linearly smaller as the window narrows.
 * Capped by viewport height so rows never dominate the screen on short displays.
 */
function albumGalleryLayoutMetrics() {
  var vw = window.innerWidth || 360;
  var vh = window.innerHeight || 640;
  var t = albumGalleryWidthT(vw);

  var minWide = 318;
  var maxWide = 660;
  var gapWide = 20;

  var minNarrow = 96;
  var maxNarrow = 228;
  var gapNarrow = 6;

  var minH = Math.round(minNarrow + t * (minWide - minNarrow));
  var maxH = Math.round(maxNarrow + t * (maxWide - maxNarrow));
  maxH = Math.max(maxH, minH + 44);
  maxH = Math.min(maxH, Math.floor(vh * 0.52));

  var minHCapped = Math.min(minH, Math.max(72, maxH - 48));
  var gap = Math.round(gapNarrow + t * (gapWide - gapNarrow));
  gap = Math.max(4, Math.min(26, gap));

  return { gap: gap, minH: minHCapped, maxH: maxH };
}

/**
 * Dense justified rows (Flickr-style): cells sized to each image’s aspect ratio — no crop, little empty mat.
 * Order is shuffled so the “collage” changes between visits; row packing fills width edge-to-edge.
 * @param {HTMLElement} grid
 * @param {string} folder
 * @param {string[]} filenames
 * @param {{ fallbackCount?: number }} [opts]
 */
function mountCollagePhotoGallery(grid, folder, filenames, opts) {
  opts = opts || {};
  var fallbackCount = opts.fallbackCount != null ? opts.fallbackCount : 6;

  if (!grid) return;

  if (grid._photoJgRo) {
    grid._photoJgRo.disconnect();
    grid._photoJgRo = null;
  }

  if (!filenames || filenames.length === 0) {
    grid.className = "adaptive-grid";
    buildAdaptiveGrid(grid, folder, [], fallbackCount);
    grid._photoJgLayout = null;
    grid._photoJgItems = null;
    return;
  }

  grid.className = "photo-collage-gallery";
  grid.innerHTML = "";

  var items = [];
  var pending = filenames.length;

  function tryCollage() {
    if (items.length === 0) {
      grid.className = "adaptive-grid";
      buildAdaptiveGrid(grid, folder, [], fallbackCount);
      grid._photoJgLayout = null;
      grid._photoJgItems = null;
      return;
    }

    grid._photoJgItems = shuffleArray(items);

    function layoutWidth() {
      var W = grid.clientWidth;
      if (W < 48) {
        var wrap = grid.closest(".grad-section") || grid.closest(".photo-grid-wrap") || grid.parentElement;
        if (wrap && wrap.clientWidth > 48) W = wrap.clientWidth;
      }
      if (W < 48) W = Math.min(Math.max(300, (window.innerWidth || 800) - 40), 1280);
      return W;
    }

    function layout() {
      var list = grid._photoJgItems;
      if (!list || !list.length) return;

      var W = layoutWidth();
      var metrics = albumGalleryLayoutMetrics();
      var gap = metrics.gap;
      var minH = metrics.minH;
      var maxH = metrics.maxH;

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
        rowEl.className = "photo-collage-row";
        rowEl.style.gap = gap + "px";
        rowEl.style.height = h + "px";

        var contentW = h * sumAr + (row.length - 1) * gap;
        if (W - contentW > 4) {
          rowEl.classList.add("photo-collage-row--center");
        }

        for (var r = 0; r < row.length; r++) {
          var it = row[r];
          var cw = h * (it.w / it.h);
          var cell = document.createElement("div");
          cell.className = "photo-collage-cell";
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

    grid._photoJgLayout = layout;
    layout();

    if (typeof ResizeObserver !== "undefined") {
      var roTimer = null;
      grid._photoJgRo = new ResizeObserver(function () {
        if (roTimer) clearTimeout(roTimer);
        roTimer = setTimeout(function () {
          roTimer = null;
          layout();
        }, 72);
      });
      grid._photoJgRo.observe(grid);
    }
  }

  filenames.forEach(function (filename) {
    var src = assetUrl(folder + filename);
    var im = new Image();
    im.onload = function () {
      items.push({ src: src, w: im.naturalWidth, h: im.naturalHeight });
      pending--;
      if (pending === 0) tryCollage();
    };
    im.onerror = function () {
      pending--;
      if (pending === 0) tryCollage();
    };
    im.src = src;
  });
}

function buildGradGallery() {
  var grid = document.getElementById("grad-gallery");
  mountCollagePhotoGallery(grid, GRAD_PHOTOS.folder, resolvedGradImages(), {
    fallbackCount: 6,
  });
}

/* ══════════════════════════════════════════════════════════════
   TOGGLE, NAVIGATION, FORMS
══════════════════════════════════════════════════════════════ */
var isP = false;

function applyPortTheme() {
  var p = document.getElementById("port");
  if (!p) return;
  p.className = isP ? "pho" : "eng";
  var tog = document.getElementById("tog");
  if (tog) tog.setAttribute("aria-checked", isP ? "true" : "false");
  var le = document.getElementById("le");
  var lp = document.getElementById("lp");
  if (le) le.classList.toggle("on", !isP);
  if (lp) lp.classList.toggle("on", isP);
  var pe = document.getElementById("pe");
  var pp = document.getElementById("pp");
  if (pe) pe.classList.toggle("active", !isP);
  if (pp) pp.classList.toggle("active", isP);
  var navLi = document.getElementById("nav-li");
  var navBio = document.getElementById("nav-bio");
  var navResume = document.getElementById("nav-resume");
  if (navLi) navLi.style.display = isP ? "none" : "flex";
  if (navBio) navBio.style.display = isP ? "none" : "flex";
  if (navResume) navResume.style.display = isP ? "none" : "flex";
}

/** Keep logo + Eng/Photo toggle visible on all photography pages. */
function syncSiteNav(pageId) {
  var bar = document.getElementById("site-nav");
  if (!bar) return;
  var onPhotoSite = pageId === "page-home" || isPhotoPageId(pageId);
  bar.classList.toggle("site-nav--hidden", !onPhotoSite);
  if (isPhotoPageId(pageId) && pageId !== "page-home") {
    isP = true;
  }
  applyPortTheme();
  syncPhotoChrome(pageId);
}

/** One shared left nav for all photography views (no per-page logo). */
function syncPhotoChrome(pageId) {
  var activeId = pageId;
  if (!activeId) {
    var active = document.querySelector(".page.active");
    activeId = active ? active.id : "page-home";
  }
  var onPhotoSite = activeId === "page-home" || isPhotoPageId(activeId);
  var show = onPhotoSite && (activeId !== "page-home" || isP);
  document.body.classList.toggle("photo-site", show);
  var chrome = document.getElementById("photo-chrome");
  if (chrome) {
    chrome.classList.toggle("photo-chrome--hidden", !show);
    chrome.setAttribute("aria-hidden", show ? "false" : "true");
  }
  if (show) {
    updatePhotoSidebar(activeId);
  }
}

function measureSiteNavHeight() {
  var bar = document.getElementById("site-nav");
  if (!bar || bar.classList.contains("site-nav--hidden")) return;
  var h = bar.offsetHeight;
  if (h > 0) {
    document.documentElement.style.setProperty("--site-nav-h", h + "px");
  }
}

function sw() {
  var active = document.querySelector(".page.active");
  if (active && active.id !== "page-home") {
    showPage("page-home", false);
  }
  isP = !isP;
  applyPortTheme();
  syncPhotoChrome("page-home");
  window.scrollTo(0, 0);
}

var PHOTO_PAGE_IDS = {
  "page-home": true,
  "page-grad": true,
  "page-bio": true,
  "page-contact-grad": true,
  "page-contact-general": true,
};

function isPhotoPageId(pageId) {
  return !!(pageId && PHOTO_PAGE_IDS[pageId]);
}

function showPage(id, scrollSmooth) {
  var next = document.getElementById(id);
  if (!next) return;

  var current = document.querySelector(".page.active");
  if (current === next) return;

  var usePhotoFade =
    isPhotoPageId(id) && (!current || isPhotoPageId(current.id));

  if (usePhotoFade) {
    next.classList.add("active");
    document.querySelectorAll(".page").forEach(function (p) {
      if (p !== next && isPhotoPageId(p.id) && p.id !== "page-home") {
        p.classList.remove("active");
      }
    });
    if (id !== "page-home") {
      document.getElementById("page-home")?.classList.remove("active");
    }
  } else {
    document.querySelectorAll(".page").forEach(function (p) {
      p.classList.remove("active");
    });
    next.classList.add("active");
  }

  if (scrollSmooth) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.scrollTo(0, 0);
  }

  syncSiteNav(id);
  requestAnimationFrame(measureSiteNavHeight);

  if (id === "page-grad") {
    var gg = document.getElementById("grad-gallery");
    if (gg && gg._photoJgLayout) {
      requestAnimationFrame(function () {
        gg._photoJgLayout();
      });
    }
  }
}
function goHome() {
  showPage("page-home", true);
}

function contactFieldPrefix(formKind) {
  return formKind === "grad" ? "gf" : "gn";
}

function readContactFields(formKind) {
  var p = contactFieldPrefix(formKind);
  return {
    name: (document.getElementById(p + "-name")?.value || "").trim(),
    email: (document.getElementById(p + "-email")?.value || "").trim(),
    message: (document.getElementById(p + "-msg")?.value || "").trim(),
  };
}

function isValidContactEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function submitForm(formId, succId, formKind) {
  var form = document.getElementById(formId);
  if (!form) return;
  var errEl = document.getElementById(formId.replace("-form", "-err"));
  var succEl = document.getElementById(succId);
  var btn = form.querySelector(".pho-submit");
  var fields = readContactFields(formKind);

  if (!fields.name || !fields.email || !fields.message) {
    if (errEl) {
      errEl.textContent = "Please fill in all fields.";
      errEl.style.display = "block";
    }
    return;
  }
  if (!isValidContactEmail(fields.email)) {
    if (errEl) {
      errEl.textContent = "Please enter a valid email address.";
      errEl.style.display = "block";
    }
    return;
  }

  if (errEl) {
    errEl.textContent = "";
    errEl.style.display = "none";
  }
  if (btn) btn.disabled = true;

  try {
    var res = await fetch(PHOTO_FORMSPREE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: fields.name,
        email: fields.email,
        message: fields.message,
        form: formKind === "grad" ? "Grad photo booking" : "General enquiry",
        _subject:
          formKind === "grad"
            ? "Grad photo booking — " + fields.name
            : "Photography enquiry — " + fields.name,
      }),
    });
    var data = {};
    try {
      data = await res.json();
    } catch (_) {
      /* non-JSON error body */
    }
    if (!res.ok) {
      throw new Error(data.error || "Formspree request failed");
    }
    form.style.display = "none";
    if (succEl) succEl.style.display = "block";
  } catch (_) {
    if (errEl) {
      errEl.textContent = PHOTO_CONTACT_SUBMIT.errorMessage;
      errEl.style.display = "block";
    }
    if (btn) btn.disabled = false;
  }
}

function toggleFaq(el) {
  var isOpen = el.classList.contains("open");
  document.querySelectorAll(".faq-item").forEach(function (f) {
    f.classList.remove("open");
  });
  if (!isOpen) el.classList.add("open");
}

/** Expand / collapse stack project "More info" panels in place. */
function toggleStackProject(btn) {
  if (!btn) return;
  var card = btn.closest(".stack-proj");
  if (!card) return;
  var panel = card.closest(".stack-layer-panel");
  var opening = !card.classList.contains("is-open");

  if (panel) {
    panel.querySelectorAll(".stack-proj.is-open").forEach(function (other) {
      if (other === card) return;
      other.classList.remove("is-open");
      var ob = other.querySelector(".stack-proj-toggle");
      var om = other.querySelector(".stack-proj-more");
      var ol = other.querySelector(".stack-proj-toggle-label");
      if (ob) ob.setAttribute("aria-expanded", "false");
      if (om) om.hidden = true;
      if (ol) ol.textContent = "More info";
    });
  }

  card.classList.toggle("is-open", opening);
  btn.setAttribute("aria-expanded", opening ? "true" : "false");
  var more = card.querySelector(".stack-proj-more");
  if (more) more.hidden = !opening;
  var label = btn.querySelector(".stack-proj-toggle-label");
  if (label) label.textContent = opening ? "Less info" : "More info";
  if (opening && more) {
    requestAnimationFrame(function () {
      more.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }
}

/* ══════════════════════════════════════════════════════════════
   Album justified grids + legacy adaptive placeholders / lightbox
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

  var waterfallItem = e.target.closest(".mk-waterfall-item");
  if (waterfallItem && waterfallItem.querySelector(":scope > img") === e.target) {
    e.preventDefault();
    e.stopPropagation();
    openPhotoLightbox(e.target.currentSrc || e.target.src, e.target.getAttribute("alt") || "");
    return;
  }

  var collageCell = e.target.closest(".photo-collage-cell");
  if (collageCell && collageCell.querySelector(":scope > img") === e.target) {
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

/* ══════════════════════════════════════════════════════════════
   STACK EXPERIENCE — shatter the CRT, expand the layers, reassemble
   ══════════════════════════════════════════════════════════════ */
function initStackExperience() {
  var experience = document.getElementById("eng-stack-experience");
  var region = document.getElementById("stack-scroll-region");
  var stage = document.getElementById("stack-sticky-stage");
  if (!experience || !region || !stage) return;

  applyCrtRoomLayoutVars(experience);

  var panels = Array.prototype.slice.call(
    experience.querySelectorAll(".stack-layer-panel")
  );
  var dots = Array.prototype.slice.call(
    experience.querySelectorAll(".stack-progress-dot")
  );
  var progressRail = document.getElementById("stack-progress");
  // Phases: index 0 = boot, 1..6 = stack layers (Apps → Materials).
  var totalPhases = panels.length;
  if (totalPhases < 2) return;

  var lastPhase = -1;
  var lastStackMode = "";

  function smoothStep(t) {
    t = Math.max(0, Math.min(1, t));
    return t * t * (3 - 2 * t);
  }

  function setPhase(idx) {
    if (idx === lastPhase) return;
    lastPhase = idx;
    panels.forEach(function (p, i) {
      p.classList.toggle("is-active", i === idx);
    });
    dots.forEach(function (d) {
      var dIdx = parseInt(d.getAttribute("data-idx"), 10);
      d.classList.toggle("is-active", dIdx === idx);
    });
    var active = panels[idx];
    var domain = active ? active.getAttribute("data-domain") || "boot" : "boot";
    experience.setAttribute("data-active-domain", domain);
    experience.setAttribute("data-active-idx", String(idx));
  }

  function updateScroll() {
    var rect = region.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var totalScroll = region.offsetHeight - vh;
    var scrolledIn = totalScroll > 0 ? Math.max(0, -rect.top) : 0;
    var progress = totalScroll > 0 ? Math.min(1, scrolledIn / totalScroll) : 0;

    var phaseFloat = progress * totalPhases;
    var phaseIdx = Math.min(totalPhases - 1, Math.floor(phaseFloat));
    setPhase(phaseIdx);

    // --zoom-progress hits 1 by the end of phase 0 (boot screen). After that
    // the screen stays at full size while content cycles through the layers.
    var zoomFloat = Math.min(1, phaseFloat);
    var zoomP = smoothStep(zoomFloat);
    experience.style.setProperty("--zoom-progress", zoomP.toFixed(4));
    experience.style.setProperty("--stack-chrome", (1 - zoomP).toFixed(4));
    // --stack-progress remains the overall scroll position (0..1) for
    // anything that should depend on full-page progress.
    experience.style.setProperty("--stack-progress", smoothStep(progress).toFixed(4));

    // Hide the floating rail/reassemble until the user starts scrolling.
    var mode = zoomFloat > 0.04 ? "stack" : "boot";
    if (mode !== lastStackMode) {
      if (mode === "boot" && progressRail) {
        progressRail.classList.remove("is-expanded");
      }
      lastStackMode = mode;
    }
    experience.setAttribute("data-mode", mode);
  }

  // rAF-throttled scroll handler.
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateScroll();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  updateScroll();

  // Jump to a phase by clicking a progress dot.
  function scrollToPhase(idx) {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var totalScroll = region.offsetHeight - vh;
    if (totalScroll <= 0) return;
    // Sit ~10% into the phase so the panel is fully active.
    var phaseProgress = (idx + 0.1) / totalPhases;
    var targetWithinRegion = totalScroll * phaseProgress;
    var regionTop = region.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: regionTop + targetWithinRegion, behavior: "smooth" });
  }

  dots.forEach(function (d) {
    d.addEventListener("click", function () {
      var idx = parseInt(d.getAttribute("data-idx"), 10);
      if (!isNaN(idx)) scrollToPhase(idx);
    });
  });

  if (progressRail) {
    progressRail.addEventListener("click", function (e) {
      if (!window.matchMedia("(hover: none)").matches) return;
      if (e.target.closest(".stack-progress-dot")) return;
      progressRail.classList.toggle("is-expanded");
    });
  }

  // CRT screen click on the boot panel: smooth-scroll to first layer (Apps).
  var bootPanel = experience.querySelector('.stack-layer-panel[data-layer="boot"]');
  if (bootPanel) {
    bootPanel.style.cursor = "pointer";
    bootPanel.addEventListener("click", function () { scrollToPhase(1); });
  }

  // Reassemble button: scroll back to the very top of the page.
  var reset = document.getElementById("crt-reassemble");
  if (reset) {
    reset.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

export function initApp() {
  window.showPage = showPage;
  window.goHome = goHome;
  window.sw = sw;
  window.submitForm = submitForm;
  window.toggleFaq = toggleFaq;
  window.toggleStackProject = toggleStackProject;

  syncSiteNav("page-home");
  measureSiteNavHeight();
  window.addEventListener("resize", measureSiteNavHeight);

  buildGradGallery();
  buildHomeWaterfall();
  initStackExperience();

  document.getElementById("tog").addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      sw();
    }
  });

  document.addEventListener("click", onDocumentClickPhotoLightbox, true);
  document.addEventListener("keydown", onDocumentKeydownPhotoLightbox);
}
