import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Aggregates system-wide metrics from the 'shards' collection.
 * Useful for monitoring ecosystem health and user engagement.
 */
export async function generateStatusReport() {
    try {
        const shardSnapshot = await getDocs(collection(db, 'shards'));
        
        const metrics = { 
            up: 0, 
            down: 0, 
            downloads: 0,
            totalShards: shardSnapshot.size 
        };

        shardSnapshot.forEach(doc => {
            const data = doc.data();
            // Using ||= 0 to handle undefined/null values safely
            metrics.up += data.resonanceCount || 0;
            metrics.down += data.dissolveCount || 0;
            metrics.downloads += data.downloadCount || 0;
        });

        // Log the report in a readable format
        console.log(`[SYSTEM REPORT - ${new Date().toLocaleString()}]`);
        console.table({
            "Resonance (Up)": metrics.up,
            "Dissolve (Down)": metrics.down,
            "Downloads": metrics.downloads,
            "Active Shards": metrics.totalShards
        });

        return metrics;
    } catch (error) {
        console.error("Failed to generate system report:", error);
        return null;
    }
                }
                
