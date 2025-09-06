/* --- cargar la bd --- */
const db = new DB();

const tableReports = document.getElementById("reports-table");
const cuerpoReports = tableReports.getElementsByTagName("tbody")[0];
const central = document.getElementById("central");
const checkTop = document.getElementById("top-checkbox");

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

central.addEventListener("change", (e) => {
  cuerpoReports.innerHTML = "";
  if (e.target.selectedIndex !== 0) {
    const centrales = db.getData("centrales"); 
    const sucursal = new Branch(); 
    
    const objCentral = Central.casting(centrales.find((c) => c.uuid === central.value)); 
    const reporte = sucursal.reporteSucursales(objCentral, checkTop.checked);
    reporte.forEach(t => {
      cuerpoReports.innerHTML += `
      <tr>
        <td>${t.branch} </td>
        <td>${t.totalTicket}</td>
        <td>${t.finally}</td>
        <td>${t.pending}</td>
        <td>${t.process}</td>
      </tr>`;
    });
  }
});

checkTop.addEventListener('change', function() { 
  cuerpoReports.innerHTML = "";
  if (central.selectedIndex !== 0) {
    const centrales = db.getData("centrales"); 
    const sucursal = new Branch(); 

    const objCentral = Central.casting(centrales.find((c) => c.uuid === central.value)); 
    const reporte = sucursal.reporteSucursales(objCentral, checkTop.checked);
    reporte.forEach(t => {
      cuerpoReports.innerHTML += `
      <tr>
        <td>${t.branch} </td>
        <td>${t.totalTicket}</td>
        <td>${t.finally}</td>
        <td>${t.pending}</td>
        <td>${t.process}</td>
      </tr>`;
    });
  }
});