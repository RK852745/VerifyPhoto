// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqArBAtR5zmQiUf_5nf4fJyRcJLKtBuO8",
  authDomain: "verify-44448.firebaseapp.com",
  projectId: "verify-44448",
  storageBucket: "verify-44448.appspot.com",
  messagingSenderId: "640984834122",
  appId: "1:640984834122:web:448792e05b81f518b9c6b3",
  measurementId: "G-ZKMVCMMW1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);