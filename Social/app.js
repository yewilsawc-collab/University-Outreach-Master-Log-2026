import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = { /* Your Config Here */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LAYER SWITCHER
window.showLayer = (layerId) => {
    document.querySelectorAll('section, main').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(layerId);
    target.classList.remove('hidden');
    if(layerId === 'layer-app') {
        setTimeout(() => target.classList.add('opacity-100'), 100);
    }
};

// AUTH OBSERVER
onAuthStateChanged(auth, (user) => {
    if (user) {
        showLayer('layer-app');
        // Initialize your kinetics feed/Gemini here
    } else {
        showLayer('layer-landing');
    }
});

// LOGIN LOGIC
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
    } catch (err) {
        const errDiv = document.getElementById('auth-error');
        errDiv.innerText = err.message;
        errDiv.classList.remove('hidden');
    }
});
            
