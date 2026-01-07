import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase-init.js"; // assumes firebase-init.js sets up app + db

export function initStatusMonitor() {
  const statusHTML = `...`; // your status shard HTML
  document.body.insertAdjacentHTML('beforeend', statusHTML);

  setInterval(async () => {
    const start = Date.now();
    try {
      await fetch('https://www.gstatic.com/generate_204', { cache: 'no-store' });
      const latency = Date.now() - start;
      document.getElementById('latency-text').textContent = `${latency}MS`;
      document.getElementById('connection-dot').className =
        latency > 300 ? "w-2 h-2 rounded-full bg-yellow-500" : "w-2 h-2 rounded-full bg-green-500";
    } catch {
      document.getElementById('connection-dot').className = "w-2 h-2 rounded-full bg-red-500";
      document.getElementById('latency-text').textContent = "DISCONNECTED";
    }
  }, 5000);

  onSnapshot(collection(db, "active_sessions"), (snap) => {
    const count = snap.size || 1;
    document.getElementById('node-count').textContent = `${count} ${count === 1 ? 'NODE' : 'NODES'} ONLINE`;
  });
  }
