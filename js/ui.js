import { getAuth, onAuthStateChanged, signOut, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

// --- 1. SMART LAYER SWITCHER ---
onAuthStateChanged(auth, (user) => {
    const publicLayer = document.getElementById('layer-public');
    const privateLayer = document.getElementById('layer-private');

    // Only switch to private if the user is authenticated 
    // AND they didn't just land on the page for the first time
    if (user) {
        publicLayer.classList.add('d-none');
        privateLayer.classList.remove('d-none');
        console.log("Authenticated session restored.");
    } else {
        publicLayer.classList.remove('d-none');
        privateLayer.classList.add('d-none');
    }
});

// --- 2. THE TRIGGER (Requires User Action) ---
document.getElementById('login-trigger').addEventListener('click', () => {
    // Explicitly sign in only when the button is clicked
    signInAnonymously(auth).then(() => {
        console.log("Logged in as Guest");
    });
});

// --- 3. THE LOGOUT (Clears Persistent Session) ---
document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth).then(() => {
        // Force refresh to ensure all states are reset
        window.location.reload();
    });
});

