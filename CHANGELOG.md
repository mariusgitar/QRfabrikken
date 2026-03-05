# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed
- Set sensible defaults for non-expert flow: size `800`, municipality logo enabled, and safe margin default (`4`).
- Kept QR size clamped to `512–1024` with slider step `32`.
- Updated simple layout so text input, preview, and primary actions (Download/Copy) are visible by default.
- Moved advanced controls into native `<details>/<summary>` under **Flere innstillinger** (closed by default).
- Added a small shortcut button (**Endre innstillinger**) that opens advanced settings.
- Polished summary/dropdown styling and focus behavior for keyboard accessibility.
- Kept rounded QR styling and municipality logo rendering with high error correction (`H`) when logo is enabled.

### Documentation
- Rewrote README with simple mode guidance, advanced settings explanation, and updated manual test checklist.
