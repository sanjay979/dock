// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmnSTQt00T2ozySriIsrKDqJz2A2RQ-qs",
  authDomain: "docfiles-aba54.firebaseapp.com",
  projectId: "docfiles-aba54",
  storageBucket: "docfiles-aba54.appspot.com",
  messagingSenderId: "1089275487163",
  appId: "1:1089275487163:web:e23ab700eae13ae49e5a9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider }; // Export auth and provider
