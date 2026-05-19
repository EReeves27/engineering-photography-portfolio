/**
 * =============================================================================
 *  CRT ROOM SCENE — vector illustration of a cozy retro setup
 * =============================================================================
 *  Returns a single inline <svg> string. The interactive screen lives inside a
 *  <foreignObject> at the monitor position (viewBox coords 800..1120 × 420..660)
 *  so it scales naturally with the room when the camera flies in.
 *
 *  Coordinate system: 1920 × 1080 viewBox. The monitor screen center sits at
 *  viewBox (960, 540) so xMidYMid-slice rendering keeps it in the viewport
 *  center regardless of viewport aspect ratio.
 * =============================================================================
 */

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
      speaker() +
      lampGlow() +
      tower() +
      monitorFrame() +
      // Decorative dark green screen inside the monitor — the HTML overlay
      // will sit precisely on top of this rectangle at zoom=0 and grow from it.
      '<rect class="crt-monitor-screen-bg" x="800" y="420" width="320" height="240" fill="#0a1a08"/>' +
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
      // Cat orange
      '<linearGradient id="rg-cat" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#d97a35"/>' +
        '<stop offset="100%" stop-color="#8a4519"/>' +
      '</linearGradient>' +
      // Reflection on desk (warm pool from lamp)
      '<radialGradient id="rg-desk-glow" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#ffb35a" stop-opacity=".35"/>' +
        '<stop offset="100%" stop-color="#ffb35a" stop-opacity="0"/>' +
      '</radialGradient>' +
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
      // Baseboard between wall and desk
      '<rect x="0" y="772" width="1920" height="12" fill="#15100a"/>' +
    '</g>'
  );
}

/* ── Window with beach/sunset view ────────────────────────── */
function window() {
  // Window frame at x=120..560, y=120..620
  return (
    '<g class="crt-room-decor crt-window">' +
      // Outer dark frame
      '<rect x="106" y="106" width="468" height="528" fill="#0c0805" rx="4"/>' +
      // Inner sash frame
      '<rect x="120" y="120" width="440" height="500" fill="#0e0a06" rx="2"/>' +
      // Sky
      '<rect x="130" y="130" width="420" height="320" fill="url(#rg-sunset)"/>' +
      // Sun glow + disk (low on horizon)
      '<circle class="crt-sun-glow" cx="340" cy="430" r="120" fill="url(#rg-sun)" opacity=".75"/>' +
      '<ellipse cx="340" cy="430" rx="60" ry="38" fill="#fff8dc" opacity=".95"/>' +
      // Distant cloud silhouettes (animated drift via CSS)
      '<g class="crt-clouds" opacity=".55">' +
        '<ellipse class="crt-cloud crt-cloud--a" cx="200" cy="220" rx="60" ry="9" fill="#4a2238"/>' +
        '<ellipse class="crt-cloud crt-cloud--b" cx="420" cy="180" rx="80" ry="11" fill="#3a1830"/>' +
        '<ellipse class="crt-cloud crt-cloud--c" cx="320" cy="260" rx="50" ry="7" fill="#5a2840"/>' +
      '</g>' +
      // Sun reflection rays
      '<g stroke="#fff8dc" stroke-width=".6" opacity=".4">' +
        '<line x1="340" y1="430" x2="180" y2="430"/>' +
        '<line x1="340" y1="430" x2="500" y2="430"/>' +
      '</g>' +
      // Ocean
      '<rect x="130" y="450" width="420" height="120" fill="url(#rg-ocean)"/>' +
      // Sun reflection on ocean (vertical streak)
      '<g opacity=".7">' +
        '<rect x="328" y="450" width="24" height="120" fill="#ffb35a" opacity=".3"/>' +
        '<rect x="332" y="460" width="16" height="100" fill="#fff8dc" opacity=".25"/>' +
        // Sparkle dashes
        '<g class="crt-sparkle">' +
          '<rect x="318" y="478" width="44" height="2" fill="#fff8dc" opacity=".6"/>' +
          '<rect x="324" y="498" width="32" height="2" fill="#fff8dc" opacity=".5"/>' +
          '<rect x="320" y="518" width="40" height="2" fill="#fff8dc" opacity=".55"/>' +
          '<rect x="328" y="540" width="24" height="2" fill="#fff8dc" opacity=".4"/>' +
        '</g>' +
      '</g>' +
      // Beach sand strip at the bottom
      '<rect x="130" y="570" width="420" height="50" fill="#5a3a20"/>' +
      // Window cross (mullion: one vertical + one horizontal)
      '<rect x="338" y="120" width="6" height="500" fill="#1a120c"/>' +
      '<rect x="120" y="368" width="440" height="6" fill="#1a120c"/>' +
      // Windowsill
      '<rect x="100" y="620" width="480" height="14" fill="#3a2418"/>' +
      '<rect x="100" y="630" width="480" height="6" fill="#1a100a"/>' +
    '</g>'
  );
}

