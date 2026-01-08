import { renderFeed } from "./posts.js";
import { renderMessages } from "./chat.js";
import { renderDiscovery } from "./ui.js"; // optional stub

export function router() {
  const main = document.getElementById("app");
  const route = location.hash.replace("#/", "") || "feed";
  if (!main) return;

  switch (route) {
    case "feed": main.innerHTML = ""; renderFeed(main); break;
    case "messages": main.innerHTML = ""; renderMessages(main); break;
    case "discovery": main.innerHTML = ""; renderDiscovery?.(main); break;
    default: main.innerHTML = "<div class='p-6'>Not Found</div>";
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
