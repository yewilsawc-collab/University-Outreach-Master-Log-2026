import { db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize your profile data
export async function setupUserProfile() {
    const profileRef = doc(db, "users", "yewilsaw_chanie");
    await setDoc(profileRef, {
        fullName: "Yewilsaw Chanie Mekonen",
        specialization: "Physical Chemistry (Kinetics & Spectroscopy)",
        currentStatus: "Yale application with department for review",
        location: "Addis Ababa / New York City",
        bio: "Expertise in kinetic models for heterogeneous systems and FT-IR spectroscopy.",
        contact: "+251 973 729 140"
    });
}

// Display profile on the UI
export async function displayProfile(elementId) {
    const docSnap = await getDoc(doc(db, "users", "yewilsaw_chanie"));
    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById(elementId).innerHTML = `
            <div class="profile-card">
                <h2>${data.fullName}</h2>
                <p><strong>Status:</strong> ${data.currentStatus}</p>
                <p>${data.bio}</p>
            </div>
        `;
    }
                                              }
