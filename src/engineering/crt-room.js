/**
 * =============================================================================
 *  CRT ROOM SCENE — hand-authored pixel art (beach bungalow at sunset)
 * =============================================================================
 *  The room is drawn into a 320×180 canvas shown with nearest-neighbour
 *  scaling. One art pixel = ART (6) units of the 1920×1080 "viewBox" that the
 *  HTML screen overlay (.crt-zoom-screen) and the camera fly-in use, so
 *  MONITOR keeps its old meaning. applyCrtRoomLayoutVars snaps the scale so
 *  every art pixel is a whole number of screen pixels.
 *
 *  Live bits layered over the canvas inside .crt-room-scene (1em = 1 art px):
 *  - .crt-vinyl-slot hit areas over the five frames. spotify-vinyl.js fills in
 *    track data and hands covers to setVinylCover(), which pixelates them
 *    into the canvas.
 *  - .crt-book-label spine titles on the shelf.
 * =============================================================================
 */

const W = 320, H = 180, ART = 6;
const VIEW = { w: W * ART, h: H * ART };

/** Monitor screen rect in art px; the HTML overlay sits exactly on it. */
const SCREEN = { x: 131, y: 59, w: 58, h: 42 };
const MONITOR = {
  cx: (SCREEN.x + SCREEN.w / 2) * ART,
  cy: (SCREEN.y + SCREEN.h / 2) * ART,
  screenW: SCREEN.w * ART,
  screenH: SCREEN.h * ART,
};

/** Window glass (art px); horizon, beach line and sun are relative to it. */
const WIN = { x: 16, y: 12, w: 76, h: 84 };
const HORIZON = WIN.y + 52;
const BEACH = WIN.y + 70;
/** The setting sun, seen through the window; it's also the room's main light source. */
const SUN = { x: WIN.x + 54, y: HORIZON - 2, r: 8 };

/** Wall frames (top-left of the 36px wood frame). Slot 0 = most recent track. */
const FRAMES = [101, 142, 183, 224, 265].map((x) => ({ x, y: 4 }));
const FRAME_LABELS = ["#c2553a", "#3a7ca5", "#d9a441", "#5f8a5a", "#8a5a9a"];
const COVER = 28;

/**
 * Spine labels for books — edit here. Titles fill the visible spines in order
 * (left of the monitor, right of it, then the stack on the tower). Titles in
 * FILLER_TITLES are skipped: they're for the books hidden behind the monitor.
 * There are 13 visible spines; extra titles won't show.
 */
const FILLER_TITLES = new Set(["Filler", "hmm what is this??"]);
const BOOK_TITLES = [
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
const BOOK_COLORS = [
  "#2f4a6b", "#c7684e", "#d9b25c", "#5d8a7a", "#e8dcc4", "#7a4a5e",
  "#3f6b8a", "#b9845a", "#8fae9c", "#a14b3c", "#4f5d7a", "#c9a37a",
];
/** Shelf spans from just right of the window to just left of the tower. */
const SHELF = { x: 98, y: 66, w: 154 };
/** Things in front of the shelf that hide the lower part of some spines: [x0, x1, topY]. */
const SHELF_OCCLUDERS = [[127, 193, 46], [119, 201, 51], [210, 240, 62]];
// Spines left and right of the monitor are visible (titled); the run behind it is filler.
const SHELF_RUNS = [
  { x: 99, widths: [9, 8], titled: true },
  { x: 116, widths: [7, 9, 6, 8, 7, 9, 6, 8, 7, 9, 10], titled: false },
  { x: 202, widths: [6, 6, 6, 6, 6, 6, 6, 6], titled: true },
];
/** Books lying flat on top of the tower, bottom to top: [x, y, w, h]. */
const TOWER_BOOKS = [[259, 52, 32, 5], [261, 48, 28, 4], [258, 43, 30, 5]];

function buildBooks() {
  const titles = BOOK_TITLES.filter((t) => !FILLER_TITLES.has(t));
  const books = [];
  let i = 0, ti = 0;
  for (const run of SHELF_RUNS) {
    let x = run.x;
    for (const w of run.widths) {
      const h = run.titled ? 20 + ((i * 3) % 4) : 18 + ((i * 7) % 6);
      books.push({ i, x, w, h, color: BOOK_COLORS[i % BOOK_COLORS.length], title: run.titled ? titles[ti++] || "" : "" });
      x += w; i++;
    }
  }
  for (const [x, y, w, h] of TOWER_BOOKS) {
    books.push({ i, x, y, w, h, flat: true, color: BOOK_COLORS[(i * 5) % BOOK_COLORS.length], title: titles[ti++] || "" });
    i++;
  }
  return books;
}
const BOOKS = buildBooks();

// Keep key props inside x≈18..300 so 16:10 screens (which crop the sides) still show them.
/** Cabin roof: tie beam rows BEAM_Y..BEAM_Y+3 just above the window and frames; Λ peak ROOF_H above the room top. */
const ROOF_H = 30, BEAM_Y = -6;
/** Rafters meet the tie beam this far either side of centre, which sets the roof pitch. */
const ROOF_HALF = 150;
/** White-painted ceiling boards and timbers. */
const ROOF_PAINT = {
  board: "#f4f1ec", board2: "#e9e4dc", seam: "#cfc7ba",
  timber: "#e4ddd1", lit: "#fbf9f5", shade: "#b5ab9c",
};
/** Where the wall and desk meet the floor (the rug sits below this). */
const FLOOR_Y = 196;
/** Desk extent (it ends just past the room's props) and its two drawer pedestals [x0, x1). */
const DESK_X0 = 2, DESK_X1 = 318;
const PEDESTALS = [[DESK_X0 + 3, 118], [202, DESK_X1 - 3]];

const CATX = 16, CATY = 99;
/** Mug sits on the desk just in front of the speaker. */
const MUGX = 99, MUGY = 125;
const SPEAKER = { x: 94, y: 90, w: 22, h: 37 };
/** Film camera between the cat and the speaker; clicking it opens the photography portfolio. */
const CAMERA = { x: 76, y: 117, w: 17, h: 10 };
/** Tower: front face FX..FX+33 from TT down to the desk; DX/DY is how far the case recedes. */
const FX = 254, TT = 60, DX = 14, DY = 7;
const FPS = 12;

const C = {
  ol: "#1a1218",
  // Warm off-white plaster; reads peach-tan in the room's amber dusk light.
  wall: "#f0e1cd", wallD: "#e6d5bf", wallL: "#f6eadb", wallS: "#c9b296",
  shelfL: "#b07a4f", shelfT: "#9a6642", shelf: "#7f5034", shelfD: "#4f2f1f",
  // Dark oak.
  deskTop: "#7a4a32", deskTopL: "#8f5a3b", deskGrain: "#6a3f2b", deskEdge: "#5a3424", deskEdgeL: "#a06a45",
  deskFront: "#3e2419", deskFrontD: "#2a170f", deskFrontL: "#4d2e20", shadow: "#3d2418",
  deskHole: "#1e110c", deskHandleD: "#5e3f22",
  beigeH: "#efe2c4", beige: "#d9c7a3", beigeM: "#bba783", beigeD: "#8f7c5f", beigeDD: "#5e4f3c",
  scr0: "#08130d", scr1: "#0f2218", scr2: "#16301f",
  brass: "#a07a3c", brassL: "#c99a52", brassD: "#6e5228", arm: "#2c2732", armL: "#4d4656",
  frame: "#ece5d6", frameL: "#fffaf0", frameD: "#bdb3a2",
  palm: "#2b2340",
};

// ---------- canvases ----------
const mk = () => {
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  return c;
};
const bg = mk(), winBack = mk(), winFront = mk();
let ctx = null;
/** Screen px per art px, and how far the canvas extends past the room on each side (art px). */
let artPx = 0, padX = 0, padTop = 0, padBottom = 0, lastT = 0;
let g = bg.getContext("2d");
const use = (canvas) => { g = canvas.getContext("2d"); };

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => v / 16);
const by = (x, y) => BAYER[(y & 3) * 4 + (x & 3)];

// ---------- pixel primitives ----------
const rect = (x, y, w, h, c) => { g.fillStyle = c; g.fillRect(x, y, w, h); };
const px = (x, y, c) => rect(x, y, 1, 1, c);
const INSETS = { 1: [1], 2: [2, 1], 3: [3, 1, 1], 4: [4, 2, 1, 1] };
function rrect(x, y, w, h, r, c) {
  const ins = INSETS[r] || [];
  g.fillStyle = c;
  for (let i = 0; i < h; i++) {
    const d = Math.min(i, h - 1 - i);
    const k = d < ins.length ? ins[d] : 0;
    g.fillRect(x + k, y + i, w - 2 * k, 1);
  }
}
function line(x0, y0, x1, y1, c, t = 1) {
  const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let e = dx + dy;
  for (;;) {
    rect(x0, y0, t, t, c);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * e;
    if (e2 >= dy) { e += dy; x0 += sx; }
    if (e2 <= dx) { e += dx; y0 += sy; }
  }
}
function inPoly(x, y, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function poly(pts, c) {
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  for (let y = Math.floor(Math.min(...ys)); y <= Math.max(...ys); y++)
    for (let x = Math.floor(Math.min(...xs)); x <= Math.max(...xs); x++)
      if (inPoly(x + 0.5, y + 0.5, pts)) px(x, y, c);
}
const inEll = (x, y, cx, cy, rx, ry) => { const a = (x + 0.5 - cx) / rx, b = (y + 0.5 - cy) / ry; return a * a + b * b <= 1; };
function ell(cx, cy, rx, ry, c) {
  for (let y = Math.floor(cy - ry); y <= cy + ry; y++)
    for (let x = Math.floor(cx - rx); x <= cx + rx; x++) if (inEll(x, y, cx, cy, rx, ry)) px(x, y, c);
}
// Soft contact shadow: solid core, dithered falloff.
function shadow(cx, cy, rx, ry) {
  for (let y = Math.floor(cy - ry); y <= cy + ry; y++)
    for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
      const a = (x + 0.5 - cx) / rx, b = (y + 0.5 - cy) / ry, d = a * a + b * b;
      if (d <= 0.55 || (d <= 1 && by(x, y) < (1 - d) * 1.6)) px(x, y, C.shadow);
    }
}
function shade(hex, k) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.max(0, Math.min(255, Math.round(v * k)));
  return "#" + ((1 << 24) | (ch(n >> 16) << 16) | (ch((n >> 8) & 255) << 8) | ch(n & 255)).toString(16).slice(1);
}
function isLight(hex) {
  const n = parseInt(hex.slice(1), 16);
  return (n >> 16) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114 > 150;
}
// Smooth 2D value noise in [0,1].
const hash = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
function noise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
const inGlass = (x, y) => x >= WIN.x && x < WIN.x + WIN.w && y >= WIN.y && y < WIN.y + WIN.h;

