// Baut das Inline-Bundle in der HTML-Datei neu aus dem Inline-JSX.
// Ablauf:  npm install   (einmalig, installiert esbuild)
//          npm run build
// Danach ist MathePark7_Lehrer-Edition-3.html wieder eine ALLEIN lauffähige Datei
// (Single-File, komplett offline – vendor/ ist nur noch optionaler Fallback).
import { readFileSync, writeFileSync } from "fs";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = join(root, "MathePark7_Lehrer-Edition-3.html");
let html = readFileSync(htmlPath, "utf8");
const m = html.match(/<script type="text\/plain" id="mp7-src">([\s\S]*?)<\/script>/);
if (!m) throw new Error("Inline-JSX (script#mp7-src) nicht gefunden");
const tmp = join(root, "tools", ".app-src.tmp.jsx");
writeFileSync(tmp, m[1]);
let bundle;
try {
  execFileSync("npx", ["esbuild", tmp, "--bundle", "--minify", "--format=esm", "--jsx=transform", "--outfile=stdout", "--log-level=error"], { cwd: root, stdio: ["ignore", "pipe", "inherit"] });
  bundle = execFileSync("npx", ["esbuild", tmp, "--bundle", "--minify", "--format=esm", "--jsx=transform", "--outfile=stdout", "--log-level=error"], { cwd: root, maxBuffer: 64 * 1024 * 1024 }).toString("utf8");
} finally {
  try { execFileSync("rm", ["-f", tmp]); } catch (e) {}
}
// </script> escapen, damit das Inline-Skript nicht vorzeitig endet
const esc = bundle.replaceAll("</script", "<\\/script");
const re = /<script type="module" id="mp7-bundle">([\s\S]*?)<\/script>/;
if (!re.test(html)) throw new Error("Bundle-Platzhalter (script#mp7-bundle) nicht gefunden");
html = html.replace(re, '<script type="module" id="mp7-bundle">\n' + esc + '\n</script>');
writeFileSync(htmlPath, html);
console.log("OK -> Inline-Bundle in MathePark7_Lehrer-Edition-3.html aktualisiert (" + Math.round(html.length / 1024) + " KB)");
