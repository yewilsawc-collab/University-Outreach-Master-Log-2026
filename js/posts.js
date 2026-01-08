import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

export function renderFeed(main) {
  main.innerHTML = `
    <div class="max-w-2xl mx-auto">
      <div class="elementa-glass p-6 rounded-3xl mb-8">
        <textarea id="post-input" placeholder="What's resonating?" class="w-full bg-transparent border-none outline-none text-lg resize-none h-20"></textarea>
        <div class="flex justify-between items-center border-t border-white/5 pt-4">
          <input type="file" id="media-upload" class="hidden" multiple>
          <button id="media-btn" class="glass-interactive px-4 py-2 rounded-xl">🖼️ Media</button>
          <button id="post-btn" class="bg-[#f1c40f] text-black px-8 py-2 rounded-full font-bold">Post</button>
        </div>
      </div>
      <div id="social-stream" class="space-y-6"></div>
    </div>`;

  const stream = document.getElementById("social-stream");
  const postBtn = document.getElementById("post-btn");
  const mediaBtn = document.getElementById("media-btn");
  const mediaInput = document.getElementById("media-upload");
  const textArea = document.getElementById("post-input");

  mediaBtn.onclick = () => mediaInput.click();

  postBtn.onclick = async () => {
    const content = textArea.value.trim();
    if (!content && !mediaInput.files.length) return;

    let mediaUrl = null;
    if (mediaInput.files.length) {
      const file = mediaInput.files[0];
      const path = `posts/${Date.now()}_${file.name}`;
      const storageRef = ref(window.storage, path);
      await uploadBytes(storageRef, file);
      mediaUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(window.db, "posts"), {
      author: window.auth?.currentUser?.email || "Anonymous",
      content,
      media: mediaUrl,
      resonations: 0,
      createdAt: serverTimestamp()
    });
    textArea.value = "";
    mediaInput.value = "";
  };

  const q = query(collection(window.db, "posts"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snap) => {
    stream.innerHTML = "";
    snap.forEach((docSnap) => {
      const d = docSnap.data();
      const id = docSnap.id;
      const card = document.createElement("div");
      card.className = "elementa-glass p-6 rounded-3xl mb-6";
      card.innerHTML = `
        <div class="text-sm font-bold">${d.author || "Unknown"}</div>
        <p class="text-slate-200 leading-relaxed text-sm mt-2">${d.content || ""}</p>
        ${d.media ? `<img src="${d.media}" class="mt-4 rounded-2xl w-full object-cover max-h-96 border border-white/5">` : ""}
        <div class="flex gap-6 mt-6 pt-4 border-t border-white/5">
          <button class="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-[#f1c40f]" data-id="${id}">
            <span class="text-lg">⚡</span><span>${d.resonations || 0} RESONATIONS</span>
          </button>
          <button class="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-[#f1c40f]">
            <span class="text-lg">💬</span><span>LINK</span>
          </button>
        </div>`;
      stream.appendChild(card);
      card.querySelector("button[data-id]").onclick = async (e) => {
        const postId = e.currentTarget.getAttribute("data-id");
        await updateDoc(doc(window.db, "posts", postId), { resonations: increment(1) });
        card.classList.add("resonated");
        setTimeout(() => card.classList.remove("resonated"), 600);
      };
    });
  });
    }
