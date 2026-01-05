import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInAnonymously, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();
const tabOrder = ['log', 'advisor', 'files', 'vault']; 

// --- 1. THE GATEKEEPER & INITIALIZATION ---
onAuthStateChanged(auth, (user) => {
    const publicLayer = document.getElementById('layer-public');
    const privateLayer = document.getElementById('layer-private');

    if (user) {
        publicLayer.classList.add('d-none');
        privateLayer.classList.remove('d-none');
        
        // Security Tier: Hide Vault from Guests
        const vaultTab = document.querySelector('[data-tab="vault"]');
        if (user.isAnonymous) {
            vaultTab.style.display = 'none';
        } else {
            vaultTab.style.display = 'block';
        }
        switchTab('log'); // Default start
    } else {
        publicLayer.classList.remove('d-none');
        privateLayer.classList.add('d-none');
    }
});

// --- 2. TAB & INDICATOR LOGIC ---
function switchTab(tabId) {
    // Update Buttons
    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    // Update Content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('d-none', content.id !== `tab-${tabId}`);
    });
    // Update Visual Indicator Dots
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.target === tabId);
    });
}

document.querySelectorAll('.nav-link').forEach(button => {
    button.addEventListener('click', () => switchTab(button.dataset.tab));
});

// --- 3. SWIPE GESTURE MANAGER ---
let touchstartX = 0;
let touchendX = 0;

function handleGesture() {
    const activeBtn = document.querySelector('.nav-link.active');
    if (!activeBtn) return;
    
    const currentTab = activeBtn.dataset.tab;
    let currentIndex = tabOrder.indexOf(currentTab);

    // Swipe Left (Next Tab)
    if (touchendX < touchstartX - 70) {
        if (currentIndex < tabOrder.length - 1) switchTab(tabOrder[currentIndex + 1]);
    }
    // Swipe Right (Previous Tab)
    if (touchendX > touchstartX + 70) {
        if (currentIndex > 0) switchTab(tabOrder[currentIndex - 1]);
    }
}

document.getElementById('layer-private').addEventListener('touchstart', e => touchstartX = e.changedTouches[0].screenX);
document.getElementById('layer-private').addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
});

