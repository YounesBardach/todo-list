//Imports

// import shopping from "./modules/todo-maker";
import "./css/normalize.css";
import "./css/style.css";
import { projectDirectory, createProject, ProjectID } from "./modules/objects";

//Menu

const menu = document.querySelector(".menu");

//Navbar

const nav = document.querySelector(".nav");
const projectAdder = document.querySelector(".add-one");
const dropDown = document.querySelector(".drop-down");
const dropArrow = document.querySelector(".drop-arrow");
const myProject = document.querySelector(".my-project");
let modifier;
let deleter;

//ModalBG

const modalBackground = document.querySelector(".mod-bg");

//Project modal

const modalAddProject = document.querySelector(".modal-proj");
const projAddButton = document.querySelector(".proj-add-bt");
const projectNameInput = document.querySelector(".name-input");
const projectTitle =
  projectNameInput.parentElement.previousElementSibling.previousElementSibling;
const projectNameLabel = projectTitle.nextElementSibling.firstChild;

//Task modal

const modalAddTask = document.querySelector(".modal-task");
const taskAddButton = document.querySelector(".task-add-bt");
const taskNameInput = document.querySelector("#task-name");
const taskTitle =
  taskNameInput.parentElement.previousElementSibling.previousElementSibling;
const taskNameLabel = taskTitle.nextElementSibling.firstChild;

//Delete modal

const modalDelProject = document.querySelector(".modal-del");
const delButton = document.querySelector(".red-bt");
const delPara = delButton.parentElement.previousElementSibling;

//Content

const bigTitle = document.querySelector(".proj-title");
const taskAdder = document.querySelector(".add-two");

//Display delete modal

const delMod = () => {
  modalBackground.classList.add("mod-scale");
  modalDelProject.classList.add("mod-show");
  delButton.previousElementSibling.focus();
  delPara.textContent = `You're going to delete the "${deleter.parentElement.previousElementSibling.textContent}" project. Are you sure?`;
};

//Remove click from projects

const removeClickEffect = () => {
  [...nav.children].forEach((child) =>
    child.classList.remove("clicked-project")
  );
};

//Remove and reset all modals

const removeAll = () => {
  modalBackground.classList.remove("mod-scale");
  modalAddProject.classList.remove("mod-show");
  modalAddTask.classList.remove("mod-show");
  modalDelProject.classList.remove("mod-show");
  modifier = 0;
  deleter = 0;
};

//Menu hide

menu.addEventListener("click", () => {
  nav.classList.toggle("hide-nav");
});

//Projects drop-down

dropDown.addEventListener("click", () => {
  const projects = [...nav.children];
  projects.splice(0, 2);
  projects.forEach((project) => project.classList.toggle("hide-projects"));
  dropArrow.classList.toggle("arrow-down");
});

//Add Enter and Esc keys to modals

modalBackground.addEventListener(
  "keydown",
  (e) => {
    if (e.code == "Escape") {
      modalBackground.click();
    }
    if (e.code == "Enter") {
      if (deleter) {
        delButton.previousElementSibling.click();
      } else {
        projAddButton.click();
      }
    }
  },
  true
);

//Collapse and reset modals

modalBackground.addEventListener("click", (e) => {
  if (
    e.target == modalBackground ||
    e.target.classList[1] == "can-bt" ||
    e.target.classList[1] == "add-bt" ||
    e.target.classList[0] == "del-bt"
  ) {
    removeAll();
  }
});

//Display project modal

projectAdder.addEventListener("click", () => {
  modalBackground.classList.add("mod-scale");
  modalAddProject.classList.add("mod-show");
  projectNameInput.focus();
  if (modifier) {
    projectNameInput.value =
      modifier.parentElement.previousElementSibling.textContent;
    projectTitle.textContent = projectNameInput.value;
    projectNameLabel.textContent = "Rename your project";
    projAddButton.textContent = "Change";
  } else {
    projectNameInput.value = "";
    projectTitle.innerHTML = `New Project &#9997;`;
    projectNameLabel.textContent = "Name your project";
    projAddButton.textContent = "Add";
  }
});

//Display task modal

taskAdder.addEventListener("click", () => {
  modalBackground.classList.add("mod-scale");
  modalAddTask.classList.add("mod-show");
  taskNameInput.focus();
  // if (modifier) {
  //   projectNameInput.value =
  //     modifier.parentElement.previousElementSibling.textContent;
  //   projectTitle.textContent = projectNameInput.value;
  //   ProjectNameLabel.textContent = "Rename your project";
  //   addButtonOne.textContent = "Change";
  // }
});

// Delete project

delButton.addEventListener("click", () => {
  delete projectDirectory[ProjectID(deleter.parentElement.parentElement).DirId];
  deleter.parentElement.parentElement.remove();
  bigTitle.textContent = "";
  removeClickEffect();
});

//Default project

window.addEventListener("load", () => {
  //Add
  createProject("My Project", myProject);
});

myProject.addEventListener("click", (e) => {
  //Click interaction
  if (e.target == myProject || e.target == myProject.firstElementChild) {
    removeClickEffect();
    myProject.classList.add("clicked-project");
    bigTitle.textContent = ProjectID(myProject).title;
  }
});

myProject.children[1].children[0].addEventListener("click", () => {
  //Modify
  modifier = myProject.children[1].children[0];
  projectAdder.click();
});

myProject.children[1].children[1].addEventListener("click", () => {
  //Delete
  //Display delete modal
  deleter = myProject.children[1].children[1];
  delMod();
});

//Projects creation

projAddButton.addEventListener("click", () => {
  projectNameInput.blur();

  //Modify

  if (modifier) {
    if (projectNameInput.value != "") {
      ProjectID(modifier.parentElement.parentElement).title =
        projectNameInput.value;
      modifier.parentElement.previousElementSibling.textContent =
        projectNameInput.value;
    } else {
      ProjectID(modifier.parentElement.parentElement).title = "Unnamed Project";
      modifier.parentElement.previousElementSibling.textContent =
        "Unnamed Project";
    }

    //Click interaction
    modifier.parentElement.parentElement.click();
    return;
  }

  let newProject = myProject.cloneNode(true);
  let newModifier = newProject.children[1].children[0];
  let newDeleter = newProject.children[1].children[1];

  nav.appendChild(newProject);
  newModifier.addEventListener("click", () => {
    modifier = newModifier;
    projectAdder.click();
  });

  //Delete

  newDeleter.addEventListener("click", () => {
    //Display delete modal
    deleter = newDeleter;
    delMod();
  });

  //Add

  if (projectNameInput.value == "") {
    createProject("Unnamed Project", nav.lastChild);
    nav.lastChild.querySelector(".nameproj").textContent = ProjectID(
      nav.lastChild
    ).title;
  } else {
    createProject(`${projectNameInput.value}`, nav.lastChild);
    nav.lastChild.querySelector(".nameproj").textContent = ProjectID(
      nav.lastChild
    ).title;
  }

  newProject.addEventListener("click", (e) => {
    //Click interaction
    if (e.target == newProject || e.target == newProject.firstElementChild) {
      removeClickEffect();
      newProject.classList.add("clicked-project");
      bigTitle.textContent = ProjectID(newProject).title;
    }
  });

  newProject.click();
});

console.log(projectDirectory);

export { myProject };
