document.addEventListener('DOMContentLoaded', () => {
  const appShell = document.querySelector('.app-shell');

  if (!appShell) {
    console.error('QR Studio scaffold failed to initialize: .app-shell not found.');
    return;
  }

  appShell.setAttribute('data-ready', 'true');
  console.info('QR Studio scaffold loaded. QR generation logic will be added in a later PR.');
});
