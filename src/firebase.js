import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAsZMOVq6kQdH3OjQ8rkBF7IU0id8SMUw",
  authDomain: "quickchater.firebaseapp.com",
  projectId: "quickchater",
  storageBucket: "quickchater.appspot.com",
  messagingSenderId: "925324825658",
  appId: "1:925324825658:web:b2287431a4065092ae1103",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
