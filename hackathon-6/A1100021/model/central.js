class Central {
  uuid;
  reportedPhones = [];
  branches = [];
  name = "";
  contact = "";
  address = "";
  
  constructor(uuid, name, contact, address) {
    this.uuid = uuid;
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

  static casting(obj) {
    const instance = new Central(obj.uuid, obj.name, obj.contact, obj.address);
    instance.reportedPhones = obj.reportedPhones || []; 
    instance.branches = obj.branches || []; 
    return instance;
  }
}