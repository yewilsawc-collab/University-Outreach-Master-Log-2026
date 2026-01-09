// --- Modal Controls ---
function openComposer() {
    document.getElementById('composer-modal').classList.remove('hidden');
}

function closeComposer() {
    document.getElementById('composer-modal').classList.add('hidden');
}

// --- Deployment Logic ---
function deployShard() {
    const content = document.getElementById('shard-content').value;
    const deployBtn = event.currentTarget;

    // 1. Enter Loading State
    deployBtn.innerText = "DEPLOYING...";
    deployBtn.disabled = true;

    // 2. Mock Transmission
    setTimeout(() => {
        console.log("Shard deployed to the ledger:", content);
        
        // 3. Close and Reset
        closeComposer();
        deployBtn.innerText = "DEPLOY";
        deployBtn.disabled = false;
        
        // Optional: Trigger a success notification
    }, 2000);
               }
