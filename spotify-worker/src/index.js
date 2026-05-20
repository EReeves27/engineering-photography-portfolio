/**
 * Spotify proxy for portfolio vinyl covers.
 * GET /recent → { tracks: [{ coverUrl, name, artist }] } (newest first, up to 5)
 *
 * Secrets: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 * KV (optional): stores rotated refresh_token when Spotify issues a new one
 */

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_RECENT_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=5";
const KV_REFRESH_KEY = "refresh_token";

function parseAllowedOrigins(env) {
  const raw = env.ALLOWED_ORIGINS || "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowed = parseAllowedOrigins(env);
  const headers = {
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
  if (origin && allowed.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers.Vary = "Origin";
  }
  return headers;
}

function jsonResponse(body, status, extraHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=60",
      ...extraHeaders,
    },
  });
}

async function getRefreshToken(env) {
  if (env.SPOTIFY_KV) {
    const fromKv = await env.SPOTIFY_KV.get(KV_REFRESH_KEY);
    if (fromKv) return fromKv;
  }
  return env.SPOTIFY_REFRESH_TOKEN;
}

async function saveRefreshToken(env, refreshToken) {
  if (!refreshToken) return;
  if (env.SPOTIFY_KV) {
    await env.SPOTIFY_KV.put(KV_REFRESH_KEY, refreshToken);
  }
}

/**
 * Refresh access token. Uses Authorization Code style (Basic auth) to match
 * `npm run spotify:auth`. Persists a new refresh_token to KV when Spotify rotates it.
 */
async function refreshAccessToken(env) {
  const clientId = env.SPOTIFY_CLIENT_ID;
  const clientSecret = env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = await getRefreshToken(env);
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Spotify secrets on Worker");
  }

  const basic = btoa(`${clientId}:${clientSecret}`);
  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data.error_description || data.error || "Token refresh failed";
    throw new Error(msg);
  }

  if (data.refresh_token) {
    await saveRefreshToken(env, data.refresh_token);
  }

  return data.access_token;
}

function pickCoverUrl(album) {
  const images = album?.images || [];
  if (images.length === 0) return "";
  return images[1]?.url || images[0]?.url || "";
}

async function fetchRecentTracks(accessToken) {
  const res = await fetch(SPOTIFY_RECENT_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || "Recently played request failed");
  }

  const items = Array.isArray(data.items) ? data.items : [];
  return items.map((item) => {
    const track = item.track || {};
    const album = track.album || {};
    return {
      coverUrl: pickCoverUrl(album),
      name: track.name || "",
      artist: track.artists?.[0]?.name || "",
    };
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "GET") {
      return jsonResponse({ tracks: [], error: "Method not allowed" }, 405, cors);
    }

    if (url.pathname !== "/recent" && url.pathname !== "/") {
      return jsonResponse({ tracks: [], error: "Not found" }, 404, cors);
    }

    try {
      const accessToken = await refreshAccessToken(env);
      const tracks = await fetchRecentTracks(accessToken);
      return jsonResponse({ tracks }, 200, cors);
    } catch (err) {
      return jsonResponse(
        { tracks: [], error: err.message || "Spotify error" },
        502,
        cors
      );
    }
  },
};
