# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Added QR size guidance text in UI: "Tips: Bruk 512–1024 for skarp logo og trykk." under the size slider.
- Switched QR rendering engine from `qrious` to `qr-code-styling` via CDN for branded styles.
- Added styled QR output with rounded dots (`dotsOptions.type=rounded`) and rounded finder corners.
- Added single shared `QRCodeStyling` instance lifecycle (create once, update on every control change).

### Changed
- Replaced canvas preview element with a container-based preview (`#qr-preview`) used by `qr-code-styling`.
- Updated QR size control to clamp within 512–1024 and changed default size to 768 for sharper logo rendering.
- Updated size slider range in UI to 512–1024 with 32px steps.
- Updated municipality logo behavior to use built-in center image embedding from local `./assets/tonsberg-logo.png`.
- Improved municipality logo scaling with size-aware `imageSize` and `imageOptions.margin` while keeping `hideBackgroundDots: true`.
- Enforced error correction level `H` when municipality logo is enabled.
- Updated download/copy actions to use `qr-code-styling` APIs (`download`, `getRawData`).
- Updated README with styled QR behavior and PR7 manual checks.

### Removed
- Removed manual logo overlay drawing pipeline used by previous canvas-based rendering.

### Previous
- Added foreground/background color pickers to customize QR rendering colors.
- Added margin control to tune QR quiet-zone padding.
- Added a reset button to restore default generator settings.
