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
