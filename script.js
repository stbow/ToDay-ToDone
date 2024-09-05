const taskForm = document.getElementById("task-form"); //whole form
const openTaskFormBtn = document.getElementById("open-task-form-btn"); //add new task button
const closeTaskFormBtn = document.getElementById("close-task-form-btn"); //x button on task form
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn"); // button at bottom of form
const doneBtn = document.getElementById("done-btn");
const toTomorrowBtn = document.getElementById("to-tomorrow-btn");
const toTodayBtn = document.getElementById("to-today-btn");
const newDayBtn = document.getElementById("new-day-btn");
const tasksContainer = document.getElementById("tasks-container"); // starts empty
const taskInput = document.getElementById("task-input"); // in form

const taskData = JSON.parse(localStorage.getItem("today")) || []; 
const tomorrowData = JSON.parse(localStorage.getItem("tomorrow")) || []; //get task lists if there is one, set up empty array if not
let currentTask = {}; //used for adding or updating tasks

/* FUNCTIONS */

function addOrUpdateTask() {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${taskInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    task: taskInput.value,
    status: "",
    today: true
  };

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  localStorage.setItem("today", JSON.stringify(taskData));
  updateTaskContainer();
  reset();
};

function updateTaskContainer() {
  tasksContainer.innerHTML = "";

  taskData.forEach(
    ({ id, task, status }) => {
        tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <span${status === done ? ' class=\'done\'' : ""}>${task}</span>
          <span class="controls">
            <button onclick="editTask(this)" type="button" class="fa-regular fa-pen-to-square"></button>
            <button onclick="markDone(this)" type="button" class="fa-solid fa-check"></button>
            <button onclick="moveToTomorrow(this)" type="button" class="fa-solid fa-angles-right"></button>
          </span>
        </div>
      `
    }
  );
};

function editTask(buttonEl) {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );
  currentTask = taskData[dataArrIndex];

  taskInput.value = currentTask.task;

  addOrUpdateTaskBtn.innerText = "Update";

  taskForm.classList.toggle("hidden");
};

function reset() {
  addOrUpdateTaskBtn.innerText = "Add";
  taskInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};

/* FUNCTIONS TO FINISH */
function moveToTomorrow(buttonEl) {
  // pop from today, unshift into tomorrow
  updateTaskContainer();
};

function moveToToday(buttonEl) {
  // pop from tomorrow, unshift into today (or add at end?)
  updateTaskContainer();
};

function newDay() {
  // delete everything marked done
  // move all from tomorrow into today
  updateTaskContainer();
};

function markDone(buttonEl) {
  buttonEl.parentElement.parentElement.classList.add("done");

  const dataArrIndex = taskData.findIndex(item);
  currentTask = taskData[dataArrIndex];

  taskInput.value = currentTask.task;

};

/* GENERATE THE LIST */
if (taskData.length) {
  updateTaskContainer();
};

/* BUTTON ACTIONS */
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.remove("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
  reset();
  taskForm.classList.add("hidden");
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addOrUpdateTask();
});

/* BUTTON ACTIONS TO FINISH */
/* doneBtn.addEventListener("click", );

toTomorrowBtn.addEventListener("click", );

toTodayBtn.addEventListener("click", );

newDayBtn.addEventListener("click", );
 */
