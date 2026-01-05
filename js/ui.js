import { getAuth, onAuthStateChanged, signOut, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    const publicLayer = document.getElementById('layer-public');
    const privateLayer = document.getElementById('layer-private');

    if (user) {
        // Switch to Private Mode
        publicLayer.classList.add('d-none');
        privateLayer.classList.remove('d-none');
    } else {
        // Return to Public Mode
        publicLayer.classList.remove('d-none');
        privateLayer.classList.add('d-none');
    }
});

// Authentication Triggers
document.getElementById('login-trigger').addEventListener('click', () => signInAnonymously(auth));
document.getElementById('logout-btn').addEventListener('click', () => signOut(auth));

// Tab Navigation
document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.add('d-none'));
        document.getElementById(`tab-${btn.dataset.tab}`).classList.remove('d-none');
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});
            
