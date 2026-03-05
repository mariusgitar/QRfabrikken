# QR Studio

QR Studio is a lightweight static web app for generating branded QR codes directly in the browser.

## Features in PR #7

- Enter any text or URL and generate a QR code.
- Styled QR rendering with **rounded dots** and **rounded corners** via `qr-code-styling` (CDN).
- Adjust output size from 128px to 512px.
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
- `assets/tonsberg-logo.png` — municipality logo asset used in QR center image
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
2. Tune **Size**, **Error correction**, **Foreground**, **Background**, and **Margin**.
3. Optional: enable **Vis Tønsberg kommune-logo i QR**.
4. Click **Generate QR** (or type and wait for auto-update).
5. Click **Download PNG** to save the generated QR image.
6. Click **Copy image** to copy PNG data to clipboard (if supported by your browser).

## Municipality logo rules

- Only local `./assets/tonsberg-logo.png` is supported.
- No user logo upload is supported.
- Logo mode uses conservative image settings (`imageSize: 0.35`, `imageOptions.margin: 6`).
- Logo mode enforces higher robustness with QR error correction level `H`.

## Manual test checklist (PR7)

- [x] Enter a `https://` URL -> styled QR appears with rounded dots/corners.
- [x] Toggle logo -> centered municipality logo appears and QR remains scannable.
- [x] Change size/margin/colors -> QR updates immediately.
- [x] Download PNG -> file downloads and scans.
- [x] No console errors during normal flow.
