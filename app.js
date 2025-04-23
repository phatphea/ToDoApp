const addNewCategoryInput = document.querySelector("#left-nav .mune input");
const categoryListUL = document.querySelector("#left-nav ul");
addNewCategoryInput.addEventListener("keypress",
  (e) => {
    if(e.key == "Enter"){
      const newCategory = e.target.value;
      const newLi = document.createElement("LI");
      newLi.className="home";
      newLi.setAttribute("onclick", "display(this)");
      newLi.innerHTML = `
            <i class="fa-solid fa-list"></i>
            <span class="txt-mune">${newCategory}</span>
      `
      categoryListUL.appendChild(newLi);
      addNewCategoryInput.value = "";
    }
  }
)

const display = (e) => {
  const allLi = categoryListUL.querySelectorAll("li");
  allLi.forEach(el => {
      el.className = "home";
  });
  e.classList.add("active");

  const labelShow = document.querySelector("#show");
  labelShow.innerHTML = "";
  const clone = e.cloneNode(true); 
  labelShow.appendChild(clone);
  // console.log(e.children[1]);

}