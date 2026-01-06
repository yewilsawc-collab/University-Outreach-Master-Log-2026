import { db } from "./firebase.js";
import { collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const postsRef = collection(db, "social_feed");

export async function postUpdate(content) {
    await addDoc(postsRef, {
        author: "Yewilsaw",
        text: content,
        timestamp: Date.now()
    });
}

export function listenToFeed(callback) {
    const q = query(postsRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map(doc => doc.data());
        callback(posts);
    });
}

import { getGeminiResponse } from "./ai.js";

async function handleNewPost(text) {
    // Optional: Use Gemini to suggest hashtags or check for helpfulness
    const aiSuggestion = await getGeminiResponse(`Suggest 3 academic hashtags for: ${text}`);
    console.log("AI Tags:", aiSuggestion);
    
    await sharePost(`${text} \n\n ${aiSuggestion}`);
}

import { db } from "./firebase.js";
import { collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const postsRef = collection(db, "posts");

// Function to share a post
export async function sharePost(content) {
    await addDoc(postsRef, {
        author: "Yewilsaw Chanie Mekonen", // Using your preferred name from settings
        content: content,
        timestamp: new Date(),
        likes: 0
    });
}

// Function to listen for new posts and update the UI
export function loadFeed(renderCallback) {
    const q = query(postsRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderCallback(posts);
    });
}