/* ── Wall decor: poster grid + shelf with cassettes ───────── */
function wallDecor() {
  // Posters on the right side of the wall (right of monitor's wall area)
  const posters = [
    // Row 1
    { x: 700, y: 110, w: 130, h: 180, bg: '#9c3a4a', label: 'NMOS' },
    { x: 850, y: 100, w: 150, h: 200, bg: '#2a4a8a', label: 'RISC-V' },
    { x: 1020, y: 120, w: 140, h: 180, bg: '#c8783a', label: 'K-MAP' },
    { x: 1180, y: 90, w: 150, h: 210, bg: '#3a8a4a', label: 'SKY130' },
    { x: 1350, y: 110, w: 130, h: 180, bg: '#6a4a8a', label: 'VERILOG' },
    { x: 1500, y: 100, w: 150, h: 200, bg: '#c83a6a', label: 'CMOS' },
    { x: 1670, y: 120, w: 140, h: 180, bg: '#5a8a8a', label: 'PIPELINE' },
    // Row 2 (offset slightly)
    { x: 720, y: 320, w: 140, h: 170, bg: '#3a2a5a', label: 'SYNTH 84' },
    { x: 880, y: 330, w: 130, h: 160, bg: '#aa5a2a', label: 'ARCADE' },
    { x: 1030, y: 320, w: 150, h: 170, bg: '#2a6a6a', label: 'GRID' },
    { x: 1200, y: 330, w: 140, h: 160, bg: '#8a3a3a', label: 'NEON' },
    { x: 1360, y: 320, w: 140, h: 170, bg: '#5a3a8a', label: 'COSMOS' },
    { x: 1520, y: 330, w: 150, h: 160, bg: '#3a8a6a', label: 'WAVE' },
    { x: 1690, y: 320, w: 130, h: 170, bg: '#aa6a3a', label: 'GEO' },
  ];

  let postersSvg = '';
  posters.forEach((p, i) => {
    postersSvg += (
      '<g class="crt-poster" transform="translate(' + p.x + ',' + p.y + ')">' +
        // Drop shadow
        '<rect x="2" y="3" width="' + p.w + '" height="' + p.h + '" fill="#000" opacity=".4" rx="2"/>' +
        // Poster body
        '<rect x="0" y="0" width="' + p.w + '" height="' + p.h + '" fill="' + p.bg + '" rx="2"/>' +
        // Inner border
        '<rect x="6" y="6" width="' + (p.w - 12) + '" height="' + (p.h - 12) + '" fill="none" stroke="#000" stroke-width=".8" opacity=".35"/>' +
        // Poster artwork (simple decorative shapes — alternating styles for variety)
        posterArt(p, i) +
        // Label
        '<rect x="6" y="' + (p.h - 28) + '" width="' + (p.w - 12) + '" height="22" fill="#000" opacity=".55"/>' +
        '<text x="' + (p.w / 2) + '" y="' + (p.h - 13) + '" text-anchor="middle" font-family="DM Mono, monospace" font-size="11" fill="#fff" letter-spacing="2">' + p.label + '</text>' +
      '</g>'
    );
  });

  return (
    '<g class="crt-room-decor">' +
      postersSvg +
      // Shelf well below the lower poster row (posters end at y≈490; the
      // shelf sits at y=560 so the cassettes don't overlap the posters).
      '<rect x="700" y="560" width="1120" height="14" fill="#3a2418"/>' +
      '<rect x="700" y="572" width="1120" height="4" fill="#1a100a"/>' +
      // Shelf bracket shadows
      '<rect x="700" y="558" width="1120" height="3" fill="#5a3a20"/>' +
      // Cassettes sit on the shelf (bottom of each cassette stack = shelf top y=560)
      cassettes(720,  560) +
      cassettes(950,  560) +
      cassettes(1180, 560) +
      cassettes(1410, 560) +
      cassettes(1640, 560) +
    '</g>'
  );
}

