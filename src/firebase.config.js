import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "house-marketplace-website.firebaseapp.com",
  projectId: "house-marketplace-website",
  storageBucket: "house-marketplace-website.appspot.com",
  messagingSenderId: "166867920367",
  appId: "1:166867920367:web:ebe32e026b9530e3cf021a"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
