// ui.js
let startX = 0;

// Handle Tab Switching
window.switchTab = (tabId) => {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  
  // Update nav buttons
  document.querySelectorAll('nav button').forEach(btn => btn.style.borderBottom = 'none');
  document.getElementById('btn-' + tabId).style.borderBottom = `2px solid var(--accent)`;
};

// Custom Swipe Logic
document.addEventListener('touchstart', e => startX = e.touches[0].clientX);
document.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 100) window.switchTab('ai-view'); // Swipe left
  if (endX - startX > 100) window.switchTab('feed-view'); // Swipe right
});

function renderPost(post) {
    const feedContainer = document.getElementById("social-feed");
    const postEl = document.createElement("div");
    postEl.className = "user-message"; // Reusing your existing style
    
    postEl.innerHTML = `
        <strong>${post.author}</strong>
        <p>${post.text}</p>
        <small>${new Date(post.timestamp).toLocaleString()}</small>
    `;
    feedContainer.prepend(postEl);
}
