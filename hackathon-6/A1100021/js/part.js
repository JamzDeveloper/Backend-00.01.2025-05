/* --- crear la bd --- */
const db = new DB();

/* --- crear la repuesto --- */
const codigo = document.getElementById("codigo");
const descripcion = document.getElementById("descripcion");
const tipo = document.getElementById("tipo");

const btnRegistrar = document.getElementById("registrar");

btnRegistrar.addEventListener("click", () => {
  if (
    codigo.value.trim() === "" ||
    descripcion.value.trim() === "" ||
    tipo.value.trim() === ""
  ) {
    alert("Debe completar el formulario");
    return;
  }
  const repuestos = db.getData("repuestos");
  const repuesto = new Part(
    generarUUIDUnico(repuestos),
    codigo.value.trim(),
    descripcion.value.trim(),
    tipo.value.trim()
  );
  repuestos.push(repuesto);

  db.saveData("repuestos", repuestos);
  clearInputs();
  alert("Datos registrados");
});

const clearInputs = () => {
  codigo.value = "";
  descripcion.value = "";
  tipo.value = "";
};