export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Neural Link Cached.'))
        .catch(() => console.log('Offline Node Failed.'));
    });
  }
}
