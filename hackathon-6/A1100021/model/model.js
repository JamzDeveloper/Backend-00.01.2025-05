class Model {
  uuid;
  name;
  brand;

  constructor(uuid, name, brand) {
    this.uuid = uuid;
    this.name = name;
    this.brand = brand;
  }
  
  static casting(obj) {
    return new Model(obj.uuid, obj.name, Brand.casting(obj.brand));
  }
}