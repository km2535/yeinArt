import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "yeinart-cba41.appspot.com",
  messagingSenderId: "737793589786",
  appId: "1:737793589786:web:03d49ac32cd20dd112c7a3",
  measurementId: "G-G2DSV6Z12T",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default db;
