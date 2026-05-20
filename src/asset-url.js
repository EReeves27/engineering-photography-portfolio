/**
 * Resolve public asset paths for Vite `base` (GitHub project site subpath).
 * Config keeps logical paths like "/photos/album/file.jpg".
 */
export function assetUrl(path) {
  if (path == null || path === "") return path;
  const s = String(path);
  if (/^https?:\/\//i.test(s) || s.startsWith("data:")) return s;
  const base = import.meta.env.BASE_URL || "/";
  const rel = s.startsWith("/") ? s.slice(1) : s;
  return base + rel;
}
