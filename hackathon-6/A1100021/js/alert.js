/* --- cargar la bd --- */
const db = new DB();

const tableAlerts = document.getElementById("alerts-table");
const cuerpoAlerts = tableAlerts.getElementsByTagName("tbody")[0];
const central = document.getElementById("central");

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

document.addEventListener("DOMContentLoaded", () => {
  const centrales = db.getData("centrales");
  const sucursales = db.getData("sucursales");
  const telefonos = db.getData("telefonos");

  telefonos.forEach((telefono, index) => {
    cuerpoAlerts.innerHTML += `
    <tr data-alert-id="${index}">
      <td>${telefono.imei}</td>
      <td>${telefono.model.name}</td>
      <td>${telefono.model.brand.name}</td>
      <td class="status">No reportado</td>
      <td>
        <label class="switch">
          <input type="checkbox" id="${telefono.uuid}" data-alert-id="${index}" data-action="toggle-report" disabled>
          <span class="slider round"></span>
        </label>
      </td>
    </tr>`;
  });

  tableAlerts.addEventListener("change", (e) => {
    const input = e.target;
    if (input.type === "checkbox" && input.dataset.action === "toggle-report") {
      const id = input.id;
      const alertId = input.dataset.alertId;
      const isChecked = input.checked;
      const row = tableAlerts.querySelector(`tr[data-alert-id="${alertId}"]`);
      const statusCell = row.querySelector(".status");

      if (isChecked) {
        statusCell.textContent = "Reportado";
        for (const index in telefonos) {
          if (telefonos[index].uuid === id) {
            const objPhone = Phone.casting(telefonos[index]);
            const objCentral = Central.casting(centrales.find((c) => c.uuid === central.value));
            const objBranch = Branch.casting(sucursales.find((s) => s.central.uuid === central.value));
            objPhone.updateIsReported(isChecked ? 1 : 0);
            telefonos[index] = objPhone;
            objCentral.addPhone(objPhone);
            Central.casting(objBranch.central).addPhone(objPhone);
          }
        }
      } else {
        statusCell.textContent = "No reportado";
        for (const index in telefonos) {
          if (telefonos[index].uuid === id) {
            const objPhone = Phone.casting(telefonos[index]);
            const objCentral = Central.casting(centrales.find((c) => c.uuid === central.value));
            const objBranch = Branch.casting(sucursales.find((s) => s.central.uuid === central.value));
            objPhone.updateIsReported(isChecked ? 1 : 0);
            telefonos[index] = objPhone;
            objCentral.deletePhoneReported(telefonos[index].imei);
            Central.casting(objBranch.central).deletePhoneReported(telefonos[index].imei);
          }
        }
      }
      db.saveData("telefonos", telefonos);
      db.saveData("sucursales", sucursales);
      db.saveData("centrales", centrales);
    }
  });
  document.body.addEventListener("mousedown", function (e) {
    const label = e.target.closest("label.switch");
    if (!label) return;

    const checkbox = label.querySelector('input[type="checkbox"][data-action="toggle-report"]');
    if (checkbox && checkbox.disabled) {
      e.preventDefault();
      alert("No puedes reportar un teléfono sin seleccionar una central.");
    }
  });
});

central.addEventListener("change", (e) => {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][data-action="toggle-report"]'
  );
  const centrales = db.getData("centrales");
  const telefonos = db.getData("telefonos");

  cuerpoAlerts.innerHTML = "";
  if (e.target.selectedIndex !== 0) {
    const objCentral = Central.casting(
      centrales.find((c) => c.uuid === central.value)
    );
    checkboxes.forEach((cb) => (cb.disabled = false));
    telefonos.forEach((telefono, index) => {
      cuerpoAlerts.innerHTML += `
        <tr data-alert-id="${index}">
          <td>${telefono.imei}</td>
          <td>${telefono.model.name}</td>
          <td>${telefono.model.brand.name}</td>
          <td class="status">${objCentral.reportedPhones.some((c) => c.uuid === telefono.uuid) ? "Reportado": "No reportado"}</td>
          <td>
            <label class="switch">
              <input type="checkbox" id="${telefono.uuid}" data-alert-id="${index}" 
              data-action="toggle-report" ${objCentral.reportedPhones.some((c) => c.uuid === telefono.uuid) ? "checked" : ""}>
              <span class="slider round"></span>
            </label>
          </td>
        </tr>`;
    });
  } else {
    checkboxes.forEach((cb) => (cb.disabled = true));
    telefonos.forEach((telefono, index) => {
      cuerpoAlerts.innerHTML += `
        <tr data-alert-id="${index}">
          <td>${telefono.imei}</td>
          <td>${telefono.model.name}</td>
          <td>${telefono.model.brand.name}</td>
          <td class="status">No reportado</td>
          <td>
            <label class="switch">
              <input type="checkbox" id="${telefono.uuid}" data-alert-id="${index}" data-action="toggle-report" disabled>
              <span class="slider round"></span>
            </label>
          </td>
        </tr>`;
    });
  }
});