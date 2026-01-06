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
