import { auth, signIn, signOut } from "./firebase.js";

let loginTriggered = false;

// Sign In / Guest Access
document.getElementById("login-trigger").addEventListener("click", () => {
  loginTriggered = true;
  signIn();
});

// Sign Out
document.getElementById("logout-btn").addEventListener("click", () => {
  loginTriggered = false;
  signOut();
});

// Auth State Listener
auth.onAuthStateChanged((user) => {
  if (!loginTriggered && !user?.isAnonymous) return;

  const isLoggedIn = !!user;
  document.getElementById("layer-public").classList.toggle("d-none", isLoggedIn);
  document.getElementById("layer-private").classList.toggle("d-none", !isLoggedIn);

  document.getElementById("user-display-name").textContent =
    user?.displayName || "Academic Agent Pro";
  document.getElementById("auth-status-text").textContent =
    user?.isAnonymous ? "Guest Mode" : "Authenticated Mode";
});

// Theme Toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

// Tab Switching
document.querySelectorAll(".nav-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active state from all buttons
    document.querySelectorAll(".nav-link").forEach((b) => b.classList.remove("active"));
    // Hide all tab contents
    document.querySelectorAll(".tab-content").forEach((tab) => tab.classList.add("d-none"));

    // Activate clicked button
    btn.classList.add("active");
    const targetId = `tab-${btn.dataset.tab}`;
    const targetSection = document.getElementById(targetId);
    if (targetSection) targetSection.classList.remove("d-none");
  });
});

// Swipe Navigation
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
  const tabs = Array.from(document.querySelectorAll(".nav-link"));
  const activeIndex = tabs.findIndex((t) => t.classList.contains("active"));

  if (touchEndX < touchStartX - 50 && activeIndex < tabs.length - 1) {
    // Swipe left → next tab
    tabs[activeIndex + 1].click();
  }
  if (touchEndX > touchStartX + 50 && activeIndex > 0) {
    // Swipe right → previous tab
    tabs[activeIndex - 1].click();
  }
}

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

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
