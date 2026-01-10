// master.js
// Elementa v2.0 — Global orchestrator

// Core imports
import { initRouter } from "./navigation.js";
import { runSplash } from "./splash.js";

// AI + Prompts
import { getGeminiResponse } from "./ai.js";
import { prompts } from "./prompts.js";

// Global state (optional)
import { initState } from "./state.js";

// Firebase setup
import { initFirebase } from "./firebase.js";

// Bootstrapping the app
async function bootstrap() {
    console.log("🚀 Elementa starting...");

    // Initialize Firebase
    initFirebase();

    // Initialize global state
    initState();

    // Run splash / expansion protocol
    runSplash();

    // Initialize router
    initRouter();

    // Example: preload AI prompt for feed
    const preview = await getGeminiResponse(
        prompts.feed.professional("Elementa launch")
    );
    console.log("AI preview:", preview);
}

// Start app
window.addEventListener("load", bootstrap);
                        
