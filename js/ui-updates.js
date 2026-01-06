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
