class DB {
  saveData(key, valor) {

    console.log("saveDAta",valor)
    localStorage.setItem(key, JSON.stringify(valor));
  }
  getData(key) {
    try {
      const result = JSON.parse(localStorage.getItem(key));
      return result ? result : [];
    } catch (err) {
      return [];
    }
  }
}
