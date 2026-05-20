#!/usr/bin/env node
/**
 * One-time Spotify login → prints refresh token for Cloudflare Worker secrets.
 * Uses Authorization Code flow (client secret on token exchange), matching the Worker.
 *
 * Prerequisites:
 * - Spotify app redirect URI: http://127.0.0.1:8788/callback
 * - Scope: user-read-recently-played
 *
 * Usage:
 *   SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-auth.mjs
 * Or put IDs in .env at repo root (not committed).
 */

import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { randomBytes } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PORT = 8788;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPE = "user-read-recently-played";

function loadEnvFile() {
  const envPath = join(ROOT, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

function base64Url(buf) {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

loadEnvFile();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error(
    "Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env or the environment."
  );
  process.exit(1);
}

const state = base64Url(randomBytes(16));

const authUrl = new URL("https://accounts.spotify.com/authorize");
authUrl.searchParams.set("client_id", clientId);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authUrl.searchParams.set("scope", SCOPE);
authUrl.searchParams.set("state", state);
authUrl.searchParams.set("prompt", "consent");

function html(body) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Spotify auth</title></head><body>${body}</body></html>`;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);

  if (url.pathname === "/") {
    res.writeHead(302, { Location: authUrl.toString() });
    res.end();
    return;
  }

  if (url.pathname !== "/callback") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
    return;
  }

  const err = url.searchParams.get("error");
  if (err) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end(html(`<p>Spotify error: ${err}</p>`));
    server.close();
    return;
  }

  if (url.searchParams.get("state") !== state) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end(html("<p>Invalid state — try again.</p>"));
    server.close();
    return;
  }

  const code = url.searchParams.get("code");
  if (!code) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end(html("<p>Missing authorization code.</p>"));
    server.close();
    return;
  }

  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basic}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });
    const tokens = await tokenRes.json();
    if (!tokenRes.ok) {
      throw new Error(tokens.error_description || tokens.error || "Token exchange failed");
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      html(
        "<p><strong>Success.</strong> You can close this tab and return to the terminal.</p>"
      )
    );

    console.log("\n--- Spotify tokens ---\n");
    if (tokens.refresh_token) {
      console.log("Refresh token (save as Worker secret SPOTIFY_REFRESH_TOKEN):\n");
      console.log(tokens.refresh_token);
      console.log(
        "\nRun in spotify-worker/:\n  npx wrangler secret put SPOTIFY_REFRESH_TOKEN\n"
      );
    } else {
      console.log("No refresh_token in response. You may need to re-authorize with prompt=consent.");
      console.log(JSON.stringify(tokens, null, 2));
    }
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end(html(`<p>${e.message}</p>`));
    console.error(e);
  }

  server.close();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Open http://127.0.0.1:${PORT}/ to sign in to Spotify.`);
  console.log(`Redirect URI must be: ${REDIRECT_URI}`);
});
