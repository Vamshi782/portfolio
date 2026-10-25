// Copies the Vite build (dist/) into the repo root for GitHub Pages.
// Only replaces what the build owns: index.html, assets/, img/, favicon and the résumé PDF.
import { cpSync, rmSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const root = fileURLToPath(new URL("../../", import.meta.url));

rmSync(root + "assets", { recursive: true, force: true });
for (const entry of readdirSync(dist)) {
  cpSync(dist + entry, root + entry, { recursive: true });
}
console.log("published", readdirSync(dist).join(", "), "→", root);
