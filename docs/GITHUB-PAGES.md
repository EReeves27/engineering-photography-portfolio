# GitHub Pages deploy

The site is built with Vite and deployed automatically from `main` via GitHub Actions.

## One-time GitHub settings

1. **Settings → Pages → Build and deployment**
   - **Source:** GitHub Actions (not “Deploy from a branch”).

2. **Optional — Spotify vinyl on production**  
   **Settings → Secrets and variables → Actions → Variables**  
   Add:
   - Name: `VITE_SPOTIFY_RECENT_URL`  
   - Value: `https://eng-spotify-vinyl.<your-subdomain>.workers.dev/recent`

3. **Cloudflare Worker CORS** (`spotify-worker/wrangler.toml`) must include:
   - `https://ereeves27.github.io` (no `/engineering-photography-portfolio` path)  
   Then `npm run deploy` in `spotify-worker/`.

## Live URL

https://ereeves27.github.io/engineering-photography-portfolio/

After pushing to `main`, check **Actions** → “Deploy GitHub Pages”. First deploy may take a few minutes.

## Local dev

Vite `base` is set for GitHub Pages. Local preview:

```bash
npm run build
npm run preview
```

Open the URL `preview` prints (assets use the same base path).

For day-to-day dev with hot reload, `npm run dev` still works at `http://localhost:5173/`.
