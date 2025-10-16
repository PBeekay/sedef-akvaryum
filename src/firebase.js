// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDx8gblokEpOu9tdBkqIRf8LK7WsJxX4ek",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "sedef-akvaryum.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "sedef-akvaryum",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "sedef-akvaryum.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "641783453291",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:641783453291:web:7c92e856ee9739a0e2432e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

// Export the instances
export { db, auth };