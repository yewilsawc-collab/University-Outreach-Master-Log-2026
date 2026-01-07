import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

async function init() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // LAYER 1: Authenticated State
            console.log("User verified. Accessing layers...");
            
            // Proceed with your profile syncing
            const profileRef = doc(db, "users", user.uid);
            await setDoc(profileRef, MY_PROFILE, { merge: true });
            
            // Make the UI visible
            showEcosystem();
        } else {
            // LAYER 0: Public Landing/Login
            console.log("No active session. Redirecting to login...");
            window.location.href = "login.html"; // Or show your login modal
        }
    });
}

function showEcosystem() {
    const splash = document.querySelector('#splash-screen');
    const appInterface = document.querySelector('#main-ecosystem');
    
    splash.style.display = 'none';
    appInterface.classList.remove('opacity-0');
    appInterface.classList.add('opacity-100');
}

