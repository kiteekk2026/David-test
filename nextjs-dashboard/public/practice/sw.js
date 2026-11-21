const cacheName = "finnish-practice-v1";
const assets = [
  "./index.html",
  "./practice.css",
  "./practice.mjs",
  "./questions.mjs",
  "./manifest.webmanifest",
  "./icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(assets)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith("finnish-practice-") && key !== cacheName)
        .map((key) => caches.delete(key)),
    )).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const asset = assets.some((path) => url.href === new URL(path, self.registration.scope).href);
  if (event.request.method === "GET" && asset) {
    event.respondWith(
      caches.open(cacheName).then((cache) =>
        cache.match(event.request).then((match) => match ?? fetch(event.request)),
      ),
    );
  }
});
