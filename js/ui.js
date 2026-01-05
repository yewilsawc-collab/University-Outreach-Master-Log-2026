import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInAnonymously, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

// --- THE LAYER SWITCHER ---
onAuthStateChanged(auth, (user) => {
    const publicLayer = document.getElementById('layer-public');
    const privateLayer = document.getElementById('layer-private');

    if (user) {
        publicLayer.classList.add('d-none');
        privateLayer.classList.remove('d-none');
        
        // Hide Vault from Guests for extra security
        const vaultTab = document.querySelector('[data-tab="vault"]');
        if (user.isAnonymous) {
            vaultTab.classList.add('d-none');
        } else {
            vaultTab.classList.remove('d-none');
        }
    } else {
        publicLayer.classList.remove('d-none');
        privateLayer.classList.add('d-none');
    }
});

// --- AUTH UI TRIGGERS ---
document.getElementById('show-auth-ui').addEventListener('click', () => {
    document.getElementById('landing-content').classList.add('d-none');
    document.getElementById('auth-container').classList.remove('d-none');
});

document.getElementById('close-auth').addEventListener('click', () => {
    document.getElementById('landing-content').classList.remove('d-none');
    document.getElementById('auth-container').classList.add('d-none');
});

// --- LOGIN METHODS ---
document.getElementById('email-login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
        alert("Login failed. Check your credentials.");
    }
});

document.getElementById('guest-login-btn').addEventListener('click', () => signInAnonymously(auth));

document.getElementById('logout-btn').addEventListener('click', () => signOut(auth).then(() => window.location.reload()));
    
