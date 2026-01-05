import { db, auth } from "./firebase.js";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";

// Save school outreach
document.getElementById("save-school").addEventListener("click", async () => {
  const input = document.getElementById("school-input");
  const school = input.value.trim();
  if (!school) return;

  try {
    await addDoc(collection(db, "schools"), {
      name: school,
      uid: auth.currentUser?.uid || null,
      createdAt: serverTimestamp(),
    });
    input.value = "";
  } catch (err) {
    console.error("Error adding school:", err);
  }
});

// Live updates to log list
const logDisplay = document.getElementById("log-display");
const q = query(collection(db, "schools"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
  if (snapshot.empty) {
    logDisplay.textContent = "No schools logged yet...";
    return;
  }
  logDisplay.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const item = document.createElement("div");
    item.className = "list-group-item small text-light";
    item.textContent = `${data.name} (added ${data.createdAt?.toDate().toLocaleString() || "just now"})`;
    logDisplay.appendChild(item);
  });
});
