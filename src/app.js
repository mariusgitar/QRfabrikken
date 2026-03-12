import { downloadStyledQr, copyStyledQrToClipboard } from './download.js';
import { renderQrToCanvas, getQrInstance } from './qr.js';

const SIZE_MIN = 512;
const SIZE_MAX = 1024;
const MARGIN_MIN = 4;
const DISCLAIMER_STORAGE_KEY = 'qrfabrikkenDisclaimerAccepted';

const DEFAULTS = {
  size: 800,
  ecLevel: 'H',
  fgColor: '#111111',
  bgColor: '#ffffff',
  margin: 4,
  showMunicipalityLogo: true,
};

const state = {
  text: '',
  ...DEFAULTS,
  hasQr: false,
};

let dom = {};
let debounceTimer;
let renderToken = 0;

function showFirstVisitDisclaimer() {
  if (localStorage.getItem(DISCLAIMER_STORAGE_KEY) === '1') {
    return;
  }

  dom.disclaimerOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
  dom.disclaimerConfirmButton.focus();

  dom.disclaimerConfirmButton.addEventListener(
    'click',
    () => {
      localStorage.setItem(DISCLAIMER_STORAGE_KEY, '1');
      dom.disclaimerOverlay.hidden = true;
      document.body.style.overflow = '';
      dom.contentInput.focus();
    },
    { once: true },
  );

  dom.disclaimerCancelButton.addEventListener(
    'click',
    () => {
      window.location.href = 'about:blank';
    },
    { once: true },
  );
}

function clampSize(size) {
  const parsed = Number(size);
  if (!Number.isFinite(parsed)) {
    return DEFAULTS.size;
  }

  return Math.max(SIZE_MIN, Math.min(SIZE_MAX, parsed));
}

function clampMargin(margin) {
  const parsed = Number(margin);
  if (!Number.isFinite(parsed)) {
    return DEFAULTS.margin;
  }

  return Math.max(MARGIN_MIN, parsed);
}

function syncQrAccentColor() {
  document.documentElement.style.setProperty('--qr-accent', state.fgColor);
}

function setStatus(message, isError = false) {
  dom.statusMessage.textContent = message;
  dom.statusMessage.classList.toggle('error', isError);
}

function setActionsDisabled(isDisabled) {
  dom.downloadButton.disabled = isDisabled;
  dom.copyButton.disabled = isDisabled;
}

function syncErrorCorrectionUi() {
  if (state.showMunicipalityLogo) {
    state.ecLevel = 'H';
  }

  dom.ecLevelSelect.value = state.ecLevel;
  dom.ecLevelSelect.disabled = state.showMunicipalityLogo;
}

function syncLogoStatusHint() {
  dom.logoStatusValue.textContent = state.showMunicipalityLogo ? 'På' : 'Av';
}

function applyStateToInputs() {
  state.size = clampSize(state.size);
  state.margin = clampMargin(state.margin);
  dom.sizeInput.value = String(state.size);
  dom.sizeValue.textContent = String(state.size);
  dom.ecLevelSelect.value = state.ecLevel;
  dom.fgColorInput.value = state.fgColor;
  dom.bgColorInput.value = state.bgColor;
  dom.marginInput.value = String(state.margin);
  dom.marginValue.textContent = String(state.margin);
  dom.municipalityLogoToggle.checked = state.showMunicipalityLogo;
  syncQrAccentColor();
  syncErrorCorrectionUi();
  syncLogoStatusHint();
}

async function updateView() {
  const currentToken = ++renderToken;
  state.size = clampSize(state.size);
  state.margin = clampMargin(state.margin);
  dom.sizeInput.value = String(state.size);
  dom.sizeValue.textContent = String(state.size);
  dom.marginInput.value = String(state.margin);
  dom.marginValue.textContent = String(state.margin);
  syncErrorCorrectionUi();
  syncLogoStatusHint();

  const result = await renderQrToCanvas({
    text: state.text,
    size: state.size,
    ecLevel: state.ecLevel,
    fgColor: state.fgColor,
    bgColor: state.bgColor,
    margin: state.margin,
    showMunicipalityLogo: state.showMunicipalityLogo,
  });

  if (currentToken !== renderToken) {
    return;
  }

  state.hasQr = result.ok;
  setActionsDisabled(!state.hasQr);
  setStatus(result.message, !result.ok);
}

