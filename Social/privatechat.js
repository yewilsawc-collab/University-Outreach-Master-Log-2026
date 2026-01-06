import { db } from "./firebase.js";
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

// Generate a consistent ID regardless of who starts the chat
const getRoomId = (uid1, uid2) => [uid1, uid2].sort().join("_");

export async function sendPrivateMessage(recipientUid, text) {
    const roomId = getRoomId(currentUser.uid, recipientUid);
    
    // 1. Add message to the specific room
    await addDoc(collection(db, "conversations", roomId, "messages"), {
        senderId: currentUser.uid,
        text: text,
        timestamp: serverTimestamp()
    });

    // 2. Update the main conversation doc (for the Inbox preview)
    await setDoc(doc(db, "conversations", roomId), {
        participants: [currentUser.uid, recipientUid],
        lastMessage: text,
        lastUpdate: serverTimestamp()
    }, { merge: true });
      }
