const stateTicket = {
  pending: "pendiente",
  process: "en proceso",
  finally: "finalizado",
};

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

class Client {
  name;
  lastName;
  age;

  constructor(name, lastName, age) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
  }
}

class Part {
  code;
  description;
  type;

  constructor(code, description, type) {
    this.code = code;
    this.description = description;
    this.type = type;
  }
}

class Ticket {
  phone;
  diagnosis;
  amount;
  percentageAmount;
  finalAmount;
  state = stateTicket.pending;
  client;
  authorized = 0;
  part = [];

  constructor(phone, diagnosis, amount, finalAmount, client) {
    this.phone = phone;
    this.diagnosis = diagnosis;
    this.amount = amount;
    this.finalAmount = finalAmount;
    this.client = client;
    this.calculatePercentage(amount);
  }

  changeAuthorized(state) {
    this.authorized = state;
  }

  addPart(part) {
    this.part.push(part);
  }
  
  addAmount(amount) {
    this.amount += amount;
    this.calculatePercentage(this.amount);
  }

  calculatePercentage(amount) {
    this.percentageAmount = (amount / this.finalAmount) * 100;
  }

  initService() {
    if (this.authorized && this.percentageAmount >= 50) {
      this.phone.updateState("En reparación");
      this.state = stateTicket.process;
      console.log("📱✅ Servicio iniciado");
    } else {
      console.log("⚠️  No cumple con las condiciones basicas para iniciar la repación.");
    }
  }

  finService() {
    if (this.authorized && this.percentageAmount == 100) {
      this.phone.updateState("Reparado");
      this.state = stateTicket.finally;
      console.log("📱✅ Servicio finalizado");
    } else {
      console.log("⚠️  No cumple con las condiciones basicas para finalizar la repación.");
    }
  }
}

class Skill {
  specialty;
  brandPhone;
  os;

  constructor(specialty, brandPhone, os) {
    this.specialty = specialty;
    this.brandPhone = brandPhone;
    this.os = os;
  }
}

class Employee {
  name;
  lastName;
  contact;
  skills = [];

  constructor(name, lastName, contact) {
    this.name = name;
    this.lastName = lastName;
    this.contact = contact;
  }

  addSkill(skill) {
    this.skills.push(skill);
  }
}

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
    const existCelReported = this.central.reportedPhones.find(p => p.imei == ticket.phone.imei);

    if (existCelReported) {
      console.error("❌ El celular esta reportado, llamando a la policia!!!🚔🚔🚔");
      return;
    }

    if (this.noBrandPhoneSkill(ticket.phone.brand)) {
      return;
    }

    console.log("✅ El ticket fue agregado, espera un momento.....");

    this.tickets.push(ticket);
  }

  addEmployees(employee) {
    this.employees.push(employee);
  }

  noBrandPhoneSkill(brand) { 
    let skill = "";
    let employee = "";

    const arrEmployees = this.employees.filter(e => e.skills.map(s => s.brandPhone).includes(brand));

    if(arrEmployees.length !== 0) {
      employee = arrEmployees[Math.floor(Math.random()*arrEmployees.length)];
      skill = employee.skills.find(s => s.brandPhone.includes(brand));
    } 

    switch(skill.os) {
      case "android":  
        console.log(`✅ Técnico: ${employee.name}, especialista en ${skill.brandPhone} (${skill.os}), disponible en ${this.name}.`);
        return false;
      case "ios": 
        console.log(`✅ Técnico: ${employee.name}, especialista en ${skill.brandPhone} (${skill.os}), disponible en ${this.name}.`);
        return false;
      default:
        console.log(`❌ ${brand}: No hay técnico diponible para esta marca en ${this.name}.`);
        return true;
    }
  }

  reporteSucursales() {
    let topTicket = 0;
    this.central.branches
    .filter(b => { 
      if (b.tickets.length >= topTicket) {
        topTicket = b.tickets.length;
        return b.name;
      }
    })
    .map(b => {
      return {
        branch: b.name, 
        totalTicket: b.tickets.length, 
        finally: b.tickets.reduce((con, t) => t.state === stateTicket.finally ? con + 1 : con, 0),
        pending: b.tickets.reduce((con, t) => t.state === stateTicket.pending ? con + 1 : con, 0),
        process: b.tickets.reduce((con, t) => t.state === stateTicket.process ? con + 1 : con, 0)
      };
    })
    .forEach(t => {
      console.log(`📋 Sucursal: ${t.branch} -- Total Ticket: ${t.totalTicket} -- Resueltos: ${t.finally}, Pendientes: ${t.pending}, Espera: ${t.process}`);
    });
  }
}

