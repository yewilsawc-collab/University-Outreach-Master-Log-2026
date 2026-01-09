// splash.js
export function runSplash() {
    const splash = document.getElementById("splash-screen");
    const app = document.getElementById("main-ecosystem");

    setTimeout(() => {
        splash.classList.add("reveal-ecosystem");
        app.style.opacity = "1";
        navigator.vibrate?.(50);
    }, 1500);
}