function scheduleUpdate() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(updateView, 200);
}

function bindEvents() {
  dom.contentInput.addEventListener('input', (event) => {
    state.text = event.target.value;
    scheduleUpdate();
  });

  dom.sizeInput.addEventListener('input', (event) => {
    state.size = clampSize(event.target.value);
    updateView();
  });

  dom.marginInput.addEventListener('input', (event) => {
    state.margin = clampMargin(event.target.value);
    updateView();
  });

  dom.ecLevelSelect.addEventListener('change', (event) => {
    state.ecLevel = event.target.value;
    updateView();
  });

  dom.fgColorInput.addEventListener('input', (event) => {
    state.fgColor = event.target.value;
    syncQrAccentColor();
    updateView();
  });

  dom.bgColorInput.addEventListener('input', (event) => {
    state.bgColor = event.target.value;
    updateView();
  });

  dom.municipalityLogoToggle.addEventListener('change', (event) => {
    state.showMunicipalityLogo = event.target.checked;
    if (state.showMunicipalityLogo) {
      state.ecLevel = 'H';
    }
    updateView();
  });

  if (dom.openSettingsButton) {
    dom.openSettingsButton.addEventListener('click', () => {
      dom.advancedSettings.open = true;
      dom.advancedSettings.querySelector('summary')?.focus();
    });
  }

  dom.resetButton.addEventListener('click', () => {
    Object.assign(state, DEFAULTS);
    applyStateToInputs();
    updateView();
    setStatus('Innstillingene er nullstilt til standard. Klar for ny QR-runde!', false);
  });

  dom.downloadButton.addEventListener('click', () => {
    if (!state.hasQr) {
      return;
    }

    const result = downloadStyledQr(getQrInstance(), state.text);
    setStatus(result.message, !result.ok);
  });

  dom.copyButton.addEventListener('click', async () => {
    if (!state.hasQr) {
      return;
    }

    const result = await copyStyledQrToClipboard(getQrInstance());
    setStatus(result.message, !result.ok);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  dom = {
    contentInput: document.getElementById('qr-content'),
    sizeInput: document.getElementById('size'),
    sizeValue: document.getElementById('size-value'),
    marginInput: document.getElementById('margin'),
    marginValue: document.getElementById('margin-value'),
    ecLevelSelect: document.getElementById('ec-level'),
    fgColorInput: document.getElementById('fg-color'),
    bgColorInput: document.getElementById('bg-color'),
    municipalityLogoToggle: document.getElementById('municipality-logo-toggle'),
    openSettingsButton: document.getElementById('open-settings-btn'),
    advancedSettings: document.getElementById('advanced-settings'),
    logoStatusValue: document.getElementById('logo-status-value'),
    resetButton: document.getElementById('reset-btn'),
    downloadButton: document.getElementById('download-btn'),
    copyButton: document.getElementById('copy-btn'),
    statusMessage: document.getElementById('status-message'),
    disclaimerOverlay: document.getElementById('first-visit-disclaimer'),
    disclaimerCancelButton: document.getElementById('disclaimer-cancel-btn'),
    disclaimerConfirmButton: document.getElementById('disclaimer-confirm-btn'),
  };

  const requiredElements = Object.entries(dom).filter(([key]) => key !== 'openSettingsButton');

  if (requiredElements.some(([, element]) => !element)) {
    console.error('QR-fabrikken kunne ikke starte: mangler nødvendige elementer i siden.');
    return;
  }

  applyStateToInputs();
  bindEvents();
  updateView();
  showFirstVisitDisclaimer();
});
