const inputName = document.querySelector(".input-name");
const buttonAdd = document.querySelector(".button-add");
const nameList = document.querySelector(".name-list");
const alert = document.querySelector(".alert");
const buttonDraw = document.querySelector(".button-draw");
const resultList = document.querySelector(".result-list");

let resultListItems = [];
let nameListItems = [];
let alerted = false;

inputName.addEventListener("keydown", (e) => {
  if (alerted) {
    alert.innerHTML = "";
  }

  if (e.key === "Enter") {
    addName();
  }
});

function addName() {
  const value = inputName.value;

  if (value.trim() === "") {
    alert.innerHTML = "Por favor, digite um nome";
    alerted = true;
    return;
  }

  nameListItems.push(value);

  inputName.value = "";

  updateList();
}

buttonAdd.addEventListener("click", addName);

buttonDraw.addEventListener("click", () => {
  if (nameListItems.length === 0) {
    return;
  }

  const index = parseInt(Math.random() * nameListItems.length);

  resultListItems.push(nameListItems[index]);

  removeFromList(index);

  resultList.innerHTML = "";

  resultListItems.forEach((result) => {
    const model = `<li>${result}</li>`;
    resultList.innerHTML += model;
  });
});

function updateList() {
  nameList.innerHTML = "";

  nameListItems.forEach((name, index) => {
    const listItem = document.createElement("li");
    listItem.className = "name-list__item";
    listItem.role = "listitem";
    listItem.ariaLabel = "name";
    listItem.innerHTML = `<div id="name" class="name-list__name">${name}</div>`;

    const listButton = document.createElement("button");
    listButton.innerHTML = "x";
    listButton.className = "name-list__button";
    listButton.addEventListener("click", () => {
      removeFromList(index);
    });

    listItem.appendChild(listButton);

    nameList.appendChild(listItem);
  });
}

function removeFromList(index) {
  nameListItems.splice(index, 1);
  updateList();
}
