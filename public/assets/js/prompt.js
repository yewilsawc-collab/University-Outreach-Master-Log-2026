// prompts.js
// Elementa v2.0 — Centralized AI Prompt Templates

export const prompts = {
    feed: {
        professional: (topic) =>
            `Draft a concise professional update about ${topic}, highlighting achievements or insights.`,
        casual: (topic) =>
            `Write a friendly, casual post about ${topic}, keep it light and engaging.`,
        academic: (topic) =>
            `Summarize ${topic} with an academic tone, referencing scientific context or research.`
    },

    messages: {
        friendly: (message) =>
            `Generate a warm, conversational reply to: "${message}". Keep it approachable.`,
        professional: (message) =>
            `Respond to: "${message}" with a polite, professional tone suitable for colleagues.`,
        humorous: (message) =>
            `Craft a witty, lighthearted response to: "${message}". Keep it playful but respectful.`
    },

    discovery: {
        recommendation: (interest) =>
            `Suggest new content or connections based on ${interest}. Keep it concise and inviting.`
    },

    support: {
        response: (issue) =>
            `Provide a helpful, empathetic response to a user asking about ${issue}.`
    }
};
          
