/* --- crear la bd --- */
const db = new DB();

/* --- crear el modelo --- */
const nombre = document.getElementById("nombre");

const btnRegistrar = document.getElementById("registrar");

btnRegistrar.addEventListener("click", () => {
  if (nombre.value.trim() === "") {
    alert("Debe completar el formulario");
    return;
  }
  const marcas = db.getData("marcas");
  const marca = new Brand(generarUUIDUnico(marcas), nombre.value.trim());
  marcas.push(marca);

  db.saveData("marcas", marcas);
  clearInputs();
  alert("Datos registrados");
});

const clearInputs = () => {
  nombre.value = "";
};