# QR Studio

QR Studio is a minimal, dependency-free static web app scaffold for a future QR code generator.

This PR establishes a clean UI skeleton only:
- Content input area
- Placeholder settings controls
- Preview area
- Action buttons

No QR generation functionality is implemented yet.

## Project structure

- `index.html` — semantic layout and placeholder UI sections
- `styles.css` — responsive, mobile-first styling
- `src/app.js` — startup wiring via `DOMContentLoaded`
- `.github/workflows/pages.yml` — automatic deployment to GitHub Pages

## Run locally

You can run this project without any build tools.

### Option 1: Python local server (recommended)

1. Open a terminal in the project root.
2. Run:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

### Option 2: Open file directly

1. Open `index.html` directly in your browser.
2. Verify the page renders the same scaffold layout.

## Deploy to GitHub Pages

Deployment is automated through GitHub Actions.

1. Ensure GitHub Pages is configured to use **GitHub Actions** as the source.
2. Merge changes into `main`.
3. The workflow in `.github/workflows/pages.yml` publishes the repository root as a static artifact.
4. Open the generated `github-pages` environment URL to verify deployment.

## Manual test checklist (PR #1)

- [x] Open `index.html` locally and verify layout loads without console errors.
- [x] After merge, GitHub Pages shows the same page.
