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
  const localPosts = Array.from(document.querySelectorAll('.elementa-glass p'));
  const filtered = localPosts.filter(p => p.textContent.toLowerCase().includes(query.toLowerCase()));
  resultsContainer.innerHTML = filtered.map(p => `
    <div class="glass-interactive p-4 rounded-2xl border border-white/5 cursor-pointer" onclick="toggleSearch()">
      <p class="text-[8px] text-[#f1c40f] font-black mb-1 uppercase tracking-widest">SHARD MATCH</p>
      <p class="text-sm line-clamp-2 opacity-70 font-light">${p.textContent}</p>
    </div>`).join('');
};
