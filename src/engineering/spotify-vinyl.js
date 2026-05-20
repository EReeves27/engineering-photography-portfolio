import { ENG_SPOTIFY } from "./config.js";

const VINYL_SLOT_COUNT = 5;

/**
 * Fetch recent tracks from the Cloudflare Worker and patch vinyl cover images.
 * Slot 0 = left = most recent (matches Spotify API order).
 */
export function initSpotifyVinyl() {
  const url = (ENG_SPOTIFY.recentUrl || "").trim();
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

function applyVinylCovers(tracks) {
  const svg = document.getElementById("crt-room-svg");
  if (!svg) return;

  for (let i = 0; i < VINYL_SLOT_COUNT; i += 1) {
    const slot = svg.querySelector('.crt-vinyl-slot[data-vinyl-idx="' + i + '"]');
    if (!slot) continue;

    const track = tracks[i];
    const coverUrl = track?.coverUrl ? String(track.coverUrl).trim() : "";
    if (!coverUrl) continue;

    const placeholder = slot.querySelector(".crt-vinyl-art-slot");
    if (!placeholder) continue;

    const x = placeholder.getAttribute("x");
    const y = placeholder.getAttribute("y");
    const size = placeholder.getAttribute("width");
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

    let img = slot.querySelector("image.crt-vinyl-cover");
    if (!img) {
      img = document.createElementNS("http://www.w3.org/2000/svg", "image");
      img.setAttribute("class", "crt-vinyl-cover");
      img.setAttribute("preserveAspectRatio", "xMidYMid slice");
      slot.insertBefore(img, placeholder.nextSibling);
    }

    img.setAttribute("href", coverUrl);
    img.setAttributeNS("http://www.w3.org/1999/xlink", "href", coverUrl);
    img.setAttribute("x", x);
    img.setAttribute("y", y);
    img.setAttribute("width", size);
    img.setAttribute("height", size);
    img.setAttribute("clip-path", "url(#" + clipId + ")");

    const label = [track.name, track.artist].filter(Boolean).join(" — ");
    if (label) {
      slot.setAttribute("aria-label", label);
      img.setAttribute("aria-label", label);
    }
  }
}
