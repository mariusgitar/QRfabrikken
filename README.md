# QR Studio

QR Studio is a lightweight, dependency-free static web app for generating QR codes directly in the browser.

## Features in PR #5

- Enter any text or URL and generate a QR code.
- Adjust output size from 128px to 512px.
- Choose error correction level: L, M, Q, or H.
- Customize foreground/background colors.
- Adjust QR margin (quiet zone).
- Toggle municipality-branded QR with optional Tønsberg kommune logo.
- Reset all settings to safe defaults.
- Download the current QR preview as a PNG file.
- Copy the current QR image to clipboard with graceful fallback messaging.

## Project structure

- `index.html` — semantic UI layout
- `styles.css` — responsive mobile-first styling and a11y focus states
- `assets/tonsberg-logo.png` — municipality logo asset used in QR overlay
- `src/app.js` — UI wiring and state/update flow
- `src/qr.js` — QR rendering helper pipeline
- `src/logo.js` — municipality logo overlay drawing logic
- `src/download.js` — PNG download and clipboard-copy helpers
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow

## Run locally

No build tools or package installs are required.

### Option 1: Python server (recommended)

1. Open a terminal in the project root.
2. Run:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

### Option 2: Open file directly

1. Open `index.html` in your browser.
2. The page should still work because dependencies are loaded via CDN.

## How to use

1. Enter text or a URL into the **Text or URL** field.
2. Tune **Size**, **Error correction**, **Foreground**, **Background**, and **Margin**.
3. Optional: enable **Vis Tønsberg kommune-logo i QR**.
4. Click **Generate QR** (or type and wait for auto-update).
5. Click **Download PNG** to save the generated QR image.
6. Click **Copy image** to copy PNG data to clipboard (if supported by your browser).
7. Click **Reset to defaults** to restore baseline settings.

## Kommunelogo i QR

Når kommunen-logo brukes i midten av en QR-kode, dekkes noe av kodens dataflate. Derfor settes feilkorreksjon automatisk til **H** for å gi høyest mulig robusthet mot tildekking.

Designvalg i denne løsningen:
- Logoen har fast størrelse på omtrent **16% av QR-bredden**.
- Det tegnes en **hvit sirkulær bakgrunn** bak logoen for bedre kontrast og lesbarhet.
- Kun **Tønsberg kommune-logo** støttes i prosjektet. Opplasting av egne logoer er ikke tilgjengelig.
- Logoen må ligge lokalt på `assets/tonsberg-logo.png`.
- GitHub Pages-cache håndteres med innebygd cache-busting via `APP_ASSET_VERSION` i `src/logo.js`, slik at oppdateringer med samme filnavn kan hentes etter versjonsbump + refresh.

Skanningsanbefalinger:
- Bruk mørk forgrunn og lys bakgrunn for best kontrast.
- Unngå ekstremt liten QR-størrelse hvis logo er aktivert.
- Test alltid skanning på minst én mobilkamera-app før publisering.

## Deploy to GitHub Pages

Deployment is automated through GitHub Actions.

1. Ensure GitHub Pages is configured to use **GitHub Actions** as the source.
2. Merge changes into `main`.
3. The workflow in `.github/workflows/pages.yml` publishes the repository root.
4. Open the generated `github-pages` environment URL.

## Manual test checklist (PR5.2)

- [x] Generate QR from a URL with logo toggle **OFF** -> QR renders and scans.
- [x] Toggle logo **ON** -> logo from `assets/tonsberg-logo.png` appears as a rounded badge with subtle border and QR still scans.
- [x] Bump `APP_ASSET_VERSION` and refresh -> updated `assets/tonsberg-logo.png` appears (cache-busting).
- [x] Change margin/size -> QR preview stays visually centered in the preview card.
- [x] Download PNG works and browser console stays free of errors during normal flow.
