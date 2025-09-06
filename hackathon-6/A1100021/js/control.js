/* --- cargar la bd --- */
const db = new DB();

const tableTickets = document.getElementById("tickets-table");
const cuerpoTickets = tableTickets.getElementsByTagName("tbody")[0];
const sucursal = document.getElementById("sucursal");

/* --- cargar la página --- */
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

document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("tickets-table");

  table.addEventListener("click", (e) => {
    const centrales = db.getData("centrales");
    const sucursales = db.getData("sucursales");
    const tickets = db.getData("tickets");

    if (e.target.tagName !== "BUTTON") return;
    
    const btn = e.target;
    const ticketId = btn.dataset.ticketId;
    const action = btn.dataset.action;
    const row = table.querySelector(`tr[data-ticket-id="${ticketId}"]`);
    const statusCell = row.querySelector(".status");
    const approveBtn = row.querySelector('button[data-action="approve"]');
    const startBtn = row.querySelector('button[data-action="start"]');
    const finishBtn = row.querySelector('button[data-action="finish"]');
    
    const id = btn.getAttribute("data-id");

    let objTicket = Ticket.casting(tickets.find((t) => t.uuid === id));
    let process = false;
    
    if (action === "approve") {
      const respuesta = confirm("¿Deseas aprobar este ticket?");
      if (respuesta) {
        objTicket.changeAuthorized(1);
        approveBtn.disabled = true;
        startBtn.disabled = false;
        finishBtn.disabled = true;
        statusCell.textContent = "Aprobado";
        alert("El ticket fue aprobado con éxito.");
        process = true;
      }
    } else if (action === "start") {
      const response = objTicket.initService();
      if (response["success"]) {
          approveBtn.disabled = true;
          startBtn.disabled = true;
          finishBtn.disabled = false;
          statusCell.textContent = "En Proceso";
          alert(`${response["message"]}. El ticket fue iniciado con éxito.`);
          process = true;
      } else {
        const respuesta = confirm(response["message"] +
          ` Esto se debe a que el ticket cuenta con un ${formatAmount(response["data"])}% de aprobación, cuando debería alcanzar al menos un 50% para poder ser iniciado. ` +
          `El ticket requiere un monto de S/. ${response["data"].partialDifference} para cubrir con la mitad del pago total de S/. ${response["data"].finalAmount}. ¿Deseas agregar el monto para poder continuar?`);
        if (respuesta) {
          do {
            monto = prompt(`Introduce el monto parcial restante de S/. ${response["data"].partialDifference} o máximo S/. ${response["data"].totalDifference} para completar el pago:`); 
            if (monto === null) break;
          } while (isNaN(monto) || monto.trim() === "" || +monto < response["data"].partialDifference || +monto > response["data"].totalDifference);
          if (monto !== null) {
            objTicket.addAmount(+monto);
            const response = objTicket.initService();
            if (response["success"]) {
              approveBtn.disabled = true;
              startBtn.disabled = true;
              finishBtn.disabled = false;
              statusCell.textContent = "En Proceso";
              alert(`${response["message"]}. El ticket fue iniciado con éxito.`);
              process = true;
            }
          }
        }
      }
      
    } else if (action === "finish") {
      const response = objTicket.finService();
      if (response["success"]) {
        approveBtn.disabled = true;
        startBtn.disabled = true;
        finishBtn.disabled = true;
        statusCell.textContent = "Finalizado";
        alert(`${response["message"]}. El ticket fue finalizado con éxito.`); 
        process = true;
      } else {
        const respuesta = confirm(response["message"] +
          ` Esto se debe a que el ticket cuenta con un ${formatAmount(response["data"].percentage)}% de aprobación para ser finalizado. ` +
          `El ticket requiere un monto de S/. ${response["data"].totalDifference} para completar pago total de S/. ${response["data"].finalAmount}. ¿Deseas completar el pago para poder continuar?`);
        if (respuesta) {
          let monto;
          do {
            monto = prompt(`Introduce el monto restante de S/. ${response["data"].totalDifference} para completar el pago total de S/. ${response["data"].finalAmount}:`); 
            if (monto === null) break;
          } while (isNaN(monto) || monto.trim() === "" || +monto !== response["data"].totalDifference);
          if (monto !== null) {
            objTicket.addAmount(+monto);
            const response = objTicket.finService();
            if (response["success"]) {
              approveBtn.disabled = true;
              startBtn.disabled = true;
              finishBtn.disabled = true;
              statusCell.textContent = "Finalizado";
              alert(`${response["message"]}. El ticket fue finalizado con éxito.`); 
              process = true;
            }
          }
        }
      }
    }
    if (process) {
      tickets.forEach((ticket, index) => {
        if (ticket.uuid === id) {
          tickets[index] = objTicket;
        }
      });
      sucursales.forEach((sucursal) => {
        sucursal.tickets.forEach((ticket, index) => {
          if (ticket.uuid === id) {
            sucursal.tickets[index] = objTicket;
          }
        });
      });
      centrales.forEach((central) => {
        central.branches.forEach((branch) => {
          branch.tickets.forEach((ticket, index) => {
            if (ticket.uuid === id) {
              branch.tickets[index] = objTicket;
            }
          });
        });
      });

      db.saveData("tickets", tickets);
      db.saveData("sucursales", sucursales);
      db.saveData("centrales", centrales);
    }
  });
});

