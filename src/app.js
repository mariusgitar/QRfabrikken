import { downloadCanvasPng, copyCanvasToClipboard } from './download.js';
import { renderQrToCanvas } from './qr.js';

const state = {
  text: '',
  size: 256,
  ecLevel: 'M',
  hasQr: false,
};

let dom = {};
let debounceTimer;

function setStatus(message, isError = false) {
  dom.statusMessage.textContent = message;
  dom.statusMessage.classList.toggle('error', isError);
}

function setActionsDisabled(isDisabled) {
  dom.downloadButton.disabled = isDisabled;
  dom.copyButton.disabled = isDisabled;
}

function updateView() {
  dom.sizeValue.textContent = String(state.size);

  const result = renderQrToCanvas({
    text: state.text,
    size: state.size,
    ecLevel: state.ecLevel,
    canvas: dom.qrCanvas,
  });

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

  dom.ecLevelSelect.addEventListener('change', (event) => {
    state.ecLevel = event.target.value;
    updateView();
  });

  dom.generateButton.addEventListener('click', () => {
    state.text = dom.contentInput.value;
    updateView();
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
    ecLevelSelect: document.getElementById('ec-level'),
    generateButton: document.getElementById('generate-btn'),
    downloadButton: document.getElementById('download-btn'),
    copyButton: document.getElementById('copy-btn'),
    qrCanvas: document.getElementById('qr-canvas'),
    statusMessage: document.getElementById('status-message'),
  };

  if (Object.values(dom).some((element) => !element)) {
    console.error('QR Studio failed to initialize: required elements are missing.');
    return;
  }

  bindEvents();
  updateView();
});
