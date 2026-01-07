import { db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { initFeed, createPost } from "./social.js";
import { getGeminiResponse } from "./ai.js";

const MY_PROFILE = {
    name: "Yewilsaw Chanie Mekonen",
    expertise: "Physical Chemistry (Kinetics & Spectroscopy)",
    status: "Yale Application Under Review",
    bio: "Expertise in kinetic models for heterogeneous systems and FT-IR spectroscopy."
};

async function init() {
    // 1. Sync Profile to Firestore
    const profileRef = doc(db, "users", "yewilsaw");
    await setDoc(profileRef, MY_PROFILE, { merge: true });

    // 2. Render Profile
    document.getElementById("profile-display").innerHTML = `
        <h2>${MY_PROFILE.name}</h2>
        <p><strong>Status:</strong> ${MY_PROFILE.status}</p>
        <p>${MY_PROFILE.bio}</p>
    `;

    // 3. Initialize Social Feed
    initFeed("social-feed");

    // 4. AI Post Assistant Logic
    document.getElementById("ai-draft-btn").addEventListener("click", async () => {
        const topic = document.getElementById("post-input").value;
        const draft = await getGeminiResponse(`Draft a professional update about: ${topic}. Use my background in Kinetics.`);
        document.getElementById("post-input").value = draft;
    });

    document.getElementById("share-btn").addEventListener("click", () => {
        const content = document.getElementById("post-input").value;
        if(content) createPost(content);
    });
}

window.showSection = (id) => {
    document.querySelectorAll("main > section").forEach(s => s.style.display = "none");
    document.getElementById(`${id}-section`).style.display = "block";
};

init();
 // The Expansion Protocol
window.addEventListener('load', () => {
    const splash = document.querySelector('#splash-screen');
    const appInterface = document.querySelector('#main-ecosystem');

    // Simulate Neural Calibration (Data Loading)
    setTimeout(() => {
        // Move logo and fade out the obsidian backdrop
        splash.classList.add('reveal-ecosystem');
        appInterface.style.opacity = '1';
        
        // Trigger Neural Haptic for the Architect
        if ("vibrate" in navigator) {
            navigator.vibrate(50); 
        }
    }, 2000); 
});
                                                          
