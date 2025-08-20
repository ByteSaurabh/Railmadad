import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKs9b8uFLr-eYkLWQleSzJ6DjGfgYx1Rg",
  authDomain: "railmadad-dca0d.firebaseapp.com",
  projectId: "railmadad-dca0d",
  storageBucket: "railmadad-dca0d.appspot.com",
  messagingSenderId: "1054668778468",
  appId: "1:1054668778468:web:your-app-id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
