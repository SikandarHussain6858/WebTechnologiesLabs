const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const filterButtons = [...document.querySelectorAll(".filter")];
const sortBtn = document.getElementById("sortBtn");
const clearDoneBtn = document.getElementById("clearDoneBtn");
const modeToggle = document.getElementById("modeToggle");

const progressMeter = document.getElementById("progressMeter");
const xpValue = document.getElementById("xpValue");
const levelValue = document.getElementById("levelValue");
const streakValue = document.getElementById("streakValue");
const badgeBar = document.getElementById("badgeBar");

const STORAGE_KEY = "TASK MANAGER";

let state = load() || {
  tasks: [],
  filter: "all",
  sortAsc: true,
  mode: "calm",
  xp: 0,
  streak: 0
};

render();

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.filter = btn.dataset.filter;
    save();
    render();
  });
});

sortBtn.addEventListener("click", () => {
  state.sortAsc = !state.sortAsc;
  save();
  render();
});

clearDoneBtn.addEventListener("click", () => {
  const before = state.tasks.length;
  state.tasks = state.tasks.filter((t) => !t.done);
  if (before !== state.tasks.length) {
    state.xp += 5;
  }
  save();
  render();
});

modeToggle.addEventListener("click", () => {
  state.mode = state.mode === "calm" ? "play" : "calm";
  save();
  render();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  state.tasks.push({
    id: Date.now(),
    text,
    done: false,
    createdAt: Date.now()
  });

  taskInput.value = "";
  state.xp += 10;
  save();
  render();
}

function toggleTask(id) {
  const task = state.tasks.find((t) => t.id === id);
  if (!task) return;

  task.done = !task.done;
  if (task.done) {
    state.xp += 20;
    state.streak += 1;
  } else {
    state.xp = Math.max(0, state.xp - 10);
    state.streak = Math.max(0, state.streak - 1);
  }

  save();
  render();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((t) => t.id !== id);
  state.xp = Math.max(0, state.xp - 2);
  save();
  render();
}

function getVisibleTasks() {
  let tasks = [...state.tasks];

  if (state.filter === "active") tasks = tasks.filter((t) => !t.done);
  if (state.filter === "done") tasks = tasks.filter((t) => t.done);

  tasks.sort((a, b) => state.sortAsc ? a.createdAt - b.createdAt : b.createdAt - a.createdAt);
  return tasks;
}

function render() {
  document.body.classList.toggle("play", state.mode === "play");
  modeToggle.textContent = state.mode === "calm" ? "Calm" : "Play";

  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === state.filter);
  });

  const tasks = getVisibleTasks();
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " done" : "");
    if (state.mode === "play") li.classList.add("pop");

    const tick = document.createElement("button");
    tick.className = "tick";
    tick.setAttribute("aria-label", "Toggle complete");
    tick.addEventListener("click", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const del = document.createElement("button");
    del.className = "delete";
    del.textContent = "x";
    del.setAttribute("aria-label", "Delete task");
    del.addEventListener("click", () => deleteTask(task.id));

    li.append(tick, text, del);
    taskList.appendChild(li);
  });

  emptyState.style.display = state.tasks.length ? "none" : "block";

  const doneCount = state.tasks.filter((t) => t.done).length;
  const total = state.tasks.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;
  progressMeter.style.width = pct + "%";

  const level = Math.floor(state.xp / 100) + 1;
  xpValue.textContent = String(state.xp);
  levelValue.textContent = String(level);
  streakValue.textContent = String(state.streak);

  badgeBar.textContent = getBadges(state.xp, state.streak);
}

function getBadges(xp, streak) {
  const badges = [];
  if (xp >= 50) badges.push("★");
  if (xp >= 150) badges.push("★★");
  if (xp >= 300) badges.push("★★★");
  if (streak >= 3) badges.push("🔥");
  if (streak >= 7) badges.push("🔥🔥");
  return badges.join(" ");
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}