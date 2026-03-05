# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed
- Stabilized municipality logo cache-busting by using a constant `APP_ASSET_VERSION` query value instead of time-based cache keys.
- Municipality logo load failures continue to clear logo promise cache, allowing retries on subsequent renders.

### Changed
- Updated municipality logo badge rendering with refined proportions: 16% logo size, rounded clipping, white circular badge, and subtle circular border stroke.
- Kept QR preview canvas centered in `.preview-canvas-wrap` with flexbox alignment while margin/size settings change.
- Updated README with PR5.2 manual checks including badge visuals, centered preview behavior, and version-based cache-bust verification.

### Previous
- Added foreground/background color pickers to customize QR rendering colors.
- Added margin control to tune QR quiet-zone padding.
- Added a reset button to restore default generator settings.
