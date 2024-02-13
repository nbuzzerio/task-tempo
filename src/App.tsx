import { useEffect, useState } from "react";
import GenerateTask from "./components/GenerateTask";
import TrialTask from "./components/TrialTask";

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
  const [tasks, setTasks] = useState<Task[]>([
    {
      task: "Send 3 starting vills to sheep and 3 to gold (with mine)",
      time: "00:00",
      totalTime: "",
      completed: "",
    },
    {
      task: "new vills build house then rally to food until 9",
      time: "00:25",
      totalTime: "",
      completed: "",
    },
    {
      task: "Rally to woodline",
      time: "",
      totalTime: "02:05",
      completed: "",
    },
  ]);
  const [taskSets, setTaskSets] = useState<TaskSet[]>([]);
  const [trialTask, setTrialTask] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) setTaskSets(JSON.parse(storedTasks));

    return () => {};
  }, []);

  return (
    <div className="min-h-screen bg-[#222]">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-7xl uppercase text-center py-10 text-gray-400">
          Task Tempo
        </h1>

        {taskSets && (
          <div className="flex justify-center items-center flex-wrap">
            {taskSets.map((taskSet) => (
              <div
                className="sm:w-40 sm:h-20 rounded-lg shadow-md m-2 flex justify-center items-center bg-gray-600 p-2"
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
