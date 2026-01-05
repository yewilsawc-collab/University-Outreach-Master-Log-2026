import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

export const signIn = () => signInAnonymously(auth);
export const signOutUser = () => signOut(auth);
