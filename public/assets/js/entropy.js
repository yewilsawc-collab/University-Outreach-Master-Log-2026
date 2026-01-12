import { db } from "./firebase.js"; 
import { collection, doc, deleteDoc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ENTROPY_THRESHOLD = 10; // Minimum energy to stay on Feed
const DECAY_CONSTANT = 0.05;  // Speed of decay

/**
 * Iterates through active posts and archives those that have lost 
 * enough "Social Energy" based on the decay formula:
 * Energy = Initial * e^(-decay * time)
 */
export async function processEcosystemEntropy() {
    const feedRef = collection(db, "posts");
    
    try {
        const snapshot = await getDocs(feedRef);
        const now = Date.now();

        // Using map to track all promises for concurrent execution
        const tasks = snapshot.docs.map(async (postDoc) => {
            const data = postDoc.data();
            
            // Handle potential missing timestamps safely
            const postTime = data.timestamp?.toMillis ? data.timestamp.toMillis() : (data.timestamp || now);
            const hoursActive = (now - postTime) / (1000 * 60 * 60);
            
            // Calculate Social Energy
            const initialEnergy = (data.resonations || 0) + 100; // Base energy
            const currentEnergy = initialEnergy * Math.exp(-DECAY_CONSTANT * hoursActive);

            if (currentEnergy < ENTROPY_THRESHOLD) {
                console.log(`Shard ${postDoc.id} reached maximum entropy (${currentEnergy.toFixed(2)}). Archiving...`);
                
                // 1. Move to Archive (Vault)
                await setDoc(doc(db, "archive", postDoc.id), {
                    ...data,
                    archivedAt: now,
                    finalResonance: data.resonations || 0,
                    entropyStatus: "archived"
                });

                // 2. Remove from Feed
                await deleteDoc(doc(db, "posts", postDoc.id));
            }
        });

        await Promise.all(tasks);
        console.log("Entropy processing complete.");
    } catch (error) {
        console.error("Entropy calculation failed:", error);
    }
                                 }
                                    
