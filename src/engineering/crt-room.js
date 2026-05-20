/**
 * =============================================================================
 *  CRT ROOM SCENE — vector illustration of a cozy retro setup
 * =============================================================================
 *  Returns a single inline <svg> string. The interactive screen lives inside a
 *  <foreignObject> at the monitor position (viewBox coords 800..1120 × 420..660)
 *  so it scales naturally with the room when the camera flies in.
 *
 *  Coordinate system: 1920 × 1080 viewBox. The monitor screen center sits at
 *  MONITOR.cx / MONITOR.cy so xMidYMid-slice rendering keeps it in the viewport
 *  center regardless of viewport aspect ratio.
 * =============================================================================
 */

const VIEW = { w: 1920, h: 1080 };

/**
 * Global nudge for every anchored prop (desk items + wall decor). Change only
 * offsetX / offsetY to move the whole cluster together.
 */
const LAYOUT = {
  offsetX: 0,
  offsetY: 0,
};

const DESK = {
  surfaceY: 780,
  glowCx: 1100,
  glowCy: 930,
  glowRx: 540,
  glowRy: 180,
};

/** Interactive screen + bezel; HTML overlay aligns to this center. */
const MONITOR = {
  cx: 960,
  cy: 600,
  screenW: 340,
  screenH: 250,
  bezelOuterW: 412,
  bezelOuterH: 320,
  bezelInnerW: 360,
  bezelInnerH: 268,
  standNeckW: 60,
  standNeckH: 14,
};

const WINDOW = {
  cx: 340,
  cy: 370,
  outerW: 468,
  outerH: 528,
  innerW: 440,
  innerH: 500,
  glassW: 420,
  glassH: 490,
  sillW: 480,
};

const SPEAKER = { cx: 535, cy: 660, w: 170, h: 240 };
const TOWER = { cx: 1580, cy: 685, w: 160, h: 290 };
const LAMP = {
  baseCx: 1380,
  baseCy: 812,
  poolCx: 1050,
  poolCy: 880,
  poolRx: 500,
  poolRy: 190,
  bulbCx: 1200,
  bulbCy: 510,
  bulbRx: 120,
  bulbRy: 70,
};
const KEYBOARD = { cx: 960, cy: 897, w: 520, h: 120 };
const MOUSE = { cx: 1270, cy: 895 };
const MUG = { cx: 1480, cy: 870 };
const CAT = {
  cx: 550,
  cy: 883,
  scale: 0.55,
  nativeAnchorX: 400,
  nativeAnchorY: 340,
};

const WALL_SHELF = { cx: 1260, cy: 567, w: 1120, h: 14 };

/** Spine labels for books — edit here or set BOOKS[i].title after load. */
const BOOK_PLACEHOLDER_TITLES = [
  "If Cats Disappeared from the World",
  "Filler",
  "Filler",
  "Filler",
  "Filler",
  "Filler",
  "Filler",
  "Filler",
  "Filler",
  "The Three-Body Problem",
  "hmm what is this??",
  "The Dark Forest",
  "Death's End",
  "Dark Matter",
  "Pines",
  "Wayward",
  "The Last Town",
  "Crazy Rich Asians",
  "Project Hail Mary",
  "The Martian",
  "Ready Player One",
  "Starter Villain"
];

function buildShelfBooks(shelf) {
  const books = [];
  const left = shelf.cx - shelf.w / 2 + 14;
  const right = shelf.cx + shelf.w / 2 - 14;
  const colors = [
    "#6b3a2a", "#2a4a6a", "#3d5c3a", "#5a3a6a", "#7a4a2a",
    "#2a5a5a", "#4a3a2a", "#3a3a5a", "#6a4a3a", "#2a3a4a",
    "#5c4030", "#3a5268", "#4a5c38", "#6a3a50",
  ];
  let x = left;
  let i = 0;
  while (x < right - 8) {
    const spineW = 45 + (i * 3) % 6;
    const h = 150 + (i * 5) % 10;
    books.push({
      x: x + spineW * 0.5,
      spineW,
      h,
      color: colors[i % colors.length],
      title: BOOK_PLACEHOLDER_TITLES[i % BOOK_PLACEHOLDER_TITLES.length],
    });
    x += spineW + 2 + (i % 3);
    i += 1;
  }
  return books;
}

/**
 * Books on the wall shelf — spines face the viewer (toward the room).
 * `x` = horizontal center of the spine along the shelf (viewBox coords).
 */
const BOOKS = buildShelfBooks(WALL_SHELF);

/**
 * Vinyl cubbies — single top row; cover art is a perfect square (`size` × `size`).
 * Live covers: Spotify via initSpotifyVinyl() (see docs/SPOTIFY.md).
 * Static fallback: set `imageHref`, e.g. "/images/vinyl/my-album.jpg" (under `public/`).
 */
const VINYL_WALL = [
  { cx: 720, cy: 200, size: 180, imageHref: "" },
  { cx: 950, cy: 200, size: 180, imageHref: "" },
  { cx: 1180, cy: 200, size: 180, imageHref: "" },
  { cx: 1410, cy: 200, size: 180, imageHref: "" },
  { cx: 1640, cy: 200, size: 180, imageHref: "" },
];

function escapeSvgAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function escapeSvgText(s) {
  return escapeSvgAttr(s);
}

/** Contact-shadow ellipses (cx/cy = center on the desk). */
const ITEM_SHADOWS = [
  { cx: SPEAKER.cx, cy: 785, rx: 100, ry: 9 },
  { cx: MONITOR.cx, cy: 815, rx: 190, ry: 11 },
  { cx: LAMP.baseCx, cy: 828, rx: 68, ry: 9 },
  { cx: TOWER.cx, cy: 838, rx: 92, ry: 10 },
  { cx: KEYBOARD.cx, cy: 958, rx: 290, ry: 10 },
  { cx: MOUSE.cx, cy: 912, rx: 44, ry: 7 },
  { cx: MUG.cx, cy: 878, rx: 34, ry: 7 },
  { cx: CAT.cx, cy: 918, rx: 150, ry: 9 },
];

/** Re-export layout knobs for other modules (e.g. CSS screen alignment). */
export const CRT_ROOM_LAYOUT = {
  LAYOUT,
  VIEW,
  MONITOR,
  DESK,
  WALL_SHELF,
  BOOKS,
  VINYL_WALL,
};

/**
 * Push monitor screen geometry into CSS custom properties so `.crt-zoom-screen`
 * tracks MONITOR.cx/cy + screen size under xMidYMid slice (same math as the SVG).
 * @param {HTMLElement} root — typically `#eng-stack-experience`
 */
export function applyCrtRoomLayoutVars(root) {
  if (!root) return;
  var m = MONITOR;
  var vbCx = VIEW.w / 2;
  var vbCy = VIEW.h / 2;
  root.style.setProperty("--crt-vb-w", String(VIEW.w));
  root.style.setProperty("--crt-vb-h", String(VIEW.h));
  root.style.setProperty("--crt-vb-cx", String(vbCx));
  root.style.setProperty("--crt-vb-cy", String(vbCy));
  root.style.setProperty("--crt-monitor-cx", String(worldX(m.cx)));
  root.style.setProperty("--crt-monitor-cy", String(worldY(m.cy)));
  root.style.setProperty("--crt-screen-w", String(m.screenW));
  root.style.setProperty("--crt-screen-h", String(m.screenH));
}

function worldX(x) {
  return x + LAYOUT.offsetX;
}

function worldY(y) {
  return y + LAYOUT.offsetY;
}

function gAtCenter(cx, cy, className, content) {
  const cls = className ? ' class="' + className + '"' : "";
  return (
    "<g" +
    cls +
    ' transform="translate(' +
    worldX(cx) +
    "," +
    worldY(cy) +
    ')">' +
    content +
    "</g>"
  );
}

/** Local origin at top-left of a w×h box centered on (cx, cy). */
function gAtCenterTopLeft(cx, cy, w, h, className, content) {
  const cls = className ? ' class="' + className + '"' : "";
  const x = worldX(cx) - w / 2;
  const y = worldY(cy) - h / 2;
  return (
    "<g" +
    cls +
    ' transform="translate(' +
    x +
    "," +
    y +
    ')">' +
    content +
    "</g>"
  );
}

