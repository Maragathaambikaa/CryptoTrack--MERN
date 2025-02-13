// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
