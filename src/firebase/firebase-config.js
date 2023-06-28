// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-8QkmUBhDiUUSjFFR2fbgXBdemF5bzfs",
  authDomain: "monkey-blogging-44823.firebaseapp.com",
  projectId: "monkey-blogging-44823",
  storageBucket: "monkey-blogging-44823.appspot.com",
  messagingSenderId: "62952427501",
  appId: "1:62952427501:web:d51ff23e52766c1e63e1e4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
