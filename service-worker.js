self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('macfort-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/productos.js',
        '/productos.json',
        '/logo_macfort.png'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
