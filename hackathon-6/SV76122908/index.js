
class Telefono {
    constructor(serie, imei, marca) {
      this.serie = serie;
      this.imei = imei;
      this.marca = marca;
      this.diagnostico = null;
      this.autorizado = false;
      this.abono = 0;
      this.repuestos = [];
      this.estado = "Ingresado";
    }
  
   
    hacerDiagnostico(diagnostico) {
      this.diagnostico = diagnostico;
      this.estado = "Revisado";
    }
  
    
    autorizarReparacion(autorizado, abono) {
      if (autorizado && abono >= 0.5) {
        this.autorizado = true;
        this.abono = abono;
        this.estado = "Autorizado";
      } else {
        console.log("No se puede autorizar: falta aprobación o abono mínimo del 50%");
      }
    }
  
    agregarRepuesto(repuesto) {
      this.repuestos.push(repuesto);
    }
  
    actualizarEstado(nuevoEstado) {
      this.estado = nuevoEstado;
    }
  }
  

  class Tecnico {
    constructor(nombre) {
      this.nombre = nombre;
      this.skills = [];
    }
  
    agregarSkill(marca) {
      this.skills.push(marca);
    }
  
    puedeReparar(marcaTelefono) {
      return this.skills.includes(marcaTelefono);
    }
  }
  

  class Sucursal {
    constructor(nombre) {
      this.nombre = nombre;
      this.telefonos = [];
    }
  
    ingresarTelefono(telefono) {
    
      const key = `${telefono.serie}-${telefono.imei}`;
      if (localStorage.getItem(key)) {
        console.log("El teléfono ya fue reportado anteriormente.");
      } else {
        localStorage.setItem(key, JSON.stringify(telefono));
        this.telefonos.push(telefono);
        console.log("Teléfono ingresado exitosamente.");
      }
    }
  
    mostrarEstados() {
      this.telefonos.forEach((t) => {
        console.log(`Teléfono ${t.imei} estado: ${t.estado}`);
      });
    }
  }
  

  function guardarSesion(tecnico, sucursal) {
    sessionStorage.setItem("tecnicoActivo", tecnico.nombre);
    sessionStorage.setItem("sucursalActual", sucursal.nombre);
  }
  
 
  
  const tecnico1 = new Tecnico("Carlos");
  tecnico1.agregarSkill("Samsung");
  tecnico1.agregarSkill("Motorola");
  
  const sucursalA = new Sucursal("Sucursal A");
  
  const cel = new Telefono("12345", "999888777", "Samsung");
  
 
  guardarSesion(tecnico1, sucursalA);
  
  
  sucursalA.ingresarTelefono(cel);
  
  
  cel.hacerDiagnostico("Pantalla rota");
  
  
  cel.autorizarReparacion(true, 0.5);
  

  cel.agregarRepuesto("Pantalla nueva");
  

  cel.actualizarEstado("En reparación");
  
 
  sucursalA.mostrarEstados();