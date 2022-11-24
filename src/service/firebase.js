import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "yein-bc06d.appspot.com",
  messagingSenderId: "201806451274",
  appId: "1:201806451274:web:e722b445b3e3a086e98cb3",
  measurementId: "G-J6W95HTSXB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default db;
