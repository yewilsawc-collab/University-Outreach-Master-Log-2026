import { db } from "./firebase.js";
import { 
    collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, doc, setDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Generate a consistent ID regardless of who starts the chat
const getRoomId = (uid1, uid2) => [uid1, uid2].sort().join("_");

export async function sendPrivateMessage(senderUid, recipientUid, text) {
    const roomId = getRoomId(senderUid, recipientUid);
    
    try {
        // 1. Add message to the sub-collection for history
        await addDoc(collection(db, "conversations", roomId, "messages"), {
            senderId: senderUid,
            text: text,
            timestamp: serverTimestamp()
        });

        // 2. Update the main conversation doc for Inbox previews
        await setDoc(doc(db, "conversations", roomId), {
            participants: [senderUid, recipientUid],
            lastMessage: text,
            lastUpdate: serverTimestamp()
        }, { merge: true });
        
        console.log("Message transmitted via Neural Link.");
    } catch (error) {
        console.error("Transmission failed:", error);
    }
}

/**
 * Listens for messages in a specific room
 */
export function listenToMessages(senderUid, recipientUid, callback) {
    const roomId = getRoomId(senderUid, recipientUid);
    const q = query(
        collection(db, "conversations", roomId, "messages"), 
        orderBy("timestamp", "asc")
    );
    
    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => doc.data());
        callback(messages);
    });
            }
            
