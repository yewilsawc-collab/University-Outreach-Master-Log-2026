// echat-nexus.js - Full Implementation
import { auth, db } from "./firebase.js";
import { query, collection, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function syncNexus() {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
        collection(db, "conversations"), 
        where("participants", "array-contains", user.uid),
        orderBy("lastActivity", "desc")
    );

    onSnapshot(q, (snapshot) => {
        const listContainer = document.getElementById('chat-list');
        if (!listContainer) return;
        
        listContainer.innerHTML = ""; // Clear for re-render

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            const chatRow = document.createElement('div');
            chatRow.className = "chat-nexus-row p-3 border-b border-slate-800 hover:bg-slate-900 cursor-pointer";
            
            // Format preview: Shows last message and timestamp
            chatRow.innerHTML = `
                <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-slate-400">SESSION ID: ${doc.id.substring(0,8)}...</span>
                    <span class="text-[10px] text-slate-600">${new Date(data.lastActivity?.toDate()).toLocaleTimeString()}</span>
                </div>
                <p class="text-sm truncate text-white">${data.lastMessage || "No messages yet."}</p>
            `;
            
            listContainer.appendChild(chatRow);
        });

        // Trigger notification haptic if new messages arrive
        if (!snapshot.metadata.hasPendingWrites) {
            if ("vibrate" in navigator) navigator.vibrate([50, 30, 50]);
        }
    });
                              }
                              
