# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Switched QR rendering engine from `qrious` to `qr-code-styling` via CDN for branded styles.
- Added styled QR output with rounded dots (`dotsOptions.type=rounded`) and rounded finder corners.
- Added single shared `QRCodeStyling` instance lifecycle (create once, update on every control change).

### Changed
- Replaced canvas preview element with a container-based preview (`#qr-preview`) used by `qr-code-styling`.
- Updated municipality logo behavior to use built-in center image embedding from local `./assets/tonsberg-logo.png`.
- Enforced error correction level `H` when municipality logo is enabled.
- Updated download/copy actions to use `qr-code-styling` APIs (`download`, `getRawData`).
- Updated README with styled QR behavior and PR7 manual checks.

### Removed
- Removed manual logo overlay drawing pipeline used by previous canvas-based rendering.

### Previous
- Added foreground/background color pickers to customize QR rendering colors.
- Added margin control to tune QR quiet-zone padding.
- Added a reset button to restore default generator settings.
