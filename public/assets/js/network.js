// A simplified Force-Directed Graph logic for Android Performance
class Node {
    constructor(id, label, type) {
        this.id = id;
        this.label = label;
        this.type = type; // 'user', 'post', or 'asset'
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = 0;
        this.vy = 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.type === 'user' ? 8 : 4, 0, Math.PI * 2);
        ctx.fillStyle = this.type === 'user' ? '#f1c40f' : 'rgba(255,255,255,0.5)';
        ctx.fill();
        
        ctx.font = "8px Monospace";
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fillText(this.label, this.x + 10, this.y + 3);
    }
}

// Logic to connect shards to your central Identity
function animateNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    links.forEach(link => {
        ctx.beginPath();
        ctx.moveTo(link.source.x, link.source.y);
        ctx.lineTo(link.target.x, link.target.y);
        ctx.strokeStyle = 'rgba(241, 196, 15, 0.1)';
        ctx.stroke();
    });

    nodes.forEach(node => {
        node.draw(ctx);
        // Add subtle drifting "Kinetics"
        node.x += Math.sin(Date.now() / 1000) * 0.2;
        node.y += Math.cos(Date.now() / 1000) * 0.2;
    });

    requestAnimationFrame(animateNetwork);
    }
  
