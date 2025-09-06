/* --- crear la bd --- */
const db = new DB();

/* --- crear la central --- */
const nombre = document.getElementById("nombre");
const contacto = document.getElementById("contacto");
const direccion = document.getElementById("direccion");

const btnRegistrar = document.getElementById("registrar");

btnRegistrar.addEventListener("click", () => {
  if (
    nombre.value.trim() === "" ||
    contacto.value.trim() === "" ||
    direccion.value.trim() === ""
  ) {
    alert("Debe completar el formulario");
    return;
  }
  const centrales = db.getData("centrales");
  const central = new Central(
    generarUUIDUnico(centrales),
    nombre.value.trim(),
    contacto.value.trim(),
    direccion.value.trim()
  );
  centrales.push(central);

  db.saveData("centrales", centrales);
  clearInputs();
  alert("Datos registrados");
});

const clearInputs = () => {
  nombre.value = "";
  contacto.value = "";
  direccion.value = "";
};