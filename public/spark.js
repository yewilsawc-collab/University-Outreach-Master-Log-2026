import { db, auth } from "./firebase.js";
import { 
    collection, 
    addDoc, 
    onSnapshot, 
    query, 
    where, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- HAPTIC FEEDBACK ---
const sparkPulse = () => {
    if ("vibrate" in navigator) navigator.vibrate([200, 100, 200]);
};

/**
 * 1. SEND A SPARK
 * Creates a notification/interaction request for another user.
 */
export async function sendSpark(targetNodeId) {
    const user = auth.currentUser;
    if (!user) return;

    try {
        await addDoc(collection(db, "sparks"), {
            from: user.uid,
            fromName: "Yewilsaw", // Optional: cache name for performance
            to: targetNodeId,
            timestamp: serverTimestamp(), // Use server time for consistency
            status: "pending"
        });
        console.log("Spark emitted toward:", targetNodeId);
    } catch (err) {
        console.error("Spark failed to ignite:", err);
    }
}

/**
 * 2. LISTEN FOR SPARKS
 * Listens for incoming "pending" sparks and triggers UI/Haptic feedback.
 */
export function listenForSparks(uiCallback) {
    // Ensure listener only attaches when user is logged in
    auth.onAuthStateChanged((user) => {
        if (!user) return;

        const q = query(
            collection(db, "sparks"), 
            where("to", "==", user.uid), 
            where("status", "==", "pending")
        );

        // Return the unsubscribe function to clean up later
        return onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    const sparkData = change.doc.data();
                    
                    // Trigger physical feedback
                    sparkPulse();
                    
                    // Trigger visual/UI feedback if a callback is provided
                    if (uiCallback) {
                        uiCallback(sparkData, change.doc.id);
                    } else {
                        console.log("New Spark Received:", sparkData);
                    }
                }
            });
        });
    });
            }
                          