// ---------- wall, window, shelf, frames ----------
// Wall, desk and floor span the whole canvas (room coords run from -padX/-padTop past each edge).
function drawWall() {
  const x0 = -padX, x1 = W + padX, y0 = -padTop;
  // Limewash plaster: soft cloudy mottling from two octaves of value noise, dithered into 3 tones.
  for (let y = y0; y < FLOOR_Y; y++) for (let x = x0; x < x1; x++) {
    const n = noise(x / 26, y / 18) * 0.7 + noise(x / 9 + 40, y / 7) * 0.3 + (by(x, y) - 0.5) * 0.12;
    px(x, y, n < 0.4 ? C.wallD : n > 0.6 ? C.wallL : C.wall);
  }
  // Wood baseboard where the wall meets the floor.
  rect(x0, FLOOR_Y - 5, x1 - x0, 1, C.ol);
  rect(x0, FLOOR_Y - 4, x1 - x0, 4, "#6b4630");
  rect(x0, FLOOR_Y - 4, x1 - x0, 1, "#8f6040");
}

// Cabin roof: the limewash wall continues up into a gable that rises to a Λ peak,
// with dark pine ceiling boards outside it, heavy rafters along the Λ, a ridge
// beam overhead, a king post, and a tie beam across the top of the wall.
function drawRoof() {
  const x0 = -padX, x1 = W + padX, y0 = -padTop, cx = W / 2;
  if (y0 >= BEAM_Y + 4) return;
  // Peak sits at the top of the view so the gable fills whatever height the window gives it.
  const peakY = Math.min(-ROOF_H + 2, y0 + 2);
  const rafterY = (x) => BEAM_Y + (peakY - BEAM_Y) * Math.max(0, 1 - Math.abs(x + 0.5 - cx) / ROOF_HALF);
  // White-painted boards and timbers; soft grey shading keeps the Λ readable.
  const R = ROOF_PAINT;
  for (let y = y0; y < BEAM_Y; y++) for (let x = x0; x < x1; x++) {
    const ry = rafterY(x);
    if (y < ry) px(x, y, Math.floor(ry - y) % 4 === 0 ? R.seam : by(x, y) < 0.12 ? R.board2 : R.board);
  }
  // Ridge beam running overhead from the peak.
  if (y0 < peakY) {
    rect(cx - 4, y0, 8, peakY - y0, C.ol);
    rect(cx - 3, y0, 6, peakY - y0, R.timber);
    rect(cx - 3, y0, 1, peakY - y0, R.lit);
    rect(cx + 2, y0, 1, peakY - y0, R.shade);
  }
  // Rafters along the Λ, outlined so white-on-white still reads.
  const pk = Math.round(peakY), lx = cx - ROOF_HALF, rx = cx + ROOF_HALF;
  line(lx, BEAM_Y - 1, cx, pk - 1, C.ol, 4);
  line(cx, pk - 1, rx, BEAM_Y - 1, C.ol, 4);
  line(lx, BEAM_Y, cx, pk, R.timber, 3);
  line(cx, pk, rx, BEAM_Y, R.timber, 3);
  line(lx, BEAM_Y, cx, pk, R.lit);
  line(cx, pk, rx, BEAM_Y, R.lit);
  line(lx, BEAM_Y + 2, cx, pk + 2, R.shade);
  line(cx, pk + 2, rx, BEAM_Y + 2, R.shade);
  // King post from the tie beam up to the peak.
  rect(cx - 3, pk, 6, BEAM_Y - pk, C.ol);
  rect(cx - 2, pk, 4, BEAM_Y - pk, R.timber);
  rect(cx - 2, pk, 1, BEAM_Y - pk, R.lit);
  rect(cx + 1, pk, 1, BEAM_Y - pk, R.shade);
  // Tie beam and the shadow it casts on the wall.
  rect(x0, BEAM_Y - 1, x1 - x0, 1, C.ol);
  rect(x0, BEAM_Y, x1 - x0, 4, R.timber);
  rect(x0, BEAM_Y, x1 - x0, 1, R.lit);
  rect(x0, BEAM_Y + 3, x1 - x0, 1, R.shade);
  rect(x0, BEAM_Y + 4, x1 - x0, 1, C.ol);
  for (let y = BEAM_Y + 5; y < BEAM_Y + 11; y++)
    for (let x = x0; x < x1; x++) if (by(x, y) < ((BEAM_Y + 11 - y) / 6) * 0.6) px(x, y, C.wallS);
}

// Whitewashed floorboards below the desk with an inset rug, shaded where the desk overhangs.
function drawFloor() {
  const x0 = -padX, x1 = W + padX, y1 = H + padBottom, F = FLOOR_Y;
  rect(x0, F, x1 - x0, y1 - F, "#cbbba3");
  for (let y = F + 2, row = 0; y < y1; y += 6, row++) {
    rect(x0, y, x1 - x0, 1, "#a9997f");
    // Long staggered planks with a little grain so they read as wood, not tile.
    for (let x = x0 + ((row * 41) % 89); x < x1; x += 89) rect(x, y + 1, 1, 5, "#a9997f");
    for (let k = 0; k < (x1 - x0) / 9; k++) {
      const gx = x0 + ((row * 29 + k * 47) % (x1 - x0)), gy = y + 2 + ((row + k) % 3);
      if (gy < y1) rect(gx, gy, 3 + (k % 4), 1, "#bdad94");
    }
  }
  // Striped woven rug with fringed ends, inset so floorboards show all around it.
  // Sized to the floor that's on screen at rest (the stage's bottom stageTop px start below the fold).
  const fh = y1 - Math.floor(stageTop / artPx) - F;
  if (fh >= 16) {
    const mx = Math.max(14, Math.round((x1 - x0) * 0.14));
    let rx0 = x0 + mx, rx1 = x1 - mx;
    if (rx1 - rx0 > 300) { rx0 = W / 2 - 150; rx1 = W / 2 + 150; }
    const ry0 = F + 5, ry1 = ry0 + Math.min(fh - 9, 40);
    for (let y = ry0 + 1; y < ry1 - 1; y += 2) { rect(rx0 - 3, y, 3, 1, "#efe3cc"); rect(rx1, y, 3, 1, "#efe3cc"); }
    rect(rx0, ry0, rx1 - rx0, ry1 - ry0, C.ol);
    rect(rx0 + 1, ry0 + 1, rx1 - rx0 - 2, ry1 - ry0 - 2, "#c7684e");
    for (let y = ry0 + 3; y < ry1 - 3; y++) for (let x = rx0 + 3; x < rx1 - 3; x++) {
      const band = (y - ry0 - 3) % 8;
      px(x, y, band < 2 ? "#2f4a6b" : band === 4 ? "#5d8a7a" : by(x, y) < 0.12 ? "#d6c8ae" : "#e8dcc4");
    }
  }
  // Contact shadow along the baseboard, deeper under the desk.
  for (let y = F; y < Math.min(y1, F + 5); y++)
    for (let x = x0; x < x1; x++) {
      const depth = x >= DESK_X0 - 2 && x < DESK_X1 + 2 ? 5 : 2;
      if (by(x, y) < ((F + depth - y) / 5) * 0.7) px(x, y, "#8f7f68");
    }
}

