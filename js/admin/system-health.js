// admin/system-health.js
async function generateStatusReport() {
    const shards = await db.collection('shards').get();
    const metrics = {
        up: 0, down: 0, downloads: 0,
    };

    shards.forEach(doc => {
        const data = doc.data();
        metrics.up += data.resonanceCount;
        metrics.down += data.dissolveCount;
        metrics.downloads += data.downloadCount;
    });

    console.log(`[SYSTEM REPORT] Up: ${metrics.up} | Down: ${metrics.down} | Yield: ${metrics.downloads}`);
          }
