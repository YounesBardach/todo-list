//Project creation

let projectNumber = 0;

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
  deadline;
  importance;
  notes;
  status;
  checkList;
  constructor(
    title,
    description,
    deadline,
    importance,
    notes,
    status,
    checkList
  ) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.importance = importance;
    this.notes = notes;
    this.status = status;
    this.checkList = checkList;
  }
}

let shopping = new todo(
  "shopping",
  "go shop",
  "before noon",
  "unimportant",
  "don't forget change",
  "not done",
  "go, buy, return"
);

export {
  projectDirectory,
  createProject,
  ProjectID,
};
