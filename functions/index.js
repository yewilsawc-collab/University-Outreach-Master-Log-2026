import fetch from "node-fetch";
import functions from "firebase-functions";

export const geminiProxy = functions.https.onRequest(async (req, res) => {
  try {
    const { prompt } = req.body || {};
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt || "" }] }] })
    });
    const data = await r.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    res.json({ reply });
  } catch (e) {
    console.error(e);
    res.status(500).json({ reply: "Error contacting Gemini." });
  }
});
