// Add to your master.js or a new terminal.js
let inputBuffer = "";
const COMMANDS = {
    'help': 'Display available uplink protocols.',
    'status': 'Check Neural Link and Cloud Node health.',
    'clear': 'Purge terminal buffer.',
    'broadcast --m': 'Send a Global Pulse to all nodes.',
    'vault --ls': 'List all assets in the encrypted repository.',
    'identity --sync': 'Force refresh of Firestore aggregation.'
};

document.addEventListener('keydown', (e) => {
    // Hidden Trigger: Typing 'admin' opens the Uplink
    inputBuffer += e.key;
    if (inputBuffer.includes("admin")) {
        showUplink();
        inputBuffer = "";
    }
});

function showUplink() {
    const termHTML = `
    <div id="uplink-overlay" class="fixed inset-0 z-[500] bg-black/90 backdrop-blur-md p-6 font-mono text-green-500 overflow-hidden flex flex-col">
        <div class="flex justify-between border-b border-green-900/50 pb-2 mb-4">
            <span>ELEMENTA UPLINK v1.0.4 [USER: YE_CHANIE]</span>
            <button onclick="hideUplink()" class="text-red-500">[EXIT]</button>
        </div>
        <div id="terminal-output" class="flex-1 overflow-y-auto space-y-2 text-xs">
            <p>> SYSTEM READY. TYPE 'HELP' FOR PROTOCOLS.</p>
        </div>
        <div class="flex gap-2 pt-4">
            <span class="text-[#f1c40f]">λ</span>
            <input type="text" id="terminal-input" class="bg-transparent border-none outline-none flex-1 text-green-500" autofocus>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', termHTML);
    setupTerminalLogic();
      }
