class DB {
  saveData(key, value) {
    console.log("saveData", value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  forceSaveData(key, value) {
    const seen = new WeakSet();
    const safeValue = JSON.stringify(value, function (key, value) {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return undefined;
        }
        seen.add(value);
      }
      return value;
    });
    
    localStorage.setItem(key, safeValue);
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
     