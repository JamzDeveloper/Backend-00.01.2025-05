/* --- crear la bd --- */
const db = new DB();

/* --- crear el cliente --- */
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const edad = document.getElementById("edad");

const btnRegistrar = document.getElementById("registrar");

btnRegistrar.addEventListener("click", () => {
  if (
    nombre.value.trim() === "" ||
    apellido.value.trim() === "" ||
    edad.value.trim() === ""
  ) {
    alert("Debe completar el formulario");
    return;
  }
  const clientes = db.getData("clientes");
  const cliente = new Client(
    generarUUIDUnico(clientes),
    nombre.value.trim(),
    apellido.value.trim(),
    edad.value.trim()
  );
  clientes.push(cliente);

  db.saveData("clientes", clientes);
  clearInputs();
  alert("Datos registrados");
});

const clearInputs = () => {
  nombre.value = "";
  apellido.value = "";
  edad.value = "";
};