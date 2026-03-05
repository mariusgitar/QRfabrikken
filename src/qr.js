import { drawMunicipalityLogo } from './logo.js';

const VALID_EC_LEVELS = new Set(['L', 'M', 'Q', 'H']);

export async function renderQrToCanvas({
  text,
  size,
  ecLevel,
  fgColor = '#111111',
  bgColor = '#ffffff',
  margin = 2,
  showMunicipalityLogo = false,
  canvas = document.getElementById('qr-canvas'),
}) {
  if (!canvas) {
    return { ok: false, message: 'QR canvas element not found.' };
  }

  const trimmedText = String(text ?? '').trim();
  if (!trimmedText) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return { ok: false, message: 'Enter text or URL to generate a QR code.' };
  }

  const normalizedSize = Number.isFinite(Number(size)) ? Number(size) : 256;
  const normalizedEcLevel = VALID_EC_LEVELS.has(ecLevel) ? ecLevel : 'M';
  const normalizedMargin = Number.isFinite(Number(margin)) ? Math.max(0, Number(margin)) : 2;

  canvas.width = normalizedSize;
  canvas.height = normalizedSize;

  if (!window.QRious) {
    return { ok: false, message: 'QR library failed to load. Please refresh and try again.' };
  }

  new window.QRious({
    element: canvas,
    value: trimmedText,
    size: normalizedSize,
    level: normalizedEcLevel,
    foreground: fgColor,
    background: bgColor,
    padding: normalizedMargin,
  });

  if (showMunicipalityLogo) {
    try {
      const ctx = canvas.getContext('2d');
      await drawMunicipalityLogo(ctx, normalizedSize);
    } catch (error) {
      console.error('Municipality logo overlay failed:', error);
      return {
        ok: true,
        message:
          'QR generated, but municipality logo could not be loaded from ./assets/tonsberg-logo.png.',
      };
    }
  }

  return { ok: true, message: 'QR code updated.' };
}
