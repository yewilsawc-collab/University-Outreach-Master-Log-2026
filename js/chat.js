// chat.js
// Handles user messages, stores them in Firebase, and requests Gemini AI replies

import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getGeminiResponse } from "./ai.js";  // Gemini integration
import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";

async function sendPrivateMessage(recipientId, text) {
    const convoId = getConversationID(currentUser.uid, recipientId);
    const messagesRef = collection(db, "conversations", convoId, "messages");

    // 1. Add the message to the sub-collection
    await addDoc(messagesRef, {
        senderId: currentUser.uid,
        text: text,
        timestamp: serverTimestamp()
    });

    // 2. Update the parent conversation for the "Inbox" view
    await updateDoc(doc(db, "conversations", convoId), {
        lastMessage: text,
        updatedAt: serverTimestamp(),
        participants: [currentUser.uid, recipientId]
    });
                       }

// Initialize Realtime Database
const db = getDatabase();
const chatRef = ref(db, "phd_chat_logs");

// Function to send a message
export async function sendUserMessage(text) {
    // 1. Push user message to Firebase
    await push(chatRef, {
        sender: "Yewilsaw",
        text,
        timestamp: Date.now()
    });

    // 2. Ask Gemini for a reply
    const reply = await getGeminiResponse(text);

    // 3. Push Gemini's reply to Firebase
    await push(chatRef, {
        sender: "Gemini",
        text: reply,
        timestamp: Date.now()
    });
}

// Listen for messages and update the UI in real-time
onChildAdded(chatRef, (snapshot) => {
    const message = snapshot.val();
    renderMessageToScreen(message.text, message.sender, message.timestamp);
});

// Simple UI renderer
function renderMessageToScreen(text, sender, timestamp) {
    const container = document.getElementById("chat-log");
    const messageEl = document.createElement("div");
    messageEl.className = sender === "Yewilsaw" ? "user-message" : "ai-message";
    messageEl.textContent = `${sender}: ${text} (${new Date(timestamp).toLocaleTimeString()})`;
    container.appendChild(messageEl);
    container.scrollTop = container.scrollHeight; // auto-scroll
      }
function getConversationID(uid1, uid2) {
    return [uid1, uid2].sort().join('_');
        }
                                                   

// Helper: Ensure a consistent ID for two users
const getRoomId = (uid1, uid2) => [uid1, uid2].sort().join("_");

// 1. Send a private message
export async function sendPrivateMessage(recipientUid, text) {
    const roomId = getRoomId(currentUser.uid, recipientUid);
    
    // Add message to sub-collection
    await addDoc(collection(db, "conversations", roomId, "messages"), {
        senderId: currentUser.uid,
        text: text,
        timestamp: serverTimestamp()
    });

    // Update parent doc for Inbox preview
    await setDoc(doc(db, "conversations", roomId), {
        participants: [currentUser.uid, recipientUid],
        lastMessage: text,
        lastUpdate: serverTimestamp()
    }, { merge: true });
}

// 2. Load the Inbox list
export function loadInbox(callback) {
    const q = query(
        collection(db, "conversations"), 
        where("participants", "array-contains", currentUser.uid),
        orderBy("lastUpdate", "desc")
    );

    onSnapshot(q, (snapshot) => {
        const convos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(convos);
    });
}
    
