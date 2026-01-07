export function injectLoader() {
  const loaderHTML = `
    <div id="loader-overlay" class="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center transition-opacity">
      <div class="node-pulse bg-[#f1c40f] w-16 h-16 rounded-2xl flex items-center justify-center text-black font-black text-2xl mb-4 shadow-lg">E</div>
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
