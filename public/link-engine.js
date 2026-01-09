export function parseUniversalLinks(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
        return `
            <a href="${url}" target="_blank" class="elementa-link-card group">
                <span class="link-icon">🔗</span>
                <span class="link-text">${url.replace('https://', '').split('/')[0]}</span>
                <div class="link-hover-glow"></div>
            </a>
        `;
    });
}
