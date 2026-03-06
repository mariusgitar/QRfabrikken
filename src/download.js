function sanitizeFilenamePart(input) {
  return String(input ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 24);
}

function buildTimestamp() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function buildFilename(filenameBase) {
  const sanitizedBase = sanitizeFilenamePart(filenameBase) || 'qr-fabrikken';
  return `${sanitizedBase}-${buildTimestamp()}`;
}

export function downloadStyledQr(qrInstance, filenameBase) {
  if (!qrInstance || typeof qrInstance.download !== 'function') {
    return { ok: false, message: 'Forhåndsvisning mangler, så vi har ingenting å laste ned ennå.' };
  }

  const name = buildFilename(filenameBase);
  qrInstance.download({ extension: 'png', name });
  return { ok: true, message: `Lastet ned ${name}.png` };
}

export async function copyStyledQrToClipboard(qrInstance) {
  if (!qrInstance || typeof qrInstance.getRawData !== 'function') {
    return { ok: false, message: 'Forhåndsvisning mangler, så vi har ingenting å laste ned ennå.' };
  }

  if (!navigator.clipboard || typeof window.ClipboardItem === 'undefined') {
    return { ok: false, message: 'Denne nettleseren støtter ikke kopiering av bilder til utklippstavlen.' };
  }

  try {
    const blob = await qrInstance.getRawData('png');
    await navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })]);
    return { ok: true, message: 'QR-bildet er kopiert til utklippstavlen. Klar til lim inn!'};
  } catch (error) {
    return { ok: false, message: 'Nettleseren blokkerte utklippstavlen. Sjekk tillatelser og prøv igjen.' };
  }
}
