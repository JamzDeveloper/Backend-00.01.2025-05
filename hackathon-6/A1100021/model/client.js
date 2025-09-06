class Client {
  uuid;
  name;
  lastName;
  age;

  constructor(uuid, name, lastName, age) {
    this.uuid = uuid;
    this.name = name;
    this.lastName = lastName;
    this.age = age;
  }
  
  static casting(obj) {
    return new Client(obj.uuid, obj.name, obj.lastName, obj.age);
  }
}