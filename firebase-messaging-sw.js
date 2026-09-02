importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyD9w5hDMasFdQYFmxOXTAo4-B-ZF4PkIaA",
  authDomain: "chat-b3ade.firebaseapp.com",
  databaseURL: "https://chat-b3ade-default-rtdb.firebaseio.com",
  projectId: "chat-b3ade",
  storageBucket: "chat-b3ade.firebasestorage.app",
  messagingSenderId: "984781783358",
  appId: "1:984781783358:web:8e6d6c90329112e6136c6f"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification ? payload.notification.title : (payload.data ? payload.data.title : 'رسالة جديدة');
  const notificationOptions = {
    body: payload.notification ? payload.notification.body : (payload.data ? payload.data.body : ''),
    icon: payload.notification && payload.notification.icon ? payload.notification.icon : 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png',
    vibrate: [200, 100, 200]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
