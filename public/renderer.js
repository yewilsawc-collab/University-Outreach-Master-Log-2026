// The Universal Renderer Engine
const shardContainer = document.querySelector('#shard-container');

const renderShards = (shards) => {
    shardContainer.innerHTML = shards.map(shard => `
        <div class="elementa-glass p-5 rounded-[30px] border border-white/5 animate-fade-in">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full aura-${shard.userAura} p-[2px]">
                        <img src="${shard.userPhoto}" class="rounded-full w-full h-full object-cover">
                    </div>
                    <div>
                        <h4 class="text-white text-[11px] font-bold uppercase tracking-widest">${shard.userName}</h4>
                        <p class="text-[9px] text-slate-500 uppercase tracking-tighter">${shard.location} • ${shard.timestamp}</p>
                    </div>
                </div>
            </div>

            <div class="rounded-2xl overflow-hidden mb-4 bg-black/40">
                <img src="${shard.contentImage}" class="w-full h-auto opacity-90">
                ${shard.text ? `<p class="p-4 text-sm font-light text-slate-300 leading-relaxed">${shard.text}</p>` : ''}
            </div>

            <div class="flex items-center justify-between px-1">
                <div class="flex gap-5">
                    <button class="flex items-center gap-2 group">
                        <span class="text-slate-500 group-hover:text-[#f1c40f] transition-colors">▲</span>
                        <span class="text-[10px] font-mono text-slate-400">${shard.likes}</span>
                    </button>
                    <button class="flex items-center gap-2 group">
                        <span class="text-slate-500 group-hover:text-red-500 transition-colors">▼</span>
                        <span class="text-[10px] font-mono text-slate-400">${shard.dislikes}</span>
                    </button>
                </div>
                <button onclick="downloadShard('${shard.id}')" class="text-slate-500 hover:text-white">
                    <span class="text-lg">⤓</span>
                </button>
            </div>
        </div>
    `).join('');
};
