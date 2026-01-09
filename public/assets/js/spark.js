import { getFirestore, collection, addDoc, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();

// 1. Send a Spark
export async function sendSpark(targetNodeId) {
    const user = auth.currentUser;
    await addDoc(collection(db, "sparks"), {
        from: user.uid,
        to: targetNodeId,
        timestamp: Date.now(),
        status: "pending"
    });
}

// 2. Listen for incoming Sparks
export function listenForSparks() {
    const user = auth.currentUser;
    const q = query(collection(db, "sparks"), where("to", "==", user.uid), where("status", "==", "pending"));

    onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                triggerSparkVisuals(change.doc.data());
            }
        });
    });
}
