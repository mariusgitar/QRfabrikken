# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Added optional municipality logo toggle: **Vis Tønsberg kommune-logo i QR**.
- Added dedicated municipality logo asset at `assets/tonsberg-logo.svg`.
- Added `src/logo.js` to load and draw the municipality logo with a white circular background.

### Changed
- Updated QR render pipeline to overlay municipality logo in the center when enabled.
- Enforced automatic error-correction level `H` while municipality logo is enabled.
- Updated README with “Kommunelogo i QR”, scanning guidance, and PR #5 manual tests.

### Previous
- Added foreground/background color pickers to customize QR rendering colors.
- Added margin control to tune QR quiet-zone padding.
- Added a reset button to restore default generator settings.