//TECNOIDAT

class Central {
  reportedPhones = [];
  branches = [];
  name = "";
  contact = "";
  address = "";
  
  constructor(name, contact, address) {
    this.name = name;
    this.contact = contact;
    this.address = address;
  }

  addPhone(phone) {
    this.reportedPhones.push(phone);
  }

  addBranch(branch) {
    this.branches.push(branch);
  }

  deletePhoneReported(imei) {
    this.reportedPhones.splice(this.reportedPhones.findIndex(p => p.imei == imei), 1);
  }
}

/* --- crear la central --- */
const tecnoIdat = new Central("tecnoIdat", "013327992", "Av. República de Chile 120, Jesús María, Lima, Perú");

/* --- crear las sucursales --- */
const tecnoTrujillo = new Branch("tecnoTrujillo", "913456789", "Av. Las Palmeras 123, Trujillo", tecnoIdat); 
const tecnoChiclayo = new Branch("tecnoChiclayo", "914567890", "Jr. Los Troncos 456, Chiclayo", tecnoIdat);
const tecnoArequipa = new Branch("tecnoArequipa", "915678901", "Calle El Misti 789, Arequipa", tecnoIdat);

/* --- crear empleados --- */
const employee1 = new Employee("Luis", "Ramírez", "lramirez92@gmail.com");
const employee2 = new Employee("Marco", "Álvarez", "marco.alv88@outlook.com");
const employee3 = new Employee("Daniel", "Torres", "dtorres_07@yahoo.com");
const employee4 = new Employee("Jorge", "Castillo", "jcastillo.mz91@gmail.com");
const employee5 = new Employee("Ricardo", "Moreno", "ric.moreno77@protonmail.com");
const employee6 = new Employee("Felipe", "Reyes", "freyes2030@live.com");
const employee7 = new Employee("Sebastián", "Paredes", "sparedes_19@gmail.com");
const employee8 = new Employee("Tomás", "Fuentes", "tomfuentes85@outlook.com");

/* --- crear habilidades para los empleados --- */
const skill_e1_1 = new Skill("Reparación General", "Samsung", "android");
const skill_e1_2 = new Skill("Reparación General", "Motorola", "android");
const skill_e2_1 = new Skill("Reparación General", "Motorola", "android");
const skill_e2_2 = new Skill("Reparación General", "Apple", "ios");
const skill_e3_1 = new Skill("Reparación General", "Samsung", "android");
const skill_e3_2 = new Skill("Reparación General", "Motorola", "android");
const skill_e3_3 = new Skill("Reparación General", "Xiaomi", "android");

const skill_e4_1 = new Skill("Reparación General", "Huawei", "android");
const skill_e4_2 = new Skill("Reparación General", "Oppo", "android");
const skill_e5_1 = new Skill("Reparación General", "Samsung", "android");
const skill_e5_2 = new Skill("Reparación General", "Motorola", "android");
const skill_e5_3 = new Skill("Reparación General", "ZTE", "android");
const skill_e5_4 = new Skill("Reparación General", "Sony", "android");
const skill_e6_1 = new Skill("Reparación General", "Motorola", "android");
const skill_e6_2 = new Skill("Reparación General", "Apple", "ios");
const skill_e6_3 = new Skill("Reparación General", "Sony", "android");

const skill_e7_1 = new Skill("Reparación General", "Motorola", "android");
const skill_e7_2 = new Skill("Reparación General", "Apple", "ios");
const skill_e7_3 = new Skill("Reparación General", "ZTE", "android");
const skill_e8_1 = new Skill("Reparación General", "Motorola", "android");
const skill_e8_2 = new Skill("Reparación General", "Apple", "ios");
const skill_e8_3 = new Skill("Reparación General", "Huawei", "android");
const skill_e8_4 = new Skill("Reparación General", "Xiaomi", "android");
const skill_e8_5 = new Skill("Reparación General", "Samsung", "android");
const skill_e8_6 = new Skill("Reparación General", "ZTE", "android");

/* --- agregando habilidades a los empleados --- */
employee1.addSkill(skill_e1_1);
employee1.addSkill(skill_e1_2);

employee2.addSkill(skill_e2_1);
employee2.addSkill(skill_e2_2);

employee3.addSkill(skill_e3_1);
employee3.addSkill(skill_e3_2);
employee3.addSkill(skill_e3_3);

employee4.addSkill(skill_e4_1);
employee4.addSkill(skill_e4_2);