function rectFromCenter(cx, cy, w, h, extraAttrs) {
  return (
    '<rect x="' +
    (worldX(cx) - w / 2) +
    '" y="' +
    (worldY(cy) - h / 2) +
    '" width="' +
    w +
    '" height="' +
    h +
    '" ' +
    (extraAttrs || "") +
    "/>"
  );
}

function ellipseAt(cx, cy, rx, ry, extraAttrs) {
  return (
    '<ellipse cx="' +
    worldX(cx) +
    '" cy="' +
    worldY(cy) +
    '" rx="' +
    rx +
    '" ry="' +
    ry +
    '" ' +
    (extraAttrs || "") +
    "/>"
  );
}

function monitorScreenRect(extraAttrs) {
  return rectFromCenter(
    MONITOR.cx,
    MONITOR.cy,
    MONITOR.screenW,
    MONITOR.screenH,
    extraAttrs || 'class="crt-monitor-screen-bg" fill="#0a1a08"'
  );
}

/**
 * Build the SVG room scene. The decorative monitor "screen" inside the SVG
 * is just visual — the real interactive screen is a separate HTML overlay
 * (.crt-zoom-screen) positioned on top of this SVG by render-from-config.js.
 *
 * @returns {string} a full <svg>…</svg> markup string.
 */
export function crtRoomSceneSvg() {
  return (
    '<svg class="crt-room-svg" id="crt-room-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      defs() +
      backdrop() +
      window() +
      wallDecor() +
      desk() +
      // Contact shadows sit on the desk, beneath every object.
      itemShadows() +
      speaker() +
      lampGlow() +
      tower() +
      monitorFrame() +
      // Decorative dark green screen inside the monitor — the HTML overlay
      // will sit precisely on top of this rectangle at zoom=0 and grow from it.
      monitorScreenRect() +
      peripherals() +
      cat() +
      mug() +
      lampChrome() +
    '</svg>'
  );
}

/* ── reusable defs (gradients, filters, etc.) ─────────────── */
function defs() {
  return (
    '<defs>' +
      // Wall gradient — deep warm brown with slight vignette
      '<linearGradient id="rg-wall" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#2a1d15"/>' +
        '<stop offset="60%" stop-color="#241812"/>' +
        '<stop offset="100%" stop-color="#1c130d"/>' +
      '</linearGradient>' +
      // Wood desk gradient
      '<linearGradient id="rg-desk" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#6e3f23"/>' +
        '<stop offset="40%" stop-color="#5a3219"/>' +
        '<stop offset="100%" stop-color="#3b1f0e"/>' +
      '</linearGradient>' +
      // Sunset sky gradient (top → bottom of window)
      '<linearGradient id="rg-sunset" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#3a1850"/>' +
        '<stop offset="25%" stop-color="#a23a5a"/>' +
        '<stop offset="55%" stop-color="#f56a3a"/>' +
        '<stop offset="80%" stop-color="#fdbb6b"/>' +
        '<stop offset="100%" stop-color="#fde0a0"/>' +
      '</linearGradient>' +
      // Ocean gradient
      '<linearGradient id="rg-ocean" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#7a3a3a"/>' +
        '<stop offset="40%" stop-color="#3a2842"/>' +
        '<stop offset="100%" stop-color="#1a1428"/>' +
      '</linearGradient>' +
      // Beige plastic (monitor/tower/keyboard)
      '<linearGradient id="rg-beige" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#efd9ad"/>' +
        '<stop offset="50%" stop-color="#d6bd8b"/>' +
        '<stop offset="100%" stop-color="#a48553"/>' +
      '</linearGradient>' +
      // Lamp glow (radial, warm amber)
      '<radialGradient id="rg-lamp" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#ffd28a" stop-opacity=".9"/>' +
        '<stop offset="40%" stop-color="#ffb35a" stop-opacity=".55"/>' +
        '<stop offset="100%" stop-color="#c25e1a" stop-opacity="0"/>' +
      '</radialGradient>' +
      // Sun on horizon
      '<radialGradient id="rg-sun" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#fff6c8"/>' +
        '<stop offset="60%" stop-color="#ffd07a"/>' +
        '<stop offset="100%" stop-color="#ff8a48" stop-opacity="0"/>' +
      '</radialGradient>' +
      // Cat orange (legacy — kept for any other warm-orange use)
      '<linearGradient id="rg-cat" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#d97a35"/>' +
        '<stop offset="100%" stop-color="#8a4519"/>' +
      '</linearGradient>' +
      // === SleepingCat gradients (warm seal-point body / saddle / face mask) ===
      '<radialGradient id="sc-bodyGrad" cx="50%" cy="30%" r="70%">' +
        '<stop offset="0%"   stop-color="#fbf4e6"/>' +
        '<stop offset="55%"  stop-color="#f1e6d3"/>' +
        '<stop offset="100%" stop-color="#d9c4a3"/>' +
      '</radialGradient>' +
      '<radialGradient id="sc-saddleGrad" cx="50%" cy="40%" r="65%">' +
        '<stop offset="0%"   stop-color="#7a5236" stop-opacity="0.95"/>' +
        '<stop offset="60%"  stop-color="#5a3a26" stop-opacity="0.7"/>' +
        '<stop offset="100%" stop-color="#5a3a26" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<radialGradient id="sc-maskGrad" cx="50%" cy="50%" r="55%">' +
        '<stop offset="0%"   stop-color="#3a2418"/>' +
        '<stop offset="70%"  stop-color="#3a2418"/>' +
        '<stop offset="100%" stop-color="#5a3a26" stop-opacity="0.4"/>' +
      '</radialGradient>' +
      // Reflection on desk (warm pool from lamp)
      '<radialGradient id="rg-desk-glow" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#ffb35a" stop-opacity=".35"/>' +
        '<stop offset="100%" stop-color="#ffb35a" stop-opacity="0"/>' +
      '</radialGradient>' +
      // Clip path for window interior — tracks WINDOW layout + LAYOUT offset
      '<clipPath id="rg-window-clip">' +
        '<rect x="' +
        (worldX(WINDOW.cx) - WINDOW.glassW / 2) +
        '" y="' +
        (worldY(WINDOW.cy) - WINDOW.glassH / 2) +
        '" width="' +
        WINDOW.glassW +
        '" height="' +
        WINDOW.glassH +
        '"/>' +
      "</clipPath>" +
      // Soft drop-shadow under desk items
      '<radialGradient id="rg-shadow" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#000" stop-opacity=".55"/>' +
        '<stop offset="100%" stop-color="#000" stop-opacity="0"/>' +
      '</radialGradient>' +
      // Wall vertical gradient — slightly darker at top, lighter near desk
      '<linearGradient id="rg-wall-vignette" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%"  stop-color="#000" stop-opacity=".5"/>' +
        '<stop offset="40%" stop-color="#000" stop-opacity="0"/>' +
        '<stop offset="100%" stop-color="#000" stop-opacity=".25"/>' +
      '</linearGradient>' +
    '</defs>'
  );
}

/* ── Backdrop: walls, ceiling shadow, baseboard ───────────── */
function backdrop() {
  return (
    '<g class="crt-room-decor">' +
      // Back wall
      '<rect x="0" y="0" width="1920" height="780" fill="url(#rg-wall)"/>' +
      // Subtle wall texture lines (wallpaper)
      '<g stroke="#3a261b" stroke-width="1" opacity=".25">' +
        '<line x1="0" y1="160" x2="1920" y2="160"/>' +
        '<line x1="0" y1="320" x2="1920" y2="320"/>' +
        '<line x1="0" y1="480" x2="1920" y2="480"/>' +
        '<line x1="0" y1="640" x2="1920" y2="640"/>' +
      '</g>' +
      // Vignette at top (ceiling falls into shadow)
      '<rect x="0" y="0" width="1920" height="180" fill="url(#rg-wall)" opacity=".6"/>' +
      // Wall vignette gradient — adds depth without a hard line
      '<rect x="0" y="0" width="1920" height="780" fill="url(#rg-wall-vignette)"/>' +
      // Baseboard between wall and desk (slight crown molding feel)
      '<rect x="0" y="768" width="1920" height="4"  fill="#3a2418"/>' +
      '<rect x="0" y="772" width="1920" height="12" fill="#15100a"/>' +
    '</g>'
  );
}

