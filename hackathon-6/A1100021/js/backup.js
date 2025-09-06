const btnImportar = document.getElementById("importar");
const btnExportar = document.getElementById("exportar");

/* --- importar backup json --- */
btnImportar.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);

      localStorage.clear();

      for (const key in data) {
        localStorage.setItem(key, data[key]);
      }

      alert("Importación completada con éxito");
    } catch (err) {
      alert("Error al importar el archivo JSON");
      console.error(err);
    }
  };

  reader.readAsText(file);
});

/* --- exportar backup json --- */
btnExportar.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(localStorage, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "localStorageBackup.json";
  a.click();

  URL.revokeObjectURL(url);
});