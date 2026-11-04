# mathepark7

MathePark 7 – Lehrer-Edition (Realschule Bayern, Jg. 7): eine einzelne HTML-Datei
(`MathePark7_Lehrer-Edition-3.html`), die komplett **offline** läuft.

## Dateien
- `MathePark7_Lehrer-Edition-3.html` – die App (lädt `vendor/app.bundle.js`)
- `vendor/app.bundle.js` – gebündelte Bibliotheken (React, three.js, @react-three/*, framer-motion), gebaut aus dem Inline-JSX (`<script type="text/plain" id="mp7-src">`)
- `tools/build.mjs` + `package.json` – Build-Skript

## Nach Änderungen am App-Code
```bash
npm install     # einmalig (esbuild)
npm run build   # baut vendor/app.bundle.js neu
```
Dann genügt wieder „Doppelt anklicken" – kein Internet nötig (funktioniert auch auf dem iPad offline, z. B. per AirDrop oder lokalem Server).
