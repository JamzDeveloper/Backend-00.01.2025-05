

class Telefono {
  constructor(imei, serie, marca, sistemaOperativo) {
    this.imei = imei;
    this.serie = serie;
    this.marca = marca;
    this.sistemaOperativo = sistemaOperativo;
    this.diagnostico = "";
    this.autorizado = false;
    this.repuestos = [];
    this.estado = "Ingreso"; // Estado inicial
  }

  // Método para guardar el diagnóstico
  registrarDiagnostico(texto) {
    this.diagnostico = texto;
    this.estado = "Diagnosticado";
  }

  // Método para autorizar reparación si se abona el 50%
  autorizarReparacion(abono) {
    if (abono >= 0.5) {
      this.autorizado = true;
      this.estado = "Autorizado para reparación";
    } else {
      console.log("El abono no es suficiente (mínimo 50%).");
    }
  }

  // Método para agregar repuestos
  agregarRepuesto(repuesto) {
    this.repuestos.push(repuesto);
  }

  // Método para cambiar el estado del equipo
  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  // Método para identificar qué sistema operativo tiene
  getSO() {
    switch (this.sistemaOperativo.toLowerCase()) {
      case "android":
        console.log("Se asigna técnico Android.");
        break;
      case "ios":
        console.log("Se asigna técnico iOS.");
        break;
      default:
        console.log("No hay técnico para esta marca.");
    }
  }
}



const miCelular = new Telefono("123456789", "A1B2C3D4", "Samsung", "Android");

miCelular.registrarDiagnostico("Pantalla rota y falla de batería");
miCelular.autorizarReparacion(0.5);
miCelular.agregarRepuesto("Pantalla nueva");
miCelular.agregarRepuesto("Batería original");
miCelular.getSO();
miCelular.cambiarEstado("En reparación");

console.log("Estado final del equipo:", miCelular.estado);
console.log("Repuestos usados:", miCelular.repuestos); 