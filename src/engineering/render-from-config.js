import {
  ENG_NAV,
  ENG_NAV_THEMES,
  ENG_STACK,
  ENG_BIOGRAPHY,
  ENG_RESUME,
} from "./config.js";
import { applyCrtRoomLayoutVars, crtRoomSceneSvg } from "./crt-room.js";
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

function engDetNav(backPageId, themeKey) {
  const nl = ENG_NAV;
  return (
    '<div class="crt-det-nav" data-theme="' + escapeAttr(themeKey) + '">' +
      '<div class="crt-det-nav-actions">' +
        '<button type="button" class="crt-back" onclick="showPage(\'' + escapeAttr(backPageId) + '\')">' +
          '<i class="ti ti-arrow-left"></i> ' + escapeHtml(nl.backLabel) +
        '</button>' +
        '<button type="button" class="crt-back" onclick="goHome()" aria-label="' + escapeAttr(nl.homeAriaLabel) + '">' +
          '<i class="ti ti-home"></i>' +
        '</button>' +
      '</div>' +
      '<div class="crt-det-logo">Ethan<em>R.</em></div>' +
    '</div>'
  );
}

/**
 * Wraps page content in a terminal-window frame so it matches the
 * scroll-zoom home experience.
 *   themeKey: sw | hw | re | resume | bio  (controls accent color class)
 *   titleText: monospace path-style title shown in the chrome titlebar
 *   contentHtml: pre-rendered page body
 */