/* ── Window with beach/sunset view ────────────────────────── */
function window() {
  const w = WINDOW;
  const glassX = worldX(w.cx) - w.glassW / 2;
  const glassY = worldY(w.cy) - w.glassH / 2;
  const sunCx = w.glassW / 2;
  const sunCy = 300;
  return (
    '<g class="crt-room-decor crt-window">' +
      rectFromCenter(w.cx, w.cy, w.outerW, w.outerH, 'fill="#0c0805" rx="4"') +
      rectFromCenter(w.cx, w.cy, w.innerW, w.innerH, 'fill="#0e0a06" rx="2"') +
      '<g clip-path="url(#rg-window-clip)">' +
        '<g transform="translate(' + glassX + "," + glassY + ')">' +
          '<rect x="0" y="0" width="' + w.glassW + '" height="320" fill="url(#rg-sunset)"/>' +
          '<circle class="crt-sun-glow" cx="' + sunCx + '" cy="' + sunCy + '" r="120" fill="url(#rg-sun)" opacity=".75"/>' +
          '<ellipse cx="' + sunCx + '" cy="' + sunCy + '" rx="60" ry="38" fill="#fff8dc" opacity=".95"/>' +
          '<g class="crt-clouds" opacity=".55">' +
            '<ellipse class="crt-cloud crt-cloud--a" cx="70" cy="90" rx="60" ry="9" fill="#4a2238"/>' +
            '<ellipse class="crt-cloud crt-cloud--b" cx="290" cy="50" rx="80" ry="11" fill="#3a1830"/>' +
            '<ellipse class="crt-cloud crt-cloud--c" cx="190" cy="130" rx="50" ry="7" fill="#5a2840"/>' +
          "</g>" +
          '<g stroke="#fff8dc" stroke-width=".6" opacity=".4">' +
            '<line x1="' + sunCx + '" y1="' + sunCy + '" x2="' + (sunCx - 160) + '" y2="' + sunCy + '"/>' +
            '<line x1="' + sunCx + '" y1="' + sunCy + '" x2="' + (sunCx + 160) + '" y2="' + sunCy + '"/>' +
          "</g>" +
          '<rect x="0" y="320" width="' + w.glassW + '" height="120" fill="url(#rg-ocean)"/>' +
          '<g opacity=".7">' +
            '<rect x="' + (sunCx - 12) + '" y="320" width="24" height="120" fill="#ffb35a" opacity=".3"/>' +
            '<rect x="' + (sunCx - 8) + '" y="330" width="16" height="100" fill="#fff8dc" opacity=".25"/>' +
            '<g class="crt-sparkle">' +
              '<rect x="' + (sunCx - 22) + '" y="348" width="44" height="2" fill="#fff8dc" opacity=".6"/>' +
              '<rect x="' + (sunCx - 16) + '" y="368" width="32" height="2" fill="#fff8dc" opacity=".5"/>' +
              '<rect x="' + (sunCx - 20) + '" y="388" width="40" height="2" fill="#fff8dc" opacity=".55"/>' +
              '<rect x="' + (sunCx - 12) + '" y="410" width="24" height="2" fill="#fff8dc" opacity=".4"/>' +
            "</g>" +
          "</g>" +
          '<rect x="0" y="440" width="' + w.glassW + '" height="50" fill="#5a3a20"/>' +
        "</g>" +
      "</g>" +
      '<rect x="' + (worldX(w.cx) - 2) + '" y="' + (worldY(w.cy) - w.innerH / 2) + '" width="6" height="' + w.innerH + '" fill="#1a120c"/>' +
      '<rect x="' + (worldX(w.cx) - w.innerW / 2) + '" y="' + (worldY(w.cy) + 248 - w.innerH / 2) + '" width="' + w.innerW + '" height="6" fill="#1a120c"/>' +
      rectFromCenter(w.cx, w.cy + 262, w.sillW, 14, 'fill="#3a2418"') +
      rectFromCenter(w.cx, w.cy + 269, w.sillW, 6, 'fill="#1a100a"') +
    "</g>"
  );
}

/* ── Wall decor: vinyl cubbies + bookshelf ─────────────────── */
function wallDecor() {
  let vinylSvg = "";
  VINYL_WALL.forEach(function (slot, i) {
    vinylSvg += vinylWallSlot(slot, i);
  });

  const shelf = WALL_SHELF;
  const shelfTopY = shelf.cy - shelf.h / 2;
  let booksSvg = "";
  BOOKS.forEach(function (book) {
    booksSvg += bookSpine(book, shelfTopY);
  });

  return (
    '<g class="crt-room-decor">' +
      vinylSvg +
      rectFromCenter(shelf.cx, shelf.cy, shelf.w, shelf.h, 'fill="#3a2418"') +
      rectFromCenter(shelf.cx, shelf.cy + 12, shelf.w, 4, 'fill="#1a100a"') +
      rectFromCenter(shelf.cx, shelf.cy - 2, shelf.w, 3, 'fill="#5a3a20"') +
      booksSvg +
    "</g>"
  );
}

/** Wall cubby with a square record sleeve (cover via VINYL_WALL[].imageHref). */
function vinylWallSlot(slot, index) {
  const cover = slot.size;
  const pad = 8;
  const lipH = 10;
  const frameW = cover + pad * 2;
  const frameH = cover + pad * 2 + lipH;
  const px = worldX(slot.cx) - frameW / 2;
  const py = worldY(slot.cy) - frameH / 2;
  const coverX = pad;
  const coverY = pad;
  const lipY = coverY + cover;
  const href = slot.imageHref ? String(slot.imageHref).trim() : "";
  const clipId = "crt-vinyl-clip-" + index;

  let sleeveSvg =
    '<rect class="crt-vinyl-art-slot" x="' + coverX + '" y="' + coverY + '" width="' + cover + '" height="' + cover + '" fill="none" stroke="none"/>';
  if (href) {
    sleeveSvg =
      '<defs><clipPath id="' + clipId + '"><rect x="' + coverX + '" y="' + coverY + '" width="' + cover + '" height="' + cover + '" rx="1"/></clipPath></defs>' +
      '<image class="crt-vinyl-cover" href="' + escapeSvgAttr(href) + '" x="' + coverX + '" y="' + coverY + '" width="' + cover + '" height="' + cover + '" preserveAspectRatio="xMidYMid slice" clip-path="url(#' + clipId + ')"/>';
  }

  return (
    '<g class="crt-vinyl-slot" data-vinyl-idx="' + index + '" transform="translate(' + px + "," + py + ')">' +
      '<rect x="2" y="3" width="' + frameW + '" height="' + frameH + '" fill="#000" opacity=".35" rx="2"/>' +
      '<rect x="0" y="0" width="' + frameW + '" height="' + frameH + '" fill="#2a1810" rx="2"/>' +
      '<rect x="4" y="4" width="' + (frameW - 8) + '" height="' + (frameH - 8) + '" fill="#3a2418" rx="1"/>' +
      '<g class="crt-vinyl-sleeve">' +
      sleeveSvg +
      "</g>" +
      '<rect x="' + (pad - 1) + '" y="' + lipY + '" width="' + (cover + 2) + '" height="6" fill="#4a3020" rx=".5"/>' +
      '<rect x="' + coverX + '" y="' + (lipY + 6) + '" width="' + cover + '" height="4" fill="#120a06" opacity=".7" rx=".5"/>' +
    "</g>"
  );
}

/** Spine label font size from binding width (not shortened for long titles). */
function spineFontSize(spineW) {
  return Math.min(11, Math.max(8, spineW * 0.42));
}

/** Approximate horizontal text width before −90° rotation (≈ length along the spine). */
function spineTextWidth(str, fontSize) {
  return String(str).length * (fontSize * 0.62 + 0.35);
}

