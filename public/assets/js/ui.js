// ui.js
let startX = 0;

// Handle Tab Switching
window.switchTab = (tabId) => {
  const targetTab = document.getElementById(tabId);
  if (!targetTab) return; // Prevent error if tabId doesn't exist

  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  targetTab.classList.add('active');
  
  // Update nav buttons safely
  document.querySelectorAll('nav button').forEach(btn => btn.style.borderBottom = 'none');
  
  const activeBtn = document.getElementById('btn-' + tabId);
  if (activeBtn) {
    activeBtn.style.borderBottom = `2px solid var(--accent)`;
  }
};

// Custom Swipe Logic with basic error checking
document.addEventListener('touchstart', e => {
  if (e.touches?.[0]) startX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
  if (!e.changedTouches?.[0]) return;
  
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  // Reduced threshold to 70px for better UX
  if (diff > 70) window.switchTab('ai-view'); // Swipe left
  if (diff < -70) window.switchTab('feed-view'); // Swipe right
});

function renderPost(post) {
    const feedContainer = document.getElementById("social-feed");
    if (!feedContainer) return; // Error check

    const postEl = document.createElement("div");
    postEl.className = "user-message";
    
    // Safety: Fallback for missing post data
    const author = post.author || "Anonymous";
    const text = post.text || "";
    const time = post.timestamp ? new Date(post.timestamp).toLocaleString() : "Just now";

    postEl.innerHTML = `
        <strong>${author}</strong>
        <p>${text}</p>
        <small>${time}</small>
    `;
    feedContainer.prepend(postEl);
      }

