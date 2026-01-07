
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Firestore for real-time monitoring
const db = getFirestore();

/**
 * CORE INITIALIZER
 * Call this in your HTML module script to boot the ecosystem.
 */
export function initNavigation() {
    injectLoader();
    injectBaseLayout();
    initSolarSync();
    initStatusMonitor();
    setupInteractions();
    handleActiveState();
    registerServiceWorker();
}

// --- 1. UI INJECTION MODULES ---

function injectLoader() {
    const loaderHTML = `
    <div id="loader-overlay" style="position:fixed; inset:0; z-index:1000; background:#000; display:flex; flex-direction:column; align-items:center; justify-content:center; transition: opacity 0.5s ease;">
        <div class="node-pulse bg-[#f1c40f] w-16 h-16 rounded-2xl flex items-center justify-center text-black font-black text-2xl mb-4 shadow-[0_0_30px_rgba(241,196,15,0.4)]">E</div>
        <div class="loader-text text-[#f1c40f] text-[10px] font-bold tracking-[0.3em] animate-pulse uppercase">Node Connecting...</div>
    </div>`;
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);

    window.addEventListener('load', () => {
        const loader = document.getElementById('loader-overlay');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 300);
    });
}

function injectBaseLayout() {
    const navHTML = `
    <div class="neural-glow fixed w-[300px] h-[300px] rounded-full bg-[#f1c40f]/5 blur-[100px] pointer-events-none z-0" id="glow"></div>
    
    <aside class="elementa-glass glass-noise w-full md:w-64 h-16 md:h-[95vh] fixed bottom-0 md:top-[2.5vh] md:left-4 z-[100] md:rounded-3xl flex md:flex-col items-center p-2 md:p-4 transition-all">
        <div class="logo-node hidden md:flex items-center gap-3 mb-10 px-2 cursor-pointer" onclick="window.location.href='index.html'">
            <div class="w-10 h-10 bg-[#f1c40f] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(241,196,15,0.3)]">
                <span class="text-black font-black text-xl">E</span>
            </div>
            <h1 class="font-black tracking-tighter text-lg">ELEMENTA</h1>
        </div>

        <nav class="flex-1 flex flex-row md:flex-col gap-2 w-full justify-around md:justify-start">
            <a href="feed.html" class="glass-interactive flex items-center gap-4 p-4 rounded-2xl hover:text-[#f1c40f] transition-all">
                <span>🏠</span> <span class="hidden md:block font-bold text-[10px] uppercase tracking-widest">Stream</span>
            </a>
            <a href="messages.html" class="glass-interactive flex items-center gap-4 p-4 rounded-2xl hover:text-[#f1c40f] transition-all">
                <span>💬</span> <span class="hidden md:block font-bold text-[10px] uppercase tracking-widest">Neural Link</span>
            </a>
            <a href="vault.html" class="glass-interactive flex items-center gap-4 p-4 rounded-2xl hover:text-[#f1c40f] transition-all">
                <span>📂</span> <span class="hidden md:block font-bold text-[10px] uppercase tracking-widest">Vault</span>
            </a>
            <button onclick="toggleSearch()" class="glass-interactive flex items-center gap-4 p-4 rounded-2xl text-slate-400 hover:text-[#f1c40f]">
                <span>🔍</span> <span class="hidden md:block font-bold text-[10px] uppercase tracking-widest">Search</span>
            </button>
        </nav>

        <a href="profile.html" class="glass-interactive mt-auto p-2 rounded-2xl border border-white/5 hidden md:flex items-center gap-3 w-full">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f1c40f] to-orange-500"></div>
            <div class="overflow-hidden">
                <p class="text-[9px] font-black truncate uppercase">Yewilsaw Chanie</p>
                <p class="text-[7px] text-slate-500 uppercase tracking-tighter">Physical Chemist</p>
            </div>
        </a>
    </aside>

    <div id="search-modal" class="hidden fixed inset-0 z-[200] elementa-glass backdrop-blur-3xl p-6 flex flex-col items-center pt-24 page-transition">
        <button onclick="toggleSearch()" class="absolute top-8 right-8 text-2xl">✕</button>
        <div class="w-full max-w-2xl">
            <input type="text" id="grid-search-input" oninput="executeSearch(this.value)" 
                   placeholder="SEARCH NODES OR SHARDS..." 
                   class="w-full bg-transparent border-b-2 border-[#f1c40f] text-3xl font-black outline-none pb-4 tracking-tighter uppercase placeholder:opacity-20">
            <div id="search-results" class="mt-12 space-y-4 max-h-[60vh] overflow-y-auto custom-scroll"></div>
        </div>
    </div>

    <div id="quick-action-overlay" class="hidden fixed inset-0 z-[300] bg-black/80 backdrop-blur-xl items-center justify-center p-6" onclick="hideQuickActions()">
        <div class="grid grid-cols-2 gap-4 max-w-sm w-full">
            <button class="glass-interactive p-8 rounded-3xl flex flex-col items-center gap-3" onclick="window.location.href='feed.html?action=new'">
                <span class="text-3xl">✨</span> <span class="text-[10px] font-black">NEW SHARD</span>
            </button>
            <button class="glass-interactive p-8 rounded-3xl flex flex-col items-center gap-3" onclick="window.location.href='vault.html?action=upload'">
                <span class="text-3xl">📂</span> <span class="text-[10px] font-black">VAULT UP</span>
            </button>
            <button class="glass-interactive p-8 rounded-3xl flex flex-col items-center gap-3" onclick="window.location.href='messages.html'">
                <span class="text-3xl">💬</span> <span class="text-[10px] font-black">MESSAGES</span>
            </button>
            <button class="glass-interactive p-8 rounded-3xl flex flex-col items-center gap-3" onclick="toggleSearch()">
                <span class="text-3xl">🔍</span> <span class="text-[10px] font-black">SEARCH</span>
            </button>
        </div>
    </div>`;

    const container = document.getElementById('global-nav');
    if (container) container.innerHTML = navHTML;
}

