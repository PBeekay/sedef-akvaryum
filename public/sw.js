const CACHE_NAME = 'sedef-akvaryum-v3';
const STATIC_CACHE = 'sedef-static-v3';
const DYNAMIC_CACHE = 'sedef-dynamic-v3';
const IMAGE_CACHE = 'sedef-images-v3';

// Cache strategies
const CACHE_STRATEGIES = {
  STATIC: 'cache-first',
  DYNAMIC: 'stale-while-revalidate',
  IMAGES: 'cache-first',
  API: 'network-first'
};

// URLs to cache immediately
const STATIC_URLS = [
  '/',
  '/static/js/main.js',
  '/static/css/main.css',
  '/manifest.json',
  '/logo192.png',
  '/logo512.png'
];

// Install event with better caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_URLS);
      }),
      // Cache dynamic content
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('Dynamic cache ready');
        return Promise.resolve();
      }),
      // Cache images
      caches.open(IMAGE_CACHE).then(cache => {
        console.log('Image cache ready');
        return Promise.resolve();
      })
    ])
  );
  
  // Skip waiting for immediate activation
  self.skipWaiting();
});

// Fetch event with advanced caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (isImage(request)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
  } else if (isAPIRequest(request)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
  }
});

// Cache First strategy for static assets
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.log('Cache first failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

// Network First strategy for API requests
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Network error', { status: 503 });
  }
}

// Stale While Revalidate strategy for dynamic content
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    cache.put(request, networkResponse.clone());
    return networkResponse;
  }).catch(error => {
    console.log('Fetch failed:', error);
  });

  return cachedResponse || fetchPromise;
}

// Helper functions to determine request type
function isStaticAsset(request) {
  return STATIC_URLS.some(url => request.url.includes(url)) ||
         request.url.includes('/static/') ||
         request.url.includes('/manifest.json');
}

function isImage(request) {
  return request.destination === 'image' ||
         /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(request.url);
}

function isAPIRequest(request) {
  return request.url.includes('/api/') ||
         request.url.includes('googleapis.com') ||
         request.url.includes('analytics');
}

// Activate event with cache cleanup
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (![STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE].includes(cacheName)) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      clients.claim()
    ])
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Get all clients
    const clients = await self.clients.matchAll();
    
    // Notify clients about sync
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_COMPLETED',
        timestamp: Date.now()
      });
    });
    
    console.log('Background sync completed');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notification handling with better options
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Yeni ürünler ve kampanyalar için bizi takip edin!',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
      url: '/'
    },
    actions: [
      {
        action: 'explore',
        title: 'Ürünleri İncele',
        icon: '/logo192.png'
      },
      {
        action: 'close',
        title: 'Kapat',
        icon: '/logo192.png'
      }
    ],
    requireInteraction: false,
    silent: false,
    tag: 'sedef-notification'
  };

  event.waitUntil(
    self.registration.showNotification('Sedef Akvaryum', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else {
    // Default action: open the app
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        if (clientList.length > 0) {
          clientList[0].focus();
        } else {
          clients.openWindow('/');
        }
      })
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    event.ports[0].postMessage({
      type: 'CACHE_INFO',
      staticCache: STATIC_CACHE,
      dynamicCache: DYNAMIC_CACHE,
      imageCache: IMAGE_CACHE
    });
  }
});

// Periodic cache cleanup
setInterval(async () => {
  try {
    const cacheNames = await caches.keys();
    for (const cacheName of cacheNames) {
      if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== IMAGE_CACHE) {
        await caches.delete(cacheName);
        console.log('Cleaned up old cache:', cacheName);
      }
    }
  } catch (error) {
    console.error('Cache cleanup failed:', error);
  }
}, 24 * 60 * 60 * 1000); // Run every 24 hours
