import React, { useEffect, useState } from "react";
import { Task } from "../App";

interface TrialTaskProps {
  tasks: Task[];
  setTrialTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const TrialTask: React.FC<TrialTaskProps> = ({ tasks, setTrialTask }) => {
  const [tasksList, setTasksList] = useState(tasks);
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    setTask(tasksList[0] as Task);

    return () => {};
  }, [tasksList]);

  const card = (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Time
          </div>
          <p className="mt-2 text-gray-500">Task Time: {task?.time}</p>
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mt-4">
            Task
          </div>
          <p className="mt-2 text-gray-500">{task?.task}</p>
        </div>
      </div>
    </div>
  );
  console.log("tasksList: ", tasksList);

  if (tasksList.length === 0) {
    setTrialTask(false);
    return;
  }

  return (
    <div>
      <div className="p-3">
        {card}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-100 bg-green-600 hover:bg-green-700 focus:outline-none focus:border-green-700 focus:ring-green-500"
          onClick={() => setTasksList([...tasksList])}
        >
          Task Completed
        </button>
      </div>
    </div>
  );
};

export default TrialTask;
