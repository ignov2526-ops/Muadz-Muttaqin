import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// CONFIG LO
const firebaseConfig = {
  apiKey: "AIzaSyC_WTSwliSvRZ5U3BCqFe2k0inVKWExu8k",
  authDomain: "muadz-muttaqin.firebaseapp.com",
  projectId: "muadz-muttaqin",
  storageBucket: "muadz-muttaqin.firebasestorage.app",
  messagingSenderId: "767465443663",
  appId: "1:767465443663:web:a187ecd3f0f0063a35753a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tugasRef = collection(db, "tugas");


// TAMBAH
window.tambahTugas = async function () {
  const judul = document.getElementById("judul")?.value;
  const matkul = document.getElementById("matkul")?.value;
  const deadline = document.getElementById("deadline")?.value;
  const link = document.getElementById("linkDrive")?.value;

  if (!judul || !matkul || !deadline || !link) {
    alert("Isi semua!");
    return;
  }

  await addDoc(tugasRef, { judul, matkul, deadline, link });
  tampilkanTugas();
  resetForm();
};


// TAMPILKAN
async function tampilkanTugas() {
  const list = document.getElementById("listTugas");
  if (!list) return; // penting biar gak error di halaman profil

  list.innerHTML = "";

  const data = await getDocs(tugasRef);

  data.forEach((item) => {
    const t = item.data();

    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <b>${t.judul}</b><br>
      ${t.matkul}<br>
      ${t.deadline}<br>
      <a href="${t.link}" target="_blank">Lihat</a><br>
      <button onclick="hapusTugas('${item.id}')">Hapus</button>
    `;

    list.appendChild(div);
  });
}


// HAPUS
window.hapusTugas = async function (id) {
  await deleteDoc(doc(db, "tugas", id));
  tampilkanTugas();
};


// RESET
function resetForm() {
  document.getElementById("judul").value = "";
  document.getElementById("matkul").value = "";
  document.getElementById("deadline").value = "";
  document.getElementById("linkDrive").value = "";
}


// LOAD
document.addEventListener("DOMContentLoaded", tampilkanTugas);



window.tambahTugas = async function () {
  console.log("Klik tambah");

  try {
    const judul = document.getElementById("judul").value;
    const matkul = document.getElementById("matkul").value;
    const deadline = document.getElementById("deadline").value;
    const link = document.getElementById("linkDrive").value;

    console.log(judul, matkul, deadline, link);

    await addDoc(tugasRef, {
      judul,
      matkul,
      deadline,
      link
    });

    console.log("Berhasil tambah ke Firebase");

    tampilkanTugas();

  } catch (e) {
    console.error("ERROR:", e);
  }
};
