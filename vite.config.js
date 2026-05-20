import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

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

// GitHub project site: https://ereeves27.github.io/engineering-photography-portfolio/
const repoBase = "/engineering-photography-portfolio/";

export default defineConfig({
  base: repoBase,
  root: ".",
  publicDir: "public",
  plugins: [seriesAlbumImagesPlugin()],
  server: {
    proxy: {
      "/api/spotify": {
        target: "http://127.0.0.1:8787",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/spotify/, ""),
      },
    },
  },
});
