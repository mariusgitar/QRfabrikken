import { downloadCanvasPng, copyCanvasToClipboard } from './download.js';
import { renderQrToCanvas } from './qr.js';

const DEFAULTS = {
  size: 256,
  ecLevel: 'M',
  fgColor: '#111111',
  bgColor: '#ffffff',
  margin: 2,
  showMunicipalityLogo: false,
};

const state = {
  text: '',
  ...DEFAULTS,
  hasQr: false,
};

let dom = {};
let debounceTimer;
let renderToken = 0;

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

function applyStateToInputs() {
  dom.sizeInput.value = String(state.size);
  dom.sizeValue.textContent = String(state.size);
  dom.ecLevelSelect.value = state.ecLevel;
  dom.fgColorInput.value = state.fgColor;
  dom.bgColorInput.value = state.bgColor;
  dom.marginInput.value = String(state.margin);
  dom.marginValue.textContent = String(state.margin);
  dom.municipalityLogoToggle.checked = state.showMunicipalityLogo;
  syncErrorCorrectionUi();
}

async function updateView() {
  const currentToken = ++renderToken;
  dom.sizeValue.textContent = String(state.size);
  dom.marginValue.textContent = String(state.margin);
  syncErrorCorrectionUi();

  const result = await renderQrToCanvas({
    text: state.text,
    size: state.size,
    ecLevel: state.ecLevel,
    fgColor: state.fgColor,
    bgColor: state.bgColor,
    margin: state.margin,
    showMunicipalityLogo: state.showMunicipalityLogo,
    canvas: dom.qrCanvas,
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
    state.size = Number(event.target.value);
    updateView();
  });

  dom.marginInput.addEventListener('input', (event) => {
    state.margin = Number(event.target.value);
    updateView();
  });

  dom.ecLevelSelect.addEventListener('change', (event) => {
    state.ecLevel = event.target.value;
    updateView();
  });

  dom.fgColorInput.addEventListener('input', (event) => {
    state.fgColor = event.target.value;
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

  dom.generateButton.addEventListener('click', () => {
    state.text = dom.contentInput.value;
    updateView();
  });

  dom.resetButton.addEventListener('click', () => {
    Object.assign(state, DEFAULTS);
    applyStateToInputs();
    updateView();
    setStatus('Settings reset to defaults.', false);
  });

  dom.downloadButton.addEventListener('click', () => {
    if (!state.hasQr) {
      return;
    }

    const result = downloadCanvasPng(dom.qrCanvas, state.text);
    setStatus(result.message, !result.ok);
  });

  dom.copyButton.addEventListener('click', async () => {
    if (!state.hasQr) {
      return;
    }

    const result = await copyCanvasToClipboard(dom.qrCanvas);
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
    generateButton: document.getElementById('generate-btn'),
    resetButton: document.getElementById('reset-btn'),
    downloadButton: document.getElementById('download-btn'),
    copyButton: document.getElementById('copy-btn'),
    qrCanvas: document.getElementById('qr-canvas'),
    statusMessage: document.getElementById('status-message'),
  };

  if (Object.values(dom).some((element) => !element)) {
    console.error('QR Studio failed to initialize: required elements are missing.');
    return;
  }

  applyStateToInputs();
  bindEvents();
  updateView();
});
