export function initStatus() {
  const shard = document.createElement("div");
  shard.className = "elementa-glass status-shard";
  shard.innerHTML = `<div id="connection-dot" class="status-dot offline"></div><span id="latency-text">…</span><span class="opacity-20">|</span><span id="node-count">0 NODES ONLINE</span>`;
  document.body.appendChild(shard);

  setInterval(async () => {
    const start = performance.now();
    try {
      await fetch("https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?VER=8", { mode: "no-cors" });
      const latency = Math.round(performance.now() - start);
      document.getElementById("latency-text").textContent = `${latency}ms`;
      document.getElementById("connection-dot").className = latency > 300 ? "status-dot lagging" : "status-dot online";
    } catch {
      document.getElementById("latency-text").textContent = "DISCONNECTED";
      document.getElementById("connection-dot").className = "status-dot offline";
    }
  }, 5000);

  if (window.db) {
    import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js").then(({ collection, onSnapshot }) => {
      onSnapshot(collection(window.db, "active_sessions"), (snap) => {
        const count = snap.size || 0;
        document.getElementById("node-count").textContent = `${count} ${count === 1 ? "NODE" : "NODES"} ONLINE`;
      });
    });
  }
}