/** Everything seen through the glass that never moves: sky, sun, headland, sea, beach. */
function drawWindowBack() {
  const { x, y, w, h } = WIN;
  const SKY = ["#33335e", "#4f3f72", "#7c4a7c", "#b85c7a", "#e47c68", "#f5a35f", "#ffcf7d"];
  for (let yy = y; yy < HORIZON; yy++) for (let xx = x; xx < x + w; xx++) {
    const t = (yy - y) / (HORIZON - y);
    const glow = Math.max(0, 1 - Math.hypot(xx - SUN.x, (yy - SUN.y) * 1.6) / 34);
    const k = Math.floor(t * (SKY.length - 1) + glow * 2.2 + (by(xx, yy) - 0.5) * 0.9);
    px(xx, yy, SKY[Math.max(0, Math.min(SKY.length - 1, k))]);
  }
  // The sun: a true circle, half sunk below the horizon.
  for (let yy = SUN.y - SUN.r; yy < HORIZON; yy++)
    for (let xx = SUN.x - SUN.r; xx <= SUN.x + SUN.r; xx++)
      if (inEll(xx, yy, SUN.x + 0.5, SUN.y + 0.5, SUN.r, SUN.r))
        px(xx, yy, inEll(xx, yy, SUN.x + 0.5, SUN.y + 0.5, SUN.r - 1.5, SUN.r - 1.5) ? "#fff3c4" : "#ffe08a");
  // Distant headland on the left horizon.
  for (let xx = x; xx < x + 30; xx++) {
    const hgt = Math.round(Math.sin(((xx - x) / 30) * Math.PI) * 4);
    rect(xx, HORIZON - hgt, 1, hgt, "#5b4572");
  }
  // Sea: lighter near the horizon, deeper toward the shore, with faint swell lines.
  const SEA = ["#8a6a95", "#6d5a8e", "#545386", "#434a7c"];
  for (let yy = HORIZON; yy < BEACH; yy++) for (let xx = x; xx < x + w; xx++) {
    const k = Math.floor(((yy - HORIZON) / (BEACH - HORIZON)) * (SEA.length - 1) + (by(xx, yy) - 0.5) * 0.8);
    px(xx, yy, SEA[Math.max(0, Math.min(SEA.length - 1, k))]);
  }
  for (let i = 0; i < 14; i++)
    rect(x + ((i * 23) % (w - 10)), HORIZON + 2 + ((i * 5) % (BEACH - HORIZON - 3)), 4 + (i % 4) * 2, 1, "#9a7aa2");
  // Beach: wet sand by the water, dry sand warming toward the bottom.
  const SAND = ["#9c7a7e", "#c99a82", "#e0b48e", "#ecc79c"];
  for (let yy = BEACH; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) {
    const k = Math.floor(((yy - BEACH) / (y + h - BEACH)) * (SAND.length - 1) + 0.4 + (by(xx, yy) - 0.5) * 0.8);
    px(xx, yy, SAND[Math.max(0, Math.min(SAND.length - 1, k))]);
  }
}

/** In front of the moving window bits: palm, frame, mullions, sill, plant. */
function drawWindowFront() {
  const { x, y, w, h } = WIN;
  // Palm silhouette framing the left pane: solid curved trunk, feathered drooping fronds.
  const crown = [x + 20, y + 23];
  for (let i = 0; i <= 120; i++) {
    const t = i / 120, u = 1 - t;
    const tx = u * u * (x + 10) + 2 * u * t * (x + 10) + t * t * crown[0];
    const ty = u * u * (y + h) + 2 * u * t * (y + 45) + t * t * crown[1];
    rect(Math.round(tx), Math.round(ty), t < 0.5 ? 3 : 2, 1, C.palm);
  }
  for (const [deg, len, droop] of [[-165, 17, 0.05], [-130, 14, 0.06], [-95, 9, 0.05], [-55, 14, 0.06], [-15, 17, 0.05], [25, 13, 0.07], [150, 13, 0.07]]) {
    const a = (deg * Math.PI) / 180;
    for (let s = 0; s <= len; s += 0.5) {
      const fx = Math.round(crown[0] + Math.cos(a) * s), fy = Math.round(crown[1] + Math.sin(a) * s + droop * s * s);
      const taper = 1 - s / len;
      px(fx, fy, C.palm);
      if (taper > 0.3) px(fx, fy + 1, C.palm);
      // Leaflets hang off the underside, shorter toward the tip.
      if (s > 2 && Math.round(s) % 2 === 0) for (let k = 2; k <= 1 + Math.ceil(taper * 3); k++) px(fx, fy + k, C.palm);
    }
  }
  rect(crown[0] - 1, crown[1] - 1, 3, 3, C.palm);
  // Glass sheen.
  line(x + w - 20, y + 2, x + w - 34, y + 16, "rgba(255,255,255,.10)");
  line(x + w - 15, y + 2, x + w - 26, y + 13, "rgba(255,255,255,.07)");
  // Painted wood frame + cross mullions.
  rect(x - 5, y - 5, w + 10, 5, C.ol); rect(x - 5, y + h, w + 10, 5, C.ol);
  rect(x - 5, y, 5, h, C.ol); rect(x + w, y, 5, h, C.ol);
  rect(x - 4, y - 4, w + 8, 4, C.frame); rect(x - 4, y + h, w + 8, 4, C.frame);
  rect(x - 4, y, 4, h, C.frame); rect(x + w, y, 4, h, C.frame);
  rect(x - 4, y - 4, w + 8, 1, C.frameL); rect(x - 4, y - 4, 1, h + 8, C.frameL);
  rect(x - 1, y - 1, w + 2, 1, C.frameD); rect(x - 1, y, 1, h, C.frameD);
  rect(x + 36, y, 3, h, C.frame); rect(x + 38, y, 1, h, C.frameD);
  rect(x, y + 26, w, 3, C.frame); rect(x, y + 28, w, 1, C.frameD);
  // Sill.
  rect(x - 8, y + h + 4, w + 16, 5, C.ol);
  rect(x - 7, y + h + 4, w + 14, 1, C.frameL);
  rect(x - 7, y + h + 5, w + 14, 2, C.frame);
  rect(x - 7, y + h + 7, w + 14, 1, C.frameD);
  // Aloe in a terracotta pot on the sill (P = stem base x).
  const P = x + 58, G = "#5f8a5a", GD = "#3f6440", GL = "#86b07a";
  for (const [dx, ty] of [[-8, 80], [-5, 75], [0, 73], [5, 76], [9, 81], [-3, 79], [3, 79]]) line(P, 91, P + dx, ty, GD, 2);
  for (const [dx, ty] of [[-7, 80], [-4, 76], [0, 74], [4, 77], [8, 81]]) line(P, 90, P + dx, ty, G);
  for (const [dx, ty] of [[-6, 81], [-3, 77], [1, 75]]) px(P + dx, ty + 2, GL);
  rrect(P - 5, 90, 12, 10, 1, C.ol);
  rect(P - 4, 92, 10, 7, "#c0623f");
  rect(P - 4, 92, 1, 7, "#d98060");
  rect(P + 3, 92, 3, 7, "#9a4a30");
  rect(P - 5, 90, 12, 2, "#d77a55");
}

// Floating wall shelf with books standing on it.
function drawShelf() {
  const { x, y, w } = SHELF;
  for (const b of BOOKS) {
    if (b.flat) continue;
    const top = y - b.h, band = b.i % 3 === 0 ? "#e8c872" : shade(b.color, 1.35);
    rect(b.x, top, b.w, b.h, C.ol);
    rect(b.x + 1, top + 1, b.w - 2, b.h - 1, b.color);
    rect(b.x + 1, top + 1, 1, b.h - 1, shade(b.color, 1.18));
    rect(b.x + b.w - 2, top + 1, 1, b.h - 1, shade(b.color, 0.8));
    rect(b.x + 1, top + 3, b.w - 2, 1, band);
    rect(b.x + 1, y - 4, b.w - 2, 1, band);
  }
  // Board, brackets and its shadow on the wall.
  for (let i = 0; i < w; i++) for (let j = 0; j < 3; j++) if (by(x + i, y + 5 + j) < (3 - j) / 4) px(x + i, y + 5 + j, C.wallS);
  rect(x - 1, y - 1, w + 2, 6, C.ol);
  rect(x, y, w, 1, C.shelfL); rect(x, y + 1, w, 1, C.shelfT);
  rect(x, y + 2, w, 2, C.shelf); rect(x, y + 4, w, 1, C.shelfD);
  for (const bx of [x + 8, x + w - 11]) {
    rect(bx, y + 5, 3, 7, C.ol);
    rect(bx + 1, y + 5, 1, 6, "#5a4a50");
  }
}

/** Picture light over frame i: brass bar on a short arm from the roof beam, glowing underside. */
const picLight = (i) => ({ x: FRAMES[i].x + 9, w: 19, y: FRAMES[i].y - 4 });
function drawPictureLight(i) {
  const L = picLight(i), ax = FRAMES[i].x + 17;
  rect(ax, BEAM_Y + 4, 2, L.y - BEAM_Y - 4, C.ol);
  rect(L.x - 1, L.y, L.w + 2, 3, C.ol);
  rect(L.x, L.y + 1, L.w, 1, C.brassL);
  rect(L.x + 1, L.y + 2, L.w - 2, 1, "#fff1c4");
}

function drawFrame(i) {
  const { x, y } = FRAMES[i];
  for (let k = 0; k < 38; k++) for (let j = 0; j < 2; j++) {
    if (by(x + 37 + j, y + 2 + k) < 0.5) px(x + 37 + j, y + 2 + k, C.wallS);
    if (by(x + 2 + k, y + 37 + j) < 0.5) px(x + 2 + k, y + 37 + j, C.wallS);
  }
  rect(x - 1, y - 1, 38, 38, C.ol);
  rect(x, y, 36, 36, "#6b4630");
  rect(x, y, 36, 1, "#8f6040"); rect(x, y, 1, 36, "#8f6040");
  rect(x, y + 35, 36, 1, "#3f281b"); rect(x + 35, y, 1, 36, "#3f281b");
  rect(x + 3, y + 3, 30, 30, "#120d10");
  drawPictureLight(i);
  // Fallback until the live cover (.crt-vinyl-cover canvas) loads on top: a pixel vinyl record.
  const cx = x + 18, cy = y + 18;
  rect(x + 4, y + 4, COVER, COVER, "#1b1720");
  ell(cx, cy, 13, 13, "#0c0a0e");
  for (const r of [11, 9, 7]) for (let a = 0; a < 360; a += 4) {
    const t = (a * Math.PI) / 180;
    px(Math.floor(cx + Math.cos(t) * r), Math.floor(cy + Math.sin(t) * r), "#24202a");
  }
  ell(cx, cy, 4, 4, FRAME_LABELS[i]);
  px(cx - 1, cy - 1, "#0c0a0e");
}

