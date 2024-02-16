import { TaskSet } from "../App";

export const writeToJSON = async (data: TaskSet[]) => {
  try {
    const response = await fetch("/api/saveTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to save tasks");
    }
    console.log("Tasks saved successfully");
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

export const readJson = async () => {
  try {
    const response = await fetch("/api/getTasks");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data: TaskSet[] = await response.json();
    console.log("Tasks fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }
};
