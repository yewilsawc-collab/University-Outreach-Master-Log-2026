// js/security.js
export async function authenticateNode() {
    const publicKeyCredentialCreationOptions = {
        challenge: Uint8Array.from("elementa-secure-node", c => c.charCodeAt(0)),
        rp: { name: "Elementa Ecosystem" },
        user: {
            id: Uint8Array.from("UZER_01", c => c.charCodeAt(0)),
            name: "Yewilsaw Chanie",
            displayName: "Ye_Chanie"
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }], // ES256
        authenticatorSelection: { authenticatorAttachment: "platform" } // Uses phone's biometric
    };

    try {
        const credential = await navigator.credentials.create({
            publicKey: publicKeyCredentialCreationOptions
        });
        if (credential) {
            console.log("Biometric identity verified.");
            return true;
        }
    } catch (err) {
        console.error("Authentication failed:", err);
        return false;
    }
}
