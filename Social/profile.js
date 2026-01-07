import { db } from "./firebase.js";
import { 
    doc, setDoc, getDoc, collection, query, where, onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth } from "./master.js";

/**
 * Initializes/Updates the core profile document
 * Uses the Auth UID for cross-module coherence
 */
export async function setupUserProfile(user) {
    if (!user) return;
    const profileRef = doc(db, "users", user.uid); 
    await setDoc(profileRef, {
        fullName: "Yewilsaw Chanie Mekonen",
        specialization: "Physical Chemistry (Kinetics & Spectroscopy)",
        currentStatus: "Yale application with department for review",
        location: "Addis Ababa / New York City",
        bio: "Expertise in kinetic models for heterogeneous systems and FT-IR spectroscopy.",
        contact: "+251 973 729 140",
        lastActive: new Date()
    }, { merge: true });
}

/**
 * Real-time stats listener: Posts, Total Resonance, and Rank
 */
export function syncProfileStats() {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "posts"), where("authorUID", "==", user.uid));

    return onSnapshot(q, (snapshot) => {
        let totalResonations = 0;
        const postCount = snapshot.size;

        snapshot.forEach((doc) => {
            totalResonations += (doc.data().resonations || 0);
        });

        // Update UI Shards
        const uiMap = {
            'stat-resonance': totalResonations.toLocaleString(),
            'stat-posts': postCount,
            'stat-rank': postCount > 0 ? (totalResonations / postCount).toFixed(1) : "0.0"
        };

        Object.entries(uiMap).forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        });
    });
            }

