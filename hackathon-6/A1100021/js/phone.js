/* --- cargar la bd --- */
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
  const marcas = db.getData("marcas");
  marcas.forEach((marca, index) => {
    const optionItem = document.createElement("option");
    optionItem.value = marca.uuid;
    optionItem.textContent = marca.name;
    arrayOptions.push(optionItem);
  });
  optionItem.replaceChildren(...arrayOptions);
});

/* --- crear la sucursal --- */
const imei = document.getElementById("imei");
const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");

const btnRegistrar = document.getElementById("registrar");

/* --- validar el imei --- */
imei.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
  if (this.value.length > 15) {
    this.value = this.value.slice(0, 15);
  }
});

/* --- seleccionar marca y cargar los modelos --- */
marca.addEventListener("change", function () {
  /* --- cargar las modelos --- */
  let arrayOptions = [];
  const selectInitial = document.createElement("option");
  const optionItem = document.querySelector("#modelo");
  selectInitial.value = "no-option";
  selectInitial.textContent = "Selecciona un modelo";
  arrayOptions.push(selectInitial);
  if (this.selectedIndex !== 0) {
    const modelos = db.getData("modelos");
    modelos.forEach((modelo, index) => {
      if (modelo.brand.uuid === this.value) {
        const optionItem = document.createElement("option");
        optionItem.value = modelo.uuid;
        optionItem.textContent = modelo.name;
        arrayOptions.push(optionItem);
      }
    });
    optionItem.disabled = false;
  } else {
    optionItem.disabled = true;
  }

  optionItem.replaceChildren(...arrayOptions);
});

btnRegistrar.addEventListener("click", () => {
  if (
    imei.value.trim() === "" ||
    marca.selectedIndex === 0 ||
    modelo.selectedIndex === 0
  ) {
    alert("Debe completar el formulario");
    return;
  }
  const telefonos = db.getData("telefonos");
  const modelos = db.getData("modelos");
  const objModelo = Model.casting(modelos.find((m) => m.uuid === modelo.value));
  const telefono = new Phone(
    generarUUIDUnico(telefonos),
    imei.value.trim(),
    objModelo
  );
  telefonos.push(telefono);

  db.saveData("telefonos", telefonos);
  clearInputs();
  alert("Datos registrados");
});

const clearInputs = () => {
  imei.value = "";
  marca.selectedIndex = 0;
  const selectInitial = document.createElement("option");
  selectInitial.selectedIndex = 0;
  selectInitial.textContent = "Selecciona un modelo";
  modelo.replaceChildren(selectInitial);
  modelo.disabled = true;
};