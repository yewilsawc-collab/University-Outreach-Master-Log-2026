export function initSolarSync() {
  const hour = new Date().getHours();
  document.body.classList.remove('obsidian-mode', 'alabaster-mode');
  document.body.classList.add(hour >= 18 || hour < 6 ? 'obsidian-mode' : 'alabaster-mode');
}