/** Break a title into lines that fit along the spine height; split long words if needed. */
function wrapSpineTitle(title, spineH, fontSize) {
  const maxLinePx = Math.max(fontSize * 2, spineH - 8);
  const words = title.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  function pushLine(line) {
    if (line) lines.push(line);
  }

  function pushWord(word) {
    if (spineTextWidth(word, fontSize) <= maxLinePx) {
      pushLine(word);
      return;
    }
    let chunk = "";
    for (let i = 0; i < word.length; i += 1) {
      const next = chunk + word[i];
      if (spineTextWidth(next, fontSize) <= maxLinePx) {
        chunk = next;
      } else {
        pushLine(chunk);
        chunk = word[i];
      }
    }
    pushLine(chunk);
  }

  words.forEach(function (word) {
    const test = current ? current + " " + word : word;
    if (spineTextWidth(test, fontSize) <= maxLinePx) {
      current = test;
    } else {
      if (current) pushLine(current);
      current = "";
      if (spineTextWidth(word, fontSize) <= maxLinePx) {
        current = word;
      } else {
        pushWord(word);
      }
    }
  });
  if (current) pushLine(current);
  return lines;
}

/** SVG for spine title: wraps along the spine and stacks extra lines in columns. */
function spineLabelSvg(x, spineTopY, spineW, spineH, title) {
  const fontSize = spineFontSize(spineW);
  const lines = wrapSpineTitle(title, spineH, fontSize);
  if (lines.length === 0) return "";

  const colStep = fontSize + 3;
  const maxCols = Math.max(
    1,
    Math.min(lines.length, Math.floor((spineW - 2) / colStep))
  );
  const cols = [];
  let c = 0;
  for (let i = 0; i < maxCols; i += 1) cols.push([]);
  lines.forEach(function (line) {
    cols[c].push(line);
    c = (c + 1) % maxCols;
  });

  const lineGap = 2;
  const spineBottom = spineTopY + spineH;
  const pad = 4;
  let out = "";

  for (let col = 0; col < maxCols; col += 1) {
    const colLines = cols[col];
    if (colLines.length === 0) continue;
    const xCol =
      x - ((maxCols - 1) * colStep) / 2 + col * colStep;
    let cursor = spineBottom - pad;
    colLines.forEach(function (line) {
      const lw = spineTextWidth(line, fontSize);
      const lineY = cursor - lw / 2;
      cursor -= lw + lineGap;
      out +=
        '<text x="' + xCol + '" y="' + lineY + '" transform="rotate(-90 ' + xCol + " " + lineY + ')" text-anchor="middle" font-family="DM Mono, monospace" font-size="' + fontSize + '" fill="rgba(255,255,255,.88)" letter-spacing=".35">' +
        escapeSvgText(line) +
        "</text>";
    });
  }
  return out;
}

/** Upright book with spine toward the viewer; optional spine title. */
function bookSpine(book, shelfTopY) {
  const x = worldX(book.x);
  const w = book.spineW;
  const h = book.h;
  const y = worldY(shelfTopY) - h;
  const title = book.title != null ? String(book.title).trim() : "";
  const labelSvg = title ? spineLabelSvg(x, y, w, h, title) : "";
  return (
    '<g class="crt-book">' +
      '<rect x="' + (x - w / 2) + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + book.color + '" rx=".5"/>' +
      '<rect x="' + (x - w / 2 + 1) + '" y="' + y + '" width="1.5" height="' + h + '" fill="rgba(255,255,255,.14)"/>' +
      '<rect x="' + (x - w / 2) + '" y="' + (y - 2) + '" width="' + w + '" height="2" fill="#e6dcc8" rx=".3"/>' +
      labelSvg +
    "</g>"
  );
}

/* ── Desk surface ─────────────────────────────────────────── */
function desk() {
  return (
    '<g>' +
      // Desk surface (extends across full width)
      '<rect x="0" y="780" width="1920" height="300" fill="url(#rg-desk)"/>' +
      // Back edge of desk — slight shadow where wall meets the desk surface
      '<rect x="0" y="780" width="1920" height="6" fill="#1a0c06" opacity=".7"/>' +
      // Long ambient cast shadow under the wall (depth cue)
      '<rect x="0" y="786" width="1920" height="14" fill="#1a0c06" opacity=".35"/>' +
      // Wood grain lines on the desk top
      '<g stroke="#3a1f0e" stroke-width="1" opacity=".35">' +
        '<line x1="0" y1="820" x2="1920" y2="822"/>' +
        '<line x1="0" y1="880" x2="1920" y2="876"/>' +
        '<line x1="0" y1="940" x2="1920" y2="945"/>' +
        '<line x1="0" y1="990" x2="1920" y2="995"/>' +
      '</g>' +
      // Visible front edge of the desk top (thin highlight + dark stripe to
      // suggest the tabletop\'s thickness — without it the desk reads as floor).
      '<rect x="0" y="1010" width="1920" height="2"  fill="#7a4524" opacity=".7"/>' +
      '<rect x="0" y="1012" width="1920" height="14" fill="#1a0c06"/>' +
      // Below the desk — darker "floor / under-desk" zone
      '<rect x="0" y="1026" width="1920" height="54" fill="#0c0604"/>' +
      ellipseAt(DESK.glowCx, DESK.glowCy, DESK.glowRx, DESK.glowRy, 'fill="url(#rg-desk-glow)"') +
    '</g>'
  );
}

/* ── Contact shadows under every object that sits on the desk ─
   Drawn AFTER the desk so they sit on the surface, and BEFORE
   the items so the items render on top of their own shadows.
   ───────────────────────────────────────────────────────── */
function itemShadows() {
  let shadows = '<g class="crt-shadows" opacity=".7">';
  ITEM_SHADOWS.forEach(function (s) {
    shadows += ellipseAt(s.cx, s.cy, s.rx, s.ry, 'fill="#000" opacity=".5"');
  });
  shadows += "</g>";
  return shadows;
}

/* ── Speaker (left of monitor) + plant on top ────────────── */
function speaker() {
  return gAtCenterTopLeft(SPEAKER.cx, SPEAKER.cy, SPEAKER.w, SPEAKER.h, "crt-room-decor",
      // Plant pot (sitting on top of the speaker — speaker top is at local y=0,
      // pot is 60 tall so we translate up by -60 to seat it on the speaker).
      '<g transform="translate(-12, -60)">' +
        // Pot
        '<path d="M0 0 L8 60 H68 L76 0 Z" fill="#7a3a1a"/>' +
        '<rect x="-4" y="-8" width="84" height="14" fill="#9c4a24" rx="2"/>' +
        // Leaves (fans of long leaves)
        '<g class="crt-leaves" fill="#3a6a3a">' +
          '<path d="M38 0 Q10 -40 6 -90 Q22 -56 38 0 Z"/>' +
          '<path d="M38 0 Q24 -60 38 -110 Q52 -60 38 0 Z" fill="#4a7a4a"/>' +
          '<path d="M38 0 Q66 -40 70 -90 Q54 -56 38 0 Z"/>' +
          '<path d="M38 0 Q12 -22 -4 -56 Q14 -26 38 0 Z" fill="#2a5a2a"/>' +
          '<path d="M38 0 Q64 -22 80 -56 Q62 -26 38 0 Z" fill="#2a5a2a"/>' +
        '</g>' +
      '</g>' +
      // Speaker body (3D-ish with subtle shading)
      '<rect x="0" y="0" width="' + SPEAKER.w + '" height="' + SPEAKER.h + '" fill="#1a120c" rx="3"/>' +
      '<rect x="2" y="2" width="' + (SPEAKER.w - 4) + '" height="' + (SPEAKER.h - 4) + '" fill="#241812" rx="2"/>' +
      '<circle cx="' + (SPEAKER.w / 2) + '" cy="50" r="22" fill="#0a0604"/>' +
      '<circle cx="' + (SPEAKER.w / 2) + '" cy="50" r="18" fill="none" stroke="#3a2418" stroke-width="1"/>' +
      '<circle cx="' + (SPEAKER.w / 2) + '" cy="50" r="6" fill="#3a2418"/>' +
      '<circle cx="' + (SPEAKER.w / 2) + '" cy="160" r="50" fill="#0a0604"/>' +
      '<circle cx="' + (SPEAKER.w / 2) + '" cy="160" r="42" fill="none" stroke="#3a2418" stroke-width="1"/>' +
      '<circle cx="' + (SPEAKER.w / 2) + '" cy="160" r="14" fill="#3a2418"/>' +
      // LED level meter — bars sit inside a small dark display housing so
      // they read as a screen mounted on the speaker, not floating shapes.
      '<g transform="translate(110, 100)">' +
        // Display housing (outer + inner glass)
        '<rect x="0"  y="-25"  width="52" height="36" rx="3" fill="#050302" stroke="#3a2418" stroke-width="1"/>' +
        '<rect x="3"  y="-22"  width="46" height="30" rx="2" fill="#0d0805"/>' +
        // METER label above bars
        '<text x="26" y="-29" text-anchor="middle" font-family="DM Mono, monospace" font-size="6" fill="#5a3a20" letter-spacing="1.5">VU</text>' +
        // The bars themselves, anchored to the bottom of the inner glass
        '<g class="crt-eq" transform="translate(10, 8)">' +
          '<rect class="crt-eq-bar crt-eq-bar--1" x="0"  y="-25" width="6" height="24" fill="#5dcaa5"/>' +
          '<rect class="crt-eq-bar crt-eq-bar--2" x="9"  y="-25" width="6" height="24" fill="#d49a3a"/>' +
          '<rect class="crt-eq-bar crt-eq-bar--3" x="18" y="-25" width="6" height="24" fill="#5dcaa5"/>' +
          '<rect class="crt-eq-bar crt-eq-bar--4" x="27" y="-25" width="6" height="24" fill="#d49a3a"/>' +
        '</g>' +
      '</g>' +
      // Brand text
      '<text x="20" y="232" font-family="DM Mono, monospace" font-size="9" fill="#5a3a20" letter-spacing="2">HAN INC.</text>'
  );
}

