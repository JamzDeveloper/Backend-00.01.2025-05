/* --- cargar la bd --- */
const db = new DB();

/* --- cargar la página --- */
document.addEventListener("DOMContentLoaded", () => {
  /* --- cargar las centrales --- */
  let arrayOptions = [];
  const selectInitial = document.createElement("option");
  const optionItem = document.querySelector("#central");
  selectInitial.value = "no-option";
  selectInitial.textContent = "Selecciona una central";
  arrayOptions.push(selectInitial);
  const centrales = db.getData("centrales");
  centrales.forEach((central, index) => {
    const optionItem = document.createElement("option");
    optionItem.value = central.uuid;
    optionItem.textContent = central.name;
    arrayOptions.push(optionItem);
  });
  optionItem.replaceChildren(...arrayOptions);
});

/* --- crear la sucursal --- */
const nombre = document.getElementById("nombre");
const contacto = document.getElementById("contacto");
const direccion = document.getElementById("direccion");
const central = document.getElementById("central");

const btnRegistrar = document.getElementById("registrar");

btnRegistrar.addEventListener("click", () => {
  if (
    nombre.value.trim() === "" ||
    contacto.value.trim() === "" ||
    direccion.value.trim() === "" ||
    central.selectedIndex === 0
  ) {
    alert("Debe completar el formulario");
    return;
  }
  const sucursales = db.getData("sucursales");
  const centrales = db.getData("centrales");
  const objCentral = Central.casting(
    centrales.find((c) => c.uuid === central.value)
  );
  const sucursal = new Branch(
    generarUUIDUnico(sucursales),
    nombre.value.trim(),
    contacto.value.trim(),
    direccion.value.trim(),
    objCentral
  );
  objCentral.addBranch(sucursal);
  sucursales.push(sucursal);
  db.forceSaveData("sucursales", sucursales);
  db.forceSaveData("centrales", centrales);
  clearInputs();
  alert("Datos registrados");
});

const clearInputs = () => {
  nombre.value = "";
  contacto.value = "";
  direccion.value = "";
  central.selectedIndex = 0;
};