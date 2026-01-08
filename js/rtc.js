import { doc, setDoc, onSnapshot, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function startCall(targetUid) {
  const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  stream.getTracks().forEach(t => pc.addTrack(t, stream));

  const callId = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const callDoc = doc(window.db, "calls", callId);
  const offerCandidates = collection(callDoc, "offerCandidates");
  const answerCandidates = collection(callDoc, "answerCandidates");

  pc.onicecandidate = (event) => { if (event.candidate) addDoc(offerCandidates, event.candidate.toJSON()); };

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  await setDoc(callDoc, { caller: window.auth?.currentUser?.uid, callee: targetUid, offer });

  onSnapshot(callDoc, async (snap) => {
    const data = snap.data();
    if (data?.answer && !pc.currentRemoteDescription) {
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    }
  });

  onSnapshot(answerCandidates, async (snap) => {
    snap.docChanges().forEach(async change => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        await pc.addIceCandidate(candidate);
      }
    });
  });

  return { pc, callId };
          }
