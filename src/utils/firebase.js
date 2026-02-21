// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-ae042.firebaseapp.com",
  projectId: "taskmanager-ae042",
  storageBucket: "taskmanager-ae042.firebasestorage.app",
  messagingSenderId: "43376165309",
  appId: "1:43376165309:web:75a467df0c432f9f4f12d4",
  measurementId: "G-0DT7G4TLP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);