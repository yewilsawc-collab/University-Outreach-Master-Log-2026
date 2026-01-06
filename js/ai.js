// ai.js
// Calls Gemini AI through your Firebase Function or proxy endpoint

export async function getGeminiResponse(userText) {
    try {
        // Replace with your Firebase Function or proxy URL
        const response = await fetch("/gemini-proxy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: userText })
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();

        // Expecting { reply: "..." } from your backend
        return data.reply || "Gemini could not generate a response.";
    } catch (err) {
        console.error("Gemini request failed:", err);
        return "⚠️ Error: Unable to connect to Gemini.";
    }
}

// Add this to your UI logic
const postBtn = document.getElementById("ai-draft-btn");
const inputField = document.getElementById("chat-input"); // Reuse chat input

postBtn.addEventListener("click", async () => {
    const topic = inputField.value;
    inputField.placeholder = "Gemini is drafting...";
    
    // Request an academic summary from Gemini
    const draft = await getGeminiResponse(`Draft a professional social media post about: ${topic}. Mention my interest in Physical Chemistry and interfacial phenomena.`);
    
    inputField.value = draft;
    inputField.placeholder = "Type your update...";
});
