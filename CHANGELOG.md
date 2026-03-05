# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed
- Municipality logo now loads from local `./assets/tonsberg-logo.png` with cache-busting query parameters for GitHub Pages updates.
- Logo loading failures now reset logo-promise cache so a later render can retry successfully.
- QR rendering now keeps generated output even if logo overlay fails, with a clear status/error message.

### Changed
- Municipality logo overlay is now rendered as a rounded branded badge with circular clipping and a subtle responsive border.
- Preview canvas is centered with flexbox so margin/padding changes no longer appear top-left aligned in the preview panel.
- README documentation now references PNG logo usage, GitHub Pages cache behavior, and PR5.1 manual tests.

### Previous
- Added foreground/background color pickers to customize QR rendering colors.
- Added margin control to tune QR quiet-zone padding.
- Added a reset button to restore default generator settings.
