importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);

} else {
    console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
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
    "/js/idb.js",
    "/js/db.js",
    "/pages/favourite.html",
    "/pages/home.html",
    "/pages/schedule.html",
    "/pages/teamlist.html",
    "/logo.png"
])

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            })
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    new workbox.strategies.StaleWhileRevalidate()
)

self.addEventListener("push", function (event) {
    var body

    if (event.data) {
        body = event.data.text()
    } else {
        body = "Push Message no payload"
    }

    var options = {
        body: body,
        icon: '/logo.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }
    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    )
})