function posterArt(p, i) {
  const cx = p.w / 2;
  const cy = (p.h - 30) / 2 + 4;
  const accent = '#fff';
  // Three styles cycled
  const style = i % 3;
  if (style === 0) {
    // Grid / pipeline style
    return (
      '<g stroke="' + accent + '" stroke-width="1.2" fill="none" opacity=".85">' +
        '<rect x="' + (cx - 30) + '" y="' + (cy - 18) + '" width="20" height="20" rx="1"/>' +
        '<rect x="' + (cx - 4) + '" y="' + (cy - 18) + '" width="20" height="20" rx="1"/>' +
        '<rect x="' + (cx + 22) + '" y="' + (cy - 18) + '" width="20" height="20" rx="1"/>' +
        '<line x1="' + (cx - 10) + '" y1="' + (cy - 8) + '" x2="' + (cx - 4) + '" y2="' + (cy - 8) + '"/>' +
        '<line x1="' + (cx + 16) + '" y1="' + (cy - 8) + '" x2="' + (cx + 22) + '" y2="' + (cy - 8) + '"/>' +
      '</g>'
    );
  }
  if (style === 1) {
    // Synthwave sun + grid
    return (
      '<g fill="' + accent + '" opacity=".88">' +
        '<circle cx="' + cx + '" cy="' + (cy - 4) + '" r="20"/>' +
        '<rect x="' + (cx - 22) + '" y="' + (cy - 6) + '" width="44" height="2"/>' +
        '<rect x="' + (cx - 22) + '" y="' + (cy - 1) + '" width="44" height="2"/>' +
        '<rect x="' + (cx - 22) + '" y="' + (cy + 4) + '" width="44" height="2"/>' +
        '<rect x="' + (cx - 22) + '" y="' + (cy + 9) + '" width="44" height="2"/>' +
      '</g>'
    );
  }
  // style 2: gate / waveform abstract
  return (
    '<g stroke="' + accent + '" stroke-width="1.4" fill="none" opacity=".88" stroke-linecap="round">' +
      '<path d="M' + (cx - 28) + ' ' + cy + ' h12 v-10 h10 v10 h-10 v10 h-10 z"/>' +
      '<path d="M' + (cx - 6) + ' ' + cy + ' q8 -12 16 0 q8 12 16 0"/>' +
    '</g>'
  );
}

function cassettes(x, y) {
  return (
    '<g transform="translate(' + x + ',' + y + ')">' +
      // 3 cassettes stacked
      '<rect x="0"  y="-22" width="80" height="22" fill="#2a1f17" rx="1"/>' +
      '<rect x="6"  y="-18" width="68" height="14" fill="#d8a86c" rx="1"/>' +
      '<rect x="20" y="-15" width="40" height="8" fill="#3a2418" rx=".5"/>' +

      '<rect x="0"  y="-44" width="80" height="22" fill="#2a1f17" rx="1"/>' +
      '<rect x="6"  y="-40" width="68" height="14" fill="#c89858" rx="1"/>' +
      '<rect x="20" y="-37" width="40" height="8" fill="#3a2418" rx=".5"/>' +

      '<rect x="0"  y="-66" width="80" height="22" fill="#2a1f17" rx="1"/>' +
      '<rect x="6"  y="-62" width="68" height="14" fill="#e0b878" rx="1"/>' +
      '<rect x="20" y="-59" width="40" height="8" fill="#3a2418" rx=".5"/>' +
    '</g>'
  );
}

