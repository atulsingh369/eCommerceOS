import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBDVmQORbns-oQ1RCgycl0sHEEqa-Qk2zU",
    // Use the current domain for auth to support the reverse proxy (bypasses 3rd party cookie blocking)
    // Fallback to the firebaseapp domain for server-side rendering or non-browser environments
    authDomain: typeof window !== "undefined" ? window.location.hostname : "ecom-web-25008.firebaseapp.com",
    projectId: "ecom-web-25008",
    storageBucket: "ecom-web-25008.firebasestorage.app",
    messagingSenderId: "501798015178",
    appId: "1:501798015178:web:85198757b01aecd57ae433",
    measurementId: "G-Y84VNCPLFP"
};

// Initialize Firebase (Singleton pattern for Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
