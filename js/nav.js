export function initNav() {
  const navHTML = `
    <aside class="elementa-glass glass-noise w-20 md:w-64 h-[95vh] my-[2.5vh] ml-4 rounded-3xl flex flex-col p-4 fixed left-0 z-50">
      <div class="flex items-center gap-3 mb-10 px-2 cursor-pointer" onclick="location.href='/'">
        <div class="w-10 h-10 bg-[#f1c40f] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(241,196,15,0.3)]"><span class="text-black font-black text-xl">E</span></div>
        <h1 class="font-black tracking-tighter hidden md:block text-lg">ELEMENTA</h1>
      </div>
      <nav class="flex-1 flex flex-col gap-2">
        <a href="#/feed" class="glass-interactive flex items-center gap-4 p-4 rounded-2xl hover:text-[#f1c40f]"><span>🏠</span><span class="hidden md:block font-bold text-xs uppercase">Stream</span></a>
        <a href="#/messages" class="glass-interactive flex items-center gap-4 p-4 rounded-2xl hover:text-[#f1c40f]"><span>💬</span><span class="hidden md:block font-bold text-xs uppercase">Neural Link</span></a>
        <a href="#/discovery" class="glass-interactive flex items-center gap-4 p-4 rounded-2xl hover:text-[#f1c40f]"><span>🧭</span><span class="hidden md:block font-bold text-xs uppercase">Discovery</span></a>
      </nav>
      <div class="mt-auto p-2 rounded-2xl border border-white/5 flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f1c40f] to-orange-500"></div>
        <div class="hidden md:block overflow-hidden">
          <p id="status-text" class="text-[10px] font-bold truncate">Guest Node</p>
          <p class="text-[8px] text-slate-500">Physical Chemist</p>
        </div>
      </div>
      <div class="mt-2 grid grid-cols-2 gap-2">
        <button class="glass-interactive text-xs px-3 py-2 rounded-xl" onclick="signIn()">Sign In</button>
        <button class="glass-interactive text-xs px-3 py-2 rounded-xl" onclick="signOutUser()">Sign Out</button>
      </div>
      <div class="mt-4 px-2">
        <button onclick="toggleSearch()" class="glass-interactive w-full flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl text-slate-400">
          <span>🔍</span>
          <span class="hidden md:block font-bold text-[10px] uppercase tracking-[0.2em]">Search Grid</span>
        </button>
      </div>
    </aside>`;
  const mount = document.getElementById("global-nav");
  if (mount) mount.innerHTML = navHTML;
}