sucursal.addEventListener("change", (e) => {
  cuerpoTickets.innerHTML = "";

  if (e.target.selectedIndex !== 0) {
    const sucursales = db.getData("sucursales"); 
    const objBranch = Branch.casting(sucursales.find((s) => s.uuid === sucursal.value));

    objBranch.tickets.forEach((ticket, index) => {
      let btnApproveDisabled, btnStartDisabled, btnFinishDisabled;
      switch (ticket.state) {
        case stateTicket.pending:
          if(ticket.authorized !== 0) {
            btnApproveDisabled = true;
            btnStartDisabled = false;
            btnFinishDisabled = true;
          } else{
            btnApproveDisabled = false;
            btnStartDisabled = true;
            btnFinishDisabled = true;
          }
          break;
        case stateTicket.process:
          btnApproveDisabled = true;
          btnStartDisabled = true;
          btnFinishDisabled = false;
          break;
        case stateTicket.finally:
          btnApproveDisabled = true;
          btnStartDisabled = true;
          btnFinishDisabled = true;
          break;
      }

      cuerpoTickets.innerHTML += `
      <tr data-ticket-id="${index + 1}">
        <td>#${index + 1}</td>
        <td>${ticket.client.name + " " + ticket.client.lastName}</td>
        <td>${ticket.diagnosis}</td>
        <td class="status">${ticket.state === stateTicket.pending ? ticket.authorized !== 0 ? "Aprobado" : formatState(ticket.state) : formatState(ticket.state)}</td>
        <td>
          <button class="table-btn btn-approve" data-ticket-id="${index + 1}" data-id="${ticket.uuid}" data-action="approve" ${btnApproveDisabled ? "disabled" : ""}>Aprobar</button>
          <button class="table-btn btn-start" data-ticket-id="${index + 1}" data-id="${ticket.uuid}" data-action="start" ${btnStartDisabled ? "disabled" : ""}>Iniciar</button>
          <button class="table-btn btn-finish" data-ticket-id="${index + 1}" data-id="${ticket.uuid}" data-action="finish" ${btnFinishDisabled ? "disabled" : ""}>Finalizar</button>
        </td>
      </tr>`;
    });
  }
});

const stateTicket = {
  pending: "pendiente",
  process: "en proceso",
  finally: "finalizado",
};

const formatState = (estado) => {
  const estados = {
    "pendiente": "Pendiente",
    "en proceso": "En Proceso",
    "finalizado": "Finalizado"
  };

  return estados[estado.toLowerCase()] || "Desconocido";
}

const formatAmount = (num) => {
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
};