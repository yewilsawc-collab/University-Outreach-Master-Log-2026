// firebase.js - REFACTORED
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9fmgduk-bcSRTPL6FdcKKgqvTtQoICpE",
  authDomain: "university-outreach-log.firebaseapp.com",
  projectId: "university-outreach-log",
  storageBucket: "university-outreach-log.firebasestorage.app",
  messagingSenderId: "566149647802",
  appId: "1:566149647802:web:490c7cc3d10b7cd7732183"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const rtdb = getDatabase(app); // Fixed typo from 'getdatabase'

export const signIn = () => signInAnonymously(auth);
export const signOutUser = () => signOut(auth);
// Sign up with email + password
export async function signUp(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

// Sign in with email + password
export async function signInWithEmail(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}


