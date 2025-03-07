//user can create new Card
//user can drag & drop cards to diffrent sections

const addTask = document.getElementById("addTask");
const addBoard = document.getElementById("addBoard");
const boards = document.querySelectorAll(".section");
const items = document.querySelectorAll(".item");
const input = document.querySelector(".input");
const text = document.getElementById("text");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");
let boardCount = 0;
let taskCount = 0;
function addAndRemoveClass(item) {
  item.addEventListener("dragstart", () => {
    item.classList.add("flying");
  });
  item.addEventListener("dragend", () => {
    item.classList.remove("flying");
  });
}

function editTask(item) {
  const taskText = item.children[0];
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", () => {
    item.setAttribute("draggable", "false");
    const edit = document.createElement("input");
    edit.value = taskText.innerText;
    taskText.innerText = "";
    taskText.appendChild(edit);
    const saveBtn = document.createElement("button");
    saveBtn.innerText = "Save";
    item.replaceChild(saveBtn, item.children[1]);
    saveBtn.addEventListener("click", () => {
      taskText.innerText = edit.value;
      item.replaceChild(editBtn, item.children[1]);
      item.setAttribute("draggable", "true");
    });
  });
  item.appendChild(editBtn);
}

function addNewTask(text) {
  const newTask = document.createElement("div");
  const taskText = document.createElement("p");
  const delBtn = document.createElement("button");
  newTask.classList.add("item");
  newTask.draggable = "true";
  taskText.innerText = text;
  addAndRemoveClass(newTask);
  newTask.appendChild(taskText);
  editTask(newTask);
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click", () => {
    newTask.remove();
  });
  newTask.appendChild(delBtn);
  boards[0].children[1].appendChild(newTask);
}

function addNewBoard(text) {
  const newBoard = document.createElement("div");
  const title = document.createElement("h3");
  const items = document.createElement("div");
  const delBtn = document.createElement("button");
  items.classList.add("items");
  title.innerText = text;
  newBoard.appendChild(title);
  newBoard.appendChild(items);
  newBoard.classList.add("section");
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click", () => {
    newBoard.remove();
  });
  newBoard.appendChild(delBtn);
  document.querySelector(".container").appendChild(newBoard);
  newBoard.addEventListener("dragover", () => {
    const flying = document.querySelector(".flying");
    items.insertBefore(flying, items.children[0]);
  });
}

addBtn.addEventListener("click", () => {
  input.style.display = "none";
  if (addBtn.classList[0] == "taskBtn") {
    addNewTask(text.value);

    addBtn.classList.remove("taskBtn");
  } else {
    addNewBoard(text.value);
    addBtn.classList.remove("boardBtn");
  }
  text.value = "";
});

cancelBtn.addEventListener("click", () => {
  input.style.display = "none";
  text.value = "";
  addBtn.classList.remove("taskBtn");
  addBtn.classList.remove("boardBtn");
});

addBoard.addEventListener("click", () => {
  text.setAttribute("placeholder", "Enter Board Title");
  input.style.display = "flex";
  addBtn.classList.add("boardBtn");
});

addTask.addEventListener("click", () => {
  text.setAttribute("placeholder", "Enter Task Title");
  input.style.display = "flex";
  addBtn.classList.add("taskBtn");
});

items.forEach((item) => {
  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click", () => {
    item.remove();
  });
  editTask(item);
  item.appendChild(delBtn);
  item.draggable = "true";
  addAndRemoveClass(item);
});

boards.forEach((board) => {
  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click", () => {
    board.remove();
  });
  board.appendChild(delBtn);
  board.addEventListener("dragover", () => {
    const flying = document.querySelector(".flying");
    board.children[1].insertBefore(flying, board.children[1].children[0]);
  });
});


// ----fetures----
// edit task -done
// delete task -done
// add new board -done
// remove board -done
// drag sort -done
// new input card =done
// save to localstorage

// tasks.forEach(task){ 
//   JSON.stringify()
//   localStorage.setItem({taskId:task})
// }

// let task = {
//   title:"xyz",
//   timestamp:"123",
//   boardID:""
// }

// count all tasks
//sum of childern.length of all boards
// add time to all tasks