import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

// Firebase config (ensure the details are correct)
const firebaseConfig = {
    apiKey: "AIzaSyBxTzd50NcfkHPYGX4p6GXN_jmvbFIq-w8",
    authDomain: "crytotrack-404d4.firebaseapp.com",
    projectId: "crytotrack-404d4",
    storageBucket: "crytotrack-404d4.firebasestorage.app",
    messagingSenderId: "42966356893",
    appId: "1:42966356893:web:d6807b87a7b6f834b45574",
    measurementId: "G-07N20G7TF9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Request Notification Permission
export const requestNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: "BNpYmgGlntSOUQz2L6k9lHzkYC77cA3e4SQnQ7e4S_SwpSwx9W2udCKaYdNoO60u7fA9B5zRoRlHsfRHp-BT4IQ" }); // Ensure VAPID Key is correct

    if (token) {
      console.log("FCM Token:", token);
      localStorage.setItem("fcmToken", token);  // Save token for later use (like sending to backend)
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("FCM token error:", error);
  }
};

// Listen for incoming messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Message received: ", payload);
      // You can handle the message here, e.g., show a notification or update the UI
      resolve(payload);
    });
  });

// Call this function in your app component to request notification permissions
requestNotificationPermission();
