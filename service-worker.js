const CACHE_NAME = "myfootball-v1.1"
var urlsToCache = [
    "/",
    "manifest.json",
    "/index.html",
    "/nav.html",
    "/css/materialize.min.css",
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
    var url = [
        "https://api.football-data.org/v2/competitions/2001/teams",
        "https://api.football-data.org/v2/competitions/2001/matches"
    ]
    console.log("URL: ", event.request.url)
    if (event.request.url.indexOf(url > -1)) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    console.log("RESPONSE: ",response.clone)
                    cache.put(event.request.url, response.clone())
                    return response
                })
            })
        )
    } else {
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