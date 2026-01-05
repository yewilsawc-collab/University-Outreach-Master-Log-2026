import { getAuth, onAuthStateChanged, signOut, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const auth = getAuth();
const storage = getStorage();

// --- 1. LAYER SWITCHING ENGINE ---
onAuthStateChanged(auth, (user) => {
    const publicLayer = document.getElementById('layer-public');
    const privateLayer = document.getElementById('layer-private');
    const authStatusText = document.getElementById('auth-status-text');

    if (user) {
        // User is logged in: Show Dashboard
        publicLayer.classList.add('d-none');
        privateLayer.classList.remove('d-none');
        authStatusText.innerText = user.isAnonymous ? "Guest Mode" : user.email;
        loadVaultFiles(user.uid);
    } else {
        // No user: Show Public Resume
        publicLayer.classList.remove('d-none');
        privateLayer.classList.add('d-none');
    }
});

// --- 2. THEME (DARK MODE) MANAGEMENT ---
const themeBtn = document.getElementById("toggle-theme");
const applyTheme = (theme) => {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.innerText = "☀️";
    } else {
        document.body.classList.remove("dark-mode");
        themeBtn.innerText = "🌙";
    }
};

// Initialize theme from storage
applyTheme(localStorage.getItem("theme"));

themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    const theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    applyTheme(theme);
});

// --- 3. AUTH ACTIONS ---
document.getElementById('login-trigger').addEventListener('click', () => signInAnonymously(auth));
document.getElementById('logout-btn').addEventListener('click', () => signOut(auth));

// --- 4. FILE VAULT (Download/View) ---
async function loadVaultFiles(uid) {
    const listRef = ref(storage, `uploads/${uid}`);
    const container = document.getElementById("vault-file-list");
    if (!container) return;
    
    container.innerHTML = "<p class='small text-muted'>Loading vault...</p>";
    try {
        const res = await listAll(listRef);
        container.innerHTML = res.items.length ? "" : "<p class='small text-muted'>Vault is empty.</p>";
        res.items.forEach(async (item) => {
            const url = await getDownloadURL(item);
            const div = document.createElement("div");
            div.className = "file-item d-flex justify-content-between align-items-center p-2 border-bottom";
            div.innerHTML = `<span>${item.name}</span><a href="${url}" target="_blank" class="btn-gold">View</a>`;
            container.appendChild(div);
        });
    } catch (err) {
        container.innerHTML = "Error loading files.";
    }
}
    
