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
