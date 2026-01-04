const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.geminiProxy = functions.https.onRequest(async (req, res) => {
    try {
        const { prompt } = req.body;

        // Call Gemini API with your API key
        const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            })
        });

        const data = await geminiRes.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";

        res.json({ reply });
    } catch (err) {
        console.error("Gemini proxy error:", err);
        res.status(500).json({ reply: "Error contacting Gemini." });
    }
});