// ---------- desk + objects ----------
// Oak desk with finished ends: a top slab over two three-drawer pedestals, kneehole between.
function drawDesk() {
  const x0 = DESK_X0, dw = DESK_X1 - DESK_X0;
  rect(x0 - 1, 119, dw + 2, 27, C.ol);
  rect(x0, 120, dw, 20, C.deskTop);
  for (let i = 0; i < 46; i++) {
    const y = 121 + ((i * 7) % 19), x = x0 + ((i * 53) % dw), len = Math.min(8 + ((i * 13) % 22), x0 + dw - x);
    rect(x, y, len, 1, i % 3 ? C.deskGrain : C.deskTopL);
  }
  rect(x0, 140, dw, 1, C.deskEdgeL);
  rect(x0, 141, dw, 4, C.deskEdge);
  // Kneehole: shadowed back panel between the pedestals.
  rect(PEDESTALS[0][1], 146, PEDESTALS[1][0] - PEDESTALS[0][1], FLOOR_Y - 146, C.deskHole);
  const dh = Math.floor((FLOOR_Y - 152) / 3);
  for (const [p0, p1] of PEDESTALS) {
    rect(p0 - 1, 146, p1 - p0 + 2, FLOOR_Y - 146, C.ol);
    rect(p0, 146, p1 - p0, FLOOR_Y - 150, C.deskFront);
    rect(p0 + 1, FLOOR_Y - 4, p1 - p0 - 2, 4, C.deskFrontD);
    for (let k = 0; k < 3; k++) {
      const x = p0 + 3, y = 148 + k * dh, w = p1 - p0 - 6;
      rect(x, y, w, dh - 2, C.deskFrontD);
      rect(x + 1, y + 1, w - 2, dh - 4, C.deskFrontL);
      rect(x + 1, y + dh - 5, w - 2, 1, C.deskFront);
      rect(x + w / 2 - 5, y + (dh >> 1) - 2, 10, 2, "#b08850");
      rect(x + w / 2 - 5, y + (dh >> 1), 10, 1, C.deskHandleD);
    }
  }
}

function drawSpeaker() {
  const { x, y, w, h } = SPEAKER, cx = x + w / 2;
  rrect(x - 1, y - 1, w + 2, h + 2, 1, C.ol);
  rect(x, y, w, h, "#8a6a4e");
  rect(x, y, w, 1, "#a8876a"); rect(x, y, 1, h, "#a8876a"); rect(x + w - 1, y, 1, h, "#6a4f39");
  rect(x + 2, y + 6, w - 4, h - 8, "#35303a");
  for (let yy = y + 6; yy < y + h - 2; yy++)
    for (let xx = x + 2; xx < x + w - 2; xx++) if ((xx + yy) % 2 === 0 && by(xx, yy) < 0.3) px(xx, yy, "#3e3944");
  rect(x + 3, y + 1, w - 6, 4, C.ol);
  rect(x + 4, y + 2, w - 8, 2, "#121a14");
  ell(cx, y + 11.5, 3, 3, "#1e1a22");
  ell(cx, y + 11.5, 1.6, 1.6, "#5a5560");
  ell(cx, y + 25, 8, 8, "#1e1a22");
  ell(cx, y + 25, 6.5, 6.5, "#2c2830");
  ell(cx, y + 25, 3, 3, "#4a4552");
  px(cx - 2, y + 23, "#6a6572");
}

function drawTower() {
  const T = TT, R = FX + 34;
  poly([[FX - 1, 128], [FX - 1, T - 1], [FX + DX, T - DY - 1], [R + DX + 1, T - DY - 1], [R + DX + 1, 128 - DY], [R, 128]], C.ol);
  rect(FX, T, 34, 128 - T, C.beige);
  rect(FX, T, 34, 1, C.beigeH); rect(FX, T, 1, 128 - T, C.beigeH);
  rect(FX, 126, 34, 2, C.beigeD);
  poly([[R, T], [R + DX, T - DY], [R + DX, 127 - DY], [R, 127]], C.beigeM);
  poly([[FX, T], [FX + DX, T - DY], [R + DX, T - DY], [R, T]], C.beigeH);
  // Side panel: seam + rear vents sell the depth.
  line(R + 7, T - 3, R + 7, 124 - 3, C.beigeD);
  for (let y = T + 8; y < T + 40; y += 3) line(R + 9, y - 5, R + 12, y - 6, C.beigeD);
  rect(FX + 4, T + 5, 26, 8, C.ol); rect(FX + 5, T + 6, 24, 6, C.beigeM); rect(FX + 5, T + 6, 24, 1, C.beigeD); rect(FX + 6, T + 9, 22, 1, C.beigeDD);
  rect(FX + 4, T + 16, 26, 7, C.ol); rect(FX + 5, T + 17, 24, 5, C.beige); rect(FX + 8, T + 19, 16, 1, C.ol); rect(FX + 25, T + 20, 3, 1, C.beigeD);
  rect(FX + 6, T + 27, 9, 3, C.beigeD);
  rrect(FX + 22, T + 26, 7, 6, 1, C.ol); rrect(FX + 23, T + 27, 5, 4, 1, C.beigeM); px(FX + 23, T + 27, C.beigeH);
  rect(FX + 4, T + 35, 24, 5, "#3a3230");
  for (const [x, w] of [[6, 4], [11, 7], [19, 6]]) rect(FX + x, T + 37, w, 1, "#c9b48a");
  for (let y = T + 46; y <= 121; y += 2) rect(FX + 6, y, 22, 1, C.beigeD);
}

// Vintage rangefinder: chrome top plate, black leatherette body, big lens.
function drawCamera() {
  const { x, y, w, h } = CAMERA, CHROME = "#c9c6c0", CHROME_L = "#ecebe6", CHROME_D = "#8f8b85";
  rect(x + 1, y - 4, 7, 4, C.ol); rect(x + 2, y - 3, 5, 3, CHROME); rect(x + 2, y - 3, 5, 1, CHROME_L);
  rect(x + w - 6, y - 3, 4, 3, C.ol); rect(x + w - 5, y - 2, 2, 2, CHROME_D);
  rrect(x - 1, y - 1, w + 2, h + 2, 1, C.ol);
  rect(x, y, w, 3, CHROME);
  rect(x, y, w, 1, CHROME_L);
  rect(x, y + 3, w, h - 3, "#2a2629");
  for (let yy = y + 4; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) if (by(xx, yy) < 0.2) px(xx, yy, "#3a343b");
  rect(x + 2, y + 1, 3, 1, "#5a7a9a");
  px(x + w - 3, y + 1, "#d04a3a");
  const lx = x + w / 2 + 1, ly = y + h / 2 + 1;
  ell(lx, ly, 4.6, 4.6, C.ol);
  ell(lx, ly, 3.8, 3.8, "#8a8690");
  ell(lx, ly, 2.8, 2.8, "#3a363d");
  ell(lx, ly, 1.8, 1.8, "#2a3d5c");
  px(Math.floor(lx) - 1, Math.floor(ly) - 1, "#9cc3e8");
}

// A short stack of books lying on the tower, spines facing the room. Each book
// recedes up-right like the tower (BOOK_DX/DY): cover on top, page block on the side.
const BOOK_DX = 8, BOOK_DY = 4;
function drawTowerBooks() {
  for (const b of BOOKS) {
    if (!b.flat) continue;
    const { x, y, w, h } = b, R = x + w;
    const band = b.i % 2 ? "#e8c872" : shade(b.color, 1.35);
    poly([[x - 1, y + h], [x - 1, y - 1], [x + BOOK_DX - 1, y - BOOK_DY - 1], [R + BOOK_DX + 1, y - BOOK_DY - 1], [R + BOOK_DX + 1, y + h - BOOK_DY], [R, y + h]], C.ol);
    poly([[x, y], [x + BOOK_DX, y - BOOK_DY], [R + BOOK_DX, y - BOOK_DY], [R, y]], shade(b.color, 1.12));
    poly([[R, y], [R + BOOK_DX, y - BOOK_DY], [R + BOOK_DX, y + h - 1 - BOOK_DY], [R, y + h - 1]], "#efe6d2");
    for (let k = 1; k < h - 1; k += 2) line(R + 1, y + k, R + BOOK_DX - 1, y + k - BOOK_DY + 1, "#cfc3ab");
    line(x, y, x + BOOK_DX, y - BOOK_DY, C.ol);
    line(R, y, R + BOOK_DX, y - BOOK_DY, shade(b.color, 0.7));
    rect(x, y, w, h, C.ol);
    rect(x + 1, y + 1, w - 2, h - 2, b.color);
    rect(x + 1, y + 1, w - 2, 1, shade(b.color, 1.18));
    rect(x + 1, y + h - 2, w - 2, 1, shade(b.color, 0.8));
    rect(x + 3, y + 1, 1, h - 2, band);
    rect(R - 4, y + 1, 1, h - 2, band);
  }
}

