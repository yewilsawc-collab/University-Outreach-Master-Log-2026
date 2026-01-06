import { db } from "./firebase.js";
import { collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const postsRef = collection(db, "posts");

export async function postUpdate(content) {
    await addDoc(postsRef, {
        author: "Yewilsaw",
        text: content,
        timestamp: Date.now(),
        type: "research_update"
    });
}

export function initFeed(containerId) {
    const q = query(postsRef, orderBy("timestamp", "desc"));
    const container = document.getElementById(containerId);

    onSnapshot(q, (snapshot) => {
        container.innerHTML = ""; 
        snapshot.forEach((doc) => {
            const post = doc.data();
            renderPost(container, post);
        });
    });
}

function renderPost(container, post) {
    const div = document.createElement("div");
    // Reuse your existing high-contrast blue/gold styling
    div.className = "user-message"; 
    div.style.width = "90%";
    div.innerHTML = `
        <strong>${post.author}</strong>
        <p>${post.text}</p>
        <small>${new Date(post.timestamp).toLocaleDateString()}</small>
    `;
    container.appendChild(div);
}
