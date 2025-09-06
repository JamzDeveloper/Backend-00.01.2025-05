class Brand {
  uuid;
  name;

  constructor(uuid, name) {
    this.uuid = uuid;
    this.name = name;
  }
  
  static casting(obj) {
    return new Brand(obj.uuid, obj.name);
  }
}