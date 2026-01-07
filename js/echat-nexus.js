import { getFirestore, collection, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function syncNexus() {
    const user = auth.currentUser;
    // Querying the "conversations" collection where you are a participant
    const q = query(
        collection(db, "conversations"), 
        where("participants", "array-contains", user.uid),
        orderBy("lastActivity", "desc")
    );

    onSnapshot(q, (snapshot) => {
        const listContainer = document.getElementById('chat-list');
        // Map and render the chat rows here...
    });
}
