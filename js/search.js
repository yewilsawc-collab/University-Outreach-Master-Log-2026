export function mountSearchOverlay() {
  const overlay = `
    <div id="search-modal" class="hidden fixed inset-0 z-[200] elementa-glass backdrop-blur-3xl p-6 flex flex-col items-center pt-24">
      <button onclick="toggleSearch()" class="absolute top-8 right-8 text-2xl">✕</button>
      <div class="w-full max-w-2xl">
        <input type="text" id="grid-search-input" oninput="executeSearch(this.value)"
          placeholder="SEARCH NODES OR SHARDS..."
          class="w-full bg-transparent border-b-2 border-[#f1c40f] text-3xl font-black outline-none pb-4 tracking-tighter uppercase placeholder:opacity-20">
        <div id="search-results" class="mt-12 space-y-4 max-h-[60vh] overflow-y-auto custom-scroll"></div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", overlay);

  window.toggleSearch = () => {
    const modal = document.getElementById("search-modal");
    modal.classList.toggle("hidden");
    if (!modal.classList.contains("hidden")) {
      document.getElementById("grid-search-input").focus();
    }
  };
  window.executeSearch = (q) => {
    const results = document.getElementById("search-results");
    if (!q || q.length < 2) { results.innerHTML = ""; return; }
    const localPosts = Array.from(document.querySelectorAll(".elementa-glass p"));
    const filtered = localPosts.filter(p => p.textContent.toLowerCase().includes(q.toLowerCase()));
    results.innerHTML = filtered.map(p => `
      <div class="glass-interactive p-4 rounded-2xl border border-white/5 cursor-pointer" onclick="toggleSearch()">
        <p class="text-xs text-[#f1c40f] font-black mb-1 uppercase">SHARD MATCH</p>
        <p class="text-sm line-clamp-2 opacity-70">${p.textContent}</p>
      </div>`).join("");
  };
}
