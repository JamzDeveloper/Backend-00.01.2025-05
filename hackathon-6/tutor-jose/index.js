const db = new DB();

const tecnoIdat = new Central();
const addNewBranch = document.querySelector(".container-add-sucursal-button");

const loadingSystem = () => {
  const branches = db.getData("sucursales");
  console.log(`🏢 branches`, branches);
  const arrayBranches = branches.map(
    (e) => new Branch(e.name, e.contact, e.address, e.central)
  );

  tecnoIdat.loadingBranches(arrayBranches);
};

const saveBranch = (system) => {
  console.log("saveBranch branches", system.branches);
  const branchesValues = system.branches.map((e) => e.toValue());
  console.log("saveBranch branchesValues", branchesValues);
  db.saveData("sucursales", branchesValues);
};

const loadingBranches = (system) => {
  let arrayOptions = [];
  const selectInitial = document.createElement("option");
  const optionItem = document.querySelector("#sucursal");
  selectInitial.value = "no-option";
  selectInitial.textContent = "Seleccionar sucursal";
  arrayOptions.push(selectInitial);

  system.branches.forEach((option) => {
    const optionItem = document.createElement("option");
    optionItem.value = option.name;
    optionItem.textContent = option.name;
    arrayOptions.push(optionItem);
  });
  optionItem.replaceChildren(...arrayOptions);
};

console.log(tecnoIdat);

addNewBranch.addEventListener("click", () => {
  console.log("click");

  const inputNewBranch = document.querySelector(
    ".container-add-sucursal-input"
  );
  const inputValueNewBranch = inputNewBranch.value;

  if (inputValueNewBranch == "") {
    alert("ingrese un valor");
    return;
  }
  const newBranch = new Branch(inputValueNewBranch, "", "", tecnoIdat);
  tecnoIdat.addBranch(newBranch);
  console.log(tecnoIdat);
  inputNewBranch.value = "";
  saveBranch(tecnoIdat);
  loadingBranches(tecnoIdat);
});
loadingSystem();
loadingBranches(tecnoIdat);
