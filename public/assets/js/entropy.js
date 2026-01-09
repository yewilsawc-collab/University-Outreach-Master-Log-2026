import { getFirestore, collection, doc, deleteDoc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();
const ENTROPY_THRESHOLD = 10; // Minimum energy to stay on Feed
const DECAY_CONSTANT = 0.05;  // Adjust this to speed up/slow down decay

export async function processEcosystemEntropy() {
    const feedRef = collection(db, "posts");
    const snapshot = await getDocs(feedRef);
    
    snapshot.forEach(async (postDoc) => {
        const data = postDoc.data();
        const hoursActive = (Date.now() - data.timestamp) / (1000 * 60 * 60);
        
        // Calculate Social Energy
        const initialEnergy = (data.resonations || 0) + 100; // Base energy
        const currentEnergy = initialEnergy * Math.exp(-DECAY_CONSTANT * hoursActive);

        if (currentEnergy < ENTROPY_THRESHOLD) {
            console.log(`Shard ${postDoc.id} has reached maximum entropy. Archiving...`);
            
            // 1. Move to Archive (Vault)
            await setDoc(doc(db, "archive", postDoc.id), {
                ...data,
                archivedAt: Date.now(),
                finalResonance: data.resonations
            });

            // 2. Remove from Feed
            await deleteDoc(doc(db, "posts", postDoc.id));
        }
    });
                             }