/* ── Lamp ──────────────────────────────────────────────────── */
function lampGlow() {
  return (
    '<g class="crt-lamp-glow">' +
      ellipseAt(LAMP.poolCx, LAMP.poolCy, LAMP.poolRx, LAMP.poolRy, 'fill="url(#rg-lamp)"') +
      '<ellipse class="crt-bulb-glow" cx="' +
      worldX(LAMP.bulbCx) +
      '" cy="' +
      worldY(LAMP.bulbCy) +
      '" rx="' +
      LAMP.bulbRx +
      '" ry="' +
      LAMP.bulbRy +
      '" fill="url(#rg-lamp)" opacity=".85"/>' +
    "</g>"
  );
}

function lampChrome() {
  return gAtCenter(LAMP.baseCx, LAMP.baseCy, "crt-room-decor",
      // Soft contact shadow on the desk beneath the base
      '<ellipse cx="0" cy="14" rx="62" ry="7" fill="#000" opacity=".4"/>' +
      // Round weighted base (back rim slightly lighter for a 3D feel)
      '<ellipse cx="0" cy="0"  rx="55" ry="14" fill="#1a120c"/>' +
      '<ellipse cx="0" cy="-3" rx="50" ry="11" fill="#2a1f17"/>' +
      '<ellipse cx="0" cy="-6" rx="42" ry="7"  fill="#3a2a1f"/>' +
      // Pivot ball on top of the base where the stem attaches
      '<circle cx="0" cy="-12" r="8" fill="#1a120c"/>' +
      // Stem riser — rises FROM the pivot ball UP TO the arm start at y=-46
      '<rect x="-4" y="-46" width="8" height="38" fill="#1a120c"/>' +
      // Stem highlight (subtle 3D cylinder feel)
      '<rect x="-1" y="-46" width="2" height="38" fill="#3a2a1f" opacity=".55"/>' +
      // Top knuckle joint where the stem meets the arm
      '<circle cx="0" cy="-46" r="7" fill="#2a1f17"/>' +
      // Articulated arm: starts AT the top knuckle, rises up-and-left
      '<line x1="0"   y1="-46"  x2="-50"  y2="-180" stroke="#1a120c" stroke-width="8" stroke-linecap="round"/>' +
      '<line x1="-50" y1="-180" x2="-110" y2="-310" stroke="#1a120c" stroke-width="8" stroke-linecap="round"/>' +
      // Elbow joint
      '<circle cx="-50" cy="-180" r="9" fill="#2a1f17"/>' +
      // Lampshade (cone, tilted down-and-left toward the desk pool)
      '<g transform="translate(-110, -310) rotate(35)">' +
        '<path d="M-44 -8 L44 -8 L60 60 L-60 60 Z" fill="#7a3a1a"/>' +
        '<path d="M-44 -8 L44 -8 L42 0 L-42 0 Z" fill="#5a2812"/>' +
        // Bulb glow strip seen from below the shade
        '<rect x="-55" y="58" width="110" height="5" fill="#fff6c8" opacity=".9"/>' +
      "</g>"
  );
}

/* ── Computer tower (far right on desk) ───────────────────── */
function tower() {
  const tw = TOWER.w;
  const th = TOWER.h;
  return gAtCenterTopLeft(TOWER.cx, TOWER.cy, tw, th, "crt-room-decor",
      '<rect x="0" y="0" width="' + tw + '" height="' + th + '" fill="url(#rg-beige)" rx="3"/>' +
      '<rect x="0" y="0" width="2" height="' + th + '" fill="#fff" opacity=".25"/>' +
      '<rect x="' + (tw - 2) + '" y="0" width="2" height="' + th + '" fill="#000" opacity=".15"/>' +
      // 5.25" drive bay
      '<rect x="20" y="22" width="120" height="18" fill="#0c0805" rx="1"/>' +
      '<rect x="24" y="26" width="100" height="10" fill="#1a120c"/>' +
      // 3.5" floppy bay
      '<rect x="20" y="50" width="120" height="14" fill="#0c0805" rx="1"/>' +
      '<rect x="24" y="54" width="80" height="6" fill="#1a120c"/>' +
      // Drive LED (blinking)
      '<circle class="crt-led" cx="138" cy="57" r="3" fill="#d49a3a"/>' +
      // Vent grilles
      '<g fill="#3a2418" opacity=".7">' +
        '<rect x="20" y="80" width="120" height="2"/>' +
        '<rect x="20" y="86" width="120" height="2"/>' +
        '<rect x="20" y="92" width="120" height="2"/>' +
        '<rect x="20" y="98" width="120" height="2"/>' +
      '</g>' +
      // Stylized brand label
      '<rect x="20" y="120" width="120" height="20" fill="none" stroke="#3a2418" stroke-width=".8"/>' +
      '<text x="80" y="134" text-anchor="middle" font-family="DM Mono, monospace" font-size="10" fill="#3a2418" letter-spacing="3">Han-Reeves</text>' +
      // Power button
      '<circle cx="' + (tw - 30) + '" cy="' + (th - 30) + '" r="10" fill="#3a2418"/>' +
      '<circle cx="' + (tw - 30) + '" cy="' + (th - 30) + '" r="7" fill="url(#rg-beige)"/>' +
      '<circle class="crt-led" cx="30" cy="' + (th - 30) + '" r="3.5" fill="#8be07f" opacity=".9"/>' +
      '<text x="42" y="' + (th - 27) + '" font-family="DM Mono, monospace" font-size="8" fill="#3a2418">PWR</text>'
  );
}