function drawMonitor() {
  const S = SCREEN;
  rrect(127, 46, 66, 8, 2, C.ol);
  rrect(128, 47, 64, 7, 2, C.beigeM);
  rect(130, 47, 60, 1, C.beige);
  rrect(119, 51, 82, 68, 3, C.ol);
  rrect(120, 52, 80, 66, 2, C.beige);
  rect(122, 52, 76, 1, C.beigeH); rect(120, 54, 1, 62, C.beigeH);
  rect(198, 54, 2, 62, C.beigeM); rect(122, 116, 76, 2, C.beigeD);
  // Recessed bezel: shadowed top/left, lit bottom/right.
  rrect(S.x - 5, S.y - 4, S.w + 10, S.h + 9, 2, C.beigeDD);
  rect(S.x - 3, S.y + S.h + 4, S.w + 6, 1, C.beigeH); rect(S.x + S.w + 4, S.y - 2, 1, S.h + 5, C.beigeH);
  rrect(S.x - 1, S.y - 1, S.w + 2, S.h + 2, 3, C.ol);
  rrect(S.x, S.y, S.w, S.h, 3, C.scr0);
  rrect(S.x + 1, S.y + 1, S.w - 2, S.h - 2, 3, C.scr1);
  // Chin: badge, button, power LED.
  rect(130, 108, 16, 4, C.beigeD);
  for (const x of [132, 136, 140]) rect(x, 110, 2, 1, C.beigeH);
  rrect(176, 108, 6, 4, 1, C.beigeD);
  rect(186, 109, 2, 1, "#6dff8a");
  rect(148, 118, 24, 4, C.beigeM); rect(148, 118, 24, 1, C.beigeDD);
  rrect(137, 121, 46, 6, 1, C.ol);
  rrect(138, 122, 44, 4, 1, C.beige);
  rect(139, 122, 42, 1, C.beigeH); rect(138, 125, 44, 1, C.beigeD);
}

function drawKeyboard() {
  rrect(117, 128, 88, 11, 1, C.ol);
  rrect(118, 129, 86, 9, 1, C.beigeM);
  rect(119, 129, 84, 1, C.beigeH);
  rect(118, 136, 86, 2, C.beigeD);
  for (let r = 0; r < 2; r++) for (let x = 120 + r * 2; x + 3 <= 202; x += 4) rect(x, 130 + r * 2, 3, 1, C.beigeH);
  for (let x = 120; x <= 134; x += 4) rect(x, 134, 3, 1, C.beigeH);
  rect(140, 134, 40, 1, C.beigeH);
  for (let x = 184; x + 3 <= 202; x += 4) rect(x, 134, 3, 1, C.beigeH);
}

// Mouse cord runs back along the desk, behind the lamp base, into the tower.
function drawMouseCable() {
  const pts = [[218, 130], [218, 127], [221, 125], [232, 125], [248, 125], [258, 124], [264, 124]];
  for (let i = 1; i < pts.length; i++) line(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], C.arm);
}

function drawMouse() {
  rrect(206, 128, 26, 13, 1, C.ol);
  rrect(207, 129, 24, 11, 1, "#2f2a3d");
  rect(208, 129, 22, 1, "#3d3650");
  rrect(213, 130, 11, 9, 3, C.ol);
  rrect(214, 131, 9, 7, 2, C.beige);
  rect(216, 131, 5, 1, C.beigeH);
  rect(218, 131, 1, 3, C.beigeD);
  rect(215, 134, 7, 1, C.beigeM);
  rect(215, 137, 7, 1, C.beigeD);
}

function drawMug() {
  const x = MUGX, y = MUGY;
  rect(x + 11, y + 3, 4, 7, C.ol); rect(x + 12, y + 4, 2, 5, "#9a4a30"); rect(x + 12, y + 5, 1, 3, C.deskTop);
  rrect(x, y, 12, 14, 1, C.ol);
  rect(x + 1, y + 1, 10, 12, "#c0623f");
  rect(x + 1, y + 1, 1, 12, "#d98060");
  rect(x + 8, y + 1, 3, 12, "#9a4a30");
  rect(x + 1, y + 1, 10, 1, "#e8d9c6");
  rect(x + 2, y + 2, 8, 1, "#3b2318");
}

function drawLamp() {
  rrect(231, 126, 22, 7, 2, C.ol);
  rrect(232, 127, 20, 5, 2, C.arm);
  rect(234, 127, 16, 1, C.armL);
  line(241, 126, 248, 99, C.ol, 3);
  line(242, 126, 249, 99, C.arm, 2);
  line(249, 99, 234, 73, C.ol, 3);
  line(249, 100, 234, 74, C.arm, 2);
  rect(247, 97, 4, 4, C.ol); rect(248, 98, 2, 2, C.armL);
  // Glowing amber shade: brightest toward the open bottom where the bulb sits.
  poly(LAMP_HEAD, C.ol);
  poly([[226, 65], [237, 73], [229, 88], [213, 80]], "#ffc45c");
  poly([[224, 70], [234, 76], [228, 86], [216, 80]], "#ffd98a");
  line(226, 65, 237, 73, "#e8a040");
  line(229, 87, 237, 74, "#d98a30");
  line(214, 80, 228, 87, "#fff1c4");
  line(215, 79, 227, 85, "#fffbe8");
}

function drawStatic() {
  use(winBack); g.clearRect(0, 0, W, H); drawWindowBack();
  use(winFront); g.clearRect(0, 0, W, H); drawWindowFront();
  use(bg);
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.clearRect(0, 0, bg.width, bg.height);
  g.setTransform(1, 0, 0, 1, padX, padTop);
  drawWall();
  drawRoof();
  g.drawImage(winBack, 0, 0);
  g.drawImage(winFront, 0, 0);
  drawShelf();
  FRAMES.forEach((_, i) => drawFrame(i));
  drawDesk();
  drawFloor();
  shadow(160, 127, 30, 2); shadow(161, 139, 46, 1.6); shadow(MUGX + 6, MUGY + 14, 9, 1.6);
  shadow(242, 133, 13, 1.6); shadow(280, 128, 28, 2.4); shadow(CATX + 32, 130, 24, 2.2);
  shadow(SPEAKER.x + SPEAKER.w / 2, 128, 14, 1.6);
  shadow(CAMERA.x + CAMERA.w / 2, CAMERA.y + CAMERA.h + 1, 10, 1.4);
  drawMouseCable();
  drawSpeaker(); drawCamera(); drawTower(); drawTowerBooks(); drawMonitor(); drawKeyboard(); drawMouse(); drawMug(); drawLamp();
  g.setTransform(1, 0, 0, 1, 0, 0);
}

