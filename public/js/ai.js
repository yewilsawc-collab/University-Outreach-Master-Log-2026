// ai.js - Refined Version

/**
 * Generic function to call your Gemini proxy
 * @param {string} prompt - The full text/instruction to send
 */
export async function getGeminiResponse(prompt) {
    try {
        const response = await fetch("/gemini-proxy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) throw new Error(`Status: ${response.status}`);

        const data = await response.json();
        return data.reply || "Gemini could not generate a response.";
    } catch (err) {
        console.error("Gemini request failed:", err);
        return null; // Return null so the UI can handle the error specifically
    }
}

// UI Logic
const postBtn = document.getElementById("ai-draft-btn");
const inputField = document.getElementById("chat-input");

if (postBtn && inputField) {
    postBtn.addEventListener("click", async () => {
        const topic = inputField.value.trim();
        if (!topic) return alert("Please enter a topic first!");

        const originalPlaceholder = inputField.placeholder;
        inputField.value = "";
        inputField.placeholder = "✨ Gemini is drafting your post...";
        postBtn.disabled = true; // Prevent double-clicks

        const customPrompt = `Draft a professional social media post about: ${topic}. 
        Mention my interest in Physical Chemistry and interfacial phenomena. 
        Keep it engaging but academic.`;

        const draft = await getGeminiResponse(customPrompt);

        if (draft) {
            inputField.value = draft;
        } else {
            inputField.value = topic; // Restore original text on error
            alert("⚠️ Error: Unable to connect to Gemini.");
        }

        inputField.placeholder = originalPlaceholder;
        postBtn.disabled = false;
    });
}

