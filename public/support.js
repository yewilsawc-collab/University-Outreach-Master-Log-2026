import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function sendUplinkReport() {
    const type = document.getElementById('report-type').value;
    const body = document.getElementById('report-body').value;
    
    try {
        await addDoc(collection(db, "reports"), {
            userId: auth.currentUser.uid,
            category: type,
            message: body,
            timestamp: Date.now(),
            deviceInfo: navigator.userAgent // Helps you debug Android/iOS specific issues
        });
        showToast("TRANSMISSION SUCCESSFUL");
    } catch (e) {
        showToast("UPLINK FAILED");
    }
                  }
