/* --- crear la bd --- */
const db = new DB();

/* --- cargar la página --- */
document.addEventListener("DOMContentLoaded", () => {
  /* --- cargar las marcas --- */
  let arrayOptions = [];
  const selectInitial = document.createElement("option");
  const optionItem = document.querySelector("#marca");
  selectInitial.value = "no-option";
  selectInitial.textContent = "Selecciona una marca";
  arrayOptions.push(selectInitial);
  const centrales = db.getData("marcas");
  centrales.forEach((central, index) => {
    const optionItem = document.createElement("option");
    optionItem.value = central.uuid;
    optionItem.textContent = central.name;
    arrayOptions.push(optionItem);
  });
  optionItem.replaceChildren(...arrayOptions);
});

/* --- crear el modelo --- */
const nombre = document.getElementById("nombre");
const marca = document.getElementById("marca");

const btnRegistrar = document.getElementById("registrar");

btnRegistrar.addEventListener("click", () => {
  if (nombre.value.trim() === "" || marca.selectedIndex === 0) {
    alert("Debe completar el formulario");
    return;
  }
  const modelos = db.getData("modelos");
  const marcas = db.getData("marcas");
  const objMarca = Brand.casting(marcas.find((m) => m.uuid === marca.value));
  const modelo = new Model(
    generarUUIDUnico(modelos),
    nombre.value.trim(),
    objMarca
  );
  modelos.push(modelo);

  db.saveData("modelos", modelos);
  clearInputs();
  alert("Datos registrados");
});

const clearInputs = () => {
  nombre.value = "";
  marca.selectedIndex = 0;
};