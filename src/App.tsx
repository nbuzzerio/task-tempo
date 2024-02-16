import { useEffect, useState } from "react";
import GenerateTask from "./components/GenerateTask";
import TrialTask from "./components/TrialTask";
import { readJson } from "./services/read-write-json";

export interface Task {
  task: string;
  taskNotes?: string;
  time?: string;
  totalTime?: string;
  completed: string;
}

export interface TaskSet {
  name: string;
  taskSet: Task[];
}

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskSets, setTaskSets] = useState<TaskSet[]>([]);
  const [trialTask, setTrialTask] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await readJson();
      if (storedTasks) setTaskSets(storedTasks);
    };

    fetchTasks();

    return () => {};
  }, [trialTask]);

  return (
    <div className="min-h-screen bg-[#222]">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-7xl uppercase text-center py-10 text-gray-400">
          Task Tempo
        </h1>

        {taskSets && !trialTask && (
          <div className="flex justify-center items-center flex-wrap">
            {taskSets.map((taskSet) => (
              <div
                key={taskSet.name}
                className="sm:w-40 sm:h-20 rounded-lg shadow-md m-2 flex justify-center items-center bg-gray-600 p-2 cursor-pointer active:scale-105"
                onClick={() => {
                  setTasks(taskSet.taskSet);
                }}
              >
                <h2 className="uppercase text-gray-200">{taskSet.name}</h2>
              </div>
            ))}
          </div>
        )}
        {isEditing && (
          <GenerateTask
            tasks={tasks}
            taskSets={taskSets}
            setTasks={setTasks}
            setIsEditing={setIsEditing}
            setTaskSets={setTaskSets}
          />
        )}
        {!isEditing && !trialTask && (
          <div className="px-3">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-100 bg-red-600 hover:bg-red-700 focus:outline-none focus:border-red-700 focus:ring-red-500"
              onClick={() => setIsEditing(true)}
            >
              Begin Editing Task
            </button>
          </div>
        )}
        {!trialTask && !isEditing && tasks.length && (
          <div className="p-3">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-100 bg-green-600 hover:bg-green-700 focus:outline-none focus:border-green-700 focus:ring-green-500"
              onClick={() => setTrialTask(true)}
            >
              Begin Task Trial
            </button>
          </div>
        )}
        {trialTask && <TrialTask tasks={tasks} setTrialTask={setTrialTask} />}
      </div>
    </div>
  );
}

export default App;