/* ── Monitor frame around the screen (all geometry from MONITOR center) ─ */
function monitorFrame() {
  const m = MONITOR;
  const mx = worldX(m.cx);
  const my = worldY(m.cy);
  const bezelBottom = my + m.bezelOuterH / 2;
  return (
    '<g class="crt-monitor-decor">' +
      '<path d="M' +
      (mx - 100) +
      " " +
      bezelBottom +
      " L" +
      (mx + 100) +
      " " +
      bezelBottom +
      " L" +
      (mx + 120) +
      " " +
      (bezelBottom + 38) +
      " L" +
      (mx - 120) +
      " " +
      (bezelBottom + 38) +
      ' Z" fill="#a48553"/>' +
      '<rect x="' +
      (mx - m.screenW / 2) +
      '" y="' +
      (bezelBottom + 38) +
      '" width="' +
      m.screenW +
      '" height="14" fill="#7a5e2e" rx="3"/>' +
      '<rect x="' +
      (mx - m.screenW / 2 + 4) +
      '" y="' +
      (bezelBottom + 50) +
      '" width="' +
      (m.screenW - 8) +
      '" height="6" fill="#3a2812"/>' +
      '<rect x="' +
      (mx - m.standNeckW / 2) +
      '" y="' +
      (bezelBottom - 15) +
      '" width="' +
      m.standNeckW +
      '" height="' +
      m.standNeckH +
      '" fill="#c2a474"/>' +
      rectFromCenter(m.cx, m.cy, m.bezelOuterW, m.bezelOuterH, 'fill="url(#rg-beige)" rx="22"') +
      rectFromCenter(m.cx, m.cy, m.bezelInnerW, m.bezelInnerH, 'fill="#1a120c" rx="14"') +
      '<rect x="' +
      (mx - m.bezelOuterW / 2 + 6) +
      '" y="' +
      (my - m.bezelOuterH / 2 + 6) +
      '" width="' +
      (m.bezelOuterW - 12) +
      '" height="4" fill="#fff" opacity=".3" rx="2"/>' +
      '<text x="' +
      mx +
      '" y="' +
      (bezelBottom - 6) +
      '" text-anchor="middle" font-family="DM Mono, monospace" font-size="9" fill="#5a3a20" letter-spacing="3">ADell</text>' +
      '<circle class="crt-led" cx="' +
      (mx + m.bezelOuterW / 2 - 54) +
      '" cy="' +
      (bezelBottom - 10) +
      '" r="3" fill="#8be07f"/>' +
    "</g>"
  );
}

/* ── Keyboard + mouse ─────────────────────────────────────── */
function peripherals() {
  const k = KEYBOARD;
  const towerPlugX = worldX(TOWER.cx) - TOWER.w / 2 - worldX(MOUSE.cx);
  const towerPlugY = worldY(DESK.surfaceY + 20) - worldY(MOUSE.cy);
  const keyboardInner =
    '<rect x="0" y="0" width="' +
    k.w +
    '" height="' +
    k.h +
    '" fill="url(#rg-beige)" rx="6"/>' +
    '<rect x="0" y="0" width="' +
    k.w +
    '" height="3" fill="#fff" opacity=".25" rx="2"/>' +
    keyboardKeys();
  const mouseInner =
    '<ellipse cx="0" cy="0" rx="38" ry="26" fill="url(#rg-beige)"/>' +
    '<line x1="-20" y1="-22" x2="-20" y2="0" stroke="#a48553" stroke-width=".8" opacity=".55"/>' +
    '<rect x="-3" y="-30" width="6" height="8" rx="1" fill="#3a2418"/>' +
    '<path d="M0 -30 Q70 -55 150 -60 Q210 -65 ' +
    towerPlugX +
    " " +
    towerPlugY +
    '" stroke="#3a2418" stroke-width="2" fill="none" stroke-linecap="round"/>';
  return (
    '<g class="crt-room-decor">' +
    gAtCenterTopLeft(k.cx, k.cy, k.w, k.h, "crt-room-decor", keyboardInner) +
    gAtCenter(MOUSE.cx, MOUSE.cy, "crt-room-decor", mouseInner) +
    "</g>"
  );
}

function keyboardKeys() {
  // 4 rows of small keys
  let out = '';
  const rows = [
    { y: 16, count: 14 },
    { y: 42, count: 14 },
    { y: 68, count: 13 },
    { y: 94, count: 9, offsetX: 50, wideEnds: true },
  ];
  rows.forEach((r) => {
    const startX = (r.offsetX || 8);
    const keyW = 30;
    const gap = 4;
    for (let i = 0; i < r.count; i++) {
      const x = startX + i * (keyW + gap);
      out += '<rect x="' + x + '" y="' + r.y + '" width="' + keyW + '" height="20" fill="#3a2418" rx="2" opacity=".7"/>';
      out += '<rect x="' + (x + 1) + '" y="' + (r.y + 1) + '" width="' + (keyW - 2) + '" height="6" fill="#fff" opacity=".08" rx="1"/>';
    }
  });
  // Space bar
  out += '<rect x="170" y="94" width="200" height="20" fill="#3a2418" rx="2" opacity=".7"/>';
  out += '<rect x="171" y="95" width="198" height="6" fill="#fff" opacity=".08" rx="1"/>';
  return out;
}