/* ── Desk surface ─────────────────────────────────────────── */
function desk() {
  return (
    '<g>' +
      // Desk surface (extends across full width)
      '<rect x="0" y="780" width="1920" height="300" fill="url(#rg-desk)"/>' +
      // Front edge of desk (darker band)
      '<rect x="0" y="780" width="1920" height="14" fill="#3a1f0e"/>' +
      // Wood grain lines
      '<g stroke="#3a1f0e" stroke-width="1" opacity=".35">' +
        '<line x1="0" y1="820" x2="1920" y2="822"/>' +
        '<line x1="0" y1="880" x2="1920" y2="876"/>' +
        '<line x1="0" y1="940" x2="1920" y2="945"/>' +
        '<line x1="0" y1="1000" x2="1920" y2="995"/>' +
        '<line x1="0" y1="1050" x2="1920" y2="1055"/>' +
      '</g>' +
      // Warm desk pool from lamp (large soft ellipse near the monitor)
      '<ellipse cx="1320" cy="900" rx="500" ry="160" fill="url(#rg-desk-glow)"/>' +
    '</g>'
  );
}

/* ── Speaker (left of monitor) + plant on top ────────────── */
function speaker() {
  return (
    '<g class="crt-room-decor" transform="translate(360, 540)">' +
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
      '<rect x="0" y="0" width="170" height="240" fill="#1a120c" rx="3"/>' +
      '<rect x="2" y="2" width="166" height="236" fill="#241812" rx="2"/>' +
      // Tweeter (top circle)
      '<circle cx="85" cy="50" r="22" fill="#0a0604"/>' +
      '<circle cx="85" cy="50" r="18" fill="none" stroke="#3a2418" stroke-width="1"/>' +
      '<circle cx="85" cy="50" r="6" fill="#3a2418"/>' +
      // Woofer (bottom circle)
      '<circle cx="85" cy="160" r="50" fill="#0a0604"/>' +
      '<circle cx="85" cy="160" r="42" fill="none" stroke="#3a2418" stroke-width="1"/>' +
      '<circle cx="85" cy="160" r="14" fill="#3a2418"/>' +
      // Equalizer indicator bars (animated)
      '<g class="crt-eq" transform="translate(120, 90)">' +
        '<rect class="crt-eq-bar crt-eq-bar--1" x="0"  y="0" width="6" height="20" fill="#5dcaa5"/>' +
        '<rect class="crt-eq-bar crt-eq-bar--2" x="10" y="0" width="6" height="20" fill="#d49a3a"/>' +
        '<rect class="crt-eq-bar crt-eq-bar--3" x="20" y="0" width="6" height="20" fill="#5dcaa5"/>' +
        '<rect class="crt-eq-bar crt-eq-bar--4" x="30" y="0" width="6" height="20" fill="#d49a3a"/>' +
      '</g>' +
      // Brand text
      '<text x="20" y="232" font-family="DM Mono, monospace" font-size="9" fill="#5a3a20" letter-spacing="2">VINTAGE</text>' +
    '</g>'
  );
}

/* ── Lamp ──────────────────────────────────────────────────── */
function lampGlow() {
  // Soft amber glow projected onto the wall/desk by the lamp
  return (
    '<g class="crt-lamp-glow">' +
      '<ellipse cx="1340" cy="600" rx="380" ry="280" fill="url(#rg-lamp)"/>' +
    '</g>'
  );
}

