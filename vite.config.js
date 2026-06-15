import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const VIRTUAL_ID = "virtual:series-album-images";
const RESOLVED_VIRTUAL = "\0" + VIRTUAL_ID;

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif|heic|HEIC|bmp|tif|tiff)$/i;

/** Lists image files per `public/photos/<folder>/` (`home-photos`, `grad`, etc.). */
function scanAlbumFolders() {
  const photosRoot = path.join(__dirname, "public", "photos");
  /** @type {Record<string, string[]>} */
  const map = {};
  if (!fs.existsSync(photosRoot)) return map;
  for (const ent of fs.readdirSync(photosRoot, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    const dir = path.join(photosRoot, ent.name);
    let files;
    try {
      files = fs.readdirSync(dir).filter((f) => IMAGE_EXT.test(f));
    } catch {
      continue;
    }
    if (files.length === 0) continue;
    files.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base", numeric: true }));
    map[ent.name] = files;
  }
  return map;
}

function seriesAlbumImagesPlugin() {
  /** @param {import('vite').ViteDevServer} server */
  function invalidateOnPhotoChange(server, file) {
    const photosRoot = path.join(__dirname, "public", "photos");
    if (!file.startsWith(photosRoot)) return;
    const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL);
    if (mod) server.moduleGraph.invalidateModule(mod);
  }

  return {
    name: "series-album-images",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL;
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL) return null;
      const manifest = scanAlbumFolders();
      return "export const SERIES_ALBUM_IMAGES = " + JSON.stringify(manifest) + ";\n";
    },
    configureServer(server) {
      server.watcher.on("add", (file) => invalidateOnPhotoChange(server, file));
      server.watcher.on("unlink", (file) => invalidateOnPhotoChange(server, file));
      server.watcher.on("change", (file) => invalidateOnPhotoChange(server, file));
    },
  };
}

/**
 * Build-only Content-Security-Policy meta tag. Build-only so Vite's dev server
 * (HMR websocket, injected inline scripts) is left untouched.
 * `'unsafe-inline'` is required because the markup uses inline `onclick`/`style`
 * attributes; the policy still constrains script/style/img/font/connect origins.
 */
function cspMetaPlugin(env) {
  const recentUrl =
    env.VITE_SPOTIFY_RECENT_URL ||
    "https://eng-spotify-vinyl.ethanhreeves.workers.dev/recent";
  let workerOrigin = "";
  try {
    workerOrigin = new URL(recentUrl).origin;
  } catch {
    /* leave empty if unparseable */
  }
  const connect = ["'self'", "https://formspree.io"];
  if (workerOrigin) connect.push(workerOrigin);

  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
    "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
    "img-src 'self' data: https:",
    "connect-src " + connect.join(" "),
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  return {
    name: "inject-csp-meta",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const tag =
          '<meta http-equiv="Content-Security-Policy" content="' + csp + '">';
        return html.replace("</head>", "  " + tag + "\n</head>");
      },
    },
  };
}

// GitHub project site: https://ereeves27.github.io/engineering-photography-portfolio/
const repoBase = "/engineering-photography-portfolio/";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "VITE_");
  return {
  base: repoBase,
  root: ".",
  publicDir: "public",
  plugins: [seriesAlbumImagesPlugin(), cspMetaPlugin(env)],
  server: {
    proxy: {
      "/api/spotify": {
        target: "http://127.0.0.1:8787",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/spotify/, ""),
      },
    },
  },
  };
});