// ---------- cat sprite: seal-point snowshoe (procedural so breathing swells the back) ----------
const CW = 58, CH = 33, GND = 30;
const CC = {
  w: "#f4efe6", s: "#d9cfc1", S: "#b3a593", cr: "#d2b896", crD: "#b39673",
  b1: "#4f3527", b2: "#6c4b36", b3: "#8c6a4c", b4: "#a98a69",
  m: "#2b1e18", mL: "#45322a", eye: "#7cc4ef", eyeD: "#3f86c9", o: "#1c130f", wh: "#efe8dc",
};
const inTri = (x, y, t) => inPoly(x + 0.5, y + 0.5, t);
const catCache = new Map();
function catSprite(breath, twitch, ear, eyes) {
  const key = breath + "|" + twitch + "|" + ear + "|" + eyes;
  if (catCache.has(key)) return catCache.get(key);
  const part = new Uint8Array(CW * CH), col = new Array(CW * CH).fill(null);
  const set = (x, y, p, c) => { if (x >= 0 && y >= 0 && x < CW && y < CH) { part[y * CW + x] = p; col[y * CW + x] = c; } };
  const at = (x, y) => (x >= 0 && y >= 0 && x < CW && y < CH ? part[y * CW + x] : 0);
  // Body: bottom pinned to the desk, only the back rises.
  const ry = 10 + breath * 0.25, bcy = GND + 1 - ry;
  for (let y = 0; y <= GND; y++) for (let x = 0; x < CW; x++) {
    if (!inEll(x, y, 28, bcy, 18.5, ry)) continue;
    // Darker along the spine, lighter fawn toward the shoulder, white underneath.
    const t = (y + 0.5 - (bcy - ry)) / (2 * ry) + (by(x, y) - 0.5) * 0.1 + Math.max(0, x - 34) * 0.012;
    let c = t < 0.3 ? CC.b1 : t < 0.58 ? CC.b2 : t < 0.68 ? CC.b3 : CC.w;
    if (c === CC.w && y >= GND - 1) c = CC.s;
    set(x, y, 1, c);
  }
  // Rim light along the back from the window side.
  for (let x = 0; x < 30; x++) for (let y = 1; y <= GND; y++)
    if (at(x, y) === 1 && !at(x, y - 1)) { col[y * CW + x] = CC.b3; break; }
  // Black tail wrapped along the front.
  const P0 = [11, 21], P1 = [5, 33], P2 = [38, 28.5 - twitch];
  for (let i = 0; i <= 50; i++) {
    const t = i / 50, u = 1 - t;
    const tx = u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0];
    const ty = u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1];
    const r = 2.5 - t * 0.6;
    for (let y = Math.floor(ty - r); y <= Math.min(GND, ty + r); y++)
      for (let x = Math.floor(tx - r); x <= tx + r; x++)
        if (inEll(x, y, tx, ty, r, r)) set(x, y, 2, y + 0.5 < ty - 0.4 ? CC.mL : CC.m);
  }
  // White chest bib, then head: fawn base, dark mask, white muzzle + chin, dark ears.
  for (let y = 0; y <= GND; y++) for (let x = 0; x < CW; x++) if (inEll(x, y, 45, 25, 7.5, 5.5)) set(x, y, 3, y >= GND ? CC.s : CC.w);
  for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
    if (inEll(x, y, 46, 16.5, 8.6, 7.6)) {
      let c = y + 0.5 < 12 ? CC.crD : CC.cr;
      if (inEll(x, y, 46, 13, 1.6, 2.6)) c = CC.mL;
      if (inEll(x, y, 46, 17.4, 5.4, 4.2)) c = inEll(x, y, 46, 17.4, 4.4, 3.4) ? CC.m : CC.mL;
      if (inEll(x, y, 46, 21.4, 3.6, 2.2) || y >= 22) c = CC.w;
      set(x, y, 3, c);
    }
    if (inTri(x, y, [[38.5, 12], [39.5, 3.5], [44.5, 9.5]]) || inTri(x, y, [[47.5, 9.5], [52.5 - ear, 3.5 + ear], [53.5, 12]])) set(x, y, 3, CC.m);
  }
  // Folded white paws.
  for (let y = 0; y <= GND; y++) for (let x = 0; x < CW; x++)
    if (inEll(x, y, 41, 30, 3.6, 1.7) || inEll(x, y, 48.5, 30, 3.6, 1.7)) set(x, y, 4, y >= GND ? CC.s : CC.w);
  // Separate overlapping parts with shade instead of a hard line.
  for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
    const p = at(x, y);
    if (p === 3 && at(x - 1, y) === 1) col[y * CW + x] = col[y * CW + x] === CC.w ? CC.S : CC.crD;
    if (p === 4 && at(x, y - 1) === 3) col[y * CW + x] = CC.s;
  }
  set(41, 7, 3, CC.crD); set(51, 7, 3, CC.crD);
  // Eyes: closed lids, or a sleepy half-open peek of blue.
  for (const ex of [43, 49]) {
    if (eyes) {
      set(ex - 1, 16, 3, CC.o); set(ex, 16, 3, CC.o); set(ex + 1, 16, 3, CC.o);
      set(ex - 1, 17, 3, CC.eye); set(ex, 17, 3, CC.eyeD); set(ex + 1, 17, 3, CC.eye);
    } else {
      // Closed lids read as a soft lighter crease on the dark mask.
      set(ex - 1, 17, 3, CC.b3); set(ex, 18, 3, CC.b3); set(ex + 1, 17, 3, CC.b3);
    }
  }
  set(45, 19, 3, CC.o); set(46, 19, 3, CC.o);
  set(44, 21, 3, CC.S); set(47, 21, 3, CC.S);
  // 1px outer outline, then whiskers outside it.
  const out = col.slice();
  for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++)
    if (!at(x, y) && (at(x - 1, y) || at(x + 1, y) || at(x, y - 1) || at(x, y + 1))) out[y * CW + x] = CC.o;
  for (const [x, y] of [[35, 21], [34, 21], [35, 23], [56, 21], [57, 21], [56, 23]]) out[y * CW + x] = CC.wh;
  const sc = document.createElement("canvas");
  sc.width = CW; sc.height = CH;
  const sg = sc.getContext("2d");
  for (let i = 0; i < out.length; i++) if (out[i]) { sg.fillStyle = out[i]; sg.fillRect(i % CW, (i / CW) | 0, 1, 1); }
  catCache.set(key, sc);
  return sc;
}

// ---------- sunset clouds ----------
function cloudSprite(w, h) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const cg = c.getContext("2d");
  const blobs = [[w * 0.25, h * 0.65, w * 0.25, h * 0.4], [w * 0.5, h * 0.45, w * 0.28, h * 0.55], [w * 0.75, h * 0.65, w * 0.25, h * 0.38]];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (!blobs.some(([cx, cy, rx, ry]) => inEll(x, y, cx, cy, rx, ry))) continue;
    const t = y / h + (by(x, y) - 0.5) * 0.2;
    cg.fillStyle = t < 0.4 ? "#b06a86" : t < 0.75 ? "#e08a86" : "#ffbe8f";
    cg.fillRect(x, y, 1, 1);
  }
  return c;
}
const CLOUDS = [
  { w: 22, h: 6, y: WIN.y + 5, speed: 1.1, off: 0 },
  { w: 16, h: 5, y: WIN.y + 14, speed: 0.7, off: 40 },
  { w: 26, h: 7, y: WIN.y + 33, speed: 0.5, off: 15 },
].map((c) => ({ ...c, sprite: cloudSprite(c.w, c.h) }));

// ---------- lighting ----------
// Dusk: a dark warm ambient, with the desk lamp and the sunset adding strong
// saturated light. Each pixel's colour is multiplied by the light reaching it
// (ambient + lights), so materials keep their contrast while lit areas glow.

/** Lamp shade outline; the shade itself is a light source. */
const LAMP_HEAD = [[225, 63], [239, 73], [230, 90], [211, 81]];
/** Light reaching an unlit surface, per channel. */
const AMBIENT = [0.5, 0.42, 0.34];
/** Light colours (per channel) and how strongly each can add. */
const LAMP_LIGHT = [1, 0.62, 0.24], LAMP_GAIN = 1.3;
const SUN_LIGHT = [1, 0.45, 0.4], SUN_GAIN = 1.1;
const CRT_LIGHT = [0.25, 0.8, 0.45], CRT_GAIN = 0.3;
const PIC_LIGHT = [1, 0.86, 0.62], PIC_GAIN = 0.55;

/** Picture lights: a soft cone washing down over each frame. */
function picI(x, y) {
  let p = 0;
  for (let i = 0; i < FRAMES.length; i++) {
    const L = picLight(i), cx = L.x + L.w / 2, dy = y - (L.y + 2);
    if (dy < 0 || dy > 48) continue;
    const half = 9 + dy * 0.45, ax = Math.abs(x + 0.5 - cx);
    if (ax < half) p += Math.pow(1 - ax / half, 0.7) * (1 - dy / 48);
  }
  return Math.min(1, p);
}
const isPicBulb = (x, y) => FRAMES.some((_, i) => { const L = picLight(i); return y === L.y + 2 && x > L.x && x < L.x + L.w - 1; });

/** Desk lamp: pool on the desk, beam through the air, bulb, and a wide soft glow around the shade. */
function lampI(x, y) {
  const S = [221, 84], E = [182, 130], ex = E[0] - S[0], ey = E[1] - S[1], len2 = ex * ex + ey * ey;
  let l = 0;
  if (y >= 120) { const a = (x - 178) / 74, b = (y - 133) / 13; l += Math.max(0, 1 - (a * a + b * b)) * 0.8; }
  else {
    const t = Math.max(0, Math.min(1, ((x - S[0]) * ex + (y - S[1]) * ey) / len2));
    const d = Math.hypot(x - (S[0] + ex * t), y - (S[1] + ey * t)), w = 3 + t * 34;
    if (t > 0) l += Math.max(0, 1 - d / w) * (1 - t * 0.3) * 0.4;
  }
  l += Math.pow(Math.max(0, 1 - Math.hypot(x - 221, y - 84) / 26), 1.5);
  l += Math.pow(Math.max(0, 1 - Math.hypot(x - 226, (y - 80) * 1.1) / 160), 1.8) * 0.8;
  return Math.min(1.2, l);
}

/** Sunset: pink-orange spill around the window, plus the window's shape cast onto the desk. */
function sunI(x, y) {
  const dx = Math.max(WIN.x - x, 0, x - (WIN.x + WIN.w - 1)), dy = Math.max(WIN.y - y, 0, y - (WIN.y + WIN.h - 1));
  let s = Math.pow(Math.max(0, 1 - Math.hypot(dx, dy) / 55), 1.5) * 0.7;
  if (y >= 121 && y < 140) {
    // Beams travel toward the viewer, away from the sun (right of centre), so the patch leans left.
    const gx = x + (y - 121) * 0.25;
    if (gx >= WIN.x && gx < WIN.x + WIN.w && !(gx >= WIN.x + 35 && gx < WIN.x + 40)) s += 0.6 * (1 - (y - 121) / 24);
  }
  return Math.min(1, s);
}

/** Light multiplier for one channel at a room point (used for the HTML cover overlays). */
const lightAt = (x, y, k) =>
  AMBIENT[k] + LAMP_LIGHT[k] * lampI(x, y) * LAMP_GAIN + SUN_LIGHT[k] * sunI(x, y) * SUN_GAIN + PIC_LIGHT[k] * picI(x, y) * PIC_GAIN;

/**
 * The light reaching each pixel is baked into lightCv once per layout and
 * applied with canvas blend modes (multiply, then add to double it), so
 * rendering never reads pixels back. Some mobile ad blockers' anti-fingerprinting
 * blanks canvas readback, which would otherwise wipe the room.
 * Light is stored at 1/LIGHT_SCALE so values above 1 (brightening) fit in 0..255.
 */
