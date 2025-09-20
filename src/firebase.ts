import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXnddDUrHfJw61e0gf937Vbg0ZHA528ZI",
  authDomain: "my-portfolio-41e33.firebaseapp.com",
  projectId: "my-portfolio-41e33",
  storageBucket: "my-portfolio-41e33.appspot.com",
  messagingSenderId: "149995704329",
  appId: "1:149995704329:web:9852af42b478a49e7b28d8",
  measurementId: "G-YCWLBNKX8H"
};

// Initialize Firebase (ensuring it only runs once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore and export it for use in other components
const db = getFirestore(app);

export { db };