export function setupInteractions() {
  const glow = document.getElementById('glow');
  const logoNode = document.querySelector('.logo-node');
  let touchTimer;

  document.addEventListener('touchstart', (e) => {
    if (!glow) return;
    const touch = e.touches[0];
    glow.style.transform = `translate(${touch.clientX - 150}px, ${touch.clientY - 150}px)`;
  });

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
