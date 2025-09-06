class Phone {
  uuid;
  state = null;
  imei = "";
  model; 
  isReported = 0;
  
  constructor(uuid, imei, model, state = null) {
    this.uuid = uuid;
    this.imei = imei;
    this.model = model;
    this.state = state;
  }
  
  updateState(state) {
    this.state = state;
  }
  
  updateIsReported(state) {
    this.isReported = state;
  }
  
  static casting(obj) {
    const instance =  new Phone(obj.uuid, obj.imei, obj.model, obj.state);   
    instance.isReported = obj.isReported;
    return instance;
  }
}