const LIGHT_SCALE = 2;
const lightCv = document.createElement("canvas"), copyCv = document.createElement("canvas");
/** Lamp light per canvas pixel; the lamp beam's dust motes only show where it's bright. */
let IL;
function buildLight() {
  const cw = bg.width, ch = bg.height;
  lightCv.width = copyCv.width = cw;
  lightCv.height = copyCv.height = ch;
  const lg = lightCv.getContext("2d"), img = lg.createImageData(cw, ch), d = img.data;
  IL = new Float32Array(cw * ch);
  const sc = [SCREEN.x + SCREEN.w / 2, SCREEN.y + SCREEN.h / 2];
  for (let cy = 0; cy < ch; cy++) for (let cx = 0; cx < cw; cx++) {
    const i = cy * cw + cx, o = i * 4, x = cx - padX, y = cy - padTop;
    d[o + 3] = 255;
    // Light sources keep their own colour.
    if (inGlass(x, y) || inPoly(x + 0.5, y + 0.5, LAMP_HEAD) || isPicBulb(x, y)) {
      d[o] = d[o + 1] = d[o + 2] = 255 / LIGHT_SCALE;
      continue;
    }
    // Dithered 12-step light levels keep falloffs smooth but pixel-y.
    const t = by(cx, cy), q = (v) => Math.floor(Math.min(1.2, v) * 12 + t) / 12;
    IL[i] = lampI(x, y);
    const l = q(IL[i]) * LAMP_GAIN, s = q(sunI(x, y)) * SUN_GAIN, p = q(picI(x, y)) * PIC_GAIN;
    const c = q(Math.max(0, 1 - Math.hypot((x - sc[0]) / 1.25, y - sc[1]) / 72) * 0.9) * CRT_GAIN;
    const vx = (cx - cw / 2) / (cw / 2), vy = (cy - ch / 2) / (ch * 0.61);
    const v = 1 - 0.08 * Math.min(4, Math.floor(Math.max(0, vx * vx + vy * vy - 0.35) * 1.4 * 3 + t));
    for (let k = 0; k < 3; k++)
      d[o + k] = (v * (AMBIENT[k] + LAMP_LIGHT[k] * l + SUN_LIGHT[k] * s + CRT_LIGHT[k] * c + PIC_LIGHT[k] * p) * 255) / LIGHT_SCALE;
  }
  lg.putImageData(img, 0, 0);
}

/** Multiply a canvas by `light` (a canvas or CSS colour, at 1/LIGHT_SCALE) and scale back up, without reading pixels. */
function lightCanvas(target, light) {
  const tg = target.getContext("2d"), w = target.width, h = target.height;
  tg.globalCompositeOperation = "multiply";
  if (typeof light === "string") { tg.fillStyle = light; tg.fillRect(0, 0, w, h); }
  else tg.drawImage(light, 0, 0);
  // LIGHT_SCALE is 2: add the result onto itself once.
  copyCv.getContext("2d").clearRect(0, 0, w, h);
  copyCv.getContext("2d").drawImage(target, 0, 0);
  tg.globalCompositeOperation = "lighter";
  tg.drawImage(copyCv, 0, 0, w, h, 0, 0, w, h);
  tg.globalCompositeOperation = "source-over";
}

// ---------- animated bits ----------
const steam = [];
const motes = Array.from({ length: 16 }, (_, i) => ({
  x: 180 + ((i * 37) % 50), y: 86 + ((i * 23) % 40), vx: ((i % 5) - 2) * 0.6, vy: -0.8 - (i % 3) * 0.4, ph: i * 1.7,
}));

/** Redraws only the glass area; the frame, sill and speaker in front stay as drawn in bg. */
function drawWindowLive(t) {
  const { x, y, w } = WIN;
  g.save();
  g.beginPath();
  g.rect(WIN.x, WIN.y, WIN.w, WIN.h);
  g.clip();
  g.drawImage(winBack, 0, 0);
  for (const c of CLOUDS) g.drawImage(c.sprite, Math.round(x - c.w + ((t * c.speed + c.off) % (w + c.w))), c.y);
  // Sun glitter: broken horizontal dashes that shimmer down the sea.
  for (let yy = HORIZON + 1; yy < BEACH; yy++) {
    const d = yy - HORIZON, hw = Math.max(1, 6 - d * 0.25);
    for (let xx = Math.floor(SUN.x - hw); xx <= SUN.x + hw; xx++) {
      const edge = Math.abs(xx - SUN.x) / hw;
      if (noise(xx * 0.45, yy * 2.1 + t * 1.2) > 0.5 + edge * 0.2) px(xx, yy, d < 6 ? "#ffe08a" : "#f5a35f");
    }
  }
  for (let k = 0; k < 6; k++) {
    const sx = x + ((k * 29 + Math.floor(t * 0.7) * 13) % w), sy = HORIZON + 3 + ((k * 7) % (BEACH - HORIZON - 4));
    if (Math.sin(t * 3 + k * 2) > 0.6) px(sx, sy, "#e9b9b0");
  }
  // Waves wash up and slide back over the wet sand.
  const reach = Math.round((Math.sin(t * 0.7) + 1) * 1.5);
  if (reach) rect(x, BEACH, w, reach, "#4b5280");
  for (let xx = x; xx < x + w; xx++) {
    if (noise(xx * 0.3 + t * 0.3, 3) > 0.35) px(xx, BEACH + reach, "#f4e6dc");
    if (noise(xx * 0.5 - t * 0.2, 9) > 0.6) px(xx, BEACH + reach - 1, "#c9c3d6");
  }
  // A couple of gulls drifting across.
  for (let k = 0; k < 2; k++) {
    const bx = Math.round(x - 10 + ((t * 4 + k * 45) % (w + 20))), byy = y + 16 + k * 5;
    const flap = Math.floor(t * 3 + k) % 2;
    const pts = flap ? [[-2, -1], [-1, 0], [0, 0], [1, 0], [2, -1]] : [[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0]];
    for (const [dx, dy] of pts) px(bx + dx, byy + dy, "#3b2d4a");
  }
  g.drawImage(winFront, 0, 0);
  g.restore();
}

function drawDynamic(t, dt) {
  use(ctx.canvas);
  drawWindowLive(t);
  // CRT: slow rolling refresh band.
  const S = SCREEN, band = S.y + ((t * 14) % (S.h + 14)) - 6;
  for (let y = Math.max(S.y + 2, Math.floor(band)); y < Math.min(S.y + S.h - 2, band + 3); y++) rect(S.x + 2, y, S.w - 4, 1, C.scr2);
  // Tower LEDs.
  rect(FX + 7, TT + 28, 2, 1, "#6dff8a");
  rect(FX + 11, TT + 28, 2, 1, Math.random() < 0.35 ? "#ffb347" : "#5a3a14");
  // Speaker: EQ bars bounce, woofer pulses on the beat.
  const { x: sx, y: sy } = SPEAKER;
  for (let k = 0; k < 5; k++) {
    const hgt = 1 + Math.round(((Math.sin(t * (5 + k * 1.3) + k * 1.7) + 1) / 2) * 1.4);
    rect(sx + 5 + k * 3, sy + 4 - hgt, 2, hgt, hgt > 1 ? "#ffb347" : "#6dff8a");
  }
  if (Math.sin(t * 7.5) > 0.55) {
    for (let a = 0; a < 360; a += 12) {
      const r = (a * Math.PI) / 180;
      px(Math.floor(sx + SPEAKER.w / 2 + Math.cos(r) * 5.5), Math.floor(sy + 25 + Math.sin(r) * 5.5), "#4a4552");
    }
  }
  // Cat: breath swells the back, tail flicks, ear twitches, eyes peek open now and then.
  const breath = Math.round(((1 - Math.cos((2 * Math.PI * t) / 4.2)) / 2) * 6);
  const twitch = t % 7 < 0.35 ? 1 : 0;
  const ear = t % 11 > 10.6 ? 1 : 0;
  const eyes = t % 13 > 11.8 ? 1 : 0;
  g.drawImage(catSprite(breath, twitch, ear, eyes), CATX, CATY);
  // Mug steam.
  if (dt && Math.random() < dt * 5) steam.push({ x: MUGX + 3 + Math.random() * 6, y: MUGY, age: 0, seed: Math.random() * 6 });
  for (let i = steam.length - 1; i >= 0; i--) {
    const p = steam[i];
    p.age += dt; p.y -= dt * 6;
    if (p.age > 3.2) { steam.splice(i, 1); continue; }
    const k = p.age / 3.2, x = Math.round(p.x + Math.sin(t * 1.6 + p.seed) * (1 + k * 2));
    px(x, Math.round(p.y), k < 0.35 ? "#d9cfc8" : k < 0.7 ? "#a99a99" : "#6e5f6c");
  }
  // Dust drifting through the lamp beam.
  for (const m of motes) {
    m.x += m.vx * dt; m.y += m.vy * dt;
    if (m.y < 84) { m.y = 128; m.x = 180 + Math.random() * 50; }
    if (m.x < 176 || m.x > 234) m.vx *= -1;
    const ix = Math.round(m.x), iy = Math.round(m.y);
    if (IL[(iy + padTop) * bg.width + ix + padX] > 0.3 && Math.sin(t * 2 + m.ph) > -0.3) px(ix, iy, "#ffe9b8");
  }
}

function renderFrame(t, dt) {
  if (!ctx) return;
  lastT = t;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.drawImage(bg, 0, 0);
  // Dynamic bits are drawn in room coordinates.
  ctx.setTransform(1, 0, 0, 1, padX, padTop);
  drawDynamic(t, dt);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  lightCanvas(ctx.canvas, lightCv);
}

// ---------- live vinyl covers ----------
/** Covers are drawn at half an art pixel (2× the room grid) so album art keeps more detail. */
const COVER_RES = COVER * 2;
const coverUrls = [];

