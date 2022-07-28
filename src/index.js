//Import

import "./css/normalize.css";
import "./css/style.css";
import {
  projectDirectory,
  createProject,
  ProjectID,
  createTodo,
  taskID,
} from "./modules/objects";

//Menu

const menu = document.querySelector(".menu");

//Completion indicator

const completion =
  document.querySelector(".complete").firstElementChild.firstElementChild;
const checkMark = document.querySelector(".complete").lastElementChild;
let completedTasks = 0;
let totalTasks = 0;

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
const taskTitle = modalAddTask.firstElementChild.children[0];
const taskNameLabel = modalAddTask.firstElementChild.children[1];
const taskDescrib = document.querySelector("#task-descrip");
const taskTime = document.querySelector("#task-date");
const taskImp = document.querySelector(".field");

//Delete modal

const modalDelProject = document.querySelector(".modal-del");
const delButton = document.querySelector(".red-bt");
const delPara = delButton.parentElement.previousElementSibling;
const delTitle = delPara.previousElementSibling;

//Content

const taskContainer = document.querySelector(".view");
const bigTitle = document.querySelector(".proj-title");
const taskAdder = document.querySelector(".add-two");
const myTask = document.querySelector(".my-task");
const taskStatus = document.querySelector("#task-status");
const taskTitleTwo = myTask.children[1].firstElementChild;
const taskDescribTwo = taskTitleTwo.nextElementSibling;
const taskTimeTwo = myTask.children[2].firstElementChild;
const taskModif = taskTimeTwo.nextElementSibling.firstElementChild;
const taskDel = taskModif.nextElementSibling;
const taskImpTwo = document.querySelector(".importance");
const plant = document.querySelector(".plant");
let modifierTwo;
let deleterTwo;
let tasker;

//Show tasks completion progress

const progBar = () => {
  completion.innerHTML = `${completedTasks}/${totalTasks}`;
  if (completedTasks == totalTasks && totalTasks != 0) {
    checkMark.classList.remove("hide-prog");
  } else {
    checkMark.classList.add("hide-prog");
  }
  if (completedTasks == totalTasks && totalTasks == 0) {
    completion.classList.add("hide-prog");
  } else {
    completion.classList.remove("hide-prog");
  }
};

//Display delete modal

const delMod = () => {
  modalBackground.classList.add("mod-scale");
  modalDelProject.classList.add("mod-show");
  delButton.previousElementSibling.focus();
  if (deleter) {
    delTitle.innerHTML = `Delete project &#10060;`;
    delPara.textContent = `You're going to delete the "${deleter.parentElement.previousElementSibling.textContent}" project. Are you sure?`;
  } else {
    delTitle.innerHTML = `Delete task &#10060;`;
    delPara.textContent = `You're going to delete the "${deleterTwo.parentElement.parentElement.previousElementSibling.children[0].textContent}" task. Are you sure?`;
  }
};

//Remove click from projects

const removeClickEffect = () => {
  [...nav.children].forEach((child) =>
    child.classList.remove("clicked-project")
  );
  let content = [...taskContainer.children];
  content = content.filter((div) => div.classList[0] == "my-task");
  content.forEach((child) => child.remove());
  taskContainer.classList.add("hide-tasks");
};

//Remove click from tasks

