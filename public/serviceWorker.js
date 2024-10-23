/* eslint-disable no-restricted-globals */
const CACHE_NAME = "minesweeper-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo192.png",
  "/logo512.png",
  "/favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((e) => {
        console.error("install error", e);
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .catch((e) => {
        console.error("activate error", e);
      })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchedResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchedResponse.clone());
              return fetchedResponse;
            });
          })
        );
      })
      .catch((e) => {
        console.error("fetch error", e);
      })
  );
});