// --- 2. INTERACTION ENGINE ---

function setupInteractions() {
    const glow = document.getElementById('glow');
    const logoNode = document.querySelector('.logo-node');
    let touchTimer;

    // Neural Glow Following (Touch/Android)
    document.addEventListener('touchstart', (e) => {
        if (!glow) return;
        const touch = e.touches[0];
        glow.style.transform = `translate(${touch.clientX - 150}px, ${touch.clientY - 150}px)`;
    });

    // Logo Long Press for Quick Actions
    if (logoNode) {
        logoNode.addEventListener('touchstart', () => {
            touchTimer = setTimeout(() => {
                if (navigator.vibrate) navigator.vibrate([30, 50]);
                window.showQuickActions();
            }, 600);
        });
        logoNode.addEventListener('touchend', () => clearTimeout(touchTimer));
        logoNode.addEventListener('touchmove', () => clearTimeout(touchTimer));
    }
}

// --- 3. ECOSYSTEM MONITORING ---

export function initStatusMonitor() {
    const statusHTML = `
        <div class="elementa-glass status-shard fixed bottom-20 md:bottom-8 right-8 flex items-center gap-3 px-4 py-2 rounded-full text-[8px] font-black tracking-widest z-[90] border border-white/5">
            <div id="connection-dot" class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span id="latency-text">00MS</span>
            <span class="opacity-20">|</span>
            <span id="node-count">1 NODE ONLINE</span>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', statusHTML);

    // Latency Ping Logic
    setInterval(async () => {
        const start = Date.now();
        try {
            await fetch('https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?VER=8', { mode: 'no-cors' });
            const latency = Date.now() - start;
            const text = document.getElementById('latency-text');
            const dot = document.getElementById('connection-dot');
            
            text.textContent = `${latency}MS`;
            dot.className = latency > 300 ? "w-2 h-2 rounded-full bg-yellow-500" : "w-2 h-2 rounded-full bg-green-500";
        } catch {
            document.getElementById('connection-dot').className = "w-2 h-2 rounded-full bg-red-500";
            document.getElementById('latency-text').textContent = "DISCONNECTED";
        }
    }, 5000);

    // Active Node Count Listener
    onSnapshot(collection(db, "active_sessions"), (snap) => {
        const count = snap.size || 1;
        document.getElementById('node-count').textContent = `${count} ${count === 1 ? 'NODE' : 'NODES'} ONLINE`;
    });
}

export function initSolarSync() {
    const hour = new Date().getHours();
    document.body.classList.remove('obsidian-mode', 'alabaster-mode');
    document.body.classList.add(hour >= 18 || hour < 6 ? 'obsidian-mode' : 'alabaster-mode');
}

// --- 4. GLOBAL UTILITIES & ACTIONS ---

window.toggleSearch = () => {
    const modal = document.getElementById('search-modal');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        document.getElementById('grid-search-input').focus();
    }
};

window.executeSearch = (query) => {
    const resultsContainer = document.getElementById('search-results');
    if (query.length < 2) {
        resultsContainer.innerHTML = '';
        return;
    }

    // High Performance Client-Side Search
    const localPosts = Array.from(document.querySelectorAll('.elementa-glass p'));
    const filtered = localPosts.filter(p => p.textContent.toLowerCase().includes(query.toLowerCase()));

    resultsContainer.innerHTML = filtered.map(p => `
        <div class="glass-interactive p-4 rounded-2xl border border-white/5 cursor-pointer" onclick="toggleSearch()">
            <p class="text-[8px] text-[#f1c40f] font-black mb-1 uppercase tracking-widest">SHARD MATCH</p>
            <p class="text-sm line-clamp-2 opacity-70 font-light">${p.textContent}</p>
        </div>
    `).join('');
};

window.showQuickActions = () => {
    document.getElementById('quick-action-overlay').style.display = 'flex';
};

window.hideQuickActions = () => {
    document.getElementById('quick-action-overlay').style.display = 'none';
};

function handleActiveState() {
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('bg-white/10', 'text-[#f1c40f]', 'border', 'border-white/10');
        }
    });
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(() => console.log('Neural Link Cached.'))
                .catch(() => console.log('Offline Node Failed.'));
        });
    }
}

