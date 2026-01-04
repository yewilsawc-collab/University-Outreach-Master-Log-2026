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
