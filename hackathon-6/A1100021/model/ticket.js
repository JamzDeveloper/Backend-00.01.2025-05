class Ticket {
  uuid;
  phone;
  diagnosis;
  amount;
  percentageAmount;
  finalAmount;
  state;
  client;
  authorized;
  part;

  constructor(uuid, phone, diagnosis, amount, finalAmount, client) {
    this.uuid = uuid;
    this.phone = phone;
    this.diagnosis = diagnosis;
    this.amount = amount;
    this.finalAmount = finalAmount;
    this.state = this.#stateTicket().pending;
    this.client = client;
    this.authorized = 0;
    this.calculatePercentage(amount);
  }

  changeAuthorized(state) {
    this.authorized = state;
  }

  addPart(part) {
    this.part = part;
  }
  
  addAmount(amount) {
    this.amount += amount;
    this.calculatePercentage(this.amount);
  }

  calculatePercentage(amount) {
    this.percentageAmount = (amount / this.finalAmount) * 100;
  }

  initService() {
    let response = {};
    if (this.authorized && this.percentageAmount >= 50) {
      this.phone.updateState("En reparación");
      this.state = this.#stateTicket().process;
      response["success"] = true;
      response["message"] = "📱✅ Servicio iniciado";
    } else { 
      response["success"] = false;
      response["data"] = {
        amount: this.amount,
        finalAmount: this.finalAmount,
        percentage: this.percentageAmount,
        partialDifference: (this.finalAmount / 2) - this.amount,
        totalDifference: this.finalAmount - this.amount,
      };
      response["message"] = "⚠️ No cumple con las condiciones basicas para iniciar la reparación.";
    }
    return response;
  }

  finService() {
    let response = {};
    if (this.authorized && this.percentageAmount == 100) {
      this.phone.updateState("Reparado");
      this.state = this.#stateTicket().finally;
      response["success"] = true;
      response["message"] = "📱✅ Servicio finalizado";
    } else { 
      response["success"] = false;
      response["data"] = {
        finalAmount: this.finalAmount,
        percentage: this.percentageAmount,
        totalDifference: this.finalAmount - this.amount,
      };
      response["message"] = "⚠️ No cumple con las condiciones basicas para finalizar la reparación.";
    }
    return response;
  }

  #stateTicket() {
    return {
      pending: "pendiente",
      process: "en proceso",
      "finally": "finalizado",
    };
  }

  static casting(obj) {
    const instance =  new Ticket(obj.uuid, Phone.casting(obj.phone), obj.diagnosis, Number(obj.amount), Number(obj.finalAmount), Client.casting(obj.client));
    instance.state = obj.state;
    instance.authorized = obj.authorized;
    instance.part = obj.part || [];
    return instance;
  }
}