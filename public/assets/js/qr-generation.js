// --- QR CODE GENERATION ---
function generateNodeQR(nodeId) {
    const canvas = document.getElementById('sync-qr-canvas');
    // Using a library like QRCode.js
    QRCode.toCanvas(canvas, nodeId, {
        width: 300,
        margin: 2,
        color: {
            dark: '#020617',  // Matches your background
            light: '#ffffff'  // Matches your QR container
        }
    }, function (error) {
        if (error) console.error("Sync Error:", error);
        console.log("Neural Sync Ready.");
    });
}

// --- SCANNER LOGIC ---
function startScanner() {
    const syncButton = event.target;
    syncButton.innerText = "ACCESSING OPTICS...";
    
    // Logic to initialize camera and scanner
    // This typically opens a modal or overlays a video feed
    console.log("Initializing Local Node Discovery...");
    
    // Example: Redirecting to a dedicated scanner view
    // window.location.href = "/scanner";
}

// Auto-generate on load (Mock ID)
window.onload = () => generateNodeQR("NODE-X-772-ADX");
                    
