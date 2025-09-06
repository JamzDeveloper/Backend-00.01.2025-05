class Branch {  
  uuid;
  tickets = [];
  clients = [];
  employees = [];
  contact = "";
  address = "";
  central;
  name = "";

  constructor(uuid, name, contact, address, central) {
    this.uuid = uuid;
    this.name = name;
    this.contact = contact;
    this.address = address;
    this.central = central;
  }

  addTicket(ticket) {
    let response = {}; 
    const existCelReported = this.central.reportedPhones.find(p => p.imei == ticket.phone.imei);

    if (existCelReported) {
      response["message"] = "❌ El celular esta reportado, llamando a la policia!!!🚔🚔🚔";
      response["success"] = false;
      return response;
    }

    const responseSkill = this.noBrandPhoneSkill(ticket.phone.model.brand);
    if (!responseSkill["success"]) {
      return responseSkill;
    }

    response["message"] = "✅ El ticket fue agregado con exito. " + responseSkill["message"];
    response["success"] = true;
    this.tickets.push(ticket);
    return response;
  }

  addEmployees(employee) {
    this.employees.push(employee);
  }

  noBrandPhoneSkill(brand) { 
    let skill = "";
    let employee = "";
    let response = {};

    const arrEmployees = this.employees.filter(e => e.skills.map(s => s.brandPhone).includes(brand.name));

    if (arrEmployees.length !== 0) {
      employee = arrEmployees[Math.floor(Math.random()*arrEmployees.length)];
      skill = employee.skills.find(s => s.brandPhone.includes(brand.name));
    } 

    switch(skill.os) {
      case "android":  
        response["message"] = `✅ Técnico: ${employee.name}, especialista en ${skill.brandPhone} (${skill.os}), disponible en ${this.name}.`;
        response["success"] = true;
        return response;
      case "ios": 
        response["message"] = `✅ Técnico: ${employee.name}, especialista en ${skill.brandPhone} (${skill.os}), disponible en ${this.name}.`;
        response["success"] = true;
        return response;
      default:
        response["message"] = `❌ ${brand.name}: No hay técnico diponible para esta marca en ${this.name}.`;
        response["success"] = false;
        return response;
    }
  }

  reporteSucursales(central, top = false) {
    let topTicket = 0;
    return central.branches
    .filter(b => { 
      if (!top) return b.name;
      if (b.tickets.length >= topTicket) {
        topTicket = b.tickets.length;
        return b.name;
      }
    })
    .map(b => {
      return {
        branch: b.name, 
        totalTicket: b.tickets.length, 
        finally: b.tickets.reduce((con, t) => t.state === this.#stateTicket().finally ? con + 1 : con, 0),
        pending: b.tickets.reduce((con, t) => t.state === this.#stateTicket().pending ? con + 1 : con, 0),
        process: b.tickets.reduce((con, t) => t.state === this.#stateTicket().process ? con + 1 : con, 0)
      };
    });
  }

  #stateTicket() {
    return {
      pending: "pendiente",
      process: "en proceso",
      "finally": "finalizado",
    };
  }

  static casting(obj) {
    const instance = new Branch(obj.uuid, obj.name, obj.contact, obj.address, Central.casting(obj.central));
    instance.tickets = obj.tickets || []; 
    instance.clients = obj.clients || []; 
    instance.employees = obj.employees || []; 
    return instance;
  }
}