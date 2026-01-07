import { db } from "./firebase.js";
import { 
    collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc, increment 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getGeminiResponse } from "./ai.js";

const postsRef = collection(db, "posts");

/**
 * Creates a post with AI-generated hashtags
 */
export async function createPost(text) {
    try {
        // AI Enhancement
        const aiSuggestion = await getGeminiResponse(`Suggest 3 academic hashtags for: ${text}`);
        const finalContent = `${text} \n\n ${aiSuggestion}`;

        await addDoc(postsRef, {
            author: "Yewilsaw Chanie Mekonen",
            content: finalContent,
            timestamp: Date.now(),
            resonations: 0
        });
    } catch (error) {
        console.error("Failed to post:", error);
    }
}

/**
 * Real-time listener for the feed
 */
export function initFeed(callback) {
    const q = query(postsRef, orderBy("timestamp", "desc"));
    return onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(posts);
    });
}

/**
 * The "Resonate" (Like) mechanism with haptic feedback
 */
window.resonate = async (postId) => {
    const postRef = doc(db, "posts", postId);
    try {
        await updateDoc(postRef, {
            resonations: increment(1)
        });
        
        if (navigator.vibrate) {
            navigator.vibrate(10); 
        }
    } catch (error) {
        console.error("Connection unstable:", error);
    }
};
        
