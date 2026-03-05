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

export function downloadCanvasPng(canvas, filenameBase) {
  if (!canvas) {
    return { ok: false, message: 'QR preview is unavailable.' };
  }

  const sanitizedBase = sanitizeFilenamePart(filenameBase) || 'qr-code';
  const filename = `${sanitizedBase}-${buildTimestamp()}.png`;

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();

  return { ok: true, message: `Downloaded ${filename}` };
}

export async function copyCanvasToClipboard(canvas) {
  if (!canvas) {
    return { ok: false, message: 'QR preview is unavailable.' };
  }

  if (!navigator.clipboard || typeof window.ClipboardItem === 'undefined') {
    return { ok: false, message: 'Clipboard image copy is not supported in this browser.' };
  }

  try {
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((result) => {
        if (!result) {
          reject(new Error('Failed to create PNG blob.'));
          return;
        }

        resolve(result);
      }, 'image/png');
    });

    await navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })]);
    return { ok: true, message: 'Copied QR image to clipboard.' };
  } catch (error) {
    return { ok: false, message: 'Clipboard permission denied or blocked by browser settings.' };
  }
}
