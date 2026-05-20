# Spotify vinyl covers

The CRT room’s top-row vinyl frames show your **5 most recently played** Spotify tracks (newest on the **left**). Cover art is loaded at runtime via a small **Cloudflare Worker** so secrets never ship to GitHub Pages.

## 1. Spotify Developer app

1. [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) → Create app → enable **Web API**.
2. **Redirect URI:** `http://127.0.0.1:8788/callback` (exact; `localhost` is often blocked).
3. Copy **Client ID** and **Client Secret**.

## 2. Refresh token (one time)

```bash
cp .env.example .env
# Edit .env: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET

npm run spotify:auth
```

Sign in in the browser. Copy the **refresh token** from the terminal.

## 3. Cloudflare Worker

```bash
cd spotify-worker
npm install
cp .dev.vars.example .dev.vars
# Edit .dev.vars with CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN

# Allow your site origins (comma-separated, no trailing slashes):
# Edit wrangler.toml [vars] ALLOWED_ORIGINS, e.g.:
# ALLOWED_ORIGINS = "https://yourname.github.io,http://localhost:5173"

npx wrangler secret put SPOTIFY_CLIENT_ID
npx wrangler secret put SPOTIFY_CLIENT_SECRET
npx wrangler secret put SPOTIFY_REFRESH_TOKEN

npm run deploy
```

The Worker stores a **rotated** refresh token in Cloudflare KV when Spotify issues a new one (so you do not need to update the secret every time).

Note the URL, e.g. `https://eng-spotify-vinyl.<subdomain>.workers.dev/recent`.

Test:

```bash
curl "https://eng-spotify-vinyl.<subdomain>.workers.dev/recent"
```

## 4. Portfolio env

In repo root `.env`:

```env
# Production
VITE_SPOTIFY_RECENT_URL=https://eng-spotify-vinyl.<subdomain>.workers.dev/recent
```

For **local dev**, run the Worker in another terminal (`npm run spotify:dev` from repo root) and use:

```env
VITE_SPOTIFY_RECENT_URL=/api/spotify/recent
```

GitHub Pages: add `VITE_SPOTIFY_RECENT_URL` as a repository **Actions variable** (Settings → Secrets and variables → Actions). See [GITHUB-PAGES.md](./GITHUB-PAGES.md).

## 5. Run

```bash
npm run dev
```

Switch to engineering home; vinyl covers should fill after a short fetch. If the Worker URL is unset, gray placeholders remain (no error).

## Troubleshooting

| Issue | Fix |
|--------|-----|
| CORS error in browser | Add your exact `https://….github.io` origin to `ALLOWED_ORIGINS` in `spotify-worker/wrangler.toml`, redeploy |
| `502` / missing secrets | Run the three `wrangler secret put` commands |
| No refresh token from auth | Re-run `npm run spotify:auth`; ensure redirect URI matches exactly |
| Empty `tracks` | Play something on Spotify, wait a moment, reload |
| `Refresh token revoked` / `invalid_grant` | Re-run `npm run spotify:auth`, then `npx wrangler secret put SPOTIFY_REFRESH_TOKEN`, then `npm run deploy` in `spotify-worker/`. Do not reset the Client Secret in the Spotify Dashboard unless you also re-auth. If it keeps happening, clear stale KV: `npx wrangler kv key delete --binding=SPOTIFY_KV refresh_token` (Worker falls back to the secret). |

### Why tokens were revoking

The auth script used **PKCE** (no client secret on token exchange) while the Worker refreshed with **Basic auth + client secret**. That mismatch can break refreshes and look like a revoked token. Auth now uses the standard Authorization Code flow (same as the Worker). After pulling this fix, **get a new refresh token once** with `npm run spotify:auth`.
