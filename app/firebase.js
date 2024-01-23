// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4nSkAsOLFtNZlmHLtuxJd_Fzf1q4y-xo",
  authDomain: "sharp-af471.firebaseapp.com",
  projectId: "sharp-af471",
  storageBucket: "sharp-af471.appspot.com",
  messagingSenderId: "924459726488",
  appId: "1:924459726488:web:ed45e4e36bba0f33a782ed",
  measurementId: "G-Q4D0HE9DFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);