import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-ae042.firebaseapp.com",
  projectId: "taskmanager-ae042",
  storageBucket: "taskmanager-ae042.firebasestorage.app",
  messagingSenderId: "43376165309",
  appId: "1:43376165309:web:75a467df0c432f9f4f12d4",
  measurementId: "G-0DT7G4TLP6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);