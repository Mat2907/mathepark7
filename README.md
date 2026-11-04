# mathepark7

MathePark 7 – Lehrer-Edition (Realschule Bayern, Jg. 7).

**`MathePark7_Lehrer-Edition-3.html` ist eine einzelne, allein lauffähige Datei** –
das komplette JS-Bundle (React, three.js, @react-three/*, framer-motion) ist inline
eingebettet. Einfach doppelt anklicken / per AirDrop aufs iPad – **kein Internet nötig**.

## Aufbau der Datei
- `script#mp7-src` (`text/plain`) – der les-/editierbare JSX-Quelltext der App
- `script#mp7-bundle` (`module`) – das daraus gebaute, minifizierte Bundle (wird ausgeführt)

## Nach Änderungen am App-Code
```bash
npm install     # einmalig (esbuild als devDependency)
npm run build   # baut script#mp7-bundle in der HTML neu aus script#mp7-src
```

`vendor/app.bundle.js` ist nur ein optionaler externer Fallback und wird nicht mehr
von der HTML geladen.