function lampChrome() {
  // Lamp now sits on the right side of the desk, between the monitor and the
  // tower. The arm rises up and arches LEFT so the shade hangs above-right of
  // the monitor (it no longer crosses the screen).
  return (
    '<g class="crt-room-decor" transform="translate(1380, 780)">' +
      // Round weighted base
      '<ellipse cx="0" cy="0" rx="55" ry="14" fill="#1a120c"/>' +
      '<ellipse cx="0" cy="-4" rx="50" ry="11" fill="#2a1f17"/>' +
      // Short neck riser
      '<rect x="-4" y="-8" width="8" height="40" fill="#1a120c"/>' +
      // Articulated arm: rises and arches up-and-left (toward viewer/monitor)
      '<line x1="0"   y1="-48"  x2="-50"  y2="-180" stroke="#1a120c" stroke-width="8" stroke-linecap="round"/>' +
      '<line x1="-50" y1="-180" x2="-110" y2="-310" stroke="#1a120c" stroke-width="8" stroke-linecap="round"/>' +
      // Elbow joint
      '<circle cx="-50" cy="-180" r="9" fill="#2a1f17"/>' +
      // Lampshade (cone, tilted to point down-and-left toward the desk pool).
      '<g transform="translate(-110, -310) rotate(35)">' +
        '<path d="M-44 -8 L44 -8 L60 60 L-60 60 Z" fill="#7a3a1a"/>' +
        '<path d="M-44 -8 L44 -8 L42 0 L-42 0 Z" fill="#5a2812"/>' +
        // Bulb glow strip seen from below the shade
        '<rect x="-55" y="58" width="110" height="5" fill="#fff6c8" opacity=".9"/>' +
      '</g>' +
    '</g>'
  );
}

/* ── Computer tower (far right on desk) ───────────────────── */
function tower() {
  return (
    '<g class="crt-room-decor" transform="translate(1500, 540)">' +
      // Main body
      '<rect x="0" y="0" width="160" height="290" fill="url(#rg-beige)" rx="3"/>' +
      // Inset shading lines for depth
      '<rect x="0" y="0" width="2" height="290" fill="#fff" opacity=".25"/>' +
      '<rect x="158" y="0" width="2" height="290" fill="#000" opacity=".15"/>' +
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
      '<text x="80" y="134" text-anchor="middle" font-family="DM Mono, monospace" font-size="10" fill="#3a2418" letter-spacing="3">ETHAN-R 4.7</text>' +
      // Power button
      '<circle cx="130" cy="260" r="10" fill="#3a2418"/>' +
      '<circle cx="130" cy="260" r="7" fill="url(#rg-beige)"/>' +
      // Power LED
      '<circle class="crt-led" cx="30" cy="260" r="3.5" fill="#8be07f" opacity=".9"/>' +
      '<text x="42" y="263" font-family="DM Mono, monospace" font-size="8" fill="#3a2418">PWR</text>' +
    '</g>'
  );
}

/* ── Monitor frame around the screen ───────────────────────
   Screen rectangle (the live HTML overlay coincides with this):
     x=800..1120, y=420..660  →  320 × 240, center (960, 540)
   The bezel + inner ring are sized so the screen sits centered
   inside them (with 26px of bezel padding all around).
   ──────────────────────────────────────────────────────── */
function monitorFrame() {
  return (
    '<g class="crt-monitor-decor">' +
      // Stand base (trapezoid + plate) — sits below the new bezel bottom (y=716)
      '<path d="M860 716 L1060 716 L1080 754 L840 754 Z" fill="#a48553"/>' +
      '<rect x="800" y="754" width="320" height="14" fill="#7a5e2e" rx="3"/>' +
      '<rect x="804" y="766" width="312" height="6" fill="#3a2812"/>' +
      // Stand neck (between bezel bottom and stand base)
      '<rect x="930" y="710" width="60" height="14" fill="#c2a474"/>' +
      // Monitor bezel — re-centered so its center matches the screen rect (960, 540).
      // Outer bezel: 412 × 320 → x=754..1166, y=380..700.
      '<rect x="754" y="380" width="412" height="320" fill="url(#rg-beige)" rx="22"/>' +
      // Inner deep bezel ring (cavity around the screen) — 360 × 268, centered.
      '<rect x="780" y="406" width="360" height="268" fill="#1a120c" rx="14"/>' +
      // Glossy highlight along the top of the bezel
      '<rect x="760" y="386" width="400" height="4" fill="#fff" opacity=".3" rx="2"/>' +
      // Bezel logo (just above the bezel bottom edge)
      '<text x="960" y="694" text-anchor="middle" font-family="DM Mono, monospace" font-size="9" fill="#5a3a20" letter-spacing="3">ETHAN-R</text>' +
      // Power LED on bezel
      '<circle class="crt-led" cx="1100" cy="690" r="3" fill="#8be07f"/>' +
    '</g>'
  );
}

