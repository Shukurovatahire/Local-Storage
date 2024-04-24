const myForm = document.getElementById("form");
const btnSave = document.getElementById("btnSave");
const btnCancel = document.getElementById("btnCancel");
const input = document.getElementById("input");
const textArea = document.getElementById("tArea");
const container = document.getElementById("box");
const conatiner2 = document.getElementById("box2");
const btnFilter = document.getElementById("btnFilter");
const btnAdd = document.getElementById("btnAdd");

let selectedObj = {};
let arr = [];
let editMode = false;

myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(myForm);
  const formValues = {};

  for (let [key, value] of data.entries()) {
    formValues[key] = value;
  }

  formValues.id = Math.floor(Math.random() * 1000);
  formValues.isComplete = false;
  console.log(formValues);
  arr.push(formValues);

  console.log(arr);
  console.log(formValues);
  saveTodosToLocalStorage()
  showTask();
  input.value = "";
  textArea.value = "";
});

const showTask = () => {
  conatiner2.innerHTML = "";
  arr.forEach((item) => {
    const textContainer = document.createElement("div");
    const taskName = document.createElement("p");
    const taskDesc = document.createElement("p");
    const btn2 = document.createElement("button");
    const checkbox = document.createElement("input");
    const btnEdit = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = item.isComplete;

    if (item.isComplete) {
      textContainer.style.backgroundColor = "#67C6E3";
    }

    btn2.textContent = "Delete";
    btnEdit.textContent = "Edit";
    btn2.classList.add("btn2style");
    btnEdit.classList.add("btEdit");
    textContainer.classList.add("taskBox");
    checkbox.classList.add("checkboxStyle");
    conatiner2.appendChild(textContainer);
    textContainer.appendChild(taskName);
    textContainer.appendChild(taskDesc);
    textContainer.appendChild(btn2);
    textContainer.appendChild(btnEdit);
    textContainer.appendChild(checkbox);

    taskName.innerHTML = item.taskName;
    taskDesc.innerHTML = item.taskDesc;

    btn2.addEventListener("click", () => {
      deleteTask(item.id);
    });

    checkbox.addEventListener("change", () => {
      completeTask(item.id);
    });

    btnFilter.addEventListener("click", () => {
      filterTask();
    });

    btnEdit.addEventListener("click", () => {
      editMode = true;
      editTask(item);
    });

    btnSave.addEventListener("click", () => {
      if (editMode) {
        saveText();
      }
    });

    btnCancel.addEventListener("click", () => {
      if (editMode) {
        cancelText();
      }
    });
  });
};

const deleteTask = (id) => {
  arr = arr.filter((item) => item.id !== id);
  conatiner2.innerHTML = "";
  showTask();
};

const completeTask = (id) => {
  const selectedTask = arr.findIndex((item) => item.id === id);
  if (selectedTask != -1)
    arr[selectedTask].isComplete = !arr[selectedTask].isComplete;

  arr.forEach((task) => {
    if (task.id == id) {
      task.isComplete = !task.isComplete;
    }
  });

  showTask();
};

const filterTask = () => {
  arr.sort((a, b) => {
    return a.isComplete - b.isComplete;
  });

  showTask();
};

const editTask = (task) => {
  console.log("tasks", task);
  editMode = true;
  selectedObj = task;
  input.value = task.taskName;
  textArea.value = task.taskDesc;
  btnSave.style.display = "inline-block";
  btnCancel.style.display = "inline-block";
  btnAdd.style.display = "none";
};

const saveText = () => {
  const index = arr.findIndex((task) => task.id == selectedObj.id);
  arr[index].taskName = input.value;
  arr[index].taskDesc = textArea.value;

  btnSave.style.display = "none";
  btnCancel.style.display = "none";
  btnAdd.style.display = "inline-block";
  textArea.value = "";
  input.value = "";
  editMode = false;
  showTask();
};

const cancelText = () => {
  console.log(34567890);
  input.value = "";
  textArea.value = "";
  btnSave.style.display = "none";
  btnCancel.style.display = "none";
  btnAdd.style.display = "inline-block";
  editMode = false;
};

// Part Local Sorage
const saveTodosToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(arr));
};

const loadTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    arr = JSON.parse(savedTodos);
    showTask();
  }
};

document.addEventListener("DOMContentLoaded",loadTodosFromLocalStorage)

console.log("ls",localStorage);
