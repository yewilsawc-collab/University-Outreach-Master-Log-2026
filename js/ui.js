import { storage, auth } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

const uploadBtn = document.getElementById("upload-btn");
const fileInput = document.getElementById("file-input");
const fileList = document.getElementById("file-list");

// Upload file to Firebase Storage
uploadBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) return;

  const uid = auth.currentUser?.uid || "guest";
  const fileRef = ref(storage, `vault/${uid}/${Date.now()}-${file.name}`);

  try {
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    // Add to list
    const item = document.createElement("a");
    item.href = url;
    item.target = "_blank";
    item.className = "list-group-item small text-light";
    item.textContent = file.name;
    fileList.appendChild(item);

    fileInput.value = "";
  } catch (err) {
    console.error("Upload failed:", err);
  }
});

// Load existing files on dashboard open
async function loadFiles() {
  const uid = auth.currentUser?.uid || "guest";
  const folderRef = ref(storage, `vault/${uid}`);

  try {
    const res = await listAll(folderRef);
    fileList.innerHTML = "";
    if (res.items.length === 0) {
      fileList.innerHTML = `<li class="list-group-item small text-muted">No files uploaded yet...</li>`;
    }
    for (const itemRef of res.items) {
      const url = await getDownloadURL(itemRef);
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.className = "list-group-item small text-light";
      link.textContent = itemRef.name.split("-").slice(1).join("-");
      fileList.appendChild(link);
    }
  } catch (err) {
    console.error("Error loading files:", err);
  }
}

// Call loadFiles when FILES tab is opened
document.querySelector("[data-tab='files']").addEventListener("click", loadFiles);
