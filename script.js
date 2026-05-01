let tugasList = JSON.parse(localStorage.getItem("tugas")) || [];

function simpanKeStorage() {
  localStorage.setItem("tugas", JSON.stringify(tugasList));
}

function tampilkanTugas() {
  const container = document.getElementById("listTugas");
  if (!container) return;

  container.innerHTML = "";

  tugasList.forEach((tugas, index) => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <div class="task-header">
        <b>${tugas.judul}</b>
        <span class="deadline">${tugas.deadline}</span>
      </div>
      <p>${tugas.matkul}</p>
      <a href="${tugas.link}" target="_blank">Lihat Tugas</a>
      <button onclick="hapusTugas(${index})">Hapus</button>
    `;

    container.appendChild(div);
  });
}

function tambahTugas() {
  const judul = document.getElementById("judul").value;
  const matkul = document.getElementById("matkul").value;
  const deadline = document.getElementById("deadline").value;
  const link = document.getElementById("linkDrive").value;

  if (!judul || !matkul || !deadline || !link) {
    alert("Isi semua field!");
    return;
  }

  tugasList.push({ judul, matkul, deadline, link });

  simpanKeStorage();
  tampilkanTugas();

  document.getElementById("judul").value = "";
  document.getElementById("matkul").value = "";
  document.getElementById("deadline").value = "";
  document.getElementById("linkDrive").value = "";
}

function hapusTugas(index) {
  tugasList.splice(index, 1);
  simpanKeStorage();
  tampilkanTugas();
}

document.addEventListener("DOMContentLoaded", tampilkanTugas);























































































































