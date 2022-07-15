import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyB9O2GJGbKdQSpnbM645bs506w24PPllI4",
  authDomain: "react-curso-5572a.firebaseapp.com",
  projectId: "react-curso-5572a",
  storageBucket: "react-curso-5572a.appspot.com",
  messagingSenderId: "972265921887",
  appId: "1:972265921887:web:7790ef0aad312fdd30eaea"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);