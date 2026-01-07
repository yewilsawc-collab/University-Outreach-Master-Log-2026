<script type="module">
    import { initNavigation } from './js/master.js';
    initNavigation();
</script>
    // js/master.js
export function initNavigation() {
    const navHTML = `
    <aside class="elementa-glass glass-noise w-20 md:w-64 h-[95vh] my-[2.5vh] ml-4 rounded-3xl flex flex-col p-4 fixed left-0 z-50">
        <div class="flex items-center gap-3 mb-10 px-2 cursor-pointer" onclick="window.location.href='../index.html'">
            <div class="w-10 h-10 bg-[#f1c40f] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(241,196,15,0.3)]">
                <span class="text-black font-black text-xl">E</span>
            </div>
            <h1 class="font-black tracking-tighter hidden md:block text-lg">ELEMENTA</h1>
        </div>

        <nav class="flex-1 flex flex-col gap-2">
            <a href="feed.html" class="glass-interactive flex items-center gap-4 p-4 rounded-2xl hover:text-[#f1c40f] transition-all">
                <span>🏠</span> <span class="hidden md:block font-bold text-xs uppercase tracking-widest">Stream</span>
            </a>
            <a href="messages.html" class="glass-interactive flex items-center gap-4 p-4 rounded-2xl hover:text-[#f1c40f] transition-all">
                <span>💬</span> <span class="hidden md:block font-bold text-xs uppercase tracking-widest">Neural Link</span>
            </a>
            <a href="vault.html" class="glass-interactive flex items-center gap-4 p-4 rounded-2xl hover:text-[#f1c40f] transition-all">
                <span>📂</span> <span class="hidden md:block font-bold text-xs uppercase tracking-widest">Vault</span>
            </a>
        </nav>

        <a href="profile.html" class="glass-interactive mt-auto p-2 rounded-2xl border border-white/5 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f1c40f] to-orange-500"></div>
            <div class="hidden md:block overflow-hidden">
                <p class="text-[10px] font-bold truncate">Yewilsaw Chanie</p>
                <p class="text-[8px] text-slate-500">Physical Chemist</p>
            </div>
        </a>
    </aside>
    `;

    const navContainer = document.getElementById('global-nav');
    if (navContainer) {
        navContainer.innerHTML = navHTML;
        
        // Highlight active page
        const currentPage = window.location.pathname.split("/").pop();
        const links = navContainer.querySelectorAll('a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('bg-white/10', 'text-[#f1c40f]', 'border', 'border-white/10');
            }
        });
    }
        }
// js/master.js

