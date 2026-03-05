# QR Studio

QR Studio is a lightweight, dependency-free static web app for generating QR codes directly in the browser.

## Features in PR #2

- Enter any text or URL and generate a QR code.
- Adjust output size from 128px to 512px.
- Choose error correction level: L, M, Q, or H.
- Instant preview updates with helpful inline status messages.

## Project structure

- `index.html` — semantic UI layout
- `styles.css` — responsive mobile-first styling
- `src/app.js` — UI wiring and state/update flow
- `src/qr.js` — QR rendering helper logic
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow

## Run locally

No build tools or package installs are required.

### Option 1: Python server (recommended)

1. Open a terminal in the project root.
2. Run:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

### Option 2: Open file directly

1. Open `index.html` in your browser.
2. The page should still work because dependencies are loaded via CDN.

## How to use

1. Enter text or a URL into the **Text or URL** field.
2. Click **Generate QR** (or just type and wait for auto-update).
3. Use the **Size** slider to change output dimensions.
4. Select an **Error correction** level (L/M/Q/H).
5. Confirm the preview canvas updates and status text reports success.

## Deploy to GitHub Pages

Deployment is automated through GitHub Actions.

1. Ensure GitHub Pages is configured to use **GitHub Actions** as the source.
2. Merge changes into `main`.
3. The workflow in `.github/workflows/pages.yml` publishes the repository root.
4. Open the generated `github-pages` environment URL.

## Manual test checklist (PR #2)

- [x] Enter a URL → QR appears.
- [x] Change size → QR updates.
- [x] Change error correction → QR updates.
- [x] Empty input clears preview and shows guidance.
- [x] No console errors.
