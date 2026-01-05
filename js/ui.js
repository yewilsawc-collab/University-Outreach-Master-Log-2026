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

  document.getElementById("user-display-name").textContent = user?.displayName || "Academic Agent Pro";
  document.getElementById("auth-status-text").textContent = user?.isAnonymous ? "Guest Mode" : "Authenticated Mode";
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
    document.querySelectorAll(".nav-link").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((tab) => tab.classList.add("d-none"));
    btn.classList.add("active");
    document.getElementById(`tab-${btn.dataset.tab}`).classList.remove("d-none");
  });
});
// Swipe detection for tab navigation
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
