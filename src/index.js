// import shopping from "./modules/todo-maker";
import "./css/normalize.css";
import "./css/style.css";
import * as dom from "./modules/dom";
// console.table(shopping);

const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");
const projectAdder = document.querySelector(".add-one");
const modalBackground = document.querySelector(".mod-bg");
const modalAddProject = document.querySelector(".modal-proj");
const addButtonOne = document.querySelector(".add-bt");
const projectNameInput = document.querySelector(".name-input");
const projectExample = document.querySelector(".my-project");
const dropDown = document.querySelector(".drop-down");
const dropArrow = document.querySelector(".drop-arrow");
const myProject = document.querySelector(".my-project");
const penOne = document.querySelector(".pen-one");
let modifier;
// console.log(deletesOne);

menu.addEventListener("click", () => {
  nav.classList.toggle("hide-nav");
});
projectAdder.addEventListener("click", (e) => {
  modalBackground.classList.add("mod-scale");
  modalAddProject.classList.add("mod-show");
  projectNameInput.focus();
});
myProject.children[1].children[0].addEventListener("click", () => {
  modifier = myProject.children[1].children[0];
  projectAdder.click();
});
modalBackground.addEventListener("click", (e) => {
  if (
    e.target == modalBackground ||
    e.target.classList[1] == "can-bt" ||
    e.target.classList[1] == "add-bt"
  ) {
    modalBackground.classList.remove("mod-scale");
    modalAddProject.classList.remove("mod-show");
    projectNameInput.value = "";
  } else return;
});
addButtonOne.addEventListener("click", () => {
  projectNameInput.blur();
  if (modifier) {
    if (projectNameInput.value == "") {
      return;
    } else {
      modifier.parentElement.previousElementSibling.textContent =
        projectNameInput.value;
    }
    modifier = 0;
    return
  }
  let newProject = projectExample.cloneNode(true);
  let newModifier = newProject.children[1].children[0];
  nav.appendChild(newProject);
  newModifier.addEventListener("click", () => {
    modifier = newModifier;
    projectAdder.click();
  });
  if (projectNameInput.value == "") {
    nav.lastChild.querySelector(".nameproj").textContent = "Unnamed Project";
  } else {
    nav.lastChild.querySelector(".nameproj").textContent =
      projectNameInput.value;
  }
});
modalBackground.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    addButtonOne.click();
  }
  if (e.code == "Escape") {
    modalBackground.click();
  }
});
dropDown.addEventListener("click", () => {
  let projects = [...nav.children];
  projects.splice(0, 2);
  projects.forEach((project) => project.classList.toggle("hide-projects"));
  dropArrow.classList.toggle("arrow-down");
});
