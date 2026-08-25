// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, Auth} from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxAV3uuRCbuxkEer8-28eb_ERh251ISjg",
  authDomain: "advanced-ecommerce-app-1e7bb.firebaseapp.com",
  projectId: "advanced-ecommerce-app-1e7bb",
  storageBucket: "advanced-ecommerce-app-1e7bb.firebasestorage.app",
  messagingSenderId: "1000854489858",
  appId: "1:1000854489858:web:9fab1974bcc1900a19501b",
  measurementId: "G-4S49WHM3LT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