export function initNavigation() {
    // 1. Inject Loader HTML
    const loaderHTML = `
    <div id="loader-overlay">
        <div class="node-pulse">E</div>
        <div class="loader-text tracking-widest animate-pulse">Node Connecting...</div>
    </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);

    // 2. Navigation Bar HTML (Previous turn logic included)
    const navHTML = `
    <div class="neural-glow" id="glow"></div>
    <aside class="elementa-glass w-full md:w-64 h-16 md:h-[95vh] fixed bottom-0 md:top-[2.5vh] md:left-4 z-[100] md:rounded-3xl flex md:flex-row md:flex-col items-center justify-around md:justify-start p-2 md:p-4">
        </aside>
    `;

    const navContainer = document.getElementById('global-nav');
    if (navContainer) navContainer.innerHTML = navHTML;

    // 3. Handle Loader Removal
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader-overlay');
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 300); // Small delay to ensure smooth transition
    });

    // 4. Neural Glow for Android Touch
    const glow = document.getElementById('glow');
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        glow.style.transform = `translate(${touch.clientX - 150}px, ${touch.clientY - 150}px)`;
    });
                            }
                              
// Add this inside the navHTML string in your initNavigation function
const searchTrigger = `
    <div class="mt-4 px-2">
        <button onclick="toggleSearch()" class="glass-interactive w-full flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl text-slate-400">
            <span>🔍</span>
            <span class="hidden md:block font-bold text-[10px] uppercase tracking-[0.2em]">Search Grid</span>
        </button>
    </div>
`;

// Add the Search Overlay to the bottom of your body
const searchOverlay = `
    <div id="search-modal" class="hidden fixed inset-0 z-[200] elementa-glass backdrop-blur-3xl p-6 flex flex-col items-center pt-24 page-transition">
        <button onclick="toggleSearch()" class="absolute top-8 right-8 text-2xl">✕</button>
        <div class="w-full max-w-2xl">
            <input type="text" id="grid-search-input" oninput="executeSearch(this.value)" 
                   placeholder="SEARCH NODES OR SHARDS..." 
                   class="w-full bg-transparent border-b-2 border-[#f1c40f] text-3xl font-black outline-none pb-4 tracking-tighter uppercase placeholder:opacity-20">
            <div id="search-results" class="mt-12 space-y-4 max-h-[60vh] overflow-y-auto custom-scroll">
                </div>
        </div>
    </div>
`;
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

    // Logic: Filter posts currently stored in your local session for instant speed
    // This is "High Performance" because it happens in 0ms on the client side
    const localPosts = Array.from(document.querySelectorAll('.elementa-glass p'));
    const filtered = localPosts.filter(p => p.textContent.toLowerCase().includes(query.toLowerCase()));

    resultsContainer.innerHTML = filtered.map(p => `
        <div class="glass-interactive p-4 rounded-2xl border border-white/5 cursor-pointer" onclick="toggleSearch()">
            <p class="text-xs text-[#f1c40f] font-black mb-1 uppercase">SHARD MATCH</p>
            <p class="text-sm line-clamp-2 opacity-70">${p.textContent}</p>
        </div>
    `).join('');
};
// Add this to your initNavigation function in master.js

let touchTimer;
const logoNode = document.querySelector('.logo-node'); // Add this class to your Nav Logo

function startLongPress() {
    touchTimer = setTimeout(() => {
        if (window.navigator.vibrate) window.navigator.vibrate([30, 50]); // Dual-pulse feedback
        showQuickActions();
    }, 600); // 600ms held down triggers the menu
}

function cancelLongPress() {
    clearTimeout(touchTimer);
}

// Attach to your logo
logoNode.addEventListener('touchstart', startLongPress);
logoNode.addEventListener('touchend', cancelLongPress);
logoNode.addEventListener('touchmove', cancelLongPress);

window.showQuickActions = () => {
    const overlay = document.getElementById('quick-action-overlay');
    overlay.style.display = 'flex';
};

window.hideQuickActions = () => {
    document.getElementById('quick-action-overlay').style.display = 'none';
};
const quickActionHTML = `
<div id="quick-action-overlay" onclick="hideQuickActions()">
    <div class="action-circle">
        <button class="action-btn elementa-glass" onclick="window.location.href='feed.html?action=new'">
            <span class="text-3xl">✨</span> NEW SHARD
        </button>
        <button class="action-btn elementa-glass" onclick="window.location.href='vault.html?action=upload'">
            <span class="text-3xl">📂</span> VAULT UP
        </button>
        <button class="action-btn elementa-glass" onclick="window.location.href='messages.html'">
            <span class="text-3xl">💬</span> NEURAL LINK
        </button>
        <button class="action-btn elementa-glass" onclick="toggleSearch()">
            <span class="text-3xl">🔍</span> SEARCH
        </button>
    </div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', quickActionHTML);
// Add to your master.js init function
export function initStatusMonitor() {
    const statusHTML = `
        <div class="elementa-glass status-shard">
            <div id="connection-dot" class="status-dot online"></div>
            <span id="latency-text">00ms</span>
            <span class="opacity-20">|</span>
            <span id="node-count">1 ACTIVE NODE</span>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', statusHTML);

    // 1. Monitor Latency
    setInterval(() => {
        const start = Date.now();
        // Ping the free cloud endpoint
        fetch('https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?VER=8', { mode: 'no-cors' })
            .then(() => {
                const latency = Date.now() - start;
                const text = document.getElementById('latency-text');
                const dot = document.getElementById('connection-dot');
                
                text.textContent = `${latency}ms`;
                
                // Dynamic visual feedback
                if(latency > 300) dot.className = "status-dot lagging";
                else dot.className = "status-dot online";
            })
            .catch(() => {
                document.getElementById('connection-dot').className = "status-dot offline";
                document.getElementById('latency-text').textContent = "DISCONNECTED";
            });
    }, 5000); // Check every 5 seconds to save free-tier bandwidth
                    }
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();

// Listen for total active sessions in the ecosystem
onSnapshot(collection(db, "active_sessions"), (snap) => {
    const count = snap.size || 1;
    document.getElementById('node-count').textContent = `${count} ${count === 1 ? 'NODE' : 'NODES'} ONLINE`;
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Neural Link Cached.'))
      .catch(err => console.log('Offline Node Failed.'));
  });
}
export function initSolarSync() {
    const hour = new Date().getHours();
    const body = document.body;
    
    // If it's between 6 PM and 6 AM, stay in Obsidian mode
    if (hour >= 18 || hour < 6) {
        body.classList.add('obsidian-mode');
    } else {
        body.classList.add('alabaster-mode'); // Soft light glass for daytime
    }
}
function triggerSparkVisuals(data) {
    // 1. Android Haptics
    if (window.navigator.vibrate) {
        window.navigator.vibrate([100, 50, 100]); 
    }

    // 2. UI Overlay
    const flash = document.createElement('div');
    flash.className = "fixed inset-0 z-[1000] bg-[#f1c40f]/20 backdrop-blur-sm pointer-events-none animate-spark-flash";
    document.body.appendChild(flash);

    // 3. Clean up
    setTimeout(() => flash.remove(), 1000);
    
    // 4. Show Notification Toast
    showToast("✨ A NEW NODE HAS SPARKED YOU!");
}
export function triggerSparkResponse() {
    // 1. Physical Pulse (Android Exclusive)
    // A 'Double Tap' vibration pattern
    if ("vibrate" in navigator) {
        navigator.vibrate([100, 50, 100]); 
    }

    // 2. Visual Surge
    const overlay = document.createElement('div');
    overlay.className = "fixed inset-0 z-[1000] bg-[#f1c40f]/10 pointer-events-none animate-spark-flash";
    document.body.appendChild(overlay);

    // 3. Notification Toast
    const toast = document.createElement('div');
    toast.className = "fixed top-10 left-1/2 -translate-x-1/2 elementa-glass spark-toast px-8 py-4 rounded-2xl z-[1001] text-[10px] font-black uppercase tracking-widest text-[#f1c40f]";
    toast.innerHTML = "✨ Node Resonance Detected";
    document.body.appendChild(toast);

    // 4. Cleanup Memory
    setTimeout(() => {
        overlay.remove();
        toast.remove();
    }, 2000);
        }
// Triggered by the Broadcast Logic
export function launchGenesisPulse(message) {
    // 1. Force the 'Universal Gold' Theme for 5 seconds
    document.body.classList.add('pulse-active');
    
    // 2. Heavy Haptic Sequence (Long Pulse)
    if ("vibrate" in navigator) {
        navigator.vibrate([500, 200, 500]); 
    }

    // 3. Display the Broadcast Message
    const pulseBox = document.createElement('div');
    pulseBox.className = "fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-3xl p-10";
    pulseBox.innerHTML = `
        <div class="text-center">
            <h1 class="text-[#f1c40f] text-xs font-black tracking-[0.5em] mb-4">GLOBAL PULSE RECEIVED</h1>
            <p class="text-white text-2xl font-light leading-relaxed">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="mt-10 border border-[#f1c40f] text-[#f1c40f] px-10 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#f1c40f] hover:text-black transition-all">Acknowledge</button>
        </div>
    `;
    document.body.appendChild(pulseBox);
        }
// Inside the Node Rendering logic
if (user.uid === "YOUR_ADMIN_UID_FROM_FIREBASE") {
    profileElement.classList.add('aura-architect');
    profileElement.innerHTML += '<span class="root-badge">Λ</span>';
}
function triggerCallHaptics() {
    if ("vibrate" in navigator) {
        // Rhythmic heartbeat: Pulse, pause, pulse, long pause
        const heartbeat = [200, 100, 200, 1000]; 
        const callRhythm = setInterval(() => {
            navigator.vibrate(heartbeat);
        }, 1500);
        
        // Stop vibrating if the call is answered or timed out
        window.currentCallInterval = callRhythm;
    }
                              }
    
