import { initFeed, createPost } from "../social.js";
import { getGeminiResponse } from "../ai.js";

const postInput = document.getElementById("post-input");
const aiBtn = document.getElementById("ai-draft-btn");
const shareBtn = document.getElementById("share-btn");

// Initialize feed rendering
initFeed("social-feed");

// AI Draft
aiBtn?.addEventListener("click", async () => {
    const topic = postInput.value.trim();
    if (!topic) return;

    try {
        const draft = await getGeminiResponse(
            `Draft a professional update about: ${topic}. Use my background in Kinetics.`
        );
        postInput.value = draft;
    } catch {
        postInput.value = "AI assistant is temporarily unavailable.";
    }
});

// Share Post
shareBtn?.addEventListener("click", () => {
    const content = postInput.value.trim();
    if (content) createPost(content);
});

