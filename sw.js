// 1. CAMBIA ESTE NOMBRE PARA CADA CLIENTE (ej. 'asistencia-farmacia-v1')
const CACHE_NAME = 'asistencia-rancho la primavera-v1'; 

const ASSETS = [
  './',
  './index.html',
  './logo.png' // Asegúrate de que el logo exista en el repo
];

// Instalación: Guarda los archivos para uso offline
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activación: Limpia cachés antiguos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Estrategia: Primero busca en red, si falla (offline), usa el caché
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});