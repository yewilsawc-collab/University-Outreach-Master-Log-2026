// js/welcome.js
const welcomeMsg = "Initializing Universal Social Ecosystem...";
const welcomeTarget = document.getElementById('welcome-text');
const subText = document.getElementById('sub-text');
const loginForm = document.getElementById('login-form');

async function startSequence() {
    // 1. Typewriter Effect
    for (let i = 0; i < welcomeMsg.length; i++) {
        welcomeTarget.textContent += welcomeMsg[i];
        await new Promise(r => setTimeout(r, 40)); // Speed of "thought"
    }

    // 2. Reveal Subtext
    subText.classList.remove('opacity-0');
    
    // 3. Reveal Form
    setTimeout(() => {
        loginForm.classList.remove('opacity-0', 'translate-y-4');
        subText.textContent = "GATEWAY READY | STANDBY FOR UPLINK";
    }, 1000);
}

window.onload = startSequence;
