function updateSolarTheme() {
    const hour = new Date().getHours();
    const root = document.documentElement;

    if (hour >= 6 && hour <= 18) {
        // Daylight Mode: Vibrant Gold
        root.style.setProperty('--accent-gold', '#f1c40f');
        root.style.setProperty('--bg-obsidian', '#020617');
    } else {
        // Night Mode: Neon/Deep Gold
        root.style.setProperty('--accent-gold', '#d4af37');
        root.style.setProperty('--bg-obsidian', '#000000');
    }
}
setInterval(updateSolarTheme, 60000); // Check every minute
