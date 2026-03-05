import { renderQrToCanvas } from './qr.js';

const state = {
  text: '',
  size: 256,
  ecLevel: 'M',
};

let dom = {};
let debounceTimer;

function setStatus(message, isError = false) {
  dom.statusMessage.textContent = message;
  dom.statusMessage.classList.toggle('error', isError);
}

function updateView() {
  dom.sizeValue.textContent = String(state.size);

  const result = renderQrToCanvas({
    text: state.text,
    size: state.size,
    ecLevel: state.ecLevel,
  });

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
}

document.addEventListener('DOMContentLoaded', () => {
  dom = {
    contentInput: document.getElementById('qr-content'),
    sizeInput: document.getElementById('size'),
    sizeValue: document.getElementById('size-value'),
    ecLevelSelect: document.getElementById('ec-level'),
    generateButton: document.getElementById('generate-btn'),
    statusMessage: document.getElementById('status-message'),
  };

  if (Object.values(dom).some((element) => !element)) {
    console.error('QR Studio failed to initialize: required elements are missing.');
    return;
  }

  bindEvents();
  updateView();
});
