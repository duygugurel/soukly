// Soukly Service Worker — v1
// Caches static assets for fast load + offline shell

const CACHE_NAME = "soukly-v3";

// NOTE: index.html is intentionally NOT pre-cached.
// It uses network-first below so deploys always show immediately.
const STATIC_ASSETS = [
  "/manifest.json",
  "/assets/soukly_icon.svg",
  "/assets/soukly_final_logo.svg",
];

// ── Install: pre-cache all static assets ──────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate immediately without waiting for old SW to finish
  self.skipWaiting();
});

// ── Activate: delete old caches ───────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  // Take control of open tabs immediately
  self.clients.claim();
});

// ── Fetch: smart caching strategy ─────────────────────────────
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle GET requests
  if (event.request.method !== "GET") return;

  // 1. Supabase API calls → always network-first (live data)
  if (url.hostname.includes("supabase.co")) {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request)
      )
    );
    return;
  }

  // 2. Google Fonts → network-first, fallback to cache
  if (url.hostname.includes("fonts.googleapis.com") || url.hostname.includes("fonts.gstatic.com")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 3. Nominatim geocoding → always network (location-sensitive)
  if (url.hostname.includes("nominatim.openstreetmap.org")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 4. HTML, CSS, JS → network-first so deploys show immediately.
  //    Falls back to cache when offline.
  const isAppCode =
    url.origin === self.location.origin &&
    (url.pathname === "/" ||
      url.pathname.endsWith(".html") ||
      url.pathname.endsWith(".css") ||
      url.pathname.endsWith(".js"));

  if (isAppCode) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 5. Other static assets (images, svg, fonts, manifest) → cache-first
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (response.ok && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
