// events.js

// Tasks array to hold all todo items
let tasks = [];

// Function to add a new task
function newTask() {
  const input = document.getElementById("todo");
  const taskDetail = input.value.trim();
  if (taskDetail !== "") {
    tasks.push({ detail: taskDetail, completed: false });
    input.value = "";
    renderTasks();
  }
}

// Attach event listener to button
const submitButton = document.getElementById("submitTask");
submitButton.addEventListener("click", newTask);

// Function to render all tasks
function renderTasks() {
  const list = document.getElementById("todoList");
  list.innerHTML = ""; // Clear existing list
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    if (task.completed) taskItem.classList.add("strike");

    taskItem.innerHTML = `
      <p>${task.detail}</p>
      <div>
        <span data-function="delete" data-index="${index}">❎</span>
        <span data-function="complete" data-index="${index}">✅</span>
      </div>
    `;

    list.appendChild(taskItem);
  });
}

// Function to handle clicks on list items
function manageTasks(event) {
  const action = event.target.dataset.function;
  const index = event.target.dataset.index;

  if (action === "delete") {
    removeTask(index);
  } else if (action === "complete") {
    completeTask(index);
  }
}

// Attach event listener to the UL for delegation
const todoList = document.getElementById("todoList");
todoList.addEventListener("click", manageTasks);

// Remove a task by index
function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Mark a task as complete
function completeTask(index) {
  tasks[index].completed = true;
  renderTasks();
}
