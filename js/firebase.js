import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Simple sign-in/out helpers
export const signIn = () => signInAnonymously(auth);
export const signOutUser = () => signOut(auth);
