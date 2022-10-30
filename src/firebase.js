// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB-a93L2-B1Rkyr0Gu9LUYN028rknlNn4",
  authDomain: "chatty-traveler-44dc2.firebaseapp.com",
  projectId: "chatty-traveler-44dc2",
  storageBucket: "chatty-traveler-44dc2.appspot.com",
  messagingSenderId: "909069274724",
  appId: "1:909069274724:web:0c88c6021225c3d87ed971",
  measurementId: "G-TSBHYK051Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
