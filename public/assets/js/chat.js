// chat.js - Consolidated Full Version
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { 
    collection, addDoc, serverTimestamp, doc, updateDoc, setDoc, 
    query, where, orderBy, onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getGeminiResponse } from "./ai.js";
import { db as firestore } from "./firebase.js"; // Renamed to avoid conflict

// Initialize Realtime Database for Public Chat
const rtdb = getDatabase();
const publicChatRef = ref(rtdb, "phd_chat_logs");

// --- Haptics & Feedback ---
const Haptics = {
    success: () => { if ("vibrate" in navigator) navigator.vibrate(40); },
    notification: () => { if ("vibrate" in navigator) navigator.vibrate([50, 30, 50]); },
    error: () => { if ("vibrate" in navigator) navigator.vibrate([100, 50, 100]); }
};

// --- Helper Functions ---
const getRoomId = (uid1, uid2) => [uid1, uid2].sort().join("_");

// --- Public Chat Logic ---
export async function sendUserMessage(text) {
    try {
        // 1. Push user message to RTDB
        await push(publicChatRef, {
            sender: "Yewilsaw",
            text,
            timestamp: Date.now()
        });
        Haptics.success(); //

        // 2. Request Gemini AI response
        const reply = await getGeminiResponse(text);

        // 3. Push Gemini's reply to RTDB
        await push(publicChatRef, {
            sender: "Gemini",
            text: reply || "No response generated.",
            timestamp: Date.now()
        });
    } catch (err) {
        console.error("Public chat error:", err);
        Haptics.error(); //
    }
}

// Listen for public messages and render
onChildAdded(publicChatRef, (snapshot) => {
    const message = snapshot.val();
    renderMessageToScreen(message.text, message.sender, message.timestamp);
});

// --- Private Messaging Logic (Firestore) ---
export async function sendPrivateMessage(recipientUid, text) {
    const roomId = getRoomId(currentUser.uid, recipientUid); //
    const messagesRef = collection(firestore, "conversations", roomId, "messages");

    try {
        // 1. Add message to sub-collection
        await addDoc(messagesRef, {
            senderId: currentUser.uid,
            text: text,
            timestamp: serverTimestamp()
        });

        // 2. Update parent doc for Inbox preview
        await setDoc(doc(firestore, "conversations", roomId), {
            participants: [currentUser.uid, recipientUid],
            lastMessage: text,
            lastUpdate: serverTimestamp()
        }, { merge: true });

        Haptics.success(); //
    } catch (err) {
        console.error("Private message error:", err);
        Haptics.error();
    }
}

// --- Inbox Loading ---
export function loadInbox(callback) {
    const q = query(
        collection(firestore, "conversations"), 
        where("participants", "array-contains", currentUser.uid),
        orderBy("lastUpdate", "desc")
    ); //

    onSnapshot(q, (snapshot) => {
        const convos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(convos);
    });
}

// --- UI Rendering ---
function renderMessageToScreen(text, sender, timestamp) {
    const container = document.getElementById("chat-log");
    if (!container) return;

    const messageEl = document.createElement("div");
    messageEl.className = sender === "Yewilsaw" ? "user-message" : "ai-message"; //
    messageEl.textContent = `${sender}: ${text} (${new Date(timestamp).toLocaleTimeString()})`;
    
    container.appendChild(messageEl);
    container.scrollTop = container.scrollHeight; // Auto-scroll
}
    
