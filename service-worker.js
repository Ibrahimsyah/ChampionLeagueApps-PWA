const CACHE_NAME = "myfootball-v1.1"
var urlsToCache = [
    "/",
    "/manifest.json",
    "/index.html",
    "/nav.html",
    "/team.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/api.js",
    "/pages/favourite.html",
    "/pages/home.html",
    "/pages/schedule.html",
    "/pages/teamlist.html",
    "/logo.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener("fetch", function (event) {
    var url = 
        "https://api.football-data.org/"
    var isContain = event.request.url.indexOf(url) > -1
    if (isContain) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone())
                    return response
                })
            })
        )
    } else {
        event.respondWith(
            caches
                .match(event.request, {ignoreSearch:true, cacheName: CACHE_NAME })
                .then(function (response) {
                    if (response) {
                        return response
                    }
                    return fetch(event.request)
                })
        )
    }
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