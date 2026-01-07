export function renderAssets(assets) {
    const grid = document.getElementById('vault-grid');
    grid.innerHTML = assets.map(asset => {
        const isVideo = asset.url.includes('.mp4') || asset.type === 'video';
        
        return `
            <div class="visual-shard elementa-glass p-2">
                ${isVideo ? 
                    `<video src="${asset.url}" muted loop playsinline onclick="this.play()"></video>` : 
                    `<img src="${asset.url}" loading="lazy">`
                }
                <div class="shard-overlay">
                    <p class="text-[10px] font-bold text-[#f1c40f] uppercase mb-1">${asset.name}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-[8px] text-slate-400">${asset.size || '2.4 MB'}</span>
                        <button class="text-white text-xs">🔗 Share</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
            }
