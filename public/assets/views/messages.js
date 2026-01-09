// Placeholder for future messaging engine
// This module activates when messages.html loads

console.log("Messages view loaded");

// Example: attach event listeners
const sendBtn = document.getElementById("send-message-btn");
const input = document.getElementById("message-input");

sendBtn?.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    // TODO: integrate Firestore messaging
    console.log("Send message:", text);
    input.value = "";
});
  