employee5.addSkill(skill_e5_1);
employee5.addSkill(skill_e5_2);
employee5.addSkill(skill_e5_3);

employee6.addSkill(skill_e6_1);
employee6.addSkill(skill_e6_2);
employee6.addSkill(skill_e6_3);

employee7.addSkill(skill_e7_1);
employee7.addSkill(skill_e7_2);
employee7.addSkill(skill_e7_3);

employee8.addSkill(skill_e8_1);
employee8.addSkill(skill_e8_2);
employee8.addSkill(skill_e8_3);
employee8.addSkill(skill_e8_4);
employee8.addSkill(skill_e8_5);
employee8.addSkill(skill_e8_6);

/* --- agregando empleados a las sucursales --- */
tecnoTrujillo.addEmployees(employee1);
tecnoTrujillo.addEmployees(employee2);
tecnoTrujillo.addEmployees(employee3);

tecnoChiclayo.addEmployees(employee4);
tecnoChiclayo.addEmployees(employee5);
tecnoChiclayo.addEmployees(employee6);

tecnoArequipa.addEmployees(employee7);
tecnoArequipa.addEmployees(employee8);

/* --- agregando sucursales a la central --- */
tecnoIdat.addBranch(tecnoTrujillo);
tecnoIdat.addBranch(tecnoChiclayo);
tecnoIdat.addBranch(tecnoArequipa);

/* ---  crear los teléfonos --- */
const iphone15 = new Phone("004401019452108", "Apple", "iPhone 15 Pro Max");
const zteAxon50 = new Phone("004401011037305", "ZTE", "Axon 50 Ultra");
const motorolaEdge = new Phone("004401012345678", "Motorola", "Edge 40 Pro");
const appleIphone14 = new Phone("004401023456789", "Apple", "iPhone 14");
const xiaomi13Pro = new Phone("004401034567890", "Xiaomi", "13 Pro");

const huaweiP60Pro = new Phone("004401045678901", "Huawei", "P60 Pro");
const oppoFindX6 = new Phone("004401056789012", "Oppo", "Find X6 Pro");
const zteAxon40 = new Phone("004401067890123", "ZTE", "Axon 40 Ultra");
const sonyXperia1V = new Phone("004401078901234", "Sony", "Xperia 1 V");

const samsungS23 = new Phone("004401089012345", "Samsung", "Galaxy S23");
const oneplus11 = new Phone("004401090123456", "OnePlus", "11 Pro");

/* --- agregando celular robado a la central (Ejemplo) --- */
console.log("⚠️  agregando celular robado a la central ⚠️");
tecnoIdat.addPhone(iphone15);

/* --- eliminando celular robado a la central (Ejemplo) --- */
console.log("❌ eliminando celular robado a la central ❌");
tecnoIdat.deletePhoneReported("004401019452108");

/* --- crear los clientes --- */
const kevin = new Client("Kevin", "Rosales", 30);
const laura = new Client("Laura", "Martínez", 28);
const carlos = new Client("Carlos", "Ramírez", 35);
const ana = new Client("Ana", "González", 41);
const marcos = new Client("Marcos", "Herrera", 33);

const patricia = new Client("Patricia", "López", 29);
const diego = new Client("Diego", "Fernández", 38);
const valeria = new Client("Valeria", "Soto", 27);
const javier = new Client("Javier", "Rivas", 45);

const camila = new Client("Camila", "Mendoza", 31);
const andres = new Client("Andrés", "Morales", 40);

/* --- crear nuevo ticket --- */
const ticketKevin = new Ticket(iphone15, "Pantalla rota", 30, 60, kevin);
const ticketLaura = new Ticket(zteAxon50, "Batería defectuosa", 35, 60, laura);
const ticketCarlos = new Ticket(motorolaEdge, "Cámara dañada", 40, 60, carlos);
const ticketAna = new Ticket(appleIphone14, "Botón de encendido roto", 45, 60, ana);
const ticketMarcos = new Ticket(xiaomi13Pro, "Altavoz dañado", 50, 60, marcos);
const ticketPatricia = new Ticket(huaweiP60Pro, "Puerto de carga defectuoso", 55, 60, patricia);
const ticketDiego = new Ticket(oppoFindX6, "Conector de auriculares roto", 33, 60, diego);
const ticketValeria = new Ticket(zteAxon40, "Vibrador no funciona", 38, 60, valeria);
const ticketJavier = new Ticket(sonyXperia1V, "Micrófono dañado", 42, 60, javier);
const ticketCamila = new Ticket(samsungS23, "Sensor de proximidad roto", 48, 60, camila);
const ticketAndres = new Ticket(oneplus11, "Lente de cámara trasera rota", 30, 60, andres);

