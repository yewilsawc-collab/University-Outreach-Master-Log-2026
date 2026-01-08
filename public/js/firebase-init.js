import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  "apiKey": "AIzaSyB9fmgduk-bcSRTPL6FdcKKgqvTtQoICpE",
    "authDomain": "university-outreach-log.firebaseapp.com",
    "projectId": "university-outreach-log",
    "storageBucket": "university-outreach-log.firebasestorage.app",
    "messagingSenderId": "566149647802",
    "appId": "1:566149647802:web:490c7cc3d10b7cd7732183"
  }

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

window.app = app;
window.auth = auth;
window.db = db;
window.storage = storage;

window.signIn = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};
window.signOutUser = () => signOut(auth);

onAuthStateChanged(auth, (user) => {
  const status = document.getElementById("status-text");
  if (status) status.textContent = user ? `Node: ${user.email}` : "Guest Node";
});
