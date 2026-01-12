// Stream State Management
function acceptStream() {
    const overlay = document.getElementById('call-overlay');
    
    // 1. Initial Resonance: Visual feedback for link establishment
    overlay.classList.add('animate-pulse');
    console.log("Establishing secure biometric tunnel...");

    // 2. Transition to eChat: Move to the active neural link session
    setTimeout(() => {
        window.location.href = 'echat.html?id=node_alex_nyc&status=active';
    }, 800);
}

function rejectStream() {
    const overlay = document.getElementById('call-overlay');
    
    // 3. Entropy: Content/Interactions that lose energy decay
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.remove();
    }, 500);
}
