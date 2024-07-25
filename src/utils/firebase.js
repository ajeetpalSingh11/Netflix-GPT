// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaFOEnCpsxdynTN0qKVfXyw4uleN7fbWc",
  authDomain: "netflixgpt-629ce.firebaseapp.com",
  projectId: "netflixgpt-629ce",
  storageBucket: "netflixgpt-629ce.appspot.com",
  messagingSenderId: "959682191811",
  appId: "1:959682191811:web:206b8d02f08142052d1d76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

