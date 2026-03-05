# QR Studio

QR Studio is a lightweight, dependency-free static web app for generating QR codes directly in the browser.

## Features in PR #4

- Enter any text or URL and generate a QR code.
- Adjust output size from 128px to 512px.
- Choose error correction level: L, M, Q, or H.
- Customize foreground/background colors.
- Adjust QR margin (quiet zone).
- Reset all settings to safe defaults.
- Download the current QR preview as a PNG file.
- Copy the current QR image to clipboard with graceful fallback messaging.

## Project structure

- `index.html` — semantic UI layout
- `styles.css` — responsive mobile-first styling and a11y focus states
- `src/app.js` — UI wiring and state/update flow
- `src/qr.js` — QR rendering helper logic
- `src/download.js` — PNG download and clipboard-copy helpers
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
2. Tune **Size**, **Error correction**, **Foreground**, **Background**, and **Margin**.
3. Click **Generate QR** (or type and wait for auto-update).
4. Click **Download PNG** to save the generated QR image.
5. Click **Copy image** to copy PNG data to clipboard (if supported by your browser).
6. Click **Reset to defaults** to restore baseline settings.

## Deploy to GitHub Pages

Deployment is automated through GitHub Actions.

1. Ensure GitHub Pages is configured to use **GitHub Actions** as the source.
2. Merge changes into `main`.
3. The workflow in `.github/workflows/pages.yml` publishes the repository root.
4. Open the generated `github-pages` environment URL.

## Manual test checklist (PR #4)

- [x] Changing colors updates QR.
- [x] Background color actually affects canvas.
- [x] Margin changes QR quiet zone.
- [x] Reset restores defaults.

## Screenshots

- Optional for local review: capture a screenshot after generating a QR and changing colors/margin.
