// --- 1. THEME TOGGLE ---
const themeBtn = document.getElementById("toggle-theme");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeBtn.innerText = isDark ? "☀️" : "🌙";
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.innerText = "☀️";
}

// --- 2. LAYER SWITCHING ---
onAuthStateChanged(auth, (user) => {
    const publicLayer = document.getElementById("layer-public");
    const privateLayer = document.getElementById("layer-private");

    if (user) {
        publicLayer.classList.add("d-none");
        privateLayer.classList.remove("d-none");
        loadFileList(); // Refresh files on login
    } else {
        publicLayer.classList.remove("d-none");
        privateLayer.classList.add("d-none");
    }
});

// --- 3. FILE UPLOAD/DOWNLOAD ---
const uploadBtn = document.getElementById("upload-document-btn");
if (uploadBtn) {
    uploadBtn.addEventListener("click", async () => {
        const file = document.getElementById("file-chooser").files[0];
        if (!file) return;
        
        const storageRef = ref(storage, `uploads/${auth.currentUser.uid}/${file.name}`);
        await uploadBytes(storageRef, file);
        alert("Upload successful!");
        loadFileList();
    });
}

async function loadFileList() {
    const listRef = ref(storage, `uploads/${auth.currentUser.uid}`);
    const container = document.getElementById("vault-file-list");
    container.innerHTML = "";
    
    const res = await listAll(listRef);
    res.items.forEach(async (item) => {
        const url = await getDownloadURL(item);
        const div = document.createElement("div");
        div.className = "file-item";
        div.innerHTML = `<span>${item.name}</span><a href="${url}" class="btn-gold" target="_blank">Download</a>`;
        container.appendChild(div);
    });
}

// --- 4. TAB NAVIGATION ---
document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('d-none'));
        document.getElementById(`tab-${btn.dataset.tab}`).classList.remove('d-none');
    });
});


