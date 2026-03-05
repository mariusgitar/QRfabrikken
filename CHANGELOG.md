# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Added foreground/background color pickers to customize QR rendering colors.
- Added margin control to tune QR quiet-zone padding.
- Added a reset button to restore default generator settings.

### Changed
- Improved responsive layout spacing for settings/actions and small screens.
- Improved accessibility with stronger labels and clear `:focus-visible` outlines.
- Updated README manual tests and screenshot guidance for PR #4.

### Previous
- Added QR action controls to download the current canvas as PNG.
- Added clipboard image copy support with browser feature detection and fallback messaging.
- Kept actions disabled until a QR code is generated and wired status feedback for action outcomes.
