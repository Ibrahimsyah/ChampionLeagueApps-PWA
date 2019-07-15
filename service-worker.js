const CACHE_NAME = "myfootball-v1"
var urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/icon.png"
]

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    return response
                }
                return fetch(event.request)
            })
    )
})

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheName) {
            return Promise.all(
                cacheName.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})