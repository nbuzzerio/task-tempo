import { useState } from "react";
import { Task } from "../App";

interface GenerateTaskProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const GenerateTask: React.FC<GenerateTaskProps> = ({
  tasks,
  setTasks,
  setIsEditing,
}) => {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [timeError, setTimeError] = useState(false);
  const [taskAdded, setTaskAdded] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const timeRegex = /^(?:[0-1]?[0-9]|2[0-3])?(?::[0-5][0-9]){1,2}$/;
    // const timeRegex = /^(?:[01]?[0-9]|2[0-3])?(?::[0-5][0-9]){1,2}$/;
    const timeRegex = /^(?:[0-2]?[0-9]?:)?[0-5][0-9]:[0-5][0-9]$/;

    if (
      !task ||
      (!time && !totalTime) ||
      (!timeRegex.test(time) && !timeRegex.test(totalTime))
    )
      setTimeError(true);
    else {
      setTasks([
        ...tasks,
        {
          task,
          time,
          totalTime,
          completed: "",
        },
      ]);
      setTask("");
      setTime("");
      setTotalTime("");
      setTimeError(false);
      setTaskAdded(true);

      // Set a timer to turn taskAdded to false after 1 second
      setTimeout(() => {
        setTaskAdded(false);
      }, 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto px-3">
      {timeError && (
        <div className="text-red-500 text-center max-w-36 mx-auto">
          Please fill in either Time or Total Time
        </div>
      )}
      {taskAdded && (
        <div className="fixed bottom-0 left-0 w-full bg-green-500 text-white py-2 text-center animate-fade-out">
          Task Added!
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label
            htmlFor="task"
            className="block text-sm font-medium text-gray-300"
          >
            Task
          </label>
          <input
            type="text"
            id="task"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={task}
            maxLength={100}
            required
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-300"
          >
            Time
          </label>
          <input
            type="text"
            id="time"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder={"00:00:00"}
          />
        </div>
        <div>
          <label
            htmlFor="totalTime"
            className="block text-sm font-medium text-gray-300"
          >
            Total Time
          </label>
          <input
            type="text"
            id="totalTime"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            value={totalTime}
            onChange={(e) => setTotalTime(e.target.value)}
            placeholder={"00:00:00"}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:border-red-700 focus:ring-red-500"
            onClick={() => setIsEditing(false)}
          >
            Finish Editing Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateTask;
