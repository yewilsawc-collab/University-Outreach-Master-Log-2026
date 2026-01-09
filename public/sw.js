const CACHE_NAME = 'elementa-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/master.js',
  '/pages/feed.html',
  '/pages/vault.html'
];

// Install Event: Caching the Frosted Obsidian UI
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch Event: Serve from cache first, then network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
// sw.js update
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js');

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/icon-192.png',
    badge: '/assets/icon-badge.png',
    vibrate: [200, 100, 200] // Custom pulse
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
  
