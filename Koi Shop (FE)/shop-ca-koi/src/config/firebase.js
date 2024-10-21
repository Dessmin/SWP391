// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD69tdPZmcHjkTb3ilFuzh-SSF6JD6gGb8",
  authDomain: "koi-shop-d5263.firebaseapp.com",
  projectId: "koi-shop-d5263",
  storageBucket: "koi-shop-d5263.appspot.com",
  messagingSenderId: "368768967022",
  appId: "1:368768967022:web:61ea1b50f350f25b7ee17f",
  measurementId: "G-EB02ME2QHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
export { googleProvider, auth };
