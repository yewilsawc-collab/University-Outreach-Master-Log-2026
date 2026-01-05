import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInAnonymously, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();
const tabOrder = ['log', 'advisor', 'vault'];

// --- LAYER & TIERED ACCESS ---
onAuthStateChanged(auth, (user) => {
    const publicLayer = document.getElementById('layer-public');
    const privateLayer = document.getElementById('layer-private');

    if (user) {
        publicLayer.classList.add('d-none');
        privateLayer.classList.remove('d-none');
        
        // Tiered Access: Hide Vault for Guests
        const vaultTab = document.querySelector('[data-tab="vault"]');
        vaultTab.style.display = user.isAnonymous ? 'none' : 'block';
        switchTab('log');
    } else {
        publicLayer.classList.remove('d-none');
        privateLayer.classList.add('d-none');
    }
});

// --- TAB & INDICATOR ENGINE ---
function switchTab(tabId) {
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.toggle('d-none', content.id !== `tab-${tabId}`));
    document.querySelectorAll('.dot').forEach(dot => dot.classList.toggle('active', dot.dataset.target === tabId));
}

document.querySelectorAll('.nav-link').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

// --- SWIPE GESTURES ---
let startX = 0;
document.getElementById('layer-private').addEventListener('touchstart', e => startX = e.touches[0].clientX);
document.getElementById('layer-private').addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    let currentIndex = tabOrder.indexOf(document.querySelector('.nav-link.active').dataset.tab);
    if (startX - endX > 70 && currentIndex < tabOrder.length - 1) switchTab(tabOrder[currentIndex + 1]);
    if (endX - startX > 70 && currentIndex > 0) switchTab(tabOrder[currentIndex - 1]);
});

// --- AUTH ACTIONS ---
document.getElementById('show-auth-ui').addEventListener('click', () => {
    document.getElementById('landing-content').classList.add('d-none');
    document.getElementById('auth-container').classList.remove('d-none');
});
document.getElementById('email-login-btn').addEventListener('click', () => {
    signInWithEmailAndPassword(auth, document.getElementById('login-email').value, document.getElementById('login-password').value);
});
document.getElementById('guest-login-btn').addEventListener('click', () => signInAnonymously(auth));
document.getElementById('logout-btn').addEventListener('click', () => signOut(auth).then(() => window.location.reload()));
    
