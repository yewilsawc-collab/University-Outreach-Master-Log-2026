import { auth, db, rtdb } from "./firebase.js"; // Ensure these are exported from firebase.js
import { 
    collection, addDoc, setDoc, doc, serverTimestamp, 
    query, where, orderBy, onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { 
    ref, push, onChildAdded 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getGeminiResponse } from "./ai.js";

/** * HAPTIC FEEDBACK 
 */
const Haptics = {
    success: () => "vibrate" in navigator && navigator.vibrate(40),
    notification: () => "vibrate" in navigator && navigator.vibrate([50, 30, 50]),
    error: () => "vibrate" in navigator && navigator.vibrate([100, 50, 100])
};

/**
 * 1. PRIVATE MESSAGING (Firestore)
 * Best for: One-on-one structured chats with an Inbox view.
 */
const getRoomId = (uid1, uid2) => [uid1, uid2].sort().join("_");

export async function sendPrivateMessage(recipientUid, text) {
    const user = auth.currentUser;
    if (!user) return;

    const roomId = getRoomId(user.uid, recipientUid);
    const messagesRef = collection(db, "conversations", roomId, "messages");

    try {
        await Promise.all([
            addDoc(messagesRef, {
                senderId: user.uid,
                text: text,
                timestamp: serverTimestamp()
            }),
            setDoc(doc(db, "conversations", roomId), {
                participants: [user.uid, recipientUid],
                lastMessage: text,
                lastUpdate: serverTimestamp()
            }, { merge: true })
        ]);
        Haptics.success();
    } catch (err) {
        console.error("Msg Error:", err);
        Haptics.error();
    }
}

export function loadInbox(callback) {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
        collection(db, "conversations"),
        where("participants", "array-contains", user.uid),
        orderBy("lastUpdate", "desc")
    );

    return onSnapshot(q, (snapshot) => {
        const convos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(convos);
    });
}

/**
 * 2. AI CHAT LOGS (Realtime Database)
 * Best for: High-frequency logs and AI interactions.
 */
const chatRef = ref(rtdb, "phd_chat_logs");

export async function sendUserMessage(text) {
    try {
        // 1. Log User Message
        await push(chatRef, { sender: "Yewilsaw", text, timestamp: Date.now() });
        Haptics.success();

        // 2. Get AI Response
        const reply = await getGeminiResponse(text);

        // 3. Log AI Reply
        await push(chatRef, { sender: "Gemini", text: reply, timestamp: Date.now() });
    } catch (err) {
        Haptics.error();
    }
}

// UI Listener for AI Logs
export function listenToGlobalChat(renderFn) {
    onChildAdded(chatRef, (snapshot) => {
        renderFn(snapshot.val());
    });
}
    
