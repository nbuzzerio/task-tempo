import React, { useEffect, useState } from "react";
import { Task } from "../App";

interface TrialTaskProps {
  tasks: Task[];
  setTrialTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const TrialTask: React.FC<TrialTaskProps> = ({ tasks, setTrialTask }) => {
  const [tasksList, setTasksList] = useState(tasks);
  const [task, setTask] = useState<Task | null>(null);
  const [taskComplete, setTaskComplete] = useState(false);

  useEffect(() => {
    console.log("tasksList: ", tasksList);
    setTask(tasksList[0] as Task);
    if (tasksList.length === 0) {
      setTaskComplete(true);
    }

    return () => {};
  }, [tasksList]);

  const expectedTime = tasks.reduce((acc, curr) => {
    if (curr.time) acc += curr.time;
    return acc;
  }, "0");
  const actualTime = tasks.reduce((acc, curr) => {
    if (curr.completed) acc += curr.completed;
    return acc;
  }, "0");

  return (
    <div>
      <div className="p-3 flex flex-col justify-center items-center">
        {!taskComplete && (
          <>
            <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
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
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-100 bg-green-600 hover:bg-green-700 focus:outline-none focus:border-green-700 focus:ring-green-500 my-5 max-w-md md:max-w-2xl"
              onClick={() => {
                tasksList.shift();
                setTasksList([...tasksList]);
              }}
            >
              Task Completed
            </button>
          </>
        )}
        {taskComplete && (
          <>
            <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
              <div className="md:flex">
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    Expected Time: {expectedTime}
                  </div>
                  <p className="mt-2 text-gray-500">Task Time: {task?.time}</p>
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mt-4">
                    Actual Time: {actualTime}
                  </div>
                  <p className="mt-2 text-gray-500">{task?.task}</p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-100 bg-red-600 hover:bg-red-700 focus:outline-none focus:border-red-700 focus:ring-red-500 my-5 max-w-md md:max-w-2xl"
              onClick={() => setTrialTask(false)}
            >
              Exit Task Set
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TrialTask;
