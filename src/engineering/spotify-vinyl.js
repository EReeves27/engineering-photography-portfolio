import { ENG_SPOTIFY } from "./config.js";

const VINYL_SLOT_COUNT = 5;
/** Pixels below the bottom edge of the vinyl frame before --crt-vinyl-tooltip-shift-y */
const TOOLTIP_GAP_PX = 8;

let vinylTooltipsBound = false;

/**
 * Fetch recent tracks from the Cloudflare Worker and patch vinyl cover images.
 * Slot 0 = left = most recent (matches Spotify API order).
 */
export function initSpotifyVinyl() {
  const url = (ENG_SPOTIFY.recentUrl || "").trim();
  initVinylTooltips();
  if (!url) return;

  function load() {
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        const tracks = Array.isArray(data?.tracks) ? data.tracks : [];
        if (tracks.length === 0 && data?.error) {
          console.warn("[spotify-vinyl]", data.error);
        }
        applyVinylCovers(tracks);
      })
      .catch(function (err) {
        console.warn("[spotify-vinyl] fetch failed:", err);
      });
  }

  load();
  const ms = ENG_SPOTIFY.refreshMs;
  if (ms > 0) {
    setInterval(load, ms);
  }
}

function initVinylTooltips() {
  if (vinylTooltipsBound) return;

  const stage = document.getElementById("stack-sticky-stage");
  const tooltip = document.getElementById("crt-vinyl-tooltip");
  if (!stage || !tooltip) return;

  const titleEl = tooltip.querySelector(".crt-vinyl-tooltip-title");
  const artistEl = tooltip.querySelector(".crt-vinyl-tooltip-artist");
  if (!titleEl || !artistEl) return;

  vinylTooltipsBound = true;

  function hideTooltip() {
    tooltip.hidden = true;
  }

  function showTooltip(slot) {
    const name = slot.getAttribute("data-track-name") || "";
    const artist = slot.getAttribute("data-track-artist") || "";
    if (!name) return;

    titleEl.textContent = name;
    artistEl.textContent = artist;
    artistEl.hidden = !artist;

    const rect = slot.getBoundingClientRect();
    tooltip.style.top = rect.bottom + TOOLTIP_GAP_PX + "px";
    tooltip.style.left = rect.left + rect.width / 2 + "px";
    tooltip.hidden = false;
  }

  stage.addEventListener("mouseover", function (e) {
    const slot = e.target.closest(".crt-vinyl-slot[data-track-name]");
    if (!slot) return;
    if (slot.contains(e.relatedTarget)) return;
    showTooltip(slot);
  });

  stage.addEventListener("mouseout", function (e) {
    const slot = e.target.closest(".crt-vinyl-slot[data-track-name]");
    if (!slot) return;
    if (slot.contains(e.relatedTarget)) return;
    hideTooltip();
  });
}

function applyVinylCovers(tracks) {
  const svg = document.getElementById("crt-room-svg");
  if (!svg) return;

  for (let i = 0; i < VINYL_SLOT_COUNT; i += 1) {
    const slot = svg.querySelector('.crt-vinyl-slot[data-vinyl-idx="' + i + '"]');
    if (!slot) continue;

    const track = tracks[i];
    const coverUrl = track?.coverUrl ? String(track.coverUrl).trim() : "";
    if (!coverUrl) continue;

    const sleeve = slot.querySelector(".crt-vinyl-sleeve");
    if (!sleeve) continue;

    const anchor = sleeve.querySelector(".crt-vinyl-art-slot");
    const ref = anchor || sleeve.querySelector("image.crt-vinyl-cover");
    if (!ref) continue;

    const x = ref.getAttribute("x");
    const y = ref.getAttribute("y");
    const size = ref.getAttribute("width");
    const clipId = "crt-vinyl-live-clip-" + i;

    let defs = svg.querySelector("defs.crt-vinyl-live-defs");
    if (!defs) {
      defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      defs.setAttribute("class", "crt-vinyl-live-defs");
      svg.insertBefore(defs, svg.firstChild);
    }

    let clip = defs.querySelector("#" + clipId);
    if (!clip) {
      clip = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
      clip.setAttribute("id", clipId);
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", size);
      rect.setAttribute("height", size);
      rect.setAttribute("rx", "1");
      clip.appendChild(rect);
      defs.appendChild(clip);
    }

    if (anchor) {
      anchor.remove();
    }

    let img = sleeve.querySelector("image.crt-vinyl-cover");
    if (!img) {
      img = document.createElementNS("http://www.w3.org/2000/svg", "image");
      img.setAttribute("class", "crt-vinyl-cover");
      img.setAttribute("preserveAspectRatio", "xMidYMid slice");
      sleeve.appendChild(img);
    }

    img.setAttribute("href", coverUrl);
    img.setAttributeNS("http://www.w3.org/1999/xlink", "href", coverUrl);
    img.setAttribute("x", x);
    img.setAttribute("y", y);
    img.setAttribute("width", size);
    img.setAttribute("height", size);
    img.setAttribute("clip-path", "url(#" + clipId + ")");

    let hit = slot.querySelector(".crt-vinyl-hit");
    if (!hit) {
      hit = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      hit.setAttribute("class", "crt-vinyl-hit");
      hit.setAttribute("fill", "transparent");
      hit.setAttribute("stroke", "none");
      slot.appendChild(hit);
    }
    const cover = Number(size);
    const pad = 8;
    const lipH = 10;
    hit.setAttribute("x", "0");
    hit.setAttribute("y", "0");
    hit.setAttribute("width", String(cover + pad * 2));
    hit.setAttribute("height", String(cover + pad * 2 + lipH));

    const name = track?.name ? String(track.name).trim() : "";
    const artist = track?.artist ? String(track.artist).trim() : "";
    if (name) {
      slot.setAttribute("data-track-name", name);
      slot.setAttribute("data-track-artist", artist);
    }

    const label = [name, artist].filter(Boolean).join(" — ");
    if (label) {
      slot.setAttribute("aria-label", label);
      img.setAttribute("aria-label", label);
    }
  }
}
