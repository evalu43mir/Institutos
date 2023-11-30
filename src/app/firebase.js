// Import the functions you need from the SDKs you need
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFot3f_rL8DcBToJjrh4hTUn83_6PMFoQ",
    authDomain: "manualidades-app-mj.firebaseapp.com",
    projectId: "manualidades-app-mj",
    storageBucket: "manualidades-app-mj.appspot.com",
    messagingSenderId: "439578296145",
    appId: "1:439578296145:web:b974ff18a4891759d29d70"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);