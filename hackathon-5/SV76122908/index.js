/*Utilizar Javascript para definir algoritmos mediante el uso de clases y objetos

EL PROBLEMA: 

Se necesita crear un sistema que maneje las reparaciones de celulares en un local con varias sucursales*
Tomar en cuenta los siguientes casos de uso:
- El telefono ingresado debe tener numero de serie e IMEI que no esten reportados para acceder al servicio*
- Un telefono primero debe pasar por una primera revision y se debe guardar el primer diagnostico*
- Se debe tener la autorizacion escrita del usuario y el abono del 50% de la reparacion para que acceda al servicio
- Los tecnicos pueden tener uno o varios skills que se adecuen a la marca de telefono que se necesita acceder al servicio
- Los repuestos se agregaran a la reparacion de telefono
- Se debe mostrar el estado del equipo en sus diferentes estaciones de trabajo 

stwitch(getso)

case 1 (android)
xxxxxx

case2 (ios)
xxxx

default
xxx no hay tecnico para esta marca*/


// Lista de IMEIs y series reportadas
const imeisReportados = ['123456789012345'];
const seriesReportadas = ['SERIE123'];

// Podemos visualizar qué técnico según sus habilidades:
const tecnicos = [
  {
    nombre: "Martin",
    habilidades: ["android"]
  },
  {
    nombre: "Geraldine",
    habilidades: ["ios"]
  }
];

// Vamos a crear el objeto teléfono que contendrá toda la información necesaria:
let telefono = {
  serie: '',
  imei: '',
  marca: '',
  diagnostico: '',
  autorizado: false,
  abono: 0,
  repuestos: [],
  estado: 'En espera'
};

//Función para validar si el IMEI y la serie están reportados:
function tlfestaReportado(serie, imei) {
  return imeisReportados.includes(imei) || seriesReportadas.includes(serie);
}

//Ingreso de datos del teléfono:
telefono.serie = prompt("Ingrese el número de serie del teléfono:");
telefono.imei = prompt("Ingrese el IMEI del teléfono:");
telefono.marca = prompt("Ingrese la marca del teléfono (Android o iOS):").toLowerCase();

//Validar que no esté reportado:
if (tlfestaReportado(telefono.serie, telefono.imei)) {
  alert("❌ El teléfono está reportado. No se puede ingresar al sistema.");
} else {

//Diagnóstico inicial
  telefono.diagnostico = prompt("Ingrese el primer diagnóstico del teléfono:");
  telefono.estado = "Revisión completada";

//Autorización del cliente
  let abono = parseFloat(prompt("Ingrese el abono del cliente (ejemplo: 0.5 para 50%):"));

  if (abono >= 0.5) {
    telefono.autorizado = true;
    telefono.abono = abono;
    telefono.estado = "Autorizado para reparación";
  } else {
    alert("⚠️ El abono debe ser al menos del 50%. Reparación no autorizada.");
  }

//Repuestos (si y solo si el cliente está autorizado):
  if (telefono.autorizado) {
    let agregarRepuesto = true;

    while (agregarRepuesto) {
      let repuesto = prompt("Ingrese un repuesto que se usará:");
      telefono.repuestos.push(repuesto);
      agregarRepuesto = confirm("¿Desea agregar otro repuesto?");
    }

    telefono.estado = "Repuestos agregados";

//Asignamos técnico:
    let tecnicoAsignado = null;

    switch (telefono.marca) {
      case "android":
        tecnicoAsignado = tecnicos.find(t => t.habilidades.includes("android"));
        break;
      case "ios":
        tecnicoAsignado = tecnicos.find(t => t.habilidades.includes("ios"));
        break;
      default:
        alert("No hay técnico disponible para esta marca.");
        break;
    }

    if (tecnicoAsignado) {
      alert("✅ Técnico asignado: " + tecnicoAsignado.nombre);
      telefono.estado = "Reparación en proceso";
    } else {
      alert("❌ No se encontró un técnico disponible.");
    }

//El último paso sería poder visualizar el estado final:
    alert("🚀Estado final del teléfono:\n" +
      "Diagnóstico: " + telefono.diagnostico + "\n" +
      "Autorizado: " + (telefono.autorizado ? "Sí" : "No") + "\n" +
      "Repuestos: " + telefono.repuestos.join(", ") + "\n" +
      "Estado actual: " + telefono.estado);
  }
}