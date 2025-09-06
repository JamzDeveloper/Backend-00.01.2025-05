class Part {
  uuid;
  code;
  description;
  type;

  constructor(uuid, code, description, type) {
    this.uuid = uuid;
    this.code = code;
    this.description = description;
    this.type = type;
  }
  
  static casting(obj) {
    return new Part(obj.uuid, obj.code, obj.description, obj.type);
  }
}