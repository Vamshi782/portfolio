import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const here = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// `npm run build` writes to dist/, then scripts/publish-root.mjs copies it to the repo
// root, which GitHub Pages serves at vamshi-ai.me (CNAME and coursework.html stay put).
export default defineConfig({
  root: here("."),
  plugins: [react()],
  css: { postcss: { plugins: [tailwindcss({ config: here("./tailwind.config.js") }), autoprefixer()] } },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1200,
  },
});
