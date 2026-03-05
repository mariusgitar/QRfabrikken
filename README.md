# QR Studio

QR Studio is a lightweight static web app for generating branded QR codes directly in the browser.

## Features in PRx

- Enter any text or URL and generate a QR code.
- Styled QR rendering with **rounded dots** and **rounded corners** via `qr-code-styling` (CDN).
- Adjust output size from 512px to 1024px (default 768px) for better logo clarity.
- Choose error correction level: L, M, Q, or H.
- Customize foreground/background colors.
- Adjust QR margin (quiet zone).
- Toggle municipality-branded QR with centered Tønsberg kommune logo.
- Municipality logo mode automatically enforces error correction **H**.
- Download the current QR preview as a PNG file.
- Copy the current QR image to clipboard (if browser support is available).

## Project structure

- `index.html` — semantic UI layout + CDN dependency loading
- `styles.css` — responsive mobile-first styling and a11y focus states
- `assets/tonsberg-logo.png` — municipality logo asset used in QR center image (fallback raster logo)
- `src/app.js` — UI wiring and state/update flow
- `src/qr.js` — styled QR rendering helper (`qr-code-styling` instance lifecycle)
- `src/download.js` — PNG download and clipboard-copy helpers

## Run locally

No build tools or package installs are required.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## How to use

1. Enter text or a URL into the **Text or URL** field.
2. Tune **Size** (512–1024), **Error correction**, **Foreground**, **Background**, and **Margin**.
3. Optional: enable **Vis Tønsberg kommune-logo i QR**.
4. Click **Generate QR** (or type and wait for auto-update).
5. Click **Download PNG** to save the generated QR image.
6. Click **Copy image** to copy PNG data to clipboard (if supported by your browser).

## Municipality logo rules

- Preferred logo source is `assets/tonsberg-logo.svg` (vector) for maximum crispness.
- If SVG is unavailable, use `assets/tonsberg-logo.png` at `1024x1024` (minimum `512x512`) with a built-in circular white badge.
- Small QR pixel sizes can blur raster logos, so size is clamped to 512–1024.
- Only municipality logo is supported (no user logo upload or presets).
- Logo mode keeps robust settings (`hideBackgroundDots: true`) and scales logo footprint by QR size (`imageSize: 0.28 -> 0.33`, margin ~6 -> ~12).
- Logo mode enforces higher robustness with QR error correction level `H`.

## Manual test checklist (PRx)

- [x] Size slider starts at 512 and goes to 1024; values clamp correctly.
- [x] Enter a `https://` URL -> styled QR appears with rounded dots/corners.
- [x] Toggle logo on/off -> QR updates and centered municipality logo appears.
- [x] At size 512 -> logo looks acceptable and QR scans.
- [x] At size 1024 -> logo is crisp and QR scans.
- [x] Download PNG -> exported file scans and matches preview.
- [x] No console errors during normal flow.
