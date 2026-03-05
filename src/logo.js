const MUNICIPALITY_LOGO_PATH = './assets/tonsberg-logo.png';
const APP_ASSET_VERSION = '5.2.0';
let municipalityLogoPromise;

function buildLogoSource() {
  return `${MUNICIPALITY_LOGO_PATH}?v=${encodeURIComponent(APP_ASSET_VERSION)}`;
}

function loadMunicipalityLogo() {
  if (!municipalityLogoPromise) {
    municipalityLogoPromise = new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => resolve(image);
      image.onerror = () => {
        municipalityLogoPromise = null;
        reject(new Error('Could not load municipality logo image from ./assets/tonsberg-logo.png.'));
      };
      image.src = buildLogoSource();
    });
  }

  return municipalityLogoPromise;
}

export async function drawMunicipalityLogo(ctx, canvasSize) {
  if (!ctx) {
    throw new Error('Canvas context is required to draw municipality logo.');
  }

  try {
    const logoImage = await loadMunicipalityLogo();
    const center = canvasSize / 2;
    const logoSize = canvasSize * 0.16;
    const logoX = center - logoSize / 2;
    const logoY = center - logoSize / 2;

    const badgeRadius = (logoSize / 2) * 1.55;
    const clipRadius = badgeRadius * 0.82;
    const borderWidth = Math.max(1, canvasSize * 0.0045);

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.arc(center, center, badgeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, clipRadius, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = 'rgba(30, 64, 175, 0.24)';
    ctx.arc(center, center, badgeRadius - borderWidth / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  } catch (error) {
    municipalityLogoPromise = null;
    throw error;
  }
}
