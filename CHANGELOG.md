# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Added QR action controls to download the current canvas as PNG.
- Added clipboard image copy support with browser feature detection and fallback messaging.
- Kept actions disabled until a QR code is generated and wired status feedback for action outcomes.
- Updated README with PR #3 usage notes and manual tests.

### Previous
- Implemented browser-based QR generation and canvas preview using a lightweight CDN library.
- Added size and error-correction controls with a unified app state/update flow.
- Added inline validation/status messaging for empty input and library load issues.
