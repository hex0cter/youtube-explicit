self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');

  event.waitUntil(
    caches.open('static')
      .then(function (cache) {
        cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/favicon.ico',
          '/logo192.png',
          '/logo512.png',
          '/images/kids-with-tablet.jpg',
          '/images/youtube.png'
        ]);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;

  let url = event.request.url;
  console.log('url', url)
  if (!url.startsWith('https://solna.xyz') && !url.startsWith('http://localhost')) {
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        if (res) {
          return res;
        } else {
          return fetch(event.request);
        }
      })
  );
});
