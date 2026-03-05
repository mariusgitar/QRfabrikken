const MUNICIPALITY_LOGO_PATH = 'assets/tonsberg-logo.svg';
let municipalityLogoPromise;

function loadMunicipalityLogo() {
  if (!municipalityLogoPromise) {
    municipalityLogoPromise = new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Could not load municipality logo image.'));
      image.src = MUNICIPALITY_LOGO_PATH;
    });
  }

  return municipalityLogoPromise;
}

export async function drawMunicipalityLogo(ctx, canvasSize) {
  if (!ctx) {
    throw new Error('Canvas context is required to draw municipality logo.');
  }

  const logoImage = await loadMunicipalityLogo();
  const logoSize = canvasSize * 0.18;
  const center = canvasSize / 2;
  const x = center - logoSize / 2;
  const y = center - logoSize / 2;

  const backgroundRadius = logoSize * 0.68;
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = '#ffffff';
  ctx.arc(center, center, backgroundRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.drawImage(logoImage, x, y, logoSize, logoSize);
}