// Album art → COVER_RES² pixels (step-down resize keeps it clean), lit like the room.
function pixelateCover(img, out, slot) {
  // Covers sit above the canvas, so light them by hand with the light reaching their frame.
  const f = FRAMES[slot];
  const light = [0, 1, 2].map((k) => Math.round(Math.min(255, (lightAt(f.x + 18, f.y + 18, k) * 255) / LIGHT_SCALE)));
  const mid = document.createElement("canvas");
  mid.width = mid.height = 128;
  const s = Math.min(img.naturalWidth, img.naturalHeight);
  mid.getContext("2d").drawImage(img, (img.naturalWidth - s) / 2, (img.naturalHeight - s) / 2, s, s, 0, 0, 128, 128);
  const x = out.getContext("2d");
  x.imageSmoothingQuality = "high";
  x.drawImage(mid, 0, 0, COVER_RES, COVER_RES);
  lightCanvas(out, "rgb(" + light.join(",") + ")");
}

/** Called by spotify-vinyl.js with each slot's cover URL. */
export function setVinylCover(i, url) {
  const out = document.querySelector('.crt-vinyl-slot[data-vinyl-idx="' + i + '"] .crt-vinyl-cover');
  if (!out || !url || coverUrls[i] === url) return;
  coverUrls[i] = url;
  // No pixel readback anywhere, so the cover doesn't need CORS.
  const img = new Image();
  img.onload = () => {
    if (coverUrls[i] !== url) return;
    pixelateCover(img, out, i);
    out.hidden = false;
  };
  img.src = url;
}

// ---------- public API ----------
function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * Spine title box. Shelf spines are rotated to read bottom-to-top and skipped
 * where mostly hidden; books lying flat read left-to-right.
 */
function bookLabelHtml(b) {
  if (!b.title) return "";
  const dark = isLight(b.color) ? " crt-book-label--dark" : "";
  if (b.flat) {
    return (
      '<span class="crt-book-label crt-book-label--flat' + dark + '" style="left:' + (b.x + b.w / 2) + "em;top:" +
      (b.y + b.h / 2) + "em;width:" + (b.w - 9) + "em;height:" + (b.h - 2) + 'em"><span>' + escapeHtml(b.title) + "</span></span>"
    );
  }
  const top = SHELF.y - b.h + 2;
  let bottom = SHELF.y - 2;
  for (const [x0, x1, oy] of SHELF_OCCLUDERS) if (b.x < x1 && b.x + b.w > x0) bottom = Math.min(bottom, oy - 1);
  const len = bottom - top;
  if (len < 12) return "";
  return (
    '<span class="crt-book-label' + dark + '" style="left:' +
    (b.x + b.w / 2) + "em;top:" + (top + bottom) / 2 + "em;width:" + len + "em;height:" + (b.w - 2) + 'em">' +
    "<span>" + escapeHtml(b.title) + "</span></span>"
  );
}

/**
 * Room markup: the pixel canvas plus HTML layers that ride along with it
 * (book titles, vinyl hit areas). Inside .crt-room-scene, 1em = 1 art pixel.
 */
export function crtRoomSceneHtml() {
  const slots = FRAMES.map((f, i) =>
    '<div class="crt-vinyl-slot" data-vinyl-idx="' + i + '" style="left:' + (f.x - 1) + "em;top:" + (f.y - 1) + 'em;width:38em;height:38em">' +
      '<canvas class="crt-vinyl-cover" width="' + COVER_RES + '" height="' + COVER_RES + '" hidden></canvas>' +
    "</div>"
  ).join("");
  return (
    '<div class="crt-room-scene" id="crt-room-scene" style="transform-origin:' + MONITOR.cx / ART + "em " + MONITOR.cy / ART + 'em">' +
      '<canvas class="crt-room-canvas" id="crt-room-canvas" width="' + W + '" height="' + H + '" aria-hidden="true"></canvas>' +
      BOOKS.map(bookLabelHtml).join("") +
      slots +
      // sw() is the Engineering ⇄ Photography toggle (app.js).
      '<button type="button" class="crt-camera-hit" onclick="sw()" data-label="Photography" aria-label="Open the photography portfolio" style="left:' +
        (CAMERA.x - 2) + "em;top:" + (CAMERA.y - 5) + "em;width:" + (CAMERA.w + 4) + "em;height:" + (CAMERA.h + 7) + 'em"></button>' +
    "</div>"
  );
}

/** The desk's outer edges (outline included) are the frame: they span the window edge to edge. */
const DESK_SPAN = DESK_X1 - DESK_X0 + 2;
/**
 * Band that must always be on screen: from the picture lights over the vinyl
 * frames down to the desk's front edge. It's centred (ANCHOR_Y) mid-way down
 * the space below the fixed nav bar; extra height shows roof above and
 * drawers/rug below.
 */
const BAND_TOP = FRAMES[0].y - 6, BAND_BOTTOM = 150;
const BAND_H = BAND_BOTTOM - BAND_TOP;
const ANCHOR_Y = (BAND_TOP + BAND_BOTTOM) / 2;
/** Smallest scale: keeps the monitor's boot text legible. */
const MIN_ART_PX = 3;
/**
 * How far down the page the 100vh stage starts (the nav sits above it), in screen px.
 * At rest only the top innerHeight - stageTop of the stage is on screen.
 */
let stageTop = 0;

/**
 * Size the canvas to cover the stage at the current scale. The room's anchor
 * sits mid-way down the on-screen part of the stage; extra space is filled
 * with more roof, wall, desk and floor.
 */
function layoutCanvas() {
  if (!ctx || !artPx) return;
  const canvas = ctx.canvas, anchorStageY = (window.innerHeight - stageTop) / 2;
  const nx = Math.max(0, Math.ceil((window.innerWidth / artPx - W) / 2));
  const nt = Math.max(0, Math.ceil(anchorStageY / artPx - ANCHOR_Y));
  const nb = Math.max(0, Math.ceil((window.innerHeight - anchorStageY) / artPx - (H - ANCHOR_Y)));
  if (nx === padX && nt === padTop && nb === padBottom) return;
  padX = nx; padTop = nt; padBottom = nb;
  bg.width = canvas.width = W + 2 * padX;
  bg.height = canvas.height = H + padTop + padBottom;
  Object.assign(canvas.style, { left: -padX + "em", top: -padTop + "em", width: canvas.width + "em", height: canvas.height + "em" });
  buildLight();
  drawStatic();
  renderFrame(lastT, 0);
}

/**
 * Push scene geometry into CSS custom properties. .crt-zoom-screen and the
 * scene both read --crt-slice-scale, so the HTML screen stays on the drawn monitor.
 * @param {HTMLElement} root — typically `#eng-stack-experience`
 */
export function applyCrtRoomLayoutVars(root) {
  if (!root) return;
  // Zoom so the desk spans the window exactly (fractional scale), unless that would
  // push the frames or desk items off screen on a wide, short window; then zoom out
  // just enough to fit them. Never so far out that the monitor's boot text gets
  // unreadable (portrait phones crop the desk ends).
  stageTop = Math.max(0, root.getBoundingClientRect().top + window.scrollY);
  artPx = Math.max(MIN_ART_PX, Math.min(window.innerWidth / DESK_SPAN, (window.innerHeight - stageTop) / BAND_H));
  layoutCanvas();
  root.style.setProperty("--crt-vb-w", String(VIEW.w));
  root.style.setProperty("--crt-vb-h", String(VIEW.h));
  root.style.setProperty("--crt-vb-cx", String(VIEW.w / 2));
  // Room point that sits at the stage's 50vh: the anchor, nudged so it lands mid-way down the on-screen part.
  root.style.setProperty("--crt-vb-cy", String(ANCHOR_Y * ART + (ART / 2) * stageTop / artPx));
  root.style.setProperty("--crt-monitor-cx", String(MONITOR.cx));
  root.style.setProperty("--crt-monitor-cy", String(MONITOR.cy));
  root.style.setProperty("--crt-screen-w", String(MONITOR.screenW));
  root.style.setProperty("--crt-screen-h", String(MONITOR.screenH));
  root.style.setProperty("--crt-art-px", artPx + "px");
  root.style.setProperty("--crt-slice-scale", artPx / ART + "px");
}

/** Largest spine-title size (in art px) before titles start shrinking to fit. */
const LABEL_MAX_EM = 2.3, LABEL_MIN_EM = 0.8;

/** Shrink each spine title (binary search) until the whole title fits its spine. */
function fitBookLabels() {
  document.querySelectorAll(".crt-book-label > span").forEach((span) => {
    const box = span.parentElement;
    const fits = () => span.scrollWidth <= box.clientWidth + 0.5 && span.scrollHeight <= box.clientHeight + 0.5;
    span.style.fontSize = LABEL_MAX_EM + "em";
    if (fits()) return;
    let lo = LABEL_MIN_EM, hi = LABEL_MAX_EM;
    for (let k = 0; k < 8; k++) {
      const mid = (lo + hi) / 2;
      span.style.fontSize = mid + "em";
      if (fits()) lo = mid; else hi = mid;
    }
    span.style.fontSize = lo + "em";
  });
}

/** Start drawing the room. Animation pauses while the room is hidden after fly-in. */
export function initCrtRoom() {
  const canvas = document.getElementById("crt-room-canvas");
  if (!canvas || ctx) return;
  ctx = canvas.getContext("2d");
  padX = -1; // force the first layout
  layoutCanvas();
  // Fit after the pixel font loads; refit on resize since pixel rounding changes with scale.
  document.fonts.ready.then(fitBookLabels);
  window.addEventListener("resize", fitBookLabels, { passive: true });
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const experience = document.getElementById("eng-stack-experience");
  let last = 0, acc = 0;
  function frame(now) {
    const t = now / 1000, dt = Math.min(0.1, t - last);
    last = t; acc += dt;
    if (acc >= 1 / FPS && experience?.getAttribute("data-room") !== "off") {
      acc = 0;
      renderFrame(t, 1 / FPS);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