const removeClickEffectTwo = () => {
  [...taskContainer.children].forEach((child) =>
    child.classList.remove("clicked-task")
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
  modifierTwo = 0;
  deleterTwo = 0;
  tasker = 0;
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

modalBackground.addEventListener("keydown", (e) => {
  if (e.code == "Escape") {
    modalBackground.click();
  }
  if (e.code == "Enter") {
    if (deleter || deleterTwo) {
      delButton.previousElementSibling.click();
    } else if (tasker) {
      taskAddButton.click();
    } else {
      projAddButton.click();
    }
  }
});

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
  tasker = 1;
  modalBackground.classList.add("mod-scale");
  modalAddTask.classList.add("mod-show");
  taskNameInput.focus();
  if (modifierTwo) {
    taskNameInput.value =
      modifierTwo.parentElement.parentElement.previousElementSibling.firstElementChild.textContent;
    taskTitle.textContent = taskNameInput.value;
    taskNameLabel.textContent = "Rename your task";
    taskAddButton.textContent = "Change";
    taskDescrib.value =
      modifierTwo.parentElement.parentElement.previousElementSibling.children[1].textContent;
    taskTime.value =
      modifierTwo.parentElement.previousElementSibling.children[0].textContent;
    let importance =
      taskImpTwo.firstElementChild.firstElementChild.getAttributeNS(
        null,
        "fill"
      );
    switch (importance) {
      case "red":
        taskImp.children[1].firstElementChild.checked = true;
        break;
      case "yellow":
        taskImp.children[2].firstElementChild.checked = true;
        break;
      case "green":
        taskImp.children[3].firstElementChild.checked = true;
        break;
    }
  } else {
    taskNameInput.value = "";
    taskTitle.innerHTML = `New Task &#9997;`;
    taskNameLabel.textContent = "Name your task";
    taskAddButton.textContent = "Add";
    taskDescrib.value = "";
    taskTime.value = "";
    taskImp.children[1].firstElementChild.checked = false;
    taskImp.children[2].firstElementChild.checked = false;
    taskImp.children[3].firstElementChild.checked = false;
  }
});

// Delete project or task

delButton.addEventListener("click", () => {
  if (deleter) {
    let tasksNumber = 0;
    let doneTasksNumber = 0;
    for (const property in ProjectID(deleter.parentElement.parentElement)) {
      if (
        ProjectID(deleter.parentElement.parentElement)[property].projId ==
        ProjectID(deleter.parentElement.parentElement).DirId
      ) {
        tasksNumber++;
        if (
          ProjectID(deleter.parentElement.parentElement)[property].status ==
          "Done"
        ) {
          doneTasksNumber++;
        }
      }
    }
    delete projectDirectory[
      ProjectID(deleter.parentElement.parentElement).DirId
    ];
    totalTasks -= tasksNumber;
    completedTasks -= doneTasksNumber;
    progBar();
    deleter.parentElement.parentElement.remove();
    bigTitle.textContent = "";
    removeClickEffect();
  } else {
    delete projectDirectory[
      taskID(deleterTwo.parentElement.parentElement.parentElement).projId
    ][taskID(deleterTwo.parentElement.parentElement.parentElement).taskId];
    totalTasks -= 1;
    if (
      deleterTwo.parentElement.parentElement.parentElement.firstElementChild
        .firstElementChild.checked
    ) {
      completedTasks -= 1;
    }
    progBar();
    deleterTwo.parentElement.parentElement.parentElement.remove();
    removeClickEffectTwo();
  }
});

//Default project and task

window.addEventListener("load", () => {
  //Create defaults project and task and select them

  createProject("My Project", myProject);
  createTodo(
    "Project1",
    "Something to do",
    "I need to do something",
    "2022-07-11",
    "High",
    myTask
  );
  myProject.click();
  myTask.click();
  totalTasks += 1;
  progBar();
});

myProject.children[1].children[0].addEventListener("click", () => {
  //Display modify modal
  modifier = myProject.children[1].children[0];
  projectAdder.click();
});

taskModif.addEventListener("click", () => {
  //Display modify modal
  modifierTwo = taskModif;
  taskAdder.click();
});

myProject.children[1].children[1].addEventListener("click", () => {
  //Display delete modal
  deleter = myProject.children[1].children[1];
  delMod();
});

taskDel.addEventListener("click", () => {
  //Display delete modal
  deleterTwo = taskDel;
  delMod();
});

myProject.addEventListener("click", (e) => {
  //Click interaction
  if (e.target == myProject || myProject.contains(e.target)) {
    removeClickEffect();
    myProject.classList.add("clicked-project");
    taskContainer.classList.remove("hide-tasks");
    bigTitle.innerHTML = `${
      ProjectID(myProject).title
    }<span class="secret-id">${ProjectID(myProject).DirId}</span>`;
    for (const property in ProjectID(myProject)) {
      if (ProjectID(myProject)[property].projId == ProjectID(myProject).DirId) {
        plant.insertAdjacentElement(
          "beforebegin",
          ProjectID(myProject)[property].domRep
        );
      }
    }
  }
});