/* ── Cat (sleeping, curled on desk) ───────────────────────── */
function cat() {
  const c = CAT;
  const tx = worldX(c.cx) - c.nativeAnchorX * c.scale;
  const ty = worldY(c.cy) - c.nativeAnchorY * c.scale;
  return (
    '<g class="crt-cat-wrap" transform="translate(' + tx + "," + ty + ") scale(" + c.scale + ')">' +
      '<g class="sc-breathe">' +
        // ── TAIL: dark seal-point, curled around the back ──
        '<path d="M 580 340 C 640 320, 660 290, 630 260 C 600 235, 550 240, 520 270 C 495 295, 490 320, 510 340 Z" fill="#5a3a26"/>' +
        '<path d="M 580 340 C 640 320, 660 290, 630 260 C 600 235, 550 240, 520 270" fill="none" stroke="#3a2418" stroke-width="2" opacity="0.5"/>' +
        '<ellipse cx="625" cy="262" rx="22" ry="14" fill="#3a2418" transform="rotate(-25 625 262)"/>' +

        // ── MAIN BODY: large curled-up oval ("loaf-curl" silhouette) ──
        '<path d="M 220 360 C 200 290, 240 230, 320 215 C 410 200, 510 215, 580 250 C 640 280, 650 340, 620 380 C 580 410, 480 410, 380 405 C 290 400, 235 395, 220 360 Z" fill="url(#sc-bodyGrad)"/>' +

        // ── SADDLE: brown back across the spine ──
        '<path d="M 280 240 C 360 215, 470 218, 555 250 C 600 270, 615 310, 595 350 C 555 375, 470 380, 380 372 C 320 365, 285 340, 280 300 Z" fill="url(#sc-saddleGrad)"/>' +

        // ── Belly / chest shadow curve ──
        '<path d="M 240 360 C 280 395, 380 410, 470 405 C 540 400, 595 385, 615 365" fill="none" stroke="#d9c4a3" stroke-width="6" opacity="0.5" stroke-linecap="round"/>' +

        // ── Hind-leg / hip curve hint on the right side ──
        '<path d="M 560 270 C 615 280, 640 320, 625 365" fill="none" stroke="#5a3a26" stroke-width="3" opacity="0.35" stroke-linecap="round"/>' +

        // ── FRONT PAWS: white, tucked under chin, peeking out at the front ──
        '<g>' +
          // Left front paw
          '<ellipse cx="305" cy="385" rx="42" ry="22" fill="#fdfaf2"/>' +
          '<ellipse cx="305" cy="385" rx="42" ry="22" fill="#e8e0cf" opacity="0.25"/>' +
          '<path d="M 285 388 Q 290 395 295 388" fill="none" stroke="#e8e0cf" stroke-width="1.2"/>' +
          '<path d="M 300 390 Q 305 397 310 390" fill="none" stroke="#e8e0cf" stroke-width="1.2"/>' +
          '<path d="M 315 388 Q 320 395 325 388" fill="none" stroke="#e8e0cf" stroke-width="1.2"/>' +
          // Right front paw (slightly behind)
          '<ellipse cx="358" cy="392" rx="38" ry="20" fill="#fdfaf2"/>' +
          '<ellipse cx="358" cy="392" rx="38" ry="20" fill="#e8e0cf" opacity="0.2"/>' +
          '<path d="M 342 395 Q 347 401 352 395" fill="none" stroke="#e8e0cf" stroke-width="1.2"/>' +
          '<path d="M 356 396 Q 361 402 366 396" fill="none" stroke="#e8e0cf" stroke-width="1.2"/>' +
          '<path d="M 370 395 Q 375 401 380 395" fill="none" stroke="#e8e0cf" stroke-width="1.2"/>' +
        '</g>' +

        // ── WHITE CHEST BIB peeking between paws and chin ──
        '<path d="M 305 370 C 320 360, 360 358, 380 368 C 380 385, 330 388, 305 380 Z" fill="#fdfaf2"/>' +

        // ── HEAD (tucked down, resting on / near paws) ──
        '<g>' +
          // Head base shape (cream sides showing under mask)
          '<ellipse cx="310" cy="335" rx="78" ry="62" fill="url(#sc-bodyGrad)"/>' +
          // Dark seal-point face mask
          '<path d="M 250 305 C 250 270, 285 250, 320 250 C 360 250, 385 275, 385 310 C 385 335, 370 350, 345 355 C 320 358, 285 355, 265 345 C 250 335, 245 320, 250 305 Z" fill="url(#sc-maskGrad)"/>' +
          // White inverted-V blaze down the muzzle
          '<path d="M 305 320 C 310 330, 318 340, 322 355 C 326 365, 330 372, 332 378 C 328 380, 318 380, 310 378 C 305 372, 300 360, 298 350 C 295 340, 298 328, 305 320 Z" fill="#fdfaf2"/>' +
          // Chin
          '<ellipse cx="325" cy="370" rx="28" ry="14" fill="#fdfaf2"/>' +
          // Left ear (with twitch animation)
          '<g class="sc-ear-twitch">' +
            '<path d="M 258 295 L 248 250 L 285 275 Z" fill="#3a2418"/>' +
            '<path d="M 262 285 L 258 262 L 278 277 Z" fill="#c98a7a" opacity="0.6"/>' +
          '</g>' +
          // Right ear
          '<path d="M 365 290 L 380 248 L 348 270 Z" fill="#3a2418"/>' +
          '<path d="M 363 282 L 372 258 L 354 272 Z" fill="#c98a7a" opacity="0.6"/>' +
          // Closed eyes — left
          '<path d="M 278 318 Q 288 314 298 318" fill="none" stroke="#1a0e08" stroke-width="2" stroke-linecap="round"/>' +
          '<path d="M 278 318 Q 288 322 298 320" fill="none" stroke="#5a3a26" stroke-width="1" stroke-linecap="round" opacity="0.7"/>' +
          '<path d="M 297 317 L 302 315" stroke="#1a0e08" stroke-width="1" stroke-linecap="round"/>' +
          // Closed eyes — right
          '<path d="M 338 318 Q 348 314 358 318" fill="none" stroke="#1a0e08" stroke-width="2" stroke-linecap="round"/>' +
          '<path d="M 338 318 Q 348 322 358 320" fill="none" stroke="#5a3a26" stroke-width="1" stroke-linecap="round" opacity="0.7"/>' +
          '<path d="M 339 317 L 334 315" stroke="#1a0e08" stroke-width="1" stroke-linecap="round"/>' +
          // Nose (slightly heart-shaped) + highlight
          '<path d="M 318 348 C 314 348, 312 351, 314 354 C 316 357, 320 358, 322 357 C 326 358, 330 357, 332 354 C 334 351, 332 348, 328 348 C 325 346, 321 346, 318 348 Z" fill="#1a0e08"/>' +
          '<ellipse cx="320" cy="350" rx="2" ry="1.2" fill="#fff" opacity="0.4"/>' +
          // Relaxed mouth
          '<path d="M 323 358 Q 323 366 318 368" fill="none" stroke="#3a1a10" stroke-width="1.2" stroke-linecap="round"/>' +
          '<path d="M 323 358 Q 323 366 328 368" fill="none" stroke="#3a1a10" stroke-width="1.2" stroke-linecap="round"/>' +
          // Whiskers
          '<g class="sc-whisker">' +
            '<path d="M 295 355 Q 270 358 245 360"/>' +
            '<path d="M 298 360 Q 270 365 248 370"/>' +
            '<path d="M 300 365 Q 275 372 255 378"/>' +
            '<path d="M 345 355 Q 370 357 395 358"/>' +
            '<path d="M 343 360 Q 370 363 393 367"/>' +
            '<path d="M 341 365 Q 365 370 385 375"/>' +
          '</g>' +
          // Cheek shading
          '<ellipse cx="285" cy="355" rx="18" ry="8" fill="#e8e0cf" opacity="0.3"/>' +
          '<ellipse cx="355" cy="355" rx="18" ry="8" fill="#e8e0cf" opacity="0.3"/>' +
        '</g>' +

        // ── Top-of-back warm rim highlight ──
        '<path d="M 310 230 C 400 213, 490 215, 555 240" fill="none" stroke="#fbf4e6" stroke-width="6" opacity="0.55" stroke-linecap="round"/>' +

        // ── A few stray fur tufts along the saddle edge ──
        '<g stroke="#5a3a26" stroke-width="0.8" fill="none" opacity="0.5">' +
          '<path d="M 350 218 l 2 -6"/>' +
          '<path d="M 380 215 l 1 -7"/>' +
          '<path d="M 420 214 l 2 -6"/>' +
          '<path d="M 470 218 l 1 -7"/>' +
          '<path d="M 510 225 l 3 -5"/>' +
        '</g>' +
      '</g>' + // close .sc-breathe
    '</g>'   // close .crt-cat-wrap
  );
}

/* === OLD STRETCHED-CAT CODE (replaced by SleepingCat above) ===
   The previous brown stretched-cat implementation has been removed.
   The block below was the in-progress edit that defined it; it is
   intentionally left empty so the build still picks up the new cat. */
