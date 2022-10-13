import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "swifterchat.firebaseapp.com",
  projectId: "swifterchat",
  storageBucket: "swifterchat.appspot.com",
  messagingSenderId: "825340444081",
  appId: "1:825340444081:web:0c3bf02f86077b1256d190"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();


