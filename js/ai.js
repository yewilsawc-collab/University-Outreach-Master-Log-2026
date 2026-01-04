import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Initialize Realtime Database
const db = getDatabase();
const chatRef = ref(db, "phd_chat_logs");

// Function to send a message
export async function sendUserMessage(text) {
    // 1. Push user message to Firebase
    await push(chatRef, {
        sender: "Yewilsaw",
        text: text,
        timestamp: Date.now()
    });

    // 2. Trigger Gemini response (You can ask Gemini/Copilot to process this)
    console.log("Gemini is analyzing your request about mordenite kinetics...");
}

// Listen for messages and update the UI in real-time
onChildAdded(chatRef, (snapshot) => {
    const message = snapshot.val();
    renderMessageToScreen(message.text, message.sender);
});
