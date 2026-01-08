import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function renderMessages(main) {
  main.innerHTML = `
    <header class="mb-6 flex justify-between items-center">
      <h2 class="text-3xl font-black tracking-tighter">Neural Link</h2>
      <div class="text-[10px] text-green-500 font-bold uppercase">Active</div>
    </header>
    <div id="chat-log" class="flex-1 p-6 elementa-glass rounded-3xl overflow-y-auto custom-scroll space-y-4" style="min-height:40vh"></div>
    <div class="mt-4 elementa-glass p-3 rounded-3xl flex gap-2">
      <input id="chat-input" type="text" placeholder="Type a message…" class="flex-1 bg-transparent outline-none text-sm p-2">
      <button id="send-btn" class="bg-[#f1c40f] text-black px-6 py-2 rounded-2xl font-black">SEND</button>
    </div>`;

  const log = document.getElementById("chat-log");
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  const messagesRef = collection(window.db, "messages");

  sendBtn.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;
    await addDoc(messagesRef, {
      text,
      user: window.auth?.currentUser?.email || "Anonymous Node",
      createdAt: serverTimestamp()
    });
    input.value = "";
  };

  onSnapshot(query(messagesRef, orderBy("createdAt", "asc")), (snap) => {
    log.innerHTML = "";
    snap.forEach(doc => {
      const d = doc.data();
      log.innerHTML += `
        <div class="bg-white/5 p-4 rounded-2xl border border-white/5 max-w-lg">
          <p class="text-[10px] text-[#f1c40f] mb-1 font-bold">${d.user}</p>
          <p class="text-sm leading-relaxed">${d.text}</p>
        </div>`;
    });
    log.scrollTop = log.scrollHeight;
  });
        }
