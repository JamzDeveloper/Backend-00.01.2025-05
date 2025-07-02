class Phone {
  state = null;
  imei = "";
  model = "";
  brand = "";
  isReported = 0;
  constructor(imei, brand, model, state = null) {
    this.imei = imei;
    this.brand = brand;
    this.model = model;
    this.state = state;
  }
  updateState(state) {
    this.state = state;
  }
  updateIsReported(state) {
    this.isReported = state;
  }
}

const stateTicket = {
  init: "inicializado",
  process: "en proceso",
  finally: "finalizado",
};

class Ticket {
  phone;
  diagnosis;
  percentageAmount;
  finalAmount;
  state = stateTicket.init;
  client; //TODO: crear una clase llamada Client
  authorized = 0;
  part = [];

  constructor(phone, diagnosis, percentage, amountFinal, client) {
    this.phone = phone;
    this.diagnosis = diagnosis;
    this.percentageAmount = percentage;
    this.finalAmount = amountFinal;
    this.client = client;
  }
  changeAuthorized(state) {
    this.authorized = state;
  }
  //TODO: crear metodo para agregar repuestos usados
  //TODO: automatizar el porcentaje de pago,
  //  agregarPago(monto) ==> actualizar el campo monto_pago y el porcentaje
  //TODO: agregar un metodo para el porcentaje
  initService() {
    if (this.authorized && this.percentageAmount >= 50) {
      this.phone.updateState("en reparacion");

      this.state = stateTicket.process;

      console.log("📱✅Servicio iniciado");
    } else {
      console.log(
        "⚠️⚠️⚠️⚠️No cumple con las condiciones basicas para iniciar la repacion"
      );
    }
  }

  //TODO:crear un metodo para finalizar servicio
}

// TODO: agregar una clase para los tenicos
class Branch {
  tickets = [];
  clients = [];
  employees = [];
  contact = "";
  address = "";
  central;
  name = "";

  constructor(name, contact, address, central) {
    this.name = name;
    this.contact = contact;
    this.address = address;
    this.central = central;
  }

  addTicket(ticket) {
    const existCelReported = this.central.reportedPhones.find(
      (phone) => phone.imei == ticket.phone.imei
    );

    if (existCelReported) {
      console.error(
        "❌❌❌❌❌El celular esta roportado, llamando a la policia!!!🚔🚔🚔"
      );
      return;
    }

    console.log(
      "✅✅✅✅✅ el ticket fue agregado , esperar un momento ..... "
    );
    this.tickets.push(ticket);
  }
}

//TECNOIDAT

class Central {
  reportedPhones = [];
  branches = [];
  //TODO: agregar mas datos de central
  constructor() {}

  addPhone(phone) {
    this.reportedPhones.push(phone);
  }
  addBranch(branch) {
    this.branches.push(branch);
  }

  //TODO: metodo para eliminar celular robado deletePhoneReported(imei)=> reportedPhones
}

const tecnoIdat = new Central();

const tecnoTrujillo = new Branch(
  "tecnoTrujillo",
  "95672834",
  "Las Palmeras",
  tecnoIdat
);

tecnoIdat.addBranch(tecnoTrujillo);
// console.log("sucrusal", tecnoTrujillo);

const s23Ultra = new Phone("1090989897", "samsung", "s23ultra");
const iphone14 = new Phone("7857888909", "Apple", "14 pro ");
//---- ⚠️⚠️⚠️ agregando celular robado a la central⚠️⚠️⚠️
console.log(" ⚠️⚠️⚠️ agregando celular robado a la central⚠️⚠️⚠️");
tecnoIdat.addPhone(s23Ultra);

console.log(s23Ultra);

console.log("👨‍💻👨‍💻👨‍💻 agregando ticket a la sucursal 👨‍💻👨‍💻");

const ticketJose = new Ticket(iphone14, "bloqueado", 60, 60, {
  name: "jose montenegro",
  age: 25,
});
// agregando ticket  a la sucursal
tecnoTrujillo.addTicket(ticketJose);

// autorizando por parte del usuario
ticketJose.changeAuthorized(1);
// inicializar servicio
ticketJose.initService();

//TODO: crear un metodo en la sucursal
// para  extraer las sucurcales con mas ticket creados y resueltos
// sucursal "chiclayo" -- totalTicket: 20-- resueltos: 10 pendientes:10, espera: 20
// sucursal "arequipa" -- totalTicket: 20-- resueltos: 10 pendientes:10, espera: 20