/* ── Keyboard + mouse ─────────────────────────────────────── */
function peripherals() {
  return (
    '<g class="crt-room-decor">' +
      // Keyboard body
      '<g transform="translate(700, 830)">' +
        '<rect x="0" y="0" width="520" height="120" fill="url(#rg-beige)" rx="6"/>' +
        '<rect x="0" y="0" width="520" height="3" fill="#fff" opacity=".25" rx="2"/>' +
        // Key matrix (simplified rows)
        keyboardKeys() +
      '</g>' +
      // Mouse + cord
      '<g transform="translate(1270, 880)">' +
        '<ellipse cx="0" cy="0" rx="38" ry="26" fill="url(#rg-beige)"/>' +
        '<line x1="0" y1="-26" x2="0" y2="-10" stroke="#3a2418" stroke-width="1.4"/>' +
        // Cord curving back to keyboard
        '<path d="M0 -26 Q-30 -50 -80 -50" stroke="#3a2418" stroke-width="1.6" fill="none"/>' +
      '</g>' +
    '</g>'
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
  // Snowshoe Siamese: cream-white body, dark brown mask/ears/tail tip.
  // Positioned on the desk between the speaker area and keyboard, sized
  // generously so it reads as a real desk-sized cat.
  return (
    '<g class="crt-cat" transform="translate(580, 860)">' +
      // Tail (drawn FIRST so the body sits on top of its base join).
      '<g class="crt-cat-tail">' +
        '<path d="M105 10 Q175 0 170 -55 Q165 -100 115 -88" stroke="#3a2418" stroke-width="22" fill="none" stroke-linecap="round"/>' +
        // Darker tail tip
        '<circle cx="115" cy="-88" r="13" fill="#1a0e08"/>' +
      '</g>' +
      // Body — cream/white curled crescent
      '<path d="M-95 5 Q-118 -85 5 -100 Q120 -100 125 10 Q115 55 5 55 Q-105 55 -95 5 Z" fill="#f1e4cc"/>' +
      // Subtle warmer shading under the back
      '<path d="M-90 5 Q-110 -75 5 -92 Q60 -90 95 -55 Q65 -25 5 -25 Q-70 -25 -90 5 Z" fill="#e0d0b2" opacity=".55"/>' +
      // Dark brown back stripe / saddle (siamese darker back)
      '<path d="M-40 -85 Q5 -100 70 -75 Q40 -55 5 -50 Q-30 -55 -40 -85 Z" fill="#5a3a22" opacity=".55"/>' +
      // Front paws peeking out (white)
      '<ellipse cx="-30" cy="48" rx="18" ry="8" fill="#f1e4cc"/>' +
      '<ellipse cx="10"  cy="50" rx="18" ry="8" fill="#f1e4cc"/>' +
      // Paw toe lines
      '<g stroke="#c8b89a" stroke-width=".8" opacity=".7">' +
        '<line x1="-36" y1="45" x2="-36" y2="52"/>' +
        '<line x1="-30" y1="44" x2="-30" y2="52"/>' +
        '<line x1="-24" y1="45" x2="-24" y2="52"/>' +
        '<line x1="4"  y1="47" x2="4"  y2="54"/>' +
        '<line x1="10" y1="46" x2="10" y2="54"/>' +
        '<line x1="16" y1="47" x2="16" y2="54"/>' +
      '</g>' +
      // Head tucked toward chest, slightly left of center
      '<g transform="translate(-60, -25)">' +
        // Cream chin / underchin
        '<ellipse cx="0" cy="14" rx="32" ry="16" fill="#f1e4cc"/>' +
        // Dark brown face mask (top half of head)
        '<path d="M-32 -2 Q-30 -28 0 -32 Q30 -28 32 -2 Q26 14 0 14 Q-26 14 -32 -2 Z" fill="#3a2418"/>' +
        // Lighter brown forehead highlight
        '<path d="M-22 -8 Q0 -22 22 -8 Q12 -4 0 -4 Q-12 -4 -22 -8 Z" fill="#4a2e1a" opacity=".7"/>' +
        // Ears (dark brown triangles)
        '<path d="M-28 -16 L-36 -42 L-12 -28 Z" fill="#2a1810"/>' +
        '<path d="M28 -16 L36 -42 L12 -28 Z" fill="#2a1810"/>' +
        // Inner ear (warm pink)
        '<path d="M-26 -20 L-30 -34 L-18 -28 Z" fill="#a8755a"/>' +
        '<path d="M26 -20 L30 -34 L18 -28 Z" fill="#a8755a"/>' +
        // Cream muzzle
        '<ellipse cx="0" cy="9" rx="15" ry="9" fill="#f5ecd6"/>' +
        // Pink nose (small triangle)
        '<path d="M-3.5 5 L3.5 5 L0 10 Z" fill="#2a1408"/>' +
        // Closed eye slits (sleeping)
        '<path class="crt-cat-eye" d="M-15 -3 Q-10 0 -5 -3" stroke="#1a0e08" stroke-width="2" fill="none" stroke-linecap="round"/>' +
        '<path class="crt-cat-eye" d="M5 -3 Q10 0 15 -3" stroke="#1a0e08" stroke-width="2" fill="none" stroke-linecap="round"/>' +
        // Whiskers
        '<g stroke="#fff" stroke-width="1" opacity=".9">' +
          '<line x1="-32" y1="6"  x2="-12" y2="8"/>' +
          '<line x1="-32" y1="10" x2="-12" y2="10"/>' +
          '<line x1="-32" y1="14" x2="-12" y2="12"/>' +
          '<line x1="32"  y1="6"  x2="12"  y2="8"/>' +
          '<line x1="32"  y1="10" x2="12"  y2="10"/>' +
          '<line x1="32"  y1="14" x2="12"  y2="12"/>' +
        '</g>' +
      '</g>' +
      // Sleepy "z" glyphs floating upward
      '<g class="crt-cat-zzz" font-family="DM Mono, monospace" fill="#d49a3a" opacity=".85">' +
        '<text class="crt-zzz crt-zzz--1" x="-20" y="-110" font-size="22">z</text>' +
        '<text class="crt-zzz crt-zzz--2" x="2"   y="-128" font-size="17">z</text>' +
        '<text class="crt-zzz crt-zzz--3" x="22"  y="-144" font-size="13">z</text>' +
      '</g>' +
    '</g>'
  );
}

/* ── Coffee mug with rising steam ─────────────────────────── */
function mug() {
  return (
    '<g class="crt-room-decor" transform="translate(1480, 860)">' +
      // Mug body
      '<rect x="-26" y="-50" width="52" height="60" fill="#5a3a20" rx="3"/>' +
      '<rect x="-22" y="-46" width="44" height="6" fill="#3a2418"/>' +
      // Handle
      '<path d="M26 -36 Q44 -36 44 -20 Q44 -4 26 -4" stroke="#5a3a20" stroke-width="6" fill="none"/>' +
      // Coffee inside (visible rim)
      '<ellipse cx="0" cy="-46" rx="22" ry="4" fill="#2a1408"/>' +
      // Steam
      '<g class="crt-steam" fill="none" stroke="#fff" stroke-width="2" opacity=".4" stroke-linecap="round">' +
        '<path class="crt-steam-curl crt-steam-curl--a" d="M-10 -58 Q-14 -76 -6 -90 Q2 -104 -6 -118"/>' +
        '<path class="crt-steam-curl crt-steam-curl--b" d="M6 -58 Q10 -78 2 -94 Q-6 -108 4 -124"/>' +
      '</g>' +
    '</g>'
  );
}
