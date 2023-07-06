// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_Yl3kW2U3vbcgM1nxVNu-4Y4MSZaE6ZM",
  authDomain: "mysignuppage007.firebaseapp.com",
  projectId: "mysignuppage007",
  storageBucket: "mysignuppage007.appspot.com",
  messagingSenderId: "697146855794",
  appId: "1:697146855794:web:4b19a33f5a6c1b5d62cdeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)
