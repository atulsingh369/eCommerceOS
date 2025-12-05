import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBDVmQORbns-oQ1RCgycl0sHEEqa-Qk2zU",
  authDomain: "ecom-web-25008.firebaseapp.com",
  projectId: "ecom-web-25008",
  storageBucket: "ecom-web-25008.firebasestorage.app",
  messagingSenderId: "501798015178",
  appId: "1:501798015178:web:85198757b01aecd57ae433",
  measurementId: "G-Y84VNCPLFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);