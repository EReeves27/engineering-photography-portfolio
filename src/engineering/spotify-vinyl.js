import { ENG_SPOTIFY } from "./config.js";
import { setVinylCover } from "./crt-room.js";

const VINYL_SLOT_COUNT = 5;
/** Pixels below the bottom edge of the vinyl frame before --crt-vinyl-tooltip-shift-y */
const TOOLTIP_GAP_PX = 8;

let vinylTooltipsBound = false;

/**
 * Fetch recent tracks from the Cloudflare Worker and fill the vinyl frames.
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

/** Delay before name/artist text fades in after a touch tap. */
const TOUCH_CONTENT_DELAY_MS = 2000;

function initVinylTooltips() {
  if (vinylTooltipsBound) return;

  const stage = document.getElementById("stack-sticky-stage");
  const tooltip = document.getElementById("crt-vinyl-tooltip");
  if (!stage || !tooltip) return;

  const titleEl = tooltip.querySelector(".crt-vinyl-tooltip-title");
  const artistEl = tooltip.querySelector(".crt-vinyl-tooltip-artist");
  if (!titleEl || !artistEl) return;

  vinylTooltipsBound = true;

  let contentTimer = null;
  let activeTapSlot = null;
  const canHover =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function clearContentTimer() {
    if (contentTimer != null) {
      clearTimeout(contentTimer);
      contentTimer = null;
    }
  }

  function hideTooltip() {
    clearContentTimer();
    activeTapSlot = null;
    tooltip.classList.remove("crt-vinyl-tooltip--awaiting");
    tooltip.hidden = true;
  }

  function positionTooltip(slot) {
    const rect = slot.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    tooltip.style.top = rect.bottom - stageRect.top + TOOLTIP_GAP_PX + "px";
    tooltip.style.left = rect.left - stageRect.left + rect.width / 2 + "px";
  }

  function fillTooltip(slot) {
    const name = slot.getAttribute("data-track-name") || "";
    const artist = slot.getAttribute("data-track-artist") || "";
    if (!name) return false;
    titleEl.textContent = name;
    artistEl.textContent = artist;
    artistEl.hidden = !artist;
    return true;
  }

  /** Immediate box + text (desktop hover). */
  function showTooltip(slot) {
    clearContentTimer();
    if (!fillTooltip(slot)) return;
    tooltip.classList.remove("crt-vinyl-tooltip--awaiting");
    positionTooltip(slot);
    tooltip.hidden = false;
  }

  /**
   * Touch: show the empty-sized box right away, then fade in name/artist
   * after TOUCH_CONTENT_DELAY_MS.
   */
  function showTooltipFromTap(slot) {
    clearContentTimer();
    if (!fillTooltip(slot)) return;
    activeTapSlot = slot;
    tooltip.classList.add("crt-vinyl-tooltip--awaiting");
    positionTooltip(slot);
    tooltip.hidden = false;
    contentTimer = setTimeout(function () {
      contentTimer = null;
      tooltip.classList.remove("crt-vinyl-tooltip--awaiting");
    }, TOUCH_CONTENT_DELAY_MS);
  }

  if (canHover) {
    stage.addEventListener("mouseover", function (e) {
      const slot = e.target.closest(".crt-vinyl-slot[data-track-name]");
      if (!slot) return;
      if (slot.contains(e.relatedTarget)) return;
      activeTapSlot = null;
      showTooltip(slot);
    });

    stage.addEventListener("mouseout", function (e) {
      const slot = e.target.closest(".crt-vinyl-slot[data-track-name]");
      if (!slot) return;
      if (slot.contains(e.relatedTarget)) return;
      hideTooltip();
    });
  }

  // Tap-to-show for touch / coarse pointers (iPhone, etc.)
  stage.addEventListener(
    "click",
    function (e) {
      const slot = e.target.closest(".crt-vinyl-slot[data-track-name]");
      if (!slot) return;
      // Fine-pointer hover devices already get mouseover; ignore clicks there.
      if (canHover) return;

      e.stopPropagation();
      if (activeTapSlot === slot && !tooltip.hidden) {
        hideTooltip();
        return;
      }
      showTooltipFromTap(slot);
    },
    true
  );

  // Dismiss when tapping anywhere else (room stage is mostly non-interactive).
  document.addEventListener(
    "click",
    function (e) {
      if (!activeTapSlot || tooltip.hidden) return;
      if (e.target.closest(".crt-vinyl-slot[data-track-name]")) return;
      hideTooltip();
    },
    true
  );
}

/**
 * Covers are pixelated into the room canvas by crt-room.js; the HTML slot over
 * each frame carries the track data the tooltip reads.
 */
function applyVinylCovers(tracks) {
  for (let i = 0; i < VINYL_SLOT_COUNT; i += 1) {
    const slot = document.querySelector('.crt-vinyl-slot[data-vinyl-idx="' + i + '"]');
    if (!slot) continue;

    const track = tracks[i];
    const coverUrl = track?.coverUrl ? String(track.coverUrl).trim() : "";
    if (!coverUrl) continue;

    setVinylCover(i, coverUrl);

    const name = track?.name ? String(track.name).trim() : "";
    const artist = track?.artist ? String(track.artist).trim() : "";
    if (name) {
      slot.setAttribute("data-track-name", name);
      slot.setAttribute("data-track-artist", artist);
    }

    const label = [name, artist].filter(Boolean).join(" — ");
    if (label) {
      slot.setAttribute("role", "img");
      slot.setAttribute("aria-label", label);
    }
  }
}
