import { db } from "./firebase.js";
import { collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const postsRef = collection(db, "posts");

/**
 * Creates a research update linked to your UID for stats tracking
 */
export async function createPost(content, userUid) {
    await addDoc(postsRef, {
        author: "Yewilsaw Chanie Mekonen",
        authorUID: userUid, // Crucial for profile.js sync
        text: content,
        timestamp: Date.now(),
        type: "research_update",
        resonations: 0 // Required for the Resonate/Like system
    });
}

/**
 * Connects the Firestore stream to your UI container
 */
export function initFeed(containerId) {
    const q = query(postsRef, orderBy("timestamp", "desc"));
    const container = document.getElementById(containerId);

    if (!container) return;

    return onSnapshot(q, (snapshot) => {
        container.innerHTML = ""; 
        snapshot.forEach((doc) => {
            const post = doc.data();
            const postId = doc.id;
            renderPost(container, post, postId);
        });
    });
}

function renderPost(container, post, postId) {
    const div = document.createElement("div");
    div.className = "post-card"; // Using a consistent class for the ecosystem
    div.innerHTML = `
        <div class="post-header">
            <strong>${post.author}</strong>
            <small>${new Date(post.timestamp).toLocaleString()}</small>
        </div>
        <p class="post-content">${post.text}</p>
        <div class="post-actions">
            <button onclick="resonate('${postId}')">
                Resonate (${post.resonations || 0})
            </button>
        </div>
    `;
    container.appendChild(div);
                }
            
