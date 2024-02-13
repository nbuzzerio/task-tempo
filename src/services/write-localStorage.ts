import { TaskSet } from "../App";

const writeToLocalStorage = (tasks: TaskSet[]) => {
  console.log("writing now...");
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error writing tasks to local storage:", error);
  }
};

export default writeToLocalStorage;
