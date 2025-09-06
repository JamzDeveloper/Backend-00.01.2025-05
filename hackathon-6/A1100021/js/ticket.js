/* --- cargar la bd --- */
const db = new DB();

/* --- cargar la página --- */
document.addEventListener("DOMContentLoaded", () => {
  function setupSearchableSelect(selectId, options) {
    const input = document.getElementById(`${selectId}-input`);
    const dropdown = document.getElementById(`${selectId}-dropdown`);
    const select = document.getElementById(selectId);

    function closeAllDropdowns() {
      document.querySelectorAll(".select-dropdown").forEach((el) => {
        el.style.display = "none";
      });
    }
    function renderDropdown(filteredOptions) {
      dropdown.innerHTML = "";
      filteredOptions.forEach((opt) => {
        const li = document.createElement("li");
        li.textContent = opt.text;
        li.addEventListener("click", () => {
          input.value = opt.text;
          select.value = opt.value;
          dropdown.style.display = "none";
        });
        dropdown.appendChild(li);
      });
      dropdown.style.display = filteredOptions.length ? "block" : "none";
    }

    input.addEventListener("input", () => {
      const query = input.value.toLowerCase();
      const filtered = options.filter((opt) =>
        opt.text.toLowerCase().includes(query)
      );
      closeAllDropdowns();
      renderDropdown(filtered);
    });

    input.addEventListener("focus", () => {
      closeAllDropdowns();
      renderDropdown(options);
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".select-wrapper")) {
        closeAllDropdowns();
      }
    });
    
    select.innerHTML = `<option value="">Seleccione</option>`;
    options.forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt.value;
      option.text = opt.text;
      select.appendChild(option);
    });
  }

  const clientes = db.getData("clientes");
  const telefonos = db.getData("telefonos");
  const repuestos = db.getData("repuestos");

  let clienteOptions = [];
  let telefonoOptions = [];
  let repuestoOptions = [];

  clientes.forEach((cliente, index) => {
    clienteOptions.push({
      value: cliente.uuid,
      text: cliente.name + " " + cliente.lastName,
    });
  });

  telefonos.forEach((telefono, index) => {
    telefonoOptions.push({
      value: telefono.uuid,
      text:
        telefono.imei +
        " - " +
        telefono.model.brand.name +
        " " +
        telefono.model.name,
    });
  });

  repuestos.forEach((repuesto, index) => {
    repuestoOptions.push({
      value: repuesto.uuid,
      text: repuesto.code + " - " + repuesto.description,
    });
  });

  setupSearchableSelect("cliente", clienteOptions);
  setupSearchableSelect("telefono", telefonoOptions);
  setupSearchableSelect("repuesto", repuestoOptions);
});

document.addEventListener("DOMContentLoaded", () => {
  /* --- cargar las sucursales --- */
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

const cliente = document.getElementById("cliente");
const telefono = document.getElementById("telefono");
const diagnostico = document.getElementById("diagnostico");
const repuesto = document.getElementById("repuesto");
const sucursal = document.getElementById("sucursal");

const monto = document.getElementById("monto");
const montoFinal = document.getElementById("montoFinal");

const clienteInput = document.getElementById("cliente-input");
const telefonoInput = document.getElementById("telefono-input");
const repuestoInput = document.getElementById("repuesto-input");
const checkParcial = document.getElementById("monto-checkbox");

const btnRegistrar = document.getElementById("registrar");

checkParcial.addEventListener("change", () => {
  monto.disabled = !checkParcial.checked;
  monto.focus();
});

monto.addEventListener("blur", () => {
  if (monto.value === "" || isNaN(monto.value)) {
    monto.value = 0;
  }
});

montoFinal.addEventListener("blur", () => {
  if (montoFinal.value === "" || isNaN(montoFinal.value)) {
    montoFinal.value = 0;
  }
});

btnRegistrar.addEventListener("click", () => {
  if (validarInputs()) {
    return;
  }
  if(checkParcial.checked) {
    if (+monto.value > +montoFinal.value) {
      alert("El pago parcial no debe exceder al pago total.");
      return;
    }
  }
  const clientes = db.getData("clientes");
  const telefonos = db.getData("telefonos");
  const repuestos = db.getData("repuestos");
  const centrales = db.getData("centrales");
  const sucursales = db.getData("sucursales");
  const tickets = db.getData("tickets");

  const objClient = Client.casting(
    clientes.find((c) => c.uuid === cliente.value)
  );
  const objPhone = Phone.casting(
    telefonos.find((t) => t.uuid === telefono.value)
  );
  const objPart = Part.casting(
    repuestos.find((r) => r.uuid === repuesto.value)
  );

  const objCentral = Central.casting(
    centrales.find((c) => c.branches.some((b) => b.uuid === sucursal.value))
  );
  const objBranch = Branch.casting(
    sucursales.find((s) => s.uuid === sucursal.value)
  );

  let ticket;

  if (checkParcial.checked) {
    ticket = new Ticket(
      generarUUIDUnico(tickets),
      objPhone,
      diagnostico.value.trim(),
      monto.value,
      montoFinal.value,
      objClient
    );
  } else {
    ticket = new Ticket(
      generarUUIDUnico(tickets),
      objPhone,
      diagnostico.value.trim(),
      montoFinal.value,
      montoFinal.value,
      objClient
    );
  }
  ticket.addPart(objPart);

  const response = objBranch.addTicket(ticket);
  tickets.push(ticket);

  if (response["success"]) {
    objCentral.branches.forEach((branch, index) => {
      if (branch.uuid === sucursal.value) {
        Branch.casting(branch).addTicket(ticket);
      }
    });

    db.saveData("tickets", tickets);
    db.saveData("centrales", centrales);
    db.saveData("sucursales", sucursales);
  }

  alert(response["message"]);

  clearInputs();
});

const validarInputs = () => {
  if (errorInput(clienteInput)) {
    alert("Debe buscar al cliente");
    return true;
  }
  if (errorInput(telefonoInput)) {
    alert("Debe buscar el teléfono");
    return true;
  }
  if (errorInput(diagnostico)) {
    alert("Debe especificar el diagnóstico del problema");
    return true;
  }
  if (errorInput(repuestoInput)) {
    alert("Debe elegir el repuesto");
    return true;
  }
  if (errorInput(sucursal)) {
    alert("Debe elegir la sucursal");
    return true;
  }
  if (checkParcial.checked) {
    if (errorInput(monto)) {
      alert("Debe aplicar el monto por adelanto");
      return true;
    }
  }
  if (errorInput(montoFinal)) {
    alert("Debe aplicar el monto total a pagar");
    return true;
  }
};

const errorInput = (element) => {
  focusRequet(element);
  if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
    if (element.value.trim() === "" || element.value === "0") {
      element.classList.add("error");
      return true;
    }
  } else if (element.tagName === "SELECT") {
    if (element.selectedIndex === 0) {
      element.classList.add("error");
      return true;
    }
  }
  return false;
};

const focusRequet = (element) => {
  element.addEventListener("focus", () => {
    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
      if (element.value.trim() === "" || element.value === "0") {
        element.classList.remove("error");
        element.value = "";
      }
    } else if (element.tagName === "SELECT") {
      if (element.selectedIndex === 0) {
        element.classList.remove("error");
      }
    }
  });
};

const clearInputs = () => {
  clienteInput.value = "";
  telefonoInput.value = "";
  diagnostico.value = "";
  repuestoInput.value = "";
  sucursal.selectedIndex = 0;
  montoFinal.value = 0;
  monto.value = 0;
  checkParcial.checked = false;
  monto.disabled = true;
};