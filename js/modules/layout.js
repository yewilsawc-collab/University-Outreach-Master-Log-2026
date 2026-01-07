export function injectBaseLayout() {
  const navHTML = `...`; // your full nav + overlays HTML
  const container = document.getElementById('global-nav');
  if (container) container.innerHTML = navHTML;
}

export function handleActiveState() {
  const currentPage = window.location.pathname.split("/").pop() || 'index.html';
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('bg-white/10', 'text-[#f1c40f]', 'border', 'border-white/10');
    }
  });
}
