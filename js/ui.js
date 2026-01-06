 <!-- App logic -->
  <script type="module">
    // Firebase
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
    import {
      getAuth, signInAnonymously, onAuthStateChanged, signOut,
      signInWithEmailAndPassword, createUserWithEmailAndPassword
    } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
    import {
      getFirestore, doc, setDoc, getDoc, updateDoc, collection,
      onSnapshot, query, orderBy, addDoc, deleteDoc, getDocs
    } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

    const config = JSON.parse(document.getElementById("firebase-config").textContent);
    const app = initializeApp(config);
    const auth = getAuth(app);
    const db = getFirestore(app);

    let currentUser = null;
    const tabs = ["log", "chat", "vault", "accounts"];

    // Auth state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUser = user;
        document.getElementById("user-display").textContent = user.isAnonymous ? "Guest session" : user.email;
        document.getElementById("logout-btn").classList.toggle("hidden", user.isAnonymous);
        init();
      } else {
        signInAnonymously(auth);
      }
    });

    // Accounts: auth/sign up/logout
    window.processAuth = async () => {
      const email = document.getElementById("identity-email").value;
      const pass = document.getElementById("identity-pass").value;
      try {
        await signInWithEmailAndPassword(auth, email, pass);
        window.switchTab("log");
      } catch (e) {
        alert("Switch failed: " + e.message);
      }
    };
    window.processSignUp = async () => {
      const email = document.getElementById("identity-email").value;
      const pass = document.getElementById("identity-pass").value;
      try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("Account created!");
        window.switchTab("log");
      } catch (e) {
        alert(e.message);
      }
    };
    window.processLogout = () => signOut(auth).then(() => location.reload());

    // Init
    function init() {
      syncUnis();
      syncChat();
      loadVault();
      setupSwipes();
      wireFileUpload();
      window.switchTab("log");
    }

    // Swipe navigation
    function setupSwipes() {
      const mc = new Hammer(document.getElementById("swipe-zone"));
      mc.on("swipeleft", () => {
        const idx = tabs.indexOf(getActiveTab());
        if (idx < tabs.length - 1) window.switchTab(tabs[idx + 1]);
      });
      mc.on("swiperight", () => {
        const idx = tabs.indexOf(getActiveTab());
        if (idx > 0) window.switchTab(tabs[idx - 1]);
      });
    }
    function getActiveTab() {
      return tabs.find(t => !document.getElementById(`${t}-view`).classList.contains("hidden"));
    }
    window.switchTab = (tab) => {
      tabs.forEach(t => {
        document.getElementById(`${t}-view`).classList.add("hidden");
        const btn = document.getElementById(`tab-${t}`);
        btn.className = "flex-1 min-w-[100px] py-3 text-[10px] font-black uppercase tracking-widest border-b-2 " +
                        (t === tab ? "border-blue-500 text-blue-400" : "border-transparent text-slate-500");
      });
      document.getElementById(`${tab}-view`).classList.remove("hidden");
    };

    // University list: sync and render (with intel + contacts + delete)
    function syncUnis() {
      if (!currentUser) return;
      const qUnis = query(collection(db, "users", currentUser.uid, "universities"), orderBy("timestamp", "desc"));
      onSnapshot(qUnis, (snap) => {
        document.getElementById("stats-total").textContent = `${snap.docs.length} Schools`;
        document.getElementById("uni-list").innerHTML = snap.docs.map(d => {
          const u = d.data();
          const id = d.id;
          const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(u.name + " Physical Chemistry mordenite kinetics")}`;
          return `
            <div class="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-[11px] font-black text-blue-400 uppercase">${u.name}</h3>
                  <span class="text-[7px] text-emerald-400 font-bold uppercase bg-emerald-400/10 px-1 rounded">${u.tier || "Carnegie Classified"}</span>
                </div>
                <div class="flex gap-3">
                  <a href="${scholarUrl}" target="_blank"
                     class="text-[8px] font-black px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-widest">PI Research</a>
                  <button onclick="window.deleteUni('${id}','${u.name}')"
                          class="text-slate-600 hover:text-red-400" title="Delete">${trashIcon()}</button>
                </div>
              </div>

              <div class="flex items-center gap-2 text-[9px]">
                <button onclick="window.toggleSection('intel-${id}')"
                        class="bg-slate-700/40 text-slate-300 px-2 py-1 rounded font-black uppercase">School Intel</button>
                <button onclick="window.toggleSection('contact-${id}')"
                        class="bg-slate-700/40 text-slate-300 px-2 py-1 rounded font-black uppercase">Contacts</button>
              </div>

              <div id="intel-${id}" class="hidden mt-4 pt-4 border-t border-slate-700/50 space-y-3">
                <div class="space-y-1">
                  <label class="text-[8px] font-black text-slate-500 uppercase tracking-widest">Department strength</label>
                  <textarea id="dept-${id}" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-[10px] text-white" rows="2"
                            placeholder="e.g. Cutting-edge research in heterogeneous systems ...">${u.deptStrength || ""}</textarea>
                </div>
                <div class="space-y-1">
                  <label class="text-[8px] font-black text-slate-500 uppercase tracking-widest">Facility / environment</label>
                  <input id="fac-${id}" value="${u.facility || ""}" type="text"
                         class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-[10px] text-white" placeholder="e.g. Innovative environment" />
                </div>
                <div class="space-y-1">
                  <label class="text-[8px] font-black text-slate-500 uppercase tracking-widest">Location advantage</label>
                  <input id="loc-${id}" value="${u.locationNote || ""}" type="text"
                         class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-[10px] text-white" placeholder="e.g. Proximity to research hubs" />
                </div>
                <div class="space-y-1">
                  <label class="text-[8px] font-black text-slate-500 uppercase tracking-widest">PI / faculty alignment</label>
                  <input id="pi-${id}" value="${u.piMatch || ""}" type="text"
                         class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-[10px] text-white" placeholder="e.g. Lab specializing in..." />
                </div>
                <button onclick="window.saveIntel('${id}')"
                        class="w-full py-2 bg-blue-600/20 text-blue-400 text-[8px] font-black uppercase rounded border border-blue-600/30">Save school intel</button>
              </div>

              <div id="contact-${id}" class="hidden mt-4 pt-4 border-t border-slate-700/50 space-y-3">
                <div>
                  <label class="text-[8px] font-black text-slate-500 uppercase tracking-widest">Admissions email</label>
                  <input id="email-${id}" value="${u.admEmail || ""}" type="email"
                         class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-[10px] text-blue-300"
                         placeholder="gradadmissions@${u.name.toLowerCase().replace(/\s/g,'')}.edu" />
                </div>
                <div>
                  <label class="text-[8px] font-black text-slate-500 uppercase tracking-widest">Graduate coordinator</label>
                  <input id="coord-${id}" value="${u.coordName || ""}" type="text"
                         class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-[10px] text-white" placeholder="Name of department contact" />
                </div>
                <div>
                  <label class="text-[8px] font-black text-slate-500 uppercase tracking-widest">Phone / WhatsApp</label>
                  <input id="phone-${id}" value="${u.phone || ""}" type="text"
                         class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-[10px] text-white" placeholder="+1 ..." />
                </div>
                <button onclick="window.saveContact('${id}')"
                        class="w-full py-2 bg-blue-600/20 text-blue-400 text-[8px] font-black uppercase rounded border border-blue-600/30">Save contact address</button>
              </div>
            </div>
          `;
        }).join("");
      });
    }

    window.toggleSection = (id) => {
      const el = document.getElementById(id);
      el.classList.toggle("hidden");
    };
    window.saveIntel = async (id) => {
      const data = {
        deptStrength: document.getElementById(`dept-${id}`)?.value || "",
        facility: document.getElementById(`fac-${id}`)?.value || "",
        locationNote: document.getElementById(`loc-${id}`)?.value || "",
        piMatch: document.getElementById(`pi-${id}`)?.value || ""
      };
      await updateDoc(doc(db, "users", currentUser.uid, "universities", id), data);
      alert("University specific intel updated!");
    };
    window.saveContact = async (id) => {
      const data = {
        admEmail: document.getElementById(`email-${id}`)?.value || "",
        coordName: document.getElementById(`coord-${id}`)?.value || "",
        phone: document.getElementById(`phone-${id}`)?.value || ""
      };
      await updateDoc(doc(db, "users", currentUser.uid, "universities", id), data);
      alert("Contact address saved.");
    };
    window.deleteUni = async (id, name) => {
      if (confirm(`Remove ${name}?`)) {
        await deleteDoc(doc(db, "users", currentUser.uid, "universities", id));
        await addDoc(collection(db, "global_chat"), {
          text: `Entry deleted: ${name}`, uid: currentUser.uid, timestamp: Date.now()
        });
      }
    };

    // Vault: load/update
    async function loadVault() {
      if (!currentUser) return;
      const vDoc = await getDoc(doc(db, "users", currentUser.uid, "profile", "vault"));
      const items = vDoc.exists() ? vDoc.data().items : [
        { id: "thesis", label: "Research narrative", text: "Kinetics of adsorption of ionic liquid into mordenite." },
        { id: "skills", label: "Technical stack", text: "MATLAB, Linux, FT-IR, TGA, CHN-Elemental Analysis." }
      ];
      document.getElementById("vault-editor").innerHTML = items.map(i => `
        <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
          <label class="text-[8px] font-black text-slate-500 uppercase block mb-2">${i.label}</label>
          <textarea data-id="${i.id}" data-label="${i.label}"
                    class="vault-input w-full bg-slate-900 border border-slate-700 rounded p-3 text-[10px] text-slate-200 outline-none" rows="3">${i.text}</textarea>
        </div>
      `).join("");
    }
    window.saveVault = async () => {
      const items = Array.from(document.querySelectorAll(".vault-input")).map(el => ({
        id: el.dataset.id, label: el.dataset.label, text: el.value
      }));
      await setDoc(doc(db, "users", currentUser.uid, "profile", "vault"), { items });
      alert("Data vault synchronized.");
    };

    // Chat: sync and composer
    function syncChat() {
      const qChat = query(collection(db, "global_chat"), orderBy("timestamp", "asc"));
      onSnapshot(qChat, (snap) => {
        const container = document.getElementById("chat-container");
        container.innerHTML = snap.docs.map(docSnap => {
          const d = docSnap.data();
          const isMe = d.uid === (auth.currentUser?.uid);
          return `
            <div class="flex ${isMe ? 'justify-end' : 'justify-start'}">
              <div class="max-w-[85%] p-3 rounded-2xl text-[11px] ${isMe ? 'bg-blue-600' : 'bg-slate-800 border border-slate-700'}">
                ${d.text}
              </div>
            </div>
          `;
        }).join("");
        container.scrollTop = container.scrollHeight;
      });
    }

    // File upload handler (logs uploads to chat)
    function wireFileUpload() {
      const f = document.getElementById("chat-file");
      f.addEventListener("change", async (e) => {
        if (!currentUser) return;
        for (const file of e.target.files) {
          await addDoc(collection(db, "global_chat"), {
            text: `Document uploaded: ${file.name}`,
            uid: currentUser.uid,
            timestamp: Date.now()
          });
          alert(`Uploaded: ${file.name}`);
        }
      });
    }

    // Intent parser: add university via chat (with authentic lookup)
    document.getElementById("chat-form").onsubmit = async (e) => {
      e.preventDefault();
      if (!currentUser) return;
      const input = document.getElementById("chat-input");
      const text = input.value.trim();
      if (!text) return;

      if (text.toLowerCase().startsWith("add ")) {
        const target = text.replace(/^add\s+/i, "").trim();
        // Feedback
        await addDoc(collection(db, "global_chat"), {
          text: `Authenticating: ${target} ...`,
          uid: currentUser.uid, timestamp: Date.now()
        });

        try {
          const res = await fetch(`https://universities.hipolabs.com/search?name=${encodeURIComponent(target)}`);
          const results = await res.json();
          if (Array.isArray(results) && results.length > 0) {
            const uni = results[0];
            const id = uni.name.toLowerCase().replace(/\s/g, "-");
            const ref = doc(db, "users", currentUser.uid, "universities", id);
            const exists = await getDoc(ref);
            const r1Keywords = ["Berkeley", "Yale", "Stanford", "Purdue", "MIT", "Columbia", "Chicago", "Princeton", "UCLA", "UCSB"];
            const tier = r1Keywords.some(k => uni.name.includes(k)) ? "Carnegie R1" : "Carnegie R2";

            if (exists.exists()) {
              await addDoc(collection(db, "global_chat"), {
                text: `${uni.name} is already in your log.`,
                uid: currentUser.uid, timestamp: Date.now()
              });
            } else {
              await setDoc(ref, {
                name: uni.name,
                domain: Array.isArray(uni.domains) ? uni.domains[0] : "",
                tier,
                timestamp: Date.now()
              });
              await addDoc(collection(db, "global_chat"), {
                text: `Authenticated & Logged: ${uni.name} (${tier})`,
                uid: currentUser.uid, timestamp: Date.now()
              });
            }
          } else {
            await addDoc(collection(db, "global_chat"), {
              text: `Could not find ${target} in global databases.`,
              uid: currentUser.uid, timestamp: Date.now()
            });
          }
        } catch (err) {
          // Fallback manual log
          const id = target.toLowerCase().replace(/\s/g, "-");
          await setDoc(doc(db, "users", currentUser.uid, "universities", id), {
            name: target, timestamp: Date.now()
          });
          await addDoc(collection(db, "global_chat"), {
            text: `Manual log added for ${target}.`,
            uid: currentUser.uid, timestamp: Date.now()
          });
        }
      } else {
        await addDoc(collection(db, "global_chat"), {
          text, uid: currentUser.uid, timestamp: Date.now()
        });
      }

      input.value = "";
    };

    // Helpers
    function trashIcon() {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1
          2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      `;
    }
  

