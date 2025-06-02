let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = 'all';

const listEl = document.getElementById("task-list");
const dashboardEl = document.getElementById("dashboard");
const inputEl = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const filterBtns = document.querySelectorAll(".filter-btn");

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  listEl.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'all') return true;
    return currentFilter === 'completed' ? task.completed : !task.completed;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");
    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">✖</button>
    `;
    listEl.appendChild(li);
  });

  const completedCount = tasks.filter(t => t.completed).length;
  dashboardEl.innerText = `Total: ${tasks.length} | Completed: ${completedCount} | Pending: ${tasks.length - completedCount}`;
}

function addTask() {
  const text = inputEl.value.trim();
  if (text === '') return alert("Please enter a task!");

  tasks.push({ text, completed: false });
  inputEl.value = '';
  updateLocalStorage();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  renderTasks();
}

function setFilter(type) {
  currentFilter = type;
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === type);
  });
  renderTasks();
}

addBtn.addEventListener('click', addTask);
inputEl.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

// Initial render
renderTasks();