function crtPageFrame(themeKey, titleText, contentHtml) {
  return (
    '<div class="crt-page" data-theme="' + escapeAttr(themeKey) + '">' +
      '<div class="crt-page-window">' +
        '<div class="crt-page-titlebar">' +
          '<span class="crt-page-dots"><i></i><i></i><i></i></span>' +
          '<span class="crt-page-title">' + escapeHtml(titleText) + '</span>' +
          '<span class="crt-page-status">READY</span>' +
        '</div>' +
        '<div class="crt-page-screen">' +
          '<div class="crt-scanlines" aria-hidden="true"></div>' +
          '<div class="crt-glow" aria-hidden="true"></div>' +
          '<div class="crt-page-body">' + contentHtml + '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

function thumbInner(card) {
  if (card.thumbnailSrc) {
    return (
      '<img src="' +
      escapeAttr(assetUrl(card.thumbnailSrc)) +
      '" alt="' +
      escapeAttr(card.thumbnailAlt || card.title) +
      '" style="width:100%;height:100%;object-fit:cover;">'
    );
  }
  return card.thumbnailInnerHtml || "";
}

/* ──────────────────────────────────────────────────────────────
   STACK EXPERIENCE
   The engineering home now mounts a vintage CRT computer. Clicking
   it shatters into the side-rail + canvas layout that lets the user
   browse the six layers of the full computer-engineering stack.
   ────────────────────────────────────────────────────────────── */

function bootPanelHtml() {
  const c = ENG_STACK.computer;
  var boot = c.bootLines
    .map(function (l) { return '<span class="crt-boot-line">' + escapeHtml(l) + "</span>"; })
    .join("");
  return (
    '<div class="stack-layer-panel is-active" data-layer="boot" data-domain="boot">' +
      '<div class="crt-boot">' + boot + '</div>' +
      '<div class="crt-prompt">' + escapeHtml(c.promptHint) + '<span class="crt-cursor">_</span></div>' +
      '<div class="crt-scroll-cue"><i class="ti ti-chevron-down"></i> Scroll to zoom into the stack</div>' +
    '</div>'
  );
}

function layerIconSvg(domain) {
  switch (domain) {
    case "applications":
      return '<svg viewBox="0 0 44 44" fill="none"><rect x="6" y="9" width="22" height="32" rx="3" stroke="currentColor" stroke-width="1.2"/><rect x="9" y="13" width="16" height="22" rx="1" fill="currentColor" opacity=".15"/><circle cx="17" cy="38" r="1.2" fill="currentColor"/><rect x="26" y="6" width="14" height="22" rx="2" stroke="currentColor" stroke-width="1.2"/><rect x="29" y="10" width="8" height="13" rx="1" fill="currentColor" opacity=".15"/></svg>';
    case "software":
      return '<svg viewBox="0 0 44 44" fill="none"><path d="M6 30 L14 22 L6 14" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M38 30 L30 22 L38 14" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M19 36 L25 8" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>';
    case "architecture":
      return '<svg viewBox="0 0 44 44" fill="none"><rect x="4" y="10" width="9" height="9" rx="1" stroke="currentColor" stroke-width="1.1"/><rect x="17" y="10" width="9" height="9" rx="1" stroke="currentColor" stroke-width="1.1"/><rect x="30" y="10" width="10" height="9" rx="1" stroke="currentColor" stroke-width="1.1"/><rect x="11" y="26" width="22" height="9" rx="1" stroke="currentColor" stroke-width="1.1"/><path d="M13 19 v3 h18 v-3" stroke="currentColor" stroke-width=".9" fill="none" opacity=".7"/><path d="M22 22 v4" stroke="currentColor" stroke-width=".9" opacity=".7"/></svg>';
    case "circuits":
      return '<svg viewBox="0 0 44 44" fill="none"><path d="M4 22 H14 V12 H22 V32 H30 V18 H40" stroke="currentColor" stroke-width="1.3" fill="none"/><circle cx="14" cy="22" r="1.6" fill="currentColor"/><circle cx="22" cy="12" r="1.6" fill="currentColor"/><circle cx="22" cy="32" r="1.6" fill="currentColor"/><circle cx="30" cy="18" r="1.6" fill="currentColor"/></svg>';
    case "devices":
      return '<svg viewBox="0 0 44 44" fill="none"><rect x="6" y="22" width="32" height="14" rx="1" stroke="currentColor" stroke-width="1.1" opacity=".8"/><rect x="13" y="14" width="6" height="8" fill="currentColor" opacity=".55"/><rect x="25" y="14" width="6" height="8" fill="currentColor" opacity=".55"/><line x1="16" y1="8" x2="16" y2="14" stroke="currentColor" stroke-width="1.2"/><line x1="22" y1="6" x2="22" y2="22" stroke="currentColor" stroke-width="1.2"/><line x1="28" y1="8" x2="28" y2="14" stroke="currentColor" stroke-width="1.2"/></svg>';
    case "materials":
      return '<svg viewBox="0 0 44 44" fill="none"><g stroke="currentColor" stroke-width="1" opacity=".75"><line x1="8" y1="14" x2="36" y2="14"/><line x1="8" y1="22" x2="36" y2="22"/><line x1="8" y1="30" x2="36" y2="30"/><line x1="12" y1="10" x2="12" y2="34"/><line x1="22" y1="10" x2="22" y2="34"/><line x1="32" y1="10" x2="32" y2="34"/></g><circle cx="12" cy="14" r="2" fill="currentColor"/><circle cx="22" cy="14" r="2" fill="currentColor"/><circle cx="32" cy="14" r="2" fill="currentColor"/><circle cx="12" cy="22" r="2" fill="currentColor"/><circle cx="22" cy="22" r="2" fill="currentColor"/><circle cx="32" cy="22" r="2" fill="currentColor"/><circle cx="12" cy="30" r="2" fill="currentColor"/><circle cx="22" cy="30" r="2" fill="currentColor"/><circle cx="32" cy="30" r="2" fill="currentColor"/></svg>';
    default:
      return '';
  }
}

function layerDomainArtHtml(domain) {
  // Larger, more decorative SVG that sits inside the CRT canvas.
  switch (domain) {
    case "applications":
      return '<svg viewBox="0 0 260 120" preserveAspectRatio="xMidYMid meet"><g fill="none" stroke="currentColor" stroke-width="1.1" opacity=".85"><rect x="20" y="22" width="60" height="80" rx="6"/><rect x="100" y="30" width="56" height="72" rx="3"/><rect x="176" y="36" width="64" height="56" rx="4"/></g><g fill="currentColor" opacity=".25"><rect x="26" y="32" width="48" height="56" rx="2"/><rect x="106" y="38" width="44" height="48" rx="1"/><rect x="184" y="44" width="48" height="34" rx="1"/></g><g fill="currentColor" opacity=".8"><circle cx="50" cy="98" r="1.6"/><rect x="118" y="92" width="20" height="3" rx="1"/></g></svg>';
    case "software":
      return '<svg viewBox="0 0 260 120"><g font-family="DM Mono, monospace" font-size="11" fill="currentColor" opacity=".9"><text x="14" y="26">$ ./tuner --in=mic --fx=delay,reverb</text><text x="14" y="46" opacity=".75">[OK] pitch=440.0 Hz · A4</text><text x="14" y="66" opacity=".75">[OK] delay 250ms · feedback 0.4</text><text x="14" y="86" opacity=".75">[OK] reverb wet 0.35</text><text x="14" y="106">$ <tspan opacity=".6">_</tspan></text></g></svg>';
    case "architecture":
      // RISC-V 5-stage pipeline: IF | ID | EX | MEM | WB with sub-blocks and a write-back path.
      return (
        '<svg viewBox="0 0 260 130" preserveAspectRatio="xMidYMid meet">' +
          '<g fill="none" stroke="currentColor" stroke-width="1.1">' +
            // Stage rectangles
            '<rect x="4" y="26" width="44" height="66" rx="2"/>' +
            '<rect x="52" y="26" width="44" height="66" rx="2"/>' +
            '<rect x="100" y="26" width="44" height="66" rx="2"/>' +
            '<rect x="148" y="26" width="44" height="66" rx="2"/>' +
            '<rect x="196" y="26" width="44" height="66" rx="2"/>' +
            // Pipeline register dividers between stages
            '<line x1="50" y1="22" x2="50" y2="96" stroke-dasharray="2 2" opacity=".45"/>' +
            '<line x1="98" y1="22" x2="98" y2="96" stroke-dasharray="2 2" opacity=".45"/>' +
            '<line x1="146" y1="22" x2="146" y2="96" stroke-dasharray="2 2" opacity=".45"/>' +
            '<line x1="194" y1="22" x2="194" y2="96" stroke-dasharray="2 2" opacity=".45"/>' +
            // IF: PC + IMem
            '<rect x="10" y="38" width="32" height="14" rx="1" opacity=".5"/>' +
            '<rect x="10" y="58" width="32" height="26" rx="1" opacity=".5"/>' +
            // ID: Decode + Regs
            '<rect x="58" y="38" width="32" height="14" rx="1" opacity=".5"/>' +
            '<rect x="58" y="58" width="32" height="26" rx="1" opacity=".5"/>' +
            // EX: ALU (trapezoid)
            '<path d="M106 40 L138 48 L138 72 L106 80 L114 60 Z" opacity=".7"/>' +
            // MEM: DMem
            '<rect x="154" y="38" width="32" height="46" rx="1" opacity=".55"/>' +
            // WB: writeback MUX (trapezoid)
            '<path d="M202 40 L228 50 L228 70 L202 80 Z" opacity=".7"/>' +
            // Inter-stage signal lines
            '<line x1="42" y1="65" x2="50" y2="65" opacity=".8"/>' +
            '<line x1="90" y1="65" x2="98" y2="65" opacity=".8"/>' +
            '<line x1="138" y1="60" x2="146" y2="60" opacity=".8"/>' +
            '<line x1="186" y1="60" x2="194" y2="60" opacity=".8"/>' +
            // Write-back loop: from WB back to ID register file
            '<path d="M238 96 L238 110 L74 110 L74 86" stroke-dasharray="3 3" opacity=".7"/>' +
            '<polygon points="71,86 77,86 74,79" fill="currentColor" stroke="none" opacity=".7"/>' +
          '</g>' +
          // Stage labels (top)
          '<g font-family="DM Mono, monospace" font-size="8" fill="currentColor" font-weight="700">' +
            '<text x="26" y="20" text-anchor="middle">IF</text>' +
            '<text x="74" y="20" text-anchor="middle">ID</text>' +
            '<text x="122" y="20" text-anchor="middle">EX</text>' +
            '<text x="170" y="20" text-anchor="middle">MEM</text>' +
            '<text x="218" y="20" text-anchor="middle">WB</text>' +
          '</g>' +
          // Sub-block labels
          '<g font-family="DM Mono, monospace" font-size="5.5" fill="currentColor" opacity=".9">' +
            '<text x="26" y="48" text-anchor="middle">PC</text>' +
            '<text x="26" y="74" text-anchor="middle">IMem</text>' +
            '<text x="74" y="48" text-anchor="middle">Decode</text>' +
            '<text x="74" y="74" text-anchor="middle">Regs</text>' +
            '<text x="122" y="63" text-anchor="middle">ALU</text>' +
            '<text x="170" y="64" text-anchor="middle">DMem</text>' +
            '<text x="214" y="62" text-anchor="middle">MUX</text>' +
          '</g>' +
          // Write-back annotation
          '<text x="158" y="122" font-family="DM Mono, monospace" font-size="5.5" fill="currentColor" opacity=".55" text-anchor="middle">writeback to reg file</text>' +
        '</svg>'
      );
    case "circuits":
      // IEEE distinctive-shape logic gates: AND, OR, NAND, XOR in a 2x2 grid with input/output wires.
      return (
        '<svg viewBox="0 0 260 130" preserveAspectRatio="xMidYMid meet">' +
          '<g fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round">' +
            // AND (top-left)
            '<line x1="8" y1="28" x2="40" y2="28"/>' +
            '<line x1="8" y1="44" x2="40" y2="44"/>' +
            '<path d="M40 20 H56 A16 16 0 0 1 56 52 H40 Z"/>' +
            '<line x1="72" y1="36" x2="96" y2="36"/>' +
            // OR (top-right)
            '<line x1="142" y1="28" x2="172" y2="28"/>' +
            '<line x1="142" y1="44" x2="172" y2="44"/>' +
            '<path d="M168 20 Q176 36 168 52 Q190 52 212 36 Q190 20 168 20 Z"/>' +
            '<line x1="212" y1="36" x2="236" y2="36"/>' +
            // NAND (bottom-left) — AND with output bubble
            '<line x1="8" y1="86" x2="40" y2="86"/>' +
            '<line x1="8" y1="102" x2="40" y2="102"/>' +
            '<path d="M40 78 H56 A16 16 0 0 1 56 110 H40 Z"/>' +
            '<circle cx="75" cy="94" r="2.5"/>' +
            '<line x1="77.5" y1="94" x2="96" y2="94"/>' +
            // XOR (bottom-right) — OR with extra back curve
            '<line x1="142" y1="86" x2="170" y2="86"/>' +
            '<line x1="142" y1="102" x2="170" y2="102"/>' +
            '<path d="M163 78 Q170 94 163 110"/>' +
            '<path d="M170 78 Q178 94 170 110 Q190 110 212 94 Q190 78 170 78 Z"/>' +
            '<line x1="212" y1="94" x2="236" y2="94"/>' +
          '</g>' +
          // Gate labels
          '<g font-family="DM Mono, monospace" font-size="7" fill="currentColor" font-weight="700" opacity=".95">' +
            '<text x="52" y="15" text-anchor="middle">AND</text>' +
            '<text x="190" y="15" text-anchor="middle">OR</text>' +
            '<text x="52" y="73" text-anchor="middle">NAND</text>' +
            '<text x="190" y="73" text-anchor="middle">XOR</text>' +
          '</g>' +
          // Pin labels
          '<g font-family="DM Mono, monospace" font-size="6" fill="currentColor" opacity=".65">' +
            '<text x="6" y="30" text-anchor="end">A</text>' +
            '<text x="6" y="46" text-anchor="end">B</text>' +
            '<text x="98" y="38" text-anchor="start">Y</text>' +
            '<text x="140" y="30" text-anchor="end">A</text>' +
            '<text x="140" y="46" text-anchor="end">B</text>' +
            '<text x="238" y="38" text-anchor="start">Y</text>' +
            '<text x="6" y="88" text-anchor="end">A</text>' +
            '<text x="6" y="104" text-anchor="end">B</text>' +
            '<text x="98" y="96" text-anchor="start">Y</text>' +
            '<text x="140" y="88" text-anchor="end">A</text>' +
            '<text x="140" y="104" text-anchor="end">B</text>' +
            '<text x="238" y="96" text-anchor="start">Y</text>' +
          '</g>' +
        '</svg>'
      );
    case "devices":
      return '<svg viewBox="0 0 260 120"><g fill="none" stroke="currentColor" stroke-width="1.1"><rect x="20" y="80" width="220" height="14" opacity=".85"/><rect x="60" y="58" width="40" height="22" opacity=".7"/><rect x="160" y="58" width="40" height="22" opacity=".7"/><line x1="80" y1="40" x2="80" y2="58"/><line x1="130" y1="30" x2="130" y2="80"/><line x1="180" y1="40" x2="180" y2="58"/></g><g font-family="DM Mono, monospace" font-size="9" fill="currentColor" opacity=".85"><text x="80" y="36" text-anchor="middle">S</text><text x="130" y="26" text-anchor="middle">G</text><text x="180" y="36" text-anchor="middle">D</text><text x="130" y="108" text-anchor="middle" opacity=".7">p-substrate · n+ / n+</text></g></svg>';
    case "materials":
      return '<svg viewBox="0 0 260 120"><g stroke="currentColor" stroke-width=".9" opacity=".6">'+
        (function(){var lines=[];for(var x=20;x<=240;x+=20)lines.push('<line x1="'+x+'" y1="20" x2="'+x+'" y2="100"/>');for(var y=20;y<=100;y+=20)lines.push('<line x1="20" y1="'+y+'" x2="240" y2="'+y+'"/>');return lines.join("");})()+
        '</g><g fill="currentColor">'+
        (function(){var dots=[];for(var x=20;x<=240;x+=20){for(var y=20;y<=100;y+=20){dots.push('<circle cx="'+x+'" cy="'+y+'" r="2.4"/>');}}return dots.join("");})()+
        '</g><g stroke="currentColor" stroke-width="1.2" opacity=".9"><line x1="20" y1="20" x2="240" y2="100"/><line x1="240" y1="20" x2="20" y2="100"/></g></svg>';
    default:
      return '';
  }
}

function layerPanelHtml(L) {
  var projects = L.projects
    .map(function (p) {
      var tags = (p.tags || [])
        .map(function (t) { return '<span class="stack-proj-tag">' + escapeHtml(t) + "</span>"; })
        .join("");
      var more = p.more || null;
      var hasMore =
        more &&
        ((more.paragraphs && more.paragraphs.length) ||
          (more.bullets && more.bullets.length));
      var moreBtn = "";
      var moreBody = "";
      if (hasMore) {
        var paras = (more.paragraphs || [])
          .map(function (para) {
            return '<p class="stack-proj-more-p">' + escapeHtml(para) + "</p>";
          })
          .join("");
        var bullets = "";
        if (more.bullets && more.bullets.length) {
          bullets =
            '<ul class="stack-proj-more-list">' +
            more.bullets
              .map(function (b) {
                return "<li>" + escapeHtml(b) + "</li>";
              })
              .join("") +
            "</ul>";
        }
        moreBtn =
          '<button type="button" class="stack-proj-toggle" aria-expanded="false" onclick="toggleStackProject(this)">' +
          '<i class="ti ti-chevron-down" aria-hidden="true"></i> ' +
          '<span class="stack-proj-toggle-label">More info</span>' +
          "</button>";
        moreBody =
          '<div class="stack-proj-more" hidden>' + paras + bullets + "</div>";
      }
      return (
        '<article class="stack-proj">' +
          '<header class="stack-proj-hdr"><span class="stack-proj-title">' +
          escapeHtml(p.title) +
          '</span><span class="stack-proj-meta">' +
          escapeHtml(p.meta || "") +
          '</span></header>' +
          '<p class="stack-proj-body">' + escapeHtml(p.body) + "</p>" +
          '<div class="stack-proj-foot"><div class="stack-proj-tags">' + tags + '</div>' + moreBtn + '</div>' +
          moreBody +
        '</article>'
      );
    })
    .join("");

  var emptyState = L.projects.length === 0
    ? '<div class="stack-empty">No projects mapped here yet — coming soon.</div>'
    : '';

  return (
    '<div class="stack-layer-panel" data-layer="' + escapeAttr(L.id) + '" data-domain="' + escapeAttr(L.domain) + '">' +
      '<div class="stack-layer-titlebar">' +
        '<span class="stack-layer-path">/stack/L' + L.ordinal + '</span>' +
        '<span class="stack-layer-status">' + (L.active ? "READY" : "OFFLINE") + '</span>' +
      '</div>' +
      '<div class="stack-layer-body">' +
        '<div class="stack-layer-head">' +
          '<div class="stack-layer-eyebrow">Layer ' + L.ordinal + " of 6 · " + escapeHtml(L.subtitle) + '</div>' +
          '<h2 class="stack-layer-title">' + escapeHtml(L.title) + '</h2>' +
          '<p class="stack-layer-summary">' + escapeHtml(L.summary) + '</p>' +
        '</div>' +
        '<div class="stack-layer-art">' + layerDomainArtHtml(L.domain) + '</div>' +
        '<div class="stack-layer-projects">' + projects + emptyState + '</div>' +
      '</div>' +
    '</div>'
  );
}

function stackProgressHtml() {
  // 7 dots: Boot + 6 layers, in scroll order (top of screen → bottom of stack).
  var dots = ['<button type="button" class="stack-progress-dot is-active" data-idx="0" data-layer="boot" aria-label="Boot screen"><span class="stack-progress-tick">●</span><span class="stack-progress-label">Boot</span></button>'];
  ENG_STACK.layers.forEach(function (L, i) {
    dots.push(
      '<button type="button" class="stack-progress-dot" data-idx="' + (i + 1) + '" data-layer="' + escapeAttr(L.id) + '" data-domain="' + escapeAttr(L.domain) + '" aria-label="' + escapeAttr(L.title) + '">' +
        '<span class="stack-progress-tick">L' + L.ordinal + '</span>' +
        '<span class="stack-progress-label">' + escapeHtml(L.title) + '</span>' +
      '</button>'
    );
  });
  return (
    '<nav class="stack-progress" id="stack-progress" aria-label="Stack navigation">' +
      '<div class="stack-progress-hdr">Stack</div>' +
      '<div class="stack-progress-list">' + dots.join("") + '</div>' +
    '</nav>'
  );
}

function buildEngHomeInnerHtml() {
  // The boot panel + all 6 layer panels render into an HTML overlay
  // (.crt-zoom-screen) that sits on top of the SVG room. The overlay
  // is sized to overlap the SVG monitor at zoom=0 and grows to fill
  // the viewport as the camera flies in.
  var layerPanels = ENG_STACK.layers.map(layerPanelHtml).join("");

  return (
    '<div class="eng-stack-experience" id="eng-stack-experience">' +
      '<div class="stack-scroll-region" id="stack-scroll-region">' +
        '<div class="stack-sticky-stage" id="stack-sticky-stage">' +
          '<div class="crt-room-stage" id="crt-room-stage">' +
            crtRoomSceneSvg() +
          '</div>' +
          '<div class="crt-zoom-screen" id="crt-zoom-screen">' +
            '<div class="crt-scanlines" aria-hidden="true"></div>' +
            '<div class="crt-glow" aria-hidden="true"></div>' +
            '<div class="stack-layer-deck" id="stack-layer-deck">' +
              bootPanelHtml() +
              layerPanels +
            '</div>' +
          '</div>' +
          '<div id="crt-vinyl-tooltip" class="crt-vinyl-tooltip" hidden>' +
            '<span class="crt-vinyl-tooltip-title"></span>' +
            '<span class="crt-vinyl-tooltip-artist"></span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      stackProgressHtml() +
      '<button type="button" class="stack-reassemble" id="crt-reassemble" aria-label="Back to top">' +
        '<i class="ti ti-arrow-up"></i> Reassemble' +
      '</button>' +
    '</div>'
  );
}

function buildBiographyInnerHtml() {
  const b = ENG_BIOGRAPHY;
  var avatar = b.avatarSrc
    ? '<img class="bio-page-avatar-img" src="' + escapeAttr(assetUrl(b.avatarSrc)) + '" alt="' + escapeAttr(b.avatarAlt || "") + '">'
    : '<div class="bio-page-avatar-placeholder"><i class="ti ti-user"></i></div>';

  var story = b.story
    .map(function (s) {
      return (
        '<section class="bio-page-section">' +
          '<h3 class="bio-page-section-title">' + escapeHtml(s.heading) + "</h3>" +
          '<p class="bio-page-section-body">' + escapeHtml(s.body) + "</p>" +
        "</section>"
      );
    })
    .join("");

  var facts = b.facts
    .map(function (f) {
      return (
        '<div class="bio-page-fact"><div class="bio-page-fact-n">' + f.valueHtml +
        '</div><div class="bio-page-fact-l">' + escapeHtml(f.label) + "</div></div>"
      );
    })
    .join("");

  var ctas = b.ctas
    .map(function (c) {
      if (c.pageId) {
        return (
          '<button type="button" class="bio-page-cta" onclick="showPage(\'' +
          escapeAttr(c.pageId) +
          '\')"><i class="ti ' + escapeAttr(c.icon) + '"></i> ' + escapeHtml(c.label) + "</button>"
        );
      }
      return (
        '<a class="bio-page-cta" href="' + escapeAttr(c.href) +
        '" target="_blank" rel="noopener noreferrer"><i class="ti ' + escapeAttr(c.icon) + '"></i> ' +
        escapeHtml(c.label) + "</a>"
      );
    })
    .join("");

  var body =
    '<div class="bio-page">' +
      '<div class="bio-page-head">' +
        '<div class="bio-page-avatar">' + avatar + '</div>' +
        '<div class="bio-page-head-text">' +
          '<div class="bio-page-eyebrow">' + escapeHtml(b.eyebrow) + '</div>' +
          '<h1 class="bio-page-name">' + escapeHtml(b.name) + '</h1>' +
          '<p class="bio-page-tagline">' + escapeHtml(b.tagline) + '</p>' +
          '<div class="bio-page-ctas">' + ctas + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="bio-page-facts">' + facts + '</div>' +
      '<div class="bio-page-story">' + story + '</div>' +
    '</div>';

  return crtPageFrame("bio", "/biography", body);
}

function resumeCourseworkHtml(r) {
  if (!r.coursework || !r.coursework.length) return "";
  var lis = r.coursework
    .map(function (line) {
      return "<li>" + escapeHtml(line) + "</li>";
    })
    .join("");
  return (
    '<div class="res-sec"><div class="res-sec-title">' +
    escapeHtml(r.courseworkSectionTitle || "Coursework") +
    '</div><ul class="res-cw">' +
    lis +
    "</ul></div>"
  );
}

function resumeProjectsHtml(r) {
  if (!r.projects || !r.projects.length) return "";
  var items = r.projects
    .map(function (p) {
      return (
        '<div class="res-item res-item--compact"><div class="res-ih"><span class="res-it">' +
        escapeHtml(p.title) +
        '</span><span class="res-id">' +
        escapeHtml(p.meta || "") +
        "</span></div></div>"
      );
    })
    .join("");
  return (
    '<div class="res-sec"><div class="res-sec-title">' +
    escapeHtml(r.projectsSectionTitle || "Projects") +
    "</div>" +
    items +
    "</div>"
  );
}

function resumeExtrasHtml(r) {
  if (!r.extrasText) return "";
  return (
    '<div class="res-sec"><div class="res-sec-title">' +
    escapeHtml(r.extrasSectionTitle || "Leadership & interests") +
    '</div><div class="res-ib">' +
    escapeHtml(r.extrasText) +
    "</div></div>"
  );
}

function buildResumeInnerHtml() {
  const r = ENG_RESUME;
  var contacts = r.contacts
    .map(function (c) {
      var inner = escapeHtml(c.text);
      if (c.href) {
        inner =
          '<a href="' +
          escapeAttr(c.href) +
          '" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;">' +
          inner +
          "</a>";
      }
      return (
        '<span class="res-ci"><i class="ti ' +
        escapeAttr(c.icon) +
        '"></i>' +
        inner +
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

  var dl =
    r.pdfHref ?
      '<a class="res-dl" href="' +
      escapeAttr(assetUrl(r.pdfHref)) +
      '" download target="_blank" rel="noopener noreferrer"><i class="ti ti-download"></i> ' +
      escapeHtml(r.downloadLabel) +
      "</a>"
    : '<button type="button" class="res-dl"><i class="ti ti-download"></i> ' +
      escapeHtml(r.downloadLabel) +
      "</button>";

  return (
    '<div class="res-page">' +
    '<div class="res-name">' +
    r.nameHtml +
    '</div><div class="res-tagline">' +
    escapeHtml(r.tagline) +
    '</div><div class="res-contact-row">' +
    contacts +
    '</div><div class="res-sec"><div class="res-sec-title">' +
    escapeHtml(r.educationSectionTitle) +
    "</div>" +
    eduItems +
    "</div>" +
    resumeCourseworkHtml(r) +
    '<div class="res-sec"><div class="res-sec-title">' +
    escapeHtml(r.experienceSectionTitle) +
    "</div>" +
    expItems +
    "</div>" +
    resumeProjectsHtml(r) +
    '<div class="res-sec"><div class="res-sec-title">' +
    escapeHtml(r.skillsSectionTitle) +
    '</div><div class="res-skills">' +
    skills +
    "</div></div>" +
    resumeExtrasHtml(r) +
    dl +
    "</div>"
  );
}

export function mountEngineeringFromConfig() {
  var pe = document.getElementById("pe");
  if (pe) pe.innerHTML = buildEngHomeInnerHtml();
  applyCrtRoomLayoutVars(document.getElementById("eng-stack-experience"));

  var res = document.getElementById("page-resume");
  if (res) res.innerHTML =
    engDetNav("page-home", "resume") +
    crtPageFrame("resume", "/resume", buildResumeInnerHtml());

  var bio = document.getElementById("page-biography");
  if (bio) bio.innerHTML =
    engDetNav("page-home", "resume") +
    buildBiographyInnerHtml();
}
