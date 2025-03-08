localStorage.setItem("taskCount", (localStorage.length||2)-2);
let taskID = Number(localStorage.getItem('taskID')) || 0
if (localStorage.getItem(taskID)==null) {
    localStorage.setItem("taskID", taskID);
}
let taskCount = localStorage.getItem('taskCount')

let boardCount = 0;
if(localStorage.getItem('boardCount')==null){
  localStorage.setItem('boardCount', boardCount)
}
const addTask = document.getElementById("addTask");
const addBoard = document.getElementById("addBoard");
const boards = document.querySelectorAll(".section");
const items = document.querySelectorAll(".item");
const items1 = [];
function renderTask() {
  for (let index = 1; index <= taskID; index++) {
    if (localStorage.getItem(index) == null) {
      continue;
    } else {
      const element = JSON.parse(localStorage.getItem(index));
      items1.push(element);
    }
  }
}
renderTask()
const input = document.querySelector(".input");
const text = document.getElementById("text");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");

function addAndRemoveClass(item) {
  item.addEventListener("dragstart", () => {
    item.classList.add("flying");
  });
  item.addEventListener("dragend", () => {
    item.classList.remove("flying");
  });
}

// change edit function so it can change both title and desc and after closing
function editTask(item) {
  console.log(item);
  const taskTitle = item.children[0];
  const taskDesc = item.children[1];
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", () => {
    item.setAttribute("draggable", "false");
    const edittitle = document.createElement("input");
    edittitle.style.display = "block"
    const editDesc = document.createElement("input");
    editDesc.style.display = "block"
    edittitle.value = taskTitle.innerText;
    editDesc.value = taskDesc.innerText;
    taskTitle.innerText = "";
    taskDesc.innerText = "";
    taskTitle.appendChild(edittitle);
    taskTitle.appendChild(editDesc);
    const saveBtn = document.createElement("button");
    saveBtn.innerText = "Save";
    item.children[3].replaceChild(saveBtn, item.children[3].children[0]);
    saveBtn.addEventListener("click", () => {
      taskTitle.innerText = edittitle.value;
      taskDesc.innerText = editDesc.value;
      item.children[3].replaceChild(editBtn, item.children[3].children[0]);
      item.setAttribute("draggable", "true");
      localStorage.setItem(
        item.id,
        JSON.stringify({
          id: item.id,
          title: taskTitle.innerText,
          description: taskDesc.innerText,
          timestamp: "19:30 8/3/2025",
          priority: "top",
        })
      );
    });
  });
  item.children[3].appendChild(editBtn);
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
  boardCount++;
  newBoard.setAttribute("id", boardCount);
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click", () => {
    newBoard.remove();
  });
  newBoard.appendChild(delBtn);
  document.querySelector(".container").appendChild(newBoard);
  newBoard.addEventListener("dragover", () => {
    const flying = document.querySelector(".flying");
    items.insertBefore(flying, items.children[0]);
    board.tasks.push(flying.id)
  });
}

addBtn.addEventListener("click", () => {
  input.style.display = "none";
  if (addBtn.classList[0] == "taskBtn") {
    addNewTask(text.value, "asdasda", "top");

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

items1.forEach((item,index)=>{
  const task = document.createElement("div");
  const taskTitle = document.createElement("h4");
  const taskDesc = document.createElement("p");
  const timestamp = document.createElement("p");
  const buttons = document.createElement("div");
  buttons.classList.add('buttons')
  const delBtn = document.createElement("button");
  task.classList.add("item");
  task.id = item.id;
  task.draggable = "true";
  taskTitle.innerText = item.title;
  taskDesc.innerText = item.description;
  timestamp.innerText = item.timestamp;
  addAndRemoveClass(task);
  task.appendChild(taskTitle);
  task.appendChild(taskDesc);
  task.appendChild(timestamp);
  task.appendChild(buttons)
  editTask(task);
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click", () => {
    task.remove();
    localStorage.removeItem(item.id);
    taskCount--
    localStorage.setItem("taskCount", taskCount)
    items1.splice(index,1)
  });
  buttons.appendChild(delBtn);
  boards[0].children[1].appendChild(task);
})

boards.forEach((board, index) => {
  let boardX = {
    id: index,
    tasks: [],
  };
  boardCount=index+1
  localStorage.setItem('boardCount', boardCount)
  console.log(boardCount);
  board.id = index+1
  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click", () => {
    board.remove();
  });
  board.appendChild(delBtn);
  board.addEventListener("dragover", () => {
    const flying = document.querySelector(".flying");
    board.children[1].insertBefore(flying, board.children[1].children[0]);
    boardX.tasks.push(flying.id)
  });
});

// ----fetures----
// edit task -done
// delete task -done
// add new board -done
// remove board -done
// drag sort -done
// new input card =done
// save to localstorage -task done

// count all tasks
// add time to all tasks

function addNewTask(title, description, priority) {
  taskID++;
  taskCount++
  localStorage.setItem("taskCount", taskCount);
  localStorage.setItem("taskID", taskID);
  let date = new Date();
  let dateStr = date.toLocaleDateString();
  let hour = date.getHours();
  hour.toString().length == 1 ? (hour = `0${hour}`) : hour;
  let min = date.getMinutes();
  min.toString().length == 1 ? (min = `0${min}`) : min;
  let task = {
    id: taskID,
    title: title,
    description: description,
    timestamp: `${hour}:${min} ${dateStr}`,
    priority: priority,
  };
  const newTask = document.createElement("div");
  const taskTitle = document.createElement("h4");
  const taskDesc = document.createElement("p");
  const timestamp = document.createElement("p");
  const buttons = document.createElement("div")
  const delBtn = document.createElement("button");
  newTask.classList.add("item");
  newTask.id = taskID;
  newTask.draggable = "true";
  taskTitle.innerText = title;
  taskDesc.innerText = description;
  timestamp.innerText = `${hour}:${min} ${dateStr}`;
  addAndRemoveClass(newTask);
  newTask.appendChild(taskTitle);
  newTask.appendChild(taskDesc);
  newTask.appendChild(timestamp);
  newTask.appendChild(buttons)
  editTask(newTask);
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click", () => {
    newTask.remove();
    localStorage.removeItem(task.id);
    taskCount--;
    localStorage.setItem("taskCount", taskCount);
  });
  buttons.appendChild(delBtn);
  boards[0].children[1].appendChild(newTask);
  localStorage.setItem(task.id, JSON.stringify(task));
}
