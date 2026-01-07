/**
 * Renders research assets (Spectroscopy plots, Kinetic models, Lab videos)
 * @param {Array} assets - Array of asset objects from Firestore or Storage
 */
export function renderAssets(assets) {
    const grid = document.getElementById('vault-grid');
    if (!grid) return;

    // Coherence Check: Handle empty state
    if (!assets || assets.length === 0) {
        grid.innerHTML = `<p class="text-slate-500 italic p-4">No assets archived in the vault.</p>`;
        return;
    }

    grid.innerHTML = assets.map(asset => {
        const isVideo = asset.url.includes('.mp4') || asset.type === 'video';
        
        return `
            <div class="visual-shard elementa-glass p-2 relative overflow-hidden group">
                ${isVideo ? 
                    `<video src="${asset.url}" muted loop playsinline 
                            class="w-full h-auto cursor-pointer"
                            onmouseover="this.play()" 
                            onmouseout="this.pause()"></video>` : 
                    `<img src="${asset.url}" loading="lazy" class="w-full h-auto">`
                }
                <div class="shard-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p class="text-[10px] font-bold text-[#f1c40f] uppercase mb-1">${asset.name}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-[8px] text-slate-400">${asset.size || '0.0 MB'}</span>
                        <button class="text-white text-[10px] hover:text-[#f1c40f]" 
                                onclick="copyAssetLink('${asset.url}')">
                            🔗 Share Link
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Global utility for the Share button to maintain coherence with vault UI
window.copyAssetLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Asset link copied to clipboard.");
};
        
