const generarUUIDUnico = (ojArr) => {
  let nuevoUUID;
  let existe;

  do {
    nuevoUUID = uuidv4();
    existe = ojArr.some(o => o.uuid === nuevoUUID);
  } while (existe);

  return nuevoUUID;
};

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};