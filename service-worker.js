const CACHE_NAME = 'bombeiro-bilingue-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Seus ícones PWA devem ser adicionados aqui
  // Exemplo: '/icon-192.png',
  // Exemplo: '/icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap',
  'https://fonts.gstatic.com'
];

self.addEventListener('install', (event) => {
  // Executado durante a instalação do Service Worker
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Intercepta todas as requisições de rede
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna o recurso do cache se ele existir
        if (response) {
          return response;
        }
        // Caso contrário, busca na rede
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  // Limpa caches antigos
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
