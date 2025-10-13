// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDx8gblokEpOu9tdBkqIRf8LK7WsJxX4ek",
  authDomain: "sedef-akvaryum.firebaseapp.com",
  projectId: "sedef-akvaryum",
  storageBucket: "sedef-akvaryum.firebasestorage.app",
  messagingSenderId: "641783453291",
  appId: "1:641783453291:web:7c92e856ee9739a0e2432e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the database instance
export { db };