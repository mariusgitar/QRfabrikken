const VALID_EC_LEVELS = new Set(['L', 'M', 'Q', 'H']);
const APP_ASSET_VERSION = '7.0.0';
const MUNICIPALITY_LOGO_PATH = `./assets/tonsberg-logo.png?v=${encodeURIComponent(APP_ASSET_VERSION)}`;

let qr;

function normalizeSize(size) {
  const parsed = Number(size);
  return Number.isFinite(parsed) ? Math.max(128, parsed) : 256;
}

function normalizeMargin(margin) {
  const parsed = Number(margin);
  return Number.isFinite(parsed) ? Math.max(4, parsed) : 4;
}

function normalizeEcLevel(ecLevel, showMunicipalityLogo) {
  if (showMunicipalityLogo) {
    return 'H';
  }

  return VALID_EC_LEVELS.has(ecLevel) ? ecLevel : 'M';
}

function clearPreview(container) {
  if (container) {
    container.innerHTML = '';
  }
}

function baseOptions({
  text,
  size,
  margin,
  fgColor,
  bgColor,
  showMunicipalityLogo,
  ecLevel,
}) {
  return {
    width: size,
    height: size,
    type: 'canvas',
    data: text,
    margin,
    image: showMunicipalityLogo ? MUNICIPALITY_LOGO_PATH : undefined,
    qrOptions: {
      errorCorrectionLevel: ecLevel,
    },
    dotsOptions: {
      type: 'rounded',
      color: fgColor,
    },
    backgroundOptions: {
      color: bgColor,
    },
    cornersSquareOptions: {
      type: 'extra-rounded',
      color: fgColor,
    },
    cornersDotOptions: {
      type: 'dot',
      color: fgColor,
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      hideBackgroundDots: true,
      margin: 8,
      imageSize: 0.32,
    },
  };
}

export function getQrInstance() {
  return qr;
}

export async function renderQrToCanvas({
  text,
  size,
  ecLevel,
  fgColor = '#111111',
  bgColor = '#ffffff',
  margin = 2,
  showMunicipalityLogo = false,
}) {
  const container = document.getElementById('qr-preview');
  if (!container) {
    return { ok: false, message: 'QR preview element not found.' };
  }

  const trimmedText = String(text ?? '').trim();
  if (!trimmedText) {
    clearPreview(container);
    return { ok: false, message: 'Enter text or URL to generate a QR code.' };
  }

  if (!window.QRCodeStyling) {
    return { ok: false, message: 'QR library failed to load. Please refresh and try again.' };
  }

  const normalizedSize = normalizeSize(size);
  const normalizedMargin = normalizeMargin(margin);
  const normalizedEcLevel = normalizeEcLevel(ecLevel, showMunicipalityLogo);

  const options = baseOptions({
    text: trimmedText,
    size: normalizedSize,
    margin: normalizedMargin,
    fgColor,
    bgColor,
    showMunicipalityLogo,
    ecLevel: normalizedEcLevel,
  });

  if (!qr) {
    qr = new window.QRCodeStyling(options);
    clearPreview(container);
    qr.append(container);
  } else {
    qr.update(options);
  }

  return { ok: true, message: 'QR code updated.' };
}
