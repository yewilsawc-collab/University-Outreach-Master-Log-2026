// app.js
import { initRouter } from "./navigation.js";
import { runSplash } from "./splash.js";

window.addEventListener("load", () => {
    runSplash();
    initRouter();
});
