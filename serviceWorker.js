const CACHE_STATIC_NAME = "static-v1";
const CACHE_INMUTABLE_NAME = "inmutable-v1";
const CACHE_DINAMYC_NAME = "dinamyc-v1";

function cleanCache(cacheName, sizeItems) {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length >= sizeItems) {
        cache.delete(keys[0]).then(() => {
          cleanCache(cacheName, sizeItems);
        });
      }
    });
  });
}

self.addEventListener("install", (event) => {
  const promesaCache = caches.open(CACHE_STATIC_NAME).then((cache) => {
    return cache.addAll([
      "./",
      "./index.html",
      "./manifest.json",
      "./images/icons/android-launchericon-144-144.png",
      "./images/icons/android-launchericon-192-192.png",
      "./images/icons/android-launchericon-48-48.png",
      "./images/icons/android-launchericon-512-512.png",
      "./images/icons/android-launchericon-72-72.png",
      "./images/icons/android-launchericon-96-96.png",
      //Se agregaron  las imágenes de las noticias como parte del cache estático pero en un futuro
      //cuando se consuma el web service se deberán almacenar en el cache dinámico por lo cual en la parte de abajo esta el
      //código para agregar todo aquello que no se encuentre en nuestros caches a un cache dinámico
      "./images/noticia1.png",
      "./images/noticia2.png",
      "./images/noticia3.png",
      "./images/noticia4.png",
      "./js/app.js",
    ]);
  });

  const promesaInmutable = caches
    .open(CACHE_INMUTABLE_NAME)
    .then((cacheInmutable) => {
      return cacheInmutable.addAll([
        "./css/bootstrap.min.css",
        "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js",
        "https://code.jquery.com/jquery-3.5.1.min.js",
      ]);
    });

  event.waitUntil(Promise.all([promesaCache, promesaInmutable]));
});

self.addEventListener("fetch", (event) => {
  const respuestaCache = caches.match(event.request).then((resp) => {
    if (resp) {
      return resp;
    }
    console.log("No esta en cache ", event.request.url);
    return fetch(event.request).then((respNet) => {
      caches.open(CACHE_DINAMYC_NAME).then((cache) => {
        cache.put(event.request, respNet).then(() => {
          cleanCache(CACHE_DINAMYC_NAME, 6);
        });
      });

      return respNet.clone();
    });
  });
  event.respondWith(respuestaCache);
});