function _catLegacyStretched_removed() {
  // Brown snowshoe cat, stretched out on the desk with head resting on its
  // extended front paws. Anchor at world (480, 880); cat extends right.
  //
  // Body length tightened from ~310 → ~250 wide.
  // Paw anatomy fleshed out with visible legs, toe separators, toe beans,
  // and subtle claw hints — both front paws and back paw.
  //
  // The TAIL flick uses SMIL <animateTransform> instead of CSS keyframes:
  // SMIL composes correctly with the parent's CSS scale (the breathing
  // animation on .crt-cat), so the tail no longer drifts off-axis.
  return (
    '<g class="crt-cat-anchor" transform="translate(480, 880)">' +
    '<g class="crt-cat">' +
      // ── BACK HAUNCH (drawn first; body overlaps onto it) ──
      '<ellipse cx="190" cy="-18" rx="32" ry="38" fill="#6a4220"/>' +

      // ── BODY — shorter stretched sausage lying flat on the desk ──
      '<path d="' +
        'M 30 22'  +              // belly-front under the head
        ' Q 0 8 22 -22' +          // shoulder rise
        ' Q 70 -50 130 -50' +      // back top (flat stretch)
        ' Q 175 -50 198 -32' +     // up to rear haunch
        ' Q 218 0 195 22' +        // around the rump to desk
        ' L 30 22' +
        ' Z' +
      '" fill="#6a4220"/>' +

      // Darker saddle along the spine
      '<path d="' +
        'M 60 -46' +
        ' Q 130 -56 195 -40' +
        ' Q 207 -26 188 -22' +
        ' Q 130 -22 60 -26' +
        ' Q 48 -40 60 -46' +
        ' Z' +
      '" fill="#4a2a14" opacity=".65"/>' +

      // Cream belly strip visible along the bottom of the body
      '<ellipse cx="115" cy="20" rx="85" ry="7" fill="#e8d4ac"/>' +

      // ── BACK LEG + PAW (rump area, more defined) ──
      // Upper back-leg curl visible above the paw
      '<path d="M 180 -10 Q 195 0 215 12 Q 200 18 175 12 Z" fill="#5a3622"/>' +
      // Back paw
      '<ellipse cx="200" cy="22" rx="26" ry="8" fill="#f1e4cc"/>' +
      // Toe separators on back paw
      '<g stroke="#9a8870" stroke-width="1.1" opacity=".85">' +
        '<line x1="183" y1="17" x2="183" y2="28"/>' +
        '<line x1="192" y1="16" x2="192" y2="28"/>' +
        '<line x1="201" y1="16" x2="201" y2="28"/>' +
        '<line x1="210" y1="17" x2="210" y2="28"/>' +
      '</g>' +
      // Toe beans on back paw
      '<g fill="#a8755a" opacity=".75">' +
        '<ellipse cx="179" cy="25" rx="2.6" ry="1.8"/>' +
        '<ellipse cx="188" cy="26" rx="2.6" ry="1.8"/>' +
        '<ellipse cx="197" cy="26" rx="2.6" ry="1.8"/>' +
        '<ellipse cx="206" cy="26" rx="2.6" ry="1.8"/>' +
        '<ellipse cx="215" cy="25" rx="2.6" ry="1.8"/>' +
      '</g>' +

      // ── FRONT LEG (visible coming down from the body to the paws) ──
      '<path d="M 25 6 Q 8 12 -15 16 L -22 20 Q 5 18 22 14 Z" fill="#5a3622"/>' +
      // Second front leg shadow (further/behind leg)
      '<path d="M 30 8 Q 18 14 -2 17 L -8 21 Q 14 19 30 16 Z" fill="#4a2812" opacity=".65"/>' +

      // ── FRONT PAWS extended forward (head sits on these) ──
      // Far paw (behind, slightly darker)
      '<ellipse cx="-22" cy="21" rx="32" ry="7" fill="#e0ccac"/>' +
      // Near paw (in front)
      '<ellipse cx="-20" cy="24" rx="38" ry="8" fill="#f1e4cc"/>' +
      // Toe separators on near paw — 5 toes, deeper definition
      '<g stroke="#9a8870" stroke-width="1.2" opacity=".9">' +
        '<line x1="-50" y1="19" x2="-50" y2="30"/>' +
        '<line x1="-40" y1="18" x2="-40" y2="30"/>' +
        '<line x1="-30" y1="17" x2="-30" y2="30"/>' +
        '<line x1="-20" y1="17" x2="-20" y2="30"/>' +
        '<line x1="-10" y1="18" x2="-10" y2="30"/>' +
      '</g>' +
      // Toe beans (pads) on near paw
      '<g fill="#a8755a" opacity=".8">' +
        '<ellipse cx="-54" cy="27" rx="2.8" ry="1.9"/>' +
        '<ellipse cx="-45" cy="28" rx="2.8" ry="1.9"/>' +
        '<ellipse cx="-35" cy="28.5" rx="2.8" ry="1.9"/>' +
        '<ellipse cx="-25" cy="28.5" rx="2.8" ry="1.9"/>' +
        '<ellipse cx="-15" cy="28" rx="2.8" ry="1.9"/>' +
        '<ellipse cx="-5"  cy="27" rx="2.8" ry="1.9"/>' +
      '</g>' +
      // Tiny claw hints peeking from the front edge
      '<g stroke="#3a2418" stroke-width=".9" opacity=".55" stroke-linecap="round">' +
        '<line x1="-54" y1="30" x2="-56" y2="33"/>' +
        '<line x1="-45" y1="31" x2="-47" y2="34"/>' +
        '<line x1="-35" y1="32" x2="-37" y2="35"/>' +
        '<line x1="-25" y1="32" x2="-27" y2="35"/>' +
        '<line x1="-15" y1="31" x2="-17" y2="34"/>' +
      '</g>' +

      // ── HEAD — resting on the front paws ──
      '<g transform="translate(8, 0)">' +
        '<ellipse cx="0" cy="6" rx="32" ry="15" fill="#6a4220"/>' +
        '<path d="M-32 -4 Q-30 -30 0 -34 Q30 -30 32 -4 Q26 12 0 12 Q-26 12 -32 -4 Z" fill="#3a2418"/>' +
        '<path d="M-22 -10 Q0 -24 22 -10 Q12 -6 0 -6 Q-12 -6 -22 -10 Z" fill="#4a2e1a" opacity=".7"/>' +
        '<path d="M-28 -18 L-36 -44 L-12 -30 Z" fill="#2a1810"/>' +
        '<path d="M28 -18 L36 -44 L12 -30 Z" fill="#2a1810"/>' +
        '<path d="M-26 -22 L-30 -36 L-18 -30 Z" fill="#a8755a"/>' +
        '<path d="M26 -22 L30 -36 L18 -30 Z" fill="#a8755a"/>' +
        '<ellipse cx="0" cy="6" rx="15" ry="9" fill="#f1e4cc"/>' +
        '<path d="M-3.5 3 L3.5 3 L0 8 Z" fill="#2a1408"/>' +
        '<path class="crt-cat-eye" d="M-16 -4 Q-11 -1 -6 -4" stroke="#1a0e08" stroke-width="2" fill="none" stroke-linecap="round"/>' +
        '<path class="crt-cat-eye" d="M6 -4 Q11 -1 16 -4" stroke="#1a0e08" stroke-width="2" fill="none" stroke-linecap="round"/>' +
        '<path d="M-4 9 Q0 12 4 9" stroke="#1a0e08" stroke-width="1" fill="none" stroke-linecap="round"/>' +
        '<g stroke="#fff" stroke-width="1" opacity=".9">' +
          '<line x1="-34" y1="6"  x2="-12" y2="6"/>' +
          '<line x1="-34" y1="10" x2="-12" y2="9"/>' +
          '<line x1="34"  y1="6"  x2="12"  y2="6"/>' +
          '<line x1="34"  y1="10" x2="12"  y2="9"/>' +
        '</g>' +
      '</g>' +

      // ── TAIL ── SMIL animateTransform rotates around (0,0) of the
      //   tail group's local coords, which is the tail base. This avoids
      //   the CSS-vs-parent-transform mismatch that made the tail fly off.
      '<g transform="translate(210, -22)">' +
        '<g class="crt-cat-tail">' +
          '<animateTransform attributeName="transform" attributeType="XML" type="rotate"' +
            ' values="0; 0; 0; -7; 4; -2; 0"' +
            ' keyTimes="0; 0.78; 0.83; 0.88; 0.92; 0.96; 1"' +
            ' dur="9s" repeatCount="indefinite" />' +
          '<path d="M0 0 Q45 -25 25 -65 Q5 -100 -50 -85" stroke="#4a2a14" stroke-width="22" fill="none" stroke-linecap="round"/>' +
          '<circle cx="-50" cy="-85" r="13" fill="#1a0e08"/>' +
        '</g>' +
      '</g>' +

      // ── Sleepy "z" glyphs above the head ──
      '<g class="crt-cat-zzz" font-family="DM Mono, monospace" fill="#d49a3a" opacity=".85">' +
        '<text class="crt-zzz crt-zzz--1" x="36" y="-66"  font-size="22">z</text>' +
        '<text class="crt-zzz crt-zzz--2" x="56" y="-86"  font-size="17">z</text>' +
        '<text class="crt-zzz crt-zzz--3" x="74" y="-104" font-size="13">z</text>' +
      '</g>' +
    '</g>' +  // close .crt-cat (animation wrapper)
    '</g>'   // close .crt-cat-anchor (positional wrapper)
  );
}

/* ── Coffee mug with rising steam ─────────────────────────── */
function mug() {
  return gAtCenter(
    MUG.cx,
    MUG.cy,
    "crt-room-decor",
    '<rect x="-26" y="-50" width="52" height="60" fill="#5a3a20" rx="3"/>' +
      '<rect x="-22" y="-46" width="44" height="6" fill="#3a2418"/>' +
      '<path d="M26 -36 Q44 -36 44 -20 Q44 -4 26 -4" stroke="#5a3a20" stroke-width="6" fill="none"/>' +
      '<ellipse cx="0" cy="-46" rx="22" ry="4" fill="#2a1408"/>' +
      '<g class="crt-steam" fill="none" stroke="#fff" stroke-width="2" opacity=".4" stroke-linecap="round">' +
      '<path class="crt-steam-curl crt-steam-curl--a" d="M-10 -58 Q-14 -76 -6 -90 Q2 -104 -6 -118"/>' +
      '<path class="crt-steam-curl crt-steam-curl--b" d="M6 -58 Q10 -78 2 -94 Q-6 -108 4 -124"/>' +
      "</g>"
  );
}
