// js/core/security.js

export async function authenticateNode() {
    if (!window.PublicKeyCredential) {
        console.warn("Biometric authentication not supported on this device.");
        return false;
    }

    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    const publicKey = {
        challenge,
        rp: { name: "Elementa Ecosystem" },
        user: {
            id: new TextEncoder().encode("USER_01"),
            name: "Yewilsaw Chanie",
            displayName: "Ye_Chanie"
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        authenticatorSelection: { authenticatorAttachment: "platform" }
    };

    try {
        const credential = await navigator.credentials.create({ publicKey });
        return !!credential;
    } catch (err) {
        console.error("Authentication failed:", err);
        return false;
    }
}