/* --- crear parte de repuesto --- */ 
const repuesto1 = new Part("661-24356", "Pantalla de repuesto iPhone 15", "LCD");
const repuesto2 = new Part("EB-BS928ABZ", "Batería original Axon 50 Ultra", "Batería");
const repuesto3 = new Part("SYKM0103002", "Módulo de cámara Motorola Edge 40 Pro", "Cámara");
const repuesto4 = new Part("821-02780", "Botón de encendido iPhone 14", "Botón");
const repuesto5 = new Part("XMT-SPK13PRO", "Altavoz interno Xiaomi 13 Pro", "Altavoz");
const repuesto6 = new Part("02353KWF", "Puerto de carga Huawei P60 Pro", "Puerto USB-C");
const repuesto7 = new Part("OPX6-AUDJACK", "Jack de audio Oppo Find X6 Pro", "Conector de audio");
const repuesto8 = new Part("ZTE-VIB40U", "Módulo de vibración ZTE Axon 40 Ultra", "Vibrador");
const repuesto9 = new Part("XPR-MIC001V", "Micrófono Sony Xperia 1 V", "Micrófono");
const repuesto10 = new Part("GH96-15264A", "Sensor de proximidad Galaxy S23", "Sensor");
const repuesto11 = new Part("1P421110453000", "Lente de cámara trasera OnePlus 11 Pro", "Lente de cámara");

/* --- agregando parte al ticket --- */
ticketKevin.addPart(repuesto1);
ticketLaura.addPart(repuesto2);
ticketCarlos.addPart(repuesto3);
ticketAna.addPart(repuesto4);
ticketMarcos.addPart(repuesto5);

ticketPatricia.addPart(repuesto6);
ticketDiego.addPart(repuesto7);
ticketValeria.addPart(repuesto8);
ticketJavier.addPart(repuesto9);

ticketCamila.addPart(repuesto10);
ticketAndres.addPart(repuesto11);

/* --- agregando ticket a la sucursal --- */
console.log("👨‍💻👨‍💻👨‍💻 agregando tickets a las sucursales 👨‍💻👨‍💻");
tecnoTrujillo.addTicket(ticketKevin);
tecnoTrujillo.addTicket(ticketLaura);
tecnoTrujillo.addTicket(ticketCarlos);
tecnoTrujillo.addTicket(ticketAna);
tecnoTrujillo.addTicket(ticketMarcos);

tecnoChiclayo.addTicket(ticketPatricia);
tecnoChiclayo.addTicket(ticketDiego);
tecnoChiclayo.addTicket(ticketValeria);
tecnoChiclayo.addTicket(ticketJavier);

tecnoArequipa.addTicket(ticketCamila);
tecnoArequipa.addTicket(ticketAndres);

/* --- autorizando por parte del usuario --- */
ticketKevin.changeAuthorized(1);
ticketCarlos.changeAuthorized(1);
ticketAna.changeAuthorized(1);
ticketMarcos.changeAuthorized(1);
ticketPatricia.changeAuthorized(1);
ticketDiego.changeAuthorized(1);
ticketValeria.changeAuthorized(1);
ticketJavier.changeAuthorized(1);
ticketCamila.changeAuthorized(1);

/* --- inicializar servicio --- */
ticketKevin.initService();
ticketCarlos.initService();
// ticketAna.initService();
ticketMarcos.initService();

ticketPatricia.initService();
ticketDiego.initService();
ticketValeria.initService();
ticketJavier.initService();

ticketCamila.initService();

/* --- pagando el monto restante --- */
ticketKevin.addAmount(30);
ticketCarlos.addAmount(20);
// ticketAna.addAmount(15);
ticketMarcos.addAmount(10);

ticketPatricia.addAmount(5);
ticketDiego.addAmount(27);
ticketValeria.addAmount(22);
ticketJavier.addAmount(18);

ticketCamila.addAmount(12);

/* --- finalizar servicio --- */
ticketKevin.finService();
ticketCarlos.finService();
// ticketAna.finService();
ticketMarcos.finService();

ticketPatricia.finService();
ticketDiego.finService();
// ticketValeria.finService();
ticketJavier.finService();

ticketCamila.finService();

/* --- Reportando las sucursales con mayores tickets --- */
tecnoTrujillo.reporteSucursales();