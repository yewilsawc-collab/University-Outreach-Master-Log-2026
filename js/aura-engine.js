export function updateNodeAura(score) {
    const profileRing = document.querySelector('.user-aura-ring');
    
    if (score > 500) {
        profileRing.className = "aura-ring apex-glow"; // Amethyst
    } else if (score > 100) {
        profileRing.className = "aura-ring resonant-glow"; // Gold
    } else {
        profileRing.className = "aura-ring initiate-glow"; // White
    }
}
  
export function triggerAuraLevelUp(newTier) {
    // 1. Specialized Haptic Pattern: "The Ascent"
    // Three short pulses followed by one deep resonance
    if ("vibrate" in navigator) {
        navigator.vibrate([50, 30, 50, 30, 50, 100, 500]);
    }

    // 2. Visual Gold Surge
    const surge = document.createElement('div');
    surge.className = "fixed inset-0 z-[3000] pointer-events-none aura-surge-animation";
    document.body.appendChild(surge);

    // 3. Status Notification
    const alert = document.createElement('div');
    alert.className = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[3001]";
    alert.innerHTML = `
        <h1 class="text-[#f1c40f] text-xs font-black tracking-[0.6em] animate-bounce">LEVEL UP</h1>
        <p class="text-white text-4xl font-black uppercase tracking-tighter">NODE ${newTier}</p>
        <p class="text-[8px] text-slate-500 mt-4 tracking-[0.3em]">YOUR RESONANCE HAS STABILIZED</p>
    `;
    document.body.appendChild(alert);

    // Cleanup after 4 seconds
    setTimeout(() => {
        surge.remove();
        alert.remove();
    }, 4000);
}
