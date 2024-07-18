// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg3ctl3IMtxfvNI5wSP5B0nIR8n7E5pc0",
  authDomain: "sleek2-98eb6.firebaseapp.com",
  projectId: "sleek2-98eb6",
  storageBucket: "sleek2-98eb6.appspot.com",
  messagingSenderId: "696525009091",
  appId: "1:696525009091:web:9d16750ccafd05d9ebb276",
  measurementId: "G-XL8W97QB64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
