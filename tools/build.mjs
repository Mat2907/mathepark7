// Baut vendor/app.bundle.js aus dem Inline-JSX der HTML-Datei.
// Ablauf:  npm install   (installiert esbuild als devDependency)
//         npm run build
// Danach laeuft die App komplett offline (keine CDN-Abhänigkeiten mehr).
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = join(root, "MathePark7_Lehrer-Edition-3.html");
const src = readFileSync(htmlPath, "utf8");
const m = src.match(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>\s*<\/body>/);
if (!m) throw new Error("Inline-JSX (text/babel) nicht gefunden");
const tmp = join(root, "tools", ".app-src.tmp.jsx");
writeFileSync(tmp, m[1]);
mkdirSync(join(root, "vendor"), { recursive: true });
try {
  execFileSync("npx", ["esbuild", tmp, "--bundle", "--minify", "--format=esm", "--jsx=transform", "--outfile=" + join(root, "vendor", "app.bundle.js"), "--log-level=warning"], { cwd: root, stdio: "inherit" });
  console.log("OK -> vendor/app.bundle.js");
} finally {
  try { execFileSync("rm", ["-f", tmp]); } catch (e) {}
}
