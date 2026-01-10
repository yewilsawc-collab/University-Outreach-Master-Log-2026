// ai.js
// Elementa v2.0 — Gemini AI integration

// Example: Gemini API proxy endpoint
const GEMINI_ENDPOINT = "/api/gemini"; 

/**
 * Send a prompt to Gemini AI and return the response
 * @param {string} prompt - The text prompt to send
 * @returns {Promise<string>} - AI-generated response
 */
export async function getGeminiResponse(prompt) {
    try {
        const response = await fetch(GEMINI_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) throw new Error("AI request failed");

        const data = await response.json();
        return data.output || "AI did not return a response.";
    } catch (err) {
        console.error("Gemini error:", err);
        return "AI assistant is unavailable.";
    }
}