myTask.addEventListener("click", (e) => {
  //Click interaction
  if (e.target == myTask || myTask.contains(e.target)) {
    removeClickEffectTwo();
    myTask.classList.add("clicked-task");
  }
});

taskStatus.addEventListener("change", () => {
  //Task status checkbox
  if (taskStatus.checked) {
    taskID(myTask).status = "Done";
    completedTasks += 1;
    progBar();
  } else {
    taskID(myTask).status = "Not done";
    completedTasks -= 1;
    progBar();
  }
});

// Add projects

projAddButton.addEventListener("click", () => {
  projectNameInput.blur();
  //Modify logic

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

  //Add new project with functionalities to dom

  //Add

  let newProject = myProject.cloneNode(true);
  let newModifier = newProject.children[1].children[0];
  let newDeleter = newProject.children[1].children[1];

  nav.appendChild(newProject);

  //Display modify modal

  newModifier.addEventListener("click", () => {
    modifier = newModifier;
    projectAdder.click();
  });

  //Display delete modal

  newDeleter.addEventListener("click", () => {
    //Display delete modal
    deleter = newDeleter;
    delMod();
  });

  //Create corresponding project object and update dom

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
    if (e.target == newProject || newProject.contains(e.target)) {
      removeClickEffect();
      newProject.classList.add("clicked-project");
      taskContainer.classList.remove("hide-tasks");
      bigTitle.innerHTML = `${
        ProjectID(newProject).title
      }<span class="secret-id">${ProjectID(newProject).DirId}</span>`;
      for (const property in ProjectID(newProject)) {
        if (
          ProjectID(newProject)[property].projId == ProjectID(newProject).DirId
        ) {
          plant.insertAdjacentElement(
            "beforebegin",
            ProjectID(newProject)[property].domRep
          );
        }
      }
    }
  });

  newProject.click();
});

//Add tasks

taskAddButton.addEventListener("click", () => {
  taskNameInput.blur();

  // Modify logic

  if (modifierTwo) {
    if (taskNameInput.value != "") {
      taskID(modifierTwo.parentElement.parentElement.parentElement).title =
        taskNameInput.value;
      modifierTwo.parentElement.parentElement.previousElementSibling.children[0].textContent =
        taskNameInput.value;
    } else {
      taskID(modifierTwo.parentElement.parentElement.parentElement).title =
        "Unnamed Task";
      modifierTwo.parentElement.parentElement.previousElementSibling.children[0].textContent =
        "Unnamed Task";
    }

    if (taskDescrib.value != "") {
      taskID(
        modifierTwo.parentElement.parentElement.parentElement
      ).description = taskDescrib.value;
      modifierTwo.parentElement.parentElement.previousElementSibling.children[1].textContent =
        taskDescrib.value;
    } else {
      taskID(
        modifierTwo.parentElement.parentElement.parentElement
      ).description = "";
      modifierTwo.parentElement.parentElement.previousElementSibling.children[1].textContent =
        "";
    }

    if (taskTime.value != "") {
      taskID(modifierTwo.parentElement.parentElement.parentElement).dueDate =
        taskTime.value;
      modifierTwo.parentElement.previousElementSibling.firstElementChild.textContent =
        taskTime.value;
    } else {
      taskID(modifierTwo.parentElement.parentElement.parentElement).dueDate =
        "";
      modifierTwo.parentElement.previousElementSibling.firstElementChild.textContent =
        "";
    }

    let importance =
      modifierTwo.nextElementSibling.nextElementSibling.firstElementChild
        .firstElementChild;

    if (taskImp.children[1].firstElementChild.checked) {
      taskID(modifierTwo.parentElement.parentElement.parentElement).importance =
        "High";
      modifierTwo.nextElementSibling.nextElementSibling.classList.remove(
        "remove"
      );
      importance.setAttributeNS(null, "fill", "red");
    } else if (taskImp.children[2].firstElementChild.checked) {
      taskID(modifierTwo.parentElement.parentElement.parentElement).importance =
        "Moderate";
      modifierTwo.nextElementSibling.nextElementSibling.classList.remove(
        "remove"
      );
      importance.setAttributeNS(null, "fill", "yellow");
    } else if (taskImp.children[3].firstElementChild.checked) {
      taskID(modifierTwo.parentElement.parentElement.parentElement).importance =
        "Low";
      modifierTwo.nextElementSibling.nextElementSibling.classList.remove(
        "remove"
      );
      importance.setAttributeNS(null, "fill", "green");
    } else {
      taskID(modifierTwo.parentElement.parentElement.parentElement).importance =
        "";
      modifierTwo.nextElementSibling.nextElementSibling.classList.add("remove");
    }
    return;
  }

  //Add new task with functionalities to dom

  //Add

  let newTask = myTask.cloneNode(true);
  newTask.firstElementChild.firstElementChild.checked = false;
  let newModifierTwo = newTask.children[2].children[1].children[0];
  let newDeleterTwo = newTask.children[2].children[1].children[1];

  plant.insertAdjacentElement("beforebegin", newTask);

  //Display modify modal

  newModifierTwo.addEventListener("click", () => {
    modifierTwo = newModifierTwo;
    taskAdder.click();
  });

  //Display delete modal

  newDeleterTwo.addEventListener("click", () => {
    //Display delete modal
    deleterTwo = newDeleterTwo;
    delMod();
  });

  //Create corresponding task object and update dom

  let project = bigTitle.querySelector(".secret-id").textContent;
  let title;
  let description;
  let dueDate;
  let flag;

  if (taskNameInput.value != "") {
    title = taskNameInput.value;
    plant.previousElementSibling.children[1].firstElementChild.textContent =
      taskNameInput.value;
  } else {
    title = "Unnamed Task";
    plant.previousElementSibling.children[1].firstElementChild.textContent =
      "Unnamed Task";
  }

  if (taskDescrib.value != "") {
    description = taskDescrib.value;
    plant.previousElementSibling.children[1].lastElementChild.textContent =
      taskDescrib.value;
  } else {
    description = "";
    plant.previousElementSibling.children[1].lastElementChild.textContent = "";
  }

  if (taskTime.value != "") {
    dueDate = taskTime.value;
    plant.previousElementSibling.children[2].firstElementChild.firstElementChild.textContent =
      taskTime.value;
  } else {
    dueDate = "";
    plant.previousElementSibling.children[2].firstElementChild.firstElementChild.textContent =
      "";
  }

  let importance =
    plant.previousElementSibling.children[2].lastElementChild.lastElementChild
      .firstElementChild.firstElementChild;

  if (taskImp.children[1].firstElementChild.checked) {
    flag = "High";
    importance.parentElement.parentElement.classList.remove("remove");
    importance.setAttributeNS(null, "fill", "red");
  } else if (taskImp.children[2].firstElementChild.checked) {
    flag = "Moderate";
    importance.parentElement.parentElement.classList.remove("remove");
    importance.setAttributeNS(null, "fill", "yellow");
  } else if (taskImp.children[3].firstElementChild.checked) {
    flag = "Low";
    importance.parentElement.parentElement.classList.remove("remove");
    importance.setAttributeNS(null, "fill", "green");
  } else {
    flag = "";
    importance.parentElement.parentElement.classList.add("remove");
  }

  createTodo(
    project,
    title,
    description,
    dueDate,
    flag,
    plant.previousElementSibling
  );
  totalTasks += 1;
  progBar();

  newTask.addEventListener("click", (e) => {
    //Click interaction
    if (e.target == newTask || newTask.contains(e.target)) {
      removeClickEffectTwo();
      newTask.classList.add("clicked-task");
    }
  });

  newTask.querySelector("#task-status").addEventListener("change", () => {
    //Task status checkbox
    if (newTask.querySelector("#task-status").checked) {
      taskID(newTask).status = "Done";
      completedTasks += 1;
      progBar();
    } else {
      taskID(newTask).status = "Not done";
      completedTasks -= 1;
      progBar();
    }
  });

  newTask.click();
});

//Debugging

console.log(projectDirectory);
