// BWC Command Center service worker: makes the app installable and shows push alerts.
const FB = 'https://www.gstatic.com/firebasejs/10.12.2/';
let CONFIG = null;
try { CONFIG = JSON.parse(new URL(self.location).searchParams.get('cfg') || 'null'); } catch (e) {}
if (CONFIG && CONFIG.apiKey) {
  importScripts(FB + 'firebase-app-compat.js', FB + 'firebase-messaging-compat.js');
  firebase.initializeApp(CONFIG);
  firebase.messaging();
}
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && (e.notification.data.FCM_MSG && e.notification.data.FCM_MSG.data && e.notification.data.FCM_MSG.data.link)) || self.registration.scope;
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(ws => {
    for (const w of ws) if (w.url.startsWith(self.registration.scope)) return w.focus();
    return clients.openWindow(url);
  }));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open('hub-v1').then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});
