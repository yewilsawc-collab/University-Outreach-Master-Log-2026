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
  
