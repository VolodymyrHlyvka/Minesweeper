// /* eslint-disable no-restricted-globals */
// const CACHE_NAME = "minesweeper-cache-v1";
// const urlsToCache = [
//   "/",
//   "/index.html",
//   "/manifest.json",
//   "/logo192.png",
//   "/logo512.png",
//   "/favicon.ico",
//   "/static/js/bundle.js",
// ];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames
//           .filter((cacheName) => cacheName !== CACHE_NAME)
//           .map((cacheName) => caches.delete(cacheName))
//       );
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });
