class Skill {
  uuid;
  specialty;
  brandPhone;
  os;

  constructor(uuid, specialty, brandPhone, os) {
    this.uuid = uuid;
    this.specialty = specialty;
    this.brandPhone = brandPhone;
    this.os = os;
  }
  
  static casting(obj) {
    return new Skill(obj.uuid, obj.specialty, obj.brandPhone, obj.os);
  }
}