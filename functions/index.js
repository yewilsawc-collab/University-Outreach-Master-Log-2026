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
function setupTerminalLogic() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');

    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            output.innerHTML += `<p><span class="text-[#f1c40f]">λ</span> ${cmd}</p>`;
            
            // Command Logic
            if (cmd === 'help') {
                Object.entries(COMMANDS).forEach(([c, d]) => {
                    output.innerHTML += `<p class="text-slate-500">${c.padEnd(15)} - ${d}</p>`;
                });
            } else if (cmd === 'status') {
                output.innerHTML += `<p class="text-blue-400">NODES ONLINE: ${document.getElementById('node-count').textContent}</p>`;
                output.innerHTML += `<p class="text-blue-400">LATENCY: ${document.getElementById('latency-text').textContent}</p>`;
            } else if (cmd.startsWith('broadcast')) {
                const msg = cmd.replace('broadcast --m', '');
                // Trigger Firebase Pulse Function here
                output.innerHTML += `<p class="text-orange-500">GLOBAL PULSE DEPLOYED: ${msg}</p>`;
            }
            
            input.value = "";
            output.scrollTop = output.scrollHeight;
        }
    });
}
