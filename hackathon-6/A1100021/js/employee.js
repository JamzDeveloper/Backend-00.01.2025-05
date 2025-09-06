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
  const marcas = db.getData("marcas");
  marcas.forEach((marca, index) => {
    const optionItem = document.createElement("option");
    optionItem.value = marca.name;
    optionItem.textContent = marca.name;
    arrayOptions.push(optionItem);
  });
  optionItem.replaceChildren(...arrayOptions);
});

document.addEventListener("DOMContentLoaded", () => {
  let arrayOptions = [];
  const selectInitial = document.createElement("option");
  const optionItem = document.querySelector("#sucursal");
  selectInitial.value = "no-option";
  selectInitial.textContent = "Selecciona una sucursal";
  arrayOptions.push(selectInitial);
  const sucursales = db.getData("sucursales");
  sucursales.forEach((sucursal, index) => {
    const optionItem = document.createElement("option");
    optionItem.value = sucursal.uuid;
    optionItem.textContent = sucursal.name;
    arrayOptions.push(optionItem);
  });
  optionItem.replaceChildren(...arrayOptions);
});

const loadingBranch = () => {};

/* --- crear el empleado --- */
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const contacto = document.getElementById("contacto");
const sucursal = document.getElementById("sucursal");

const especialidad = document.getElementById("especialidad");
const marca = document.getElementById("marca");
const sistema = document.getElementById("sistema");

const btnRegistrar = document.getElementById("registrar");
const btnAgregar = document.getElementById("agregar");

const habilidades = document.getElementById("habilidades");

let skills = [];

btnAgregar.addEventListener("click", () => {
  if (especialidad.value.trim() === "") {
    alert("Debe ingresar el titulo de la especialidad");
    return;
  }

  if (marca.selectedIndex === 0) {
    alert("Debe seleccionar la marca del teléfono de especialidad");
    return;
  }

  if (sistema.selectedIndex === 0) {
    alert("Debe seleccionar el sistema operativo de especialidad");
    return;
  }
  const specialty = especialidad.value.trim();
  const brandPhone = marca.value;
  const os = sistema.value;

  const li = document.createElement("li");

  const tituloElem = document.createElement("div");
  tituloElem.className = "item-title";
  tituloElem.textContent = specialty;

  const metaElem = document.createElement("div");
  metaElem.className = "item-meta";
  metaElem.textContent = `Marca de teléfono: ${brandPhone} | Sistema Operativo: ${
    sistema.options[sistema.selectedIndex].text
  }`;

  const btnEliminar = document.createElement("button");
  btnEliminar.className = "delete-btn";
  btnEliminar.textContent = "Eliminar";

  btnEliminar.addEventListener("click", () => {
    li.remove();
    const index = skills.findIndex(
      (skill) =>
        skill.specialty === specialty &&
        skill.brandPhone === brandPhone &&
        skill.os === os
    );

    if (index !== -1) {
      skills.splice(index, 1);
    }
  });

  li.appendChild(tituloElem);
  li.appendChild(metaElem);
  li.appendChild(btnEliminar);

  habilidades.appendChild(li);

  skills.push({
    uuid: generarUUIDUnico(skills),
    specialty: specialty,
    brandPhone: brandPhone,
    os: os,
  });

  clearListForm();
});

btnRegistrar.addEventListener("click", () => {
  if (
    nombre.value.trim() === "" ||
    apellido.value.trim() === "" ||
    contacto.value.trim() === "" ||
    sucursal.selectedIndex === 0
  ) {
    alert("Debe completar el formulario");
    return;
  }

  if (!habilidades.hasChildNodes()) {
    alert("Debe agregar por lo menos unas habilidades");
    return;
  }

  const empleados = db.getData("empleados");
  const centrales = db.getData("centrales");
  const sucursales = db.getData("sucursales");

  const empleado = new Employee(
    generarUUIDUnico(empleados),
    nombre.value.trim(),
    apellido.value.trim(),
    contacto.value.trim()
  );

  skills.forEach((skill, index) => {
    empleado.addSkill(
      new Skill(skill.uuid, skill.specialty, skill.brandPhone, skill.os)
    );
  });

  const objCentral = Central.casting(
    centrales.find((c) => c.branches.some((b) => b.uuid === sucursal.value))
  );
  const objBranch = Branch.casting(
    sucursales.find((s) => s.uuid === sucursal.value)
  );

  objCentral.branches.forEach((branch, index) => {
    if (branch.uuid === sucursal.value) {
      Branch.casting(branch).addEmployees(empleado);
    }
  });

  objBranch.addEmployees(empleado);

  empleados.push(empleado);

  db.saveData("empleados", empleados);
  db.saveData("centrales", centrales);
  db.saveData("sucursales", sucursales);

  clearInputs();
  clearList();

  alert("Datos registrados");
});

const clearInputs = () => {
  nombre.value = "";
  apellido.value = "";
  contacto.value = "";
  sucursal.selectedIndex = 0;
};

const clearList = () => {
  skills = [];
  while (habilidades.firstChild) {
    habilidades.removeChild(habilidades.firstChild);
  }
};

const clearListForm = () => {
  especialidad.value = "";
  marca.selectedIndex = 0;
  sistema.selectedIndex = 0;
};