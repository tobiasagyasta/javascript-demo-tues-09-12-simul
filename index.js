const defaultTasks = [
  { title: "Email clients", duration: 30, completed: true },
  { title: "Code review", duration: 45, completed: false },
  { title: "Write documentation", duration: 25, completed: true },
];

const planner = {
  tasks: [...defaultTasks],
  listTasks() {
    this.tasks.forEach((t) =>
      console.log(`${t.title} ${t.duration} minutes`)
    );
  },
  getDurationsInSeconds() {
    return this.tasks.map((t) => t.duration * 60);
  },
  completedTasks() {
    return this.tasks.filter((t) => t.duration >= 30);
  },
  totalTime() {
    return this.tasks.reduce((total, t) => total + t.duration, 0);
  },
};

// Rest parameter demo
function sum(...nums) {
  return nums.reduce((acc, curr) => acc + curr, 0);
}

const baseProduct = { name: "Laptop", price: 8000000 };
const updatedProduct = {
  tags: ["laptop", "pc", "asus"],
  brand: "Asus",
  color: "White",
};

const arrayA = [1, 2, 3];
const arrayB = [4, 5, 6];

let sumNumbers = [5, 10, 15, 30];
let combinedArray = buildCombinedArray();

function buildCombinedArray() {
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const a = shuffle(arrayA);
  const b = shuffle(arrayB);
  return [...b, ...a, ...b, ...a, ...a];
}

function renderPlanner() {
  const taskList = document.getElementById("task-list");
  const durationEl = document.getElementById("duration-seconds");
  const filteredEl = document.getElementById("filtered-tasks");
  const totalEl = document.getElementById("total-time");

  taskList.innerHTML = planner.tasks
    .map(
      (t, idx) => `
        <div class="task">
          <div>
            <strong>${t.title}</strong>
            <div class="meta">${t.duration} minutes</div>
          </div>
          <div class="meta">
            <span class="badge ${t.completed ? "" : "pending"}">${
        t.completed ? "Completed" : "Pending"
      }</span>
            <button class="ghost" data-toggle-task="${idx}">${
        t.completed ? "Undo" : "Done"
      }</button>
          </div>
        </div>
      `
    )
    .join("");

  durationEl.innerHTML = planner
    .getDurationsInSeconds()
    .map((n) => `<span>${n}s</span>`)
    .join("");

  const filteredTasks = planner.completedTasks();
  filteredEl.innerHTML = filteredTasks
    .map((t) => `<span>${t.title}</span>`)
    .join("");

  totalEl.textContent = `${planner.totalTime()} mins`;
}

function renderSum() {
  const sumList = document.getElementById("sum-list");
  const sumResult = document.getElementById("sum-result");

  sumList.innerHTML = sumNumbers
    .map(
      (n, idx) =>
        `<span class="tag">${n} <button class="ghost" data-remove-sum="${idx}">x</button></span>`
    )
    .join("");

  sumResult.textContent =
    sumNumbers.length === 0
      ? "Nothing to add yet"
      : `Sum = ${sum(...sumNumbers)}`;
}

function renderSpread() {
  const combinedEl = document.getElementById("combined-array");
  const mergedEl = document.getElementById("merged-object");

  combinedEl.textContent = JSON.stringify(combinedArray, null, 2);

  const merged = { ...baseProduct, ...updatedProduct };
  mergedEl.textContent = JSON.stringify(merged, null, 2);
}

function wireEvents() {
  const taskForm = document.getElementById("task-form");
  const resetButton = document.getElementById("reset-tasks");
  const taskList = document.getElementById("task-list");
  const sumForm = document.getElementById("sum-form");
  const clearSum = document.getElementById("clear-sum");
  const sumList = document.getElementById("sum-list");
  const shuffleSpread = document.getElementById("shuffle-spread");

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("task-title").value.trim();
    const duration = Number(
      document.getElementById("task-duration").value.trim()
    );
    const completed = document.getElementById("task-completed").checked;

    if (!title || Number.isNaN(duration)) {
      return;
    }

    planner.tasks = [...planner.tasks, { title, duration, completed }];
    taskForm.reset();
    renderPlanner();
  });

  resetButton.addEventListener("click", () => {
    planner.tasks = [...defaultTasks];
    renderPlanner();
  });

  taskList.addEventListener("click", (event) => {
    const toggleButton = event.target.closest("[data-toggle-task]");
    if (!toggleButton) return;
    const index = Number(toggleButton.dataset.toggleTask);
    planner.tasks = planner.tasks.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    renderPlanner();
  });

  sumForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const raw = document.getElementById("sum-input").value.trim();
    if (!raw) return;
    const value = Number(raw);
    if (Number.isNaN(value)) return;
    sumNumbers = [...sumNumbers, value];
    sumForm.reset();
    renderSum();
  });

  clearSum.addEventListener("click", () => {
    sumNumbers = [];
    renderSum();
  });

  sumList.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-sum]");
    if (!removeButton) return;
    const index = Number(removeButton.dataset.removeSum);
    sumNumbers = sumNumbers.filter((_, idx) => idx !== index);
    renderSum();
  });

  shuffleSpread.addEventListener("click", () => {
    combinedArray = buildCombinedArray();
    renderSpread();
  });
}

function init() {
  renderPlanner();
  renderSum();
  renderSpread();
  wireEvents();
}

document.addEventListener("DOMContentLoaded", init);
