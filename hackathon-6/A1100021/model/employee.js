class Employee {
  uuid;
  name;
  lastName;
  contact;
  skills = [];

  constructor(uuid, name, lastName, contact) {
    this.uuid = uuid;
    this.name = name;
    this.lastName = lastName;
    this.contact = contact;
  }

  addSkill(skill) {
    this.skills.push(skill);
  }

  static casting(obj) {
    const instance = new Employee(obj.uuid, obj.name, obj.lastName, obj.contact);
    instance.skills = obj.skills || [];
    return instance;
  }
}