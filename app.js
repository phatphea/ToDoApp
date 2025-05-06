//js
const addNewCategoryInput = document.querySelector("#left-nav .mune input");
const categoryListUL = document.querySelector("#left-nav ul");
addNewCategoryInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    const newCategory = e.target.value;
    const newLi = document.createElement("LI");
    newLi.className = "home";
    newLi.setAttribute("onclick", "display(this)");
    newLi.innerHTML = `
            <i class="fa-solid fa-list"></i>
            <span class="txt-mune">${newCategory}</span>
      `;
    categoryListUL.appendChild(newLi);
    addNewCategoryInput.value = "";
  }
});

const display = (e) => {
  const allLi = categoryListUL.querySelectorAll("li");
  allLi.forEach((el) => {
    el.className = "home";
  });
  e.classList.add("active");

  const labelShow = document.querySelector("#show");
  labelShow.innerHTML = "";
  const clone = e.cloneNode(true);
  labelShow.appendChild(clone);
  // console.log(e.children[1]);
};

const btnAddNew = document.querySelector(".option button");
const taskListUL = document.querySelector(".task-list ul");

btnAddNew.addEventListener("click", (e) => {
  e.preventDefault();
  const newTask = document.querySelector(".text-input");
  if (newTask.value.trim() !== "") {
    let newLI = document.createElement("LI");
    newLI.innerHTML = `
      <input type="checkbox" onclick="toggleMarkDone(this)">
      <span class="task-name">${newTask.value}</span>
      <span class="delete material-symbols-outlined" onclick="taggleDelete(this)">delete</span>
    `;
    taskListUL.appendChild(newLI);
    newTask.value = "";
    updateButtonState();
  }
});

const taggleDelete = (sender) => {
  const li = sender.closest("li");
  li.remove();
};

const toggleMarkDone = (sender) => {
  const task = sender.nextElementSibling;
  if (sender.checked) {
    task.classList.add("mark-done");
  } else {
    task.classList.remove("mark-done");
  }
};

const newTaskInput = document.querySelector(".text-input");
const addNewButton = document.querySelector(".option button");

function updateButtonState() {
  if (newTaskInput.value.trim() === "") {
    addNewButton.disabled = true;
    addNewButton.classList.add("disabled"); // Optionally add a CSS class
  } else {
    addNewButton.disabled = false;
    addNewButton.classList.remove("disabled"); // Optionally remove the CSS class
  }
}

// Call the function initially
updateButtonState();

// Call the function whenever the input value changes
newTaskInput.addEventListener("input", updateButtonState);
