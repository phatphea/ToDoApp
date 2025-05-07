// //js
// const addNewCategoryInput = document.querySelector("#left-nav .mune input");
// const categoryListUL = document.querySelector("#left-nav ul");
// addNewCategoryInput.addEventListener("keypress", (e) => {
//   if (e.key == "Enter") {
//     const newCategory = e.target.value;
//     const newLi = document.createElement("LI");
//     newLi.className = "home";
//     newLi.setAttribute("onclick", "display(this)");
//     newLi.innerHTML = `
//             <i class="fa-solid fa-list"></i>
//             <span class="txt-mune">${newCategory}</span>
//       `;
//     categoryListUL.appendChild(newLi);
//     addNewCategoryInput.value = "";
//   }
// });

// const display = (e) => {
//   const allLi = categoryListUL.querySelectorAll("li");
//   allLi.forEach((el) => {
//     el.className = "home";
//   });
//   e.classList.add("active");

//   const labelShow = document.querySelector("#show");
//   labelShow.innerHTML = "";
//   const clone = e.cloneNode(true);
//   labelShow.appendChild(clone);
//   // console.log(e.children[1]);
// };

// const btnAddNew = document.querySelector(".option button");
// const taskListUL = document.querySelector(".task-list ul");

// btnAddNew.addEventListener("click", (e) => {
//   e.preventDefault();
//   const newTask = document.querySelector(".text-input");
//   if (newTask.value.trim() !== "") {
//     let newLI = document.createElement("LI");
//     newLI.innerHTML = `
//       <input type="checkbox" onclick="toggleMarkDone(this)">
//       <span class="task-name">${newTask.value}</span>
//       <span class="delete material-symbols-outlined" onclick="taggleDelete(this)">delete</span>
//     `;
//     taskListUL.appendChild(newLI);
//     newTask.value = "";
//     updateButtonState();
//   }
// });

// const taggleDelete = (sender) => {
//   const li = sender.closest("li");
//   li.remove();
// };

// const toggleMarkDone = (sender) => {
//   const task = sender.nextElementSibling;
//   if (sender.checked) {
//     task.classList.add("mark-done");
//   } else {
//     task.classList.remove("mark-done");
//   }
// };

// const newTaskInput = document.querySelector(".text-input");
// const addNewButton = document.querySelector(".option button");

// function updateButtonState() {
//   if (newTaskInput.value.trim() === "") {
//     addNewButton.disabled = true;
//     addNewButton.classList.add("disabled"); // Optionally add a CSS class
//   } else {
//     addNewButton.disabled = false;
//     addNewButton.classList.remove("disabled"); // Optionally remove the CSS class
//   }
// }

// // Call the function initially
// updateButtonState();

// // Call the function whenever the input value changes
// newTaskInput.addEventListener("input", updateButtonState);

//function displayDateTime
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = now
    .toLocaleDateString("en-US", options)
    .replace(/,/g, ""); // Remove commas
  const day = formattedDate.split(" ")[0];
  const monthDayYear = formattedDate.split(" ").slice(1).join("/");
  const dateTimeString = `${day}, ${
    now.getDate() < 10 ? "0" : ""
  }${now.getDate()}/${now.toLocaleDateString("en-US", {
    month: "short",
  })}/${now.getFullYear()}`;

  // Select all elements with class "date"
  const dateElements = document.querySelectorAll(".date");

  // Loop through and update each one
  dateElements.forEach(function (el) {
    el.textContent = dateTimeString;
  });
}

updateDateTime();
setInterval(updateDateTime, 1000);

//option two js code
const addNewCategoryInput = document.querySelector("#left-nav .mune input");
const categoryListUL = document.querySelector("#left-nav ul");
const btnAddNew = document.querySelector(".option button");
const taskListUL = document.querySelector(".task-list ul");
const newTaskInput = document.querySelector(".text-input");

let currentCategory = "My Day"; // Default category
let categoryTasks = loadFromLocalStorage() || {
  "My Day": [],
};

// Initialize category list on load
document.addEventListener("DOMContentLoaded", () => {
  for (const category in categoryTasks) {
    addCategoryToDOM(category);
  }
  setActiveCategory(currentCategory);
  renderTaskList(currentCategory);
});

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem("categoryTasks", JSON.stringify(categoryTasks));
}

// Load from localStorage
function loadFromLocalStorage() {
  const data = localStorage.getItem("categoryTasks");
  return data ? JSON.parse(data) : null;
}

// Add category to DOM
function addCategoryToDOM(category) {
  const newLi = document.createElement("li");
  newLi.className = "home";
  newLi.setAttribute("onclick", "display(this)");
  newLi.innerHTML = `
    <i class="fa-solid fa-list"></i>
    <span class="txt-mune">${category}</span>
  `;
  categoryListUL.appendChild(newLi);
}

// Add new category on Enter key
addNewCategoryInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const newCategory = e.target.value.trim();
    if (newCategory !== "" && !categoryTasks[newCategory]) {
      categoryTasks[newCategory] = [];
      addCategoryToDOM(newCategory);
      saveToLocalStorage();
      addNewCategoryInput.value = "";
    }
  }
});

// Set active category and update UI
function setActiveCategory(categoryName) {
  const allLi = categoryListUL.querySelectorAll("li");
  allLi.forEach((el) => {
    const text = el.querySelector(".txt-mune").textContent.trim();
    el.classList.toggle("active", text === categoryName);
  });

  const labelShow = document.querySelector("#show");
  labelShow.innerHTML = `<i class="fa-solid fa-list"></i><span class="txt-mune">${categoryName}</span>`;

  currentCategory = categoryName;
  renderTaskList(categoryName);
}

// Function to handle category selection
function display(e) {
  const categoryName = e.querySelector(".txt-mune")?.textContent || "My Day";
  setActiveCategory(categoryName.trim());
}

// Add new task
btnAddNew.addEventListener("click", (e) => {
  e.preventDefault();
  const newTask = newTaskInput.value.trim();
  if (newTask !== "") {
    if (!categoryTasks[currentCategory]) {
      categoryTasks[currentCategory] = [];
    }
    categoryTasks[currentCategory].push(newTask);
    newTaskInput.value = "";
    updateButtonState();
    saveToLocalStorage();
    renderTaskList(currentCategory);
  }
});

// Render tasks for selected category
function renderTaskList(category) {
  taskListUL.innerHTML = "";

  const tasks = categoryTasks[category] || [];

  tasks.forEach((taskText, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" onclick="toggleMarkDone(this)">
      <span class="task-name">${taskText}</span>
      <span class="delete material-symbols-outlined" onclick="deleteTask('${category}', ${index})">delete</span>
    `;
    taskListUL.appendChild(li);
  });
}

// Delete task from category
function deleteTask(category, index) {
  if (categoryTasks[category]) {
    categoryTasks[category].splice(index, 1);
    saveToLocalStorage();
    renderTaskList(category);
  }
}

// Mark task as done
function toggleMarkDone(sender) {
  const task = sender.nextElementSibling;
  task.classList.toggle("mark-done", sender.checked);
}

// Enable/Disable Add button
function updateButtonState() {
  const empty = newTaskInput.value.trim() === "";
  btnAddNew.disabled = empty;
  btnAddNew.classList.toggle("disabled", empty);
}

updateButtonState();
newTaskInput.addEventListener("input", updateButtonState);
