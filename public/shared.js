import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = { /* Your Config Here */ };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Check if user is logged in, if not, redirect to index
export function protectRoute() {
    onAuthStateChanged(auth, (user) => {
        if (!user && !window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        }
    });
}
