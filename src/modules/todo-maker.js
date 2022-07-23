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



export default shopping