const MUNICIPALITY_LOGO_PATH = './assets/tonsberg-logo.png';
let municipalityLogoPromise;

function buildLogoSource() {
  return `${MUNICIPALITY_LOGO_PATH}?v=${Date.now()}`;
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
    const logoSize = canvasSize * 0.18;
    const center = canvasSize / 2;
    const x = center - logoSize / 2;
    const y = center - logoSize / 2;
    const logoRadius = logoSize / 2;
    const badgeRadius = logoRadius * 1.24;
    const borderWidth = Math.max(1, canvasSize * 0.006);

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.arc(center, center, badgeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, logoRadius, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(logoImage, x, y, logoSize, logoSize);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = 'rgba(30, 64, 175, 0.28)';
    ctx.arc(center, center, badgeRadius - borderWidth / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  } catch (error) {
    municipalityLogoPromise = null;
    throw error;
  }
}
