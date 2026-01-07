// Import Firebase core and Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Firebase app using config injected at build time
const app = initializeApp(window.firebaseConfig);

// Export Firestore instance for use in other modules
export const db = getFirestore(app);
