import { db } from "../../firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

console.log("Profile view loaded");

async function loadProfile() {
    const ref = doc(db, "users", "yewilsaw");
    const snap = await getDoc(ref);

    if (snap.exists()) {
        const data = snap.data();
        document.getElementById("profile-display").innerHTML = `
            <h2>${data.name}</h2>
            <p><strong>Status:</strong> ${data.status}</p>
            <p>${data.bio}</p>
        `;
    }
}

loadProfile();

