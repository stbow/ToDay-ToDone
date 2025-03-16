const newTaskBtn = document.getElementById("new-btn");
const newTaskForm = document.getElementById("new-task-form");
const editTaskForm = document.getElementById("edit-task-form");
const closeBtn = document.getElementById("close-btn");
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskEdit = document.getElementById("task-edit");
const closeBtn2 = document.getElementById("close-btn2");
const updateBtn = document.getElementById("update-btn");
const todayContainer = document.getElementById("today-container");
const refreshBtn = document.getElementById("refresh-btn");
const tomorrowContainer = document.getElementById("tomorrow-container");

newTaskBtn.onclick = newTask;
closeBtn.onclick = closeForm;
addBtn.onclick = addTask;
closeBtn2.onclick = closeForm2;
updateBtn.onclick = updateTask;
refreshBtn.onclick = refreshTasks;

var todayTasks = JSON.parse(localStorage.getItem("saveToday")) || [];
var tomorrowTasks = JSON.parse(localStorage.getItem("saveTomorrow")) || [];
var currentTask = {};
var taskIndex;
var day;

displayList();

function newTask() {
  newTaskForm.classList.remove("hidden");
  taskInput.focus();
}

function closeForm() {
  taskInput.value = "";
  newTaskForm.classList.add("hidden");
}

function addTask() {
  let newTask = {
    id: `${todayTasks.length}`,
    title: taskInput.value,
    status: ""
  }
  todayTasks.push(newTask);
  displayList();
  save();
  closeForm();
}

function displayList() {
  todayContainer.innerHTML = "";
  for (let i=0; i < todayTasks.length; i++) {
    todayContainer.innerHTML += `
    <div class="task${todayTasks[i].status}" id="${i}">
      <span class="task-text">${todayTasks[i].title}</span>
      <span class="controls">
      <button onclick="editTask(this)" class="edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
      <button onclick="markDone(this)" class="done-btn"><i class="fa-solid fa-check"></i></button>
      <button onclick="moveToTomorrow(this)" class="tom-btn"><i class="fa-solid fa-arrow-right-long"></i></button>
      </span>
    </div>`
  }
  tomorrowContainer.innerHTML = "";
  for (let i=0; i < tomorrowTasks.length; i++) {
    tomorrowContainer.innerHTML += `
    <div class="task${tomorrowTasks[i].status}" id="${i}">
      <span class="task-text">${tomorrowTasks[i].title}</span>
      <span class="controls">
      <button onclick="editTask(this)" class="edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
      <button onclick="markDone(this)" class="done-btn"><i class="fa-solid fa-check"></i></button>
      <button onclick="moveToToday(this)" class="tod-btn"><i class="fa-solid fa-arrow-left-long"></i></button>
      </span>
    </div>`
  }
}

function editTask(buttonEl) {
  taskIndex = buttonEl.parentElement.parentElement.id;
  day = buttonEl.parentElement.parentElement.parentElement.id === "today-container" ? todayTasks : tomorrowTasks;
  var tempTask = day[taskIndex];
  taskEdit.value = tempTask.title;
  editTaskForm.classList.remove("hidden");
  taskEdit.focus();
  taskEdit.setSelectionRange(taskEdit.value.length, taskEdit.value.length);
}

function closeForm2() {
  taskEdit.value = "";
  editTaskForm.classList.add("hidden");
}

function updateTask() {
  let updatedTask = taskEdit.value;
  day[taskIndex].title = updatedTask;
  displayList();
  save();
  closeForm2();
}

function markDone(buttonEl) {
  taskIndex = buttonEl.parentElement.parentElement.id;
  day = buttonEl.parentElement.parentElement.parentElement.id === "today-container" ? todayTasks : tomorrowTasks;
  var tempTask = day[taskIndex];
  tempTask.status = tempTask.status == " done" ? "" : " done";
  day[taskIndex] = tempTask;
  displayList();
  save();
}

function moveToTomorrow(buttonEl) {
  taskIndex = buttonEl.parentElement.parentElement.id;
  let removedTask = todayTasks.splice(taskIndex, 1);
  let tempTomorrow = tomorrowTasks.concat(removedTask);
  tomorrowTasks = tempTomorrow;
  displayList();
  save();
}

function moveToToday(buttonEl) {
  taskIndex = buttonEl.parentElement.parentElement.id;
  let removedTask = tomorrowTasks.splice(taskIndex, 1);
  let tempToday = todayTasks.concat(removedTask);
  todayTasks = tempToday;
  displayList();
  save();
}

function refreshTasks() {
  // remove everything with .done
  for (let i=todayTasks.length-1; i >=0; i--) {
    if (todayTasks[i].status === " done") {
      todayTasks.splice(i, 1);
    }
  }
  for (let i=0; i < todayTasks.length; i++) {
    todayTasks[i].id = i;
  }
  // move tomorrow to today
  for (let i=0; i < tomorrowTasks.length; i++) {
    if (tomorrowTasks[i].status === "") {
      tomorrowTasks[i].id = todayTasks.length;
      todayTasks.push(tomorrowTasks[i]);
    }
  }
  tomorrowTasks = [];
  displayList();
  save();
}

taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addBtn.click();
  }
});

taskEdit.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    updateBtn.click();
  }
})

// SAVE

function save() {
  localStorage.setItem("saveToday", JSON.stringify(todayTasks));
  localStorage.setItem("saveTomorrow", JSON.stringify(tomorrowTasks));
}
