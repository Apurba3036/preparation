// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDAX6uQ6NhlCeYtOcp7-EHJLmAeuyphp1A",
    authDomain: "attentionnetwork-860bc.firebaseapp.com",
    projectId: "attentionnetwork-860bc",
    storageBucket: "attentionnetwork-860bc.appspot.com",
    messagingSenderId: "890637177850",
    appId: "1:890637177850:web:7d09a4c4917b7fe4cdca43",
    measurementId: "G-DNLS0FC9N9"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title ;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image || "data:image/png;base64,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",
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });