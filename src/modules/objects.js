//Project creation

let projectNumber = 0;
let taskNumber = 0;

class project {
  title;
  domRep;
  DirId;
  constructor(title, domRep) {
    this.title = title;
    this.domRep = domRep;
  }
}

let projectDirectory = {};

const createProject = (title, domRep) => {
  projectNumber++;
  projectDirectory[`Project${projectNumber}`] = new project(title, domRep);
  projectDirectory[`Project${projectNumber}`].DirId = `Project${projectNumber}`;
};

//domrep (needed unique id) => project => dirid => project directory
//Don't use dom as idetifier again (problem with portability e.g. localStorage)

const ProjectID = (id) => {
  for (const property in projectDirectory) {
    if (projectDirectory[property].domRep == id) {
      return projectDirectory[property];
    }
  }
};

//Task creation

class todo {
  title;
  description;
  dueDate;
  importance;
  status = "Not done";
  domRep;
  projId;
  taskId;
  constructor(title, description, dueDate, importance, domRep) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.importance = importance;
    this.domRep = domRep;
  }
}

const createTodo = (
  project,
  title,
  description,
  dueDate,
  importance,
  domRep
) => {
  taskNumber++;
  projectDirectory[project][`Task${taskNumber}`] = new todo(
    title,
    description,
    dueDate,
    importance,
    domRep
  );
  projectDirectory[project][`Task${taskNumber}`].projId =
    projectDirectory[project].DirId;
  projectDirectory[project][`Task${taskNumber}`].taskId = `Task${taskNumber}`;
};

// Template for nested for ins:

// for (var hand in hands) {
//   for (var card in hands[hand]) {
//       for (var prop in hands[hand][card]) {
//           console.log(hands[hand][card][prop]);
//       }
//   }
// }

const taskID = (id) => {
  for (const property in projectDirectory) {
    for (const subprop in projectDirectory[property]) {
      if (projectDirectory[property][subprop].domRep == id) {
        return projectDirectory[property][subprop];
      }
    }
  }
};

//Export

export { projectDirectory, createProject, ProjectID, createTodo, taskID };
